import * as React from "react"

import { usePortalStore } from "@/src/store/usePortalStore"
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { Footer } from "@/src/components/landing/footer"

import { brandConfig, isModuleEnabled } from "@/src/config/brand.config"

describe("Footer Navigation Multi-Tenant Suite", () => {
  it("renders footer with brand name and copyright", () => {
    render(<Footer />)

    expect(
      screen.getAllByText(new RegExp(brandConfig.name, "i")).length
    ).toBeGreaterThan(0)
    expect(
      screen.getByText(/Todos os direitos reservados/i)
    ).toBeInTheDocument()
  })

  it("handles KeyPass rules link strictly based on keypass module", () => {
    usePortalStore.setState({ isAuthenticated: true })
    render(<Footer />)

    const rulesLink = screen.queryByText(
      /Dúvidas sobre Tiers e KeyPass\? Ver Regulamento/i
    )
    if (isModuleEnabled("keypass")) {
      expect(rulesLink).toBeInTheDocument()
    } else {
      expect(rulesLink).not.toBeInTheDocument()
    }
  })

  it("renders bottom bar links strictly for enabled modules", () => {
    usePortalStore.setState({ isAuthenticated: true })
    render(<Footer />)

    if (isModuleEnabled("stays")) {
      expect(
        screen.getAllByRole("link", { name: /^hospedagens$/i }).length
      ).toBeGreaterThan(0)
    } else {
      expect(
        screen.queryByRole("link", { name: /^hospedagens$/i })
      ).not.toBeInTheDocument()
    }

    expect(
      screen.getAllByRole("link", { name: /perfil/i }).length
    ).toBeGreaterThan(0)

    if (isModuleEnabled("events")) {
      expect(
        screen.getAllByRole("link", { name: /^eventos$/i }).length
      ).toBeGreaterThan(0)
    } else {
      expect(
        screen.queryByRole("link", { name: /^eventos$/i })
      ).not.toBeInTheDocument()
    }

    if (isModuleEnabled("keypass")) {
      expect(
        screen.getAllByRole("link", { name: /^keypass$/i }).length
      ).toBeGreaterThan(0)
    } else {
      expect(
        screen.queryByRole("link", { name: /^keypass$/i })
      ).not.toBeInTheDocument()
    }
  })
})
