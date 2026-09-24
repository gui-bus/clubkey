import * as React from "react"

import { usePortalStore } from "@/src/store/usePortalStore"
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { Header } from "@/src/components/landing/header"

describe("Header Navigation Multi-Tenant Suite", () => {
  describe("When active tenant is Viverde (Stays & Networking only)", () => {
    it("renders brand logo text or name for Viverde", () => {
      render(<Header isTransparent={false} />)

      expect(screen.getByRole("link", { name: /Viverde/i })).toBeInTheDocument()
    })

    it("does not render KeyPass logo link in the brand bar", () => {
      render(<Header isTransparent={false} />)

      const keypassLogo = screen.queryByTitle("KeyPass")
      expect(keypassLogo).not.toBeInTheDocument()
    })

    it("renders navigation links filtered to only active modules", () => {
      usePortalStore.setState({ isAuthenticated: true })
      render(<Header isTransparent={false} />)

      expect(
        screen.getAllByRole("link", { name: /hospedagens/i }).length
      ).toBeGreaterThan(0)
      expect(
        screen.getAllByRole("link", { name: /conexões/i }).length
      ).toBeGreaterThan(0)

      expect(
        screen.queryByRole("link", { name: /^eventos$/i })
      ).not.toBeInTheDocument()
      expect(
        screen.queryByRole("link", { name: /^experiências$/i })
      ).not.toBeInTheDocument()
      expect(
        screen.queryByRole("link", { name: /^benefícios$/i })
      ).not.toBeInTheDocument()
      expect(
        screen.queryByRole("link", { name: /^keypass$/i })
      ).not.toBeInTheDocument()
    })

    it("does not render RIB token balance or tier badge in header when keypass is disabled", () => {
      usePortalStore.setState({ isAuthenticated: true, ribTokens: 500 })
      render(<Header isTransparent={false} />)

      expect(
        screen.queryByTitle("Ver KeyPass & Recompensas")
      ).not.toBeInTheDocument()
    })
  })
})
