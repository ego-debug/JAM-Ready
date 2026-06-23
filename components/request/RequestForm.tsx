"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Camera,
  ImagePlus,
  Loader2,
  MapPin,
  Trash2,
  CalendarClock,
  User,
  Layers,
} from "lucide-react";
import { cn } from "@/lib/utils";

const SERVICES = [
  "Patch & repair",
  "Interior painting",
  "Deep clean",
  "Flooring",
  "Fixtures & hardware",
  "Punch list / other",
  "Full make-ready",
];
const FLOORING_TYPES = ["LVP / laminate", "Tile", "Carpet"];
const PAINTING_SCOPE = ["Walls", "Trim", "Ceilings"];

type Errors = Record<string, string>;

export interface RequestInitial {
  address?: string;
  beds?: string;
  baths?: string;
  dueDate?: string;
  notes?: string;
}

const inputBase =
  "w-full rounded-lg border bg-surface px-3.5 py-2.5 text-sm text-ink shadow-sm outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/30 placeholder:text-ink-soft/60";

function Field({
  label,
  htmlFor,
  required,
  hint,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  hint?: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="mb-1.5 block text-sm font-medium text-ink"
      >
        {label}
        {required && <span className="text-danger"> *</span>}
      </label>
      {children}
      {hint && !error && <p className="mt-1 text-xs text-ink-soft">{hint}</p>}
      {error && <p className="mt-1 text-xs font-medium text-danger">{error}</p>}
    </div>
  );
}

function SectionTitle({
  icon: Icon,
  step,
  title,
  desc,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  step: number;
  title: string;
  desc: string;
}) {
  return (
    <div className="mb-5 flex items-start gap-3">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-tint text-brand">
        <Icon size={20} />
      </span>
      <div>
        <div className="text-xs font-semibold uppercase tracking-wide text-ink-soft">
          Step {step}
        </div>
        <h2 className="font-display text-lg font-semibold text-ink">{title}</h2>
        <p className="text-sm text-ink-soft">{desc}</p>
      </div>
    </div>
  );
}

const today = () => new Date().toISOString().slice(0, 10);

export function RequestForm({ initial }: { initial?: RequestInitial }) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [photos, setPhotos] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [services, setServices] = useState<string[]>([]);

  function toggleService(s: string) {
    setServices((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s],
    );
  }

  function addFiles(list: FileList | null) {
    if (!list) return;
    const incoming = Array.from(list).filter((f) => f.type.startsWith("image/"));
    const next = [...photos, ...incoming].slice(0, 12); // cap at 12
    setPhotos(next);
    setPreviews(next.map((f) => URL.createObjectURL(f)));
  }

  function removePhoto(idx: number) {
    const next = photos.filter((_, i) => i !== idx);
    setPhotos(next);
    setPreviews(next.map((f) => URL.createObjectURL(f)));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (submitting) return;
    setErrors({});
    setFormError(null);
    setSubmitting(true);

    try {
      const fd = new FormData(formRef.current!);
      photos.forEach((p) => fd.append("photos", p));

      const res = await fetch("/api/request", { method: "POST", body: fd });
      const data = await res.json();

      if (!res.ok) {
        if (data.errors) {
          setErrors(data.errors);
          // jump to the first error
          const firstKey = Object.keys(data.errors)[0];
          formRef.current
            ?.querySelector<HTMLElement>(`[name="${firstKey}"]`)
            ?.scrollIntoView({ behavior: "smooth", block: "center" });
        } else {
          setFormError(data.error || "Something went wrong. Please try again.");
        }
        setSubmitting(false);
        return;
      }

      router.push(`/status/${data.token}?new=1`);
    } catch {
      setFormError("Couldn't reach the server. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="space-y-8">
      {/* The unit */}
      <section className="rounded-2xl border border-line bg-surface p-6 shadow-sm">
        <SectionTitle
          icon={MapPin}
          step={1}
          title="The unit"
          desc="Where is it, and what are we turning?"
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Field label="Unit address" htmlFor="address" required error={errors.address}>
              <input
                id="address"
                name="address"
                defaultValue={initial?.address}
                className={cn(inputBase, errors.address ? "border-danger" : "border-line")}
                placeholder="123 Main St, Springfield"
                autoComplete="street-address"
              />
            </Field>
          </div>
          <Field label="Unit / apt #" htmlFor="unitNumber" hint="Optional">
            <input id="unitNumber" name="unitNumber" className={cn(inputBase, "border-line")} placeholder="2B" />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Beds" htmlFor="beds">
              <input id="beds" name="beds" type="number" min={0} defaultValue={initial?.beds} className={cn(inputBase, "border-line")} placeholder="2" />
            </Field>
            <Field label="Baths" htmlFor="baths">
              <input id="baths" name="baths" type="number" min={0} step="0.5" defaultValue={initial?.baths} className={cn(inputBase, "border-line")} placeholder="1" />
            </Field>
          </div>
          <Field label="Total square footage" htmlFor="unitSqft" hint="Optional. Helps us quote paint and floors.">
            <input id="unitSqft" name="unitSqft" type="number" min={0} className={cn(inputBase, "border-line")} placeholder="e.g. 900" />
          </Field>
        </div>
      </section>

      {/* What you need */}
      <section className="rounded-2xl border border-line bg-surface p-6 shadow-sm">
        <SectionTitle
          icon={Layers}
          step={2}
          title="What you need"
          desc="Pick the work you want quoted. Not sure? Choose Full make-ready."
        />
        <div className="grid gap-2.5 sm:grid-cols-2">
          {SERVICES.map((s) => {
            const active = services.includes(s);
            return (
              <label
                key={s}
                className={cn(
                  "flex cursor-pointer items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition",
                  active
                    ? "border-accent bg-brand-tint/50 text-ink"
                    : "border-line text-ink-soft hover:border-accent/40",
                )}
              >
                <input
                  type="checkbox"
                  name="services"
                  value={s}
                  checked={active}
                  onChange={() => toggleService(s)}
                  className="h-4 w-4 accent-[#1dba9a]"
                />
                {s}
              </label>
            );
          })}
        </div>

        {services.includes("Flooring") && (
          <div className="mt-5 rounded-xl border border-line bg-canvas p-4">
            <p className="mb-3 text-sm font-semibold text-ink">
              Which flooring? Prices vary by type.
            </p>
            <div className="flex flex-wrap gap-2">
              {FLOORING_TYPES.map((t) => (
                <label
                  key={t}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm font-medium text-ink"
                >
                  <input type="checkbox" name="flooringTypes" value={t} className="h-3.5 w-3.5 accent-[#1dba9a]" />
                  {t}
                </label>
              ))}
            </div>
            <div className="mt-4 max-w-xs">
              <Field
                label="Approx. flooring square footage"
                htmlFor="flooringSqft"
                hint="An estimate is fine. Photos and a walkthrough confirm it."
              >
                <input id="flooringSqft" name="flooringSqft" type="number" min={0} className={cn(inputBase, "border-line")} placeholder="e.g. 350" />
              </Field>
            </div>
          </div>
        )}

        {services.includes("Interior painting") && (
          <div className="mt-4 rounded-xl border border-line bg-canvas p-4">
            <p className="mb-3 text-sm font-semibold text-ink">What needs paint?</p>
            <div className="flex flex-wrap gap-2">
              {PAINTING_SCOPE.map((t) => (
                <label
                  key={t}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-line bg-surface px-3.5 py-1.5 text-sm font-medium text-ink"
                >
                  <input type="checkbox" name="paintingScope" value={t} className="h-3.5 w-3.5 accent-[#1dba9a]" />
                  {t}
                </label>
              ))}
            </div>
            <div className="mt-4 max-w-xs">
              <Field
                label="Approx. paint square footage"
                htmlFor="paintingSqft"
                hint="Wall area if you have it, or leave blank."
              >
                <input id="paintingSqft" name="paintingSqft" type="number" min={0} className={cn(inputBase, "border-line")} placeholder="e.g. 900" />
              </Field>
            </div>
          </div>
        )}
      </section>

      {/* Photos */}
      <section className="rounded-2xl border border-line bg-surface p-6 shadow-sm">
        <SectionTitle
          icon={Camera}
          step={3}
          title="Photos of the unit"
          desc="A few shots of each room help us quote accurately and fast."
        />

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          capture="environment"
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-line bg-canvas px-6 py-10 text-center transition hover:border-brand hover:bg-brand-tint/40"
        >
          <span className="grid h-12 w-12 place-items-center rounded-full bg-surface text-brand shadow-sm">
            <ImagePlus size={24} />
          </span>
          <span className="text-sm font-medium text-ink">
            Tap to add photos
          </span>
          <span className="text-xs text-ink-soft">
            Take photos or pick from your library · up to 12
          </span>
        </button>

        {previews.length > 0 && (
          <div className="mt-4 grid grid-cols-3 gap-3 sm:grid-cols-4">
            {previews.map((src, i) => (
              <div
                key={src}
                className="group relative aspect-square overflow-hidden rounded-lg border border-line"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={src} alt={`Upload ${i + 1}`} className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => removePhoto(i)}
                  className="absolute right-1.5 top-1.5 grid h-7 w-7 place-items-center rounded-full bg-black/60 text-white opacity-0 transition group-hover:opacity-100"
                  aria-label="Remove photo"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        )}
        {previews.length > 0 && (
          <p className="mt-2 text-xs text-ink-soft">
            {previews.length} photo{previews.length === 1 ? "" : "s"} added
          </p>
        )}
      </section>

      {/* Deadline */}
      <section className="rounded-2xl border border-line bg-surface p-6 shadow-sm">
        <SectionTitle
          icon={CalendarClock}
          step={4}
          title="Your deadline"
          desc="When does the unit need to be rent-ready?"
        />
        <div className="max-w-xs">
          <Field label="Rent-ready by" htmlFor="dueDate" hint="We'll confirm we can hit it before you approve.">
            <input id="dueDate" name="dueDate" type="date" min={today()} defaultValue={initial?.dueDate} className={cn(inputBase, "border-line")} />
          </Field>
        </div>
      </section>

      {/* Contact */}
      <section className="rounded-2xl border border-line bg-surface p-6 shadow-sm">
        <SectionTitle
          icon={User}
          step={5}
          title="Where to reach you"
          desc="We'll send your quote and photo updates here."
        />
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Your name" htmlFor="name" required error={errors.name}>
            <input id="name" name="name" className={cn(inputBase, errors.name ? "border-danger" : "border-line")} placeholder="Jordan Lee" autoComplete="name" />
          </Field>
          <Field label="Company" htmlFor="company" hint="Optional">
            <input id="company" name="company" className={cn(inputBase, "border-line")} placeholder="Lee Property Mgmt" autoComplete="organization" />
          </Field>
          <Field label="Email" htmlFor="email" required error={errors.email}>
            <input id="email" name="email" type="email" className={cn(inputBase, errors.email ? "border-danger" : "border-line")} placeholder="you@email.com" autoComplete="email" />
          </Field>
          <Field label="Phone" htmlFor="phone" required error={errors.phone}>
            <input id="phone" name="phone" type="tel" className={cn(inputBase, errors.phone ? "border-danger" : "border-line")} placeholder="(555) 555-0123" autoComplete="tel" />
          </Field>
          <div className="sm:col-span-2">
            <Field label="Anything we should know?" htmlFor="notes" hint="Access details, scope notes, problem areas. Optional.">
              <textarea id="notes" name="notes" rows={3} defaultValue={initial?.notes} className={cn(inputBase, "border-line resize-y")} placeholder="Lockbox on the door, unit's been empty 2 weeks, carpet needs replacing in the bedroom." />
            </Field>
          </div>
        </div>
      </section>

      {formError && (
        <div className="rounded-lg border border-danger/30 bg-danger/5 px-4 py-3 text-sm font-medium text-danger">
          {formError}
        </div>
      )}

      <div className="flex flex-col items-center gap-3">
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3.5 text-base font-semibold text-white shadow-sm transition hover:bg-accent-hover disabled:opacity-60 sm:w-auto sm:min-w-64"
        >
          {submitting ? (
            <>
              <Loader2 size={18} className="animate-spin" /> Submitting
            </>
          ) : (
            "Submit turn request"
          )}
        </button>
        <p className="text-center text-xs text-ink-soft">
          No account needed. You&apos;ll get a private link to track status and
          approve your quote.
        </p>
      </div>
    </form>
  );
}
