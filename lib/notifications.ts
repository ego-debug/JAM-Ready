import { sendEmail, appUrl } from "@/lib/email";
import { mutateDb } from "@/lib/db/store";
import { newId } from "@/lib/ids";
import { site } from "@/lib/config";
import { formatMoney, formatLongDate } from "@/lib/utils";
import type { Customer, EmailKind, Job, Property } from "@/lib/types";

interface NotifiableJob extends Job {
  customer: Customer | null;
  property: Property | null;
}

function emailShell(heading: string, bodyHtml: string, link: string): string {
  return `
  <div style="font-family:Arial,Helvetica,sans-serif;background:#f4f6f8;padding:24px">
    <div style="max-width:520px;margin:0 auto;background:#fff;border:1px solid #d5dae0;border-radius:16px;overflow:hidden">
      <div style="background:#0b4a6f;padding:18px 24px;color:#fff;font-size:18px;font-weight:700">${site.name}</div>
      <div style="padding:24px;color:#1a1d21;font-size:15px;line-height:1.6">
        <h1 style="margin:0 0 12px;font-size:20px;color:#0b4a6f">${heading}</h1>
        ${bodyHtml}
        <a href="${link}" style="display:inline-block;margin-top:20px;background:#f59e0b;color:#fff;text-decoration:none;font-weight:600;padding:12px 22px;border-radius:10px">View your turn</a>
        <p style="margin-top:20px;color:#5b6470;font-size:13px">Or open this link: <br><a href="${link}" style="color:#0b4a6f">${link}</a></p>
      </div>
      <div style="padding:16px 24px;border-top:1px solid #d5dae0;color:#5b6470;font-size:12px">
        ${site.name} · ${site.serviceArea} · ${site.phoneDisplay}
      </div>
    </div>
  </div>`;
}

function build(job: NotifiableJob, kind: EmailKind): { subject: string; html: string } {
  const first = (job.customer?.name || "there").split(" ")[0];
  const addr = job.property?.address ?? "your unit";
  const link = appUrl(`/status/${job.publicToken}`);

  if (kind === "quoted") {
    return {
      subject: `Your quote for ${addr} is ready`,
      html: emailShell(
        "Your quote is ready",
        `<p>Hi ${first},</p>
         <p>Your quote for <strong>${addr}</strong> is ready${
           job.quoteTotal != null
             ? `: <strong>${formatMoney(job.quoteTotal)}</strong>`
             : ""
         }. Review the line items and approve it to confirm your crew and date.</p>`,
        link,
      ),
    };
  }
  if (kind === "scheduled") {
    return {
      subject: `${addr} is scheduled`,
      html: emailShell(
        "Your turn is scheduled",
        `<p>Hi ${first},</p>
         <p>Your turn at <strong>${addr}</strong> is on the calendar${
           job.scheduledDate ? ` for <strong>${formatLongDate(job.scheduledDate)}</strong>` : ""
         }. We'll send before and after photos the day we finish.</p>`,
        link,
      ),
    };
  }
  // done
  return {
    subject: `${addr} is rent-ready`,
    html: emailShell(
      "Your unit is rent-ready",
      `<p>Hi ${first},</p>
       <p>We've finished the turn at <strong>${addr}</strong>. Open your status page to see the before and after photos.</p>`,
      link,
    ),
  };
}

/**
 * Send a customer notification for a status change (spec §5: quote ready,
 * scheduled, done) and record it in the email log. Never throws; a failed
 * email must not break the status change that triggered it.
 */
export async function notifyCustomer(
  job: NotifiableJob,
  kind: EmailKind,
): Promise<void> {
  try {
    const to = job.customer?.email;
    if (!to) return;
    const { subject, html } = build(job, kind);
    const result = await sendEmail({ to, subject, html });
    await mutateDb((db) => {
      db.emailLog.push({
        id: newId(),
        jobId: job.id,
        to,
        subject,
        kind,
        status: result.status,
        at: new Date().toISOString(),
        error: result.error,
      });
    });
  } catch (e) {
    console.error("[notify] failed:", e);
  }
}
