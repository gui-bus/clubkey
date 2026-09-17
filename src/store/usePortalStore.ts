import {
  CLUBS,
  ChatMessage,
  Club,
  DEFAULT_CHAT_MESSAGES,
  DEFAULT_CLAIMED_MILESTONES,
  DEFAULT_MEMBER_STAYS,
  DEFAULT_MEMBER_SUBSCRIPTION,
  DEFAULT_MISSIONS,
  DEFAULT_USER,
  DEFAULT_XP_ACTIVITIES,
  MemberStayReservation,
  MemberSubscription,
  MissionItem,
  TierDefinition,
  UserProfile,
  XpActivity,
  getTierByXp,
} from "@/src/data/portalData"
import { create } from "zustand"
import { persist } from "zustand/middleware"

export type MemberConnectionStatus = "none" | "pending" | "connected"

interface PortalState {
  isAuthenticated: boolean
  activeClubId: string
  confirmedEvents: Record<number, boolean>
  connectedMembers: Record<number, "pending" | "connected">
  receivedPendingInvites: number[]
  boughtExperiences: Record<number, boolean>
  memberStays: MemberStayReservation[]
  memberSubscription: MemberSubscription
  userProfile: UserProfile
  xp: number
  ribTokens: number
  is2FAEnabled: boolean
  isProfileCompleted: boolean
  lastActivityDate: string
  isTierFrozen: boolean
  claimedMilestones: Record<string, boolean>
  missions: MissionItem[]
  xpHistory: XpActivity[]
  chatMessages: Record<number, ChatMessage[]>
  activeChatMemberId: number | null
  isChatOpen: boolean
  isChatMinimized: boolean
  login: (email?: string, name?: string) => void
  logout: () => void
  setActiveClubId: (id: string) => void
  getActiveClub: () => Club
  toggleEventRSVP: (eventId: number) => boolean
  toggleConnect: (memberId: number) => MemberConnectionStatus
  getConnectionStatus: (memberId: number) => MemberConnectionStatus
  acceptInvite: (memberId: number) => void
  declineInvite: (memberId: number) => void
  cancelSentInvite: (memberId: number) => void
  removeConnection: (memberId: number) => void
  buyExperience: (experienceId: number) => void
  cancelStay: (stayReservationId: string) => void
  resetStays: () => void
  updateProfile: (profile: Partial<UserProfile>) => void
  addSeekingTag: (tag: string) => void
  removeSeekingTag: (index: number) => void
  addOfferingTag: (tag: string) => void
  removeOfferingTag: (index: number) => void
  addXP: (
    amount: number,
    title: string,
    category: XpActivity["category"],
    tokensBonus?: number
  ) => void
  enable2FA: () => void
  disable2FA: () => void
  claimMission: (missionId: string) => void
  claimMilestone: (tierId: string, milestoneIndex: number) => void
  updateMissionProgress: (missionId: string, progressDelta: number) => void
  getUserTier: () => TierDefinition
  openChat: (memberId?: number) => void
  closeChat: () => void
  minimizeChat: () => void
  maximizeChat: () => void
  toggleChat: (memberId?: number) => void
  sendChatMessage: (memberId: number, text: string) => void
  markChatAsRead: (memberId: number) => void
  deleteChatConversation: (memberId: number) => void
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
        14: "pending",
      },
      receivedPendingInvites: [1, 5, 9],
      boughtExperiences: {},
      memberStays: DEFAULT_MEMBER_STAYS,
      memberSubscription: DEFAULT_MEMBER_SUBSCRIPTION,
      userProfile: DEFAULT_USER,
      xp: 4000,
      ribTokens: 6,
      is2FAEnabled: true,
      isProfileCompleted: true,
      lastActivityDate: new Date().toISOString(),
      isTierFrozen: false,
      claimedMilestones: DEFAULT_CLAIMED_MILESTONES,
      missions: DEFAULT_MISSIONS,
      xpHistory: DEFAULT_XP_ACTIVITIES,
      chatMessages: DEFAULT_CHAT_MESSAGES,
      activeChatMemberId: 2,
      isChatOpen: false,
      isChatMinimized: false,

      login: (email?: string, name?: string) => {
        const updatedProfile = { ...get().userProfile }
        if (email && email.trim()) {
          updatedProfile.email = email.trim()
        }
        if (name && name.trim()) {
          updatedProfile.name = name.trim()
        } else if (email && email.includes("@")) {
          const username = email.split("@")[0]
          const formatted = username.charAt(0).toUpperCase() + username.slice(1)
          if (!updatedProfile.name) {
            updatedProfile.name = formatted
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

      setActiveClubId: (id: string) => set({ activeClubId: id }),

      getActiveClub: () => {
        const id = get().activeClubId
        return CLUBS.find((c) => c.id === id) || CLUBS[0]
      },

      getUserTier: () => {
        const xp = get().xp
        const isFrozen = get().isTierFrozen
        const claimed = get().claimedMilestones || DEFAULT_CLAIMED_MILESTONES
        return getTierByXp(xp, false, isFrozen, claimed)
      },

      claimMilestone: (tierId: string, milestoneIndex: number) => {
        const key = `${tierId}_${milestoneIndex}`
        const claimed = get().claimedMilestones || DEFAULT_CLAIMED_MILESTONES
        if (claimed[key]) return

        const updatedClaimed = {
          ...claimed,
          [key]: true,
        }

        const newActivity: XpActivity = {
          id: `milestone-${Date.now()}-${milestoneIndex}`,
          title: `Recompensa de Marco ${milestoneIndex} (+0,5 RIB)`,
          xp: 0,
          date: new Intl.DateTimeFormat("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }).format(new Date()),
          category: "bonus",
        }

        set((state) => ({
          ribTokens: Number((state.ribTokens + 0.5).toFixed(1)),
          claimedMilestones: updatedClaimed,
          xpHistory: [newActivity, ...state.xpHistory],
        }))
      },

      addXP: (
        amount: number,
        title: string,
        category: XpActivity["category"],
        tokensBonus: number = 0
      ) => {
        const currentXp = get().xp
        const currentTier = getTierByXp(currentXp, false, get().isTierFrozen)
        const newXp = currentXp + amount
        const newTier = getTierByXp(newXp, false, false)
        const leveledUp = newTier.order > currentTier.order
        const earnedTokens = tokensBonus + (leveledUp ? 2 : 0)

        const newActivity: XpActivity = {
          id: `act-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          title: title,
          xp: amount,
          date: new Intl.DateTimeFormat("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          }).format(new Date()),
          category: category,
        }

        const bonusActivity: XpActivity | null = leveledUp
          ? {
              id: `promo-${Date.now()}`,
              title: `Subida de tier para o Tier ${newTier.name} (+2 RIB)`,
              xp: 0,
              date: new Intl.DateTimeFormat("pt-BR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              }).format(new Date()),
              category: "bonus",
            }
          : null

        const combinedHistory = [
          bonusActivity,
          newActivity,
          ...get().xpHistory,
        ].filter((item): item is XpActivity => Boolean(item))

        set((state) => ({
          xp: newXp,
          ribTokens: state.ribTokens + earnedTokens,
          lastActivityDate: new Date().toISOString(),
          isTierFrozen: false,
          xpHistory: combinedHistory,
        }))
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
        }))
        get().addXP(250, "Ativação de Autenticação 2FA", "onboarding")
      },

      disable2FA: () => {
        set({ is2FAEnabled: false })
      },

      claimMission: (missionId: string) => {
        const mission = get().missions.find((m) => m.id === missionId)
        if (!mission || !mission.isCompleted || mission.isClaimed) return
        set((state) => ({
          missions: state.missions.map((m) =>
            m.id === missionId ? { ...m, isClaimed: true } : m
          ),
        }))
        get().addXP(
          mission.xpReward,
          `Conquista resgatada: ${mission.title}`,
          "missao",
          mission.tokensReward || 0
        )
      },

      updateMissionProgress: (missionId: string, progressDelta: number) => {
        set((state) => ({
          missions: state.missions.map((m) => {
            if (m.id === missionId) {
              const nextProgress = Math.min(
                m.totalRequired,
                m.currentProgress + progressDelta
              )
              return {
                ...m,
                currentProgress: nextProgress,
                isCompleted: nextProgress >= m.totalRequired,
              }
            }
            return m
          }),
        }))
      },

      toggleEventRSVP: (eventId: number) => {
        const current = !!get().confirmedEvents[eventId]
        const next = !current
        set((state) => ({
          confirmedEvents: {
            ...state.confirmedEvents,
            [eventId]: next,
          },
        }))
        if (next) {
          get().addXP(
            200,
            `Presença confirmada no evento #${eventId}`,
            "evento"
          )
          const confirmedCount = Object.keys(get().confirmedEvents).filter(
            (k) => !!get().confirmedEvents[Number(k)]
          ).length
          set((state) => ({
            missions: state.missions.map((m) => {
              if (m.id === "events_attendee") {
                const count = Math.min(m.totalRequired, confirmedCount)
                return {
                  ...m,
                  currentProgress: count,
                  isCompleted: count >= m.totalRequired,
                }
              }
              return m
            }),
          }))
        }
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
              [memberId]: "connected",
            },
          }))
          get().addXP(50, `Nova conexão profissional estabelecida`, "conexao")
          const connectedCount = Object.values(get().connectedMembers).filter(
            (v) => v === "connected"
          ).length
          set((state) => ({
            missions: state.missions.map((m) => {
              if (
                m.id === "connections_5" ||
                m.id === "connections_10" ||
                m.id === "connections_20"
              ) {
                const count = Math.min(m.totalRequired, connectedCount)
                return {
                  ...m,
                  currentProgress: count,
                  isCompleted: count >= m.totalRequired,
                }
              }
              return m
            }),
          }))
          return "connected"
        }
      },

      acceptInvite: (memberId: number) => {
        set((state) => ({
          connectedMembers: {
            ...state.connectedMembers,
            [memberId]: "connected",
          },
          receivedPendingInvites: state.receivedPendingInvites.filter(
            (id) => id !== memberId
          ),
        }))
        get().addXP(50, `Convite de conexão aceito`, "conexao")
        const connectedCount = Object.values(get().connectedMembers).filter(
          (v) => v === "connected"
        ).length
        set((state) => ({
          missions: state.missions.map((m) => {
            if (
              m.id === "connections_5" ||
              m.id === "connections_10" ||
              m.id === "connections_20"
            ) {
              const count = Math.min(m.totalRequired, connectedCount)
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

      declineInvite: (memberId: number) => {
        set((state) => ({
          receivedPendingInvites: state.receivedPendingInvites.filter(
            (id) => id !== memberId
          ),
        }))
      },

      cancelSentInvite: (memberId: number) => {
        set((state) => {
          const copy = { ...state.connectedMembers }
          delete copy[memberId]
          return { connectedMembers: copy }
        })
      },

      removeConnection: (memberId: number) => {
        set((state) => {
          const copy = { ...state.connectedMembers }
          delete copy[memberId]
          return { connectedMembers: copy }
        })
        const connectedCount = Object.values(get().connectedMembers).filter(
          (v) => v === "connected"
        ).length
        set((state) => ({
          missions: state.missions.map((m) => {
            if (
              m.id === "connections_5" ||
              m.id === "connections_10" ||
              m.id === "connections_20"
            ) {
              const count = Math.min(m.totalRequired, connectedCount)
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

      buyExperience: (experienceId: number) => {
        set((state) => ({
          boughtExperiences: {
            ...state.boughtExperiences,
            [experienceId]: true,
          },
        }))
        get().addXP(
          250,
          `Experiência garantida #${experienceId}`,
          "experiencia"
        )
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
          memberStays: state.memberStays.filter(
            (s) => s.id !== stayReservationId
          ),
        }))
      },

      resetStays: () => {
        set({
          memberStays: DEFAULT_MEMBER_STAYS,
        })
      },

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

      openChat: (memberId?: number) => {
        const targetId = memberId ?? get().activeChatMemberId ?? 2
        set((state) => {
          const currentList = state.chatMessages[targetId] || []
          const updatedList = currentList.map((msg) => ({ ...msg, read: true }))
          return {
            isChatOpen: true,
            isChatMinimized: false,
            activeChatMemberId: targetId,
            chatMessages: {
              ...state.chatMessages,
              [targetId]: updatedList,
            },
          }
        })
      },

      closeChat: () => {
        set({ isChatOpen: false, isChatMinimized: false })
      },

      minimizeChat: () => {
        set({ isChatMinimized: true })
      },

      maximizeChat: () => {
        set({ isChatMinimized: false, isChatOpen: true })
      },

      toggleChat: (memberId?: number) => {
        const currentOpen = get().isChatOpen
        const currentMinimized = get().isChatMinimized
        const currentActive = get().activeChatMemberId
        if (memberId && memberId !== currentActive) {
          get().openChat(memberId)
          return
        }
        if (currentOpen && !currentMinimized) {
          set({ isChatOpen: false })
        } else {
          get().openChat(memberId ?? currentActive ?? 2)
        }
      },

      sendChatMessage: (memberId: number, text: string) => {
        const trimmed = text.trim()
        if (!trimmed) return
        const now = new Date()
        const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`
        const newMsg: ChatMessage = {
          id: `msg-${Date.now()}`,
          senderId: "user",
          text: trimmed,
          timestamp: timeStr,
          read: true,
        }
        set((state) => ({
          chatMessages: {
            ...state.chatMessages,
            [memberId]: [...(state.chatMessages[memberId] || []), newMsg],
          },
          isChatOpen: true,
          isChatMinimized: false,
          activeChatMemberId: memberId,
        }))
      },

      markChatAsRead: (memberId: number) => {
        set((state) => {
          const currentList = state.chatMessages[memberId] || []
          return {
            chatMessages: {
              ...state.chatMessages,
              [memberId]: currentList.map((m) => ({ ...m, read: true })),
            },
          }
        })
      },

      deleteChatConversation: (memberId: number) => {
        set((state) => {
          const updated = { ...state.chatMessages }
          delete updated[memberId]
          const remainingIds = Object.keys(updated).map(Number)
          const nextActiveId = remainingIds.length > 0 ? remainingIds[0] : null
          const shouldClose = remainingIds.length === 0
          return {
            chatMessages: updated,
            activeChatMemberId: nextActiveId,
            isChatOpen: shouldClose ? false : state.isChatOpen,
            isChatMinimized: shouldClose ? false : state.isChatMinimized,
          }
        })
      },
    }),
    {
      name: "clubkey-portal-storage-v7",
      version: 7,
      migrate: (persistedState: unknown) => {
        const state = persistedState as PortalState
        if (!state) return state
        const migratedState = { ...state }
        if (!migratedState.chatMessages) {
          migratedState.chatMessages = DEFAULT_CHAT_MESSAGES
        }
        if (typeof migratedState.activeChatMemberId !== "number") {
          migratedState.activeChatMemberId = 2
        }
        if (typeof migratedState.isChatOpen !== "boolean") {
          migratedState.isChatOpen = false
        }
        if (typeof migratedState.isChatMinimized !== "boolean") {
          migratedState.isChatMinimized = false
        }
        if (
          migratedState.userProfile?.name === "Marina Duarte" ||
          !migratedState.userProfile?.name
        ) {
          migratedState.userProfile = DEFAULT_USER
        }
        if (
          !migratedState.memberStays ||
          migratedState.memberStays.length < DEFAULT_MEMBER_STAYS.length
        ) {
          migratedState.memberStays = DEFAULT_MEMBER_STAYS
        }
        if (typeof migratedState.xp !== "number" || migratedState.xp === 2850) {
          migratedState.xp = 4000
        }
        if (typeof migratedState.ribTokens !== "number") {
          migratedState.ribTokens = 6
        }
        if (typeof migratedState.is2FAEnabled !== "boolean") {
          migratedState.is2FAEnabled = true
        }
        if (!migratedState.missions || migratedState.missions.length === 0) {
          migratedState.missions = DEFAULT_MISSIONS
        }
        if (!migratedState.xpHistory || migratedState.xpHistory.length === 0) {
          migratedState.xpHistory = DEFAULT_XP_ACTIVITIES
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
          if (
            state.userProfile?.name === "Marina Duarte" ||
            !state.userProfile?.name
          ) {
            state.userProfile = DEFAULT_USER
          }
          if (
            !state.memberStays ||
            state.memberStays.length < DEFAULT_MEMBER_STAYS.length
          ) {
            state.memberStays = DEFAULT_MEMBER_STAYS
          }
          if (typeof state.xp !== "number" || state.xp === 2850) {
            state.xp = 4000
          }
          if (typeof state.ribTokens !== "number") {
            state.ribTokens = 6
          }
          if (typeof state.is2FAEnabled !== "boolean") {
            state.is2FAEnabled = true
          }
          if (!state.missions || state.missions.length === 0) {
            state.missions = DEFAULT_MISSIONS
          }
          if (!state.xpHistory || state.xpHistory.length === 0) {
            state.xpHistory = DEFAULT_XP_ACTIVITIES
          }
        }
      },
    }
  )
)
