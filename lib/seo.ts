import { site } from "./config";

/**
 * SEO helpers: canonical URLs, the service-area data that drives location
 * pages, and the LocalBusiness structured data. Set NEXT_PUBLIC_SITE_URL to
 * the real domain before launch (placeholder is the recommended jamreadynj.com).
 */

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.jamreadynj.com"
).replace(/\/$/, "");

export function absoluteUrl(path = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Towns served, used for /service-area pages, sitemap, and areaServed schema. */
export const TOWNS = [
  { slug: "cherry-hill", name: "Cherry Hill", county: "Camden County" },
  { slug: "voorhees", name: "Voorhees", county: "Camden County" },
  { slug: "marlton", name: "Marlton", county: "Burlington County" },
  { slug: "mount-laurel", name: "Mount Laurel", county: "Burlington County" },
  { slug: "haddonfield", name: "Haddonfield", county: "Camden County" },
] as const;

export const COUNTIES = [
  { slug: "camden-county", name: "Camden County" },
  { slug: "burlington-county", name: "Burlington County" },
  { slug: "gloucester-county", name: "Gloucester County" },
] as const;

/** Core services, used for /services pages, sitemap, and Service schema. */
export const SERVICES = [
  { slug: "patch-and-repair", name: "Patch & repair" },
  { slug: "painting", name: "Interior painting & touch-up" },
  { slug: "deep-clean", name: "Move-out deep clean" },
  { slug: "flooring", name: "Flooring" },
  { slug: "make-ready", name: "Full apartment make-ready" },
] as const;

/** HomeAndConstructionBusiness JSON-LD for the homepage. */
export function localBusinessJsonLd() {
  const areaServed = [
    ...TOWNS.map((t) => `${t.name}, NJ`),
    ...COUNTIES.map((c) => `${c.name}, NJ`),
  ];
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: site.name,
    description: site.metaDescription,
    url: SITE_URL,
    image: absoluteUrl("/opengraph-image"),
    telephone: site.phoneDisplay,
    email: site.email,
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cherry Hill",
      addressRegion: "NJ",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 39.9348,
      longitude: -75.0307,
    },
    areaServed,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        opens: "08:00",
        closes: "18:00",
      },
    ],
    sameAs: [] as string[], // add real social profile URLs before launch
  };
}
