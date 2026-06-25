import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Check, Clock, DollarSign, TrendingUp, MapPin } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CtaStrip } from "@/components/site/CtaStrip";
import { Container } from "@/components/ui/Container";
import { PhotoSlot } from "@/components/site/Pieces";
import { JsonLd } from "@/components/seo/JsonLd";
import { CASE_STUDIES, getCaseStudy } from "@/lib/case-studies";
import { absoluteUrl, SITE_URL } from "@/lib/seo";
import { site } from "@/lib/config";

export function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) return {};
  return {
    title: c.title,
    description: c.summary,
    alternates: { canonical: `/case-studies/${c.slug}` },
    openGraph: { title: `${c.title} · ${site.name}`, description: c.summary, url: absoluteUrl(`/case-studies/${c.slug}`) },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = getCaseStudy(slug);
  if (!c) notFound();

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: c.title,
    description: c.summary,
    author: { "@type": "Organization", name: site.name },
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: absoluteUrl(`/case-studies/${c.slug}`),
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Case studies", item: absoluteUrl("/case-studies") },
      { "@type": "ListItem", position: 3, name: c.title, item: absoluteUrl(`/case-studies/${c.slug}`) },
    ],
  };

  const stats = [
    { icon: Clock, label: "Timeline", value: c.timeline },
    { icon: DollarSign, label: "Cost range", value: c.costRange },
    { icon: TrendingUp, label: "Result", value: c.result },
  ];

  return (
    <>
      <JsonLd data={articleLd} />
      <JsonLd data={breadcrumbLd} />
      <Header />
      <main>
        <div
          className="-mt-[84px] pt-[84px]"
          style={{ background: "linear-gradient(180deg,#e7f6f1 0%,#faf6ef 70%,#faf6ef 100%)" }}
        >
          <Container className="max-w-[900px] py-12 sm:py-16">
            <nav className="flex items-center gap-1.5 text-sm text-muted">
              <Link href="/" className="hover:text-ink">Home</Link>
              <ChevronRight size={14} />
              <Link href="/case-studies" className="hover:text-ink">Case studies</Link>
            </nav>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-tint px-3 py-1 text-[13px] font-semibold text-brand">
                <MapPin size={13} /> {c.location}
              </span>
              <span className="rounded-full bg-brand-tint px-3 py-1 text-[13px] font-semibold text-brand">
                {c.unitType}
              </span>
              {c.sample && (
                <span className="rounded-full border border-line bg-surface px-3 py-1 text-[13px] font-semibold text-muted">
                  Sample
                </span>
              )}
            </div>
            <h1 className="mt-3 max-w-[760px] text-[clamp(30px,4vw,48px)] font-extrabold leading-[1.05] tracking-[-1.5px] text-ink">
              {c.title}
            </h1>
            <p className="mt-4 max-w-[640px] text-lg leading-relaxed text-ink-soft">
              {c.summary}
            </p>
          </Container>
        </div>

        <div className="bg-cream">
        <Container className="max-w-[900px] py-14">
          {/* before / after */}
          <div className="grid gap-5 sm:grid-cols-2">
            {(["Before", "After"] as const).map((label) => (
              <div key={label}>
                <div className="relative h-[260px] overflow-hidden rounded-2xl border border-line">
                  <PhotoSlot label={`${label} photo`} />
                  <span
                    className="absolute left-3.5 top-3.5 rounded-lg px-2.5 py-1.5 text-[12px] font-bold text-white"
                    style={{ background: label === "After" ? "rgba(29,186,154,.92)" : "rgba(14,42,38,.78)" }}
                  >
                    {label.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* stats */}
          <div className="mt-10 grid gap-y-8 border-t border-line pt-8 sm:grid-cols-3 sm:gap-y-0">
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className="sm:border-l sm:border-line sm:pl-8 sm:pr-6 sm:first:border-l-0 sm:first:pl-0"
                >
                  <Icon size={22} strokeWidth={1.75} className="text-accent" />
                  <div className="mt-3.5 text-[13px] font-semibold text-muted">{s.label}</div>
                  <div className="mt-1 text-[16px] font-bold text-ink">{s.value}</div>
                </div>
              );
            })}
          </div>

          {/* scope */}
          <div className="mt-12">
            <h2 className="font-display text-2xl font-extrabold text-ink">
              What the turn included
            </h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2">
              {c.scope.map((item) => (
                <li key={item} className="flex items-start gap-2.5">
                  <Check size={18} strokeWidth={2.25} className="mt-0.5 shrink-0 text-accent" />
                  <span className="text-[15px] text-ink-soft">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-14">
            <CtaStrip />
          </div>
        </Container>
        </div>
      </main>
      <Footer />
    </>
  );
}
