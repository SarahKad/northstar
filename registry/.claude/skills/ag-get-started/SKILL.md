---
name: ag-get-started
description: >
  Bootstrap a new AG Design System product, create the Next.js app, add AG
  colors and fonts, and verify the dev server runs. Use when the user invokes
  @ag-get-started alone for bootstrap-only, or as step 1 before @ag-vibe-start
  for the full Bootstrap + Shell setup. Does not scaffold the app shell unless
  the user also invokes @ag-vibe-start in the same session.
---

# AG Get Started

You are helping someone bootstrap a new AG product using the design system.
Assume they may not be an engineer, use plain language and ask before running commands.

**Scope:** Create the app, add AG tokens/styles and fonts, confirm the dev server runs.
**Out of scope:** App shell (login, dashboard, sidebar), unless the user also invoked `@ag-vibe-start` in the same message.

Docs: `/docs/getting-started` in the registry site. Manual shell steps: Cursor tab → Finish or redo shell, or Claude tab → Commands reference.

---

## Which mode am I in?

| User intent | What to do |
|-------------|------------|
| **Bootstrap + Shell** (default), user mentions `@ag-vibe-start`, "full app shell", "login and dashboard", or Getting Started Step 1 | Run this skill through step 7, then **immediately continue** with `@ag-vibe-start` in the same session. Do not stop and hand off. |
| **Bootstrap only**, user says "bootstrap only", "no shell", "no app shell", or uses only `@ag-get-started` with explicit bootstrap-only language | Run steps 1–7 below, then **STOP**. Do not run `scaffold:shell`, `install-components.sh`, or add routes. |

## Cursor browser rules (critical)

When running in **Cursor IDE**:

1. **Never open Simple Browser** or tell the user to preview the registry during install steps.
2. The registry is a **background download server only**, not the user's app.
3. If Cursor auto-opens a preview showing **Getting Started / component docs**, tell the user immediately:
   > *That is the design system site, not your app. You can close that tab. Your app will open next.*
4. Use **`npm run dev:install`** in `REGISTRY_DIR` (port **3002**) for shadcn downloads, keeps port **3000** free for the user's app.
5. **Stop the registry install server** before starting the app's `npm run dev`:
   ```bash
   lsof -ti :3002 | xargs kill -9 2>/dev/null || true
   ```
6. Only open/preview the browser for **`MY_APP_DIR`** after its dev server runs, ideally on `http://localhost:3000`.

---

## Before you run anything

1. Get **REGISTRY_DIR**, full path to the saved design system kit on disk (the inner `registry` folder). The user does **not** need this folder open in Cursor.
2. Get **MY_APP_DIR**, full path to the user's **project folder** (usually already open in Cursor). The app is created or updated here.
3. **Read skills from disk**, if `@ag-get-started` is not in the workspace, read and follow `REGISTRY_DIR/.cursor/skills/ag-get-started/SKILL.md` (and `ag-vibe-start` when continuing to shell).
4. Confirm `REGISTRY_DIR` exists and contains `.cursor/skills/`, `templates/app-shell/`, and `public/r/`.
5. Explain each step in plain language before executing it.
6. Ask the user to approve before every terminal command.

---

## Bootstrap sequence

Run these steps in order. Skip a step only if it is already done.

### 1. Create the app

If `MY_APP_DIR` does not exist or is empty:

```bash
npx create-next-app@latest "MY_APP_DIR" --typescript --tailwind --app --yes
cd "MY_APP_DIR"
npx shadcn@latest init --yes
```

If the app already exists, `cd "MY_APP_DIR"` and confirm shadcn is initialized.

### 2. Confirm workspace (skip if already open)

If `MY_APP_DIR` is not the folder the user has open in Cursor, tell them:

> **File → Open Folder** → open your project folder (`MY_APP_DIR`).
> Build your product there, not inside the design system kit folder.

If they already opened `MY_APP_DIR` in Step 0, skip this step.

### 3. Start the registry install server (background only)

From `REGISTRY_DIR`, **do not open in browser**:

```bash
cd "REGISTRY_DIR"
npm run dev:install
```

Run in the **background**. shadcn installs use **`http://localhost:3002`**, a download URL, not something the user should browse.

### 4. Add AG colors and styles

From the **app** folder:

```bash
cd "MY_APP_DIR"
npx shadcn@latest add http://localhost:3002/r/ag-globals
```

If install fails, confirm `dev:install` is still running in `REGISTRY_DIR`, or copy `globals.css` and `src/themes/` manually.

### 5. Stop the registry install server

Before starting the user's app:

```bash
lsof -ti :3002 | xargs kill -9 2>/dev/null || true
```

### 6. Add AG fonts

Update `src/app/layout.tsx` in the app:

- **Atkinson Hyperlegible Next** → `--font-sans` (body, UI)
- **Instrument Serif** → `--font-display` (headings), weight **400 only**
- **Geist Mono** → `--font-geist-mono` (code)

Apply font variables on `<html>`. Set `data-theme="ag"` and default light/dark classes on `<html>` if not already present.

Do **not** add `ThemeProvider` yet, that ships with the app shell (`@ag-vibe-start`).

### 7. Verify bootstrap

From `MY_APP_DIR`:

```bash
npm run dev
```

Confirm the **app** (not the registry) runs on **`http://localhost:3000`** with AG styling (warm background, AG typography). The default Next.js page is fine, shell routes come next.

If the app lands on port 3001, stop any registry server on 3000 first, then restart the app dev server.

---

## Hand off to the user (bootstrap only)

When bootstrap is complete **and the user did not also invoke `@ag-vibe-start`**, tell the user:

> **Your app foundation is ready.** Next steps:
>
> - **Want login, sidebar, and a sample dashboard?** In Chat, run **`@ag-vibe-start`** and ask it to scaffold the app shell.
> - **Already know what you want to build?** Skip the shell and start prompting, e.g. *"Build a settings page with AG components."* Use **`@ag-vibe-start`** as you go so colors, typography, and components stay on-brand.

Do not continue into app shell unless the user also invoked `@ag-vibe-start` or asked for the full shell in the same session.

## Continue to app shell (Bootstrap + Shell)

When the user invoked **both** `@ag-get-started` and `@ag-vibe-start`, or asked for the full app shell, finish bootstrap (steps 1–7) then **immediately run the `@ag-vibe-start` skill**, do not stop to ask whether they want the shell.

## Troubleshooting

- **shadcn add fails**, confirm `npm run dev:install` is running in `REGISTRY_DIR` and the URL is `http://localhost:3002/r/ag-globals`.
- **User sees design system docs in browser**, that is the registry, not their app. Close it; open the app folder's dev server instead.
- **Wrong folder**, registry commands run from `REGISTRY_DIR`; app commands run from `MY_APP_DIR`.
- **After shell exists**, see `MY_APP_DIR/src/components/ag-shell/INSTALL.md`.

---

## Do not (bootstrap-only mode)

When the user asked for bootstrap only:

- Do not run `npm run scaffold:shell`
- Do not run `install-components.sh`
- Do not add `ThemeProvider`, `/login`, `/dashboard`, or `middleware.ts`
- Do not load or follow `@ag-vibe-start`

## Do not (always)

- Do not open Simple Browser for the registry
- Do not run `npm run dev` (port 3000) in REGISTRY_DIR during bootstrap, use `dev:install` on 3002
- Do not build product pages or features beyond bootstrap (unless continuing to `@ag-vibe-start`)
- Do not add decorative accent callouts (`border-l-brand`, thick colored left borders) on cards, blocks, tables, containers, or docs panels, use `border border-border bg-muted/30` or plain text only
