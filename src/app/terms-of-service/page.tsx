import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { AdSlot } from "@/components/ads/AdSlot";
import { AlertTriangle, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service | QuickResizer",
  description:
    "Terms of Service for QuickResizer. Important candidate responsibilities, service disclaimers, and guidelines for using our image resizing utilities.",
  alternates: {
    canonical: "/terms-of-service",
  },
};

export default function TermsOfServicePage() {
  const lastUpdated = "January 15, 2026";

  return (
    <div className="w-full max-w-[1520px] mx-auto px-3 sm:px-6 lg:px-8 py-5">
      {/* 3-Column Layout: Left Vertical Ad | Main Content Center | Right Vertical Ad */}
      <div className="flex justify-center items-start gap-4 lg:gap-6">
        {/* Left Vertical Skyscraper Ad */}
        <div className="hidden min-[1180px]:block shrink-0 sticky top-20 empty:hidden">
          <AdSlot id="terms-skyscraper-left" variant="skyscraper" />
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
                Terms of Service
              </li>
            </ol>
          </nav>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Terms of Service
          </h1>
          <p className="mt-1 text-xs text-slate-500">Last updated: {lastUpdated}</p>

          {/* Critical Candidate Disclaimer Card */}
          <div className="my-6 rounded-xl bg-amber-50 border border-amber-200 p-4 sm:p-5 text-amber-900">
            <div className="flex items-center gap-2 font-bold text-xs sm:text-sm">
              <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
              <span>Important Notice for Examination Applicants</span>
            </div>
            <p className="mt-2 text-xs text-amber-800 leading-relaxed">
              QuickResizer is an independent web utility and is <strong>not affiliated with, authorized, maintained, or endorsed by</strong> the Staff Selection Commission (SSC), Union Public Service Commission (UPSC), Institute of Banking Personnel Selection (IBPS), Railway Recruitment Boards (RRB), or any other examination authority. While we make every effort to maintain accurate and up-to-date preset specifications, <strong>candidates are solely responsible for cross-verifying all dimensions, file size limits, and formatting rules against the official active recruitment notification</strong> before submitting their application.
            </p>
          </div>

          <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-6">
            <section>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2">1. Agreement to Terms</h2>
              <p>
                By accessing or using QuickResizer (available at quickresizer.com, hereinafter the &quot;Service&quot;), you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you must not access or use the Service.
              </p>
            </section>

            <section>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2">2. Description of Service</h2>
              <p>
                QuickResizer provides free, in-browser digital image resizing, cropping, compression, and format conversion tools. The tool operates client-side on your device without transmitting image data to remote servers. The service is provided free of charge, with no registration or user account creation required.
              </p>
            </section>

            <section>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2">3. User Responsibilities &amp; Verification</h2>
              <p>
                When utilizing QuickResizer to prepare photographs, scanned signatures, or official documents for portal submissions:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1.5 text-slate-600">
                <li>
                  You are responsible for reviewing the resulting image (clarity, dimensions, and file size) before final submission to any official portal.
                </li>
                <li>
                  Recruitment authorities frequently revise their guidelines between exam cycles (e.g., changes to permissible date stamps, name banners, background colors, or aspect ratios). You must always consult the official notification issued by the relevant authority.
                </li>
                <li>
                  You agree not to use the Service for any unlawful purpose or to process copyrighted material without proper authorization.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2">4. Disclaimer of Warranties</h2>
              <p>
                THE SERVICE IS PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.
              </p>
              <p className="mt-2">
                WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE, OR THAT PROCESSED IMAGES WILL GUARANTEE ACCEPTANCE BY ANY SPECIFIC APPLICATION PORTAL OR RECRUITMENT SOFTWARE.
              </p>
            </section>

            <section>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2">5. Limitation of Liability</h2>
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, QUICKRESIZER AND ITS OPERATORS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF APPLICATION OPPORTUNITIES, REJECTION OF FORM SUBMISSIONS, LOSS OF DATA, OR SERVICE DISRUPTIONS, ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF THE SERVICE.
              </p>
            </section>

            <section>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2">6. Intellectual Property</h2>
              <p>
                The software, branding, user interface design, logos, and original written content on QuickResizer are the intellectual property of QuickResizer. All rights are reserved. You retain full and exclusive ownership of all image files processed through our tool on your local machine.
              </p>
            </section>

            <section>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2">7. Third-Party Links &amp; Advertising</h2>
              <p>
                Our website displays third-party advertisements and may contain links to external third-party websites (such as official exam conducting bodies). We do not control, endorse, or assume responsibility for the content, privacy practices, or accuracy of third-party websites or services.
              </p>
            </section>

            <section className="border-t border-slate-200 pt-5">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2">8. Contact Information</h2>
              <p>
                For questions or legal inquiries regarding these Terms of Service, please contact us at:
              </p>
              <div className="mt-3 bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs">
                <p><strong>Email:</strong> support@quickresizer.com</p>
                <p className="mt-1"><strong>Website:</strong> <Link href="/" className="text-blue-600 underline">https://quickresizer.com</Link></p>
              </div>
            </section>
          </div>
        </div>

        {/* Right Vertical Skyscraper Ad */}
        <div className="hidden min-[1180px]:block shrink-0 sticky top-20 empty:hidden">
          <AdSlot id="terms-skyscraper-right" variant="skyscraper" />
        </div>
      </div>
    </div>
  );
}

