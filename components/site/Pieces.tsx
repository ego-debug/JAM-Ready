import { ArrowRight, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type ArrowTone = "white" | "orange" | "dark" | "ghost";

const arrowBg: Record<ArrowTone, React.CSSProperties> = {
  white: { background: "linear-gradient(180deg,#fff,#d9eae3)", color: "#182421" },
  orange: {
    background: "linear-gradient(180deg,#45dcc0,#1dba9a 60%,#169d82)",
    color: "#fff",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,.5)",
  },
  dark: { background: "linear-gradient(180deg,#11574b,#0a2c26)", color: "#fff" },
  ghost: { background: "#ecf6f2", color: "#182421", border: "1px solid #d9eae3" },
};

/** The circular arrow badge that sits inside pill buttons and on cards. */
export function CircleArrow({
  tone = "white",
  size = 34,
  className,
}: {
  tone?: ArrowTone;
  size?: number;
  className?: string;
}) {
  return (
    <span
      className={cn("grid shrink-0 place-items-center rounded-full", className)}
      style={{ width: size, height: size, ...arrowBg[tone] }}
    >
      <ArrowRight size={Math.round(size * 0.42)} strokeWidth={2.3} />
    </span>
  );
}

/**
 * Placeholder for a real job photo. Swap for an <img>/<Image> once real
 * before/after shots are available.
 */
export function PhotoSlot({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex h-full w-full flex-col items-center justify-center gap-2 text-center",
        className,
      )}
      style={{
        background:
          "linear-gradient(150deg,#d9f0ea 0%,#c3e9dd 45%,#aee0cf 100%)",
      }}
    >
      <span className="grid h-11 w-11 place-items-center rounded-full bg-white/70 text-[#1dba9a]">
        <ImageIcon size={20} />
      </span>
      <span className="px-4 text-sm font-semibold text-[#0e5e4f]">{label}</span>
    </div>
  );
}
