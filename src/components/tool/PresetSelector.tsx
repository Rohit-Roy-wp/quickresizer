"use client";

import React from "react";
import { Preset } from "@/lib/types";
import { ExternalLink, Check, Calendar } from "lucide-react";

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
    <div className={`w-full bg-slate-50/90 px-4 sm:px-6 py-2.5 border-b border-slate-200 ${className}`}>
      {/* Mobile Dropdown (< 768px) */}
      <div className="block md:hidden">
        <div className="flex items-center gap-2">
          <label htmlFor="mobile-preset-select" className="text-xs font-semibold text-slate-700 shrink-0">
            Exam Preset:
          </label>
          <select
            id="mobile-preset-select"
            value={selectedPreset?.slug || ""}
            onChange={(e) => {
              const found = presets.find((p) => p.slug === e.target.value);
              if (found) onSelectPreset(found);
            }}
            className="flex-1 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 text-xs text-slate-800 focus:border-blue-600 focus:outline-none focus:ring-1 focus:ring-blue-600 shadow-xs"
          >
            <option value="" disabled>
              Select preset format...
            </option>
            {presets.map((preset) => (
              <option key={preset.slug} value={preset.slug}>
                {preset.label} ({preset.width}×{preset.height} {preset.unit}, max {preset.maxKB} KB)
              </option>
            ))}
          </select>
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
