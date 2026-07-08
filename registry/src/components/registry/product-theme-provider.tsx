"use client"

import { createContext, useContext } from "react"

/**
 * ProductThemeProvider is a thin passthrough context kept for backwards
 * compatibility with any component that still calls useProductTheme().
 * Data-theme management is handled exclusively by ThemeProvider, this
 * provider intentionally does NOT touch document.documentElement or
 * data-theme attributes, which was the root cause of the dark-mode
 * "bunch of outlines" bug (data-theme being stripped on re-render).
 */
type ProductThemeContextValue = {
  productThemeId: string
  setProductThemeId: (id: string) => void
}

const ProductThemeContext = createContext<ProductThemeContextValue>({
  productThemeId: "base",
  setProductThemeId: () => {},
})

export function useProductTheme() {
  return useContext(ProductThemeContext)
}

export function ProductThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ProductThemeContext.Provider value={{ productThemeId: "base", setProductThemeId: () => {} }}>
      {children}
    </ProductThemeContext.Provider>
  )
}
