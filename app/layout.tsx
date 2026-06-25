import type { Metadata } from "next";
import "./globals.css";
import { site } from "@/lib/config";
import { SITE_URL } from "@/lib/seo";
import { Analytics } from "@/components/seo/Analytics";

const defaultTitle = `${site.name} | Apartment Make-Ready & Turnovers, Cherry Hill NJ`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: defaultTitle,
    template: `%s · ${site.name}`,
  },
  description: site.metaDescription,
  applicationName: site.name,
  robots: { index: true, follow: true },
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: defaultTitle,
    description: site.metaDescription,
    url: SITE_URL,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: site.metaDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col bg-cream text-ink">
        <Analytics />
        {children}
      </body>
    </html>
  );
}
