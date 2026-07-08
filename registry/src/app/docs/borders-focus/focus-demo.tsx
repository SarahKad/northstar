"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function FocusDemo() {
  return (
    <div className="rounded-lg border bg-card p-6">
      <p className="mb-4 text-xs text-muted-foreground uppercase tracking-wider font-medium">
        Live demo, press <kbd className="font-mono px-1 py-0.5 rounded border text-xs">Tab</kbd> to move focus
      </p>
      <div className="flex flex-wrap items-end gap-6">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="focus-demo-input">Email</Label>
          <Input
            id="focus-demo-input"
            type="email"
            placeholder="name@example.com"
            className="w-56"
          />
        </div>
        <Button>Subscribe</Button>
        <Button variant="outline">Cancel</Button>
        <Button variant="destructive">Delete</Button>
      </div>
    </div>
  )
}
