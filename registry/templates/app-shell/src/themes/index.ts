export type ThemeDefinition = {
  id: string
  name: string
  description: string
}

export const themes: ThemeDefinition[] = [
  {
    id: "ag",
    name: "NS Core",
    description: "Default North Star brand theme.",
  },
  {
    id: "navy",
    name: "Peacock",
    description: "Peacock green brand theme.",
  },
  {
    id: "ns-pro",
    name: "NS Pro",
    description: "Dark-first NS Pro theme.",
  },
]

export const DEFAULT_THEME_ID = "ag"

export function getTheme(id: string): ThemeDefinition {
  return themes.find((t) => t.id === id) ?? themes[0]
}
