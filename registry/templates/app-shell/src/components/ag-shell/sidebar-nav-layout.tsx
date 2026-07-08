import { SidebarContent } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

type SidebarNavLayoutProps = {
  pinned?: React.ReactNode
  children: React.ReactNode
  className?: string
}

export function SidebarNavLayout({
  pinned,
  children,
  className,
}: SidebarNavLayoutProps) {
  if (!pinned) {
    return (
      <SidebarContent className={cn("scrollbar-themed min-h-0 flex-1 overflow-y-auto", className)}>
        {children}
      </SidebarContent>
    )
  }

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
