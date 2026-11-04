# Organization colors

Lunchbox Labs' primary brand color is pink **`#F78AEE`**. Use it consistently for brand accents and primary actions.

Use the light and dark schemes below for branded interfaces. Supporting neutrals and darker pink provide readable text, links, and controls. This guidance does not require redesigning existing products.

## Theme palette

| Role | Light | Dark |
| --- | --- | --- |
| Page background | `#FFF8FE` | `#18111A` |
| Surface | `#FFFFFF` | `#241A26` |
| Body text | `#281423` | `#FFF5FD` |
| Link text | `#992B91` | `#F78AEE` |
| Primary action fill | `#F78AEE` | `#F78AEE` |
| Primary action label | `#281423` | `#281423` |
| Meaningful control border | `#992B91` | `#F78AEE` |
| Focus outline | `#281423` | `#FFF5FD` |

Use the primary pink for accents, not small text on a light background. Use the darker pink for light-theme links and underline links in prose. Keep button labels dark in both themes: white on the primary pink has only 2.14:1 contrast.

## Contrast and states

These ratios use opaque sRGB colors and the WCAG relative-luminance formula. Ratios are rounded to two decimal places; thresholds were checked before rounding.

| Pair | Light | Dark |
| --- | --- | --- |
| Body text on page background | 16.56:1 | 17.40:1 |
| Body text on surface | 17.29:1 | 15.78:1 |
| Link text on page background | 6.47:1 | 8.66:1 |
| Link text on surface | 6.75:1 | 7.86:1 |
| Primary action label on fill | 8.09:1 | 8.09:1 |
| Control border on surface | 6.75:1 | 7.86:1 |

- Aim for at least 4.5:1 for ordinary text and 3:1 for meaningful control boundaries and state indicators. See [WCAG text contrast](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) and [non-text contrast](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html).
- On light surfaces, give pink buttons a visible darker-pink border. That border contrasts 3.16:1 with the pink fill and 6.75:1 with the white surface; the pink fill alone contrasts only 2.14:1 with white. Use the same border color for fields and other controls that need a visible boundary.
- Use a visible focus outline, for example a 3px outline with a 3px offset. Keep the gap the surrounding background color. Light-theme dark outlines contrast at least 16.56:1 with these backgrounds; dark-theme pale outlines contrast at least 15.78:1. In dark mode, do not place the pale outline directly against a pink button: that pair is only 2.01:1. Preserve the dark gap and avoid clipping the outline.
- These color pairs assume fully opaque text and controls. Recheck hover, pressed, disabled, selection, gradients, transparency, and any new color pair in the actual interface. These pair checks do not establish whole-product accessibility.
- Pair color with labels, icons, or other visible cues for errors, success, and selection. The brand pink is not a status vocabulary. Respect platform accessibility settings and forced-color modes.
