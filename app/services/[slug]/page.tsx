import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ChevronRight } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CtaStrip } from "@/components/site/CtaStrip";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { JsonLd } from "@/components/seo/JsonLd";
import { SERVICE_PAGES, getServicePage } from "@/lib/service-pages";
import { TOWNS, COUNTIES, absoluteUrl, SITE_URL } from "@/lib/seo";
import { site } from "@/lib/config";

export function generateStaticParams() {
  return SERVICE_PAGES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const s = getServicePage(slug);
  if (!s) return {};
  return {
    title: s.title,
    description: s.description,
    alternates: { canonical: `/services/${s.slug}` },
    openGraph: { title: `${s.title} · ${site.name}`, description: s.description, url: absoluteUrl(`/services/${s.slug}`) },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const s = getServicePage(slug);
  if (!s) notFound();

  const areaServed = [
    ...TOWNS.map((t) => `${t.name}, NJ`),
    ...COUNTIES.map((c) => `${c.name}, NJ`),
  ];

  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.h1,
    serviceType: s.name,
    description: s.description,
    url: absoluteUrl(`/services/${s.slug}`),
    provider: { "@type": "HomeAndConstructionBusiness", name: site.name, url: SITE_URL },
    areaServed,
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: s.faqs.map((f) => ({
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
      { "@type": "ListItem", position: 2, name: "Services", item: absoluteUrl("/services") },
      { "@type": "ListItem", position: 3, name: s.name, item: absoluteUrl(`/services/${s.slug}`) },
    ],
  };

  const others = SERVICE_PAGES.filter((o) => o.slug !== s.slug);

  return (
    <>
      <JsonLd data={serviceLd} />
      <JsonLd data={faqLd} />
      <JsonLd data={breadcrumbLd} />
      <Header />
      <main>
        {/* hero */}
        <div
          className="-mt-[84px] pt-[84px]"
          style={{ background: "linear-gradient(180deg,#e2f3ee 0%,#f1f8f5 60%,#f1f8f5 100%)" }}
        >
          <Container className="max-w-[900px] py-12 sm:py-16">
            <nav className="flex items-center gap-1.5 text-sm text-muted">
              <Link href="/" className="hover:text-ink">Home</Link>
              <ChevronRight size={14} />
              <Link href="/services" className="hover:text-ink">Services</Link>
              <ChevronRight size={14} />
              <span className="text-ink-soft">{s.name}</span>
            </nav>
            <h1 className="mt-4 max-w-[760px] text-[clamp(32px,4.4vw,52px)] font-extrabold leading-[1.04] tracking-[-1.6px] text-ink">
              {s.h1}
            </h1>
            <p className="mt-4 max-w-[620px] text-lg leading-relaxed text-ink-soft">
              {s.intro}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button href="/request" size="lg" arrow>
                Get a free quote
              </Button>
            </div>
            <p className="mt-5 text-sm text-muted">
              Serving {TOWNS.map((t) => t.name).join(", ")}, and across Camden,
              Burlington &amp; Gloucester counties.
            </p>
          </Container>
        </div>

        {/* included + why */}
        <Container className="max-w-[900px] py-14">
          <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
            <div>
              <h2 className="font-display text-2xl font-extrabold text-ink">
                What&rsquo;s included
              </h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {s.includes.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-success/15 text-success">
                      <Check size={13} strokeWidth={3} />
                    </span>
                    <span className="text-[15px] text-ink-soft">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="card-warm rounded-[20px] p-6">
              <h3 className="font-display text-lg font-extrabold text-ink">
                Why it matters
              </h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-soft">
                {s.why}
              </p>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-14">
            <h2 className="font-display text-2xl font-extrabold text-ink">
              Common questions
            </h2>
            <div className="mt-5 divide-y divide-line rounded-[20px] border border-line bg-surface">
              {s.faqs.map((f) => (
                <div key={f.q} className="p-5">
                  <h3 className="text-[16px] font-bold text-ink">{f.q}</h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-ink-soft">{f.a}</p>
                </div>
              ))}
            </div>
          </div>

          {/* other services */}
          <div className="mt-14">
            <h2 className="font-display text-2xl font-extrabold text-ink">
              Other turn services
            </h2>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={`/services/${o.slug}`}
                  className="btn-white inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[14.5px] font-semibold"
                >
                  {o.name}
                </Link>
              ))}
            </div>
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
