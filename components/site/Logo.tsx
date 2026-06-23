import Image from "next/image";
import { cn } from "@/lib/utils";

/** Brand mark (house + JAM) plus the two-tone "JAM Ready" wordmark. */
export function Logo({
  className,
  onDark = false,
}: {
  className?: string;
  onDark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <Image
        src="/jam-icon.png"
        alt="JAM-Ready"
        width={40}
        height={40}
        priority
        className="h-10 w-10"
      />
      <span className="text-[21px] font-extrabold leading-none tracking-[-0.5px]">
        <span className={onDark ? "text-white" : "text-ink"}>JAM</span>
        <span className="text-accent"> Ready</span>
      </span>
    </span>
  );
}
