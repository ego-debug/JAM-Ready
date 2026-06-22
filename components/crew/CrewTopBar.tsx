"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { LogOut, UserCog } from "lucide-react";
import { Logo } from "@/components/site/Logo";

export function CrewTopBar({ name }: { name?: string }) {
  const router = useRouter();

  async function change() {
    await fetch("/api/crew/select", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ crewId: null }),
    });
    router.refresh();
  }

  async function signOut() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-surface">
      <div className="mx-auto flex h-16 max-w-2xl items-center justify-between px-4">
        <Link href="/crew">
          <Logo />
        </Link>
        <div className="flex items-center gap-1">
          {name && (
            <button
              onClick={change}
              className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-sm font-medium text-ink-soft hover:text-ink"
            >
              <UserCog size={16} />
              <span className="max-w-28 truncate">{name}</span>
            </button>
          )}
          <button
            onClick={signOut}
            className="grid h-9 w-9 place-items-center rounded-lg text-ink-soft hover:text-danger"
            aria-label="Sign out"
          >
            <LogOut size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
