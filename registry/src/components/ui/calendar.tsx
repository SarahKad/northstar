"use client"

import * as React from "react"
import { CaretLeft, CaretRight } from "@phosphor-icons/react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

const DAY_NAMES = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"]
const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
]

function buildYearOptions(anchorYear: number) {
  const start = anchorYear - 50
  const end = anchorYear + 10
  return Array.from({ length: end - start + 1 }, (_, i) => start + i)
}

function compareDays(a: Date, b: Date) {
  const normalize = (d: Date) =>
    new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime()
  return normalize(a) - normalize(b)
}

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  )
}

/**
 * @description Full month calendar grid with prev/next month navigation and
 * date selection. Supports `"single"` mode (select one date) and `"range"` mode
 * (select a start and end date). Built with native JS Date, no external library.
 *
 * @example
 * const [date, setDate] = React.useState<Date | undefined>()
 * <Calendar mode="single" selected={date} onSelect={setDate} />
 *
 * @example
 * const [rangeStart, setRangeStart] = React.useState<Date | undefined>()
 * const [rangeEnd, setRangeEnd] = React.useState<Date | undefined>()
 * <Calendar
 *   mode="range"
 *   selected={rangeStart}
 *   selectedEnd={rangeEnd}
 *   onSelectRange={(start, end) => { setRangeStart(start); setRangeEnd(end) }}
 * />
 */
function Calendar({
  mode = "single",
  selected,
  onSelect,
  selectedEnd,
  onSelectRange,
  className,
}: {
  /** Selection mode. @default "single" */
  mode?: "single" | "range"
  /** Selected date (single mode). */
  selected?: Date
  /** Callback when a date is selected (single mode). */
  onSelect?: (date: Date) => void
  /** End date of range (range mode). */
  selectedEnd?: Date
  /** Callback when a range is selected (range mode). */
  onSelectRange?: (start: Date, end: Date) => void
  className?: string
}) {
  const today = new Date()
  const [viewYear, setViewYear] = React.useState(today.getFullYear())
  const [viewMonth, setViewMonth] = React.useState(today.getMonth())
  const yearOptions = React.useMemo(
    () => buildYearOptions(today.getFullYear()),
    [today.getFullYear()]
  )

  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay()
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()

  const cells: Array<Date | null> = [
    ...Array(firstDayOfMonth).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(viewYear, viewMonth, i + 1)),
  ]

  // Pad to full rows
  while (cells.length % 7 !== 0) cells.push(null)

  const prevMonth = () => {
    if (viewMonth === 0) { setViewYear(y => y - 1); setViewMonth(11) }
    else setViewMonth(m => m - 1)
  }
  const nextMonth = () => {
    if (viewMonth === 11) { setViewYear(y => y + 1); setViewMonth(0) }
    else setViewMonth(m => m + 1)
  }

  const handleDayClick = (day: Date) => {
    if (mode === "single") {
      onSelect?.(day)
      return
    }

    if (!selected || selectedEnd) {
      onSelectRange?.(day, day)
      return
    }

    const start = compareDays(selected, day) <= 0 ? selected : day
    const end = compareDays(selected, day) <= 0 ? day : selected
    onSelectRange?.(start, end)
  }

  const isInRange = (day: Date) => {
    if (mode !== "range" || !selected || !selectedEnd) return false
    const start = compareDays(selected, selectedEnd) <= 0 ? selected : selectedEnd
    const end = compareDays(selected, selectedEnd) <= 0 ? selectedEnd : selected
    return compareDays(day, start) > 0 && compareDays(day, end) < 0
  }

  const rangeBounds =
    mode === "range" && selected && selectedEnd
      ? {
          start: compareDays(selected, selectedEnd) <= 0 ? selected : selectedEnd,
          end: compareDays(selected, selectedEnd) <= 0 ? selectedEnd : selected,
        }
      : null

  const isToday = (day: Date) => isSameDay(day, today)

  return (
    <div
      data-slot="calendar"
      className={cn("w-full max-w-sm rounded-lg border border-border bg-card p-4 shadow-sm", className)}
    >
      {/* Header */}
      <div className="mb-4 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={prevMonth}
          aria-label="Previous month"
          className="flex size-7 shrink-0 items-center justify-center rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
        >
          <CaretLeft className="size-4" />
        </button>
        <div className="flex min-w-0 flex-1 items-center justify-center gap-1.5">
          <Select
            value={MONTH_NAMES[viewMonth]}
            onValueChange={(value) => {
              if (value === null) return
              const index = MONTH_NAMES.indexOf(value)
              if (index >= 0) setViewMonth(index)
            }}
          >
            <SelectTrigger size="sm" className="min-w-0 flex-1" aria-label="Month">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {MONTH_NAMES.map((name) => (
                <SelectItem key={name} value={name}>
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={String(viewYear)}
            onValueChange={(value) => {
              if (value !== null) setViewYear(Number(value))
            }}
          >
            <SelectTrigger size="sm" className="w-[5.25rem] shrink-0" aria-label="Year">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {yearOptions.map((year) => (
                <SelectItem key={year} value={String(year)}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <button
          type="button"
          onClick={nextMonth}
          aria-label="Next month"
          className="flex size-7 shrink-0 items-center justify-center rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
        >
          <CaretRight className="size-4" />
        </button>
      </div>

      {/* Day-of-week headers */}
      <div className="mb-1 grid grid-cols-7 text-center">
        {DAY_NAMES.map((d) => (
          <span key={d} className="py-1 text-xs font-medium text-muted-foreground">
            {d}
          </span>
        ))}
      </div>

      {/* Day grid */}
      <div className="grid grid-cols-7">
        {cells.map((day, i) => {
          if (!day) {
            return <div key={`empty-${i}`} className="h-8" />
          }

          const today_ = isToday(day)

          if (mode === "single") {
            const selected_ = selected ? isSameDay(day, selected) : false
            return (
              <button
                key={day.toISOString()}
                type="button"
                onClick={() => handleDayClick(day)}
                aria-label={day.toLocaleDateString()}
                aria-pressed={selected_}
                className={cn(
                  "relative mx-auto flex size-8 items-center justify-center rounded-[2px] text-sm transition-colors",
                  "hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
                  selected_ && "bg-primary text-primary-foreground hover:bg-primary/90",
                  !selected_ && today_ && "ring-1 ring-border font-medium",
                  !selected_ && !today_ && "text-foreground"
                )}
              >
                {day.getDate()}
              </button>
            )
          }

          const isRangeStart = rangeBounds ? isSameDay(day, rangeBounds.start) : false
          const isRangeEnd = rangeBounds ? isSameDay(day, rangeBounds.end) : false
          const inRangeMiddle = isInRange(day)
          const isPendingStart =
            selected && !selectedEnd ? isSameDay(day, selected) : false
          const inRangeBand = isRangeStart || isRangeEnd || inRangeMiddle
          const isEndpoint = isRangeStart || isRangeEnd || isPendingStart
          const dayOfWeek = day.getDay()

          return (
            <button
              key={day.toISOString()}
              type="button"
              onClick={() => handleDayClick(day)}
              aria-label={day.toLocaleDateString()}
              aria-pressed={isEndpoint}
              className={cn(
                "relative flex h-8 w-full items-center justify-center p-0 text-sm transition-colors",
                "focus-visible:z-10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50",
                inRangeBand && "bg-primary/10 hover:bg-primary/15",
                inRangeBand && (isRangeStart || dayOfWeek === 0) && "rounded-l-[2px]",
                inRangeBand && (isRangeEnd || dayOfWeek === 6) && "rounded-r-[2px]",
                !inRangeBand && "hover:bg-muted/60"
              )}
            >
              <span
                className={cn(
                  "relative z-10 flex size-8 items-center justify-center rounded-[2px]",
                  isEndpoint && "bg-primary text-primary-foreground font-medium",
                  !isEndpoint && inRangeMiddle && "text-foreground",
                  !inRangeBand && today_ && "ring-1 ring-border font-medium",
                  !inRangeBand && !today_ && "text-foreground"
                )}
              >
                {day.getDate()}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export { Calendar }
