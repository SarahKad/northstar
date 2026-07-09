"use client"

import * as React from "react"
import { Check } from "@phosphor-icons/react"
import { cn } from "@/lib/utils"

export type StepState = "pending" | "active" | "completed"

export type StepItem = {
  /** Label shown below the step indicator. */
  label: string
  /** Optional description below the label. */
  description?: string
}

type StepperContextValue = {
  currentStep: number
}

const StepperContext = React.createContext<StepperContextValue>({ currentStep: 0 })

/**
 * @description Horizontal step progress indicator. Shows each step as numbered
 * circles connected by lines. Completed steps show a checkmark, the active step
 * is highlighted, and pending steps are muted.
 */
function Stepper({
  currentStep,
  steps,
  className,
}: {
  /** Zero-based index of the currently active step. */
  currentStep: number
  /** Array of step definitions with label and optional description. */
  steps: StepItem[]
  className?: string
}) {
  return (
    <StepperContext.Provider value={{ currentStep }}>
      <nav
        aria-label="Progress"
        data-slot="stepper"
        className={cn("w-full", className)}
      >
        <ol className="flex w-full items-start">
          {steps.map((step, index) => {
            const state: StepState =
              index < currentStep
                ? "completed"
                : index === currentStep
                  ? "active"
                  : "pending"
            return (
              <StepperItem
                key={index}
                index={index}
                total={steps.length}
                state={state}
                label={step.label}
                description={step.description}
              />
            )
          })}
        </ol>
      </nav>
    </StepperContext.Provider>
  )
}

function StepperItem({
  index,
  total,
  state,
  label,
  description,
  className,
}: {
  index: number
  total: number
  state: StepState
  label: string
  description?: string
  className?: string
}) {
  const { currentStep } = React.useContext(StepperContext)
  const isFirst = index === 0
  const isLast = index === total - 1

  return (
    <li
      data-slot="stepper-item"
      data-state={state}
      className={cn("flex min-w-0 flex-1 flex-col items-center", className)}
    >
      <div className="relative flex h-8 w-full items-center justify-center">
        {!isFirst && (
          <div
            aria-hidden
            className={cn(
              "absolute left-0 top-1/2 h-0.5 w-1/2 -translate-y-1/2 transition-colors",
              index <= currentStep ? "bg-primary" : "bg-border"
            )}
          />
        )}
        {!isLast && (
          <div
            aria-hidden
            className={cn(
              "absolute left-1/2 top-1/2 h-0.5 w-1/2 -translate-y-1/2 transition-colors",
              index < currentStep ? "bg-primary" : "bg-border"
            )}
          />
        )}
        <div
          className={cn(
            "relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border-2 text-xs font-semibold transition-colors",
            state === "completed" &&
              "border-primary bg-primary text-primary-foreground",
            state === "active" &&
              "border-primary bg-background text-primary",
            state === "pending" &&
              "border-border bg-background text-muted-foreground"
          )}
          aria-label={`Step ${index + 1}: ${label}, ${state}`}
        >
          {state === "completed" ? (
            <Check className="size-4" weight="bold" />
          ) : (
            <span>{index + 1}</span>
          )}
        </div>
      </div>

      <div className="mt-2 flex w-full max-w-[9rem] flex-col items-center px-1 text-center">
        <span
          className={cn(
            "text-xs font-medium leading-none",
            state === "active" || state === "completed"
              ? "text-foreground"
              : "text-muted-foreground"
          )}
        >
          {label}
        </span>
        {description && (
          <span className="mt-0.5 max-md:max-w-[18ch] text-xs leading-snug text-muted-foreground">
            {description}
          </span>
        )}
      </div>
    </li>
  )
}

export { Stepper, StepperItem }
