import { DEFAULT_USER } from "@/src/data/portalData"
import type { UserProfile } from "@/src/types"
import { StateCreator } from "zustand"

import type { PortalState } from "../usePortalStore"

export interface ProfileSlice {
  userProfile: UserProfile
  isProfileCompleted: boolean
  updateProfile: (profile: Partial<UserProfile>) => void
  addSeekingTag: (tag: string) => void
  removeSeekingTag: (index: number) => void
  addOfferingTag: (tag: string) => void
  removeOfferingTag: (index: number) => void
}

export const createProfileSlice: StateCreator<
  PortalState,
  [["zustand/persist", unknown]],
  [],
  ProfileSlice
> = (set) => ({
  userProfile: DEFAULT_USER,
  isProfileCompleted: true,

  updateProfile: (profileUpdates: Partial<UserProfile>) => {
    set((state) => ({
      userProfile: {
        ...state.userProfile,
        ...profileUpdates,
      },
    }))
  },

  addSeekingTag: (tag: string) => {
    const trimmed = tag.trim()
    if (!trimmed) return
    set((state) => ({
      userProfile: {
        ...state.userProfile,
        seeking: [...state.userProfile.seeking, trimmed],
      },
    }))
  },

  removeSeekingTag: (index: number) => {
    set((state) => ({
      userProfile: {
        ...state.userProfile,
        seeking: state.userProfile.seeking.filter(
          (_: string, i: number) => i !== index
        ),
      },
    }))
  },

  addOfferingTag: (tag: string) => {
    const trimmed = tag.trim()
    if (!trimmed) return
    set((state) => ({
      userProfile: {
        ...state.userProfile,
        offering: [...state.userProfile.offering, trimmed],
      },
    }))
  },

  removeOfferingTag: (index: number) => {
    set((state) => ({
      userProfile: {
        ...state.userProfile,
        offering: state.userProfile.offering.filter(
          (_: string, i: number) => i !== index
        ),
      },
    }))
  },
})
