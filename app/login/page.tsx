import { redirect } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/site/Logo";
import { LoginForm } from "@/components/admin/LoginForm";
import { isAuthed } from "@/lib/auth";

export const metadata = {
  title: "Admin sign in",
  robots: { index: false, follow: false },
};
export const dynamic = "force-dynamic";

export default async function LoginPage() {
  if (await isAuthed()) redirect("/admin");

  return (
    <main className="flex min-h-screen items-center justify-center bg-canvas px-5">
      <div className="w-full max-w-sm">
        <div className="mb-6 flex justify-center">
          <Link href="/">
            <Logo />
          </Link>
        </div>
        <div className="rounded-2xl border border-line bg-surface p-7 shadow-sm">
          <h1 className="font-display text-xl font-bold text-ink">
            Crew sign in
          </h1>
          <p className="mt-1 mb-5 text-sm text-ink-soft">
            Dispatcher and crew access. Customers don&apos;t need an account.
          </p>
          <LoginForm />
        </div>
        <p className="mt-4 text-center text-xs text-ink-soft">
          Dev password is <code className="rounded bg-line/40 px-1">turnready</code>. Change it in{" "}
          <code className="rounded bg-line/40 px-1">.env.local</code>.
        </p>
      </div>
    </main>
  );
}
