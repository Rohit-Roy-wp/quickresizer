import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  readTime: string;
  author: string;
  content: string;
}

const BLOG_DIRECTORY = path.join(process.cwd(), "content", "blog");

/**
 * Returns all published blog posts sorted by date descending.
 */
export function getAllBlogPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIRECTORY)) {
    return [];
  }

  const fileNames = fs.readdirSync(BLOG_DIRECTORY);
  const posts: BlogPost[] = [];

  for (const fileName of fileNames) {
    if (!fileName.endsWith(".md") && !fileName.endsWith(".mdx")) {
      continue;
    }

    const slug = fileName.replace(/\.mdx?$/, "");
    const fullPath = path.join(BLOG_DIRECTORY, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    posts.push({
      slug,
      title: data.title || "Exam Photo Resizing Guide",
      description: data.description || "",
      date: data.date || "2026-01-15",
      category: data.category || "Exam Guides",
      readTime: data.readTime || "4 min read",
      author: data.author || "QuickResizer Editorial Team",
      content,
    });
  }

  return posts.sort((a, b) => (new Date(b.date).getTime() || 0) - (new Date(a.date).getTime() || 0));
}

/**
 * Retrieves a single blog post by its URL slug.
 */
export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  const posts = getAllBlogPosts();
  return posts.find((p) => p.slug === slug);
}

