"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowRight,
  Check,
  CheckCircle,
  LockSimple,
} from "@phosphor-icons/react"
import {
  TierDefinition,
  TierId,
  TIERS_LIST,
  TIERS_CONFIG,
} from "@/src/data/portalData"
import { cn } from "@/src/lib/utils"

interface KeyPassTierTrackProps {
  userTier: TierDefinition
  selectedTierId: TierId
  onSelectTier: (tierId: TierId) => void
  userXp: number
  className?: string
}

export function KeyPassTierTrack({
  userTier,
  selectedTierId,
  onSelectTier,
  userXp,
  className,
}: KeyPassTierTrackProps): React.JSX.Element {
  const selectedTier = TIERS_CONFIG[selectedTierId] || userTier
  const isViewingOtherTier = selectedTier.id !== userTier.id

  const getTierShortPerk = (tierId: TierId) => {
    switch (tierId) {
      case "membro":
        return "Acesso Básico"
      case "associado":
        return "Até 20% OFF • Base Segura"
      case "titular":
        return "Até 25% OFF • Jantares VIP"
      case "investidor":
        return "Até 30% OFF • Deal Flow"
      case "incorporador":
        return "Até 35% OFF • Mesa Cativa"
      case "patrono":
        return "Top 1 Global • Título Supremo"
    }
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg sm:text-xl font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white">
            Trilha de Níveis de Associação
          </h2>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 font-medium">
            A cada promoção você recebe 2 Tokens RIB e desbloqueia novos privilégios institucionais.
          </p>
        </div>

        <Link
          href="/keypass/regras"
          className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white hover:text-brand-primary dark:hover:text-brand-primary inline-flex items-center gap-1.5 shrink-0 whitespace-nowrap self-start sm:self-auto group"
        >
          <span>Regras & Benefícios</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      {/* 6-Tier Grid with Normal Subtle Borders */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {TIERS_LIST.map((tier, index) => {
          const isUserCurrent = tier.id === userTier.id
          const isSelected = tier.id === selectedTierId
          const isPassed = tier.order < userTier.order
          const isLocked = tier.order > userTier.order
          const isClickable = !isLocked

          return (
            <button
              key={tier.id}
              type="button"
              disabled={!isClickable}
              onClick={() => {
                if (isClickable) {
                  onSelectTier(tier.id)
                }
              }}
              className={cn(
                "p-3.5 rounded-lg border border-zinc-200 dark:border-zinc-800 flex flex-col items-center justify-between text-center transition-all relative overflow-hidden select-none",
                isClickable
                  ? "cursor-pointer"
                  : "cursor-not-allowed opacity-60",
                isSelected || isUserCurrent
                  ? "bg-zinc-50 dark:bg-zinc-800/80 shadow-2xs"
                  : "bg-white dark:bg-zinc-900 hover:bg-zinc-50/60 dark:hover:bg-zinc-800/40"
              )}
            >
              {/* Huge Background Number (01, 02, etc.) */}
              <span className="absolute -bottom-2 -right-1 text-5xl sm:text-6xl font-heading font-black text-zinc-900/[0.04] dark:text-white/[0.04] pointer-events-none select-none leading-none z-0">
                0{index + 1}
              </span>

              {/* Status indicator top right */}
              {isUserCurrent ? (
                <div className="absolute top-2 right-2 z-10">
                  <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded-xs bg-zinc-900 dark:bg-white text-white dark:text-zinc-900">
                    Atual
                  </span>
                </div>
              ) : isPassed ? (
                <div className="absolute top-2 right-2 z-10">
                  <div className="w-4 h-4 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-800 dark:text-zinc-200">
                    <Check className="w-2.5 h-2.5" weight="bold" />
                  </div>
                </div>
              ) : isLocked ? (
                <div className="absolute top-2 right-2 z-10">
                  <LockSimple className="w-3.5 h-3.5 text-zinc-400" />
                </div>
              ) : null}

              {/* Emblem */}
              <div className="my-auto py-3 space-y-2 w-full relative z-10">
                <div className="relative w-12 h-12 sm:w-14 sm:h-14 mx-auto transition-transform duration-200 group-hover:scale-105">
                  <Image
                    src={tier.image}
                    alt={tier.name}
                    fill
                    className="object-contain"
                  />
                </div>

                <div className="space-y-0.5">
                  <h3 className="text-xs font-heading font-black uppercase text-zinc-900 dark:text-white tracking-tight">
                    {tier.name}
                  </h3>
                  <p className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400 truncate">
                    {tier.minXp === 0
                      ? "0 - 499 XP"
                      : tier.maxXp
                      ? `${tier.minXp.toLocaleString("pt-BR")} - ${tier.maxXp.toLocaleString("pt-BR")} XP`
                      : tier.isSpecialPinnacle
                      ? "Top #1 Global"
                      : "10.000+ XP"}
                  </p>
                </div>
              </div>

              {/* Tier Perk & Status */}
              <div className="w-full pt-2 border-t border-zinc-100 dark:border-zinc-800 space-y-1 relative z-10">
                <p className="text-[9px] font-medium text-zinc-500 dark:text-zinc-400 truncate">
                  {getTierShortPerk(tier.id)}
                </p>

                <div>
                  {isUserCurrent ? (
                    <span className="text-[9px] font-black uppercase text-zinc-900 dark:text-white tracking-wider block">
                      Nível Vigente
                    </span>
                  ) : isPassed ? (
                    <span className="text-[9px] font-bold text-zinc-600 dark:text-zinc-400 uppercase tracking-wider block">
                      Conquistado
                    </span>
                  ) : (
                    <span className="text-[9px] font-medium text-zinc-400 uppercase tracking-wider block">
                      Bloqueado
                    </span>
                  )}
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Tier Detail Inspector */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedTier.id}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
          className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 sm:p-6 shadow-2xs space-y-4"
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
              <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 flex items-center justify-center">
                <Image
                  src={selectedTier.image}
                  alt={selectedTier.name}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-sm bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700">
                    Nível 0{selectedTier.order} de 06
                  </span>
                  {selectedTier.id === userTier.id ? (
                    <span className="text-[10px] font-black uppercase text-zinc-900 dark:text-white border border-zinc-300 dark:border-zinc-700 px-2 py-0.5 rounded-sm">
                      Seu Nível Atual
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 px-2 py-0.5 rounded-sm">
                      Já Conquistado
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-heading font-black uppercase text-zinc-900 dark:text-white">
                  {selectedTier.name} • {selectedTier.subtitle}
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 max-w-2xl font-medium leading-relaxed">
                  {selectedTier.description}
                </p>
              </div>
            </div>

            {/* Perks list */}
            <div className="w-full lg:w-auto shrink-0 flex flex-col gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-zinc-500 block">
                Privilégios do Nível:
              </span>
              <ul className="space-y-1">
                {selectedTier.perks.slice(0, 3).map((perk, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 text-xs font-medium text-zinc-800 dark:text-zinc-200"
                  >
                    <CheckCircle
                      className="w-3.5 h-3.5 text-zinc-700 dark:text-zinc-300 shrink-0"
                      weight="fill"
                    />
                    <span>{perk}</span>
                  </li>
                ))}
              </ul>

              {isViewingOtherTier && (
                <button
                  type="button"
                  onClick={() => onSelectTier(userTier.id)}
                  className="mt-1 text-xs font-bold text-zinc-900 dark:text-white underline hover:opacity-80 cursor-pointer self-start"
                >
                  Voltar ao seu nível ({userTier.name})
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
