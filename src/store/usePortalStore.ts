import { create } from "zustand"
import { persist } from "zustand/middleware"
import { CLUBS, Club, DEFAULT_USER, UserProfile } from "@/src/data/portalData"

interface PortalState {
  isAuthenticated: boolean
  activeClubId: string
  confirmedEvents: Record<number, boolean>
  connectedMembers: Record<number, boolean>
  boughtExperiences: Record<number, boolean>
  userProfile: UserProfile
  login: (email?: string, name?: string) => void
  logout: () => void
  setActiveClubId: (id: string) => void
  getActiveClub: () => Club
  toggleEventRSVP: (eventId: number) => boolean
  toggleConnect: (memberId: number) => boolean
  buyExperience: (experienceId: number) => void
  updateProfile: (profile: Partial<UserProfile>) => void
  addSeekingTag: (tag: string) => void
  removeSeekingTag: (index: number) => void
  addOfferingTag: (tag: string) => void
  removeOfferingTag: (index: number) => void
}

export const usePortalStore = create<PortalState>()(
  persist(
    (set, get) => ({
      isAuthenticated: true,
      activeClubId: "alpha",
      confirmedEvents: { 1: true, 5: true },
      connectedMembers: {},
      boughtExperiences: {},
      userProfile: DEFAULT_USER,

      login: (email?: string, name?: string) => {
        let updatedProfile = { ...get().userProfile }
        if (name && name.trim()) {
          updatedProfile.name = name.trim()
        } else if (email && email.includes("@")) {
          const username = email.split("@")[0]
          const formatted =
            username.charAt(0).toUpperCase() + username.slice(1)
          if (!updatedProfile.name) {
            updatedProfile.name = formatted
          }
        }
        set({
          isAuthenticated: true,
          userProfile: updatedProfile
        })
      },

      logout: () => {
        set({
          isAuthenticated: false
        })
      },

      setActiveClubId: (id: string) => set({ activeClubId: id }),

      getActiveClub: () => {
        const id = get().activeClubId
        return CLUBS.find((c) => c.id === id) || CLUBS[0]
      },

      toggleEventRSVP: (eventId: number) => {
        const current = !!get().confirmedEvents[eventId]
        const next = !current
        set((state) => ({
          confirmedEvents: {
            ...state.confirmedEvents,
            [eventId]: next
          }
        }))
        return next
      },

      toggleConnect: (memberId: number) => {
        const current = !!get().connectedMembers[memberId]
        const next = !current
        set((state) => ({
          connectedMembers: {
            ...state.connectedMembers,
            [memberId]: next
          }
        }))
        return next
      },

      buyExperience: (experienceId: number) => {
        set((state) => ({
          boughtExperiences: {
            ...state.boughtExperiences,
            [experienceId]: true
          }
        }))
      },

      updateProfile: (profileUpdates: Partial<UserProfile>) => {
        set((state) => ({
          userProfile: {
            ...state.userProfile,
            ...profileUpdates
          }
        }))
      },

      addSeekingTag: (tag: string) => {
        const trimmed = tag.trim()
        if (!trimmed) return
        set((state) => ({
          userProfile: {
            ...state.userProfile,
            seeking: [...state.userProfile.seeking, trimmed]
          }
        }))
      },

      removeSeekingTag: (index: number) => {
        set((state) => ({
          userProfile: {
            ...state.userProfile,
            seeking: state.userProfile.seeking.filter((_: string, i: number) => i !== index)
          }
        }))
      },

      addOfferingTag: (tag: string) => {
        const trimmed = tag.trim()
        if (!trimmed) return
        set((state) => ({
          userProfile: {
            ...state.userProfile,
            offering: [...state.userProfile.offering, trimmed]
          }
        }))
      },

      removeOfferingTag: (index: number) => {
        set((state) => ({
          userProfile: {
            ...state.userProfile,
            offering: state.userProfile.offering.filter((_: string, i: number) => i !== index)
          }
        }))
      }
    }),
    {
      name: "clubkey-portal-storage-v2",
      version: 2,
      migrate: (persistedState: unknown) => {
        const state = persistedState as PortalState
        if (state?.userProfile?.name === "Marina Duarte" || !state?.userProfile?.name) {
          return {
            ...state,
            userProfile: DEFAULT_USER
          }
        }
        return state
      },
      onRehydrateStorage: () => (state) => {
        if (state) {
          if (state.userProfile?.name === "Marina Duarte" || !state.userProfile?.name) {
            state.userProfile = DEFAULT_USER
          }
        }
      }
    }
  )
)
