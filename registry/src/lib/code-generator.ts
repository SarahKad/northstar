type PropsMap = Record<string, string | boolean>

function escapeJsString(value: string): string {
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"')
}

function formatPropValue(value: string | boolean): string {
  if (typeof value === "boolean") return value ? "{true}" : "{false}"
  return `"${escapeJsString(value)}"`
}

function propsToString(props: PropsMap, skip: string[] = []): string {
  return Object.entries(props)
    .filter(([k, v]) => !skip.includes(k) && v !== "" && v !== false)
    .map(([k, v]) => {
      if (v === true) return k
      return `${k}=${formatPropValue(v)}`
    })
    .join(" ")
}

export function generateButtonCode(props: PropsMap): string {
  const { label, variant, size, disabled, icon } = props
  const iconLayout = String(icon ?? "none")
  const isIconOnly = iconLayout === "only" || size === "icon"
  const effectiveSize = isIconOnly ? "icon" : size
  const attrsObj: PropsMap = {}
  if (variant && variant !== "default") attrsObj.variant = variant
  if (effectiveSize && effectiveSize !== "default") attrsObj.size = effectiveSize
  if (disabled) attrsObj.disabled = disabled
  const attrs = propsToString(attrsObj)
  const buttonLabel = String(label || "Button")

  if (isIconOnly) {
    return `import { Button } from "@/components/ui/button"
import { Circle } from "@phosphor-icons/react"

<Button${attrs ? ` ${attrs}` : ""} aria-label="${buttonLabel}">
  <Circle />
</Button>`
  }

  if (iconLayout === "left") {
    return `import { Button } from "@/components/ui/button"
import { Circle } from "@phosphor-icons/react"

<Button${attrs ? ` ${attrs}` : ""}>
  <Circle data-icon="inline-start" />
  ${buttonLabel}
</Button>`
  }

  if (iconLayout === "right") {
    return `import { Button } from "@/components/ui/button"
import { Circle } from "@phosphor-icons/react"

<Button${attrs ? ` ${attrs}` : ""}>
  ${buttonLabel}
  <Circle data-icon="inline-end" />
</Button>`
  }

  return `import { Button } from "@/components/ui/button"

<Button${attrs ? ` ${attrs}` : ""}>${buttonLabel}</Button>`
}

export function generateBadgeCode(props: PropsMap): string {
  const { label, variant } = props
  const attrs = variant !== "default" ? ` variant="${variant}"` : ""
  return `<Badge${attrs}>${label}</Badge>`
}

export function generateCardCode(props: PropsMap): string {
  const { title, description, showFooter, footerCta, imagePosition } = props
  const pos = String(imagePosition || "none")
  const img = `\n  <img src="/card-placeholder.jpg" alt="Card image" className="w-full h-44 object-cover" />`
  const footer =
    showFooter
      ? `\n  <CardFooter>\n    <Button variant="outline">${footerCta}</Button>\n  </CardFooter>`
      : ""
  return `<Card className="w-[360px]">${pos === "top" ? img : ""}
  <CardHeader>
    <CardTitle>${title}</CardTitle>
    <CardDescription>${description}</CardDescription>
  </CardHeader>
  <CardContent>
    {/* card content */}
  </CardContent>${footer}${pos === "bottom" ? img : ""}
</Card>`
}

const inputIconMap: Record<string, string> = {
  text: "Type",
  email: "Mail",
  password: "Lock",
  number: "Hash",
  search: "Search",
  url: "Link",
}

const inputPlaceholderMap: Record<string, string> = {
  text: "Enter text…",
  email: "name@example.com",
  password: "Enter password…",
  number: "0",
  search: "Search…",
  url: "https://",
}

export function generateInputCode(props: PropsMap): string {
  const type = String(props.type || "text")
  const label = props.label || "Label"
  const showLabel = props.showLabel !== false
  const showHelperText = props.showHelperText === true
  const helperText =
    props.helperText || "We'll never share your email with anyone else."
  const placeholder = props.placeholder || inputPlaceholderMap[type] || "Enter text…"
  const disabled = props.disabled
  const icon = inputIconMap[type] || "Type"
  const isPassword = type === "password"

  const passwordToggle = isPassword
    ? `\n        <button type="button" onClick={() => setShow(v => !v)} className="absolute right-2.5 text-muted-foreground hover:text-foreground">\n          {show ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5" />}\n        </button>`
    : ""

  const labelBlock = showLabel ? `  <Label htmlFor="input">${label}</Label>\n` : ""
  const helperBlock = showHelperText
    ? `\n  <InputHelperText id="input-helper">${helperText}</InputHelperText>`
    : ""
  const describedBy = showHelperText ? '\n      aria-describedby="input-helper"' : ""
  const importBlock = showHelperText
    ? `import { InputHelperText } from "@/components/ui/input"\n\n`
    : ""

  return `${importBlock}<div className="grid w-full max-w-sm gap-1.5">
${labelBlock}  <div className="relative flex items-center">
    <span className="pointer-events-none absolute left-2.5 text-muted-foreground">
      <${icon} className="size-3.5" />
    </span>
    <Input
      id="input"
      type="${type}"
      placeholder="${placeholder}"${disabled ? "\n      disabled" : ""}${describedBy}
      className="${isPassword ? "pl-8 pr-8" : "pl-8"}"
    />${passwordToggle}
  </div>${helperBlock}
</div>`
}

export function generateTabsCode(props: PropsMap): string {
  const { tab1Label, tab2Label, tab3Label } = props
  return `<Tabs defaultValue="tab1" className="w-[400px]">
  <TabsList>
    <TabsTrigger value="tab1">${tab1Label}</TabsTrigger>
    <TabsTrigger value="tab2">${tab2Label}</TabsTrigger>
    <TabsTrigger value="tab3">${tab3Label}</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">${tab1Label} content</TabsContent>
  <TabsContent value="tab2">${tab2Label} content</TabsContent>
  <TabsContent value="tab3">${tab3Label} content</TabsContent>
</Tabs>`
}

export function generateSelectCode(props: PropsMap): string {
  const { label, placeholder, disabled } = props
  const showLabel = props.showLabel !== false
  const option1 = props.option1Label || "Option 1"
  const option2 = props.option2Label || "Option 2"
  const option3 = props.option3Label || "Option 3"
  const disabledAttr = disabled ? "\n      disabled" : ""
  const labelBlock = showLabel ? `  <Label htmlFor="select">${label}</Label>\n` : ""
  return `<div className="grid w-full max-w-sm gap-1.5">
${labelBlock}  <Select${disabledAttr}>
    <SelectTrigger id="select">
      <SelectValue placeholder="${placeholder}" />
    </SelectTrigger>
    <SelectContent>
      <SelectItem value="option1">${option1}</SelectItem>
      <SelectItem value="option2">${option2}</SelectItem>
      <SelectItem value="option3">${option3}</SelectItem>
    </SelectContent>
  </Select>
</div>`
}

export function generateSkeletonCode(props: PropsMap): string {
  const { variant } = props
  if (variant === "avatar") {
    return `<div className="flex items-center gap-3">
  <Skeleton className="h-10 w-10 rounded-full" />
  <div className="space-y-2">
    <Skeleton className="h-4 w-[200px]" />
    <Skeleton className="h-4 w-[150px]" />
  </div>
</div>`
  }
  if (variant === "card") {
    return `<div className="flex flex-col gap-3">
  <Skeleton className="h-[180px] w-[300px] rounded-xl" />
  <div className="space-y-2">
    <Skeleton className="h-4 w-[200px]" />
    <Skeleton className="h-4 w-[160px]" />
  </div>
</div>`
  }
  return `<div className="space-y-2">
  <Skeleton className="h-4 w-[280px]" />
  <Skeleton className="h-4 w-[240px]" />
  <Skeleton className="h-4 w-[200px]" />
</div>`
}

export type CodeGeneratorMap = {
  [slug: string]: (props: PropsMap) => string
}

export function generateChartAreaInteractiveCode(props: PropsMap): string {
  const title = escapeJsString(String(props.title || "Area Chart - Interactive"))
  const dateRange = escapeJsString(String(props.dateRange || "Showing total visitors for the last 3 months"))
  const metric1Label = escapeJsString(String(props.metric1Label || "Desktop"))
  const metric2Label = escapeJsString(String(props.metric2Label || "Mobile"))
  const timeRange = escapeJsString(String(props.timeRange || "7d"))
  return `import { ChartAreaInteractive } from "@/components/ui/chart-area-interactive"

<ChartAreaInteractive
  title="${title}"
  dateRange="${dateRange}"
  metric1Label="${metric1Label}"
  metric2Label="${metric2Label}"
  defaultTimeRange="${timeRange}"
/>`
}

export function generateChartBarDefaultCode(props: PropsMap): string {
  const title = escapeJsString(String(props.title || "Bar Chart"))
  const dateRange = escapeJsString(String(props.dateRange || "January - June 2024"))
  const metric1Label = escapeJsString(String(props.metric1Label || "Desktop"))
  return `const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
]

const chartConfig = {
  desktop: { label: "${metric1Label}", color: "var(--chart-1)" },
} satisfies ChartConfig

<Card>
  <CardHeader>
    <CardTitle>${title}</CardTitle>
    <CardDescription>${dateRange}</CardDescription>
  </CardHeader>
  <CardContent>
    <ChartContainer config={chartConfig}>
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={2} />
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
</Card>`
}

export function generateChartBarStackedCode(props: PropsMap): string {
  const title = escapeJsString(String(props.title || "Bar Chart - Stacked + Legend"))
  const dateRange = escapeJsString(String(props.dateRange || "January - June 2024"))
  const metric1Label = escapeJsString(String(props.metric1Label || "Desktop"))
  const metric2Label = escapeJsString(String(props.metric2Label || "Mobile"))
  return `const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: { label: "${metric1Label}", color: "var(--chart-1)" },
  mobile:  { label: "${metric2Label}", color: "var(--chart-2)" },
} satisfies ChartConfig

<Card>
  <CardHeader>
    <CardTitle>${title}</CardTitle>
    <CardDescription>${dateRange}</CardDescription>
  </CardHeader>
  <CardContent>
    <ChartContainer config={chartConfig}>
      <BarChart accessibilityLayer data={chartData}>
        <defs>
          <pattern id="hatchMobile" patternUnits="userSpaceOnUse" width="6" height="6" patternTransform="rotate(45)">
            <rect width="6" height="6" fill="var(--color-mobile)" fillOpacity={0.15} />
            <line x1="0" y1="0" x2="0" y2="6" stroke="var(--color-mobile)" strokeWidth="2.5" />
          </pattern>
        </defs>
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
        <Bar dataKey="desktop" stackId="a" fill="var(--color-desktop)" radius={[0, 0, 2, 2]} />
        <Bar dataKey="mobile"  stackId="a" fill="url(#hatchMobile)"    radius={[2, 2, 0, 0]} />
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
</Card>`
}

export function generateChartPieDonutCode(props: PropsMap): string {
  const title = escapeJsString(String(props.title || "Donut Chart"))
  const dateRange = escapeJsString(String(props.dateRange || "January – June 2024"))
  const segment1Label = escapeJsString(String(props.segment1Label || "Chrome"))
  const segment2Label = escapeJsString(String(props.segment2Label || "Safari"))
  const segment3Label = escapeJsString(String(props.segment3Label || "Firefox"))
  const segment4Label = escapeJsString(String(props.segment4Label || "Edge"))
  const segment5Label = escapeJsString(String(props.segment5Label || "Other"))
  const centerLabel = escapeJsString(String(props.centerLabel || "Visitors"))
  return `const chartData = [
  { browser: "chrome",  visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari",  visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
  { browser: "edge",    visitors: 173, fill: "var(--color-edge)" },
  { browser: "other",   visitors: 190, fill: "var(--color-other)" },
]

const chartConfig = {
  visitors: { label: "Visitors" },
  chrome:   { label: "${segment1Label}", color: "var(--chart-1)" },
  safari:   { label: "${segment2Label}", color: "var(--chart-2)" },
  firefox:  { label: "${segment3Label}", color: "var(--chart-3)" },
  edge:     { label: "${segment4Label}", color: "var(--chart-4)" },
  other:    { label: "${segment5Label}", color: "var(--chart-5)" },
} satisfies ChartConfig

const totalVisitors = chartData.reduce((acc, curr) => acc + curr.visitors, 0)

<Card className="flex flex-col">
  <CardHeader className="items-center pb-0">
    <CardTitle>${title}</CardTitle>
    <CardDescription>${dateRange}</CardDescription>
  </CardHeader>
  <CardContent className="flex-1 pb-0">
    <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
      <PieChart>
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
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
                  <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                    <tspan x={viewBox.cx} y={viewBox.cy} className="fill-foreground text-3xl font-bold">
                      {totalVisitors.toLocaleString()}
                    </tspan>
                    <tspan x={viewBox.cx} y={(viewBox.cy ?? 0) + 24} className="fill-muted-foreground">
                      ${centerLabel}
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
</Card>`
}

export function generateChartLineDotsCode(props: PropsMap): string {
  const title = escapeJsString(String(props.title || "Line Chart - Dots"))
  const dateRange = escapeJsString(String(props.dateRange || "January - June 2024"))
  const metric1Label = escapeJsString(String(props.metric1Label || "Desktop"))
  const metric2Label = escapeJsString(String(props.metric2Label || "Mobile"))
  return `const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
  desktop: { label: "${metric1Label}", color: "var(--chart-1)" },
  mobile:  { label: "${metric2Label}", color: "var(--chart-2)" },
} satisfies ChartConfig

<Card>
  <CardHeader>
    <CardTitle>${title}</CardTitle>
    <CardDescription>${dateRange}</CardDescription>
  </CardHeader>
  <CardContent>
    <ChartContainer config={chartConfig}>
      <LineChart accessibilityLayer data={chartData} margin={{ left: 12, right: 12 }}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Line
          dataKey="desktop"
          type="natural"
          stroke="var(--color-desktop)"
          strokeWidth={2}
          dot={{ fill: "var(--color-desktop)" }}
          activeDot={{ r: 6 }}
        />
        <Line
          dataKey="mobile"
          type="natural"
          stroke="var(--color-mobile)"
          strokeWidth={2}
          strokeDasharray="4 4"
          dot={{ fill: "var(--color-mobile)" }}
          activeDot={{ r: 6 }}
        />
        <ChartLegend content={<ChartLegendContent />} />
      </LineChart>
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
</Card>`
}

export function generateTableCode(props: PropsMap): string {
  const showTitle = props.showTitle !== false
  const title = props.title || "Recent invoices"
  const showFooter = Boolean(props.showFooter)

  const titleBlock = showTitle
    ? `<div className="space-y-2">\n  <TableTitle>${title}</TableTitle>\n  <Table>\n    <TableCaption>${title}</TableCaption>`
    : "<Table>"
  const tableClose = showTitle ? `\n  </Table>\n</div>` : "</Table>"

  const footer = showFooter
    ? `\n  <TableFooter>
    <TableRow>
      <TableCell colSpan={3}>Total</TableCell>
      <TableCell className="text-right">$750.00</TableCell>
    </TableRow>
  </TableFooter>`
    : ""

  const importLine = showTitle
    ? `import { Table, TableBody, TableCaption, TableCell, TableFooter, TableHead, TableHeader, TableRow, TableTitle } from "@/components/ui/table"\n\n`
    : ""

  return `${importLine}${titleBlock}
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]">Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Method</TableHead>
      <TableHead className="text-right">Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell className="font-medium">INV001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>Credit Card</TableCell>
      <TableCell className="text-right">$250.00</TableCell>
    </TableRow>
    <TableRow>
      <TableCell className="font-medium">INV002</TableCell>
      <TableCell>Pending</TableCell>
      <TableCell>Bank Transfer</TableCell>
      <TableCell className="text-right">$150.00</TableCell>
    </TableRow>
    <TableRow>
      <TableCell className="font-medium">INV003</TableCell>
      <TableCell>Unpaid</TableCell>
      <TableCell>PayPal</TableCell>
      <TableCell className="text-right">$350.00</TableCell>
    </TableRow>
  </TableBody>${footer}
${tableClose}`
}

export function generateDataTableCode(props: PropsMap): string {
  const searchable = Boolean(props.searchable)
  const pagination = Boolean(props.pagination)
  const selectable = Boolean(props.selectable)
  const columnVisibility = Boolean(props.columnVisibility)

  const dataTableProps = [
    "  columns={columns}",
    "  data={employees}",
    searchable && '  searchable="name"',
    searchable && '  searchPlaceholder="Search by name…"',
    pagination && "  pagination",
    pagination && "  pageSize={8}",
    selectable && "  selectable",
    columnVisibility && "  columnVisibility",
    '  title="Employee directory"',
  ]
    .filter(Boolean)
    .join("\n")

  return `import { DataTable, createColumnHelper, type ColumnDef } from "@/components/ui/data-table"
import { Badge } from "@/components/ui/badge"

type Employee = {
  id: string
  name: string
  role: string
  department: string
  status: "Active" | "On Leave" | "Inactive"
  joined: string
}

const col = createColumnHelper<Employee>()

const columns: ColumnDef<Employee>[] = [
  col.accessor("name", {
    header: "Name",
    cell: (info) => <span className="font-medium">{info.getValue()}</span>,
  }),
  col.accessor("role", { header: "Role" }),
  col.accessor("department", { header: "Department" }),
  col.accessor("status", {
    header: "Status",
    cell: (info) => (
      <Badge variant={info.getValue() === "Active" ? "default" : "secondary"}>
        {info.getValue()}
      </Badge>
    ),
  }),
]

const employees: Employee[] = [
  { id: "E001", name: "Jordan Alvarez", role: "Senior Engineer", department: "Product", status: "Active", joined: "2021-03-15" },
  { id: "E002", name: "Morgan Lee", role: "Product Manager", department: "Product", status: "Active", joined: "2020-07-01" },
  { id: "E003", name: "Taylor Kim", role: "Designer", department: "Design", status: "On Leave", joined: "2022-01-10" },
]

<DataTable
${dataTableProps}
/>`
}


export function generateCheckboxCode(props: PropsMap): string {
  const label = props.label || "Accept terms and conditions"
  const description = props.description || "You agree to our Terms of Service and Privacy Policy."
  const checked = props.checked ? " checked" : ""
  const disabled = props.disabled ? "\n  disabled" : ""
  const variant = String(props.variant || "default")

  if (variant === "with-description") {
    return `<CheckboxWithDescription
  label="${label}"
  description="${description}"${props.checked ? "\n  checked" : ""}${props.disabled ? "\n  disabled" : ""}
/>`
  }
  if (variant === "card") {
    return `<CheckboxCard
  label="${label}"
  description="${description}"${props.checked ? "\n  checked" : ""}${props.disabled ? "\n  disabled" : ""}
/>`
  }
  return `<label className="flex cursor-pointer items-center gap-2.5 select-none">
  <Checkbox${checked}${disabled} />
  <span className="text-sm">${label}</span>
</label>`
}

export function generateAccordionCode(props: PropsMap): string {
  const type = props.type || "single"
  const collapsible = props.collapsible !== false ? " collapsible" : ""
  return `<Accordion type="${type}"${collapsible}>
  <AccordionItem value="item-1">
    <AccordionTrigger>Is it accessible?</AccordionTrigger>
    <AccordionContent>
      Yes. It adheres to the WAI-ARIA design pattern.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-2">
    <AccordionTrigger>Is it styled?</AccordionTrigger>
    <AccordionContent>
      Yes. It comes with default styles that match the design system.
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="item-3">
    <AccordionTrigger>Is it animated?</AccordionTrigger>
    <AccordionContent>
      Yes. It uses a CSS grid-rows transition for smooth height animation.
    </AccordionContent>
  </AccordionItem>
</Accordion>`
}

export function generateAvatarCode(props: PropsMap): string {
  const size = props.size && props.size !== "default" ? ` size="${props.size}"` : ""
  return `<Avatar${size}>
  <AvatarImage src="/user.jpg" alt="User avatar" />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>`
}

export function generateBreadcrumbCode(_props: PropsMap): string {
  return `<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/">Home</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/components">Components</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Button</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>`
}

export function generateCarouselCode(props: PropsMap): string {
  const loop = props.loop ? " loop" : ""
  const autoPlay = props.autoPlay ? " autoPlay" : ""
  return `<Carousel${loop}${autoPlay} className="w-full max-w-sm">
  <CarouselContent>
    <CarouselItem>
      <div className="bg-muted rounded-lg h-40 flex items-center justify-center">
        Slide 1
      </div>
    </CarouselItem>
    <CarouselItem>
      <div className="bg-muted rounded-lg h-40 flex items-center justify-center">
        Slide 2
      </div>
    </CarouselItem>
    <CarouselItem>
      <div className="bg-muted rounded-lg h-40 flex items-center justify-center">
        Slide 3
      </div>
    </CarouselItem>
  </CarouselContent>
  <CarouselPrev />
  <CarouselNext />
</Carousel>`
}

export function generateStepperCode(props: PropsMap): string {
  const currentStep = parseInt(String(props.currentStep || "1"), 10)
  return `const steps = [
  { label: "Account", description: "Your details" },
  { label: "Profile", description: "Set up your profile" },
  { label: "Review", description: "Confirm & submit" },
]

<Stepper currentStep={${currentStep}} steps={steps} />`
}

export function generateCalendarCode(props: PropsMap): string {
  const mode = props.mode || "single"

  if (mode === "range") {
    return `const [rangeStart, setRangeStart] = React.useState<Date | undefined>()
const [rangeEnd, setRangeEnd] = React.useState<Date | undefined>()

<Calendar
  mode="range"
  selected={rangeStart}
  selectedEnd={rangeEnd}
  onSelectRange={(start, end) => {
    setRangeStart(start)
    setRangeEnd(
      start.getFullYear() === end.getFullYear() &&
      start.getMonth() === end.getMonth() &&
      start.getDate() === end.getDate()
        ? undefined
        : end
    )
  }}
/>`
  }

  return `const [selected, setSelected] = React.useState<Date | undefined>()

<Calendar
  mode="single"
  selected={selected}
  onSelect={setSelected}
/>`
}

export function generateCommandCode(_props: PropsMap): string {
  return `<Command className="rounded-lg border shadow-md">
  <CommandInput placeholder="Type a command or search…" />
  <CommandList>
    <CommandEmpty>No results found.</CommandEmpty>
    <CommandGroup heading="Suggestions">
      <CommandItem filterValue="calendar">Calendar</CommandItem>
      <CommandItem filterValue="search emoji">Search Emoji</CommandItem>
      <CommandItem filterValue="calculator">Calculator</CommandItem>
    </CommandGroup>
    <CommandSeparator />
    <CommandGroup heading="Settings">
      <CommandItem filterValue="profile">Profile</CommandItem>
      <CommandItem filterValue="billing">Billing</CommandItem>
    </CommandGroup>
  </CommandList>
</Command>`
}

export function generateDialogCode(_props: PropsMap): string {
  return `<Dialog>
  <DialogTrigger render={<Button variant="outline">Edit Profile</Button>} />
  <DialogPortal>
    <DialogOverlay />
    <DialogContent>
      <DialogClose />
      <DialogHeader>
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you are done.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-3 py-4">
        <div className="grid gap-1.5">
          <Label htmlFor="name">Name</Label>
          <Input id="name" defaultValue="Jane Doe" />
        </div>
      </div>
      <DialogFooter>
        <DialogClose render={<Button variant="outline">Cancel</Button>} />
        <Button>Save changes</Button>
      </DialogFooter>
    </DialogContent>
  </DialogPortal>
</Dialog>`
}

export function generateDrawerCode(props: PropsMap): string {
  const side = props.side && props.side !== "right" ? ` side="${props.side}"` : ""
  return `<Drawer${side}>
  <DrawerTrigger render={<Button variant="outline">Open Drawer</Button>} />
  <DrawerPortal>
    <DrawerOverlay />
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>Panel Settings</DrawerTitle>
        <DrawerClose />
      </DrawerHeader>
      <div className="flex-1 overflow-auto p-4">
        <p className="text-sm text-muted-foreground">Drawer content goes here.</p>
      </div>
      <DrawerFooter>
        <DrawerClose render={<Button variant="outline" size="sm">Close</Button>} />
        <Button size="sm">Save</Button>
      </DrawerFooter>
    </DrawerContent>
  </DrawerPortal>
</Drawer>`
}

export function generateMenuBarCode(_props: PropsMap): string {
  return `<MenuBar>
  <MenuBarMenu>
    <MenuBarTrigger>File</MenuBarTrigger>
    <MenuBarContent>
      <MenuBarItem>New File <MenuBarShortcut>⌘N</MenuBarShortcut></MenuBarItem>
      <MenuBarItem>Open… <MenuBarShortcut>⌘O</MenuBarShortcut></MenuBarItem>
      <MenuBarSeparator />
      <MenuBarItem>Save <MenuBarShortcut>⌘S</MenuBarShortcut></MenuBarItem>
    </MenuBarContent>
  </MenuBarMenu>
  <MenuBarMenu>
    <MenuBarTrigger>Edit</MenuBarTrigger>
    <MenuBarContent>
      <MenuBarItem>Undo <MenuBarShortcut>⌘Z</MenuBarShortcut></MenuBarItem>
      <MenuBarItem>Redo <MenuBarShortcut>⌘⇧Z</MenuBarShortcut></MenuBarItem>
    </MenuBarContent>
  </MenuBarMenu>
  <MenuBarMenu>
    <MenuBarTrigger>View</MenuBarTrigger>
    <MenuBarContent>
      <MenuBarItem>Zoom In</MenuBarItem>
      <MenuBarItem>Zoom Out</MenuBarItem>
    </MenuBarContent>
  </MenuBarMenu>
</MenuBar>`
}

export function generateTopNavCode(_props: PropsMap): string {
  return `<TopNav>
  <TopNavBrand>
    <span className="size-5 rounded-sm bg-primary" />
    AG Design
  </TopNavBrand>
  <TopNavBreadcrumb
    items={[
      { label: "Components", href: "/components" },
      { label: "Button" },
    ]}
  />
  <TopNavActions />
</TopNav>`
}

export function generateResizableCode(_props: PropsMap): string {
  return `<ResizablePanelGroup direction="horizontal" className="rounded-lg border h-40">
  <ResizablePanel defaultSize={30} minSize={15} className="p-4">
    <p className="text-sm font-medium">Sidebar</p>
  </ResizablePanel>
  <ResizableHandle />
  <ResizablePanel defaultSize={70} minSize={30} className="p-4">
    <p className="text-sm font-medium">Content</p>
  </ResizablePanel>
</ResizablePanelGroup>`
}

const alertIconMap: Record<string, string> = {
  default: "Info",
  info: "Info",
  success: "CheckCircle",
  warning: "Warning",
  destructive: "XCircle",
}

export function generateAlertCode(props: PropsMap): string {
  const variantKey = String(props.variant || "default")
  const variant = props.variant && props.variant !== "default" ? ` variant="${props.variant}"` : ""
  const icon = alertIconMap[variantKey] || "Info"
  const title = props.title || "Heads up!"
  const description = props.description || "You can add components to your app using the CLI."
  const dismissible = props.dismissible !== false
  const dismiss = dismissible
    ? "\n  <AlertDismiss onClick={() => setOpen(false)} />"
    : ""
  const stateWrapper = dismissible
    ? `{open && (
  <Alert${variant}>
  <AlertIcon>
    <${icon} weight="bold" aria-hidden />
  </AlertIcon>
  <AlertContent>
    <AlertTitle>${title}</AlertTitle>
    <AlertDescription>${description}</AlertDescription>
  </AlertContent>${dismiss}
</Alert>
)}`
    : `<Alert${variant}>
  <AlertIcon>
    <${icon} weight="bold" aria-hidden />
  </AlertIcon>
  <AlertContent>
    <AlertTitle>${title}</AlertTitle>
    <AlertDescription>${description}</AlertDescription>
  </AlertContent>
</Alert>`
  if (!dismissible) return stateWrapper
  return `const [open, setOpen] = useState(true)

${stateWrapper}`
}

export function generatePaginationCode(props: PropsMap): string {
  const total = parseInt(String(props.totalPages || "5"), 10)
  const current = parseInt(String(props.currentPage || "3"), 10)
  return `<Pagination>
  <PaginationPrev disabled={currentPage === 1} />
  {pages.map((page) => (
    <PaginationItem
      key={page}
      aria-current={page === ${current} ? "page" : undefined}
    >
      {page}
    </PaginationItem>
  ))}
  <PaginationNext disabled={currentPage === ${total}} />
</Pagination>`
}

export function generateButtonGroupCode(props: PropsMap): string {
  const variant = props.variant || "outline"
  const labels = ["Day", "Week", "Month"] as const
  const activeLabel = String(props.activeIndex || "Day")
  const active = labels.indexOf(activeLabel as (typeof labels)[number])
  const activeIdx = active >= 0 ? active : parseInt(String(props.activeIndex || "0"), 10)

  return `"use client"

import { useState } from "react"
import { ButtonGroup, ButtonGroupItem } from "@/components/ui/button-group"

export function ViewSwitcher() {
  const [active, setActive] = useState(${activeIdx})

  return (
    <ButtonGroup variant="${variant}">
      <ButtonGroupItem variant="${variant}" active={active === 0} onClick={() => setActive(0)}>Day</ButtonGroupItem>
      <ButtonGroupItem variant="${variant}" active={active === 1} onClick={() => setActive(1)}>Week</ButtonGroupItem>
      <ButtonGroupItem variant="${variant}" active={active === 2} onClick={() => setActive(2)}>Month</ButtonGroupItem>
    </ButtonGroup>
  )
}`
}


export function generateRadioGroupCode(props: PropsMap): string {
  const disabled = props.disabled ? "\n  disabled" : ""
  const option1 = String(props.option1Label || "Option one")
  const option2 = String(props.option2Label || "Option two")
  const option3 = String(props.option3Label || "Option three")
  return `<RadioGroup defaultValue="option1"${disabled}>
  <RadioGroupItem value="option1" label="${option1}" />
  <RadioGroupItem value="option2" label="${option2}" />
  <RadioGroupItem value="option3" label="${option3}" />
</RadioGroup>`
}

export function generateSideNavCode(_props: PropsMap): string {
  return `const sections = [
  {
    id: "guides",
    label: "Guides",
    items: [
      { label: "Getting Started", href: "/docs/getting-started" },
    ],
  },
  {
    id: "components",
    label: "Components",
    items: [
      { label: "Button",  href: "/components/button",  active: true },
      { label: "Card",    href: "/components/card" },
    ],
  },
]

<SideNav sections={sections} />`
}

export function generateSidebarCode(_props: PropsMap): string {
  return `<SidebarProvider>
  <Sidebar>
    <SidebarHeader />
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Guides</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive tooltip="Getting Started" render={<Link href="/docs/getting-started" />}>
                Getting Started
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
    </SidebarContent>
    <SidebarFooter />
    <SidebarRail />
  </Sidebar>
  <SidebarInset>{children}</SidebarInset>
</SidebarProvider>`
}

export const codeGenerators: CodeGeneratorMap = {
  button: generateButtonCode,
  badge: generateBadgeCode,
  card: generateCardCode,
  input: generateInputCode,
  tabs: generateTabsCode,
  select: generateSelectCode,
  skeleton: generateSkeletonCode,
  "chart-area-interactive": generateChartAreaInteractiveCode,
  "table": generateTableCode,
  "data-table": generateDataTableCode,
  "chart-bar-default": generateChartBarDefaultCode,
  "chart-bar-stacked": generateChartBarStackedCode,
  "chart-pie-donut": generateChartPieDonutCode,
  "chart-line-dots": generateChartLineDotsCode,
  "checkbox": generateCheckboxCode,
  "alert": generateAlertCode,
  "pagination": generatePaginationCode,
  "button-group": generateButtonGroupCode,
  "radio-group": generateRadioGroupCode,
  "side-nav": generateSideNavCode,
  "sidebar": generateSidebarCode,
  "accordion": generateAccordionCode,
  "avatar": generateAvatarCode,
  "breadcrumb": generateBreadcrumbCode,
  "carousel": generateCarouselCode,
  "stepper": generateStepperCode,
  "calendar": generateCalendarCode,
  "command": generateCommandCode,
  "dialog": generateDialogCode,
  "drawer": generateDrawerCode,
  "menu-bar": generateMenuBarCode,
  "top-nav": generateTopNavCode,
  "resizable": generateResizableCode,
}
