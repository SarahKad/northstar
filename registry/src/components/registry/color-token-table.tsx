"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { Copy, Check } from "@phosphor-icons/react"

export type ColorTokenDef = {
  /** CSS custom property name, e.g. "--primary" */
  name: string
  /** Human-readable label */
  label: string
  /** One-line usage note */
  description?: string
  /** Hex source value (light mode) */
  hex: string
  /** Tailwind utility classes that reference this token */
  utilities?: string[]
}

// ─── Copy button ────────────────────────────────────────────────────────────

function CopyButton({ value, label, disabled }: { value: string; label?: string; disabled?: boolean }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = useCallback(() => {
    if (!value) return
    navigator.clipboard.writeText(value).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    })
  }, [value])

  return (
    <button
      onClick={handleCopy}
      aria-label={`Copy ${label ?? value}`}
      disabled={disabled}
      className="opacity-40 hover:opacity-100 transition-opacity shrink-0 disabled:pointer-events-none disabled:opacity-20"
    >
      {copied
        ? <Check className="size-3 text-primary" />
        : <Copy className="size-3" />
      }
    </button>
  )
}

// ─── Single row ─────────────────────────────────────────────────────────────

function ColorRow({ def }: { def: ColorTokenDef }) {
  const swatchRef = useRef<HTMLDivElement>(null)
  const [hex, setHex]       = useState("")
  const [rgbStr, setRgbStr] = useState("")

  useEffect(() => {
    if (!swatchRef.current) return

    const resolve = () => {
      // getComputedStyle in modern browsers may return oklch(), lab(), or rgb()
      // depending on the browser's internal representation, we can't rely on
      // parsing the string directly. Route it through a 1×1 canvas instead:
      // the 2D context always converts any valid CSS color to sRGB bytes.
      const computed = window.getComputedStyle(swatchRef.current!).backgroundColor
      if (!computed || computed === "rgba(0, 0, 0, 0)") return

      try {
        const canvas = document.createElement("canvas")
        canvas.width = canvas.height = 1
        const ctx = canvas.getContext("2d")
        if (!ctx) return
        ctx.fillStyle = computed
        ctx.fillRect(0, 0, 1, 1)
        const { data } = ctx.getImageData(0, 0, 1, 1)
        const [r, g, b] = [data[0], data[1], data[2]]
        setHex("#" + [r, g, b].map(n => n.toString(16).padStart(2, "0")).join("").toUpperCase())
        setRgbStr(`${r}, ${g}, ${b}`)
      } catch {
        // canvas unsupported, leave values empty
      }
    }

    resolve()

    // Re-resolve whenever dark/light class toggles on <html>
    const observer = new MutationObserver(resolve)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    return () => observer.disconnect()
  }, [])

  return (
    <div className="flex items-start gap-4 py-4 border-b border-border last:border-0">
      {/* Live swatch, background resolved from the CSS variable */}
      <div
        ref={swatchRef}
        className="size-12 shrink-0 rounded-sm border border-border mt-0.5"
        style={{ background: `var(${def.name})` }}
      />

      <div className="flex-1 min-w-0">
        {/* Label + Tailwind utility chips */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-0.5">
          <span className="text-sm font-medium">{def.label}</span>
          {def.utilities?.map(u => (
            <code
              key={u}
              className="text-[10px] font-mono bg-muted text-muted-foreground px-1.5 py-0.5 rounded"
            >
              {u}
            </code>
          ))}
        </div>

        {def.description && (
          <p className="text-xs text-muted-foreground mb-2">{def.description}</p>
        )}

        {/* Value grid: CSS var · HEX (source) · HEX (live) · RGB */}
        <div className="grid grid-cols-1 gap-y-1 sm:grid-cols-2 xl:grid-cols-3 sm:gap-x-6">
          {/* CSS */}
          <div className="flex items-center gap-1 min-w-0">
            <span className="text-[10px] font-mono text-muted-foreground w-[2.75rem] shrink-0">CSS</span>
            <code className="text-[11px] font-mono truncate">{def.name}</code>
            <CopyButton value={`var(${def.name})`} label={def.name} />
          </div>

          {/* HEX, live computed (respects dark mode) */}
          <div className="flex items-center gap-1">
            <span className="text-[10px] font-mono text-muted-foreground w-[2.75rem] shrink-0">HEX</span>
            <code className="text-[11px] font-mono">{hex || def.hex}</code>
            <CopyButton value={hex || def.hex} label="hex" />
          </div>

          {/* RGB */}
          <div className="flex items-center gap-1 min-w-0">
            <span className="text-[10px] font-mono text-muted-foreground w-[2.75rem] shrink-0">RGB</span>
            <code className="text-[11px] font-mono truncate">{rgbStr ? `rgb(${rgbStr})` : ", "}</code>
            <CopyButton value={rgbStr ? `rgb(${rgbStr})` : ""} label="RGB" disabled={!rgbStr} />
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Public export ───────────────────────────────────────────────────────────

export function ColorTokenTable({ tokens }: { tokens: ColorTokenDef[] }) {
  return (
    <div>
      {tokens.map(def => <ColorRow key={def.name} def={def} />)}
    </div>
  )
}
