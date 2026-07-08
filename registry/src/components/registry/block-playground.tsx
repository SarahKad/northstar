"use client"

import { useMemo, useState } from "react"
import type { BlockMeta } from "@/lib/blocks"
import { generateBlockCode } from "@/lib/block-code-generator"
import { PropsConfigurator } from "./props-configurator"
import { CodeBlock } from "./code-block"
import { BlockRenderer } from "./block-renderer"
import { PreviewFrame } from "./preview-frame"
import { NotificationCardVariantsGallery } from "@/components/blocks/notification-card"
import { cn } from "@/lib/utils"

type Props = {
  block: BlockMeta
}

export function BlockPlayground({ block }: Props) {
  const [propValues, setPropValues] = useState<Record<string, string | boolean>>(
    Object.fromEntries(block.props.map((p) => [p.name, p.defaultValue]))
  )

  const handleChange = (name: string, value: string | boolean) => {
    setPropValues((prev) => ({ ...prev, [name]: value }))
  }

  const code = useMemo(
    () => generateBlockCode(block.slug, propValues, block.code),
    [block.slug, block.code, propValues]
  )

  const isDataTableBlock = block.slug === "data-table-demo"
  const isNotificationCardBlock = block.slug === "notification-card"

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_260px]">
        <PreviewFrame
          areaClassName={cn(
            isDataTableBlock ? "min-h-[420px] p-6" : "min-h-[320px] p-10"
          )}
        >
          <BlockRenderer slug={block.slug} props={propValues} />
        </PreviewFrame>

        <div className="border bg-muted/20 p-4">
          <p className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Configure
          </p>
          <PropsConfigurator
            schema={block.props}
            values={propValues}
            onChange={handleChange}
          />
        </div>
      </div>

      {isNotificationCardBlock && (
        <div className="flex flex-col gap-3">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Variants
          </p>
          <PreviewFrame areaClassName="min-h-0 p-10">
            <NotificationCardVariantsGallery />
          </PreviewFrame>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Code
        </p>
        <CodeBlock code={code} />
      </div>
    </div>
  )
}
