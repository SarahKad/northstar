"use client"

import { useState, useEffect, useCallback, useRef, useMemo } from "react"
import { useRouter } from "next/navigation"
import { MagnifyingGlass } from "@phosphor-icons/react"
import { searchIndex } from "@/lib/nav-config"
import { useSidebar } from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"

function filterResults(query: string) {
  const q = query.trim().toLowerCase()
  if (!q) return []
  return searchIndex.filter(
    (item) =>
      item.label.toLowerCase().includes(q) ||
      item.breadcrumbStr.toLowerCase().includes(q)
  )
}

const fieldClassName = cn(
  "flex h-8 w-full items-center gap-2 rounded-md border border-sidebar-border",
  "bg-sidebar-accent/60 px-2.5 text-muted-foreground",
  "focus-within:bg-sidebar-accent focus-within:ring-2 focus-within:ring-sidebar-ring",
  "transition-colors"
)

const inputClassName =
  "min-w-0 flex-1 bg-transparent text-xs text-foreground outline-none placeholder:text-muted-foreground"

const dropdownClassName = cn(
  "absolute z-50 mt-1 max-h-64 overflow-y-auto rounded-md border border-border",
  "bg-popover p-1 text-popover-foreground shadow-md"
)

type SearchDropdownProps = {
  results: typeof searchIndex
  onSelect: (href: string) => void
  className?: string
  listId?: string
}

function SearchDropdown({ results, onSelect, className, listId }: SearchDropdownProps) {
  if (results.length === 0) {
    return (
      <div className={cn(dropdownClassName, className)} role="status">
        <p className="px-2 py-3 text-center text-xs text-muted-foreground">
          No results found
        </p>
      </div>
    )
  }

  return (
    <ul
      id={listId}
      className={cn(dropdownClassName, className)}
      role="listbox"
    >
      {results.map((item) => (
        <li key={item.href} role="option">
          <button
            type="button"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => onSelect(item.href)}
            className={cn(
              "flex w-full flex-col gap-0.5 rounded-sm px-2 py-1.5 text-left",
              "hover:bg-muted focus-visible:bg-muted focus-visible:outline-none"
            )}
          >
            <span className="text-sm font-medium text-foreground">{item.label}</span>
            <span className="text-xs text-muted-foreground">{item.breadcrumbStr}</span>
          </button>
        </li>
      ))}
    </ul>
  )
}

/**
 * Sidebar search, inline input with anchored dropdown; results filter as you type.
 */
export function SearchDialog() {
  const { state, isMobile } = useSidebar()
  const iconCollapsed = !isMobile && state === "collapsed"

  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const filtered = useMemo(() => filterResults(query), [query])
  const showDropdown = open && query.trim().length > 0

  const handleSelect = useCallback(
    (href: string) => {
      router.push(href)
      setOpen(false)
      setQuery("")
    },
    [router]
  )

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setOpen(true)
        inputRef.current?.focus()
      }
      if (e.key === "Escape") {
        setOpen(false)
        setQuery("")
        inputRef.current?.blur()
      }
    }
    document.addEventListener("keydown", handler)
    return () => document.removeEventListener("keydown", handler)
  }, [])

  useEffect(() => {
    if (!open) return
    const handler = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [open])

  if (iconCollapsed) {
    return (
      <div ref={containerRef} className="relative flex justify-center">
        <button
          type="button"
          onClick={() => {
            setOpen(true)
            requestAnimationFrame(() => inputRef.current?.focus())
          }}
          className={cn(
            "flex size-8 items-center justify-center rounded-md border border-sidebar-border",
            "bg-sidebar-accent/60 text-muted-foreground",
            "hover:bg-sidebar-accent transition-colors outline-none",
            "focus-visible:ring-2 focus-visible:ring-sidebar-ring"
          )}
          aria-label="Search"
          aria-expanded={open}
        >
          <MagnifyingGlass className="size-4" />
        </button>
        {open && (
          <div
            className={cn(
              "absolute left-full top-0 z-50 ml-2 w-56 rounded-md border border-border",
              "bg-popover p-2 shadow-md"
            )}
          >
            <div className={fieldClassName}>
              <MagnifyingGlass className="size-3.5 shrink-0" aria-hidden />
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search…"
                className={inputClassName}
                aria-label="Search"
                autoComplete="off"
              />
            </div>
            {query.trim().length > 0 && (
              <SearchDropdown
                results={filtered}
                onSelect={handleSelect}
                className="relative mt-1 max-h-48 w-full shadow-none"
              />
            )}
          </div>
        )}
      </div>
    )
  }

  return (
    <div ref={containerRef} className="relative">
      <div className={fieldClassName}>
        <MagnifyingGlass className="size-3.5 shrink-0" aria-hidden />
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
          }}
          onFocus={() => setOpen(true)}
          placeholder="Search…"
          className={inputClassName}
          aria-label="Search"
          aria-expanded={showDropdown}
          aria-controls="sidebar-search-results"
          autoComplete="off"
        />
        <kbd className="pointer-events-none hidden shrink-0 rounded border border-sidebar-border bg-background px-1 py-0.5 font-mono text-[10px] leading-none sm:inline">
          ⌘K
        </kbd>
      </div>
      {showDropdown && (
        <SearchDropdown
          listId="sidebar-search-results"
          results={filtered}
          onSelect={handleSelect}
          className="left-0 right-0 top-full"
        />
      )}
    </div>
  )
}
