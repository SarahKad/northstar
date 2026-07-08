export type ThemeDefinition = {
  id: string
  name: string
  description: string
}

export const themes: ThemeDefinition[] = [
  {
    id: "ag",
    name: "AG Core",
    description: "Default AG brand theme.",
  },
  {
    id: "navy",
    name: "Navy",
    description: "Navy blue brand theme.",
  },
  {
    id: "bep-pro",
    name: "BEP Pro",
    description: "Dark-first BEP Pro theme.",
  },
]

export const DEFAULT_THEME_ID = "ag"

export function getTheme(id: string): ThemeDefinition {
  return themes.find((t) => t.id === id) ?? themes[0]
}
