import type { Metadata, Viewport } from "next";
import { Besley, Libre_Franklin } from "next/font/google";
import type { ReactNode } from "react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SmoothScroll from "@/components/SmoothScroll";
import { site } from "@/lib/site";
import "./globals.css";

const display = Besley({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const text = Libre_Franklin({ subsets: ["latin"], variable: "--font-text", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} | Independent logistics brokerage, Gauteng`, template: `%s | ${site.name}` },
  description: site.description,
  alternates: { canonical: "./" },
  openGraph: { type: "website", siteName: site.name, locale: "en_ZA", title: site.line, description: site.description, images: ["/hero/og.jpg"] },
  // Staging stays out of search until the client's own domain is live.
  robots: process.env.NEXT_PUBLIC_SITE_URL ? undefined : { index: false, follow: false },
};

export const viewport: Viewport = { themeColor: "#e3e8e8" };

const ld = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: site.name,
  description: site.description,
  telephone: "+27823680000",
  address: { "@type": "PostalAddress", addressLocality: site.locality, addressRegion: site.region, addressCountry: "ZA" },
  areaServed: { "@type": "Country", name: "South Africa" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-ZA" className={`${display.variable} ${text.variable}`}>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <SmoothScroll>
          <Header />
          <main id="main">{children}</main>
          <Footer />
        </SmoothScroll>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      </body>
    </html>
  );
}
