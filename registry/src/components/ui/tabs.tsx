"use client"

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * @description Root tabs controller built on Base UI's Tabs primitive. Manages
 * the active tab state and keyboard navigation. Compose with `TabsList`,
 * `TabsTrigger`, and `TabsContent`.
 *
 * - `orientation="horizontal"` (default), tabs list sits above the panels
 * - `orientation="vertical"`, tabs list sits to the left of the panels
 *
 * Pass `defaultValue` for an uncontrolled tabs or `value` + `onValueChange` for
 * a controlled tabs.
 *
 * @example
 * <Tabs defaultValue="account">
 *   <TabsList>
 *     <TabsTrigger value="account">Account</TabsTrigger>
 *     <TabsTrigger value="security">Security</TabsTrigger>
 *   </TabsList>
 *   <TabsContent value="account">Account settings…</TabsContent>
 *   <TabsContent value="security">Security settings…</TabsContent>
 * </Tabs>
 *
 * @example
 * // Vertical orientation
 * <Tabs orientation="vertical" defaultValue="general">
 *   <TabsList>…</TabsList>
 *   <TabsContent value="general">…</TabsContent>
 * </Tabs>
 */
function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: TabsPrimitive.Root.Props) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      data-orientation={orientation}
      className={cn(
        "group/tabs flex gap-2 data-horizontal:flex-col",
        className
      )}
      {...props}
    />
  )
}

const tabsListVariants = cva(
  "group/tabs-list inline-flex w-fit items-center justify-center rounded-lg p-[3px] text-muted-foreground group-data-horizontal/tabs:h-8 group-data-vertical/tabs:h-fit group-data-vertical/tabs:flex-col data-[variant=line]:rounded-none",
  {
    variants: {
      variant: {
        default: "bg-muted",
        line: "gap-1 bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

/**
 * @description Container for `TabsTrigger` buttons. Controls the visual style of
 * the tab strip.
 *
 * Variants:
 * - `"default"`, pill-style tabs on a muted background (segmented control look)
 * - `"line"`, borderless tabs with an underline indicator on the active tab
 *
 * @example
 * <TabsList variant="line">
 *   <TabsTrigger value="overview">Overview</TabsTrigger>
 *   <TabsTrigger value="activity">Activity</TabsTrigger>
 * </TabsList>
 */
function TabsList({
  className,
  variant = "default",
  ...props
}: TabsPrimitive.List.Props & VariantProps<typeof tabsListVariants>) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  )
}

/**
 * @description Individual tab button inside `TabsList`. The `value` prop must
 * match the `value` on the corresponding `TabsContent` panel. The active trigger
 * receives an opaque background (default variant) or underline (line variant).
 *
 * @example
 * <TabsTrigger value="settings">Settings</TabsTrigger>
 *
 * @example
 * // Tab with leading icon
 * <TabsTrigger value="notifications">
 *   <BellIcon data-icon="inline-start" />
 *   Notifications
 * </TabsTrigger>
 */
function TabsTrigger({ className, ...props }: TabsPrimitive.Tab.Props) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        "relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-md border border-transparent px-1.5 py-0.5 text-xs font-medium whitespace-nowrap text-foreground/60 transition-all group-data-vertical/tabs:w-full group-data-vertical/tabs:justify-start group-data-vertical/tabs:py-[calc(--spacing(1.25))] hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 has-data-[icon=inline-end]:pr-1 has-data-[icon=inline-start]:pl-1 aria-disabled:pointer-events-none aria-disabled:opacity-50 dark:text-muted-foreground dark:hover:text-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-active:bg-transparent dark:group-data-[variant=line]/tabs-list:data-active:border-transparent dark:group-data-[variant=line]/tabs-list:data-active:bg-transparent",
        "data-active:bg-background data-active:text-foreground dark:data-active:border-input dark:data-active:bg-input/30 dark:data-active:text-foreground",
        "after:absolute after:bg-foreground after:opacity-0 after:transition-opacity group-data-horizontal/tabs:after:inset-x-0 group-data-horizontal/tabs:after:bottom-[-5px] group-data-horizontal/tabs:after:h-0.5 group-data-vertical/tabs:after:inset-y-0 group-data-vertical/tabs:after:-right-1 group-data-vertical/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-active:after:opacity-100",
        className
      )}
      {...props}
    />
  )
}

/**
 * @description The panel that is shown when its `value` matches the active tab.
 * Hidden panels are removed from the DOM by default (Base UI behaviour).
 *
 * @example
 * <TabsContent value="account">
 *   <p>Manage your account settings here.</p>
 * </TabsContent>
 */
function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn("flex-1 text-xs/relaxed outline-none", className)}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants }
