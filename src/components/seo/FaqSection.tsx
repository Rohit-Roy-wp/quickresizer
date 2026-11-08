import React from "react";
import { HelpCircle } from "lucide-react";
import { FaqJsonLd } from "./JsonLd";

export interface FaqItem {
  question: string;
  answer: string;
}

export function FaqSection({
  title = "Frequently Asked Questions",
  faqs,
  className = "",
}: {
  title?: string;
  faqs: FaqItem[];
  className?: string;
}) {
  return (
    <section aria-labelledby="faq-heading" className={`my-12 ${className}`}>
      <FaqJsonLd faqs={faqs} />
      <div className="flex items-center gap-2 mb-6">
        <HelpCircle className="h-6 w-6 text-blue-600" />
        <h2 id="faq-heading" className="text-xl sm:text-2xl font-bold text-slate-900">
          {title}
        </h2>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div
            key={idx}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs"
          >
            <h3 className="text-sm sm:text-base font-semibold text-slate-900">
              {faq.question}
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

