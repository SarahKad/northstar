"use client"

import { cn } from "@/lib/utils"

const LEVELS = [
  { utility: "", label: "Flat", level: 0 },
  { utility: "shadow-sm", label: "Raised", level: 1 },
  { utility: "shadow-md", label: "Overlay", level: 2 },
  { utility: "shadow-lg", label: "Modal", level: 3 },
  { utility: "shadow-xl", label: "Top", level: 4 },
] as const

export function ElevationScale() {
  return (
    <div className="flex flex-wrap items-end gap-6">
      {LEVELS.map(({ utility, label, level }) => (
        <div key={label} className="flex flex-col items-center gap-3">
          <div
            className={cn(
              "flex size-24 items-center justify-center rounded-lg border border-border bg-card text-xs text-muted-foreground",
              utility,
            )}
          >
            {level}
          </div>
          <div className="text-center">
            <p className="text-xs font-medium text-foreground">{label}</p>
            <p className="font-mono text-xs text-muted-foreground">
              {utility || "none"}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

export function ElevationHierarchyDemo() {
  return (
    <div className="relative overflow-hidden rounded-lg border border-border bg-muted/40 p-8 md:p-12">
      {/* Level 0 — page surface */}
      <div className="relative rounded-lg border border-border bg-background p-6 md:p-8">
        <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Level 0 · Page surface
        </p>
        <p className="mb-6 max-w-md text-sm text-muted-foreground">
          The base plane. No shadow — structure comes from background color and borders.
        </p>

        {/* Level 1 — card */}
        <div className="relative max-w-sm rounded-lg border border-border bg-card p-5 shadow-sm">
          <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Level 1 · Raised card
          </p>
          <p className="mb-5 text-sm text-muted-foreground">
            Subtle lift groups related content without breaking the page plane.
          </p>

          {/* Level 2 — popover */}
          <div className="relative max-w-xs rounded-lg border border-border bg-popover p-4 shadow-md">
            <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Level 2 · Overlay menu
            </p>
            <p className="mb-4 text-sm text-muted-foreground">
              Dropdowns and popovers float above cards and page content.
            </p>

            {/* Level 3 — dialog */}
            <div className="relative rounded-lg border border-border bg-background p-4 shadow-lg">
              <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                Level 3 · Modal dialog
              </p>
              <p className="text-sm text-muted-foreground">
                Dialogs and sheets demand focus — stronger shadow signals priority.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Level 4 — drawer callout */}
      <div className="absolute bottom-4 right-4 max-w-[11rem] rounded-lg border border-border bg-background p-3 shadow-xl md:bottom-6 md:right-6">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Level 4 · Top
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          Drawers and tooltips sit at the highest elevation.
        </p>
      </div>
    </div>
  )
}
