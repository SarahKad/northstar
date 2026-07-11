import { CardAction, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BlockCard } from "@/components/blocks/block-card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

const transactions = [
  { name: "Blue Bottle Coffee", cat: "Food & Drink", date: "Today, 10:24 AM", amount: "-$6.50", positive: false },
  { name: "Whole Foods Market", cat: "Groceries", date: "Yesterday", amount: "-$142.30", positive: false },
  { name: "Stripe Payout", cat: "Income", date: "Oct 12", amount: "+$4,200.00", positive: true },
  { name: "Uber Technologies", cat: "Transport", date: "Oct 11", amount: "-$24.10", positive: false },
  { name: "Netflix", cat: "Entertainment", date: "Oct 10", amount: "-$19.99", positive: false },
]

type Props = {
  props?: Record<string, string | boolean>
}

export function RecentActivity({ props: blockProps = {} }: Props) {
  const title = String(blockProps.title ?? "Recent Activity")
  const description = String(blockProps.description ?? "Your latest transactions")
  const showViewAll = blockProps.showViewAll !== false

  return (
    <BlockCard className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
        {showViewAll && (
          <CardAction>
            <Button variant="ghost" size="sm">View all</Button>
          </CardAction>
        )}
      </CardHeader>
      <CardContent className="flex flex-col gap-0">
        {transactions.map((tx, i) => (
          <div key={tx.name}>
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="text-sm font-medium">{tx.name}</p>
                <p className="text-xs text-muted-foreground">{tx.cat} · {tx.date}</p>
              </div>
              <span className={`text-sm font-medium tabular-nums ${tx.positive ? "text-green-600 dark:text-green-400" : ""}`}>
                {tx.amount}
              </span>
            </div>
            {i < transactions.length - 1 && <Separator />}
          </div>
        ))}
      </CardContent>
    </BlockCard>
  )
}
