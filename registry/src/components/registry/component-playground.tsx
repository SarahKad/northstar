"use client"

import { useState, useMemo } from "react"
import { ComponentConfig } from "@/lib/registry"
import { codeGenerators } from "@/lib/code-generator"
import { PropsConfigurator } from "./props-configurator"
import { CodeBlock } from "./code-block"
import { ComponentRenderer } from "./component-renderer"
import { PropsTable } from "./props-table"
import { PreviewFrame } from "./preview-frame"
import { cn } from "@/lib/utils"

type Props = {
  component: ComponentConfig
}

export function ComponentPlayground({ component }: Props) {
  const [propValues, setPropValues] = useState<Record<string, string | boolean>>(
    Object.fromEntries(
      component.props.map((p) => [p.name, p.defaultValue])
    )
  )

  const handleChange = (name: string, value: string | boolean) => {
    setPropValues((prev) => ({ ...prev, [name]: value }))
  }

  const code = useMemo(() => {
    const gen = codeGenerators[component.slug]
    return gen ? gen(propValues) : "// No code generator for this component"
  }, [component.slug, propValues])

  const isSidebarPreview = component.slug === "sidebar"
  const isChartPreview = component.slug.startsWith("chart-")
  const isDataTablePreview = component.slug === "data-table"

  return (
    <div className="flex flex-col gap-8">
      {/* Preview + Configurator */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_260px]">
        <PreviewFrame
          areaClassName={cn(
            isSidebarPreview
              ? "min-h-[520px] p-4"
              : isChartPreview || isDataTablePreview
                ? "min-h-[420px] p-6"
                : "min-h-[280px] p-10"
          )}
        >
          <ComponentRenderer slug={component.slug} props={propValues} />
        </PreviewFrame>

        {/* Configurator panel */}
        <div className="border bg-muted/20 p-4">
          <p className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Configure
          </p>
          <PropsConfigurator
            schema={component.props}
            values={propValues}
            onChange={handleChange}
          />
        </div>
      </div>

      {/* Code output */}
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Code
        </p>
        <CodeBlock code={code} />
      </div>

      {component.apiProps && component.apiProps.length > 0 && (
        <PropsTable props={component.apiProps} />
      )}
    </div>
  )
}
