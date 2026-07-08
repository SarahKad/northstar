import { DocsLayout } from "@/components/registry/docs-layout"
import { GettingStartedGuide } from "@/components/registry/getting-started-guide"
import type { Heading } from "@/components/registry/table-of-contents"

const headings: Heading[] = [
  { id: "overview", text: "Overview", level: 2 },
  { id: "before-you-start", text: "Before you start", level: 2 },
  { id: "setup", text: "Setup", level: 2 },
  { id: "contributing", text: "Contributing", level: 2 },
]

export default function GettingStartedPage() {
  return (
    <DocsLayout headings={headings}>
      <header className="mb-8">
        <h1 className="text-4xl tracking-tight">Getting Started</h1>
        <p className="mt-2 max-w-xl text-muted-foreground">
          Start a new AG product with the right layout, colors, and components. Pick how you work: Cursor or Claude Code.
        </p>
      </header>

      <div className="flex flex-col gap-10 text-sm leading-relaxed">
        <section>
          <h2 id="overview" className="mb-3 scroll-mt-6">Overview</h2>
          <p className="text-muted-foreground">
            The AG Design System is your team&apos;s shared library of buttons, navigation, charts, colors, and typography.
            You will create a new web app, apply AG styling, and add a ready-made layout (login + dashboard) in one step with Cursor or Claude.
            You do <strong className="font-normal text-foreground">not</strong> move the whole design system into your app, just copy what you need from it.
          </p>
        </section>

        <section>
          <h2 id="before-you-start" className="mb-3 scroll-mt-6">Before you start</h2>
          <p className="mb-3 text-muted-foreground">
            Offline or before you open Cursor? Open{" "}
            <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs">START_HERE.html</code> in this folder in any browser, same Getting Started content, no dev server required.
          </p>
          <p className="mb-3 text-muted-foreground">You will need:</p>
          <ul className="flex list-none flex-col gap-2 text-muted-foreground">
            {[
              "Node.js on your computer (ask engineering if unsure)",
              "A local copy of the AG Design System saved on your machine (see Cursor Step 0, your team or engineering provides this as a zip or folder)",
              "A project folder for your new app, create it in Cursor before setup (Cursor Step 0)",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-2">
                <span className="mt-1 size-1.5 shrink-0 rounded-full bg-muted-foreground" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 id="setup" className="mb-3 scroll-mt-6">Setup</h2>
          <p className="mb-6 text-muted-foreground">
            Choose the tab that matches how you work. The <strong className="font-normal text-foreground">Cursor</strong> tab runs{" "}
            <strong className="font-normal text-foreground">Bootstrap + Shell</strong> in one step (recommended). Bootstrap-only is optional.
            All paths end at a running app with AG styling and, for most users, login + dashboard.
          </p>
          <GettingStartedGuide />
        </section>

        <section>
          <h2 id="contributing" className="mb-3 scroll-mt-6">Contributing</h2>
          <p className="text-muted-foreground">
            To propose a new component for this library, work with engineering, they maintain the registry files in this repo.
            For shell install commands, see Getting Started → Cursor tab (Finish or redo shell) or the Claude Code reference section.
          </p>
        </section>
      </div>
    </DocsLayout>
  )
}
