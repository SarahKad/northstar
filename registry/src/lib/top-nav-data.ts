type PropsMap = Record<string, string | boolean>

export type TopNavBreadcrumbItem = {
  label: string
  href?: string
}

export function buildTopNavBreadcrumbItems(props: PropsMap): TopNavBreadcrumbItem[] {
  const levels = String(props.breadcrumbLevels ?? "3")

  if (levels === "1") {
    return [{ label: String(props.breadcrumbTitle || "Button") }]
  }

  return [
    { label: String(props.breadcrumbTitle1 || "Home"), href: "#" },
    { label: String(props.breadcrumbTitle2 || "Components"), href: "#" },
    { label: String(props.breadcrumbTitle3 || "Button") },
  ]
}

export function formatTopNavBreadcrumbItemsCode(items: TopNavBreadcrumbItem[]): string {
  const linkedItems = items.filter((item) => item.href)

  return items
    .map((item) => {
      const label = item.label.replace(/\\/g, "\\\\").replace(/"/g, '\\"')
      if (item.href) {
        const linkIndex = linkedItems.indexOf(item)
        const href = linkIndex === 0 ? "/" : "/components"
        return `      { label: "${label}", href: "${href}" },`
      }
      return `      { label: "${label}" },`
    })
    .join("\n")
}
