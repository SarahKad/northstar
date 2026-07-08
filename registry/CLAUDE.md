# AG Design System, Claude Code Instructions

This is the Assemblies of God design system registry. Read this file completely before writing any code. Every rule here is a hard requirement, not a suggestion.

---

## What this repo is

A Stage 1 component registry built with Next.js 15, React 19, TypeScript, and Tailwind v4. It is the single source of truth for UI components, design tokens, and usage guidelines across AG product development. It is **not** a published npm package yet, teams reference components directly from this registry.

---

## Non-negotiable rules

### Tokens, always, no exceptions
- **Never use hardcoded color values**, no hex codes, no `rgb()`, no Tailwind color utilities like `bg-blue-500`
- **Always use semantic tokens**, `bg-background`, `text-foreground`, `text-muted-foreground`, `border-border`, `bg-card`, `text-primary`, etc.
- **Never use primitive tokens directly in components**, primitives (`--primitive-neutral-15`) exist only to define semantic tokens in theme files
- If a semantic token doesn't exist for what you need, ask before inventing one

### Typography, exact fonts, exact usage
- **Instrument Serif** (`font-heading`), h1 and h2. **Must never render below 30px (`text-3xl`)**, at smaller sizes it loses legibility and visual quality. If a section label needs to render smaller than 30px, use h3, not h2
- **Atkinson Hyperlegible** (`font-sans`), all body text, UI labels, h3 through h6
- **Geist Mono** (`font-mono`), code blocks and monospace only
- Never use any other font family
- Never apply `font-bold` or `font-semibold` to Instrument Serif elements
- Never apply `font-heading` to any element that could render smaller than 30px
- Never override an h2 with a size class smaller than `text-3xl`, if you think you need to, you want an h3

### Heading sizes, use the scale
The base layer defines default sizes. Use them or explicitly override with a Tailwind size utility, never rely on browser defaults:
- h1 → `text-4xl` + `font-heading` (Instrument Serif)
- h2 → `text-3xl` + `font-heading` (Instrument Serif), never below 30px
- h3 → `text-2xl` + `font-semibold` (Atkinson Hyperlegible)
- h4 → `text-xl` + `font-semibold` (Atkinson Hyperlegible)
- h5 → `text-lg` + `font-medium` (Atkinson Hyperlegible)
- h6 → `text-base` + `font-medium` (Atkinson Hyperlegible)

### Border radius
- The global base radius is `--radius: 4px`, set in every theme file
- Use `rounded-sm`, `rounded-md`, or `rounded-lg` from the radius scale, never `rounded-full` on non-circular elements
- Never add arbitrary radius values

### Components, use what exists
- Before writing a new UI element, check `src/components/ui/` and `public/registry.json`
- If a component exists in the registry, use it, do not re-implement it inline
- Components are built on Base UI primitives for accessibility, do not replace them with plain HTML elements

### TypeScript, strict always
- All props must be strictly typed with union types, no `string` where `'primary' | 'secondary'` is correct
- Export types for every component
- Run `npx tsc --noEmit` before considering any task done, zero errors required
- Add JSDoc comments to every prop, this is part of the definition of done, not optional

### SSR safety
- Never reference `window`, `document`, or `navigator` outside of a `useEffect` or a `"use client"` component
- All components must render correctly on the server

---

## Token architecture

Three tiers, never skip a tier:

```
Primitive  →  Semantic  →  Component
--primitive-neutral-15   --foreground     (used in components)
--primitive-brand-58     --brand
```

**Primitives** live in `src/app/globals.css` (`:root` block). Raw oklch values. Never use in components.

**Semantic tokens** live in `src/themes/ag-core.css`, `src/themes/navy.css`, and `src/themes/bep-pro.css`. These are what components consume. Light/dark theming is handled here, primitives never change between themes, only semantic mappings do.

**Component tokens** are scoped tokens like `--sidebar-*` and `--chart-*`. Used only within their component.

---

## Theming

- Three themes: `ag` (default), `navy`, and `bep-pro`
- Dark mode is handled via the `.dark` class on `<html>`, semantic tokens automatically respond
- Never hardcode light-only or dark-only values, always use semantic tokens that work in both
- To add a new theme: create a new file in `src/themes/`, follow the existing pattern, import it in `globals.css`, register it in `src/themes/index.ts`

### Chart color tokens, dark mode inversion rule

In light mode, chart scales run dark → light. In dark mode, the order **must be reversed** (light → dark) so chart series remain visible against the dark background. This is already implemented in `ag-core.css` and `navy.css`. When adding new themes, always verify chart colors contrast with the theme's `--background` in both modes.

### BEP Pro theme, accent color rules (hard requirement)

BEP Pro is **dark-first**, the base `[data-theme="bep-pro"]` selector applies dark tokens. Light mode is the secondary state via `.light`.

BEP Pro brand: `#3D82F0` (dark mode) / `#1A56DB` BEP Blue (light mode).

BEP Pro chart scale order (chart-1 → chart-5): **blue → orange → purple → peach → red**. Extended tokens chart-6 (dark red `#7F1D1D`) and chart-7 (lavender `#DDD6FE`) exist for future use.

BEP Pro defines a restricted accent palette (`#60A5FA`, `#AC94FA`, `#DDD6FE`, `#FB923C`, `#FDBA8C`, `#7F1D1D`, `#EF4444`, and gradient `#FB923C → #EF4444 → #788FFA`) that exists **only for charts/graphs and badges/tags**.

These colors are exposed as:
- `--chart-1` through `--chart-7` (charts/graphs only)
- `--bep-badge-1` through `--bep-badge-7` (badges/tags only)
- `--bep-accent-gradient` (badges/charts only)

**Non-negotiable rules for BEP Pro accent colors:**
- Never use these tokens in layout, navigation, buttons, forms, typography, or any component outside charts and badges
- Never use their hex values as hardcoded colors anywhere in the codebase
- These tokens are undefined (transparent) in all other themes, misuse outside BEP Pro produces invisible elements
- Only apply BEP Pro accent colors when the user explicitly instructs you to build a BEP Pro-themed component

---

## File structure

```
src/
├── app/
│   ├── docs/          # Foundation documentation pages
│   ├── components/    # Component detail pages
│   └── blocks/        # Block preview pages
├── components/
│   ├── ui/            # Base components, Button, Card, Input, etc.
│   ├── blocks/        # Composed patterns, StatsOverview, FormCard, etc.
│   └── registry/      # Registry UI shell, nav, search, playground
└── lib/
    ├── registry.ts    # Component metadata, source of truth
    ├── nav-config.ts  # Navigation structure
    └── code-generator.ts
src/themes/            # Theme CSS files (ag-core.css, navy.css, bep-pro.css)
public/registry.json   # Machine-readable component manifest for AI tools and MCP
templates/app-shell/   # Scaffold for new consumer apps (npm run scaffold:shell)
```

---

## New consumer app, app shell first

When starting a **new Next.js product** (not a single component in an existing repo):

1. Run `npm run scaffold:shell -- /path/to/project` from this registry repo
2. Point the team to `src/components/ag-shell/INSTALL.md` in the target project
3. Docs: `/docs/getting-started` (Cursor or Claude tab for shell install reference)

The shell includes demo `/login`, `/dashboard` with charts, sidebar, and top nav. Charts need `chart.tsx`, theme `--chart-*` tokens, and container min-heights.

---

## Adding a new component

Follow this order exactly:

1. Create `src/components/ui/[name].tsx`
   - TypeScript props interface with union types on every variant/size prop
   - JSDoc block on the component function, describe every variant and size
   - JSDoc comment on every prop
   - SSR-safe, no browser globals outside useEffect
   - Use only semantic tokens for all colors
2. Add an entry to `src/lib/registry.ts`, slug, name, description, category, usage, props, doList, dontList
3. Add a renderer case in `src/components/registry/component-renderer.tsx`
4. Add a code generator case in `src/lib/code-generator.ts`
5. Run `npm run registry:generate` to update `public/registry.json`
6. Run `npx tsc --noEmit`, zero errors
7. Update `CHANGELOG.md`

---

## What never to do

- No `style={{ color: '#DA291C' }}` or any inline style with a raw value
- No `className="bg-blue-500"` or any Tailwind color outside the semantic token system
- No `font-bold` on Instrument Serif
- No `rounded-full` on non-circular elements
- No hardcoded pixel values for spacing, use Tailwind spacing utilities
- No skipping JSDoc on new components
- No committing with TypeScript errors
- No duplicating a component that already exists in `src/components/ui/`
- No browser globals (`window`, `document`) outside `useEffect`
- **No BEP Pro accent colors (`#60A5FA`, `#AC94FA`, `#DDD6FE`, `#FB923C`, `#FDBA8C`, `#7F1D1D`, `#EF4444`) outside charts/graphs and badges/tags**, not in buttons, nav, layout, typography, forms, or any other component
- **No BEP badge tokens (`bg-bep-badge-*`) or BEP gradient (`var(--bep-accent-gradient)`) outside the BEP Pro theme context**, these are undefined in all other themes

---

## Running locally

```bash
npm install
npm run dev       # → http://localhost:3000
npm run registry:generate   # Regenerate public/registry.json after registry.ts changes
npx tsc --noEmit            # Type check, must pass before any commit
```

---

## Governance

- All changes require Gloo approval before merging
- Every release must update `CHANGELOG.md`
- Component requests and bugs are tracked via GitHub Issues
- AI-generated code scaffolds only, always review before merging
