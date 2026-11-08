"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ShieldCheck } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200 bg-white/95 backdrop-blur-none shadow-sm">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 font-bold text-slate-900 text-lg tracking-tight">
            <Image
              src="/favicon.ico"
              alt="QuickResizer Logo"
              width={32}
              height={32}
              className="h-8 w-8 rounded-lg object-contain shadow-2xs"
              unoptimized
              priority
            />
            <span>QuickResizer</span>
          </Link>
          <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
            <ShieldCheck className="h-3.5 w-3.5 text-green-600" />
            100% On-Device
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link href="/" className="transition-colors duration-150 hover:text-blue-600">
            Resizer
          </Link>
          <Link href="/blog" className="transition-colors duration-150 hover:text-blue-600">
            Exam Guides
          </Link>
          <Link href="/about" className="transition-colors duration-150 hover:text-blue-600">
            About
          </Link>
          <Link href="/contact" className="transition-colors duration-150 hover:text-blue-600">
            Contact
          </Link>
        </nav>

        {/* Mobile menu button */}
        <div className="flex md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-slate-200 text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-600"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-200 bg-white px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-3 text-base font-medium text-slate-700">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-md px-3 py-2 hover:bg-slate-50 hover:text-blue-600"
            >
              Resizer Tool
            </Link>
            <Link
              href="/blog"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-md px-3 py-2 hover:bg-slate-50 hover:text-blue-600"
            >
              Exam Guides
            </Link>
            <Link
              href="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-md px-3 py-2 hover:bg-slate-50 hover:text-blue-600"
            >
              About QuickResizer
            </Link>
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="rounded-md px-3 py-2 hover:bg-slate-50 hover:text-blue-600"
            >
              Contact Support
            </Link>
            <div className="pt-2 border-t border-slate-100 flex items-center gap-1.5 text-xs text-slate-500 px-3">
              <ShieldCheck className="h-4 w-4 text-green-600" />
              Photos are processed inside your browser and never uploaded.
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

