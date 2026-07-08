import { Separator } from "@/components/ui/separator"
import { DocsLayout } from "@/components/registry/docs-layout"
import type { Heading } from "@/components/registry/table-of-contents"
import { FocusDemo } from "./focus-demo"

const headings: Heading[] = [
  { id: "border-radius", text: "Border Radius", level: 2 },
  { id: "focus-states",  text: "Focus States",  level: 2 },
]

export default function BordersFocusPage() {
  return (
    <DocsLayout headings={headings}>
      <header className="mb-8">
        <h1 className="text-4xl tracking-tight">Borders & Focus</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Border radius tokens and the focus ring system, how keyboard focus is communicated
          consistently across every interactive element in the system.
        </p>
      </header>

      <Separator className="mb-10" />

      {/* Border Radius */}
      <section className="mb-12">
        <h2 id="border-radius" className="mb-1 scroll-mt-6">Border Radius</h2>
        <p className="mb-6 text-sm text-muted-foreground">
          All radii derive from the{" "}
          <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded-md">--radius</code> base
          token via calc multipliers.           The system currently uses <strong>4px</strong>, gently rounded
          edges throughout.
        </p>
        <div className="flex flex-wrap items-end gap-6">
          {[
            { label: "sm",        style: "calc(var(--radius) * 0.6)" },
            { label: "md",        style: "calc(var(--radius) * 0.8)" },
            { label: "lg (base)", style: "var(--radius)" },
            { label: "xl",        style: "calc(var(--radius) * 1.4)" },
            { label: "2xl",       style: "calc(var(--radius) * 1.8)" },
            { label: "full",      style: "9999px" },
          ].map(({ label, style }) => (
            <div key={label} className="flex flex-col items-center gap-2">
              <div className="size-16 border bg-muted" style={{ borderRadius: style }} />
              <p className="text-xs text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </section>

      <Separator className="mb-10" />

      {/* Focus States */}
      <section className="mb-12">
        <h2 id="focus-states" className="mb-1 scroll-mt-6">Focus States</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Every interactive element inherits a focus ring from the global base layer. The ring uses
          the{" "}
          <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded-md">--ring</code> token, which matches{" "}
          <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded-md">--brand</code> red, rendered at 50% opacity via{" "}
          <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded-md">outline-ring/50</code>.
        </p>

        <div className="mb-6 rounded-md border bg-muted/50 p-4">
          <p className="mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">globals.css, @layer base</p>
          <pre className="font-mono text-sm text-foreground">{`* {\n  @apply border-border outline-ring/50;\n}`}</pre>
        </div>

        <div className="mb-6 text-sm text-muted-foreground space-y-2">
          <p>
            <strong className="text-foreground">Keyboard-only:</strong> Tailwind&apos;s{" "}
            <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded-md">focus-visible:</code>{" "}
            variant is used on interactive components so the ring only appears during keyboard
            navigation, not on mouse clicks. This follows the{" "}
            <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded-md">:focus-visible</code>{" "}
            CSS pseudo-class natively supported in all modern browsers.
          </p>
          <p>
            <strong className="text-foreground">Opacity:</strong> The{" "}
            <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded-md">/50</code> modifier
            softens the brand red to a more ambient glow, ensuring visibility without overwhelming the UI.
          </p>
        </div>

        <FocusDemo />
      </section>
    </DocsLayout>
  )
}
