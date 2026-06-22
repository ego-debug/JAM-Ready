"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Phone } from "lucide-react";
import { Logo } from "./Logo";
import { CircleArrow } from "./Pieces";
import { Container } from "@/components/ui/Container";
import { site } from "@/lib/config";

const nav = [
  { label: "What we do", href: "/#services" },
  { label: "How it works", href: "/#how" },
  { label: "Proof", href: "/#proof" },
  { label: "Service area", href: "/service-area" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <Container className="flex h-[84px] max-w-[1200px] items-center">
        <div className="glass-bar flex w-full items-center justify-between gap-4 rounded-2xl px-3 py-2.5 sm:px-4">
          <Link href="/" aria-label={site.name} className="shrink-0">
            <Logo />
          </Link>

          {/* center nav */}
          <nav className="hidden items-center gap-1 lg:flex">
            {nav.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="rounded-full px-3.5 py-2 text-[15px] font-semibold text-ink-soft transition-colors hover:bg-brand/8 hover:text-ink"
              >
                {n.label}
              </a>
            ))}
          </nav>

          {/* right cluster */}
          <div className="hidden items-center gap-2.5 lg:flex">
            <a
              href={`tel:${site.phoneRaw}`}
              className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-[15px] font-semibold text-ink transition-colors hover:bg-brand/8"
            >
              <Phone size={16} className="text-accent" />
              {site.phoneDisplay}
            </a>
            <Link
              href="/request"
              className="btn-dark inline-flex items-center gap-2.5 rounded-full py-[6px] pl-[18px] pr-[6px] text-[15px] font-semibold"
            >
              Get a free quote
              <CircleArrow tone="white" size={32} />
            </Link>
          </div>

          <button
            className="grid h-10 w-10 place-items-center rounded-full text-ink lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </Container>

      {open && (
        <div className="lg:hidden">
          <Container className="max-w-[1200px]">
            <div className="glass-bar mt-1 flex flex-col gap-1 rounded-2xl p-3">
              {nav.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-2.5 text-[15px] font-semibold text-ink-soft hover:bg-brand/8 hover:text-ink"
                >
                  {n.label}
                </a>
              ))}
              <div className="mt-2 flex flex-col gap-2">
                <a
                  href={`tel:${site.phoneRaw}`}
                  className="btn-white inline-flex items-center justify-center gap-2.5 rounded-full px-5 py-3 text-[15px] font-bold"
                >
                  <Phone size={16} className="text-accent" />
                  {site.phoneDisplay}
                </a>
                <Link
                  href="/request"
                  onClick={() => setOpen(false)}
                  className="btn-dark inline-flex items-center justify-center gap-2.5 rounded-full py-2 pl-6 pr-2 text-[15px] font-semibold"
                >
                  Get a free quote
                  <CircleArrow tone="white" size={32} />
                </Link>
              </div>
            </div>
          </Container>
        </div>
      )}
    </header>
  );
}
