"use client"

import { CodeBlock } from "./code-block"

import { StatsOverview } from "@/components/blocks/stats-overview"
import { RecentActivity } from "@/components/blocks/recent-activity"
import { FormCard } from "@/components/blocks/form-card"
import { EmptyState } from "@/components/blocks/empty-state"
import { InviteTeam } from "@/components/blocks/invite-team"
import { FileUpload } from "@/components/blocks/file-upload"
import { NotificationCard } from "@/components/blocks/notification-card"
import { DataTableDemo } from "@/components/blocks/data-table-demo"

const blockComponents: Record<string, React.ComponentType> = {
  "stats-overview": StatsOverview,
  "recent-activity": RecentActivity,
  "form-card": FormCard,
  "empty-state": EmptyState,
  "invite-team": InviteTeam,
  "file-upload": FileUpload,
  "notification-card": NotificationCard,
  "data-table-demo": DataTableDemo,
}

type Props = {
  slug: string
  code: string
}

export function BlockPreview({ slug, code }: Props) {
  const BlockComponent = blockComponents[slug]

  return (
    <div className="flex flex-col gap-8">
      {/* Preview pane, full width, no configurator */}
      <div className="flex flex-col gap-0 overflow-hidden border">
        {/* Toolbar */}
        <div className="flex items-center border-b bg-muted/30 px-4 py-2">
          <span className="text-xs font-medium text-muted-foreground">Preview</span>
        </div>

        {/* Preview area, inherits page theme */}
        <div className="flex min-h-[320px] items-center justify-center p-10 bg-background">
          {BlockComponent ? <BlockComponent /> : (
            <p className="text-sm text-muted-foreground">Preview unavailable</p>
          )}
        </div>
      </div>

      {/* Code output */}
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Code
        </p>
        <CodeBlock code={code} />
      </div>
    </div>
  )
}
