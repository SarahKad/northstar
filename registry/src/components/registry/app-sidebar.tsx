"use client"

import { type ElementType } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BookOpen,
  Palette,
  SquaresFour,
  CursorClick,
  Eye,
  Rows,
  Bell,
  Compass,
  ChartBar,
  Desktop,
} from "@phosphor-icons/react"
import {
  Sidebar,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { navSections, type NavSection } from "@/lib/nav-config"
import { SearchDialog } from "@/components/registry/search-dialog"
import { SidebarNavLayout } from "@/components/registry/sidebar-nav-layout"
import { SidebarUserFooter } from "@/components/registry/sidebar-user-footer"
import { SidebarBrandLogo } from "@/components/registry/sidebar-brand-logo"

const SECTION_ICONS: Record<string, ElementType> = {
  guides: BookOpen,
  "system-preview": Desktop,
  foundations: Palette,
  blocks: SquaresFour,
  inputs: CursorClick,
  display: Eye,
  layout: Rows,
  feedback: Bell,
  navigation: Compass,
  charts: ChartBar,
}

function NavSectionGroup({
  section,
  pathname,
}: {
  section: NavSection
  pathname: string
}) {
  const { toggleSidebar } = useSidebar()
  const Icon = SECTION_ICONS[section.id]

  if (section.items.length === 0) return null

  return (
    <SidebarGroup>
      {/* Collapsed: icon-only button, click to expand sidebar */}
      <Tooltip>
        <TooltipTrigger
          render={
            <button
              type="button"
              onClick={toggleSidebar}
              className="hidden group-data-[collapsible=icon]:flex h-8 w-8 mx-auto items-center justify-center rounded-md text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring"
              aria-label={section.label}
            />
          }
        >
          {Icon && <Icon className="size-4" />}
        </TooltipTrigger>
        <TooltipContent side="right">{section.label}</TooltipContent>
      </Tooltip>

      {/* Expanded: icon + label */}
      <SidebarGroupLabel className="group-data-[collapsible=icon]:hidden flex items-center gap-1.5">
        {Icon && <Icon className="size-3.5" />}
        {section.label}
      </SidebarGroupLabel>

      {/* Links, hidden when collapsed */}
      <SidebarGroupContent className="group-data-[collapsible=icon]:hidden">
        <SidebarMenu>
          {section.items.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                isActive={pathname === item.href}
                tooltip={item.label}
                render={<Link href={item.href} />}
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

/**
 * Application sidebar, shadcn composition driven by `nav-config`.
 */
export function AppSidebar() {
  const pathname = usePathname()
  const guidesSections = navSections.filter((section) => section.id === "guides")
  const scrollSections = navSections.filter((section) => section.id !== "guides")

  return (
    <Sidebar>
      <SidebarHeader className="gap-2 border-b border-sidebar-border p-2">
        <Link
          href="/docs/getting-started"
          className="flex min-w-0 items-center rounded-md px-1 py-1 outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring group-data-[collapsible=icon]:justify-center"
        >
          <SidebarBrandLogo />
        </Link>
        <SearchDialog />
      </SidebarHeader>

      <SidebarNavLayout
        pinned={
          <>
            {guidesSections.map((section) => (
              <NavSectionGroup
                key={section.id}
                section={section}
                pathname={pathname}
              />
            ))}
          </>
        }
      >
        {scrollSections.map((section) => (
          <NavSectionGroup
            key={section.id}
            section={section}
            pathname={pathname}
          />
        ))}
      </SidebarNavLayout>

      <SidebarFooter className="border-t border-sidebar-border p-2">
        <SidebarUserFooter />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
