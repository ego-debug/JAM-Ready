import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CtaStrip } from "@/components/site/CtaStrip";
import { Container } from "@/components/ui/Container";
import { SERVICE_PAGES } from "@/lib/service-pages";
import { site } from "@/lib/config";

export const metadata: Metadata = {
  title: "Make-ready & turnover services",
  description: `Apartment turnover services from ${site.name}: patch & repair, interior painting, deep cleaning, flooring, and full make-ready. Cherry Hill and South Jersey.`,
  alternates: { canonical: "/services" },
};

export default function ServicesIndexPage() {
  return (
    <>
      <Header />
      <main>
        <div
          className="-mt-[84px] pt-[84px]"
          style={{ background: "linear-gradient(180deg,#e7f6f1 0%,#faf6ef 60%,#faf6ef 100%)" }}
        >
          <Container className="max-w-[1100px] py-12 sm:py-16">
            <nav className="flex items-center gap-1.5 text-sm text-muted">
              <Link href="/" className="hover:text-ink">Home</Link>
              <ChevronRight size={14} />
              <span className="text-ink-soft">Services</span>
            </nav>
            <h1 className="mt-4 max-w-[760px] text-[clamp(32px,4.4vw,52px)] font-extrabold leading-[1.04] tracking-[-1.6px] text-ink">
              Everything a unit needs between tenants
            </h1>
            <p className="mt-4 max-w-[620px] text-lg leading-relaxed text-ink-soft">
              One crew handles the full turn, or just the piece you need. Pick a
              service to see what&rsquo;s included, or get a same-day quote for
              the whole unit.
            </p>
          </Container>
        </div>

        <section className="bg-cream">
          <Container className="max-w-[1100px] py-14">
            <div className="grid gap-y-10 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-0">
              {SERVICE_PAGES.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group flex flex-col lg:border-l lg:border-line lg:pl-8 lg:pr-6 lg:first:border-l-0 lg:first:pl-0"
                >
                  <h2 className="font-display text-xl font-extrabold text-ink">
                    {s.name}
                  </h2>
                  <p className="mt-2 flex-1 text-[14.5px] leading-relaxed text-ink-soft">
                    {s.intro}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-[14.5px] font-semibold text-accent">
                    See what&rsquo;s included
                    <ArrowRight size={15} className="transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>

            <div className="mt-14">
              <CtaStrip />
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}
