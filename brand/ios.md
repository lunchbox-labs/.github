# iOS view guide

How the [foundation](foundation.md) maps onto Lunchbox Labs iPhone apps. Current consumer: Compasslet (`lunchbox-labs/compasslet`). Native first: an app should feel like it belongs on iPhone, with the brand in its accent, its display type and its one primary action. Web pixel values don't carry over.

![Compasslet's main screen, settings and a permission sheet in light appearance](reference/ios-screens-light.png)

![The same screens in dark appearance](reference/ios-screens-dark.png)

![iOS text styles, actions, list links and the floating control in light and dark](reference/ios-components.png)

## Color

- Backgrounds, labels, separators and fills use the system's semantic colors (`systemBackground`, `systemGroupedBackground`, `secondarySystemGroupedBackground`, `label`, `secondaryLabel`, `separator`). The web's pink-tinted neutrals stay on the web. `secondaryLabel` is below 4.5:1 on light rows, so use it only for supporting text and check it with Increase Contrast on; essential text uses `label`.
- `AccentColor` in the asset catalog is the strong pink: `#992B91` in light, `#F78AEE` in dark. It tints links, toggles, selected states and the confirming toolbar button.
- A filled accent button uses a white label in light and the pink label `#281423` in dark (`ConfirmActionLabel` in Compasslet); [organization colors](colors.md) has the ratios.
- The brand pink `#F78AEE` with the `#281423` label fills the one primary action on a screen, as a capsule with a 1pt accent border. Keep it as named colors in the asset catalog (`PrimaryActionFill`, `PrimaryActionLabel`).
- Darken a pressed pink button with a 12% overlay, as the foundation's press rule says.
- Functional colors stay functional: a compass's north marker stays red, and the system's destructive red stays red. Brand pink never stands in for a status.
- Give every custom color a dark value where it differs from light, and an Increased Contrast value where it helps.

## Type

- Text styles only (`.largeTitle` through `.caption2`), so everything follows Dynamic Type. Fixed sizes only for drawings that scale with their container, like a dial.
- The display voice is SF Pro Rounded: apply `.fontDesign(.rounded)` with a bold weight to brand moments such as a large reading, an onboarding or permission title, or an empty state's headline. Navigation titles, lists and body text stay SF Pro.
- SF Mono for code and identifiers; `.monospacedDigit()` for numbers that change in place.
- Title case for navigation titles, section headers and control labels; sentence case for explanations, footers and alerts' messages. Compasslet's AGENTS.md has the full casing rule.

## Layout and spacing

- Use the system's margins and list insets (16pt on most iPhones, 20pt on the largest), not web gutters.
- Spacing inside custom views uses the foundation's 4pt steps, wrapped in `@ScaledMetric` where it sits next to text so it grows with Dynamic Type.
- Settings and forms use `Form` or inset grouped lists. Custom cards use continuous corners: 20pt for a standalone card, concentric inside it.
- Respect safe areas and keep the main control within thumb reach near the bottom.
- Targets at least 44 by 44pt, including icon-only buttons.

## Components

| Component | Look |
| --- | --- |
| Primary action | Pink capsule, pink-label text, semibold body, at least 50pt tall, full width in sheets. One per screen. |
| Secondary action | Plain button in the accent, below the primary ("Not Now"). |
| Toolbar confirm | The system's prominent glass style filled with the accent ("Done"). |
| Floating control | An icon-only circle in the system glass material, 44 to 80pt, with a label for VoiceOver and the large content viewer. |
| Links in lists | Tinted with the accent explicitly; system blue falls below 4.5:1 on light rows. |
| Sheets | System sheets with detents. A permission or explainer sheet has an SF Symbol in a soft fill, a rounded bold title, one or two sentences, then the primary action. |

## Motion

- System transitions for navigation, sheets and alerts.
- Custom animation uses `.smooth` springs or `.spring(duration: 0.28, bounce: 0)`, or ease-out curves at the foundation's durations. No bounce.
- With Reduce Motion on, swap movement for a short fade or nothing.
- Haptics only to confirm something meaningful, never on every tap.

## Icons

- SF Symbols, sized with the text style beside them. Use the filled variant for selected states.
- The app icon follows Apple's icon grid; the brand pink can appear in it, but legibility at small sizes comes first.

## Checks for an iOS change

- Light and dark, with Increase Contrast and Differentiate Without Color on.
- The largest accessibility text size on the main screens.
- A small iPhone (375pt wide) and a large one (440pt wide).
- VoiceOver labels and order for every custom control.
- Screenshots come from the app's own Screenshots workflow, not from temporary branches.
