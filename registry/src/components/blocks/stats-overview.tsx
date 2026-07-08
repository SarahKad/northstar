"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { usePreviewViewport } from "@/components/registry/preview-viewport-context"
import { cn } from "@/lib/utils"

const stats = [
  { label: "Total Revenue", value: "$45,231", trend: "+20.1%", up: true },
  { label: "Active Users", value: "2,350", trend: "+15.3%", up: true },
  { label: "New Signups", value: "+573", trend: "+8.2%", up: true },
  { label: "Churn Rate", value: "3.2%", trend: "-1.4%", up: false },
]

type Props = {
  props?: Record<string, string | boolean>
}

export function StatsOverview({ props: blockProps = {} }: Props) {
  const viewport = usePreviewViewport()
  const count = blockProps.columns === "2" ? 2 : 4
  const visible = stats.slice(0, count)
  const isMobilePreview = viewport === "mobile"

  return (
    <div
      className={cn(
        "grid gap-4",
        isMobilePreview
          ? "grid-cols-1"
          : count === 2
            ? "grid-cols-1 sm:grid-cols-2"
            : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      )}
    >
      {visible.map((stat) => (
        <Card key={stat.label}>
          <CardHeader>
            <CardDescription>{stat.label}</CardDescription>
            <CardTitle className="text-xl tabular-nums font-light">{stat.value}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-xs ${stat.up ? "text-green-600 dark:text-green-400" : "text-destructive"}`}>
              {stat.trend} from last month
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
