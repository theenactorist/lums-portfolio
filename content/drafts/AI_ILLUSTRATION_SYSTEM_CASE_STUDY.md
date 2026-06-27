# AI Illustration System Case Study Draft

Status: Working narrative for confirmation
Last updated: 2026-06-27
Fact source: `content/fact-sheets/AI_ILLUSTRATION_SYSTEM.md`

## Selected-work card

### Title

> Building an AI illustration system for consistent, on-brand product visuals at Branch

### Description

> I turned a fragmented illustration library into a reusable system with explicit colour, camera, material, and quality rules.

### Labels

- Product Designer, AI Systems
- 2025 to 2026
- AI systems / Design systems

## Hero

### Eyebrow

> Branch International · AI illustration system

### Title

> Building an AI illustration system for consistent, on-brand product visuals at Branch

### Subtitle

> I translated a team-defined visual direction into a Custom GPT that could turn natural-language briefs into reusable product illustrations, while keeping people responsible for meaning and final quality.

### Metadata

| Field | Public copy |
| --- | --- |
| Role | Product Designer, AI Systems |
| Initiative window | October 2025 to February 2026 |
| Collaboration | Product design team, product managers, UX researchers |
| Tools | ChatGPT, FigJam, Figma |
| Scope | Visual direction, system architecture, generation, and iteration |

## Overview

Branch did not need another way to generate a single attractive image. It needed a way to create the next illustration, and the one after that, without losing the visual language of the product.

I worked with the design team to define that language, then built the system that could apply it repeatedly. I wrote the instructions and JSON rules, built the manifest, material catalogue, and render pipeline, and generated and refined the outputs through six major versions.

The design team defined the colour system and retained final quality review. Arushi and I explored the visual direction, and she ran the FigJam vote.

### The result at a glance

- Six documented system versions.
- More than 500 image-generation iterations.
- One shared 60/25/10/5 colour logic.
- A material-realism gate with up to two automatic rerenders.
- A system now live across Branch product markets.

## 1. The problem

### The product had one design system and several illustration languages

The illustration work began as an extension of Branch's Neem Design System migration. The interface was becoming more coherent, but the illustrations still varied from screen to screen.

Some used heavy strokes. Others relied on soft shading or detailed characters. Angles and layouts shifted. A few images were highly detailed while others were extremely simple. Each could work alone, but together they did not feel like one product.

The inconsistency also made the library difficult to extend. Every new request reopened the same decisions about style, colour, perspective, and level of detail.

### The real problem was repeatability

Generating one good image was not enough. The team needed a visual language that could survive a new use case, a new product surface, and a new person making the request months later.

That changed my brief. I was not designing a set of illustrations. I was designing the system that could keep producing them.

## 2. Defining consistency

### We aligned on the visual language before automating it

Other designers and I first identified the consistency problem. Arushi and I explored visual directions, I led three open review sessions, and Arushi ran the FigJam vote.

The selected direction used rounded 3D objects to describe the core action. It gave us enough realism to make materials and actions recognisable, without the visual density of character-led scenes.

Three principles shaped the direction:

1. Object-led scenes reduced dependence on skin depiction across Branch's markets.
2. A smaller palette made the library easier to extend.
3. Rounded forms made financial actions feel more welcoming.

### Colour needed a job, not just a hex value

The design team defined a 60/25/10/5 structure:

- 60% grey for the primary form and largest surfaces.
- 25% blue for interactive and attention-drawing elements.
- 10% navy for anchoring details such as bezels, cables, and connectors.
- Up to 5% contextual colour for states such as success, error, warning, currency, or foliage.

The ratio gave the model more than a palette. It gave every colour a role and a limit.

Consistency also meant fixing the variables most likely to drift: a 45-degree isometric camera, soft top-left lighting, centred composition, rounded geometry, transparent backgrounds, and a restrained material language.

## 3. Choosing a direction

### I tested three shortcuts before proposing a system

The first options appeared faster, but each solved only the immediate asset.

#### Buying an illustration pack

A stock library could improve visual consistency quickly. It could not extend Neem or give Branch a rule set for future product-specific scenes.

#### Re-rendering every image from JSON

An image and a detailed JSON specification gave more control, but it created a maintenance problem. Every new asset needed its own specification, and the context was difficult for colleagues to reuse.

#### Copying a reference image through image-to-image generation

Retexturing a source image looked promising. Repeated tests showed that the model still changed materials, colour balance, and camera treatment between outputs.

### The stronger idea was to make the rules reusable

I proposed a Custom GPT that anyone with access could brief in natural language. Instead of asking every person to rebuild the visual context, the system would supply it.

I chose ChatGPT as the harness because it combined image generation, transparent-background output, and a shareable Custom GPT interface. The decision let me focus on the harder question: what instructions, rules, materials, and checks were required for the same visual language to survive every generation?

## 4. Building the system

### I structured it like a design system with an AI renderer

One long prompt would have been difficult to debug. I split the system into four responsibilities.

1. **Instructions** controlled behaviour, selected ideation or render mode, and locked the non-negotiables.
2. **Manifest** orchestrated the sequence and pointed to the correct knowledge files.
3. **Rules** defined colour, camera, lighting, composition, prompt contracts, and quality thresholds.
4. **Materials** described how each surface should look, what language produced it, and which failure patterns to block.

This separation gave the system a clear source of truth. A camera problem belonged in the rules. A plastic-looking metal belonged in the materials catalogue. A routing problem belonged in the manifest.

### Two ways in, one quality pipeline

The workflow supported two starting points:

- Ideation Mode turned a natural-language need into structured concepts.
- Render Mode used a reference image to identify parts and materials.

Both entered the same sequence: understand the object, assign parts and materials, apply colour roles, build the render prompt, generate, validate, and then deliver for human review.

The material-realism gate checked whether surfaces behaved as intended. If metal looked like plastic or rubber became glossy, the system added targeted corrections and rerendered. It could try twice before escalating to a person.

### What kept breaking

Five failures appeared repeatedly:

- Brand colours drifted between generations.
- Correct colours appeared in the wrong proportions.
- Related states changed lighting, material sheen, or colour balance.
- Surfaces defaulted to chrome, photorealism, plastic, or clay.
- Camera angle, centring, shadows, and lighting shifted.

I responded by turning recurring feedback into system rules. Negative instructions became as important as positive ones. “Use navy for rubber” was not enough. The system also needed “no pure black” and “no glossy rubber.”

### Six versions made the rules enforceable

| Version | System change | Why it mattered |
| --- | --- | --- |
| v1 | Locked camera, lighting, output, material recognition, and an initial realism gate. | Created the first repeatable production contract. |
| v2 | Added natural-material handling and stronger failure exclusions. | Expanded the range of scenes the system could describe. |
| v3 | Separated instructions, tightened material selection, and added reproducibility fields. | Reduced duplicated rules and made failures easier to trace. |
| v4 | Added precedence, provenance, version compatibility, and stricter interaction behaviour. | Stopped runtime requests and duplicated defaults from weakening the visual rules. |
| v5 | Introduced colour roles, ratios, part assignments, and ratio validation. | Addressed the largest source of library-wide drift. |
| v6 | Made pre-delivery colour validation mandatory. | Turned colour guidance into a release gate. |

The system passed through more than 500 image-generation iterations, often 10 to 15 for a final illustration. The purpose of that volume was not to chase a lucky result. It was to discover which failures were repeatable enough to become rules.

## 5. What changed

### The team gained a system, not a folder of finished assets

The illustration system is now live across Branch product markets. It gives colleagues a shared starting point for new product visuals and gives reviewers a clearer standard for deciding what belongs in the library.

The Custom GPT carries the repeatable context. People still decide what the illustration should communicate, whether it is appropriate for the screen, and which result is ready to ship. I generated and refined the illustrations, while the design team owned quality review and final selection.

### What I learned

I started this project without knowing whether I could make the idea work. I knew I was comfortable with complex problems, so I relied on the design process: understand the need, explore alternatives, build a small system, test it, and let evidence shape the next version.

Research gave me the first direction. Feedback from product managers, UX researchers, and designers gave the work more clarity as I moved forward.

Four lessons stayed with me:

1. AI systems improve when context, constraints, and failure conditions are explicit.
2. Human judgment is part of the architecture, especially for meaning, inclusivity, and final quality.
3. Complex AI work becomes more manageable when it is modular, like design-system primitives, tokens, components, and patterns.
4. A good system does not remove iteration. It makes each iteration teach the next one.

### Where I would take it next

- Convert selected raster illustrations into SVGs and motion-ready assets.
- Extend controlled access to marketing and other teams for presentations and internal projects.
- Package the same instruction and validation logic for another image-generation harness.
- Add a critique layer before human review.
- Improve the generation of related states so geometry, lighting, and materials stay even closer across a family.

The larger opportunity is to make the visual language portable without making it rigid. The system should carry Branch's standards. People should continue to carry the story.

