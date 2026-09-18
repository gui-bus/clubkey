"use client"

import * as React from "react"

import { DEFAULT_BADGES } from "@/src/data/portalData"
import type { BadgeDefinition, Member } from "@/src/types"
import { CheckCircle, Lock } from "@phosphor-icons/react"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/src/components/ui/tooltip/tooltip"

import { getBadgeIcon } from "@/src/components/portal/badgeCard"

import { cn } from "@/src/lib/utils"

interface MemberProfileBadgesProps {
  member: Member
  selectedBadge: BadgeDefinition | null
  onSelectBadge: (badge: BadgeDefinition | null) => void
}

export function MemberProfileBadges({
  member,
  selectedBadge,
  onSelectBadge,
}: MemberProfileBadgesProps): React.JSX.Element {
  const memberUnlockedBadges = DEFAULT_BADGES.filter((b) =>
    member.unlockedBadgeIds?.includes(b.id)
  )

  return (
    <section className="space-y-6 pt-8 border-t border-zinc-200 dark:border-zinc-800">
      <div>
        <span className="text-xs font-black uppercase tracking-widest text-brand-primary block mb-1">
          Conquistas
        </span>
        <div className="flex flex-wrap items-baseline gap-2">
          <h2 className="text-xl sm:text-2xl font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white">
            Insígnias Desbloqueadas
          </h2>
          <span className="text-xs sm:text-sm font-bold text-zinc-500 dark:text-zinc-400">
            ({memberUnlockedBadges.length} de {DEFAULT_BADGES.length})
          </span>
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 sm:hidden">
          Toque em uma insígnia para ver detalhes.
        </p>
      </div>

      <TooltipProvider delayDuration={100}>
        <div className="grid grid-cols-4 sm:flex sm:flex-wrap gap-2.5 sm:gap-3">
          {DEFAULT_BADGES.map((badge) => {
            const isUnlocked =
              member.unlockedBadgeIds?.includes(badge.id) ?? false
            const isSelected = selectedBadge?.id === badge.id

            if (isUnlocked) {
              return (
                <Tooltip key={badge.id} delayDuration={100}>
                  <TooltipTrigger asChild>
                    <button
                      type="button"
                      onClick={() => onSelectBadge(isSelected ? null : badge)}
                      className={cn(
                        "group relative aspect-square sm:aspect-auto w-full sm:w-16 sm:h-16 rounded-sm bg-zinc-100 dark:bg-zinc-800 border text-zinc-900 dark:text-white flex items-center justify-center transition-all duration-200 hover:scale-105 shadow-2xs cursor-pointer focus:outline-hidden",
                        isSelected
                          ? "border-zinc-900 dark:border-white ring-2 ring-zinc-900/20 dark:ring-white/20"
                          : "border-zinc-200 dark:border-zinc-700 hover:border-zinc-400 dark:hover:border-zinc-500"
                      )}
                    >
                      {getBadgeIcon(
                        badge.iconName,
                        "w-6 h-6 sm:w-7 sm:h-7 shrink-0 text-zinc-900 dark:text-white"
                      )}
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center ring-2 ring-white dark:ring-zinc-900 shadow-xs">
                        <CheckCircle className="w-3.5 h-3.5" weight="fill" />
                      </div>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent
                    side="top"
                    align="center"
                    sideOffset={8}
                    variant="bordered"
                    showArrow={true}
                    className="hidden sm:block p-3.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-sm shadow-xl max-w-xs text-left pointer-events-none"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-sm bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-900 dark:text-white shrink-0">
                          {getBadgeIcon(badge.iconName, "w-4 h-4")}
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white truncate">
                            {badge.name}
                          </h4>
                          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold inline-flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" weight="bold" />
                            <span>Conquistada</span>
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed font-normal">
                        {badge.description}
                      </p>

                      {badge.unlockedAt && (
                        <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-[10px] text-zinc-400 dark:text-zinc-500 font-medium">
                          <span>Desbloqueada em:</span>
                          <span className="text-zinc-700 dark:text-zinc-300 font-bold">
                            {badge.unlockedAt}
                          </span>
                        </div>
                      )}
                    </div>
                  </TooltipContent>
                </Tooltip>
              )
            }

            return (
              <button
                key={badge.id}
                type="button"
                onClick={() => onSelectBadge(isSelected ? null : badge)}
                className={cn(
                  "relative aspect-square sm:aspect-auto w-full sm:w-16 sm:h-16 rounded-sm bg-zinc-100/50 dark:bg-zinc-900/50 border border-dashed text-zinc-400 dark:text-zinc-600 flex items-center justify-center transition-all duration-200 shadow-2xs cursor-pointer focus:outline-hidden",
                  isSelected
                    ? "border-zinc-500 dark:border-zinc-400 opacity-80 ring-2 ring-zinc-400/20"
                    : "border-zinc-200 dark:border-zinc-800 opacity-35 hover:opacity-60"
                )}
                title={`${badge.name} (Bloqueada)`}
              >
                {getBadgeIcon(
                  badge.iconName,
                  "w-6 h-6 sm:w-7 sm:h-7 shrink-0 text-zinc-400 dark:text-zinc-600"
                )}
                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-zinc-500 text-white flex items-center justify-center ring-2 ring-white dark:ring-zinc-900 shadow-xs">
                  <Lock className="w-2.5 h-2.5" weight="bold" />
                </div>
              </button>
            )
          })}
        </div>
      </TooltipProvider>

      {selectedBadge && (
        <div className="p-4 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xs space-y-2.5 animate-in fade-in-50 duration-200">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-sm bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-900 dark:text-white shrink-0">
                {getBadgeIcon(selectedBadge.iconName, "w-5 h-5")}
              </div>
              <div className="min-w-0">
                <h4 className="text-sm font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white">
                  {selectedBadge.name}
                </h4>
                {member.unlockedBadgeIds?.includes(selectedBadge.id) ? (
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold inline-flex items-center gap-1 mt-0.5">
                    <CheckCircle className="w-3.5 h-3.5" weight="bold" />
                    <span>
                      Conquistada
                      {selectedBadge.unlockedAt
                        ? ` • ${selectedBadge.unlockedAt}`
                        : ""}
                    </span>
                  </span>
                ) : (
                  <span className="text-xs text-zinc-400 dark:text-zinc-500 font-bold inline-flex items-center gap-1 mt-0.5">
                    <Lock className="w-3.5 h-3.5" weight="bold" />
                    <span>Bloqueada</span>
                  </span>
                )}
              </div>
            </div>

            <button
              type="button"
              onClick={() => onSelectBadge(null)}
              className="text-xs font-bold text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 p-1 rounded-xs"
              aria-label="Fechar detalhes"
            >
              ✕
            </button>
          </div>

          <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
            {selectedBadge.description}
          </p>
        </div>
      )}
    </section>
  )
}
