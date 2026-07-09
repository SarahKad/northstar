"use client"

import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion"
import { CaretDown } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

/**
 * @description Accordion root container. Manages open/closed state for one or
 * multiple panels. Built on Base UI's Accordion primitive for full accessibility.
 *
 * Modes:
 * - default, only one panel open at a time
 * - `multiple`, multiple panels can be open simultaneously
 *
 * @example
 * <Accordion>
 *   <AccordionItem value="item-1">
 *     <AccordionTrigger>Is it accessible?</AccordionTrigger>
 *     <AccordionContent>Yes, built on WAI-ARIA patterns.</AccordionContent>
 *   </AccordionItem>
 * </Accordion>
 */
function Accordion({ className, ...props }: AccordionPrimitive.Root.Props) {
  return (
    <AccordionPrimitive.Root
      data-slot="accordion"
      className={cn("w-full", className)}
      {...props}
    />
  )
}

/**
 * @description Individual accordion item containing a trigger and panel.
 * @param value - Unique identifier for this accordion item.
 */
function AccordionItem({ className, ...props }: AccordionPrimitive.Item.Props) {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={cn("border-b border-border", className)}
      {...props}
    />
  )
}

/**
 * @description The clickable header button that toggles the accordion panel.
 * Shows a rotating caret icon indicating open/closed state.
 */
function AccordionTrigger({ className, children, ...props }: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header>
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "flex w-full items-center justify-between py-4 text-sm font-medium text-foreground transition-all outline-none",
          "hover:text-foreground/80",
          "focus-visible:ring-2 focus-visible:ring-ring/50 rounded-sm",
          "[&[data-panel-open]>svg]:rotate-180",
          className
        )}
        {...props}
      >
        {children}
        <CaretDown
          className="size-4 shrink-0 text-muted-foreground transition-transform duration-200"
          aria-hidden
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

/**
 * @description The collapsible panel containing accordion body content.
 * Uses Base UI's `--accordion-panel-height` variable with height transitions
 * so both open and close animate smoothly.
 */
function AccordionContent({ className, children, ...props }: AccordionPrimitive.Panel.Props) {
  return (
    <AccordionPrimitive.Panel
      data-slot="accordion-content"
      className={cn(
        "overflow-hidden text-sm text-muted-foreground",
        "h-(--accordion-panel-height) transition-[height] duration-200 ease-out",
        "data-ending-style:h-0 data-starting-style:h-0",
        className
      )}
      {...props}
    >
      <div className="pb-4">{children}</div>
    </AccordionPrimitive.Panel>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
