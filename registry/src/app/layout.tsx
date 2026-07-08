import type { Metadata } from "next"
import { Atkinson_Hyperlegible_Next, Instrument_Serif, Geist_Mono, Montserrat } from "next/font/google"
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

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
})

export const metadata: Metadata = {
  title: "AG Design System",
  description: "Assemblies of God component registry and documentation",
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
      className={cn("h-full antialiased font-sans light", atkinson.variable, instrumentSerif.variable, geistMono.variable, montserrat.variable)}
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
