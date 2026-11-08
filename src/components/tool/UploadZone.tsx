"use client";

import React, { useRef, useState } from "react";
import { Upload, Image as ImageIcon, Trash2, RefreshCw, AlertCircle, ShieldCheck } from "lucide-react";
import { ImageSourceInfo } from "@/lib/types";

interface UploadZoneProps {
  sourceInfo: ImageSourceInfo | null;
  onFileSelected: (file: File) => void;
  onClear: () => void;
  disabled?: boolean;
  error?: string | null;
}

export function UploadZone({
  sourceInfo,
  onFileSelected,
  onClear,
  disabled = false,
  error = null,
}: UploadZoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) {
      setIsDragOver(true);
    }
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);

    if (disabled) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      onFileSelected(file);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      onFileSelected(file);
      e.target.value = "";
    }
  };

  const triggerPicker = () => {
    if (!disabled && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="w-full h-full flex flex-col justify-center">
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp,.heic,.heif"
        onChange={handleFileInputChange}
        className="hidden"
        disabled={disabled}
        aria-label="Upload image"
      />

      {!sourceInfo ? (
        /* Empty State Dropzone */
        <div
          role="button"
          tabIndex={disabled ? -1 : 0}
          onClick={triggerPicker}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              triggerPicker();
            }
          }}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`relative flex h-full min-h-[380px] flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 text-center transition-all duration-150 cursor-pointer select-none focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 ${
            isDragOver
              ? "border-blue-600 bg-blue-50/50"
              : error
              ? "border-red-300 bg-red-50/30 hover:border-red-400"
              : "border-slate-300 bg-slate-50/40 hover:border-blue-500 hover:bg-blue-50/20"
          } ${disabled ? "opacity-60 cursor-not-allowed" : ""}`}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600 mb-3.5 shadow-xs">
            <Upload className="h-6 w-6" />
          </div>

          <h2 className="text-base font-bold text-slate-900">
            Drag &amp; drop an image here, or{" "}
            <span className="text-blue-600 underline underline-offset-2">Browse</span>
          </h2>
          <p className="mt-1 text-xs text-slate-500 max-w-xs">
            Supports JPG, PNG, and WebP up to 15 MB. Ideal for passport photos, signatures, and certificates.
          </p>

          <div className="mt-5 flex items-center gap-1.5 text-[11px] font-medium text-slate-600 bg-white border border-slate-200 px-3 py-1 rounded-full shadow-2xs">
            <ShieldCheck className="h-3.5 w-3.5 text-green-600" />
            <span>Files are processed in your browser and never uploaded.</span>
          </div>

          {error && (
            <div
              role="alert"
              aria-live="polite"
              className="mt-4 flex items-start gap-2 rounded-lg bg-red-50 p-3 text-xs text-red-700 text-left border border-red-200 max-w-sm"
            >
              <AlertCircle className="h-4 w-4 shrink-0 mt-0.5 text-red-600" />
              <span>{error}</span>
            </div>
          )}
        </div>
      ) : (
        /* Image Loaded Preview State */
        <div className="flex h-full flex-col justify-between rounded-xl bg-slate-50/60 p-4 border border-slate-200/80">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <div className="flex items-center gap-2 truncate pr-2">
              <ImageIcon className="h-4 w-4 text-blue-600 shrink-0" />
              <span className="text-xs sm:text-sm font-semibold text-slate-900 truncate" title={sourceInfo.name}>
                {sourceInfo.name}
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={triggerPicker}
                disabled={disabled}
                className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-blue-600 px-2 py-1 rounded transition-colors duration-150 disabled:opacity-50 cursor-pointer"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>Replace</span>
              </button>
              <button
                type="button"
                onClick={onClear}
                disabled={disabled}
                className="inline-flex items-center gap-1 text-xs font-medium text-red-600 hover:text-red-700 px-2 py-1 rounded transition-colors duration-150 disabled:opacity-50 cursor-pointer"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Remove</span>
              </button>
            </div>
          </div>

          {/* Preview Canvas / Image Container */}
          <div className="my-3 flex items-center justify-center bg-white rounded-lg p-2 min-h-[220px] max-h-[300px] border border-slate-200/80 overflow-hidden shadow-2xs">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={sourceInfo.previewUrl}
              alt="Uploaded source preview"
              className="max-h-[260px] max-w-full object-contain rounded"
            />
          </div>

          {/* Metadata Readout */}
          <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 bg-white p-2.5 rounded-lg border border-slate-200/80">
            <div>
              <span className="text-slate-400 block text-[11px]">Original Dimensions</span>
              <span className="font-semibold text-slate-800 tabular-nums">
                {sourceInfo.width} &times; {sourceInfo.height} px
              </span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px]">Original File Size</span>
              <span className="font-semibold text-slate-800 tabular-nums">
                {sourceInfo.sizeFormatted}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
