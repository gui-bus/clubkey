import * as React from "react"

import { DEFAULT_USER } from "@/src/data/portalData"
import { usePortalStore } from "@/src/store/usePortalStore"
import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { UserDropdownMenu } from "@/src/components/portal/userDropdownMenu"

import { isModuleEnabled } from "@/src/config/brand.config"

describe("UserDropdownMenu Multi-Tenant Suite", () => {
  it("renders user trigger button with initials", () => {
    usePortalStore.setState({
      isAuthenticated: true,
      userProfile: {
        ...DEFAULT_USER,
        firstName: "Guilherme",
        lastName: "Albuquerque",
        role: "Developer",
        company: "ClubKey",
        email: "gui@example.com",
      },
    })

    render(<UserDropdownMenu />)

    const triggerBtn = screen.getByRole("button", { name: /Guilherme/i })
    expect(triggerBtn).toBeInTheDocument()
  })

  it("renders menu items strictly matching enabled brand modules", () => {
    usePortalStore.setState({
      isAuthenticated: true,
      userProfile: {
        ...DEFAULT_USER,
        firstName: "Guilherme",
        lastName: "Albuquerque",
        role: "Developer",
        company: "ClubKey",
        email: "gui@example.com",
      },
    })

    render(<UserDropdownMenu />)

    const triggerBtn = screen.getByRole("button", { name: /Guilherme/i })
    fireEvent.pointerDown(triggerBtn)
    fireEvent.click(triggerBtn)

    expect(screen.getByText("Meu Perfil")).toBeInTheDocument()
    expect(screen.getByText("Minha Assinatura")).toBeInTheDocument()
    expect(screen.getByText("Sair do Portal")).toBeInTheDocument()

    if (isModuleEnabled("stays")) {
      expect(screen.getByText("Minhas Hospedagens")).toBeInTheDocument()
    } else {
      expect(screen.queryByText("Minhas Hospedagens")).not.toBeInTheDocument()
    }

    if (isModuleEnabled("events")) {
      expect(screen.getByText("Meus Eventos")).toBeInTheDocument()
    } else {
      expect(screen.queryByText("Meus Eventos")).not.toBeInTheDocument()
    }

    if (isModuleEnabled("keypass")) {
      expect(screen.getByText(/^KeyPass$/i)).toBeInTheDocument()
    } else {
      expect(screen.queryByText(/^KeyPass$/i)).not.toBeInTheDocument()
    }
  })
})
