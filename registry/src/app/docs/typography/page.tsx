import { Separator } from "@/components/ui/separator"
import { DocsLayout } from "@/components/registry/docs-layout"
import { TypographyTypefaces } from "@/components/registry/typography-typefaces"
import type { Heading } from "@/components/registry/table-of-contents"

const headings: Heading[] = [
  { id: "typefaces", text: "Typefaces", level: 2 },
  { id: "display-scale", text: "Display Scale", level: 2 },
  { id: "typography-scale", text: "Typography Scale", level: 2 },
]

export default function TypographyPage() {
  return (
    <DocsLayout headings={headings}>
      <header className="mb-8">
        <h1 className="text-4xl tracking-tight">Typography</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Three font families cover every role in the system (Montserrat loads for BEP Pro headings).
          All are loaded via{" "}
          <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded-md">next/font/google</code>{" "}
          and injected as CSS variables, no layout shift, no flash.
        </p>
      </header>

      <Separator className="mb-10" />

      {/* Typefaces */}
      <section className="mb-12">
        <h2 id="typefaces" className="mb-1 scroll-mt-6">Typefaces</h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Instrument Serif is loaded at weight 400 only, the browser should never synthesize bold
          or semibold. H1 and H2 use Instrument Serif (never below 36px). H3–H6 use Atkinson Hyperlegible.
        </p>
        <div className="mb-6 rounded-lg border border-border bg-muted/30 px-4 py-3 text-sm text-muted-foreground">
          <p>
            <strong className="font-normal text-foreground">BEP Pro theme:</strong> When{" "}
            <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs">data-theme=&quot;bep-pro&quot;</code>{" "}
            is active, headings (H1–H6) and display utilities use{" "}
            <strong className="font-normal text-foreground">Montserrat</strong> instead of Instrument Serif.
            Body and UI text stay on Atkinson Hyperlegible. AG Core and Navy are unchanged.
          </p>
        </div>
        <TypographyTypefaces />
      </section>

      <Separator className="mb-10" />

      {/* Display Scale */}
      <section className="mb-12">
        <h2 id="display-scale" className="mb-1 scroll-mt-6">Display Scale</h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Reserved for hero moments, splash screens, and large editorial layouts. Uses Instrument Serif
          on AG Core and Navy; Montserrat on BEP Pro. Apply via the <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded-md">.text-display-78</code> and{" "}
          <code className="font-mono text-xs bg-muted px-1 py-0.5 rounded-md">.text-display-60</code> utility classes.
        </p>
        <div className="flex flex-col gap-8">
          {[
            { label: "Display 78", meta: "78px / −0.02em", el: <p className="text-display-78 leading-none">Display</p> },
            { label: "Display 60", meta: "60px / −0.02em", el: <p className="text-display-60 leading-none">Display</p> },
          ].map(({ label, meta, el }, i, arr) => (
            <div key={label} className={`flex items-baseline gap-6 ${i < arr.length - 1 ? "border-b pb-6" : ""}`}>
              <div className="w-32 shrink-0">
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="font-mono text-xs text-muted-foreground">{meta}</p>
              </div>
              {el}
            </div>
          ))}
        </div>
      </section>

      <Separator className="mb-10" />

      {/* Typography Scale */}
      <section className="mb-12">
        <h2 id="typography-scale" className="mb-6 scroll-mt-6">Typography Scale</h2>
        <div className="flex flex-col gap-8">
          {[
            { label: "Heading 1", meta: "text-4xl · Instrument Serif",  el: <h1 className="text-4xl tracking-tight" aria-hidden="true">The quick brown fox</h1> },
            { label: "Heading 2", meta: "text-3xl · Instrument Serif",  el: <h2 className="text-3xl tracking-tight" aria-hidden="true">The quick brown fox</h2> },
            { label: "Heading 3", meta: "text-2xl · Atkinson",          el: <h3 className="text-2xl tracking-tight" aria-hidden="true">The quick brown fox</h3> },
            { label: "Heading 4", meta: "text-xl · Atkinson",           el: <h4 className="text-xl" aria-hidden="true">The quick brown fox jumps</h4> },
            { label: "Body",      meta: "text-base / normal",     el: <p className="text-base leading-relaxed max-w-prose">The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.</p> },
            { label: "Small",     meta: "text-sm / normal",       el: <p className="text-sm text-muted-foreground leading-relaxed max-w-prose">The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.</p> },
            { label: "Mono",      meta: "font-mono / text-sm",    el: <p className="font-mono text-sm">const greeting = &quot;Hello, world!&quot;</p> },
          ].map(({ label, meta, el }, i, arr) => (
            <div key={label} className={`flex items-baseline gap-6 ${i < arr.length - 1 ? "border-b pb-6" : ""}`}>
              <div className="w-32 shrink-0">
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="font-mono text-xs text-muted-foreground">{meta}</p>
              </div>
              {el}
            </div>
          ))}
        </div>
      </section>
    </DocsLayout>
  )
}
