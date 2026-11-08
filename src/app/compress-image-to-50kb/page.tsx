import React from "react";
import type { Metadata } from "next";
import { SizePageTemplate } from "@/components/seo/SizePageTemplate";

export const metadata: Metadata = {
  title: "Compress Image to 50KB Online (Free & Exact) | QuickResizer",
  description:
    "Compress photos to under 50 KB online for free without blurriness. Pre-set for SSC, IBPS, and Railway government exam photo upload requirements.",
  alternates: {
    canonical: "/compress-image-to-50kb",
  },
};

export default function CompressTo50kbPage() {
  return (
    <SizePageTemplate
      size={50}
      title="Compress Image to Under 50 KB"
      subtitle="The standard format for passport photos on competitive exam portals. Reduce MB-sized camera photos to under 50 KB in seconds."
      useCases={[
        "Passport photographs for SSC recruitment exams (mandating 20 KB to 50 KB in JPG).",
        "Photograph uploads for IBPS banking recruitment exams (200 x 230 px, under 50 KB).",
        "Railway Recruitment Board (RRB NTPC, Group D, ALP) candidate photo verification.",
        "Driving license and Parivahan Sarathi online application photo uploads.",
      ]}
      faqs={[
        {
          question: "Can I compress a 5 MB phone photo down to 50 KB?",
          answer:
            "Yes! QuickResizer scales down oversized smartphone camera resolutions and applies mathematical binary search compression to fit your photo comfortably under 50 KB without facial distortion.",
        },
        {
          question: "What dimensions should I use for a 50 KB exam photo?",
          answer:
            "Most government portals request 3.5 cm width by 4.5 cm height (or 200 x 230 px). You can toggle units and enter these exact dimensions in the settings panel above.",
        },
      ]}
    />
  );
}

