import * as React from "react"
import { CaretRight } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

/**
 * @description Accessible breadcrumb navigation wrapper (`<nav aria-label="breadcrumb">`).
 * Compose with `BreadcrumbList`, `BreadcrumbItem`, `BreadcrumbLink`,
 * `BreadcrumbPage`, and `BreadcrumbSeparator`.
 *
 * @example
 * <Breadcrumb>
 *   <BreadcrumbList>
 *     <BreadcrumbItem>
 *       <BreadcrumbLink href="/">Home</BreadcrumbLink>
 *     </BreadcrumbItem>
 *     <BreadcrumbSeparator />
 *     <BreadcrumbItem>
 *       <BreadcrumbPage>Current Page</BreadcrumbPage>
 *     </BreadcrumbItem>
 *   </BreadcrumbList>
 * </Breadcrumb>
 */
function Breadcrumb({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <nav
      aria-label="breadcrumb"
      data-slot="breadcrumb"
      className={cn(className)}
      {...props}
    />
  )
}

/**
 * @description Ordered list (`<ol>`) that lays out breadcrumb items horizontally.
 */
function BreadcrumbList({ className, ...props }: React.OlHTMLAttributes<HTMLOListElement>) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        "flex flex-wrap items-center gap-1 text-sm text-muted-foreground",
        className
      )}
      {...props}
    />
  )
}

/**
 * @description A single breadcrumb item (`<li>`). Wrap each crumb and separator
 * in its own `BreadcrumbItem`.
 */
function BreadcrumbItem({ className, ...props }: React.LiHTMLAttributes<HTMLLIElement>) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    />
  )
}

/**
 * @description Clickable `<a>` link for non-current breadcrumb pages.
 * @param href - The URL this crumb links to.
 */
function BreadcrumbLink({
  className,
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      data-slot="breadcrumb-link"
      className={cn(
        "transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 rounded-sm",
        className
      )}
      {...props}
    />
  )
}

/**
 * @description Non-link span representing the current page in the breadcrumb.
 * Adds `aria-current="page"` automatically.
 */
function BreadcrumbPage({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      data-slot="breadcrumb-page"
      aria-current="page"
      className={cn("font-medium text-foreground", className)}
      {...props}
    />
  )
}

/**
 * @description Visual separator between breadcrumb items. Uses a `CaretRight`
 * icon by default.
 */
function BreadcrumbSeparator({ className, children, ...props }: React.HTMLAttributes<HTMLLIElement>) {
  return (
    <li
      data-slot="breadcrumb-separator"
      aria-hidden="true"
      className={cn("flex items-center text-muted-foreground/60", className)}
      {...props}
    >
      {children ?? <CaretRight className="size-3.5" />}
    </li>
  )
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
}
