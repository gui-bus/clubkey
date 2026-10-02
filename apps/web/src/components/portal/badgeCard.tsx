"use client"

import * as React from "react"

import Image from "next/image"

import { type BadgeDefinition } from "@/src/data/portalData"
import {
  Buildings,
  CheckCircle,
  Compass,
  Crown,
  Lock,
  SealCheck,
  ShieldCheck,
  ShieldStar,
  Sparkle,
  Trophy,
  UsersThree,
  Wine,
} from "@phosphor-icons/react"

import { Progress } from "@/src/components/ui/progress/progress"

import { cn } from "@/src/lib/utils"

export interface BadgeCardProps {
  badge: BadgeDefinition
  className?: string
  showRewards?: boolean
}

export function getBadgeIcon(
  iconName: string,
  className?: string
): React.JSX.Element {
  switch (iconName) {
    case "ShieldStar":
      return <ShieldStar className={className} weight="bold" />
    case "ShieldCheck":
      return <ShieldCheck className={className} weight="bold" />
    case "Buildings":
      return <Buildings className={className} weight="bold" />
    case "Compass":
      return <Compass className={className} weight="bold" />
    case "Wine":
      return <Wine className={className} weight="bold" />
    case "UsersThree":
      return <UsersThree className={className} weight="bold" />
    case "Sparkle":
      return <Sparkle className={className} weight="bold" />
    case "Crown":
      return <Crown className={className} weight="bold" />
    case "SealCheck":
      return <SealCheck className={className} weight="bold" />
    default:
      return <Trophy className={className} weight="bold" />
  }
}

export function BadgeCard({
  badge,
  className,
  showRewards = true,
}: BadgeCardProps): React.JSX.Element {
  const progressPercent = Math.min(
    100,
    Math.round((badge.progress / badge.maxProgress) * 100)
  )

  return (
    <div
      className={cn(
        "group relative flex flex-col justify-between p-4 sm:p-5 rounded-sm border bg-white dark:bg-zinc-900 transition-all duration-200 shadow-2xs",
        badge.isUnlocked
          ? "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
          : "border-dashed border-zinc-300 dark:border-zinc-800 opacity-75 hover:opacity-100",
        className
      )}
    >
      <div>
        <div className="flex items-start justify-between gap-3 mb-3.5">
          <div className="relative shrink-0">
            <div
              className={cn(
                "w-11 h-11 rounded-sm flex items-center justify-center border transition-transform duration-200 group-hover:scale-105",
                badge.isUnlocked
                  ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white border-zinc-200 dark:border-zinc-700"
                  : "bg-zinc-100/60 dark:bg-zinc-800/50 text-zinc-400 dark:text-zinc-500 border-zinc-200/80 dark:border-zinc-700/60"
              )}
            >
              {getBadgeIcon(badge.iconName, "w-5 h-5")}
            </div>
            {badge.isUnlocked ? (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center ring-2 ring-white dark:ring-zinc-900 shadow-xs">
                <CheckCircle className="w-3.5 h-3.5" weight="fill" />
              </div>
            ) : (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-zinc-500 text-white flex items-center justify-center ring-2 ring-white dark:ring-zinc-900 shadow-xs">
                <Lock className="w-2.5 h-2.5" weight="bold" />
              </div>
            )}
          </div>

          {showRewards && (
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-zinc-700 dark:text-zinc-300 whitespace-nowrap shrink-0">
              <div className="relative w-3.5 h-3.5 shrink-0">
                <Image
                  src="/utils/gamification/utils/xp.webp"
                  alt="XP"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="whitespace-nowrap">+{badge.xpBonus} XP</span>
              {badge.tokensBonus && badge.tokensBonus > 0 ? (
                <>
                  <span className="text-zinc-300 dark:text-zinc-700">•</span>
                  <div className="relative w-3.5 h-3.5 shrink-0">
                    <Image
                      src="/utils/gamification/utils/RIB.svg"
                      alt="RIB"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="whitespace-nowrap">
                    +{badge.tokensBonus} RIB
                  </span>
                </>
              ) : null}
            </div>
          )}
        </div>

        <div className="space-y-1">
          <h4 className="text-sm font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white truncate">
            {badge.name}
          </h4>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal line-clamp-2">
            {badge.description}
          </p>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800">
        {badge.isUnlocked ? (
          <div className="flex items-center justify-between gap-2 text-[11px] whitespace-nowrap">
            <span className="text-emerald-600 dark:text-emerald-400 font-bold inline-flex items-center gap-1 shrink-0">
              <CheckCircle className="w-3.5 h-3.5 shrink-0" weight="bold" />
              <span>Conquistada</span>
            </span>
            {badge.unlockedAt ? (
              <span className="text-zinc-400 dark:text-zinc-500 text-[10px] truncate">
                {badge.unlockedAt}
              </span>
            ) : null}
          </div>
        ) : (
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[11px] whitespace-nowrap">
              <span className="text-zinc-500 dark:text-zinc-400 font-medium">
                Progresso
              </span>
              <span className="text-zinc-800 dark:text-zinc-200 font-bold tabular-nums">
                {badge.progress} / {badge.maxProgress} ({progressPercent}%)
              </span>
            </div>
            <Progress
              value={progressPercent}
              color="primary"
              size="sm"
              className="h-1.5 bg-zinc-100 dark:bg-zinc-800"
            />
          </div>
        )}
      </div>
    </div>
  )
}
