import * as React from "react"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { MagnifyingGlass } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

/**
 * @description Sticky horizontal top navigation bar. Provides a consistent
 * shell across pages with brand, breadcrumb, and action slots.
 *
 * Compose with `TopNavBrand`, `TopNavBreadcrumb`, and `TopNavActions`.
 * When used inside an app shell, place `SidebarTrigger` first (see app shell template).
 *
 * @example
 * <TopNav>
 *   <SidebarTrigger className="-ml-1" />
 *   <TopNavBrand>AG Design</TopNavBrand>
 *   <TopNavBreadcrumb items={[
 *     { label: "Components", href: "/components" },
 *     { label: "Button" },
 *   ]} />
 *   <TopNavActions />
 * </TopNav>
 */
function TopNav({ className, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <header
      data-slot="top-nav"
      className={cn(
        "sticky top-0 z-40 flex h-12 w-full items-center gap-3 border-b border-border bg-card px-4",
        className
      )}
      {...props}
    />
  )
}

/**
 * @description Brand / logo area in the left section of the `TopNav`.
 */
function TopNavBrand({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="top-nav-brand"
      className={cn("flex shrink-0 items-center gap-2 text-sm font-medium text-foreground", className)}
      {...props}
    />
  )
}

type BreadcrumbCrumb = {
  /** Label for this breadcrumb item. */
  label: string
  /** Optional href, if omitted, renders as the current page (non-link). */
  href?: string
}

/**
 * @description Breadcrumb section in the center of the `TopNav`. Accepts a
 * flat `items` array and renders the last item as the current page.
 *
 * @param items - Array of breadcrumb crumbs.
 */
function TopNavBreadcrumb({
  items,
  className,
}: {
  items: BreadcrumbCrumb[]
  className?: string
}) {
  return (
    <div data-slot="top-nav-breadcrumb" className={cn("flex-1 min-w-0", className)}>
      <Breadcrumb>
        <BreadcrumbList>
          {items.map((item, i) => {
            const isLast = i === items.length - 1
            return (
              <React.Fragment key={i}>
                <BreadcrumbItem>
                  {isLast || !item.href ? (
                    <BreadcrumbPage>{item.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={item.href}>{item.label}</BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {!isLast && <BreadcrumbSeparator />}
              </React.Fragment>
            )
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  )
}

/**
 * @description Right-aligned action area in the `TopNav`. Includes a search
 * input by default; pass `children` for additional action buttons.
 *
 * @param showSearch - Whether to render the built-in search input. @default true
 */
function TopNavActions({
  className,
  showSearch = true,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  /** Whether to show the search input. @default true */
  showSearch?: boolean
}) {
  return (
    <div
      data-slot="top-nav-actions"
      className={cn("ml-auto flex shrink-0 items-center gap-2", className)}
      {...props}
    >
      {showSearch && (
        <div className="relative flex items-center">
          <MagnifyingGlass className="pointer-events-none absolute left-2.5 size-3.5 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search…"
            className="h-7 w-44 rounded-md border border-input bg-transparent pl-8 pr-2.5 text-xs text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
        </div>
      )}
      {children}
    </div>
  )
}

export { TopNav, TopNavBrand, TopNavBreadcrumb, TopNavActions }
