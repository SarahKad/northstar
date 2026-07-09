"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { Checkbox, CheckboxWithDescription, CheckboxCard } from "@/components/ui/checkbox"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Carousel, CarouselContent, CarouselItem, CarouselPrev, CarouselNext } from "@/components/ui/carousel"
import { Stepper } from "@/components/ui/stepper"
import { resolveStepperCurrentStep, STEPPER_PREVIEW_STEPS } from "@/lib/stepper-data"
import { Calendar } from "@/components/ui/calendar"
import {
  Command,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandEmpty,
  CommandSeparator,
} from "@/components/ui/command"
import {
  Dialog,
  DialogTrigger,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerTrigger,
  DrawerPortal,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer"
import {
  MenuBar,
  MenuBarMenu,
  MenuBarTrigger,
  MenuBarContent,
  MenuBarItem,
  MenuBarSeparator,
  MenuBarShortcut,
} from "@/components/ui/menu-bar"
import { TopNav, TopNavBrand, TopNavBreadcrumb, TopNavActions } from "@/components/ui/top-nav"
import { getMenuBarMenus } from "@/lib/menu-bar-data"
import { buildTopNavBreadcrumbItems } from "@/lib/top-nav-data"
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable"
import {
  Alert,
  AlertIcon,
  AlertContent,
  AlertTitle,
  AlertDescription,
  AlertDismiss,
} from "@/components/ui/alert"
import {
  CheckCircle, Info, Warning, XCircle,
  BookOpen, Palette, Package,
} from "@phosphor-icons/react"
import { type ElementType } from "react"
import { Pagination, PaginationItem, PaginationPrev, PaginationNext, PaginationEllipsis, getPaginationPages } from "@/components/ui/pagination"
import { ButtonGroup, ButtonGroupItem } from "@/components/ui/button-group"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { SideNav } from "@/components/ui/side-nav"
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarRail,
  SidebarInset,
  useSidebar,
} from "@/components/ui/sidebar"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { ChartAreaInteractive } from "@/components/ui/chart-area-interactive"
import { ChartBarDefault } from "@/components/blocks/chart-bar-default"
import { ChartBarStacked } from "@/components/blocks/chart-bar-stacked"
import { ChartLineDots } from "@/components/blocks/chart-line-dots"
import { ChartPieDonut } from "@/components/blocks/chart-pie-donut"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardBody,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input, InputHelperText } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { Envelope, Lock, MagnifyingGlass, Hash, Link, Eye, EyeSlash, TextT, Circle } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"
import { SidebarUserFooter } from "@/components/registry/sidebar-user-footer"
import { SearchDialog } from "@/components/registry/search-dialog"
import { SidebarNavLayout } from "@/components/registry/sidebar-nav-layout"
import { usePreviewViewport } from "@/components/registry/preview-viewport-context"

const PLAYGROUND_SECTION_ICONS: Record<string, ElementType> = {
  guides: BookOpen,
  foundations: Palette,
  components: Package,
}

type PlaygroundNavGroup = {
  id: string
  label: string
  items: { label: string; href: string; active: boolean }[]
}

function PlaygroundNavSectionGroup({ group }: { group: PlaygroundNavGroup }) {
  const { toggleSidebar } = useSidebar()
  const Icon = PLAYGROUND_SECTION_ICONS[group.id]

  return (
    <SidebarGroup>
      <Tooltip>
        <TooltipTrigger
          render={
            <button
              type="button"
              onClick={toggleSidebar}
              className="hidden group-data-[collapsible=icon]:flex h-8 w-8 mx-auto items-center justify-center rounded-md text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring"
              aria-label={group.label}
            />
          }
        >
          {Icon && <Icon className="size-4" />}
        </TooltipTrigger>
        <TooltipContent side="right">{group.label}</TooltipContent>
      </Tooltip>

      <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden flex items-center gap-1.5">
        {Icon && <Icon className="size-3.5" />}
        {group.label}
      </SidebarGroupLabel>

      <SidebarGroupContent className="group-data-[collapsible=icon]:hidden">
        <SidebarMenu>
          {group.items.map((item) => (
            <SidebarMenuItem key={item.label}>
              <SidebarMenuButton
                isActive={item.active}
                tooltip={item.label}
                render={<a href={item.href} />}
              >
                {item.label}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

const inputTypeConfig: Record<string, {
  icon: React.ReactNode
  placeholder: string
}> = {
  text:     { icon: <TextT className="size-3.5" />,          placeholder: "Enter text…" },
  email:    { icon: <Envelope className="size-3.5" />,       placeholder: "name@example.com" },
  password: { icon: <Lock className="size-3.5" />,           placeholder: "Enter password…" },
  number:   { icon: <Hash className="size-3.5" />,           placeholder: "0" },
  search:   { icon: <MagnifyingGlass className="size-3.5" />, placeholder: "Search…" },
  url:      { icon: <Link className="size-3.5" />,           placeholder: "https://" },
}
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeadSort,
  TableHeader,
  TableRow,
  TableTitle,
  type SortDirection,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

function AlertPreview({ props }: { props: Record<string, string | boolean> }) {
  const [open, setOpen] = useState(true)
  const dismissible = props.dismissible !== false

  useEffect(() => {
    setOpen(true)
  }, [props.variant, props.title, props.description, props.dismissible])

  if (!open) return null

  const variant = String(props.variant || "default")
  const AlertIconComponent =
    variant === "success"
      ? CheckCircle
      : variant === "warning"
        ? Warning
        : variant === "destructive"
          ? XCircle
          : Info

  return (
    <Alert variant={props.variant as never} className="max-w-md">
      <AlertIcon>
        <AlertIconComponent weight="bold" aria-hidden />
      </AlertIcon>
      <AlertContent>
        <AlertTitle>{String(props.title || "Heads up!")}</AlertTitle>
        <AlertDescription>
          {String(props.description || "You can add components to your app using the CLI.")}
        </AlertDescription>
      </AlertContent>
      {dismissible && <AlertDismiss onClick={() => setOpen(false)} />}
    </Alert>
  )
}

function PaginationPreview({ props }: { props: Record<string, string | boolean> }) {
  const total = parseInt(String(props.totalPages || "5"), 10)
  const [current, setCurrent] = useState(1)

  useEffect(() => {
    setCurrent((page) => Math.min(page, total))
  }, [total])

  const pages = getPaginationPages(current, total)

  return (
    <Pagination>
      <PaginationPrev onClick={() => setCurrent((page) => Math.max(1, page - 1))} disabled={current === 1} />
      {pages.map((page, index) =>
        page === "ellipsis" ? (
          <PaginationEllipsis key={`ellipsis-${index}`} />
        ) : (
          <PaginationItem
            key={page}
            aria-current={current === page ? "page" : undefined}
            onClick={() => setCurrent(page)}
          >
            {page}
          </PaginationItem>
        )
      )}
      <PaginationNext onClick={() => setCurrent((page) => Math.min(total, page + 1))} disabled={current === total} />
    </Pagination>
  )
}

function CardPreview({ props }: { props: Record<string, string | boolean> }) {
  const layout = String(props.layout || "vertical")
  const isHorizontal = layout === "horizontal"
  const imagePos = String(props.imagePosition || "none")
  const resolvedImagePos =
    imagePos === "none"
      ? "none"
      : isHorizontal
        ? ["left", "right"].includes(imagePos)
          ? imagePos
          : "left"
        : ["top", "bottom"].includes(imagePos)
          ? imagePos
          : "top"

  const cardImage =
    resolvedImagePos !== "none" ? (
      <img
        src="/card-placeholder.jpg"
        alt="Card image"
        className={cn(
          "object-cover",
          isHorizontal
            ? "w-2/5 max-w-[180px] shrink-0 self-stretch min-h-[180px]"
            : "h-44 w-full"
        )}
      />
    ) : null

  const cardContent = (
    <>
      <CardHeader>
        <CardTitle>{String(props.title || "Card Title")}</CardTitle>
        <CardDescription>{String(props.description || "Card description")}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Card content area</p>
      </CardContent>
      {props.showFooter && (
        <CardFooter>
          <Button variant="outline" size="sm">
            {String(props.footerCta || "Learn more")}
          </Button>
        </CardFooter>
      )}
    </>
  )

  return (
    <Card
      orientation={isHorizontal ? "horizontal" : "vertical"}
      className={isHorizontal ? "w-[480px]" : "w-[340px]"}
    >
      {isHorizontal ? (
        <>
          {resolvedImagePos === "left" && cardImage}
          <CardBody>{cardContent}</CardBody>
          {resolvedImagePos === "right" && cardImage}
        </>
      ) : (
        <>
          {resolvedImagePos === "top" && cardImage}
          {cardContent}
          {resolvedImagePos === "bottom" && cardImage}
        </>
      )}
    </Card>
  )
}

function DialogPreview() {
  const isMobilePreview = usePreviewViewport() === "mobile"

  return (
    <Dialog>
      <DialogTrigger
        render={<Button variant="outline">Edit Profile</Button>}
      />
      <DialogPortal>
        <DialogOverlay />
        <DialogContent
          className={cn(
            isMobilePreview &&
              "w-[calc(340px-2rem)] max-w-[calc(100vw-2rem)] p-4"
          )}
        >
          <DialogClose />
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you are done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 py-4">
            <div className="grid gap-1.5">
              <Label htmlFor="dialog-name">Name</Label>
              <Input id="dialog-name" defaultValue="Jane Doe" />
            </div>
            <div className="grid gap-1.5">
              <Label htmlFor="dialog-email">Email</Label>
              <Input id="dialog-email" defaultValue="jane@example.com" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose render={<Button variant="outline">Cancel</Button>} />
            <Button>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  )
}

function InputPreview({ props }: { props: Record<string, string | boolean> }) {
  const [showPassword, setShowPassword] = useState(false)
  const type = String(props.type || "text")
  const config = inputTypeConfig[type] ?? inputTypeConfig.text
  const isPassword = type === "password"
  const resolvedType = isPassword && showPassword ? "text" : type
  const placeholder = String(props.placeholder || config.placeholder)
  const showLabel = props.showLabel !== false
  const showHelperText = props.showHelperText === true
  const helperText = String(
    props.helperText ?? "We'll never share your email with anyone else."
  )

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col gap-1.5">
      {showLabel && (
        <Label htmlFor="preview-input">{String(props.label || "Label")}</Label>
      )}
      <div className="relative flex items-center">
        <span className="pointer-events-none absolute left-2.5 text-muted-foreground">
          {config.icon}
        </span>
        <Input
          id="preview-input"
          type={resolvedType}
          placeholder={placeholder}
          disabled={Boolean(props.disabled)}
          aria-describedby={showHelperText ? "preview-input-helper" : undefined}
          className={cn("pl-8", isPassword && "pr-8")}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-2.5 text-muted-foreground hover:text-foreground transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword
              ? <EyeSlash className="size-3.5" />
              : <Eye className="size-3.5" />
            }
          </button>
        )}
      </div>
      {showHelperText && (
        <InputHelperText id="preview-input-helper">{helperText}</InputHelperText>
      )}
    </div>
  )
}

function ButtonGroupPreview({ props }: { props: Record<string, string | boolean> }) {
  const labels = ["Day", "Week", "Month"] as const
  const [active, setActive] = useState(0)
  const variant = (props.variant as "outline" | "secondary") || "outline"

  return (
    <ButtonGroup variant={variant}>
      {labels.map((label, i) => (
        <ButtonGroupItem
          key={label}
          variant={variant}
          active={active === i}
          onClick={() => setActive(i)}
        >
          {label}
        </ButtonGroupItem>
      ))}
    </ButtonGroup>
  )
}

function CalendarPreview({ props }: { props: Record<string, string | boolean> }) {
  const mode = (props.mode as "single" | "range") || "single"
  const [selected, setSelected] = useState<Date | undefined>()
  const [selectedEnd, setSelectedEnd] = useState<Date | undefined>()

  useEffect(() => {
    setSelected(undefined)
    setSelectedEnd(undefined)
  }, [mode])

  if (mode === "range") {
    return (
      <Calendar
        mode="range"
        selected={selected}
        selectedEnd={selectedEnd}
        onSelectRange={(start, end) => {
          setSelected(start)
          setSelectedEnd(
            start.getFullYear() === end.getFullYear() &&
              start.getMonth() === end.getMonth() &&
              start.getDate() === end.getDate()
              ? undefined
              : end
          )
        }}
      />
    )
  }

  return (
    <Calendar
      mode="single"
      selected={selected}
      onSelect={setSelected}
    />
  )
}

function CheckboxPreview({ props }: { props: Record<string, string | boolean> }) {
  const [checked, setChecked] = useState<boolean>(Boolean(props.checked))
  const variant = String(props.variant || "default")
  const label = String(props.label || "Accept terms and conditions")
  const description = String(props.description || "You agree to our Terms of Service and Privacy Policy.")
  const disabled = Boolean(props.disabled)

  useEffect(() => {
    setChecked(Boolean(props.checked))
  }, [props.checked])

  if (variant === "with-description") {
    return (
      <CheckboxWithDescription
        label={label}
        description={description}
        checked={checked}
        onCheckedChange={setChecked}
        disabled={disabled}
      />
    )
  }
  if (variant === "card") {
    return (
      <CheckboxCard
        label={label}
        description={description}
        checked={checked}
        onCheckedChange={setChecked}
        disabled={disabled}
        className="w-72"
      />
    )
  }
  return (
    <label className="flex cursor-pointer items-center gap-2.5 select-none">
      <Checkbox
        checked={checked}
        onCheckedChange={(val) => setChecked(Boolean(val))}
        disabled={disabled}
      />
      <span className="text-sm text-foreground">{label}</span>
    </label>
  )
}

function SelectPreview({ props }: { props: Record<string, string | boolean> }) {
  const [value, setValue] = useState<string | null>(null)
  const showLabel = props.showLabel !== false
  const label = String(props.label || "Select")
  const placeholder = String(props.placeholder || "Choose…")
  const disabled = Boolean(props.disabled)
  const option1 = String(props.option1Label || "Option 1")
  const option2 = String(props.option2Label || "Option 2")
  const option3 = String(props.option3Label || "Option 3")

  useEffect(() => {
    setValue(null)
  }, [props.placeholder, props.label, props.showLabel, props.disabled, props.option1Label, props.option2Label, props.option3Label])

  return (
    <div className="mx-auto flex w-full max-w-sm flex-col items-center gap-1.5">
      {showLabel && (
        <Label htmlFor="preview-select" className="w-full">
          {label}
        </Label>
      )}
      <Select
        disabled={disabled}
        value={value}
        onValueChange={(v) => setValue(v)}
      >
        <SelectTrigger id="preview-select" className="w-full">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="option1">{option1}</SelectItem>
          <SelectItem value="option2">{option2}</SelectItem>
          <SelectItem value="option3">{option3}</SelectItem>
        </SelectContent>
      </Select>
    </div>
  )
}

function TablePreview({ props }: { props: Record<string, string | boolean> }) {
  const [sortKey, setSortKey] = useState<"invoice" | "status" | null>(null)
  const [sortDir, setSortDir] = useState<SortDirection>(false)
  const showTitle = props.showTitle !== false
  const title = String(props.title ?? "Recent invoices")

  const invoices = [
    { invoice: "INV001", status: "Paid", method: "Credit Card", amount: "$250.00" },
    { invoice: "INV002", status: "Pending", method: "Bank Transfer", amount: "$150.00" },
    { invoice: "INV003", status: "Unpaid", method: "PayPal", amount: "$350.00" },
  ]

  function toggleSort(key: "invoice" | "status") {
    if (sortKey === key) {
      const next = sortDir === false ? "asc" : sortDir === "asc" ? "desc" : false
      setSortDir(next)
      if (next === false) setSortKey(null)
    } else {
      setSortKey(key)
      setSortDir("asc")
    }
  }

  const rows = [...invoices].sort((a, b) => {
    if (!sortKey || !sortDir) return 0
    const av = a[sortKey].toLowerCase()
    const bv = b[sortKey].toLowerCase()
    if (av < bv) return sortDir === "asc" ? -1 : 1
    if (av > bv) return sortDir === "asc" ? 1 : -1
    return 0
  })

  return (
    <div className="w-full max-w-lg space-y-2">
      {showTitle && <TableTitle>{title}</TableTitle>}
      <Table>
        {showTitle && <TableCaption>{title}</TableCaption>}
        <TableHeader>
          <TableRow>
            <TableHeadSort
              className="w-[100px]"
              sorted={sortKey === "invoice" ? sortDir : false}
              onSort={() => toggleSort("invoice")}
            >
              Invoice
            </TableHeadSort>
            <TableHeadSort
              sorted={sortKey === "status" ? sortDir : false}
              onSort={() => toggleSort("status")}
            >
              Status
            </TableHeadSort>
            <TableHead>Method</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((inv) => (
            <TableRow key={inv.invoice}>
              <TableCell className="font-medium">{inv.invoice}</TableCell>
              <TableCell>{inv.status}</TableCell>
              <TableCell>{inv.method}</TableCell>
              <TableCell className="text-right">{inv.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        {Boolean(props.showFooter) && (
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right">$750.00</TableCell>
            </TableRow>
          </TableFooter>
        )}
      </Table>
    </div>
  )
}

type Props = {
  slug: string
  props: Record<string, string | boolean>
}

export function ComponentRenderer({ slug, props }: Props) {
  switch (slug) {
    case "button": {
      const label = String(props.label || "Button")
      const iconLayout = String(props.icon ?? "none")
      const isIconOnly = iconLayout === "only" || props.size === "icon"
      const size = (isIconOnly ? "icon" : props.size) as never

      let children: React.ReactNode
      if (isIconOnly) {
        children = <Circle />
      } else if (iconLayout === "left") {
        children = (
          <>
            <Circle data-icon="inline-start" />
            {label}
          </>
        )
      } else if (iconLayout === "right") {
        children = (
          <>
            {label}
            <Circle data-icon="inline-end" />
          </>
        )
      } else {
        children = label
      }

      return (
        <Button
          variant={props.variant as never}
          size={size}
          disabled={Boolean(props.disabled)}
          aria-label={isIconOnly ? label : undefined}
        >
          {children}
        </Button>
      )
    }

    case "table":
      return <TablePreview props={props} />

    case "badge":
      return (
        <Badge variant={props.variant as never}>
          {String(props.label || "Badge")}
        </Badge>
      )

    case "card":
      return <CardPreview props={props} />

    case "input":
      return <InputPreview props={props} />

    case "tabs":
      return (
        <Tabs defaultValue="tab1" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="tab1">{String(props.tab1Label || "Tab 1")}</TabsTrigger>
            <TabsTrigger value="tab2">{String(props.tab2Label || "Tab 2")}</TabsTrigger>
            <TabsTrigger value="tab3">{String(props.tab3Label || "Tab 3")}</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1">
            <p className="text-sm text-muted-foreground p-2">{String(props.tab1Label)} content</p>
          </TabsContent>
          <TabsContent value="tab2">
            <p className="text-sm text-muted-foreground p-2">{String(props.tab2Label)} content</p>
          </TabsContent>
          <TabsContent value="tab3">
            <p className="text-sm text-muted-foreground p-2">{String(props.tab3Label)} content</p>
          </TabsContent>
        </Tabs>
      )

    case "select":
      return <SelectPreview props={props} />

    case "skeleton": {
      const variant = props.variant as string
      if (variant === "avatar") {
        return (
          <div className="flex items-center gap-3">
            <Skeleton className="size-10 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[150px]" />
            </div>
          </div>
        )
      }
      if (variant === "card") {
        return (
          <div className="flex flex-col gap-3">
            <Skeleton className="h-[140px] w-[280px] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[200px]" />
              <Skeleton className="h-4 w-[160px]" />
            </div>
          </div>
        )
      }
      return (
        <div className="space-y-2">
          <Skeleton className="h-4 w-[280px]" />
          <Skeleton className="h-4 w-[240px]" />
          <Skeleton className="h-4 w-[200px]" />
        </div>
      )
    }

    case "checkbox":
      return <CheckboxPreview props={props} />

    case "alert":
      return <AlertPreview props={props} />

    case "pagination":
      return <PaginationPreview props={props} />

    case "button-group":
      return <ButtonGroupPreview props={props} />


    case "radio-group": {
      const [value, setValue] = useState("option1")
      const options = [
        { value: "option1", label: String(props.option1Label || "Option one") },
        { value: "option2", label: String(props.option2Label || "Option two") },
        { value: "option3", label: String(props.option3Label || "Option three") },
      ]
      return (
        <div className="flex items-center justify-center w-full">
          <RadioGroup
            value={value}
            onValueChange={setValue}
            disabled={Boolean(props.disabled)}
          >
            {options.map((opt) => (
              <RadioGroupItem
                key={opt.value}
                value={opt.value}
                label={opt.label}
                disabled={Boolean(props.disabled)}
              />
            ))}
          </RadioGroup>
        </div>
      )
    }

    case "side-nav": {
      const activeItem = String(props.activeItem || "getting-started")
      const sections = [
        {
          id: "guides",
          label: "Guides",
          items: [
            { label: "Getting Started", href: "#", active: activeItem === "getting-started" },
          ],
        },
        {
          id: "foundations",
          label: "Foundations",
          items: [
            { label: "Typography", href: "#", active: activeItem === "typography" },
          ],
        },
        {
          id: "components",
          label: "Components",
          items: [
            { label: "Button", href: "#", active: activeItem === "button" },
            { label: "Card", href: "#", active: activeItem === "card" },
          ],
        },
      ]
      return <SideNav sections={sections} />
    }

    case "sidebar": {
      const activeItem = String(props.activeItem || "getting-started")
      const showLogo = props.showLogo !== false
      const showSearch = props.showSearch !== false
      const navGroups = [
        {
          id: "guides",
          label: "Guides",
          items: [
            { label: "Getting Started", href: "#", active: activeItem === "getting-started" },
          ],
        },
        {
          id: "foundations",
          label: "Foundations",
          items: [
            { label: "Typography", href: "#", active: activeItem === "typography" },
          ],
        },
        {
          id: "components",
          label: "Components",
          items: [
            { label: "Button", href: "#", active: activeItem === "button" },
            { label: "Card", href: "#", active: activeItem === "card" },
          ],
        },
      ]
      return (
        <div
          data-slot="sidebar-preview"
          className={cn(
            "relative h-[480px] w-full max-w-full overflow-hidden rounded-md border border-border bg-background",
            "[&_[data-slot=sidebar-wrapper]]:h-full [&_[data-slot=sidebar-wrapper]]:min-h-0",
            "[&_[data-slot=sidebar-container]]:!absolute [&_[data-slot=sidebar-container]]:top-0 [&_[data-slot=sidebar-container]]:bottom-0 [&_[data-slot=sidebar-container]]:!h-full"
          )}
        >
          <SidebarProvider className="flex h-full min-h-0 w-full overflow-hidden">
            <Sidebar>
              {(showLogo || showSearch) && (
                <SidebarHeader className="gap-2 border-b border-sidebar-border p-2">
                  {showLogo && (
                    <div className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
                      <Image
                        src="/logo.png"
                        alt="My App"
                        width={28}
                        height={28}
                        className="shrink-0 object-contain dark:invert"
                      />
                      <span className="truncate font-medium text-sm group-data-[collapsible=icon]:hidden">
                        My App
                      </span>
                    </div>
                  )}
                  {showSearch && <SearchDialog />}
                </SidebarHeader>
              )}
              <SidebarNavLayout
                pinned={navGroups
                  .filter((group) => group.id === "guides")
                  .map((group) => (
                    <PlaygroundNavSectionGroup key={group.id} group={group} />
                  ))}
              >
                {navGroups
                  .filter((group) => group.id !== "guides")
                  .map((group) => (
                    <PlaygroundNavSectionGroup key={group.id} group={group} />
                  ))}
              </SidebarNavLayout>
              <SidebarFooter className="border-t border-sidebar-border p-2">
                <SidebarUserFooter />
              </SidebarFooter>
              <SidebarRail />
            </Sidebar>
            <SidebarInset className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
              <header className="flex h-10 shrink-0 items-center border-b border-border px-2">
                <SidebarTrigger />
              </header>
              <div className="flex flex-1 items-center justify-center p-4 text-sm text-muted-foreground">
                Main content
              </div>
            </SidebarInset>
          </SidebarProvider>
        </div>
      )
    }

    case "chart-area-interactive":
      return (
        <div className="w-full min-h-[280px] max-w-3xl">
          <ChartAreaInteractive
            title={String(props.title || "Area Chart - Interactive")}
            dateRange={String(props.dateRange || "Showing total visitors for the last 3 months")}
            metric1Label={String(props.metric1Label || "Desktop")}
            metric2Label={String(props.metric2Label || "Mobile")}
            defaultTimeRange={String(props.timeRange || "7d")}
          />
        </div>
      )

    case "chart-bar-default":
      return (
        <div className="w-full min-h-[280px] max-w-md">
          <ChartBarDefault
            title={String(props.title || "Bar Chart")}
            dateRange={String(props.dateRange || "January - June 2024")}
            metric1Label={String(props.metric1Label || "Desktop")}
          />
        </div>
      )

    case "chart-bar-stacked":
      return (
        <div className="w-full min-h-[280px] max-w-md">
          <ChartBarStacked
            title={String(props.title || "Bar Chart - Stacked + Legend")}
            dateRange={String(props.dateRange || "January - June 2024")}
            metric1Label={String(props.metric1Label || "Desktop")}
            metric2Label={String(props.metric2Label || "Mobile")}
          />
        </div>
      )

    case "chart-pie-donut":
      return (
        <div className="w-full min-h-[280px] max-w-md">
          <ChartPieDonut
            title={String(props.title || "Donut Chart")}
            dateRange={String(props.dateRange || "January – June 2024")}
            segment1Label={String(props.segment1Label || "Chrome")}
            segment2Label={String(props.segment2Label || "Safari")}
            segment3Label={String(props.segment3Label || "Firefox")}
            segment4Label={String(props.segment4Label || "Edge")}
            segment5Label={String(props.segment5Label || "Other")}
            centerLabel={String(props.centerLabel || "Visitors")}
          />
        </div>
      )

    case "chart-line-dots":
      return (
        <div className="w-full min-h-[280px] max-w-md">
          <ChartLineDots
            title={String(props.title || "Line Chart - Dots")}
            dateRange={String(props.dateRange || "January - June 2024")}
            metric1Label={String(props.metric1Label || "Desktop")}
            metric2Label={String(props.metric2Label || "Mobile")}
          />
        </div>
      )


    case "accordion": {
      const multiple = Boolean(props.multiple)
      const allItems = [
        { value: "item-1", trigger: "Is it accessible?", content: "Yes. It adheres to the WAI-ARIA design pattern." },
        { value: "item-2", trigger: "Is it styled?", content: "Yes. It comes with default styles that match the design system's aesthetics." },
        { value: "item-3", trigger: "Is it animated?", content: "Yes. It uses a CSS grid-rows transition for smooth height animation." },
      ]
      const items = multiple ? allItems : allItems.slice(0, 1)
      return (
        <Accordion key={multiple ? "multiple" : "single"} multiple={multiple} className="w-full max-w-md">
          {items.map((item) => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger>{item.trigger}</AccordionTrigger>
              <AccordionContent>{item.content}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )
    }

    case "avatar": {
      const size = (props.size as "sm" | "default" | "lg" | "xl") || "default"
      return (
        <Avatar size={size}>
          <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User avatar" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
      )
    }

    case "breadcrumb":
      return (
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">Components</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Button</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )

    case "carousel": {
      const loop = Boolean(props.loop)
      const autoPlay = Boolean(props.autoPlay)
      const slides = [
        { src: "/carousel-1.png", alt: "Slide 1" },
        { src: "/carousel-2.png", alt: "Slide 2" },
        { src: "/carousel-3.png", alt: "Slide 3" },
      ]
      return (
        <Carousel loop={loop} autoPlay={autoPlay} className="w-full max-w-sm">
          <CarouselContent>
            {slides.map((slide, i) => (
              <CarouselItem key={i}>
                <div className="overflow-hidden rounded-lg border border-border">
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    className="h-48 w-full object-cover"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrev />
          <CarouselNext />
        </Carousel>
      )
    }

    case "stepper": {
      const currentStep = resolveStepperCurrentStep(props.currentStep ?? "Step 2")
      const steps = [...STEPPER_PREVIEW_STEPS]
      return (
        <Stepper currentStep={currentStep} steps={steps} className="w-full" />
      )
    }

    case "calendar":
      return <CalendarPreview props={props} />

    case "command":
      return (
        <Dialog>
          <DialogTrigger
            render={<Button variant="outline">Open Menu</Button>}
          />
          <DialogPortal>
            <DialogOverlay />
            <DialogContent className="overflow-hidden p-0 max-w-sm">
              <Command>
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
                    <CommandItem filterValue="settings">Settings</CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </DialogContent>
          </DialogPortal>
        </Dialog>
      )

    case "dialog":
      return <DialogPreview />

    case "drawer": {
      const side = (props.side as "right" | "left" | "bottom") || "right"
      return (
        <Drawer side={side}>
          <DrawerTrigger
            render={<Button variant="outline">Open Drawer</Button>}
          />
          <DrawerPortal>
            <DrawerOverlay />
            <DrawerContent side={side}>
              <DrawerHeader>
                <DrawerTitle>Panel Settings</DrawerTitle>
                <DrawerClose />
              </DrawerHeader>
              <div className="flex-1 overflow-auto p-4">
                <p className="text-sm text-muted-foreground">
                  Drawer content goes here. Use the right-side drawer for detail views and forms.
                </p>
              </div>
              <DrawerFooter>
                <DrawerClose render={<Button variant="ghost" size="sm">Close</Button>} />
                <Button size="sm">Save</Button>
              </DrawerFooter>
            </DrawerContent>
          </DrawerPortal>
        </Drawer>
      )
    }

    case "menu-bar": {
      const menus = getMenuBarMenus(props.menuCount ?? "3")

      return (
        <MenuBar>
          {menus.map((menu) => (
            <MenuBarMenu key={menu.label}>
              <MenuBarTrigger>{menu.label}</MenuBarTrigger>
              <MenuBarContent>
                {menu.items.map((item, index) => {
                  if (item.type === "separator") {
                    return <MenuBarSeparator key={`${menu.label}-separator-${index}`} />
                  }

                  return (
                    <MenuBarItem key={`${menu.label}-${item.label}`}>
                      {item.label}
                      {item.shortcut ? <MenuBarShortcut>{item.shortcut}</MenuBarShortcut> : null}
                    </MenuBarItem>
                  )
                })}
              </MenuBarContent>
            </MenuBarMenu>
          ))}
        </MenuBar>
      )
    }

    case "top-nav": {
      const showLogo = props.showLogo !== false
      const showSearch = props.showSearch !== false
      const showBreadcrumbs = props.showBreadcrumbs !== false
      const breadcrumbItems = buildTopNavBreadcrumbItems(props)
      return (
        <div className="w-full rounded-lg overflow-hidden border border-border">
          <TopNav>
            {showLogo && (
              <TopNavBrand>
                <span className="size-5 rounded-sm bg-primary" />
                AG Design
              </TopNavBrand>
            )}
            {showBreadcrumbs && <TopNavBreadcrumb items={breadcrumbItems} />}
            <TopNavActions showSearch={showSearch} />
          </TopNav>
        </div>
      )
    }

    case "resizable": {
      const direction = (props.direction as "horizontal" | "vertical") || "horizontal"
      return (
        <ResizablePanelGroup
          direction={direction}
          className={cn(
            "w-full max-w-lg rounded-lg border border-border",
            direction === "horizontal" ? "h-40" : "h-64"
          )}
        >
          <ResizablePanel defaultSize={30} minSize={15} className="p-4">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Sidebar</p>
            <p className="mt-1 text-sm text-foreground">Drag the handle to resize.</p>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel defaultSize={70} minSize={30} className="p-4">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Content</p>
            <p className="mt-1 text-sm text-foreground">Main content area.</p>
          </ResizablePanel>
        </ResizablePanelGroup>
      )
    }

    default:
      return (
        <p className="text-sm text-muted-foreground">
          No preview available for <code>{slug}</code>
        </p>
      )
  }
}
