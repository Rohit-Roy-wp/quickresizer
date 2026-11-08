/**
 * Privacy-Strict Analytics Helper for Google Analytics 4 (GA4).
 * Mandate: NEVER capture file names, personal data, or raw image content.
 * Only coarse performance and telemetry events are permissible.
 */

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export type AllowedAnalyticsEvent =
  | "file_selected"
  | "preset_selected"
  | "compress_start"
  | "compress_success"
  | "compress_fail"
  | "download_click";

export interface AnalyticsEventParams {
  file_type?: string;
  size_bucket?: string;
  target_kb?: number;
  format?: string;
  iteration_count?: number;
  duration_ms?: number;
  preset_slug?: string;
  error_code?: string;
}

/**
 * Categorizes raw file size into safe, anonymous buckets (e.g. "1MB-3MB")
 */
export function getFileSizeBucket(bytes: number): string {
  const mb = bytes / (1024 * 1024);
  if (mb < 0.5) return "<500KB";
  if (mb < 1) return "500KB-1MB";
  if (mb < 3) return "1MB-3MB";
  if (mb < 5) return "3MB-5MB";
  if (mb < 10) return "5MB-10MB";
  return ">10MB";
}

/**
 * Safely dispatches a GA4 event without violating privacy rules.
 */
export function trackEvent(
  eventName: AllowedAnalyticsEvent,
  params: AnalyticsEventParams = {}
): void {
  if (typeof window === "undefined" || !window.gtag) return;

  try {
    window.gtag("event", eventName, {
      ...params,
      // Ensure no inadvertent file names or personal data are passed
      file_name: undefined,
      user_id: undefined,
    });
  } catch {
    // Non-blocking telemetry
  }
}

