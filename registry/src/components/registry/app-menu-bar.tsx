"use client"

import { useSidebar } from "@/components/ui/sidebar"
import {
  MenuBar,
  MenuBarMenu,
  MenuBarTrigger,
  MenuBarContent,
  MenuBarItem,
  MenuBarSeparator,
  MenuBarShortcut,
} from "@/components/ui/menu-bar"

/**
 * Application menu bar, matches the Menu Bar component playground demo.
 */
export function AppMenuBar() {
  const { toggleSidebar } = useSidebar()

  return (
    <MenuBar>
      <MenuBarMenu>
        <MenuBarTrigger>File</MenuBarTrigger>
        <MenuBarContent>
          <MenuBarItem>
            New File <MenuBarShortcut>⌘N</MenuBarShortcut>
          </MenuBarItem>
          <MenuBarItem>
            Open… <MenuBarShortcut>⌘O</MenuBarShortcut>
          </MenuBarItem>
          <MenuBarSeparator />
          <MenuBarItem>
            Save <MenuBarShortcut>⌘S</MenuBarShortcut>
          </MenuBarItem>
        </MenuBarContent>
      </MenuBarMenu>
      <MenuBarMenu>
        <MenuBarTrigger>Edit</MenuBarTrigger>
        <MenuBarContent>
          <MenuBarItem>
            Undo <MenuBarShortcut>⌘Z</MenuBarShortcut>
          </MenuBarItem>
          <MenuBarItem>
            Redo <MenuBarShortcut>⌘⇧Z</MenuBarShortcut>
          </MenuBarItem>
          <MenuBarSeparator />
          <MenuBarItem>Cut</MenuBarItem>
          <MenuBarItem>Copy</MenuBarItem>
        </MenuBarContent>
      </MenuBarMenu>
      <MenuBarMenu>
        <MenuBarTrigger>View</MenuBarTrigger>
        <MenuBarContent>
          <MenuBarItem>Zoom In</MenuBarItem>
          <MenuBarItem>Zoom Out</MenuBarItem>
          <MenuBarSeparator />
          <MenuBarItem onClick={toggleSidebar}>Toggle Sidebar</MenuBarItem>
        </MenuBarContent>
      </MenuBarMenu>
    </MenuBar>
  )
}
