import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import type { VariantProps } from "class-variance-authority"

/**
 * Props for the ButtonGroup container.
 * @property variant - Visual variant applied to child buttons (defaults to `"outline"`).
 * @property size - Size applied to child buttons (defaults to `"default"`).
 */
type ButtonGroupProps = React.HTMLAttributes<HTMLDivElement> &
  Pick<VariantProps<typeof buttonVariants>, "variant" | "size">

/**
 * @description Horizontal container that groups multiple `ButtonGroupItem` elements
 * into a single connected control. Adjacent buttons share borders and have their
 * inner corners flattened so they appear joined.
 *
 * Use for mutually exclusive or related actions that belong visually together
 * (e.g. text-formatting toggles, view-switchers).
 *
 * @example
 * <ButtonGroup>
 *   <ButtonGroupItem active>Day</ButtonGroupItem>
 *   <ButtonGroupItem>Week</ButtonGroupItem>
 *   <ButtonGroupItem>Month</ButtonGroupItem>
 * </ButtonGroup>
 */
function ButtonGroup({ className, variant = "outline", size = "default", children, ...props }: ButtonGroupProps) {
  return (
    <div
      data-slot="button-group"
      role="group"
      className={cn("inline-flex [&>*]:rounded-none [&>*:first-child]:rounded-l-lg [&>*:last-child]:rounded-r-lg [&>*:not(:first-child)]:-ml-px", className)}
      {...props}
    >
      {children}
    </div>
  )
}

/**
 * Props for a single item inside ButtonGroup.
 * @property variant - Visual variant for this button (defaults to `"outline"`).
 * @property size - Size for this button (defaults to `"default"`).
 * @property active - When `true`, highlights the button with the primary brand
 *   color to indicate the currently selected option.
 */
type ButtonGroupItemProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    active?: boolean
  }

/**
 * @description An individual button inside a `ButtonGroup`. Behaves like a standard
 * `<button>` with design-system styling applied. Set `active` to visually mark the
 * currently selected option.
 *
 * @example
 * <ButtonGroup>
 *   <ButtonGroupItem onClick={() => setView("list")}>List</ButtonGroupItem>
 *   <ButtonGroupItem active onClick={() => setView("grid")}>Grid</ButtonGroupItem>
 * </ButtonGroup>
 */
function ButtonGroupItem({ className, variant = "outline", size = "default", active, ...props }: ButtonGroupItemProps) {
  return (
    <button
      type="button"
      data-slot="button-group-item"
      data-active={active ? "" : undefined}
      aria-pressed={!!active}
      className={cn(
        buttonVariants({ variant, size }),
        "relative focus-visible:z-10",
        "data-active:z-10 aria-pressed:z-10",
        "data-active:border-primary data-active:bg-primary data-active:text-primary-foreground",
        "data-active:hover:bg-primary/90 data-active:hover:text-primary-foreground",
        "aria-pressed:border-primary aria-pressed:bg-primary aria-pressed:text-primary-foreground",
        "aria-pressed:hover:bg-primary/90 aria-pressed:hover:text-primary-foreground",
        "dark:data-active:border-primary dark:data-active:bg-primary dark:data-active:text-primary-foreground",
        "dark:data-active:hover:bg-primary/90 dark:data-active:hover:text-primary-foreground",
        "dark:aria-pressed:border-primary dark:aria-pressed:bg-primary dark:aria-pressed:text-primary-foreground",
        "dark:aria-pressed:hover:bg-primary/90 dark:aria-pressed:hover:text-primary-foreground",
        className
      )}
      {...props}
    />
  )
}

export { ButtonGroup, ButtonGroupItem }
