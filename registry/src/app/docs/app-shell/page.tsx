import { redirect } from "next/navigation"

/** Legacy URL, app shell setup is now part of Getting Started. */
export default function AppShellRedirectPage() {
  redirect("/docs/getting-started#cursor-step-optional-shell")
}
