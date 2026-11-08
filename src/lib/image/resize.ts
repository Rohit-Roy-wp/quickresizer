import { FitMode, ImageFormat } from "../types";
import { DecodedImage } from "./exif";

export interface RenderCanvasOptions {
  targetWidth: number;
  targetHeight: number;
  fitMode: FitMode;
  format: ImageFormat;
}

/**
 * Draws decoded image onto an HTMLCanvasElement with the requested dimensions and fit mode.
 * Rule: JPEG output MUST have canvas filled with solid white to avoid black transparency backgrounds.
 */
export function renderToCanvas(
  source: DecodedImage,
  options: RenderCanvasOptions
): HTMLCanvasElement {
  const { targetWidth, targetHeight, fitMode, format } = options;

  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(targetWidth));
  canvas.height = Math.max(1, Math.round(targetHeight));

  const ctx = canvas.getContext("2d", { willReadFrequently: false });
  if (!ctx) {
    throw new Error("Unable to obtain 2D canvas context.");
  }

  // Use high-quality image smoothing
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  // Rule 3.5: Fill white background for JPEG output (and for Pad mode)
  if (format === "jpeg" || fitMode === "pad") {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  const drawable = source.bitmap || source.image;
  if (!drawable) {
    throw new Error("No valid drawable source found.");
  }

  const srcW = source.width;
  const srcH = source.height;

  if (fitMode === "stretch") {
    // Force stretch to target dimensions
    ctx.drawImage(drawable, 0, 0, canvas.width, canvas.height);
  } else if (fitMode === "pad") {
    // Fit entirely within canvas, letterboxing with white
    const scale = Math.min(canvas.width / srcW, canvas.height / srcH);
    const destW = Math.round(srcW * scale);
    const destH = Math.round(srcH * scale);
    const destX = Math.round((canvas.width - destW) / 2);
    const destY = Math.round((canvas.height - destH) / 2);

    ctx.drawImage(drawable, 0, 0, srcW, srcH, destX, destY, destW, destH);
  } else {
    // Default: "crop" (Crop to fill)
    // Centers and crops the source image without distorting human faces/ratios
    const srcRatio = srcW / srcH;
    const targetRatio = canvas.width / canvas.height;

    let sx = 0;
    let sy = 0;
    let sWidth = srcW;
    let sHeight = srcH;

    if (srcRatio > targetRatio) {
      // Source is wider than target: crop horizontal edges
      sWidth = Math.round(srcH * targetRatio);
      sx = Math.round((srcW - sWidth) / 2);
    } else {
      // Source is taller than target: crop vertical edges
      sHeight = Math.round(srcW / targetRatio);
      sy = Math.round((srcH - sHeight) / 2);
    }

    ctx.drawImage(drawable, sx, sy, sWidth, sHeight, 0, 0, canvas.width, canvas.height);
  }

  return canvas;
}

