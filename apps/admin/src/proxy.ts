import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export const ADMIN_AUTH_COOKIE = "clubkey_admin_session"

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Ignore static assets, Next.js internal files, and API routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/logos") ||
    pathname.startsWith("/utils") ||
    pathname.startsWith("/favicon") ||
    pathname.includes(".")
  ) {
    return NextResponse.next()
  }

  const sessionCookie = request.cookies.get(ADMIN_AUTH_COOKIE)?.value
  const isAuthenticated = Boolean(
    sessionCookie && sessionCookie === "authenticated"
  )

  // If accessing public auth pages (/login, /esqueci-minha-senha)
  const isAuthRoute =
    pathname === "/login" || pathname === "/esqueci-minha-senha"
  if (isAuthRoute) {
    if (isAuthenticated) {
      return NextResponse.redirect(new URL("/painel", request.url))
    }
    return NextResponse.next()
  }

  // If accessing protected routes without authentication
  if (!isAuthenticated) {
    const loginUrl = new URL("/login", request.url)
    if (pathname !== "/") {
      loginUrl.searchParams.set("from", pathname)
    }
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
}
