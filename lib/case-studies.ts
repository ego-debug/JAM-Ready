/**
 * Case studies. The entry below is a sample to show the format. Replace with
 * real jobs (real photos, scope, and numbers) as you complete them.
 */

export interface CaseStudy {
  slug: string;
  title: string;
  location: string;
  unitType: string;
  summary: string;
  scope: string[];
  timeline: string;
  costRange: string;
  result: string;
  sample?: boolean;
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "two-bed-cherry-hill-turn",
    title: "Two-bed turnover in Cherry Hill, done in 2 days",
    location: "Cherry Hill, NJ",
    unitType: "2 bed / 1 bath",
    summary:
      "A property manager handed us a vacated two-bed with scuffed walls, worn bedroom carpet, and a tenant cleanout to deal with. We turned it move-in ready in two days and sent the owner before and after photos the day we finished.",
    scope: [
      "Full interior repaint, walls and trim",
      "Drywall patch and caulk throughout",
      "LVP installed in the bedroom",
      "Move-out deep clean and cleanout",
      "Fixture and blind swaps",
    ],
    timeline: "2 days",
    costRange: "$2,400 to $2,900",
    result: "Re-listed the same week and leased within nine days.",
    sample: true,
  },
];

export function getCaseStudy(slug: string): CaseStudy | undefined {
  return CASE_STUDIES.find((c) => c.slug === slug);
}
