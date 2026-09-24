import * as React from "react"

import { rawApiRooms } from "@/src/data/mockRooms"
import { EVENTS, EXPERIENCES, MEMBERS } from "@/src/data/portalData"
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { EventCard } from "@/src/components/portal/eventCard"
import { ExperienceCard } from "@/src/components/portal/experienceCard"
import { MemberProfileBio } from "@/src/components/portal/memberProfile/memberProfileBio"
import { RoomBookingCard } from "@/src/components/rooms/roomBookingCard"
import { RoomCard } from "@/src/components/rooms/roomCard"

import { isModuleEnabled } from "@/src/config/brand.config"

describe("Gamification & XP Isolation Suite (Zero-Leak Policy)", () => {
  const sampleRoom = rawApiRooms[0]
  const sampleEvent = EVENTS[0]
  const sampleExperience = EXPERIENCES[0]
  const sampleMember = MEMBERS[0]

  describe("RoomCard XP Badge", () => {
    it("renders XP badge strictly when keypass is enabled, or enforces zero-leak when disabled", () => {
      render(
        <RoomCard room={sampleRoom} isFav={false} onToggleFav={() => {}} />
      )

      if (isModuleEnabled("keypass")) {
        expect(screen.getByText(/\+300\s*XP/i)).toBeInTheDocument()
      } else {
        expect(screen.queryByText(/\+300\s*XP/i)).not.toBeInTheDocument()
      }
    })
  })

  describe("RoomBookingCard XP Badge", () => {
    it("renders XP badge strictly when keypass is enabled, or enforces zero-leak when disabled", () => {
      render(
        <RoomBookingCard
          roomTitle={sampleRoom.title}
          maxGuests={sampleRoom.max_guest}
          basePrice={Number(sampleRoom.base_price)}
          discountPrice={sampleRoom.base_price_with_discount}
          discountPercent={60}
          airbnbPrice={450}
          bookingPrice={480}
          trivagoPrice={460}
          airbnbUrl="https://airbnb.com"
          bookingUrl="https://booking.com"
          trivagoUrl="https://trivago.com"
          nights={2}
          onNightsChange={() => {}}
          guests={2}
          onGuestsChange={() => {}}
          onBook={() => {}}
        />
      )

      if (isModuleEnabled("keypass")) {
        expect(screen.getByText(/\+300\s*XP/i)).toBeInTheDocument()
      } else {
        expect(screen.queryByText(/\+300\s*XP/i)).not.toBeInTheDocument()
      }
    })
  })

  describe("EventCard XP Badge Condition", () => {
    it("renders XP badge strictly when keypass is enabled, or enforces zero-leak when disabled", () => {
      render(<EventCard event={sampleEvent} />)

      if (isModuleEnabled("keypass")) {
        expect(screen.getByText(/\+200\s*XP/i)).toBeInTheDocument()
      } else {
        expect(screen.queryByText(/\+200\s*XP/i)).not.toBeInTheDocument()
      }
    })
  })

  describe("ExperienceCard XP Badge Condition", () => {
    it("renders XP badge strictly when keypass is enabled, or enforces zero-leak when disabled", () => {
      render(<ExperienceCard experience={sampleExperience} />)

      if (isModuleEnabled("keypass")) {
        expect(screen.getByText(/\+300\s*XP/i)).toBeInTheDocument()
      } else {
        expect(screen.queryByText(/\+300\s*XP/i)).not.toBeInTheDocument()
      }
    })
  })

  describe("MemberProfileBio XP Badge Condition", () => {
    it("renders member XP badge strictly when keypass is enabled, or enforces zero-leak when disabled", () => {
      render(<MemberProfileBio member={sampleMember} memberTier={null} />)

      if (isModuleEnabled("keypass")) {
        expect(screen.getByText(/XP/i)).toBeInTheDocument()
      } else {
        expect(screen.queryByText(/\d+\s*XP/i)).not.toBeInTheDocument()
      }
    })
  })
})
