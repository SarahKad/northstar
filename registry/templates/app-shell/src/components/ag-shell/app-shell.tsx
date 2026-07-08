"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"
import {
  SidebarProvider,
  SidebarInset,
  useSidebar,
} from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { AppSidebar } from "@/components/ag-shell/app-sidebar"

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
