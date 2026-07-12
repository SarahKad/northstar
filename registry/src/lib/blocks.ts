import type { PropSchema } from "@/lib/registry"

export type BlockMeta = {
  slug: string
  name: string
  description: string
  components: string[]
  props: PropSchema[]
  code: string
}

/** Map block "Uses" display names to component doc slugs. */
export function componentDocSlug(name: string): string {
  return name
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
    .toLowerCase()
}

export const blocks: BlockMeta[] = [
  {
    slug: "stats-overview",
    name: "Stats Overview",
    description: "Four key metric cards arranged in a responsive grid. Use for dashboards and summary views.",
    components: ["Card", "Badge"],
    props: [
      {
        name: "columns",
        label: "Columns",
        type: "select",
        options: ["2", "4"],
        defaultValue: "4",
        description: "Number of stat cards shown",
      },
    ],
    code: `<div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
  {[
    { label: "Total Revenue", value: "$45,231", trend: "+20.1%", up: true },
    { label: "Active Users", value: "2,350", trend: "+15.3%", up: true },
    { label: "New Signups", value: "+573", trend: "+8.2%", up: true },
    { label: "Churn Rate", value: "3.2%", trend: "-1.4%", up: false },
  ].map((stat) => (
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
</div>`,
  },
  {
    slug: "recent-activity",
    name: "Recent Activity",
    description: "Scrollable transaction or event list with category, timestamp, and amount. Pairs with a stats overview.",
    components: ["Card", "Badge", "Button", "Separator"],
    props: [
      { name: "title", label: "Title", type: "text", defaultValue: "Recent Activity" },
      {
        name: "description",
        label: "Description",
        type: "text",
        defaultValue: "Your latest transactions",
      },
      { name: "showViewAll", label: "Show view all", type: "boolean", defaultValue: true },
    ],
    code: `<Card className="w-full max-w-md shadow-xl">
  <CardHeader>
    <CardTitle>Recent Activity</CardTitle>
    <CardDescription>Your latest transactions</CardDescription>
    <CardAction>
      <Button variant="ghost" size="sm">View all</Button>
    </CardAction>
  </CardHeader>
  <CardContent className="flex flex-col gap-0">
    {[
      { name: "Blue Bottle Coffee", cat: "Food & Drink", date: "Today, 10:24 AM", amount: "-$6.50", positive: false },
      { name: "Whole Foods Market", cat: "Groceries", date: "Yesterday", amount: "-$142.30", positive: false },
      { name: "Stripe Payout", cat: "Income", date: "Oct 12", amount: "+$4,200.00", positive: true },
      { name: "Uber Technologies", cat: "Transport", date: "Oct 11", amount: "-$24.10", positive: false },
      { name: "Netflix", cat: "Entertainment", date: "Oct 10", amount: "-$19.99", positive: false },
    ].map((tx, i, arr) => (
      <div key={tx.name}>
        <div className="flex items-center justify-between py-3">
          <div>
            <p className="text-sm font-medium">{tx.name}</p>
            <p className="text-xs text-muted-foreground">{tx.cat} · {tx.date}</p>
          </div>
          <span className={\`text-sm font-medium tabular-nums \${tx.positive ? "text-green-600 dark:text-green-400" : ""}\`}>
            {tx.amount}
          </span>
        </div>
        {i < arr.length - 1 && <Separator />}
      </div>
    ))}
  </CardContent>
</Card>`,
  },
  {
    slug: "form-card",
    name: "Form Card",
    description: "Profile or settings form inside a card with label–input pairs and a save action.",
    components: ["Card", "Input", "Label", "Button"],
    props: [
      { name: "title", label: "Title", type: "text", defaultValue: "Profile" },
      {
        name: "description",
        label: "Description",
        type: "text",
        defaultValue: "Manage your account information.",
      },
      { name: "showFooter", label: "Show footer", type: "boolean", defaultValue: true },
    ],
    code: `<Card className="w-full max-w-md shadow-xl">
      <CardHeader>
        <CardTitle>Profile</CardTitle>
    <CardDescription>Manage your account information.</CardDescription>
  </CardHeader>
  <CardContent className="grid gap-4">
    <div className="grid gap-1.5">
      <Label htmlFor="name">Name</Label>
      <Input id="name" defaultValue="Sarah Chen" />
    </div>
    <div className="grid gap-1.5">
      <Label htmlFor="email">Email</Label>
      <Input id="email" type="email" defaultValue="sarah@example.com" />
    </div>
    <div className="grid gap-1.5">
      <Label htmlFor="role">Role</Label>
      <Input id="role" defaultValue="Product Designer" />
    </div>
  </CardContent>
  <CardFooter className="justify-between">
    <Button variant="outline">Cancel</Button>
    <Button>Save changes</Button>
  </CardFooter>
</Card>`,
  },
  {
    slug: "empty-state",
    name: "Empty State",
    description: "Zero-data state with icon, message, and a call to action. Use when a list or section has no content yet.",
    components: ["Card", "Button"],
    props: [
      { name: "title", label: "Title", type: "text", defaultValue: "No team members" },
      {
        name: "description",
        label: "Description",
        type: "text",
        defaultValue: "Invite your team to collaborate on this project.",
      },
      { name: "buttonLabel", label: "Button label", type: "text", defaultValue: "Invite Members" },
    ],
    code: `<Card className="flex w-full max-w-sm flex-col items-center justify-center py-14 text-center shadow-xl">
  <CardContent className="flex flex-col items-center gap-4 pt-0">
    <div className="flex size-12 items-center justify-center border">
      <Users className="size-5 text-muted-foreground" />
    </div>
    <div>
      <p className="font-medium">No team members</p>
      <p className="mt-1 text-sm text-muted-foreground">
        Invite your team to collaborate on this project.
      </p>
    </div>
    <Button>Invite Members</Button>
  </CardContent>
</Card>`,
  },
  {
    slug: "invite-team",
    name: "Invite Team",
    description: "Multi-row email + role form for inviting collaborators. Includes an add row action and a bulk send CTA.",
    components: ["Card", "Input", "Select", "Button", "Label"],
    props: [
      { name: "title", label: "Title", type: "text", defaultValue: "Invite Team" },
      {
        name: "description",
        label: "Description",
        type: "text",
        defaultValue: "Add members to your workspace",
      },
    ],
    code: `<Card className="w-full max-w-md shadow-xl">
      <CardHeader>
        <CardTitle>Invite Team</CardTitle>
    <CardDescription>Add members to your workspace</CardDescription>
  </CardHeader>
  <CardContent className="flex flex-col gap-3">
    {["alex@example.com", "sam@example.com"].map((email, i) => (
      <div key={email} className="flex items-center gap-2">
        <Input defaultValue={email} className="flex-1" />
        <Select defaultValue={i === 0 ? "editor" : "viewer"}>
          <SelectTrigger className="w-28">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="editor">Editor</SelectItem>
            <SelectItem value="viewer">Viewer</SelectItem>
          </SelectContent>
        </Select>
      </div>
    ))}
    <Button variant="outline" size="sm" className="self-start gap-1.5">
      + Add another
    </Button>
  </CardContent>
  <CardFooter>
    <Button className="w-full">Send Invites</Button>
  </CardFooter>
</Card>`,
  },
  {
    slug: "file-upload",
    name: "File Upload",
    description: "Drag-and-drop upload zone with file type and size constraints. Use for attachments and media uploads.",
    components: ["Card", "Button"],
    props: [
      { name: "title", label: "Title", type: "text", defaultValue: "File Upload" },
      {
        name: "description",
        label: "Description",
        type: "text",
        defaultValue: "Drag and drop or browse",
      },
      {
        name: "hint",
        label: "File hint",
        type: "text",
        defaultValue: "PNG, JPG, PDF up to 10MB",
      },
    ],
    code: `<Card className="w-full max-w-sm shadow-xl">
      <CardHeader>
        <CardTitle>File Upload</CardTitle>
    <CardDescription>Drag and drop or browse</CardDescription>
  </CardHeader>
  <CardContent>
    <div className="flex flex-col items-center justify-center gap-3 border border-dashed py-12 text-center">
      <div className="flex size-10 items-center justify-center border">
        <Upload className="size-4 text-muted-foreground" />
      </div>
      <div>
        <p className="text-sm font-medium">Upload files</p>
        <p className="mt-0.5 text-xs text-muted-foreground">PNG, JPG, PDF up to 10MB</p>
      </div>
      <Button variant="outline" size="sm">Browse Files</Button>
    </div>
  </CardContent>
</Card>`,
  },
  {
    slug: "notification-card",
    name: "Notification Card",
    description:
      "Dismissible banner for announcements, warnings, alerts, or success messages. Available in subdued, warning, alert, and success variants.",
    components: ["Card", "Badge"],
    props: [
      {
        name: "variant",
        label: "Variant",
        type: "select",
        options: ["subdued", "warning", "alert", "success"],
        defaultValue: "subdued",
        description: "Subdued for plain notices, warning for caution, alert for errors, success for confirmations",
      },
      {
        name: "title",
        label: "Title",
        type: "text",
        defaultValue: "Scheduled Maintenance",
      },
      { name: "dateBadge", label: "Date badge", type: "text", defaultValue: "June 15" },
      { name: "showBadge", label: "Show badge", type: "boolean", defaultValue: true },
      {
        name: "description",
        label: "Description",
        type: "text",
        defaultValue:
          "Our platform will undergo maintenance on June 15, 2026 from 2–4 AM UTC. Some services may be temporarily unavailable.",
      },
      { name: "showDescription", label: "Show description", type: "boolean", defaultValue: true },
      { name: "showDismiss", label: "Show dismiss", type: "boolean", defaultValue: true },
    ],
    code: `<Card className="w-full max-w-md shadow-xl">
  <CardContent className="flex items-start gap-3">
    <div className="flex size-8 shrink-0 items-center justify-center border border-border bg-muted">
      <Bell className="size-4 text-muted-foreground" />
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2 mb-1">
        <p className="text-sm font-medium">Scheduled Maintenance</p>
        <Badge className="border border-border bg-muted text-muted-foreground">June 15</Badge>
      </div>
      <p className="text-sm text-muted-foreground">
        Our platform will undergo maintenance on June 15, 2026 from 2–4 AM UTC.
        Some services may be temporarily unavailable.
      </p>
    </div>
    <button
      type="button"
      aria-label="Dismiss"
      className="shrink-0 self-start text-muted-foreground transition-colors hover:text-foreground"
    >
      <X className="size-3.5" weight="bold" />
    </button>
  </CardContent>
</Card>`,
  },
  {
    slug: "data-table-demo",
    name: "Data Table",
    description:
      "Interactive employee directory with search, pagination, row selection, column visibility, and status badges. Composes DataTable with Badge, Checkbox, Pagination, Button (icons), and Input from the design system.",
    components: ["DataTable", "Badge", "Checkbox", "Pagination", "Button", "Input"],
    props: [
      { name: "searchable", label: "Searchable", type: "boolean", defaultValue: true },
      { name: "pagination", label: "Pagination", type: "boolean", defaultValue: true },
      { name: "selectable", label: "Selectable rows", type: "boolean", defaultValue: true },
      {
        name: "columnVisibility",
        label: "Column visibility",
        type: "boolean",
        defaultValue: true,
      },
    ],
    code: `// 1. Install: npm install @tanstack/react-table
//    Then add: data-table, badge, checkbox, pagination, button, input
//
// 2. Define your data type
type Employee = {
  id: string; name: string; role: string
  department: string; status: "Active" | "On Leave" | "Inactive"; joined: string
}

// 3. Create column defs, use Badge in status cells
const col = createColumnHelper<Employee>()

const columns: ColumnDef<Employee>[] = [
  col.accessor("name", {
    header: "Name",
    cell: (info) => <span className="font-medium">{info.getValue()}</span>,
  }),
  col.accessor("role",       { header: "Role" }),
  col.accessor("department", { header: "Department" }),
  col.accessor("status", {
    header: "Status",
    cell: (info) => <Badge variant={info.getValue() === "Active" ? "default" : "secondary"}>{info.getValue()}</Badge>,
  }),
]

// 4. DataTable handles Checkbox selection, Pagination footer, search Input, and icon Buttons
<DataTable
  columns={columns}
  data={employees}
  searchable="name"
  searchPlaceholder="Search by name…"
  pagination
  pageSize={8}
  selectable
  columnVisibility
/>`,
  },
]

export function getBlock(slug: string): BlockMeta | undefined {
  return blocks.find((b) => b.slug === slug)
}
