import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"

/** Level 4 (top) elevation for block surfaces — see /docs/elevation. */
export const blockElevationClass = "shadow-xl"

export function BlockCard({
  className,
  ...props
}: React.ComponentProps<typeof Card>) {
  return <Card className={cn(blockElevationClass, className)} {...props} />
}
