import type { Metadata } from "next"
import { Atkinson_Hyperlegible_Next, Atkinson_Hyperlegible_Mono, Bitter } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import { ThemeProvider } from "@/components/registry/theme-provider"
import { ProductThemeProvider } from "@/components/registry/product-theme-provider"
import { AppShell } from "@/components/registry/app-shell"
import { cn } from "@/lib/utils"

// Runs before React hydrates, applies dark/light class to <html> without flash
const themeInitScript = `(function(){try{var t=localStorage.getItem('colorMode');var d=t==='dark'||(t==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d);document.documentElement.classList.toggle('light',!d);var ct=localStorage.getItem('colorTheme')||'ag';document.documentElement.dataset.theme=ct;}catch(e){}})();`

const atkinson = Atkinson_Hyperlegible_Next({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-sans",
})

const bitter = Bitter({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
})

const atkinsonMono = Atkinson_Hyperlegible_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Project North Star",
  description: "Project North Star component registry and documentation",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      data-theme="ag"
      className={cn("h-full antialiased font-sans light", atkinson.variable, bitter.variable, atkinsonMono.variable)}
    >
      <body className="h-full">
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: themeInitScript }}
        />
        <ThemeProvider>
          <ProductThemeProvider>
            <AppShell>{children}</AppShell>
          </ProductThemeProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
