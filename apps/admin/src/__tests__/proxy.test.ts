import { NextRequest } from "next/server"

import { describe, expect, it } from "vitest"

import { ADMIN_AUTH_COOKIE, proxy } from "../proxy"

describe("Admin Route Protection Proxy", () => {
  const createRequest = (path: string, isAuthenticated = false) => {
    const headers = new Headers()
    if (isAuthenticated) {
      headers.set("cookie", `${ADMIN_AUTH_COOKIE}=authenticated`)
    }
    return new NextRequest(`https://admin.clubkey.io${path}`, { headers })
  }

  describe("Static Assets & Internal Bypass", () => {
    it("bypasses Next.js static assets and icons", () => {
      const paths = [
        "/_next/static/chunks/main.js",
        "/_next/image?url=%2Ftest.png&w=640&q=75",
        "/api/health",
        "/logos/logo_white.svg",
        "/favicon.ico",
      ]

      for (const p of paths) {
        const req = createRequest(p, false)
        const res = proxy(req)
        expect(res.headers.get("location")).toBeNull()
      }
    })
  })

  describe("Unauthenticated Access Protection", () => {
    it("redirects unauthenticated users to /login when accessing protected routes", () => {
      const protectedPaths = [
        "/painel",
        "/usuarios",
        "/sinistros",
        "/imoveis",
        "/eventos",
        "/experiencias",
        "/relatorios",
        "/protecao-key",
        "/credito",
        "/administradores",
      ]

      for (const p of protectedPaths) {
        const req = createRequest(p, false)
        const res = proxy(req)
        const location = res.headers.get("location")
        expect(location).toContain("/login")
        expect(location).toContain(`from=${encodeURIComponent(p)}`)
      }
    })

    it("allows unauthenticated users to access /login and /esqueci-minha-senha", () => {
      const publicPaths = ["/login", "/esqueci-minha-senha"]
      for (const p of publicPaths) {
        const req = createRequest(p, false)
        const res = proxy(req)
        expect(res.headers.get("location")).toBeNull()
      }
    })
  })

  describe("Authenticated Access", () => {
    it("allows authenticated users to access protected routes", () => {
      const protectedPaths = ["/painel", "/usuarios", "/eventos"]

      for (const p of protectedPaths) {
        const req = createRequest(p, true)
        const res = proxy(req)
        expect(res.headers.get("location")).toBeNull()
      }
    })

    it("redirects authenticated users away from auth pages to /painel", () => {
      const authPaths = ["/login", "/esqueci-minha-senha"]
      for (const p of authPaths) {
        const req = createRequest(p, true)
        const res = proxy(req)
        expect(res.headers.get("location")).toContain("/painel")
      }
    })
  })
})
