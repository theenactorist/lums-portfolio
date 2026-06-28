# AI Illustration System Fact and Ownership Sheet

Status: Needs fact approval for the open items below
Last updated: 2026-06-27
Project: Standalone Illustration AI case study

## Case-study framing

| Field | Current fact |
| --- | --- |
| Company | Branch International Financial Services |
| Approved title | Building an AI illustration system for consistent, on-brand product visuals at Branch |
| Case-study role | Product Designer, AI Systems |
| Illustration workstream | December 2025–February 2026 |
| Public route | `/work/ai-illustration-system` |
| Primary harness | ChatGPT with image generation enabled through a Custom GPT |
| Confirmed tools | ChatGPT, FigJam, and Figma |
| Markets | Illustrations created through the system are shipped in production mobile-app screens across Branch product markets |

Olumide confirmed December 2025 to February 2026 as the Illustration workstream timeline. Public copy must continue to omit the unresolved competitor, company-access, and Codex-testing details until Olumide confirms them.

## Problem

- Neem is Branch's internal design system, created and maintained in Figma.
- To make Neem scalable and reusable, the design team worked with engineers to build matching front-end components and connected the Figma and code implementations through Figma Code Connect.
- Existing mobile-app screens across products and markets were redesigned to use Neem's visual language.
- The migration included colour tokens and dark-theme support.
- Illustration was the last major visual layer that had not been brought into the system.
- Neem included Image Block and Illustration Block components, but it did not yet govern the artwork placed inside them.
- When designers needed an illustration for a feature or flow, they commonly searched Freepik or Google and selected an available image.
- Different designers therefore introduced unrelated illustration styles into otherwise consistent Neem screens.
- Other designers and Olumide identified that the app used illustrations with inconsistent strokes, shading, character treatment, angles, layouts, and levels of detail.
- Some illustrations were too detailed while others were too simple, which made the library difficult to extend coherently.
- The inconsistency weakened brand coherence and undermined the work already invested in migrating the product to Neem.
- The problem would compound as the mobile app and its illustration needs grew.
- The team needed a repeatable way to create new illustrations later, including when the original designer was not available.

## Direction definition

- Olumide explored visual directions with Arushi.
- Arushi ran the FigJam vote.
- Olumide led three public review sessions.
- The team reviewed four broad directions: Notion-style line illustration, cartoonish or character-led illustration, abstract geometric illustration, and object-led 3D illustration.
- The selected direction described the core action through rounded 3D objects.
- The design team defined the colour system.
- The final documented colour system was 60% grey, 25% blue, 10% navy, and up to 5% contextual colour for success, error, warning, disabled, currency, gold, or foliage states.
- Fewer colours made the system easier to scale.
- Rounded forms made the language feel more welcoming.
- Object-led scenes reduced reliance on human skin depiction across multiple markets.
- Object-led 3D gave the team a more repeatable generation method than the other explored directions.
- During the project, ChatGPT image generation produced more reliable results for the selected 3D direction.
- The 3D treatment complemented Neem's visual and aesthetic direction.

## Review feedback

- Olumide presented the illustration work to a wider group of product managers during public review sessions.
- Reviewers identified colour changes between related illustrations.
- Reviewers identified changes in 3D camera angle between outputs.
- Some illustrations did not communicate the intended product meaning clearly enough.
- These perspectives surfaced edge cases Olumide had not identified during solo generation and testing.
- The feedback led to tighter rules for colour, camera treatment, and interpretation clarity.
- Repeated generation, design QA, product-manager reviews, and design-team feedback all contributed to the six documented system iterations.

## Approaches explored

1. Purchase an illustration pack. Rejected because a stock pack would not extend the Neem Design System or give the team ownership of the visual rules.
2. Use a source image and a JSON prompt to re-render it to specification. Rejected because maintaining a separate JSON specification for each illustration would be cumbersome.
3. Use image-to-image retexturing with a reference illustration. Rejected because the model did not preserve the same output consistently across repeated generations.
4. Build a Custom GPT with reusable rules. Selected because colleagues could describe the illustration they needed in natural language while the system supplied the visual constraints.

## Harness decision

- Olumide proposed the Custom GPT direction.
- ChatGPT was selected because its image-generation capability supported the raster output and transparent backgrounds required by the workflow.
- A Custom GPT could package instructions, knowledge files, and image generation in one workspace-shareable interface.
- Olumide described Claude as weaker for this raster-graphics task and Gemini Nano Banana as unable to deliver the required transparent alpha background during the team's evaluation. These should remain project-time observations, not universal product claims.
- A Custom GPT does not directly become a Codex workflow. The same instructions, rules, materials, and validation logic could be repackaged as a Codex skill or repository guidance, with Codex image generation handling the render step. This is future portability, not a shipped integration.

## Ownership

| Work area | Owner or contribution |
| --- | --- |
| Identifying the consistency problem | Olumide and other designers |
| Exploring visual directions | Olumide and Arushi |
| Running the FigJam vote | Arushi |
| Running three public review sessions | Olumide |
| Defining the colour system | Design team |
| Proposing the Custom GPT direction | Olumide |
| Researching instruction and generation constraints | Olumide |
| Writing the system instructions | Olumide |
| Building the manifest | Olumide |
| Writing the JSON rules | Olumide |
| Building the material catalogue | Olumide |
| Designing and implementing the render pipeline | Olumide |
| Generating and refining illustrations | Olumide |
| Quality review and final selection | Design team |
| Management alignment | Deovrat, Olumide's design manager, provided one-to-one check-ins |

## Four-layer system

1. Instructions set system behaviour, route ideation and render modes, and lock non-negotiable output requirements.
2. The manifest orchestrates the execution pipeline and points to the correct rules and materials files.
3. The rules file defines the visual fingerprint, colour roles, camera, lighting, composition, negative constraints, and quality thresholds.
4. The material catalogue defines surface recipes, realism requirements, negative tokens, and brand-colour mappings.

The render pipeline uses the same quality sequence whether the input begins as a natural-language brief or a reference image. The implemented material-realism gate could adjust the prompt and rerender up to twice before escalating to a person.

## Version evidence from the attached archive

| Version | What changed | What improved |
| --- | --- | --- |
| v1 | Established the first manifest, rules file, and 18-material catalogue. Fixed the 45-degree camera, lighting, square output, transparent background, material recognition, and realism gate. | Turned a visual preference into an initial repeatable production contract. |
| v2 | Added skin, short and long fur, and grass materials and detectors. Expanded negative tokens for waxy skin, felt-like fur, and false metal effects. | Broadened the system beyond hard product objects and made material failures more explicit. |
| v3 | Added a separate instruction layer, structured idea cards, reusable UI placeholders, material tint exemptions, confidence thresholds, body-material guardrails, seeds, version naming, and source references. | Reduced duplicated authority, made outputs more reproducible, and stopped large bodies from defaulting to metal without strong evidence. |
| v4 | Added explicit precedence of rules over manifest defaults and runtime requests. Removed non-brand highlights, versioned all files, and added provenance fields and a one-question clarification policy. | Made the system easier to govern, trace, and debug without rules competing across files. |
| v5 | Rebuilt colour handling around the team-defined 60/25/10/5 system. Added colour roles, surface-area targets, contextual colours, part assignments, stylisation rules, saturation limits, and colour-ratio validation. | Replaced loose brand tinting with an enforceable colour system and addressed the largest source of library-wide drift. |
| v6 | Added mandatory pre-delivery colour validation to the system prompt. Outputs outside the tolerance were adjusted and rerendered before delivery. | Moved colour checking from guidance to a release gate while keeping human review for meaning and final selection. |

The v5 and v6 JSON files are materially the same apart from version references. The v6 improvement is concentrated in the system prompt's pre-delivery validation behaviour.

The v1.5 and v1.6 manifest sets `color_ratio_validation.tolerance_percent` to 10, while the v1.6 system prompt blocks delivery only when deviation is greater than 15%. Public copy should describe this as a mandatory colour-validation gate without publishing a single tolerance until Olumide confirms which threshold governed production use.

The archive contains 18 material IDs in v1 and 22 in v2 through v6. The earlier approved Branch AI fact sheet records a 15-material catalogue. This conflict is intentionally unresolved, and the public case study does not state a material count.

## Repeated failure modes

- Exact brand colours drifted between outputs.
- Colour distribution varied even when the correct hex values were present.
- Related states could shift in material sheen, lighting, or colour balance.
- Materials could default to chrome, photorealism, generic plastic, or clay.
- Camera angle, centring, shadow, and lighting drifted between generations.
- Complex scenes became more stable when broken into smaller components and recomposed.

## Evidence and outcomes

- Six major documented versions are present in the supplied archive.
- More than 500 image-generation iterations were completed, often 10 to 15 for a final illustration.
- The system is live across all Branch product markets.
- `Live` means the resulting illustrations appear in shipped production screens in the Branch mobile app.
- Branch employees responded positively to the vibrancy the illustrations added to the product.
- Directional customer feedback indicated that the new illustrations were clearer to understand.
- The exact number of live illustrations remains excluded because previous sources conflict.
- Company-wide availability may describe workspace access, but it must not be turned into a usage or adoption claim.
- The design team retained quality review and final selection.
- Deovrat Dwivedi was Olumide's design manager during this work.
- Deovrat's article documents the Illustration GPT system Olumide built. Article screenshots and project artefacts may be reused as evidence of Olumide's work.
- Deovrat's `kudos.jpeg` recognition includes project-specific praise for the Illustration GPT's patience, precision, and iteration depth. The screenshot may appear as manager recognition.
- System ownership must remain attributed to Olumide. Deovrat's role was management, review, and alignment.

## Learnings in Olumide's voice

- I started without knowing whether the idea would work. Design thinking gave me a way to move through the uncertainty one question and one test at a time.
- Research, design reviews, and feedback from product managers and UX researchers gave the system more clarity as it developed.
- AI systems improve when context, guidelines, constraints, and failure conditions are explicit.
- Human leadership and review are essential to any scalable and worthwhile AI workflow.
- Complex tasks become more manageable when they are modular, like design-system primitives, tokens, components, and patterns.
- The system can make visual judgment reusable, but it cannot decide what an illustration should mean in the product experience.

## Potential next steps

- Convert selected raster outputs into SVGs and motion-ready assets.
- Extend controlled access to marketing and other teams for presentations and internal projects.
- Repackage the instruction and validation architecture for another image-generation harness such as a Codex skill.
- Add a critique layer that checks outputs against the same system before human review.
- Improve state-family generation so related statuses preserve geometry, light, and materials more tightly.

## Sources and synthesis boundary

- `AI Initiatives at Branch/Illustration GPT.zip` supplied by Olumide. This is the source for the six-version analysis.
- `content/fact-sheets/BRANCH_AI.md` is the approved source for ownership, iteration count, live-market status, and collaboration boundaries.
- Deovrat Dwivedi's article, [Building a Custom GPT for Brand-Consistent AI Illustrations](https://ddesignai.substack.com/p/building-a-custom-gpt-for-brand-consistent), documents project material created by Olumide and may supply screenshots and artefacts for this case study. Deovrat was Olumide's design manager, not the system's creator.
- OpenAI documentation confirms that Custom GPTs can combine instructions, knowledge, capabilities, workspace sharing, and image generation. It also distinguishes GPTs inside ChatGPT from external or programmatic integrations.
- The current Codex manual confirms that reusable guidance can be packaged through `AGENTS.md` or agent skills and that Codex has a separate image-generation capability. This supports portability of the system rules, not direct Custom GPT integration.

## Items that still require Olumide's confirmation

1. Whether the team directly tested Claude and Gemini Nano Banana, and whether the public case study should name them.
2. Whether “available company-wide” means published to Branch's ChatGPT workspace or shared through another access model.
3. Whether a Codex version is a future concept or something already tested.
4. Whether the public material count should be 15, 18, 22, or omitted permanently.
