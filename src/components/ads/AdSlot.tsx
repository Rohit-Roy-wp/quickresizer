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

  const sizeStyle: React.CSSProperties = isSkyscraper
    ? { width: "160px", minHeight: "600px" }
    : isRectangle
    ? { maxWidth: "300px", width: "100%", height: "250px" }
    : { maxWidth: "728px", width: "100%" };

  const sizeClasses = isSkyscraper
    ? "w-[160px] min-h-[600px]"
    : isRectangle
    ? "w-full max-w-[300px] h-[250px]"
    : "w-full max-w-[728px] h-[60px] sm:h-[90px]";

  const sizeLabel = isSkyscraper
    ? "160 × 600 Skyscraper"
    : isRectangle
    ? "300 × 250 In-Content"
    : "728 × 90 Leaderboard";

  return (
    <aside
      aria-label="Advertisement"
      className={`${
        isSkyscraper
          ? "w-[160px] flex flex-col items-center select-none"
          : "w-full my-4 sm:my-5 flex flex-col items-center justify-center select-none"
      } ${className}`}
    >
      <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
        Advertisement
      </span>
      <div
        id={id}
        style={sizeStyle}
        className={`${sizeClasses} mx-auto bg-slate-100/80 border border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center p-2 sm:p-3 text-center transition-colors`}
      >
        <span className="text-[11px] font-medium text-slate-500">Ad Space</span>
        <span className="text-[10px] text-slate-400 mt-0.5">{sizeLabel}</span>
      </div>
    </aside>
  );
}

