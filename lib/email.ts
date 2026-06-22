/**
 * Email sending via Resend. With no RESEND_API_KEY the app still works: sends
 * are logged and recorded as "skipped" so local dev needs no setup. Set
 * RESEND_API_KEY + EMAIL_FROM in .env.local to send real email. Swappable, but
 * Resend is the spec's choice (§10).
 */

const RESEND_API_KEY = process.env.RESEND_API_KEY || "";
export const EMAIL_FROM =
  process.env.EMAIL_FROM || "JAM-Ready <onboarding@resend.dev>";

/** Base URL used to build links in emails. */
export function appUrl(path = ""): string {
  const base = process.env.APP_URL || "http://localhost:3100";
  return base.replace(/\/$/, "") + path;
}

export const emailConfigured = Boolean(RESEND_API_KEY);

export interface SendResult {
  status: "sent" | "skipped" | "failed";
  error?: string;
}

export async function sendEmail(opts: {
  to: string;
  subject: string;
  html: string;
}): Promise<SendResult> {
  if (!RESEND_API_KEY) {
    console.log(
      `[email:skipped] → ${opts.to} · "${opts.subject}" (no RESEND_API_KEY set)`,
    );
    return { status: "skipped" };
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: EMAIL_FROM,
        to: opts.to,
        subject: opts.subject,
        html: opts.html,
      }),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      console.error(`[email:failed] ${res.status} ${text}`);
      return { status: "failed", error: `${res.status} ${text}`.slice(0, 200) };
    }
    console.log(`[email:sent] → ${opts.to} · "${opts.subject}"`);
    return { status: "sent" };
  } catch (e) {
    const error = e instanceof Error ? e.message : "unknown error";
    console.error(`[email:failed] ${error}`);
    return { status: "failed", error };
  }
}
