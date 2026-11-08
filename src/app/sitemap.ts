import { MetadataRoute } from "next";
import { getAllPresets } from "@/lib/presets";
import { getAllBlogPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://quickresizer-zeta.vercel.app";
  const now = new Date().toISOString();

  // 1. Static Core & Trust Pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/terms-of-service`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // 2. Size Intent Pages
  const sizeRoutes: MetadataRoute.Sitemap = ["20", "50", "100"].map((size) => ({
    url: `${baseUrl}/compress-image-to-${size}kb`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // 3. Exam Preset Pages
  const presetRoutes: MetadataRoute.Sitemap = getAllPresets().map((preset) => ({
    url: `${baseUrl}/${preset.slug}`,
    lastModified: `${preset.lastVerified}T00:00:00.000Z`,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  // 4. Blog Guides
  const blogRoutes: MetadataRoute.Sitemap = getAllBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: `${post.date}T00:00:00.000Z`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...sizeRoutes, ...presetRoutes, ...blogRoutes];
}

