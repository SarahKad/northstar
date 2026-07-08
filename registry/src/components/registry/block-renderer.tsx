"use client"

import { StatsOverview } from "@/components/blocks/stats-overview"
import { RecentActivity } from "@/components/blocks/recent-activity"
import { FormCard } from "@/components/blocks/form-card"
import { EmptyState } from "@/components/blocks/empty-state"
import { InviteTeam } from "@/components/blocks/invite-team"
import { FileUpload } from "@/components/blocks/file-upload"
import { NotificationCard } from "@/components/blocks/notification-card"
import { DataTablePlaygroundPreview } from "@/components/blocks/data-table-demo"

type BlockProps = Record<string, string | boolean>

type Props = {
  slug: string
  props: BlockProps
}

const blockRenderers: Record<string, (props: BlockProps) => React.ReactNode> = {
  "stats-overview": (p) => <StatsOverview props={p} />,
  "recent-activity": (p) => <RecentActivity props={p} />,
  "form-card": (p) => <FormCard props={p} />,
  "empty-state": (p) => <EmptyState props={p} />,
  "invite-team": (p) => <InviteTeam props={p} />,
  "file-upload": (p) => <FileUpload props={p} />,
  "notification-card": (p) => <NotificationCard props={p} />,
  "data-table-demo": (p) => (
    <div className="w-full">
      <DataTablePlaygroundPreview
        searchable={p.searchable !== false}
        pagination={p.pagination !== false}
        selectable={p.selectable !== false}
        columnVisibility={p.columnVisibility !== false}
      />
    </div>
  ),
}

export function BlockRenderer({ slug, props }: Props) {
  const render = blockRenderers[slug]
  if (!render) {
    return (
      <p className="text-sm text-muted-foreground">Preview unavailable</p>
    )
  }
  return render(props)
}
