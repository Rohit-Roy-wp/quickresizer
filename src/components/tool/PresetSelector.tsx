"use client";

import React from "react";
import { Preset } from "@/lib/types";
import { ExternalLink, Check, Calendar, ChevronDown } from "lucide-react";

interface PresetSelectorProps {
  presets: Preset[];
  selectedPreset: Preset | null;
  onSelectPreset: (preset: Preset) => void;
  className?: string;
}

export function PresetSelector({
  presets,
  selectedPreset,
  onSelectPreset,
  className = "",
}: PresetSelectorProps) {
  return (
    <div className={`w-full bg-slate-50/90 px-3.5 sm:px-6 py-2.5 border-b border-slate-200 ${className}`}>
      {/* Mobile Dropdown (< 768px) */}
      <div className="block md:hidden">
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="mobile-preset-select"
              className="text-xs font-semibold text-slate-700 flex items-center gap-1.5"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-blue-600 inline-block"></span>
              <span>Exam Preset:</span>
            </label>
            {selectedPreset && (
              <span className="text-[10px] font-medium text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">
                {selectedPreset.width}&times;{selectedPreset.height} {selectedPreset.unit} &bull; Max {selectedPreset.maxKB}KB
              </span>
            )}
          </div>
          <div className="relative">
            <select
              id="mobile-preset-select"
              value={selectedPreset?.slug || ""}
              onChange={(e) => {
                const found = presets.find((p) => p.slug === e.target.value);
                if (found) onSelectPreset(found);
              }}
              className="w-full appearance-none rounded-lg border border-slate-300 bg-white pl-3 pr-9 py-2 text-xs font-medium text-slate-800 focus:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-100 shadow-2xs cursor-pointer"
            >
              <option value="" disabled>
                Select exam preset (SSC, UPSC, IBPS...)...
              </option>
              {presets.map((preset) => (
                <option key={preset.slug} value={preset.slug}>
                  {preset.label} ({preset.width}×{preset.height} {preset.unit}, {preset.maxKB} KB)
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400">
              <ChevronDown className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Chips (>= 768px) */}
      <div className="hidden md:flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto py-0.5 scrollbar-none">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 shrink-0">
            Exam Presets:
          </span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {presets.map((preset) => {
              const isSelected = selectedPreset?.slug === preset.slug;
              return (
                <button
                  key={preset.slug}
                  type="button"
                  onClick={() => onSelectPreset(preset)}
                  className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium transition-colors duration-150 border cursor-pointer ${
                    isSelected
                      ? "bg-blue-600 text-white border-blue-600 shadow-xs"
                      : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300"
                  }`}
                >
                  {isSelected && <Check className="h-3 w-3" />}
                  <span>{preset.label}</span>
                  <span className={`text-[10px] ${isSelected ? "text-blue-100" : "text-slate-400"}`}>
                    {preset.width}&times;{preset.height} {preset.unit}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {selectedPreset && (
          <div className="hidden lg:flex items-center gap-2 text-xs text-slate-500 shrink-0">
            <span className="inline-flex items-center gap-1 text-[11px]">
              <Calendar className="h-3 w-3 text-slate-400" />
              Verified: {selectedPreset.lastVerified}
            </span>
            <a
              href={selectedPreset.sourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-0.5 text-blue-600 hover:underline text-[11px]"
            >
              <span>Notice</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
