"use client"

import { CheckCircle, XCircle } from "@phosphor-icons/react"

type Props = {
  doList?: string[]
  dontList?: string[]
}

export function DoDont({ doList, dontList }: Props) {
  if (!doList && !dontList) return null

  return (
    <section className="grid gap-6 sm:grid-cols-2">
      {doList && (
        <div>
          <h3 className="mb-3 flex items-center gap-1.5 text-sm font-medium text-primary">
            <CheckCircle className="size-4" />
            Do
          </h3>
          <ul className="flex flex-col gap-2">
            {doList.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="mt-0.5 size-1.5 shrink-0 rounded-full bg-primary" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
      {dontList && (
        <div>
          <h3 className="mb-3 flex items-center gap-1.5 text-sm font-medium text-destructive">
            <XCircle className="size-4" />
            Don&apos;t
          </h3>
          <ul className="flex flex-col gap-2">
            {dontList.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="mt-0.5 size-1.5 shrink-0 rounded-full bg-destructive" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  )
}
