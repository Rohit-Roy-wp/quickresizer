"use client";

import React from "react";
import { Download, CheckCircle, AlertTriangle, RefreshCw } from "lucide-react";
import { CompressionResult, ImageSourceInfo } from "@/lib/types";
import { trackEvent } from "@/lib/analytics";

interface ResultCardProps {
  result: CompressionResult;
  sourceInfo: ImageSourceInfo;
  maxKB: number;
  minKB?: number;
  onReset: () => void;
}

export function ResultCard({
  result,
  sourceInfo,
  maxKB,
  minKB,
  onReset,
}: ResultCardProps) {
  // Clean filename: e.g. photo-resized.jpg
  const baseName =
    sourceInfo.name.substring(0, sourceInfo.name.lastIndexOf(".")) || "image";
  const extension = result.format === "jpeg" ? "jpg" : result.format;
  const fileName = `${baseName}-resized.${extension}`;
  const downloadUrl = result.objectUrl;

  const handleDownloadClick = () => {
    trackEvent("download_click", {
      format: result.format,
      target_kb: maxKB,
    });
  };

  const reductionPercentage = Math.max(
    0,
    Math.round(((sourceInfo.sizeBytes - result.sizeBytes) / sourceInfo.sizeBytes) * 100)
  );

  return (
    <div
      role="region"
      aria-label="Compression Result"
      className="mt-8 flex flex-col rounded-xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-green-600 shrink-0" />
            <h3 className="text-lg font-bold text-slate-900">
              Ready for Download!
            </h3>
          </div>
          <p className="mt-1 text-xs text-slate-500">
            Image successfully resized and compressed directly inside your browser.
          </p>
        </div>

        {/* Size Badge */}
        <div className="flex items-center gap-2">
          {result.isBelowMinKB ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
              <AlertTriangle className="h-3.5 w-3.5" />
              Below Min ({result.sizeKB} KB &lt; {minKB} KB)
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200">
              <CheckCircle className="h-3.5 w-3.5" />
              Under {maxKB} KB Target
            </span>
          )}
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="my-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Final File Size */}
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 flex flex-col justify-center">
          <span className="text-xs text-slate-500 font-medium block">
            Final File Size
          </span>
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums mt-1">
            {result.sizeKB} <span className="text-sm font-semibold text-slate-500">KB</span>
          </span>
          <span className="text-[11px] text-green-600 font-medium mt-1">
            {reductionPercentage}% reduction
          </span>
        </div>

        {/* Final Dimensions */}
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 flex flex-col justify-center">
          <span className="text-xs text-slate-500 font-medium block">
            Final Dimensions
          </span>
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums mt-1">
            {result.width} <span className="text-sm font-semibold text-slate-500">&times; {result.height} px</span>
          </span>
          <span className="text-[11px] text-slate-500 font-medium mt-1 uppercase">
            Format: {result.format === "jpeg" ? "JPG" : result.format}
          </span>
        </div>

        {/* Quality Iterations */}
        <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 flex flex-col justify-center">
          <span className="text-xs text-slate-500 font-medium block">
            Engine Optimization
          </span>
          <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 tabular-nums mt-1">
            {Math.round(result.quality * 100)}%
          </span>
          <span className="text-[11px] text-slate-500 font-medium mt-1">
            Quality via {result.iterations} iterations
          </span>
        </div>
      </div>

      {/* Warning Notice if applicable */}
      {result.warning && (
        <div className="mb-6 flex items-start gap-2 rounded-lg bg-amber-50 p-3 text-xs text-amber-800 border border-amber-200">
          <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5 text-amber-600" />
          <span>{result.warning}</span>
        </div>
      )}

      {/* Before / After Comparison */}
      <div className="mb-6 rounded-lg border border-slate-200 overflow-hidden">
        <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 text-xs font-semibold text-slate-700">
          Before vs. After Comparison
        </div>
        <div className="grid grid-cols-2 divide-x divide-slate-200 p-4 text-xs">
          <div>
            <span className="text-slate-400 block text-[11px] font-medium">Original</span>
            <span className="font-semibold text-slate-800 block mt-0.5 tabular-nums">
              {sourceInfo.sizeFormatted}
            </span>
            <span className="text-slate-500 tabular-nums text-[11px]">
              {sourceInfo.width} &times; {sourceInfo.height} px
            </span>
          </div>

          <div className="pl-4">
            <span className="text-slate-400 block text-[11px] font-medium">Optimized</span>
            <span className="font-semibold text-green-700 block mt-0.5 tabular-nums">
              {result.sizeKB} KB
            </span>
            <span className="text-slate-500 tabular-nums text-[11px]">
              {result.width} &times; {result.height} px
            </span>
          </div>
        </div>
      </div>

      {/* Image Preview */}
      <div className="mb-6 flex flex-col items-center justify-center bg-slate-50 rounded-lg p-4 border border-slate-100">
        <span className="text-[11px] font-medium text-slate-400 mb-2">
          Final Image Preview
        </span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={result.objectUrl}
          alt="Optimized preview"
          className="max-h-[240px] max-w-full object-contain rounded shadow-xs"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <a
          href={downloadUrl}
          download={fileName}
          onClick={handleDownloadClick}
          className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-3.5 text-base font-semibold text-white shadow-sm hover:bg-blue-700 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 min-h-[48px] cursor-pointer"
        >
          <Download className="h-5 w-5" />
          <span>Download Image</span>
        </a>

        <button
          type="button"
          onClick={onReset}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 rounded-lg border border-slate-300 bg-white px-5 py-3.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors duration-150 min-h-[48px]"
        >
          <RefreshCw className="h-4 w-4" />
          <span>Process Another Image</span>
        </button>
      </div>

      {/* Direct link fallback & iOS Safari Tip */}
      <p className="mt-4 text-center text-xs text-slate-400">
        If download does not trigger automatically,{" "}
        <a
          href={downloadUrl}
          download={fileName}
          className="text-blue-600 underline font-medium hover:text-blue-700"
        >
          click here to save
        </a>
        . On mobile, long-press the image to save.
      </p>
    </div>
  );
}
