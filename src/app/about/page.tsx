import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { AdSlot } from "@/components/ads/AdSlot";
import { ShieldCheck, Zap, Heart, CheckCircle2, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | QuickResizer",
  description:
    "Learn about QuickResizer's mission: providing a free, 100% on-device image resizing utility for exam candidates, students, and professionals without compromising privacy.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="w-full max-w-[1520px] mx-auto px-3 sm:px-6 lg:px-8 py-5">
      {/* 3-Column Layout: Left Vertical Ad | Main Content Center | Right Vertical Ad */}
      <div className="flex justify-center items-start gap-4 lg:gap-6">
        {/* Left Vertical Skyscraper Ad */}
        <div className="hidden min-[1180px]:block shrink-0 sticky top-20 empty:hidden">
          <AdSlot id="about-skyscraper-left" variant="skyscraper" />
        </div>

        {/* Center Main Content (Fixed max-w-[1040px] identical to all pages to prevent ad shift) */}
        <div className="flex-1 min-w-0 max-w-[1040px]">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-4 text-xs text-slate-500">
            <ol className="flex items-center gap-1.5">
              <li>
                <Link href="/" className="hover:text-blue-600 transition-colors duration-150">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">&gt;</li>
              <li className="font-medium text-slate-900" aria-current="page">
                About Us
              </li>
            </ol>
          </nav>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            About QuickResizer
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-slate-600">
            A fast, free, privacy-first image utility built for applicants, students, and professionals.
          </p>

          {/* Mission Hero */}
          <div className="my-6 rounded-xl bg-slate-100/70 border border-slate-200 p-5 sm:p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-2">Our Mission</h2>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
              Every year, millions of candidates apply for competitive examinations like SSC, UPSC, IBPS, and state PSCs. Almost every portal demands strict image specifications: exactly 20 KB to 50 KB, exact centimeter dimensions, and specific aspect ratios.
            </p>
            <p className="mt-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
              Too often, applicants are forced to use cluttered, ad-heavy websites that upload personal photos to unknown servers, demand subscription fees, or produce blurry, rejected photos. We built <strong>QuickResizer</strong> to offer a calm, dependable, and completely private alternative that gets the job done in seconds.
            </p>
          </div>

          <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-6">
            {/* Core Principles */}
            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-3">
                Our Three Core Commitments
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 not-prose">
                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50 text-green-600 mb-2.5">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-xs sm:text-sm">100% On-Device</h3>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                    Your photos and signatures never leave your browser. All calculations, scaling, and compression execute locally on your device.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 mb-2.5">
                    <Zap className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-xs sm:text-sm">Exact Precision</h3>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                    Our binary-search engine measures real byte output, guaranteeing your file lands safely within the official KB target every time.
                  </p>
                </div>

                <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-700 mb-2.5">
                    <Heart className="h-5 w-5 text-red-500" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-xs sm:text-sm">Free &amp; No Login</h3>
                  <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                    No sign-up forms, no passwords, no email captures, and no hidden subscriptions. Just open the tool and resize your image.
                  </p>
                </div>
              </div>
            </section>

            {/* How It Works Under the Hood */}
            <section>
              <h2 className="text-lg font-bold text-slate-900 mb-2">
                How QuickResizer Works Under the Hood
              </h2>
              <p>
                QuickResizer utilizes modern browser APIs to deliver desktop-grade image processing speed directly on your phone or computer:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1 text-slate-600 text-xs sm:text-sm">
                <li>
                  <strong>EXIF Orientation Handling:</strong> Smartphone cameras often store photos sideways with rotation flags. We automatically decode orientation flags so your photo is never turned upside down.
                </li>
                <li>
                  <strong>Smart Aspect Ratio Protection:</strong> Using <em>Crop to Fill</em>, your face is centered and preserved without the horizontal distortion that triggers human reviewer rejections.
                </li>
                <li>
                  <strong>Binary Search Quality Tuning:</strong> Instead of guessing quality levels, our engine runs an 8-iteration binary search on canvas encoding to identify the highest quality image that strictly satisfies your size cap.
                </li>
              </ul>
            </section>

            {/* In-Content Ad */}
            <div className="not-prose my-6">
              <AdSlot id="about-content-bottom" variant="rectangle" />
            </div>

            {/* Contact & Support Link */}
            <section className="border-t border-slate-200 pt-5">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2">Have Feedback or Suggestions?</h2>
              <p className="text-xs sm:text-sm">
                We are constantly adding new exam presets and improving our tools. If you have an exam notification with tricky dimensions or would like to report an issue, please reach out via our{" "}
                <Link href="/contact" className="text-blue-600 font-semibold underline">
                  Contact Page
                </Link>{" "}
                or email us directly at <strong>support@quickresizer.com</strong>.
              </p>
            </section>
          </div>
        </div>

        {/* Right Vertical Skyscraper Ad */}
        <div className="hidden min-[1180px]:block shrink-0 sticky top-20 empty:hidden">
          <AdSlot id="about-skyscraper-right" variant="skyscraper" />
        </div>
      </div>
    </div>
  );
}

