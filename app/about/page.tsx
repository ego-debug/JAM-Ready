import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ShieldCheck, Clock, Camera, Users } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CtaStrip } from "@/components/site/CtaStrip";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/config";

export const metadata: Metadata = {
  title: "About us",
  description: `${site.name} is a family-run apartment make-ready crew in Cherry Hill, NJ. Licensed, insured, and built around hitting deadlines with photo proof.`,
  alternates: { canonical: "/about" },
};

const values = [
  { icon: Clock, title: "We hit the deadline", body: "A turn is only useful if it lands on time. We book what we can staff and treat your finish date as a commitment." },
  { icon: Camera, title: "We prove the work", body: "Date-stamped before and after photos on every job, so owner reports and turn records take care of themselves." },
  { icon: Users, title: "One crew, one invoice", body: "No juggling separate trades. One accountable team handles the whole make-ready end to end." },
  { icon: ShieldCheck, title: "Licensed & insured", body: "A registered New Jersey Home Improvement Contractor with general liability coverage, and licensed partners for specialty work." },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <div
          className="-mt-[84px] pt-[84px]"
          style={{ background: "linear-gradient(180deg,#e2f3ee 0%,#f1f8f5 60%,#f1f8f5 100%)" }}
        >
          <Container className="max-w-[900px] py-12 sm:py-16">
            <nav className="flex items-center gap-1.5 text-sm text-muted">
              <Link href="/" className="hover:text-ink">Home</Link>
              <ChevronRight size={14} />
              <span className="text-ink-soft">About</span>
            </nav>
            <h1 className="mt-4 max-w-[760px] text-[clamp(32px,4.4vw,52px)] font-extrabold leading-[1.04] tracking-[-1.6px] text-ink">
              A family crew that turns units on time
            </h1>
            <p className="mt-4 max-w-[640px] text-lg leading-relaxed text-ink-soft">
              {site.name} is a family-run make-ready crew based in Cherry Hill,
              New Jersey. The name is our family initials, and the work is
              simple to describe: take an empty unit, make it rent-ready by your
              deadline, and prove it with photos.
            </p>
          </Container>
        </div>

        <Container className="max-w-[900px] py-14">
          <div className="max-w-[680px] space-y-4 text-[16px] leading-relaxed text-ink-soft">
            <p>
              Most turnover work is done by scattered handymen or an overworked
              in-house maintenance team, and it shows: missed dates, no
              documentation, and units that sit empty losing rent. We built{" "}
              {site.name} to fix that for owners and property managers across
              South Jersey.
            </p>
            <p>
              Every turn runs on a hard finish date and ends with a set of
              before and after photos in your inbox. That is the whole promise.
              It keeps your vacancy days low and makes your owner reports
              effortless.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="card-warm rounded-[20px] p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-[14px] bg-brand-tint text-accent">
                    <Icon size={22} />
                  </span>
                  <h3 className="mb-2 mt-4 text-[18px] font-extrabold text-ink">
                    {v.title}
                  </h3>
                  <p className="m-0 text-[14.5px] leading-relaxed text-ink-soft">
                    {v.body}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-14">
            <CtaStrip />
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
