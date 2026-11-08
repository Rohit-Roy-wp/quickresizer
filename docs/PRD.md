# Product Requirements Document (PRD) - QuickResizer

**Project Name:** QuickResizer (Image Resizer & Converter)  
**Status:** In Development (MVP)  
**URL:** TBD (custom domain to be mapped on Vercel or alternative host)  
**Primary Brand:** QuickResizer  
**Target Audience:** Government-exam applicants (SSC, UPSC, IBPS, RRB, state PSCs), job seekers, students, and general internet users who must upload photos or signatures that meet strict size and dimension rules.

---

## 1. Executive Summary & Vision

QuickResizer is a free, no-login, mobile-first web utility that resizes, crops, compresses, and converts images to exact dimensions and an exact file-size limit (for example, under 20 KB or 50 KB). All processing runs in the user's browser, so images are never uploaded to any server.

The product wins on three things: speed (upload to compliant download in under 30 seconds), accuracy (the output reliably lands under the KB limit), and trust (100% on-device, no signup, minimal ads).

---

## 2. Problem Statement

- Forms demand narrow KB ranges (20-50 KB) and fixed dimensions (3.5 cm x 4.5 cm); uploads are rejected otherwise.
- Phone cameras output 2-8 MB images; users do not know how to reduce them correctly.
- Existing tools are ad-heavy, require login, upload photos to unknown servers, or miss the KB target.

---

## 3. Target Audience & User Personas

1. **The Exam Aspirant:**
   - Applies from a phone on a limited data plan.
   - Needs presets and a clear "Download" result without technical knowledge.
2. **The Cyber Cafe Operator:**
   - Processes 30+ forms a day on desktop.
   - Needs remembered settings and fast repeat runs.
3. **The Job Seeker:**
   - Uploads to private portals; needs px/cm/in resizing and JPG/PNG/WebP conversion.
4. **The Parent / Student:**
   - Fills admission forms; needs a very simple interface (Hindi UI planned for v2).

---

## 4. Goals & Non-Goals

### Goals
1. Upload to compliant download in under 30 seconds.
2. At least 98% success rate in hitting the target KB limit.
3. Infrastructure cost of 0 INR beyond the domain.
4. Organic ranking for exam-specific long-tail keywords, monetized through AdSense.

### Non-Goals (MVP)
- No accounts, cloud storage, or history sync.
- No filters, retouching, or background removal.
- No PDF compression or document scanning (roadmap).
- No native mobile app.

---

## 5. Core Features & Capabilities

### 5.1 Upload (P0)
- Drag-and-drop on desktop, native picker (with camera option) on mobile.
- Accepts `.jpg`, `.jpeg`, `.png`, `.webp`; maximum input size 15 MB.
- Local preview via `URL.createObjectURL`; URLs revoked on replace/unmount.
- Shows original file name, dimensions, and size.
- EXIF orientation applied so phone photos are not rotated.
- HEIC/HEIF shows a friendly "not supported yet" message with tips.

### 5.2 Dimension & Unit Controller (P0)
- Width/height inputs with units: `px`, `cm`, `in` (96 DPI: 1 in = 96 px, 1 cm = 37.7953 px).
- Aspect-ratio lock (default ON).
- Fit modes when unlocked: Stretch, Crop to fill (default), Fit with white padding.
- Live pixel readout (for example, "132 x 170 px"); validation 10-8000 px per side.

### 5.3 Target-KB Compression Engine (P0)
- User sets maximum KB and optional minimum KB (many forms need a range).
- Binary search on encoder quality (0.05 to 0.95, about 8 iterations) using `canvas.toBlob`.
- Exact size from `blob.size` (never the base64 estimate).
- If quality 0.05 is still too large: optional progressive downscale (90%, 80%, ...) or a clear warning.
- Quality parameter applies to JPEG and WebP only; PNG output with a KB target shows a warning and suggests JPEG/WebP.

### 5.4 Format Converter (P0)
- Outputs: JPEG (default), PNG, WebP.
- PNG to JPEG composites on a white background.
- WebP-unsupported browsers fall back to JPEG with a notice.

### 5.5 Exam Presets (P1)
- One-tap presets that fill dimensions, KB limits, and format (SSC, IBPS, UPSC, RRB, and more).
- Stored in a JSON config with a "last verified" date; users are told to confirm against the official notice.

### 5.6 Download & Reset (P0)
- Download button enabled only after a successful result.
- iOS Safari hint ("Long-press to save") when the download opens in a new tab.
- "Process another image" keeps the last settings.

### 5.7 Post-MVP
- Interactive crop and rotate (P2), batch mode with ZIP export (P3), Hindi UI (P3), PDF compression, passport-photo background fix.

---

## 6. Monetization & AdSense Integration

- **Zero-Layout-Shift Ad Slots:**
  - Header Leaderboard (728x90 desktop / 320x50 mobile)
  - In-Content rectangle below the result area
  - In-Article banner on blog and preset pages
- Maximum about 3 ad units per page in MVP; ads never sit between tool controls or next to the Download button.
- Ad scripts load after the tool is interactive to protect FCP and LCP.
- Compliance with Google AdSense Publisher Policies and consent requirements (GDPR/CCPA where applicable).

---

## 7. SEO & Content Strategy

- Home page tool plus 800+ words of original guidance and FAQ.
- Preset landing pages: `/ssc-photo-resizer-20kb-50kb`, `/ssc-signature-resizer-10kb-20kb`, `/ibps-photo-signature-resizer`, `/upsc-photo-signature-resizer`.
- Size-intent pages: `/compress-image-to-20kb`, `/50kb`, `/100kb`.
- Blog guides (how to resize a photo for form X, common rejection reasons).
- FAQ and `WebApplication` JSON-LD, sitemap, robots, canonical and OpenGraph tags.
- Every landing page carries unique text to avoid thin or duplicate content.

---

## 8. Trust & Legal Architecture

- Dedicated pages: [About](/about), [Contact](/contact), [Privacy Policy](/privacy-policy), [Terms of Service](/terms-of-service).
- Privacy Policy discloses Google AdSense, cookies, and third-party vendors, and states that images are processed on-device and never uploaded.
- Terms state that users are responsible for confirming final requirements with the official notification.

---

## 9. Success Metrics (KPIs)

| Metric | Target |
|---|---|
| First Contentful Paint | < 1.0 s on 4G |
| Largest Contentful Paint | < 2.0 s |
| Cumulative Layout Shift | < 0.05 (goal near 0) |
| INP | < 100 ms |
| Tool completion rate (upload to download) | > 60% |
| Target-KB success rate | >= 98% |
| Bounce rate | < 35-45% |
| Organic clicks (month 3) | 5,000+ |
| AdSense | Apply by Day 14; approval timing is controlled by Google |

---

## 10. Non-Functional Requirements

| Area | Requirement |
|---|---|
| **Build System** | Next.js (App Router), static generation for all marketing and preset pages |
| **Performance** | Home page JS under 150 KB gzip; usable on low-end Android (2 GB RAM) |
| **Privacy** | No image data leaves the device; analytics never capture file names or content |
| **Compatibility** | Latest 2 versions of Chrome, Edge, Firefox, Safari (iOS 15+), Samsung Internet |
| **Accessibility** | WCAG 2.1 AA targets; keyboard-operable drop zone; `aria-live` status messages |
| **Reliability** | Graceful fallback when Canvas, Web Worker, or WebP encoding is unsupported |
| **Security** | Strict file validation; Content-Security-Policy limited to AdSense and GA origins |
