/** Join class names, dropping falsy values. Tiny stand-in for clsx. */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(" ");
}

/** Format a number as USD. */
export function formatMoney(n: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

/**
 * Parse a stored date value. Date-only strings ("YYYY-MM-DD") are parsed in
 * LOCAL time (not UTC) so deadlines/scheduled dates never shift a day.
 * Full ISO timestamps (createdAt, etc.) parse normally.
 */
export function toDate(value?: string | null): Date | null {
  if (!value) return null;
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (m) return new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  const d = new Date(value);
  return Number.isNaN(d.getTime()) ? null : d;
}

/** Short date like "Jun 28". */
export function formatShortDate(value?: string): string {
  const d = toDate(value);
  if (!d) return "-";
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

/** Full date like "Jun 28, 2026". */
export function formatLongDate(value?: string): string {
  const d = toDate(value);
  if (!d) return "-";
  return d.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
