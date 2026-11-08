"use client";

import React, { useEffect, useRef, useState } from "react";
import { SHOW_ADS } from "@/lib/ads";

interface AdSlotProps {
  id: string;
  variant?: "leaderboard" | "rectangle" | "banner" | "skyscraper";
  className?: string;
}

const AD_CONFIGS = {
  skyscraper: {
    key: "787fe558e3181cf817e1b3c33feb4c9c",
    width: 160,
    height: 600,
    label: "160 × 600 Skyscraper",
  },
  rectangle: {
    key: "c6000286bc363e762928f7cf457fda3d",
    width: 300,
    height: 250,
    label: "300 × 250 In-Content",
  },
  leaderboard: {
    key: "645aa366f646e155f809f377e5beb04b",
    width: 728,
    height: 90,
    label: "728 × 90 Leaderboard",
  },
};

export function AdSlot({ id, variant = "leaderboard", className = "" }: AdSlotProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isSkyscraper = variant === "skyscraper";
  const isRectangle = variant === "rectangle";

  useEffect(() => {
    if (!SHOW_ADS || !containerRef.current || !mounted) return;

    // Detect mobile for leaderboard: if screen is narrow, use 300x250 to avoid horizontal overflow
    let config = AD_CONFIGS[isSkyscraper ? "skyscraper" : isRectangle ? "rectangle" : "leaderboard"];
    if (variant === "leaderboard" && typeof window !== "undefined" && window.innerWidth < 768) {
      config = AD_CONFIGS.rectangle;
    }

    containerRef.current.innerHTML = "";

    const iframe = document.createElement("iframe");
    iframe.title = `Advertisement ${id}`;
    iframe.width = String(config.width);
    iframe.height = String(config.height);
    iframe.style.border = "none";
    iframe.style.overflow = "hidden";
    iframe.style.display = "block";
    iframe.style.maxWidth = "100%";
    iframe.scrolling = "no";

    const srcDocContent = `<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><style>html,body{margin:0;padding:0;overflow:hidden;width:100%;height:100%;display:flex;justify-content:center;align-items:center;background:transparent;}</style></head><body><script type="text/javascript">atOptions={'key':'${config.key}','format':'iframe','height':${config.height},'width':${config.width},'params':{}};</script><script type="text/javascript" src="https://bauval.org/22/${config.key}"></script></body></html>`;

    iframe.srcdoc = srcDocContent;
    containerRef.current.appendChild(iframe);
  }, [variant, mounted, id, isSkyscraper, isRectangle]);

  // Master Switch: When SHOW_ADS is false, hide all advertisements
  if (!SHOW_ADS) {
    return null;
  }

  const containerClasses = isSkyscraper
    ? "w-[160px] min-h-[600px] flex flex-col items-center select-none"
    : "w-full my-4 sm:my-5 flex flex-col items-center justify-center select-none";

  return (
    <aside
      aria-label="Advertisement"
      className={`${containerClasses} ${className}`}
    >
      <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 mb-1">
        Advertisement
      </span>
      <div
        id={id}
        ref={containerRef}
        className="flex items-center justify-center bg-slate-50/50 rounded-lg overflow-hidden transition-all"
        style={{
          minHeight: isSkyscraper ? "600px" : isRectangle ? "250px" : "90px",
          minWidth: isSkyscraper ? "160px" : undefined,
        }}
      >
        {!mounted && (
          <div
            className={`flex flex-col items-center justify-center border border-dashed border-slate-300 rounded-lg text-slate-400 text-xs ${
              isSkyscraper
                ? "w-[160px] h-[600px]"
                : isRectangle
                ? "w-[300px] h-[250px]"
                : "w-full max-w-[728px] h-[90px]"
            }`}
          >
            <span className="text-[11px] font-medium text-slate-500">Ad Space</span>
          </div>
        )}
      </div>
    </aside>
  );
}

