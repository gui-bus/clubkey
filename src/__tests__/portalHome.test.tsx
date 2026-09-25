import * as React from "react"

import { DEFAULT_USER } from "@/src/data/portalData"
import { usePortalStore } from "@/src/store/usePortalStore"
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { PortalHome } from "@/src/components/portal/portalHome"

import { isModuleEnabled } from "@/src/config/brand.config"

describe("PortalHome Multi-Tenant Suite", () => {
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

  it("renders indicator cards strictly for enabled modules", () => {
    render(<PortalHome />)

    if (isModuleEnabled("stays")) {
      expect(screen.getByText("Hospedagem Ativa")).toBeInTheDocument()
    } else {
      expect(screen.queryByText("Hospedagem Ativa")).not.toBeInTheDocument()
    }

    if (isModuleEnabled("networking")) {
      expect(screen.getByText("Rede do Clube")).toBeInTheDocument()
    } else {
      expect(screen.queryByText("Rede do Clube")).not.toBeInTheDocument()
    }

    expect(screen.getByText("Assinatura & Acesso")).toBeInTheDocument()

    if (isModuleEnabled("events")) {
      expect(screen.getByText("Próximo Evento")).toBeInTheDocument()
    } else {
      expect(screen.queryByText("Próximo Evento")).not.toBeInTheDocument()
    }
  })

  it("handles Events section visibility based on events module flag", () => {
    render(<PortalHome />)

    if (isModuleEnabled("events")) {
      expect(
        screen.getByText("Próximo Encontro Confirmado")
      ).toBeInTheDocument()
      expect(screen.getByText("Explorar Eventos")).toBeInTheDocument()
    } else {
      expect(
        screen.queryByText("Próximo Encontro Confirmado")
      ).not.toBeInTheDocument()
      expect(screen.queryByText("Explorar Eventos")).not.toBeInTheDocument()
    }
  })

  it("renders Quick Central Links only for active modules", () => {
    render(<PortalHome />)

    expect(screen.getByText("Centrais do Associado")).toBeInTheDocument()

    if (isModuleEnabled("stays")) {
      expect(
        screen.getAllByRole("link", { name: /Hospedagens/i }).length
      ).toBeGreaterThan(0)
    } else {
      expect(
        screen.queryByRole("link", { name: /Hospedagens/i })
      ).not.toBeInTheDocument()
    }

    if (isModuleEnabled("networking")) {
      expect(
        screen.getAllByRole("link", { name: /Conexões/i }).length
      ).toBeGreaterThan(0)
    } else {
      expect(
        screen.queryByRole("link", { name: /Conexões/i })
      ).not.toBeInTheDocument()
    }

    if (isModuleEnabled("experiences")) {
      expect(
        screen.getAllByRole("link", { name: /Experiências/i }).length
      ).toBeGreaterThan(0)
    } else {
      expect(
        screen.queryByRole("link", { name: /Experiências/i })
      ).not.toBeInTheDocument()
    }

    if (isModuleEnabled("benefits")) {
      expect(
        screen.getAllByRole("link", { name: /Benefícios/i }).length
      ).toBeGreaterThan(0)
    } else {
      expect(
        screen.queryByRole("link", { name: /Benefícios/i })
      ).not.toBeInTheDocument()
    }
  })
})
