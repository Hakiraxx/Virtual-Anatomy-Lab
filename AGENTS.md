# MedAnatomy 3D — Workspace Guidelines & Rules
<!-- Unified rules compiled from No-Slop UI, Vercel Web Interface Guidelines, Cursor Designer, and Cursor Rules -->

## 1. Core Engineering & Communication (Cursor Rules)

- **Direct Communication**: Be direct, concise, and technical. Skip pleasantries and meta-commentary; prioritize actionable code changes.
- **Strict TypeScript**: Never use `any`. Define precise interfaces and type definitions. Leverage utility types and strict null checks.
- **Modern React Architecture**: Use pure functional components, hooks with strict dependency integrity, and composition over deep prop-drilling.
- **Zero Extraneous Packages**: Never install or assume new UI/CSS libraries without explicit user consent. Always inspect existing packages in `package.json`.

---

## 2. No-Slop UI Standards (No-Slop UI)

Build for humans: functional, restrained, clean, and normal. Avoid generic "AI-generated" aesthetics.

### Hard Banned Patterns
- **NO Floating Detached Sidebars**: Use fixed, solid backgrounds with a 1px border.
- **NO Decorative Gradients**: No gradient backgrounds, gradient text, gradient borders, or cyan glows on dark blue.
- **NO Glassmorphism Everywhere**: Use solid, purposeful surfaces with subtle borders instead of layered frosted glass.
- **NO Oversized Radii & Pill Buttons Everywhere**: Keep border-radius restrained (6–10px for buttons/inputs, 8–12px max for cards).
- **NO Eyebrow Labels**: Avoid `<small>CATEGORY</small>` stacked awkwardly above headings. Use clear, semantic typography hierarchy.
- **NO KPI Metric-Card Grids by Default**: Layout content according to actual workflows, not decorative stat boxes.
- **NO Decorative Marketing Copy in Functional Tools**: Use direct, functional labels and instructions.
- **NO Transform/Scale Animations on Hover**: No `scale(1.05)` or `translateX(2px)` on hover. Use subtle background, border, or opacity transitions (100–200ms ease).
- **NO Ad-hoc Spacing**: Strictly follow the 4/8/12/16/24/32px scale.

---

## 3. Web Interface & Interaction Guidelines (Vercel)

### Accessibility & Navigation
- **Keyboard First**: Full keyboard navigation per WAI-ARIA APG.
- **Focus Visibility**: Visible, unobscured focus rings (`:focus-visible`). **NEVER** use `outline: none` without an explicit focus replacement.
- **Semantic Navigation**: Always use `<a>` or `<Link>` for navigation to support Cmd/Ctrl/middle-click. **NEVER** use `<div onClick>` for navigation.
- **URL State Synchronization**: Reflect view states, filters, active tabs, and modals in the URL where deep linking is beneficial.

### Targets & Input Usability
- **Hit Targets**: Minimum hit area of 24×24px (44×44px on touch/mobile).
- **Mobile Inputs**: Input font-size $\ge 16\text{px}$ on mobile to prevent iOS Safari auto-zooming; set `touch-action: manipulation`.
- **Forms**:
  - Never block paste in inputs or textareas.
  - Loading buttons must preserve their original label alongside the spinner to avoid layout jump.
  - Display validation errors inline next to the relevant field; focus the first error on submit.
  - Use appropriate `autocomplete`, `inputmode`, and semantic input `type`.
  - Modals and drawers must set `overscroll-behavior: contain`.

### Content Handling & Typography
- **Flex Child Truncation**: Always add `min-w-0` to flex children that contain truncated text (`truncate`, `line-clamp-*`).
- **Tabular Numbers**: Use `font-variant-numeric: tabular-nums` for numeric comparisons, counters, and timers.
- **No Orphan Characters**: Use proper ellipsis `…` character (not three periods `...`).

### Animation & Performance
- **Compositor Only**: Animate only compositor-friendly properties (`transform`, `opacity`). **NEVER** animate layout properties (`top`, `left`, `width`, `height`).
- **Explicit Transitions**: **NEVER** use `transition: all`. Always specify transitioned properties explicitly.
- **Respect Motion Preferences**: Honor `prefers-reduced-motion` with reduced variants or disabled non-essential motion.
- **Cumulative Layout Shift (CLS)**: Always specify explicit dimensions or aspect ratios for media/images.

---

## 4. UX, Information Architecture & Design Guardrails (Cursor Designer)

### Token Integrity
- **Existing Tokens First**: Inspect and utilize existing Tailwind CSS configurations, CSS custom properties, and theme colors before introducing new styles.
- **No Invented Systems**: Never invent random color codes or ad-hoc design systems out of thin air.

### Information Architecture & Heuristics
- **Shallow Hierarchies**: Maintain shallow navigation depths ($\le 3$ levels) with stable, noun-based labels.
- **Nielsen's 10 Heuristics**:
  - *Visibility of System Status*: Immediate visual feedback for operations, loading states, and network actions.
  - *Error Prevention & Recovery*: Confirm destructive actions or provide an Undo window; clear recovery paths for all error states.
  - *Progressive Disclosure*: Surface primary controls first; reveal advanced options on demand.
- **Design for All Viewports**: Responsive layout tiers across Mobile ($< 768\text{px}$), Tablet ($768\text{px} - 1199\text{px}$), and Desktop ($\ge 1200\text{px}$).
