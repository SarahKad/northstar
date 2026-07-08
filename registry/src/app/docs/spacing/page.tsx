import { Separator } from "@/components/ui/separator"
import { DocsLayout } from "@/components/registry/docs-layout"
import type { Heading } from "@/components/registry/table-of-contents"

const headings: Heading[] = [
  { id: "spacing-scale", text: "Spacing Scale", level: 2 },
]

export default function SpacingPage() {
  return (
    <DocsLayout headings={headings}>
      <header className="mb-8">
        <h1 className="text-4xl tracking-tight">Spacing</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Spacing uses Tailwind&apos;s default 4px base scale. Consistent use of these steps keeps
          rhythm and density uniform across the entire product.
        </p>
      </header>

      <Separator className="mb-10" />

      <section>
        <h2 id="spacing-scale" className="mb-1 scroll-mt-6">Spacing Scale</h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Each step equals{" "}
          <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded-md">n × 4px</code>.
          Common values used in this system:
        </p>
        <div className="flex flex-col gap-2">
          {[1, 2, 3, 4, 6, 8, 10, 12, 16, 20, 24].map((step) => (
            <div key={step} className="flex items-center gap-3">
              <p className="font-mono text-xs text-muted-foreground w-6 shrink-0 text-right">{step}</p>
              <div className="bg-primary h-5" style={{ width: `${step * 4}px` }} />
              <p className="font-mono text-xs text-muted-foreground">{step * 4}px</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-md border bg-muted/50 p-5">
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">Quick reference</p>
          <div className="grid grid-cols-2 gap-x-8 gap-y-1 sm:grid-cols-3">
            {[
              ["space-1",  "4px",  "micro gap, icon padding"],
              ["space-2",  "8px",  "tight inline gap"],
              ["space-3",  "12px", "compact vertical gap"],
              ["space-4",  "16px", "standard gap"],
              ["space-6",  "24px", "section gap"],
              ["space-8",  "32px", "card padding"],
              ["space-10", "40px", "section break"],
              ["space-12", "48px", "large section break"],
              ["space-16", "64px", "page section spacing"],
            ].map(([cls, px, note]) => (
              <div key={cls} className="flex items-baseline gap-2 py-0.5">
                <code className="font-mono text-xs text-foreground w-16 shrink-0">{cls}</code>
                <span className="text-xs text-muted-foreground w-10 shrink-0">{px}</span>
                <span className="text-xs text-muted-foreground">{note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </DocsLayout>
  )
}
