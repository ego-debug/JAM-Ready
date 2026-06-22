import type { Metadata } from "next";
import { LegalShell } from "@/components/site/LegalShell";
import { site } from "@/lib/config";

const UPDATED = "June 21, 2026";

export const metadata: Metadata = {
  title: "Workmanship Warranty",
  description: `${site.name} backs every turn with a workmanship warranty. Here is what is covered.`,
  alternates: { canonical: "/warranty" },
};

export default function WarrantyPage() {
  return (
    <LegalShell
      title="Workmanship Warranty"
      intro="We stand behind the work. Here is what that means."
      updated={UPDATED}
    >
      <p>
        Every turn we complete is backed by a workmanship warranty. If something
        we did fails to hold up, we will come back and make it right.
      </p>

      <h2>What is covered</h2>
      <p>
        Defects in our workmanship for <strong>one year</strong> from the date
        the job is marked done. This covers the labor on what we installed,
        patched, painted, or repaired.
      </p>

      <h2>What is not covered</h2>
      <ul>
        <li>Normal wear and tear, or damage caused by tenants or others.</li>
        <li>Pre-existing conditions and issues outside the scope we were hired for.</li>
        <li>
          Materials and appliances, which are covered by the manufacturer&rsquo;s
          warranty.
        </li>
        <li>Work performed or altered by someone other than our crew.</li>
        <li>Damage from leaks, moisture, settling, or events beyond our control.</li>
      </ul>

      <h2>Licensed-partner work</h2>
      <p>
        Electrical, HVAC, and plumbing performed by our licensed partners is
        warranted by that partner under their own terms.
      </p>

      <h2>How to make a claim</h2>
      <p>
        Email <a href={`mailto:${site.email}`}>{site.email}</a> or call{" "}
        <a href={`tel:${site.phoneRaw}`}>{site.phoneDisplay}</a> with the unit
        address and a photo of the issue. We will schedule a look and, if it is
        covered, fix it at no charge.
      </p>
    </LegalShell>
  );
}
