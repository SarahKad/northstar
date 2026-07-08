# AG App Shell template

A starter layout for new AG web apps: sign-in page, navigation, and a sample dashboard.

## Who this is for

Teams starting a **new website-style product** on the AG stack. Follow **Getting Started** in the docs (Cursor or Claude Code tabs).

## Install into a new project

1. Finish **Getting Started** (Cursor creates your app and runs setup), or create the app manually.
2. From the **design system** folder (the `registry` folder you saved on your computer):

```bash
cd "REGISTRY_DIR"
npm run scaffold:shell -- "MY_APP_DIR"
```

Replace `REGISTRY_DIR` and `MY_APP_DIR` with your real folder paths (see the docs callout “Before you run the commands below”).

3. Open **`INSTALL.md`** inside your app (`src/components/ag-shell/INSTALL.md`) and finish the checklist.

## Not included

- Real login security (demo sign-in only)  
- Mobile apps (Expo / React Native)  
