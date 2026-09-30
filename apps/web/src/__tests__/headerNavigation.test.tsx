import * as React from "react"

import { usePortalStore } from "@/src/store/usePortalStore"
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { Header } from "@/src/components/landing/header"

import { brandConfig, isModuleEnabled } from "@/src/config/brand.config"

describe("Header Navigation Multi-Tenant Suite", () => {
  it("renders active brand logo link with brand name", () => {
    render(<Header isTransparent={false} />)

    expect(
      screen.getByRole("link", { name: new RegExp(brandConfig.name, "i") })
    ).toBeInTheDocument()
  })

  it("renders navigation links strictly matching active brand modules", () => {
    usePortalStore.setState({ isAuthenticated: true })
    render(<Header isTransparent={false} />)

    if (isModuleEnabled("stays")) {
      expect(
        screen.getAllByRole("link", { name: /hospedagens/i }).length
      ).toBeGreaterThan(0)
    } else {
      expect(
        screen.queryByRole("link", { name: /hospedagens/i })
      ).not.toBeInTheDocument()
    }

    if (isModuleEnabled("networking")) {
      expect(
        screen.getAllByRole("link", { name: /conexões/i }).length
      ).toBeGreaterThan(0)
    } else {
      expect(
        screen.queryByRole("link", { name: /conexões/i })
      ).not.toBeInTheDocument()
    }

    if (isModuleEnabled("events")) {
      expect(
        screen.getAllByRole("link", { name: /^eventos$/i }).length
      ).toBeGreaterThan(0)
    } else {
      expect(
        screen.queryByRole("link", { name: /^eventos$/i })
      ).not.toBeInTheDocument()
    }

    if (isModuleEnabled("experiences")) {
      expect(
        screen.getAllByRole("link", { name: /^experiências$/i }).length
      ).toBeGreaterThan(0)
    } else {
      expect(
        screen.queryByRole("link", { name: /^experiências$/i })
      ).not.toBeInTheDocument()
    }

    if (isModuleEnabled("benefits")) {
      expect(
        screen.getAllByRole("link", { name: /^benefícios$/i }).length
      ).toBeGreaterThan(0)
    } else {
      expect(
        screen.queryByRole("link", { name: /^benefícios$/i })
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

  it("handles KeyPass badge/rewards trigger strictly based on keypass module", () => {
    usePortalStore.setState({ isAuthenticated: true, ribTokens: 500 })
    render(<Header isTransparent={false} />)

    const keypassBtn = screen.queryByTitle("Ver KeyPass & Recompensas")
    if (isModuleEnabled("keypass")) {
      expect(keypassBtn).toBeInTheDocument()
    } else {
      expect(keypassBtn).not.toBeInTheDocument()
    }
  })
})
