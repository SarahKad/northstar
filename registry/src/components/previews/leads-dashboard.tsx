"use client"

import { useMemo, useState } from "react"
import { Area, AreaChart, CartesianGrid, Label, Pie, PieChart, XAxis } from "recharts"
import { CalendarBlank, Info } from "@phosphor-icons/react"
import {
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { BlockCard } from "@/components/blocks/block-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ButtonGroup, ButtonGroupItem } from "@/components/ui/button-group"
import { Separator } from "@/components/ui/separator"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { DataTable, createColumnHelper, type ColumnDef } from "@/components/ui/data-table"
import { cn } from "@/lib/utils"

const FUNNEL_STAGES = [
  { id: "discovery", label: "Discovery", count: 200, value: "$200", duration: "2 days", color: "var(--chart-1)", flex: 200 },
  { id: "qualified", label: "Qualified", count: 100, value: "$100", duration: "2 days", color: "var(--chart-2)", flex: 100 },
  { id: "conversation", label: "In conversation", count: 50, value: "$100", duration: "5 days", color: "var(--chart-5)", flex: 50 },
  { id: "negotiations", label: "Negotiations", count: 100, value: "$50", duration: "8 days", color: "var(--chart-4)", flex: 100 },
  { id: "closed", label: "Closed won", count: 100, value: "$50", duration: "10 days", color: "var(--chart-3)", flex: 100 },
] as const

type SourceKey = "clutch" | "behance" | "instagram" | "dribbble"
type SourceView = "received" | "converted" | "deals"

type SourceMetric = {
  source: SourceKey
  value: number
  display: string
  fill: string
}

const SOURCE_VIEWS: Record<
  SourceView,
  { centerPrimary: string; centerSecondary: string; data: SourceMetric[] }
> = {
  received: {
    centerPrimary: "900",
    centerSecondary: "received",
    data: [
      { source: "clutch", value: 420, display: "420", fill: "var(--color-clutch)" },
      { source: "behance", value: 210, display: "210", fill: "var(--color-behance)" },
      { source: "instagram", value: 180, display: "180", fill: "var(--color-instagram)" },
      { source: "dribbble", value: 90, display: "90", fill: "var(--color-dribbble)" },
    ],
  },
  converted: {
    centerPrimary: "300",
    centerSecondary: "converted",
    data: [
      { source: "clutch", value: 150, display: "150", fill: "var(--color-clutch)" },
      { source: "behance", value: 75, display: "75", fill: "var(--color-behance)" },
      { source: "instagram", value: 45, display: "45", fill: "var(--color-instagram)" },
      { source: "dribbble", value: 30, display: "30", fill: "var(--color-dribbble)" },
    ],
  },
  deals: {
    centerPrimary: "$6,000",
    centerSecondary: "total",
    data: [
      { source: "clutch", value: 3000, display: "$3,000", fill: "var(--color-clutch)" },
      { source: "behance", value: 1000, display: "$1,000", fill: "var(--color-behance)" },
      { source: "instagram", value: 1000, display: "$1,000", fill: "var(--color-instagram)" },
      { source: "dribbble", value: 1000, display: "$1,000", fill: "var(--color-dribbble)" },
    ],
  },
}

const sourceChartConfig = {
  value: { label: "Value" },
  clutch: { label: "Clutch", color: "var(--chart-1)" },
  behance: { label: "Behance", color: "var(--chart-2)" },
  instagram: { label: "Instagram", color: "var(--chart-5)" },
  dribbble: { label: "Dribbble", color: "var(--chart-4)" },
} satisfies ChartConfig

type TrackingRange = "30d" | "3m" | "6m" | "12m"

const TRACKING_BY_RANGE: Record<
  TrackingRange,
  {
    closed: number
    lost: number
    data: { month: string; won: number; lost: number }[]
  }
> = {
  "30d": {
    closed: 86,
    lost: 18,
    data: [
      { month: "Week 1", won: 18, lost: 4 },
      { month: "Week 2", won: 22, lost: 5 },
      { month: "Week 3", won: 24, lost: 3 },
      { month: "Week 4", won: 22, lost: 6 },
    ],
  },
  "3m": {
    closed: 118,
    lost: 30,
    data: [
      { month: "June", won: 32, lost: 12 },
      { month: "July", won: 38, lost: 8 },
      { month: "August", won: 48, lost: 10 },
    ],
  },
  "6m": {
    closed: 138,
    lost: 37,
    data: [
      { month: "March", won: 8, lost: 2 },
      { month: "April", won: 4, lost: 3 },
      { month: "May", won: 8, lost: 2 },
      { month: "June", won: 32, lost: 12 },
      { month: "July", won: 38, lost: 8 },
      { month: "August", won: 48, lost: 10 },
    ],
  },
  "12m": {
    closed: 214,
    lost: 58,
    data: [
      { month: "Sep", won: 10, lost: 3 },
      { month: "Oct", won: 14, lost: 4 },
      { month: "Nov", won: 12, lost: 5 },
      { month: "Dec", won: 18, lost: 4 },
      { month: "Jan", won: 11, lost: 3 },
      { month: "Feb", won: 11, lost: 2 },
      { month: "Mar", won: 8, lost: 2 },
      { month: "Apr", won: 4, lost: 3 },
      { month: "May", won: 8, lost: 2 },
      { month: "Jun", won: 32, lost: 12 },
      { month: "Jul", won: 38, lost: 8 },
      { month: "Aug", won: 48, lost: 10 },
    ],
  },
}

const trackingChartConfig = {
  won: { label: "Closed won", color: "var(--chart-1)" },
  lost: { label: "Closed lost", color: "var(--chart-2)" },
} satisfies ChartConfig

const LOST_REASONS = [
  { percent: "40%", reason: "The proposal is unclear" },
  { percent: "20%", reason: "However venture pursuit" },
  { percent: "10%", reason: "Other" },
  { percent: "30%", reason: "The proposal is unclear" },
] as const

function formatPercent(value: number, total: number) {
  if (total <= 0) return "0%"
  return `${Math.round((value / total) * 100)}%`
}

function FunnelCard() {
  return (
    <BlockCard className="h-full">
      <CardHeader>
        <CardTitle>Funnel count</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        <p className="text-2xl tracking-tight text-foreground">600 active leads</p>

        <div className="flex h-3 w-full overflow-hidden rounded-full">
          {FUNNEL_STAGES.map((stage) => (
            <Tooltip key={stage.id}>
              <TooltipTrigger
                render={
                  <button
                    type="button"
                    className="h-full first:rounded-l-full last:rounded-r-full"
                    style={{ flex: stage.flex, backgroundColor: stage.color }}
                    aria-label={`${stage.label}: ${stage.count} leads, ${stage.value}`}
                  />
                }
              />
              <TooltipContent>
                <span className="font-medium">{stage.label}</span>
                <span className="opacity-80">
                  · {stage.count} leads · {stage.value}
                </span>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>

        <div className="flex flex-col gap-0">
          {FUNNEL_STAGES.map((stage, index) => (
            <div key={stage.id}>
              <div className="grid grid-cols-[1fr_auto_auto_auto] items-center gap-4 py-2.5 text-sm">
                <div className="flex min-w-0 items-center gap-2">
                  <span
                    className="size-2.5 shrink-0 rounded-sm"
                    style={{ backgroundColor: stage.color }}
                    aria-hidden
                  />
                  <span className="truncate text-foreground">{stage.label}</span>
                </div>
                <span className="tabular-nums text-muted-foreground">{stage.count}</span>
                <span className="w-14 text-right tabular-nums text-muted-foreground">
                  {stage.value}
                </span>
                <Tooltip>
                  <TooltipTrigger
                    render={
                      <button
                        type="button"
                        className="w-16 text-right tabular-nums text-muted-foreground underline decoration-dotted underline-offset-2"
                      />
                    }
                  >
                    {stage.duration}
                  </TooltipTrigger>
                  <TooltipContent>Average time on this stage</TooltipContent>
                </Tooltip>
              </div>
              {index < FUNNEL_STAGES.length - 1 && <Separator />}
            </div>
          ))}
        </div>
      </CardContent>
    </BlockCard>
  )
}

function SourcesCard() {
  const [sourceView, setSourceView] = useState<SourceView>("converted")
  const view = SOURCE_VIEWS[sourceView]
  const total = useMemo(
    () => view.data.reduce((sum, item) => sum + item.value, 0),
    [view.data]
  )

  return (
    <BlockCard className="h-full">
      <CardHeader>
        <CardTitle>Sources</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-center">
          <ChartContainer
            config={sourceChartConfig}
            className="mx-auto aspect-square h-[11rem] w-[11rem] shrink-0"
          >
            <PieChart>
              <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
              <Pie
                data={view.data}
                dataKey="value"
                nameKey="source"
                innerRadius={48}
                strokeWidth={4}
                stroke="var(--card)"
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy ?? 0) - 6}
                            className="fill-foreground text-xl font-medium"
                          >
                            {view.centerPrimary}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy ?? 0) + 14}
                            className="fill-muted-foreground text-xs"
                          >
                            {view.centerSecondary}
                          </tspan>
                        </text>
                      )
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>

          <div className="flex w-full flex-col gap-3">
            {view.data.map((item) => {
              const config = sourceChartConfig[item.source]
              return (
                <div
                  key={item.source}
                  className="grid grid-cols-[1fr_auto_auto] items-center gap-3 text-sm"
                >
                  <div className="flex min-w-0 items-center gap-2">
                    <span
                      className="size-2.5 shrink-0 rounded-sm"
                      style={{ backgroundColor: config.color }}
                      aria-hidden
                    />
                    <span className="truncate">{config.label}</span>
                  </div>
                  <span className="tabular-nums text-muted-foreground">{item.display}</span>
                  <span className="w-10 text-right tabular-nums text-muted-foreground">
                    {formatPercent(item.value, total)}
                  </span>
                </div>
              )
            })}
          </div>
        </div>

        <ButtonGroup size="sm" className="self-end">
          <ButtonGroupItem
            active={sourceView === "received"}
            onClick={() => setSourceView("received")}
          >
            Leads received
          </ButtonGroupItem>
          <ButtonGroupItem
            active={sourceView === "converted"}
            onClick={() => setSourceView("converted")}
          >
            Leads converted
          </ButtonGroupItem>
          <ButtonGroupItem
            active={sourceView === "deals"}
            onClick={() => setSourceView("deals")}
          >
            Total deals
          </ButtonGroupItem>
        </ButtonGroup>
      </CardContent>
    </BlockCard>
  )
}

function TrackingCard() {
  const [timeRange, setTimeRange] = useState<TrackingRange>("6m")
  const tracking = TRACKING_BY_RANGE[timeRange]

  return (
    <BlockCard>
      <CardHeader className="flex flex-row flex-wrap items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <CardTitle>Leads tracking</CardTitle>
          <div className="mt-2 flex flex-wrap gap-6">
            <p className="text-2xl tracking-tight">
              <span className="text-foreground">{tracking.closed}</span>{" "}
              <span className="text-base text-muted-foreground">total closed</span>
            </p>
            <p className="text-2xl tracking-tight">
              <span className="text-foreground">{tracking.lost}</span>{" "}
              <span className="text-base text-muted-foreground">total lost</span>
            </p>
          </div>
        </div>
        <Select
          value={timeRange}
          onValueChange={(value) => {
            if (value === "30d" || value === "3m" || value === "6m" || value === "12m") {
              setTimeRange(value)
            }
          }}
        >
          <SelectTrigger id="tracking-range" size="sm" className="w-[10.5rem]">
            <CalendarBlank className="size-3.5 text-muted-foreground" aria-hidden />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="3m">Last 3 months</SelectItem>
            <SelectItem value="6m">Last 6 months</SelectItem>
            <SelectItem value="12m">Last 12 months</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <ChartContainer config={trackingChartConfig} className="aspect-auto h-[260px] w-full">
          <AreaChart data={tracking.data} margin={{ left: 8, right: 8, top: 8 }}>
            <defs>
              <linearGradient id="fillWon" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-won)" stopOpacity={0.35} />
                <stop offset="95%" stopColor="var(--color-won)" stopOpacity={0.02} />
              </linearGradient>
              <linearGradient id="fillLost" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-lost)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="var(--color-lost)" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Area
              dataKey="won"
              type="natural"
              fill="url(#fillWon)"
              stroke="var(--color-won)"
              strokeWidth={2}
            />
            <Area
              dataKey="lost"
              type="natural"
              fill="url(#fillLost)"
              stroke="var(--color-lost)"
              strokeWidth={2}
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </BlockCard>
  )
}

function LostReasonsCard() {
  return (
    <BlockCard className="h-full">
      <CardHeader>
        <CardTitle>Reasons of leads lost</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-border">
          {LOST_REASONS.map((item, index) => (
            <div
              key={`${item.percent}-${index}`}
              className="flex min-h-[7.5rem] flex-col justify-center gap-2 bg-card p-5"
            >
              <p className="text-3xl tracking-tight text-foreground">{item.percent}</p>
              <p className="text-sm text-muted-foreground">{item.reason}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </BlockCard>
  )
}

function OtherDataCard() {
  return (
    <BlockCard className="h-full">
      <CardHeader>
        <CardTitle>Other data</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-8 sm:grid-cols-3">
          <div className="flex flex-col gap-2">
            <p className="text-3xl tracking-tight tabular-nums">900</p>
            <p className="text-sm text-muted-foreground">total leads count</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-3xl tracking-tight tabular-nums">12</p>
            <p className="text-sm text-muted-foreground">days in average to convert lead</p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <p className="text-3xl tracking-tight tabular-nums">30</p>
              <Tooltip>
                <TooltipTrigger
                  render={
                    <button
                      type="button"
                      aria-label="About inactive leads"
                      className="text-muted-foreground hover:text-foreground"
                    />
                  }
                >
                  <Info className="size-4" />
                </TooltipTrigger>
                <TooltipContent>Leads with no activity in the selected period</TooltipContent>
              </Tooltip>
            </div>
            <p className="text-sm text-muted-foreground">inactive leads</p>
          </div>
        </div>
      </CardContent>
    </BlockCard>
  )
}

type SaleRow = {
  id: string
  year: string
  month: string
  type: string
  salesperson: string
  region: string
  sales: string
  units: string
  order: string
}

const salesData: SaleRow[] = [
  { id: "1", year: "2013", month: "January", type: "Ice Cream", salesperson: "Bishop", region: "West", sales: "$2,395.50", units: "1597", order: "001" },
  { id: "2", year: "2013", month: "January", type: "Ice Cream", salesperson: "Bishop", region: "West", sales: "$11,761.50", units: "7841", order: "002" },
  { id: "3", year: "2013", month: "January", type: "Frozen Yogurt", salesperson: "Bishop", region: "West", sales: "$8,943.00", units: "5962", order: "003" },
  { id: "4", year: "2013", month: "January", type: "Ice Cream", salesperson: "Bishop", region: "West", sales: "$2,395.50", units: "1597", order: "004" },
  { id: "5", year: "2013", month: "January", type: "Ice Cream", salesperson: "Bishop", region: "West", sales: "$11,761.50", units: "7841", order: "005" },
  { id: "6", year: "2013", month: "January", type: "Frozen Yogurt", salesperson: "Bishop", region: "West", sales: "$8,943.00", units: "5962", order: "006" },
  { id: "7", year: "2013", month: "January", type: "Frozen Yogurt", salesperson: "Lee", region: "Central", sales: "$14,596.50", units: "9731", order: "007" },
  { id: "8", year: "2013", month: "January", type: "Tasty Treats", salesperson: "Lee", region: "Central", sales: "$8,793.00", units: "5862", order: "008" },
  { id: "9", year: "2013", month: "January", type: "Frozen Yogurt", salesperson: "Lee", region: "Central", sales: "$14,596.50", units: "9731", order: "009" },
  { id: "10", year: "2013", month: "January", type: "Tasty Treats", salesperson: "Lee", region: "Central", sales: "$8,793.00", units: "5862", order: "010" },
  { id: "11", year: "2013", month: "January", type: "Ice Cream", salesperson: "Parker", region: "North", sales: "$4,666.00", units: "5623", order: "011" },
  { id: "12", year: "2013", month: "January", type: "Ice Cream", salesperson: "Parker", region: "North", sales: "$7,318.50", units: "4879", order: "012" },
  { id: "13", year: "2013", month: "January", type: "Ice Cream", salesperson: "Parker", region: "North", sales: "$4,666.00", units: "5623", order: "013" },
  { id: "14", year: "2013", month: "January", type: "Ice Cream", salesperson: "Parker", region: "North", sales: "$7,318.50", units: "4879", order: "014" },
  { id: "15", year: "2013", month: "January", type: "Popsicles", salesperson: "Pullen", region: "South", sales: "$3,553.50", units: "2369", order: "015" },
  { id: "16", year: "2013", month: "January", type: "Popsicles", salesperson: "Pullen", region: "South", sales: "$3,553.50", units: "2369", order: "016" },
  { id: "17", year: "2013", month: "January", type: "Frozen Yogurt", salesperson: "Watson", region: "Central", sales: "$14,596.50", units: "9731", order: "017" },
  { id: "18", year: "2013", month: "January", type: "Tasty Treats", salesperson: "Watson", region: "Central", sales: "$8,793.00", units: "5862", order: "018" },
  { id: "19", year: "2013", month: "January", type: "Frozen Yogurt", salesperson: "Watson", region: "Central", sales: "$14,596.50", units: "9731", order: "019" },
  { id: "20", year: "2013", month: "January", type: "Tasty Treats", salesperson: "Watson", region: "Central", sales: "$8,793.00", units: "5862", order: "020" },
  { id: "21", year: "2013", month: "February", type: "Ice Cream", salesperson: "Bishop", region: "West", sales: "$4,887.00", units: "3258", order: "021" },
  { id: "22", year: "2013", month: "February", type: "Ice Cream", salesperson: "Bishop", region: "West", sales: "$4,887.00", units: "3258", order: "022" },
]

const salesCol = createColumnHelper<SaleRow>()

const salesColumns: ColumnDef<SaleRow, string>[] = [
  salesCol.accessor("year", {
    header: "Year",
    cell: (info) => <span className="tabular-nums">{info.getValue()}</span>,
  }),
  salesCol.accessor("month", { header: "Month" }),
  salesCol.accessor("type", { header: "Type" }),
  salesCol.accessor("salesperson", { header: "Salesperson" }),
  salesCol.accessor("region", { header: "Region" }),
  salesCol.accessor("sales", {
    header: "Sales",
    cell: (info) => <span className="tabular-nums">{info.getValue()}</span>,
  }),
  salesCol.accessor("units", {
    header: "Units",
    cell: (info) => <span className="tabular-nums">{info.getValue()}</span>,
  }),
  salesCol.accessor("order", {
    header: "Order #",
    cell: (info) => (
      <span className="font-mono text-xs tabular-nums">{info.getValue()}</span>
    ),
  }),
]

function SalesTableCard() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <h2 className="text-2xl tracking-tight">Sales Past Three Years</h2>
        <p className="mt-1 text-sm text-muted-foreground">2013 – 2015</p>
      </div>
      <DataTable
        columns={salesColumns}
        data={salesData}
        searchable="salesperson"
        searchPlaceholder="Search by salesperson…"
        pagination
        pageSize={10}
        columnVisibility
        title="Sales records"
      />
    </div>
  )
}

/**
 * Compositional dashboard preview built only from registry components
 * (Card/BlockCard, Tabs, Select, ButtonGroup, Chart, Tooltip, Separator, DataTable).
 */
export function LeadsDashboard() {
  return (
    <Tabs defaultValue="leads" className="w-full gap-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <TabsList variant="line">
          <TabsTrigger value="sales">Sales</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
        </TabsList>
      </div>

      <TabsContent value="sales" className="mt-0">
        <SalesTableCard />
      </TabsContent>

      <TabsContent value="leads" className={cn("mt-0 flex flex-col gap-4")}>
        <div className="grid gap-4 lg:grid-cols-2">
          <FunnelCard />
          <SourcesCard />
        </div>
        <TrackingCard />
        <div className="grid gap-4 lg:grid-cols-2">
          <LostReasonsCard />
          <OtherDataCard />
        </div>
      </TabsContent>
    </Tabs>
  )
}
