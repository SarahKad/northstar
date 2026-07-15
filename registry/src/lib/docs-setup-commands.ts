/** Shared copy-paste commands for setup docs (Cursor and Claude Code tabs). */

import { REGISTRY_DIR_PROMPT_HINT } from "@/lib/setup-repo"

/** Registry URL while browsing docs or running manual install scripts. */
export const REGISTRY_URL = "http://localhost:3000"

/** Registry URL for background component installs (Cursor/agent, port 3002, do not preview). */
export const REGISTRY_INSTALL_URL = "http://localhost:3002"

export const CREATE_APP = `npx create-next-app@latest "my-app" --typescript --tailwind --app --yes`

export const CREATE_APP_AFTER = `# Go into your new app folder (replace with your path):
cd "MY_APP_DIR"

npx shadcn@latest init --yes`

export const SCAFFOLD_SHELL = `# Go to the design system folder you saved (replace REGISTRY_DIR):
cd "REGISTRY_DIR"

# Copy the starter layout into your app (replace MY_APP_DIR):
npm run scaffold:shell -- "MY_APP_DIR"

cd "MY_APP_DIR"
# Then read: src/components/ag-shell/INSTALL.md`

export const NS_GLOBALS = `npx shadcn@latest add ${REGISTRY_URL}/r/ag-globals`

/** @deprecated Use NS_GLOBALS */
export const AG_GLOBALS = NS_GLOBALS

export const NS_GLOBALS_INSTALL = `npx shadcn@latest add ${REGISTRY_INSTALL_URL}/r/ag-globals`

/** @deprecated Use NS_GLOBALS_INSTALL */
export const AG_GLOBALS_INSTALL = NS_GLOBALS_INSTALL

export const ADD_BUTTON = `npx shadcn@latest add ${REGISTRY_URL}/r/button`

export const REGISTRY_DEV = `cd "REGISTRY_DIR"
npm run dev`

export const REGISTRY_DEV_INSTALL = `cd "REGISTRY_DIR"
npm run dev:install`

export const REGISTRY_STOP_INSTALL = `lsof -ti :3002 | xargs kill -9 2>/dev/null || true`

export const INSTALL_COMPONENTS = `cd "MY_APP_DIR"
export NS_REGISTRY_URL="${REGISTRY_URL}"
bash src/components/ag-shell/install-components.sh`

export const INSTALL_COMPONENTS_CURSOR = `cd "MY_APP_DIR"
export NS_REGISTRY_URL="${REGISTRY_INSTALL_URL}"
bash src/components/ag-shell/install-components.sh`

export const APP_DEV = `cd "MY_APP_DIR"
npm run dev`

export const FONT_IMPORTS = `import { Atkinson_Hyperlegible_Next, Atkinson_Hyperlegible_Mono, Bitter } from "next/font/google"

const fontSans = Atkinson_Hyperlegible_Next({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-sans",
})
const fontDisplay = Bitter({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
})
const fontMono = Atkinson_Hyperlegible_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
})`

export const HTML_FONTS = `<html className={\`\${fontSans.variable} \${fontDisplay.variable} \${fontMono.variable}\`}>`

export const ROOT_LAYOUT = `import { ThemeProvider } from "@/components/ag-shell/theme-provider"
import Script from "next/script"
import "./globals.css"

const themeInitScript = \`(function(){try{var t=localStorage.getItem('colorMode');var d=t==='dark'||(t==='system'&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',d);document.documentElement.classList.toggle('light',!d);var ct=localStorage.getItem('colorTheme')||'ns-pro';document.documentElement.dataset.theme=ct;}catch(e){}})();\`

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning data-theme="ns-pro">
      <body>
        <Script id="theme-init" strategy="beforeInteractive" dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}`

/** Primary Cursor path, bootstrap + app shell in one session. */
export const CURSOR_FULL_SETUP_PROMPT = `I'm starting a new North Star product with the full app shell (login, sidebar, dashboard).

My folders:
- REGISTRY_DIR: [${REGISTRY_DIR_PROMPT_HINT}]
- MY_APP_DIR: [paste the project folder I already opened in Cursor, e.g. Desktop/my-product]

Run the full setup in this session:
1. Read and follow ns-get-started from REGISTRY_DIR/.cursor/skills/, bootstrap (create app, NS colors, fonts)
2. Read and follow ns-vibe-start from REGISTRY_DIR/.cursor/skills/, app shell (scaffold:shell, install-components.sh, ThemeProvider, /login, /dashboard)

Run commands against those paths even if they are not the Cursor workspace root. Do NOT stop after bootstrap.
Use npm run dev:install in REGISTRY_DIR (port 3002) for shadcn installs, do NOT open the registry in Simple Browser.
Stop the registry install server before starting MY_APP_DIR on port 3000.
Ask me to approve each step. Explain what you're doing in plain language.
When done, confirm /login and /dashboard work on my app, not the design system docs site.`

/** Optional Cursor path, bootstrap only, no shell. */
export const CURSOR_BOOTSTRAP_ONLY_PROMPT = `Bootstrap my North Star app only, do NOT add the app shell.

My folders:
- REGISTRY_DIR: [${REGISTRY_DIR_PROMPT_HINT}]
- MY_APP_DIR: [paste the project folder I already opened in Cursor]

Bootstrap only:
1. Read and follow ONLY ns-get-started from REGISTRY_DIR/.cursor/skills/
2. Create the app (create-next-app + shadcn init) in MY_APP_DIR if it does not exist yet
3. Add NS colors and styles using npm run dev:install in REGISTRY_DIR (port 3002)
4. Add North Star fonts in src/app/layout.tsx
5. Stop the registry install server, start MY_APP_DIR on port 3000, confirm North Star styling on the default Next.js page

Do NOT run ns-vibe-start. Do NOT run scaffold:shell or install-components.sh. Do NOT add ThemeProvider, /login, or /dashboard.

Do NOT open Simple Browser for the registry. If a preview opens showing Getting Started or component docs, tell me that is the design system site, not my app.
Ask me to approve each step. STOP when bootstrap is complete and tell me how to add the shell later with @ns-vibe-start if I want it.`

/** @deprecated Use CURSOR_FULL_SETUP_PROMPT or CURSOR_BOOTSTRAP_ONLY_PROMPT */
export const CURSOR_GETTING_STARTED_PROMPT = CURSOR_FULL_SETUP_PROMPT

/** Recovery prompt when Bootstrap+Shell failed or user scaffolded manually. */
export const CURSOR_APP_SHELL_PROMPT = `Continue app shell setup for my North Star app.

REGISTRY_DIR: [${REGISTRY_DIR_PROMPT_HINT}]
MY_APP_DIR: [paste app folder path]

The app already has scaffold files from npm run scaffold:shell.
1) Start npm run dev:install in REGISTRY_DIR (port 3002, background, do NOT open Simple Browser for the registry)
2) Run install-components.sh from MY_APP_DIR with NS_REGISTRY_URL=http://localhost:3002
3) Stop the registry install server, wire ThemeProvider in src/app/layout.tsx
4) Start npm run dev in MY_APP_DIR on port 3000 and verify /login and /dashboard

If Cursor opens Getting Started or component docs in a preview, tell me that is the design system site, not my app.`

export const REGISTRY_URL_EXPORT = `export NS_REGISTRY_URL="${REGISTRY_URL}"`

export const CURSOR_VIBE_START_PROMPT = `Scaffold the North Star app shell for my product.

REGISTRY_DIR: [${REGISTRY_DIR_PROMPT_HINT}]
MY_APP_DIR: [paste your app folder path]

My app is already bootstrapped with NS colors and fonts. Please:
1. Run npm run scaffold:shell from REGISTRY_DIR
2. Start npm run dev:install in REGISTRY_DIR (port 3002, background only, do NOT open Simple Browser for the registry)
3. Run install-components.sh from MY_APP_DIR with NS_REGISTRY_URL=http://localhost:3002
4. Stop the registry install server, wire ThemeProvider in src/app/layout.tsx
5. Start MY_APP_DIR on port 3000 and verify /login and /dashboard

Use the ns-vibe-start skill. Do NOT preview the registry in the browser, if Cursor opens Getting Started or component docs, tell me that is not my app.
Ask before running commands. Explain in plain language.`

export const CURSOR_TROUBLESHOOTING_PROMPT = `Something didn't work during Project North Star setup.

REGISTRY_DIR: [${REGISTRY_DIR_PROMPT_HINT}]
MY_APP_DIR: [paste your app folder path]

Walk me through troubleshooting using src/components/ag-shell/INSTALL.md in my app.
Explain fixes in plain language and ask before running commands.`

export const CLAUDE_GETTING_STARTED_PROMPT = `I'm starting a new North Star product from the Project North Star registry.

REGISTRY_DIR: [${REGISTRY_DIR_PROMPT_HINT}]
MY_APP_DIR: [paste path to new app folder]

Follow CLAUDE.md. Run ns-get-started first (bootstrap), then ns-vibe-start for app shell.
Use REGISTRY_DIR for scaffold commands and http://localhost:3000 for shadcn installs while npm run dev runs in REGISTRY_DIR.`
