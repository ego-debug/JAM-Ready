import Link from "next/link";
import { Phone } from "lucide-react";
import { CircleArrow } from "./Pieces";
import { site } from "@/lib/config";

/** Compact conversion band used at the bottom of marketing sub-pages. */
export function CtaStrip({
  heading = "Got an empty unit and a deadline?",
  sub = "Send it over and get a same-day quote with a finish date you can lease around.",
}: {
  heading?: string;
  sub?: string;
}) {
  return (
    <div
      className="relative overflow-hidden rounded-3xl px-8 py-12 text-center sm:px-12"
      style={{
        background: "linear-gradient(135deg,#0a2c26 0%,#0f6b5b 58%,#1dba9a 130%)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(80% 120% at 90% 0%,rgba(110,230,200,.35),transparent 60%)" }}
      />
      <div className="relative mx-auto max-w-[620px]">
        <h2 className="m-0 text-[clamp(26px,3.2vw,38px)] font-extrabold leading-[1.08] tracking-[-1.2px] text-white">
          {heading}
        </h2>
        <p className="mx-auto mt-3 max-w-[480px] text-[16px] leading-relaxed text-white/80">
          {sub}
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/request"
            className="inline-flex items-center gap-3 rounded-full py-[9px] pl-[26px] pr-[9px] text-[16px] font-semibold text-ink"
            style={{ background: "linear-gradient(180deg,#fff,#ecf6f2)", border: "1px solid #fff" }}
          >
            Get a free quote
            <CircleArrow tone="dark" size={38} />
          </Link>
          <a
            href={`tel:${site.phoneRaw}`}
            className="inline-flex items-center gap-2 rounded-full border border-white/25 px-5 py-3 text-[15px] font-semibold text-white hover:bg-white/10"
          >
            <Phone size={17} /> {site.phoneDisplay}
          </a>
        </div>
      </div>
    </div>
  );
}
