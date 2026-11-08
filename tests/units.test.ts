import test from "node:test";
import assert from "node:assert/strict";
import {
  toPixels,
  fromPixels,
  bytesToKB,
  kbToBytes,
  formatBytes,
  PX_PER_INCH,
  PX_PER_CM,
  BYTES_PER_KB,
} from "../src/lib/image/units";
import { validateImageFile } from "../src/lib/image/validate";
import { getAllPresets, getPresetBySlug } from "../src/lib/presets";
import { getAllBlogPosts, getBlogPostBySlug } from "../src/lib/blog";
import { getFileSizeBucket } from "../src/lib/analytics";

test("Unit Conversion Constants", () => {
  assert.equal(PX_PER_INCH, 96, "1 inch must equal 96 pixels at 96 DPI");
  assert.equal(PX_PER_CM, 37.7953, "1 cm must equal 37.7953 pixels");
  assert.equal(BYTES_PER_KB, 1024, "1 KB must equal 1024 bytes");
});

test("toPixels conversion", () => {
  assert.equal(toPixels(100, "px"), 100);
  assert.equal(toPixels(3.5, "cm"), 132);
  assert.equal(toPixels(4.5, "cm"), 170);
  assert.equal(toPixels(2, "in"), 192);
  assert.equal(toPixels(0, "px"), 0);
  assert.equal(toPixels(-5, "cm"), 0);
});

test("fromPixels conversion", () => {
  assert.equal(fromPixels(100, "px"), 100);
  const cm = fromPixels(132, "cm");
  assert.ok(Math.abs(cm - 3.5) < 0.05, `Expected ~3.5 cm, got ${cm}`);
  assert.equal(fromPixels(192, "in"), 2);
});

test("KB / Bytes conversions", () => {
  assert.equal(kbToBytes(50), 51200);
  assert.equal(kbToBytes(20), 20480);
  assert.equal(bytesToKB(51200), 50);
  assert.equal(bytesToKB(20480), 20);

  assert.equal(formatBytes(51200), "50.0 KB");
  assert.equal(formatBytes(500), "500 B");
  assert.equal(formatBytes(2 * 1024 * 1024), "2.00 MB");
});

test("File Validation", () => {
  const validFile = new File(["dummy content"], "test.jpg", { type: "image/jpeg" });
  assert.equal(validateImageFile(validFile).valid, true);

  const emptyFile = new File([], "empty.jpg", { type: "image/jpeg" });
  const emptyRes = validateImageFile(emptyFile);
  assert.equal(emptyRes.valid, false);
  assert.equal(emptyRes.code, "EMPTY_FILE");

  const heicFile = new File(["content"], "photo.heic", { type: "image/heic" });
  const heicRes = validateImageFile(heicFile);
  assert.equal(heicRes.valid, false);
  assert.equal(heicRes.code, "HEIC_UNSUPPORTED");

  const pdfFile = new File(["content"], "doc.pdf", { type: "application/pdf" });
  const pdfRes = validateImageFile(pdfFile);
  assert.equal(pdfRes.valid, false);
  assert.equal(pdfRes.code, "INVALID_TYPE");
});

test("Preset Schema Validation", () => {
  const presets = getAllPresets();
  assert.ok(presets.length >= 5, "Must have at least 5 presets defined");

  for (const preset of presets) {
    assert.ok(preset.slug && typeof preset.slug === "string", "Preset must have slug");
    assert.ok(preset.label && typeof preset.label === "string", "Preset must have label");
    assert.ok(preset.width > 0, `Width must be > 0 for ${preset.slug}`);
    assert.ok(preset.height > 0, `Height must be > 0 for ${preset.slug}`);
    assert.ok(["px", "cm", "in"].includes(preset.unit), `Valid unit for ${preset.slug}`);
    assert.ok(preset.maxKB > 0, `maxKB must be > 0 for ${preset.slug}`);
    if (preset.minKB) {
      assert.ok(preset.minKB < preset.maxKB, `minKB < maxKB for ${preset.slug}`);
    }
    assert.ok(["jpeg", "png", "webp"].includes(preset.format), `Valid format for ${preset.slug}`);
    assert.ok(
      /^\d{4}-\d{2}-\d{2}$/.test(preset.lastVerified),
      `lastVerified must be YYYY-MM-DD for ${preset.slug}`
    );
    assert.ok(preset.sourceUrl.startsWith("http"), `sourceUrl must start with http for ${preset.slug}`);
  }

  assert.ok(getPresetBySlug("ssc-photo-resizer-20kb-50kb"), "SSC Photo preset must exist");
  assert.ok(getPresetBySlug("ssc-signature-resizer-10kb-20kb"), "SSC Signature preset must exist");
  assert.ok(getPresetBySlug("ibps-photo-signature-resizer"), "IBPS preset must exist");
  assert.ok(getPresetBySlug("upsc-photo-signature-resizer"), "UPSC preset must exist");
});

test("Blog Guides Validation", () => {
  const posts = getAllBlogPosts();
  assert.ok(posts.length >= 5, "Must publish at least 5 blog guides for AdSense depth");

  for (const post of posts) {
    assert.ok(post.slug, "Post must have slug");
    assert.ok(post.title, "Post must have title");
    assert.ok(post.description, "Post must have description");
    assert.ok(post.content.length > 200, "Post must have substantial content");
  }

  assert.ok(getBlogPostBySlug("how-to-resize-photo-for-ssc-cgl-chsl"), "SSC guide must exist");
  assert.ok(getBlogPostBySlug("how-to-compress-signature-to-10kb-20kb"), "Signature guide must exist");
});

test("Analytics Privacy Bucketing", () => {
  assert.equal(getFileSizeBucket(200 * 1024), "<500KB");
  assert.equal(getFileSizeBucket(800 * 1024), "500KB-1MB");
  assert.equal(getFileSizeBucket(2 * 1024 * 1024), "1MB-3MB");
  assert.equal(getFileSizeBucket(15 * 1024 * 1024), ">10MB");
});
