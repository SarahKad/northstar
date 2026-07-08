"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react"
import { getPrevNext } from "@/lib/nav-config"

export function PageNav() {
  const pathname = usePathname()
  const { prev, next } = getPrevNext(pathname)

  if (!prev && !next) return null

  return (
    <nav
      aria-label="Page navigation"
      className="mt-12 pt-8 border-t flex items-center justify-between gap-4"
    >
      {prev ? (
        <Link
          href={prev.href}
          className="flex flex-col gap-0.5 text-sm hover:text-foreground text-muted-foreground"
        >
          <span className="flex items-center gap-1.5 text-xs uppercase tracking-wider font-medium">
            <ArrowLeft className="size-3" />
            Previous
          </span>
          <span className="font-medium text-foreground">{prev.label}</span>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={next.href}
          className="flex flex-col gap-0.5 text-sm text-right hover:text-foreground text-muted-foreground"
        >
          <span className="flex items-center justify-end gap-1.5 text-xs uppercase tracking-wider font-medium">
            Next
            <ArrowRight className="size-3" />
          </span>
          <span className="font-medium text-foreground">{next.label}</span>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  )
}
