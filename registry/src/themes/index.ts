/**
 * AG Design System, Theme Registry
 *
 * Every theme that can be applied to the design system is registered here.
 * A "theme" controls the brand-level visual identity: color palette, brand
 * tokens, and their light/dark semantic mappings.
 *
 * The neutral primitive layer (--primitive-neutral-*) is shared across all
 * themes and lives in globals.css. Themes only define what diverges.
 *
 * ----------------------------------------------------------------------------
 * HOW TO ADD A NEW THEME
 * ----------------------------------------------------------------------------
 * 1. Create  src/themes/[id].css
 *    - Define brand primitives under [data-theme="[id]"]
 *    - Define light semantic tokens under [data-theme="[id]"], [data-theme="[id]"].light
 *    - Define dark semantic tokens under [data-theme="[id]"].dark
 *    - Every token in ThemeTokenContract must be assigned
 *
 * 2. Add an @import for your CSS file in globals.css
 *
 * 3. Add an entry to the `themes` array below
 *
 * 4. The ThemeProvider will make it selectable automatically
 * ----------------------------------------------------------------------------
 */

/** Contract of CSS custom properties that every theme must define. */
export type ThemeTokenContract = {
  // ── Surface ──────────────────────────────────────────────────────────────
  /** Page background */
  "--background": string
  /** Card and elevated surface background */
  "--card": string
  /** Popover / dropdown background */
  "--popover": string

  // ── Content ───────────────────────────────────────────────────────────────
  /** Default body text */
  "--foreground": string
  /** Text on card surfaces */
  "--card-foreground": string
  /** Text on popovers */
  "--popover-foreground": string
  /** Subdued / helper text */
  "--muted-foreground": string

  // ── Interactive ───────────────────────────────────────────────────────────
  /** Primary action background (button fill, etc.) */
  "--primary": string
  /** Text on primary backgrounds */
  "--primary-foreground": string
  /** Secondary / less-prominent action background */
  "--secondary": string
  /** Text on secondary backgrounds */
  "--secondary-foreground": string
  /** Subtle container background (e.g. muted sections) */
  "--muted": string
  /** Accent highlight background */
  "--accent": string
  /** Text on accent backgrounds */
  "--accent-foreground": string

  // ── Brand / Feedback ──────────────────────────────────────────────────────
  /** Theme brand color, used for links, highlights, brand moments */
  "--brand": string
  /** Destructive / error state background or text */
  "--destructive": string
  /** Focus ring color */
  "--ring": string

  // ── Structure ─────────────────────────────────────────────────────────────
  /** Default border color */
  "--border": string
  /** Input border color */
  "--input": string

  // ── Chart series ──────────────────────────────────────────────────────────
  "--chart-1": string
  "--chart-2": string
  "--chart-3": string
  "--chart-4": string
  "--chart-5": string

  // ── Sidebar component ─────────────────────────────────────────────────────
  "--sidebar": string
  "--sidebar-foreground": string
  "--sidebar-primary": string
  "--sidebar-primary-foreground": string
  "--sidebar-accent": string
  "--sidebar-accent-foreground": string
  "--sidebar-border": string
  "--sidebar-ring": string
}

/** Metadata for a registered theme. */
export type ThemeDefinition = {
  /** Unique identifier, used as the `data-theme` attribute value */
  id: string
  /** Human-readable display name */
  name: string
  /** Short description of the theme's purpose or audience */
  description: string
}

/**
 * All themes registered in the design system.
 * Add new themes here after creating their CSS file and importing it in globals.css.
 */
export const themes: ThemeDefinition[] = [
  {
    id: "ag",
    name: "AG Core",
    description: "Assemblies of God core brand theme. The default theme for all AG digital products.",
  },
  {
    id: "navy",
    name: "Navy",
    description: "Cool-toned theme anchored to a deep navy blue brand color.",
  },
  {
    id: "bep-pro",
    name: "BEP Pro",
    description: "Dark-first theme for BEP Pro products. Brand color: BEP Blue (#1A56DB). Accent palette is restricted to charts/graphs and badges/tags only.",
  },
]

/** The theme applied when no preference is stored. */
export const DEFAULT_THEME_ID = "ag"

/** Returns the ThemeDefinition for a given id, or the default theme if not found. */
export function getTheme(id: string): ThemeDefinition {
  return themes.find((t) => t.id === id) ?? themes[0]
}
