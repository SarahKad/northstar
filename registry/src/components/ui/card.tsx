import * as React from "react"

import { cn } from "@/lib/utils"

/**
 * @description Surface container with rounded corners, a subtle ring border, and
 * consistent padding. Use as the outermost wrapper for content cards throughout
 * the UI. Compose with `CardHeader`, `CardTitle`, `CardDescription`, `CardAction`,
 * `CardContent`, and `CardFooter` for a structured layout.
 *
 * The `size` prop tightens padding and gaps for denser layouts:
 * - `"default"`, standard spacing (`py-4`, `gap-4`, `px-4`)
 * - `"sm"`, compact spacing (`py-3`, `gap-2`, `px-3`)
 *
 * @example
 * <Card>
 *   <CardHeader>
 *     <CardTitle>Invoice #1024</CardTitle>
 *     <CardDescription>Due on June 1, 2025</CardDescription>
 *     <CardAction><Button size="sm">Pay now</Button></CardAction>
 *   </CardHeader>
 *   <CardContent>…</CardContent>
 *   <CardFooter>…</CardFooter>
 * </Card>
 *
 * @example
 * // Compact card
 * <Card size="sm">
 *   <CardHeader><CardTitle>Quick stat</CardTitle></CardHeader>
 *   <CardContent>42</CardContent>
 * </Card>
 *
 * @example
 * // Horizontal card with image on the left
 * <Card orientation="horizontal" className="max-w-xl">
 *   <img src="/photo.jpg" alt="" className="w-2/5 shrink-0 object-cover" />
 *   <CardBody>
 *     <CardHeader>
 *       <CardTitle>Featured article</CardTitle>
 *       <CardDescription>Published yesterday</CardDescription>
 *     </CardHeader>
 *     <CardContent>Summary text…</CardContent>
 *   </CardBody>
 * </Card>
 */
function Card({
  className,
  size = "default",
  orientation = "vertical",
  ...props
}: React.ComponentProps<"div"> & {
  size?: "default" | "sm"
  /** Stack content vertically or place media beside content. @default "vertical" */
  orientation?: "vertical" | "horizontal"
}) {
  return (
    <div
      data-slot="card"
      data-size={size}
      data-orientation={orientation}
      className={cn(
        "group/card flex gap-4 overflow-hidden rounded-lg bg-card text-xs/relaxed text-card-foreground ring-1 ring-foreground/10 has-data-[slot=card-footer]:pb-0 has-[>img:first-child]:pt-0 data-[size=sm]:gap-2 data-[size=sm]:has-data-[slot=card-footer]:pb-0",
        orientation === "horizontal"
          ? "flex-row items-stretch py-0 data-[size=sm]:py-0 *:[img:first-child]:rounded-l-lg *:[img:first-child]:rounded-tr-none *:[img:first-child]:rounded-br-none *:[img:last-child]:rounded-r-lg *:[img:last-child]:rounded-tl-none *:[img:last-child]:rounded-bl-none"
          : "flex-col py-4 data-[size=sm]:py-3 *:[img:first-child]:rounded-t-lg *:[img:last-child]:rounded-b-lg",
        className
      )}
      {...props}
    />
  )
}

/**
 * @description Groups card content in a vertical column. Use inside horizontal
 * cards to keep the header, body, and footer stacked beside media.
 */
function CardBody({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-body"
      className={cn(
        "flex min-w-0 flex-1 flex-col gap-4 group-data-[size=sm]/card:gap-2",
        "group-data-[orientation=vertical]/card:contents",
        "group-data-[orientation=horizontal]/card:justify-center group-data-[orientation=horizontal]/card:py-4 group-data-[size=sm]/card:group-data-[orientation=horizontal]/card:py-3",
        className
      )}
      {...props}
    />
  )
}

/**
 * @description Top section of a card that holds the title, optional description,
 * and optional trailing action. Lays out content in a CSS Grid so the action
 * column aligns to the right and spans both title and description rows.
 *
 * @example
 * <CardHeader>
 *   <CardTitle>Settings</CardTitle>
 *   <CardDescription>Manage your account preferences.</CardDescription>
 *   <CardAction><Button size="icon-sm" variant="ghost"><DotsIcon /></Button></CardAction>
 * </CardHeader>
 */
function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "group/card-header @container/card-header grid auto-rows-min items-start gap-1 px-4 group-data-[size=sm]/card:px-3 has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-4 group-data-[size=sm]/card:[.border-b]:pb-3",
        className
      )}
      {...props}
    />
  )
}

/**
 * @description Primary heading for a card. Rendered as a `<div>` styled with
 * `text-lg` and medium font weight. Place directly inside `CardHeader`.
 *
 * @example
 * <CardTitle>Monthly Report</CardTitle>
 */
function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn(
        "font-sans text-lg font-medium group-data-[size=sm]/card:text-lg",
        className
      )}
      {...props}
    />
  )
}

/**
 * @description Supporting subtext displayed below `CardTitle` in muted color.
 * Use for a brief explanation or metadata about the card's content.
 *
 * @example
 * <CardDescription>Last updated 2 hours ago.</CardDescription>
 */
function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-xs/relaxed text-muted-foreground", className)}
      {...props}
    />
  )
}

/**
 * @description Trailing slot inside `CardHeader` for a single interactive control
 * (e.g. a button or icon button). Aligns to the right edge and spans both the
 * title and description rows.
 *
 * @example
 * <CardAction>
 *   <Button size="icon-sm" variant="ghost"><EllipsisIcon /></Button>
 * </CardAction>
 */
function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

/**
 * @description Main body area of a card with horizontal padding matching the header.
 * Place the card's primary content (text, forms, charts, etc.) here.
 *
 * @example
 * <CardContent>
 *   <p>Your billing cycle resets on the 1st of each month.</p>
 * </CardContent>
 */
function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-4 group-data-[size=sm]/card:px-3", className)}
      {...props}
    />
  )
}

/**
 * @description Bottom bar of a card separated by a top border. Use for secondary
 * actions, pagination, or summary totals. The card removes its bottom padding
 * automatically when a footer is present.
 *
 * @example
 * <CardFooter>
 *   <Button variant="outline" size="sm">Cancel</Button>
 *   <Button size="sm">Confirm</Button>
 * </CardFooter>
 */
function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        "flex items-center border-t p-4 group-data-[size=sm]/card:p-3",
        className
      )}
      {...props}
    />
  )
}

export {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
