import * as React from "react"

import { DEFAULT_USER } from "@/src/data/portalData"
import { usePortalStore } from "@/src/store/usePortalStore"
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { PortalHome } from "@/src/components/portal/portalHome"

describe("PortalHome Cockpit Multi-Tenant Suite", () => {
  describe("When active tenant is Viverde (Events disabled)", () => {
    it("renders welcome banner with member info", () => {
      usePortalStore.setState({
        isAuthenticated: true,
        userProfile: {
          ...DEFAULT_USER,
          firstName: "Lucas",
          lastName: "Silveira",
          role: "Sócio",
          company: "Ventures",
          city: "Rio de Janeiro",
          email: "lucas@example.com",
        },
      })

      render(<PortalHome />)

      expect(screen.getByText(/Bem-vindo\(a\), Lucas/i)).toBeInTheDocument()
    })

    it("renders cockpit cards strictly for enabled modules", () => {
      render(<PortalHome />)

      expect(screen.getByText("Hospedagem Ativa")).toBeInTheDocument()
      expect(screen.getByText("Rede do Clube")).toBeInTheDocument()
      expect(screen.getByText("Assinatura & Acesso")).toBeInTheDocument()

      expect(screen.queryByText("Próximo Evento")).not.toBeInTheDocument()
    })

    it("does not render the entire Events section when events module is disabled", () => {
      render(<PortalHome />)

      expect(
        screen.queryByText("Próximo Encontro Confirmado")
      ).not.toBeInTheDocument()
      expect(screen.queryByText("Explorar Eventos")).not.toBeInTheDocument()
    })

    it("renders Quick Central Links only for active modules", () => {
      render(<PortalHome />)

      expect(screen.getByText("Centrais do Associado")).toBeInTheDocument()

      expect(
        screen.getAllByRole("link", { name: /Hospedagens/i }).length
      ).toBeGreaterThan(0)
      expect(
        screen.getAllByRole("link", { name: /Conexões/i }).length
      ).toBeGreaterThan(0)

      expect(
        screen.queryByRole("link", { name: /Experiências/i })
      ).not.toBeInTheDocument()
      expect(
        screen.queryByRole("link", { name: /Benefícios/i })
      ).not.toBeInTheDocument()
    })
  })
})
