export type Theme = {
  id: string
  name: string
  description: string
  /** CSS var overrides applied in light mode (keys without leading --) */
  cssVars: Record<string, string>
  /** CSS var overrides applied in dark mode (keys without leading --) */
  darkCssVars: Record<string, string>
}

export const themes: Theme[] = [
  {
    id: "base",
    name: "Base",
    description: "Default design system theme",
    cssVars: {},
    darkCssVars: {},
  },
  {
    id: "bep-pro",
    name: "BEP Pro",
    description: "Bold dark-first theme for BEP Pro products. Anchored to BEP Blue (#1A56DB).",
    // All tokens are driven by [data-theme="bep-pro"] CSS selectors in bep-pro.css.
    // No inline overrides needed here.
    cssVars: {},
    darkCssVars: {},
  },
]

export function getTheme(id: string): Theme | undefined {
  return themes.find((t) => t.id === id)
}
