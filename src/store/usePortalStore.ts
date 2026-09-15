import { create } from "zustand"
import { persist } from "zustand/middleware"
import {
  CLUBS,
  Club,
  DEFAULT_USER,
  UserProfile,
  MemberStayReservation,
  DEFAULT_MEMBER_STAYS,
  MemberSubscription,
  DEFAULT_MEMBER_SUBSCRIPTION
} from "@/src/data/portalData"

export type MemberConnectionStatus = "none" | "pending" | "connected"

interface PortalState {
  isAuthenticated: boolean
  activeClubId: string
  confirmedEvents: Record<number, boolean>
  connectedMembers: Record<number, "pending" | "connected">
  boughtExperiences: Record<number, boolean>
  memberStays: MemberStayReservation[]
  memberSubscription: MemberSubscription
  userProfile: UserProfile
  login: (email?: string, name?: string) => void
  logout: () => void
  setActiveClubId: (id: string) => void
  getActiveClub: () => Club
  toggleEventRSVP: (eventId: number) => boolean
  toggleConnect: (memberId: number) => MemberConnectionStatus
  getConnectionStatus: (memberId: number) => MemberConnectionStatus
  buyExperience: (experienceId: number) => void
  cancelStay: (stayReservationId: string) => void
  resetStays: () => void
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
      connectedMembers: {
        0: "connected",
        2: "connected",
        7: "connected",
        10: "connected",
        4: "pending",
        14: "pending"
      },
      boughtExperiences: {},
      memberStays: DEFAULT_MEMBER_STAYS,
      memberSubscription: DEFAULT_MEMBER_SUBSCRIPTION,
      userProfile: DEFAULT_USER,

      login: (email?: string, name?: string) => {
        const updatedProfile = { ...get().userProfile }
        if (email && email.trim()) {
          updatedProfile.email = email.trim()
        }
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

      getConnectionStatus: (memberId: number): MemberConnectionStatus => {
        return get().connectedMembers[memberId] || "none"
      },

      toggleConnect: (memberId: number): MemberConnectionStatus => {
        const current = get().connectedMembers[memberId]
        if (current === "connected" || current === "pending") {
          set((state) => {
            const copy = { ...state.connectedMembers }
            delete copy[memberId]
            return { connectedMembers: copy }
          })
          return "none"
        } else {
          set((state) => ({
            connectedMembers: {
              ...state.connectedMembers,
              [memberId]: "pending"
            }
          }))
          return "pending"
        }
      },

      buyExperience: (experienceId: number) => {
        set((state) => ({
          boughtExperiences: {
            ...state.boughtExperiences,
            [experienceId]: true
          }
        }))
      },

      cancelStay: (stayReservationId: string) => {
        set((state) => ({
          memberStays: state.memberStays.filter((s) => s.id !== stayReservationId)
        }))
      },

      resetStays: () => {
        set({
          memberStays: DEFAULT_MEMBER_STAYS
        })
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
      name: "clubkey-portal-storage-v4",
      version: 4,
      migrate: (persistedState: unknown) => {
        const state = persistedState as PortalState
        if (!state) return state
        const migratedState = { ...state }
        if (migratedState.userProfile?.name === "Marina Duarte" || !migratedState.userProfile?.name) {
          migratedState.userProfile = DEFAULT_USER
        }
        if (!migratedState.memberStays || migratedState.memberStays.length < DEFAULT_MEMBER_STAYS.length) {
          migratedState.memberStays = DEFAULT_MEMBER_STAYS
        }
        if (migratedState.connectedMembers) {
          const raw = migratedState.connectedMembers as Record<number, unknown>
          const fixed: Record<number, "pending" | "connected"> = {}
          for (const key in raw) {
            const val = raw[key]
            if (val === true || val === "connected") {
              fixed[Number(key)] = "connected"
            } else if (val === "pending") {
              fixed[Number(key)] = "pending"
            }
          }
          migratedState.connectedMembers = fixed
        }
        return migratedState
      },
      onRehydrateStorage: () => (state) => {
        if (state) {
          if (state.userProfile?.name === "Marina Duarte" || !state.userProfile?.name) {
            state.userProfile = DEFAULT_USER
          }
          if (!state.memberStays || state.memberStays.length < DEFAULT_MEMBER_STAYS.length) {
            state.memberStays = DEFAULT_MEMBER_STAYS
          }
        }
      }
    }
  )
)
