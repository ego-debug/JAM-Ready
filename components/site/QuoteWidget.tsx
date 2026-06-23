"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MapPin, ChevronDown, Calendar, Check, ArrowRight } from "lucide-react";

const bedOptions = [
  { value: "", label: "Bedrooms" },
  { value: "0", label: "Studio" },
  { value: "1", label: "1 bedroom" },
  { value: "2", label: "2 bedrooms" },
  { value: "3", label: "3 bedrooms" },
  { value: "4", label: "4+ bedrooms" },
];

const fieldBox = "flex items-center gap-2.5 rounded-[13px] bg-white px-4 py-[13px]";
const fieldStyle = {
  border: "1px solid #d9eae3",
  boxShadow: "inset 0 1px 2px rgba(24,36,33,.04)",
} as const;

export function QuoteWidget() {
  const router = useRouter();
  const [address, setAddress] = useState("");
  const [beds, setBeds] = useState("");
  const [due, setDue] = useState("");

  function getQuote() {
    const params = new URLSearchParams();
    if (address.trim()) params.set("address", address.trim());
    if (beds) params.set("beds", beds);
    if (due) params.set("due", due);
    router.push(`/request?${params.toString()}`);
  }

  return (
    <section
      id="quote"
      style={{ background: "linear-gradient(180deg,#f4faf8 0%,#ffffff 55%)" }}
    >
      <div className="mx-auto max-w-[1080px] -translate-y-12 px-6 sm:-translate-y-[78px] sm:px-8">
        <div
          className="rounded-[26px] p-[22px]"
          style={{
            background:
              "linear-gradient(180deg,rgba(255,255,255,.72),rgba(255,255,255,.5))",
            backdropFilter: "blur(22px)",
            border: "1px solid rgba(255,255,255,.7)",
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,.85),0 40px 80px -34px rgba(24,36,33,.4)",
          }}
        >
          <div className="mb-[18px] flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-[17px] font-extrabold text-ink">
              Get a same-day quote
            </h2>
            <span className="inline-flex items-center gap-2 text-[13.5px] font-semibold text-success">
              <Check size={16} strokeWidth={2.4} /> No deposit to book, same-day
              callback
            </span>
          </div>

          <div className="grid items-end gap-3.5 md:grid-cols-[1.5fr_1fr_1fr_auto]">
            <Label text="Unit address">
              <div className={fieldBox} style={fieldStyle}>
                <MapPin size={17} className="shrink-0 text-[#a6bdb6]" />
                <input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="123 Birch St, Unit 4"
                  className="w-full bg-transparent text-[15px] text-ink outline-none placeholder:text-[#889b95]"
                />
              </div>
            </Label>

            <Label text="Bedrooms">
              <div className={`${fieldBox} relative justify-between`} style={fieldStyle}>
                <select
                  value={beds}
                  onChange={(e) => setBeds(e.target.value)}
                  className="w-full appearance-none bg-transparent text-[15px] font-semibold text-ink outline-none"
                  style={{ color: beds ? "#182421" : "#889b95" }}
                >
                  {bedOptions.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
                <ChevronDown size={15} className="pointer-events-none shrink-0 text-[#94aaa3]" />
              </div>
            </Label>

            <Label text="Need it by">
              <div className={`${fieldBox} justify-between`} style={fieldStyle}>
                <input
                  type="date"
                  value={due}
                  onChange={(e) => setDue(e.target.value)}
                  className="w-full bg-transparent text-[15px] font-semibold text-ink outline-none"
                />
                <Calendar size={16} className="pointer-events-none shrink-0 text-[#94aaa3]" />
              </div>
            </Label>

            <button
              type="button"
              onClick={getQuote}
              className="btn-orange inline-flex items-center justify-center gap-3 rounded-[13px] py-[13px] pl-6 pr-[13px] text-[16px] font-semibold"
            >
              Get my quote
              <span className="grid h-[34px] w-[34px] place-items-center rounded-full bg-white/90 text-[#169d82]">
                <ArrowRight size={14} strokeWidth={2.3} />
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Label({ text, children }: { text: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-[7px] block text-[13px] font-semibold text-[#7c8e89]">
        {text}
      </span>
      {children}
    </label>
  );
}
