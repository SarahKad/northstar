"use client"

import { ArrowUpRight } from "@phosphor-icons/react"
import { featureFlags } from "@/lib/feature-flags"

export function SubmitRequest() {
  if (!featureFlags.submitRequest) return null

  return (
    <div className="mt-10 border p-4 flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-medium">Have a request?</p>
        <p className="text-xs text-muted-foreground mt-0.5">
          Submit a component or pattern request to the design system team.
        </p>
      </div>
      <a
        href="mailto:design@northstar.example.com"
        className="flex items-center gap-1.5 border px-3 py-1.5 text-xs font-medium hover:bg-muted shrink-0 transition-colors"
      >
        Submit a request
        <ArrowUpRight className="size-3" />
      </a>
    </div>
  )
}
