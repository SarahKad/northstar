#!/usr/bin/env node
/**
 * Copies templates/app-shell into a target Next.js project.
 * Usage: node scripts/scaffold-app-shell.mjs /path/to/my-app
 */

import { cpSync, existsSync, mkdirSync, readdirSync } from "fs"
import { dirname, join, resolve } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const REGISTRY_ROOT = resolve(__dirname, "..")
const TEMPLATE_ROOT = join(REGISTRY_ROOT, "templates", "app-shell")

const targetArg = process.argv[2]
if (!targetArg) {
  console.error("Usage: npm run scaffold:shell -- /path/to/your-next-app")
  process.exit(1)
}

const targetRoot = resolve(targetArg)
const targetSrc = join(targetRoot, "src")

if (!existsSync(targetSrc)) {
  console.error(`Expected src/ directory at ${targetSrc}`)
  console.error("Run create-next-app first, then scaffold again.")
  process.exit(1)
}

function copyRecursive(src, dest) {
  mkdirSync(dest, { recursive: true })
  for (const entry of readdirSync(src, { withFileTypes: true })) {
    const srcPath = join(src, entry.name)
    const destPath = join(dest, entry.name)
    if (entry.isDirectory()) {
      copyRecursive(srcPath, destPath)
    } else {
      cpSync(srcPath, destPath)
    }
  }
}

const templateSrc = join(TEMPLATE_ROOT, "src")
copyRecursive(templateSrc, targetSrc)

const middlewareSrc = join(TEMPLATE_ROOT, "middleware.ts")
const middlewareDest = join(targetRoot, "middleware.ts")
cpSync(middlewareSrc, middlewareDest)

/** Copy chart sources from registry so dashboard works before shadcn adds. */
const optionalCopies = [
  ["src/components/ui/chart.tsx", "components/ui/chart.tsx"],
  ["src/components/ui/chart-area-interactive.tsx", "components/ui/chart-area-interactive.tsx"],
  ["src/hooks/use-document-theme.ts", "hooks/use-document-theme.ts"],
  ["src/components/blocks/chart-bar-default.tsx", "components/blocks/chart-bar-default.tsx"],
  ["src/components/blocks/chart-bar-stacked.tsx", "components/blocks/chart-bar-stacked.tsx"],
  ["src/components/blocks/chart-pie-donut.tsx", "components/blocks/chart-pie-donut.tsx"],
  ["src/components/blocks/chart-line-dots.tsx", "components/blocks/chart-line-dots.tsx"],
]

for (const [fromRel, toRel] of optionalCopies) {
  const from = join(REGISTRY_ROOT, fromRel)
  const to = join(targetSrc, toRel)
  if (existsSync(from)) {
    mkdirSync(dirname(to), { recursive: true })
    cpSync(from, to)
    console.log(`  Copied ${toRel}`)
  }
}

console.log(`
AG App Shell scaffolded into: ${targetRoot}

Next steps:
  1. Read src/components/ag-shell/INSTALL.md
  2. Wire ThemeProvider in src/app/layout.tsx (see INSTALL.md)
  3. Install UI deps: bash src/components/ag-shell/install-components.sh
  4. npm run dev → /login then /dashboard
`)
