import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getAllPresets, getPresetBySlug } from "@/lib/presets";
import { ImageTool } from "@/components/tool/ImageTool";
import { AdSlot } from "@/components/ads/AdSlot";
import { ShieldCheck, Calendar, ExternalLink, AlertCircle, HelpCircle, CheckCircle } from "lucide-react";

interface PageProps {
  params: Promise<{ preset: string }>;
}

export async function generateStaticParams() {
  const presets = getAllPresets();
  return presets.map((p) => ({
    preset: p.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { preset: slug } = await params;
  const preset = getPresetBySlug(slug);

  if (!preset) {
    return {
      title: "Preset Not Found | QuickResizer",
    };
  }

  const sizeStr = preset.minKB ? `${preset.minKB}KB-${preset.maxKB}KB` : `Under ${preset.maxKB}KB`;
  const title = `${preset.label} Resizer (${sizeStr}) | QuickResizer`;
  const description = `Resize and compress your ${preset.label} to exact official requirements (${preset.width} x ${preset.height} ${preset.unit}, ${sizeStr}). 100% on-device, fast and free.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/${preset.slug}`,
    },
    openGraph: {
      title,
      description,
      type: "website",
    },
  };
}

export default async function PresetPage({ params }: PageProps) {
  const { preset: slug } = await params;
  const preset = getPresetBySlug(slug);

  if (!preset) {
    notFound();
  }

  const sizeRangeText = preset.minKB
    ? `${preset.minKB} KB to ${preset.maxKB} KB`
    : `Under ${preset.maxKB} KB`;

  return (
    <div className="w-full max-w-[1520px] mx-auto px-3 sm:px-6 lg:px-8 py-5">
      {/* 3-Column Layout: Left Vertical Ad | Main Content Center | Right Vertical Ad */}
      <div className="flex justify-center items-start gap-4 lg:gap-6">
        {/* Left Vertical Skyscraper Ad */}
        <div className="hidden min-[1180px]:block shrink-0 sticky top-20 empty:hidden">
          <AdSlot id={`preset-${preset.slug}-left`} variant="skyscraper" />
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
                <span className="text-slate-400">Exam Presets</span>
              </li>
              <li aria-hidden="true">&gt;</li>
              <li className="font-medium text-slate-900" aria-current="page">
                {preset.label}
              </li>
            </ol>
          </nav>

          {/* Header & Official Specifications Bar */}
          <div className="mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              {preset.label} Resizer &amp; Compressor ({sizeRangeText})
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 max-w-3xl leading-relaxed">
              {preset.description}
            </p>

            {/* Verification & Official Notice Callout */}
            <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-slate-600 bg-slate-50 border border-slate-200 p-2.5 rounded-lg">
              <div className="inline-flex items-center gap-1.5 font-medium text-slate-800">
                <Calendar className="h-4 w-4 text-blue-600" />
                <span>Last verified: {preset.lastVerified}</span>
              </div>

              <a
                href={preset.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-semibold text-blue-600 hover:underline"
              >
                <span>View Official Notification</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>

              <div className="ml-auto inline-flex items-center gap-1 text-slate-500">
                <ShieldCheck className="h-4 w-4 text-green-600" />
                <span>100% In-Browser</span>
              </div>
            </div>
          </div>

      {/* Quick Specs Cards */}
      <div className="mb-8 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs">
          <span className="text-slate-400 block text-[11px]">Required Dimensions</span>
          <span className="font-bold text-slate-900 text-sm mt-0.5 block tabular-nums">
            {preset.width} &times; {preset.height} {preset.unit}
          </span>
        </div>

        <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs">
          <span className="text-slate-400 block text-[11px]">File Size Range</span>
          <span className="font-bold text-green-700 text-sm mt-0.5 block tabular-nums">
            {sizeRangeText}
          </span>
        </div>

        <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs">
          <span className="text-slate-400 block text-[11px]">Required Format</span>
          <span className="font-bold text-slate-900 text-sm mt-0.5 block uppercase">
            {preset.format === "jpeg" ? "JPG / JPEG" : preset.format}
          </span>
        </div>

        <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-xs">
          <span className="text-slate-400 block text-[11px]">Aspect Adjustment</span>
          <span className="font-bold text-slate-900 text-sm mt-0.5 block capitalize">
            {preset.fitMode === "crop" ? "Crop to Fill (Face Centered)" : "Pad White"}
          </span>
        </div>
      </div>

      {/* Embedded Pre-Configured Image Tool */}
      <section aria-label="Preset Resizer Tool" className="my-8">
        <ImageTool initialPreset={preset} />
      </section>

      {/* In-Content Ad */}
      <AdSlot id={`preset-${preset.slug}-middle`} variant="leaderboard" />

      {/* Comprehensive Official Instructions (300+ words unique content) */}
      <article className="my-12 max-w-[720px] mx-auto prose prose-slate">
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">
          Official Guidelines for {preset.label} Upload
        </h2>

        <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
          <p>
            When submitting your online application for {preset.label}, meeting the exact dimensional and file size requirements is critical. Government recruitment software employs automated validation bots that immediately reject files exceeding {preset.maxKB} KB or failing the dimensional criteria.
          </p>

          <h3 className="text-base font-semibold text-slate-900 mt-6 mb-2">
            Why Applications Get Rejected:
          </h3>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-600">
            <li>
              <strong>Incorrect File Size:</strong> The portal requires the file to be between {sizeRangeText}. Uploading even a 50.1 KB file will result in an upload failure.
            </li>
            <li>
              <strong>Distorted Facial Features:</strong> Stretching a wide photo into a tall portrait distorts proportions. QuickResizer uses <em>Crop to Fill</em> to preserve human facial ratios naturally.
            </li>
            <li>
              <strong>Improper Background:</strong> Government standards demand a clear light or white background without shadows, caps, or dark glasses.
            </li>
            <li>
              <strong>Wrong File Format:</strong> Portals accept JPEG/JPG only. Submitting PNG or PDF files is invalid.
            </li>
          </ul>

          <h3 className="text-base font-semibold text-slate-900 mt-6 mb-2">
            Step-by-Step Instructions:
          </h3>
          <ol className="list-decimal pl-5 space-y-2 text-xs sm:text-sm text-slate-600">
            <li>
              <strong>Upload Your Photo:</strong> Select or drag your existing photo or scanned signature into the tool above.
            </li>
            <li>
              <strong>Automatic Settings Applied:</strong> The required dimensions ({preset.width} &times; {preset.height} {preset.unit}) and file size limit ({preset.maxKB} KB) are pre-filled automatically.
            </li>
            <li>
              <strong>Click Resize & Compress:</strong> Our binary-search compression engine optimizes quality on your device in milliseconds.
            </li>
            <li>
              <strong>Download and Upload:</strong> Download your compliant photo and upload directly to the exam portal with complete confidence.
            </li>
          </ol>

          <div className="mt-6 p-4 rounded-lg bg-blue-50 border border-blue-200 text-xs text-blue-900">
            <strong>Important Notice:</strong> While QuickResizer verifies specifications against official notifications regularly, candidate guidelines may be updated by recruitment boards. Always refer to your examination&apos;s active notification for the most current information.
          </div>
        </div>

        {/* FAQs */}
        <div className="mt-10 border-t border-slate-200 pt-8">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-blue-600" />
            Frequently Asked Questions
          </h3>

          <div className="space-y-4 text-xs sm:text-sm">
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <h4 className="font-semibold text-slate-900">
                Is my photograph safe and private when using QuickResizer?
              </h4>
              <p className="mt-1 text-slate-600">
                Yes, 100%. QuickResizer processes your photos and signatures completely inside your browser using HTML5 Canvas technology. Your files are never uploaded to any cloud server or third party.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <h4 className="font-semibold text-slate-900">
                What if my photo turns out below the minimum {preset.minKB || 10} KB requirement?
              </h4>
              <p className="mt-1 text-slate-600">
                Our engine automatically adjusts quality upwards to meet the minimum threshold. If the image is extremely small or simple, increasing the dimensions slightly will produce a larger file that safely falls within the permitted window.
              </p>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <h4 className="font-semibold text-slate-900">
                Can I resize my photo on my mobile phone?
              </h4>
              <p className="mt-1 text-slate-600">
                Yes. QuickResizer is optimized for Android and iPhone mobile browsers. You can take a photo with your camera or select from your gallery, resize it, and save it directly to your device.
              </p>
            </div>
          </div>
        </div>
      </article>
    </div>

    {/* Right Vertical Skyscraper Ad */}
    <div className="hidden min-[1180px]:block shrink-0 sticky top-20 empty:hidden">
      <AdSlot id={`preset-${preset.slug}-right`} variant="skyscraper" />
    </div>
  </div>
</div>
  );
}

