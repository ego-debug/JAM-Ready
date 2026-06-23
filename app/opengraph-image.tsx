import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";
import { site } from "@/lib/config";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name}: Rent-ready by your deadline`;

const logo =
  "data:image/png;base64," +
  readFileSync(join(process.cwd(), "public", "jam-icon-1024.png")).toString("base64");

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "linear-gradient(135deg,#f4faf8 0%,#d7f0e6 55%,#a9e6d2 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logo} width="84" height="84" alt="" />
          <div style={{ fontSize: "40px", fontWeight: 800, color: "#182421" }}>
            {site.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div
            style={{
              fontSize: "78px",
              fontWeight: 800,
              color: "#182421",
              lineHeight: 1.04,
              letterSpacing: "-2px",
              maxWidth: "920px",
            }}
          >
            Rent-ready by your deadline.
          </div>
          <div style={{ fontSize: "32px", color: "#3c544c", maxWidth: "840px" }}>
            Apartment make-readys with date-stamped photo proof. Most units
            rent-ready in 1 to 3 days.
          </div>
        </div>

        <div style={{ display: "flex", gap: "16px" }}>
          {["Licensed & insured", "Photo-proof on every turn", "Cherry Hill, NJ"].map(
            (t) => (
              <div
                key={t}
                style={{
                  display: "flex",
                  padding: "12px 22px",
                  borderRadius: "999px",
                  background: "rgba(255,255,255,.72)",
                  color: "#182421",
                  fontSize: "24px",
                  fontWeight: 600,
                }}
              >
                {t}
              </div>
            ),
          )}
        </div>
      </div>
    ),
    { ...size },
  );
}
