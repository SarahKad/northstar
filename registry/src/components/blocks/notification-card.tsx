"use client"

import { cva } from "class-variance-authority"
import {
  Bell,
  CheckCircle,
  Warning,
  XCircle,
  X,
  type Icon,
} from "@phosphor-icons/react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

export type NotificationCardVariant = "subdued" | "warning" | "alert" | "success"

const notificationCardVariants = cva("w-full max-w-md", {
  variants: {
    variant: {
      subdued: "",
      warning:
        "bg-yellow-50 ring-yellow-200/80 dark:bg-yellow-950/40 dark:ring-yellow-800/50",
      alert: "bg-destructive/5 ring-destructive/20",
      success:
        "bg-green-50 ring-green-200/80 dark:bg-green-950/40 dark:ring-green-800/50",
    },
  },
  defaultVariants: { variant: "subdued" },
})

const iconSlotVariants = cva(
  "flex size-8 shrink-0 items-center justify-center border",
  {
    variants: {
      variant: {
        subdued: "border-border bg-muted text-muted-foreground",
        warning:
          "border-yellow-300/60 bg-yellow-100 text-yellow-800 dark:border-yellow-700/50 dark:bg-yellow-900/60 dark:text-yellow-300",
        alert: "border-destructive/30 bg-destructive/10 text-destructive",
        success:
          "border-green-300/60 bg-green-100 text-green-800 dark:border-green-700/50 dark:bg-green-900/60 dark:text-green-300",
      },
    },
    defaultVariants: { variant: "subdued" },
  }
)

const titleVariants = cva("text-sm font-medium", {
  variants: {
    variant: {
      subdued: "text-foreground",
      warning: "text-yellow-950 dark:text-yellow-50",
      alert: "text-destructive",
      success: "text-green-950 dark:text-green-50",
    },
  },
  defaultVariants: { variant: "subdued" },
})

const descriptionVariants = cva("text-sm", {
  variants: {
    variant: {
      subdued: "text-muted-foreground",
      warning: "text-yellow-900/80 dark:text-yellow-100/80",
      alert: "text-destructive/90",
      success: "text-green-900/80 dark:text-green-100/80",
    },
  },
  defaultVariants: { variant: "subdued" },
})

const dateBadgeVariants = cva("border", {
  variants: {
    variant: {
      subdued: "border-border bg-muted text-muted-foreground",
      warning:
        "border-yellow-300/60 bg-yellow-100 text-yellow-800 dark:border-yellow-700/50 dark:bg-yellow-900/60 dark:text-yellow-300",
      alert: "border-destructive/30 bg-destructive/10 text-destructive",
      success:
        "border-green-300/60 bg-green-100 text-green-800 dark:border-green-700/50 dark:bg-green-900/60 dark:text-green-300",
    },
  },
  defaultVariants: { variant: "subdued" },
})

const VARIANT_ICONS: Record<NotificationCardVariant, Icon> = {
  subdued: Bell,
  warning: Warning,
  alert: XCircle,
  success: CheckCircle,
}

type Props = {
  props?: Record<string, string | boolean>
}

export function NotificationCard({ props: blockProps = {} }: Props) {
  const variant = (blockProps.variant as NotificationCardVariant) || "subdued"
  const title = String(blockProps.title ?? "Scheduled Maintenance")
  const dateBadge = String(blockProps.dateBadge ?? "June 15")
  const description = String(
    blockProps.description ??
      "Our platform will undergo maintenance on June 15, 2026 from 2–4 AM UTC. Some services may be temporarily unavailable."
  )
  const showDismiss = blockProps.showDismiss !== false
  const showBadge = blockProps.showBadge !== false
  const showDescription = blockProps.showDescription !== false
  const IconComponent = VARIANT_ICONS[variant]

  return (
    <Card
      className={cn(notificationCardVariants({ variant }))}
      role={variant === "alert" || variant === "warning" ? "alert" : undefined}
    >
      <CardContent
        className={cn("flex gap-3", showDescription ? "items-start" : "items-center")}
      >
        <div className={iconSlotVariants({ variant })}>
          <IconComponent className="size-4" weight="bold" aria-hidden />
        </div>
        <div
          className={cn(
            "min-w-0 flex-1",
            !showDescription && "flex min-h-8 items-center"
          )}
        >
          <div className={cn("flex items-center gap-2", showDescription && "mb-1")}>
            <p className={titleVariants({ variant })}>{title}</p>
            {showBadge && (
              <Badge className={dateBadgeVariants({ variant })}>{dateBadge}</Badge>
            )}
          </div>
          {showDescription && (
            <p className={descriptionVariants({ variant })}>{description}</p>
          )}
        </div>
        {showDismiss && (
          <button
            type="button"
            aria-label="Dismiss"
            className={cn(
              "shrink-0 text-muted-foreground transition-colors hover:text-foreground focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
              showDescription ? "self-start" : "self-center"
            )}
          >
            <X className="size-3.5" weight="bold" aria-hidden />
          </button>
        )}
      </CardContent>
    </Card>
  )
}

export { notificationCardVariants }

const VARIANT_EXAMPLES: Array<{
  variant: NotificationCardVariant
  title: string
  dateBadge: string
  description: string
}> = [
  {
    variant: "subdued",
    title: "Scheduled Maintenance",
    dateBadge: "June 15",
    description:
      "Our platform will undergo maintenance on June 15, 2026 from 2–4 AM UTC. Some services may be temporarily unavailable.",
  },
  {
    variant: "warning",
    title: "Session expiring soon",
    dateBadge: "5 min",
    description:
      "Your session will expire in five minutes. Save your work or sign in again to continue.",
  },
  {
    variant: "alert",
    title: "Payment failed",
    dateBadge: "Today",
    description:
      "We couldn't process your last payment. Update your billing details to avoid service interruption.",
  },
  {
    variant: "success",
    title: "Profile updated",
    dateBadge: "Just now",
    description:
      "Your account settings were saved successfully. Changes may take a moment to appear everywhere.",
  },
]

export function NotificationCardVariantsGallery() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      {VARIANT_EXAMPLES.map((example) => (
        <NotificationCard
          key={example.variant}
          props={{ ...example, showDismiss: true }}
        />
      ))}
    </div>
  )
}
