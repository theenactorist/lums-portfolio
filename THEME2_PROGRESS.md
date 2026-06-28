# Theme 2 Progress Dashboard

Last updated: 2026-06-27  
Branch: `theme-2`  
Worktree: `Theme 2/lums-portfolio`  
Current stage: Illustration AI implementation QA

## Current gate

**The revised five-anchor Illustration structure and source copy are approved. The approved narrative is implemented locally and is undergoing final desktop and mobile QA before the staging preview is refreshed.**

Review: [Independent AI Case Study Architecture](content/specs/AI_CASE_STUDY_ARCHITECTURE.md)

Draft: [AI Illustration System Case Study](content/drafts/AI_ILLUSTRATION_SYSTEM_CASE_STUDY.md)

Facts and open confirmations: [AI Illustration System Fact Sheet](content/fact-sheets/AI_ILLUSTRATION_SYSTEM.md)

QA: [AI Illustration Case Study QA Report](content/reviews/AI_ILLUSTRATION_QA.md)

Staging: [Open the Theme 2 Illustration AI Preview](https://lums-portfolio-git-theme-2-theenactorists-projects.vercel.app/work/ai-illustration-system)

The current combined page remains available as a visual and factual reference. It will not define the final information architecture. Illustration, copywriting, and prototyping will become independent case studies with distinct titles, routes, homepage cards, and five-step narratives.

## Status at a glance

| Workstream | Status | Notes |
| --- | --- | --- |
| Theme 2 branch and worktree | Complete | Separate from `main` |
| Theme 2 project guidance | Complete | `AGENTS.md` committed |
| Master specification | Accepted for implementation | Stored at `../PORTFOLIO_REFERENCE_SPEC.md` |
| Typeface foundation | Satoshi trial implemented | One global `--font-family-sans` token controls all typography |
| Local/Vercel environment variables | Complete | Secrets linked and gitignored |
| Content style system | Complete | Voice guide and copy deck created |
| Branch AI fact sheet | Approved | Rejected claims and ownership boundaries recorded |
| Combined Branch AI storyline | Superseded | Preserved as verified source material only |
| Independent AI case studies | Illustration source copy approved and implemented locally | Final visual QA and staging refresh remain; copywriting and prototyping are pending |
| Updated résumé source | Captured | PDF extracted, rendered, and recorded in a fact sheet |
| Other case-study copy | Not started | Follows Branch AI pilot |
| Full visual implementation | Branch AI pilot complete locally | Approved replacement direction implemented |
| Baseline build | Complete | Dependencies installed; lint and production build pass |
| Vercel staging preview | Ready | Rebuilt Branch AI pilot is protected and noindex |
| Accessibility/performance QA | Local implementation QA in progress | Lint/build and desktop/mobile browser checks pass |

## Completed work

### Repository and safety

- [x] Created the `theme-2` branch.
- [x] Created the isolated Theme 2 worktree.
- [x] Kept the `main` worktree unchanged.
- [x] Added Theme 2-specific `AGENTS.md` guidance.
- [x] Kept Theme 3 requirements out of this branch.
- [x] Established milestone commits.

### Brand decisions

- [x] Confirmed Charlie Hart as the authority for colour, typography, hierarchy, spacing, navigation, and CTAs.
- [x] Confirmed Lucas Barrientos as the case-study storytelling reference.
- [x] Confirmed Felix Lee as the Ask Lums interaction-shell reference only.
- [x] Verified Charlie's live system sans-serif stack.
- [x] Added one global `--font-family-sans` token so the typeface can change from one location.
- [x] Removed the Theme 2 webfont import from the current CSS foundation.
- [x] Confirmed that the credibility strip uses only Olumide's approved brands.
- [x] Confirmed Shiga, Branch, Carbon, Sabi, and UBA as the opening marquee sequence.

### Environment

- [x] Linked the Theme 2 worktree locally to Vercel project `lums-portfolio`.
- [x] Copied the existing local environment safely without displaying secrets.
- [x] Verified that Preview, Production, and Development have `ANTHROPIC_API_KEY`, `DATABASE_URL`, `GMAIL_USER`, `GMAIL_APP_PASSWORD`, and `ADMIN_KEY`.
- [x] Confirmed that `.env.local` and `.vercel/` remain gitignored.

### Product and content specification

- [x] Consolidated the Theme 2 reference and execution specification.
- [x] Recorded the approved homepage structure and hero copy.
- [x] Recorded the Charlie light system and approved neutral dark system.
- [x] Recorded route scope, preserved functionality, and archived-route exclusions.
- [x] Recorded résumé facts, `6+ years`, employment chronology, and Sabi as project-only work.
- [x] Recorded Ask Lums placement and preserved API behaviour.
- [x] Created [Content Style Guide](CONTENT_STYLE_GUIDE.md).
- [x] Created [Theme 2 Copy Deck](content/COPY_DECK.md).
- [x] Defined the voice as Charlie's seniority, Lucas's expressiveness, and Olumide's confirmed ownership.

### Branch AI

- [x] Audited the current case study, homepage, knowledge base, résumé, article, and assets.
- [x] Created and approved the [Branch AI Fact and Ownership Sheet](content/fact-sheets/BRANCH_AI.md).
- [x] Recorded Arushi's co-design and FigJam ownership.
- [x] Recorded the design team's colour-system and final-review ownership.
- [x] Recorded Olumide's ownership of instructions, manifest, JSON rules, material catalogue, render pipeline, generation, and refinement.
- [x] Recorded Deovrat's one-to-one alignment check-ins.
- [x] Recorded the product manager's CopyGPT rollout ownership.
- [x] Removed the unprovable `500+ tool uses` claim.
- [x] Kept `500+ illustration-generation iterations` as a separate approved metric.
- [x] Removed the personal poll claim and retained only the approved team-poll result.
- [x] Approved CopyGPT measurement and Neem's directional 30% faster-evaluation result.
- [x] Created [Branch AI Storyline and Phase Labels](content/outlines/BRANCH_AI_STORYLINE.md).
- [x] Synthesised the UXfolio webinar into recruiter-first card, concise overview, decision, visual-evidence, and outcome rules.
- [x] Replaced the vague Branch AI working title with an informative title and subtitle.
- [x] Reopened the Branch AI title after owner feedback and documented three output-consistency directions.
- [x] Approved `Turning fragmented AI use into consistent product outputs at Branch` as the case title.
- [x] Approved the Branch AI narrative direction, story order, and five phase labels.
- [x] Wrote the complete [Branch AI Case Study Draft](content/drafts/BRANCH_AI_CASE_STUDY.md).
- [x] Received owner approval for the full Branch AI copy, subtitle, learning statements, and media captions.
- [x] Implemented the approved recruiter-first story in the active Branch AI route.
- [x] Mapped the approved copy to existing evidence media and corrected mismatched hero and illustration assets.
- [x] Added accessible sticky phase navigation and preserved full-size image zoom.
- [x] Updated the active Home card and Branch metadata with the approved title and framing.
- [x] Verified the compiled production page on desktop and at 390px, including hash navigation and image zoom.
- [x] Confirmed zero browser warnings/errors during the local production check.
- [x] Recorded owner rejection of the first visual treatment without changing the approved content flow.
- [x] Re-verified Charlie's live typeface, display weight, light canvas, and hierarchy.
- [x] Studied the supplied Jessa case studies for type scale, editorial spacing, and evidence rhythm.
- [x] Created the [Branch AI Visual System Reset](content/specs/BRANCH_AI_VISUAL_SYSTEM.md) for owner confirmation.
- [x] Changed the Theme 2 default to light while preserving an optional persisted dark mode.
- [x] Replaced the public `Recruiter TLDR` label with `Overview`.
- [x] Removed Product markets from public metadata.
- [x] Updated Tools to ChatGPT, Claude, and Figma Make.
- [x] Added 500 other Branch employees to Core users.
- [x] Recorded owner approval of the split hero, connected horizontal rail, white/warm-neutral canvas, and black active state.
- [x] Installed the supplied Satoshi variable webfont and retained the Fontshare license.
- [x] Rebuilt the global navigation as a minimal editorial shell.
- [x] Rebuilt Branch AI with open metrics, restrained rules, wide evidence, and warm chapter bands.
- [x] Added scroll-aware `aria-current="step"` progress tracking and mobile active-step centring.
- [x] Limited public market country names to Team locations.
- [x] Routed Selected work breadcrumbs and `/work` to the landing-page `#featured-work` section.
- [x] Constrained the progress line between steps 1 and 5 and moved the rail onto the warm-neutral canvas.
- [x] Replaced numbered phase eyebrows with semantic chapter labels.
- [x] Reworked narrative sections into Jessa's single-column reading pattern with a 760px measure.
- [x] Increased desktop body copy to 20px and reduced section-heading scale to approximately 54px.
- [x] Corrected the overview workflow list so each description uses the full row width.
- [x] Replaced the combined public-case direction with three independent AI case studies.
- [x] Defined the Illustration case study as a five-step narrative.
- [x] Recorded the emotional writing standard, short-form requirement, and no-em-dash rule.
- [x] Preserved the combined case study as source material instead of deleting it.
- [x] Flagged the new `10,000 text components` and `five days` claims for fact confirmation.
- [x] Approved `Building an AI illustration system for consistent, on-brand product visuals at Branch`.
- [x] Created the independent `/work/ai-illustration-system` route.
- [x] Added the approved five-step progress rail and content-intake scaffold.
- [x] Kept the incomplete Illustration page off the homepage until its narrative is approved.
- [x] Analysed the supplied Illustration GPT archive across all six documented versions.
- [x] Recorded the material, governance, colour-system, and validation changes from v1 through v6.
- [x] Synthesised the requested article sections while preserving Olumide's confirmed ownership boundaries.
- [x] Created the standalone [AI Illustration System Fact Sheet](content/fact-sheets/AI_ILLUSTRATION_SYSTEM.md).
- [x] Wrote the complete [AI Illustration System Case Study Draft](content/drafts/AI_ILLUSTRATION_SYSTEM_CASE_STUDY.md).
- [x] Approved the revised anchors: The missing layer, Finding a visual language, From assets to a system, Making consistency enforceable, and What shipped.
- [x] Rewrote the Illustration source copy around the approved anchors, the clarified Neem context, verified v1.6 code evidence, and six evidence-backed iterations.
- [x] Limited the revised narrative to three first-person pronouns and removed unresolved access, competitor, material-count, and tolerance claims.
- [x] Corrected the Illustration workstream timeline to December 2025 through February 2026.
- [x] Corrected the Illustration tools to ChatGPT, FigJam, and Figma.
- [x] Reframed the opening ownership paragraph around uncertainty, research, failed outputs, design QA, and review before the final architecture emerged.
- [x] Approved and applied the Illustration subtitle describing the reusable AI workflow, Custom GPT, natural-language requests, and consistent 3D outputs.
- [x] Replaced the Illustration scaffold with the complete five-step narrative and evidence sequence.
- [x] Verified the Illustration page on desktop and mobile, including rail progress, overflow, and browser errors.
- [x] Audited the Illustration page against `AGENTS.md`, the master specification, content style guide, copy deck, visual specification, fact sheets, and copy draft.
- [x] Removed unresolved public claims and documented the material-count conflict.
- [x] Corrected body size, metadata size, weight hierarchy, rail contrast, initial hash positioning, image-viewer focus management, and reduced-motion behaviour.
- [x] Published the [AI Illustration Case Study QA Report](content/reviews/AI_ILLUSTRATION_QA.md).
- [x] Extracted and visually verified the updated three-page résumé supplied on 2026-06-27.
- [x] Created the [Résumé Fact Sheet](content/fact-sheets/RESUME.md) as the new career source.

## Remaining work

### Milestone 1 — Finish setup and create staging

- [x] Confirm the master specification is accepted as the Theme 2 source of truth.
- [x] Reconcile the original-worktree snapshot; exclude the conflicting legacy `DESIGN.md`, `PRODUCT.md`, and `.impeccable` output from Theme 2.
- [x] Install dependencies with `npm ci`.
- [x] Run the baseline `npm run lint` and `npm run build`.
- [x] Resolve baseline lint errors without redesigning unrelated interfaces.
- [x] Patch production dependency advisories and verify `npm audit --omit=dev` reports zero vulnerabilities.
- [x] Push `theme-2` to GitHub.
- [x] Create a Vercel Preview deployment.
- [x] Apply and verify `noindex` on Preview.
- [x] Add the staging URL to this document.

### Milestone 2 — Finish approved copy before layout

#### Global and Home

- [ ] Review and approve the About-preview draft in the copy deck.
- [ ] Review and approve selected-work heading, intro, and card premises.
- [ ] Review and approve career-timeline summaries.
- [ ] Review and approve contact copy.
- [ ] Confirm the remaining logo order after UBA.

#### Independent Branch AI case studies

- [x] Replace the combined Branch AI public architecture with three independent cases.
- [x] Approve the Illustration AI title and revised five progress labels.
- [x] Write the complete revised Illustration AI source narrative.
- [x] Analyse the six supplied Illustration GPT system versions.
- [x] Map the Illustration AI copy to the supplied media and captions.
- [x] Implement and QA the Illustration AI type scale, section rhythm, connected progress rail, canvas treatment, hero composition, deep links, and image viewer.
- [x] Review and approve the revised Illustration AI wording and visual sequence.
- [x] Implement the approved rewrite on the public route.
- [x] Complete final desktop and mobile visual QA for the approved rewrite.
- [ ] Refresh the staging preview with approval.
- [ ] Create and approve the copywriting case fact sheet, title, narrative, and preview.
- [ ] Create and approve the prototyping case fact sheet, title, narrative, and preview.

#### Remaining pages and projects

- [ ] Create and approve the About fact sheet.
- [ ] Write and approve the full About page.
- [ ] Audit, outline, write, and approve Shiga.
- [ ] Audit, outline, write, and approve Carbon.
- [ ] Audit, outline, write, and approve Sabi.
- [ ] Audit, outline, write, and approve UBA.
- [ ] Update résumé web copy from the supplied PDF, excluding the rejected Branch usage claim.
- [ ] Update Ask Lums knowledge from approved facts only.
- [ ] Finalise Work index and 404 copy.

### Milestone 3 — Brand foundations and global shell

- [ ] Implement the approved light and dark colour tokens.
- [ ] Implement Charlie's complete type hierarchy using the global font token.
- [ ] Implement primary and secondary CTA primitives.
- [x] Rebuild global navigation and mobile menu.
- [ ] Place theme and music controls at the top-right.
- [ ] Add skip link, focus styles, landmarks, and reduced-motion foundations.
- [ ] Build reusable editorial layout and spacing primitives.

### Milestone 4 — Homepage, About, and Ask Lums

- [ ] Build the approved hero and desktop hover-media reveal.
- [ ] Remove the existing ripple-grid/five-tap easter egg.
- [ ] Build the approved client-logo marquee using only Olumide's brands.
- [ ] Build the expanding About preview.
- [ ] Build grouped selected work.
- [ ] Build manual recommendations without autoplay or a trailing CTA.
- [ ] Build the résumé-based career timeline.
- [ ] Build contact.
- [ ] Retheme Orbital Skills on About.
- [ ] Replace Ask Lums presentation with the Felix-inspired launcher, desktop panel, and mobile bottom sheet.
- [ ] Keep Ask Lums limited to Home and About.

### Milestone 5 — Case-study system and Branch AI

- [ ] Build shared case-study hero, metadata, metrics, prose, quote, table, gallery, and next-project primitives.
- [x] Build accessible sticky project-specific phase navigation for the Branch AI pilot.
- [ ] Build accessible scrollable device frames for genuinely long assets.
- [x] Preserve zoomable media in the Branch AI pilot.
- [x] Implement the approved Branch AI case study.
- [ ] Review the Branch AI staging page with Olumide.

### Milestone 6 — Remaining case studies and utility routes

- [ ] Implement approved Shiga copy and preserve its embedded prototype.
- [ ] Implement approved Carbon copy.
- [ ] Implement approved Sabi copy.
- [ ] Implement approved UBA copy.
- [ ] Retheme the Work index.
- [ ] Update and retheme the résumé route while preserving Print and Download PDF.
- [ ] Retheme the custom 404.
- [ ] Remove the obsolete duplicate `app/work/[id]/page.js`.
- [ ] Leave archived `*-v1` routes unchanged.

### Milestone 7 — QA and final preview

- [ ] Add Playwright route and interaction coverage.
- [ ] Add automated axe checks.
- [ ] Complete keyboard and focus-management review.
- [ ] Verify reduced motion and 200% text reflow.
- [ ] Test light/dark themes and music controls.
- [ ] Test Ask Lums streaming, clearing, copying, rate limiting, and failures.
- [ ] Test Chrome, Safari, Firefox, iOS, and Android layouts from 360px to 1440px+.
- [ ] Meet WCAG 2.2 AA.
- [ ] Target LCP below 2.5s, CLS below 0.1, INP below 200ms, and Lighthouse 90+.
- [ ] Run final lint and production build.
- [ ] Publish the final noindex Vercel Preview for owner review.

## Staging environment

| Item | Status |
| --- | --- |
| Vercel project | `lums-portfolio` linked locally |
| Required environment variables | Available for Preview |
| Remote `theme-2` branch | Pushed and tracking `origin/theme-2` |
| Preview deployment | Standalone Illustration AI narrative; Ready and protected by Vercel authentication |
| Preview `noindex` | Verified: response header plus `robots.txt` disallow |
| Staging URL | [Theme 2 Illustration AI Preview](https://lums-portfolio-git-theme-2-theenactorists-projects.vercel.app/work/ai-illustration-system) |

## Milestone commits

- `1dab1f9` — Theme 2 project guidance
- `b64da58` — Centralised Charlie typography stack
- `b381b45` — Content system, copy deck, and first fact sheet
- `e5eca43` — Branch AI ownership corrections
- `a24477a` — CopyGPT rollout ownership correction
- `bb8a8dc` — Approved Branch AI facts and storyline draft
- `5e1a358` — Visible Theme 2 progress dashboard
- `853f2b1` — Concise case-study framing and UXfolio synthesis
- `379dbb8` — Updated progress milestone and approval gate
- `eba171f` — First output-purpose title revision
- `52cae63` — Verified résumé source and reopened output-consistency title direction
- `785ef12` — Recorded the latest content milestones
- `d6b4e5b` — Approved Branch AI storyline and complete case-study draft
- `7f5d198` — Recorded the Branch AI draft milestone
- `1963dfe` — Removed the unnecessary retrospective prompt
- `a5157d7` — Recorded the approved retrospective decision
- `45be3ae` — Implemented the approved Branch AI case study and preview foundations
- `c34ed78` — Rebuilt Branch AI with Satoshi and the approved editorial visual system
- `9ab9a1b` — Built the standalone Illustration AI case study and six-version evidence narrative

## Next three actions

1. Complete desktop and mobile visual QA for the approved Illustration case study.
2. Refresh the protected staging preview with Olumide's approval.
3. Link the approved case study from selected work, then begin the independent copywriting case study.
