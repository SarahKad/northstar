import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BlockCard } from "@/components/blocks/block-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Props = {
  props?: Record<string, string | boolean>
}

export function FormCard({ props: blockProps = {} }: Props) {
  const title = String(blockProps.title ?? "Profile")
  const description = String(blockProps.description ?? "Manage your account information.")
  const showFooter = blockProps.showFooter !== false

  return (
    <BlockCard className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-1.5">
          <Label htmlFor="fc-name">Name</Label>
          <Input id="fc-name" defaultValue="Sarah Chen" readOnly />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="fc-email">Email</Label>
          <Input id="fc-email" type="email" defaultValue="sarah@example.com" readOnly />
        </div>
        <div className="grid gap-1.5">
          <Label htmlFor="fc-role">Role</Label>
          <Input id="fc-role" defaultValue="Product Designer" readOnly />
        </div>
      </CardContent>
      {showFooter && (
        <CardFooter className="justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Save changes</Button>
        </CardFooter>
      )}
    </BlockCard>
  )
}
