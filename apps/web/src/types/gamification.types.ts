import { TierId } from "./member.types"

export type { TierId }

export interface TierDefinition {
  id: TierId
  order: number
  name: string
  subtitle: string
  minXp: number
  maxXp: number | null
  image: string
  color: string
  badgeColor:
    | "default"
    | "primary"
    | "secondary"
    | "accent"
    | "success"
    | "warning"
    | "danger"
  isProtectedBase?: boolean
  isSpecialPinnacle?: boolean
  description: string
  perks: string[]
}

export interface XpActivity {
  id: string
  title: string
  xp: number
  date: string
  category:
    | "onboarding"
    | "hospedagem"
    | "evento"
    | "experiencia"
    | "conexao"
    | "missao"
    | "bonus"
}

export interface MissionItem {
  id: string
  title: string
  description: string
  category:
    | "onboarding"
    | "estadias"
    | "eventos"
    | "experiencias"
    | "networking"
    | "ranking"
  xpReward: number
  tokensReward?: number
  currentProgress: number
  totalRequired: number
  isCompleted: boolean
  isClaimed: boolean
  actionUrl?: string
  actionLabel?: string
}

export interface BadgeDefinition {
  id: string
  name: string
  description: string
  iconName: string
  category:
    | "onboarding"
    | "estadias"
    | "eventos"
    | "experiencias"
    | "networking"
    | "ranking"
    | "especial"
  unlockedAt?: string
  isUnlocked: boolean
  progress: number
  maxProgress: number
  xpBonus: number
  tokensBonus?: number
}

export interface WeeklyDropItem {
  id: string
  title: string
  description: string
  category: "estadias" | "eventos" | "experiencias" | "networking" | "especial"
  xpReward: number
  tokensReward: number
  expiresAt: string
  daysRemaining: number
  initialSecondsRemaining?: number
  currentProgress: number
  totalRequired: number
  isCompleted: boolean
  isClaimed: boolean
  actionUrl: string
  actionLabel: string
  tag: string
}

export type LeaderboardTimeframe = "all_time" | "monthly" | "quarterly"

export interface LeaderboardMember {
  rank: number
  id: number
  firstName: string
  lastName: string
  role: string
  company: string
  city: string
  avatar: string
  tierId: TierId
  xp: number
  ribTokens: number
  isCurrentUser?: boolean
  change?: number
}
