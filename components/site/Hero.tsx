import Link from "next/link";
import { Camera, Check, MessageSquare, ShieldCheck, Star, Clock } from "lucide-react";
import { CircleArrow } from "./Pieces";
import { ProofSlider } from "./ProofSlider";
import { site } from "@/lib/config";

export function Hero() {
  return (
    <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-6 pb-28 pt-8 sm:px-8 lg:grid-cols-[1.04fr_.96fr] lg:gap-14 lg:pb-[150px] lg:pt-12">
      <div>
        <span
          className="inline-flex items-center gap-2.5 rounded-full py-2 pl-3 pr-4 text-sm font-semibold text-[#0c6b54]"
          style={{
            background: "rgba(255,255,255,.7)",
            border: "1px solid rgba(255,255,255,.85)",
            boxShadow: "inset 0 1px 0 #fff,0 6px 16px -12px rgba(8,30,27,.4)",
          }}
        >
          <Camera size={16} className="text-accent" /> Photo-proof on every turn
        </span>

        <h1 className="mt-6 text-[clamp(40px,5.1vw,70px)] font-extrabold leading-[.97] tracking-[-2px] text-ink text-balance">
          Rent-ready by your{" "}
          <span className="font-script text-[1.04em] text-accent">deadline</span>.
          Proof the day it&rsquo;s{" "}
          <span className="font-script text-[1.04em] text-ink">done</span>.
        </h1>

        <p className="mt-6 max-w-[480px] text-[17.5px] leading-relaxed text-ink-soft">
          We patch, paint, clean, and refresh empty units fast, with date-stamped
          before and after photos the day we finish. Most units rent-ready in{" "}
          <strong className="text-ink">1 to 3 days</strong>.
        </p>

        <div className="mt-8 flex flex-wrap gap-3.5">
          <Link
            href="/request"
            className="btn-dark inline-flex items-center gap-3 rounded-full py-[9px] pl-[26px] pr-[9px] text-[16.5px] font-semibold"
          >
            Get a free quote
            <CircleArrow tone="orange" size={40} />
          </Link>
          <a
            href={`sms:${site.phoneRaw}`}
            className="btn-white inline-flex items-center gap-2.5 rounded-full px-[26px] py-[15px] text-[16.5px] font-semibold"
          >
            <MessageSquare size={18} /> Text us a unit address
          </a>
        </div>

        <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-[14.5px] font-semibold text-ink-soft">
          <span className="inline-flex items-center gap-2">
            <ShieldCheck size={17} className="text-accent" /> Licensed &amp;
            insured
          </span>
          <span className="inline-flex items-center gap-2">
            <Star size={17} className="fill-accent text-accent" />
            <strong className="text-ink">{site.rating}</strong> on Google
          </span>
          <span className="inline-flex items-center gap-2">
            <Clock size={17} className="text-accent" />
            <strong className="text-ink">{site.stats.onTimeRate}</strong> on-time
          </span>
        </div>
      </div>

      {/* proof card */}
      <div className="relative">
        <div
          className="rounded-[30px] p-[9px]"
          style={{
            background: "linear-gradient(155deg,#34d8ad,#10a37a 52%,#0b7257)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,.45),0 44px 72px -32px rgba(12,132,102,.55),0 12px 34px -16px rgba(8,30,27,.45)",
          }}
        >
          <ProofSlider />
        </div>

        <div
          className="animate-float absolute right-1 -top-4 inline-flex items-center gap-2.5 rounded-[14px] bg-white px-4 py-[11px] sm:-right-2"
          style={{
            border: "1px solid #dcebe5",
            boxShadow: "0 18px 40px -16px rgba(8,30,27,.4)",
          }}
        >
          <span
            className="grid h-[30px] w-[30px] place-items-center rounded-full"
            style={{ background: "linear-gradient(180deg,#5ad27a,#34a85a)" }}
          >
            <Check size={16} className="text-white" strokeWidth={3} />
          </span>
          <span className="text-[13px] leading-tight">
            <strong className="block text-ink">Owner approved</strong>
            <span className="text-muted">photos delivered</span>
          </span>
        </div>

        <p className="mx-1 mt-4 text-center text-sm text-muted">
          Drag to see the difference. The same proof your owner gets.
        </p>
      </div>
    </div>
  );
}
