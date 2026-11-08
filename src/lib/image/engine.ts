import { CompressionOptions, CompressionResult, ImageSourceInfo } from "../types";
import { validateImageFile } from "./validate";
import { decodeImageFile } from "./exif";
import { compressImage, formatToMime } from "./compress";
import { bytesToKB, formatBytes } from "./units";

/**
 * Extracts metadata and local preview from a selected image File.
 */
export async function inspectImageFile(file: File): Promise<ImageSourceInfo> {
  const validation = validateImageFile(file);
  if (!validation.valid) {
    throw new Error(validation.error || "Invalid image file.");
  }

  const decoded = await decodeImageFile(file);
  const previewUrl = URL.createObjectURL(file);

  const info: ImageSourceInfo = {
    file,
    name: file.name,
    sizeBytes: file.size,
    sizeFormatted: formatBytes(file.size),
    width: decoded.width,
    height: decoded.height,
    aspectRatio: decoded.width / decoded.height,
    previewUrl,
    type: file.type || "image/jpeg",
  };

  decoded.close();
  return info;
}

/**
 * Orchestrates image compression.
 * Attempts Web Worker with OffscreenCanvas first; falls back seamlessly to main thread.
 */
export async function runCompressionPipeline(
  file: File,
  options: CompressionOptions
): Promise<CompressionResult> {
  const validation = validateImageFile(file);
  if (!validation.valid) {
    throw new Error(validation.error || "File validation failed.");
  }

  // 1. Check if Web Worker and OffscreenCanvas are supported
  const supportsOffscreen =
    typeof window !== "undefined" &&
    "OffscreenCanvas" in window &&
    "Worker" in window &&
    "createImageBitmap" in window;

  if (supportsOffscreen) {
    try {
      return await runInWorker(file, options);
    } catch {
      // Graceful fallback to main-thread processing
    }
  }

  // 2. Main-thread execution fallback
  const decoded = await decodeImageFile(file);
  try {
    const result = await compressImage(decoded, options);
    return result;
  } finally {
    decoded.close();
  }
}

/**
 * Executes compression inside a Web Worker.
 */
function runInWorker(
  file: File,
  options: CompressionOptions
): Promise<CompressionResult> {
  return new Promise(async (resolve, reject) => {
    let worker: Worker | null = null;
    let bitmap: ImageBitmap | null = null;

    try {
      bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
      worker = new Worker(new URL("../../workers/compress.worker.ts", import.meta.url), {
        type: "module",
      });

      worker.onmessage = (event) => {
        const data = event.data;
        if (data.type === "PROGRESS") {
          options.onProgress?.(data.step, data.total);
        } else if (data.type === "SUCCESS") {
          const res = data.result;
          // Reconstitute the Blob on the main thread from transferred ArrayBuffer
          const mime = formatToMime(res.format);
          const mainThreadBlob = new Blob([res.buffer], { type: mime });

          resolve({
            blob: mainThreadBlob,
            objectUrl: URL.createObjectURL(mainThreadBlob),
            width: res.width,
            height: res.height,
            sizeBytes: res.sizeBytes,
            sizeKB: res.sizeKB,
            quality: res.quality,
            format: res.format,
            iterations: res.iterations,
            isBelowMinKB: res.isBelowMinKB,
            warning: res.warning,
            downscaled: res.downscaled,
          });
          cleanup();
        } else if (data.type === "ERROR") {
          reject(new Error(data.error));
          cleanup();
        }
      };

      worker.onerror = (err) => {
        reject(new Error(err.message || "Worker execution failed"));
        cleanup();
      };

      // Transfer bitmap ownership to worker
      worker.postMessage({ imageBitmap: bitmap, options }, [bitmap]);
    } catch (err) {
      cleanup();
      reject(err);
    }

    function cleanup() {
      if (worker) {
        worker.terminate();
        worker = null;
      }
    }
  });
}
