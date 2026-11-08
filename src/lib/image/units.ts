import { Unit } from "../types";

/**
 * Unit Conversion Constants as mandated by technical specifications:
 * - 96 DPI standard screen resolution
 * - 1 inch = 96 pixels
 * - 1 cm = 37.7953 pixels (96 / 2.54)
 * - 1 KB = 1024 bytes
 */
export const DPI = 96;
export const PX_PER_INCH = 96;
export const PX_PER_CM = 37.7953;
export const BYTES_PER_KB = 1024;
export const BYTES_PER_MB = 1024 * 1024;

/**
 * Converts any supported unit (px, cm, in) to rounded integer pixels.
 */
export function toPixels(value: number, unit: Unit): number {
  if (value <= 0 || isNaN(value)) return 0;

  switch (unit) {
    case "px":
      return Math.round(value);
    case "cm":
      return Math.round(value * PX_PER_CM);
    case "in":
      return Math.round(value * PX_PER_INCH);
    default:
      return Math.round(value);
  }
}

/**
 * Converts pixels to target unit (px, cm, in).
 * Returns integers for px, and 2-decimal rounded precision for cm and in.
 */
export function fromPixels(pixels: number, unit: Unit): number {
  if (pixels <= 0 || isNaN(pixels)) return 0;

  switch (unit) {
    case "px":
      return Math.round(pixels);
    case "cm":
      return Math.round((pixels / PX_PER_CM) * 100) / 100;
    case "in":
      return Math.round((pixels / PX_PER_INCH) * 100) / 100;
    default:
      return Math.round(pixels);
  }
}

/**
 * Converts raw bytes to KB (1 KB = 1024 bytes).
 */
export function bytesToKB(bytes: number): number {
  return Math.round((bytes / BYTES_PER_KB) * 100) / 100;
}

/**
 * Converts KB to raw bytes (1 KB = 1024 bytes).
 */
export function kbToBytes(kb: number): number {
  return Math.round(kb * BYTES_PER_KB);
}

/**
 * Formats a byte size into human-readable representation (e.g. 48.6 KB, 2.3 MB).
 */
export function formatBytes(bytes: number): string {
  if (bytes < BYTES_PER_KB) {
    return `${bytes} B`;
  }
  if (bytes < BYTES_PER_MB) {
    return `${(bytes / BYTES_PER_KB).toFixed(1)} KB`;
  }
  return `${(bytes / BYTES_PER_MB).toFixed(2)} MB`;
}

