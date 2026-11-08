import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { AdSlot } from "@/components/ads/AdSlot";
import { Mail, Clock, ShieldCheck, HelpCircle } from "lucide-react";
import { ContactForm } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Support | QuickResizer",
  description:
    "Contact the QuickResizer team. Request new exam presets, report portal requirement changes, or reach our technical support team.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="w-full max-w-[1520px] mx-auto px-3 sm:px-6 lg:px-8 py-5">
      {/* 3-Column Layout: Left Vertical Ad | Main Content Center | Right Vertical Ad */}
      <div className="flex justify-center items-start gap-4 lg:gap-6">
        {/* Left Vertical Skyscraper Ad */}
        <div className="hidden min-[1180px]:block shrink-0 sticky top-20 empty:hidden">
          <AdSlot id="contact-skyscraper-left" variant="skyscraper" />
        </div>

        {/* Center Main Content */}
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
                Contact Support
              </li>
            </ol>
          </nav>

          <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-3 pb-4 border-b border-slate-200">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
                Contact Support
              </h1>
              <p className="mt-1 text-xs sm:text-sm text-slate-600">
                Have an exam requirement we don&apos;t support yet, or need assistance? We are here to help.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 mb-8">
            {/* Contact Form Card */}
            <div className="lg:col-span-7 bg-white p-6 sm:p-7 rounded-xl border border-slate-200 shadow-xs">
              <h2 className="text-base font-bold text-slate-900 mb-4">
                Send us a Message
              </h2>
              <ContactForm />
            </div>

            {/* Contact Information & Response Time Sidebar */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900 mb-3">
                  Direct Contact
                </h3>
                <div className="flex items-start gap-3 text-xs text-slate-600">
                  <Mail className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-800 block text-sm">
                      support@quickresizer.com
                    </span>
                    <span className="text-slate-500 block mt-0.5">
                      General inquiries, preset suggestions &amp; feedback
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900 mb-3">
                  Support Hours &amp; Response
                </h3>
                <div className="flex items-start gap-3 text-xs text-slate-600">
                  <Clock className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-slate-800 block">
                      Monday &ndash; Saturday: 9:00 AM &ndash; 6:00 PM IST
                    </span>
                    <span className="text-slate-500 block mt-0.5">
                      We usually respond within 24 to 48 business hours.
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-5">
                <div className="flex items-start gap-2.5 text-xs text-blue-900">
                  <ShieldCheck className="h-5 w-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block font-semibold">Privacy Reminder:</strong>
                    <p className="mt-1 text-blue-800 leading-relaxed">
                      Please do not send actual personal photos or sensitive government ID scans via email. Our website processes images safely directly inside your browser.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Vertical Skyscraper Ad */}
        <div className="hidden min-[1180px]:block shrink-0 sticky top-20 empty:hidden">
          <AdSlot id="contact-skyscraper-right" variant="skyscraper" />
        </div>
      </div>
    </div>
  );
}

