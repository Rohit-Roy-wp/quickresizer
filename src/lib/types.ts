export type Unit = "px" | "cm" | "in";
export type ImageFormat = "jpeg" | "png" | "webp";
export type FitMode = "crop" | "stretch" | "pad";

export interface Preset {
  slug: string;
  label: string;
  width: number;
  height: number;
  unit: Unit;
  minKB?: number;
  maxKB: number;
  format: ImageFormat;
  fitMode?: FitMode;
  lastVerified: string;
  sourceUrl: string;
  description?: string;
}

export interface ImageSourceInfo {
  file: File;
  name: string;
  sizeBytes: number;
  sizeFormatted: string;
  width: number;
  height: number;
  aspectRatio: number;
  previewUrl: string;
  type: string;
}

export interface CompressionOptions {
  targetWidthPx: number;
  targetHeightPx: number;
  fitMode: FitMode;
  format: ImageFormat;
  maxKB: number;
  minKB?: number;
  allowProgressiveDownscale?: boolean;
  onProgress?: (step: number, maxSteps: number) => void;
}

export interface CompressionResult {
  blob: Blob;
  objectUrl: string;
  width: number;
  height: number;
  sizeBytes: number;
  sizeKB: number;
  quality: number;
  format: ImageFormat;
  iterations: number;
  isBelowMinKB?: boolean;
  warning?: string;
  downscaled?: boolean;
}

export type ValidationErrorCode =
  | "TOO_LARGE"
  | "INVALID_TYPE"
  | "HEIC_UNSUPPORTED"
  | "EMPTY_FILE";

export interface ValidationResult {
  valid: boolean;
  error?: string;
  code?: ValidationErrorCode;
}

