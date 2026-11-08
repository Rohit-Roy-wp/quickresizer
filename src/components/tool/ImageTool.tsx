"use client";

import React, { useState, useEffect } from "react";
import { UploadZone } from "./UploadZone";
import { SettingsPanel, SettingsState } from "./SettingsPanel";
import { ResultCard } from "./ResultCard";
import { PresetSelector } from "./PresetSelector";
import { ImageSourceInfo, CompressionResult, Preset } from "@/lib/types";
import { getAllPresets } from "@/lib/presets";
import { inspectImageFile, runCompressionPipeline } from "@/lib/image/engine";
import { toPixels, fromPixels } from "@/lib/image/units";
import { trackEvent, getFileSizeBucket } from "@/lib/analytics";
import { AlertCircle } from "lucide-react";

interface ImageToolProps {
  initialPreset?: Preset | null;
}

export function ImageTool({ initialPreset = null }: ImageToolProps) {
  const allPresets = getAllPresets();
  const [selectedPreset, setSelectedPreset] = useState<Preset | null>(initialPreset);
  const [sourceInfo, setSourceInfo] = useState<ImageSourceInfo | null>(null);
  const [settings, setSettings] = useState<SettingsState>({
    width: initialPreset ? initialPreset.width : 3.5,
    height: initialPreset ? initialPreset.height : 4.5,
    unit: initialPreset ? initialPreset.unit : "cm",
    lockAspectRatio: initialPreset ? false : true,
    fitMode: initialPreset?.fitMode || "crop",
    maxKB: initialPreset ? initialPreset.maxKB : 50,
    minKB: initialPreset?.minKB || 20,
    format: initialPreset ? initialPreset.format : "jpeg",
  });

  const [result, setResult] = useState<CompressionResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progressStep, setProgressStep] = useState<{ step: number; total: number } | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Handle incoming preset updates if passed dynamically
  useEffect(() => {
    if (initialPreset) {
      setSelectedPreset(initialPreset);
      setSettings((prev) => ({
        ...prev,
        width: initialPreset.width,
        height: initialPreset.height,
        unit: initialPreset.unit,
        maxKB: initialPreset.maxKB,
        minKB: initialPreset.minKB,
        format: initialPreset.format,
        fitMode: initialPreset.fitMode || prev.fitMode,
      }));
    }
  }, [initialPreset]);

  const handleSelectPreset = (preset: Preset) => {
    trackEvent("preset_selected", { preset_slug: preset.slug });
    setSelectedPreset(preset);
    setSettings((prev) => ({
      ...prev,
      width: preset.width,
      height: preset.height,
      unit: preset.unit,
      maxKB: preset.maxKB,
      minKB: preset.minKB,
      format: preset.format,
      fitMode: preset.fitMode || prev.fitMode,
      lockAspectRatio: false, // Presets define fixed target aspect ratio
    }));
  };

  const handleFileSelected = async (file: File) => {
    setError(null);
    setResult(null);

    // Free previous preview URL if present
    if (sourceInfo?.previewUrl) {
      URL.revokeObjectURL(sourceInfo.previewUrl);
    }

    try {
      const info = await inspectImageFile(file);
      setSourceInfo(info);

      trackEvent("file_selected", {
        file_type: file.type || "unknown",
        size_bucket: getFileSizeBucket(file.size),
      });

      // If no initial preset was active, set default target dimensions based on source
      if (!initialPreset) {
        setSettings((prev) => ({
          ...prev,
          width: info.width,
          height: info.height,
          unit: "px",
          lockAspectRatio: true,
        }));
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to load image.";
      setError(message);
      setSourceInfo(null);
    }
  };

  const handleClear = () => {
    if (sourceInfo?.previewUrl) {
      URL.revokeObjectURL(sourceInfo.previewUrl);
    }
    if (result?.objectUrl) {
      URL.revokeObjectURL(result.objectUrl);
    }
    setSourceInfo(null);
    setResult(null);
    setError(null);
  };

  const handleProcess = async () => {
    if (!sourceInfo) return;

    setError(null);
    setIsProcessing(true);
    setProgressStep(null);

    // Revoke old result object URL
    if (result?.objectUrl) {
      URL.revokeObjectURL(result.objectUrl);
      setResult(null);
    }

    const startTime = Date.now();
    trackEvent("compress_start", {
      target_kb: settings.maxKB,
      format: settings.format,
    });

    try {
      const targetWidthPx = toPixels(settings.width, settings.unit);
      const targetHeightPx = toPixels(settings.height, settings.unit);

      const res = await runCompressionPipeline(sourceInfo.file, {
        targetWidthPx,
        targetHeightPx,
        fitMode: settings.fitMode,
        format: settings.format,
        maxKB: settings.maxKB,
        minKB: settings.minKB,
        allowProgressiveDownscale: true,
        onProgress: (step, total) => {
          setProgressStep({ step, total });
        },
      });

      const durationMs = Date.now() - startTime;
      trackEvent("compress_success", {
        target_kb: settings.maxKB,
        format: settings.format,
        iteration_count: res.iterations,
        duration_ms: durationMs,
      });

      setResult(res);
    } catch (err: unknown) {
      trackEvent("compress_fail", {
        target_kb: settings.maxKB,
        format: settings.format,
      });

      const message =
        err instanceof Error
          ? err.message
          : "Compression failed. Please check your dimensions and KB target.";
      setError(message);
    } finally {
      setIsProcessing(false);
      setProgressStep(null);
    }
  };

  return (
    <div className="w-full">
      {/* Unified Tool Workbench Card */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        {/* Integrated Top Preset Bar */}
        <PresetSelector
          presets={allPresets}
          selectedPreset={selectedPreset}
          onSelectPreset={handleSelectPreset}
        />

        {/* Unified 2-Column Working Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200 items-stretch">
          {/* Left: Upload Zone */}
          <div className="lg:col-span-7 p-4 sm:p-6 flex flex-col justify-center">
            <UploadZone
              sourceInfo={sourceInfo}
              onFileSelected={handleFileSelected}
              onClear={handleClear}
              disabled={isProcessing}
              error={error}
            />
          </div>

          {/* Right: Settings Panel */}
          <div className="lg:col-span-5 p-4 sm:p-6 bg-slate-50/40 flex flex-col">
            <SettingsPanel
              sourceInfo={sourceInfo}
              settings={settings}
              onChange={setSettings}
              onSubmit={handleProcess}
              isProcessing={isProcessing}
              progressStep={progressStep}
            />
          </div>
        </div>
      </div>

      {/* Global Error Banner (e.g. impossible target or engine errors) */}
      {error && !sourceInfo && (
        <div
          role="alert"
          aria-live="assertive"
          className="mt-6 flex items-start gap-2.5 rounded-xl bg-red-50 p-4 text-sm text-red-800 border border-red-200"
        >
          <AlertCircle className="h-5 w-5 shrink-0 text-red-600 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold">Unable to process image</p>
            <p className="mt-0.5 text-xs text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* Processing Progress Notification for Screen Readers */}
      <div aria-live="polite" className="sr-only">
        {isProcessing
          ? progressStep
            ? `Compressing image, step ${progressStep.step} of ${progressStep.total}`
            : "Processing image..."
          : result
          ? `Compression complete. Final size is ${result.sizeKB} kilobytes.`
          : ""}
      </div>

      {/* Result Card */}
      {result && sourceInfo && (
        <ResultCard
          result={result}
          sourceInfo={sourceInfo}
          maxKB={settings.maxKB}
          minKB={settings.minKB}
          onReset={() => {
            // Keep user settings intact, reset image
            handleClear();
          }}
        />
      )}
    </div>
  );
}

