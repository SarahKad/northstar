"use client"

import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group"
import { Radio } from "@base-ui/react/radio"
import { cn } from "@/lib/utils"

/**
 * @description Accessible radio group container built on Base UI's RadioGroup
 * primitive. Renders a vertical flex column of `RadioGroupItem` elements. Manages
 * single-selection state and keyboard navigation between items automatically.
 *
 * All `RadioGroupPrimitive.Props` are forwarded (e.g. `value`, `defaultValue`,
 * `onValueChange`, `disabled`, `name`).
 *
 * @example
 * <RadioGroup defaultValue="monthly" onValueChange={setPlan}>
 *   <RadioGroupItem value="monthly" label="Monthly" />
 *   <RadioGroupItem value="annual" label="Annual (save 20%)" />
 * </RadioGroup>
 */
function RadioGroupRoot({ className, disabled, ...props }: RadioGroupPrimitive.Props) {
  return (
    <RadioGroupPrimitive
      data-slot="radio-group"
      disabled={disabled}
      className={cn(
        "flex flex-col gap-2",
        disabled && "pointer-events-none",
        className
      )}
      {...props}
    />
  )
}

/**
 * Props for RadioGroupItem.
 * @property label - Optional text label rendered next to the radio button.
 *   If omitted, provide an accessible name via `aria-label` or a wrapping label element.
 */
type RadioGroupItemProps = Radio.Root.Props & { label?: string }

/**
 * @description A single radio button within a `RadioGroup`. Renders the circular
 * indicator together with an optional text label. The entire row (indicator + label)
 * is clickable via a wrapping `<label>`.
 *
 * Pass `value` to identify this option within the group. Pass `disabled` to prevent
 * selection.
 *
 * @example
 * <RadioGroupItem value="dark" label="Dark mode" />
 *
 * @example
 * // Without built-in label (custom label alongside)
 * <RadioGroupItem value="custom" aria-label="Custom plan" />
 */
function RadioGroupItem({ className, label, disabled, ...props }: RadioGroupItemProps) {
  return (
    <label
      className={cn(
        "flex items-center gap-2.5 select-none",
        disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer"
      )}
    >
      <Radio.Root
        data-slot="radio-group-item"
        disabled={disabled}
        className={cn(
          "size-4 shrink-0 rounded-full border border-input bg-background outline-none transition-all duration-150",
          "hover:border-primary/60 hover:bg-primary/5",
          "active:scale-90",
          "focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:border-ring",
          "data-[checked]:border-primary",
          "disabled:cursor-not-allowed disabled:pointer-events-none disabled:border-muted-foreground/30 disabled:bg-muted/50 disabled:hover:border-muted-foreground/30 disabled:hover:bg-muted/50 disabled:active:scale-100",
          "disabled:data-[checked]:border-muted-foreground/40",
          className
        )}
        {...props}
      >
        <Radio.Indicator
          keepMounted
          className="flex size-full items-center justify-center scale-0 data-[checked]:scale-100 transition-transform duration-150 ease-out"
        >
          <span
            className={cn(
              "size-2 rounded-full",
              disabled ? "bg-muted-foreground/60" : "bg-primary"
            )}
          />
        </Radio.Indicator>
      </Radio.Root>
      {label && (
        <span
          className={cn(
            "text-sm",
            disabled ? "text-muted-foreground" : "text-foreground"
          )}
        >
          {label}
        </span>
      )}
    </label>
  )
}

export { RadioGroupRoot as RadioGroup, RadioGroupItem }
