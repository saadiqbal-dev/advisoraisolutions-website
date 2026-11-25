import type { Metadata, Viewport } from "next";
import { Fraunces, IBM_Plex_Mono, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { JsonLd } from "@/components/json-ld";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { organizationJsonLd, personJsonLd, websiteJsonLd } from "@/lib/schema";
import { site } from "@/lib/site";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const plex = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-plex",
});

export const viewport: Viewport = {
  themeColor: "#0A1628",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Advisor AI Solutions | AI Growth for AEC Firms",
    template: "%s | Advisor AI Solutions",
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.founder, url: "/about" }],
  creator: site.founder,
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: site.name,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Advisor AI Solutions" }],
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable} ${plex.variable}`}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={websiteJsonLd()} />
        <JsonLd data={personJsonLd()} />
        <SiteHeader />
        {children}
        <SiteFooter />
        {/* [CONFIRM: voice widget] The previous site loaded a Thinkr "Talk to me" widget
            (key 08e36bd5-816a-43dc-9170-0958ba4a2a08) after idle. It is intentionally not
            loaded here. If it returns, load it only after a click and keep it off the
            mobile call-to-action. */}
        <Analytics />
      </body>
    </html>
  );
}
