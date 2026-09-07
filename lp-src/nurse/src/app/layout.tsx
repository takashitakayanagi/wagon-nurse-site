import type { Metadata, Viewport } from "next";
import "./globals.css";
import Analytics from "@/components/Analytics";
import ScrollDepth from "@/components/ScrollDepth";
import { seo, site, faqs } from "@/config/site";

export const metadata: Metadata = {
  metadataBase: new URL(seo.siteUrl),
  title: seo.title,
  description: seo.description,
  applicationName: site.serviceName,
  // 広告用LPのため検索インデックスには載せません（既存の /lp 配下のLPと同じ扱い）。
  robots: { index: false, follow: true },
  alternates: { canonical: seo.pageUrl },
  openGraph: {
    type: "website",
    title: seo.title,
    description: seo.description,
    url: seo.pageUrl,
    siteName: site.serviceName,
    locale: "ja_JP",
    images: [{ url: site.images.ogp, width: 1200, height: 630, alt: site.serviceName }],
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
    images: [site.images.ogp],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#F45D9B",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // 構造化データ：Organization
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.serviceName,
    url: site.officialUrl,
    logo: `${seo.siteUrl}${site.images.logo}`,
  };

  // 構造化データ：FAQPage
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <html lang="ja">
      <body>
        {children}
        <Analytics />
        <ScrollDepth />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </body>
    </html>
  );
}
