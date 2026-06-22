"use client";

import { useRouter } from "next/navigation";
import { ChevronRight, HardHat } from "lucide-react";
import type { CrewMember } from "@/lib/types";

export function CrewPicker({ crew }: { crew: CrewMember[] }) {
  const router = useRouter();

  async function pick(crewId: string) {
    await fetch("/api/crew/select", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ crewId }),
    });
    router.refresh();
  }

  return (
    <div>
      <div className="mb-6 text-center">
        <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-brand-tint text-brand">
          <HardHat size={24} />
        </span>
        <h1 className="mt-4 font-display text-2xl font-bold text-ink">
          Who&apos;s working?
        </h1>
        <p className="mt-1 text-sm text-ink-soft">
          Tap your name to see the jobs assigned to you.
        </p>
      </div>

      {crew.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-line bg-surface p-8 text-center text-sm text-ink-soft">
          No crew members yet. An admin needs to add you on the Crew page first.
        </p>
      ) : (
        <div className="space-y-2.5">
          {crew.map((c) => (
            <button
              key={c.id}
              onClick={() => pick(c.id)}
              className="flex w-full items-center justify-between gap-3 rounded-xl border border-line bg-surface px-4 py-4 text-left shadow-sm transition hover:border-brand/40 hover:shadow-md"
            >
              <div>
                <p className="font-medium text-ink">{c.name}</p>
                {c.skills && <p className="text-xs text-ink-soft">{c.skills}</p>}
              </div>
              <ChevronRight size={18} className="text-ink-soft" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
