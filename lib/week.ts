/**
 * ISO week helpers for crew weekly availability (spec §7: "availability
 * toggle per crew member per week"). Week keys look like "2026-W26".
 */

const DAY = 86_400_000;

export function weekKeyFromDate(date: Date): string {
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
  );
  const dayNum = (d.getUTCDay() + 6) % 7; // Mon=0..Sun=6
  d.setUTCDate(d.getUTCDate() - dayNum + 3); // nearest Thursday
  const firstThursday = new Date(Date.UTC(d.getUTCFullYear(), 0, 4));
  const week =
    1 +
    Math.round(
      ((d.getTime() - firstThursday.getTime()) / DAY -
        3 +
        ((firstThursday.getUTCDay() + 6) % 7)) /
        7,
    );
  return `${d.getUTCFullYear()}-W${String(week).padStart(2, "0")}`;
}

export function weekKeyFromISO(iso?: string): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return weekKeyFromDate(d);
}

/** Monday (UTC) that starts the ISO week containing `date`. */
function mondayOf(date: Date): Date {
  const d = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
  );
  const dayNum = (d.getUTCDay() + 6) % 7;
  d.setUTCDate(d.getUTCDate() - dayNum);
  return d;
}

export interface WeekInfo {
  key: string;
  /** e.g. "Jun 23 to 29" */
  label: string;
}

/** The next `count` weeks starting from the week containing `from`. */
export function upcomingWeeks(count: number, from: Date = new Date()): WeekInfo[] {
  const start = mondayOf(from);
  const out: WeekInfo[] = [];
  for (let i = 0; i < count; i++) {
    const monday = new Date(start.getTime() + i * 7 * DAY);
    const sunday = new Date(monday.getTime() + 6 * DAY);
    out.push({ key: weekKeyFromDate(monday), label: rangeLabel(monday, sunday) });
  }
  return out;
}

function rangeLabel(a: Date, b: Date): string {
  const m = (d: Date) =>
    d.toLocaleDateString("en-US", { month: "short", timeZone: "UTC" });
  const day = (d: Date) => d.getUTCDate();
  if (a.getUTCMonth() === b.getUTCMonth()) {
    return `${m(a)} ${day(a)} to ${day(b)}`;
  }
  return `${m(a)} ${day(a)} to ${m(b)} ${day(b)}`;
}
