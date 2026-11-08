import React from "react";
import type { Metadata } from "next";
import { AdSlot } from "@/components/ads/AdSlot";
import { ImageTool } from "@/components/tool/ImageTool";
import { WebApplicationJsonLd } from "@/components/seo/JsonLd";
import { FaqSection, FaqItem } from "@/components/seo/FaqSection";
import { ShieldCheck, Zap, Lock } from "lucide-react";

export const metadata: Metadata = {
  title: "Resize & Compress Image to Exact KB (20KB, 50KB, 100KB) | QuickResizer",
  description:
    "Fast, free and 100% in-browser image resizer & compressor. Compress photos and signatures to exact KB limits (under 20KB, 50KB) and exact dimensions for SSC, UPSC, and IBPS online forms.",
  alternates: {
    canonical: "/",
  },
};

const homeFaqs: FaqItem[] = [
  {
    question: "How does QuickResizer compress images to an exact KB limit?",
    answer:
      "QuickResizer uses a client-side binary search algorithm over canvas encoder quality levels (ranging from 0.05 to 0.95). In approximately 8 computational steps, it identifies the highest possible visual quality that remains strictly below your requested file size limit (e.g., 20 KB or 50 KB). We measure the actual raw byte length of the resulting blob rather than relying on estimated base64 approximations.",
  },
  {
    question: "Are my photos or documents uploaded to any server?",
    answer:
      "No. QuickResizer operates 100% on-device inside your web browser using HTML5 Canvas technology. Your files, signatures, file names, and personal identification documents never leave your phone or computer, ensuring total privacy and instantaneous processing with zero network latency.",
  },
  {
    question: "Why do government exam portals reject uploaded photos?",
    answer:
      "Government exam recruitment portals (such as SSC, UPSC, IBPS, and Railway RRB) employ strict automated verification scripts. The most common rejection causes include: file sizes exceeding the maximum ceiling (even by 0.1 KB), incorrect pixel dimensions or aspect ratios, distorted faces caused by stretching, or unsupported image formats (such as PNG or HEIC instead of JPG).",
  },
  {
    question: "How do I resize a 3.5 cm x 4.5 cm photo for SSC?",
    answer:
      "Simply upload your photo into QuickResizer, select the 'SSC Photo' preset (or choose 'cm' unit with Width 3.5 and Height 4.5, and Max KB 50), and click 'Resize & Compress'. The tool will automatically scale, center, and compress your image to meet the official 20 KB to 50 KB requirement in milliseconds.",
  },
  {
    question: "Can I resize scanned signatures to 10 KB - 20 KB?",
    answer:
      "Yes. Select the 'SSC Signature' or 'IBPS Signature' preset (or enter Width 4.0 cm x Height 2.0 cm with Max KB 20). QuickResizer uses white-background padding to ensure clear, high-contrast signature outputs without black transparency artifacts.",
  },
  {
    question: "Does QuickResizer support iPhone HEIC photos?",
    answer:
      "Modern iPhones capture photos in high-efficiency HEIC format. While browsers do not natively support HEIC canvas encoding yet, QuickResizer detects HEIC uploads and provides helpful instant guidance on how to export in JPEG format or adjust your iPhone camera settings.",
  },
];

export default function HomePage() {
  return (
    <div className="w-full max-w-[1520px] mx-auto px-3 sm:px-6 lg:px-8 py-5">
      <WebApplicationJsonLd />

      {/* 3-Column Layout: Left Vertical Ad | Main Tool Center | Right Vertical Ad */}
      <div className="flex justify-center items-start gap-4 lg:gap-6">
        {/* Left Vertical Skyscraper Ad (Sticky on desktop) */}
        <div className="hidden min-[1180px]:block shrink-0 sticky top-20 empty:hidden">
          <AdSlot id="home-skyscraper-left" variant="skyscraper" />
        </div>

        {/* Center Main Working Area */}
        <div className="flex-1 min-w-0 max-w-[1040px]">
          {/* Clean, Human, Compact Header */}
          <div className="mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
            <div>
              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                Image Resizer &amp; Compressor to Exact KB
              </h1>
              <p className="mt-0.5 text-xs sm:text-sm text-slate-500 max-w-2xl">
                Resize dimensions (cm, in, px) and compress photos to exact file sizes (20 KB, 50 KB, 100 KB) for official forms.
              </p>
            </div>

            <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200 px-3 py-1.5 rounded-lg shrink-0">
              <ShieldCheck className="h-4 w-4 text-green-600" />
              <span>100% In-Browser &bull; Zero Uploads</span>
            </div>
          </div>

          {/* Main Tool Container (Immediately front and center) */}
          <section aria-label="Image Resizer Tool" className="mb-10">
            <ImageTool />
          </section>

          {/* In-Content Ad below the tool */}
          <AdSlot id="in-content-banner" variant="leaderboard" />

          {/* Comprehensive SEO Content Section (800+ Words) */}
          <article className="my-14 max-w-[760px] mx-auto text-slate-700 leading-relaxed space-y-8">
            <header>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                How to Resize and Compress Photos for Online Applications
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-600">
                Applying for government recruitment exams, state PSCs, university admissions, or passport renewals requires digital photos that conform to strict guidelines. Modern smartphone cameras capture images ranging between 3 MB and 12 MB with high resolutions (4000 &times; 3000 px), but government portals reject anything larger than 50 KB or 100 KB.
              </p>
            </header>

            {/* Section 1: Official Image Criteria */}
            <section className="space-y-2">
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                1. Understanding Official Image Criteria
              </h3>
              <p className="text-xs sm:text-sm">
                Recruitment software automates form screening using strict server-side validation. Uploading a photograph that deviates from these specifications leads to immediate rejection of the form or disqualification at the document verification stage. The three critical variables are:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-600">
                <li>
                  <strong>File Size in Kilobytes (KB):</strong> Most portals specify a narrow window—for example, the Staff Selection Commission (SSC) mandates 20 KB to 50 KB for photos and 10 KB to 20 KB for signatures. Files at 19.9 KB or 50.1 KB fail automated screening.
                </li>
                <li>
                  <strong>Physical Dimensions vs. Pixels:</strong> Guidelines often express dimensions in centimeters (e.g. 3.5 cm width by 4.5 cm height) or standard pixels at 96 to 200 DPI resolution. For instance, at standard 96 DPI, 3.5 cm converts to 132 pixels, while 4.5 cm equals 170 pixels.
                </li>
                <li>
                  <strong>Aspect Ratio & Framing:</strong> Stretching a square photograph into a rectangular portrait distorts the candidate&apos;s face. QuickResizer provides intelligent <em>Crop to Fill</em>, which centers the subject and clips unnecessary margins without distorting natural facial proportions.
                </li>
              </ul>
            </section>

            {/* Section 2: Privacy */}
            <section className="space-y-2">
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                2. Complete Privacy with 100% In-Browser Execution
              </h3>
              <p className="text-xs sm:text-sm">
                Traditional image compression services require users to upload their photographs, identity cards, and scanned signatures to remote cloud servers. Once uploaded, candidates have no guarantee of data retention, encryption standards, or third-party access.
              </p>
              <p className="text-xs sm:text-sm">
                QuickResizer eliminates this risk entirely. By leveraging HTML5 Canvas and Web Worker technology, all processing runs exclusively within your device&apos;s web browser. Pixel computation, dimension scaling, and quality optimization happen locally in your device&apos;s RAM. Your photos and sensitive signatures are never transmitted over the Internet.
              </p>
            </section>

            {/* Section 3: Popular Exam Presets Guide */}
            <section className="space-y-3">
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                3. Standard Specifications for Major Competitive Exams
              </h3>
              <div className="overflow-x-auto my-3 border border-slate-200 rounded-lg">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-100 text-slate-900 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="p-2.5">Examination Body</th>
                      <th className="p-2.5">Document Type</th>
                      <th className="p-2.5">Required Dimensions</th>
                      <th className="p-2.5">Permitted File Size</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-600">
                    <tr>
                      <td className="p-2.5 font-medium text-slate-900">SSC (CGL, CHSL, MTS)</td>
                      <td className="p-2.5">Candidate Photograph</td>
                      <td className="p-2.5">3.5 cm &times; 4.5 cm</td>
                      <td className="p-2.5 text-green-700 font-semibold">20 KB &ndash; 50 KB</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-medium text-slate-900">SSC (All Exams)</td>
                      <td className="p-2.5">Candidate Signature</td>
                      <td className="p-2.5">4.0 cm &times; 2.0 cm</td>
                      <td className="p-2.5 text-green-700 font-semibold">10 KB &ndash; 20 KB</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-medium text-slate-900">IBPS (PO, Clerk, SO)</td>
                      <td className="p-2.5">Passport Photograph</td>
                      <td className="p-2.5">200 &times; 230 pixels</td>
                      <td className="p-2.5 text-green-700 font-semibold">20 KB &ndash; 50 KB</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-medium text-slate-900">IBPS (All Exams)</td>
                      <td className="p-2.5">Scanned Signature</td>
                      <td className="p-2.5">140 &times; 60 pixels</td>
                      <td className="p-2.5 text-green-700 font-semibold">10 KB &ndash; 20 KB</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-medium text-slate-900">UPSC (Civil Services)</td>
                      <td className="p-2.5">Photo &amp; Signature</td>
                      <td className="p-2.5">Min 350 &times; 350 px</td>
                      <td className="p-2.5 text-green-700 font-semibold">20 KB &ndash; 300 KB</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-medium text-slate-900">RRB Railway Recruitment</td>
                      <td className="p-2.5">Candidate Photo</td>
                      <td className="p-2.5">35 mm &times; 45 mm</td>
                      <td className="p-2.5 text-green-700 font-semibold">20 KB &ndash; 50 KB</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-slate-500">
                Note: Recruitment authorities may update specific parameters between notifications. Always verify guidelines against the active official recruitment notification.
              </p>
            </section>

            {/* Section 4: Tips */}
            <section className="space-y-2">
              <h3 className="text-base sm:text-lg font-bold text-slate-900">
                4. Expert Tips for Zero-Rejection Photo Uploads
              </h3>
              <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-600">
                <li>
                  <strong>Uniform White Background:</strong> Take your portrait in front of a clean, plain white or light-colored wall with even, shadow-free lighting.
                </li>
                <li>
                  <strong>Direct Gaze and Neutral Expression:</strong> Ensure both eyes and ears are clearly visible. Avoid wearing hats, caps, dark sunglasses, or heavily tinted spectacles.
                </li>
                <li>
                  <strong>High-Contrast Signatures:</strong> Sign your full legal signature on clean white paper using a dark blue or black ink pen. Crop the paper edges tightly before compressing to 10–20 KB.
                </li>
                <li>
                  <strong>Avoid Repeated Compressions:</strong> Re-compressing an already degraded JPEG causes compression artifacts. Always start with your original high-resolution camera file.
                </li>
              </ul>
            </section>
          </article>

          {/* FAQ Section with Schema */}
          <FaqSection faqs={homeFaqs} className="max-w-[760px] mx-auto" />
        </div>

        {/* Right Vertical Skyscraper Ad (Sticky on desktop) */}
        <div className="hidden min-[1180px]:block shrink-0 sticky top-20 empty:hidden">
          <AdSlot id="home-skyscraper-right" variant="skyscraper" />
        </div>
      </div>
    </div>
  );
}
