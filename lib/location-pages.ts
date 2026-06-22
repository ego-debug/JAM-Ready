/**
 * Content for /service-area/[slug] pages. Each location gets unique copy so
 * the pages read as distinct local pages, not templated doorway pages.
 */

export interface LocationPage {
  slug: string;
  name: string;
  type: "town" | "county";
  region: string; // county for towns, "South Jersey" for counties
  blurb: string;
  detail: string;
  nearby: string[]; // slugs to cross-link
  geo: { lat: number; lng: number };
}

export const LOCATION_PAGES: LocationPage[] = [
  {
    slug: "cherry-hill",
    name: "Cherry Hill",
    type: "town",
    region: "Camden County",
    blurb:
      "Cherry Hill is one of South Jersey's busiest rental markets, with apartment communities all along Route 70 and 38 and a steady churn of tenants. We turn those units fast so they don't sit through a leasing cycle.",
    detail:
      "Most of our Cherry Hill work is garden-apartment and townhome turns: paint, a deep clean, and a few repairs to re-rent at market. We can usually be in and out before your next showing weekend.",
    nearby: ["voorhees", "haddonfield", "camden-county"],
    geo: { lat: 39.9348, lng: -75.0307 },
  },
  {
    slug: "voorhees",
    name: "Voorhees",
    type: "town",
    region: "Camden County",
    blurb:
      "Voorhees mixes townhome rentals and garden apartments around the Town Center and Echelon area. We make-ready those units on a tight timeline so you can re-lease before the next showing weekend.",
    detail:
      "From a single condo to a block of units at a managed community, we keep the scope clear and the finish consistent so your listings photograph well.",
    nearby: ["cherry-hill", "marlton", "camden-county"],
    geo: { lat: 39.8451, lng: -74.9646 },
  },
  {
    slug: "marlton",
    name: "Marlton",
    type: "town",
    region: "Burlington County",
    blurb:
      "Marlton's rental stock runs from older garden apartments off Route 70 to newer complexes near the Promenade. We turn them quickly, with photo proof your owners can file.",
    detail:
      "We handle the older Route 70 garden apartments and the newer complexes alike, with one crew and one invoice per turn.",
    nearby: ["mount-laurel", "voorhees", "burlington-county"],
    geo: { lat: 39.8912, lng: -74.9213 },
  },
  {
    slug: "mount-laurel",
    name: "Mount Laurel",
    type: "town",
    region: "Burlington County",
    blurb:
      "Mount Laurel has heavy apartment and corporate-rental turnover near the 295 corridor. Fast, documented make-readys keep your vacancy days low between relocations.",
    detail:
      "Relocation and corporate tenants turn over fast here, so we built our process around short, predictable timelines and documentation owners can forward straight to their reports.",
    nearby: ["marlton", "burlington-county", "cherry-hill"],
    geo: { lat: 39.9343, lng: -74.891 },
  },
  {
    slug: "haddonfield",
    name: "Haddonfield",
    type: "town",
    region: "Camden County",
    blurb:
      "Haddonfield rentals skew higher-end, from historic homes to in-town condos. We hold a finish quality that matches the neighborhood and the rent you're asking.",
    detail:
      "For higher-end rentals we slow down on the finish details that matter at that rent: clean lines, matched paint, and a spotless final walkthrough.",
    nearby: ["cherry-hill", "voorhees", "camden-county"],
    geo: { lat: 39.8915, lng: -75.0376 },
  },
  {
    slug: "camden-county",
    name: "Camden County",
    type: "county",
    region: "South Jersey",
    blurb:
      "From Cherry Hill and Voorhees to Gloucester Township and Pennsauken, Camden County is our home base. We dispatch crews across the county daily for apartment turns of every size.",
    detail:
      "Cherry Hill, Voorhees, Gloucester Township, Pennsauken, and the rest of the county are all in our daily dispatch radius.",
    nearby: ["cherry-hill", "voorhees", "haddonfield"],
    geo: { lat: 39.8, lng: -75.0 },
  },
  {
    slug: "burlington-county",
    name: "Burlington County",
    type: "county",
    region: "South Jersey",
    blurb:
      "Marlton, Mount Laurel, Moorestown, and the rest of Burlington County's busy rental corridors are squarely in our service area. One crew, your deadline, photo proof.",
    detail:
      "Marlton, Mount Laurel, Moorestown, and the surrounding towns are a core part of our route, with crews out six days a week.",
    nearby: ["marlton", "mount-laurel"],
    geo: { lat: 39.95, lng: -74.75 },
  },
  {
    slug: "gloucester-county",
    name: "Gloucester County",
    type: "county",
    region: "South Jersey",
    blurb:
      "We cover Gloucester County's growing rental market, from Washington Township to Deptford, with the same fast, documented turns.",
    detail:
      "Washington Township, Deptford, and the growing rental corridors west of 295 round out our South Jersey coverage.",
    nearby: ["camden-county"],
    geo: { lat: 39.72, lng: -75.13 },
  },
];

export function getLocationPage(slug: string): LocationPage | undefined {
  return LOCATION_PAGES.find((l) => l.slug === slug);
}
