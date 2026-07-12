type PropsMap = Record<string, string | boolean>

export type BlockCodeGeneratorMap = {
  [slug: string]: (props: PropsMap) => string
}

function flag(name: string, props: PropsMap) {
  return props[name] ? `\n  ${name}` : ""
}

export function generateStatsOverviewCode(props: PropsMap): string {
  const cols = props.columns === "2" ? "grid-cols-2" : "grid-cols-2 sm:grid-cols-4"
  const items =
    props.columns === "2"
      ? `[
    { label: "Total Revenue", value: "$45,231", trend: "+20.1%", up: true },
    { label: "Active Users", value: "2,350", trend: "+15.3%", up: true },
  ]`
      : `[
    { label: "Total Revenue", value: "$45,231", trend: "+20.1%", up: true },
    { label: "Active Users", value: "2,350", trend: "+15.3%", up: true },
    { label: "New Signups", value: "+573", trend: "+8.2%", up: true },
    { label: "Churn Rate", value: "3.2%", trend: "-1.4%", up: false },
  ]`
  return `<div className="grid ${cols} gap-4">
  {${items}.map((stat) => (
    <Card key={stat.label} className="shadow-xl">
      <CardHeader>
        <CardDescription>{stat.label}</CardDescription>
        <CardTitle className="text-2xl tabular-nums">{stat.value}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className={\`text-xs \${stat.up ? "text-green-600 dark:text-green-400" : "text-destructive"}\`}>
          {stat.trend} from last month
        </p>
      </CardContent>
    </Card>
  ))}
</div>`
}

export function generateRecentActivityCode(props: PropsMap): string {
  const title = props.title || "Recent Activity"
  const description = props.description || "Your latest transactions"
  const viewAll = props.showViewAll !== false
    ? `\n    <CardAction>\n      <Button variant="ghost" size="sm">View all</Button>\n    </CardAction>`
    : ""
  return `<Card className="w-full max-w-md shadow-xl">
  <CardHeader>
    <CardTitle>${title}</CardTitle>
    <CardDescription>${description}</CardDescription>${viewAll}
  </CardHeader>
  <CardContent className="flex flex-col gap-0">
    {/* transaction rows */}
  </CardContent>
</Card>`
}

export function generateFormCardCode(props: PropsMap): string {
  const title = props.title || "Profile"
  const description = props.description || "Manage your account information."
  const footer =
    props.showFooter !== false
      ? `\n  <CardFooter className="justify-between">\n    <Button variant="outline">Cancel</Button>\n    <Button>Save changes</Button>\n  </CardFooter>`
      : ""
  return `<Card className="w-full max-w-md shadow-xl">
  <CardHeader>
    <CardTitle>${title}</CardTitle>
    <CardDescription>${description}</CardDescription>
  </CardHeader>
  <CardContent className="grid gap-4">
    <div className="grid gap-1.5">
      <Label htmlFor="name">Name</Label>
      <Input id="name" defaultValue="Sarah Chen" />
    </div>
  </CardContent>${footer}
</Card>`
}

export function generateEmptyStateCode(props: PropsMap): string {
  const title = props.title || "No team members"
  const description =
    props.description || "Invite your team to collaborate on this project."
  const buttonLabel = props.buttonLabel || "Invite Members"
  return `<Card className="flex w-full max-w-sm flex-col items-center justify-center py-14 text-center shadow-xl">
  <CardContent className="flex flex-col items-center gap-4 pt-0">
    <div className="flex size-12 items-center justify-center border">
      <Users className="size-5 text-muted-foreground" />
    </div>
    <div>
      <p className="font-medium">${title}</p>
      <p className="mt-1 text-sm text-muted-foreground">${description}</p>
    </div>
    <Button>${buttonLabel}</Button>
  </CardContent>
</Card>`
}

export function generateInviteTeamCode(props: PropsMap): string {
  const title = props.title || "Invite Team"
  const description = props.description || "Add members to your workspace"
  return `<Card className="w-full max-w-md shadow-xl">
  <CardHeader>
    <CardTitle>${title}</CardTitle>
    <CardDescription>${description}</CardDescription>
  </CardHeader>
  <CardContent className="flex flex-col gap-3">
    {/* email + role rows */}
  </CardContent>
  <CardFooter>
    <Button className="w-full">Send Invites</Button>
  </CardFooter>
</Card>`
}

export function generateFileUploadCode(props: PropsMap): string {
  const title = props.title || "File Upload"
  const description = props.description || "Drag and drop or browse"
  const hint = props.hint || "PNG, JPG, PDF up to 10MB"
  return `<Card className="w-full max-w-sm shadow-xl">
  <CardHeader>
    <CardTitle>${title}</CardTitle>
    <CardDescription>${description}</CardDescription>
  </CardHeader>
  <CardContent>
    <div className="flex flex-col items-center justify-center gap-3 border border-dashed py-12 text-center">
      <Upload className="size-4 text-muted-foreground" />
      <p className="text-sm font-medium">Upload files</p>
      <p className="text-xs text-muted-foreground">${hint}</p>
      <Button variant="outline" size="sm">Browse Files</Button>
    </div>
  </CardContent>
</Card>`
}

export function generateNotificationCardCode(props: PropsMap): string {
  const variant = String(props.variant || "subdued")
  const title = props.title || "Scheduled Maintenance"
  const dateBadge = props.dateBadge || "June 15"
  const description =
    props.description ||
    "Our platform will undergo maintenance on June 15, 2026 from 2–4 AM UTC."
  const showBadge = props.showBadge !== false
  const showDescription = props.showDescription !== false

  const cardClass =
    variant === "warning"
      ? "w-full max-w-md shadow-xl bg-yellow-50 ring-yellow-200/80 dark:bg-yellow-950/40 dark:ring-yellow-800/50"
      : variant === "alert"
        ? "w-full max-w-md shadow-xl bg-destructive/5 ring-destructive/20"
        : variant === "success"
          ? "w-full max-w-md shadow-xl bg-green-50 ring-green-200/80 dark:bg-green-950/40 dark:ring-green-800/50"
          : "w-full max-w-md shadow-xl"

  const icon =
    variant === "warning"
      ? "Warning"
      : variant === "alert"
        ? "XCircle"
        : variant === "success"
          ? "CheckCircle"
          : "Bell"

  const iconBoxClass =
    variant === "warning"
      ? "border-yellow-300/60 bg-yellow-100 text-yellow-800 dark:border-yellow-700/50 dark:bg-yellow-900/60 dark:text-yellow-300"
      : variant === "alert"
        ? "border-destructive/30 bg-destructive/10 text-destructive"
        : variant === "success"
          ? "border-green-300/60 bg-green-100 text-green-800 dark:border-green-700/50 dark:bg-green-900/60 dark:text-green-300"
          : "border-border bg-muted text-muted-foreground"

  const titleClass =
    variant === "warning"
      ? "text-sm font-medium text-yellow-950 dark:text-yellow-50"
      : variant === "alert"
        ? "text-sm font-medium text-destructive"
        : variant === "success"
          ? "text-sm font-medium text-green-950 dark:text-green-50"
          : "text-sm font-medium"

  const descriptionClass =
    variant === "warning"
      ? "text-sm text-yellow-900/80 dark:text-yellow-100/80"
      : variant === "alert"
        ? "text-sm text-destructive/90"
        : variant === "success"
          ? "text-sm text-green-900/80 dark:text-green-100/80"
          : "text-sm text-muted-foreground"

  const badgeClass =
    variant === "warning"
      ? "border border-yellow-300/60 bg-yellow-100 text-yellow-800 dark:border-yellow-700/50 dark:bg-yellow-900/60 dark:text-yellow-300"
      : variant === "alert"
        ? "border border-destructive/30 bg-destructive/10 text-destructive"
        : variant === "success"
          ? "border border-green-300/60 bg-green-100 text-green-800 dark:border-green-700/50 dark:bg-green-900/60 dark:text-green-300"
          : "border border-border bg-muted text-muted-foreground"

  const badgeMarkup = showBadge
    ? `\n        <Badge className="${badgeClass}">${dateBadge}</Badge>`
    : ""

  const titleRowClass = showDescription ? "flex items-center gap-2 mb-1" : "flex items-center gap-2"
  const descriptionMarkup = showDescription
    ? `\n      <p className="${descriptionClass}">${description}</p>`
    : ""

  const contentClass = showDescription
    ? "flex items-start gap-3"
    : "flex items-center gap-3"
  const bodyClass = showDescription
    ? "flex-1 min-w-0"
    : "flex min-h-8 flex-1 items-center min-w-0"
  const dismissClass = showDescription
    ? "shrink-0 self-start text-muted-foreground transition-colors hover:text-foreground"
    : "shrink-0 self-center text-muted-foreground transition-colors hover:text-foreground"

  const dismiss =
    props.showDismiss !== false
      ? `\n    <button type="button" aria-label="Dismiss" className="${dismissClass}">\n      <X className="size-3.5" weight="bold" />\n    </button>`
      : ""

  return `<Card className="${cardClass}">
  <CardContent className="${contentClass}">
    <div className="flex size-8 shrink-0 items-center justify-center border ${iconBoxClass}">
      <${icon} className="size-4" weight="bold" />
    </div>
    <div className="${bodyClass}">
      <div className="${titleRowClass}">
        <p className="${titleClass}">${title}</p>${badgeMarkup}
      </div>${descriptionMarkup}
    </div>${dismiss}
  </CardContent>
</Card>`
}

export function generateDataTableDemoCode(props: PropsMap): string {
  const searchable = props.searchable !== false
  const pagination = props.pagination !== false
  const selectable = props.selectable !== false
  const columnVisibility = props.columnVisibility !== false

  return `import { DataTable, createColumnHelper, type ColumnDef } from "@/components/ui/data-table"
import { Badge } from "@/components/ui/badge"

type Employee = { id: string; name: string; role: string; department: string; status: string; joined: string }

const col = createColumnHelper<Employee>()
const columns: ColumnDef<Employee>[] = [
  col.accessor("name", { header: "Name" }),
  col.accessor("status", {
    header: "Status",
    cell: (info) => <Badge>{info.getValue()}</Badge>,
  }),
]

<DataTable
  columns={columns}
  data={employees}${searchable ? '\n  searchable="name"' : ""}${searchable ? '\n  searchPlaceholder="Search by name…"' : ""}${flag("pagination", { pagination: pagination as boolean })}${pagination ? "\n  pageSize={8}" : ""}${flag("selectable", { selectable: selectable as boolean })}${flag("columnVisibility", { columnVisibility: columnVisibility as boolean })}
  title="Employee directory"
/>`
}

export const blockCodeGenerators: BlockCodeGeneratorMap = {
  "stats-overview": generateStatsOverviewCode,
  "recent-activity": generateRecentActivityCode,
  "form-card": generateFormCardCode,
  "empty-state": generateEmptyStateCode,
  "invite-team": generateInviteTeamCode,
  "file-upload": generateFileUploadCode,
  "notification-card": generateNotificationCardCode,
  "data-table-demo": generateDataTableDemoCode,
}

export function generateBlockCode(slug: string, props: PropsMap, fallback: string): string {
  const gen = blockCodeGenerators[slug]
  return gen ? gen(props) : fallback
}
