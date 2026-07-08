import { cn } from "@/lib/utils"

/**
 * A single navigation link entry within a side-nav section.
 * @property label - Display text for the link.
 * @property href - URL the link navigates to.
 * @property active - When `true`, marks this link as the current page (`aria-current="page"`).
 */
export type SideNavItem = {
  label: string
  href: string
  active?: boolean
}

/**
 * A named group of navigation links in the side nav.
 * @property id - Unique identifier used as the React key for this section.
 * @property label - Section heading displayed in uppercase above the links.
 * @property items - Ordered list of navigation links in this section.
 */
export type SideNavSection = {
  id: string
  label: string
  items: SideNavItem[]
}

/**
 * Props for the SideNav component.
 * @property sections - Array of labeled sections, each containing navigation links.
 * @property className - Additional CSS classes for the outer `<nav>` element.
 */
type SideNavProps = {
  sections: SideNavSection[]
  className?: string
}

/**
 * @description Vertical sidebar navigation that renders one or more labeled
 * sections, each containing a list of `SideNavLink` anchors. Active links are
 * highlighted and receive `aria-current="page"`.
 *
 * Pass your page structure via the `sections` prop, each section has a heading
 * and an array of link items.
 *
 * @example
 * <SideNav
 *   sections={[
 *     {
 *       id: "main",
 *       label: "Main",
 *       items: [
 *         { label: "Dashboard", href: "/", active: true },
 *         { label: "Settings", href: "/settings" },
 *       ],
 *     },
 *   ]}
 * />
 */
function SideNav({ sections, className }: SideNavProps) {
  return (
    <nav
      data-slot="side-nav"
      className={cn("flex flex-col gap-6 w-52", className)}
    >
      {sections.map((section) => (
        <div key={section.id} className="flex flex-col gap-0.5">
          <p className="mb-1.5 px-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {section.label}
          </p>
          {section.items.map((item) => (
            <SideNavLink key={item.label} href={item.href} active={item.active}>
              {item.label}
            </SideNavLink>
          ))}
        </div>
      ))}
    </nav>
  )
}

/**
 * Props for SideNavLink.
 * @property active - When `true`, applies active highlight styling and sets
 *   `aria-current="page"` for accessibility.
 */
type SideNavLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  active?: boolean
}

/**
 * @description An individual navigation link rendered as an `<a>` tag. Used by
 * `SideNav` automatically, but can also be used standalone for custom layouts.
 *
 * When `active` is `true` the link receives a muted background, bold text, and
 * `aria-current="page"`.
 *
 * @example
 * <SideNavLink href="/reports" active>Reports</SideNavLink>
 * <SideNavLink href="/settings">Settings</SideNavLink>
 */
function SideNavLink({ className, active, children, ...props }: SideNavLinkProps) {
  return (
    <a
      data-slot="side-nav-link"
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex items-center rounded-md px-2 py-1.5 text-sm transition-colors outline-none",
        "hover:bg-muted hover:text-foreground",
        "focus-visible:ring-2 focus-visible:ring-ring/50",
        active
          ? "bg-muted text-foreground font-medium"
          : "text-muted-foreground",
        className
      )}
      {...props}
    >
      {children}
    </a>
  )
}

export { SideNav, SideNavLink }
