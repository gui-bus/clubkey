import {
  DEFAULT_MEMBER_STAYS,
  DEFAULT_MEMBER_SUBSCRIPTION,
} from "@/src/data/portalData"
import type { MemberStayReservation, MemberSubscription } from "@/src/types"
import { StateCreator } from "zustand"

import type { PortalState } from "../usePortalStore"

export interface StaysSlice {
  boughtExperiences: Record<number, boolean>
  memberStays: MemberStayReservation[]
  memberSubscription: MemberSubscription
  buyExperience: (experienceId: number) => void
  cancelStay: (stayReservationId: string) => void
  resetStays: () => void
}

export const createStaysSlice: StateCreator<
  PortalState,
  [["zustand/persist", unknown]],
  [],
  StaysSlice
> = (set, get) => ({
  boughtExperiences: {},
  memberStays: DEFAULT_MEMBER_STAYS,
  memberSubscription: DEFAULT_MEMBER_SUBSCRIPTION,

  buyExperience: (experienceId: number) => {
    set((state) => ({
      boughtExperiences: {
        ...state.boughtExperiences,
        [experienceId]: true,
      },
    }))
    get().addXP(250, `Experiência garantida #${experienceId}`, "experiencia")
    const expCount = Object.keys(get().boughtExperiences).length
    set((state) => ({
      missions: state.missions.map((m) => {
        if (m.id === "experiences_collector") {
          const count = Math.min(m.totalRequired, expCount)
          return {
            ...m,
            currentProgress: count,
            isCompleted: count >= m.totalRequired,
          }
        }
        return m
      }),
    }))
  },

  cancelStay: (stayReservationId: string) => {
    set((state) => ({
      memberStays: state.memberStays.filter((s) => s.id !== stayReservationId),
    }))
  },

  resetStays: () => {
    set({
      memberStays: DEFAULT_MEMBER_STAYS,
    })
  },
})
