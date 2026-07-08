import figma from "@figma/code-connect"
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./card"
import { Button } from "./button"

figma.connect(
  Card,
  "https://www.figma.com/design/QzVtvlJNZmTVRYUSUsa8c3/Ministry-Credentials?node-id=162-131",
  {
    props: {
      title:       figma.string("Title"),
      description: figma.string("Description"),
      showFooter:  figma.boolean("Show Footer"),
      footerCta:   figma.string("Footer CTA"),
    },
    example: ({ title, description, showFooter, footerCta }) => (
      <Card className="w-[360px]">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Card content area</p>
        </CardContent>
        {showFooter && (
          <CardFooter>
            <Button variant="outline">{footerCta}</Button>
          </CardFooter>
        )}
      </Card>
    ),
  }
)
