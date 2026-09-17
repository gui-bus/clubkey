"use client"

import * as React from "react"

import Image from "next/image"
import Link from "next/link"

import { TIERS_CONFIG, TierId, getNextTier } from "@/src/data/portalData"
import { usePortalStore } from "@/src/store/usePortalStore"
import { Trophy } from "@phosphor-icons/react"

import { Container } from "@/src/components/common/container"
import { KeyPassHistoryWidget } from "@/src/components/portal/KeyPassHistoryWidget"
import { KeyPassMilestoneProgress } from "@/src/components/portal/KeyPassMilestoneProgress"
import { KeyPassMissionsWidget } from "@/src/components/portal/KeyPassMissionsWidget"
import { KeyPassTierTrack } from "@/src/components/portal/KeyPassTierTrack"

export default function KeyPassOverviewPage(): React.JSX.Element {
  const { xp, ribTokens, isTierFrozen, getUserTier } = usePortalStore()

  const userTier = getUserTier ? getUserTier() : TIERS_CONFIG.titular
  const [selectedTierId, setSelectedTierId] = React.useState<TierId | null>(
    null
  )

  const effectiveTierId: TierId = selectedTierId ?? userTier.id
  const displayedTier = TIERS_CONFIG[effectiveTierId] || userTier
  const displayedNextTier = getNextTier(displayedTier.id)
  const isViewingOtherTier = displayedTier.id !== userTier.id

  return (
    <Container className="py-6 sm:py-8 space-y-4">
      {}
      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 sm:p-6 shadow-2xs space-y-4">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          {}
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
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-sm bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200">
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
                  <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-sm bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200">
                    Tier Temporariamente Congelado
                  </span>
                ) : (
                  <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-sm bg-zinc-900 dark:bg-white text-white dark:text-zinc-900">
                    Tier Vigente
                  </span>
                )}

                {displayedTier.isProtectedBase && (
                  <span className="text-[10px] font-bold text-zinc-600 dark:text-zinc-300 border border-zinc-300 dark:border-zinc-700 px-2 py-0.5 rounded-sm">
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

          {}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full lg:w-auto shrink-0">
            {}
            <div className="relative overflow-hidden p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/40 space-y-1.5 min-w-[130px]">
              {}
              <div className="absolute -right-3 -bottom-3 pointer-events-none select-none opacity-[0.07] dark:opacity-[0.12]">
                <div className="relative w-20 h-20">
                  <Image
                    src="/utils/gamification/utils/xp.webp"
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block">
                Pontos XP
              </span>
              <div className="flex items-center gap-1.5">
                <div className="relative w-4 h-4 shrink-0">
                  <Image
                    src="/utils/gamification/utils/xp.webp"
                    alt="XP"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-2xl font-black font-heading tracking-tight text-zinc-900 dark:text-white">
                  {xp.toLocaleString("pt-BR")}
                </span>
              </div>
              <span className="text-[10px] text-zinc-500 font-medium block">
                Acumulado total
              </span>
            </div>

            {}
            <div className="relative overflow-hidden p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/40 space-y-1.5 min-w-[130px]">
              {}
              <div className="absolute -right-3 -bottom-3 pointer-events-none select-none opacity-[0.07] dark:opacity-[0.12]">
                <div className="relative w-20 h-20">
                  <Image
                    src="/utils/gamification/utils/RIB.svg"
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block">
                Saldo em Tokens
              </span>
              <div className="flex items-center gap-1.5">
                <div className="relative w-4 h-4 shrink-0">
                  <Image
                    src="/utils/gamification/utils/RIB.svg"
                    alt="RIB"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-2xl font-black font-heading tracking-tight text-zinc-900 dark:text-white">
                  {ribTokens}
                </span>
              </div>
              <span className="text-[10px] text-zinc-500 font-medium block">
                Tokens RIB disponíveis
              </span>
            </div>

            {}
            <div className="relative overflow-hidden p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/40 space-y-1.5 min-w-[130px]">
              {}
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
                className="text-[10px] font-bold text-zinc-800 dark:text-zinc-200 hover:text-brand-primary underline block truncate"
              >
                Ver Classificação →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {}
      <KeyPassMilestoneProgress
        xp={xp}
        currentTier={displayedTier}
        nextTier={displayedNextTier}
      />

      {}
      <KeyPassTierTrack
        userTier={userTier}
        selectedTierId={effectiveTierId}
        onSelectTier={setSelectedTierId}
        userXp={xp}
      />

      {}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-stretch">
        <KeyPassMissionsWidget className="h-full" />
        <KeyPassHistoryWidget className="h-full" />
      </div>
    </Container>
  )
}
