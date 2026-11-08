import { ValidationResult } from "../types";
import { BYTES_PER_MB } from "./units";

export const MAX_FILE_SIZE_BYTES = 15 * BYTES_PER_MB; // 15 MB cap

export const ALLOWED_MIME_TYPES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
]);

export const ALLOWED_EXTENSIONS = new Set(["jpg", "jpeg", "png", "webp"]);

export function validateImageFile(file: File): ValidationResult {
  if (!file) {
    return {
      valid: false,
      error: "No file was provided.",
      code: "EMPTY_FILE",
    };
  }

  if (file.size === 0) {
    return {
      valid: false,
      error: "The selected file is empty (0 bytes).",
      code: "EMPTY_FILE",
    };
  }

  // 15 MB file size limit
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return {
      valid: false,
      error: `File size exceeds the 15 MB limit (${(file.size / BYTES_PER_MB).toFixed(1)} MB). Please choose a smaller image.`,
      code: "TOO_LARGE",
    };
  }

  const nameParts = file.name.split(".");
  const extension = nameParts.length > 1 ? nameParts.pop()?.toLowerCase() || "" : "";

  // Dedicated check and helpful guidance for Apple HEIC/HEIF
  if (
    extension === "heic" ||
    extension === "heif" ||
    file.type === "image/heic" ||
    file.type === "image/heif"
  ) {
    return {
      valid: false,
      error:
        "Apple HEIC format is not supported directly in the browser yet. Tip: In iPhone Settings > Camera > Formats, select 'Most Compatible' to take photos in JPG, or export to JPG before uploading.",
      code: "HEIC_UNSUPPORTED",
    };
  }

  // Check MIME type or extension
  const mimeValid = file.type ? ALLOWED_MIME_TYPES.has(file.type.toLowerCase()) : false;
  const extValid = ALLOWED_EXTENSIONS.has(extension);

  if (!mimeValid && !extValid) {
    return {
      valid: false,
      error:
        "Unsupported file format. Please upload a JPEG, JPG, PNG, or WebP image.",
      code: "INVALID_TYPE",
    };
  }

  return { valid: true };
}

