# Development Rules & Coding Standards - QuickResizer

This document establishes the mandatory engineering and design rules for all developers and AI agents working on QuickResizer.

---

## 1. Absolute Git Workflow Rule

> [!CAUTION]
> **NEVER PUSH TO GIT DIRECTLY (`git push` IS STRICTLY FORBIDDEN):**  
> All code changes remain in the local working directory. The owner reviews changes locally and runs `git push` manually. Never run `git push` or write scripts that push to the remote repository.

- Before handing work back: run `npm run build`, check `git status`, and report that changes are ready locally.

---

## 2. Next.js & TypeScript Rules

- **Check Current Docs:** Next.js conventions change between major versions. Check the installed version's docs in `node_modules/next/dist/docs/` before using older patterns.
- **Dynamic Route Params:** If the installed version makes `params` a Promise, always `await params` in pages and `generateMetadata`.
- **SSG First:** Marketing, preset, blog, and legal pages must be statically generated with `generateStaticParams()` where routes are dynamic.
- **Client Boundary:** Only the tool (`ImageTool` and its children), `CookieConsent`, and mobile nav use `"use client"`. Keep everything else as Server Components.
- **TypeScript Strictness:** `strict: true`. No `any` without a one-line justification comment.
- **Build Verification:** Always run `npm run build` after changes. Zero TypeScript or lint errors before work is considered done.

---

## 3. Image Engine Rules (Critical)

1. **100% Client-Side:** Never send image data, blobs, or file names to any server or third-party endpoint.
2. **Exact Size Only:** Measure output with `blob.size`. Never estimate from base64 length.
3. **Binary Search, Not Linear Loops:** Quality search uses binary search (`0.05` to `0.95`, about 8 iterations).
4. **Quality Applies to JPEG and WebP Only:** Never imply that PNG quality can be tuned. Warn the user or reduce dimensions.
5. **White Background for JPEG:** Fill the canvas white before drawing, otherwise transparency becomes black.
6. **Respect EXIF Orientation:** Decode with `createImageBitmap(file, { imageOrientation: "from-image" })`.
7. **Unit Conversion Constants:** 1 in = 96 px, 1 cm = 37.7953 px. Round final pixel values to integers. Keep constants in `units.ts` only.
8. **KB Definition:** 1 KB = 1024 bytes by default; show this in a small note near the KB input.
9. **Free Memory:** Revoke every `URL.createObjectURL` on replace, reset, and unmount. Close `ImageBitmap` objects after use.
10. **Guard Large Inputs:** Downscale images above 8000 px per side before processing; cap canvas area for Safari.
11. **Heavy Work Off the Main Thread:** Use the Web Worker with `OffscreenCanvas` when available; fall back gracefully.
12. **Never Fail Silently:** Every failure path shows a clear, actionable message.

---

## 4. Presets Rules

- All exam presets live in `data/presets.json`; never hard-code them in components.
- Every preset has `lastVerified` and `sourceUrl`. Update them whenever a notification changes.
- Preset pages must show the "Last verified" date and tell users to confirm against the official notice.
- Never publish a preset value that has not been checked against an official source.

---

## 5. Design & UX Rules (Checklist)

1. **Palette Discipline:** Slate neutrals plus one cobalt blue accent. Green for success, amber for warnings, red for errors only.
2. **No Gradient Text or Gradient Buttons.**
3. **No Glassmorphism or Blur Orbs:** Use solid white cards with 1px `border-slate-200`.
4. **No Heavy Shadows:** At most `shadow-sm`.
5. **No Hover Scale Bounces or Jumping Arrows:** Use `transition-colors duration-150` only.
6. **No Sparkle or Magic-Wand Icons:** Use plain, functional icons (`Upload`, `Download`, `Image`, `Crop`).
7. **No Emojis as UI Icons.**
8. **No Fake Social Proof:** Never write claims like "Trusted by 1M users".
9. **No Pricing Tiers or Login Walls:** The product is free and requires no account.
10. **No Rounded-3xl Bubbles:** Use `rounded-lg` or `rounded-xl`.
11. **One Primary Button Per Step.**
12. **Tap Targets of 44px or More; No Horizontal Scroll at 320px.**
13. **Every Input Has a Visible Label.**
14. **Maintain Skeleton Loader:** Keep `src/app/loading.tsx` aligned with the tool layout.
15. **Maintain Legal Pages:** Keep Privacy Policy and Terms current whenever tracking, ads, or features change.

---

## 6. Ads & Monetization Rules

- Maximum about 3 ad units per page in MVP.
- Every ad wrapper has a fixed `min-h` to prevent layout shift.
- Keep at least 24px between an ad and any button or input; never place ads inside the settings panel.
- Label ad areas "Advertisement"; never style content to look like an ad or an ad to look like content.
- Never encourage clicks on ads.
- Load ad scripts after the tool is interactive.
- Show a consent banner where required; do not load personalized ads before consent.

---

## 7. SEO & Semantic HTML Rules

- **Single `<h1>` Per Page:** Exactly one descriptive `<h1>` per route.
- **Meta Title Format:** `{Task}: {Detail} | QuickResizer` (for example, `SSC Photo Resizer 20KB-50KB | QuickResizer`).
- **Unique Content:** Every preset and size page needs unique copy of 300+ words; the home page 800+ words. No copy-paste pages.
- **Structured Data:** Keep `JsonLd.tsx` valid: `WebApplication` and `FAQPage`.
- **Canonical + Sitemap:** Every route has a canonical tag and appears in `sitemap.ts`.
- **Images:** Use `next/image` with explicit `alt` and `sizes`.
- **Semantic Elements:** Use `<main>`, `<nav>`, `<section>`, `<article>`, `<footer>` and ARIA labels where needed.

---

## 8. Privacy, Analytics & Security Rules

- **Allowed GA4 Events:** `file_selected`, `preset_selected`, `compress_start`, `compress_success`, `compress_fail`, `download_click`. Parameters limited to type, size bucket, target KB, format, iteration count, duration.
- **Forbidden in Analytics:** File names, image data, EXIF data, or any personal data.
- **Validate Files Strictly:** Check MIME type, extension, and the 15 MB cap before decoding.
- **No `dangerouslySetInnerHTML`** with user-provided strings.
- **CSP:** Allow only AdSense and Google Analytics origins.
- **Before Each Release:** Open DevTools Network tab, run a full flow, and confirm no request contains image data.

---

## 9. Testing Rules

- **Unit Tests:** Unit conversion, aspect-ratio math, binary-search selection (largest quality under limit), preset schema validation.
- **Test Image Set:** Portrait phone photo, scanned signature, transparent PNG, 10 MB DSLR image, tiny 5 KB image, panorama.
- **Browsers:** Chrome Android, Safari iOS, Chrome, Edge, Firefox (desktop).
- **Performance Gate:** Lighthouse mobile 90+ for Performance and SEO before launch.
