/// <reference lib="webworker" />

import { CompressionOptions, ImageFormat } from "../lib/types";
import { kbToBytes, bytesToKB, formatBytes } from "../lib/image/units";
import { formatToMime } from "../lib/image/compress";

export interface WorkerStartPayload {
  imageBitmap: ImageBitmap;
  options: CompressionOptions;
}

self.onmessage = async (event: MessageEvent<WorkerStartPayload>) => {
  const { imageBitmap, options } = event.data;

  try {
    const {
      targetWidthPx,
      targetHeightPx,
      fitMode,
      format,
      maxKB,
      minKB,
      allowProgressiveDownscale = true,
    } = options;

    const maxBytes = kbToBytes(maxKB);
    const minBytes = minKB ? kbToBytes(minKB) : undefined;
    const mime = formatToMime(format);

    let currentW = targetWidthPx;
    let currentH = targetHeightPx;
    let downscaled = false;
    let warning: string | undefined;

    const maxDownscaleAttempts = allowProgressiveDownscale ? 4 : 0;

    for (let attempt = 0; attempt <= maxDownscaleAttempts; attempt++) {
      const canvas = new OffscreenCanvas(currentW, currentH);
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        throw new Error("Unable to obtain 2D context in Web Worker.");
      }

      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";

      // White background for JPEG or pad
      if (format === "jpeg" || fitMode === "pad") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, currentW, currentH);
      }

      const srcW = imageBitmap.width;
      const srcH = imageBitmap.height;

      if (fitMode === "stretch") {
        ctx.drawImage(imageBitmap, 0, 0, currentW, currentH);
      } else if (fitMode === "pad") {
        const scale = Math.min(currentW / srcW, currentH / srcH);
        const destW = Math.round(srcW * scale);
        const destH = Math.round(srcH * scale);
        const destX = Math.round((currentW - destW) / 2);
        const destY = Math.round((currentH - destH) / 2);
        ctx.drawImage(imageBitmap, 0, 0, srcW, srcH, destX, destY, destW, destH);
      } else {
        // "crop"
        const srcRatio = srcW / srcH;
        const targetRatio = currentW / currentH;
        let sx = 0;
        let sy = 0;
        let sWidth = srcW;
        let sHeight = srcH;

        if (srcRatio > targetRatio) {
          sWidth = Math.round(srcH * targetRatio);
          sx = Math.round((srcW - sWidth) / 2);
        } else {
          sHeight = Math.round(srcW / targetRatio);
          sy = Math.round((srcH - sHeight) / 2);
        }

        ctx.drawImage(imageBitmap, sx, sy, sWidth, sHeight, 0, 0, currentW, currentH);
      }

      // Handle PNG
      if (format === "png") {
        self.postMessage({ type: "PROGRESS", step: 1, total: 1 });
        const blob = await canvas.convertToBlob({ type: mime });

        if (blob.size <= maxBytes) {
          const buffer = await blob.arrayBuffer();
          const sizeKB = bytesToKB(buffer.byteLength);
          const isBelowMin = minBytes ? buffer.byteLength < minBytes : false;

          self.postMessage(
            {
              type: "SUCCESS",
              result: {
                buffer,
                width: currentW,
                height: currentH,
                sizeBytes: buffer.byteLength,
                sizeKB,
                quality: 1.0,
                format,
                iterations: 1,
                isBelowMinKB: isBelowMin,
                warning: isBelowMin
                  ? `Output size (${sizeKB} KB) is below the requested minimum (${minKB} KB).`
                  : undefined,
                downscaled,
              },
            },
            [buffer]
          );
          return;
        }

        if (attempt < maxDownscaleAttempts) {
          currentW = Math.round(currentW * 0.9);
          currentH = Math.round(currentH * 0.9);
          downscaled = true;
          continue;
        } else {
          throw new Error(
            `PNG format is lossless and cannot reach under ${maxKB} KB at these dimensions (${formatBytes(
              blob.size
            )}). Tip: Select JPEG format.`
          );
        }
      }

      // Binary Search for JPEG/WebP
      let low = 0.05;
      let high = 0.95;
      let bestBlob: Blob | null = null;
      let bestQuality = low;

      const lowestBlob = await canvas.convertToBlob({ type: mime, quality: low });
      if (lowestBlob && lowestBlob.size <= maxBytes) {
        bestBlob = lowestBlob;
      }

      if (bestBlob) {
        const TOTAL_STEPS = 8;
        for (let step = 1; step <= TOTAL_STEPS; step++) {
          self.postMessage({ type: "PROGRESS", step, total: TOTAL_STEPS });
          const mid = (low + high) / 2;
          const blob = await canvas.convertToBlob({ type: mime, quality: mid });

          if (blob.size <= maxBytes) {
            bestBlob = blob;
            bestQuality = mid;
            low = mid;
          } else {
            high = mid;
          }
        }

        let isBelowMin = false;
        if (minBytes && bestBlob.size < minBytes) {
          const maxQBlob = await canvas.convertToBlob({ type: mime, quality: 0.95 });
          if (maxQBlob && maxQBlob.size <= maxBytes) {
            bestBlob = maxQBlob;
            bestQuality = 0.95;
          }
          if (bestBlob.size < minBytes) {
            isBelowMin = true;
            warning = `The image is ${bytesToKB(
              bestBlob.size
            )} KB, which is below the requested minimum of ${minKB} KB.`;
          }
        }

        let finalFormat: ImageFormat = format;
        if (format === "webp" && bestBlob.type !== "image/webp") {
          finalFormat = "jpeg";
          warning = "WebP encoding unsupported; image saved as JPEG.";
        }

        // Transfer raw ArrayBuffer to main thread so ownership is 100% decoupled from worker isolate
        const buffer = await bestBlob.arrayBuffer();

        self.postMessage(
          {
            type: "SUCCESS",
            result: {
              buffer,
              width: currentW,
              height: currentH,
              sizeBytes: buffer.byteLength,
              sizeKB: bytesToKB(buffer.byteLength),
              quality: Math.round(bestQuality * 100) / 100,
              format: finalFormat,
              iterations: 8,
              isBelowMinKB: isBelowMin,
              warning,
              downscaled,
            },
          },
          [buffer]
        );
        return;
      }

      if (attempt < maxDownscaleAttempts) {
        currentW = Math.round(currentW * 0.9);
        currentH = Math.round(currentH * 0.9);
        downscaled = true;
      } else {
        const smallest = lowestBlob ? formatBytes(lowestBlob.size) : "unknown";
        throw new Error(
          `Unable to reach ${maxKB} KB at ${targetWidthPx} x ${targetHeightPx} px (smallest size reached was ${smallest}).`
        );
      }
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Compression worker encountered an error.";
    self.postMessage({ type: "ERROR", error: message });
  } finally {
    try {
      imageBitmap.close();
    } catch {
      // Ignore
    }
  }
};
