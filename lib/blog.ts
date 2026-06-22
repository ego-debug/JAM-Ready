/** Blog content. Top-of-funnel posts for landlord and property-manager search. */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] };

export interface Post {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO
  readMins: number;
  excerpt: string;
  blocks: Block[];
}

export const POSTS: Post[] = [
  {
    slug: "apartment-turnover-checklist",
    title: "Apartment turnover checklist: the complete make-ready punch list",
    description:
      "The full make-ready punch list landlords use to turn a unit between tenants, plus what needs a licensed pro and how long a turn takes.",
    date: "2026-06-20",
    readMins: 5,
    excerpt:
      "The full make-ready punch list we run on every job, plus the parts that need a licensed pro.",
    blocks: [
      { type: "p", text: "A clean, consistent turnover is what gets a unit re-rented at market without a price cut. Here is the full make-ready punch list we run on every job, plus the parts that need a licensed pro." },
      { type: "h2", text: "Walk the unit first" },
      { type: "p", text: "Before any work starts, walk every room and note what the last tenant left behind. Photograph the starting condition. This is where your quote and scope come from, and it protects both sides if a deposit dispute comes up later." },
      { type: "h2", text: "The make-ready punch list" },
      { type: "p", text: "A standard turn covers the items a prospective tenant notices in the first thirty seconds of a showing:" },
      { type: "ul", items: [
        "Patch nail holes, dents, and wall damage, then sand smooth",
        "Repaint walls, trim, and ceilings, or touch up where the paint still matches",
        "Deep clean the kitchen and bathrooms, including inside the appliances",
        "Clean or replace flooring and refresh the baseboards",
        "Swap worn hardware, blinds, outlet covers, and burned-out bulbs",
        "Re-caulk around tubs, sinks, and counters",
        "Haul out anything the tenant left and leave the unit broom-clean",
      ] },
      { type: "h2", text: "What needs a licensed pro" },
      { type: "p", text: "Cosmetic and like-for-like work is in a general contractor's lane. New circuits, light-fixture wiring, HVAC, and pipe changes need a licensed electrician or plumber. Keep those on a separate line and use a licensed partner so the work passes inspection." },
      { type: "h2", text: "Document before and after" },
      { type: "p", text: "Take date-stamped photos of every room before and after. They settle deposit questions, make owner reports simple, and prove the unit was delivered rent-ready." },
      { type: "h2", text: "How long a turn takes" },
      { type: "p", text: "A light turn with paint and cleaning can be a one-day job. A full make-ready with flooring and repairs usually runs one to three days once the scope is set and the crew has access." },
    ],
  },
  {
    slug: "reduce-vacancy-days",
    title: "How to cut vacancy days between tenants",
    description:
      "Every vacant day is lost rent. Five practical ways landlords and property managers shorten the turn between tenants without cutting corners.",
    date: "2026-06-15",
    readMins: 4,
    excerpt: "Five practical ways to shorten the turn between tenants without cutting corners.",
    blocks: [
      { type: "p", text: "Every day a unit sits empty is rent you do not get back. Cutting a few days off each turn adds up fast across a portfolio. Here is how to keep turns short without cutting corners." },
      { type: "h2", text: "Start the turn before the unit is empty" },
      { type: "p", text: "Schedule the walkthrough and quote the week the tenant gives notice, not after they hand back keys. Lining up the crew in advance means work can start the day the unit is vacant instead of days later." },
      { type: "h2", text: "Use one crew for the whole turn" },
      { type: "p", text: "Coordinating a painter, a cleaner, and a flooring installer separately is where turns stall. One crew that handles patch, paint, clean, and flooring on a single schedule removes the gaps between trades." },
      { type: "h2", text: "Set a hard finish date" },
      { type: "p", text: "A turn without a deadline drifts. Agree on a firm rent-ready date up front and hold the crew to it. A good contractor only commits to a date they can actually staff." },
      { type: "h2", text: "Standardize your paint and finishes" },
      { type: "p", text: "Pick one neutral wall color and sheen and use it across your units. Standard finishes make future touch-ups faster, keep material costs predictable, and let any crew match the existing walls." },
      { type: "h2", text: "Photograph and list the same day" },
      { type: "p", text: "Have the crew deliver after-photos the day they finish so you can list the unit immediately. The faster the listing goes live, the sooner you book the next showing." },
    ],
  },
  {
    slug: "apartment-turnover-cost",
    title: "What does an apartment turnover cost?",
    description:
      "Apartment turnover cost depends on size, scope, and condition. Here is what goes into the price and how to keep make-ready costs down over time.",
    date: "2026-06-10",
    readMins: 4,
    excerpt: "What goes into the price of a make-ready, and how to keep turnover costs down over time.",
    blocks: [
      { type: "p", text: "Apartment turnover cost depends on the unit and the scope, so there is no single flat rate. Knowing what goes into the price helps you budget and compare quotes fairly." },
      { type: "h2", text: "What a turnover usually includes" },
      { type: "p", text: "A typical make-ready covers patching and paint, a move-out deep clean, flooring repair or replacement, fixture and hardware swaps, and a punch list of small fixes. Some turns need all of it, some need a quick refresh." },
      { type: "h2", text: "What drives the price" },
      { type: "ul", items: [
        "Unit size: more bedrooms, bathrooms, and square footage means more labor and material",
        "Scope: a few touch-ups cost far less than a full repaint and flooring swap",
        "Flooring: a patch is cheap, a full LVP or carpet replacement is one of the larger line items",
        "Condition: heavy patching, deep cleaning, and repairs add hours",
        "Timeline: a standard schedule costs less than a rush",
      ] },
      { type: "h2", text: "Light turn versus full turn" },
      { type: "p", text: "A light turn, paint touch-ups and a clean, sits at the low end. A full turn with fresh paint throughout, new flooring, and repairs sits at the high end. Most units land somewhere in between." },
      { type: "h2", text: "Keeping turnover costs down over time" },
      { type: "p", text: "Durable flooring like LVP, a standard paint color, and catching small issues between tenants all lower what you spend on the next turn. Consistency across a portfolio is the cheapest turn there is." },
      { type: "h2", text: "Getting an accurate number" },
      { type: "p", text: "The only way to a real price is a line-item quote from photos of the actual unit. We send one the same day, with no deposit to book." },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function formatPostDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
