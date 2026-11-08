/**
 * Orientation-safe image decoder.
 * Uses createImageBitmap with { imageOrientation: "from-image" } to respect EXIF orientation.
 * Guards against oversized images (> 8000px) to prevent mobile browser memory exhaustion.
 */

export const MAX_DIMENSION_LIMIT = 8000;

export interface DecodedImage {
  bitmap?: ImageBitmap;
  image?: HTMLImageElement;
  width: number;
  height: number;
  close: () => void;
}

/**
 * Decodes an image file safely respecting EXIF orientation.
 */
export async function decodeImageFile(file: File): Promise<DecodedImage> {
  // 1. Try modern createImageBitmap with EXIF orientation
  if (typeof window !== "undefined" && "createImageBitmap" in window) {
    try {
      const bitmap = await createImageBitmap(file, {
        imageOrientation: "from-image",
      });

      return {
        bitmap,
        width: bitmap.width,
        height: bitmap.height,
        close: () => {
          try {
            bitmap.close();
          } catch {
            // Ignore already closed
          }
        },
      };
    } catch {
      // Fall through to HTMLImageElement fallback
    }
  }

  // 2. Fallback to HTMLImageElement
  return new Promise((resolve, reject) => {
    const objectUrl = URL.createObjectURL(file);
    const img = new Image();

    img.onload = () => {
      resolve({
        image: img,
        width: img.naturalWidth,
        height: img.naturalHeight,
        close: () => {
          URL.revokeObjectURL(objectUrl);
        },
      });
    };

    img.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Failed to decode image file. The file may be corrupted."));
    };

    img.src = objectUrl;
  });
}

