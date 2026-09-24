import { NextRequest } from "next/server"

import { middleware } from "@/src/middleware"
import { describe, expect, it } from "vitest"

describe("Edge Proxy / Route Security Middleware", () => {
  const createRequest = (path: string) => {
    return new NextRequest(`https://clubkey.io${path}`)
  }

  describe("Static Assets & Internal Routes Bypass", () => {
    it("bypasses Next.js internal static assets", () => {
      const paths = [
        "/_next/static/chunks/main.js",
        "/_next/image?url=%2Ftest.png&w=640&q=75",
        "/api/health",
        "/utils/banners/img_01.png",
        "/logos/viverde/logo_white.svg",
        "/favicon.ico",
      ]

      for (const p of paths) {
        const req = createRequest(p)
        const res = middleware(req)

        expect(res.headers.get("x-middleware-rewrite")).toBeNull()
      }
    })
  })

  describe("Tenant Route Authorization", () => {
    it("allows access to enabled module routes (home, stays, networking)", () => {
      const allowedPaths = [
        "/",
        "/hospedagens",
        "/hospedagens/123",
        "/minhas-hospedagens",
        "/hospedagens/minhas-hospedagens",
        "/conexoes",
        "/conexoes/minhas-conexoes",
        "/conexoes/42",
        "/pessoas",
      ]

      for (const p of allowedPaths) {
        const req = createRequest(p)
        const res = middleware(req)
        expect(res.headers.get("x-middleware-rewrite")).toBeNull()
      }
    })

    it("allows access to universal exempt routes (perfil, auth, checkout)", () => {
      const exemptPaths = [
        "/perfil",
        "/perfil/minha-assinatura",
        "/entrar",
        "/login",
        "/cadastro",
        "/assinatura",
        "/esqueci-minha-senha",
        "/redefinir-senha",
      ]

      for (const p of exemptPaths) {
        const req = createRequest(p)
        const res = middleware(req)
        expect(res.headers.get("x-middleware-rewrite")).toBeNull()
      }
    })

    it("rewrites to /not-found when attempting to access disabled module routes", () => {
      const blockedPaths = [
        "/eventos",
        "/eventos/10",
        "/eventos/meus-eventos",
        "/agenda",
        "/meus-eventos",
        "/experiencias",
        "/experiencias/5",
        "/beneficios",
        "/keypass",
        "/keypass/ranking",
        "/keypass/missoes",
        "/keypass/regras",
      ]

      for (const p of blockedPaths) {
        const req = createRequest(p)
        const res = middleware(req)
        const rewriteHeader = res.headers.get("x-middleware-rewrite")
        expect(rewriteHeader).toContain("/not-found")
      }
    })
  })
})
