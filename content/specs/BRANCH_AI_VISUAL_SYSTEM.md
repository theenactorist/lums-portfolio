# Branch AI Visual System Reset

Status: Proposed for owner confirmation  
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

The Theme 2 font-family token already contains Charlie's live stack. The mismatch came from the old page's weights, sizes, line-height, spacing, colour system, and layout—not from a different font-family value.

### Jessa Wolfe — case-study hierarchy reference

Useful patterns across the four supplied references:

- Text-led case-study openings with one dominant statement.
- A clear jump between display, section heading, subheading, and body copy.
- Approximately 61px/700 case titles, 38px/700 section headings, and 24px/700 supporting headings at a 764px viewport.
- Long sections separated by roughly 118px of vertical space.
- Wide evidence images and restrained dividers instead of dashboard-like card grids.
- Short, descriptive headings that communicate the point of the section.

Use Jessa for hierarchy and editorial pacing only. Keep Charlie's typeface, neutral palette, and CTA language.

## Proposed page character

- Light by default; dark mode remains optional.
- Pure white primary canvas with a restrained warm-neutral alternate section.
- Near-black type and neutral grey supporting text.
- No orange portfolio accent on the Branch case study.
- No gradients, glow, glass effects, blurred sticky surfaces, or dashboard cards.
- Project images provide the colour.
- Generous editorial spacing and fewer simultaneous visual signals.

## Proposed colour tokens

| Role | Light value | Dark equivalent |
| --- | --- | --- |
| Page | `#FFFFFF` | `#111111` |
| Alternate section | `#F6F5F2` | `#1A1A1A` |
| Primary text | `#0A0A0A` | `#F2F2F2` |
| Secondary text | `#5F5F5F` | `#B3B3B3` |
| Muted text | `#8A8A8A` | `#7A7A7A` |
| Hairline | `#DFDFDC` | `#333333` |
| Active progress | `#0A0A0A` | `#F2F2F2` |

## Proposed typography

All roles inherit the single `--font-family-sans` token.

| Role | Desktop | Mobile | Weight | Line-height | Letter-spacing |
| --- | --- | --- | --- | --- | --- |
| Case title | 72px | 42px | 600 | .96 | -.03em |
| Section title | 48px | 32px | 600 | 1.05 | -.025em |
| Workflow title | 36px | 27px | 600 | 1.1 | -.02em |
| Supporting heading | 24px | 21px | 600 | 1.25 | -.01em |
| Lead paragraph | 22px | 19px | 400 | 1.5 | normal |
| Body | 18px | 17px | 400 | 1.7 | normal |
| Metadata value | 16px | 16px | 500 | 1.45 | normal |
| Eyebrow/label | 12px | 12px | 600 | 1.35 | .1em |
| Metric | 48px | 38px | 600 | 1 | -.025em |

Rules:

- Body measure: 680–720px.
- Display measure: 12–15 words per line where possible.
- Use 400 for reading copy, 500 for metadata, and 600 for hierarchy.
- Remove 650 and 700 weights from the Branch case-study UI.
- Avoid italic, serif, or monospace styling for structural labels.

## Proposed spacing and width system

| Role | Desktop | Mobile |
| --- | --- | --- |
| Wide page width | 1280px | viewport minus 24px gutters |
| Reading width | 720px | full available width |
| Major section padding | 120px | 72px |
| Workflow separation | 144px | 88px |
| Heading to lead | 24px | 18px |
| Paragraph gap | 18px | 16px |
| Evidence gap | 40px | 24px |

## Proposed page structure

1. Minimal global navigation on a white canvas.
2. Text-led hero: eyebrow, title, lead, and one concise outcome statement.
3. Five-column metadata row: Role, Initiative, Core users, Team locations, Tools.
4. Full-width cover image below metadata.
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

## Proposed connected progress rail

Desktop:

- Sticky directly below the global navigation.
- Five equal-width steps connected by one continuous 1px line.
- Each step has a numbered 32px circle and a short label.
- Completed line segments and circles use primary text colour.
- The current step is a filled circle with inverse text and a 600-weight label.
- Future steps use the page background, muted border, and secondary text.
- The active step updates through `IntersectionObserver` as each phase enters the reading zone.
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

## Approval gate

Confirm before implementation:

1. Horizontal connected sticky rail, as proposed, or a vertical desktop rail.
2. Text-led hero with the cover image below metadata, as proposed, or a split hero.
3. Pure white canvas with `#F6F5F2` alternate sections, as proposed, or white-only.
4. Neutral black active progress state, as proposed, or Branch green.

No visual rebuild begins until these four choices are confirmed.
