"use client"

import * as React from "react"

import Image from "next/image"

import {
  DEFAULT_CLAIMED_MILESTONES,
  TierDefinition,
} from "@/src/data/portalData"
import { usePortalStore } from "@/src/store/usePortalStore"
import { Check, LockSimple } from "@phosphor-icons/react"
import { motion } from "framer-motion"

import { CtaButton } from "@/src/components/common/ctaButton"

import { formatNumber } from "@/src/lib/formatters"
import { cn } from "@/src/lib/utils"

export interface MilestoneItem {
  index: number
  percent: number
  xpTarget: number
  rewardTokens: number
  isAchieved: boolean
  isClaimed: boolean
  isCurrent: boolean
  xpRemainingToMilestone: number
  segmentFillPercent: number
}

interface KeyPassMilestoneProgressProps {
  xp: number
  currentTier: TierDefinition
  nextTier: TierDefinition | null
  className?: string
}

export function KeyPassMilestoneProgress({
  xp,
  currentTier,
  nextTier,
  className,
}: KeyPassMilestoneProgressProps): React.JSX.Element {
  const { claimedMilestones, claimMilestone } = usePortalStore()
  const activeClaimed = claimedMilestones || DEFAULT_CLAIMED_MILESTONES
  const [justClaimedIndex, setJustClaimedIndex] = React.useState<number | null>(
    null
  )

  const handleClaim = (milestoneIndex: number) => {
    claimMilestone(currentTier.id, milestoneIndex)
    setJustClaimedIndex(milestoneIndex)
    setTimeout(() => setJustClaimedIndex(null), 2500)
  }

  if (!nextTier || currentTier.maxXp === null) {
    return (
      <div
        className={cn(
          "rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 sm:p-7 shadow-2xs space-y-4",
          className
        )}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-3">
          <div>
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block mb-0.5">
              Status Supremo
            </span>
            <h3 className="text-base font-heading font-black uppercase text-zinc-900 dark:text-white">
              {currentTier.name} • Cotação Máxima Global
            </h3>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-bold text-zinc-800 dark:text-zinc-200">
            <div className="relative w-4 h-4 shrink-0">
              <Image
                src="/utils/gamification/utils/RIB.svg"
                alt="RIB"
                fill
                className="object-contain"
              />
            </div>
            <span>Todos os 4 marcos (+2,0 RIB) conquistados</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="p-3.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/40 flex items-center justify-between"
            >
              <div className="space-y-0.5">
                <span className="text-[10px] font-bold text-zinc-500 uppercase block">
                  Marco {i} (100%)
                </span>
                <span className="text-xs font-black text-zinc-900 dark:text-white">
                  +0,5 RIB
                </span>
              </div>
              <div className="w-6 h-6 rounded-full bg-brand-primary text-white flex items-center justify-center">
                <Check className="w-3.5 h-3.5" weight="bold" />
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const baseXp = currentTier.minXp
  const targetXp = nextTier.minXp
  const totalRange = Math.max(1, targetXp - baseXp)
  const earnedXp = Math.max(0, xp - baseXp)
  const progressPercentage = Math.min(
    100,
    Math.max(0, Math.round((earnedXp / totalRange) * 100))
  )
  const totalXpNeeded = Math.max(0, targetXp - xp)

  const milestoneFractions = [0.25, 0.5, 0.75, 1.0]

  const milestones: MilestoneItem[] = milestoneFractions.map((fraction, i) => {
    const percent = Math.round(fraction * 100)
    const xpTarget = Math.round(baseXp + totalRange * fraction)
    const isAchieved = xp >= xpTarget
    const isClaimed =
      Boolean(activeClaimed[`${currentTier.id}_${i + 1}`]) ||
      (nextTier ? xp >= nextTier.minXp : true)
    const xpRemainingToMilestone = Math.max(0, xpTarget - xp)

    const segStart = i * 25
    const segEnd = (i + 1) * 25
    let segmentFillPercent = 0
    if (progressPercentage >= segEnd) {
      segmentFillPercent = 100
    } else if (progressPercentage <= segStart) {
      segmentFillPercent = 0
    } else {
      segmentFillPercent = Math.round(
        ((progressPercentage - segStart) / 25) * 100
      )
    }

    return {
      index: i + 1,
      percent,
      xpTarget,
      rewardTokens: 0.5,
      isAchieved,
      isClaimed,
      isCurrent: false,
      xpRemainingToMilestone,
      segmentFillPercent,
    }
  })

  const currentMilestoneIndex = milestones.findIndex((m) => !m.isAchieved)
  if (currentMilestoneIndex !== -1) {
    milestones[currentMilestoneIndex].isCurrent = true
  }

  return (
    <div
      className={cn(
        "rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 sm:p-6 shadow-2xs space-y-4",
        className
      )}
    >
      {}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="space-y-0.5 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
              Temporada • Evolução do Tier
            </span>
          </div>
          <div className="flex flex-wrap items-baseline gap-2">
            <h3 className="text-base sm:text-lg font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white">
              Progresso para {nextTier.name}
            </h3>
            <span className="text-xs font-bold text-zinc-500">
              • {formatNumber(xp)} / {formatNumber(targetXp)} XP (
              {progressPercentage}%)
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-zinc-600 dark:text-zinc-400 shrink-0 self-start sm:self-auto">
          <span>
            Faltam{" "}
            <strong className="text-zinc-900 dark:text-white font-black">
              {formatNumber(totalXpNeeded)} XP
            </strong>
          </span>
          <span className="inline-flex items-center gap-1 font-bold text-zinc-900 dark:text-white">
            <div className="relative w-3.5 h-3.5 shrink-0">
              <Image
                src="/utils/gamification/utils/RIB.svg"
                alt="RIB"
                fill
                className="object-contain"
              />
            </div>
            <span>(+2 RIB no tier)</span>
          </span>
        </div>
      </div>

      {}
      <div className="relative pt-6 pb-2">
        {}
        <div className="relative w-full h-3 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden border border-zinc-200/80 dark:border-zinc-700/60 z-0">
          <motion.div
            className="h-full bg-brand-primary rounded-full relative overflow-hidden"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "linear-gradient(45deg, rgba(255, 255, 255, 0.4) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.4) 50%, rgba(255, 255, 255, 0.4) 75%, transparent 75%, transparent)",
                backgroundSize: "1rem 1rem",
              }}
            />
          </motion.div>
        </div>

        {}
        <div className="absolute inset-x-0 top-0 bottom-0 pointer-events-none">
          {milestones.map((m) => {
            const isDone = m.isAchieved

            return (
              <div
                key={m.index}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-auto"
                style={{ left: `${m.percent}%` }}
              >
                {}
                <div
                  className={cn(
                    "w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 flex items-center justify-center transition-all shadow-xs shrink-0 mt-3.5",
                    isDone
                      ? "bg-brand-primary border-brand-primary text-white ring-4 ring-white dark:ring-zinc-900"
                      : "bg-white dark:bg-zinc-900 border-zinc-300 dark:border-zinc-700 text-zinc-400 ring-4 ring-white dark:ring-zinc-900"
                  )}
                >
                  {isDone ? (
                    <Check className="w-4 h-4" weight="bold" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-1">
        {milestones.map((milestone) => {
          const isClaimable = milestone.isAchieved && !milestone.isClaimed
          const isJustClaimed = justClaimedIndex === milestone.index

          return (
            <div
              key={milestone.index}
              className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-3.5 flex flex-col justify-between transition-all space-y-3"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-heading font-black uppercase text-zinc-900 dark:text-white tracking-tight">
                    Marco {milestone.index} ({milestone.percent}%)
                  </span>
                  <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400">
                    {formatNumber(milestone.xpTarget)} XP
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-black text-zinc-900 dark:text-white">
                  <div className="relative w-4 h-4 shrink-0">
                    <Image
                      src="/utils/gamification/utils/RIB.svg"
                      alt="RIB"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span>+0,5 RIB</span>
                </div>
              </div>

              <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800">
                {isClaimable ? (
                  <CtaButton
                    size="xs"
                    variant="primary"
                    isFullWidth
                    onClick={() => handleClaim(milestone.index)}
                    className="text-[11px] font-bold uppercase tracking-wider py-2"
                  >
                    Resgatar +0,5 RIB
                  </CtaButton>
                ) : isJustClaimed || milestone.isClaimed ? (
                  <div className="flex items-center gap-1.5 text-[11px] font-bold text-zinc-700 dark:text-zinc-300">
                    <div className="relative w-3.5 h-3.5 shrink-0">
                      <Image
                        src="/utils/icons/check.webp"
                        alt="Check"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span>0,5 RIB creditado</span>
                  </div>
                ) : milestone.isCurrent ? (
                  <div className="text-[10px] font-medium text-zinc-600 dark:text-zinc-400">
                    Faltam{" "}
                    <strong className="text-zinc-900 dark:text-white font-black">
                      {formatNumber(milestone.xpRemainingToMilestone)} XP
                    </strong>
                  </div>
                ) : (
                  <div className="flex items-center gap-1 text-[10px] text-zinc-400 font-medium">
                    <LockSimple className="w-3 h-3" />
                    <span>Meta de {milestone.percent}%</span>
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
