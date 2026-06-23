import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, MapPin, ArrowRight } from "lucide-react";
import { Header } from "@/components/site/Header";
import { Footer } from "@/components/site/Footer";
import { CtaStrip } from "@/components/site/CtaStrip";
import { Container } from "@/components/ui/Container";
import { LOCATION_PAGES } from "@/lib/location-pages";
import { site } from "@/lib/config";

export const metadata: Metadata = {
  title: "Service area: Cherry Hill & South Jersey",
  description: `Where ${site.name} works: Cherry Hill, Voorhees, Marlton, Mount Laurel, Haddonfield, and across Camden, Burlington, and Gloucester counties.`,
  alternates: { canonical: "/service-area" },
};

export default function ServiceAreaIndexPage() {
  const towns = LOCATION_PAGES.filter((l) => l.type === "town");
  const counties = LOCATION_PAGES.filter((l) => l.type === "county");

  return (
    <>
      <Header />
      <main>
        <div
          className="-mt-[84px] pt-[84px]"
          style={{ background: "linear-gradient(180deg,#e7f6f1 0%,#f4faf8 60%,#f4faf8 100%)" }}
        >
          <Container className="max-w-[1100px] py-12 sm:py-16">
            <nav className="flex items-center gap-1.5 text-sm text-muted">
              <Link href="/" className="hover:text-ink">Home</Link>
              <ChevronRight size={14} />
              <span className="text-ink-soft">Service area</span>
            </nav>
            <h1 className="mt-4 max-w-[760px] text-[clamp(32px,4.4vw,52px)] font-extrabold leading-[1.04] tracking-[-1.6px] text-ink">
              Make-ready turns across South Jersey
            </h1>
            <p className="mt-4 max-w-[640px] text-lg leading-relaxed text-ink-soft">
              Based in Cherry Hill, we dispatch crews six days a week across
              Camden, Burlington, and Gloucester counties. Find your town below.
            </p>
          </Container>
        </div>

        <Container className="max-w-[1100px] py-14">
          <h2 className="font-display text-2xl font-extrabold text-ink">Towns</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {towns.map((l) => (
              <LocationCard key={l.slug} slug={l.slug} name={l.name} region={l.region} />
            ))}
          </div>

          <h2 className="mt-12 font-display text-2xl font-extrabold text-ink">
            Counties
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {counties.map((l) => (
              <LocationCard key={l.slug} slug={l.slug} name={l.name} region={l.region} />
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

function LocationCard({
  slug,
  name,
  region,
}: {
  slug: string;
  name: string;
  region: string;
}) {
  return (
    <Link
      href={`/service-area/${slug}`}
      className="card-warm group flex items-center justify-between gap-3 rounded-[18px] p-5 transition hover:border-accent/50"
    >
      <span className="flex items-center gap-3">
        <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand-tint text-accent">
          <MapPin size={18} />
        </span>
        <span>
          <span className="block font-bold text-ink">{name}</span>
          <span className="block text-[13px] text-muted">{region}</span>
        </span>
      </span>
      <ArrowRight size={17} className="text-ink-soft transition-transform group-hover:translate-x-0.5" />
    </Link>
  );
}
