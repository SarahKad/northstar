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
    description: "Default Project North Star theme (light mode).",
  },
]

export const DEFAULT_THEME_ID = "ns-pro"

export function getTheme(id: string): ThemeDefinition {
  return themes.find((t) => t.id === id) ?? themes.find((t) => t.id === DEFAULT_THEME_ID) ?? themes[0]
}
