/**
 * Business configuration. The place Jovan edits the [BRACKET] placeholders
 * from BUILD-SPEC §13. Change these values and the site updates. Swap in real
 * data before launch.
 */

export const site = {
  /** Brand name. "JAM" is the family initials; pairs with "-Ready" (a play on make-ready/rent-ready). */
  name: "JAM-Ready",
  /** Short label used in tight spaces (footer, mobile). */
  shortName: "JAM-Ready",

  tagline: "Apartment make-readys, done by your deadline.",
  metaDescription:
    "We patch, paint, clean, and refresh empty rental units fast, with date-stamped photo proof when the job's done. Most units rent-ready in 1 to 3 days.",

  /** Contact. Fill before launch. tel/sms links use phoneRaw. */
  phoneRaw: "+15555550123",
  phoneDisplay: "(555) 555-0123",
  email: "hello@example.com",
  /** Your Google "write a review" link. Fill before launch. */
  googleReviewUrl: "https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID",

  /** Service area: which towns/counties you cover. */
  serviceArea: "[Your county / towns here]",

  /** Trust signals shown in the hero trust bar. */
  rating: "5.0",
  reviewCount: 0, // set to real Google review count before launch
  licensed: true, // HIC registered + insured (legal gate; confirm before real jobs)

  /** Headline stats. Set to real numbers as they come in. */
  stats: {
    unitsTurned: "200+",
    onTimeRate: "98%",
    avgTurnaround: "2.1 days",
  },
} as const;

export type SiteConfig = typeof site;
