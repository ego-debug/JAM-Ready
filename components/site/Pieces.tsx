import { ArrowRight, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type ArrowTone = "white" | "orange" | "dark" | "ghost";

const arrowBg: Record<ArrowTone, React.CSSProperties> = {
  white: { background: "linear-gradient(180deg,#fff,#d9e8e2)", color: "#0e2a26" },
  orange: {
    background: "linear-gradient(180deg,#2ed3a6,#10a37a 60%,#0c8466)",
    color: "#fff",
    boxShadow: "inset 0 1px 0 rgba(255,255,255,.5)",
  },
  dark: { background: "linear-gradient(180deg,#15564d,#0b2420)", color: "#fff" },
  ghost: { background: "#e6f4ef", color: "#0e2a26", border: "1px solid #d9e8e2" },
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
      <span className="grid h-11 w-11 place-items-center rounded-full bg-white/70 text-[#10a37a]">
        <ImageIcon size={20} />
      </span>
      <span className="px-4 text-sm font-semibold text-[#0c6b54]">{label}</span>
    </div>
  );
}
