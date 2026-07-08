export type AppNavItem = {
  href: string
  label: string
}

export type AppNavSection = {
  id: string
  label: string
  items: AppNavItem[]
}

/** Edit this file to add your product routes. */
export const appNavSections: AppNavSection[] = [
  {
    id: "main",
    label: "Main",
    items: [{ href: "/dashboard", label: "Dashboard" }],
  },
  {
    id: "workspace",
    label: "Workspace",
    items: [
      { href: "/dashboard#components", label: "Components" },
      { href: "/dashboard#charts", label: "Charts" },
    ],
  },
]
