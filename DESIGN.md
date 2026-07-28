---
name: Lums Portfolio
description: Minimal, technical, and modern portfolio showcasing foundational UX and strategic product design.
colors:
  primary: "#e07b3c"
  neutral-bg: "#0a0a0f"
  neutral-surface: "#141419"
  neutral-text: "#f5f5f0"
  neutral-muted: "#999999"
  border: "#2a2a30"
typography:
  display:
    fontFamily: "'Google Sans Display', 'Google Sans', -apple-system, sans-serif"
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "'Playfair Display', Georgia, serif"
  body:
    fontFamily: "'Google Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif"
    lineHeight: 1.6
  label:
    fontFamily: "'JetBrains Mono', 'SF Mono', 'Consolas', monospace"
rounded:
  sm: "6px"
  md: "12px"
  lg: "16px"
  xl: "24px"
  full: "9999px"
spacing:
  xs: "0.25rem"
  sm: "0.5rem"
  md: "1rem"
  lg: "1.5rem"
  xl: "2rem"
  2xl: "3rem"
  3xl: "4rem"
  4xl: "6rem"
  5xl: "8rem"
components:
  nav:
    backgroundColor: "rgba(10, 10, 15, 0.85)"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.neutral-bg}"
    rounded: "{rounded.full}"
---

# Design System: Lums Portfolio

## 1. Overview

**Creative North Star: "The Precision Engineer"**

This system is modern yet recognizable, built to reflect a thoughtful, un-rushed approach to interface creation. It avoids unnecessary decoration, letting the structure and typography do the heavy lifting. The copywriting is simple to understand but precise, using the right jargon where necessary to signal expertise. We explicitly reject "AI slop"—thoughtlessly generated templates, generic SaaS tropes, or chaotic overstuffed layouts.

**Key Characteristics:**
- Restrained and deliberate
- High-contrast, dark-immersive default
- Flat by default (no shadows)
- Purposeful use of technical monospaced accents

## 2. Colors

The palette is a strict, dark-immersive canvas punctuated by a single, highly saturated accent.

### Primary
- **Warm Rust** (#e07b3c): The sole action color. Used sparingly for links, active states, and critical emphasis. Its rarity is the point.

### Neutral
- **Deep Void** (#0a0a0f): The primary app background. Deepest layer.
- **Surface Dark** (#141419): Elevated surface backgrounds (cards, modals).
- **Crisp Paper** (#f5f5f0): Primary text.
- **Muted Ash** (#999999): Secondary text and supporting metadata.
- **Structural Line** (#2a2a30): Borders, dividers, and structural scaffolding.

### Named Rules
**The One Voice Rule.** Warm Rust is the only brand color. Never introduce secondary or tertiary hues. If it's not Warm Rust, it's a neutral.

## 3. Typography

**Display Font:** Google Sans Display (with sans-serif)
**Headline Font:** Playfair Display (with serif)
**Body Font:** Google Sans (with sans-serif)
**Label/Mono Font:** JetBrains Mono (with monospace)

**Character:** A highly structured, editorial-technical pairing. Google Sans provides clean, modern geometry, while Playfair Display injects a touch of editorial warmth for key headlines. JetBrains Mono provides strict technical contrast.

### Hierarchy
- **Display** (600, fluid 56-96px, 1.1): Hero headlines only. Extremely tight tracking.
- **Headline** (400/italic, fluid 32-60px, 1.2): Section intros and narrative breaks.
- **Title** (500, fluid 24-32px, 1.3): Card titles and component headers.
- **Body** (400, fluid 16-18px, 1.6): Long-form reading and component descriptions. Cap line length at 65–75ch.
- **Label** (400, fluid 12-14px, normal): Technical metadata, tags, and small utility text.

### Named Rules
**The Mono Metadata Rule.** Dates, technical tags, and code-adjacent labels must use JetBrains Mono to reinforce the "precision engineer" aesthetic.

## 4. Elevation

This system is strictly flat. We do not use drop shadows to convey depth.

### Named Rules
**The Flat-By-Default Rule.** Surfaces are flat at rest. Depth is conveyed entirely through tonal shifts (Surface Dark against Deep Void) and structural borders (#2a2a30), never through drop shadows or blurs.

## 5. Components

Components are crisp, restrained, and get out of the way of the content.

### Buttons
- **Shape:** Fully rounded (9999px)
- **Primary:** Warm Rust background, Deep Void text.
- **Hover / Focus:** Transitions to slightly lighter Warm Rust (#e8944f).

### Navigation
- **Style:** Fixed top, translucent background with heavy background blur.
- **State:** Gains a structural bottom border on scroll.

### Containers
- **Corner Style:** Slightly rounded (12px to 16px).
- **Background:** Surface Dark (#141419).
- **Shadow Strategy:** None. Outlined with a 1px structural border instead.

## 6. Do's and Don'ts

### Do:
- **Do** ensure every element on the screen earns its place. Precision over noise.
- **Do** use typography scale and weight contrast (not color) to establish hierarchy.
- **Do** write copy that is simple, yet technically precise.

### Don't:
- **Don't** use drop shadows. The system is flat.
- **Don't** use generic SaaS tropes or chaotic overstuffed layouts ("AI slop").
- **Don't** use glassmorphism as a default decoration (only functional blurs, like the sticky nav).
