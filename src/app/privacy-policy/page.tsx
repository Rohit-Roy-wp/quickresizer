import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { AdSlot } from "@/components/ads/AdSlot";
import { ShieldCheck, Lock, EyeOff } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | QuickResizer",
  description:
    "Privacy Policy for QuickResizer. Learn how our 100% on-device image processing ensures your photos and signatures are never uploaded to any server.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function PrivacyPolicyPage() {
  const lastUpdated = "January 15, 2026";

  return (
    <div className="w-full max-w-[1520px] mx-auto px-3 sm:px-6 lg:px-8 py-5">
      {/* 3-Column Layout: Left Vertical Ad | Main Content Center | Right Vertical Ad */}
      <div className="flex justify-center items-start gap-4 lg:gap-6">
        {/* Left Vertical Skyscraper Ad */}
        <div className="hidden min-[1180px]:block shrink-0 sticky top-20 empty:hidden">
          <AdSlot id="privacy-skyscraper-left" variant="skyscraper" />
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
                Privacy Policy
              </li>
            </ol>
          </nav>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
            Privacy Policy
          </h1>
          <p className="mt-1 text-xs text-slate-500">Last updated: {lastUpdated}</p>

          {/* Core Privacy Reassurance Card */}
          <div className="my-6 rounded-xl bg-blue-50 border border-blue-200 p-4 sm:p-5 text-blue-900">
            <div className="flex items-center gap-2 font-bold text-xs sm:text-sm">
              <ShieldCheck className="h-5 w-5 text-blue-600 shrink-0" />
              <span>Our Fundamental Privacy Guarantee: Zero Server Uploads</span>
            </div>
            <p className="mt-2 text-xs text-blue-800 leading-relaxed">
              QuickResizer was engineered from the ground up to protect your personal identity. All image resizing, cropping, and compression run <strong>100% locally inside your web browser</strong> using client-side HTML5 Canvas technology. Your photos, signatures, file names, and personal documents are <strong>never transmitted to, stored on, or processed by any external server</strong>.
            </p>
          </div>

          <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-6">
            <section>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2">1. Introduction</h2>
              <p>
                Welcome to QuickResizer (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;). This Privacy Policy explains our practices regarding the collection, use, and disclosure of information when you access or use our web application at quickresizer.com (the &quot;Service&quot;).
              </p>
              <p className="mt-2">
                By using QuickResizer, you consent to the data practices described in this policy. If you do not agree with this policy, please do not use our services.
              </p>
            </section>

            <section>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2">2. Processing of Your Images and Documents</h2>
              <p>
                Unlike traditional web tools, QuickResizer does not upload your files to remote servers:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1.5 text-slate-600">
                <li>
                  <strong>Client-Side Processing:</strong> When you select or drag a photo or signature into our tool, the file is read into your browser&apos;s local memory via standard browser APIs (`createImageBitmap`, `CanvasRenderingContext2D`, and `canvas.toBlob`).
                </li>
                <li>
                  <strong>No Storage or Transmission:</strong> We do not operate an image processing backend or cloud storage. At no point during or after processing does any pixel data, EXIF metadata, or file identifier leave your device.
                </li>
                <li>
                  <strong>Automatic Memory Clearance:</strong> Temporary browser memory object URLs created for previewing your processed image are automatically revoked upon clearing the image, processing a new image, or closing the browser tab.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2">3. Information We Collect Automatically</h2>
              <p>
                While your image content is never collected, our web servers and analytics providers collect standard anonymous usage data when you browse our site:
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1.5 text-slate-600">
                <li>
                  <strong>Log Data:</strong> Your browser sends standard information including your IP address, browser type and version, referring/exit pages, operating system, date/time stamps, and clickstream data.
                </li>
                <li>
                  <strong>Aggregated Analytics:</strong> We use Google Analytics 4 to understand website traffic patterns and popular preset usage. Telemetry is restricted to general event actions (e.g. &quot;preset_selected: ssc-photo&quot;) and never records file names, personal details, or image contents.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2">4. Cookies and Advertising Partners</h2>
              <p>
                QuickResizer is a free utility supported by online advertising. We partner with third-party advertising vendors, including Google AdSense, to serve advertisements on our site.
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1.5 text-slate-600">
                <li>
                  <strong>Google AdSense:</strong> Google, as a third-party vendor, uses cookies to serve ads on QuickResizer. Google&apos;s use of advertising cookies enables it and its partners to serve ads to users based on their visit to our site and/or other websites on the Internet.
                </li>
                <li>
                  <strong>DART Cookie:</strong> Users may opt out of personalized advertising by visiting{" "}
                  <a
                    href="https://www.google.com/settings/ads"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    Google Ads Settings
                  </a>
                  . Alternatively, you may opt out of third-party vendor cookies for personalized advertising by visiting{" "}
                  <a
                    href="https://www.aboutads.info/choices/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    www.aboutads.info
                  </a>
                  .
                </li>
                <li>
                  <strong>Cookie Control:</strong> You can choose to accept or decline cookies using our cookie banner or by modifying your browser settings. Declining cookies will not prevent you from using our image resizing tools.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2">5. GDPR and CCPA Compliance</h2>
              <p>
                We respect the privacy rights of all users, including residents of the European Economic Area (GDPR) and California (CCPA/CPRA):
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-1.5 text-slate-600">
                <li>We do not sell, rent, or trade your personal information.</li>
                <li>Because we do not collect or store user accounts, identities, or files, we hold no personal data profile tied to your identity.</li>
                <li>You have the right to request information regarding any automated telemetry or request assistance by contacting our privacy team.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2">6. Children&apos;s Online Privacy (COPPA)</h2>
              <p>
                QuickResizer does not knowingly collect any personally identifiable information from children under the age of 13. If you believe that your child has provided us with personal information, please contact us immediately, and we will take appropriate steps to remove such information.
              </p>
            </section>

            <section>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2">7. Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy periodically to reflect changes in our service or legal requirements. Any modifications will be posted on this page with an updated &quot;Last updated&quot; date. Continued use of the Service constitutes acceptance of the revised policy.
              </p>
            </section>

            <section className="border-t border-slate-200 pt-5">
              <h2 className="text-base sm:text-lg font-bold text-slate-900 mb-2">8. Contact Us</h2>
              <p>
                If you have questions, feedback, or concerns regarding this Privacy Policy, please contact our privacy compliance team:
              </p>
              <div className="mt-3 bg-slate-50 border border-slate-200 rounded-lg p-3 text-xs">
                <p>
                  <strong>Email:</strong>{" "}
                  <a
                    href="mailto:quickresizer.help@gmail.com"
                    className="text-blue-600 underline hover:text-blue-700"
                  >
                    quickresizer.help@gmail.com
                  </a>
                </p>
                <p className="mt-1"><strong>Website:</strong> <Link href="/" className="text-blue-600 underline">https://quickresizer.com</Link></p>
              </div>
            </section>
          </div>
        </div>

        {/* Right Vertical Skyscraper Ad */}
        <div className="hidden min-[1180px]:block shrink-0 sticky top-20 empty:hidden">
          <AdSlot id="privacy-skyscraper-right" variant="skyscraper" />
        </div>
      </div>
    </div>
  );
}

