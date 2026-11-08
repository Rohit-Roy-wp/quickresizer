import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getAllBlogPosts, getBlogPostBySlug } from "@/lib/blog";
import { AdSlot } from "@/components/ads/AdSlot";
import { Calendar, Clock, ArrowLeft, ArrowRight, ShieldCheck, CheckSquare } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllBlogPosts();
  return posts.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return { title: "Guide Not Found | QuickResizer" };
  }

  return {
    title: `${post.title} | QuickResizer`,
    description: post.description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  // Convert raw markdown lines into readable elements
  const lines = post.content.split("\n");

  return (
    <div className="w-full max-w-[1520px] mx-auto px-3 sm:px-6 lg:px-8 py-5">
      {/* 3-Column Layout: Left Vertical Ad | Main Content Center | Right Vertical Ad */}
      <div className="flex justify-center items-start gap-4 lg:gap-6">
        {/* Left Vertical Skyscraper Ad */}
        <div className="hidden min-[1180px]:block shrink-0 sticky top-20 empty:hidden">
          <AdSlot id={`blog-${post.slug}-left`} variant="skyscraper" />
        </div>

        {/* Center Main Working Area (Fixed max-w-[1040px] identical to all pages to prevent ad shift) */}
        <div className="flex-1 min-w-0 max-w-[1040px]">
          {/* Breadcrumb Navigation */}
          <nav aria-label="Breadcrumb" className="mb-4 text-xs text-slate-500">
            <ol className="flex items-center gap-1.5 flex-wrap">
              <li>
                <Link href="/" className="hover:text-blue-600 transition-colors duration-150">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">&gt;</li>
              <li>
                <Link href="/blog" className="hover:text-blue-600 transition-colors duration-150">
                  Guides
                </Link>
              </li>
              <li aria-hidden="true">&gt;</li>
              <li className="font-medium text-slate-900 truncate max-w-xs" aria-current="page">
                {post.title}
              </li>
            </ol>
          </nav>

          <article className="prose prose-slate max-w-none">
            {/* Article Header */}
            <header className="mb-6 not-prose border-b border-slate-200 pb-5">
              <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full inline-block mb-2">
                {post.category}
              </span>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
                {post.title}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {post.date}
                </span>
                <span>&bull;</span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {post.readTime}
                </span>
                <span>&bull;</span>
                <span>By {post.author}</span>
              </div>
            </header>

        {/* Content Body */}
        <div className="space-y-4 text-sm sm:text-base text-slate-700 leading-relaxed">
          {lines.map((line, idx) => {
            const trimmed = line.trim();
            if (!trimmed) return null;

            if (trimmed.startsWith("# ")) {
              return null; // Already rendered in header
            }
            if (trimmed.startsWith("## ")) {
              return (
                <h2 key={idx} className="text-xl sm:text-2xl font-bold text-slate-900 mt-8 mb-3">
                  {trimmed.replace(/^##\s+/, "")}
                </h2>
              );
            }
            if (trimmed.startsWith("### ")) {
              return (
                <h3 key={idx} className="text-base sm:text-lg font-bold text-slate-900 mt-6 mb-2">
                  {trimmed.replace(/^###\s+/, "")}
                </h3>
              );
            }
            if (trimmed.startsWith("- [ ] ") || trimmed.startsWith("- [x] ")) {
              const isChecked = trimmed.startsWith("- [x] ");
              const itemText = trimmed.replace(/^-\s*\[[ x]\]\s*/, "");
              return (
                <div key={idx} className="flex items-center gap-2 text-sm text-slate-700 py-0.5">
                  <CheckSquare className={`h-4 w-4 ${isChecked ? "text-green-600" : "text-slate-400"}`} />
                  <span>{itemText}</span>
                </div>
              );
            }
            if (trimmed.startsWith("- ")) {
              return (
                <li key={idx} className="ml-5 list-disc text-sm text-slate-600 my-1">
                  {trimmed.replace(/^-\s+/, "")}
                </li>
              );
            }
            if (/^\d+\.\s+/.test(trimmed)) {
              return (
                <li key={idx} className="ml-5 list-decimal text-sm text-slate-600 my-1">
                  {trimmed.replace(/^\d+\.\s+/, "")}
                </li>
              );
            }
            if (trimmed === "---") {
              return <hr key={idx} className="my-8 border-slate-200" />;
            }

            return (
              <p key={idx} className="my-2">
                {trimmed}
              </p>
            );
          })}
        </div>

        {/* CTA to Resizer Tool */}
        <div className="my-10 not-prose rounded-xl bg-blue-50 border border-blue-200 p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-blue-900">
              Ready to resize your photo right now?
            </h3>
            <p className="mt-1 text-xs text-blue-700 max-w-md">
              Use our 100% on-device tool to format your image to exact KB and dimensions in seconds.
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-blue-700 transition-colors duration-150 shrink-0"
          >
            <span>Open QuickResizer Tool</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* In-Article Ad */}
        <AdSlot id={`blog-${post.slug}-bottom`} variant="leaderboard" />
      </article>

        {/* Back to Guides link */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-600 hover:text-blue-600 transition-colors duration-150"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to All Guides</span>
          </Link>
        </div>
      </div>

      {/* Right Vertical Skyscraper Ad */}
      <div className="hidden min-[1180px]:block shrink-0 sticky top-20 empty:hidden">
        <AdSlot id={`blog-${post.slug}-right`} variant="skyscraper" />
      </div>
    </div>
  </div>
  );
}

