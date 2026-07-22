// Screenshot utility: captures the running dev/preview server with system Chrome.
// Usage: node.exe scripts/screenshot.mjs <url> <outPrefix> [light|dark] [desktop|mobile|both]
import { chromium } from "playwright-core";
import fs from "node:fs";

const url = process.argv[2] || "http://localhost:5173/";
const prefix = process.argv[3] || "output/shot";
const theme = process.argv[4] || "light";
const mode = process.argv[5] || "both";

fs.mkdirSync("output", { recursive: true });

const viewports = {
  desktop: { width: 1440, height: 1000 },
  mobile: { width: 390, height: 844 },
};

const browser = await chromium.launch({ channel: "chrome", headless: true });

for (const [name, viewport] of Object.entries(viewports)) {
  if (mode !== "both" && mode !== name) continue;
  const page = await browser.newPage({ viewport, deviceScaleFactor: 2 });
  await page.emulateMedia({ colorScheme: theme === "dark" ? "dark" : "light" });
  if (theme === "dark") {
    await page.addInitScript(() => {
      try { localStorage.setItem("ayanami-theme", "dark"); } catch {}
    });
  }
  await page.goto(url, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  // Scroll through the page to trigger lazy states, then back to top.
  await page.evaluate(async () => {
    const h = document.body.scrollHeight;
    for (let y = 0; y <= h; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(900);
  await page.screenshot({ path: `${prefix}-${name}-top.png` });
  await page.screenshot({ path: `${prefix}-${name}-full.png`, fullPage: true });
  await page.close();
  console.log(`saved ${prefix}-${name}-top.png / -full.png`);
}

await browser.close();
