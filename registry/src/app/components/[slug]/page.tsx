import { notFound } from "next/navigation"
import { getComponent, uniqueComponents } from "@/lib/registry"
import { ComponentPlayground } from "@/components/registry/component-playground"
import { Breadcrumbs } from "@/components/registry/breadcrumbs"
import { PageNav } from "@/components/registry/page-nav"
import { SubmitRequest } from "@/components/registry/submit-request"
import { CodeBlock } from "@/components/registry/code-block"
import { Separator } from "@/components/ui/separator"
import { DoDont } from "@/components/registry/do-dont"

export async function generateStaticParams() {
  return uniqueComponents().map((c) => ({ slug: c.slug }))
}

type Props = {
  params: Promise<{ slug: string }>
}

export default async function ComponentPage({ params }: Props) {
  const { slug } = await params
  const component = getComponent(slug)

  if (!component) notFound()

  return (
    <article className="mx-auto max-w-4xl px-6 py-10">
      <Breadcrumbs />

      {/* Header */}
      <header className="mb-8">
        <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Component
        </p>
        <h1 className="text-4xl tracking-tight">{component.name}</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">{component.description}</p>
      </header>

      <Separator className="mb-8" />

      {/* Installation, hidden during Stage 1 (registry is a direct download, not a CLI package yet).
          To re-enable for Stage 2, change SHOW_INSTALL to true. */}
      {(() => { const SHOW_INSTALL = false; return SHOW_INSTALL && component.installCommand && (
        <section className="mb-8">
          <h2 className="mb-2">Installation</h2>
          <CodeBlock code={component.installCommand} />
        </section>
      ); })()}

      {/* Usage guidance */}
      <section className="mb-8">
        <h2 className="mb-2">Usage</h2>
        <p className="text-sm text-muted-foreground">{component.usage}</p>
      </section>

      {/* Playground */}
      <section className="mb-10">
        <h2 className="mb-4">Playground</h2>
        <ComponentPlayground component={component} />
      </section>

      {/* Do / Don't */}
      {(component.doList || component.dontList) && (
        <>
          <Separator className="mb-8" />
          <DoDont doList={component.doList} dontList={component.dontList} />
        </>
      )}

      <SubmitRequest />
      <PageNav />
    </article>
  )
}
