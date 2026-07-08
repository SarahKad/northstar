"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Upload } from "@phosphor-icons/react"

type Props = {
  props?: Record<string, string | boolean>
}

export function FileUpload({ props: blockProps = {} }: Props) {
  const title = String(blockProps.title ?? "File Upload")
  const description = String(blockProps.description ?? "Drag and drop or browse")
  const hint = String(blockProps.hint ?? "PNG, JPG, PDF up to 10MB")

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center gap-3 border border-dashed py-12 text-center">
          <div className="flex size-10 items-center justify-center border">
            <Upload className="size-4 text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm font-medium">Upload files</p>
            <p className="mt-0.5 text-xs text-muted-foreground">{hint}</p>
          </div>
          <Button variant="outline" size="sm">Browse Files</Button>
        </div>
      </CardContent>
    </Card>
  )
}
