"use client"

import { usePathname } from "next/navigation"
import { CaretRight } from "@phosphor-icons/react"
import { getNavItem } from "@/lib/nav-config"

export function Breadcrumbs() {
  const pathname = usePathname()
  const navItem = getNavItem(pathname)

  if (!navItem) return null

  const crumbs = navItem.breadcrumb

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 mb-6 text-xs text-muted-foreground">
      {crumbs.map((crumb, i) => (
        <span key={`${crumb}-${i}`} className="flex items-center gap-1.5">
          {i < crumbs.length - 1 ? (
            <>
              <span>{crumb}</span>
              <CaretRight className="size-3 shrink-0" />
            </>
          ) : (
            <span className="text-foreground font-medium">{crumb}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
