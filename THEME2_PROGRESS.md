# Theme 2 Progress Dashboard

Last updated: 2026-06-27  
Branch: `theme-2`  
Worktree: `Theme 2/lums-portfolio`  
Current stage: First Branch AI staging review

## Current gate

**The first protected, noindex Vercel Preview is ready for Olumide's Branch AI staging review.**

Review: [Branch AI Case Study Draft](content/drafts/BRANCH_AI_CASE_STUDY.md)

Staging: [Open the Theme 2 Branch AI Preview](https://lums-portfolio-9c9dsy3sg-theenactorists-projects.vercel.app/work/branch-ai)

The approved copy is mapped into the live Branch AI route and existing evidence media. Local production QA and authenticated deployment checks are complete. The Preview remains protected by Vercel authentication and blocked from indexing.

## Status at a glance

| Workstream | Status | Notes |
| --- | --- | --- |
| Theme 2 branch and worktree | Complete | Separate from `main` |
| Theme 2 project guidance | Complete | `AGENTS.md` committed |
| Master specification | Accepted for implementation | Stored at `../PORTFOLIO_REFERENCE_SPEC.md` |
| Typeface foundation | Complete | Charlie's system stack controlled by one CSS token |
| Local/Vercel environment variables | Complete | Secrets linked and gitignored |
| Content style system | Complete | Voice guide and copy deck created |
| Branch AI fact sheet | Approved | Rejected claims and ownership boundaries recorded |
| Branch AI storyline | Approved | Title, story order, and five phase labels confirmed |
| Branch AI complete copy | Approved and implemented | Full recruiter-first draft and media captions are live in the Theme 2 route |
| Updated résumé source | Captured | PDF extracted, rendered, and recorded in a fact sheet |
| Other case-study copy | Not started | Follows Branch AI pilot |
| Full visual implementation | In progress | Branch AI pilot is implemented; the global Theme 2 shell remains a later milestone |
| Baseline build | Complete | Dependencies installed; lint and production build pass |
| Vercel staging preview | Ready for review | Protected Preview is deployed and verified |
| Accessibility/performance QA | Pilot checks complete | Branch AI desktop/mobile, anchor navigation, image zoom, and browser logs verified locally; full-site QA remains |

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
- [x] Synthesised the UXfolio webinar into recruiter-first card, TLDR, decision, visual-evidence, and outcome rules.
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

#### Branch AI pilot

- [x] Approve the Branch AI title.
- [x] Approve the five sticky phase labels.
- [x] Approve the story order and chapter balance.
- [x] Write the complete Branch AI case-study draft.
- [x] Review and approve the subtitle, summary, complete wording, learning statements, and media captions.
- [x] Map approved copy to existing media and captions.

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
- [ ] Rebuild global navigation and mobile menu.
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
| Preview deployment | Ready; protected by Vercel authentication |
| Preview `noindex` | Verified: response header plus `robots.txt` disallow |
| Staging URL | [Theme 2 Branch AI Preview](https://lums-portfolio-9c9dsy3sg-theenactorists-projects.vercel.app/work/branch-ai) |

## Milestone commits

- `1dab1f9` — Theme 2 project guidance
- `b64da58` — Centralised Charlie typography stack
- `b381b45` — Content system, copy deck, and first fact sheet
- `e5eca43` — Branch AI ownership corrections
- `a24477a` — CopyGPT rollout ownership correction
- `bb8a8dc` — Approved Branch AI facts and storyline draft
- `5e1a358` — Visible Theme 2 progress dashboard
- `853f2b1` — Recruiter-first case-study framing and UXfolio synthesis
- `379dbb8` — Updated progress milestone and approval gate
- `eba171f` — First output-purpose title revision
- `52cae63` — Verified résumé source and reopened output-consistency title direction
- `785ef12` — Recorded the latest content milestones
- `d6b4e5b` — Approved Branch AI storyline and complete case-study draft
- `7f5d198` — Recorded the Branch AI draft milestone
- `1963dfe` — Removed the unnecessary retrospective prompt
- `a5157d7` — Recorded the approved retrospective decision
- `45be3ae` — Implemented the approved Branch AI case study and preview foundations

## Next three actions

1. Olumide reviews the Branch AI staging page and confirms the implemented story, hierarchy, and evidence sequence.
2. Resolve any staging feedback without changing approved facts or ownership.
3. Continue the remaining global copy gates, then implement the full Charlie-inspired Theme 2 shell.
