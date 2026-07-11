"use client"

const fonts = [
  {
    name: "Bitter",
    role: "Display & H1–H6, Regular (400)",
    variable: "--font-display",
    utility: "font-heading",
    sample: "The quick brown fox jumps over the lazy dog",
    className: "font-heading",
  },
  {
    name: "Atkinson Hyperlegible",
    role: "Body & UI, Regular",
    variable: "--font-sans",
    utility: "font-sans",
    sample: "The quick brown fox jumps over the lazy dog",
    className: "font-sans",
  },
  {
    name: "Atkinson Hyperlegible Mono",
    role: "Code & Monospace",
    variable: "--font-mono",
    utility: "font-mono",
    sample: "const greeting = \"Hello, world!\"",
    className: "font-mono",
  },
] as const

export function TypographyTypefaces() {
  return (
    <div className="flex flex-col gap-4">
      {fonts.map(({ name, role, variable, utility, sample, className }) => (
        <div key={name} className="rounded-lg border bg-card p-5">
          <div className="mb-3 flex items-start justify-between gap-4">
            <div>
              <p className={`text-2xl font-medium leading-tight ${className}`}>{name}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{role}</p>
            </div>
            <div className="shrink-0 text-right">
              <p className="font-mono text-xs text-muted-foreground">{variable}</p>
              <p className="font-mono text-xs text-muted-foreground">{utility}</p>
            </div>
          </div>
          <p className={`text-sm text-muted-foreground ${className}`}>{sample}</p>
        </div>
      ))}
    </div>
  )
}
