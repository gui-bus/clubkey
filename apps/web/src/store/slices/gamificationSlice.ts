import {
  DEFAULT_BADGES,
  DEFAULT_CLAIMED_MILESTONES,
  DEFAULT_MISSIONS,
  DEFAULT_TIERS,
  DEFAULT_WEEKLY_DROPS,
  DEFAULT_XP_ACTIVITIES,
  getTierByXp,
} from "@/src/data/portalData"
import type {
  BadgeDefinition,
  LeaderboardTimeframe,
  MissionItem,
  TierDefinition,
  TierId,
  WeeklyDropItem,
  XpActivity,
} from "@/src/types"
import { StateCreator } from "zustand"

import type { PortalState } from "../usePortalStore"

export interface GamificationSlice {
  xp: number
  ribTokens: number
  lastActivityDate: string
  isTierFrozen: boolean
  claimedMilestones: Record<string, boolean>
  tiers: TierDefinition[]
  missions: MissionItem[]
  badges: BadgeDefinition[]
  weeklyDrops: WeeklyDropItem[]
  leaderboardTimeframe: LeaderboardTimeframe
  leaderboardTierFilter: "all" | TierId
  xpHistory: XpActivity[]
  setTiers: (tiers: TierDefinition[]) => void
  getUserTier: () => TierDefinition
  setLeaderboardTimeframe: (timeframe: LeaderboardTimeframe) => void
  setLeaderboardTierFilter: (tier: "all" | TierId) => void
  claimMilestone: (tierId: string, milestoneIndex: number) => void
  addXP: (
    amount: number,
    title: string,
    category: XpActivity["category"],
    tokensBonus?: number
  ) => void
  claimMission: (missionId: string) => void
  claimWeeklyDrop: (dropId: string) => void
  unlockBadge: (badgeId: string) => void
  updateMissionProgress: (missionId: string, progressDelta: number) => void
}

export const createGamificationSlice: StateCreator<
  PortalState,
  [["zustand/persist", unknown]],
  [],
  GamificationSlice
> = (set, get) => ({
  xp: 4000,
  ribTokens: 6,
  lastActivityDate: new Date().toISOString(),
  isTierFrozen: false,
  claimedMilestones: DEFAULT_CLAIMED_MILESTONES,
  tiers: DEFAULT_TIERS,
  missions: DEFAULT_MISSIONS,
  badges: DEFAULT_BADGES,
  weeklyDrops: DEFAULT_WEEKLY_DROPS,
  leaderboardTimeframe: "all_time",
  leaderboardTierFilter: "all",
  xpHistory: DEFAULT_XP_ACTIVITIES,

  setTiers: (tiers: TierDefinition[]) => {
    set({ tiers })
  },

  getUserTier: () => {
    const xp = get().xp
    const isFrozen = get().isTierFrozen
    const claimed = get().claimedMilestones || DEFAULT_CLAIMED_MILESTONES
    return getTierByXp(xp, false, isFrozen, claimed)
  },

  setLeaderboardTimeframe: (timeframe: LeaderboardTimeframe) => {
    set({ leaderboardTimeframe: timeframe })
  },

  setLeaderboardTierFilter: (tier: "all" | TierId) => {
    set({ leaderboardTierFilter: tier })
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

  claimWeeklyDrop: (dropId: string) => {
    const drop = get().weeklyDrops.find((d) => d.id === dropId)
    if (!drop || !drop.isCompleted || drop.isClaimed) return
    set((state) => ({
      weeklyDrops: state.weeklyDrops.map((d) =>
        d.id === dropId ? { ...d, isClaimed: true } : d
      ),
    }))
    get().addXP(
      drop.xpReward,
      `Drop Semanal resgatado: ${drop.title}`,
      "bonus",
      drop.tokensReward || 0
    )
  },

  unlockBadge: (badgeId: string) => {
    const badge = get().badges.find((b) => b.id === badgeId)
    if (!badge || badge.isUnlocked) return
    const nowStr = new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(new Date())
    set((state) => ({
      badges: state.badges.map((b) =>
        b.id === badgeId
          ? {
              ...b,
              isUnlocked: true,
              unlockedAt: nowStr,
              progress: b.maxProgress,
            }
          : b
      ),
    }))
    get().addXP(
      badge.xpBonus,
      `Insígnia desbloqueada: ${badge.name}`,
      "bonus",
      badge.tokensBonus || 0
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
})
