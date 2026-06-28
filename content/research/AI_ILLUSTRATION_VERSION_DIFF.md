# AI Illustration System Version Diff

Status: Verified against the supplied v1 to v6 source files
Last updated: 2026-06-27
Source directory: `AI Initiatives at Branch/Illustration GPT/`

## Narrative arc supported by the files

The six versions form a clear progression:

1. Establish repeatable rendering.
2. Cover organic and environmental edge cases.
3. Separate system responsibilities.
4. Add governance, provenance, and reproducibility.
5. Encode colour as an enforceable system.
6. Make colour validation a pre-delivery gate.

## v1: Baseline controlled render pipeline

Evidence:

- `v1/illustration_gpt_manifest.json > execution_pipeline`
- `v1/illustration_gpt_manifest.json > material_realism_gate`
- `v1/illustration_gpt_manifest.json > render_defaults`
- `v1/rules_branch.json > recognition_pipeline`
- `v1/rules_branch.json > material_realism.rerender_policy`

The first version already contained the basic production sequence: idea scouting, part and material assignment, prompt construction, generation, material validation, and delivery. It fixed the camera, square format, transparent PNG output, and soft ground shadow. The material gate could rerender up to twice when metal, glass, rubber, or paper failed its expected treatment.

This was the first move from prompt-by-prompt generation to a repeatable render contract.

## v1.2: Broader material coverage

Evidence:

- `v2/illustration_gpt_manifest_v1.2.json > purpose`
- `v2/illustration_gpt_manifest_v1.2.json > idea_scout.parts_roles`
- `v2/materials_branch_v1.2.json > materials`
- `v2/rules_branch_v1.2.json > detectors`
- `v2/rules_branch_v1.2.json > material_realism`

The second documented version expanded the system beyond hard product objects. It added skin, short fur, long fur, and grass to the catalogue and introduced explicit failure exclusions such as waxy skin, felt-like fur, and false metal effects.

The change addressed organic and environmental scenes without allowing their materials to collapse into common AI-rendering defaults.

## v1.3: Responsibilities became separate layers

Evidence:

- `v3/instructions_v1.1.md`
- `v3/illustration_gpt_manifest_v1.3.json > system_prompt`
- `v3/illustration_gpt_manifest_v1.3.json > idea_scout.schema`
- `v3/rules_branch_v1.3.json > thresholds`
- `v3/rules_branch_v1.3.json > tie_breaking.body_material_rules`
- `v3/materials_branch_v1.3.json`

Version 1.3 introduced the first standalone instruction document. The manifest stopped duplicating the visual rules and instead pointed to their authoritative source. It also added structured idea cards, seeds, variant counts, export naming, selection thresholds, realism confidence, UI placeholders, and body-material guardrails.

This is the clearest architectural turning point. Behaviour moved into instructions, orchestration into the manifest, visual and decision logic into rules, and surface facts into the material catalogue.

## v1.4: Governance and reproducibility

Evidence:

- `v4/illustration_gpt_manifest_v1.4.json > resources`
- `v4/illustration_gpt_manifest_v1.4.json > precedence`
- `v4/illustration_gpt_manifest_v1.4.json > interaction_policy`
- `v4/instructions_v1.4.md`
- `v4/rules_branch_v1.4.json > precedence`

Version 1.4 pinned file versions, added seed and style information to export naming, recorded checksums and provenance, and defined the precedence order `rules > manifest_defaults > runtime_args`. It also limited the system to one blocking clarification question.

The change prevented duplicated defaults and runtime requests from weakening the visual rules. It also made failures easier to trace and reproduce.

## v1.5: Colour became governed behaviour

Evidence:

- `v5/rules_branch_v1.5.json > color_system`
- `v5/rules_branch_v1.5.json > color_policy.assignment_logic`
- `v5/rules_branch_v1.5.json > part_color_assignments`
- `v5/materials_branch_v1.5.json > stylization_policy`
- `v5/illustration_gpt_manifest_v1.5.json > color_ratio_validation`
- `v5/system_prompt_v1.5.md > COLOR ASSIGNMENT LOGIC`

Version 1.5 replaced loose tinting with the team-defined 60/25/10/5 system. It introduced colour roles, part assignments, surface-area targets, contextual limits, saturation constraints, per-material stylisation, and colour-ratio validation.

Correct hex values were no longer sufficient. The system also had to place each colour on the right type of part and preserve its intended visual weight.

## v1.6: Validation became a release gate

Evidence:

- `v6/system_prompt_v1.6.md > PRE-DELIVERY VALIDATION (REQUIRED)`
- `v6/system_prompt_v1.6.md > DO NOT`
- Version references in the v1.6 manifest, rules, and materials files

The final documented version did not introduce a new system architecture. Its meaningful behavioural change was mandatory pre-delivery colour validation. An output with a significant ratio deviation could not be delivered until colour assignments were adjusted, the image rerendered, and the result checked again.

The rules and materials files otherwise changed only through schema and version references.

## Confirmed source conflict

The v1.5 and v1.6 manifests set `color_ratio_validation.tolerance_percent` to 10. The v1.6 system prompt blocks delivery when deviation is greater than 15%.

Until the production threshold is confirmed, public copy should say that v1.6 made colour validation mandatory without publishing one tolerance value.
