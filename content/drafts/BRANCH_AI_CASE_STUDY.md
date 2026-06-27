# Branch AI Case Study Draft

Status: Superseded as a combined public case study; preserved as a content source
Last updated: 2026-06-27
Fact source: `content/fact-sheets/BRANCH_AI.md`
Approved outline: `content/outlines/BRANCH_AI_STORYLINE.md`

Approval record: Olumide approved the complete copy on 2026-06-27. On the same date, he replaced the combined structure with three independent case studies. Reuse only verified facts and ownership details when writing the new standalone cases.

## Selected-work card

### Title

> Turning fragmented AI use into consistent product outputs at Branch

### Description

> I built reusable workflows for on-brand illustrations, market-aware product copy, and Neem-based prototypes for Branch’s product teams.

### Labels

- Product Designer, AI Systems
- 2025–2026
- AI systems / Fintech

### CTA

> Read case study →

## Case-study hero

### Eyebrow

> Branch International · AI systems

### Title

> Turning fragmented AI use into consistent product outputs at Branch

### Subtitle

> How I built reusable workflows for on-brand illustrations, market-aware product copy, and Neem-based prototypes for Branch’s product teams.

### Metadata

| Field | Public copy |
| --- | --- |
| Role | Product Designer, AI Systems |
| Initiative | October 2025–February 2026 |
| Core users | 5 designers, 4 UX researchers, 15 product managers, and 500 other Branch employees |
| Team locations | Nigeria, Kenya, India, United States |
| Tools | ChatGPT, Claude, Figma Make |

## Overview

### The situation

Branch's product team was already using ChatGPT, Claude, and Gemini. The problem was not access to AI. It was that every person brought different context, prompts, and quality standards, so the outputs did not reliably reflect the same products, markets, visual language, or design system.

### My role

I treated the opportunity as an internal-product problem. I built the core systems behind three workflows for illustration, product copy, and prototyping, while working within clear team ownership boundaries. Designers helped frame the illustration problem and defined the colour system. The product team implemented approved copy changes. A product manager led CopyGPT rollout.

### The solution

I encoded reusable Branch context into three workflows:

1. Illustration GPT for consistent product illustrations.
2. CopyGPT for product-, market-, component-, and lint-aware copy.
3. Neem DS Prototyper for turning product requirements into interactive prototypes grounded in Branch patterns.

### What changed

- The shared illustration system is live across all product markets after more than 500 image-generation iterations.
- CopyGPT supported a review of 530 screens and 4,390 components; the product team implemented 1,778 changes, and human-reviewed accuracy moved from 95% to 99%.
- Directional feedback from product managers suggested the Neem DS Prototyper reduced PRD evaluation time by about 30%.

These are three distinct outcomes. They should not be presented as one combined adoption or usage claim.

## Opening — The outputs finally looked like one product

The most visible change is in Branch's illustrations. A shared visual system is now live across Branch's product markets, giving the team a repeatable way to create images that belong to the same product family.

But illustration was only one part of the programme. The same consistency problem appeared in product copy and prototypes: AI could produce something quickly, but it did not automatically know Branch's products, market language, component rules, or interaction patterns.

Speed was already available. Consistency was not.

The work became an initiative to turn individual AI use into three reusable product workflows—each with encoded context, versioned rules, testing, and human approval.

## Phase 1 — Why AI outputs kept drifting

### Fast outputs. Different versions of Branch.

A product-team poll confirmed that AI was already part of the work: 65% of respondents used ChatGPT, 20% used Claude, and others used Gemini. Adoption was not the constraint. Reliability was.

The failure looked different in each workflow, but the underlying issue was the same. General-purpose AI did not carry enough Branch context to make a dependable product decision.

### Illustration drift was immediately visible

Other designers and I identified a recurring illustration-consistency problem. Generations could vary in colour, materials, lighting, perspective, distribution, and state treatment. Even when individual images looked polished, a group of them could feel as if it belonged to different products.

The team needed more than additional illustrations. It needed one visual language that could survive repeated generation across product surfaces and markets.

### Polished copy could still be wrong

Generic AI copy often sounded plausible while missing product truth. It did not know which products existed in each market, which terms people used locally, how Branch should sound, or what a specific component allowed.

A sentence could be grammatically correct and still fail the interface.

### Generic prototypes missed the product system

Claude could turn an idea into a rough prototype, but those first outputs did not understand Neem components, Branch interaction patterns, token constraints, or product-flow conventions.

That made them useful for exploration but less effective for alignment. Stakeholders could react to the concept, yet the prototype still required translation before it reflected how Branch products actually worked.

### The brief changed

Better prompts could improve one result. Branch needed systems that could improve the next result—for the next person, market, and release.

## Phase 2 — Turning prompts into systems

### The system became the product

I reframed each workflow as an internal product with users, jobs, failure modes, rules, tests, and approval points. Instead of asking people to rebuild context inside every prompt, I focused on encoding that context once and making it reusable.

The three workflows followed the same operating principle:

1. Start with a product task or source input.
2. Add Branch-specific product, market, visual, or design-system context.
3. Apply explicit rules and constraints.
4. Generate a reviewable output.
5. Keep human judgment at the approval point.
6. Turn repeated feedback into the next version of the system.

Governance did not mean removing judgment. It meant deciding which context should be repeatable and which decisions still needed a person.

### Ownership stayed visible

I built the core systems, but the work was collaborative.

- Other designers helped identify the illustration-consistency problem.
- Arushi and I explored the illustration direction; she ran the FigJam vote.
- I led three public review sessions.
- The design team defined the colour system and owned final illustration review and selection.
- The team defined CopyGPT's brand and market rules; I owned the component and lint rules and version tuning.
- The product team implemented approved copy changes, and the product manager led rollout.
- Product managers, designers, and developers tested the prototyping workflow.
- Deovrat provided one-to-one check-ins that kept the work aligned with the objective.

## Phase 3 — Three workflows in practice

### Workflow 01 — Teaching AI a visual language

#### Aligning before automating

The illustration work began by agreeing on what “consistent” should mean.

Arushi and I explored visual directions, I led three public review sessions, and Arushi ran the FigJam vote. The design team then defined a 60/25/10/5 colour structure for the selected direction.

This mattered because a generation system could only be as coherent as the decisions encoded inside it. Automating an unresolved style would have scaled the disagreement.

#### Separating the system into four responsibilities

I organised the Illustration GPT around four layers:

1. **Instructions** defined the system's behaviour and non-negotiable requirements.
2. **Manifest** handled operating logic and routing.
3. **Rules** expressed style, colour, camera, and prompt contracts in JSON.
4. **Materials** translated the visual language into a catalogue of 15 surface recipes.

I wrote the system instructions and JSON rules, built the manifest and material catalogue, and designed the render pipeline. The colour logic inside the rules came from the system defined by the design team.

Separating these responsibilities made the workflow easier to tune. A recurring material problem could become a material rule without rewriting the entire system. A camera or colour failure could be isolated and corrected at the layer responsible for it.

#### Two entry points, one quality pipeline

The system supported two ways to begin:

- **Render Mode** started with a reference image.
- **Ideation Mode** started with a structured concept.

Both modes entered the same render pipeline. An implemented material-realism gate could rerender an output up to twice before escalating it to a person.

The gate did not select the final illustration. It caught repeatable failures before review, while the design team retained responsibility for quality review and final selection.

#### Turning repeated failures into rules

The workflow progressed through six major versions and more than 500 image-generation iterations, often requiring 10–15 iterations for a final illustration.

I generated and refined the outputs. When colour, material, lighting, camera, or composition drift appeared repeatedly, I converted that feedback into a constraint or negative rule for the next version.

The goal was not to eliminate iteration. It was to make each round teach the system something reusable.

The resulting illustration system is now live across all Branch product markets. An exact illustration total is intentionally excluded because the available sources conflict.

### Workflow 02 — Turning product context into reusable copy rules

#### The problem was not grammar

Generic AI could rewrite a sentence, but it did not know whether that sentence was true for a product, market, or component. CopyGPT needed to work across brand voice, product terminology, market rules, interface behaviour, character constraints, casing, heuristics, and lint requirements.

The team defined the brand and market rules. I owned the component and lint rules and tuned the system through seven documented versions.

#### Rules needed room to breathe

The tuning process exposed two opposite risks. Under-specified rules allowed product and market context to drift. Over-strict rules could flatten the writing or reject useful variation.

The system therefore needed versioning rather than a single “perfect” prompt. Human review revealed where a rule was missing, ambiguous, or too rigid; that evidence then informed the next version.

#### Measuring the review work

The workflow supported a review of 530 screens and an audit of 4,390 components. The product team implemented 1,778 copy changes.

The most mature market totals were audited. Figures for the other markets included directional estimates, so the case study should preserve that limitation rather than presenting every market number as equally precise.

Human review measured accuracy moving from 95% to 99%. The workflow also reduced copywriting turnaround, although no approved quantified turnaround figure is available.

The product manager led rollout across Branch's product markets. The screen and component audit was a team workflow, not my sole output.

### Workflow 03 — Making product requirements tangible sooner

#### A prototype is only useful when people can trust its context

Generic Claude prototypes could make a product idea visible, but they did not reliably use Neem components or Branch UX patterns. That gap weakened their value as tools for evaluating a product requirement.

I created a workflow that moved through six connected stages:

1. A product requirements document or product idea.
2. Claude Skill interpretation.
3. Figma Make and Neem Design System context.
4. A token-compliant React prototype.
5. Stakeholder review of the interaction.
6. PRD refinement before high-fidelity design.

The workflow brought product requirements, design-system context, and working interaction closer together. Instead of reacting only to written intent, stakeholders could respond to what the proposed flow actually did.

#### Testing across disciplines

Product managers, designers, and developers tested the workflow. Directional feedback from product managers suggested that interactive prototypes reduced PRD evaluation time by about 30%.

This was not a measured production-speed claim. It was feedback about the time required to evaluate and refine a product requirement.

## Phase 4 — Testing with the product team

### Governance did not remove judgment

The workflows handled repeatable context, but people still made the consequential decisions.

For illustrations, the system could check material realism and rerender known failures; the design team still decided whether the image communicated the right idea and belonged in the product.

For copy, rules could surface product, market, component, and lint issues; people still judged clarity, tone, and the final change.

For prototypes, the workflow could apply Neem context and generate an interaction; product managers, designers, developers, and stakeholders still evaluated whether the product direction was worth pursuing.

Human review was not a fallback. It was part of the architecture.

### Showing the paths that did not work

The case-study visuals should make the iteration visible without turning the page into a process archive:

- Compare illustration directions that drifted in colour, materials, camera, or consistency with the selected direction.
- Annotate how repeated illustration failures became rules or negative constraints.
- Show an under-specified CopyGPT result beside an over-strict result, then explain the rule change between them.
- Contrast a generic prototype with a later output using Neem patterns and tokens.

Each comparison should explain what changed and why the abandoned path was not strong enough.

### Recognition

> “He is an AI-native builder with a designer's eye and a PM's brain.”

— Deovrat Dwivedi, Design Lead, Branch International

This quote is recognition of the work, not evidence for a product outcome.

## Phase 5 — Outcomes and learning

### What changed

The programme gave the team reusable Branch context across three different kinds of product work.

#### Illustration GPT

- A shared illustration system is live across all product markets.
- The system progressed through six major versions and more than 500 image-generation iterations.
- The design team retained final review and selection.

#### CopyGPT

- Review moved beyond generic rewriting toward product-, market-, component-, and lint-aware validation.
- The workflow reviewed 530 screens and audited 4,390 components.
- The product team implemented 1,778 changes.
- Human-reviewed accuracy moved from 95% to 99%.

#### Neem DS Prototyper

- Product requirements could be evaluated through an interactive, Neem-aware prototype instead of text alone.
- Directional product-manager feedback suggested about 30% faster PRD evaluation.

The shared outcome was not “more AI.” It was less dependence on each person's ability to reconstruct Branch context from scratch.

### What I learned

The strongest AI workflow was rarely the one with the cleverest prompt. It was the one with the clearest context architecture.

I also learned that guardrails need active tuning. Too little structure produces drift. Too much structure makes the output rigid. Versioning created a practical way to manage that tension without pretending the rules were ever finished.

Most importantly, building internal AI tools required the same product thinking as customer-facing work: understand the user, make failure visible, test with real tasks, define ownership, and keep judgment at the right point in the system.

### Future potential

The illustration workflow could eventually support controlled external-agency access. That remains future potential, not a shipped capability or commitment.

## Case-study ending

- Back to selected work
- Next case study → Shiga onboarding

## Media and annotation copy

### Programme overview

Asset: `cover.jpg`

Alt text:

> Overview of the Illustration GPT, CopyGPT, and Neem DS Prototyper workflows created for Branch's product team.

Caption:

> Three different outputs shared one reliability problem: general-purpose AI did not carry enough Branch context to produce dependable product work.

### Fragmented illustration directions

Asset: `different-illustration-directions.png`

Alt text:

> Early Branch illustration directions showing inconsistent colour, materials, lighting, and perspective.

Caption:

> Individual images could look polished while the set still felt fragmented. The team first needed to agree on one visual language.

### Illustration architecture

Asset: `illustration-gpt-architecture.png`

Alt text:

> Four-layer Illustration GPT architecture showing instructions, manifest, JSON rules, and a material catalogue feeding the render pipeline.

Caption:

> Separating behaviour, operating logic, style rules, and materials made recurring failures easier to isolate and convert into reusable constraints.

### Illustration refinement

Asset: use the strongest available iteration comparison from the Branch AI media set.

Alt text:

> Illustration iterations showing how repeated visual failures were corrected before final team selection.

Caption:

> More than 500 image-generation iterations helped turn recurring colour, material, camera, and composition problems into system rules.

### CopyGPT architecture

Asset: `copywriting-ai-architecture.png`

Alt text:

> CopyGPT architecture combining Branch brand, market, product, component, heuristic, and lint rules with human review.

Caption:

> The workflow evaluated whether copy was appropriate for the product moment—not only whether it sounded polished.

### CopyGPT impact

Asset: `branch-copy-ai-impact.png`

Alt text:

> CopyGPT impact summary covering screens reviewed, components audited, changes implemented, and human-reviewed accuracy.

Caption:

> The most mature market totals were audited; other market figures included directional estimates. The product team implemented the approved changes.

### PRD-to-prototype workflow

Asset: `prd-to-prototype-workflow.jpg`

Alt text:

> Workflow connecting a product requirements document to Claude interpretation, Figma Make context, a Neem-aware React prototype, stakeholder review, and PRD refinement.

Caption:

> The workflow made product requirements interactive earlier, giving stakeholders something concrete to evaluate before high-fidelity design.

### Human oversight

Asset: `ai-human-oversight-loop.jpg`

Alt text:

> Human-oversight loop showing how review informed new rules and later workflow versions.

Caption:

> Human review was part of the architecture: repeated feedback became reusable context while final judgment stayed with the team.

### Recognition

Asset: `kudos.jpeg`

Alt text:

> Slack recognition from Deovrat Dwivedi about Olumide's work on the Branch AI initiatives.

Caption:

> Deovrat's recognition is presented separately from the case-study evidence and ownership record.

## Owner copy-review checklist

Confirm or correct:

1. Card description and hero subtitle.
2. Overview wording.
3. First-person ownership language.
4. The explanation of each workflow and its outcome.
5. Learning statements.
6. Media selection, alt text, and caption direction.
