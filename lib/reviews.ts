/**
 * Sample reviews. Replace with real Google reviews as they come in, then add
 * AggregateRating/Review structured data. Do not publish review schema with
 * fabricated numbers, Google penalizes that.
 */

export interface Review {
  name: string;
  role: string;
  rating: number;
  text: string;
}

export const REVIEWS: Review[] = [
  {
    name: "Dana Mercer",
    role: "Property manager · 40 units",
    rating: 5,
    text: "Two units turned in a week, both with full before and after photos in my inbox before I had driven over. Easiest vendor I work with.",
  },
  {
    name: "Rob Castellano",
    role: "Landlord · Cherry Hill",
    rating: 5,
    text: "Paint, clean, and a few repairs done in two days. The unit showed that same week and rented fast.",
  },
  {
    name: "Priya N.",
    role: "Owner · 6 rentals",
    rating: 5,
    text: "Clear quote, hit the date, and the photos made my owner report take five minutes.",
  },
  {
    name: "Marcus Hill",
    role: "Property manager · Voorhees",
    rating: 5,
    text: "They handled a full make-ready while I was out of state and kept me posted the whole way. No surprises on the invoice.",
  },
];

export function averageRating(): number {
  if (REVIEWS.length === 0) return 0;
  const sum = REVIEWS.reduce((s, r) => s + r.rating, 0);
  return Math.round((sum / REVIEWS.length) * 10) / 10;
}
