import sharp from "sharp";
import path from "node:path";

const root = process.cwd();
const SIZE = 512;
const radius = Math.round(SIZE * 0.22);
const TEAL = "#1dba9a";
const EMERALD = "#0e3d35";
const WHITE = "#ffffff";

function tileSvg(color, rounded, inner) {
  const r = rounded ? `rx="${radius}" ry="${radius}"` : "";
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${SIZE}" height="${SIZE}" viewBox="0 0 ${SIZE} ${SIZE}">` +
      `<rect width="${SIZE}" height="${SIZE}" ${r} fill="${color}"/>${inner}</svg>`
  );
}

// glyph definitions, drawn in a 512 box
const glyphs = {
  // bold "J" monogram
  jLetter: (fill) =>
    `<text x="50%" y="54%" text-anchor="middle" dominant-baseline="central" ` +
    `font-family="'Poppins','Segoe UI',Arial,sans-serif" font-weight="800" ` +
    `font-size="340" letter-spacing="-6" fill="${fill}">J</text>`,
  // "JR" monogram
  jr: (fill) =>
    `<text x="50%" y="55%" text-anchor="middle" dominant-baseline="central" ` +
    `font-family="'Poppins','Segoe UI',Arial,sans-serif" font-weight="800" ` +
    `font-size="220" letter-spacing="-10" fill="${fill}">JR</text>`,
  // simple filled house silhouette with overhanging eaves
  house: (fill) =>
    `<path fill="${fill}" d="M256 120 L408 250 L366 250 L366 392 L300 392 L300 312 L212 312 L212 392 L146 392 L146 250 L104 250 Z"/>`,
  // stylized "JAM" wordmark, forced to span most of the tile so it reads tiny
  jam: (fill) =>
    `<text x="50%" y="55%" text-anchor="middle" dominant-baseline="central" ` +
    `textLength="400" lengthAdjust="spacingAndGlyphs" ` +
    `font-family="'Poppins','Segoe UI',Arial,sans-serif" font-weight="800" ` +
    `font-size="240" fill="${fill}">JAM</text>`,
};

async function render(color, glyphFill, glyphKey, rounded, out) {
  const inner = glyphs[glyphKey](glyphFill);
  await sharp(tileSvg(color, rounded, inner), { density: 384 }).png().toFile(out);
}

const mode = process.argv[2] || "preview";

if (mode === "preview") {
  const p = (n) => path.join(root, "scripts", `preview-${n}.png`);
  await render(TEAL, WHITE, "jam", true, p("jam-white"));
  await render(TEAL, EMERALD, "jam", true, p("jam-dark"));
  await render(EMERALD, WHITE, "jam", true, p("jam-emerald"));
  console.log("previews written");
} else {
  // mode encodes the choice: "j-white" | "j-dark" | "j-emerald" | "house" | "jr"
  const map = {
    "j-white": [TEAL, WHITE, "jLetter"],
    "j-dark": [TEAL, EMERALD, "jLetter"],
    "j-emerald": [EMERALD, WHITE, "jLetter"],
    house: [TEAL, WHITE, "house"],
    jr: [TEAL, WHITE, "jr"],
    "jam-white": [TEAL, WHITE, "jam"],
    "jam-dark": [TEAL, EMERALD, "jam"],
    "jam-emerald": [EMERALD, WHITE, "jam"],
  };
  const [color, fill, key] = map[mode];
  await render(color, fill, key, true, path.join(root, "app", "icon.png"));
  await render(color, fill, key, false, path.join(root, "app", "apple-icon.png"));
  console.log("committed icons:", mode);
}
