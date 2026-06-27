<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Theme 2 portfolio guidance

## Scope and branch safety

- This file applies only to the `theme-2` worktree and branch.
- Keep all Theme 2 changes inside this worktree. Do not edit the `main` worktree.
- Theme 3 will have different requirements and its own `AGENTS.md`; do not add Theme 3 rules here.
- Do not merge, open a pull request, or deploy to production without explicit user approval.
- Use milestone commits on `theme-2`, but never commit unrelated user changes.
- Preserve archived `*-v1` routes unless the user explicitly asks to change them.

## Read before changing the interface

- Read `THEME2_PROGRESS.md`, `../PORTFOLIO_REFERENCE_SPEC.md`, `CONTENT_STYLE_GUIDE.md`, `content/COPY_DECK.md`, `DESIGN.md`, and `PRODUCT.md` when they are present.
- Update `THEME2_PROGRESS.md` after every meaningful milestone, approval, deployment, or change in blocker status so the owner can see current state without reading thread history.
- Treat approved files in `content/fact-sheets/` as the only authority for project claims, metrics, ownership, and attribution.
- `../PORTFOLIO_REFERENCE_SPEC.md` contains useful reference research but may lag the latest approved decisions. Reconcile it before implementation; never silently choose between conflicts.
- The user's explicit instructions and confirmed decisions take precedence over repository documentation.
- Do not let generic UI guidance override the named visual references below.

## Reference hierarchy

- Use Charlie Hart for brand decisions: colour, typography, hierarchy, spacing, navigation, CTA styling, homepage composition, and overall presentation.
- Use Lucas Barrientos for outcome-first case-study storytelling, project-specific phase navigation, evidence presentation, and scrollable long-screen mockups.
- Use Felix Lee only for the Ask Lums interaction shell: bottom-centre launcher, right-side desktop panel, and mobile bottom sheet.
- Preserve Olumide's projects, evidence, media, voice, and working functionality. Do not copy reference-site wording, personal branding, logos, or proprietary assets.

## Approved Theme 2 foundations

- Light theme: `#FFFFFF` background and `#0A0A0A` foreground.
- Dark theme: `#111111` background, `#1F1F1F` surface, `#F2F2F2` primary text, `#B3B3B3` secondary text, `#7A7A7A` muted text, and `#333333` borders.
- Match Charlie's system sans stack: `ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`.
- Define that stack once as a global CSS custom property named `--font-family-sans` in `app/globals.css`, apply it at the root, and make all interface typography inherit it. Do not repeat font-family declarations in components; changing this one token must change the typeface everywhere.
- Remove Playfair Display, JetBrains Mono, and the existing rust accent from the themed public UI.
- Follow Charlie's large editorial type hierarchy and black-pill primary CTA treatment.
- Keep theme and music controls at the top-right of the navigation. Preserve music and its accessible controls.
- Replace the current ripple-grid/five-tap easter egg with Charlie's desktop-only hero hover-media reveal, using approved placeholder media initially.

## Homepage decisions

- Order sections as: Hero and client marquee, expanding About preview, grouped selected work, recommendations, career timeline, contact.
- Use the approved hero content:
  - Pre-title: `Lums*`
  - Reveal: `Lums is short for Olumide Olusesi, a name coined by former colleagues.`
  - Primary line: `Senior product designer.`
  - Pale secondary line: `Based in Toronto.`
  - Summary: `I blend behavioural science and AI to create valuable digital products across fintech, AI systems, and complex multi-market platforms.`
  - CTAs: `View selected work` and `About me →`
- Use only Olumide's own approved company/client brands already present in the current portfolio. Charlie's clients are layout references only and must never appear as Olumide's experience.
- Client marquee order begins Shiga, Branch, Carbon, Sabi, UBA, followed by Olumide's remaining existing approved brands. Pause on hover/focus and provide a static reduced-motion fallback.
- Work groups:
  - AI & New Ventures: Branch AI and Shiga.
  - Growth & Core Experiences: Carbon.
  - Platforms at Scale: Sabi and UBA.
- Recommendations are a manually browsed editorial quote sequence led by Deovrat Dwivedi. Do not autoplay and do not add a follow-on CTA.
- Career timeline includes Shiga, Branch, Carbon, and UBA. Sabi remains case-study work, not employment.

## Content and ownership rules

- Do not invent, infer, combine, or silently resolve facts, metrics, dates, ownership, team roles, or causation.
- For every case study, follow this gate: fact sheet approval, storyline/phase-label approval, rewritten-copy approval, then implementation approval.
- Process case studies in this order: Branch AI, Shiga, Carbon, Sabi, UBA.
- Use Canadian English.
- Use `I` only for confirmed personal work. Use `we` only for confirmed team decisions or shared outcomes.
- Credit managers and collaborators only for confirmed direction, sponsorship, review, or delivery contributions.
- Preserve uncertainty and attribution limitations instead of overstating impact.
- Do not force all case studies into the same phase labels. Shared components may support page-specific structures.

## Branch AI pilot

- Use Deovrat Dwivedi's Substack article about the Branch Illustration GPT as a storyline reference for the complete Branch AI case study, not as a wording source.
- Adapt the narrative across Illustration GPT, CopyGPT, and Neem DS Prototyper.
- Give Illustration GPT the deepest chapter; use a more compact equivalent arc for CopyGPT and Neem DS Prototyper.
- Credit Deovrat as manager only for contributions Olumide confirms. Keep his recognition quote separate from ownership claims.
- The approved Branch AI facts and ownership boundaries live in `content/fact-sheets/BRANCH_AI.md`; do not reintroduce rejected claims from older sources.
- Never use the unproven claim that three tools were used 500+ times. More than 500 illustration-generation iterations is a separate approved metric.
- Do not state an exact illustration total. All product markets are live.
- Do not attribute the product-team poll to Olumide.
- Omit the name `Veela`.
- Use `content/outlines/BRANCH_AI_STORYLINE.md` only after Olumide approves its title, summary, phase labels, and story order.

## Résumé and career source

- Use the user-supplied updated résumé as the authoritative source for résumé and employment content.
- Keep the existing theme-responsive résumé page structure and update its content from that PDF.
- Preserve Print and Download PDF behaviour, with printable output forced to the light theme.
- Use `6+ years` consistently; remove conflicting `7+ years` and `8+ years` claims.
- Employment chronology:
  - Shiga Onchain Banking — Senior Product Designer (Consultant), May 2024–Present.
  - Branch International — Senior Product Designer, October 2024–March 2026.
  - Carbon Finance — Product Designer, June 2022–October 2024.
  - UBA Group — Product Designer, November 2019–June 2022.
- Preserve the Shiga/Branch overlap and label Shiga as consulting.
- Keep Sabi out of the résumé, career timeline, and Ask Lums employment chronology.

## Ask Lums

- Show Ask Lums only on Home and About.
- Preserve the existing text-streaming `/api/ask-lums` contract, database logging, rate limiting, suggestions, clear, and copy actions.
- Do not add voice support.
- Update its knowledge only with approved facts.
- Represent Sabi as portfolio work rather than employment.

## Route and feature preservation

- Retain Home, About, Work index, the five dedicated case studies, résumé, custom 404, theme switching, music, media zoom, galleries, and the Shiga embedded prototype.
- Remove the obsolete duplicate `app/work/[id]/page.js` only as an approved Theme 2 implementation change.
- Use scrollable device frames only for genuinely long assets and include keyboard access, a visible interaction cue, and an `Open full screen` action.

## Development workflow

- The project uses npm (`package-lock.json`).
- Run development with `npm run dev`.
- Before handoff, run `npm run lint` and `npm run build`.
- Add and run Playwright and axe coverage as part of the approved Theme 2 QA milestone.
- Inspect the rendered interface in the browser at desktop and mobile widths after meaningful UI changes.
- Verify light/dark modes, keyboard navigation, reduced motion, focus management, and responsive behaviour.
- Target WCAG 2.2 AA, LCP below 2.5 seconds, CLS below 0.1, INP below 200ms, and Lighthouse scores of 90+.
- Use Vercel branch previews marked `noindex`; do not publish production changes without approval.
