"use client"

import { Menu } from "@base-ui/react/menu"
import { CaretUpDown, Check, Desktop, Moon, Sun } from "@phosphor-icons/react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useTheme } from "@/components/registry/theme-provider"
import { cn } from "@/lib/utils"

const USER = {
  name: "Jane Doe",
  email: "user@ag.org",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
  initials: "JD",
}

function ThemeSwatch({ themeId }: { themeId: string }) {
  const swatchColour: Record<string, string> = {
    ag:       "#DA2919",  /* AG red */
    navy:     "#002B65",  /* Navy blue */
    "bep-pro": "#1A56DB",  /* BEP Blue */
  }
  const colour = swatchColour[themeId] ?? "var(--muted-foreground)"
  return (
    <span
      className="size-2.5 shrink-0 rounded-full ring-1 ring-border"
      style={{ backgroundColor: colour }}
    />
  )
}

/**
 * Sidebar footer user control, bordered trigger (registry style) with avatar,
 * name, and email. Theme and color mode live in the dropdown menu.
 */
export function SidebarUserFooter() {
  const {
    colorTheme,
    availableThemes,
    setColorTheme,
    colorMode,
    setColorMode,
  } = useTheme()

  return (
    <Menu.Root>
      <Menu.Trigger
        className={cn(
          "flex w-full items-center gap-2 rounded-lg border border-border",
          "bg-background px-2.5 py-2 text-left outline-none",
          "hover:bg-muted transition-colors",
          "focus-visible:ring-2 focus-visible:ring-ring/50",
          "group-data-[collapsible=icon]:size-8 group-data-[collapsible=icon]:w-8 group-data-[collapsible=icon]:min-w-8 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-0"
        )}
        aria-label={`${USER.name}, ${USER.email}`}
      >
        <Avatar size="sm" className="size-8 shrink-0">
          <AvatarImage src={USER.avatar} alt={USER.name} />
          <AvatarFallback>{USER.initials}</AvatarFallback>
        </Avatar>
        <div className="grid min-w-0 flex-1 text-left leading-tight group-data-[collapsible=icon]:hidden">
          <span className="truncate text-sm font-medium">{USER.name}</span>
          <span className="truncate text-xs text-muted-foreground">{USER.email}</span>
        </div>
        <CaretUpDown
          className="size-3 shrink-0 text-muted-foreground group-data-[collapsible=icon]:hidden"
          aria-hidden
        />
      </Menu.Trigger>

      <Menu.Portal>
        <Menu.Positioner
          sideOffset={6}
          align="start"
          className="z-50 w-[var(--anchor-width)] min-w-[12rem]"
        >
          <Menu.Popup
            className={cn(
              "overflow-hidden rounded-lg border border-border bg-popover p-1 shadow-md",
              "origin-[var(--transform-origin)] transition-[transform,scale,opacity] duration-100",
              "data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
              "data-[ending-style]:scale-95 data-[ending-style]:opacity-0"
            )}
          >
            <p className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
              Color theme
            </p>
            {availableThemes.map((theme) => (
              <Menu.Item
                key={theme.id}
                onClick={() => setColorTheme(theme.id)}
                className={cn(
                  "flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-xs outline-none",
                  "transition-colors duration-100",
                  "data-[highlighted]:bg-muted data-[highlighted]:text-foreground",
                  "active:scale-[0.98]"
                )}
              >
                <ThemeSwatch themeId={theme.id} />
                <span className="flex-1">{theme.name}</span>
                {theme.id === colorTheme && (
                  <Check className="size-3 shrink-0 text-primary" weight="bold" />
                )}
              </Menu.Item>
            ))}

            <div className="my-1 h-px bg-border" role="separator" />

            <p className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
              Appearance
            </p>
            {(
              [
                { mode: "light" as const, label: "Light", icon: Sun },
                { mode: "dark" as const, label: "Dark", icon: Moon },
                { mode: "system" as const, label: "System", icon: Desktop },
              ] as const
            ).map(({ mode, label, icon: Icon }) => (
              <Menu.Item
                key={mode}
                onClick={() => setColorMode(mode)}
                className={cn(
                  "flex cursor-pointer items-center gap-2.5 rounded-md px-2 py-1.5 text-xs outline-none",
                  "transition-colors duration-100",
                  "data-[highlighted]:bg-muted data-[highlighted]:text-foreground",
                  "active:scale-[0.98]"
                )}
              >
                <Icon className="size-4 shrink-0 text-muted-foreground" />
                <span className="flex-1">{label}</span>
                {colorMode === mode && (
                  <Check className="size-3 shrink-0 text-primary" weight="bold" />
                )}
              </Menu.Item>
            ))}
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  )
}
