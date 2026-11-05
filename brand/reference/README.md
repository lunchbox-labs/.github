# Design reference images

These images illustrate the [design foundation](../foundation.md) and its [web](../web.md) and [iOS](../ios.md) guides. They show the intended look; the guides' text and tables are the rules.

| Image | Shows |
| --- | --- |
| `foundation-tokens.png` | Color roles, type, spacing, radii, controls, status messages and motion, in light and dark |
| `web-desktop-light.png`, `web-desktop-dark.png` | An org-site page at 1280px wide |
| `web-mobile-light.png`, `web-mobile-dark.png` | The same page at 390px wide |
| `ios-screens-light.png`, `ios-screens-dark.png` | A main screen with a floating two-tab bar, settings at rest and scrolled with the tab bar minimized, an inset permission sheet, and a single-screen app with a floating Settings gear |
| `ios-components.png` | The tab bar, toolbars, actions, the floating control, list links and text styles |
| `ios-glass-accessibility.png` | The tab bar and a floating control with the default look, Reduce Transparency and Increase Contrast |

The iOS images use Inter in place of SF Pro and Nunito in place of SF Pro Rounded, since Apple's fonts can't be bundled, and approximate Liquid Glass in CSS. Check glass in the real app.

## Updating the images

`src/` holds the HTML each image is captured from. It uses [brand/tokens.css](../tokens.css) and loads fonts from Google Fonts. The iOS pages share `ios-glass.css` and `ios-parts.js`. The sheets' own layout around the samples, such as the panel backgrounds and labels, isn't part of the standard.

After changing a token or a source page, recapture with [capture.mjs](capture.mjs). It uses Playwright's Chromium, waits for the fonts to load and matches the committed sizes. Name images to recapture only those:

```sh
npm install --no-save playwright && npx playwright install chromium
node brand/reference/capture.mjs
node brand/reference/capture.mjs web-desktop-light web-desktop-dark
```

Check the new images against the guides before committing them.
