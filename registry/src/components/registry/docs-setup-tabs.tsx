"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AppWindow, ChatCircle } from "@phosphor-icons/react"

type DocsSetupTabsProps = {
  cursor: React.ReactNode
  claude: React.ReactNode
}

/**
 * Two-way setup guide: Cursor IDE and Claude Code.
 */
export function DocsSetupTabs({ cursor, claude }: DocsSetupTabsProps) {
  return (
    <Tabs defaultValue="cursor" className="w-full">
      <TabsList className="mb-6 h-auto w-full flex-wrap justify-start gap-1 p-1 sm:w-fit">
        <TabsTrigger value="cursor" className="gap-1.5 px-3 py-2 text-sm">
          <AppWindow className="size-4" />
          Cursor
        </TabsTrigger>
        <TabsTrigger value="claude" className="gap-1.5 px-3 py-2 text-sm">
          <ChatCircle className="size-4" />
          Claude Code
        </TabsTrigger>
      </TabsList>
      <TabsContent value="cursor" className="text-sm leading-relaxed">
        {cursor}
      </TabsContent>
      <TabsContent value="claude" className="text-sm leading-relaxed">
        {claude}
      </TabsContent>
    </Tabs>
  )
}
