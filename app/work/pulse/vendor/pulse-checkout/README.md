# Pulse checkout — portfolio adapter

The portfolio opens this native React checkout from `PulseDialogs.js` only after
its checkout button is selected. It renders the checkout container alone in a
native dialog; no iframe, landing page, dashboard, new route or redirect is used.

## Entry and assets

Import the named `PulseCheckoutPreview` export from `PulseCheckoutPreview.jsx`.
Its props are `onClose`, `theme`, `accent`, `radius`, `typeface`, `partnerName`,
`logoSrc` and `sdkSizePreset`. Defaults remain light theme, #1570EF accent,
16px radius, Instrument Sans, PiggyVest and the 380×600 standard size.

`PulseLogo.jsx` retains the original SVG geometry with TypeScript annotations
removed. The 11 currency/network SVGs and Instrument Sans variable font are served
from `/work/pulse/checkout-assets/`; their bytes match the maintained Clariti
adapter. `fonts.css` declares only that font. Popup CSS stays checkout-scoped,
without Pulse's application resets or dashboard styles. React is the only runtime
package dependency.

The parent native dialog owns focus trapping, Escape, focus return and viewport
sizing. The preview accepts a parent-provided width/height and the inherited
`--pulse-sdk-available-height`; its existing flex viewport scrolls internally.

## Behavior

`onClose` runs after completed-payment dismissal or the existing cancellation
flow. Without it, the upstream in-place reset remains. Completion says “Your
payment is complete. You can close this checkout.” The internal close control is
labelled “Close checkout”.

This is the existing local-state demonstration: asset/network search and selection,
quote/address copying, ten-minute expiry, confirmation stages and cancellation.
“I have made payment” starts simulated timer progression. The deterministic QR is
a visual placeholder; there are no backend or blockchain requests.

## Provenance and deliberate adaptations

Adapted 14 September 2026 from
`Clariti/react-presentation/src/vendor/pulse-checkout/`. That maintained adapter
was extracted on 8 September from `Pulse/src/App.jsx` (the named
`PulseCheckoutPreview` at original line 2468), with the dependency closure for
checkout only. The original Pulse project remains unchanged.

`provenance.json` preserves that historical source record and records this
portfolio adapter separately. Its top-level Vite asset notes describe the
historical Clariti extraction, not this Next.js implementation.

The Next.js adaptation adds a client directive, uses the public asset paths above,
and converts the logo component to JSX. Behavior-neutral lint changes inline the
same deterministic QR steps, lazily initialize the clock, and synchronize event
refs after commit. Narrow lint exceptions retain the upstream prop-driven reset
timing rather than redesigning its state flow. No product data, visible UI,
completion copy or simulated payment behavior was changed.

The dialog-only integration reuses this tested adapter from the archived portfolio revision. The existing case-study page, gallery and image lightbox remain separate.
