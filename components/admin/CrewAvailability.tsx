"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Check, Phone, Mail, Trash2 } from "lucide-react";
import type { CrewMember } from "@/lib/types";
import type { WeekInfo } from "@/lib/week";
import { cn } from "@/lib/utils";

export function CrewAvailability({
  crew,
  weeks,
}: {
  crew: CrewMember[];
  weeks: WeekInfo[];
}) {
  const router = useRouter();
  // local optimistic copy of availability per crew
  const [avail, setAvail] = useState<Record<string, Record<string, boolean>>>(
    Object.fromEntries(crew.map((c) => [c.id, { ...c.availability }])),
  );

  async function toggle(crewId: string, weekKey: string) {
    const next = !avail[crewId]?.[weekKey];
    setAvail((a) => ({ ...a, [crewId]: { ...a[crewId], [weekKey]: next } }));
    await fetch(`/api/admin/crew/${crewId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ weekKey, available: next }),
    });
  }

  async function remove(crewId: string, name: string) {
    if (!confirm(`Remove ${name} from the crew?`)) return;
    await fetch(`/api/admin/crew/${crewId}`, { method: "DELETE" });
    router.refresh();
  }

  return (
    <div className="overflow-x-auto rounded-2xl border border-line bg-surface shadow-sm">
      <table className="w-full min-w-[640px] text-sm">
        <thead>
          <tr className="border-b border-line text-left text-xs uppercase tracking-wide text-ink-soft">
            <th className="px-4 py-3 font-semibold">Crew member</th>
            {weeks.map((w) => (
              <th key={w.key} className="px-3 py-3 text-center font-semibold">
                {w.label}
              </th>
            ))}
            <th className="px-3 py-3" />
          </tr>
        </thead>
        <tbody>
          {crew.map((c) => (
            <tr key={c.id} className="border-b border-line last:border-0">
              <td className="px-4 py-3">
                <p className="font-medium text-ink">{c.name}</p>
                <div className="mt-0.5 flex flex-wrap gap-x-3 text-xs text-ink-soft">
                  {c.phone && (
                    <span className="inline-flex items-center gap-1">
                      <Phone size={11} /> {c.phone}
                    </span>
                  )}
                  {c.email && (
                    <span className="inline-flex items-center gap-1">
                      <Mail size={11} /> {c.email}
                    </span>
                  )}
                </div>
                {c.skills && (
                  <p className="mt-0.5 text-xs text-ink-soft">{c.skills}</p>
                )}
              </td>
              {weeks.map((w) => {
                const on = avail[c.id]?.[w.key] ?? false;
                return (
                  <td key={w.key} className="px-3 py-3 text-center">
                    <button
                      onClick={() => toggle(c.id, w.key)}
                      aria-pressed={on}
                      className={cn(
                        "mx-auto grid h-8 w-8 place-items-center rounded-lg border transition",
                        on
                          ? "border-success bg-success/10 text-success"
                          : "border-line bg-canvas text-ink-soft hover:border-ink-soft",
                      )}
                      title={on ? "Available" : "Not available"}
                    >
                      {on ? <Check size={16} /> : ""}
                    </button>
                  </td>
                );
              })}
              <td className="px-3 py-3 text-right">
                <button
                  onClick={() => remove(c.id, c.name)}
                  className="grid h-8 w-8 place-items-center rounded-md text-ink-soft hover:bg-danger/10 hover:text-danger"
                  aria-label="Remove crew member"
                >
                  <Trash2 size={15} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
