# AI Illustration Case Study Narrative V2

Status: Five-anchor narrative approved; complete copy rewrite ready for review
Last updated: 2026-06-27
Public route: `/work/ai-illustration-system`

## Why the current draft fails

The current draft contains many of the correct facts but does not connect them into a story.

- It treats the overview, problem, direction, architecture, iterations, and outcomes as separate summaries.
- It states conclusions before showing the evidence or difficulty that produced them.
- It uses abstract language where a reader needs a concrete product situation.
- It explains the four files but compresses the design work that made those files useful.
- It presents six versions as a table instead of showing how one failure led to the next decision.
- It repeats ownership through `I` statements instead of making judgment visible through decisions and consequences.
- It uses effort metrics near the top even though they do not explain product value.
- It does not clearly establish who needed the illustrations, where they appeared, or what the inconsistency cost.

## What to adopt from the references

### Charlie Hart

- Lead with the consequence and transformation.
- Compress role, scope, and result into a few calm sentences.
- Use specific evidence rather than dramatic language.
- Let the project sound senior through selection and clarity.

### Lucas Barrientos

- Build tension between the starting condition and the desired product state.
- Connect evidence to insight, insight to decision, and decision to consequence.
- Treat rejected paths and turning points as part of the product story.
- Use phase headings that let a reader understand the argument while scanning.

### Jessa Wolfe

- Begin each section with one plain claim, then explain why it mattered.
- Use concrete contrasts such as what became easier and what stayed difficult.
- Make technical systems understandable by explaining the job of each layer.
- Return to the original problem when presenting the result.

### Deovrat Dwivedi

- Explain the four layers with enough technical evidence to prove they existed.
- Show the recurring failures that forced the architecture to mature.
- Make the system visible through real source excerpts rather than generic summaries.

## Central story

This case study is not primarily about generating illustrations with AI. It is about moving from one-off visual production to a governed illustration system.

The narrative should show how a subjective visual direction became explicit, testable, and reusable:

1. The product had a shared interface system, but its illustrations did not yet follow one visual language.
2. A good-looking render was not enough because every new request reopened the same decisions.
3. Three faster approaches could produce an asset, but none could preserve the rules for the next request.
4. The solution became a modular system with separate instructions, orchestration, visual rules, material recipes, and validation.
5. Six versions show the real design work: turning recurring failures into clearer rules and stronger governance.
6. The final workflow made the visual language reusable while preserving human judgment for meaning and final quality.

## Approved progress anchors

Status: Approved by Olumide on 2026-06-27

| Step | Anchor | Narrative and design-thinking role |
| --- | --- | --- |
| 1 | `The missing layer` | Establishes the product problem: Neem governed the interface, but not the illustrations inside its Image and Illustration Blocks. |
| 2 | `Finding a visual language` | Combines definition and ideation. The team compared illustration directions, defined success criteria, and selected object-led 3D. |
| 3 | `From assets to a system` | Shows convergence on the solution. Three asset-focused approaches were tested before the durable output shifted from an image to reusable rules. |
| 4 | `Making consistency enforceable` | Covers prototyping, testing, feedback, and iteration across the instructions, manifest, rules, materials, and validation pipeline. |
| 5 | `What shipped` | Returns to the product and shows production screens, qualitative feedback, human review, and the final workflow. |

`Finding a visual language` replaces both `Defining consistency` and `Choosing a direction`. It contains the definition and ideation work. `From assets to a system` is a separate decision point because it explains why the selected visual direction still required a reusable delivery architecture.

## Opening contract

The opening must answer these questions before the progress rail:

- What was happening?
- Why did it matter to the product?
- What was built?
- What did Olumide own?
- What changed?
- What will the rest of the case study explain?

No final opening prose has been approved. The rewrite should not begin with the word `Neem` or assume an external reader understands it.

The information sequence should be:

1. Introduce the broader achievement: Branch's mobile interface had been rebuilt around an internal design system.
2. Explain the system in plain language before naming it: it was created in Figma, translated into matching front-end components with engineers, and connected through Figma Code Connect.
3. Explain that existing product screens across markets had been redesigned to use this visual language.
4. Reveal the remaining gap: the system governed the Illustration Block component but not the artwork placed inside it.
5. Show the contradiction: designers still sourced unrelated artwork from Google or Freepik.
6. State the consequence: poor brand consistency weakened the wider migration and would become harder to correct as the product grew.
7. Preview the solution, production result, and the case-study journey.

## Five-chapter narrative spine

### 1. The missing layer

Argument: The missing system was more important than any single inconsistent image.

The section should:

- Begin with the completed Neem migration: coded components, migrated product screens, colour tokens, and dark theme.
- Explain that the Image and Illustration Blocks standardised the container but not the artwork placed inside it.
- Show how designers searched Google or Freepik when a feature or flow needed an illustration.
- Show the actual visual differences in strokes, shading, characters, angle, layout, and complexity.
- Explain why this mattered to a product using Neem, not only why it looked untidy.
- Identify who needed new illustrations and what happened when they requested one.
- End with the reframed brief: create a repeatable visual language, not a fixed asset pack.

Evidence:

- Existing product-screen comparison.
- Confirmed Neem Design System migration context.
- Owner-provided triggering screen, request, or delivery moment.

### 2. Finding a visual language

Argument: Before AI could reproduce the style, the team had to decide what consistency meant.

The section should:

- Show the four competing directions: Notion-style line art, cartoonish or character-led illustration, abstract geometric illustration, and object-led 3D.
- Explain why object-led 3D was selected.
- Connect inclusiveness, scalability, ChatGPT image-generation performance, and visual fit with Neem to the decision.
- Explain the colour system as a hierarchy of roles, not a decorative palette.
- Establish the fixed variables: shape, camera, lighting, composition, background, materials, and colour allocation.

Evidence:

- Direction explorations.
- Three public review sessions and FigJam vote.
- 60/25/10/5 colour system.
- Review feedback about colour drift, camera-angle changes, and unclear interpretation.

### 3. From assets to a system

Argument: The first three approaches could make an illustration, but they could not make the next illustration easier or more consistent.

The section should:

- Present the illustration pack, per-image JSON, and image-to-image tests as genuine alternatives.
- Explain the specific benefit and failure of each.
- Make the turning point explicit: the durable output needed to be the rules, not the image.
- Explain why a Custom GPT was selected as the delivery mechanism.
- Keep product-time harness comparisons private unless explicitly approved.

Evidence:

- Approach comparison.
- Reference-generation examples if available.
- Confirmed transparent-background and reusable-instruction requirements.

### 4. Making consistency enforceable

Argument: The system became reliable only when recurring failures were assigned to the right layer.

This is the core of the case study. It should not read like a feature inventory.

### Why six iterations were necessary

The iterations were not six arbitrary rewrites of JSON files. They came from four recurring inputs:

- Output analysis exposed technical failure patterns.
- Design QA tested whether illustrations followed the selected visual language.
- Product-manager reviews exposed colour, camera, and interpretation problems that were not visible during solo testing.
- Design-team feedback helped distinguish personal preference from a repeatable system rule.

When feedback revealed a recurring problem, it moved into the layer responsible for preventing it: instructions, manifest, rules, materials, or validation.

#### Iteration 1: Establishing the render contract

- v1 established camera, lighting, transparent output, material recognition, and the first realism gate.
- The visual direction became an initial production contract.

#### Iteration 2: Expanding the material language

- v2 added natural materials and exclusions for waxy skin, felt-like fur, and false metal effects.
- The lesson was that naming a material was not enough. The system also needed to describe how it behaved and what it must not become.

#### Iteration 3: Separating the system into layers

- v3 separated the instruction layer, structured ideation, reproducibility fields, and material guardrails.
- The system became easier to debug because routing, visual rules, and material recipes no longer duplicated authority.

#### Iteration 4: Making the system governable

- v4 added precedence, provenance, compatibility, and a one-question clarification rule.
- Rules became authoritative over manifest defaults and runtime requests.
- A render could be traced to the file versions and settings that produced it.

#### Iteration 5: Turning colour into a system

- v5 introduced colour roles, surface-area targets, contextual limits, part assignments, and ratio validation.
- The important shift was from approved hex values to a governed visual hierarchy.
- The verified allocation is 60% grey, 25% blue, 10% navy, and up to 5% contextual colour.

#### Iteration 6: Making validation mandatory

- v6 required pre-delivery colour validation and rerendering when outputs exceeded the tolerance.
- Human review remained responsible for meaning and final selection.

Evidence:

- Four verified source-file views.
- Architecture diagram after the four layers.
- Iteration board.
- Selected before-and-after failures for materials, colour ratios, and related states.
- Six-version evidence from the supplied archive.

### The work itself: showing AI craft

The case study needs a dedicated craft sequence before or inside the iteration story. It must show what Olumide built rather than summarising it as four labels.

#### System instructions

- Show a verified excerpt from `system_prompt_v1.6.md`.
- Explain how the instructions route Ideation Mode and Render Mode, apply non-negotiables, and control validation and clarification behaviour.

#### Manifest

- Show a verified excerpt from `illustration_gpt_manifest_v1.6.json`.
- Explain orchestration, knowledge-file references, render defaults, output schema, and pipeline order.

#### Visual rules

- Show a verified excerpt from `rules_branch_v1.6.json`.
- Explain camera, lighting, shape language, colour roles, part assignment, constraints, and quality thresholds.

#### Material catalogue

- Show a verified excerpt from `materials_branch_v1.6.json`.
- Explain PBR properties, positive and negative prompt language, and how materials are mapped to the approved colour roles.

#### Render and validation pipeline

- Follow the four files with the architecture diagram.
- Show how a brief or reference image moves through interpretation, part assignment, material assignment, colour roles, generation, validation, rerendering, and human review.

### Code-view component requirements

- Use real v1.6 source excerpts only. Do not reconstruct or invent pseudo-code.
- Each view must display its layer, filename, file type, and source version.
- Apply syntax highlighting so JSON keys, strings, numbers, booleans, punctuation, and Markdown structures are visually distinct.
- Preserve the Theme 2 editorial hierarchy while making the code readable on desktop and horizontally scrollable on mobile.
- Let readers inspect the code without overwhelming the narrative. Use selected excerpts, not entire files.
- Evidence may come from both the supplied Illustration GPT archive and the screenshots in Deovrat's article because they document Olumide's system.

### 5. What shipped

Argument: The result was a reusable way to make and review illustrations, not only a collection of finished assets.

The section should:

- Show representative final outputs first.
- Explain what the system now accepts, enforces, validates, and hands to a person.
- State plainly that the illustrations appear in shipped production screens in the Branch mobile app across product markets.
- Attribute qualitative feedback carefully: employees responded positively to the added vibrancy, and directional customer feedback indicated that the illustrations were clearer to understand.
- Avoid usage, adoption, speed, or illustration-count claims that cannot be proven.
- Return to the opening problem: the next request no longer starts with a blank visual specification.
- End with one specific learning about modular AI systems and one concise future direction.

Evidence:

- Final output family.
- Live-market confirmation.
- Design-team quality review and final selection.
- Any owner-confirmed qualitative feedback or before-and-after review evidence.

## Voice controls for the rewrite

- Use no more than three first-person pronouns across the main narrative.
- Establish ownership once near the opening, then let decisions and artefacts demonstrate it.
- Use one argument per paragraph.
- Keep most paragraphs to two or three sentences.
- Use short turning-point sentences between denser explanations.
- Avoid abstract phrases such as `the system became the product`, `a stronger idea`, or `the next illustration had to belong` unless the following sentence proves exactly what they mean.
- Do not use em dashes.
- Preserve Canadian English outside verified source-code excerpts.
- Do not publish any fact still marked unresolved.

## Owner information confirmed on 2026-06-27

- Neem is Branch's internal Figma design system. The design team worked with engineers to build matching front-end components and connected Figma and code through Code Connect.
- Existing mobile-app screens across products and markets were redesigned to use Neem's look and feel, including colour tokens and dark-theme support.
- Illustration was the last inconsistent layer.
- Designers used Google or Freepik when they needed artwork for Neem's Image or Illustration Blocks.
- The central consequence was poor brand consistency, which weakened the migration and would become harder to correct as the app grew.
- The explored directions were Notion-style line illustration, cartoonish or character-led illustration, abstract geometric illustration, and object-led 3D.
- Object-led 3D supported inclusiveness across markets, was easier to reproduce consistently, performed better in ChatGPT image generation, and complemented Neem's aesthetic.
- Product-manager reviews surfaced colour changes, camera-angle changes, and illustrations whose intended meaning was unclear.
- Output analysis, design QA, product-manager reviews, and design-team feedback all contributed to the six iterations.
- The hardest recurring failure was colour consistency. The verified solution was the 60/25/10/5 role and allocation system, followed by mandatory validation in v6.
- `Live` means the illustrations appear in shipped production screens in the Branch mobile app.
- Employees responded positively to the vibrancy, and directional customer feedback indicated that the illustrations were clearer to understand.
- Deovrat was Olumide's design manager. His article documents Olumide's Illustration GPT work, and its screenshots may be used as project evidence.
- Deovrat's `kudos.jpeg` recognition contains project-specific feedback and may appear as manager recognition.

The material count, public competitor names, company-access model, and Codex portability do not need to block the rewrite. They can remain omitted.
