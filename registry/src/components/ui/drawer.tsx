"use client"

import * as React from "react"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { X } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

type DrawerSide = "right" | "left" | "bottom"

type DrawerContextValue = { side: DrawerSide }
const DrawerContext = React.createContext<DrawerContextValue>({ side: "right" })

const sideClasses: Record<DrawerSide, string> = {
  right: "fixed inset-y-0 right-0 h-full w-3/4 max-w-sm border-l",
  left: "fixed inset-y-0 left-0 h-full w-3/4 max-w-sm border-r",
  bottom: "fixed inset-x-0 bottom-0 w-full max-h-[80vh] rounded-t-lg border-t",
}

const motionClasses: Record<DrawerSide, string> = {
  right: "data-starting-style:translate-x-full data-ending-style:translate-x-full",
  left: "data-starting-style:-translate-x-full data-ending-style:-translate-x-full",
  bottom: "data-starting-style:translate-y-full data-ending-style:translate-y-full",
}

/**
 * @description Drawer root controller. Built on Base UI's Dialog primitive.
 * Manages open/closed state. Pass `open` and `onOpenChange` for controlled usage.
 *
 * @example
 * <Drawer>
 *   <DrawerTrigger asChild><Button>Open Drawer</Button></DrawerTrigger>
 *   <DrawerPortal>
 *     <DrawerOverlay />
 *     <DrawerContent side="right">
 *       <DrawerHeader>
 *         <DrawerTitle>Settings</DrawerTitle>
 *         <DrawerClose />
 *       </DrawerHeader>
 *       <p>Drawer content here.</p>
 *     </DrawerContent>
 *   </DrawerPortal>
 * </Drawer>
 */
function Drawer({
  side = "right",
  ...props
}: DialogPrimitive.Root.Props & {
  /** Which edge the drawer slides in from. @default "right" */
  side?: DrawerSide
}) {
  return (
    <DrawerContext.Provider value={{ side }}>
      <DialogPrimitive.Root {...props} />
    </DrawerContext.Provider>
  )
}

/** @description Trigger element that opens the drawer. */
function DrawerTrigger({ className, ...props }: DialogPrimitive.Trigger.Props) {
  return (
    <DialogPrimitive.Trigger
      data-slot="drawer-trigger"
      className={cn(className)}
      {...props}
    />
  )
}

/** @description Portal wrapper for the drawer overlay and panel. */
function DrawerPortal(props: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal {...props} />
}

/** @description Semi-transparent backdrop behind the drawer panel. */
function DrawerOverlay({ className, ...props }: DialogPrimitive.Backdrop.Props) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="drawer-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-black/50",
        "transition-opacity duration-300 ease-out",
        "data-starting-style:opacity-0 data-ending-style:opacity-0",
        className
      )}
      {...props}
    />
  )
}

/**
 * @description The sliding panel that appears from the specified edge.
 * @param side - Which edge to slide in from. Inherits from parent `Drawer` by default.
 */
function DrawerContent({
  className,
  side: sideProp,
  children,
  ...props
}: DialogPrimitive.Popup.Props & { side?: DrawerSide }) {
  const ctx = React.useContext(DrawerContext)
  const side = sideProp ?? ctx.side
  return (
    <DialogPrimitive.Popup
      data-slot="drawer-content"
      className={cn(
        "fixed z-50 bg-background shadow-xl outline-none",
        "flex flex-col",
        "transition-transform duration-300 ease-out",
        sideClasses[side],
        motionClasses[side],
        className
      )}
      {...props}
    >
      {children}
    </DialogPrimitive.Popup>
  )
}

/** @description Header section of the drawer panel, typically contains title and close button. */
function DrawerHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="drawer-header"
      className={cn("flex items-center justify-between border-b border-border px-4 py-3", className)}
      {...props}
    />
  )
}

/** @description Footer section for action buttons at the bottom of the drawer. */
function DrawerFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn("flex items-center gap-2 border-t border-border px-4 py-3", className)}
      {...props}
    />
  )
}

/** @description Drawer title, styled as a small heading. */
function DrawerTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      data-slot="drawer-title"
      className={cn("text-sm font-semibold text-foreground", className)}
      {...props}
    />
  )
}

/** @description Muted description text inside the drawer. */
function DrawerDescription({ className, ...props }: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      data-slot="drawer-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

/** @description Close button for the drawer. Renders an X icon by default. */
function DrawerClose({ className, children, ...props }: DialogPrimitive.Close.Props) {
  return (
    <DialogPrimitive.Close
      data-slot="drawer-close"
      className={cn(
        "flex size-7 items-center justify-center rounded-md",
        "text-muted-foreground hover:text-foreground hover:bg-muted",
        "transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
        className
      )}
      {...props}
    >
      {children ?? <X className="size-4" />}
    </DialogPrimitive.Close>
  )
}

export {
  Drawer,
  DrawerTrigger,
  DrawerPortal,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
}
