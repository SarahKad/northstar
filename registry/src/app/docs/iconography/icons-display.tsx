"use client"

import {
  MagnifyingGlass,
  CaretRight,
  Moon,
  Sun,
  Copy,
  Check,
  Warning,
  ArrowLeft,
  ArrowRight,
  X,
  Upload,
  List,
  Envelope,
  Lock,
  Eye,
  EyeSlash,
  Hash,
  Link,
  TextT,
  ArrowUpRight,
  Users,
  CheckCircle,
  XCircle,
} from "@phosphor-icons/react"

const systemIcons = [
  { name: "MagnifyingGlass", icon: MagnifyingGlass, usage: "Search trigger" },
  { name: "CaretRight",      icon: CaretRight,      usage: "Breadcrumb separator" },
  { name: "ArrowLeft",       icon: ArrowLeft,       usage: "Prev page nav" },
  { name: "ArrowRight",      icon: ArrowRight,      usage: "Next page nav" },
  { name: "ArrowUpRight",    icon: ArrowUpRight,    usage: "External link CTA" },
  { name: "List",            icon: List,            usage: "Mobile menu open" },
  { name: "X",               icon: X,               usage: "Close / dismiss" },
  { name: "Moon",            icon: Moon,            usage: "Dark mode toggle" },
  { name: "Sun",             icon: Sun,             usage: "Light mode toggle" },
  { name: "Copy",            icon: Copy,            usage: "Copy to clipboard" },
  { name: "Check",           icon: Check,           usage: "Copy confirmed" },
  { name: "CheckCircle",     icon: CheckCircle,     usage: "Do list items" },
  { name: "XCircle",         icon: XCircle,         usage: "Don't list items" },
  { name: "Warning",         icon: Warning,         usage: "Alert / caution" },
  { name: "Upload",          icon: Upload,          usage: "File upload" },
  { name: "Users",           icon: Users,           usage: "Empty state, teams" },
  { name: "Envelope",        icon: Envelope,        usage: "Email input type" },
  { name: "Lock",            icon: Lock,            usage: "Password input type" },
  { name: "Eye",             icon: Eye,             usage: "Show password" },
  { name: "EyeSlash",        icon: EyeSlash,        usage: "Hide password" },
  { name: "Hash",            icon: Hash,            usage: "Number input type" },
  { name: "Link",            icon: Link,            usage: "URL input type" },
  { name: "TextT",           icon: TextT,           usage: "Text input type" },
]

const weights = ["Regular", "Bold", "Light", "Thin", "Fill", "Duotone"] as const

export function IconWeightDemo() {
  return (
    <div className="flex flex-wrap gap-6 items-end">
      {weights.map((weight) => {
        const isActive = weight === "Regular"
        return (
          <div key={weight} className="flex flex-col items-center gap-2">
            <div className={`rounded-md border p-3 ${isActive ? "border-brand bg-brand/5" : "bg-muted/40"}`}>
              <MagnifyingGlass
                className="size-6"
                weight={weight.toLowerCase() as "regular" | "bold" | "light" | "thin" | "fill" | "duotone"}
              />
            </div>
            <p className={`text-xs ${isActive ? "text-brand font-medium" : "text-muted-foreground"}`}>
              {weight}{isActive ? " ✓" : ""}
            </p>
          </div>
        )
      })}
    </div>
  )
}

export function IconGrid() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
      {systemIcons.map(({ name, icon: Icon, usage }) => (
        <div
          key={name}
          className="flex items-center gap-3 rounded-md border bg-card px-3 py-2.5"
        >
          <Icon className="size-5 shrink-0 text-foreground" />
          <div className="min-w-0">
            <p className="font-mono text-xs text-foreground truncate">{name}</p>
            <p className="text-xs text-muted-foreground truncate">{usage}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
