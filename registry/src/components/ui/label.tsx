"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * @description Accessible form label rendered as a `<label>` element. Styled at
 * 12px with `select-none` to prevent accidental text selection when clicking.
 *
 * Automatically dims and disables pointer events when:
 * - The parent element has `data-disabled="true"` (group-disabled pattern)
 * - A sibling input has the `disabled` attribute (peer-disabled pattern)
 *
 * Associate with an input using the `htmlFor` prop or by wrapping the input.
 *
 * @example
 * // Using htmlFor
 * <Label htmlFor="email">Email address</Label>
 * <Input id="email" type="email" />
 *
 * @example
 * // Wrapping pattern with icon
 * <Label>
 *   <Checkbox />
 *   Subscribe to newsletter
 * </Label>
 */
function Label({ className, ...props }: React.ComponentProps<"label">) {
  return (
    <label
      data-slot="label"
      className={cn(
        "flex items-center gap-2 text-xs leading-none select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }
