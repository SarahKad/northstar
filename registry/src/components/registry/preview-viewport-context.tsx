"use client"

import { createContext, useContext } from "react"

export type PreviewViewportMode = "desktop" | "mobile"

const PreviewViewportContext = createContext<PreviewViewportMode>("desktop")

export function PreviewViewportProvider({
  mode,
  children,
}: {
  mode: PreviewViewportMode
  children: React.ReactNode
}) {
  return (
    <PreviewViewportContext.Provider value={mode}>
      {children}
    </PreviewViewportContext.Provider>
  )
}

export function usePreviewViewport(): PreviewViewportMode {
  return useContext(PreviewViewportContext)
}
