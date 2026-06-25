import type { Metadata } from "next";
import { LegalShell } from "@/components/site/LegalShell";
import { site } from "@/lib/config";

const UPDATED = "June 21, 2026";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `The terms that apply when you request and book a turn with ${site.name}.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalShell
      title="Terms of Service"
      intro={`The terms that apply when you work with ${site.name}.`}
      updated={UPDATED}
    >
      <p>
        By requesting a quote or booking a turn with {site.name}, you agree to
        these terms.
      </p>

      <h2>Our services</h2>
      <p>
        We provide apartment make-ready and turnover work: patching, painting,
        cleaning, flooring, fixture swaps, and related punch-list items.
        Electrical, HVAC, and plumbing beyond a like-for-like swap are
        coordinated through licensed partners and quoted separately.
      </p>

      <h2>Materials</h2>
      <p>
        Materials and finishes for the unit are supplied by the owner. This
        includes paint, flooring, fixtures, appliances, doors, and hardware. Our
        pricing covers labor and installation. We bring our own jobsite supplies,
        such as patching compound, caulk, and cleaning supplies. If the owner
        asks us to arrange paint or flooring material, we coordinate it through a
        supplier and quote that material separately from our labor.
      </p>

      <h2>Quotes and scheduling</h2>
      <ul>
        <li>
          A quote is an estimate based on the information and photos you provide.
          Scope found on site that was not visible up front may change the
          price, and we will confirm with you before doing the extra work.
        </li>
        <li>
          We only move a job to scheduled once a crew member and a date on or
          before your deadline are confirmed.
        </li>
        <li>
          Hitting the deadline depends on timely approval, access to the unit,
          and the unit being ready for us to start.
        </li>
      </ul>

      <h2>Your responsibilities</h2>
      <ul>
        <li>Give accurate unit details and reliable access (lockbox, key, or code).</li>
        <li>Make sure the unit is vacant and cleared of personal property unless we agree otherwise.</li>
        <li>Approve the quote before work begins.</li>
      </ul>

      <h2>Pricing and payment</h2>
      <p>
        Prices are as stated in your approved quote. Invoices are due on the
        terms shown on the invoice. Late balances may pause future work.
      </p>

      <h2>Licensing and insurance</h2>
      <p>
        We are a registered New Jersey Home Improvement Contractor and carry
        general liability insurance. Work requiring a specialty license is
        performed by appropriately licensed partners.
      </p>

      <h2>Workmanship</h2>
      <p>
        Before a job is marked done, we walk the unit with you and complete a
        punch list. Issues found at that time are corrected before close-out. We
        do not provide an ongoing or time-based warranty. Damage caused by
        tenants or by work altered after we finish is not our responsibility.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the extent permitted by law, our liability for any claim related to a
        job is limited to the amount paid for that job. We are not responsible
        for pre-existing conditions or for damage caused by others.
      </p>

      <h2>Cancellation</h2>
      <p>
        You may cancel or reschedule before work begins. Work already performed
        is billable.
      </p>

      <h2>Governing law</h2>
      <p>These terms are governed by the laws of the State of New Jersey.</p>

      <h2>Contact</h2>
      <p>
        Email <a href={`mailto:${site.email}`}>{site.email}</a> or call{" "}
        <a href={`tel:${site.phoneRaw}`}>{site.phoneDisplay}</a>.
      </p>
    </LegalShell>
  );
}
