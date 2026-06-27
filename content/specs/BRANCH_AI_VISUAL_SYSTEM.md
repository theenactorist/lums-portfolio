# Branch AI Visual System Reset

Status: Approved and implemented for Branch AI pilot
Last updated: 2026-06-27  
Applies to: Active Theme 2 Branch AI case study

## Why the current page is being reset

The approved content flow works, but the implemented page still inherits the original portfolio's dark canvas, orange accent, card language, compact type hierarchy, and horizontal tab treatment. Theme 2 must be a visibly different portfolio system, not a restyled version of the existing one.

## Reference findings

### Charlie Hart — brand authority

Verified on the live site:

- Typeface: `ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`.
- Display weight: 600.
- At a 764px viewport, the primary heading renders at approximately 68.8px with 63.3px line-height and negative letter-spacing.
- The system is light-first: white canvas, near-black text, pale neutral supporting text, and black pill CTAs.
- Colour comes mainly from project work rather than portfolio chrome.

Theme 2 now uses the supplied Satoshi variable font as an owner-approved trial. The family remains controlled by the single `--font-family-sans` token so it can be changed globally from one location.

### Jessa Wolfe — case-study hierarchy reference

Useful patterns across the four supplied references:

- Text-led case-study openings with one dominant statement.
- A clear jump between display, section heading, subheading, and body copy.
- Approximately 61px/700 case titles, 38px/700 section headings, and 24px/700 supporting headings at a 764px viewport.
- Long sections separated by roughly 118px of vertical space.
- Wide evidence images and restrained dividers instead of dashboard-like card grids.
- Short, descriptive headings that communicate the point of the section.

Use Jessa for hierarchy and editorial pacing only. Keep Charlie's typeface, neutral palette, and CTA language.

## Approved page character

- Light by default; dark mode remains optional.
- Pure white primary canvas with a restrained warm-neutral alternate section.
- Near-black type and neutral grey supporting text.
- No orange portfolio accent on the Branch case study.
- No gradients, glow, glass effects, blurred sticky surfaces, or dashboard cards.
- Project images provide the colour.
- Generous editorial spacing and fewer simultaneous visual signals.

## Approved colour tokens

| Role | Light value | Dark equivalent |
| --- | --- | --- |
| Page | `#FFFFFF` | `#111111` |
| Alternate section | `#F6F5F2` | `#1A1A1A` |
| Primary text | `#0A0A0A` | `#F2F2F2` |
| Secondary text | `#5F5F5F` | `#B3B3B3` |
| Muted text | `#8A8A8A` | `#7A7A7A` |
| Hairline | `#DFDFDC` | `#333333` |
| Active progress | `#0A0A0A` | `#F2F2F2` |

## Approved typography

All roles inherit the single `--font-family-sans` token.

| Role | Desktop | Mobile | Weight | Line-height | Letter-spacing |
| --- | --- | --- | --- | --- | --- |
| Case title | 84px max | 57px max | 600 | .98 | -.05em |
| Section title | 54px max | 44px | 600 | 1.02 | -.045em |
| Workflow title | 54px max | 40px | 600 | 1.02 | -.045em |
| Supporting heading | 24px | 21px | 600 | 1.25 | -.01em |
| Lead paragraph | 22px | 19px | 400 | 1.5 | normal |
| Body | 20px | 18px | 400 | 1.62 | normal |
| Metadata value | 16px | 16px | 500 | 1.45 | normal |
| Eyebrow/label | 12px | 12px | 600 | 1.35 | .1em |
| Metric | 48px | 38px | 600 | 1 | -.025em |

Rules:

- Body measure: 704–760px.
- Display measure: 12–15 words per line where possible.
- Use 400 for reading copy, 500 for metadata, and 600 for hierarchy.
- Remove 650 and 700 weights from the Branch case-study UI.
- Avoid italic, serif, or monospace styling for structural labels.

## Approved spacing and width system

| Role | Desktop | Mobile |
| --- | --- | --- |
| Wide page width | 1280px | viewport minus 24px gutters |
| Reading width | 760px | full available width |
| Major section padding | 104px | 72px |
| Workflow separation | 104px | 72px |
| Heading to lead | 24px | 18px |
| Paragraph gap | 18px | 16px |
| Evidence gap | 40px | 24px |

## Approved page structure

1. Minimal global navigation on a white canvas.
2. Split hero: eyebrow, title, and lead beside the cover image.
3. Five-column metadata row: Role, Initiative, Core users, Team locations, Tools.
5. Overview and three unboxed outcome columns.
6. Connected five-step sticky progress rail.
7. The approved five-phase content flow.
8. Three workflow chapters with wide evidence, restrained tables, and typographic metrics.
9. Recognition, outcomes, learning, and next project.

Confirmed metadata changes:

- Remove Product markets from the metadata row.
- Core users: 5 designers, 4 UX researchers, 15 product managers, and 500 other Branch employees.
- Tools: ChatGPT, Claude, Figma Make.
- Replace the public-facing `Recruiter TLDR` label with `Overview`.

## Approved connected progress rail

Desktop:

- Sticky directly below the global navigation.
- Five equal-width steps connected by one continuous 1px line.
- The line begins at the centre of step 1 and ends at the centre of step 5; it never extends beyond the end steps.
- The rail uses the warm-neutral canvas so it remains visible against white content sections.
- Each step has a numbered 32px circle and a short label.
- Completed line segments and circles use primary text colour.
- The current step is a filled circle with inverse text and a 600-weight label.
- Future steps use the page background, muted border, and secondary text.
- The active step updates from scroll position as each phase enters the reading zone.
- Clicking a step scrolls to the phase while preserving the sticky-nav offset.
- The active link uses `aria-current="step"`.

Mobile:

- Keep the connected numbered rail.
- Allow horizontal scrolling within the rail only.
- Automatically bring the current step into view.
- Keep the page itself free of horizontal overflow.

## Component treatment changes

- Replace metric cards with open columns separated by hairlines.
- Replace issue cards with a numbered editorial list or alternating text-and-evidence rows.
- Remove rounded containers from ordinary content sections.
- Reserve a small radius only for media when the asset itself benefits from it.
- Use full-width or intentionally offset imagery; avoid a repeated centered 960px gallery pattern.
- Keep tables flat, with horizontal rules and no surrounding card.
- Use alternate section backgrounds to create chapter rhythm instead of borders around every object.

## Confirmed owner decisions

1. Horizontal connected sticky progress rail.
2. Split hero.
3. White canvas with occasional warm-neutral sections.
4. Black active progress state.
5. Country names appear only in Team locations on the public case-study page.
6. Satoshi is the current Theme 2 typeface trial.

## Owner refinement pass

- Selected work links now target the landing-page `#featured-work` section; `/work` redirects there.
- Phase chapter eyebrows use semantic labels such as `The problem` and `The system`, not `Phase 01` or `Phase 02`.
- Narrative sections follow Jessa's single-column reading pattern instead of a left-label/right-body grid.
- Section headings are capped at approximately 54px and body copy is 20px on desktop.
- The overview's numbered workflow list uses a full-width text row so descriptions do not collapse into narrow columns.
