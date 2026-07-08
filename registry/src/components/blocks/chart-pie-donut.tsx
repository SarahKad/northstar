"use client"

import * as React from "react"
import { TrendUp } from "@phosphor-icons/react"
import { Label, Pie, PieChart } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

const chartData = [
  { browser: "chrome",  visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari",  visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
  { browser: "edge",    visitors: 173, fill: "var(--color-edge)" },
  { browser: "other",   visitors: 190, fill: "var(--color-other)" },
]

type ChartPieDonutProps = {
  title?: string
  dateRange?: string
  segment1Label?: string
  segment2Label?: string
  segment3Label?: string
  segment4Label?: string
  segment5Label?: string
  centerLabel?: string
}

/**
 * Donut pie chart displaying five browser segments with a centred total-visitors label.
 * Uses chart-* color tokens so it adapts automatically to any active theme.
 * The inter-segment gap colour matches the card background via `stroke="var(--card)"`.
 */
export function ChartPieDonut({
  title = "Donut Chart",
  dateRange = "January – June 2024",
  segment1Label = "Chrome",
  segment2Label = "Safari",
  segment3Label = "Firefox",
  segment4Label = "Edge",
  segment5Label = "Other",
  centerLabel = "Visitors",
}: ChartPieDonutProps = {}) {
  const chartConfig = {
    visitors: { label: "Visitors" },
    chrome:   { label: segment1Label, color: "var(--chart-1)" },
    safari:   { label: segment2Label, color: "var(--chart-2)" },
    firefox:  { label: segment3Label, color: "var(--chart-3)" },
    edge:     { label: segment4Label, color: "var(--chart-4)" },
    other:    { label: segment5Label, color: "var(--chart-5)" },
  } satisfies ChartConfig

  const totalVisitors = React.useMemo(
    () => chartData.reduce((acc, curr) => acc + curr.visitors, 0),
    []
  )

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{dateRange}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
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
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalVisitors.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy ?? 0) + 24}
                          className="fill-muted-foreground"
                        >
                          {centerLabel}
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendUp className="size-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}
