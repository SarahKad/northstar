"use client"

import { Toggle as TogglePrimitive } from "@base-ui/react/toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "group/toggle inline-flex items-center justify-center gap-1 rounded-lg text-xs font-medium whitespace-nowrap transition-all outline-none hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 aria-pressed:bg-muted data-[state=on]:bg-muted dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-transparent",
        outline: "border border-input bg-transparent hover:bg-muted",
      },
      size: {
        default:
          "h-8 min-w-8 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
        sm: "h-7 min-w-7 rounded-lg px-2.5 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5",
        lg: "h-9 min-w-9 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

/**
 * @description A two-state (on/off) button built on Base UI's Toggle primitive.
 * Unlike a checkbox, a toggle is an action button that stays visually pressed when
 * active, ideal for toolbar formatting controls, feature toggles, or filter chips.
 *
 * Variants:
 * - `"default"`, transparent background, muted on hover/pressed
 * - `"outline"`, bordered with transparent background
 *
 * Sizes:
 * - `"sm"`, 28px tall
 * - `"default"`, 32px tall
 * - `"lg"`, 36px tall
 *
 * The pressed state is reflected by `aria-pressed` and `data-[state=on]`; both
 * are handled automatically by the Base UI primitive.
 *
 * @example
 * // Bold text toggle in a toolbar
 * <Toggle aria-label="Bold">
 *   <BoldIcon />
 * </Toggle>
 *
 * @example
 * // Controlled toggle with label
 * <Toggle
 *   variant="outline"
 *   pressed={isMuted}
 *   onPressedChange={setIsMuted}
 * >
 *   {isMuted ? <MicOffIcon /> : <MicIcon />}
 *   Mute
 * </Toggle>
 */
function Toggle({
  className,
  variant = "default",
  size = "default",
  ...props
}: TogglePrimitive.Props & VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }
