# Design System & Aesthetics - QuickResizer

**Design Philosophy:** Calm, Trustworthy Utility (in the spirit of clean tools like Squoosh and iLovePDF, without the clutter)  
**Color Palette:** Soft Off-White and Slate with a single Cobalt Blue accent  
**Canvas Strategy:** Tool above the fold on every device; content max width 1200px for the tool, 720px for reading text

---

## 1. Design Philosophy: Fast Utility, Not a Template

QuickResizer is used by stressed people on deadline, often on a cheap phone. The interface must feel instant, obvious, and safe.

- **One Primary Action Per Step:** Upload, then Resize and Compress, then Download. Only one accent-colored button is visible at a time.
- **Solid, Quiet Surfaces:** White cards on an off-white page, thin slate borders, no frosted glass, no ambient glow orbs.
- **Restrained Palette:** Cobalt blue for the primary action, green only for success states, red only for errors, amber only for warnings.
- **Trust Signals Over Decoration:** A visible "Processed on your device. Nothing is uploaded." line near the tool replaces decorative badges.
- **Ads Never Compete With the Tool:** Ads sit outside the tool card and are visually separated from buttons.

---

## 2. Color Tokens & Palette

| Token Name | Hex / Class | Description / Usage |
|---|---|---|
| **Background** | `#f8fafc` / `bg-slate-50` | Page background. |
| **Surface Card** | `#ffffff` / `bg-white` | Tool card, settings panel, result card. |
| **Card Border** | `#e2e8f0` / `border-slate-200` | Hairline dividers and card outlines. |
| **Primary Accent** | `#2563eb` / `bg-blue-600` | Primary buttons, focus rings, active tabs. |
| **Primary Hover** | `#1d4ed8` / `bg-blue-700` | Button hover state. |
| **Heading Text** | `#0f172a` / `text-slate-900` | Headings and key values. |
| **Body Text** | `#334155` / `text-slate-700` | Paragraphs and labels. |
| **Muted Text** | `#64748b` / `text-slate-500` | Helper text, file metadata, timestamps. |
| **Success** | `#16a34a` / `text-green-600` | "Under limit" confirmation only. |
| **Warning** | `#d97706` / `text-amber-600` | Below-minimum KB, format fallback notices. |
| **Error** | `#dc2626` / `text-red-600` | Invalid file, impossible target. |

> [!IMPORTANT]
> **Dark mode (optional, post-MVP):** If added, use `#0b1220` background and `#111827` surfaces with the same accent. Never mix both themes in one component.

---

## 3. Layout & Grid Specification

### 3.1 Desktop Layout
```
+--------------------------------------------------------------+
| [Logo QuickResizer]                      [Blog] [Contact]     |
+--------------------------------------------------------------+
|                      [ AD LEADERBOARD ]                       |
+--------------------------------------------------------------+
|  +---------------------+     +---------------------------+    |
|  |     UPLOAD ZONE     |     |      SETTINGS PANEL       |    |
|  | Drag & Drop / Browse|     | Preset: [ SSC Photo  v ]  |    |
|  | [Preview + info]    |     | W [3.5] H [4.5] Unit [cm] |    |
|  +---------------------+     | Lock ratio [x]            |    |
|                              | Max KB [50]  Min KB [20]  |    |
|                              | Format [JPG v]            |    |
|                              | [ Resize & Compress ]     |    |
|                              +---------------------------+    |
|                         [ Result card + DOWNLOAD IMAGE ]      |
+--------------------------------------------------------------+
|  [ SEO CONTENT + FAQ ]                                        |
+--------------------------------------------------------------+
|  Footer: Privacy | Terms | Contact | About                    |
+--------------------------------------------------------------+
```

- **Tool Container:** `max-w-[1200px]`, two columns from `lg` (1024px) upward: upload zone left, settings right.
- **Reading Container:** `max-w-[720px]` for SEO content, blog posts, and legal pages.

### 3.2 Responsive Behavior
- **Mobile (< 640px):** Single column in this order: Header, Upload, Settings, Resize button, Result and Download, in-content ad, SEO text. Tap targets at least 44px high.
- **Tablet (640px - 1024px):** Single column with wider cards (`max-w-2xl`).
- **Desktop (>= 1024px):** Two-column tool layout.
- Never allow horizontal scrolling at 320px width.

---

## 4. Typography & Prose Styling

- **Font Stack:** `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif` (system fonts for zero font-loading cost).
- **Headings:** `font-bold`, `tracking-tight`, `text-slate-900`. One `<h1>` per page.
- **Body:** 16px minimum, line height 1.6, `text-slate-700`.
- **Numbers:** Use `tabular-nums` for KB and pixel readouts so values do not jitter.
- **Prose Links:** Underlined with `text-blue-700`; visited state not altered.

---

## 5. Micro-Interactions & States

- **Transitions:** `transition-colors duration-150` only. No scale bounces, no jumping arrows, no parallax.
- **Focus:** Visible 2px blue focus ring on every interactive element.
- **Drop Zone:** Dashed slate border by default; solid blue border and light blue tint on drag-over.
- **Processing:** Inline progress bar (solid blue) with text such as "Compressing... 3 of 8".
- **Zero Heavy Shadows:** Cards use a 1px border and at most `shadow-sm`.

### Required States (design and build every one)
Empty, file selected, processing, success, target impossible, invalid file, file too large, unsupported format (HEIC), WebP fallback notice.

---

## 6. Component Style Guidelines

### 6.1 Upload Zone
- Large tap area with the text "Drag and drop an image here, or Browse".
- After selection, shows thumbnail, file name, original dimensions, and size, plus "Replace" and "Remove" text buttons.

### 6.2 Settings Panel
- Labeled inputs (never placeholder-only labels).
- Unit selector as a segmented control (px | cm | in).
- Aspect-lock as a labeled checkbox, default checked.
- Primary button text: "Resize & Compress".

### 6.3 Result Card
- Shows final size as large text, for example "48.6 KB" with a green "Under 50 KB" label.
- Before and after row: original size and dimensions versus new size and dimensions.
- Primary "Download Image" button; secondary "Process another image" link.
- iOS hint line: "On iPhone, long-press the image to save it."

### 6.4 Ad Slots
- Fixed-height wrappers (`min-h-[90px]` banner, `min-h-[250px]` rectangle) with a small "Advertisement" label.
- At least 24px gap from any button or input.
- No ad inside the settings panel or between the result card and Download button.

### 6.5 Preset Selector
- Dropdown on mobile, chip row on desktop (SSC Photo, SSC Signature, IBPS Photo, ...).
- Selected preset shows "Last verified: DD Mon YYYY" in muted text.

---

## 7. Content & Copy Tone

- Plain, direct, helpful language. Short sentences. Hindi-friendly wording for later translation.
- Error messages say what happened and what to do next, for example: "This image cannot reach 20 KB at 600 x 800 px. Try smaller dimensions."
- No invented statistics or fake user counts.
- Always remind users to check the official notification for final requirements.
