export default function DocsSegmentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="flex h-full min-h-0 flex-1">{children}</div>
}
