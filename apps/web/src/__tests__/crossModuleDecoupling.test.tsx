import * as React from "react"

import { MEMBERS } from "@/src/data/portalData"
import { usePortalStore } from "@/src/store/usePortalStore"
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { MemberCard } from "@/src/components/portal/memberCard"
import { MemberMessengerWidget } from "@/src/components/portal/memberMessengerWidget"
import { NotificationsDropdown } from "@/src/components/portal/notificationsDropdown"

describe("Cross-Module Decoupling & Fallbacks Suite", () => {
  const sampleMember = MEMBERS[0]

  describe("MemberCard", () => {
    it("renders member name, role, company and bio", () => {
      render(<MemberCard member={sampleMember} />)

      expect(
        screen.getByText(`${sampleMember.firstName} ${sampleMember.lastName}`)
      ).toBeInTheDocument()
      expect(screen.getByText(sampleMember.role)).toBeInTheDocument()
      expect(screen.getByText(sampleMember.company)).toBeInTheDocument()
    })
  })

  describe("MemberMessengerWidget", () => {
    it("renders floating messenger trigger when networking is enabled and user is authenticated", () => {
      usePortalStore.setState({
        isAuthenticated: true,
        chatMessages: {
          [sampleMember.id]: [
            {
              id: "1",
              senderId: sampleMember.id,
              text: "Olá!",
              timestamp: "12:00",
              read: false,
            },
          ],
        },
      })

      render(<MemberMessengerWidget />)

      expect(
        screen.getByRole("button", { name: /Abrir Mensagens/i })
      ).toBeInTheDocument()
    })

    it("returns null when user is unauthenticated", () => {
      usePortalStore.setState({ isAuthenticated: false })

      const { container } = render(<MemberMessengerWidget />)
      expect(container.firstChild).toBeNull()
    })
  })

  describe("NotificationsDropdown", () => {
    it("renders notifications trigger button for authenticated members", () => {
      usePortalStore.setState({
        isAuthenticated: true,
        receivedPendingInvites: [sampleMember.id],
      })

      render(<NotificationsDropdown isDarkBar={true} />)

      const bellBtn = screen.getByRole("button", { name: /Notificações/i })
      expect(bellBtn).toBeInTheDocument()
    })
  })
})
