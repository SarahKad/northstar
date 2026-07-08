/**
 * Registry feature flags. Flip individual flags here or via env when a feature
 * is ready to ship.
 */
export const featureFlags = {
  /**
   * "Have a request?" card on component and block detail pages.
   * Enable with NEXT_PUBLIC_ENABLE_SUBMIT_REQUEST=true when submission is wired up.
   */
  submitRequest: process.env.NEXT_PUBLIC_ENABLE_SUBMIT_REQUEST === "true",
} as const
