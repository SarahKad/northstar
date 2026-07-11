"use client"

import type { CellContext } from "@tanstack/react-table"
import { Badge } from "@/components/ui/badge"
import { DataTable, createColumnHelper, type ColumnDef } from "@/components/ui/data-table"
import { BlockCard } from "@/components/blocks/block-card"

// ── Types ────────────────────────────────────────────────────────────────────

type Employee = {
  id: string
  name: string
  role: string
  department: string
  status: "Active" | "On Leave" | "Inactive"
  joined: string
}

// ── Sample data ───────────────────────────────────────────────────────────────

const data: Employee[] = [
  { id: "E001", name: "Jordan Alvarez",  role: "Senior Engineer",      department: "Product",  status: "Active",   joined: "2021-03-15" },
  { id: "E002", name: "Morgan Lee",      role: "Product Manager",      department: "Product",  status: "Active",   joined: "2020-07-01" },
  { id: "E003", name: "Taylor Kim",      role: "Designer",              department: "Design",   status: "On Leave", joined: "2022-01-10" },
  { id: "E004", name: "Avery Mitchell",  role: "QA Engineer",           department: "Product",  status: "Active",   joined: "2021-11-20" },
  { id: "E005", name: "Casey Thompson",  role: "Data Analyst",          department: "Data",     status: "Inactive", joined: "2019-05-05" },
  { id: "E006", name: "Riley Jackson",   role: "Frontend Engineer",     department: "Product",  status: "Active",   joined: "2023-02-14" },
  { id: "E007", name: "Sam Patel",       role: "Backend Engineer",      department: "Platform", status: "Active",   joined: "2022-09-01" },
  { id: "E008", name: "Drew Martinez",   role: "DevOps Engineer",       department: "Platform", status: "On Leave", joined: "2020-12-17" },
  { id: "E009", name: "Alex Nguyen",     role: "UX Researcher",         department: "Design",   status: "Active",   joined: "2023-06-30" },
  { id: "E010", name: "Quinn Rivera",    role: "Engineering Manager",   department: "Product",  status: "Active",   joined: "2018-04-22" },
  { id: "E011", name: "Parker Singh",    role: "Product Designer",      department: "Design",   status: "Active",   joined: "2021-08-11" },
  { id: "E012", name: "Cameron Wright",  role: "Staff Engineer",        department: "Platform", status: "Inactive", joined: "2017-10-03" },
]

// ── Column definitions ────────────────────────────────────────────────────────

const col = createColumnHelper<Employee>()

const columns: ColumnDef<Employee, string>[] = [
  col.accessor("name", {
    header: "Name",
    cell: (info: CellContext<Employee, string>) => (
      <span className="font-medium text-foreground">{info.getValue()}</span>
    ),
  }),
  col.accessor("role", { header: "Role" }),
  col.accessor("department", { header: "Department" }),
  col.accessor("status", {
    header: "Status",
    cell: (info: CellContext<Employee, string>) => {
      const status = info.getValue()
      const variant =
        status === "Active"   ? "default"
        : status === "On Leave" ? "secondary"
        : "outline"
      return <Badge variant={variant}>{status}</Badge>
    },
  }),
  col.accessor("joined", {
    header: "Joined",
    cell: (info: CellContext<Employee, string>) =>
      new Date(info.getValue()).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
  }),
]

// ── Component ─────────────────────────────────────────────────────────────────

type DataTablePlaygroundProps = {
  searchable?: boolean
  pagination?: boolean
  selectable?: boolean
  columnVisibility?: boolean
}

export function DataTablePlaygroundPreview({
  searchable = false,
  pagination = false,
  selectable = false,
  columnVisibility = false,
}: DataTablePlaygroundProps) {
  return (
    <BlockCard className="w-full">
      <DataTable
        columns={columns}
        data={data}
        searchable={searchable ? "name" : undefined}
        searchPlaceholder="Search by name…"
        pagination={pagination}
        pageSize={8}
        selectable={selectable}
        columnVisibility={columnVisibility}
        title="Employee directory"
      />
    </BlockCard>
  )
}

export function DataTableDemo() {
  return (
    <DataTablePlaygroundPreview
      searchable
      pagination
      selectable
      columnVisibility
    />
  )
}
