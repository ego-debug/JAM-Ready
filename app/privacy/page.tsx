import type { Metadata } from "next";
import { LegalShell } from "@/components/site/LegalShell";
import { site } from "@/lib/config";

const UPDATED = "June 21, 2026";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses, and protects the information you share when you request a turn.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalShell
      title="Privacy Policy"
      intro={`How we handle the information you share with ${site.name}.`}
      updated={UPDATED}
    >
      <p>
        This policy explains what we collect when you contact us or request a
        turn, how we use it, and the choices you have. It applies to{" "}
        {site.name} and our website.
      </p>

      <h2>Information we collect</h2>
      <ul>
        <li>
          <strong>Contact details</strong> you give us: name, company, email,
          and phone number.
        </li>
        <li>
          <strong>Job details</strong>: the unit address, size, deadline, scope
          notes, and any photos of the unit you upload.
        </li>
        <li>
          <strong>Usage data</strong>: basic, non-identifying information about
          how the site is used, to keep it working and improve it.
        </li>
      </ul>

      <h2>How we use it</h2>
      <ul>
        <li>To prepare your quote, schedule the work, and complete the turn.</li>
        <li>
          To send you status updates, the finished before and after photos, and
          your invoice.
        </li>
        <li>To respond to questions and provide support.</li>
        <li>To meet legal, tax, and insurance obligations.</li>
      </ul>

      <h2>Your photos</h2>
      <p>
        Photos you upload are used to quote and document the job. We will not
        publish identifiable photos of your unit for marketing without your
        permission.
      </p>

      <h2>Sharing</h2>
      <p>
        We do not sell your information. We share it only with our crew and the
        licensed partners assigned to your job, with service providers that help
        us operate (for example email delivery), and where required by law.
      </p>

      <h2>Retention and security</h2>
      <p>
        We keep your information for as long as needed to provide the service
        and meet our legal obligations, then delete or anonymize it. We use
        reasonable safeguards to protect it, though no method of transmission or
        storage is completely secure.
      </p>

      <h2>Your choices</h2>
      <p>
        You can ask us to access, correct, or delete your information by
        emailing <a href={`mailto:${site.email}`}>{site.email}</a>. You can opt
        out of non-essential emails at any time.
      </p>

      <h2>Children</h2>
      <p>
        Our services are for property owners and managers and are not directed
        to children under 13.
      </p>

      <h2>Changes</h2>
      <p>
        We may update this policy. The date above shows the latest revision.
      </p>

      <h2>Contact</h2>
      <p>
        Questions? Email <a href={`mailto:${site.email}`}>{site.email}</a> or
        call <a href={`tel:${site.phoneRaw}`}>{site.phoneDisplay}</a>.
      </p>
    </LegalShell>
  );
}
