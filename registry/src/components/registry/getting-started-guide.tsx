"use client"

import { CodeBlock } from "@/components/registry/code-block"
import { DocsSetupTabs } from "@/components/registry/docs-setup-tabs"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  NS_GLOBALS,
  APP_DEV,
  CLAUDE_GETTING_STARTED_PROMPT,
  CREATE_APP,
  CURSOR_APP_SHELL_PROMPT,
  CURSOR_BOOTSTRAP_ONLY_PROMPT,
  CURSOR_FULL_SETUP_PROMPT,
  CURSOR_TROUBLESHOOTING_PROMPT,
  INSTALL_COMPONENTS,
  REGISTRY_DEV,
  ROOT_LAYOUT,
  SCAFFOLD_SHELL,
} from "@/lib/docs-setup-commands"
import {
  REGISTRY_DIR_MARKERS,
  REGISTRY_DIR_NAME,
  REGISTRY_DIR_PROMPT_HINT,
} from "@/lib/setup-repo"

function StepHeading({ id, n, title }: { id: string; n: number; title: string }) {
  return (
    <h3 id={id} className="mb-3 scroll-mt-6 text-base font-semibold text-foreground">
      Step {n}, {title}
    </h3>
  )
}

function OptionalHeading({ id, title }: { id: string; title: string }) {
  return (
    <h3 id={id} className="mb-3 scroll-mt-6 text-base font-semibold text-foreground">
      Optional, {title}
    </h3>
  )
}

function OptionLabel({ letter, title }: { letter: string; title: string }) {
  return (
    <p className="mb-2 text-xs font-medium text-muted-foreground">
      Option {letter}, {title}
    </p>
  )
}

function OptionBAccordion({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <Accordion className="mt-2 border-t border-border">
      <AccordionItem value="option-b">
        <AccordionTrigger className="py-3 text-xs font-medium text-muted-foreground hover:text-foreground">
          Option B, {title}
        </AccordionTrigger>
        <AccordionContent>{children}</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

function WhatYouGet() {
  return (
    <ul className="mb-4 flex list-none flex-col gap-2 text-muted-foreground">
      {[
        "A sign-in page (demo only, replace before launch)",
        "A dashboard with sidebar, top bar, and sample charts",
        "A checklist file (INSTALL.md) inside your app for remaining steps",
      ].map((item) => (
        <li key={item} className="flex items-start gap-2">
          <span className="mt-1 size-1.5 shrink-0 rounded-full bg-muted-foreground" />
          {item}
        </li>
      ))}
    </ul>
  )
}

function CursorGuide() {
  return (
    <div className="flex flex-col gap-10">
      <div className="border border-border bg-muted/30 px-4 py-4 text-muted-foreground">
        <p className="font-medium text-foreground">Set up with Cursor Chat</p>
        <p className="mt-2 text-sm">
          Use skills or paste a prompt, then approve steps when Cursor asks. You do not need to run terminal commands yourself.
          When Cursor opens a terminal or asks to run something, click <strong className="font-normal text-foreground">Allow</strong> or{" "}
          <strong className="font-normal text-foreground">Run</strong>, that is normal.
        </p>
      </div>

      <div className="border border-yellow-200 bg-yellow-50 px-4 py-4 text-yellow-900 dark:border-yellow-800/50 dark:bg-yellow-950/40 dark:text-yellow-100">
        <p className="text-sm opacity-90">
          <strong className="font-normal">PLEASE NOTE:</strong> Cursor may open a browser preview of Project North Star during setup. You will see the docs (Getting Started, components, etc.), please note that is the registry downloading files in the background,{" "}
          <strong className="font-normal">not your app.</strong> You can close that preview or keep it open as a reference guide. Your app will open later (which can take up to 10 minutes) on a different localhost: with{" "}
          <code className="rounded-md bg-yellow-100/80 px-1.5 py-0.5 font-mono text-xs dark:bg-yellow-900/40">/login</code> and{" "}
          <code className="rounded-md bg-yellow-100/80 px-1.5 py-0.5 font-mono text-xs dark:bg-yellow-900/40">/dashboard</code>.
        </p>
      </div>

      <section>
        <StepHeading id="cursor-step-0" n={0} title="Save the kit & open your project" />
        <p className="mb-4 text-muted-foreground">
          Do this once before Bootstrap + Shell. You work in your <strong className="font-normal text-foreground">project folder</strong> in Cursor. The design system stays on disk as a reference kit, you do not open it as your workspace.
        </p>
        <ol className="flex list-none flex-col gap-3 text-muted-foreground">
          <li className="flex gap-3">
            <span className="flex size-5 shrink-0 items-center justify-center border text-xs font-medium">1</span>
            <span>
              <strong className="font-normal text-foreground">Save the Project North Star kit on your computer.</strong>{" "}
              Your team or engineering provides this (zip, shared drive, or USB). Unzip if needed. You should see{" "}
              <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs">START_HERE.html</code> and a{" "}
              <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs">Project North Star</code> folder at the top level.
            </span>
          </li>
        </ol>
        <p className="mb-4 text-sm text-muted-foreground">
          Your <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs">REGISTRY_DIR</code> is the{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs">{REGISTRY_DIR_NAME}</code> folder inside the kit (e.g.{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs">~/Projects/Project North Star/registry</code>). It must contain{" "}
          {REGISTRY_DIR_MARKERS.map((m, i) => (
            <span key={m}>
              {i > 0 && (i === REGISTRY_DIR_MARKERS.length - 1 ? ", and " : ", ")}
              <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs">{m}</code>
            </span>
          ))}
          .
        </p>
        <ol className="flex list-none flex-col gap-3 text-muted-foreground" start={2}>
          <li className="flex gap-3">
            <span className="flex size-5 shrink-0 items-center justify-center border text-xs font-medium">2</span>
            <span>
              Open <strong className="font-normal text-foreground">Cursor</strong> on your computer.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="flex size-5 shrink-0 items-center justify-center border text-xs font-medium">3</span>
            <span>
              <strong className="font-normal text-foreground">File → Open Folder</strong> → create or choose your <strong className="font-normal text-foreground">project folder</strong> (e.g.{" "}
              <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs">Desktop/my-product</code>). It can be empty, Step 1 builds your app here. Do <strong className="font-normal text-foreground">not</strong> open the design system folder.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="flex size-5 shrink-0 items-center justify-center border text-xs font-medium">4</span>
            <span>
              Open Chat: <strong className="font-normal text-foreground">View → Chat</strong> (or press{" "}
              <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs">Cmd + L</code> on Mac,{" "}
              <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs">Ctrl + L</code> on Windows).
            </span>
          </li>
        </ol>
        <p className="mt-4 text-sm text-muted-foreground">
          <strong className="font-normal text-foreground">Updates:</strong> Ask engineering for an updated kit when new components or setup steps are published.
        </p>
      </section>

      <section>
        <StepHeading id="cursor-step-1" n={1} title="Bootstrap + Shell" />
        <p className="mb-4 text-muted-foreground">
          With your <strong className="font-normal text-foreground">project folder</strong> open in Cursor, one prompt creates your app, adds NS colors and fonts, then adds login, sidebar, dashboard, and sample charts. Paste both folder paths from Step 0.
        </p>
        <WhatYouGet />

        <OptionLabel letter="A" title="Recommended, use the skills" />
        <p className="mb-3 text-muted-foreground">
          In Chat, mention both skills (or paste the paths below if <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs">@</code> does not find them) and send:
        </p>
        <CodeBlock
          code={`@ns-get-started @ns-vibe-start

I want to start a new North Star product with the full app shell.

REGISTRY_DIR: [${REGISTRY_DIR_PROMPT_HINT}]
MY_APP_DIR: [paste your project folder, the folder open in Cursor]

Read skills from REGISTRY_DIR/.cursor/skills/ and run bootstrap, then the app shell.`}
          iconOnly
          compact
          className="mb-6"
        />
        <p className="mb-6 text-sm text-muted-foreground">
          Cursor runs commands in both folders using the paths you provide. Approve each step when asked.
        </p>

        <OptionBAccordion title="Fallback, copy and paste a prompt">
          <p className="mb-3 text-muted-foreground">
            Use this if the skills are not available. Replace the bracketed paths, paste into Chat once, and send.
          </p>
          <CodeBlock code={CURSOR_FULL_SETUP_PROMPT} iconOnly compact />
        </OptionBAccordion>
      </section>

      <section>
        <OptionalHeading id="cursor-step-optional-bootstrap" title="Bootstrap only (no shell)" />
        <p className="mb-4 text-muted-foreground">
          Use this only if you want NS colors and fonts on a blank app and will build your own layout, no login page, sidebar, or dashboard.
        </p>

        <OptionLabel letter="A" title="Use the bootstrap skill only" />
        <CodeBlock
          code={`@ns-get-started

Bootstrap my North Star app only, do NOT add the app shell.

REGISTRY_DIR: [${REGISTRY_DIR_PROMPT_HINT}]
MY_APP_DIR: [paste your project folder, the folder open in Cursor]

Read ns-get-started from REGISTRY_DIR/.cursor/skills/. Stop after bootstrap, no scaffold:shell, no /login, no /dashboard.`}
          iconOnly
          compact
          className="mb-6"
        />

        <OptionLabel letter="B" title="Fallback prompt" />
        <CodeBlock code={CURSOR_BOOTSTRAP_ONLY_PROMPT} iconOnly compact />
        <p className="mt-4 text-sm text-muted-foreground">
          To add the shell later, run <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs">@ns-vibe-start</code> in a new Chat message.
        </p>
      </section>

      <section>
        <OptionalHeading id="cursor-step-optional-shell" title="Finish or redo shell" />
        <p className="mb-3 text-muted-foreground">
          Use this if Bootstrap + Shell did not finish, you chose bootstrap-only, or you scaffolded the shell manually. With your app folder open in Cursor, paste this prompt (replace paths):
        </p>
        <CodeBlock code={CURSOR_APP_SHELL_PROMPT} iconOnly compact className="mb-4" />
        <p className="mb-3 text-sm text-muted-foreground">
          Manual fallback, only if you prefer commands over Chat:
        </p>
        <CodeBlock code={REGISTRY_DEV} iconOnly compact className="mb-4" />
        <CodeBlock code={INSTALL_COMPONENTS} iconOnly compact className="mb-4" />
        <p className="mb-3 text-muted-foreground">
          Ask Cursor to update your root layout with the North Star ThemeProvider, or paste:
        </p>
        <CodeBlock code={ROOT_LAYOUT} iconOnly compact />
      </section>

      <section>
        <StepHeading id="cursor-step-2" n={2} title="Check that it worked" />
        <p className="mb-3 text-muted-foreground">After Bootstrap + Shell (Step 1):</p>
        <ul className="mb-4 flex list-none flex-col gap-2 text-muted-foreground">
          {[
            "Your app opens on http://localhost:3000, not the design system docs site",
            "/login shows a sign-in page with North Star styling",
            "/dashboard shows a sidebar, top bar, and sample charts",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-1 size-1.5 shrink-0 rounded-full bg-muted-foreground" />
              {item}
            </li>
          ))}
        </ul>
        <p className="mb-3 text-muted-foreground">If you used bootstrap only (optional path):</p>
        <ul className="mb-4 flex list-none flex-col gap-2 text-muted-foreground">
          <li className="flex items-start gap-2">
            <span className="mt-1 size-1.5 shrink-0 rounded-full bg-muted-foreground" />
            Your app opens on{" "}
            <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs">http://localhost:3000</code> with North Star styling on the default Next.js page, no{" "}
            <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs">/login</code> or{" "}
            <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs">/dashboard</code> yet
          </li>
        </ul>
        <p className="mb-3 text-muted-foreground">Something wrong? Paste this in Chat:</p>
        <CodeBlock code={CURSOR_TROUBLESHOOTING_PROMPT} iconOnly compact />
      </section>

      <section>
        <StepHeading id="cursor-step-3" n={3} title="What's next" />
        <ul className="flex list-none flex-col gap-2 text-muted-foreground">
          {[
            "Keep using @ns-vibe-start when building pages and adding components",
            "Browse components on the design system site and ask Cursor to add what you need",
            "Demo login accepts any email and password, replace with real sign-in before launch",
            "Your app has a checklist at src/components/ag-shell/INSTALL.md after the shell is scaffolded",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="mt-1 size-1.5 shrink-0 rounded-full bg-muted-foreground" />
              {item}
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

function ClaudeGuide() {
  return (
    <div className="flex flex-col gap-10">
      <div className="border border-border bg-muted/30 px-4 py-4 text-muted-foreground">
        <p className="font-medium text-foreground">Set up with Claude Code</p>
        <p className="mt-2 text-sm">
          Start Claude Code inside your kit&apos;s{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs">{REGISTRY_DIR_NAME}</code> folder (
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs">REGISTRY_DIR</code>). It reads{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs">CLAUDE.md</code> and the setup skills automatically. Approve terminal commands when asked.
        </p>
      </div>

      <section>
        <StepHeading id="claude-step-0" n={0} title="Start Claude in the design system folder" />
        <p className="mb-3 text-muted-foreground">
          In Terminal, go to your kit&apos;s <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs">{REGISTRY_DIR_NAME}</code> folder (
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs">REGISTRY_DIR</code>), then start Claude Code:
        </p>
        <CodeBlock code={`cd "REGISTRY_DIR"\nclaude`} iconOnly compact />
        <p className="mt-3 text-muted-foreground">
          Your new app is a <strong className="font-normal text-foreground">separate folder</strong>. Tell Claude both paths up front.
        </p>
      </section>

      <section>
        <StepHeading id="claude-step-1" n={1} title="Bootstrap + Shell" />
        <p className="mb-3 text-muted-foreground">Paste this prompt (replace the bracketed paths with yours):</p>
        <CodeBlock code={CLAUDE_GETTING_STARTED_PROMPT} iconOnly compact />
        <p className="mt-3 text-muted-foreground">
          Claude will run <strong className="font-normal text-foreground">ns-get-started</strong> first (bootstrap), then{" "}
          <strong className="font-normal text-foreground">ns-vibe-start</strong> for the app shell. Review each command before approving.
        </p>
        <div className="mt-4">
          <WhatYouGet />
        </div>
      </section>

      <section>
        <StepHeading id="claude-step-2" n={2} title="Commands Claude will use (reference)" />
        <p className="mb-2 text-xs font-medium text-muted-foreground">Create app</p>
        <CodeBlock code={CREATE_APP} iconOnly compact className="mb-4" />
        <p className="mb-2 text-xs font-medium text-muted-foreground">Scaffold shell (from REGISTRY_DIR)</p>
        <CodeBlock code={SCAFFOLD_SHELL} iconOnly compact className="mb-4" />
        <p className="mb-2 text-xs font-medium text-muted-foreground">NS colors (registry dev server must be running)</p>
        <CodeBlock code={NS_GLOBALS} iconOnly compact className="mb-4" />
        <p className="mb-2 text-xs font-medium text-muted-foreground">Install UI pieces (registry dev running)</p>
        <CodeBlock code={INSTALL_COMPONENTS} iconOnly compact className="mb-4" />
        <p className="mb-2 text-xs font-medium text-muted-foreground">Theme setup</p>
        <CodeBlock code={ROOT_LAYOUT} iconOnly compact className="mb-4" />
        <p className="mb-2 text-xs font-medium text-muted-foreground">Open your app</p>
        <CodeBlock code={APP_DEV} iconOnly compact className="mb-4" />
        <p className="text-muted-foreground">
          Try <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs">/login</code> then{" "}
          <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs">/dashboard</code>. Demo login accepts any email/password, replace with real auth before production.
        </p>
      </section>

      <section>
        <OptionalHeading id="claude-step-optional-shell" title="Finish or redo shell" />
        <p className="mb-3 text-muted-foreground">
          If bootstrap finished but the shell did not, paste this recovery prompt (replace paths):
        </p>
        <CodeBlock code={CURSOR_APP_SHELL_PROMPT} iconOnly compact />
      </section>
    </div>
  )
}

export function GettingStartedGuide() {
  return (
    <DocsSetupTabs cursor={<CursorGuide />} claude={<ClaudeGuide />} />
  )
}
