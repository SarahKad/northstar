"use client"

import { CardContent } from "@/components/ui/card"
import { BlockCard } from "@/components/blocks/block-card"
import { Button } from "@/components/ui/button"
import { Users } from "@phosphor-icons/react"

type Props = {
  props?: Record<string, string | boolean>
}

export function EmptyState({ props: blockProps = {} }: Props) {
  const title = String(blockProps.title ?? "No team members")
  const description = String(
    blockProps.description ?? "Invite your team to collaborate on this project."
  )
  const buttonLabel = String(blockProps.buttonLabel ?? "Invite Members")

  return (
    <BlockCard className="flex w-full max-w-sm flex-col items-center justify-center py-14 text-center">
      <CardContent className="flex flex-col items-center gap-4 pt-0">
        <div className="flex size-12 items-center justify-center border">
          <Users className="size-5 text-muted-foreground" />
        </div>
        <div>
          <p className="font-medium">{title}</p>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
        <Button>{buttonLabel}</Button>
      </CardContent>
    </BlockCard>
  )
}
