import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

/** Level 1 elevation for block surfaces — see /docs/elevation. */
export const blockElevationClass = "shadow-sm"

export function BlockCard({
  className,
  ...props
}: React.ComponentProps<typeof Card>) {
  return <Card className={cn(blockElevationClass, className)} {...props} />
}
