export type MenuBarItemDef =
  | { type: "item"; label: string; shortcut?: string }
  | { type: "separator" }

export type MenuBarMenuDef = {
  label: string
  items: MenuBarItemDef[]
}

export const MENUBAR_MENU_DEFINITIONS: MenuBarMenuDef[] = [
  {
    label: "File",
    items: [
      { type: "item", label: "New File", shortcut: "⌘N" },
      { type: "item", label: "Open…", shortcut: "⌘O" },
      { type: "separator" },
      { type: "item", label: "Save", shortcut: "⌘S" },
    ],
  },
  {
    label: "Edit",
    items: [
      { type: "item", label: "Undo", shortcut: "⌘Z" },
      { type: "item", label: "Redo", shortcut: "⌘⇧Z" },
      { type: "separator" },
      { type: "item", label: "Cut" },
      { type: "item", label: "Copy" },
    ],
  },
  {
    label: "View",
    items: [
      { type: "item", label: "Zoom In" },
      { type: "item", label: "Zoom Out" },
      { type: "separator" },
      { type: "item", label: "Toggle Sidebar" },
    ],
  },
  {
    label: "Help",
    items: [
      { type: "item", label: "Documentation" },
      { type: "item", label: "Keyboard Shortcuts" },
      { type: "separator" },
      { type: "item", label: "About" },
    ],
  },
]

export function getMenuBarMenus(menuCount: string | boolean): MenuBarMenuDef[] {
  const count = Math.min(4, Math.max(2, Number(menuCount) || 3))
  return MENUBAR_MENU_DEFINITIONS.slice(0, count)
}
