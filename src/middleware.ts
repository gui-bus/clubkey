import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

import { isRouteAllowed } from "@/src/config/brand.config"

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/utils") ||
    pathname.startsWith("/logos") ||
    pathname.startsWith("/favicon") ||
    pathname.includes(".")
  ) {
    return NextResponse.next()
  }

  if (!isRouteAllowed(pathname)) {
    return NextResponse.rewrite(new URL("/not-found", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
}
