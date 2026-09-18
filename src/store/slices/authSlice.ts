import { StateCreator } from "zustand"

import type { PortalState } from "../usePortalStore"

export interface AuthSlice {
  isAuthenticated: boolean
  is2FAEnabled: boolean
  login: (email?: string, name?: string) => void
  logout: () => void
  enable2FA: () => void
  disable2FA: () => void
}

export const createAuthSlice: StateCreator<
  PortalState,
  [["zustand/persist", unknown]],
  [],
  AuthSlice
> = (set, get) => ({
  isAuthenticated: true,
  is2FAEnabled: true,

  login: (email?: string, name?: string) => {
    const updatedProfile = { ...get().userProfile }
    if (email && email.trim()) {
      updatedProfile.email = email.trim()
    }
    if (name && name.trim()) {
      const parts = name.trim().split(/\s+/)
      updatedProfile.firstName = parts[0]
      updatedProfile.lastName = parts.slice(1).join(" ")
    } else if (email && email.includes("@")) {
      const username = email.split("@")[0]
      const formatted = username.charAt(0).toUpperCase() + username.slice(1)
      if (!updatedProfile.firstName) {
        updatedProfile.firstName = formatted
        updatedProfile.lastName = ""
      }
    }
    set({
      isAuthenticated: true,
      userProfile: updatedProfile,
    })
  },

  logout: () => {
    set({
      isAuthenticated: false,
    })
  },

  enable2FA: () => {
    if (get().is2FAEnabled) return
    set((state) => ({
      is2FAEnabled: true,
      missions: state.missions.map((m) =>
        m.id === "two_factor_auth"
          ? { ...m, isCompleted: true, currentProgress: 1 }
          : m
      ),
      badges: state.badges.map((b) =>
        b.id === "badge_blindagem_digital"
          ? {
              ...b,
              isUnlocked: true,
              unlockedAt: new Intl.DateTimeFormat("pt-BR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              }).format(new Date()),
              progress: 1,
            }
          : b
      ),
    }))
    get().addXP(250, "Ativação de Autenticação 2FA", "onboarding")
  },

  disable2FA: () => {
    set({ is2FAEnabled: false })
  },
})
