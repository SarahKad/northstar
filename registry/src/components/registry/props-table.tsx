import type { ApiPropSchema } from "@/lib/registry"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type Props = {
  props: ApiPropSchema[]
}

export function PropsTable({ props }: Props) {
  if (props.length === 0) return null

  return (
    <section>
      <h2 className="mb-4">Props</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[140px]">Prop</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="w-[120px]">Default value</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {props.map((prop) => (
            <TableRow key={prop.name}>
              <TableCell className="align-top font-mono text-xs text-foreground">
                {prop.name}
              </TableCell>
              <TableCell className="align-top font-mono text-xs text-muted-foreground">
                {prop.type}
              </TableCell>
              <TableCell className="align-top font-mono text-xs text-muted-foreground">
                {prop.default ?? ", "}
              </TableCell>
              <TableCell className="align-top text-sm text-muted-foreground">
                {prop.description}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  )
}
