import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CtaStrip } from "@/components/site/CtaStrip";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_FAQS } from "@/lib/faq";
import { site } from "@/lib/config";

export const metadata: Metadata = {
  title: "Frequently asked questions",
  description: `Common questions about ${site.name}: turnaround, pricing, licensing, photo proof, scheduling, and service area in South Jersey.`,
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: SITE_FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <JsonLd data={faqLd} />
      <Header />
      <main>
        <div
          className="-mt-[84px] pt-[84px]"
          style={{ background: "linear-gradient(180deg,#e2f3ee 0%,#f1f8f5 60%,#f1f8f5 100%)" }}
        >
          <Container className="max-w-[820px] py-12 sm:py-16">
            <nav className="flex items-center gap-1.5 text-sm text-muted">
              <Link href="/" className="hover:text-ink">Home</Link>
              <ChevronRight size={14} />
              <span className="text-ink-soft">FAQ</span>
            </nav>
            <h1 className="mt-4 text-[clamp(32px,4.4vw,52px)] font-extrabold leading-[1.04] tracking-[-1.6px] text-ink">
              Frequently asked questions
            </h1>
            <p className="mt-4 max-w-[600px] text-lg leading-relaxed text-ink-soft">
              Everything owners and property managers ask before booking a turn.
            </p>
          </Container>
        </div>

        <Container className="max-w-[820px] py-14">
          <div className="divide-y divide-line rounded-[20px] border border-line bg-surface">
            {SITE_FAQS.map((f) => (
              <div key={f.q} className="p-6">
                <h2 className="text-[17px] font-bold text-ink">{f.q}</h2>
                <p className="mt-2 text-[15.5px] leading-relaxed text-ink-soft">{f.a}</p>
              </div>
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
