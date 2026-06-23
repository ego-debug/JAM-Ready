import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, MapPin, Clock, ArrowRight } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CtaStrip } from "@/components/site/CtaStrip";
import { Container } from "@/components/ui/Container";
import { PhotoSlot } from "@/components/site/Pieces";
import { CASE_STUDIES } from "@/lib/case-studies";
import { site } from "@/lib/config";

export const metadata: Metadata = {
  title: "Case studies",
  description: `Real apartment turnovers by ${site.name}: scope, timeline, and results from make-ready jobs across South Jersey.`,
  alternates: { canonical: "/case-studies" },
};

export default function CaseStudiesIndex() {
  return (
    <>
      <Header />
      <main>
        <div
          className="-mt-[84px] pt-[84px]"
          style={{ background: "linear-gradient(180deg,#e7f6f1 0%,#f4faf8 70%,#f4faf8 100%)" }}
        >
          <Container className="max-w-[1000px] py-12 sm:py-16">
            <nav className="flex items-center gap-1.5 text-sm text-muted">
              <Link href="/" className="hover:text-ink">Home</Link>
              <ChevronRight size={14} />
              <span className="text-ink-soft">Case studies</span>
            </nav>
            <h1 className="mt-4 text-[clamp(32px,4.4vw,52px)] font-extrabold leading-[1.04] tracking-[-1.6px] text-ink">
              Turns we&rsquo;ve done
            </h1>
            <p className="mt-4 max-w-[600px] text-lg leading-relaxed text-ink-soft">
              A look at real make-ready jobs: what the unit needed, how long it
              took, and what it cost.
            </p>
          </Container>
        </div>

        <Container className="max-w-[1000px] py-14">
          <div className="grid gap-6 sm:grid-cols-2">
            {CASE_STUDIES.map((c) => (
              <Link
                key={c.slug}
                href={`/case-studies/${c.slug}`}
                className="group overflow-hidden rounded-[22px] border border-line bg-surface transition hover:border-accent/50 hover:shadow-[0_24px_50px_-30px_rgba(24,36,33,.4)]"
              >
                <div className="relative h-[200px]">
                  <PhotoSlot label="After photo" />
                  <span
                    className="absolute left-3.5 top-3.5 rounded-lg px-2.5 py-1.5 text-[12px] font-bold text-white"
                    style={{ background: "rgba(29,186,154,.92)" }}
                  >
                    AFTER
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex flex-wrap items-center gap-2 text-[13px] font-semibold text-muted">
                    <span className="inline-flex items-center gap-1">
                      <MapPin size={13} className="text-accent" /> {c.location}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock size={13} className="text-accent" /> {c.timeline}
                    </span>
                  </div>
                  <h2 className="mt-2 text-[19px] font-extrabold leading-snug text-ink">
                    {c.title}
                  </h2>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-[14.5px] font-semibold text-accent">
                    Read the turn
                    <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            ))}
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
