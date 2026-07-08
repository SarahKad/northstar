"use client"

import { useState } from "react"
import { Desktop, DeviceMobile } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { PreviewViewportProvider } from "./preview-viewport-context"

type ViewportMode = "desktop" | "mobile"

type Props = {
  children: React.ReactNode
  /** Classes applied to the scrollable preview canvas (min-height, padding, alignment). */
  areaClassName?: string
}

export function PreviewFrame({ children, areaClassName }: Props) {
  const [mode, setMode] = useState<ViewportMode>("desktop")
  const isMobile = mode === "mobile"

  return (
    <div className="flex flex-col gap-0 overflow-hidden border">
      <div className="flex items-center justify-between gap-3 border-b bg-muted/30 px-4 py-2">
        <span className="text-xs font-medium text-muted-foreground">Preview</span>
        <div
          role="group"
          aria-label="Preview viewport"
          className="inline-flex overflow-hidden rounded-md border bg-background"
        >
          <Button
            type="button"
            variant={mode === "desktop" ? "secondary" : "ghost"}
            size="xs"
            className="rounded-none border-0 shadow-none"
            aria-pressed={mode === "desktop"}
            onClick={() => setMode("desktop")}
          >
            <Desktop />
            Desktop
          </Button>
          <Button
            type="button"
            variant={mode === "mobile" ? "secondary" : "ghost"}
            size="xs"
            className="rounded-none border-0 shadow-none"
            aria-pressed={mode === "mobile"}
            onClick={() => setMode("mobile")}
          >
            <DeviceMobile />
            Mobile
          </Button>
        </div>
      </div>

      <div
        className={cn(
          "flex w-full min-w-0 bg-background",
          isMobile ? "justify-center" : "items-center justify-center",
          areaClassName
        )}
      >
        <PreviewViewportProvider mode={mode}>
          <div
            className={cn(
              "flex w-full min-w-0 flex-col",
              isMobile ? "max-w-[340px] shrink-0 self-center" : "items-center"
            )}
            data-preview-viewport={mode}
          >
            {children}
          </div>
        </PreviewViewportProvider>
      </div>
    </div>
  )
}
