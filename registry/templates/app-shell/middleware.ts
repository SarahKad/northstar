import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { DEMO_SESSION_COOKIE } from "@/components/ag-shell/auth-constants"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith("/login")) {
    return NextResponse.next()
  }

  if (pathname.startsWith("/dashboard")) {
    const session = request.cookies.get(DEMO_SESSION_COOKIE)
    if (!session?.value) {
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
}
