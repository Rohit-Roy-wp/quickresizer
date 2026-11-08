import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CookieConsent } from "@/components/common/CookieConsent";
import { Analytics } from "@vercel/analytics/react";

export const viewport: Viewport = {
  themeColor: "#2563eb",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://quickresizer-zeta.vercel.app"
  ),
  title: {
    default: "QuickResizer: Fast, Free & Exact KB Image Resizer",
    template: "%s | QuickResizer",
  },
  description:
    "Resize and compress images to exact KB limits (20KB, 50KB, 100KB) and exact dimensions (cm, in, px). 100% in-browser processing for SSC, UPSC, and official forms.",
  keywords: [
    "image resizer",
    "compress image to 20kb",
    "compress image to 50kb",
    "ssc photo resizer",
    "signature resizer",
    "upsc photo resizer",
    "image compressor",
  ],
  authors: [{ name: "QuickResizer" }],
  creator: "QuickResizer",
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    google: "CujcaDk-RkvuftzKsrgu-z5wXSvOdeLDMN94H03OGS0",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <head>
        <meta
          name="google-site-verification"
          content="CujcaDk-RkvuftzKsrgu-z5wXSvOdeLDMN94H03OGS0"
        />
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}', {
                  anonymize_ip: true
                });
              `}
            </Script>
          </>
        )}
      </head>
      <body
        className="flex min-h-full flex-col bg-slate-50 text-slate-700 antialiased"
        suppressHydrationWarning
      >
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieConsent />
        <Analytics />
      </body>
    </html>
  );
}
