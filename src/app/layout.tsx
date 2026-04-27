import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import { Figtree, Praise } from "next/font/google";
import "./globals.css";

const figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const praise = Praise({
  subsets: ["latin"],
  variable: "--font-praise",
  display: "swap",
  weight: "400",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://majormovementstudio.com";

export const viewport: Viewport = {
  themeColor: "#ef878c",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Major Movement Studio — Reformer & Mat Pilates in Zephyrhills, FL",
    template: "%s · Major Movement Studio",
  },
  description:
    "A welcoming Pilates studio in Zephyrhills, FL. Build strength, confidence, and balance through Reformer and Mat classes. Founders' pricing available.",
  openGraph: {
    type: "website",
    title: "Major Movement Studio",
    description:
      "Reformer & Mat Pilates in Zephyrhills, FL. Build strength, confidence, and balance.",
    url: siteUrl,
    siteName: "Major Movement Studio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Major Movement Studio",
    description: "Reformer & Mat Pilates in Zephyrhills, FL.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${figtree.variable} ${praise.variable}`}>
      <body className="min-h-screen overflow-x-hidden antialiased">
        {children}
        {/* Vercel Analytics + Web Vitals — only emit beacons in production
            so local dev doesn't pollute the dashboard. */}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
