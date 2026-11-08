import React from "react";

interface WebApplicationSchemaProps {
  name?: string;
  description?: string;
  url?: string;
}

export function WebApplicationJsonLd({
  name = "QuickResizer",
  description = "Free client-side image resizer and compressor to exact KB limits (20KB, 50KB, 100KB) and dimensions (cm, in, px).",
  url = process.env.NEXT_PUBLIC_SITE_URL || "https://quickresizer-zeta.vercel.app",
}: WebApplicationSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    url,
    description,
    applicationCategory: "MultimediaApplication",
    operatingSystem: "All (Web Browser)",
    browserRequirements: "Requires JavaScript. Requires HTML5 Canvas support.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "100% In-Browser Image Resizing",
      "Exact KB Binary Search Compression",
      "Government Exam Presets (SSC, UPSC, IBPS, RRB)",
      "Unit Conversions (px, cm, in)",
      "Aspect Ratio Protection with Crop to Fill",
      "JPEG, PNG, and WebP support",
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

interface FaqItem {
  question: string;
  answer: string;
}

export function FaqJsonLd({ faqs }: { faqs: FaqItem[] }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

