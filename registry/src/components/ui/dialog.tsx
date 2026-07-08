"use client"

import * as React from "react"
import { Dialog as DialogPrimitive } from "@base-ui/react/dialog"
import { X } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

/**
 * @description Dialog root controller. Manages open/closed state.
 * Pass `open` and `onOpenChange` for controlled usage, or use uncontrolled
 * with `defaultOpen`.
 *
 * Compose with `DialogTrigger`, `DialogPortal`, `DialogOverlay`, `DialogContent`,
 * `DialogHeader`, `DialogFooter`, `DialogTitle`, `DialogDescription`, and `DialogClose`.
 *
 * @example
 * <Dialog>
 *   <DialogTrigger render={<Button>Open</Button>} />
 *   <DialogPortal>
 *     <DialogOverlay />
 *     <DialogContent>
 *       <DialogHeader>
 *         <DialogTitle>Edit Profile</DialogTitle>
 *         <DialogDescription>Make changes to your profile.</DialogDescription>
 *       </DialogHeader>
 *       <DialogFooter>
 *         <DialogClose render={<Button variant="outline">Cancel</Button>} />
 *         <Button>Save</Button>
 *       </DialogFooter>
 *     </DialogContent>
 *   </DialogPortal>
 * </Dialog>
 */
function Dialog(props: DialogPrimitive.Root.Props) {
  return <DialogPrimitive.Root {...props} />
}

/**
 * @description Button or element that opens the dialog on click.
 */
function DialogTrigger({ className, ...props }: DialogPrimitive.Trigger.Props) {
  return (
    <DialogPrimitive.Trigger
      data-slot="dialog-trigger"
      className={cn(className)}
      {...props}
    />
  )
}

/**
 * @description Portal wrapper, renders overlay and content outside the DOM tree.
 */
function DialogPortal(props: DialogPrimitive.Portal.Props) {
  return <DialogPrimitive.Portal {...props} />
}

/**
 * @description Semi-transparent backdrop behind the dialog panel.
 * Fades in on open and fades out on close.
 */
function DialogOverlay({ className, ...props }: DialogPrimitive.Backdrop.Props) {
  return (
    <DialogPrimitive.Backdrop
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-black/50",
        "transition-opacity duration-200 ease-out",
        "data-[open]:opacity-100 data-[closed]:opacity-0",
        className
      )}
      {...props}
    />
  )
}

/**
 * @description Centered modal panel. Scales and fades in on open, reverses on close.
 */
function DialogContent({ className, children, ...props }: DialogPrimitive.Popup.Props) {
  return (
    <DialogPrimitive.Popup
      data-slot="dialog-content"
      className={cn(
        "fixed left-1/2 top-1/2 z-50 w-full max-w-lg -translate-x-1/2 -translate-y-1/2",
        "rounded-lg border border-border bg-background p-6 shadow-lg",
        "transition-all duration-200 ease-out",
        "data-[open]:opacity-100 data-[open]:scale-100",
        "data-[closed]:opacity-0 data-[closed]:scale-95",
        className
      )}
      {...props}
    >
      {children}
    </DialogPrimitive.Popup>
  )
}

/**
 * @description Container for the dialog title and description at the top of the panel.
 */
function DialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("mb-4 flex flex-col gap-1.5", className)}
      {...props}
    />
  )
}

/**
 * @description Container for action buttons at the bottom of the dialog.
 */
function DialogFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn("mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)}
      {...props}
    />
  )
}

/**
 * @description Accessible dialog title. Connected to the dialog via `aria-labelledby`.
 */
function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn("text-base font-semibold text-foreground leading-none", className)}
      {...props}
    />
  )
}

/**
 * @description Accessible dialog description text. Connected via `aria-describedby`.
 */
function DialogDescription({ className, ...props }: DialogPrimitive.Description.Props) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

/**
 * @description Close button. By default renders an X icon in the top-right corner.
 * Use `asChild` to make your own button the close trigger.
 */
function DialogClose({ className, children, render, ...props }: DialogPrimitive.Close.Props) {
  const isIconClose = render == null && children == null

  return (
    <DialogPrimitive.Close
      data-slot="dialog-close"
      aria-label={isIconClose ? "Close" : undefined}
      render={render}
      className={cn(
        "inline-flex items-center justify-center rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
        isIconClose
          ? "absolute right-4 top-4 size-7 text-muted-foreground hover:bg-muted hover:text-foreground"
          : "text-muted-foreground hover:text-foreground",
        className
      )}
      {...props}
    >
      {isIconClose ? <X className="size-4" aria-hidden /> : children}
    </DialogPrimitive.Close>
  )
}

export {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
}
