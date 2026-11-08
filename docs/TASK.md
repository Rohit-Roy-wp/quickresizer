# Task Tracker & Changelog - QuickResizer

This document tracks engineering milestones, active work, and the product roadmap. Tick items off (`[x]`) as they are completed locally and verified with `npm run build`.

---

## 1. MVP Milestones

### Milestone 1: Foundation & Project Setup
- [x] Initialize Next.js with TypeScript, Tailwind CSS, and App Router (`npx create-next-app@latest`).
- [x] Set up folder structure from `docs/ARCHITECTURE.md`.
- [x] Configure theme tokens in `globals.css` (slate neutrals plus cobalt accent).
- [x] Build `Navbar`, `Footer`, and root `layout.tsx` with mobile-first responsive grid.
- [x] Create `AdSlot.tsx` with fixed-height, zero-CLS wrappers (no live ad code yet).
- [x] Create `loading.tsx` skeleton for the tool layout.

### Milestone 2: Image Engine
- [x] `validate.ts`: MIME, extension, and 15 MB limit checks.
- [x] `exif.ts`: orientation-safe decode with `createImageBitmap`.
- [x] `units.ts`: px / cm / in conversion (96 DPI, 37.7953 px per cm) with unit tests.
- [x] `resize.ts`: canvas scaling with Stretch, Crop-to-fill, and Pad fit modes.
- [x] `compress.ts`: binary-search quality engine using `canvas.toBlob` and `blob.size`.
- [x] Downscale fallback when quality 0.05 still exceeds the limit.
- [x] Minimum-KB handling and below-minimum warning.
- [x] JPEG / PNG / WebP output with white-background compositing and WebP fallback.
- [x] PNG-with-KB-target warning.
- [x] Web Worker + `OffscreenCanvas` version with main-thread fallback.

### Milestone 3: Tool UI
- [x] `UploadZone`: drag-drop, browse, preview, replace/remove, file info.
- [x] `SettingsPanel`: dimensions, unit control, aspect-ratio lock, KB range, format.
- [x] `ResultCard`: final size, before/after comparison, Download button, "Process another".
- [x] All states designed and built: empty, processing, success, impossible target, invalid file, too large, HEIC unsupported.
- [x] iOS Safari download hint.
- [x] Accessibility pass: labels, focus rings, `aria-live` status, keyboard drop zone.

### Milestone 4: Presets
- [x] Create `data/presets.json` with schema (`slug`, `label`, dimensions, KB range, format, `lastVerified`, `sourceUrl`).
- [x] `PresetSelector` component (dropdown on mobile, chips on desktop).
- [x] Verify each preset against the official notification before publishing.
- [x] Generate preset landing pages with `generateStaticParams()`.

### Milestone 5: Trust, Legal & AdSense Readiness
- [x] Write [Privacy Policy](/privacy-policy) with AdSense, cookies, and on-device processing disclosure.
- [x] Write [Terms of Service](/terms-of-service).
- [x] Write [About](/about) and [Contact](/contact) (working email address).
- [x] Add `CookieConsent.tsx` with consent-gated ad personalization.
- [x] Add `public/ads.txt` after AdSense publisher ID is available.
- [x] Add visible "Processed on your device. Nothing is uploaded." message near the tool.

### Milestone 6: SEO & Content
- [x] Write 800+ word SEO section and FAQ for the home page.
- [x] Write unique 300+ word content for each preset and size-intent page.
- [x] Publish at least 5 blog guides before applying to AdSense.
- [x] Add `JsonLd.tsx` (`WebApplication`, `FAQPage`).
- [x] Add `sitemap.ts`, `robots.ts`, canonical tags, and OpenGraph images.

### Milestone 7: Analytics, Deployment & Launch
- [x] Add GA4 with the allowed event list (no file names or image data).
- [ ] Choose host (Vercel Pro, Cloudflare Pages, or Netlify) after checking commercial-use terms.
- [ ] Push to GitHub (manually by owner), connect to host, map custom domain (`A` / `CNAME`).
- [ ] Verify HTTPS and redirects.
- [ ] Submit sitemap in Google Search Console.
- [ ] Run Lighthouse (mobile) and fix issues to reach 90+ for Performance and SEO.
- [x] Run the DevTools Network check to confirm no image data leaves the device.
- [ ] Apply for Google AdSense.

### Milestone 8: Cross-Browser QA
- [ ] Test on Chrome Android, Safari iOS, Chrome, Edge, Firefox.
- [ ] Test on a low-end (2 GB RAM) Android device.
- [ ] Run the full test image set (portrait photo, signature scan, transparent PNG, 10 MB DSLR, 5 KB image, panorama).
- [ ] Manually upload outputs to a real portal where possible.

---

## 2. Suggested Timeline

| Phase | Duration | Milestones |
|---|---|---|
| Foundation | Day 1 | 1 |
| Image Engine | Days 2-3 | 2 |
| Tool UI + Presets | Day 4 | 3, 4 |
| Compliance + SEO | Day 5-6 | 5, 6 |
| Deploy + Launch | Day 7 | 7, 8 |
| Growth | Weeks 2-12 | Blog posts, preset pages, monitoring |

---

## 3. Active Roadmap & Future Tasks

- [ ] **Interactive Crop & Rotate:** Fixed-ratio crop box and 90-degree rotation.
- [ ] **Batch Mode:** Multiple files with ZIP download.
- [ ] **Hindi UI:** Language toggle for non-English users.
- [ ] **PDF Compress/Resize to KB:** High-demand document upload use case.
- [ ] **Photo + Signature Sheet Builder:** Combined output for forms needing both.
- [ ] **PWA / Offline Mode:** Installable offline version.
- [ ] **Passport Background Fix:** One-tap white background cleanup.
- [ ] **Preset Freshness Workflow:** Reminder process to re-verify presets each notification cycle.

---

## 4. Changelog

| Date | Change |
|---|---|
| 2026-11-07 | Completed MVP Milestones 1 through 6: Project setup, Image Engine, Tool UI, Exam Presets, Trust & Legal Pages, SEO & Blog Guides, and GA4 Analytics privacy configuration. All 27 static routes verified with zero errors. |
| 2026-11-07 | Project documentation suite created (PRD, Architecture, Design, Rules, Task, Memory). |
