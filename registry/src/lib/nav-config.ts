import { categories, components } from "./registry"
import { blocks } from "./blocks"

export type NavItem = {
  href: string
  label: string
  section: string
  breadcrumb: string[]
}

export type NavSection = {
  id: string
  label: string
  items: NavItem[]
}

export const navSections: NavSection[] = [
  {
    id: "guides",
    label: "Guides",
    items: [
      {
        href: "/docs/getting-started",
        label: "Getting Started",
        section: "guides",
        breadcrumb: ["Guides", "Getting Started"],
      },
    ],
  },
  {
    id: "system-preview",
    label: "System Preview",
    items: [
      {
        href: "/previews/dashboard",
        label: "Dashboard Preview",
        section: "system-preview",
        breadcrumb: ["System Preview", "Dashboard Preview"],
      },
    ],
  },
  {
    id: "foundations",
    label: "Foundations",
    items: [
      {
        href: "/docs/color-theming",
        label: "Color Theming",
        section: "foundations",
        breadcrumb: ["Foundations", "Color Theming"],
      },
      {
        href: "/docs/typography",
        label: "Typography",
        section: "foundations",
        breadcrumb: ["Foundations", "Typography"],
      },
      {
        href: "/docs/borders-focus",
        label: "Borders & Focus",
        section: "foundations",
        breadcrumb: ["Foundations", "Borders & Focus"],
      },
      {
        href: "/docs/elevation",
        label: "Elevation",
        section: "foundations",
        breadcrumb: ["Foundations", "Elevation"],
      },
      {
        href: "/docs/spacing",
        label: "Spacing",
        section: "foundations",
        breadcrumb: ["Foundations", "Spacing"],
      },
      {
        href: "/docs/iconography",
        label: "Iconography",
        section: "foundations",
        breadcrumb: ["Foundations", "Iconography"],
      },
    ],
  },
  {
    id: "blocks",
    label: "Blocks",
    items: blocks.map((b) => ({
      href: `/blocks/${b.slug}`,
      label: b.name,
      section: "blocks",
      breadcrumb: ["Blocks", b.name],
    })),
  },
  ...categories.map((cat) => ({
    id: cat.id,
    label: cat.label,
    items: components
      .filter((c) => c.category === cat.id)
      .map((c) => ({
        href: `/components/${c.slug}`,
        label: c.name,
        section: cat.id,
        breadcrumb: [cat.label, c.name],
      })),
  })),
]

// Flat ordered list, drives prev/next navigation
export const flatNav: NavItem[] = navSections.flatMap((s) => s.items)

export function getNavItem(href: string): NavItem | undefined {
  return flatNav.find((item) => item.href === href)
}

export function getPrevNext(href: string): {
  prev: NavItem | null
  next: NavItem | null
} {
  const idx = flatNav.findIndex((item) => item.href === href)
  if (idx === -1) return { prev: null, next: null }
  return {
    prev: idx > 0 ? flatNav[idx - 1] : null,
    next: idx < flatNav.length - 1 ? flatNav[idx + 1] : null,
  }
}

export type SearchEntry = {
  href: string
  label: string
  section: string
  breadcrumbStr: string
}

export const searchIndex: SearchEntry[] = flatNav.map((item) => ({
  href: item.href,
  label: item.label,
  section: item.section,
  breadcrumbStr: item.breadcrumb.join(" / "),
}))
