import { cn } from "@/lib/utils";

/**
 * Status or label pill. Tones map to the fixed semantic palette so the same
 * color means the same thing across the marketing site and the app.
 */
type Tone = "brand" | "accent" | "success" | "warning" | "danger" | "info" | "neutral";

const tones: Record<Tone, string> = {
  brand: "bg-brand-tint text-brand",
  accent: "bg-accent/15 text-accent-hover",
  success: "bg-success/10 text-green-700",
  warning: "bg-warning/15 text-amber-700",
  danger: "bg-danger/10 text-danger",
  info: "bg-info/10 text-sky-700",
  neutral: "bg-canvas text-ink-soft border border-line",
};

export function Badge({
  tone = "neutral",
  className,
  children,
}: {
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
