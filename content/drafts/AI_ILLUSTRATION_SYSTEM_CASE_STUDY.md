# Building an AI illustration system for consistent, on-brand product visuals at Branch

Status: Source copy approved and implemented locally

Last updated: 2026-06-27

Public route: `/work/ai-illustration-system`

## Hero

**Eyebrow**

Branch International · AI illustration system

**Title**

Building an AI illustration system for consistent, on-brand product visuals at Branch

**Subtitle**

Designing a reusable AI illustration workflow that used a Custom GPT to turn natural-language requests into consistent 3D illustrations for Branch’s mobile products.

**Metadata**

- Role: Product Designer, AI Systems
- Illustration work: December 2025 to February 2026
- Collaboration: Product design, product management, UX research
- Tools: ChatGPT, FigJam, Figma
- Outcome: Illustrations shipped in production mobile-app screens across Branch product markets

## Overview

Branch had already invested in making its mobile product feel like one system. Neem, the company’s internal design system, was created in Figma, translated into matching front-end components with engineers, and connected to code through Figma Code Connect. Existing screens across products and markets had been redesigned around the same components, colour tokens, and dark-theme support.

Illustrations were the exception.

The design system standardised the Image and Illustration Blocks, but it did not govern the artwork placed inside them. When a new flow needed an illustration, designers often searched Google or Freepik and selected whatever worked for the immediate screen. The product gained one interface language and kept several illustration languages.

That inconsistency weakened the wider migration and would become harder to correct as the app grew. The response was a Custom GPT that turned a natural-language brief into a constrained product illustration, checked the output against the same visual rules, and returned it for human review.

My role began with a question: could the team’s chosen visual direction become a system another designer could use? The answer emerged through research, failed outputs, design QA, and feedback from product managers and researchers. Across six documented versions and more than 500 image-generation iterations, that work grew into instructions, JSON rules, a manifest, material catalogue, and render pipeline. The design team retained final quality review and selection.

This case study follows how a subjective visual direction became explicit enough to repeat.

## 1. The missing layer

### The interface had a system. The artwork inside it did not.

Neem gave designers and engineers a shared way to build product screens. Its components controlled layout, behaviour, typography, colour, and theme. The illustration component controlled where an image appeared, but not what that image looked like.

That gap became visible whenever a designer needed artwork for a feature or product state. One screen might use a detailed character scene, another a flat object, and another a heavily shaded graphic. Strokes, camera angles, colour balance, composition, and complexity changed from one request to the next.

Each image could work on its own. Together, they made the product feel assembled from different visual systems.

The cost went beyond appearance. Every request reopened decisions the design system was supposed to make reusable. As the app expanded, the illustration debt would expand with it.

**Evidence: Existing product screens with unrelated illustration styles**

Caption: The surrounding interface followed Neem, while the illustrations varied in strokes, shading, character treatment, perspective, and complexity.

### The brief changed from replacing images to defining a language.

A fixed asset library would solve only the screens already known. The real requirement was a method that another designer could use for a new feature, product state, or market without restarting the art direction.

The system therefore needed to answer two questions:

1. What makes an illustration recognisably part of this product?
2. How can those decisions survive the next generation request?

## 2. Finding a visual language

### Consistency had to be defined before it could be generated.

The design team explored four broad directions: Notion-style line art, character-led cartoons, abstract geometric scenes, and object-led 3D. A FigJam vote and three wider review sessions helped compare them against the product rather than personal preference.

Object-led 3D gave the strongest balance of clarity, inclusiveness, and repeatability. Keeping people out of the scene reduced dependence on skin depiction across different markets. Rounded objects felt welcoming, complemented Neem’s visual direction, and kept attention on the product action. During the project, ChatGPT also reproduced this treatment more reliably than the other explored styles.

**Evidence: Visual-direction exploration**

Caption: Four visual directions were compared before the system work began. The selected direction used rounded 3D objects to describe the core action without relying on character-led scenes.

### The visual direction became a set of fixed decisions.

The selected style was still too broad for reliable generation. It had to be described through variables that could be checked: object shape, camera, lighting, composition, background, material behaviour, colour role, and colour allocation.

The design team defined a 60/25/10/5 colour structure:

- 60% grey for primary forms
- 25% blue for interaction and emphasis
- 10% navy for anchors and contrast
- Up to 5% contextual colour for states such as success, error, warning, currency, or foliage

The ratios gave each colour a job. Approved hex values alone could not prevent a render from becoming mostly blue or placing contextual colours on the wrong surfaces.

Product-manager reviews exposed the same problem in other variables. Related illustrations changed camera angle, lighting, or material sheen. In some cases, the image was visually polished but did not communicate the intended product meaning clearly enough.

Those were not isolated mistakes. They were requirements the system had not captured yet.

## 3. From assets to a system

### Three quicker approaches still left the next request unsolved.

#### Purchase an illustration pack

A stock pack could create immediate visual consistency. It could not extend Neem, encode Branch’s colour logic, or give the team control over how the language evolved.

#### Re-render each source image with its own JSON specification

A detailed JSON prompt added control to one image. Maintaining a separate specification for every asset would create another library to update and another source of inconsistency.

#### Retexture one image from another

Image-to-image tests appeared closer to the target, but repeated generations still changed materials, colour balance, camera treatment, and composition. The reference helped the current render without protecting the next one.

The reusable output had to be the rules, not the image.

### A Custom GPT made the rules available at the point of creation.

ChatGPT was selected as the harness because it combined the required raster image generation, transparent-background output, reusable knowledge files, and a shareable Custom GPT interface. A colleague could describe the product moment in natural language while the system supplied the visual context they should not have to reconstruct.

Two entry points supported different needs:

- Ideation Mode turned a product need into several structured visual concepts before rendering.
- Render Mode accepted a reference image, identified its parts, and rebuilt it through the same visual system.

Both modes entered one shared quality pipeline. That made the delivery mechanism convenient without allowing convenience to define the visual language.

**Selected approach**

A Custom GPT with natural-language input, reusable knowledge files, explicit visual rules, and a validation pipeline that returned final judgment to people.

## 4. Making consistency enforceable

### Every recurring failure needed a home in the system.

The architecture was organised like a design system. Each layer owned a different kind of decision, which made feedback easier to place and failures easier to trace.

### Layer 1: Instructions controlled behaviour

The instruction layer decided whether to ideate, render, validate, or ask for clarification. It also held the non-negotiable requirements that had to survive every request.

Verified excerpt from `system_prompt_v1.6.md`:

```text
IDEA SCOUT (when no image attached)
1. Propose 8-10 ideas across: Product hardware, UI-on-device,
   Payment/fintech, Compliance/KYC, Support/ops,
   Abstract brand, Seasonal/Travel
2. Each idea: Title (≤7 words), one-line story, camera,
   lighting, parts list, color assignments, candidate materials
3. User picks 1-3 ideas → render

MATERIAL ASSIGNMENT
- Segment parts → apply part_defaults → apply domain_overrides
- Apply color_system (hierarchy → part_type → area)
- Stylize ALL materials to 60/25/10/5 palette
```

### Layer 2: The manifest orchestrated the workflow

The manifest pointed to the authoritative files, defined render defaults, and kept the pipeline order in one place. It prevented each request from inventing its own output format or execution sequence.

Verified excerpt from `illustration_gpt_manifest_v1.6.json`:

```json
"render_defaults": {
  "camera_view": "From rules_branch_v1.6.json style profile",
  "aspect_ratio": "1:1",
  "resolution": "4096x4096",
  "background": "transparent-with-soft-ground-shadow",
  "output_format": "PNG",
  "alpha_required": true,
  "variant_count": 1
}
```

### Layer 3: The rules protected the visual language

The rules file defined camera, lighting, composition, colour roles, part assignment, negative constraints, and quality thresholds. It converted the selected direction into conditions that could be checked rather than remembered.

Verified excerpt from `rules_branch_v1.6.json`:

```json
"constraints": {
  "no_pure_black": {
    "forbidden": "#000000",
    "reason": "Maintains controlled aesthetic"
  },
  "saturation_ceiling": {
    "max_percent": 70,
    "reason": "Prevents accents from overpowering the palette"
  },
  "contextual_budget": {
    "max_percent": 5,
    "reason": "Keeps contextual colors subordinate to core palette"
  }
}
```

### Layer 4: The material catalogue described how surfaces should behave

Material names were not enough. Each recipe combined physical properties, positive prompting language, failure exclusions, and an approved colour treatment. That distinction helped prevent rubber from becoming glossy, metal from becoming generic chrome, or every object from collapsing into the same plastic surface.

Verified excerpt from `materials_branch_v1.6.json`:

```json
"polycarbonate_matte": {
  "pbr": {
    "metalness": 0.0,
    "roughness": 0.45,
    "specular": 0.25,
    "ior": 1.58
  },
  "prompt": {
    "positive": ["matte polycarbonate shell", "soft microtexture"],
    "negative": ["gloss coat", "brushed metal"]
  },
  "stylization": {
    "primary_color": "grey",
    "accent_color": "blue"
  }
}
```

### Two inputs entered one render and validation pipeline.

A natural-language brief or reference image moved through the same sequence: interpret the request, segment the parts, assign materials, apply colour roles, generate, validate, and deliver for human review.

The material-realism gate checked whether surfaces behaved as intended. When a failure was detected, the system added targeted corrections and rerendered up to twice before escalating to a person.

**Evidence: Illustration GPT architecture**

Caption: The architecture separated input, processing, visual rules, quality checks, and output so that each failure could be corrected in the layer responsible for it.

### Six iterations turned feedback into governance.

More than 500 image-generation iterations exposed failure patterns that a small set of polished outputs would have hidden. A final illustration often took 10 to 15 generations. The useful result was not the lucky render. It was the rule that reduced the chance of repeating the same failure.

Four inputs shaped the versions: output analysis, design QA, product-manager reviews, and design-team feedback. Each recurring problem moved into the instruction, manifest, rule, material, or validation layer responsible for preventing it.

#### Iteration 1: Establish the render contract

The first version fixed the camera, lighting, transparent output, material recognition, and material-realism gate. A visual preference became an initial production contract.

#### Iteration 2: Expand the material language

Natural materials and stronger failure exclusions were added. The system learned that identifying skin, fur, grass, or metal was only useful when it also knew how each surface should behave and what it must not become.

#### Iteration 3: Separate the system into layers

Instructions, structured ideation, reproducibility fields, and material guardrails were separated from one another. Routing, visual rules, and material recipes stopped competing as duplicated sources of authority.

#### Iteration 4: Make the system governable

Precedence, provenance, compatibility, and a one-question clarification policy were introduced. Rules became authoritative over manifest defaults and runtime requests, and a render could be traced back to the file versions and settings that produced it.

#### Iteration 5: Turn colour into a system

Colour was the hardest recurring failure. Approved hex values became defined roles, surface-area targets, contextual limits, part assignments, and ratio validation. This was the shift from having the right colours to using them in the right visual hierarchy.

#### Iteration 6: Make validation mandatory

Pre-delivery colour validation became a required step. Outputs outside the accepted allocation were corrected and rerendered before delivery, while human review remained responsible for meaning and final selection.

**Evidence: Iteration review board**

Caption: Repeated comparisons exposed colour, camera, material, and interpretation failures. Design QA and review feedback determined which failures became system rules in the next version.

## 5. What shipped

### The result was a reusable way to create and review illustrations.

The finished workflow accepted a brief or reference image, applied the same visual and material rules, validated the output, and handed the result to a person. The design team still decided whether the illustration communicated the right idea and belonged in the product.

The resulting illustrations now appear in shipped production screens in the Branch mobile app across product markets. Employees responded positively to the vibrancy they added, while directional customer feedback indicated that the new illustrations were clearer to understand.

**Evidence: Final illustration families**

Caption: A shared camera, restrained palette, material language, and object-led composition created one recognisable family across different product jobs and states.

**Evidence: Manager recognition**

Caption: Deovrat Dwivedi, the design manager for this work, recognised the patience, precision, and iteration behind the Illustration GPT project.

### What the work taught me

The project began without a guarantee that the idea could be made reliable. Research and design thinking made the uncertainty manageable: define one decision, test it, examine the failure, and move what was learned into the system.

Three lessons stayed with me:

1. AI systems improve when context, constraints, and failure conditions are explicit.
2. Human judgment belongs inside the architecture, especially for meaning, inclusiveness, and final quality.
3. Complex AI work becomes easier to build and debug when it is modular, like design-system primitives, tokens, components, and patterns.

### One useful next step

Convert selected raster outputs into SVG and motion-ready assets. The illustration system already governs how the visual language is created. Extending it into motion would let the same language support richer product feedback without reopening the art direction.

## Closing line

The workflow carries the repeatable decisions. People remain responsible for what each illustration means.

## Navigation

- Back to selected work
- Next case study →
