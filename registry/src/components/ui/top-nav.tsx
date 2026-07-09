"use client"

import * as React from "react"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { MagnifyingGlass, X } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

type TopNavContextValue = {
  searchExpanded: boolean
  setSearchExpanded: React.Dispatch<React.SetStateAction<boolean>>
}

const TopNavContext = React.createContext<TopNavContextValue | null>(null)

function useTopNav() {
  const ctx = React.useContext(TopNavContext)
  return (
    ctx ?? {
      searchExpanded: false,
      setSearchExpanded: () => {},
    }
  )
}

/**
 * @description Sticky horizontal top navigation bar. Provides a consistent
 * shell across pages with brand, breadcrumb, and action slots.
 *
 * Compose with `TopNavBrand`, `TopNavBreadcrumb`, and `TopNavActions`.
 * When used inside an app shell, place `SidebarTrigger` first (see app shell template).
 *
 * On narrow widths, breadcrumbs truncate and search collapses to an icon. Tapping
 * the icon expands search full-width and hides other header content until closed.
 * Layout responds to this bar's width (container queries), not only the viewport.
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
  const [searchExpanded, setSearchExpanded] = React.useState(false)

  return (
    <TopNavContext.Provider value={{ searchExpanded, setSearchExpanded }}>
      <header
        data-slot="top-nav"
        className={cn(
          "@container/top-nav relative sticky top-0 z-40 flex h-12 w-full items-center gap-3 bg-card px-4",
          searchExpanded &&
            "[&>*:not([data-slot=top-nav-actions])]:@max-md/top-nav:hidden",
          className
        )}
        {...props}
      />
    </TopNavContext.Provider>
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
    <div data-slot="top-nav-breadcrumb" className={cn("min-w-0 flex-1", className)}>
      <Breadcrumb className="min-w-0">
        <BreadcrumbList className="flex-nowrap overflow-hidden @md/top-nav:flex-wrap">
          {items.map((item, i) => {
            const isLast = i === items.length - 1
            return (
              <React.Fragment key={i}>
                <BreadcrumbItem className={cn(!isLast && "shrink-0", isLast && "min-w-0")}>
                  {isLast || !item.href ? (
                    <BreadcrumbPage className={cn(isLast && "block truncate")}>
                      {item.label}
                    </BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={item.href} className="truncate">
                      {item.label}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
                {!isLast && <BreadcrumbSeparator className="shrink-0" />}
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
  const { searchExpanded, setSearchExpanded } = useTopNav()
  const inputRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (searchExpanded) {
      inputRef.current?.focus()
    }
  }, [searchExpanded])

  React.useEffect(() => {
    if (!searchExpanded) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSearchExpanded(false)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [searchExpanded, setSearchExpanded])

  const searchInputClassName =
    "h-7 w-full rounded-md border border-input bg-transparent pl-8 pr-2.5 text-xs text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"

  return (
    <div
      data-slot="top-nav-actions"
      className={cn(
        "ml-auto flex shrink-0 items-center gap-2",
        searchExpanded &&
          showSearch &&
          "@max-md/top-nav:absolute @max-md/top-nav:inset-0 @max-md/top-nav:z-10 @max-md/top-nav:ml-0 @max-md/top-nav:bg-card @max-md/top-nav:px-4",
        className
      )}
      {...props}
    >
      {showSearch && (
        <>
          <div className="relative hidden items-center @md/top-nav:flex">
            <MagnifyingGlass className="pointer-events-none absolute left-2.5 size-3.5 text-muted-foreground" />
            <input type="search" placeholder="Search…" className={cn(searchInputClassName, "w-44")} />
          </div>

          {!searchExpanded && (
            <button
              type="button"
              className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring @md/top-nav:hidden"
              aria-label="Open search"
              onClick={() => setSearchExpanded(true)}
            >
              <MagnifyingGlass className="size-4" />
            </button>
          )}

          {searchExpanded && (
            <div className="flex min-w-0 flex-1 items-center gap-2 @md/top-nav:hidden">
              <div className="relative flex min-w-0 flex-1 items-center">
                <MagnifyingGlass className="pointer-events-none absolute left-2.5 size-3.5 text-muted-foreground" />
                <input
                  ref={inputRef}
                  type="search"
                  placeholder="Search…"
                  className={cn(searchInputClassName, "h-8")}
                />
              </div>
              <button
                type="button"
                className="inline-flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label="Close search"
                onClick={() => setSearchExpanded(false)}
              >
                <X className="size-4" />
              </button>
            </div>
          )}
        </>
      )}
      <div className={cn("contents", searchExpanded && showSearch && "@max-md/top-nav:hidden")}>
        {children}
      </div>
    </div>
  )
}

export { TopNav, TopNavBrand, TopNavBreadcrumb, TopNavActions }
