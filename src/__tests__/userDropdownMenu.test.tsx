import * as React from "react"

import { DEFAULT_USER } from "@/src/data/portalData"
import { usePortalStore } from "@/src/store/usePortalStore"
import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { UserDropdownMenu } from "@/src/components/portal/userDropdownMenu"

describe("UserDropdownMenu Multi-Tenant Suite", () => {
  describe("When active tenant is Viverde", () => {
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

    it("does not render KeyPass or Eventos menu items when dropdown is opened", () => {
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
      expect(screen.getByText("Minhas Hospedagens")).toBeInTheDocument()
      expect(screen.getByText("Minha Assinatura")).toBeInTheDocument()
      expect(screen.getByText("Sair do Portal")).toBeInTheDocument()

      expect(screen.queryByText(/^KeyPass$/i)).not.toBeInTheDocument()
      expect(screen.queryByText("Meus Eventos")).not.toBeInTheDocument()
    })
  })
})
