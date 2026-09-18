"use client"

import * as React from "react"

import Link from "next/link"

import { type BadgeDefinition } from "@/src/data/portalData"
import { ArrowRight, Trophy } from "@phosphor-icons/react"

import { Badge } from "@/src/components/ui/badge/badge"

import { BadgeCard } from "@/src/components/portal/badgeCard"

export interface ProfileBadgesSectionProps {
  badges: BadgeDefinition[]
}

export function ProfileBadgesSection({
  badges,
}: ProfileBadgesSectionProps): React.JSX.Element {
  const unlockedBadges = badges.filter((b) => b.isUnlocked)
  const totalBadges = badges.length

  return (
    <div className="space-y-6 pt-8 border-t border-zinc-200 dark:border-zinc-800">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h3 className="text-sm font-heading font-black tracking-tight uppercase text-zinc-900 dark:text-white flex items-center gap-2">
              <Trophy className="w-4 h-4 text-brand-primary" />
              <span>Medalhas & Conquistas de Membro</span>
            </h3>
            <Badge
              color="default"
              variant="flat"
              radius="sm"
              className="text-[10px] font-bold whitespace-nowrap shrink-0 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700"
            >
              {unlockedBadges.length} de {totalBadges} Desbloqueadas
            </Badge>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Insígnias e distinções de honra conquistadas através da sua
            participação e engajamento no clube.
          </p>
        </div>

        <Link
          href="/keypass/missoes?tab=badges"
          className="text-xs font-bold text-brand-primary hover:underline inline-flex items-center gap-1 shrink-0 cursor-pointer self-start sm:self-auto"
        >
          <span>Ver todas as missões & drops</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {badges.map((badge) => (
          <BadgeCard key={badge.id} badge={badge} />
        ))}
      </div>
    </div>
  )
}
