import { CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BlockCard } from "@/components/blocks/block-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const invites = [
  { email: "alex@example.com", role: "editor" },
  { email: "sam@example.com", role: "viewer" },
]

type Props = {
  props?: Record<string, string | boolean>
}

export function InviteTeam({ props: blockProps = {} }: Props) {
  const title = String(blockProps.title ?? "Invite Team")
  const description = String(blockProps.description ?? "Add members to your workspace")

  return (
    <BlockCard className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        {invites.map((invite) => (
          <div key={invite.email} className="flex items-center gap-2">
            <Input defaultValue={invite.email} className="flex-1" readOnly />
            <Select defaultValue={invite.role}>
              <SelectTrigger className="w-28">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="editor">Editor</SelectItem>
                <SelectItem value="viewer">Viewer</SelectItem>
              </SelectContent>
            </Select>
          </div>
        ))}
        <Button variant="outline" size="sm" className="self-start gap-1.5">
          + Add another
        </Button>
      </CardContent>
      <CardFooter>
        <Button className="w-full">Send Invites</Button>
      </CardFooter>
    </BlockCard>
  )
}
