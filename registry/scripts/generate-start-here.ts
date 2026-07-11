/**
 * Generates index.html, offline Getting Started (no sidebar, self-contained).
 * Run: npm run start-here:generate
 * Also runs as part of npm run registry:generate
 */

import { readFileSync, writeFileSync } from "fs"
import { resolve } from "path"
import {
  NS_GLOBALS,
  CLAUDE_GETTING_STARTED_PROMPT,
  CREATE_APP,
  CURSOR_BOOTSTRAP_ONLY_PROMPT,
  CURSOR_FULL_SETUP_PROMPT,
  CURSOR_TROUBLESHOOTING_PROMPT,
  SCAFFOLD_SHELL,
} from "../src/lib/docs-setup-commands"
import {
  REGISTRY_DIR_NAME,
} from "../src/lib/setup-repo"

const ROOT = resolve(__dirname, "..")
const OUT = resolve(ROOT, "index.html")

const CURSOR_SKILLS_PROMPT = `@ns-get-started @ns-vibe-start

I want to start a new North Star product with the full app shell.

REGISTRY_DIR: [paste path to saved design system kit, not opened in Cursor]
MY_APP_DIR: [paste your project folder, the folder open in Cursor]

Read skills from REGISTRY_DIR/.cursor/skills/ and run bootstrap, then the app shell.`

const CURSOR_BOOTSTRAP_SKILL_PROMPT = `@ns-get-started

Bootstrap my North Star app only, do NOT add the app shell.

REGISTRY_DIR: [paste path to saved design system kit, not opened in Cursor]
MY_APP_DIR: [paste your project folder, the folder open in Cursor]

Read ns-get-started from REGISTRY_DIR/.cursor/skills/. Stop after bootstrap, no scaffold:shell, no /login, no /dashboard.`

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

function code(text: string): string {
  return `<code>${esc(text)}</code>`
}

function pre(text: string): string {
  return `<pre class="code">${esc(text)}</pre>`
}

function h3(id: string, title: string): string {
  return `<h3 id="${id}" class="step-title">${esc(title)}</h3>`
}

function li(text: string): string {
  return `<li>${text}</li>`
}

function ul(items: string[]): string {
  return `<ul>${items.map(li).join("")}</ul>`
}

function calloutNeutral(title: string, body: string): string {
  return `<div class="callout neutral"><p class="callout-title">${esc(title)}</p>${body}</div>`
}

function calloutWarning(body: string): string {
  return `<div class="callout warning">${body}</div>`
}

function optionLabel(letter: string, title: string): string {
  return `<p class="option-label">Option ${letter}, ${esc(title)}</p>`
}

function optionBAccordion(title: string, body: string): string {
  return `<details class="option-accordion">
  <summary>Option B, ${esc(title)}</summary>
  <div class="option-accordion-body">${body}</div>
</details>`
}

function stepList(items: string[]): string {
  return `<ol class="steps">${items
    .map(
      (text, i) =>
        `<li><span class="step-num">${i + 1}</span><span>${text}</span></li>`
    )
    .join("")}</ol>`
}

function section(id: string, title: string, body: string): string {
  return `<section id="${id}"><h2>${esc(title)}</h2>${body}</section>`
}

function platformSection(id: string, title: string, body: string): string {
  return `<section class="platform" id="${id}"><h2>${esc(title)}</h2>${body}</section>`
}

function loadThemeCss(): string {
  const globals = readFileSync(resolve(ROOT, "src/app/globals.css"), "utf-8")
  const agCore = readFileSync(resolve(ROOT, "src/themes/ag-core.css"), "utf-8")
  const neutralStart = globals.indexOf(":root {")
  const neutralEnd = globals.indexOf("\n}", neutralStart) + 2
  const neutral =
    neutralStart >= 0 ? globals.slice(neutralStart, neutralEnd) : ""
  return `${neutral}\n${agCore}`
}

const FONT_LINKS = `
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Atkinson+Hyperlegible+Mono:wght@400;700&amp;family=Atkinson+Hyperlegible+Next:wght@300;400;700&amp;family=Bitter:wght@400&amp;display=swap" rel="stylesheet" />
`

function buildCss(): string {
  return `
${loadThemeCss()}

html {
  --font-sans: "Atkinson Hyperlegible Next", ui-sans-serif, system-ui, sans-serif;
  --font-display: "Bitter", ui-serif, Georgia, serif;
  --font-mono: "Atkinson Hyperlegible Mono", ui-monospace, monospace;
}

* { box-sizing: border-box; border-color: var(--border); }

html {
  font-family: var(--font-sans);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.625;
  color: var(--muted-foreground);
  background: var(--background);
}

.wrap {
  max-width: 48rem;
  margin: 0 auto;
  padding: 2.5rem 1.5rem 4rem;
}

header { margin-bottom: 2rem; }

h1 {
  font-family: var(--font-display);
  font-size: 2.25rem;
  font-weight: 400;
  line-height: 1.1;
  letter-spacing: -0.025em;
  color: var(--foreground);
  margin: 0 0 0.5rem;
}

.lead {
  margin: 0;
  max-width: 36rem;
  color: var(--muted-foreground);
}

h2 {
  font-family: var(--font-display);
  font-size: 1.875rem;
  font-weight: 400;
  line-height: 1.2;
  letter-spacing: -0.025em;
  color: var(--foreground);
  margin: 0 0 0.75rem;
  scroll-margin-top: 1.5rem;
}

h3.step-title {
  font-family: var(--font-sans);
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.4;
  color: var(--foreground);
  margin: 2rem 0 0.75rem;
  scroll-margin-top: 1.5rem;
}

section { margin-bottom: 2.5rem; }

section.platform {
  padding-top: 1.5rem;
  border-top: 1px solid var(--border);
}

p { margin: 0 0 0.75rem; }

strong { font-weight: 500; color: var(--foreground); }

code {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  background: color-mix(in srgb, var(--muted) 80%, transparent);
  padding: 0.125rem 0.375rem;
  border-radius: var(--radius, 4px);
  color: var(--foreground);
}

pre.code {
  margin: 0 0 1rem;
  padding: 0.75rem 3rem 0.75rem 0.75rem;
  background: color-mix(in srgb, var(--muted) 60%, transparent);
  border: 1px solid var(--border);
  border-radius: var(--radius, 4px);
  font-family: var(--font-mono);
  font-size: 0.75rem;
  line-height: 1.625;
  color: color-mix(in srgb, var(--foreground) 90%, transparent);
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-word;
}

ul { margin: 0 0 1rem; padding: 0; list-style: none; }

ul li {
  display: flex;
  gap: 0.5rem;
  align-items: flex-start;
  margin-bottom: 0.5rem;
}

ul li::before {
  content: "";
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--muted-foreground);
  margin-top: 0.5rem;
  flex-shrink: 0;
}

ol.steps { list-style: none; margin: 0 0 1rem; padding: 0; display: flex; flex-direction: column; gap: 0.75rem; }

ol.steps li { display: flex; gap: 0.75rem; align-items: flex-start; }

.step-num {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
  border: 1px solid var(--border);
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--foreground);
}

.callout {
  padding: 1rem;
  margin-bottom: 2rem;
  border: 1px solid var(--border);
  border-radius: var(--radius, 4px);
}

.callout.neutral {
  background: color-mix(in srgb, var(--muted) 30%, transparent);
  color: var(--muted-foreground);
}

.callout.warning {
  background: #fefce8;
  border-color: #fde047;
  color: #713f12;
}

.callout.warning code {
  background: color-mix(in srgb, #fde047 35%, transparent);
}

.callout-title {
  font-weight: 500;
  color: var(--foreground);
  margin: 0 0 0.5rem;
}

.option-label {
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--muted-foreground);
  margin: 0 0 0.5rem;
}

.option-accordion {
  margin-top: 1.5rem;
  border-top: 1px solid var(--border);
}

.option-accordion summary {
  cursor: pointer;
  padding: 0.75rem 0;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--muted-foreground);
  list-style: none;
}

.option-accordion summary::-webkit-details-marker {
  display: none;
}

.option-accordion summary::after {
  content: "▾";
  float: right;
  font-size: 0.875rem;
  line-height: 1;
  transition: transform 0.2s ease;
}

.option-accordion:not([open]) summary::after {
  transform: rotate(-90deg);
}

.option-accordion-body {
  padding-bottom: 0.5rem;
}

.small { font-size: 0.875rem; }

.jump {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.jump a {
  color: var(--primary);
  text-decoration: underline;
  text-underline-offset: 4px;
  font-size: 0.875rem;
}

.jump a:hover { opacity: 0.85; }

.footer {
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--border);
  font-size: 0.8125rem;
  color: var(--muted-foreground);
}
`
}

function buildCursorGuide(): string {
  return `
${calloutNeutral(
  "Set up with Cursor Chat",
  `<p>Use skills or paste a prompt, then approve steps when Cursor asks. You do not need to run terminal commands yourself. When Cursor opens a terminal or asks to run something, click <strong>Allow</strong> or <strong>Run</strong>, that is normal.</p>`
)}

${calloutWarning(
  `<p><strong>PLEASE NOTE:</strong> Cursor may open a browser preview of the Project North Star during setup. You will see the docs (Getting Started, components, etc.), please note that is the registry downloading files in the background, <strong>not your app.</strong> You can close that preview or keep it open as a reference guide. Your app will open later (which can take up to 10 minutes) on a different localhost: with ${code("/login")} and ${code("/dashboard")}.</p>`
)}

${h3("cursor-step-0", "Step 0, Get the kit & open your project")}
<p>Do this once before Bootstrap + Shell. You work in your <strong>project folder</strong> in Cursor. The design system stays on disk as a reference kit, you do not open it as your workspace.</p>
<p><strong>Save the Project North Star kit on your computer.</strong> Ask engineering for the zip or shared drive link.</p>
<p>Your ${code("REGISTRY_DIR")} is the ${code(REGISTRY_DIR_NAME)} folder inside the kit (e.g. ${code("~/Projects/Project North Star/registry")}). It must contain ${code(".cursor/skills/")}, ${code("templates/app-shell/")}, and ${code("public/r/")}.</p>
${stepList([
  `Open <strong>Cursor</strong> on your computer.`,
  `<strong>File → Open Folder</strong> → create or choose your <strong>project folder</strong> (e.g. ${code("Desktop/my-product")}). It can be empty, Step 1 builds your app here. Do <strong>not</strong> open the design system folder.`,
  `Open Chat: <strong>View → Chat</strong> (or press ${code("Cmd + L")} on Mac, ${code("Ctrl + L")} on Windows).`,
])}
<p class="small"><strong>Updates:</strong> Ask engineering for an updated kit when new components or setup steps are published.</p>

${h3("cursor-step-1", "Step 1, Bootstrap + Shell")}
<p>With your <strong>project folder</strong> open in Cursor, one prompt creates your app, adds NS colors and fonts, then adds login, sidebar, dashboard, and sample charts. Paste both folder paths from Step 0.</p>
${optionLabel("A", "Recommended, use the skills")}
<p>In Chat, mention both skills (or paste the paths below if @ does not find them) and send:</p>
${pre(CURSOR_SKILLS_PROMPT)}
<p class="small">Cursor runs commands in both folders using the paths you provide. Approve each step when asked.</p>
${optionBAccordion(
  "Fallback, copy and paste a prompt",
  `<p>Use this if the skills are not available. Replace the bracketed paths, paste into Chat once, and send.</p>
${pre(CURSOR_FULL_SETUP_PROMPT)}`
)}

${h3("cursor-step-optional", "Optional, Bootstrap only (no shell)")}
<p>Use this only if you want NS colors and fonts on a blank app and will build your own layout, no login page, sidebar, or dashboard.</p>
${optionLabel("A", "Use the bootstrap skill only")}
${pre(CURSOR_BOOTSTRAP_SKILL_PROMPT)}
${optionLabel("B", "Fallback prompt")}
${pre(CURSOR_BOOTSTRAP_ONLY_PROMPT)}
<p class="small">To add the shell later, run ${code("@ns-vibe-start")} in a new Chat message.</p>

${h3("cursor-step-2", "Step 2, Check that it worked")}
<p>After Bootstrap + Shell (Step 1):</p>
${ul([
  "Your app opens on http://localhost:3000, not the design system docs site",
  "/login shows a sign-in page with North Star styling",
  "/dashboard shows a sidebar, top bar, and sample charts",
])}
<p>If you used bootstrap only (optional path):</p>
${ul([
  `Your app opens on ${code("http://localhost:3000")} with North Star styling on the default Next.js page, no ${code("/login")} or ${code("/dashboard")} yet`,
])}
<p>Something wrong? Paste this in Chat:</p>
${pre(CURSOR_TROUBLESHOOTING_PROMPT)}

${h3("cursor-step-3", "Step 3, What's next")}
${ul([
  "Keep using @ns-vibe-start when building pages and adding components",
  "Browse components on the design system site and ask Cursor to add what you need",
  "Demo login accepts any email and password, replace with real sign-in before launch",
  "Your app has a checklist at src/components/ag-shell/INSTALL.md after the shell is scaffolded",
])}
`
}

function buildClaudeGuide(): string {
  return `
${calloutNeutral(
  "Set up with Claude Code",
  `<p>Start Claude Code inside your kit's ${code(REGISTRY_DIR_NAME)} folder (${code("REGISTRY_DIR")}). It reads ${code("CLAUDE.md")} and the setup skills automatically. Approve terminal commands when asked.</p>`
)}

${h3("claude-step-0", "Step 0, Start Claude in the design system folder")}
<p>In Terminal, go to your kit's ${code(REGISTRY_DIR_NAME)} folder (${code("REGISTRY_DIR")}), then start Claude Code:</p>
${pre('cd "REGISTRY_DIR"\nclaude')}
<p>Your new app is a <strong>separate folder</strong>. Tell Claude both paths up front.</p>

${h3("claude-step-1", "Step 1, Bootstrap + Shell")}
<p>Paste this prompt (replace the bracketed paths with yours):</p>
${pre(CLAUDE_GETTING_STARTED_PROMPT)}
<p>Claude will run <strong>ns-get-started</strong> first (bootstrap), then <strong>ns-vibe-start</strong> for the app shell. Review each command before approving.</p>

${h3("claude-step-2", "Step 2, Commands Claude will use (reference)")}
<p class="option-label">Create app</p>
${pre(CREATE_APP)}
<p class="option-label">Scaffold shell (from REGISTRY_DIR)</p>
${pre(SCAFFOLD_SHELL)}
<p class="option-label">NS colors (registry dev server must be running)</p>
${pre(NS_GLOBALS)}
`
}

const html = `<!DOCTYPE html>
<html lang="en" data-theme="ag" class="light">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Start Here, Project North Star</title>
  ${FONT_LINKS}
  <style>${buildCss()}</style>
</head>
<body>
  <div class="wrap">
    <header>
      <h1>Start Here</h1>
      <p class="lead">Getting Started with the Project North Star, open this file in your browser before you open Cursor. Works offline; North Star fonts load when you are online.</p>
    </header>

    ${section(
      "overview",
      "Overview",
      `<p>The Project North Star is your team's shared library of buttons, navigation, charts, colors, and typography. You will create a new web app, apply North Star styling, and add a ready-made layout (login + dashboard) in one step with Cursor or Claude. You do <strong>not</strong> move the whole design system into your app, just copy what you need from it.</p>`
    )}

    ${section(
      "before-you-start",
      "Before you start",
      `<p>You will need:</p>
      ${ul([
        "Node.js on your computer (ask engineering if unsure)",
        "The Project North Star kit saved on your machine (ask engineering for the zip or shared drive link)",
        "A project folder for your new app, create it in Cursor before setup (Cursor Step 0)",
      ])}`
    )}

    ${section(
      "setup",
      "Setup",
      `<p>Jump to the path that matches how you work. <strong>Cursor</strong> runs <strong>Bootstrap + Shell</strong> in one step (recommended).</p>
      <nav class="jump" aria-label="Setup paths">
        <a href="#cursor">Cursor</a>
        <a href="#claude">Claude Code</a>
      </nav>`
    )}

    ${platformSection("cursor", "Cursor", buildCursorGuide())}
    ${platformSection("claude", "Claude Code", buildClaudeGuide())}

    ${section(
      "contributing",
      "Contributing",
      `<p>To propose a new component for this library, work with engineering, they maintain the registry files in this repo.</p>`
    )}

    <footer class="footer">
      <p>Generated from the Project North Star registry. When online, see the full docs site for component reference and Getting Started.</p>
    </footer>
  </div>
</body>
</html>
`

writeFileSync(OUT, html, "utf-8")
const repoRootOut = resolve(ROOT, "..", "index.html")
writeFileSync(repoRootOut, html, "utf-8")
console.log(`✓ index.html → ${OUT}`)
console.log(`✓ index.html → ${repoRootOut}`)
