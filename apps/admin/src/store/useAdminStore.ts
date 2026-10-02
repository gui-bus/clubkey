import { create } from "zustand"

export interface AdminUserProfile {
  firstName: string
  lastName: string
  name: string
  email: string
  role: string
  department: string
  phone: string
  cpf: string
  birthDate: string
  nationality?: "brasileiro" | "estrangeiro"
  bio: string
  avatar: string
  coverImage: string
  is2FAEnabled: boolean
}

export interface AdminStoreState {
  adminUser: AdminUserProfile
  updateProfile: (partial: Partial<AdminUserProfile>) => void
  updateAvatar: (avatar: string) => void
  updateCover: (coverImage: string) => void
  enable2FA: () => void
  disable2FA: () => void
  syncFromStorage: () => void
}

const DEFAULT_ADMIN_USER: AdminUserProfile = {
  firstName: "William",
  lastName: "Tabata",
  name: "William Tabata",
  email: "admin@clubkey.com.br",
  role: "SUPER ADMIN",
  department: "Governança & Operações",
  phone: "(11) 98765-4321",
  cpf: "123.456.789-00",
  birthDate: "15/04/1988",
  nationality: "brasileiro",
  bio: "Líder de governança corporativa e gestão operacional na plataforma ClubKey.",
  avatar:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80",
  coverImage: "/utils/banners/pessoas.webp",
  is2FAEnabled: true,
}

export const useAdminStore = create<AdminStoreState>((set) => ({
  adminUser: DEFAULT_ADMIN_USER,

  updateProfile: (partial) =>
    set((state) => {
      const updatedUser = {
        ...state.adminUser,
        ...partial,
      }

      if (partial.firstName || partial.lastName) {
        const first = partial.firstName ?? state.adminUser.firstName
        const last = partial.lastName ?? state.adminUser.lastName
        updatedUser.name = `${first} ${last}`.trim()
      }

      try {
        if (typeof window !== "undefined") {
          localStorage.setItem(
            "clubkey_admin_user",
            JSON.stringify({
              email: updatedUser.email,
              name: updatedUser.name,
              role: updatedUser.role,
              avatar: updatedUser.avatar,
              coverImage: updatedUser.coverImage,
              is2FAEnabled: updatedUser.is2FAEnabled,
            })
          )
        }
      } catch {}

      return { adminUser: updatedUser }
    }),

  updateAvatar: (avatar) =>
    set((state) => {
      const updatedUser = { ...state.adminUser, avatar }
      try {
        if (typeof window !== "undefined") {
          const stored = localStorage.getItem("clubkey_admin_user")
          const parsed = stored ? JSON.parse(stored) : {}
          localStorage.setItem(
            "clubkey_admin_user",
            JSON.stringify({ ...parsed, avatar })
          )
        }
      } catch {}
      return { adminUser: updatedUser }
    }),

  updateCover: (coverImage) =>
    set((state) => {
      const updatedUser = { ...state.adminUser, coverImage }
      try {
        if (typeof window !== "undefined") {
          const stored = localStorage.getItem("clubkey_admin_user")
          const parsed = stored ? JSON.parse(stored) : {}
          localStorage.setItem(
            "clubkey_admin_user",
            JSON.stringify({ ...parsed, coverImage })
          )
        }
      } catch {}
      return { adminUser: updatedUser }
    }),

  enable2FA: () =>
    set((state) => {
      const updatedUser = { ...state.adminUser, is2FAEnabled: true }
      try {
        if (typeof window !== "undefined") {
          const stored = localStorage.getItem("clubkey_admin_user")
          const parsed = stored ? JSON.parse(stored) : {}
          localStorage.setItem(
            "clubkey_admin_user",
            JSON.stringify({ ...parsed, is2FAEnabled: true })
          )
        }
      } catch {}
      return { adminUser: updatedUser }
    }),

  disable2FA: () =>
    set((state) => {
      const updatedUser = { ...state.adminUser, is2FAEnabled: false }
      try {
        if (typeof window !== "undefined") {
          const stored = localStorage.getItem("clubkey_admin_user")
          const parsed = stored ? JSON.parse(stored) : {}
          localStorage.setItem(
            "clubkey_admin_user",
            JSON.stringify({ ...parsed, is2FAEnabled: false })
          )
        }
      } catch {}
      return { adminUser: updatedUser }
    }),

  syncFromStorage: () => {
    try {
      if (typeof window !== "undefined") {
        const stored = localStorage.getItem("clubkey_admin_user")
        if (stored) {
          const parsed = JSON.parse(stored)
          set((state) => ({
            adminUser: {
              ...state.adminUser,
              ...(parsed.email && { email: parsed.email }),
              ...(parsed.name && { name: parsed.name }),
              ...(parsed.role && { role: parsed.role }),
              ...(parsed.avatar && { avatar: parsed.avatar }),
              ...(parsed.coverImage && { coverImage: parsed.coverImage }),
              ...(typeof parsed.is2FAEnabled === "boolean" && {
                is2FAEnabled: parsed.is2FAEnabled,
              }),
            },
          }))
        }
      }
    } catch {}
  },
}))
