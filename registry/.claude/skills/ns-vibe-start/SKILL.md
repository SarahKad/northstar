---
name: ns-vibe-start
description: >
  Scaffold the North Star app shell and build on-brand UI with the Project North Star.
  Use with @ns-get-started for full Bootstrap + Shell setup; or alone when the
  app is already bootstrapped. Use when building pages, components, or vibe-coding
  with NS tokens and themes.
---

# NS Vibe Start

You are helping someone build with the Project North Star, app shell first, then
on-brand UI. The end result should match the registry and Figma handoffs.

**Prerequisite:** If the user has no app yet, tell them to run **`@ns-get-started`** first.

**Read the full token reference before writing UI code:**
`.claude/skills/ns-vibe-start/references/token-reference.md`

Docs: `/docs/getting-started`

---

## Cursor browser rules (critical)

When running in **Cursor IDE**:

1. **Never open Simple Browser** for the registry during scaffold or component install.
2. If Cursor auto-opens **Getting Started / component docs** on localhost, tell the user immediately:
   > *That is the design system site downloading components in the background, not your app. Close that preview. Your app will open when install finishes.*
3. Use **`npm run dev:install`** in `REGISTRY_DIR` (port **3002**) for installs, keeps port **3000** for the user's app.
4. Set **`NS_REGISTRY_URL=http://localhost:3002`** when running `install-components.sh`.
5. **Stop the registry install server** before starting the app's dev server:
   ```bash
   lsof -ti :3002 | xargs kill -9 2>/dev/null || true
   ```
6. Only preview **`MY_APP_DIR`**, visit `/login` and `/dashboard` on the **app** dev server (prefer port 3000).

---

## When to use this skill

| User goal | What to do |
|-----------|------------|
| Full app with login + dashboard | Scaffold app shell (below), then customize |
| Single page or component | Build with semantic tokens; install components from registry |
| Already bootstrapped via `@ns-get-started` | Start at app shell or UI building |

---

## App shell sequence

Run when the user wants the starter layout (login, sidebar, dashboard, charts).

Assume **REGISTRY_DIR** (saved kit on disk) and **MY_APP_DIR** (project folder, often open in Cursor) are known. Ask if missing. Read `REGISTRY_DIR/.cursor/skills/ns-vibe-start/SKILL.md` if `@ns-vibe-start` is not in the workspace.

1. **Scaffold** from registry (no localhost needed):
   ```bash
   cd "REGISTRY_DIR"
   npm run scaffold:shell -- "MY_APP_DIR"
   ```

2. **Start registry install server** in the background, **do not open in browser**:
   ```bash
   cd "REGISTRY_DIR"
   npm run dev:install
   ```

3. **Install shell components** from the app:
   ```bash
   cd "MY_APP_DIR"
   export NS_REGISTRY_URL="http://localhost:3002"
   bash src/components/ag-shell/install-components.sh
   ```

4. **Stop registry install server**:
   ```bash
   lsof -ti :3002 | xargs kill -9 2>/dev/null || true
   ```

5. **Wire ThemeProvider** in `src/app/layout.tsx`, fonts, theme init script, `ThemeProvider`. See `templates/app-shell` or Getting Started → Cursor tab (Finish or redo shell).

6. **Verify the app**, `npm run dev` in `MY_APP_DIR`, then `/login` and `/dashboard` on the **app** URL (not the registry).

7. Walk through **`src/components/ag-shell/INSTALL.md`** for anything missed.

Explain each step in plain language. Ask before running commands.

---

## Build UI correctly

Every piece of UI must follow these principles:

**Colors, semantic tokens only**
```tsx
<div className="bg-card border border-border rounded-lg p-6">
```

**Typography, let the base layer work**
```tsx
<h1>Page Title</h1>
<h2>Section</h2>
```

**Icons, Phosphor only**
```tsx
import { ArrowRight } from "@phosphor-icons/react"
<ArrowRight className="size-4" />
```

Remove demo sections from `dashboard-showcase.tsx` as the user replaces them with real content.

---

## Hard rules, never break these

1. **No raw hex or rgb() in component code**, semantic tokens only
2. **No font-medium/semibold/bold on headings**, Bitter is weight 400 only
3. **No lucide-react**, `@phosphor-icons/react` only
4. **No opening registry in Simple Browser** during setup
5. **No `window`/`document` outside `useEffect`**
6. **No decorative accent callouts**, do not use `border-l-brand`, `border-l-4` accent rails, or colored left-edge boxes on cards, blocks, tables, containers, or docs panels; use `border border-border bg-muted/30` or typography only

---

## Full reference

`.claude/skills/ns-vibe-start/references/token-reference.md`
