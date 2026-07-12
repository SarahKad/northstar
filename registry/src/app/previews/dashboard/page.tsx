import { Breadcrumbs } from "@/components/registry/breadcrumbs"
import { PageNav } from "@/components/registry/page-nav"
import { LeadsDashboard } from "@/components/previews/leads-dashboard"

export default function DashboardPreviewPage() {
  return (
    <div className="scrollbar-themed min-h-0 flex-1 overflow-y-auto">
      <article className="mx-auto max-w-6xl px-6 py-10">
        <Breadcrumbs />
        <header className="mb-8">
          <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            System Preview
          </p>
          <h1 className="text-4xl tracking-tight">Dashboard Preview</h1>
          <p className="mt-2 max-w-2xl text-muted-foreground">
            A composed Leads dashboard built only from existing registry components,
            cards, tabs, selects, button groups, charts, tooltips, and separators.
          </p>
        </header>

        <LeadsDashboard />

        <PageNav />
      </article>
    </div>
  )
}
