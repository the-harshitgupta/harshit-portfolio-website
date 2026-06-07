import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { site } from "@/lib/site";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | ${site.role}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  keywords: [
    "GTM strategy",
    "go to market strategy",
    "ICP research",
    "buyer persona research",
    "brand positioning",
    "marketing analytics",
    "AI marketing consultant",
    "marketing consultant India",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: {
    canonical: site.url,
    types: { "application/rss+xml": `${site.url}/rss.xml` },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: site.url,
    siteName: site.name,
    title: `${site.name} | ${site.role}`,
    description: site.description,
    images: [
      {
        url: `${site.url}/og/default.png`,
        width: 1200,
        height: 630,
        alt: `${site.name} | ${site.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | ${site.role}`,
    description: site.description,
    creator: "@theharshit05",
    images: [`${site.url}/og/default.png`],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    jobTitle: site.role,
    url: site.url,
    email: site.email,
    address: { "@type": "PostalAddress", addressLocality: site.location },
    sameAs: [
      site.socials.linkedin,
      site.socials.x,
      site.socials.instagram,
      site.socials.fiverr,
    ],
  };
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: site.name,
    url: site.url,
  };
  const organizationJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: site.name,
    url: site.url,
    logo: `${site.url}/brand-logo.svg`,
    email: site.email,
    sameAs: [
      site.socials.linkedin,
      site.socials.x,
      site.socials.instagram,
      site.socials.fiverr,
    ],
  };
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    url: site.url,
    email: site.email,
    image: `${site.url}/harshit.png`,
    description: site.description,
    address: { "@type": "PostalAddress", addressLocality: site.location },
    areaServed: ["India", "United States", "United Kingdom", "Worldwide"],
    serviceType: [
      "GTM Strategy",
      "ICP Research",
      "Brand Positioning",
      "Marketing Analytics",
      "AI Marketing Strategy",
    ],
    sameAs: [
      site.socials.linkedin,
      site.socials.x,
      site.socials.instagram,
      site.socials.fiverr,
    ],
  };

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans">
        <GoogleAnalytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
