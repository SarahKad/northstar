import { X } from "@phosphor-icons/react"
import { cva, type VariantProps } from "class-variance-authority"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative flex w-full items-start gap-3 rounded-lg border p-4",
  {
    variants: {
      variant: {
        default:     "bg-background text-foreground border-border",
        info:        "border-blue-200 bg-blue-50 text-blue-900 dark:border-blue-800/50 dark:bg-blue-950/40 dark:text-blue-100",
        success:     "border-green-200 bg-green-50 text-green-900 dark:border-green-800/50 dark:bg-green-950/40 dark:text-green-100",
        warning:     "border-yellow-200 bg-yellow-50 text-yellow-900 dark:border-yellow-800/50 dark:bg-yellow-950/40 dark:text-yellow-100",
        destructive: "border-destructive/20 bg-destructive/5 text-destructive",
      },
    },
    defaultVariants: { variant: "default" },
  }
)

/**
 * Props for the Alert component.
 * @property className - Additional CSS classes to apply to the alert container.
 * @property variant - Visual style of the alert. Use `"info"` for informational messages,
 *   `"success"` for confirmations, `"warning"` for cautions, `"destructive"` for errors,
 *   or `"default"` for neutral notices.
 */
type AlertProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof alertVariants>

/**
 * @description Displays a contextual feedback message to the user. Supports multiple
 * severity levels via the `variant` prop. Compose with `AlertIcon`, `AlertContent`,
 * `AlertTitle`, `AlertDescription`, and `AlertDismiss` for a full-featured alert.
 *
 * @example
 * <Alert variant="info">
 *   <AlertIcon><InfoIcon /></AlertIcon>
 *   <AlertContent>
 *     <AlertTitle>Heads up</AlertTitle>
 *     <AlertDescription>Your session will expire in 5 minutes.</AlertDescription>
 *   </AlertContent>
 *   <AlertDismiss />
 * </Alert>
 */
function Alert({ className, variant, children, ...props }: AlertProps) {
  return (
    <div
      role="alert"
      data-slot="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      {children}
    </div>
  )
}

/**
 * @description Container for the alert's leading icon. Sizes the icon to 16px and
 * adds a small top offset so it aligns with the first line of text.
 *
 * @example
 * <AlertIcon><InfoCircleIcon /></AlertIcon>
 */
function AlertIcon({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="alert-icon"
      className={cn("shrink-0 [&_svg]:size-4 [&_svg]:mt-0.5", className)}
      {...props}
    />
  )
}

/**
 * @description Flex column wrapper for the alert's text content. Grows to fill
 * available space next to the icon. Place `AlertTitle` and `AlertDescription` inside.
 *
 * @example
 * <AlertContent>
 *   <AlertTitle>Done</AlertTitle>
 *   <AlertDescription>Your changes were saved.</AlertDescription>
 * </AlertContent>
 */
function AlertContent({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="alert-content"
      className={cn("min-w-0 flex-1", className)}
      {...props}
    />
  )
}

/**
 * @description Bold heading line for an alert. Rendered as a `<p>` tag styled
 * at 14px with medium weight. Always place inside `AlertContent`.
 *
 * @example
 * <AlertTitle>Payment failed</AlertTitle>
 */
function AlertTitle({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      data-slot="alert-title"
      className={cn("mb-1 text-sm font-medium leading-4", className)}
      {...props}
    />
  )
}

/**
 * @description Supporting body text for an alert. Rendered at 14px with reduced
 * opacity. Place below `AlertTitle` inside `AlertContent`.
 *
 * @example
 * <AlertDescription>Please check your card details and try again.</AlertDescription>
 */
function AlertDescription({ className, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      data-slot="alert-description"
      className={cn("text-sm opacity-90", className)}
      {...props}
    />
  )
}

/**
 * @description Ghost icon button placed at the trailing edge of an alert to let
 * users dismiss it. Renders an X icon and includes a built-in `aria-label`.
 * Wire up the `onClick` prop to remove the alert from the DOM.
 *
 * @example
 * <AlertDismiss onClick={() => setVisible(false)} />
 */
function AlertDismiss({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-xs"
      data-slot="alert-dismiss"
      aria-label="Dismiss alert"
      className={cn("shrink-0 self-start", className)}
      {...props}
    >
      <X className="size-3.5" weight="bold" />
    </Button>
  )
}

export {
  Alert,
  AlertIcon,
  AlertContent,
  AlertTitle,
  AlertDescription,
  AlertDismiss,
  alertVariants,
}
