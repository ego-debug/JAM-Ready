import type { Metadata } from "next";
import Link from "next/link";
import {
  ChevronRight,
  Building2,
  FileText,
  CalendarClock,
  Camera,
  Gauge,
  Users,
  Check,
} from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CtaStrip } from "@/components/site/CtaStrip";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, SITE_URL } from "@/lib/seo";
import { site } from "@/lib/config";

export const metadata: Metadata = {
  title: "Make-ready for property managers",
  description: `Recurring apartment turnovers for property managers and portfolios in South Jersey. Per-unit billing, net terms, photo proof for owner reports, one crew across every property.`,
  alternates: { canonical: "/property-managers" },
};

const values = [
  { icon: Building2, title: "One crew for the whole portfolio", body: "The same team across every property, so quality and turnaround stay consistent from unit to unit." },
  { icon: FileText, title: "Per-unit billing, clean statements", body: "Each turn is its own line item with photos attached. We can consolidate units into one statement for your accounting." },
  { icon: CalendarClock, title: "Net terms for managed accounts", body: "Established portfolios get net-15 or net-30 with no deposit. We invoice after the unit is signed off." },
  { icon: Camera, title: "Photo proof for owner reports", body: "Date-stamped before and after photos on every unit, ready to forward straight into your owner reports." },
  { icon: Gauge, title: "Built to cut vacancy days", body: "Hard finish dates and same-day quotes so units re-list fast and rent loss stays low." },
  { icon: Users, title: "Capacity for turn season", body: "We scale crews for end-of-month and peak turn periods so a stack of move-outs does not back you up." },
];

const steps = [
  { title: "Send us the unit", body: "Share the work order, a few photos, and the deadline, through our form or your system." },
  { title: "Same-day quote, you approve", body: "A clear line-item price with no deposit for managed accounts. Nothing starts until you approve." },
  { title: "We turn it and prove it", body: "The crew completes the make-ready and delivers before and after photos the day we finish." },
  { title: "Invoice after sign-off", body: "Per-unit invoice on net terms, with photos attached and ready for your AP." },
];

export default function PropertyManagersPage() {
  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Apartment make-ready for property managers",
    serviceType: "Apartment turnover and make-ready",
    description: metadata.description as string,
    url: absoluteUrl("/property-managers"),
    provider: { "@type": "HomeAndConstructionBusiness", name: site.name, url: SITE_URL },
    areaServed: "South Jersey",
  };

  return (
    <>
      <JsonLd data={serviceLd} />
      <Header />
      <main>
        <div
          className="-mt-[84px] pt-[84px]"
          style={{ background: "linear-gradient(180deg,#e2f3ee 0%,#f1f8f5 60%,#f1f8f5 100%)" }}
        >
          <Container className="max-w-[1000px] py-12 sm:py-16">
            <nav className="flex items-center gap-1.5 text-sm text-muted">
              <Link href="/" className="hover:text-ink">Home</Link>
              <ChevronRight size={14} />
              <span className="text-ink-soft">Property managers</span>
            </nav>
            <span className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm font-semibold text-accent">
              <Building2 size={15} /> For owners, PMs &amp; leasing teams
            </span>
            <h1 className="mt-4 max-w-[820px] text-[clamp(32px,4.6vw,56px)] font-extrabold leading-[1.03] tracking-[-1.8px] text-ink">
              Make-ready built for{" "}
              <span className="text-accent">portfolios</span>
            </h1>
            <p className="mt-4 max-w-[640px] text-lg leading-relaxed text-ink-soft">
              If you manage units, your turns need to be fast, documented, and
              easy to bill. We run every make-ready on a hard deadline, send
              photo proof you can drop into owner reports, and invoice per unit
              on net terms.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="/request" size="lg" arrow>
                Turn a unit
              </Button>
              <Button href="/contact" size="lg" variant="secondary">
                Talk about your portfolio
              </Button>
            </div>
          </Container>
        </div>

        <Container className="max-w-[1000px] py-14">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className="card-warm rounded-[20px] p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-[14px] bg-brand-tint text-accent">
                    <Icon size={22} />
                  </span>
                  <h2 className="mb-2 mt-4 text-[17px] font-extrabold text-ink">{v.title}</h2>
                  <p className="m-0 text-[14.5px] leading-relaxed text-ink-soft">{v.body}</p>
                </div>
              );
            })}
          </div>

          {/* how it works */}
          <div className="mt-16">
            <h2 className="font-display text-2xl font-extrabold text-ink">
              How we work with managers
            </h2>
            <ol className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {steps.map((s, i) => (
                <li key={s.title} className="rounded-[18px] border border-line bg-surface p-5">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-accent text-[14px] font-extrabold text-white">
                    {i + 1}
                  </span>
                  <h3 className="mb-1.5 mt-3 text-[16px] font-bold text-ink">{s.title}</h3>
                  <p className="m-0 text-[14px] leading-relaxed text-ink-soft">{s.body}</p>
                </li>
              ))}
            </ol>
          </div>

          {/* terms note */}
          <div className="mt-12 flex flex-col gap-3 rounded-[20px] border border-line bg-canvas p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-surface text-success">
                <Check size={18} strokeWidth={2.6} />
              </span>
              <p className="text-[15px] text-ink-soft">
                <span className="font-semibold text-ink">No deposit for managed accounts.</span>{" "}
                We invoice after each unit is signed off. New accounts may start
                with a deposit until terms are set.
              </p>
            </div>
          </div>

          <div className="mt-16">
            <CtaStrip
              heading="Cover your next round of turns"
              sub="Send us a unit or your turn list and we will scope it the same day."
            />
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
