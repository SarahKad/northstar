"use client"

import * as React from "react"
import { CaretDown, CaretUp, CaretUpDown } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

export type SortDirection = "asc" | "desc" | false

/**
 * @description Scrollable data table container. Wraps a `<table>` element in a
 * horizontally scrollable `<div>` with a rounded border.
 */
function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div
      data-slot="table-wrapper"
      className="scrollbar-themed relative w-full min-w-0 overflow-x-auto rounded-sm border border-border"
    >
      <table
        data-slot="table"
        className={cn("w-full min-w-max text-sm", className)}
        {...props}
      />
    </div>
  )
}

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return (
    <thead
      data-slot="table-header"
      className={cn("bg-muted/70 [&_tr]:border-b [&_tr]:border-border [&_tr:hover]:bg-muted/70", className)}
      {...props}
    />
  )
}

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return (
    <tbody
      data-slot="table-body"
      className={cn("[&_tr:last-child]:border-0", className)}
      {...props}
    />
  )
}

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn(
        "border-t border-border bg-muted/50 font-medium [&>tr]:last:border-b-0",
        className
      )}
      {...props}
    />
  )
}

function TableRow({ className, ...props }: React.ComponentProps<"tr">) {
  return (
    <tr
      data-slot="table-row"
      className={cn(
        "border-b border-border transition-colors odd:bg-background even:bg-muted/40 hover:bg-muted/60 data-[state=selected]:bg-muted",
        className
      )}
      {...props}
    />
  )
}

function TableHead({ className, ...props }: React.ComponentProps<"th">) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "h-10 whitespace-nowrap px-3 text-left align-middle text-xs font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
}

/**
 * @description Sortable column header. Cycles asc → desc → off when clicked.
 */
function TableHeadSort({
  sorted = false,
  onSort,
  className,
  children,
  ...props
}: React.ComponentProps<"th"> & {
  sorted?: SortDirection
  onSort?: () => void
}) {
  const Icon =
    sorted === "asc" ? CaretUp : sorted === "desc" ? CaretDown : CaretUpDown

  return (
    <TableHead className={className} {...props}>
      <button
        type="button"
        onClick={onSort}
        className="inline-flex w-full items-center gap-1 text-left font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <span>{children}</span>
        <Icon className="size-3.5 shrink-0" aria-hidden />
      </button>
    </TableHead>
  )
}

function TableCell({ className, ...props }: React.ComponentProps<"td">) {
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "whitespace-nowrap px-3 py-2.5 align-middle text-sm [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]",
        className
      )}
      {...props}
    />
  )
}

/**
 * @description Visible title displayed above a `Table`. Pair with an sr-only
 * `TableCaption` inside the table for screen readers when needed.
 *
 * @example
 * <div className="space-y-2">
 *   <TableTitle>Recent invoices</TableTitle>
 *   <Table>
 *     <TableCaption>Recent invoices</TableCaption>
 *     …
 *   </Table>
 * </div>
 */
function TableTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="table-title"
      className={cn("text-sm font-medium text-foreground", className)}
      {...props}
    />
  )
}

/**
 * @description Accessible table label for screen readers. Visually hidden, * use `TableTitle` for the visible heading above the table.
 */
function TableCaption({ className, ...props }: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn("sr-only", className)}
      {...props}
    />
  )
}

export {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeadSort,
  TableHeader,
  TableRow,
  TableTitle,
}
