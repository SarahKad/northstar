import { notFound } from "next/navigation"
import Link from "next/link"
import { getBlock, blocks, componentDocSlug } from "@/lib/blocks"
import { BlockPlayground } from "@/components/registry/block-playground"
import { Breadcrumbs } from "@/components/registry/breadcrumbs"
import { PageNav } from "@/components/registry/page-nav"
import { SubmitRequest } from "@/components/registry/submit-request"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export async function generateStaticParams() {
  return blocks.map((b) => ({ slug: b.slug }))
}

type Props = {
  params: Promise<{ slug: string }>
}

export default async function BlockPage({ params }: Props) {
  const { slug } = await params
  const block = getBlock(slug)

  if (!block) notFound()

  return (
    <article className="mx-auto max-w-4xl px-6 py-10">
      <Breadcrumbs />

      {/* Header */}
      <header className="mb-8">
        <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Block
        </p>
        <h1 className="text-4xl tracking-tight">{block.name}</h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">{block.description}</p>
      </header>

      {/* Used components */}
      {block.components.length > 0 && (
        <>
          <div className="mb-8 flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-muted-foreground">Uses:</span>
            {block.components.map((name) => {
              const href = `/components/${componentDocSlug(name)}`
              return (
                <Link key={name} href={href}>
                  <Badge variant="secondary" className="cursor-pointer hover:bg-muted">
                    {name}
                  </Badge>
                </Link>
              )
            })}
          </div>
          <Separator className="mb-8" />
        </>
      )}

      <section className="mb-10">
        <h2 className="mb-4">Playground</h2>
        <BlockPlayground block={block} />
      </section>

      <SubmitRequest />
      <PageNav />
    </article>
  )
}
