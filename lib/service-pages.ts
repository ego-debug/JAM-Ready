/**
 * Content for the /services/[slug] pages. Landlord and property-manager
 * focused, written for local search intent. Slugs match SERVICES in lib/seo.ts.
 */

export interface ServicePage {
  slug: string;
  name: string;
  h1: string;
  title: string;
  description: string;
  intro: string;
  includes: string[];
  why: string;
  faqs: { q: string; a: string }[];
}

export const SERVICE_PAGES: ServicePage[] = [
  {
    slug: "patch-and-repair",
    name: "Patch & repair",
    h1: "Drywall patch & repair for rental turnovers",
    title: "Drywall Patch & Repair for Rentals",
    description:
      "Holes, dents, nail pops, and bad caulk lines patched, sanded, and blended so a unit shows like new. Serving Cherry Hill and South Jersey.",
    intro:
      "Tenants leave marks. We make the walls look like they never happened, fast, so you can re-list without a punch list hanging over the turn.",
    includes: [
      "Nail holes, dents, and gouges filled and sanded smooth",
      "Drywall patches for larger holes and damaged corners",
      "Re-caulking around trim, tubs, and baseboards",
      "Texture touch-ups blended to the existing wall",
      "Primed and ready for paint",
      "Cleaned up so the room is move-in clean",
    ],
    why: "Wall damage is the first thing a prospective tenant notices and the easiest way to lose a showing. Clean walls signal a well-kept unit and help you hold your asking rent.",
    faqs: [
      { q: "Do you paint after patching?", a: "Yes. Patch and repair pairs with our interior painting so the wall ends up finished and paint-ready." },
      { q: "How fast can repairs be done?", a: "Most patch-and-repair scopes are a same-day or one-day job, depending on how much drywall work is involved." },
      { q: "Can you match existing texture?", a: "In most cases, yes. We blend patches into the surrounding wall and texture before priming." },
    ],
  },
  {
    slug: "painting",
    name: "Interior painting",
    h1: "Interior painting & touch-up for rental turns",
    title: "Interior Painting for Rental Turnovers",
    description:
      "Fresh coats and precise touch-ups in the right sheen and color, turned around fast for your move-in date. Cherry Hill and South Jersey.",
    intro:
      "A fresh coat is the highest-return turn item there is. We paint walls, trim, and ceilings to a clean, rentable finish and hit your deadline.",
    includes: [
      "Full repaints or targeted touch-ups",
      "Walls, trim, doors, and ceilings",
      "Color matching to your standard rental palette",
      "Proper prep: patch, caulk, and prime first",
      "The right sheen for each surface",
      "Clean lines, with floors and fixtures protected",
    ],
    why: "Paint is what makes a unit feel new. A consistent, neutral palette across your portfolio also speeds future turns and keeps touch-ups simple.",
    faqs: [
      { q: "Do you use a standard rental color?", a: "We can match the color and sheen you use across your units so every turn stays consistent." },
      { q: "Walls only, or trim too?", a: "Either. We quote walls, trim, doors, and ceilings separately so you only pay for what the unit needs." },
      { q: "How many days for a full repaint?", a: "A typical unit repaint is one to two days, depending on size and prep." },
    ],
  },
  {
    slug: "deep-clean",
    name: "Move-out deep clean",
    h1: "Move-out deep cleaning for rentals",
    title: "Move-Out Deep Cleaning for Rentals",
    description:
      "Floors, fixtures, appliances, and glass brought to move-in spotless, with junk haul-out. Cherry Hill and South Jersey.",
    intro:
      "We take a unit from 'tenant just left' to 'ready to show', including the cleanout most cleaners skip.",
    includes: [
      "Full unit deep clean, top to bottom",
      "Kitchen and bathroom detail: appliances, fixtures, grout",
      "Floors vacuumed, mopped, and edged",
      "Windows, sills, and glass",
      "Junk and debris haul-out",
      "Final wipe-down before photos",
    ],
    why: "A showing-ready clean is what lets you photograph and list the day we finish. It also sets the tone for how the next tenant treats the unit.",
    faqs: [
      { q: "Do you haul away what the tenant left?", a: "Yes. Cleanout and junk removal are part of the deep clean so the unit is truly empty and clean." },
      { q: "Is this different from a regular cleaning?", a: "Yes. A move-out deep clean covers inside appliances, grout, baseboards, and the details a standard clean skips." },
      { q: "Can it be done in a day?", a: "Most single-unit deep cleans are a same-day job." },
    ],
  },
  {
    slug: "flooring",
    name: "Flooring",
    h1: "Flooring for rental turnovers",
    title: "Flooring for Rentals: LVP, Laminate, Tile, Carpet",
    description:
      "LVP, laminate, tile, and carpet installed for turnovers, with baseboards and transitions. Cherry Hill and South Jersey.",
    intro:
      "Worn carpet and dated floors kill a listing. We swap flooring on a turn timeline so the unit shows new.",
    includes: [
      "Luxury vinyl plank (LVP), laminate, tile, and carpet",
      "Tear-out and disposal of old flooring",
      "Baseboards, quarter-round, and transitions",
      "Subfloor prep and leveling where needed",
      "Install of the flooring you supply",
      "Cleaned and ready to show",
    ],
    why: "Flooring is one of the biggest drivers of perceived value and a common reason a unit sits. Durable LVP also lowers your cost on the next turn.",
    faqs: [
      { q: "Do you supply the flooring?", a: "You pick the flooring and we handle the tear-out, prep, install, baseboards, and disposal, so our price covers the labor. Prefer not to source it yourself? We work with flooring suppliers and can arrange the material, quoted separately from our labor." },
      { q: "What flooring is best for rentals?", a: "LVP is the most popular for rentals: durable, water-resistant, and it looks new for years, which lowers future turn costs." },
      { q: "Do you remove the old flooring?", a: "Yes. Tear-out, disposal, and subfloor prep are included in the flooring scope." },
      { q: "How long does a flooring turn take?", a: "Most single-unit flooring jobs are one to two days." },
    ],
  },
  {
    slug: "make-ready",
    name: "Full make-ready",
    h1: "Full apartment make-ready & turnover service",
    title: "Full Apartment Make-Ready & Turnover Service",
    description:
      "One crew for the whole turn: patch, paint, clean, flooring, and fixtures, done by your deadline with photo proof. Cherry Hill and South Jersey.",
    intro:
      "The complete turn, handled by one crew on one invoice. You hand us the keys and a deadline; we hand back a rent-ready unit with before and after photos.",
    includes: [
      "Patch, repair, and paint",
      "Move-out deep clean and cleanout",
      "Flooring repair or replacement",
      "Fixture, hardware, and blind swaps",
      "A full punch-list of small fixes",
      "Before and after photos delivered on completion",
    ],
    why: "Coordinating separate trades is what makes turns slow and unpredictable. One accountable crew with a hard deadline is how you cut vacancy days and keep owners happy.",
    faqs: [
      { q: "What is an apartment make-ready?", a: "It is everything needed to take a vacated unit and make it move-in ready: patch, paint, clean, flooring, and small repairs." },
      { q: "How fast is a full turn?", a: "Most units are rent-ready in one to three days once the scope is approved and we have access." },
      { q: "Do I get proof the work was done?", a: "Yes. Every make-ready includes date-stamped before and after photos delivered the day we finish." },
    ],
  },
];

export function getServicePage(slug: string): ServicePage | undefined {
  return SERVICE_PAGES.find((s) => s.slug === slug);
}
