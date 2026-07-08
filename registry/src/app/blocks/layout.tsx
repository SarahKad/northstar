export default function BlocksSegmentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="scrollbar-themed h-full min-h-0 flex-1 overflow-y-auto">
      {children}
    </div>
  )
}
