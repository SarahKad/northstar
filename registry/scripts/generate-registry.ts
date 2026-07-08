/**
 * Generates public/registry.json, public/r/index.json, and public/r/[slug].json
 * from src/lib/registry.ts.
 * Run with: npm run registry:generate
 *
 * Outputs:
 *  - public/registry.json, custom AI/MCP manifest (original format)
 *  - public/r/index.json, shadcn-compatible registry index
 *  - public/r/[slug].json, per-component shadcn registry items with embedded file content
 *  - public/r/ag-globals.json, registry item for CSS tokens + globals
 */

import { writeFileSync, readFileSync, mkdirSync } from "fs"
import { resolve } from "path"
import { components, categories } from "../src/lib/registry"

const ROOT = resolve(__dirname, "..")

// ---------------------------------------------------------------------------
// Helper to read a source file and return its content as a string
// ---------------------------------------------------------------------------
function readSrc(relativePath: string): string {
  return readFileSync(resolve(ROOT, relativePath), "utf-8")
}

// ---------------------------------------------------------------------------
// Mapping: slug → one or more files to embed
// "standard" slugs delegate to the shadcn public registry (no custom files).
// ---------------------------------------------------------------------------
type RegistryFileEntry = {
  path: string       // target path inside the consumer project
  srcPath: string    // path inside this repo to read from
  type: "registry:ui" | "registry:block" | "registry:style"
}

type SlugConfig =
  | { kind: "standard"; registryDependency: string }
  | { kind: "custom"; files: RegistryFileEntry[]; dependencies?: string[] }

const CHART_FILE: RegistryFileEntry = {
  path: "components/ui/chart.tsx",
  srcPath: "src/components/ui/chart.tsx",
  type: "registry:ui",
}

const slugConfigs: Record<string, SlugConfig> = {
  button: {
    kind: "custom",
    dependencies: ["class-variance-authority", "@base-ui-components/react"],
    files: [
      { path: "components/ui/button.tsx", srcPath: "src/components/ui/button.tsx", type: "registry:ui" },
    ],
  },
  badge: {
    kind: "custom",
    dependencies: ["class-variance-authority", "@base-ui-components/react"],
    files: [
      { path: "components/ui/badge.tsx", srcPath: "src/components/ui/badge.tsx", type: "registry:ui" },
    ],
  },
  table: {
    kind: "custom",
    files: [
      { path: "components/ui/table.tsx", srcPath: "src/components/ui/table.tsx", type: "registry:ui" },
    ],
  },
  card: {
    kind: "custom",
    files: [
      { path: "components/ui/card.tsx", srcPath: "src/components/ui/card.tsx", type: "registry:ui" },
    ],
  },
  input: {
    kind: "custom",
    dependencies: ["@base-ui-components/react"],
    files: [
      { path: "components/ui/input.tsx", srcPath: "src/components/ui/input.tsx", type: "registry:ui" },
    ],
  },
  tabs: { kind: "standard", registryDependency: "tabs" },
  select: {
    kind: "custom",
    dependencies: ["@base-ui-components/react", "@phosphor-icons/react"],
    files: [
      { path: "components/ui/select.tsx", srcPath: "src/components/ui/select.tsx", type: "registry:ui" },
    ],
  },
  skeleton: { kind: "standard", registryDependency: "skeleton" },
  "chart-area-interactive": {
    kind: "custom",
    dependencies: ["recharts", "@phosphor-icons/react"],
    files: [
      { path: "components/ui/chart-area-interactive.tsx", srcPath: "src/components/ui/chart-area-interactive.tsx", type: "registry:ui" },
      { path: "components/ui/card.tsx", srcPath: "src/components/ui/card.tsx", type: "registry:ui" },
      { path: "components/ui/select.tsx", srcPath: "src/components/ui/select.tsx", type: "registry:ui" },
      { path: "hooks/use-document-theme.ts", srcPath: "src/hooks/use-document-theme.ts", type: "registry:ui" },
      CHART_FILE,
    ],
  },
  "chart-bar-default": {
    kind: "custom",
    dependencies: ["recharts", "@phosphor-icons/react"],
    files: [
      { path: "components/blocks/chart-bar-default.tsx", srcPath: "src/components/blocks/chart-bar-default.tsx", type: "registry:block" },
      { path: "components/ui/card.tsx", srcPath: "src/components/ui/card.tsx", type: "registry:ui" },
      CHART_FILE,
    ],
  },
  "chart-bar-stacked": {
    kind: "custom",
    dependencies: ["recharts", "@phosphor-icons/react"],
    files: [
      { path: "components/blocks/chart-bar-stacked.tsx", srcPath: "src/components/blocks/chart-bar-stacked.tsx", type: "registry:block" },
      { path: "components/ui/card.tsx", srcPath: "src/components/ui/card.tsx", type: "registry:ui" },
      CHART_FILE,
    ],
  },
  "chart-line-dots": {
    kind: "custom",
    dependencies: ["recharts", "@phosphor-icons/react"],
    files: [
      { path: "components/blocks/chart-line-dots.tsx", srcPath: "src/components/blocks/chart-line-dots.tsx", type: "registry:block" },
      { path: "components/ui/card.tsx", srcPath: "src/components/ui/card.tsx", type: "registry:ui" },
      CHART_FILE,
    ],
  },
  "chart-pie-donut": {
    kind: "custom",
    dependencies: ["recharts", "@phosphor-icons/react"],
    files: [
      { path: "components/blocks/chart-pie-donut.tsx", srcPath: "src/components/blocks/chart-pie-donut.tsx", type: "registry:block" },
      { path: "components/ui/card.tsx", srcPath: "src/components/ui/card.tsx", type: "registry:ui" },
      CHART_FILE,
    ],
  },
  checkbox: {
    kind: "custom",
    dependencies: ["@base-ui-components/react", "@phosphor-icons/react"],
    files: [
      { path: "components/ui/checkbox.tsx", srcPath: "src/components/ui/checkbox.tsx", type: "registry:ui" },
    ],
  },
  alert: {
    kind: "custom",
    dependencies: ["class-variance-authority", "@phosphor-icons/react"],
    files: [
      { path: "components/ui/alert.tsx", srcPath: "src/components/ui/alert.tsx", type: "registry:ui" },
    ],
  },
  pagination: {
    kind: "custom",
    dependencies: ["@phosphor-icons/react"],
    files: [
      { path: "components/ui/pagination.tsx", srcPath: "src/components/ui/pagination.tsx", type: "registry:ui" },
    ],
  },
  "button-group": {
    kind: "custom",
    dependencies: ["class-variance-authority"],
    files: [
      { path: "components/ui/button-group.tsx", srcPath: "src/components/ui/button-group.tsx", type: "registry:ui" },
    ],
  },
  "radio-group": {
    kind: "custom",
    dependencies: ["@base-ui-components/react"],
    files: [
      { path: "components/ui/radio-group.tsx", srcPath: "src/components/ui/radio-group.tsx", type: "registry:ui" },
    ],
  },
  "side-nav": {
    kind: "custom",
    files: [
      { path: "components/ui/side-nav.tsx", srcPath: "src/components/ui/side-nav.tsx", type: "registry:ui" },
    ],
  },
  accordion: {
    kind: "custom",
    dependencies: ["@base-ui-components/react", "@phosphor-icons/react"],
    files: [
      { path: "components/ui/accordion.tsx", srcPath: "src/components/ui/accordion.tsx", type: "registry:ui" },
    ],
  },
  avatar: {
    kind: "custom",
    files: [
      { path: "components/ui/avatar.tsx", srcPath: "src/components/ui/avatar.tsx", type: "registry:ui" },
    ],
  },
  breadcrumb: {
    kind: "custom",
    dependencies: ["@phosphor-icons/react"],
    files: [
      { path: "components/ui/breadcrumb.tsx", srcPath: "src/components/ui/breadcrumb.tsx", type: "registry:ui" },
    ],
  },
  carousel: {
    kind: "custom",
    dependencies: ["@phosphor-icons/react"],
    files: [
      { path: "components/ui/carousel.tsx", srcPath: "src/components/ui/carousel.tsx", type: "registry:ui" },
    ],
  },
  stepper: {
    kind: "custom",
    dependencies: ["@phosphor-icons/react"],
    files: [
      { path: "components/ui/stepper.tsx", srcPath: "src/components/ui/stepper.tsx", type: "registry:ui" },
    ],
  },
  calendar: {
    kind: "custom",
    dependencies: ["@phosphor-icons/react"],
    files: [
      { path: "components/ui/calendar.tsx", srcPath: "src/components/ui/calendar.tsx", type: "registry:ui" },
    ],
  },
  command: {
    kind: "custom",
    dependencies: ["@phosphor-icons/react"],
    files: [
      { path: "components/ui/command.tsx", srcPath: "src/components/ui/command.tsx", type: "registry:ui" },
    ],
  },
  dialog: {
    kind: "custom",
    dependencies: ["@base-ui-components/react", "@phosphor-icons/react"],
    files: [
      { path: "components/ui/dialog.tsx", srcPath: "src/components/ui/dialog.tsx", type: "registry:ui" },
    ],
  },
  drawer: {
    kind: "custom",
    dependencies: ["@base-ui-components/react", "@phosphor-icons/react"],
    files: [
      { path: "components/ui/drawer.tsx", srcPath: "src/components/ui/drawer.tsx", type: "registry:ui" },
    ],
  },
  "menu-bar": {
    kind: "custom",
    dependencies: ["@base-ui-components/react", "@phosphor-icons/react"],
    files: [
      { path: "components/ui/menu-bar.tsx", srcPath: "src/components/ui/menu-bar.tsx", type: "registry:ui" },
    ],
  },
  "top-nav": {
    kind: "custom",
    dependencies: ["@phosphor-icons/react"],
    files: [
      { path: "components/ui/top-nav.tsx", srcPath: "src/components/ui/top-nav.tsx", type: "registry:ui" },
      { path: "components/ui/breadcrumb.tsx", srcPath: "src/components/ui/breadcrumb.tsx", type: "registry:ui" },
    ],
  },
  resizable: {
    kind: "custom",
    dependencies: ["@phosphor-icons/react"],
    files: [
      { path: "components/ui/resizable.tsx", srcPath: "src/components/ui/resizable.tsx", type: "registry:ui" },
    ],
  },
}

// ---------------------------------------------------------------------------
// 1. public/registry.json  (original custom format, unchanged)
// ---------------------------------------------------------------------------
const manifest = {
  $schema: "https://ag.org/design-system/registry-schema.json",
  name: "@ag/components",
  version: "0.1.0",
  generatedAt: new Date().toISOString(),
  categories,
  components: components.map((c) => ({
    slug: c.slug,
    name: c.name,
    description: c.description,
    category: c.category,
    usage: c.usage,
    installCommand: c.installCommand ?? null,
    props: c.props,
    doList: c.doList ?? [],
    dontList: c.dontList ?? [],
  })),
}

const legacyOut = resolve(ROOT, "public/registry.json")
writeFileSync(legacyOut, JSON.stringify(manifest, null, 2))
console.log(`✓ registry.json, ${manifest.components.length} components → ${legacyOut}`)

// ---------------------------------------------------------------------------
// 2. Ensure public/r/ directory exists
// ---------------------------------------------------------------------------
const rDir = resolve(ROOT, "public/r")
mkdirSync(rDir, { recursive: true })

// Deduplicate components by slug (registry.ts may have duplicates)
const seen = new Set<string>()
const uniqueComponents = components.filter((c) => {
  if (seen.has(c.slug)) return false
  seen.add(c.slug)
  return true
})

// ---------------------------------------------------------------------------
// 3. public/r/index.json  (shadcn registry index)
// ---------------------------------------------------------------------------
const indexJson = {
  $schema: "https://ui.shadcn.com/schema/registry.json",
  name: "ag",
  homepage: "https://ag.design",
  items: uniqueComponents.map((c) => ({
    name: c.slug,
    type: "registry:ui",
    title: c.name,
    description: c.description,
  })),
}

const indexOut = resolve(rDir, "index.json")
writeFileSync(indexOut, JSON.stringify(indexJson, null, 2))
console.log(`✓ public/r/index.json, ${indexJson.items.length} items`)

// ---------------------------------------------------------------------------
// 4. public/r/[slug].json  (per-component shadcn registry items)
// ---------------------------------------------------------------------------
for (const component of uniqueComponents) {
  const config = slugConfigs[component.slug]

  if (!config) {
    console.warn(`  ⚠ No slug config for "${component.slug}", skipping`)
    continue
  }

  if (config.kind === "standard") {
    // Delegates entirely to the shadcn public registry
    const item = {
      $schema: "https://ui.shadcn.com/schema/registry-item.json",
      name: component.slug,
      type: "registry:ui",
      title: component.name,
      description: component.description,
      registryDependencies: [config.registryDependency],
    }
    writeFileSync(resolve(rDir, `${component.slug}.json`), JSON.stringify(item, null, 2))
  } else {
    // Custom files, embed actual content
    const files = config.files.map((f) => ({
      path: f.path,
      content: readSrc(f.srcPath),
      type: f.type,
    }))

    const item: Record<string, unknown> = {
      $schema: "https://ui.shadcn.com/schema/registry-item.json",
      name: component.slug,
      type: "registry:ui",
      title: component.name,
      description: component.description,
      files,
    }

    if (config.dependencies && config.dependencies.length > 0) {
      item.dependencies = config.dependencies
    }

    writeFileSync(resolve(rDir, `${component.slug}.json`), JSON.stringify(item, null, 2))
  }

  console.log(`  ✓ public/r/${component.slug}.json`)
}

// ---------------------------------------------------------------------------
// 5. public/r/ag-globals.json  (CSS tokens + theme)
// ---------------------------------------------------------------------------
const globalsItem = {
  $schema: "https://ui.shadcn.com/schema/registry-item.json",
  name: "ag-globals",
  type: "registry:style",
  title: "AG Design System Globals",
  description: "CSS tokens, theme variables, and base typography rules for the AG Design System.",
  files: [
    {
      path: "src/app/globals.css",
      content: readSrc("src/app/globals.css"),
      type: "registry:style",
    },
    {
      path: "src/themes/ag-core.css",
      content: readSrc("src/themes/ag-core.css"),
      type: "registry:style",
    },
  ],
}

const globalsOut = resolve(rDir, "ag-globals.json")
writeFileSync(globalsOut, JSON.stringify(globalsItem, null, 2))
console.log(`✓ public/r/ag-globals.json`)
