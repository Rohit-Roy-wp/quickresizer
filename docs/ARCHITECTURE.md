# Technical Architecture - QuickResizer

**Framework:** Next.js (App Router)  
**Language:** TypeScript 5+  
**Styling Engine:** Tailwind CSS  
**Image Engine:** HTML5 Canvas API, `createImageBitmap`, `canvas.toBlob` (100% client-side)  
**Content Layer:** Markdown/MDX with `gray-matter` (blog) and JSON (presets)  
**Deployment Platform:** Vercel, Cloudflare Pages, or Netlify (see Section 7)

---

## 1. High-Level Architecture

QuickResizer uses Static Site Generation (SSG) for every marketing, preset, blog, and legal page. The tool itself is a single Client Component that processes images entirely inside the browser. There is no backend, no database, and no image upload.

```
  [User Browser]
        |
        | file select / drag-drop
        v
  [validate.ts]  type, size (<= 15 MB), dimensions
        |
        v
  [exif.ts]  createImageBitmap(imageOrientation: "from-image")
        |
        v
  [resize.ts]  canvas draw at target W x H (stretch / crop / pad)
        |
        v
  [compress.ts]  binary search on quality via toBlob
        |        (Web Worker + OffscreenCanvas when available)
        v
  [Result Blob]  exact blob.size check vs target KB
        |
        v
  [URL.createObjectURL]  preview + download to user device
```

---

## 2. Directory Structure Map

```
QuickResizer/
├── content/
│   └── blog/                   # MDX guides with YAML frontmatter
│       ├── how-to-resize-ssc-photo.mdx
│       └── ...
├── data/
│   └── presets.json            # Exam presets (dimensions, KB range, format, lastVerified)
├── docs/                       # Project documentation
│   ├── ARCHITECTURE.md
│   ├── DESIGN.md
│   ├── MEMORY.md
│   ├── PRD.md
│   ├── RULES.md
│   └── TASK.md
├── public/
│   ├── favicon.ico
│   ├── og-image.png
│   └── ads.txt
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout, GA4 + AdSense loaders, consent
│   │   ├── page.tsx            # Home: tool + SEO content + FAQ
│   │   ├── loading.tsx         # Zero-CLS skeleton
│   │   ├── globals.css         # Theme tokens
│   │   ├── [preset]/page.tsx   # Preset landing pages (SSG from presets.json)
│   │   ├── compress-image-to-[size]kb/  # Size-intent landing pages
│   │   ├── blog/               # Blog index and [slug] routes
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── privacy-policy/page.tsx
│   │   ├── terms-of-service/page.tsx
│   │   ├── sitemap.ts          # Automated sitemap
│   │   └── robots.ts
│   ├── components/
│   │   ├── tool/
│   │   │   ├── ImageTool.tsx       # Client component, owns tool state
│   │   │   ├── UploadZone.tsx      # Drag-drop + browse + preview
│   │   │   ├── SettingsPanel.tsx   # Dimensions, unit, KB range, format
│   │   │   ├── PresetSelector.tsx  # One-tap exam presets
│   │   │   └── ResultCard.tsx      # Before/after, final KB, download
│   │   ├── ads/
│   │   │   └── AdSlot.tsx          # Fixed-height, zero-CLS AdSense container
│   │   ├── common/
│   │   │   └── CookieConsent.tsx   # Consent banner
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   └── seo/
│   │       ├── JsonLd.tsx          # WebApplication + FAQPage schema
│   │       └── FaqSection.tsx
│   ├── lib/
│   │   ├── image/
│   │   │   ├── units.ts            # px / cm / in conversion
│   │   │   ├── validate.ts         # File type and size validation
│   │   │   ├── exif.ts             # Orientation-safe decode
│   │   │   ├── resize.ts           # Canvas scaling, fit modes
│   │   │   └── compress.ts         # Binary-search compression engine
│   │   ├── presets.ts              # Typed preset loader
│   │   ├── blog.ts                 # MDX reader (gray-matter)
│   │   ├── analytics.ts            # GA4 event helpers
│   │   └── types.ts                # Shared interfaces
│   └── workers/
│       └── compress.worker.ts      # Off-main-thread compression
```

---

## 3. Data Flow & Processing Pipeline

1. **Input:** User selects a file; `validate.ts` checks MIME type, extension, and the 15 MB cap.
2. **Decode:** `exif.ts` decodes with `createImageBitmap(file, { imageOrientation: "from-image" })` so orientation is correct.
3. **Dimensions:** `units.ts` converts cm and in to pixels (1 in = 96 px, 1 cm = 37.7953 px) and rounds to whole pixels.
4. **Resize:** `resize.ts` draws onto a canvas using the chosen fit mode (stretch, crop-to-fill, pad). JPEG output gets a white fill first.
5. **Compress:** `compress.ts` runs a binary search (`low = 0.05`, `high = 0.95`, about 8 iterations) and keeps the highest-quality blob under the limit.
6. **Fallbacks:** If quality 0.05 still exceeds the limit, downscale stepwise (if allowed) or return an actionable error.
7. **Output:** The final blob is previewed and downloaded through an object URL; URLs are revoked on reset.

### Preset Schema (`data/presets.json`)
```json
{
  "slug": "ssc-photo",
  "label": "SSC Photo",
  "width": 3.5,
  "height": 4.5,
  "unit": "cm",
  "minKB": 20,
  "maxKB": 50,
  "format": "jpeg",
  "lastVerified": "YYYY-MM-DD",
  "sourceUrl": "official notification link"
}
```

---

## 4. Compression Core (Reference)

```ts
export async function compressToTarget(
  canvas: HTMLCanvasElement | OffscreenCanvas,
  mime: "image/jpeg" | "image/webp",
  maxBytes: number
): Promise<Blob | null> {
  let low = 0.05, high = 0.95;
  let best: Blob | null = null;
  for (let i = 0; i < 8; i++) {
    const q = (low + high) / 2;
    const blob = await toBlob(canvas, mime, q);
    if (!blob) break;
    if (blob.size <= maxBytes) { best = blob; low = q; }
    else { high = q; }
  }
  return best; // null => caller downscales or reports failure
}
```

Notes:
- `quality` has no effect on PNG; PNG targets rely on dimension reduction or a format suggestion.
- Binary search needs about 8 encodes versus up to 18 for a linear 0.05 step loop.

---

## 5. Performance Architecture

- Heavy compression runs in a Web Worker with `OffscreenCanvas` when supported; main-thread fallback otherwise.
- Oversized inputs (above 8000 px) are downscaled before processing to avoid memory crashes.
- Ad scripts and analytics load after the tool is interactive (`afterInteractive` / idle).
- All ad wrappers use fixed heights (`min-h-[90px]`, `min-h-[250px]`) to keep CLS near zero.
- Static pages ship minimal JS; only `ImageTool` hydrates on the client.

---

## 6. SEO & Structured Data Architecture

- **JSON-LD:** `WebApplication` on tool pages and `FAQPage` on pages with FAQs.
- **Canonical URLs:** Every route sets an absolute canonical tag.
- **Sitemap:** `src/app/sitemap.ts` lists the home page, all presets, size-intent pages, blog posts, and legal pages.
- **Preset Pages:** Generated from `presets.json` via `generateStaticParams()`, each with unique title, H1, copy, and FAQ.

---

## 7. Hosting Note

The Vercel Hobby plan is intended for non-commercial use. Because the site will earn ad revenue, plan to use Vercel Pro, or deploy on Cloudflare Pages or Netlify. Confirm current terms before launch. The architecture is host-agnostic because there is no server runtime.

---

## 8. Privacy & Security Architecture

- No network request ever carries image data; this is verified in browser DevTools before each release.
- Analytics events contain only coarse metadata (format, size bucket, KB target), never file names or pixels.
- Content-Security-Policy allows only the AdSense and Google Analytics origins required.
- User input is never rendered with `dangerouslySetInnerHTML`.
