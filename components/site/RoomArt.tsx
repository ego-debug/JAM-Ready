/**
 * Placeholder room illustration for the before/after slider.
 * Swap these out for real date-stamped job photos before launch.
 * The <BeforeAfterSlider> accepts any React node, so dropping in
 * <Image> components is a one-line change.
 */

export function RoomArt({ state }: { state: "before" | "after" }) {
  const before = state === "before";

  const wall = before ? "#cdbfa6" : "#eef3f7";
  const wallTop = before ? "#d8ccb4" : "#f7fafc";
  const baseboard = before ? "#b9ad95" : "#ffffff";
  const floorBase = before ? "#9c8a6f" : "#caa67d";
  const floorPlank = before ? "#8d7c63" : "#bd9970";
  const sky = before ? "#7e8a93" : "#bfe3f5";

  return (
    <svg
      viewBox="0 0 800 600"
      className="h-full w-full"
      role="img"
      aria-label={before ? "Empty unit before the turn" : "Unit made rent-ready"}
      preserveAspectRatio="xMidYMid slice"
    >
      {/* wall */}
      <rect x="0" y="0" width="800" height="500" fill={wall} />
      <rect x="0" y="0" width="800" height="120" fill={wallTop} opacity="0.6" />

      {/* window */}
      <rect x="500" y="90" width="210" height="190" rx="4" fill="#ffffff" />
      <rect x="508" y="98" width="194" height="174" rx="2" fill={sky} />
      <line x1="605" y1="98" x2="605" y2="272" stroke="#ffffff" strokeWidth="8" />
      <line x1="508" y1="185" x2="702" y2="185" stroke="#ffffff" strokeWidth="8" />
      <rect
        x="500"
        y="90"
        width="210"
        height="190"
        rx="4"
        fill="none"
        stroke={before ? "#9a8f78" : "#dfe7ee"}
        strokeWidth="6"
      />

      {/* baseboard */}
      <rect x="0" y="470" width="800" height="30" fill={baseboard} />

      {/* floor */}
      <rect x="0" y="500" width="800" height="100" fill={floorBase} />
      {Array.from({ length: 9 }).map((_, i) => (
        <line
          key={i}
          x1={i * 100}
          y1="500"
          x2={i * 100}
          y2="600"
          stroke={floorPlank}
          strokeWidth="2"
          opacity="0.7"
        />
      ))}
      <line x1="0" y1="548" x2="800" y2="548" stroke={floorPlank} strokeWidth="2" opacity="0.5" />

      {before ? (
        <>
          {/* scuffs, a patch, nail holes, a crack: the "before" story */}
          <ellipse cx="150" cy="380" rx="60" ry="22" fill="#9a8f78" opacity="0.45" />
          <ellipse cx="300" cy="300" rx="34" ry="16" fill="#8f846d" opacity="0.4" />
          <rect x="220" y="170" width="70" height="90" fill="#bcae93" opacity="0.8" />
          <path d="M 380 60 L 372 180 L 388 300" stroke="#9a8f78" strokeWidth="3" fill="none" opacity="0.6" />
          <circle cx="430" cy="220" r="3" fill="#7d735e" />
          <circle cx="450" cy="240" r="3" fill="#7d735e" />
          <circle cx="120" cy="260" r="3" fill="#7d735e" />
          <rect x="60" y="430" width="120" height="40" fill="#7d735e" opacity="0.25" />
        </>
      ) : (
        <>
          {/* clean, staged: fresh trim sheen plus a small plant for the "rent-ready" feel */}
          <rect x="0" y="120" width="800" height="2" fill="#ffffff" opacity="0.7" />
          <rect x="70" y="430" width="34" height="40" fill="#c98b5a" />
          <ellipse cx="87" cy="425" rx="40" ry="26" fill="#3f9d6b" />
          <ellipse cx="70" cy="412" rx="22" ry="18" fill="#4cb27c" />
          <ellipse cx="104" cy="414" rx="20" ry="16" fill="#46a774" />
        </>
      )}
    </svg>
  );
}
