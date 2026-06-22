"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  ExternalLink,
  LogOut,
  HardHat,
} from "lucide-react";
import { Logo } from "@/components/site/Logo";
import { cn } from "@/lib/utils";

const nav = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard, exact: true },
  { label: "Crew", href: "/admin/crew", icon: Users, exact: false },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  function isActive(href: string, exact: boolean) {
    return exact ? pathname === href : pathname.startsWith(href);
  }

  return (
    <div className="flex min-h-screen bg-canvas">
      {/* sidebar (desktop) */}
      <aside className="hidden w-60 shrink-0 flex-col border-r border-line bg-surface md:flex">
        <div className="flex h-16 items-center border-b border-line px-5">
          <Link href="/admin">
            <Logo />
          </Link>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {nav.map((n) => {
            const Icon = n.icon;
            const active = isActive(n.href, n.exact);
            return (
              <Link
                key={n.href}
                href={n.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition",
                  active
                    ? "bg-brand-tint text-brand"
                    : "text-ink-soft hover:bg-canvas hover:text-ink",
                )}
              >
                <Icon size={18} />
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="space-y-1 border-t border-line p-3">
          <Link
            href="/crew"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-ink-soft transition hover:bg-canvas hover:text-ink"
          >
            <HardHat size={18} /> Crew app
          </Link>
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-ink-soft transition hover:bg-canvas hover:text-ink"
          >
            <ExternalLink size={18} /> View site
          </Link>
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-ink-soft transition hover:bg-danger/5 hover:text-danger"
          >
            <LogOut size={18} /> Sign out
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        {/* top bar (mobile) */}
        <header className="flex h-16 items-center justify-between border-b border-line bg-surface px-4 md:hidden">
          <Link href="/admin">
            <Logo />
          </Link>
          <button
            onClick={logout}
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-ink-soft"
          >
            <LogOut size={16} /> Sign out
          </button>
        </header>
        {/* mobile nav row */}
        <div className="flex gap-1 border-b border-line bg-surface px-3 py-2 md:hidden">
          {nav.map((n) => {
            const active = isActive(n.href, n.exact);
            return (
              <Link
                key={n.href}
                href={n.href}
                className={cn(
                  "rounded-lg px-3 py-1.5 text-sm font-medium",
                  active ? "bg-brand-tint text-brand" : "text-ink-soft",
                )}
              >
                {n.label}
              </Link>
            );
          })}
        </div>

        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
