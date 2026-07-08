"use client"

import { createContext, useContext, useEffect, useState, useCallback } from "react"
import { DEFAULT_THEME_ID, getTheme, themes, type ThemeDefinition } from "@/themes"

/** Light / dark / system preference */
type ColorMode = "light" | "dark" | "system"

type ThemeContextValue = {
  /** Current color mode preference (may be "system") */
  colorMode: ColorMode
  /** Resolved color mode, always "light" or "dark", never "system" */
  resolvedMode: "light" | "dark"
  /** Active color theme id (e.g. "ag") */
  colorTheme: string
  /** Active theme definition */
  themeDefinition: ThemeDefinition
  /** All registered themes, use to build a theme switcher UI */
  availableThemes: ThemeDefinition[]
  /** Switch light / dark / system preference */
  setColorMode: (mode: ColorMode) => void
  /** Switch the active color theme */
  setColorTheme: (themeId: string) => void
}

const ThemeContext = createContext<ThemeContextValue>({
  colorMode: "light",
  resolvedMode: "light",
  colorTheme: DEFAULT_THEME_ID,
  themeDefinition: getTheme(DEFAULT_THEME_ID),
  availableThemes: themes,
  setColorMode: () => {},
  setColorTheme: () => {},
})

export function useTheme() {
  return useContext(ThemeContext)
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function getSystemMode(): "light" | "dark" {
  if (typeof window === "undefined") return "light"
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

function resolveMode(mode: ColorMode): "light" | "dark" {
  return mode === "system" ? getSystemMode() : mode
}

function applyColorMode(resolved: "light" | "dark") {
  const root = document.documentElement
  root.classList.toggle("dark", resolved === "dark")
  root.classList.toggle("light", resolved === "light")
}

function applyColorTheme(themeId: string) {
  document.documentElement.dataset.theme = themeId
}

// ── Provider ──────────────────────────────────────────────────────────────────

type ThemeProviderProps = {
  children: React.ReactNode
  /** Default color theme to apply. Overridden by localStorage if present. */
  defaultTheme?: string
}

export function ThemeProvider({ children, defaultTheme = DEFAULT_THEME_ID }: ThemeProviderProps) {
  const [colorMode, setColorModeState] = useState<ColorMode>("light")
  const [resolvedMode, setResolvedMode] = useState<"light" | "dark">("light")
  const [colorTheme, setColorThemeState] = useState<string>(defaultTheme)

  // Hydrate from localStorage on mount
  useEffect(() => {
    const storedMode = (localStorage.getItem("colorMode") as ColorMode | null) ?? "light"
    const storedTheme = localStorage.getItem("colorTheme") ?? defaultTheme

    const resolved = resolveMode(storedMode)
    setColorModeState(storedMode)
    setResolvedMode(resolved)
    setColorThemeState(storedTheme)

    applyColorMode(resolved)
    applyColorTheme(storedTheme)
  }, [defaultTheme])

  // React to system preference changes when mode is "system"
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    const handler = () => {
      if (colorMode === "system") {
        const resolved = getSystemMode()
        setResolvedMode(resolved)
        applyColorMode(resolved)
      }
    }
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [colorMode])

  const setColorMode = useCallback((mode: ColorMode) => {
    setColorModeState(mode)
    try { localStorage.setItem("colorMode", mode) } catch { /* private browsing */ }
    const resolved = resolveMode(mode)
    setResolvedMode(resolved)
    applyColorMode(resolved)
  }, [])

  const setColorTheme = useCallback((themeId: string) => {
    setColorThemeState(themeId)
    try { localStorage.setItem("colorTheme", themeId) } catch { /* private browsing */ }
    applyColorTheme(themeId)
  }, [])

  return (
    <ThemeContext.Provider value={{
      colorMode,
      resolvedMode,
      colorTheme,
      themeDefinition: getTheme(colorTheme),
      availableThemes: themes,
      setColorMode,
      setColorTheme,
    }}>
      {children}
    </ThemeContext.Provider>
  )
}
