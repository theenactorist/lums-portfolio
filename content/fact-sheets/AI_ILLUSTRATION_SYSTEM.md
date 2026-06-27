# AI Illustration System Fact and Ownership Sheet

Status: Working draft for confirmation
Last updated: 2026-06-27
Project: Standalone Illustration AI case study

## Case-study framing

| Field | Current fact |
| --- | --- |
| Company | Branch International Financial Services |
| Working title | Building an AI illustration system for consistent, on-brand product visuals at Branch |
| Case-study role | Product Designer, AI Systems |
| Initiative window | October 2025 to February 2026 |
| Public route | `/work/ai-illustration-system` |
| Primary harness | ChatGPT with image generation enabled through a Custom GPT |
| Collaboration tools | FigJam and Figma |
| Markets | The resulting illustration system is live across Branch product markets |

The initiative window currently comes from the approved Branch AI programme fact sheet. It should not be described as an illustration-only timeline unless Olumide confirms that the dates match this workstream.

## Problem

- The work began as an extension of the Neem Design System migration into illustration.
- Other designers and Olumide identified that the app used illustrations with inconsistent strokes, shading, character treatment, angles, layouts, and levels of detail.
- Some illustrations were too detailed while others were too simple, which made the library difficult to extend coherently.
- The product interface and its illustrations did not consistently speak the same visual language.
- The team needed a repeatable way to create new illustrations later, including when the original designer was not available.

## Direction definition

- Olumide explored visual directions with Arushi.
- Arushi ran the FigJam vote.
- Olumide led three public review sessions.
- The team reviewed Notion-style illustration and other directions that still need to be named by Olumide.
- The selected direction described the core action through rounded 3D objects.
- The design team defined the colour system.
- The final documented colour system was 60% grey, 25% blue, 10% navy, and up to 5% contextual colour for success, error, warning, disabled, currency, gold, or foliage states.
- Fewer colours made the system easier to scale.
- Rounded forms made the language feel more welcoming.
- Object-led scenes reduced reliance on human skin depiction across multiple markets.

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
| Management alignment | Deovrat provided one-to-one check-ins |

## Four-layer system

1. Instructions set system behaviour, route ideation and render modes, and lock non-negotiable output requirements.
2. The manifest orchestrates the execution pipeline and points to the correct rules and materials files.
3. The rules file defines the visual fingerprint, colour roles, camera, lighting, composition, prompt contract, and quality thresholds.
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
- The exact number of live illustrations remains excluded because previous sources conflict.
- Company-wide availability may describe workspace access, but it must not be turned into a usage or adoption claim.
- The design team retained quality review and final selection.

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
- Deovrat Dwivedi's article, [Building a Custom GPT for Brand-Consistent AI Illustrations](https://ddesignai.substack.com/p/building-a-custom-gpt-for-brand-consistent), supplied structural context and descriptions of failure modes. It is not used to transfer Deovrat's ownership claims to Olumide.
- OpenAI documentation confirms that Custom GPTs can combine instructions, knowledge, capabilities, workspace sharing, and image generation. It also distinguishes GPTs inside ChatGPT from external or programmatic integrations.
- The current Codex manual confirms that reusable guidance can be packaged through `AGENTS.md` or agent skills and that Codex has a separate image-generation capability. This supports portability of the system rules, not direct Custom GPT integration.

## Items that still require Olumide's confirmation

1. The names of the three visual styles reviewed alongside Notion-style illustration.
2. Whether October 2025 to February 2026 is the correct timeline for the illustration workstream itself.
3. Whether the team directly tested Claude and Gemini Nano Banana, and whether the public case study should name them.
4. Whether “available company-wide” means published to Branch's ChatGPT workspace or shared through another access model.
5. Whether a Codex version is a future concept or something already tested.
6. Which product requests or screens first made the illustration inconsistency urgent.

