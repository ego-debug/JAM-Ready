import Link from "next/link";
import { Logo } from "./Logo";
import { site } from "@/lib/config";

const cols = [
  {
    title: "Services",
    links: [
      { label: "Full make-ready", href: "/services/make-ready" },
      { label: "Patch & repair", href: "/services/patch-and-repair" },
      { label: "Interior painting", href: "/services/painting" },
      { label: "Deep clean", href: "/services/deep-clean" },
      { label: "Flooring", href: "/services/flooring" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Property managers", href: "/property-managers" },
      { label: "Case studies", href: "/case-studies" },
      { label: "About", href: "/about" },
      { label: "Pricing", href: "/pricing" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
      { label: "Resources", href: "/blog" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-auto bg-surface px-0 pb-[30px] pt-16">
      <div className="mx-auto max-w-[1200px] px-6 sm:px-8">
        <div
          className="grid gap-8 pb-10 md:grid-cols-[1.4fr_1fr_1fr_1fr]"
          style={{ borderBottom: "1px solid #d9e8e2" }}
        >
          <div>
            <Link href="/" className="mb-4 inline-flex">
              <Logo />
            </Link>
            <p className="m-0 max-w-[280px] text-[14.5px] leading-relaxed text-muted">
              Fast, photo-documented make-readies for owners and property
              managers. Rent-ready by your deadline.
            </p>
            <div className="mt-[18px] flex gap-[18px] text-[14.5px]">
              <a href={`tel:${site.phoneRaw}`} className="font-bold text-ink no-underline">
                {site.phoneDisplay}
              </a>
              <a href={`mailto:${site.email}`} className="font-semibold text-muted no-underline">
                {site.email}
              </a>
            </div>
          </div>

          {cols.map((col) => (
            <div key={col.title}>
              <div className="mb-3.5 text-[15px] font-extrabold text-ink">
                {col.title}
              </div>
              {col.links.map((l) => (
                <Link
                  key={l.label}
                  href={l.href}
                  className="mb-2.5 block text-[14.5px] text-muted no-underline hover:text-ink"
                >
                  {l.label}
                </Link>
              ))}
            </div>
          ))}

          <div>
            <div className="mb-3.5 text-[15px] font-extrabold text-ink">
              Service area
            </div>
            {[
              { label: "Cherry Hill", href: "/service-area/cherry-hill" },
              { label: "Voorhees", href: "/service-area/voorhees" },
              { label: "Marlton", href: "/service-area/marlton" },
              { label: "Mount Laurel", href: "/service-area/mount-laurel" },
              { label: "All areas", href: "/service-area" },
            ].map((l) => (
              <Link
                key={l.label}
                href={l.href}
                className="mb-2.5 block text-[14.5px] text-muted no-underline hover:text-ink"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-[22px] text-[13.5px] text-[#889b95]">
          <span>© 2026 {site.name}. Licensed &amp; insured.</span>
          <div className="flex gap-[22px]">
            <Link href="/privacy" className="text-[#889b95] no-underline hover:text-ink">Privacy</Link>
            <Link href="/terms" className="text-[#889b95] no-underline hover:text-ink">Terms</Link>
            <Link href="/warranty" className="text-[#889b95] no-underline hover:text-ink">Warranty</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
