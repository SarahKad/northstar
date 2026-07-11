/** Subfolder inside the design system kit — paste this path as REGISTRY_DIR. */
export const REGISTRY_DIR_NAME = "registry"

/** Placeholder hint for REGISTRY_DIR in setup prompts. */
export const REGISTRY_DIR_PROMPT_HINT =
  "paste path to …/Project North Star/registry from your kit; do NOT open this folder in Cursor"

/** Folders that must exist under REGISTRY_DIR. */
export const REGISTRY_DIR_MARKERS = [".cursor/skills/", "templates/app-shell/", "public/r/"] as const
