"use client"

import { Menu } from "@base-ui/react/menu"
import { CaretUpDown, Check } from "@phosphor-icons/react"
import { useTheme } from "@/components/registry/theme-provider"
import { cn } from "@/lib/utils"

export function ThemeSwitcher() {
  const { colorTheme, availableThemes, setColorTheme } = useTheme()
  const active = availableThemes.find((t) => t.id === colorTheme) ?? availableThemes[0]

  return (
    <Menu.Root>
      <Menu.Trigger
        className={cn(
          "flex w-full items-center justify-between gap-2 rounded-lg border border-border",
          "bg-background px-2.5 py-1.5 text-xs font-medium text-foreground",
          "hover:bg-muted transition-colors outline-none",
          "focus-visible:ring-2 focus-visible:ring-ring/50",
        )}
      >
        <div className="flex items-center gap-2 min-w-0">
          {/* Colour swatch for active theme */}
          <ThemeSwatch themeId={active.id} />
          <span className="truncate">{active.name}</span>
        </div>
        <CaretUpDown className="size-3 shrink-0 text-muted-foreground" />
      </Menu.Trigger>

      <Menu.Portal>
        <Menu.Positioner sideOffset={6} align="start" className="z-50 w-[var(--anchor-width)] min-w-[10rem]">
          <Menu.Popup
            className={cn(
              "overflow-hidden rounded-lg border border-border bg-popover p-1 shadow-md",
              "origin-[var(--transform-origin)] transition-[transform,scale,opacity] duration-100",
              "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
              "data-[ending-style]:scale-95 data-[ending-style]:opacity-0",
            )}
          >
            {availableThemes.map((theme) => (
              <Menu.Item
                key={theme.id}
                onClick={() => setColorTheme(theme.id)}
                className={cn(
                  "flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-xs outline-none",
                  "transition-colors duration-100",
                  "data-[highlighted]:bg-muted data-[highlighted]:text-foreground",
                  "active:scale-[0.98]",
                )}
              >
                <ThemeSwatch themeId={theme.id} />
                <span className="flex-1">{theme.name}</span>
                {theme.id === colorTheme && (
                  <Check className="size-3 text-primary shrink-0" weight="bold" />
                )}
              </Menu.Item>
            ))}
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  )
}

/** Small circular swatch showing the brand colour for a theme */
function ThemeSwatch({ themeId }: { themeId: string }) {
  const swatchColour: Record<string, string> = {
    ag:   "#DA2919",  /* AG red */
    navy: "#002B65",  /* Navy blue */
  }
  const colour = swatchColour[themeId] ?? "var(--muted-foreground)"
  return (
    <span
      className="size-2.5 rounded-full shrink-0 ring-1 ring-border"
      style={{ backgroundColor: colour }}
    />
  )
}
