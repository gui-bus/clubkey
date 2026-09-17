"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  Trophy,
} from "@phosphor-icons/react"
import { Container } from "@/src/components/common/container"
import { KeyPassMilestoneProgress } from "@/src/components/portal/KeyPassMilestoneProgress"
import { KeyPassTierTrack } from "@/src/components/portal/KeyPassTierTrack"
import { KeyPassMissionsWidget } from "@/src/components/portal/KeyPassMissionsWidget"
import { KeyPassHistoryWidget } from "@/src/components/portal/KeyPassHistoryWidget"
import { usePortalStore } from "@/src/store/usePortalStore"
import {
  getNextTier,
  TIERS_CONFIG,
  TierId,
} from "@/src/data/portalData"
import { cn } from "@/src/lib/utils"

export default function KeyPassOverviewPage(): React.JSX.Element {
  const {
    xp,
    ribTokens,
    isTierFrozen,
    getUserTier,
  } = usePortalStore()

  const userTier = getUserTier ? getUserTier() : TIERS_CONFIG.titular
  const [selectedTierId, setSelectedTierId] = React.useState<TierId>(userTier.id)

  React.useEffect(() => {
    setSelectedTierId(userTier.id)
  }, [userTier.id])

  const displayedTier = TIERS_CONFIG[selectedTierId] || userTier
  const displayedNextTier = getNextTier(displayedTier.id)
  const isViewingOtherTier = displayedTier.id !== userTier.id

  return (
    <Container className="py-8 sm:py-10 space-y-6">
      {/* 1. Executive Pass Header & Watermark Icon Stat HUD */}
      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-2xs space-y-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          {/* Left: Pass Identity (No border or background on tier image) */}
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
                      onClick={() => setSelectedTierId(userTier.id)}
                      className="text-[10px] font-bold text-zinc-900 dark:text-white underline hover:opacity-80 cursor-pointer"
                    >
                      Voltar ao seu nível ({userTier.name})
                    </button>
                  </>
                ) : isTierFrozen ? (
                  <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-sm bg-zinc-100 dark:bg-zinc-800 border border-zinc-300 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200">
                    Nível Temporariamente Congelado
                  </span>
                ) : (
                  <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-sm bg-zinc-900 dark:bg-white text-white dark:text-zinc-900">
                    Nível Vigente
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

          {/* Right: Executive Metric Trio with Watermark Background Icons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full lg:w-auto shrink-0">
            {/* XP Metric Card */}
            <div className="relative overflow-hidden p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/40 space-y-1.5 min-w-[130px]">
              {/* Background Watermark Icon */}
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

            {/* Tokens RIB Metric Card */}
            <div className="relative overflow-hidden p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/40 space-y-1.5 min-w-[130px]">
              {/* Background Watermark Icon */}
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

            {/* Ranking Position Metric Card */}
            <div className="relative overflow-hidden p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/40 space-y-1.5 min-w-[130px]">
              {/* Background Watermark Icon */}
              <div className="absolute -right-2 -bottom-2 pointer-events-none select-none opacity-[0.06] dark:opacity-[0.10]">
                <Trophy className="w-20 h-20 text-zinc-900 dark:text-white" weight="bold" />
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

      {/* 2. Milestone Progress Section */}
      <KeyPassMilestoneProgress
        xp={xp}
        currentTier={displayedTier}
        nextTier={displayedNextTier}
      />

      {/* 3. Tier Progression Track */}
      <KeyPassTierTrack
        userTier={userTier}
        selectedTierId={selectedTierId}
        onSelectTier={setSelectedTierId}
        userXp={xp}
      />

      {/* 4. Command Center Grid with Equalized Dynamic Heights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        <KeyPassMissionsWidget className="h-full" />
        <KeyPassHistoryWidget className="h-full" />
      </div>
    </Container>
  )
}
