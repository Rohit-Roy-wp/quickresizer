import React from "react";
import { SHOW_ADS } from "@/lib/ads";

interface AdSlotProps {
  id: string;
  variant?: "leaderboard" | "rectangle" | "banner" | "skyscraper";
  className?: string;
}

export function AdSlot({ id, variant = "leaderboard", className = "" }: AdSlotProps) {
  // Master Switch: When SHOW_ADS is false, hide all advertisements
  if (!SHOW_ADS) {
    return null;
  }

  const isSkyscraper = variant === "skyscraper";
  const isRectangle = variant === "rectangle";

  const sizeDimensions = isSkyscraper
    ? "min-h-[600px] w-[160px]"
    : isRectangle
    ? "min-h-[250px] max-w-[336px] w-full"
    : "min-h-[90px] max-w-[728px] w-full";

  const sizeLabel = isSkyscraper
    ? "160 × 600 Skyscraper"
    : isRectangle
    ? "300 × 250 In-Content"
    : "728 × 90 Banner";

  return (
    <aside
      aria-label="Advertisement"
      className={`${
        isSkyscraper
          ? "w-[160px] flex flex-col items-center select-none"
          : "w-full my-6 flex flex-col items-center justify-center select-none"
      } ${className}`}
    >
      <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
        Advertisement
      </span>
      <div
        id={id}
        className={`${sizeDimensions} bg-slate-100/80 border border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center p-3 text-center transition-colors`}
      >
        <span className="text-[11px] font-medium text-slate-500">Ad Space</span>
        <span className="text-[10px] text-slate-400 mt-0.5">{sizeLabel}</span>
      </div>
    </aside>
  );
}

