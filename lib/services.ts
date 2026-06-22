import type { Lane, UnitType } from "@/lib/types";

/**
 * Fixed service menu (BUILD-SPEC §6). The quote builder pulls from this.
 *
 * GREEN  = in-lane, the crew can legally do it with HIC registration.
 * LOCKED = electrical, plumbing, HVAC; coordinated via a licensed partner and
 * quoted separately, not addable to a green quote.
 *
 * `defaultPrice` values are placeholders for Jovan to set (spec §13).
 * They're editable per line item in the quote builder.
 */

export interface ServiceDef {
  /** stable key */
  id: string;
  name: string;
  lane: Lane;
  unitType: UnitType;
  defaultPrice: number; // placeholder $; Jovan sets real prices
  /** why a locked item is locked (shown on the disabled chip) */
  lockedReason?: string;
}

export const UNIT_LABEL: Record<UnitType, string> = {
  per_room: "per room",
  per_item: "per item",
  flat: "flat",
  per_sqft: "per sq ft",
};

export const GREEN_SERVICES: ServiceDef[] = [
  { id: "drywall", name: "Drywall patch & repair", lane: "green", unitType: "per_room", defaultPrice: 120 },
  { id: "spackle-caulk", name: "Spackle & caulk", lane: "green", unitType: "per_room", defaultPrice: 60 },
  { id: "paint", name: "Interior painting (walls / trim / ceilings)", lane: "green", unitType: "per_sqft", defaultPrice: 3 },
  { id: "flooring-lvp", name: "Flooring: LVP / laminate (installed)", lane: "green", unitType: "per_sqft", defaultPrice: 6 },
  { id: "flooring-tile", name: "Flooring: tile (installed)", lane: "green", unitType: "per_sqft", defaultPrice: 12 },
  { id: "flooring-carpet", name: "Flooring: carpet (installed)", lane: "green", unitType: "per_sqft", defaultPrice: 4 },
  { id: "trim-doors", name: "Trim, baseboards, interior doors, locks, weatherstripping", lane: "green", unitType: "per_item", defaultPrice: 75 },
  { id: "mounting", name: "Blinds, mirrors, shelving, TV mounting", lane: "green", unitType: "per_item", defaultPrice: 50 },
  { id: "cabinet-counter", name: "Cabinet & countertop install, hardware swaps", lane: "green", unitType: "per_item", defaultPrice: 150 },
  { id: "appliance", name: "Plug-in appliance set & hookup", lane: "green", unitType: "per_item", defaultPrice: 80 },
  { id: "fixture-swap", name: "Like-for-like swaps: faucet, toilet, tub & shower fixtures, disposal (no pipe change)", lane: "green", unitType: "per_item", defaultPrice: 90 },
  { id: "locks", name: "Locks, deadbolts & re-key", lane: "green", unitType: "per_item", defaultPrice: 45 },
  { id: "cleanout", name: "Cleanout, junk removal, pressure washing", lane: "green", unitType: "flat", defaultPrice: 200 },
  { id: "punch-list", name: "General punch-list / repairs", lane: "green", unitType: "flat", defaultPrice: 100 },
];

export const LOCKED_SERVICES: ServiceDef[] = [
  { id: "electrical", name: "Electrical: outlets, circuits, fixtures, fans, panels", lane: "locked", unitType: "per_item", defaultPrice: 0, lockedReason: "Coordinated via licensed partner" },
  { id: "hvac", name: "HVAC: AC install/repair, anything with refrigerant", lane: "locked", unitType: "flat", defaultPrice: 0, lockedReason: "Coordinated via licensed partner" },
  { id: "plumbing", name: "Plumbing beyond a like-for-like swap (pipe, repipe, water heater, gas)", lane: "locked", unitType: "flat", defaultPrice: 0, lockedReason: "Coordinated via licensed partner" },
];

export const ALL_SERVICES = [...GREEN_SERVICES, ...LOCKED_SERVICES];

export function findService(id: string): ServiceDef | undefined {
  return ALL_SERVICES.find((s) => s.id === id);
}
