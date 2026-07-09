export const STEPPER_PREVIEW_STEPS = [
  { label: "Account", description: "Your details" },
  { label: "Profile", description: "Set up your profile" },
  { label: "Review", description: "Confirm & submit" },
] as const

export function resolveStepperCurrentStep(value: string | boolean): number {
  switch (String(value)) {
    case "Not started":
      return -1
    case "Step 1":
      return 0
    case "Step 2":
      return 1
    case "Step 3":
      return 2
    case "All completed":
      return STEPPER_PREVIEW_STEPS.length
    default: {
      const parsed = parseInt(String(value), 10)
      return Number.isNaN(parsed) ? 1 : parsed
    }
  }
}
