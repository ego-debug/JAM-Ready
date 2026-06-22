"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  CalendarClock,
  UserPlus,
  X,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  CircleCheck,
} from "lucide-react";
import type { CrewMember, JobStatus } from "@/lib/types";
import { weekKeyFromISO } from "@/lib/week";
import { cn, formatLongDate } from "@/lib/utils";

export function SchedulingPanel({
  jobId,
  status,
  dueDate,
  scheduledDate,
  assignedCrew,
  allCrew,
}: {
  jobId: string;
  status: JobStatus;
  dueDate?: string;
  scheduledDate?: string;
  assignedCrew: CrewMember[];
  allCrew: CrewMember[];
}) {
  const router = useRouter();
  const [date, setDate] = useState(scheduledDate ?? "");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const weekKey = weekKeyFromISO(date || undefined);
  const assignedIds = new Set(assignedCrew.map((c) => c.id));
  const unassigned = allCrew.filter((c) => !assignedIds.has(c.id));
  // both are "YYYY-MM-DD" so lexical compare is timezone-safe
  const dateAfterDue = !!date && !!dueDate && date > dueDate;
  const isScheduled = status === "Scheduled";

  async function post(body: object) {
    setBusy(true);
    setError(null);
    try {
      await fetch(`/api/admin/jobs/${jobId}/schedule`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  async function saveDate(value: string) {
    setDate(value);
    await post({ scheduledDate: value || null });
  }

  async function confirmSchedule() {
    setBusy(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/jobs/${jobId}/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Scheduled" }),
      });
      if (!res.ok) {
        const d = await res.json().catch(() => ({}));
        setError(d.error || "Couldn't schedule this job.");
        return;
      }
      router.refresh();
    } finally {
      setBusy(false);
    }
  }

  function availabilityBadge(c: CrewMember) {
    if (!weekKey)
      return <span className="text-xs text-ink-soft">Pick a date</span>;
    const avail = c.availability[weekKey];
    if (avail)
      return (
        <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-xs font-medium text-green-700">
          <CircleCheck size={11} /> Available
        </span>
      );
    return (
      <span className="rounded-full bg-canvas px-2 py-0.5 text-xs text-ink-soft">
        Not marked
      </span>
    );
  }

  return (
    <div className="rounded-2xl border border-line bg-surface p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-display text-base font-semibold text-ink">
          <CalendarClock size={18} className="text-ink-soft" /> Scheduling
        </h3>
        {isScheduled && (
          <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-medium text-green-700">
            <CheckCircle2 size={12} /> Scheduled
          </span>
        )}
      </div>

      {/* scheduled date */}
      <div className="mt-4">
        <label className="mb-1.5 block text-xs font-medium text-ink-soft">
          Scheduled date
        </label>
        <input
          type="date"
          value={date}
          max={dueDate || undefined}
          onChange={(e) => saveDate(e.target.value)}
          className={cn(
            "w-full rounded-lg border bg-surface px-3 py-2 text-sm text-ink shadow-sm outline-none focus:ring-2 focus:ring-brand/30",
            dateAfterDue ? "border-danger" : "border-line focus:border-brand",
          )}
        />
        {dueDate && (
          <p className="mt-1 text-xs text-ink-soft">
            Deadline: {formatLongDate(dueDate)}
          </p>
        )}
        {dateAfterDue && (
          <p className="mt-1 flex items-center gap-1 text-xs font-medium text-danger">
            <AlertTriangle size={12} /> After the deadline. Pick an earlier date.
          </p>
        )}
      </div>

      {/* assigned crew */}
      <div className="mt-5">
        <p className="mb-2 text-xs font-medium text-ink-soft">
          Assigned crew ({assignedCrew.length})
        </p>
        {assignedCrew.length === 0 ? (
          <p className="rounded-lg border border-dashed border-line bg-canvas px-3 py-2.5 text-xs text-ink-soft">
            No one assigned yet. Add a crew member below.
          </p>
        ) : (
          <div className="flex flex-wrap gap-2">
            {assignedCrew.map((c) => (
              <span
                key={c.id}
                className="inline-flex items-center gap-1.5 rounded-full bg-brand-tint px-2.5 py-1 text-xs font-medium text-brand"
              >
                {c.name}
                <button
                  onClick={() => post({ unassign: c.id })}
                  disabled={busy}
                  className="rounded-full hover:text-danger"
                  aria-label={`Unassign ${c.name}`}
                >
                  <X size={13} />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      {/* capacity glance */}
      <div className="mt-5">
        <p className="mb-2 text-xs font-medium text-ink-soft">
          {weekKey ? "Available this week" : "Add crew"}
        </p>
        {allCrew.length === 0 ? (
          <p className="text-xs text-ink-soft">
            No crew members yet. Add them on the Crew page first.
          </p>
        ) : unassigned.length === 0 ? (
          <p className="text-xs text-ink-soft">Everyone is assigned.</p>
        ) : (
          <div className="space-y-1.5">
            {unassigned.map((c) => (
              <div
                key={c.id}
                className="flex items-center justify-between gap-2 rounded-lg border border-line bg-canvas px-3 py-2"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-ink">{c.name}</p>
                  {c.skills && (
                    <p className="truncate text-xs text-ink-soft">{c.skills}</p>
                  )}
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  {availabilityBadge(c)}
                  <button
                    onClick={() => post({ assign: c.id })}
                    disabled={busy}
                    className="inline-flex items-center gap-1 rounded-md bg-brand px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-brand-dark disabled:opacity-60"
                  >
                    <UserPlus size={13} /> Assign
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* confirm */}
      {!isScheduled && (
        <div className="mt-5 border-t border-line pt-4">
          <button
            onClick={confirmSchedule}
            disabled={busy}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-accent-hover disabled:opacity-60"
          >
            {busy ? <Loader2 size={16} className="animate-spin" /> : <CalendarClock size={16} />}
            Confirm &amp; schedule
          </button>
          {error && (
            <p className="mt-2 flex items-start gap-1.5 text-xs font-medium text-danger">
              <AlertTriangle size={13} className="mt-0.5 shrink-0" /> {error}
            </p>
          )}
          <p className="mt-2 text-xs text-ink-soft">
            Requires at least one assigned crew member and a date on or before
            the deadline.
          </p>
        </div>
      )}
    </div>
  );
}
