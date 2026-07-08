# App shell, checklist for your new app

You should see this file **inside your app project** after running the scaffold step from the design system docs.

Work through the sections in order. If you get stuck, share this file with someone on engineering, they will know what each step means.

---

## Find your two folders first

| What | How to recognize it |
|------|---------------------|
| **Design system folder** | The `registry` folder inside your git clone of [AG-Design-System](https://github.com/skadlecek/AG-Design-System) (your `REGISTRY_DIR`) |
| **Your app folder** | The new project `create-next-app` created for your product |

**Mac tip:** In Terminal, type `cd ` (with a space), drag the folder from Finder into Terminal, press Enter.

In the commands below, replace:

- `REGISTRY_DIR` → full path to the `registry` folder in your clone  
- `MY_APP_DIR` → full path to your app folder  

Example:

```bash
cd "/Users/you/Projects/AG-Design-System/registry"
npm run scaffold:shell -- "/Users/you/Projects/my-app"
```

---

## 1. Before you begin

- [ ] You finished **Getting Started, Step 1** (created your app and ran shadcn init)  
- [ ] AG colors/styles are added (Getting Started, Step 3), or engineering confirmed they are  
- [ ] You know where both folders live on your computer  

---

## 2. Theme on every page (usually engineering)

Your app needs one layout file so light/dark mode and AG colors work everywhere.

**Who:** Someone comfortable editing code.  
**File:** `MY_APP_DIR/src/app/layout.tsx`  
**What to add:** See the Theme setup code block in Getting Started → Cursor tab (Finish or redo shell) or Claude Code tab (Commands reference), or copy from `templates/app-shell`.

The sign-in page should **not** use the sidebar layout, that is already handled for you.

---

## 3. Download buttons, sidebar, charts, etc.

The design system must be running so `shadcn` can download UI files over HTTP.

### Using Cursor Chat (recommended)

You do **not** need to open the design system in your browser. Cursor runs it in the background to download components.

- If Cursor opens a preview showing **Getting Started** or **component docs**, that is the **design system site, not your app**. Close it.
- Your app will open later on **`http://localhost:3000`** with `/login` and `/dashboard`.

The `@ag-vibe-start` skill uses `npm run dev:install` on port **3002** so your app can use port **3000**.

### Using Terminal (two windows)

#### Part A, Start the design system site

Open Terminal, go to the design system folder, start the site:

```bash
cd "REGISTRY_DIR"
npm run dev
```

Leave this Terminal window open. You may open **http://localhost:3000** in your browser to confirm the design system loads (optional, the install script only needs the server running).

#### Part B, Install into your app

Open a **second** Terminal window:

```bash
cd "MY_APP_DIR"
export AG_REGISTRY_URL="http://localhost:3000"
bash src/components/ag-shell/install-components.sh
```

Wait until it finishes (may take a few minutes).

**If your team hosts the design system online** instead of localhost, ask them for the website address and use that instead of `http://localhost:3000`.

---

## 4. Try it in the browser

Stop the design system dev server first if it is still running (Terminal users). Cursor users: the agent should stop the install server on port 3002 automatically.

In your app folder:

```bash
cd "MY_APP_DIR"
npm run dev
```

Open the link Terminal prints. Your **app** should be on **http://localhost:3000** (not the design system docs site).

| Check | What you should see |
|-------|---------------------|
| Sign-in | A login form, any email/password works (demo only) |
| Dashboard | Sidebar, top bar, cards, table, and charts |
| Dark mode | Toggle if your layout includes it, colors should still look correct |

**Not your app:** pages titled Getting Started, component galleries, or the AG Design System docs, that is the registry site in `REGISTRY_DIR`.

---

## 5. Make it yours

- Change menu items and app name (engineering: `app-nav-config.ts`, `app-sidebar.tsx`)  
- Remove demo sections from the sample dashboard as you build real features (`dashboard-showcase.tsx`)  
- **Before launch:** replace demo sign-in with your real login system (`auth.ts`, `middleware.ts`)  

---

## 6. If charts are blank

Usually one of these was skipped:

1. AG colors/themes not added (Getting Started Step 3)  
2. Install script (section 3) did not finish successfully  
3. Design system site was not running at localhost during install  

Ask engineering to verify, charts need theme colors and the chart files from the install step.
