import { SidebarContent } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

type SidebarNavLayoutProps = {
  /** Sections pinned above the scroll area (e.g. Guides). */
  pinned: React.ReactNode
  /** Sections in the scrollable nav body. */
  children: React.ReactNode
  className?: string
}

/**
 * Two-row sidebar nav: pinned block on top, scrollable body below (hidden scrollbar).
 * Uses CSS grid so the scroll region gets a bounded height (flex-only splits often fail).
 */
export function SidebarNavLayout({
  pinned,
  children,
  className,
}: SidebarNavLayoutProps) {
  return (
    <SidebarContent
      className={cn(
        "grid min-h-0 flex-1 grid-rows-[auto_minmax(0,1fr)] gap-0 overflow-hidden",
        className
      )}
    >
      <div className="min-h-0">{pinned}</div>
      <div className="scrollbar-themed min-h-0 overflow-y-auto overscroll-contain">
        {children}
      </div>
    </SidebarContent>
  )
}
