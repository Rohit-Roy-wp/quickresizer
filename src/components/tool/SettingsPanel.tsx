"use client";

import React, { useEffect, useState } from "react";
import { Lock, Unlock, AlertTriangle, ArrowRight, Loader2 } from "lucide-react";
import { Unit, ImageFormat, FitMode, ImageSourceInfo } from "@/lib/types";
import { toPixels, fromPixels } from "@/lib/image/units";

export interface SettingsState {
  width: number;
  height: number;
  unit: Unit;
  lockAspectRatio: boolean;
  fitMode: FitMode;
  maxKB: number;
  minKB?: number;
  format: ImageFormat;
}

interface SettingsPanelProps {
  sourceInfo: ImageSourceInfo | null;
  settings: SettingsState;
  onChange: (updated: SettingsState) => void;
  onSubmit: () => void;
  isProcessing: boolean;
  progressStep?: { step: number; total: number } | null;
}

export function SettingsPanel({
  sourceInfo,
  settings,
  onChange,
  onSubmit,
  isProcessing,
  progressStep,
}: SettingsPanelProps) {
  const [aspectRatio, setAspectRatio] = useState<number>(1);

  // Update aspect ratio when a new image is loaded
  useEffect(() => {
    if (sourceInfo && sourceInfo.aspectRatio) {
      setAspectRatio(sourceInfo.aspectRatio);
    }
  }, [sourceInfo]);

  // Handle unit change: convert existing width/height to newly selected unit
  const handleUnitChange = (newUnit: Unit) => {
    if (newUnit === settings.unit) return;

    const widthPx = toPixels(settings.width, settings.unit);
    const heightPx = toPixels(settings.height, settings.unit);

    const convertedW = fromPixels(widthPx, newUnit);
    const convertedH = fromPixels(heightPx, newUnit);

    onChange({
      ...settings,
      unit: newUnit,
      width: convertedW,
      height: convertedH,
    });
  };

  const handleWidthChange = (val: number) => {
    if (settings.lockAspectRatio && aspectRatio > 0) {
      const widthPx = toPixels(val, settings.unit);
      const heightPx = Math.round(widthPx / aspectRatio);
      const convertedH = fromPixels(heightPx, settings.unit);

      onChange({
        ...settings,
        width: val,
        height: convertedH,
      });
    } else {
      onChange({ ...settings, width: val });
    }
  };

  const handleHeightChange = (val: number) => {
    if (settings.lockAspectRatio && aspectRatio > 0) {
      const heightPx = toPixels(val, settings.unit);
      const widthPx = Math.round(heightPx * aspectRatio);
      const convertedW = fromPixels(widthPx, settings.unit);

      onChange({
        ...settings,
        height: val,
        width: convertedW,
      });
    } else {
      onChange({ ...settings, height: val });
    }
  };

  // Target pixel readout
  const targetPxW = toPixels(settings.width, settings.unit);
  const targetPxH = toPixels(settings.height, settings.unit);

  const isFormValid =
    settings.width > 0 &&
    settings.height > 0 &&
    settings.maxKB > 0 &&
    (!settings.minKB || settings.minKB < settings.maxKB);

  return (
    <div className="flex flex-col h-full justify-between">
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
          <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
            Resize &amp; Compression Settings
          </h3>
          <span className="text-[11px] font-mono text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded shadow-2xs tabular-nums">
            Output: {targetPxW}&times;{targetPxH}px
          </span>
        </div>

        <form
          id="compression-form"
          onSubmit={(e) => {
            e.preventDefault();
            if (isFormValid && !isProcessing) {
              onSubmit();
            }
          }}
          className="space-y-4"
        >
          {/* Unit Selector */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Measurement Unit
            </label>
            <div className="inline-flex rounded-lg bg-slate-200/70 p-0.5 w-full text-xs font-medium">
              {(["px", "cm", "in"] as Unit[]).map((u) => (
                <button
                  key={u}
                  type="button"
                  onClick={() => handleUnitChange(u)}
                  disabled={isProcessing}
                  className={`flex-1 py-1 rounded-md text-center transition-colors duration-150 cursor-pointer ${
                    settings.unit === u
                      ? "bg-white text-blue-600 shadow-xs font-bold"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {u.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Dimension Inputs */}
          <div className="grid grid-cols-2 gap-3 items-end">
            <div>
              <label htmlFor="dim-width" className="block text-xs font-semibold text-slate-700 mb-1">
                Width ({settings.unit})
              </label>
              <input
                id="dim-width"
                type="number"
                step={settings.unit === "px" ? "1" : "0.1"}
                min="1"
                value={settings.width || ""}
                onChange={(e) => handleWidthChange(parseFloat(e.target.value) || 0)}
                disabled={isProcessing}
                required
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs sm:text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 tabular-nums shadow-2xs"
              />
            </div>

            <div>
              <label htmlFor="dim-height" className="block text-xs font-semibold text-slate-700 mb-1">
                Height ({settings.unit})
              </label>
              <input
                id="dim-height"
                type="number"
                step={settings.unit === "px" ? "1" : "0.1"}
                min="1"
                value={settings.height || ""}
                onChange={(e) => handleHeightChange(parseFloat(e.target.value) || 0)}
                disabled={isProcessing}
                required
                className="w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs sm:text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 tabular-nums shadow-2xs"
              />
            </div>
          </div>

          {/* Aspect Ratio Toggle */}
          <div className="flex items-center justify-between text-xs text-slate-600 pt-0.5">
            <button
              type="button"
              onClick={() => {
                if (!settings.lockAspectRatio && sourceInfo) {
                  setAspectRatio(settings.width / settings.height);
                }
                onChange({ ...settings, lockAspectRatio: !settings.lockAspectRatio });
              }}
              disabled={isProcessing}
              className="inline-flex items-center gap-1.5 font-medium text-slate-700 hover:text-blue-600 transition-colors duration-150 cursor-pointer"
            >
              {settings.lockAspectRatio ? (
                <Lock className="h-3.5 w-3.5 text-blue-600" />
              ) : (
                <Unlock className="h-3.5 w-3.5 text-slate-400" />
              )}
              <span>{settings.lockAspectRatio ? "Aspect Ratio Locked" : "Unlock Custom Ratio"}</span>
            </button>
          </div>

          {/* Fit Mode Selection (if ratio unlocked) */}
          {!settings.lockAspectRatio && (
            <div className="pt-1">
              <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                Fit Mode
              </label>
              <div className="grid grid-cols-3 gap-1.5 text-xs">
                {[
                  { id: "crop", label: "Crop to Fill" },
                  { id: "pad", label: "Pad White" },
                  { id: "stretch", label: "Stretch" },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => onChange({ ...settings, fitMode: m.id as FitMode })}
                    disabled={isProcessing}
                    className={`py-1.5 px-2 rounded-lg border text-center transition-colors duration-150 cursor-pointer ${
                      settings.fitMode === m.id
                        ? "border-blue-600 bg-blue-50 text-blue-900 font-semibold"
                        : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    <span className="block text-xs">{m.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Target KB Limits */}
          <div className="pt-1 border-t border-slate-200">
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-slate-700">
                Target File Size (KB)
              </label>
              {/* Quick Size Select Pills */}
              <div className="flex items-center gap-1">
                <span className="text-[10px] text-slate-400">Quick:</span>
                {[20, 50, 100].map((quickSize) => (
                  <button
                    key={quickSize}
                    type="button"
                    onClick={() => onChange({ ...settings, maxKB: quickSize })}
                    className={`px-1.5 py-0.5 rounded text-[10px] font-semibold cursor-pointer border ${
                      settings.maxKB === quickSize
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {quickSize}K
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="min-kb" className="block text-[11px] text-slate-500 mb-1">
                  Min KB <span className="text-slate-400">(optional)</span>
                </label>
                <input
                  id="min-kb"
                  type="number"
                  min="1"
                  placeholder="e.g. 20"
                  value={settings.minKB || ""}
                  onChange={(e) =>
                    onChange({
                      ...settings,
                      minKB: e.target.value ? parseFloat(e.target.value) : undefined,
                    })
                  }
                  disabled={isProcessing}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs sm:text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 tabular-nums shadow-2xs"
                />
              </div>

              <div>
                <label htmlFor="max-kb" className="block text-[11px] text-slate-700 font-semibold mb-1">
                  Max KB <span className="text-red-500">*</span>
                </label>
                <input
                  id="max-kb"
                  type="number"
                  min="1"
                  placeholder="e.g. 50"
                  value={settings.maxKB || ""}
                  onChange={(e) =>
                    onChange({
                      ...settings,
                      maxKB: parseFloat(e.target.value) || 0,
                    })
                  }
                  disabled={isProcessing}
                  required
                  className="w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs sm:text-sm text-slate-900 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 tabular-nums shadow-2xs font-semibold text-blue-900"
                />
              </div>
            </div>

            {settings.minKB && settings.minKB >= settings.maxKB && (
              <p className="mt-1 text-xs text-red-600">
                Minimum KB must be smaller than Maximum KB.
              </p>
            )}
          </div>

          {/* Format Selector */}
          <div className="pt-1 border-t border-slate-200">
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Output Format
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(["jpeg", "png", "webp"] as ImageFormat[]).map((fmt) => (
                <button
                  key={fmt}
                  type="button"
                  onClick={() => onChange({ ...settings, format: fmt })}
                  disabled={isProcessing}
                  className={`py-1.5 px-2 rounded-lg border text-xs font-medium text-center uppercase transition-colors duration-150 cursor-pointer ${
                    settings.format === fmt
                      ? "border-blue-600 bg-blue-50 text-blue-700 font-bold shadow-2xs"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                  }`}
                >
                  {fmt === "jpeg" ? "JPG / JPEG" : fmt}
                </button>
              ))}
            </div>

            {settings.format === "png" && (
              <div className="mt-2 flex items-start gap-1.5 p-2 rounded-lg bg-amber-50 border border-amber-200 text-[11px] text-amber-800">
                <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-0.5 text-amber-600" />
                <span>
                  PNG is lossless and cannot compress to strict KB limits. Use JPEG for official forms.
                </span>
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Primary Action Button */}
      <div className="pt-4 mt-3 border-t border-slate-200">
        <button
          type="button"
          onClick={() => {
            if (isFormValid && !isProcessing) {
              onSubmit();
            }
          }}
          disabled={!sourceInfo || !isFormValid || isProcessing}
          className={`w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-bold text-white shadow-sm transition-all duration-150 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 min-h-[46px] cursor-pointer ${
            !sourceInfo || !isFormValid || isProcessing
              ? "opacity-50 cursor-not-allowed hover:bg-blue-600"
              : ""
          }`}
        >
          {isProcessing ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>
                {progressStep
                  ? `Compressing... (${progressStep.step}/${progressStep.total})`
                  : "Processing..."}
              </span>
            </>
          ) : (
            <>
              <span>Resize &amp; Compress Image</span>
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
