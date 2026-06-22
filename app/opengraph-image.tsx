import { ImageResponse } from "next/og";
import { site } from "@/lib/config";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = `${site.name}: Rent-ready by your deadline`;

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
          background:
            "linear-gradient(135deg,#f1f8f5 0%,#bdeede 58%,#6fdcc0 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <div
            style={{
              width: "66px",
              height: "66px",
              borderRadius: "20px",
              background: "#0e2a26",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: "36px",
              fontWeight: 800,
            }}
          >
            J
          </div>
          <div style={{ fontSize: "40px", fontWeight: 800, color: "#0e2a26" }}>
            {site.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div
            style={{
              fontSize: "78px",
              fontWeight: 800,
              color: "#0e2a26",
              lineHeight: 1.04,
              letterSpacing: "-2px",
              maxWidth: "920px",
            }}
          >
            Rent-ready by your deadline.
          </div>
          <div
            style={{ fontSize: "32px", color: "#4f615c", maxWidth: "840px" }}
          >
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
                  background: "rgba(255,255,255,.7)",
                  color: "#0e2a26",
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
