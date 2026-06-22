import { site } from "@/lib/config";
import { cn } from "@/lib/utils";

/** Dark rounded mark with a house outline, plus the wordmark. */
export function Logo({
  className,
  onDark = false,
}: {
  className?: string;
  onDark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <span
        className="grid h-[42px] w-[42px] place-items-center rounded-[14px]"
        style={{
          background: "linear-gradient(180deg,#15564d,#09201d)",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,.25),0 8px 18px -8px rgba(8,30,27,.6)",
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M3 11.5 12 4l9 7.5M5 10v9h5v-5h4v5h5v-9"
            stroke="#fff"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <span
        className={cn(
          "text-[21px] font-extrabold tracking-[-0.5px]",
          onDark ? "text-white" : "text-ink",
        )}
      >
        {site.name}
      </span>
    </span>
  );
}
