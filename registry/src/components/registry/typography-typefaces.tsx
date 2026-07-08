"use client"

import { useDocumentThemeId } from "@/hooks/use-document-theme"

const fonts = [
  {
    name: "Instrument Serif",
    role: "Display, H1 & H2, Regular (min 36px)",
    variable: "--font-display",
    utility: "font-heading",
    sample: "The quick brown fox jumps over the lazy dog",
    className: "font-heading",
  },
  {
    name: "Montserrat",
    role: "BEP Pro only, H1–H6 & display (weights 400–700)",
    variable: "--font-montserrat",
    utility: "font-heading (when data-theme=\"bep-pro\")",
    sample: "The quick brown fox jumps over the lazy dog",
    className: "[font-family:var(--font-montserrat)]",
  },
  {
    name: "Atkinson Hyperlegible",
    role: "Body, UI & H3–H6, Regular",
    variable: "--font-sans",
    utility: "font-sans",
    sample: "The quick brown fox jumps over the lazy dog",
    className: "font-sans",
  },
  {
    name: "Geist Mono",
    role: "Code & Monospace",
    variable: "--font-mono",
    utility: "font-mono",
    sample: "const greeting = \"Hello, world!\"",
    className: "font-mono",
  },
] as const

export function TypographyTypefaces() {
  const themeId = useDocumentThemeId()
  const isBepPro = themeId === "bep-pro"

  const visibleFonts = fonts.filter((font) => {
    if (isBepPro && font.name === "Instrument Serif") return false
    if (!isBepPro && font.name === "Montserrat") return false
    return true
  })

  return (
    <div className="flex flex-col gap-4">
      {visibleFonts.map(({ name, role, variable, utility, sample, className }) => (
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
