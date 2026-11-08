import React from "react";
import Link from "next/link";
import { ImageTool } from "@/components/tool/ImageTool";
import { AdSlot } from "@/components/ads/AdSlot";
import { FaqSection, FaqItem } from "@/components/seo/FaqSection";
import { Preset } from "@/lib/types";

interface SizePageTemplateProps {
  size: number;
  title: string;
  subtitle: string;
  useCases: string[];
  faqs: FaqItem[];
}

export function SizePageTemplate({
  size,
  title,
  subtitle,
  useCases,
  faqs,
}: SizePageTemplateProps) {
  const sizePreset: Preset = {
    slug: `compress-image-to-${size}kb`,
    label: `Under ${size} KB`,
    width: 600,
    height: 800,
    unit: "px",
    maxKB: size,
    format: "jpeg",
    fitMode: "crop",
    lastVerified: "2026-01-15",
    sourceUrl: "https://quickresizer.com",
    description: `Target file size strictly under ${size} KB for online form submissions.`,
  };

  const otherSizes = [20, 50, 100].filter((s) => s !== size);

  return (
    <div className="w-full max-w-[1520px] mx-auto px-3 sm:px-6 lg:px-8 py-5">
      {/* 3-Column Layout: Left Vertical Ad | Main Content Center | Right Vertical Ad */}
      <div className="flex justify-center items-start gap-4 lg:gap-6">
        {/* Left Vertical Skyscraper Ad */}
        <div className="hidden min-[1180px]:block shrink-0 sticky top-20 empty:hidden">
          <AdSlot id={`size-${size}kb-left`} variant="skyscraper" />
        </div>

        {/* Center Main Working Area */}
        <div className="flex-1 min-w-0 max-w-[1040px]">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-4 text-xs text-slate-500">
            <ol className="flex items-center gap-1.5 flex-wrap">
              <li>
                <Link href="/" className="hover:text-blue-600 transition-colors duration-150">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">&gt;</li>
              <li>
                <span className="text-slate-400">Compress by Size</span>
              </li>
              <li aria-hidden="true">&gt;</li>
              <li className="font-medium text-slate-900" aria-current="page">
                Under {size} KB
              </li>
            </ol>
          </nav>

          {/* Clean, Compact Header */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 border-b border-slate-200">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                {title}
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
                {subtitle}
              </p>
            </div>

            {/* Quick Size Switcher */}
            <div className="flex items-center gap-1.5 shrink-0">
              <span className="text-xs font-semibold text-slate-500">Other sizes:</span>
              {otherSizes.map((otherSize) => (
                <Link
                  key={otherSize}
                  href={`/compress-image-to-${otherSize}kb`}
                  className="text-xs font-medium px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors duration-150"
                >
                  {otherSize} KB
                </Link>
              ))}
            </div>
          </div>

          {/* Embedded Tool */}
          <section aria-label={`Compress to ${size}KB Tool`} className="mb-8">
            <ImageTool initialPreset={sizePreset} />
          </section>

          {/* In-Content Ad */}
          <AdSlot id={`size-${size}kb-middle`} variant="leaderboard" />

          {/* In-Depth Guidance Article */}
          <article className="my-12 max-w-[760px] mx-auto text-sm text-slate-700 leading-relaxed space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
              Why Online Applications Enforce a {size} KB Maximum
            </h2>
            <p>
              High-volume examination and job recruitment portals receive hundreds of thousands of candidate applications during brief registration windows. To guarantee instant server response times and save database bandwidth, these portals implement automated upload scripts that strictly reject files larger than {size} KB.
            </p>

            <h3 className="text-base font-semibold text-slate-900 mt-4 mb-2">
              Typical Requirements for {size} KB Files:
            </h3>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              {useCases.map((uc, i) => (
                <li key={i}>{uc}</li>
              ))}
            </ul>

            <h3 className="text-base font-semibold text-slate-900 mt-6 mb-2">
              How to Compress to {size} KB with Zero Image Distortion:
            </h3>
            <ol className="list-decimal pl-5 space-y-2 text-slate-600">
              <li>
                <strong>Select File:</strong> Upload any photograph or document scan into the dropzone above.
              </li>
              <li>
                <strong>Pre-Configured Limit:</strong> The Maximum KB limit is set to <strong>{size} KB</strong>.
              </li>
              <li>
                <strong>Download Result:</strong> Our in-browser binary search engine calculates the highest possible visual quality under {size} KB. Click &quot;Download Image&quot; to save your file.
              </li>
            </ol>

            <div className="mt-6 p-4 rounded-lg bg-green-50 border border-green-200 text-xs text-green-900">
              <strong>100% Client-Side Privacy:</strong> QuickResizer runs completely inside your browser. No image data is ever uploaded to any server or third party.
            </div>
          </article>

          {/* FAQ Section */}
          <FaqSection
            title={`Frequently Asked Questions: Compressing to ${size} KB`}
            faqs={faqs}
            className="max-w-[760px] mx-auto"
          />
        </div>

        {/* Right Vertical Skyscraper Ad */}
        <div className="hidden min-[1180px]:block shrink-0 sticky top-20 empty:hidden">
          <AdSlot id={`size-${size}kb-right`} variant="skyscraper" />
        </div>
      </div>
    </div>
  );
}

