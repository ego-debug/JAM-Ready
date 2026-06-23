import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Clock, ArrowRight } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CtaStrip } from "@/components/site/CtaStrip";
import { Container } from "@/components/ui/Container";
import { POSTS, formatPostDate } from "@/lib/blog";
import { site } from "@/lib/config";

export const metadata: Metadata = {
  title: "Resources for landlords & property managers",
  description: `Practical guides on apartment turnovers, make-ready costs, and cutting vacancy days, from the crew at ${site.name}.`,
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  const posts = [...POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <>
      <Header />
      <main>
        <div
          className="-mt-[84px] pt-[84px]"
          style={{ background: "linear-gradient(180deg,#e2f3ee 0%,#f1f8f5 70%,#f1f8f5 100%)" }}
        >
          <Container className="max-w-[1000px] py-12 sm:py-16">
            <nav className="flex items-center gap-1.5 text-sm text-muted">
              <Link href="/" className="hover:text-ink">Home</Link>
              <ChevronRight size={14} />
              <span className="text-ink-soft">Resources</span>
            </nav>
            <h1 className="mt-4 text-[clamp(32px,4.4vw,52px)] font-extrabold leading-[1.04] tracking-[-1.6px] text-ink">
              Turnover resources for owners
            </h1>
            <p className="mt-4 max-w-[600px] text-lg leading-relaxed text-ink-soft">
              Practical guides on make-ready scope, costs, and cutting vacancy
              days, written for landlords and property managers.
            </p>
          </Container>
        </div>

        <Container className="max-w-[1000px] py-14">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="card-warm group flex flex-col rounded-[22px] p-6 transition hover:border-accent/50"
              >
                <div className="flex items-center gap-3 text-xs text-muted">
                  <span>{formatPostDate(p.date)}</span>
                  <span className="inline-flex items-center gap-1">
                    <Clock size={12} /> {p.readMins} min
                  </span>
                </div>
                <h2 className="mt-3 text-[19px] font-extrabold leading-snug text-ink">
                  {p.title}
                </h2>
                <p className="mt-2 flex-1 text-[14.5px] leading-relaxed text-ink-soft">
                  {p.excerpt}
                </p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[14.5px] font-semibold text-accent">
                  Read it
                  <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                </span>
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
