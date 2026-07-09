"use client"

import * as React from "react"
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
  type VisibilityState,
  type RowSelectionState,
} from "@tanstack/react-table"
import { MagnifyingGlass, SlidersHorizontal } from "@phosphor-icons/react"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeadSort,
  TableHeader,
  TableRow,
  TableTitle,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Pagination,
  PaginationEllipsis,
  PaginationItem,
  PaginationPrev,
  PaginationNext,
  getPaginationPages,
} from "@/components/ui/pagination"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

// Re-export so consumers can import directly from the design system
export type { ColumnDef } from "@tanstack/react-table"
export { createColumnHelper } from "@tanstack/react-table"

export interface DataTableProps<TData, TValue = unknown> {
  /**
   * Column definitions. Use `createColumnHelper<TData>()` for full type
   * inference on accessors, headers, and cell renderers.
   */
  columns: ColumnDef<TData, TValue>[]

  /** Array of data objects to render as rows. */
  data: TData[]

  /**
   * Enable a search input in the toolbar.
   * - `true`  → global filter across all columns
   * - `"colId"` → filter a single column by its accessorKey
   */
  searchable?: boolean | string

  /** Placeholder text for the search input. Defaults to "Search…" */
  searchPlaceholder?: string

  /** Show pagination controls below the table. */
  pagination?: boolean

  /** Rows per page when pagination is enabled. Defaults to 10. */
  pageSize?: number

  /** Prepend a checkbox column for per-row selection. */
  selectable?: boolean

  /**
   * Callback fired whenever row selection changes.
   * Receives an array of the original data objects for each selected row.
   */
  onSelectionChange?: (selected: TData[]) => void

  /** Show a column visibility toggle dropdown in the toolbar. */
  columnVisibility?: boolean

  /** Title shown above the table; also exposed to screen readers via a hidden caption. */
  title?: string

  className?: string
}

/**
 * @description Fully-featured data table powered by TanStack Table v8.
 * Sorting, pagination, search, row selection, and column visibility, all
 * rendered with AG Design System tokens and existing UI primitives.
 *
 * @example
 * ```tsx
 * import { DataTable, createColumnHelper, type ColumnDef } from "@/components/ui/data-table"
 *
 * type Invoice = { id: string; customer: string; amount: number; status: string }
 * const col = createColumnHelper<Invoice>()
 *
 * const columns: ColumnDef<Invoice>[] = [
 *   col.accessor("id",       { header: "Invoice" }),
 *   col.accessor("customer", { header: "Customer" }),
 *   col.accessor("amount",   { header: "Amount" }),
 *   col.accessor("status",   { header: "Status" }),
 * ]
 *
 * <DataTable columns={columns} data={invoices} searchable pagination selectable />
 * ```
 */
function DataTable<TData, TValue = unknown>({
  columns,
  data,
  searchable,
  searchPlaceholder = "Search…",
  pagination = false,
  pageSize = 10,
  selectable = false,
  onSelectionChange,
  columnVisibility: columnVisibilityEnabled = false,
  title,
  className,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = React.useState("")
  const [visibility, setVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})

  // ── Selection column ──────────────────────────────────────────────────────
  const selectionColumn = React.useMemo<ColumnDef<TData, TValue>>(
    () => ({
      id: "__select__",
      header: ({ table }) => (
        <Checkbox
          className="translate-y-[2px]"
          checked={table.getIsAllPageRowsSelected()}
          indeterminate={
            table.getIsSomePageRowsSelected() && !table.getIsAllPageRowsSelected()
          }
          onCheckedChange={(val) => table.toggleAllPageRowsSelected(!!val)}
          aria-label="Select all rows on this page"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          className="translate-y-[2px]"
          checked={row.getIsSelected()}
          onCheckedChange={(val) => row.toggleSelected(!!val)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
      size: 40,
    }),
    []
  )

  const resolvedColumns = selectable
    ? [selectionColumn, ...columns]
    : columns

  // ── Determine filter strategy ──────────────────────────────────────────────
  // string → per-column filter on that accessor key
  // true   → TanStack global filter
  const filterColumnId = typeof searchable === "string" ? searchable : undefined

  // ── Table instance ─────────────────────────────────────────────────────────
  const table = useReactTable<TData>({
    data,
    columns: resolvedColumns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    ...(pagination && { getPaginationRowModel: getPaginationRowModel() }),
    ...(selectable && { enableRowSelection: true }),
    defaultColumn: {
      enableHiding: columnVisibilityEnabled,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      // Only use globalFilter when we're NOT doing per-column filtering
      globalFilter: filterColumnId ? undefined : globalFilter,
      columnVisibility: visibility,
      rowSelection,
    },
    ...(pagination && { initialState: { pagination: { pageSize } } }),
  })

  // Propagate selection changes to parent
  React.useEffect(() => {
    onSelectionChange?.(
      table.getSelectedRowModel().rows.map((r) => r.original)
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rowSelection])

  // ── Derived helpers ────────────────────────────────────────────────────────
  const showToolbar = Boolean(searchable || columnVisibilityEnabled)
  const hasRows = table.getRowModel().rows.length > 0

  // Unified search value for the toolbar input
  const searchValue = filterColumnId
    ? ((table.getColumn(filterColumnId)?.getFilterValue() as string) ?? "")
    : globalFilter

  function handleSearch(value: string) {
    if (filterColumnId) {
      table.getColumn(filterColumnId)?.setFilterValue(value)
    } else {
      setGlobalFilter(value)
    }
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className={cn("flex w-full min-w-0 flex-col gap-3", className)}>

      {/* ── Toolbar ──────────────────────────────────────────────────────── */}
      {showToolbar && (
        <div className="flex min-w-0 flex-nowrap items-center gap-2">
          {searchable && (
            <div className="relative min-w-0 max-w-xs flex-1">
              <MagnifyingGlass className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder={searchPlaceholder}
                value={searchValue}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-8"
              />
            </div>
          )}

          {columnVisibilityEnabled && (
            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <Button
                    variant="outline"
                    size="sm"
                    className="ml-auto shrink-0 gap-1.5"
                  />
                }
              >
                <SlidersHorizontal className="size-3.5" />
                Columns
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[10rem]">
                <DropdownMenuLabel>Toggle columns</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {table
                  .getAllColumns()
                  .filter((col) => col.getCanHide())
                  .map((col) => {
                    const header = col.columnDef.header
                    const label =
                      typeof header === "string"
                        ? header
                        : col.id.replace(/_/g, " ")
                    return (
                      <DropdownMenuItem
                        key={col.id}
                        className="flex items-center gap-2"
                        onClick={() => col.toggleVisibility(!col.getIsVisible())}
                      >
                        <Checkbox
                          checked={col.getIsVisible()}
                          aria-hidden
                          tabIndex={-1}
                          className="pointer-events-none"
                        />
                        <span className="capitalize">{label}</span>
                      </DropdownMenuItem>
                    )
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      )}

      {/* ── Table ────────────────────────────────────────────────────────── */}
      {title && <TableTitle>{title}</TableTitle>}
      <Table>
        {title && <TableCaption>{title}</TableCaption>}

        <TableHeader>
          {table.getHeaderGroups().map((hg) => (
            <TableRow key={hg.id}>
              {hg.headers.map((header) => {
                const canSort = header.column.getCanSort()
                const sorted = header.column.getIsSorted() // "asc" | "desc" | false
                const content = header.isPlaceholder
                  ? null
                  : flexRender(header.column.columnDef.header, header.getContext())
                // Only pass explicit width when it differs from TanStack's 150px default
                const colWidth =
                  header.getSize() !== 150 ? header.getSize() : undefined

                return canSort ? (
                  <TableHeadSort
                    key={header.id}
                    sorted={sorted === false ? false : sorted}
                    onSort={() => header.column.toggleSorting()}
                    style={{ width: colWidth }}
                  >
                    {content}
                  </TableHeadSort>
                ) : (
                  <TableHead key={header.id} style={{ width: colWidth }}>
                    {content}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {hasRows ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() ? "selected" : undefined}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={resolvedColumns.length}
                className="h-24 text-center text-muted-foreground"
              >
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* ── Pagination footer ────────────────────────────────────────────── */}
      {pagination && (
        <div className="scrollbar-themed flex min-w-0 flex-nowrap items-center justify-between gap-4 overflow-x-auto text-sm text-muted-foreground">
          {/* Row count / selection summary */}
          {selectable ? (
            <span className="shrink-0 whitespace-nowrap">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row
              {table.getFilteredRowModel().rows.length !== 1 ? "s" : ""} selected
            </span>
          ) : (
            <span className="shrink-0 whitespace-nowrap">
              {table.getFilteredRowModel().rows.length} row
              {table.getFilteredRowModel().rows.length !== 1 ? "s" : ""}
            </span>
          )}

          {/* Page controls, matches registry Pagination composition */}
          {(() => {
            const currentPage = table.getState().pagination.pageIndex + 1
            const pageCount = Math.max(table.getPageCount(), 1)
            const pages = getPaginationPages(currentPage, pageCount)

            return (
              <Pagination className="shrink-0">
                <PaginationPrev
                  onClick={() => table.previousPage()}
                  disabled={!table.getCanPreviousPage()}
                />
                {pages.map((page, index) =>
                  page === "ellipsis" ? (
                    <PaginationEllipsis key={`ellipsis-${index}`} />
                  ) : (
                    <PaginationItem
                      key={page}
                      aria-current={currentPage === page ? "page" : undefined}
                      onClick={() => table.setPageIndex(page - 1)}
                    >
                      {page}
                    </PaginationItem>
                  )
                )}
                <PaginationNext
                  onClick={() => table.nextPage()}
                  disabled={!table.getCanNextPage()}
                />
              </Pagination>
            )
          })()}
        </div>
      )}
    </div>
  )
}

export { DataTable }
