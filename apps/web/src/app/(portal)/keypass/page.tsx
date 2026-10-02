"use client"

import * as React from "react"

import Image from "next/image"
import Link from "next/link"

import { TIERS_CONFIG, type TierId, getNextTier } from "@/src/data/portalData"
import { usePortalStore } from "@/src/store/usePortalStore"
import { ArrowRight, Lightning, SealCheck, Trophy } from "@phosphor-icons/react"

import { toast } from "@/src/components/ui/toast/toast"

import { Container } from "@/src/components/common/container"
import { BadgeCard } from "@/src/components/portal/badgeCard"
import { KeyPassHistoryWidget } from "@/src/components/portal/keyPassHistoryWidget"
import { KeyPassMilestoneProgress } from "@/src/components/portal/keyPassMilestoneProgress"
import { KeyPassMissionsWidget } from "@/src/components/portal/keyPassMissionsWidget"
import { KeyPassStatCard } from "@/src/components/portal/keyPassStatCard"
import { KeyPassTierTrack } from "@/src/components/portal/keyPassTierTrack"
import { WeeklyDropCard } from "@/src/components/portal/weeklyDropCard"

import { formatNumber } from "@/src/lib/formatters"

import { isModuleEnabled } from "@/src/config/brand.config"

export default function KeyPassOverviewPage(): React.JSX.Element {
  const {
    xp,
    ribTokens,
    isTierFrozen,
    getUserTier,
    weeklyDrops,
    claimWeeklyDrop,
    badges,
  } = usePortalStore()

  const userTier = getUserTier ? getUserTier() : TIERS_CONFIG.titular
  const [selectedTierId, setSelectedTierId] = React.useState<TierId | null>(
    null
  )

  const effectiveTierId: TierId = selectedTierId ?? userTier.id
  const displayedTier = TIERS_CONFIG[effectiveTierId] || userTier
  const displayedNextTier = getNextTier(displayedTier.id)
  const isViewingOtherTier = displayedTier.id !== userTier.id

  const availableDrops = React.useMemo(() => {
    return weeklyDrops.filter((d) => {
      if (d.category === "estadias" && !isModuleEnabled("stays")) return false
      if (d.category === "eventos" && !isModuleEnabled("events")) return false
      if (d.category === "experiencias" && !isModuleEnabled("experiences"))
        return false
      if (d.category === "networking" && !isModuleEnabled("networking"))
        return false
      return true
    })
  }, [weeklyDrops])

  const availableBadges = React.useMemo(() => {
    return badges.filter((b) => {
      if (b.category === "estadias" && !isModuleEnabled("stays")) return false
      if (b.category === "eventos" && !isModuleEnabled("events")) return false
      if (b.category === "experiencias" && !isModuleEnabled("experiences"))
        return false
      if (b.category === "networking" && !isModuleEnabled("networking"))
        return false
      return true
    })
  }, [badges])

  const activeDrop =
    availableDrops.find((d) => !d.isClaimed) || availableDrops[0] || null
  const previewBadges = availableBadges.slice(0, 4)

  const handleClaimDrop = (dropId: string) => {
    claimWeeklyDrop(dropId)
    const drop = weeklyDrops.find((d) => d.id === dropId)
    toast.success(`Drop da Semana Resgatado: ${drop?.title || ""}`, {
      description: `Recompensa de +${drop?.xpReward || 0} XP creditada no seu saldo.`,
    })
  }

  return (
    <Container className="py-6 sm:py-8 space-y-6">
      <div className="rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 sm:p-6 shadow-2xs space-y-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 flex items-center justify-center">
              <Image
                src={displayedTier.image}
                alt={displayedTier.name}
                fill
                className="object-contain"
                priority
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                {isViewingOtherTier ? (
                  <>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-xs bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200">
                      Visualizando {displayedTier.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSelectedTierId(null)}
                      className="text-[10px] font-bold text-zinc-900 dark:text-white underline hover:opacity-80 cursor-pointer"
                    >
                      Voltar ao seu tier ({userTier.name})
                    </button>
                  </>
                ) : isTierFrozen ? (
                  <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-xs bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200">
                    Tier Temporariamente Congelado
                  </span>
                ) : (
                  <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-xs bg-zinc-900 dark:bg-white text-white dark:text-zinc-900">
                    Tier Vigente
                  </span>
                )}

                {displayedTier.isProtectedBase && (
                  <span className="text-[10px] font-bold text-zinc-600 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-700 px-2 py-0.5 rounded-xs">
                    Base Protegida
                  </span>
                )}
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white">
                  {displayedTier.name}
                </h1>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-2xl font-medium leading-relaxed mt-0.5">
                  {displayedTier.description}
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full lg:w-auto shrink-0">
            <KeyPassStatCard
              label="Pontos XP"
              value={formatNumber(xp)}
              subtitle="Acumulado total"
              iconSrc="/utils/gamification/utils/xp.webp"
              iconAlt="XP"
              watermarkSrc="/utils/gamification/utils/xp.webp"
            />

            <KeyPassStatCard
              label="Saldo em Tokens"
              value={ribTokens}
              subtitle="Tokens RIB disponíveis"
              iconSrc="/utils/gamification/utils/RIB.svg"
              iconAlt="RIB"
              watermarkSrc="/utils/gamification/utils/RIB.svg"
            />

            <div className="relative overflow-hidden p-4 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/40 space-y-1.5 min-w-[130px]">
              <div className="absolute -right-2 -bottom-2 pointer-events-none select-none opacity-[0.06] dark:opacity-[0.10]">
                <Trophy
                  className="w-20 h-20 text-zinc-900 dark:text-white"
                  weight="bold"
                />
              </div>

              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block">
                Posição Geral
              </span>
              <span className="text-2xl font-black font-heading tracking-tight text-zinc-900 dark:text-white block">
                #8
              </span>
              <Link
                href="/keypass/ranking"
                className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium hover:text-brand-primary dark:hover:text-white transition-colors block"
              >
                Ver Leaderboard &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
      <KeyPassMilestoneProgress
        xp={xp}
        currentTier={displayedTier}
        nextTier={displayedNextTier}
      />
      <KeyPassTierTrack
        userTier={userTier}
        selectedTierId={effectiveTierId}
        onSelectTier={setSelectedTierId}
        userXp={xp}
      />
      {activeDrop && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Lightning className="w-4 h-4 text-brand-primary" weight="fill" />
              <h2 className="text-sm font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white">
                Drop em Destaque da Semana
              </h2>
            </div>
            <Link
              href="/keypass/missoes?tab=drops"
              className="text-xs font-bold text-brand-primary hover:underline inline-flex items-center gap-1"
            >
              <span>Ver todos os drops & missões</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {availableDrops.slice(0, 3).map((drop) => (
              <WeeklyDropCard
                key={drop.id}
                drop={drop}
                onClaim={handleClaimDrop}
              />
            ))}
          </div>
        </div>
      )}
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SealCheck className="w-4 h-4 text-brand-primary" weight="fill" />
            <h2 className="text-sm font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white">
              Medalhas & Conquistas de Honra
            </h2>
          </div>
          <Link
            href="/keypass/missoes?tab=badges"
            className="text-xs font-bold text-brand-primary hover:underline inline-flex items-center gap-1"
          >
            <span>Ver galeria completa ({availableBadges.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {previewBadges.map((badge) => (
            <BadgeCard key={badge.id} badge={badge} />
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch pt-2">
        <KeyPassMissionsWidget className="h-full" />
        <KeyPassHistoryWidget className="h-full" />
      </div>
    </Container>
  )
}
