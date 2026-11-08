import React from "react";
import type { Metadata } from "next";
import { SizePageTemplate } from "@/components/seo/SizePageTemplate";

export const metadata: Metadata = {
  title: "Compress Image to 100KB Online (Free & Exact) | QuickResizer",
  description:
    "Compress images, documents, and marksheets to under 100 KB online for free with maximum visual clarity. 100% in-browser, no signup required.",
  alternates: {
    canonical: "/compress-image-to-100kb",
  },
};

export default function CompressTo100kbPage() {
  return (
    <SizePageTemplate
      size={100}
      title="Compress Image to Under 100 KB"
      subtitle="Ideal for high-resolution candidate portraits, educational certificates, and document attachments requiring a 100 KB ceiling."
      useCases={[
        "Handwritten declaration uploads for IBPS, SBI, and banking exams (mandating 50 KB–100 KB).",
        "Document proof attachments (caste certificate, 10th marksheet, domicile proofs).",
        "Higher-resolution candidate profile photos for corporate job applications and visa portals.",
        "Profile image optimization for online portals to ensure rapid page load times.",
      ]}
      faqs={[
        {
          question: "How do I compress an educational marksheet to under 100 KB?",
          answer:
            "Upload your scanned marksheet or certificate into QuickResizer. Our engine will preserve text readability while adjusting JPEG encoding to ensure the file lands under 100 KB.",
        },
        {
          question: "Is there any limit on how many images I can compress to 100 KB?",
          answer:
            "No. QuickResizer is 100% free with unlimited usage. Because all processing runs on your device, there are no daily throttling caps or paywalls.",
        },
      ]}
    />
  );
}

