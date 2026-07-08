"use client"

import { useState, useCallback } from "react"
import { Check, Copy } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"
import { highlightCode, splitCodeBlocks } from "@/lib/highlight-code"

type Props = {
  code: string
  className?: string
  /** Icon-only copy control (recommended for docs setup steps). */
  iconOnly?: boolean
  /** Smaller monospace text for documentation. */
  compact?: boolean
  /** Apply TS/JSX syntax highlighting. Off for shell commands when compact. */
  highlight?: boolean
  /** Split import statements into a separate block above usage. */
  splitImports?: boolean
}

function CodeBlockPanel({
  code,
  copied,
  onCopy,
  iconOnly,
  compact,
  highlight,
}: {
  code: string
  copied: boolean
  onCopy: () => void
  iconOnly: boolean
  compact: boolean
  highlight: boolean
}) {
  return (
    <div className="relative rounded-lg bg-muted/70">
      <button
        type="button"
        onClick={onCopy}
        aria-label="Copy to clipboard"
        title={copied ? "Copied" : "Copy"}
        className={cn(
          "absolute right-2 top-2 z-10 flex items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-background hover:text-foreground",
          iconOnly ? "size-8" : "size-8"
        )}
      >
        {copied ? (
          <Check className="size-4 text-primary" />
        ) : (
          <Copy className="size-4" />
        )}
      </button>
      <pre
        className={cn(
          "overflow-x-auto leading-relaxed",
          compact ? "p-3 pr-12 text-xs" : "p-4 pr-12 text-sm"
        )}
      >
        <code className="font-mono text-foreground">
          {highlight ? highlightCode(code) : code}
        </code>
      </pre>
    </div>
  )
}

export function CodeBlock({
  code,
  className,
  iconOnly = true,
  compact = false,
  highlight = !compact,
  splitImports = true,
}: Props) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null)
  const blocks = splitImports && highlight ? splitCodeBlocks(code) : [code]

  const handleCopy = useCallback(async (block: string, index: number) => {
    await navigator.clipboard.writeText(block)
    setCopiedIndex(index)
    setTimeout(() => setCopiedIndex(null), 2000)
  }, [])

  if (blocks.length === 1) {
    return (
      <div className={className}>
        <CodeBlockPanel
          code={blocks[0]}
          copied={copiedIndex === 0}
          onCopy={() => handleCopy(blocks[0], 0)}
          iconOnly={iconOnly}
          compact={compact}
          highlight={highlight}
        />
      </div>
    )
  }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      {blocks.map((block, index) => (
        <CodeBlockPanel
          key={index}
          code={block}
          copied={copiedIndex === index}
          onCopy={() => handleCopy(block, index)}
          iconOnly={iconOnly}
          compact={compact}
          highlight={highlight}
        />
      ))}
    </div>
  )
}
