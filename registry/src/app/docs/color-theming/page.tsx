import { Separator } from "@/components/ui/separator"
import { DocsLayout } from "@/components/registry/docs-layout"
import type { Heading } from "@/components/registry/table-of-contents"
import { ColorTokenTable, type ColorTokenDef } from "@/components/registry/color-token-table"

const colorTokens: ColorTokenDef[] = [
  {
    name: "--background",
    label: "Background",
    description: "Page / app background",
    hex: "#F8F7F4",
    utilities: ["bg-background"],
  },
  {
    name: "--foreground",
    label: "Foreground",
    description: "Default body text",
    hex: "#0C0A09",
    utilities: ["text-foreground"],
  },
  {
    name: "--brand",
    label: "Brand",
    description: "Sapphire accent, active states, highlights, focus rings, decorative emphasis",
    hex: "#72B0AB",
    utilities: ["bg-brand", "text-brand", "border-brand"],
  },
  {
    name: "--primary",
    label: "Primary",
    description: "Primary CTA button surface",
    hex: "#1D1816",
    utilities: ["bg-primary", "text-primary", "border-primary"],
  },
  {
    name: "--primary-foreground",
    label: "Primary Foreground",
    description: "Text rendered on top of primary backgrounds",
    hex: "#FBFAF9",
    utilities: ["text-primary-foreground"],
  },
  {
    name: "--secondary",
    label: "Secondary",
    description: "Secondary surfaces and buttons",
    hex: "#F4F2EF",
    utilities: ["bg-secondary", "text-secondary"],
  },
  {
    name: "--secondary-foreground",
    label: "Secondary Foreground",
    description: "Text on secondary backgrounds",
    hex: "#1D1816",
    utilities: ["text-secondary-foreground"],
  },
  {
    name: "--muted",
    label: "Muted",
    description: "Subdued backgrounds, code blocks, tags, skeletons",
    hex: "#F4F2EF",
    utilities: ["bg-muted"],
  },
  {
    name: "--muted-foreground",
    label: "Muted Foreground",
    description: "Subdued text, captions, placeholders",
    hex: "#544F4D",
    utilities: ["text-muted-foreground"],
  },
  {
    name: "--accent",
    label: "Accent",
    description: "Hover and interactive highlight backgrounds",
    hex: "#F4F2EF",
    utilities: ["bg-accent", "text-accent"],
  },
  {
    name: "--accent-foreground",
    label: "Accent Foreground",
    description: "Text on accent backgrounds",
    hex: "#1D1816",
    utilities: ["text-accent-foreground"],
  },
  {
    name: "--destructive",
    label: "Destructive",
    description: "Error states, delete / irreversible actions",
    hex: "#DC2626",
    utilities: ["bg-destructive", "text-destructive", "border-destructive"],
  },
  {
    name: "--card",
    label: "Card",
    description: "Card and panel surface",
    hex: "#FFFEFD",
    utilities: ["bg-card"],
  },
  {
    name: "--card-foreground",
    label: "Card Foreground",
    description: "Text inside card surfaces",
    hex: "#0C0A09",
    utilities: ["text-card-foreground"],
  },
  {
    name: "--popover",
    label: "Popover",
    description: "Dropdown, tooltip, and popover surface",
    hex: "#FFFEFD",
    utilities: ["bg-popover"],
  },
  {
    name: "--popover-foreground",
    label: "Popover Foreground",
    description: "Text inside popovers and dropdowns",
    hex: "#0C0A09",
    utilities: ["text-popover-foreground"],
  },
  {
    name: "--border",
    label: "Border",
    description: "Component borders and dividers",
    hex: "#E5E3DF",
    utilities: ["border-border", "divide-border"],
  },
  {
    name: "--input",
    label: "Input",
    description: "Input field border color",
    hex: "#E5E3DF",
    utilities: ["border-input"],
  },
  {
    name: "--ring",
    label: "Ring",
    description: "Keyboard focus ring, matches Sapphire brand, rendered at 50% opacity via outline-ring/50",
    hex: "#72B0AB",
    utilities: ["ring-ring", "outline-ring"],
  },
]

const chartTokens: ColorTokenDef[] = [
  { name: "--chart-1", label: "Chart 1", description: "Darkest", hex: "#544F4D" },
  { name: "--chart-2", label: "Chart 2", description: "Step 2",  hex: "#676361" },
  { name: "--chart-3", label: "Chart 3", description: "Step 3",  hex: "#7B7776" },
  { name: "--chart-4", label: "Chart 4", description: "Step 4",  hex: "#938F8D" },
  { name: "--chart-5", label: "Chart 5", description: "Lightest", hex: "#ABA7A6" },
]

const headings: Heading[] = [
  { id: "color-tokens",  text: "Color Tokens",  level: 2 },
  { id: "chart-palette", text: "Chart Palette", level: 2 },
]

export default function ColorThemingPage() {
  return (
    <DocsLayout headings={headings}>
      <header className="mb-8">
        <h1 className="text-4xl tracking-tight">Color Theming</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          All colors are defined as OKLCH custom properties in{" "}
          <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded-md">globals.css</code>{" "}
          and mapped to Tailwind utilities via{" "}
          <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded-md">@theme inline</code>.
          Toggle dark mode to see both palettes live.
        </p>
      </header>

      <Separator className="mb-10" />

      <section className="mb-12">
        <h2 id="color-tokens" className="mb-1 scroll-mt-6">Color Tokens</h2>
        <p className="mb-2 text-sm text-muted-foreground">
          Semantic tokens that flow through every component. HEX and RGB values below are live, they
          reflect whichever theme is currently active.
        </p>
        <p className="mb-6 text-xs text-muted-foreground">
          OKLCH values shown are the <strong>light mode</strong> source. Click any value to copy it.
        </p>
        <ColorTokenTable tokens={colorTokens} />
      </section>

      <Separator className="mb-10" />

      <section className="mb-12">
        <h2 id="chart-palette" className="mb-1 scroll-mt-6">Chart Palette</h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Five tokens scaled across the active theme&apos;s palette. Reference them as{" "}
          <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded-md">var(--chart-1)</code>
          {" "}…{" "}
          <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded-md">var(--chart-5)</code>{" "}
          inside a{" "}
          <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded-md">ChartContainer</code>.
          Swatches below reflect the currently active theme.
        </p>
        <ColorTokenTable tokens={chartTokens} />
      </section>

    </DocsLayout>
  )
}
