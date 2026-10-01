# Shiga / ENTA portfolio refresh — September 2026

## Source

- Project: `/Users/olumide/Documents/Vibe coding/Shiga Projects/Enta Onboarding`
- Source revision: `5a196b1` (clean source worktree).
- Rebuilt from source; the source `dist/` predates the latest changes.
- Portfolio demo: `public/work/shiga-onboarding/demo-2026-09/`.
- Screenshots: `public/work/shiga-onboarding/screens-2026-09/`.

## Integration

The complete Vite production output is hosted with the portfolio. The demo selector opens sign-up, sign-in, individual wallet, and business wallet views. Hash routes use an explicit `index.html` so they work under Next.js static hosting.

Source files were copied to a temporary staging folder before building. Portfolio-only changes:

1. Changed literal `/assets/` references in `HeroPane.tsx`, `BusinessKybFlow.tsx`, and `UboKycFlow.tsx` to `./assets/` so nested hosting resolves images correctly.
2. Changed Tier 2 navigation from `../#/…` to `../index.html#/…`.
3. Removed the Tier 2 KYC banner’s reference to `assets/kyc-laptop-id.png`, a decorative illustration absent from the source. The original source project is untouched.

The source uses simulated passkeys and mock data. React individual sign-up currently ends at email confirmation; its detailed passkey/recovery screens remain in the separate Tier 2 prototype. The business journey is connected end to end.

## Screenshots

Captured from this build at a 1440 × 1024 viewport. Current onboarding, passkey, verification, business picker, and wallet screens replace the previous delivery screenshots. Historical flow-diagram and ideation screenshots remain in their original case-study sections.

## Release scope

Production was based on commit `e9ba9ab47a3b00448d921ec30c32a37c6e70c913`. Deployment uses a clean snapshot of that commit with only this Shiga update overlaid, preserving unrelated unpublished portfolio work.

## Published release

- Deployment: `dpl_H3W1cFezqCJJDr1dWAPc8Ht7cMNA` — READY and promoted.
- Live page: https://olumideolusesi.com/work/shiga-onboarding
- Validation: targeted ESLint, local Next production build, Vercel production build, desktop/mobile browser review, image viewer, all four demo selector views, and live-domain onboarding/dashboard iframe checks passed.
- Deployed demo HTML and business dashboard PNG matched the local snapshot byte for byte.

## Demo viewport follow-up

The shared iframe now uses the dashboards’ 1440:1024 aspect ratio instead of a fixed 850px height, avoiding height-driven downscaling and side gutters. Mobile retains a 720px minimum height for the responsive authentication forms. Removed the refresh date from the public caption.

Measured all four tabs at 1440px, 1280px, and 390px browser widths: identical outer frame width/height across tabs, dashboard side gaps below half a pixel (border rounding), and no page overflow. Local production build, ESLint, and browser checks passed.

Viewport fix published as `dpl_2x7nk91A6wAM9mbQNCn7hCK5KB4v`. Repeated all 12 tab/viewport measurements on the live domain; all passed.

## Fit the full demo in the viewport

Supersedes the previous responsive iframe/minimum-height approach. The iframe now renders at its native 1440 × 1024 dimensions and scales uniformly inside a centered wrapper. A ResizeObserver measures the tabs and footer to reserve their actual heights; the wrapper fits the remaining viewport height, allowing 100px for the page header/space above and 24px below the CTA. The visible CTA text is stable across tabs, with a view-specific accessible label and destination.

Validated all four tabs at 1440×900, 1280×800, 1440×700, 1024×600, and 390×844: tabs and footer fit together, native iframe size stays consistent, and dashboard side gutters/outer overflow are absent. Clicked the scaled business dashboard Send control successfully.

Release baseline: latest Pulse-inclusive production `dpl_DThuCTgtjQHLfn1HFzJjuRLYd8UU`, source snapshot `/tmp/lums-pulse-release-20260914`. All 591 deployed files were compared; the new release changes only EntaDemo.js and enta-demo.module.css.

Scaled demo release published as `dpl_vasfGhuyCyHGqs5V13EoJP5Q52DM` from `/tmp/lums-enta-fit-release-20260914`.

## Deliver screenshot gallery

The eight delivery screenshots now form one horizontally scrolling grid: two equal-height rows on desktop and one row on mobile. Each card preserves the full 1440 × 1024 image, with a short caption and expansion control. Arrow buttons support horizontal navigation and disable at the ends.

Clicking a card opens a native dialog with previous/next navigation, arrow-key navigation, actual-size viewing and scrolling, Escape/backdrop dismissal, keyboard focus containment, and focus restoration to the original card. Reduced-motion preferences disable animated scrolling and card motion.

Verified equal card dimensions and no horizontal page overflow at 1440 × 1000 and 390 × 844, all eight loaded images, both scroll endpoints, final-card access on mobile, viewer navigation/wrapping, zoom reset and native-size panning, Tab/Shift+Tab containment, and Escape/focus restoration. Targeted ESLint and local production builds passed; no browser runtime errors. Design scan advisories concern intentional light screenshot backgrounds, including the existing white diagram background.

The final release source is `/tmp/lums-enta-gallery-restored-release-20260914`, based on the user-requested Pulse rollback `/tmp/lums-pulse-rollback-20260914` (`dpl_9om7vvant3yC6s6WTD68q6gpQ3gq`). Audit: 556 unchanged files, one changed Shiga page, two new gallery files, zero missing files. The earlier unpromoted gallery candidate based on the rejected Pulse redesign must not be promoted.

Gallery release `dpl_go48unyARAtGnaNdeCS4zADtSRDg` passed the Vercel production build and was promoted to the live domain. Public-page checks confirmed all eight equal-width cards, no horizontal page overflow, full-resolution expansion, viewer navigation and Escape dismissal.

## Gallery curation correction

The gallery is a selection of product screens, not a complete inventory of the product. Per the user's correction, its heading is now exactly “Some product screens.” Removed all numeric card prefixes and the expanded viewer's numeric counter. The viewer announces the selected screen title instead. Removed the `sign-in-passkey` screenshot from both the gallery and expanded viewer; the interactive sign-in demo remains available.

Release source: `/tmp/lums-enta-gallery-curation-release-20260914`, based on the previous live gallery release with only `DeliverGallery.js` and `deliver-gallery.module.css` changed. All other production files are unchanged.

Published as `dpl_3xpFM1iCtxd7ykF6TSqDJXuR6oSB`. Targeted ESLint and Vercel production build passed. Live browser verification confirmed the exact heading, unnumbered captions, absent sign-in-with-passkey screenshot, and unnumbered expanded viewer footer.
