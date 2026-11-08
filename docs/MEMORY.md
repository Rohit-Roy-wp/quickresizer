# Project Memory & Operational Context - QuickResizer

This document stores persistent context, key decisions, resolved issues, and domain knowledge for the QuickResizer repository. Update it whenever a significant decision is made or a notable bug is solved.

---

## 1. Project Identity & Context

- **Repository:** QuickResizer (Image Resizer & Converter)
- **Deployment URL:** `https://quickresizer-zeta.vercel.app` (custom domain `quickresizer.com` to be mapped when purchased)
- **GitHub Remote:** `https://github.com/Rohit-Roy-wp/quickresizer.git` (`main` branch)
- **Core Technology Stack:** Next.js (App Router), TypeScript, Tailwind CSS v4, HTML5 Canvas API, `gray-matter` for blog MDX, PostCSS.
- **Contact Email:** `quickresizer.help@gmail.com`
- **Contact Form Provider:** Web3Forms (Access Key: `8f6054f0-0f24-4340-aa63-d2caa79bdeaa`)
- **Analytics:** `@vercel/analytics/react` (Cookie-less, GDPR-compliant Vercel Web Analytics)
- **Ad Network:** Adsterra (Active Keys: `787fe558e3181cf817e1b3c33feb4c9c` for 160x600, `645aa366f646e155f809f377e5beb04b` for 728x90, `c6000286bc363e762928f7cf457fda3d` for 300x250)
- **Audience:** Indian government-exam applicants (SSC, UPSC, IBPS, RRB), job seekers, students.

---

## 2. Critical Operating Constraints & Decision Log

### Decision 1: Strict Manual Git Push Policy
- **Rule:** Never execute `git push` autonomously.
- **Context:** The owner reviews all code changes locally and pushes manually.
- **Protocol:** Make sure the project compiles with `npm run build`, check `git status`, and tell the owner that changes are ready locally.

---

### Decision 2: 100% Client-Side Processing
- **Decision:** All resizing, compression, and conversion run in the browser. No image is ever uploaded.
- **Why:** Zero server cost, strong privacy selling point, and instant results without network delay.
- **Consequence:** No backend, database, or API routes in MVP. Privacy Policy and the on-page message must say that images stay on the device.

---

### Decision 3: Binary Search Instead of a Linear Quality Loop
- **Problem:** The original plan stepped quality down by 0.05 until the size fit, which takes up to 18 encodes and often lands far below the limit.
- **Solution:** Binary search over quality (`0.05` to `0.95`, about 8 iterations) that keeps the highest-quality blob still under the limit.

---

### Decision 4: Exact Size Measurement With `blob.size`
- **Problem:** `base64String.length * 0.75` is only an approximation (padding and data-URL prefix distort it).
- **Solution:** Use `canvas.toBlob` and compare `blob.size` in bytes against the target.

---

### Decision 5: PNG Cannot Be Quality-Tuned
- **Fact:** The canvas `quality` parameter only affects JPEG and WebP. PNG is lossless.
- **Handling:** When PNG is chosen with a KB target, show a warning, suggest JPEG or WebP, or reduce dimensions instead.

---

### Decision 6: Crop-to-Fill as the Default Fit Mode
- **Why:** Stretching distorts faces and gets photos rejected by humans reviewing forms.
- **Options:** Stretch, Crop to fill (default), Fit with white padding.

---

### Decision 7: Presets Are Data, and Must Be Verified
- **Rule:** Exam requirements change with each notification. Presets live in `data/presets.json` with `lastVerified` and `sourceUrl`.
- **Rule:** Never publish a preset value without checking an official source; always tell users to confirm with the official notice.
- **Indicative starting values (verify before use):**
  - SSC photo: 3.5 x 4.5 cm, 20-50 KB
  - SSC signature: 4 x 2 cm, 10-20 KB
  - IBPS photo: 200 x 230 px, 20-50 KB
  - IBPS signature: 140 x 60 px, 10-20 KB

---

### Decision 8: KB Definition
- **Default:** 1 KB = 1024 bytes. Some portals count 1000 bytes, so keep a 2-3 KB safety margin and show a small note beside the KB input.

---

### Decision 9: Hosting and Commercial Use
- **Issue:** The Vercel Hobby plan is meant for non-commercial use, and this site will show ads.
- **Plan:** Use Vercel Pro, Cloudflare Pages, or Netlify. Confirm current terms before launch.

---

### Decision 10: AdSense Expectations
- **Reality:** Approval time is decided by Google and is not guaranteed within 14 days.
- **Preparation:** Publish original content first (home SEO text, preset pages, at least 5 blog guides), plus Privacy, Terms, About, and Contact pages, before applying.
- **Ad Rules:** About 3 units per page, fixed-height wrappers for zero CLS, and never near buttons or inside the tool.

---

### Decision 11: Realistic Timeline
- **Change:** The original 5-day plan is aggressive. The working plan is 7 days for the MVP, with extra time for quality SEO content.

---

## 3. Known Pitfalls & Resolved Knowledge

| Topic | Notes |
|---|---|
| Phone photos appear rotated | Decode with `createImageBitmap(file, { imageOrientation: "from-image" })`. |
| Transparent PNG becomes black in JPEG | Fill the canvas white before drawing. |
| Memory leaks | Revoke every object URL; close `ImageBitmap` after use. |
| Huge inputs crash Safari | Downscale above 8000 px per side; cap canvas area. |
| iOS Safari download opens a new tab | Show hint: "Long-press the image to save." |
| HEIC from iPhones | Not supported in MVP; show a friendly message and tips. |
| CLS from ads | Fixed-height wrappers (`min-h-[90px]`, `min-h-[250px]`). |
| Below-minimum KB | Raise quality up to 0.95; otherwise warn that the image is already smaller than the minimum. |

---

## 4. Essential Commands Reference

```powershell
# Create the project
npx create-next-app@latest quickresizer

# Start local development server
npm run dev

# Full production build verification (type checking + static generation)
npm run build

# Check local working directory state (do not push)
git status -s
```

---

## 5. Open Questions

- Final domain name and branding?
- Which host: Vercel Pro, Cloudflare Pages, or Netlify?
- Which presets ship first, and who re-verifies them each notification cycle?
- Contact email address for the legal pages?
