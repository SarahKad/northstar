"use client"

import { PropSchema } from "@/lib/registry"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

type Props = {
  schema: PropSchema[]
  values: Record<string, string | boolean>
  onChange: (name: string, value: string | boolean) => void
}

export function PropsConfigurator({ schema, values, onChange }: Props) {
  return (
    <div className="flex flex-col gap-4">
      {schema.map((prop) => (
        <div key={prop.name} className="grid gap-1.5">
          <Label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            {prop.label}
          </Label>

          {prop.type === "select" && (
            <Select
              value={String(values[prop.name] ?? prop.defaultValue)}
              onValueChange={(v) => v !== null && onChange(prop.name, v)}
            >
              <SelectTrigger className="h-8 text-sm">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {prop.options?.map((opt) => (
                  <SelectItem key={opt} value={opt} className="text-sm">
                    {opt}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}

          {prop.type === "text" && (
            <Input
              className="h-8 text-sm"
              value={String(values[prop.name] ?? prop.defaultValue)}
              onChange={(e) => onChange(prop.name, e.target.value)}
            />
          )}

          {prop.type === "boolean" && (
            <div className="flex items-center gap-2">
              <button
                role="switch"
                aria-checked={Boolean(values[prop.name])}
                onClick={() => onChange(prop.name, !values[prop.name])}
                className="relative inline-flex h-5 w-9 shrink-0 cursor-pointer rounded-full border-2 border-transparent bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 aria-checked:bg-primary"
              >
                <span
                  className={`pointer-events-none inline-block size-4 rounded-full bg-background shadow-lg ring-0 transition-transform ${
                    values[prop.name] ? "translate-x-4" : "translate-x-0"
                  }`}
                />
              </button>
              <span className="text-sm text-muted-foreground">
                {values[prop.name] ? "Yes" : "No"}
              </span>
            </div>
          )}

          {prop.description && (
            <p className="text-xs text-muted-foreground/70">{prop.description}</p>
          )}
        </div>
      ))}
    </div>
  )
}
