import { Separator } from "@/components/ui/separator"
import { DocsLayout } from "@/components/registry/docs-layout"
import type { Heading } from "@/components/registry/table-of-contents"
import { IconWeightDemo, IconGrid } from "./icons-display"

const headings: Heading[] = [
  { id: "overview", text: "Overview",     level: 2 },
  { id: "usage",    text: "Usage",        level: 2 },
  { id: "styles",   text: "Styles",       level: 2 },
  { id: "examples", text: "System Icons", level: 2 },
]

export default function IconographyPage() {
  return (
    <DocsLayout headings={headings}>
      <header className="mb-8">
        <h1 className="text-4xl tracking-tight">Iconography</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          The system uses <strong>Phosphor Icons</strong> as its sole icon library.
          All icons are sourced from{" "}
          <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded-md">@phosphor-icons/react</code>,
          which is already installed. No other icon packages should be introduced.
        </p>
      </header>

      <Separator className="mb-10" />

      {/* Overview */}
      <section className="mb-12">
        <h2 id="overview" className="mb-1 scroll-mt-6">Overview</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Phosphor is a flexible icon family with over 1,000 icons available in six weights.
          Icons are tree-shaken by default, only the icons you import are bundled.
        </p>
        <div className="rounded-md border bg-muted/50 p-4">
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">Install</p>
          <pre className="font-mono text-sm text-foreground">npm install @phosphor-icons/react</pre>
        </div>
      </section>

      <Separator className="mb-10" />

      {/* Usage */}
      <section className="mb-12">
        <h2 id="usage" className="mb-1 scroll-mt-6">Usage</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Import icons by name from the package, then render them as React components.
          Use Tailwind&apos;s{" "}
          <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded-md">size-*</code>{" "}
          utility to control dimensions, never set{" "}
          <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded-md">width</code> or{" "}
          <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded-md">height</code> directly.
        </p>

        <div className="mb-6 rounded-md border bg-muted/50 p-4">
          <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">Import pattern</p>
          <pre className="font-mono text-sm text-foreground">{`import { MagnifyingGlass, X, Check } from "@phosphor-icons/react"

<MagnifyingGlass className="size-4" />
<X className="size-4" />
<Check className="size-4" />`}</pre>
        </div>

        <p className="mb-3 text-sm font-medium text-foreground">Size conventions</p>
        <div className="rounded-lg border bg-card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-muted/70">
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Class</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Size</th>
                <th className="px-4 py-2.5 text-left text-xs font-medium text-muted-foreground">Use when</th>
              </tr>
            </thead>
            <tbody>
              {[
                { cls: "size-3.5", px: "14px", when: "Compact / inline with small text" },
                { cls: "size-4",   px: "16px", when: "Standard UI, buttons, nav, labels" },
                { cls: "size-5",   px: "20px", when: "Emphasis, empty states, hero spots" },
              ].map(({ cls, px, when }) => (
                <tr key={cls} className="border-b last:border-0 odd:bg-background even:bg-muted/40">
                  <td className="px-4 py-2.5 font-mono text-xs">{cls}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{px}</td>
                  <td className="px-4 py-2.5 text-muted-foreground">{when}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <Separator className="mb-10" />

      {/* Styles */}
      <section className="mb-12">
        <h2 id="styles" className="mb-1 scroll-mt-6">Styles</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Phosphor ships six weights: Regular, Bold, Duotone, Fill, Light, and Thin.
          This system uses <strong>Regular</strong> exclusively, the default when you import
          directly from{" "}
          <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded-md">@phosphor-icons/react</code>.
          Do not introduce other weights without a deliberate design decision.
        </p>
        <IconWeightDemo />
      </section>

      <Separator className="mb-10" />

      {/* System icons grid */}
      <section className="mb-12">
        <h2 id="examples" className="mb-1 scroll-mt-6">System Icons</h2>
        <p className="mb-6 text-sm text-muted-foreground">
          All icons currently in use across registry components and documentation.
        </p>
        <IconGrid />
      </section>
    </DocsLayout>
  )
}
