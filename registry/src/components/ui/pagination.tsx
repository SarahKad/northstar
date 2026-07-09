import { cn } from "@/lib/utils"
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react/dist/ssr"

const MAX_PAGE_SLOTS = 5

/**
 * Builds the page indicators for pagination, never more than five slots.
 * Shows a sliding window with ellipsis when total pages exceed five.
 *
 * @example
 * getPaginationPages(2, 11)  // [1, 2, 3, 4, "ellipsis"]
 * getPaginationPages(7, 11)  // ["ellipsis", 6, 7, 8, "ellipsis"]
 * getPaginationPages(10, 11) // ["ellipsis", 8, 9, 10, 11]
 */
export function getPaginationPages(current: number, total: number): (number | "ellipsis")[] {
  if (total <= MAX_PAGE_SLOTS) {
    return Array.from({ length: total }, (_, index) => index + 1)
  }

  if (current <= 4) {
    return [1, 2, 3, 4, "ellipsis"]
  }

  if (current >= total - 3) {
    return ["ellipsis", total - 3, total - 2, total - 1, total]
  }

  return ["ellipsis", current - 1, current, current + 1, "ellipsis"]
}

/**
 * @description Accessible `<nav>` wrapper for a pagination control. Provides the
 * `role="navigation"` and `aria-label="pagination"` attributes automatically.
 * Compose with `PaginationPrev`, `PaginationItem`, `PaginationEllipsis`, and
 * `PaginationNext` inside.
 *
 * @example
 * <Pagination>
 *   <PaginationPrev onClick={goToPrev} disabled={page === 1} />
 *   <PaginationItem aria-current={page === 1 ? "page" : undefined} onClick={() => setPage(1)}>1</PaginationItem>
 *   <PaginationEllipsis />
 *   <PaginationItem aria-current={page === 5 ? "page" : undefined} onClick={() => setPage(5)}>5</PaginationItem>
 *   <PaginationNext onClick={goToNext} disabled={page === total} />
 * </Pagination>
 */
function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("flex shrink-0 flex-nowrap items-center gap-1", className)}
      {...props}
    />
  )
}

/**
 * @description A single page number button. Set `aria-current="page"` on the
 * active page to apply the primary highlight style. Supports `disabled` to
 * prevent interaction.
 *
 * @example
 * <PaginationItem
 *   aria-current={currentPage === 3 ? "page" : undefined}
 *   onClick={() => setPage(3)}
 * >
 *   3
 * </PaginationItem>
 */
function PaginationItem({ className, ...props }: React.ComponentProps<"button">) {
  return (
    <button
      data-slot="pagination-item"
      className={cn(
        "inline-flex size-8 items-center justify-center rounded-lg border border-transparent text-xs font-medium",
        "hover:bg-muted hover:text-foreground transition-colors outline-none",
        "focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:border-ring",
        "disabled:pointer-events-none disabled:opacity-50",
        "aria-[current=page]:bg-primary aria-[current=page]:text-primary-foreground aria-[current=page]:border-primary",
        className
      )}
      {...props}
    />
  )
}

/**
 * @description "Previous page" navigation button with a left-arrow icon. Includes
 * a built-in `aria-label`. Disable when on the first page.
 *
 * @example
 * <PaginationPrev onClick={() => setPage(p => p - 1)} disabled={page === 1} />
 */
function PaginationPrev({ className, ...props }: React.ComponentProps<"button">) {
  return (
    <button
      aria-label="Go to previous page"
      data-slot="pagination-prev"
      className={cn(
        "inline-flex size-8 items-center justify-center rounded-lg border border-input bg-background text-xs",
        "hover:bg-muted transition-colors outline-none",
        "focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:border-ring",
        "disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    >
      <ArrowLeft className="size-3.5" />
    </button>
  )
}

/**
 * @description "Next page" navigation button with a right-arrow icon. Includes
 * a built-in `aria-label`. Disable when on the last page.
 *
 * @example
 * <PaginationNext onClick={() => setPage(p => p + 1)} disabled={page === total} />
 */
function PaginationNext({ className, ...props }: React.ComponentProps<"button">) {
  return (
    <button
      aria-label="Go to next page"
      data-slot="pagination-next"
      className={cn(
        "inline-flex size-8 items-center justify-center rounded-lg border border-input bg-background text-xs",
        "hover:bg-muted transition-colors outline-none",
        "focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:border-ring",
        "disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    >
      <ArrowRight className="size-3.5" />
    </button>
  )
}

/**
 * @description Non-interactive ellipsis indicator (`…`) used between page numbers
 * when the full page range is too long to display. Hidden from screen readers via
 * `aria-hidden`.
 *
 * @example
 * <PaginationItem>1</PaginationItem>
 * <PaginationEllipsis />
 * <PaginationItem>10</PaginationItem>
 */
function PaginationEllipsis({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={cn("inline-flex size-8 items-center justify-center text-xs text-muted-foreground", className)}
      {...props}
    >
      …
    </span>
  )
}

export { Pagination, PaginationItem, PaginationPrev, PaginationNext, PaginationEllipsis }
