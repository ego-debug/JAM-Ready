import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PhotoSlot } from "./Pieces";

export function Testimonials() {
  return (
    <section id="area" className="bg-dark py-20">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8">
        <div className="mb-10 flex flex-wrap items-start justify-between gap-7">
          <h2 className="m-0 max-w-[520px] text-[clamp(28px,3.4vw,42px)] font-extrabold leading-[1.06] tracking-[-1.3px] text-white">
            Trusted by the people who{" "}
            <span className="text-[#45dcc0]">manage units</span>
          </h2>
          <p className="m-0 max-w-[340px] text-[15px] leading-relaxed text-[#7e908b]">
            Owners, property managers and leasing teams who count on us to keep
            turns short and re-lists on schedule.
          </p>
        </div>

        <div className="grid gap-7 lg:grid-cols-[280px_1fr]">
          <div
            className="min-h-[300px] overflow-hidden rounded-[22px]"
            style={{ border: "1px solid #143b34" }}
          >
            <PhotoSlot label="Client photo" />
          </div>
          <div
            className="relative rounded-[22px] px-10 py-[38px]"
            style={{ background: "linear-gradient(165deg,#0e2b27,#182421)", border: "1px solid #143b34" }}
          >
            <span className="font-display text-[64px] font-extrabold leading-[.4] text-[#45dcc0]">
              &ldquo;
            </span>
            <h3 className="mb-3.5 mt-1.5 text-[24px] font-extrabold tracking-[-.6px] text-white">
              Smooth from key handoff to re-list.
            </h3>
            <p className="m-0 max-w-[560px] text-[16px] leading-[1.65] text-[#a7c0b9]">
              Two units turned in a week, both with full before and after sets in
              my inbox before I&rsquo;d even driven over. The photos alone make my
              owner reports effortless. Easiest vendor I work with.
            </p>
            <div className="mt-7 flex flex-wrap items-center justify-between gap-5">
              <div className="flex items-center gap-3.5">
                <span
                  className="grid h-[46px] w-[46px] place-items-center rounded-full font-extrabold text-white"
                  style={{ background: "linear-gradient(160deg,#45dcc0,#169d82)" }}
                >
                  DM
                </span>
                <div>
                  <div className="text-[15.5px] font-bold text-white">
                    Dana Mercer
                  </div>
                  <div className="text-[13.5px] text-[#7e908b]">
                    Property manager · 40 units
                  </div>
                </div>
              </div>
              <Link
                href="/request"
                className="inline-flex items-center gap-2.5 rounded-full py-2 pl-5 pr-2 text-[14.5px] font-semibold text-ink"
                style={{ background: "linear-gradient(180deg,#fff,#dceee7)", boxShadow: "inset 0 1px 0 #fff" }}
              >
                Get the same turn
                <span
                  className="grid h-8 w-8 place-items-center rounded-full text-white"
                  style={{ background: "linear-gradient(180deg,#11574b,#0a2c26)" }}
                >
                  <ArrowRight size={13} strokeWidth={2.4} />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
