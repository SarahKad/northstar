"use client"

import * as React from "react"
import { DotsSixVertical } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

type Direction = "horizontal" | "vertical"

type ResizableContextValue = {
  direction: Direction
  sizes: number[]
  setSizes: (sizes: number[]) => void
}

const ResizableContext = React.createContext<ResizableContextValue>({
  direction: "horizontal",
  sizes: [],
  setSizes: () => {},
})

/**
 * @description Root container for a resizable panel layout. Manages the sizes
 * of all child `ResizablePanel` components.
 *
 * @example
 * <ResizablePanelGroup direction="horizontal" className="h-48 rounded-lg border">
 *   <ResizablePanel defaultSize={30} minSize={20}>Sidebar</ResizablePanel>
 *   <ResizableHandle />
 *   <ResizablePanel>Content</ResizablePanel>
 * </ResizablePanelGroup>
 */
function ResizablePanelGroup({
  direction = "horizontal",
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  /** Layout direction. @default "horizontal" */
  direction?: Direction
}) {
  const [sizes, setSizes] = React.useState<number[]>([])

  return (
    <ResizableContext.Provider value={{ direction, sizes, setSizes }}>
      <div
        data-slot="resizable-panel-group"
        data-direction={direction}
        className={cn(
          "flex w-full",
          direction === "horizontal" ? "flex-row" : "flex-col",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </ResizableContext.Provider>
  )
}

/**
 * @description A single resizable panel. Set `defaultSize` as a percentage of
 * the container. Provide `minSize` to prevent collapsing below a minimum width.
 *
 * @param defaultSize - Initial size as a percentage (0–100). @default 50
 * @param minSize - Minimum size as a percentage. @default 10
 */
function ResizablePanel({
  className,
  defaultSize = 50,
  minSize = 10,
  style,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  /** Initial panel size in percent. @default 50 */
  defaultSize?: number
  /** Minimum panel size in percent. @default 10 */
  minSize?: number
}) {
  const { direction } = React.useContext(ResizableContext)
  const minSizeStyle =
    direction === "horizontal"
      ? { minWidth: `${minSize}%` }
      : { minHeight: `${minSize}%` }

  return (
    <div
      data-slot="resizable-panel"
      className={cn("overflow-auto", className)}
      style={{
        flexBasis: `${defaultSize}%`,
        ...minSizeStyle,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  )
}

/**
 * @description Draggable divider between two `ResizablePanel` components.
 * Shows a grip icon and resizes adjacent panels on drag.
 */
function ResizableHandle({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { direction } = React.useContext(ResizableContext)
  const handleRef = React.useRef<HTMLDivElement>(null)

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault()
    const handle = handleRef.current
    if (!handle) return

    const before = handle.previousElementSibling as HTMLElement | null
    const after = handle.nextElementSibling as HTMLElement | null
    if (!before || !after) return

    const parentRect = handle.parentElement?.getBoundingClientRect()
    if (!parentRect) return

    const isHorizontal = direction === "horizontal"
    const startPos = isHorizontal ? e.clientX : e.clientY
    const beforeStartSize = isHorizontal ? before.offsetWidth : before.offsetHeight
    const afterStartSize = isHorizontal ? after.offsetWidth : after.offsetHeight
    const totalSize = beforeStartSize + afterStartSize

    const onMouseMove = (moveEvent: MouseEvent) => {
      const currentPos = isHorizontal ? moveEvent.clientX : moveEvent.clientY
      const delta = currentPos - startPos
      const newBeforeSize = Math.max(
        totalSize * 0.1,
        Math.min(totalSize * 0.9, beforeStartSize + delta)
      )
      const newAfterSize = totalSize - newBeforeSize

      const parentSize = isHorizontal ? parentRect.width : parentRect.height
      before.style.flexBasis = `${(newBeforeSize / parentSize) * 100}%`
      after.style.flexBasis = `${(newAfterSize / parentSize) * 100}%`
    }

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseup", onMouseUp)
    }

    document.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mouseup", onMouseUp)
  }

  return (
    <div
      ref={handleRef}
      data-slot="resizable-handle"
      role="separator"
      aria-orientation={direction === "horizontal" ? "vertical" : "horizontal"}
      className={cn(
        "relative flex shrink-0 items-center justify-center bg-border",
        direction === "horizontal"
          ? "w-px cursor-col-resize hover:w-1 hover:bg-ring/40"
          : "h-px cursor-row-resize hover:h-1 hover:bg-ring/40",
        "transition-all duration-150 group",
        className
      )}
      onMouseDown={onMouseDown}
      {...props}
    >
      <div
        className={cn(
          "z-10 flex items-center justify-center rounded-sm border border-border bg-background shadow-sm",
          direction === "horizontal" ? "h-6 w-3" : "h-3 w-6",
          "opacity-0 group-hover:opacity-100 transition-opacity"
        )}
      >
        <DotsSixVertical
          className={cn(
            "text-muted-foreground",
            direction === "horizontal" ? "size-2.5" : "size-2.5 rotate-90"
          )}
        />
      </div>
    </div>
  )
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
