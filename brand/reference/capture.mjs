// Recaptures the reference images from src/ with Playwright's Chromium.
// Run from anywhere: node brand/reference/capture.mjs [name ...]
import { chromium } from 'playwright';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = fileURLToPath(new URL('.', import.meta.url));
const src = (page, theme) =>
  pathToFileURL(`${here}src/${page}`).href + (theme ? `?theme=${theme}` : '');

// name: [source page, theme, viewport width, viewport height, device pixel ratio]
const shots = {
  'foundation-tokens': ['tokens.html', null, 1480, 900, 1],
  'ios-components': ['ios-components.html', null, 1480, 900, 1],
};
for (const theme of ['light', 'dark']) {
  shots[`web-desktop-${theme}`] = ['web.html', theme, 1280, 900, 1];
  shots[`web-mobile-${theme}`] = ['web.html', theme, 390, 844, 2];
  shots[`ios-screens-${theme}`] = ['ios.html', theme, 1350, 900, 1];
}

const wanted = process.argv.slice(2);
// Google Fonts may need a proxy; Chromium takes its credentials separately.
const via = process.env.HTTPS_PROXY ? new URL(process.env.HTTPS_PROXY) : null;
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || undefined,
  proxy: via ? {
    server: `${via.protocol}//${via.host}`,
    username: decodeURIComponent(via.username) || undefined,
    password: decodeURIComponent(via.password) || undefined,
  } : undefined,
});
for (const [name, [page, theme, width, height, dpr]] of Object.entries(shots)) {
  if (wanted.length && !wanted.includes(name)) continue;
  const tab = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: dpr });
  await tab.goto(src(page, theme), { waitUntil: 'networkidle' });
  await tab.evaluate(() => document.fonts.ready.then(() => {}));
  await tab.screenshot({ path: `${here}${name}.png`, fullPage: true });
  await tab.close();
  console.log(`${name}.png`);
}
await browser.close();
