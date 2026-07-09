"use client"

import { Menubar } from "@base-ui/react/menubar"
import { Menu } from "@base-ui/react/menu"
import { cn } from "@/lib/utils"

/**
 * @description Horizontal menu bar container. Wraps multiple `MenuBarMenu`
 * components with keyboard navigation and focus management via Base UI's
 * Menubar primitive.
 *
 * @example
 * <MenuBar>
 *   <MenuBarMenu>
 *     <MenuBarTrigger>File</MenuBarTrigger>
 *     <MenuBarContent>
 *       <MenuBarItem>New File</MenuBarItem>
 *       <MenuBarItem>Open…</MenuBarItem>
 *     </MenuBarContent>
 *   </MenuBarMenu>
 * </MenuBar>
 */
function MenuBar({ className, ...props }: Menubar.Props) {
  return (
    <Menubar
      data-slot="menu-bar"
      className={cn(
        "flex items-center gap-0.5 rounded-lg border border-border bg-card px-1.5 py-1",
        className
      )}
      {...props}
    />
  )
}

/**
 * @description A single menu within the `MenuBar`. Wraps `Menu.Root` and
 * provides an activation trigger with a dropdown panel.
 */
function MenuBarMenu({ ...props }: Menu.Root.Props) {
  return <Menu.Root {...props} />
}

/**
 * @description The label button for a `MenuBarMenu`. Clicking or pressing
 * Enter/Space opens the dropdown.
 */
function MenuBarTrigger({ className, ...props }: Menu.Trigger.Props) {
  return (
    <Menu.Trigger
      data-slot="menu-bar-trigger"
      className={cn(
        "flex items-center rounded-md px-2.5 py-1 text-xs font-medium text-foreground",
        "transition-colors hover:bg-muted hover:text-foreground",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
        "focus-visible:bg-muted focus-visible:text-foreground",
        "data-[popup-open]:bg-muted data-[popup-open]:text-foreground",
        "data-[pressed]:bg-muted data-[pressed]:text-foreground",
        className
      )}
      {...props}
    />
  )
}

/**
 * @description Dropdown panel for a `MenuBarMenu`. Renders in a portal and
 * positions below its trigger.
 */
function MenuBarContent({
  className,
  sideOffset = 6,
  children,
  ...props
}: Menu.Positioner.Props & { className?: string; children?: React.ReactNode }) {
  return (
    <Menu.Portal>
      <Menu.Positioner sideOffset={sideOffset} {...props}>
        <Menu.Popup
          className={cn(
            "z-50 min-w-[10rem] overflow-hidden rounded-lg border border-border bg-popover p-1 text-popover-foreground shadow-md",
            "origin-[var(--transform-origin)] transition-[transform,scale,opacity]",
            "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
            "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
            className
          )}
        >
          {children}
        </Menu.Popup>
      </Menu.Positioner>
    </Menu.Portal>
  )
}

/**
 * @description Individual menu item inside a `MenuBarContent`.
 */
function MenuBarItem({ className, ...props }: Menu.Item.Props) {
  return (
    <Menu.Item
      data-slot="menu-bar-item"
      className={cn(
        "relative flex cursor-pointer select-none items-center justify-between rounded-md px-2 py-1.5 text-sm outline-none",
        "transition-colors duration-100",
        "data-[highlighted]:bg-muted data-[highlighted]:text-foreground",
        "data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        className
      )}
      {...props}
    />
  )
}

/**
 * @description Horizontal divider between menu items.
 */
function MenuBarSeparator({ className, ...props }: Menu.Separator.Props) {
  return (
    <Menu.Separator
      data-slot="menu-bar-separator"
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  )
}

/**
 * @description Right-aligned keyboard shortcut text inside a `MenuBarItem`.
 */
function MenuBarShortcut({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      data-slot="menu-bar-shortcut"
      className={cn("ml-auto pl-4 text-xs tracking-widest text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  MenuBar,
  MenuBarMenu,
  MenuBarTrigger,
  MenuBarContent,
  MenuBarItem,
  MenuBarSeparator,
  MenuBarShortcut,
}
