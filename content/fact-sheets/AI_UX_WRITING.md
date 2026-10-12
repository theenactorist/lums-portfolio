# CopyGPT: current UX-writing facts and direction

Updated: 1 October 2026\
Authority: Olumide's latest direct feedback, earlier owner-confirmed project facts, and the primary sources identified below. On 1 October 2026, Olumide approved the complete current prose with “this prose is good, let's lock it in.” The final case-study layout and visitor harness remain separate implementation work.

## Owner-confirmed facts

- The purpose was to standardise UX writing in Branch's voice, with consistent tone, casing and product/market context, and reduce repeated discussion about what wording worked. This supersedes the earlier framing of the goal as automating copywriting.
- Olumide owned the project from discovery through implementation, with substantial help from colleagues. He packaged Branch's brand principles, product context and design-system rules as an agent skill. The internal name is CopyGPT.
- Product, design, engineering, marketing and customer support were the teams served. The markets were India, Kenya and Nigeria. Use “every team” to communicate reuse across those teams. No numerical adoption or accuracy claim is established.
- Reviewing a single line could consume 20 minutes of a design-review session. This is an owner-reported example of the problem, not a measured average or a measured time saving.
- Colleagues created copy using Gemini, ChatGPT, Claude, Perplexity and Google Search. There was no shared base of product and component guidance governing their outputs. Initially the documented UX-writing guidance was the brand principles.
- Other product designers helped collect/scrape and clean feature documentation for their markets. They wrote product overviews and flow steps. This became the core product-context dataset supplied to the LLM.
- The team collectively defined component guardrails: category, use case, tone, character limit, word count, sentence phrasing, casing, punctuation, principles, good/bad examples and rationale. Olumide owned lint and version tuning.
- Olumide researched common LLMs and reviewed literature on how they were built, then developed an algorithm/set of instructions for context identification, reference selection, generation and validation. No named papers or numerical evaluation method have been supplied.
- Owner's firsthand learnings: richer, more specific product/market context required more documentation and helped the model fit its writing to that context; initial team component rules in Google Sheets mixed equivalent labels (Accordion header/body versus Text Block title/description), causing repeated failures in his first algorithm attempt, which he addressed through data cleanup and consistent naming; initial research became overanalysis, while writing the algorithm and assembling JSON references made the work clearer. Keep this first-attempt experience distinct from the later v6 List schema inconsistency. Do not generalise to “more data always improves output” or claim every final component uses the same slot names.
- The prototype sequence was ChatGPT Custom GPT → Claude Project → Claude Skill. The team judged Claude stronger for this writing task. The final harness was Claude Chat with the Skill enabled.
- Historical Claude Chat input methods included text, screenshot attachments, Figma links, voice and screen sharing. These are owner-confirmed harness methods, not a claim that every method is built into the portfolio API demo.
- For implementation, Olumide collaborated with one product manager and one engineer from each market. This latest owner description supersedes the older India/Africa two-workstream staffing summary.
- Original/proposed copy and rationale were reviewed in a shared Google Sheet. Engineers implemented changes that passed review, then the tracker was updated and the next screenshot batch reviewed.
- The confirmed role is Product Designer, AI Systems; the project timeline is 25 August 2025 to 5 March 2026.

## Source-verified technical facts

- `Copy Writing GPT.pdf`, first column, contains ten brand principles. Preserve their exact names when reproducing that list. Branch's user-facing copy rules do not prohibit technical terms in the portfolio narrative.
- `UI Components Guidelines.csv` contains 30 component rows and 13 fields. The final v7 component JSON defines 30 component types and 45 individual text slots. Original documentation and v7 operational constraints are related but not identical; identify their source in the explorer.
- The v7 package consists of the operating guide and six JSONs: brand, components, markets, heuristics, Material mapping and lint. The later Claude Skill consists of `SKILL.md` and six Markdown references. Do not merge these into one concurrently executing package.
- v7 defines 30 lint checks and nine validation steps. These are instructions the LLM follows, not a separately executing deterministic validator or a measured accuracy score.
- Market requirements take precedence, followed by component rules, brand defaults and heuristics/fallbacks. v7 requests five copy options by default and normally hides internal rules in its responses.
- Component recognition uses synonyms, visual cues and design-system mappings. Missing market or unidentifiable component should be clarified. The available files establish instruction-based recognition, not supervised image training or fine-tuning. A clarification about the owner's use of “visually trained” is pending; do not invent model-weight training.
- Detailed flow context in v7 is Nigeria-specific. Do not claim equal flow-model coverage in all three markets.
- Seven version folders prove seven iterations of the files. They do not prove seven successful releases, seven user-testing rounds, or measured improvement after each change.

## Results and calculation boundaries

- Owner-confirmed cross-market outcome: the product team implemented 1,778 copy changes. Supporting summary scope: 530 screen-flow appearances and 4,390 UI component instances. Kenya/Nigeria figures include directional estimates; these are not three independently audited datasets.
- Fresh India-only analysis: 617 entries have Implemented status and differing original/new text. Of these, 178 change capitalisation alone: 28.8%. Count component instances, not unique strings.
- Additional read-only text comparison: 346 entries change wording (56.1%) and 180 change punctuation (29.2%). These overlap in 125 entries (20.3%). Wording compares ordered word tokens while ignoring case, apostrophes within words and numeric/date formatting; punctuation compares mark sequences and excludes separators within numbers. These derived categories are not original tracker labels. Definitions, edge cases and reproducible script: `content/reviews/copywriting-2026-10-01/TRACKER_CHANGE_CATEGORIES_2026-10-01.md`. Do not add the overlapping percentages or use a pie chart.
- Strict casing comparison preserves punctuation, digits and whitespace, allowing only alphabetic case changes. CRLF/CR are normalised to LF; no Unicode compatibility normalisation is performed. Trimming whitespace would yield 179 and is not used for the public count.
- Top India implemented changed components: Text Block 176; Info Text 139; Data Display 70; Primary Button 45. Detailed audit: `content/reviews/copywriting-2026-10-01/TRACKER_METRICS_AUDIT_2026-10-01.md`.
- Tone and context do not have original categorical counters in the tracker. Do not present keyword tags from free-text rationale as original measured impact categories.
- Eight cleared India before/after pairs remain exact. The two PAN states are now grouped into one comparison with the original shown once. v7 rules explain aligned guidance, but the tracker does not establish which version generated each historical rewrite.

## Current deliverables and next scope

- Locked, owner-approved prose: `content/drafts/BRANCH_UX_WRITING_PROSE.md`. Approval and file hash: `content/reviews/COPYGPT_PROSE_APPROVAL_2026-10-01.json`. Older dated drafts are historical. Preserve this wording during UI implementation; further content changes follow the owner's explicit direction.
- Prose and framework reading preview: `/review/copygpt-prose.html`. The explorer covers the ten principles, thirty components/forty-five slots, and three markets. A vertical request-to-response diagram shows the documented v7 algorithm, with clarification and revision branches. The historical chat interaction is distinguished from the model's instructed processing sequence. Conflict-policy scenarios are labelled illustrative applications, not recorded model responses. It is a local review artifact, not an approved final case-study UI.
- Reading sequence: introduction/coverage → why → discovery → product data/component guardrails → LLM research/prototyping → iterations → v7 workflow → Skill packaging → implementation → results/examples → learnings → visitor chat.
- Use UX writing for the work. Retain CopyGPT as the internal name. Use technical terms where appropriate: LLM, model, harness, algorithm, JSON, Skill and lint.
- The visitor harness will be a single chat with text and app screenshots, powered by Sonnet 5.5 through the API using v7. The demo uses Branch's product, market, brand and component data. No Audit/Rewrite/Write mode selector or mandatory component/market form.
- The model connection remains the final implementation step. The production case-study UI still needs rebuilding. Publication has not been authorised.

## Source locations

- Owner-supplied materials: `/Users/olumide/Documents/Vibe coding/Portfolio/AI Initiatives at Branch/Copywriting AI/`.
- Original tracker: `/Users/olumide/Downloads/[Branch] CopyGPT Tracker.xlsx`, inspected read-only.
- Older detailed audit and presentation history: `content/drafts/AI_COPYWRITING_CASE_STUDY_SOURCE.md`. Consult for provenance; it does not override these latest facts or current interaction direction.
