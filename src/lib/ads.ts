/**
 * Global Advertising Configuration
 * 
 * Master switch to control all advertisements across QuickResizer.
 * - Set SHOW_ADS = false: Instantly hides all advertisement banners, skyscrapers, and placeholders across all pages.
 * - Set SHOW_ADS = true: Displays all advertisement banners and placeholders.
 * 
 * You can also override this via an environment variable in .env.local:
 * NEXT_PUBLIC_SHOW_ADS=false
 */
export const SHOW_ADS: boolean =
  process.env.NEXT_PUBLIC_SHOW_ADS !== undefined
    ? process.env.NEXT_PUBLIC_SHOW_ADS === "true"
    : false; // <-- Toggle here: `true` to show ads, `false` to hide all ads

