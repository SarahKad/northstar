import { Separator } from "@/components/ui/separator"
import { DocsLayout } from "@/components/registry/docs-layout"
import type { Heading } from "@/components/registry/table-of-contents"
import { ElevationHierarchyDemo, ElevationScale } from "./elevation-demo"

const headings: Heading[] = [
  { id: "elevation-scale", text: "Elevation Scale", level: 2 },
  { id: "hierarchy", text: "Using Elevation for Hierarchy", level: 2 },
  { id: "in-practice", text: "Hierarchy in Practice", level: 2 },
  { id: "guidelines", text: "Guidelines", level: 2 },
]

const ELEVATION_LEVELS = [
  {
    level: 0,
    name: "Flat",
    utility: "none",
    shadow: "No shadow",
    use: "Base page surfaces and inline content that share the same visual plane.",
    examples: "Page background, sidebar, tables, form fields, cards that rely on border only",
  },
  {
    level: 1,
    name: "Raised",
    utility: "shadow-sm",
    shadow: "Subtle",
    use: "Gentle lift for grouped content that should read as a distinct surface without floating.",
    examples: "Calendar, carousel controls, floating sidebar variant",
  },
  {
    level: 2,
    name: "Overlay",
    utility: "shadow-md",
    shadow: "Medium",
    use: "Menus, panels, and pickers that float above page content and dismiss on interaction outside.",
    examples: "Dropdown menu, select, command palette, search results, theme switcher",
  },
  {
    level: 3,
    name: "Modal",
    utility: "shadow-lg",
    shadow: "Strong",
    use: "Focused interruptions that block or narrow the user's context until resolved.",
    examples: "Dialog, sheet (mobile sidebar)",
  },
  {
    level: 4,
    name: "Top",
    utility: "shadow-xl",
    shadow: "Maximum",
    use: "Highest-priority transient surfaces that must read above all other UI.",
    examples: "Drawer, chart tooltip, block surfaces",
  },
] as const

const HIERARCHY_PRINCIPLES = [
  {
    title: "Elevation signals stacking order",
    body: "The higher an element sits in the interaction stack, the stronger its shadow should be. Users infer depth — a menu above a card, a dialog above a menu — from shadow intensity.",
  },
  {
    title: "Prefer borders on the same plane",
    body: "When content shares a plane with its surroundings, use background color and border tokens instead of shadow. Reserve elevation for elements that truly float above siblings.",
  },
  {
    title: "Climb the scale step by step",
    body: "Avoid jumping from flat (level 0) to modal (level 3) without intermediate layers. Each nested context should increase elevation by one level so the stack reads clearly.",
  },
  {
    title: "Pair elevation with surface tokens",
    body: "Shadows always sit on semantic surfaces — bg-card, bg-popover, bg-background — never on transparent layers. The surface color and shadow work together to separate planes.",
  },
] as const

export default function ElevationPage() {
  return (
    <DocsLayout headings={headings}>
      <header className="mb-8">
        <h1 className="text-4xl tracking-tight">Elevation</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">
          Elevation uses shadow depth to communicate where surfaces sit in the visual stack.
          Consistent elevation helps users understand what is background, what is content, and
          what demands their attention.
        </p>
      </header>

      <Separator className="mb-10" />

      <section className="mb-12">
        <h2 id="elevation-scale" className="mb-1 scroll-mt-6">
          Elevation Scale
        </h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Five levels map to Tailwind shadow utilities. Level 0 is the default page plane;
          each step above adds depth for floating UI.
        </p>
        <ElevationScale />
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[36rem] border-collapse text-sm">
            <thead>
              <tr className="border-b text-left">
                <th className="py-2 pr-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Level
                </th>
                <th className="py-2 pr-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Name
                </th>
                <th className="py-2 pr-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Utility
                </th>
                <th className="py-2 pr-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  When to use
                </th>
                <th className="py-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  In this system
                </th>
              </tr>
            </thead>
            <tbody>
              {ELEVATION_LEVELS.map((row) => (
                <tr key={row.level} className="border-b align-top">
                  <td className="py-3 pr-4 font-mono text-xs text-muted-foreground">
                    {row.level}
                  </td>
                  <td className="py-3 pr-4 font-medium text-foreground">{row.name}</td>
                  <td className="py-3 pr-4">
                    <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs">
                      {row.utility}
                    </code>
                  </td>
                  <td className="py-3 pr-4 text-muted-foreground">{row.use}</td>
                  <td className="py-3 text-muted-foreground">{row.examples}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <Separator className="mb-10" />

      <section className="mb-12">
        <h2 id="hierarchy" className="mb-1 scroll-mt-6">
          Using Elevation for Hierarchy
        </h2>
        <p className="mb-6 text-sm text-muted-foreground">
          Hierarchy is about relative position, not decoration. Shadow tells users which layer
          they are interacting with and what can be ignored until dismissed.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          {HIERARCHY_PRINCIPLES.map(({ title, body }) => (
            <div key={title} className="rounded-lg border border-border bg-card p-5">
              <p className="mb-2 text-sm font-medium text-foreground">{title}</p>
              <p className="text-sm text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </section>

      <Separator className="mb-10" />

      <section className="mb-12">
        <h2 id="in-practice" className="mb-1 scroll-mt-6">
          Hierarchy in Practice
        </h2>
        <p className="mb-6 text-sm text-muted-foreground">
          A typical stack builds from the page surface upward. Each nested layer increases
          elevation by one level so depth stays legible in both light and dark mode.
        </p>
        <ElevationHierarchyDemo />
        <div className="mt-6 rounded-lg border border-border bg-muted/30 px-4 py-3 text-sm text-muted-foreground">
          <p>
            <strong className="font-normal text-foreground">Reading the stack:</strong>{" "}
            Page (0) → Card (1) → Menu (2) → Dialog (3). The drawer callout (4) represents
            surfaces that must appear above everything else, such as edge panels and
            data tooltips.
          </p>
        </div>
      </section>

      <Separator className="mb-10" />

      <section className="mb-12">
        <h2 id="guidelines" className="mb-6 scroll-mt-6">
          Guidelines
        </h2>
        <ul className="flex flex-col gap-3 text-sm text-muted-foreground">
          <li className="flex gap-2">
            <span className="text-foreground">•</span>
            <span>
              Do not combine arbitrary shadow values — stick to{" "}
              <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs">
                shadow-sm
              </code>
              ,{" "}
              <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs">
                shadow-md
              </code>
              ,{" "}
              <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs">
                shadow-lg
              </code>
              , and{" "}
              <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs">
                shadow-xl
              </code>
              .
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-foreground">•</span>
            <span>
              Match <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs">z-index</code>{" "}
              to elevation — higher shadows should correspond to higher stacking contexts
              (menus at <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs">z-50</code>, modals above menus).
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-foreground">•</span>
            <span>
              Never use shadow as the only affordance for interactivity — pair elevation with
              borders, background tokens, and focus rings.
            </span>
          </li>
          <li className="flex gap-2">
            <span className="text-foreground">•</span>
            <span>
              In dark mode, shadows stay subtle. Surface contrast (
              <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs">bg-card</code> vs{" "}
              <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs">bg-background</code>
              ) does most of the separation work; shadow reinforces depth.
            </span>
          </li>
        </ul>
      </section>
    </DocsLayout>
  )
}
