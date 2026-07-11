"use client"

import { useMemo, useState } from "react"
import { ChartBarDefault } from "@/components/blocks/chart-bar-default"
import { ChartBarStacked } from "@/components/blocks/chart-bar-stacked"
import { ChartLineDots } from "@/components/blocks/chart-line-dots"
import { ChartPieDonut } from "@/components/blocks/chart-pie-donut"
import { ChartAreaInteractive } from "@/components/ui/chart-area-interactive"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Stepper } from "@/components/ui/stepper"
import {
  Table,
  TableBody,
  TableCell,
  TableHeadSort,
  TableHeader,
  TableRow,
  type SortDirection,
} from "@/components/ui/table"
import {
  TopNav,
  TopNavActions,
  TopNavBrand,
  TopNavBreadcrumb,
} from "@/components/ui/top-nav"
import { DarkModeToggle } from "@/components/ag-shell/dark-mode-toggle"

const KPI = [
  { label: "Active users", value: "2,847", change: "+12%" },
  { label: "Sessions", value: "18,392", change: "+8%" },
  { label: "Conversion", value: "4.2%", change: "+0.3%" },
]

const TABLE_ROWS = [
  { name: "Annual report", status: "Published", owner: "Jane Doe" },
  { name: "Q2 summary", status: "Draft", owner: "Alex Kim" },
  { name: "Budget review", status: "In review", owner: "Sam Lee" },
]

type SortKey = "name" | "status" | "owner"

function cycleSort(current: SortDirection): SortDirection {
  if (current === false) return "asc"
  if (current === "asc") return "desc"
  return false
}

/**
 * Reference dashboard, demonstrates North Star components in a real app layout.
 * Remove sections as you build your product.
 */
export function DashboardShowcase() {
  const [sortKey, setSortKey] = useState<SortKey | null>(null)
  const [sortDir, setSortDir] = useState<SortDirection>(false)

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      const next = cycleSort(sortDir)
      setSortDir(next)
      if (next === false) setSortKey(null)
    } else {
      setSortKey(key)
      setSortDir("asc")
    }
  }

  const sortedRows = useMemo(() => {
    if (!sortKey || !sortDir) return TABLE_ROWS
    return [...TABLE_ROWS].sort((a, b) => {
      const av = a[sortKey].toLowerCase()
      const bv = b[sortKey].toLowerCase()
      if (av < bv) return sortDir === "asc" ? -1 : 1
      if (av > bv) return sortDir === "asc" ? 1 : -1
      return 0
    })
  }, [sortKey, sortDir])

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <TopNav>
        <SidebarTrigger className="-ml-1 shrink-0" />
        <TopNavBrand>My App</TopNavBrand>
        <TopNavBreadcrumb
          items={[
            { label: "Home", href: "/dashboard" },
            { label: "Dashboard" },
          ]}
        />
        <TopNavActions showSearch={false}>
          <DarkModeToggle />
          <Button size="sm">New</Button>
        </TopNavActions>
      </TopNav>

      <div className="scrollbar-themed flex-1 overflow-y-auto p-4 md:p-6">
        <div className="mx-auto flex max-w-6xl flex-col gap-8">
          <div>
            <h1 className="text-3xl tracking-tight">Dashboard</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Component showcase, replace with your product UI.
            </p>
          </div>

          <Alert>
            <AlertTitle>North Star App Shell</AlertTitle>
            <AlertDescription>
              This page demonstrates layout, navigation, inputs, data display, and charts.
              Charts require <code className="text-xs">chart.tsx</code>, theme tokens, and a
              minimum height on their container.
            </AlertDescription>
          </Alert>

          <section id="components" className="flex flex-col gap-4">
            <h2 className="scroll-mt-6">Overview</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {KPI.map((item) => (
                <Card key={item.label}>
                  <CardHeader className="pb-2">
                    <CardDescription>{item.label}</CardDescription>
                    <CardTitle className="text-2xl tabular-nums">{item.value}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="secondary">{item.change}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="scroll-mt-6">Setup progress</h2>
            <Card>
              <CardHeader>
                <CardTitle>Stepper</CardTitle>
                <CardDescription>Onboarding or wizard flows</CardDescription>
              </CardHeader>
              <CardContent>
                <Stepper
                  currentStep={1}
                  steps={[
                    { label: "Account", description: "Create credentials" },
                    { label: "Profile", description: "Basic details" },
                    { label: "Review", description: "Confirm and submit" },
                  ]}
                />
              </CardContent>
            </Card>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="scroll-mt-6">Team</h2>
            <div className="flex flex-wrap items-center gap-3">
              {["JD", "AK", "SL"].map((initials) => (
                <Avatar key={initials} size="lg">
                  <AvatarImage alt={initials} />
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
              ))}
              <Badge>New</Badge>
              <Badge variant="secondary">3 members</Badge>
            </div>
          </section>

          <section className="flex flex-col gap-4">
            <h2 className="scroll-mt-6">Documents</h2>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHeadSort
                    sorted={sortKey === "name" ? sortDir : false}
                    onSort={() => toggleSort("name")}
                  >
                    Name
                  </TableHeadSort>
                  <TableHeadSort
                    sorted={sortKey === "status" ? sortDir : false}
                    onSort={() => toggleSort("status")}
                  >
                    Status
                  </TableHeadSort>
                  <TableHeadSort
                    sorted={sortKey === "owner" ? sortDir : false}
                    onSort={() => toggleSort("owner")}
                  >
                    Owner
                  </TableHeadSort>
                </TableRow>
              </TableHeader>
              <TableBody>
                {sortedRows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell className="font-medium">{row.name}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{row.status}</Badge>
                    </TableCell>
                    <TableCell>{row.owner}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </section>

          <section id="charts" className="flex flex-col gap-4">
            <h2 className="scroll-mt-6">Charts &amp; graphs</h2>
            <div className="grid gap-4 lg:grid-cols-2">
              <div className="min-h-[320px] w-full">
                <ChartBarDefault />
              </div>
              <div className="min-h-[320px] w-full">
                <ChartBarStacked />
              </div>
              <div className="min-h-[320px] w-full">
                <ChartPieDonut />
              </div>
              <div className="min-h-[320px] w-full">
                <ChartLineDots />
              </div>
            </div>
            <div className="min-h-[320px] w-full">
              <ChartAreaInteractive />
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
