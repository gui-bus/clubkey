import {
  DEFAULT_BADGES,
  DEFAULT_CHAT_MESSAGES,
  DEFAULT_MEMBER_STAYS,
  DEFAULT_MISSIONS,
  DEFAULT_TIERS,
  DEFAULT_USER,
  DEFAULT_WEEKLY_DROPS,
  DEFAULT_XP_ACTIVITIES,
} from "@/src/data/portalData"
import type { MemberConnectionStatus } from "@/src/types"
import { create } from "zustand"
import { persist } from "zustand/middleware"

import { type AuthSlice, createAuthSlice } from "./slices/authSlice"
import { type ChatSlice, createChatSlice } from "./slices/chatSlice"
import { type EventsSlice, createEventsSlice } from "./slices/eventsSlice"
import {
  type GamificationSlice,
  createGamificationSlice,
} from "./slices/gamificationSlice"
import {
  type NetworkingSlice,
  createNetworkingSlice,
} from "./slices/networkingSlice"
import { type ProfileSlice, createProfileSlice } from "./slices/profileSlice"
import { type StaysSlice, createStaysSlice } from "./slices/staysSlice"

export type { MemberConnectionStatus }

export type PortalState = AuthSlice &
  ProfileSlice &
  ChatSlice &
  NetworkingSlice &
  EventsSlice &
  StaysSlice &
  GamificationSlice

export const usePortalStore = create<PortalState>()(
  persist(
    (...a) => ({
      ...createAuthSlice(...a),
      ...createProfileSlice(...a),
      ...createChatSlice(...a),
      ...createNetworkingSlice(...a),
      ...createEventsSlice(...a),
      ...createStaysSlice(...a),
      ...createGamificationSlice(...a),
    }),
    {
      name: "clubkey-portal-storage-v8",
      version: 8,
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
          !migratedState.userProfile?.firstName ||
          migratedState.userProfile?.firstName === "Marina"
        ) {
          migratedState.userProfile = DEFAULT_USER
        }
        if (
          !migratedState.memberStays ||
          migratedState.memberStays.length < DEFAULT_MEMBER_STAYS.length
        ) {
          migratedState.memberStays = DEFAULT_MEMBER_STAYS
        } else {
          migratedState.memberStays = migratedState.memberStays.map((s) => ({
            ...s,
            status:
              (s.status as string) === "confirmada"
                ? "confirmed"
                : (s.status as string) === "em_analise"
                  ? "pending"
                  : (s.status as string) === "concluida"
                    ? "completed"
                    : s.status,
          }))
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
        if (!migratedState.tiers || migratedState.tiers.length === 0) {
          migratedState.tiers = DEFAULT_TIERS
        }
        if (!migratedState.badges || migratedState.badges.length === 0) {
          migratedState.badges = DEFAULT_BADGES
        }
        migratedState.weeklyDrops = DEFAULT_WEEKLY_DROPS
        if (!migratedState.leaderboardTimeframe) {
          migratedState.leaderboardTimeframe = "all_time"
        }
        if (!migratedState.leaderboardTierFilter) {
          migratedState.leaderboardTierFilter = "all"
        }
        if (migratedState.connectedMembers) {
          const raw = migratedState.connectedMembers as Record<number, unknown>
          const fixed: Record<number, "pending" | "connected"> = {}
          for (const k of Object.keys(raw)) {
            const numK = Number(k)
            if (raw[numK] === "connected" || raw[numK] === true) {
              fixed[numK] = "connected"
            } else if (raw[numK] === "pending") {
              fixed[numK] = "pending"
            }
          }
          migratedState.connectedMembers = fixed
        }
        return migratedState
      },
    }
  )
)
