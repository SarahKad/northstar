/** Canonical GitHub repo for the AG Design System (private, ask engineering for access). */
export const DESIGN_SYSTEM_GITHUB_URL = "https://github.com/skadlecek/AG-Design-System"

export const DESIGN_SYSTEM_GITHUB_CLONE = "https://github.com/skadlecek/AG-Design-System.git"

/** Subfolder inside a git clone — paste this path as REGISTRY_DIR. */
export const REGISTRY_DIR_NAME = "registry"

export const GIT_CLONE_COMMAND = `git clone ${DESIGN_SYSTEM_GITHUB_CLONE}`

/** Placeholder hint for REGISTRY_DIR in setup prompts. */
export const REGISTRY_DIR_PROMPT_HINT =
  "paste path to …/AG-Design-System/registry from your clone; do NOT open this folder in Cursor"

/** Folders that must exist under REGISTRY_DIR. */
export const REGISTRY_DIR_MARKERS = [".cursor/skills/", "templates/app-shell/", "public/r/"] as const
