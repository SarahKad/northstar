"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { AppSidebar } from "@/components/registry/app-sidebar"
import { SidebarBrandLogo } from "@/components/registry/sidebar-brand-logo"
import { DarkModeToggle } from "./dark-mode-toggle"

function DesktopSidebarBar() {
  return (
    <header className="hidden h-12 shrink-0 items-center gap-2 border-b px-4 md:flex">
      <SidebarTrigger />
    </header>
  )
}

function MobileTopBar() {
  return (
    <header className="flex shrink-0 items-center justify-between border-b px-4 py-3 md:hidden">
      <SidebarTrigger />
      <Link href="/docs/getting-started">
        <SidebarBrandLogo />
      </Link>
      <DarkModeToggle />
    </header>
  )
}

function ShellInner({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { setOpenMobile } = useSidebar()

  useEffect(() => {
    setOpenMobile(false)
  }, [pathname, setOpenMobile])

  return (
    <>
      <AppSidebar />
      <SidebarInset className="flex h-svh max-h-svh min-h-0 flex-col overflow-hidden">
        <MobileTopBar />
        <DesktopSidebarBar />
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">{children}</div>
      </SidebarInset>
    </>
  )
}

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <TooltipProvider delay={0}>
        <ShellInner>{children}</ShellInner>
      </TooltipProvider>
    </SidebarProvider>
  )
}
