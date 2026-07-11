# Project North Star

A Stage 1 component registry for Project North Star, consumed by North Star development teams primarily through AI coding tools (Cursor, Claude Code).

---

## What this is

A living documentation site and component reference built with Next.js 15, React 19, TypeScript, and Tailwind v4. It is the single source of truth for UI components, design tokens, and usage guidelines across North Star product development.

This is **not** yet a published npm package, that is the Stage 2 goal. For now, teams reference components directly from this registry.

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router, webpack) |
| UI Runtime | React 19 |
| Language | TypeScript 5 (strict mode) |
| Styling | Tailwind CSS v4 |
| Component primitives | Base UI (headless, accessible) |
| Icons | Phosphor Icons |
| Color space | OKLCH |

---

## Token architecture

Tokens follow a three-tier system:

```
Primitive  →  Semantic  →  Component
--primitive-brand-58     --brand          --ring
--primitive-neutral-15   --foreground     --sidebar-foreground
```

- **Primitives** are raw named values (`globals.css`, top of `:root`). Never used directly in components.
- **Semantic** tokens carry meaning (background, foreground, destructive). Light/dark theming lives here.
- **Component** tokens are scoped to a specific component (e.g. `--sidebar-*`, `--chart-*`).

---

## Project structure

```
src/
├── app/
│   ├── docs/          # Foundation documentation pages
│   ├── components/    # Component detail pages (dynamic route)
│   └── blocks/        # Block preview pages
├── components/
│   ├── ui/            # Base components (Button, Card, Input…)
│   ├── blocks/        # Composed patterns (StatsOverview, ChartBar…)
│   └── registry/      # Registry UI shell (nav, playground, search…)
├── templates/
│   └── app-shell/     # Starter for new Next.js apps (login + dashboard)
└── lib/
    ├── registry.ts    # Component metadata, source of truth
    ├── nav-config.ts  # Navigation structure, source of truth
    └── code-generator.ts
```

---

## App shell (new web apps)

Scaffold a production-ready layout **before** feature work:

```bash
npm run scaffold:shell -- /path/to/my-new-app
```

Includes demo `/login`, `/dashboard` showcase (sidebar, top nav, cards, stepper, table, charts), and `middleware.ts`. **Offline:** open `START_HERE.html` in this folder. **Online:** Getting Started at `/docs/getting-started`.

---

## Running locally

```bash
npm install
npm run dev
# → http://localhost:3000
```

### If you see Internal Server Error or broken pages after edits

This is almost always **not** a bad code change, it is a **stale dev server** or **corrupted `.next` cache**.

1. Stop every dev server (all terminals running `npm run dev`, plus Cursor/Claude background tasks).
2. Free port 3000 (macOS):

   ```bash
   lsof -ti :3000 | xargs kill -9 2>/dev/null
   lsof -ti :3001 | xargs kill -9 2>/dev/null
   ```

3. Start fresh on port 3000:

   ```bash
   npm run dev:clean
   ```

4. Open **http://localhost:3000** (not 3001). If Next says it switched to 3001, something is still holding 3000, repeat step 2.

When two `next dev` processes run, the old one on 3000 often serves outdated webpack chunks (`Cannot find module './611.js'`) or 404/500 responses while the new server on 3001 works fine.

---

## Themes

Three themes are registered in this design system. All are selectable from the sidebar footer theme picker.

| Theme ID | Name | Mode default | Brand |
|---|---|---|---|
| `ag` | NS Core | Light | `#72B0AB` Sapphire |
| `navy` | Peacock | Light | `#053229` Peacock |
| `ns-pro` | NS Pro | **Dark** | `#355E58` Spruce / `#72B0AB` Sapphire |

### Chart token dark mode rule

In **light mode**, chart scales run dark → light. In **dark mode**, the scale is reversed (light → dark) so series remain visible against the dark background. This is implemented in `ag-core.css` and `navy.css` (Peacock). Always verify chart token contrast against `--background` in both modes when creating a new theme.

### NS Pro, chart scale order

NS Pro chart-1 through chart-7 use the North Star palette: **Sapphire → Ballet Slipper → Sage → Pistachio → Bubblegum → Spruce → Arctic**.

### NS Pro, accent color restrictions

NS Pro includes a restricted accent palette. These colors exist **only for charts/graphs and badges/tags**:

| Chart token | Badge token | Color | Hex |
|---|---|---|---|
| `--chart-1` | `--ns-badge-1` | Sapphire | `#72B0AB` |
| `--chart-2` | `--ns-badge-5` | Ballet Slipper | `#FE9179` |
| `--chart-3` | `--ns-badge-6` | Sage | `#CFB97E` |
| `--chart-4` | `--ns-badge-7` | Pistachio | `#B89D47` |
| `--chart-5` | `--ns-badge-4` | Bubblegum | `#FDC1B4` |
| `--chart-6` | — | Spruce | `#355E58` |
| `--chart-7` | `--ns-badge-2` | Arctic | `#BCDDDC` |
| `--ns-accent-gradient` |, | Ballet Slipper→Sage→Sapphire | `#FE9179 → #CFB97E → #72B0AB` |

Badge-only tokens: Lace (`--ns-badge-3`, `#FFEDD1`).

**Never use these in buttons, navigation, layout, typography, forms, or any component outside charts and badges.** They are undefined (transparent) in all other themes.

To add a new theme: create `src/themes/[id].css`, import it in `src/app/globals.css`, and add an entry to `src/themes/index.ts`.

---

## Regenerating the component manifest

`public/registry.json` is the machine-readable component manifest used by AI tools and MCP servers. Regenerate it whenever `src/lib/registry.ts` changes:

```bash
npm run registry:generate
```

---

## Scaffolding scripts

| Command | Purpose |
|---------|---------|
| `npm run scaffold:shell -- <path>` | Copy app shell template into a Next.js project |
| `npm run registry:generate` | Regenerate `public/registry.json` and `public/r/*.json` |

---

## Adding a new component

1. Create `src/components/ui/[name].tsx`, add JSDoc to every exported function and prop
2. Add an entry to `src/lib/registry.ts` with slug, name, description, category, usage, props, doList, dontList
3. Add a renderer case in `src/components/registry/component-renderer.tsx`
4. Add a code generator in `src/lib/code-generator.ts`
5. Run `npm run registry:generate` to update `public/registry.json`
6. Run `npx tsc --noEmit`, zero errors required
7. Update `CHANGELOG.md`

---

## Requesting a component

Open an issue using the **Component Request** template in `engineering request templates`. All requests require team approval before work begins.

## Reporting a bug

Open an issue using the **Bug Report** template.

---

## Governance

- All changes require team approval before merging
- Every release updates `CHANGELOG.md`
- Component requests and bugs tracked via engineering

---

## Figma

The Figma file mirrors this registry. Code Connect is wired for the Card component and will be expanded to all components in Stage 2.
