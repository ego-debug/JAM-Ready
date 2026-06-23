import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, Phone, MessageSquare, Mail, MapPin, Clock } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_URL, absoluteUrl } from "@/lib/seo";
import { site } from "@/lib/config";

export const metadata: Metadata = {
  title: "Contact",
  description: `Reach ${site.name} in Cherry Hill, NJ. Call, text, or email for a same-day apartment make-ready quote across South Jersey.`,
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const contactLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: `Contact ${site.name}`,
    url: absoluteUrl("/contact"),
    mainEntity: {
      "@type": "HomeAndConstructionBusiness",
      name: site.name,
      url: SITE_URL,
      telephone: site.phoneDisplay,
      email: site.email,
      areaServed: "South Jersey",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Cherry Hill",
        addressRegion: "NJ",
        addressCountry: "US",
      },
    },
  };

  const rows = [
    { icon: Phone, label: "Call", value: site.phoneDisplay, href: `tel:${site.phoneRaw}` },
    { icon: MessageSquare, label: "Text", value: site.phoneDisplay, href: `sms:${site.phoneRaw}` },
    { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
  ];

  return (
    <>
      <JsonLd data={contactLd} />
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
              <span className="text-ink-soft">Contact</span>
            </nav>
            <h1 className="mt-4 text-[clamp(32px,4.4vw,52px)] font-extrabold leading-[1.04] tracking-[-1.6px] text-ink">
              Get in touch
            </h1>
            <p className="mt-4 max-w-[600px] text-lg leading-relaxed text-ink-soft">
              The fastest way to a quote is the request form, but call, text, or
              email works too. We respond the same day.
            </p>
            <div className="mt-7">
              <Button href="/request" size="lg" arrow>
                Request a turn
              </Button>
            </div>
          </Container>
        </div>

        <Container className="max-w-[900px] py-14">
          <div className="grid gap-5 sm:grid-cols-3">
            {rows.map((r) => {
              const Icon = r.icon;
              return (
                <a key={r.label} href={r.href} className="card-warm rounded-[20px] p-6 transition hover:border-accent/50">
                  <span className="grid h-11 w-11 place-items-center rounded-[14px] bg-brand-tint text-accent">
                    <Icon size={22} />
                  </span>
                  <div className="mt-4 text-[13px] font-semibold text-muted">{r.label}</div>
                  <div className="mt-1 text-[16px] font-bold text-ink">{r.value}</div>
                </a>
              );
            })}
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div className="rounded-[20px] border border-line bg-surface p-6">
              <span className="inline-flex items-center gap-2 text-[15px] font-bold text-ink">
                <MapPin size={18} className="text-accent" /> Where we work
              </span>
              <p className="mt-2 text-[14.5px] leading-relaxed text-ink-soft">
                Based in Cherry Hill, NJ. We serve Camden, Burlington, and
                Gloucester counties across South Jersey. See all{" "}
                <Link href="/service-area" className="text-accent underline">service areas</Link>.
              </p>
            </div>
            <div className="rounded-[20px] border border-line bg-surface p-6">
              <span className="inline-flex items-center gap-2 text-[15px] font-bold text-ink">
                <Clock size={18} className="text-accent" /> Hours
              </span>
              <p className="mt-2 text-[14.5px] leading-relaxed text-ink-soft">
                Crews dispatched Monday to Saturday, 8am to 6pm. Send a request
                any time and we will reply the same day.
              </p>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
