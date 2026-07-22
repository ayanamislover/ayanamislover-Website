import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const legacyRoot = path.join(projectRoot, "artwork-source", "legacy-site");
const generatedRoot = path.join(projectRoot, "artwork-source", "generated");
const archiveOutput = path.join(projectRoot, "public", "assets", "archive");
const heroOutput = path.join(projectRoot, "public", "assets", "hero");

await Promise.all([
  mkdir(archiveOutput, { recursive: true }),
  mkdir(heroOutput, { recursive: true }),
]);

await Promise.all(
  Array.from({ length: 8 }, async (_, index) => {
    const input = path.join(legacyRoot, `ayanami${index}.png`);
    const metadata = await sharp(input).metadata();
    const widths = [...new Set([
      Math.min(480, metadata.width),
      Math.min(720, metadata.width),
      Math.min(960, metadata.width),
    ])];

    await Promise.all([
      sharp(input)
        .webp({ quality: 78, effort: 5, smartSubsample: true })
        .toFile(path.join(archiveOutput, `ayanami${index}.webp`)),
      ...widths.flatMap((width) => [
        sharp(input)
          .resize({ width, withoutEnlargement: true })
          .avif({ quality: 52, effort: 5 })
          .toFile(path.join(archiveOutput, `ayanami${index}-${width}.avif`)),
        sharp(input)
          .resize({ width, withoutEnlargement: true })
          .webp({ quality: 78, effort: 5, smartSubsample: true })
          .toFile(path.join(archiveOutput, `ayanami${index}-${width}.webp`)),
      ]),
    ]);
  }),
);

const heroSource = path.join(generatedRoot, "ayanami-hero.png");
const heroWidths = [960, 1672];

await Promise.all(
  heroWidths.flatMap((width) => [
    sharp(heroSource)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 86, effort: 5, smartSubsample: true })
      .toFile(path.join(heroOutput, `ayanami-hero-${width}.webp`)),
    sharp(heroSource)
      .resize({ width, withoutEnlargement: true })
      .avif({ quality: 68, effort: 5 })
      .toFile(path.join(heroOutput, `ayanami-hero-${width}.avif`)),
  ]),
);

const mobileHeroSource = path.join(generatedRoot, "ayanami-hero-mobile.png");
const mobileHeroWidths = [480, 941];

await Promise.all(
  mobileHeroWidths.flatMap((width) => [
    sharp(mobileHeroSource)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 86, effort: 5, smartSubsample: true })
      .toFile(path.join(heroOutput, `ayanami-hero-mobile-${width}.webp`)),
    sharp(mobileHeroSource)
      .resize({ width, withoutEnlargement: true })
      .avif({ quality: 68, effort: 5 })
      .toFile(path.join(heroOutput, `ayanami-hero-mobile-${width}.avif`)),
  ]),
);

console.log("Optimized 8 responsive archive images and 8 responsive hero variants.");
