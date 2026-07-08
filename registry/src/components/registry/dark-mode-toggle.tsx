"use client"

import { Moon, Sun } from "@phosphor-icons/react"
import { useTheme } from "@/components/registry/theme-provider"
import { Button } from "@/components/ui/button"

export function DarkModeToggle() {
  const { resolvedMode, setColorMode } = useTheme()

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Toggle dark mode"
      onClick={() => setColorMode(resolvedMode === "dark" ? "light" : "dark")}
    >
      <Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  )
}
