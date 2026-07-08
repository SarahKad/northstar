"use client"

import * as React from "react"
import { MagnifyingGlass } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

type CommandContextValue = {
  query: string
  setQuery: (q: string) => void
}

const CommandContext = React.createContext<CommandContextValue>({
  query: "",
  setQuery: () => {},
})

/**
 * @description Command palette root container. Provides the search context to
 * all child components. Compose with `CommandInput`, `CommandList`, `CommandGroup`,
 * `CommandItem`, `CommandEmpty`, and `CommandSeparator`.
 *
 * @example
 * <Command>
 *   <CommandInput placeholder="Type a command…" />
 *   <CommandList>
 *     <CommandGroup heading="Suggestions">
 *       <CommandItem onSelect={() => {}}>Calendar</CommandItem>
 *     </CommandGroup>
 *   </CommandList>
 * </Command>
 */
function Command({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const [query, setQuery] = React.useState("")
  return (
    <CommandContext.Provider value={{ query, setQuery }}>
      <div
        data-slot="command"
        className={cn(
          "flex flex-col overflow-hidden rounded-lg border border-border bg-popover text-popover-foreground shadow-md",
          className
        )}
        {...props}
      >
        {children}
      </div>
    </CommandContext.Provider>
  )
}

/**
 * @description Search input at the top of the command palette.
 * @param placeholder - Placeholder text for the input. @default "Type a command or search…"
 */
function CommandInput({
  className,
  placeholder = "Type a command or search…",
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  const { query, setQuery } = React.useContext(CommandContext)
  return (
    <div className="flex items-center border-b border-border px-3">
      <MagnifyingGlass className="mr-2 size-4 shrink-0 text-muted-foreground" />
      <input
        data-slot="command-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "flex h-10 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground",
          className
        )}
        {...props}
      />
    </div>
  )
}

/**
 * @description Scrollable list container for command groups and items.
 */
function CommandList({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="command-list"
      role="listbox"
      className={cn("max-h-72 overflow-y-auto overflow-x-hidden p-1", className)}
      {...props}
    />
  )
}

/**
 * @description Labeled group within a `CommandList`.
 * @param heading - Section heading text.
 */
function CommandGroup({
  className,
  heading,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  /** Section heading text. */
  heading?: string
}) {
  return (
    <div
      data-slot="command-group"
      role="group"
      aria-label={heading}
      className={cn("overflow-hidden", className)}
      {...props}
    >
      {heading && (
        <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
          {heading}
        </div>
      )}
      {children}
    </div>
  )
}

/**
 * @description A single result row in a `CommandList`. Pass `keywords` to
 * control filter matching (defaults to matching on text content).
 *
 * @param onSelect - Callback when the item is clicked or selected.
 * @param keywords - Additional strings used for filter matching.
 * @param filterValue - The primary string matched against the search query.
 */
function CommandItem({
  className,
  onSelect,
  keywords = [],
  filterValue = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  /** Callback when the item is activated. */
  onSelect?: () => void
  /** Extra strings included in filter matching. */
  keywords?: string[]
  /** Primary string matched against the search query. */
  filterValue?: string
}) {
  const { query } = React.useContext(CommandContext)
  const allTerms = [filterValue, ...keywords].join(" ").toLowerCase()
  const q = query.toLowerCase().trim()

  if (q && !allTerms.includes(q)) return null

  return (
    <div
      data-slot="command-item"
      role="option"
      aria-selected="false"
      onClick={onSelect}
      className={cn(
        "relative flex cursor-pointer select-none items-center rounded-md px-2 py-1.5 text-sm outline-none",
        "hover:bg-accent hover:text-accent-foreground",
        "focus-visible:bg-accent focus-visible:text-accent-foreground",
        "transition-colors",
        className
      )}
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onSelect?.() }}
      {...props}
    >
      {children}
    </div>
  )
}

/**
 * @description Shown when no `CommandItem` matches the current search query.
 */
function CommandEmpty({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const { query } = React.useContext(CommandContext)
  if (!query) return null
  return (
    <div
      data-slot="command-empty"
      className={cn("py-6 text-center text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

/**
 * @description Horizontal divider between command groups.
 */
function CommandSeparator({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      data-slot="command-separator"
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  )
}

export {
  Command,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandEmpty,
  CommandSeparator,
}
