import React from "react";
import type { Metadata } from "next";
import { SizePageTemplate } from "@/components/seo/SizePageTemplate";

export const metadata: Metadata = {
  title: "Compress Image to 20KB Online (Free & Exact) | QuickResizer",
  description:
    "Compress your JPG, PNG, and WebP images to under 20 KB online for free without losing quality. Ideal for scanned signatures, thumb impressions, and job applications.",
  alternates: {
    canonical: "/compress-image-to-20kb",
  },
};

export default function CompressTo20kbPage() {
  return (
    <SizePageTemplate
      size={20}
      title="Compress Image to Under 20 KB"
      subtitle="Strictly compress signatures, thumb prints, and document crops to 20 KB or less. Fast, private, and 100% on-device."
      useCases={[
        "Scanned candidate signatures for SSC CGL, CHSL, MTS, and GD Constable exams (strictly 10–20 KB).",
        "Scanned signatures for IBPS PO, Clerk, SBI, and regional rural banking portals.",
        "Left thumb impressions (LTI) and biometric fingerprint scans for recruitment drives.",
        "Thumbnail avatars and small profile badges for educational membership databases.",
      ]}
      faqs={[
        {
          question: "How do I compress my scanned signature to under 20 KB?",
          answer:
            "Upload your cropped signature photo into the tool above. The target limit is already pre-set to 20 KB. QuickResizer applies solid white background compositing to prevent black borders and optimizes ink clarity in milliseconds.",
        },
        {
          question: "Will the text of my signature remain readable at 20 KB?",
          answer:
            "Yes. QuickResizer uses binary search to keep the compression quality factor as high as possible while staying below 20 KB. Ink strokes remain crisp and distinct.",
        },
      ]}
    />
  );
}

