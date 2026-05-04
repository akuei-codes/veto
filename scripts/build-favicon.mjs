/**
 * Builds public/favicon.ico from public/veto-favicon-source.png with rounded corners.
 * Run: node scripts/build-favicon.mjs
 */
import { writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

import sharp from "sharp";
import toIco from "png-to-ico";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const src = join(root, "public", "veto-favicon-source.png");
const outIco = join(root, "public", "favicon.ico");

if (!existsSync(src)) {
  console.error("Missing", src);
  process.exit(1);
}

/** Corner radius as fraction of edge length. */
const RX = 0.22;

async function roundedPng(size) {
  const r = Math.max(2, Math.round(size * RX));
  const svg = Buffer.from(
    `<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="${size}" height="${size}" rx="${r}" ry="${r}" fill="white"/></svg>`,
  );
  return sharp(src)
    .ensureAlpha()
    .resize(size, size, { fit: "cover" })
    .composite([{ input: svg, blend: "dest-in" }])
    .png()
    .toBuffer();
}

const sizes = [16, 32, 48];
const pngBuffers = await Promise.all(sizes.map((s) => roundedPng(s)));
const ico = await toIco(pngBuffers);
writeFileSync(outIco, ico);
console.log("Wrote", outIco);
