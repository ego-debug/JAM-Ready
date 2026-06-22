import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { SERVICE_PAGES } from "@/lib/service-pages";
import { LOCATION_PAGES } from "@/lib/location-pages";
import { POSTS } from "@/lib/blog";
import { CASE_STUDIES } from "@/lib/case-studies";

/**
 * Only includes pages that actually exist. As marketing pages are built
 * (about, FAQ, blog), add their paths here.
 */
const staticPaths = [
  "/",
  "/services",
  "/service-area",
  "/property-managers",
  "/case-studies",
  "/about",
  "/pricing",
  "/faq",
  "/contact",
  "/blog",
  "/privacy",
  "/terms",
  "/warranty",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const servicePaths = SERVICE_PAGES.map((s) => `/services/${s.slug}`);
  const locationPaths = LOCATION_PAGES.map((l) => `/service-area/${l.slug}`);
  const blogPaths = POSTS.map((p) => `/blog/${p.slug}`);
  const casePaths = CASE_STUDIES.map((c) => `/case-studies/${c.slug}`);

  return [...staticPaths, ...servicePaths, ...locationPaths, ...blogPaths, ...casePaths].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority:
      path === "/"
        ? 1
        : path.startsWith("/services") || path.startsWith("/service-area")
          ? 0.8
          : 0.6,
  }));
}
