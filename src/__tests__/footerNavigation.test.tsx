import * as React from "react"

import { usePortalStore } from "@/src/store/usePortalStore"
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { Footer } from "@/src/components/landing/footer"

describe("Footer Navigation Multi-Tenant Suite", () => {
  describe("When active tenant is Viverde", () => {
    it("renders footer with brand name and copyright", () => {
      render(<Footer />)

      expect(screen.getAllByText(/Viverde/i).length).toBeGreaterThan(0)
      expect(
        screen.getByText(/Todos os direitos reservados/i)
      ).toBeInTheDocument()
    })

    it("does not render KeyPass rules link when keypass is disabled", () => {
      usePortalStore.setState({ isAuthenticated: true })
      render(<Footer />)

      expect(
        screen.queryByText(/Dúvidas sobre Tiers e KeyPass\? Ver Regulamento/i)
      ).not.toBeInTheDocument()
    })

    it("renders bottom bar links strictly for enabled modules", () => {
      usePortalStore.setState({ isAuthenticated: true })
      render(<Footer />)

      expect(
        screen.getAllByRole("link", { name: /^hospedagens$/i }).length
      ).toBeGreaterThan(0)
      expect(
        screen.getAllByRole("link", { name: /perfil/i }).length
      ).toBeGreaterThan(0)

      expect(
        screen.queryByRole("link", { name: /^eventos$/i })
      ).not.toBeInTheDocument()
      expect(
        screen.queryByRole("link", { name: /^keypass$/i })
      ).not.toBeInTheDocument()
    })
  })
})
