"use client"

import { TrendUp } from "@phosphor-icons/react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { BlockCard } from "@/components/blocks/block-card"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"
import { useDocumentThemeId } from "@/hooks/use-document-theme"

const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

/** Small hatched SVG swatch for use in the legend, mirrors the bar pattern. */
const HatchLegendIcon = () => (
  <svg width="12" height="12" viewBox="0 0 12 12" style={{ display: "block" }}>
    <defs>
      <pattern
        id="legendHatchBar"
        patternUnits="userSpaceOnUse"
        width="6"
        height="6"
        patternTransform="rotate(45)"
      >
        <rect width="6" height="6" fill="var(--color-mobile)" fillOpacity={0.12} />
        <line x1="0" y1="0" x2="0" y2="6" stroke="var(--color-mobile)" strokeWidth="1.5" />
      </pattern>
    </defs>
    <rect width="12" height="12" rx="1" fill="url(#legendHatchBar)" />
  </svg>
)

const baseChartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig

type ChartBarStackedProps = {
  title?: string
  dateRange?: string
  metric1Label?: string
  metric2Label?: string
}

export function ChartBarStacked({
  title = "Bar Chart - Stacked + Legend",
  dateRange = "January - June 2024",
  metric1Label = "Desktop",
  metric2Label = "Mobile",
}: ChartBarStackedProps = {}) {
  const colorTheme = useDocumentThemeId()
  const solidFill = colorTheme === "ns-pro"

  const chartConfig: ChartConfig = {
    desktop: {
      ...baseChartConfig.desktop,
      label: metric1Label,
    },
    mobile: {
      ...baseChartConfig.mobile,
      label: metric2Label,
      ...(solidFill ? {} : { icon: HatchLegendIcon }),
    },
  }

  return (
    <BlockCard>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{dateRange}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            {!solidFill && (
              <defs>
                <pattern
                  id="hatchMobile"
                  patternUnits="userSpaceOnUse"
                  width="6"
                  height="6"
                  patternTransform="rotate(45)"
                >
                  <rect width="6" height="6" fill="var(--color-mobile)" fillOpacity={0.12} />
                  <line
                    x1="0" y1="0" x2="0" y2="6"
                    stroke="var(--color-mobile)"
                    strokeWidth="1.5"
                  />
                </pattern>
              </defs>
            )}
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="desktop"
              stackId="a"
              fill="var(--color-desktop)"
              radius={[0, 0, 2, 2]}
            />
            <Bar
              dataKey="mobile"
              stackId="a"
              fill={solidFill ? "var(--color-mobile)" : "url(#hatchMobile)"}
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendUp className="size-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </BlockCard>
  )
}
