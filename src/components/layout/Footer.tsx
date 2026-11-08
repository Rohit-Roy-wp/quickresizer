import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-slate-200 bg-white">
      <div className="mx-auto max-w-[1200px] px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand & Privacy Statement */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 font-bold text-slate-900 text-base">
              <Image
                src="/favicon.ico"
                alt="QuickResizer Logo"
                width={24}
                height={24}
                className="h-6 w-6 rounded-md object-contain shadow-2xs"
                unoptimized
              />
              <span>QuickResizer</span>
            </div>
            <p className="mt-3 text-sm text-slate-600 max-w-sm leading-relaxed">
              Fast, free, privacy-first image resizer and compressor for government exams, job portals, and official document uploads.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-md p-2.5 w-fit">
              <ShieldCheck className="h-4 w-4 text-green-600 shrink-0" />
              <span>100% Client-Side: Your files never leave your device.</span>
            </div>
          </div>

          {/* Popular Presets */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900">
              Exam Presets
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>
                <Link href="/ssc-photo-resizer-20kb-50kb" className="hover:text-blue-600 transition-colors duration-150">
                  SSC Photo (20–50 KB)
                </Link>
              </li>
              <li>
                <Link href="/ssc-signature-resizer-10kb-20kb" className="hover:text-blue-600 transition-colors duration-150">
                  SSC Signature (10–20 KB)
                </Link>
              </li>
              <li>
                <Link href="/ibps-photo-signature-resizer" className="hover:text-blue-600 transition-colors duration-150">
                  IBPS Photo & Signature
                </Link>
              </li>
              <li>
                <Link href="/upsc-photo-signature-resizer" className="hover:text-blue-600 transition-colors duration-150">
                  UPSC Photo & Signature
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Trust */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900">
              Trust & Legal
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>
                <Link href="/privacy-policy" className="hover:text-blue-600 transition-colors duration-150">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="hover:text-blue-600 transition-colors duration-150">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-blue-600 transition-colors duration-150">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-blue-600 transition-colors duration-150">
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="mt-10 border-t border-slate-100 pt-6 text-xs text-slate-500 leading-relaxed">
          <p>
            <strong>Disclaimer:</strong> QuickResizer is an independent online utility. We are not affiliated with, endorsed by, or connected to the Staff Selection Commission (SSC), Union Public Service Commission (UPSC), Institute of Banking Personnel Selection (IBPS), Railway Recruitment Boards (RRB), or any other government authority. Please always confirm image specifications against the official recruitment notification.
          </p>
          <p className="mt-3">
            &copy; {currentYear} QuickResizer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

