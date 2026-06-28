# AI Illustration Case Study QA Report

Status: Approved source copy implemented locally and passed implementation QA
Date: 2026-06-27
Route: `/work/ai-illustration-system`
Branch: `theme-2`

## Verdict

The approved standalone Illustration AI narrative is implemented on the local route and passes content, build, desktop, and mobile checks.

It remains intentionally unlinked from Selected Work until the final visual sequence is approved and the protected staging preview is refreshed.

## Sources checked

- `AGENTS.md`
- `THEME2_PROGRESS.md`
- `../PORTFOLIO_REFERENCE_SPEC.md`
- `CONTENT_STYLE_GUIDE.md`
- `content/COPY_DECK.md`
- `content/specs/AI_CASE_STUDY_ARCHITECTURE.md`
- `content/specs/BRANCH_AI_VISUAL_SYSTEM.md`
- `content/fact-sheets/BRANCH_AI.md`
- `content/fact-sheets/AI_ILLUSTRATION_SYSTEM.md`
- `content/drafts/AI_ILLUSTRATION_SYSTEM_CASE_STUDY.md`
- `content/research/UXFOLIO_WEBINAR_SYNTHESIS.md`
- The supplied `Illustration GPT.zip` archive
- The referenced Substack article sections

## Copy and content audit

| Check | Result |
| --- | --- |
| Approved standalone title and five progress labels | Pass |
| First-person ownership | Pass; personal claims match confirmed ownership |
| Team and collaborator attribution | Pass; Arushi, the design team, product managers, and UX researchers retain their stated contributions |
| Unsupported metrics | Pass; no tool-usage count, exact illustration total, or unsupported adoption figure appears |
| Unconfirmed public claims | Pass after correction; competitor names, Codex testing, company-access details, material count, unnamed styles, and triggering screens are omitted |
| Illustration dates | Pass; December 2025 to February 2026 |
| Canadian English | Pass |
| Em dashes | Pass; none appear in public case-study copy |
| Prohibited wording | Pass; no `Veela`, `Recruiter TLDR`, numbered phase labels, or country-level Product markets metadata |
| Copy density | Pass; the approved source document contains 2,323 words including headings, evidence notes, and metadata |
| Headings | Pass; one H1, descriptive H2 phase headings, and supporting H3 headings with no level skips |
| Visual evidence | Pass; seven evidence images plus one colour-system figure, each with contextual captions or labels |
| Reference-article use | Pass; structure and failure categories were synthesised without transferring Deovrat's ownership or copying long passages |

## Layout and visual-system audit

| Check | Result |
| --- | --- |
| Typeface source | Pass; Satoshi is controlled by the single global `--font-family-sans` token |
| Light-first presentation | Pass; white canvas, near-black text, and warm-neutral chapter bands |
| Desktop body type | Pass after correction; 20px, weight 400, 32.4px line height |
| Mobile body type | Pass; 18px, weight 400, 29.16px line height |
| Section headings | Pass; approximately 54px desktop and 44px mobile |
| Metadata | Pass after correction; 16px, weight 500 |
| Reading measure | Pass; 760px desktop and full available mobile width |
| Heading and label weights | Pass after correction; no 650 or 700 weights remain in the active Branch case-study CSS |
| Responsive widths | Pass for the approved rewrite at 390px and 1440px; earlier system checks also covered 360px, 768px, and 1280px |
| Page overflow | Pass; no document-level horizontal overflow at tested widths |
| Evidence media | Pass; wide, zoomable, lazy-loaded Next.js images with intrinsic dimensions |
| Default theme | Pass; the case study opens on the approved light canvas |

## Progress rail audit

| Check | Result |
| --- | --- |
| Connected line boundaries | Pass; line begins at step 1 centre and ends at step 5 centre |
| Five semantic labels | Pass |
| Active step tracking | Pass after correction; now uses Intersection Observer as specified |
| `aria-current="step"` | Pass across all five phases |
| Anchor offsets | Pass; clicked sections land below the sticky navigation |
| Fresh deep links | Pass after correction; initial hash targets realign after fonts and layout settle |
| Mobile behaviour | Pass; the rail scrolls independently and centres the active step |
| Inactive-label contrast | Pass after correction; 5.03:1 in light mode and 5.84:1 in dark mode |

## Accessibility and interaction audit

| Check | Result |
| --- | --- |
| Landmarks | Pass; one main landmark and labelled primary, breadcrumb, and case-study navigation |
| Link and button names | Pass; no unnamed interactive controls |
| Image alternatives | Pass; no missing or empty alt text in the case study |
| Table semantics | Pass; three scoped column headers and a keyboard-focusable overflow region |
| Focus visibility | Pass; rail links show a 2px visible outline |
| Image-viewer focus | Pass after correction; focus enters the dialog, remains trapped, closes with Escape, and returns to the trigger |
| Body scroll lock in viewer | Pass |
| Reduced motion | Pass after correction; smooth scrolling, transitions, and animation durations are disabled when requested |
| Text contrast | Pass; body 10.86:1, muted labels and captions 5.57:1, inactive rail at least 5.03:1 |

## Technical audit

- `git diff --check`: pass
- `npm run lint`: pass
- `npm run build`: pass
- Next.js static route generation: pass
- App-owned browser console warnings and errors: none observed
- Existing Google Identity Services FedCM warning and token-retrieval error remain external to the case-study implementation
- Broken internal phase anchors: none
- Duplicate IDs: none
- Metadata title, description, Open Graph title, description, and image: present
- React 19.2.4 and Next.js 16.2.9 satisfy the current patched-version requirements recorded in the project guidance

## Corrections made during QA

1. Replaced the earlier public draft with the approved five-anchor source narrative.
2. Updated the illustration timeline to December 2025 through February 2026.
3. Updated the tools to ChatGPT, FigJam, and Figma.
4. Removed unverified competitor, adoption, material-count, tolerance, and exact-output claims.
5. Added the verified four-layer code evidence from the supplied v1.6 files.
6. Replaced the previous iteration table with six readable, evidence-backed iteration narratives.
7. Added the approved manager-recognition evidence without extracting conflicting figures from the screenshot.
8. Standardised the case-study typography to the agreed 8-grid-compatible sizes.
9. Kept every chapter heading left aligned at the same mobile inset.
10. Reworked the selected-approach callout to remove the 2px decorative side stripe.
11. Confirmed the connected rail starts at step 1, ends at step 5, and activates the deep-linked section.
12. Confirmed no page-level horizontal overflow at 390px or 1440px.

## Remaining release decision

The source copy is approved. The remaining owner decision is whether to refresh the protected staging preview and link the case study from Selected Work.

## Final-release checks still scheduled

These are not blockers for copy review, but they remain required before production release:

- Automated axe coverage
- Automated Playwright regression coverage
- Lighthouse performance measurement
- Cross-browser checks in Safari and Firefox
- Full 200% browser-zoom reflow review
