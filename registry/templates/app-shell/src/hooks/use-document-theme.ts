"use client"

import * as React from "react"
import { DEFAULT_THEME_ID } from "@/themes"

export function useDocumentThemeId(): string {
  const [themeId, setThemeId] = React.useState(DEFAULT_THEME_ID)

  React.useEffect(() => {
    const read = () => {
      setThemeId(document.documentElement.dataset.theme ?? DEFAULT_THEME_ID)
    }
    read()
    const observer = new MutationObserver(read)
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    })
    return () => observer.disconnect()
  }, [])

  return themeId
}
