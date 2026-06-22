import { mutateDb, readDb } from "./store";
import { newId } from "@/lib/ids";
import type { CrewMember } from "@/lib/types";

export interface CrewInput {
  name: string;
  phone?: string;
  email?: string;
  skills?: string;
}

export async function listCrew(): Promise<CrewMember[]> {
  const db = await readDb();
  return db.crewMembers
    .slice()
    .sort((a, b) => a.name.localeCompare(b.name));
}

export async function addCrew(input: CrewInput): Promise<CrewMember> {
  const member: CrewMember = {
    id: newId(),
    name: input.name.trim(),
    phone: (input.phone ?? "").trim(),
    email: (input.email ?? "").trim(),
    skills: input.skills?.trim() || undefined,
    availability: {},
  };
  await mutateDb((db) => {
    db.crewMembers.push(member);
  });
  return member;
}

export async function setAvailability(
  crewId: string,
  weekKey: string,
  available: boolean,
): Promise<void> {
  await mutateDb((db) => {
    const m = db.crewMembers.find((c) => c.id === crewId);
    if (m) m.availability[weekKey] = available;
  });
}

export async function removeCrew(crewId: string): Promise<void> {
  await mutateDb((db) => {
    db.crewMembers = db.crewMembers.filter((c) => c.id !== crewId);
    db.assignments = db.assignments.filter((a) => a.crewMemberId !== crewId);
  });
}
