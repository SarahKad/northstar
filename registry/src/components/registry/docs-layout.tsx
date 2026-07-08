import { Breadcrumbs } from "./breadcrumbs"
import { TableOfContents, type Heading } from "./table-of-contents"
import { PageNav } from "./page-nav"

type Props = {
  children: React.ReactNode
  headings?: Heading[]
}

export function DocsLayout({ children, headings = [] }: Props) {
  return (
    <div className="flex h-full min-h-0 w-full flex-1">
      {/* Scrollable article, TOC column stays fixed beside this pane */}
      <div className="scrollbar-themed min-h-0 flex-1 overflow-y-auto">
        <article className="mx-auto max-w-3xl px-6 py-10">
          <Breadcrumbs />
          {children}
          <PageNav />
        </article>
      </div>

      {/* Right TOC, does not scroll with article (desktop xl+) */}
      {headings.length > 0 && (
        <aside className="hidden shrink-0 overflow-y-auto px-4 py-10 xl:block xl:w-56">
          <TableOfContents headings={headings} />
        </aside>
      )}
    </div>
  )
}
