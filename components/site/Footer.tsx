import Link from "next/link";
import { Logo } from "./Logo";
import { site } from "@/lib/config";

const social = [
  {
    label: "Facebook",
    dark: true,
    path: "M14 9h2V6h-2c-1.7 0-3 1.3-3 3v2H9v3h2v6h3v-6h2.2l.8-3H14V9.5c0-.3.2-.5.5-.5Z",
  },
  {
    label: "Instagram",
    outline: true,
    svg: (
      <>
        <rect x="4" y="4" width="16" height="16" rx="5" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="3.4" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="17" cy="7" r="1.2" fill="currentColor" />
      </>
    ),
  },
  {
    label: "LinkedIn",
    outline: true,
    path: "M6.94 7A1.94 1.94 0 1 1 7 3.1 1.94 1.94 0 0 1 6.94 7ZM5.3 9h3.3v11H5.3V9Zm5.2 0h3.16v1.5h.05c.44-.83 1.5-1.7 3.1-1.7 3.3 0 3.9 2.1 3.9 4.9V20h-3.3v-4.7c0-1.1 0-2.6-1.6-2.6s-1.85 1.2-1.85 2.5V20H10.5V9Z",
    fill: true,
  },
];

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
            <div className="mb-4" />
            <div className="flex gap-2.5">
              {social.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className={`grid h-[38px] w-[38px] place-items-center rounded-full ${s.dark ? "bg-ink text-white" : "text-ink"}`}
                  style={s.outline ? { border: "1px solid #d9e8e2" } : undefined}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill={s.outline && !s.fill ? "none" : "currentColor"}
                  >
                    {s.svg ?? <path d={s.path} />}
                  </svg>
                </a>
              ))}
            </div>
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
