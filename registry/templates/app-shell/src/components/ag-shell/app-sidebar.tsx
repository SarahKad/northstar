"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChartBar, House, SquaresFour } from "@phosphor-icons/react"
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
import {
  appNavSections,
  type AppNavItem,
  type AppNavSection,
} from "@/components/ag-shell/app-nav-config"
import { SidebarNavLayout } from "@/components/ag-shell/sidebar-nav-layout"
import { ShellSidebarFooter } from "@/components/ag-shell/shell-sidebar-footer"

const SECTION_ICONS: Record<string, typeof House> = {
  main: House,
  workspace: SquaresFour,
  charts: ChartBar,
}

function NavSectionGroup({
  section,
  pathname,
}: {
  section: AppNavSection
  pathname: string
}) {
  const { toggleSidebar } = useSidebar()
  const Icon = SECTION_ICONS[section.id] ?? House

  return (
    <SidebarGroup>
      <Tooltip>
        <TooltipTrigger
          render={
            <button
              type="button"
              onClick={toggleSidebar}
              className="mx-auto hidden h-8 w-8 items-center justify-center rounded-md text-sidebar-foreground/70 outline-none transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:ring-2 focus-visible:ring-sidebar-ring group-data-[collapsible=icon]:flex"
              aria-label={section.label}
            />
          }
        >
          <Icon className="size-4" />
        </TooltipTrigger>
        <TooltipContent side="right">{section.label}</TooltipContent>
      </Tooltip>

      <SidebarGroupLabel className="flex items-center gap-1.5 group-data-[collapsible=icon]:hidden">
        <Icon className="size-3.5" />
        {section.label}
      </SidebarGroupLabel>

      <SidebarGroupContent className="group-data-[collapsible=icon]:hidden">
        <SidebarMenu>
          {section.items.map((item: AppNavItem) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                isActive={pathname === item.href || pathname.startsWith(item.href + "/")}
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

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader className="gap-2 border-b border-sidebar-border p-2">
        <Link
          href="/dashboard"
          className="flex min-w-0 items-center gap-2.5 rounded-md px-1 py-1 outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring group-data-[collapsible=icon]:justify-center"
        >
          <span className="flex size-7 shrink-0 items-center justify-center rounded-md bg-primary text-xs font-medium text-primary-foreground">
            NS
          </span>
          <span className="truncate text-sm font-medium tracking-tight group-data-[collapsible=icon]:hidden">
            My App
          </span>
        </Link>
      </SidebarHeader>

      <SidebarNavLayout pinned={null}>
        {appNavSections.map((section: AppNavSection) => (
          <NavSectionGroup key={section.id} section={section} pathname={pathname} />
        ))}
      </SidebarNavLayout>

      <SidebarFooter className="border-t border-sidebar-border p-2">
        <ShellSidebarFooter />
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
