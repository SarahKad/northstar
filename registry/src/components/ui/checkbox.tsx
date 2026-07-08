"use client"

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox"
import { Check } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

/**
 * @description Accessible checkbox input built on Base UI's Checkbox primitive.
 * Displays a checkmark icon when checked and supports indeterminate state via the
 * underlying primitive's props. Pairs with `Label` for a labeled control.
 *
 * All `CheckboxPrimitive.Root.Props` are forwarded (e.g. `checked`, `defaultChecked`,
 * `onCheckedChange`, `disabled`, `required`, `name`, `value`).
 *
 * @example
 * // Controlled checkbox with label
 * <label className="flex items-center gap-2">
 *   <Checkbox checked={agreed} onCheckedChange={setAgreed} />
 *   I agree to the terms
 * </label>
 *
 * @example
 * // Uncontrolled, disabled
 * <Checkbox defaultChecked disabled />
 */
function Checkbox({ className, ...props }: CheckboxPrimitive.Root.Props) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        "peer inline-flex size-4 shrink-0 items-center justify-center rounded-sm border border-input bg-background transition-all outline-none",
        "focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:border-ring",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "data-checked:bg-primary data-checked:border-primary data-checked:text-primary-foreground",
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
        <Check className="size-3" weight="bold" />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

/**
 * @description Checkbox with a bold label and a muted description line below it.
 * Use for settings or preference lists where each option needs extra context.
 *
 * @example
 * <CheckboxWithDescription
 *   label="Send notifications"
 *   description="Receive an email when someone mentions you."
 *   checked={enabled}
 *   onCheckedChange={setEnabled}
 * />
 */
function CheckboxWithDescription({
  label,
  description,
  checked,
  onCheckedChange,
  disabled,
  className,
}: {
  /** Primary label text shown next to the checkbox. */
  label: string
  /** Secondary description text displayed below the label. */
  description?: string
  /** Whether the checkbox is checked. */
  checked?: boolean
  /** Callback when the checked state changes. */
  onCheckedChange?: (checked: boolean) => void
  /** Whether the checkbox is disabled. */
  disabled?: boolean
  className?: string
}) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-start gap-3 select-none",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
    >
      <Checkbox
        checked={checked}
        onCheckedChange={onCheckedChange ? (val) => onCheckedChange(Boolean(val)) : undefined}
        disabled={disabled}
        className="mt-0.5"
      />
      <div className="grid gap-0.5">
        <span className="text-sm font-medium text-foreground leading-none">{label}</span>
        {description && (
          <span className="text-xs text-muted-foreground">{description}</span>
        )}
      </div>
    </label>
  )
}

/**
 * @description Checkbox inside a bordered card row. Use for settings toggle rows
 * where the entire row acts as a labeled option with optional description.
 *
 * @example
 * <CheckboxCard
 *   label="Enable analytics"
 *   description="Help us improve by sending anonymous usage data."
 *   checked={analytics}
 *   onCheckedChange={setAnalytics}
 * />
 */
function CheckboxCard({
  label,
  description,
  checked,
  onCheckedChange,
  disabled,
  className,
}: {
  /** Primary label text for the card option. */
  label: string
  /** Optional description text below the label. */
  description?: string
  /** Whether the checkbox is checked. */
  checked?: boolean
  /** Callback when the checked state changes. */
  onCheckedChange?: (checked: boolean) => void
  /** Whether the entire card is disabled. */
  disabled?: boolean
  className?: string
}) {
  return (
    <label
      className={cn(
        "flex cursor-pointer items-start gap-3 rounded-lg border border-border bg-card p-4 transition-colors",
        "hover:bg-muted/50",
        checked && "border-primary/50 bg-primary/5",
        disabled && "cursor-not-allowed opacity-50",
        className
      )}
    >
      <Checkbox
        checked={checked}
        onCheckedChange={onCheckedChange ? (val) => onCheckedChange(Boolean(val)) : undefined}
        disabled={disabled}
        className="mt-0.5"
      />
      <div className="grid gap-0.5">
        <span className="text-sm font-medium text-foreground leading-none">{label}</span>
        {description && (
          <span className="text-xs text-muted-foreground">{description}</span>
        )}
      </div>
    </label>
  )
}

export { Checkbox, CheckboxWithDescription, CheckboxCard }
