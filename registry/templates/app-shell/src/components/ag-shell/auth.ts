import { DEMO_SESSION_COOKIE } from "@/components/ag-shell/auth-constants"

export function setDemoSession() {
  document.cookie = `${DEMO_SESSION_COOKIE}=1; path=/; max-age=${60 * 60 * 24}; SameSite=Lax`
}

export function clearDemoSession() {
  document.cookie = `${DEMO_SESSION_COOKIE}=; path=/; max-age=0`
}
