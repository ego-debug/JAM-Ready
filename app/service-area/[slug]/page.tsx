import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ChevronRight, MapPin } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CtaStrip } from "@/components/site/CtaStrip";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { LOCATION_PAGES, getLocationPage } from "@/lib/location-pages";
import { SERVICE_PAGES } from "@/lib/service-pages";
import { absoluteUrl, SITE_URL } from "@/lib/seo";
import { site } from "@/lib/config";

export function generateStaticParams() {
  return LOCATION_PAGES.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const l = getLocationPage(slug);
  if (!l) return {};
  const title = `Apartment Make-Ready in ${l.name}, NJ`;
  const description = `Fast apartment turnover and make-ready service in ${l.name}, ${l.region}. Patch, paint, clean, flooring, and fixtures by your deadline, with photo proof.`;
  return {
    title,
    description,
    alternates: { canonical: `/service-area/${l.slug}` },
    openGraph: { title: `${title} · ${site.name}`, description, url: absoluteUrl(`/service-area/${l.slug}`) },
  };
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const l = getLocationPage(slug);
  if (!l) notFound();

  const h1 =
    l.type === "county"
      ? `Apartment make-ready across ${l.name}`
      : `Apartment make-ready in ${l.name}, NJ`;

  const faqs = [
    {
      q: `How fast can you turn a unit in ${l.name}?`,
      a: `Most ${l.name} turns are rent-ready in one to three days once the scope is approved and we have access to the unit.`,
    },
    {
      q: `Are you licensed and insured to work in ${l.name}?`,
      a: `Yes. We are a registered New Jersey Home Improvement Contractor and carry general liability insurance for work in ${l.name} and across South Jersey.`,
    },
  ];

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: h1,
    serviceType: "Apartment make-ready and turnover",
    description: `Apartment turnover and make-ready service in ${l.name}, ${l.region}.`,
    url: absoluteUrl(`/service-area/${l.slug}`),
    provider: { "@type": "HomeAndConstructionBusiness", name: site.name, url: SITE_URL },
    areaServed: {
      "@type": l.type === "county" ? "AdministrativeArea" : "City",
      name: `${l.name}, NJ`,
      geo: { "@type": "GeoCoordinates", latitude: l.geo.lat, longitude: l.geo.lng },
    },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Service area", item: absoluteUrl("/service-area") },
      { "@type": "ListItem", position: 3, name: l.name, item: absoluteUrl(`/service-area/${l.slug}`) },
    ],
  };

  const nearby = l.nearby.map(getLocationPage).filter(Boolean) as typeof LOCATION_PAGES;

  return (
    <>
      <JsonLd data={serviceLd} />
      <JsonLd data={faqLd} />
      <JsonLd data={breadcrumbLd} />
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
              <Link href="/service-area" className="hover:text-ink">Service area</Link>
              <ChevronRight size={14} />
              <span className="text-ink-soft">{l.name}</span>
            </nav>
            <span className="mt-5 inline-flex items-center gap-3 text-[14px] font-semibold text-accent">
              <span className="h-px w-8 bg-accent/50" /> {l.region}
            </span>
            <h1 className="mt-2 max-w-[760px] text-[clamp(32px,4.4vw,52px)] font-extrabold leading-[1.04] tracking-[-1.6px] text-ink">
              {h1}
            </h1>
            <p className="mt-4 max-w-[640px] text-lg leading-relaxed text-ink-soft">
              {l.blurb}
            </p>
            <div className="mt-7">
              <Button href="/request" size="lg" arrow>
                Get a free quote
              </Button>
            </div>
          </Container>
        </div>

        <Container className="max-w-[900px] py-14">
          <p className="max-w-[680px] text-[16px] leading-relaxed text-ink-soft">
            {l.detail}
          </p>
        </Container>

        {/* services */}
        <section className="bg-cream">
          <Container className="max-w-[900px] py-14">
            <h2 className="font-display text-2xl font-extrabold text-ink">
              What we turn in {l.name}
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {SERVICE_PAGES.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="flex items-center gap-2.5 rounded-2xl border border-line bg-surface px-4 py-3 text-[15px] font-semibold text-ink transition hover:border-accent/40"
                >
                  <Check size={18} strokeWidth={2.5} className="shrink-0 text-accent" />
                  {s.name}
                </Link>
              ))}
            </div>
          </Container>
        </section>

        <Container className="max-w-[900px] py-14">
          {/* FAQ */}
          <div>
            <h2 className="font-display text-2xl font-extrabold text-ink">
              {l.name} make-ready FAQ
            </h2>
            <div className="mt-5 divide-y divide-line rounded-2xl border border-line bg-surface">
              {faqs.map((f) => (
                <div key={f.q} className="p-5">
                  <h3 className="text-[16px] font-bold text-ink">{f.q}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-ink-soft">{f.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* nearby */}
          {nearby.length > 0 && (
            <div className="mt-12">
              <h2 className="font-display text-2xl font-extrabold text-ink">
                Nearby areas we serve
              </h2>
              <div className="mt-5 flex flex-wrap gap-2.5">
                {nearby.map((n) => (
                  <Link
                    key={n.slug}
                    href={`/service-area/${n.slug}`}
                    className="btn-white inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-[14.5px] font-semibold"
                  >
                    <MapPin size={14} className="text-accent" /> {n.name}
                  </Link>
                ))}
              </div>
            </div>
          )}

          <div className="mt-14">
            <CtaStrip heading={`Turning a unit in ${l.name}?`} />
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
