# AI Illustration Case Study QA Report

Status: Passed for owner fact and copy review
Date: 2026-06-27
Route: `/work/ai-illustration-system`
Branch: `theme-2`

## Verdict

The standalone Illustration AI case study is structurally, technically, and visually ready for Olumide's review.

It is intentionally not linked from Selected Work. Seven factual items still require owner confirmation, and the public wording remains in copy-review status.

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
| Programme dates | Pass with limitation; labelled as the wider programme window, not the illustration-only timeline |
| Canadian English | Pass |
| Em dashes | Pass; none appear in public case-study copy |
| Prohibited wording | Pass; no `Veela`, `Recruiter TLDR`, numbered phase labels, or country-level Product markets metadata |
| Copy density | Pass for review; 1,553 words, 43 paragraphs, and no paragraph above 46 words |
| Headings | Pass; one H1, descriptive H2 phase headings, and supporting H3 headings with no level skips |
| Visual evidence | Pass for review; seven evidence images plus one colour-system figure, each with contextual captions or labels |
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
| Responsive widths | Pass at 360px, 390px, 768px, 1280px, and 1440px |
| Page overflow | Pass; no document-level horizontal overflow at tested widths |
| Evidence media | Pass; wide, zoomable, lazy-loaded Next.js images with intrinsic dimensions |
| Dark mode | Pass; optional dark tokens remain legible and light mode was restored after testing |

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
- Browser console warnings and errors: none
- Broken internal phase anchors: none
- Duplicate IDs: none
- Metadata title, description, Open Graph title, description, and image: present
- React 19.2.4 and Next.js 16.2.9 satisfy the current patched-version requirements recorded in the project guidance

## Corrections made during QA

1. Removed unconfirmed Claude and Gemini claims from public copy.
2. Removed the unconfirmed Codex-specific future claim from public copy.
3. Reworded company access so it does not imply adoption or company-wide usage.
4. Clarified that October 2025–February 2026 is the wider programme window.
5. Removed unconfirmed Figma from the Illustration tools list.
6. Reconciled the independent-case architecture across `AGENTS.md`, the copy deck, and the master specification.
7. Reconciled the Satoshi decision across guidance and implementation.
8. Recorded the unresolved 15 versus 18 versus 22 material-count conflict and kept all counts out of public copy.
9. Corrected desktop body size, metadata size, and typography weights to match the approved visual system.
10. Replaced scroll-event progress tracking with Intersection Observer.
11. Fixed fresh mobile hash positioning after layout and font loading.
12. Fixed inactive rail contrast.
13. Added image-viewer focus management and focus return.
14. Added the global reduced-motion fallback.

## Remaining owner confirmations

1. The names of the three visual styles reviewed alongside Notion-style illustration.
2. Whether October 2025–February 2026 also describes the Illustration workstream itself.
3. Whether Claude and Gemini Nano Banana should be named publicly as evaluated alternatives.
4. What `available company-wide` specifically means.
5. Whether a Codex version was tested or remains future potential.
6. Which product requests or screens first made the illustration problem urgent.
7. Whether the public material count should be 15, 18, 22, or omitted permanently.

## Final-release checks still scheduled

These are not blockers for copy review, but they remain required before production release:

- Automated axe coverage
- Automated Playwright regression coverage
- Lighthouse performance measurement
- Cross-browser checks in Safari and Firefox
- Full 200% browser-zoom reflow review

