import presetsData from "../../data/presets.json";
import { Preset } from "./types";

/**
 * Returns all active exam presets.
 */
export function getAllPresets(): Preset[] {
  return presetsData as Preset[];
}

/**
 * Finds a specific preset by its URL slug.
 */
export function getPresetBySlug(slug: string): Preset | undefined {
  return (presetsData as Preset[]).find((p) => p.slug === slug);
}

/**
 * Groups presets by their exam category (e.g. SSC, Banking, UPSC, etc.)
 */
export function getPresetsByCategory(): Record<string, Preset[]> {
  const map: Record<string, Preset[]> = {};
  for (const preset of presetsData as (Preset & { category?: string })[]) {
    const category = preset.category || "General";
    if (!map[category]) {
      map[category] = [];
    }
    map[category].push(preset);
  }
  return map;
}

