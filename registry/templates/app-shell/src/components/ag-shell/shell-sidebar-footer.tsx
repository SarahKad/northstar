"use client"

import { SignOut } from "@phosphor-icons/react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { clearDemoSession } from "@/components/ag-shell/auth"

const USER = {
  name: "Demo User",
  email: "demo@example.com",
  initials: "DU",
}

export function ShellSidebarFooter() {
  const router = useRouter()

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-2.5 py-2 group-data-[collapsible=icon]:size-8 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0">
        <Avatar size="sm" className="size-8 shrink-0">
          <AvatarImage alt={USER.name} />
          <AvatarFallback>{USER.initials}</AvatarFallback>
        </Avatar>
        <div className="grid min-w-0 flex-1 text-left leading-tight group-data-[collapsible=icon]:hidden">
          <span className="truncate text-sm font-medium">{USER.name}</span>
          <span className="truncate text-xs text-muted-foreground">{USER.email}</span>
        </div>
      </div>
      <Button
        variant="outline"
        size="sm"
        className="group-data-[collapsible=icon]:size-8 group-data-[collapsible=icon]:p-0"
        onClick={() => {
          clearDemoSession()
          router.push("/login")
        }}
      >
        <SignOut className="size-4 group-data-[collapsible=icon]:mx-auto" />
        <span className="group-data-[collapsible=icon]:hidden">Sign out</span>
      </Button>
    </div>
  )
}
