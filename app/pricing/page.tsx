import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, FileText, Check, CalendarCheck, Lock, Package } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CtaStrip } from "@/components/site/CtaStrip";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { GREEN_SERVICES, LOCKED_SERVICES, UNIT_LABEL } from "@/lib/services";
import { site } from "@/lib/config";

export const metadata: Metadata = {
  title: "Apartment turnover cost & how quoting works",
  description: `How ${site.name} prices a make-ready: a same-day, line-item quote with no deposit, and you pay after sign-off. See what drives apartment turnover cost.`,
  alternates: { canonical: "/pricing" },
};

const steps = [
  { icon: FileText, title: "Same-day quote", body: "Send photos and your deadline. We send back a clear, line-item price the same day, no deposit to book." },
  { icon: Check, title: "You approve", body: "Review the scope and price on your private link and approve in one tap. Nothing starts until you do." },
  { icon: CalendarCheck, title: "Pay after sign-off", body: "Your invoice lands with the after-photos when the unit is done. Net terms for managed portfolios." },
];

const factors = [
  "Unit size: bedrooms, bathrooms, and total square footage",
  "Scope: a few touch-ups versus a full turn",
  "Flooring: repair, partial replacement, or a full swap",
  "Condition: how much patching, cleaning, and repair the unit needs",
  "Deadline: standard timeline or a rush",
];

export default function PricingPage() {
  return (
    <>
      <Header />
      <main>
        <div
          className="-mt-[84px] pt-[84px]"
          style={{ background: "linear-gradient(180deg,#e7f6f1 0%,#faf6ef 60%,#faf6ef 100%)" }}
        >
          <Container className="max-w-[900px] py-12 sm:py-16">
            <nav className="flex items-center gap-1.5 text-sm text-muted">
              <Link href="/" className="hover:text-ink">Home</Link>
              <ChevronRight size={14} />
              <span className="text-ink-soft">Pricing</span>
            </nav>
            <h1 className="mt-4 max-w-[760px] text-[clamp(32px,4.4vw,52px)] font-extrabold leading-[1.04] tracking-[-1.6px] text-ink">
              How make-ready pricing works
            </h1>
            <p className="mt-4 max-w-[640px] text-lg leading-relaxed text-ink-soft">
              Every unit is different, so we price each turn from a line-item
              quote instead of a flat rate. Here is how it works and what drives
              the cost.
            </p>
            <div className="mt-7">
              <Button href="/request" size="lg" arrow>
                Get a free quote
              </Button>
            </div>
          </Container>
        </div>

        <div className="bg-cream">
          <Container className="max-w-[900px] py-14">
            {/* steps */}
            <div className="grid gap-y-10 border-t border-line pt-10 sm:grid-cols-2 lg:grid-cols-3 lg:gap-y-0">
              {steps.map((s) => {
                const Icon = s.icon;
                return (
                  <div
                    key={s.title}
                    className="lg:border-l lg:border-line lg:pl-8 lg:pr-6 lg:first:border-l-0 lg:first:pl-0"
                  >
                    <Icon size={22} strokeWidth={1.75} className="text-accent" />
                    <h3 className="mt-4 text-[17px] font-extrabold text-ink">{s.title}</h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">{s.body}</p>
                  </div>
                );
              })}
            </div>
          </Container>
        </div>

        <div className="bg-cream">
          <Container className="max-w-[900px] py-14">
            {/* factors */}
            <div>
              <h2 className="font-display text-2xl font-extrabold text-ink">
                What drives the cost
              </h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {factors.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check size={18} strokeWidth={2} className="mt-0.5 shrink-0 text-accent" />
                    <span className="text-[15px] text-ink-soft">{f}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* menu */}
            <div className="mt-14">
              <h2 className="font-display text-2xl font-extrabold text-ink">
                What we quote
              </h2>
              <p className="mt-2 max-w-[640px] text-[15px] text-ink-soft">
                Each line is priced by the unit shown, then totaled into one
                quote. Prices cover labor and install.
              </p>

              <div className="mt-5 flex items-start gap-3 rounded-2xl border border-line bg-surface p-5">
                <Package size={20} strokeWidth={1.75} className="mt-0.5 shrink-0 text-accent" />
                <p className="text-sm text-ink-soft">
                  <span className="font-semibold text-ink">
                    Materials are supplied by the owner.
                  </span>{" "}
                  You pick the paint, flooring, fixtures, appliances, doors, and
                  hardware, and we install it. Our price is labor only, so there
                  is no material markup on your invoice. Prefer not to source the
                  paint or flooring yourself? We work with suppliers and can
                  arrange the material, quoted separately from our labor.
                </p>
              </div>
              <div className="mt-5 overflow-hidden rounded-2xl border border-line bg-surface">
                {GREEN_SERVICES.map((s) => (
                  <div
                    key={s.id}
                    className="flex items-center justify-between gap-3 border-b border-line px-5 py-3.5 last:border-0"
                  >
                    <span className="text-[15px] font-medium text-ink">{s.name}</span>
                    <span className="shrink-0 rounded-full bg-canvas px-2.5 py-0.5 text-xs font-semibold text-ink-soft">
                      {UNIT_LABEL[s.unitType]}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-start gap-3 rounded-2xl border border-line bg-surface p-5">
                <Lock size={20} strokeWidth={1.75} className="mt-0.5 shrink-0 text-accent" />
                <p className="text-sm text-ink-soft">
                  <span className="font-semibold text-ink">
                    {LOCKED_SERVICES.map((s) => s.name.split(":")[0]).join(", ")}
                  </span>{" "}
                  beyond a like-for-like swap are coordinated through our licensed
                  partners and quoted separately, so it is always done to code.
                </p>
              </div>
            </div>
          </Container>
        </div>

        <div className="bg-cream">
          <Container className="max-w-[900px] py-14">
            <CtaStrip />
          </Container>
        </div>
      </main>
      <Footer />
    </>
  );
}
