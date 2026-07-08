import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "h-8 w-full min-w-0 rounded-none border border-input bg-transparent px-2.5 py-1 text-xs transition-colors outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-xs file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-1 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-1 aria-invalid:ring-destructive/20 md:text-xs dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        className
      )}
      {...props}
    />
  )
}

/**
 * @description Muted helper text displayed below an `Input`. Pair with
 * `aria-describedby` on the input for accessibility.
 *
 * @example
 * <Label htmlFor="email">Email</Label>
 * <Input id="email" type="email" aria-describedby="email-helper" />
 * <InputHelperText id="email-helper">We'll never share your email.</InputHelperText>
 */
function InputHelperText({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="input-helper-text"
      className={cn("text-xs text-muted-foreground", className)}
      {...props}
    />
  )
}

export { Input, InputHelperText }
