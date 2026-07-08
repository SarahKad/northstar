# AG Design System

Stage 1 component registry and offline setup kit for Assemblies of God product teams. Built for use with **Cursor** and **Claude Code**, not as a published npm package (yet).

---

## Repo layout

```
AG Design System/                 ← this repo
├── START_HERE.html               ← offline Getting Started (double-click first)
├── registry/                     ← Next.js docs site + component source (main app)
│   ├── src/components/ui/        ← base components (Button, Card, Chart…)
│   ├── src/components/blocks/    ← composed patterns
│   ├── templates/app-shell/      ← login + dashboard starter for new apps
│   ├── public/r/                 ← shadcn-installable component JSON
│   └── .cursor/skills/           ← ag-get-started, ag-vibe-start
├── bep-pro-theme/                ← BEP Pro theme CSS and docs
├── assets/                       ← shared design assets
└── design-system-pathways.html   ← internal pathways reference (static)
```

**Shipped kit** (for PMs and offline setup) is built from `registry/`:

```
AG Design System Kit/
  START_HERE.html
  README.txt
  AG Design System/               ← paste this path as REGISTRY_DIR
```

Build it with:

```bash
cd registry
npm run kit:package
# → ../dist/AG Design System Kit/   (zip and share)
```

---

## Quick start (developers)

```bash
cd registry
npm install
npm run dev
# → http://localhost:3000
```

- **Getting Started (online):** `/docs/getting-started`
- **Getting Started (offline):** open `START_HERE.html` at the repo root, or at the top of the shipped kit zip
- **New app bootstrap:** Cursor tab in Getting Started, or skills `@ag-get-started` + `@ag-vibe-start`

Full registry docs, token architecture, and troubleshooting: [`registry/README.md`](registry/README.md).

---

## What's in the registry

| | |
|---|---|
| **Components** | 32 registry entries (UI + chart blocks) |
| **Themes** | AG Core, Navy, BEP Pro |
| **Stack** | Next.js 15, React 19, TypeScript, Tailwind v4, Base UI, Phosphor Icons |
| **Install path** | Local registry JSON via `shadcn add` (Stage 2: hosted registry URL) |

Regenerate manifests after editing `registry/src/lib/registry.ts`:

```bash
cd registry
npm run registry:generate
```

---

## Not in this repo

These are intentionally excluded (see root `.gitignore`):

- `registry/node_modules/`, `registry/.next/`, `dist/` (generated locally)
- `f37-jan/` (commercial font, obtain separately)
- Source `.pptx` / `.docx` working files

---

## Contributing

Component proposals and registry changes go through engineering. See Getting Started in the docs site and `registry/.github/ISSUE_TEMPLATE/` for request templates.
