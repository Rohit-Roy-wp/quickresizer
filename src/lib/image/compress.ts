import { ImageFormat, CompressionOptions, CompressionResult } from "../types";
import { kbToBytes, bytesToKB, formatBytes } from "./units";
import { renderToCanvas } from "./resize";
import { DecodedImage } from "./exif";

/**
 * Safely converts an HTMLCanvasElement or OffscreenCanvas to a Blob.
 */
export async function canvasToBlob(
  canvas: HTMLCanvasElement | OffscreenCanvas,
  type: string,
  quality?: number
): Promise<Blob | null> {
  if (typeof OffscreenCanvas !== "undefined" && canvas instanceof OffscreenCanvas) {
    return canvas.convertToBlob({ type, quality });
  }

  return new Promise((resolve) => {
    (canvas as HTMLCanvasElement).toBlob(
      (blob) => resolve(blob),
      type,
      quality
    );
  });
}

/**
 * Maps ImageFormat to valid MIME type.
 */
export function formatToMime(format: ImageFormat): string {
  switch (format) {
    case "jpeg":
      return "image/jpeg";
    case "png":
      return "image/png";
    case "webp":
      return "image/webp";
    default:
      return "image/jpeg";
  }
}

/**
 * Core Binary-Search Compression Engine.
 * 1. Checks exact blob.size in bytes against maxBytes.
 * 2. Runs binary search on quality (0.05 to 0.95, 8 iterations) for JPEG and WebP.
 * 3. Handles PNG (lossless) with dimension warning if it exceeds maxKB.
 * 4. Stepwise downscale fallback if quality 0.05 still exceeds maxKB.
 * 5. Minimum KB detection with below-minimum guidance.
 */
export async function compressImage(
  source: DecodedImage,
  options: CompressionOptions
): Promise<CompressionResult> {
  const {
    targetWidthPx,
    targetHeightPx,
    fitMode,
    format,
    maxKB,
    minKB,
    allowProgressiveDownscale = true,
    onProgress,
  } = options;

  const maxBytes = kbToBytes(maxKB);
  const minBytes = minKB ? kbToBytes(minKB) : undefined;
  const mime = formatToMime(format);

  let currentW = targetWidthPx;
  let currentH = targetHeightPx;
  let downscaled = false;
  let warning: string | undefined;

  // Maximum of 4 downscale attempts if 0.05 quality still exceeds limit
  const maxDownscaleAttempts = allowProgressiveDownscale ? 4 : 0;

  for (let attempt = 0; attempt <= maxDownscaleAttempts; attempt++) {
    // 1. Render to canvas at current dimensions
    const canvas = renderToCanvas(source, {
      targetWidth: currentW,
      targetHeight: currentH,
      fitMode,
      format,
    });

    // 2. Handle PNG (quality parameter does not apply to lossless PNG)
    if (format === "png") {
      onProgress?.(1, 1);
      const pngBlob = await canvasToBlob(canvas, mime);

      if (!pngBlob) {
        throw new Error("Canvas encoding failed for PNG format.");
      }

      if (pngBlob.size <= maxBytes) {
        const sizeKB = bytesToKB(pngBlob.size);
        const isBelowMin = minBytes ? pngBlob.size < minBytes : false;

        return {
          blob: pngBlob,
          objectUrl: URL.createObjectURL(pngBlob),
          width: currentW,
          height: currentH,
          sizeBytes: pngBlob.size,
          sizeKB,
          quality: 1.0,
          format,
          iterations: 1,
          isBelowMinKB: isBelowMin,
          warning: isBelowMin
            ? `Output size (${sizeKB} KB) is below the requested minimum (${minKB} KB).`
            : undefined,
          downscaled,
        };
      }

      // If PNG exceeds maxBytes:
      if (attempt < maxDownscaleAttempts) {
        // Downscale dimensions by 10%
        currentW = Math.round(currentW * 0.9);
        currentH = Math.round(currentH * 0.9);
        downscaled = true;
        continue;
      } else {
        throw new Error(
          `PNG format is lossless and cannot reach under ${maxKB} KB at these dimensions (${formatBytes(
            pngBlob.size
          )}). Tip: Select JPEG format for up to 90% smaller file size.`
        );
      }
    }

    // 3. Binary Search for JPEG and WebP
    // Range: 0.05 to 0.95 over 8 iterations
    let low = 0.05;
    let high = 0.95;
    let bestBlob: Blob | null = null;
    let bestQuality = low;
    let smallestBlob: Blob | null = null;

    // Check lowest quality first to see if target is attainable at these dimensions
    const lowestBlob = await canvasToBlob(canvas, mime, low);
    if (lowestBlob) {
      smallestBlob = lowestBlob;
      if (lowestBlob.size <= maxBytes) {
        bestBlob = lowestBlob;
        bestQuality = low;
      }
    }

    if (bestBlob) {
      // Target is achievable: execute binary search to maximize quality under maxBytes
      const TOTAL_STEPS = 8;
      for (let step = 1; step <= TOTAL_STEPS; step++) {
        onProgress?.(step, TOTAL_STEPS);
        const mid = (low + high) / 2;
        const blob = await canvasToBlob(canvas, mime, mid);

        if (!blob) break;

        if (blob.size <= maxBytes) {
          bestBlob = blob;
          bestQuality = mid;
          low = mid; // Try higher quality
        } else {
          high = mid; // Exceeded limit; try lower quality
        }
      }

      // Check minKB condition
      let isBelowMin = false;
      if (minBytes && bestBlob.size < minBytes) {
        // Try highest quality (0.95) to see if we can get inside the min-max range
        const maxQBlob = await canvasToBlob(canvas, mime, 0.95);
        if (maxQBlob && maxQBlob.size <= maxBytes) {
          bestBlob = maxQBlob;
          bestQuality = 0.95;
        }

        if (bestBlob.size < minBytes) {
          isBelowMin = true;
          warning = `The image is ${bytesToKB(
            bestBlob.size
          )} KB, which is below the requested minimum of ${minKB} KB. If your portal rejects files under ${minKB} KB, consider increasing the dimensions slightly.`;
        }
      }

      // WebP fallback check: Ensure browser actually produced webp and not png fallback
      let finalFormat = format;
      if (format === "webp" && bestBlob.type !== "image/webp") {
        finalFormat = "jpeg";
        warning =
          "WebP encoding is unsupported in this browser; the image was saved as JPEG instead.";
      }

      return {
        blob: bestBlob,
        objectUrl: URL.createObjectURL(bestBlob),
        width: currentW,
        height: currentH,
        sizeBytes: bestBlob.size,
        sizeKB: bytesToKB(bestBlob.size),
        quality: Math.round(bestQuality * 100) / 100,
        format: finalFormat,
        iterations: 8,
        isBelowMinKB: isBelowMin,
        warning,
        downscaled,
      };
    }

    // If lowest quality (0.05) is still too large:
    if (attempt < maxDownscaleAttempts) {
      currentW = Math.round(currentW * 0.9);
      currentH = Math.round(currentH * 0.9);
      downscaled = true;
    } else {
      const smallestSizeStr = smallestBlob
        ? formatBytes(smallestBlob.size)
        : "unknown";
      throw new Error(
        `Unable to reach ${maxKB} KB at ${targetWidthPx} x ${targetHeightPx} px (smallest size reached was ${smallestSizeStr}). Try reducing dimensions or choosing a higher KB limit.`
      );
    }
  }

  throw new Error("Compression failed unexpectedly. Please check your image settings.");
}

