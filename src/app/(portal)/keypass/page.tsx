"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  CalendarCheck,
  Check,
  Gift,
  LockSimple,
  Medal,
  ShieldCheck,
  Target,
  Trophy,
  Users,
} from "@phosphor-icons/react"
import { Container } from "@/src/components/common/container"
import { Badge } from "@/src/components/ui/badge/badge"
import { Button } from "@/src/components/ui/button/button"
import { usePortalStore } from "@/src/store/usePortalStore"
import {
  calculateTierProgress,
  getNextTier,
  TIERS_CONFIG,
  TIERS_LIST,
  XpActivity,
} from "@/src/data/portalData"
import { cn } from "@/src/lib/utils"

export default function KeyPassOverviewPage(): React.JSX.Element {
  const {
    xp,
    ribTokens,
    isTierFrozen,
    missions,
    xpHistory,
    claimMission,
    getUserTier,
  } = usePortalStore()

  const currentTier = getUserTier ? getUserTier() : TIERS_CONFIG.titular
  const nextTier = getNextTier(currentTier.id)
  const tierProgress = calculateTierProgress(xp || 2850, currentTier)

  const pendingActionMissions = missions
    .filter((m) => !m.isClaimed)
    .slice(0, 3)

  const getCategoryIcon = (category: XpActivity["category"]) => {
    switch (category) {
      case "onboarding":
        return <ShieldCheck className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
      case "hospedagem":
        return <Medal className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
      case "evento":
        return <CalendarCheck className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
      case "experiencia":
        return <Gift className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
      case "conexao":
        return <Users className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
      case "missao":
        return <Target className="w-4 h-4 text-brand-primary" />
      case "bonus":
        return <Trophy className="w-4 h-4 text-brand-primary" />
    }
  }

  return (
    <Container className="py-8 sm:py-10 space-y-8">
      <div className="rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 p-2 rounded-sm bg-[#F1F1F1] dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xs flex items-center justify-center">
              <Image
                src={currentTier.image}
                alt={currentTier.name}
                fill
                className="object-contain p-2"
                priority
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <Badge
                  color={currentTier.badgeColor}
                  variant="flat"
                  radius="sm"
                  className="font-black text-[10px] uppercase tracking-wider"
                >
                  Nível {currentTier.order} • {currentTier.name}
                </Badge>

                {isTierFrozen ? (
                  <Badge
                    color="warning"
                    variant="flat"
                    radius="sm"
                    className="text-[10px] font-bold"
                  >
                    Nível Temporariamente Congelado
                  </Badge>
                ) : (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                    <Check className="w-3.5 h-3.5" weight="bold" />
                    Status Ativo (Janela 6 Meses)
                  </span>
                )}
              </div>

              <h2 className="text-2xl sm:text-3xl font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white">
                {currentTier.name}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-xl">
                {currentTier.description}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full lg:w-auto">
            <div className="p-4 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-[#F1F1F1] dark:bg-zinc-900 flex-1 sm:w-40 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-0.5">
                Pontos XP
              </span>
              <div className="flex items-center justify-center gap-1.5">
                <div className="relative w-4 h-4 shrink-0">
                  <Image
                    src="/utils/gamification/utils/xp.webp"
                    alt="XP"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-xl sm:text-2xl font-black font-heading tracking-tight text-zinc-900 dark:text-white">
                  {xp.toLocaleString("pt-BR")}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-[#F1F1F1] dark:bg-zinc-900 flex-1 sm:w-40 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-0.5">
                Saldo em Tokens
              </span>
              <div className="flex items-center justify-center gap-1.5">
                <div className="relative w-4 h-4 shrink-0">
                  <Image
                    src="/utils/gamification/utils/RIB.svg"
                    alt="RIB"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-xl sm:text-2xl font-black font-heading tracking-tight text-zinc-900 dark:text-white">
                  {ribTokens}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-[#F1F1F1] dark:bg-zinc-900 flex-1 sm:w-40 text-center">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-0.5">
                Posição Geral
              </span>
              <span className="text-xl sm:text-2xl font-black font-heading tracking-tight text-brand-primary">
                #8
              </span>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-zinc-800/80 space-y-2.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-bold text-zinc-700 dark:text-zinc-300">
                Progresso para {nextTier ? nextTier.name : "Nível Máximo"}:
              </span>
              <span className="font-extrabold text-brand-primary">
                {tierProgress.progressPercentage}%
              </span>
            </div>
            <div className="text-zinc-500 dark:text-zinc-400 font-medium text-[11px] sm:text-xs">
              {nextTier ? (
                <span>
                  Faltam <strong className="text-zinc-900 dark:text-white font-black">{tierProgress.xpNeeded.toLocaleString("pt-BR")} XP</strong> para o Nível {nextTier.name} (+2 Tokens RIB)
                </span>
              ) : (
                <span>Você atingiu o patamar supremo do clube.</span>
              )}
            </div>
          </div>

          <div className="w-full h-2 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
            <div
              className="h-full bg-brand-primary rounded-full transition-all duration-700"
              style={{ width: `${tierProgress.progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-lg sm:text-xl font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white">
              Trilha de Níveis de Associação
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              A cada promoção de nível você recebe 2 Tokens RIB e desbloqueia novos privilégios exclusivos.
            </p>
          </div>
          <Link
            href="/keypass/regras"
            className="text-xs font-bold uppercase tracking-wider text-brand-primary hover:underline inline-flex items-center gap-1.5 shrink-0 whitespace-nowrap self-start sm:self-auto"
          >
            <span>Regras & Benefícios</span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          {TIERS_LIST.map((tier) => {
            const isCurrent = tier.id === currentTier.id
            const isPassed = tier.order < currentTier.order
            const isLocked = tier.order > currentTier.order

            return (
              <div
                key={tier.id}
                className={cn(
                  "rounded-sm border p-4 flex flex-col justify-between transition-all relative overflow-hidden bg-white dark:bg-[#141416]",
                  isCurrent
                    ? "border-brand-primary ring-1 ring-brand-primary/40 shadow-xs"
                    : isPassed
                    ? "border-zinc-300 dark:border-zinc-700"
                    : "border-zinc-200 dark:border-zinc-800 opacity-70"
                )}
              >
                {isCurrent && (
                  <div className="absolute top-0 right-0">
                    <span className="bg-brand-primary text-white text-[9px] font-black uppercase px-2 py-0.5 rounded-bl-sm">
                      Atual
                    </span>
                  </div>
                )}

                {isPassed && (
                  <div className="absolute top-2 right-2">
                    <Check className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" weight="bold" />
                  </div>
                )}

                {isLocked && (
                  <div className="absolute top-2 right-2">
                    <LockSimple className="w-3.5 h-3.5 text-zinc-400" />
                  </div>
                )}

                <div className="space-y-2.5">
                  <div className="relative w-12 h-12 mx-auto my-1">
                    <Image
                      src={tier.image}
                      alt={tier.name}
                      fill
                      className="object-contain"
                    />
                  </div>

                  <div className="text-center space-y-0.5">
                    <h3 className="text-xs font-heading font-black uppercase text-zinc-900 dark:text-white">
                      {tier.name}
                    </h3>
                    <p className="text-[10px] font-semibold text-zinc-500 dark:text-zinc-400 truncate">
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

                <div className="mt-3 pt-2.5 border-t border-zinc-100 dark:border-zinc-800/80 text-center">
                  {isCurrent ? (
                    <span className="text-[10px] font-black uppercase text-brand-primary tracking-wider">
                      Nível Vigente
                    </span>
                  ) : isPassed ? (
                    <span className="text-[10px] font-bold text-zinc-600 dark:text-zinc-300 uppercase tracking-wider">
                      Conquistado
                    </span>
                  ) : (
                    <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
                      Bloqueado
                    </span>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] p-5 sm:p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm sm:text-base font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white flex items-center gap-2">
                <Target className="w-4 h-4 text-brand-primary shrink-0" />
                <span>Metas & Missões em Destaque</span>
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Ações prioritárias para elevar seu status.
              </p>
            </div>
            <Link
              href="/keypass/missoes"
              className="text-xs font-bold uppercase tracking-wider text-brand-primary hover:underline whitespace-nowrap shrink-0"
            >
              Ver todas ({missions.length})
            </Link>
          </div>

          <div className="space-y-3">
            {pendingActionMissions.map((mission) => {
              const progressPct = Math.round(
                (mission.currentProgress / mission.totalRequired) * 100
              )

              return (
                <div
                  key={mission.id}
                  className="p-3.5 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-[#F1F1F1]/50 dark:bg-zinc-900/40 space-y-2.5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h4 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-tight">
                        {mission.title}
                      </h4>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5">
                        {mission.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-xs bg-[#F1F1F1] dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 text-[10px] font-black uppercase">
                        <div className="relative w-3 h-3 shrink-0">
                          <Image
                            src="/utils/gamification/utils/xp.webp"
                            alt="XP"
                            fill
                            className="object-contain"
                          />
                        </div>
                        <span>+{mission.xpReward} XP</span>
                      </span>
                      {mission.tokensReward && mission.tokensReward > 0 ? (
                        <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-xs bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-700 text-[10px] font-black uppercase">
                          +{mission.tokensReward} RIB
                        </span>
                      ) : null}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[10px] text-zinc-500 font-semibold">
                      <span>
                        Progresso: {mission.currentProgress} / {mission.totalRequired}
                      </span>
                      <span>{progressPct}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-brand-primary rounded-full"
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-0.5">
                    {mission.isCompleted && !mission.isClaimed ? (
                      <Button
                        color="primary"
                        size="sm"
                        onClick={() => claimMission(mission.id)}
                        className="text-xs font-black uppercase tracking-wider inline-flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0"
                      >
                        <div className="relative w-3.5 h-3.5 shrink-0">
                          <Image
                            src="/utils/gamification/utils/xp.webp"
                            alt="XP"
                            fill
                            className="object-contain"
                          />
                        </div>
                        <span>Resgatar +{mission.xpReward} XP</span>
                      </Button>
                    ) : mission.actionUrl ? (
                      <Link
                        href={mission.actionUrl}
                        className="text-xs font-bold uppercase tracking-wider text-brand-primary hover:underline inline-flex items-center gap-1 whitespace-nowrap shrink-0"
                      >
                        <span>{mission.actionLabel || "Realizar Missão"}</span>
                        <ArrowRight className="w-3 h-3 shrink-0" />
                      </Link>
                    ) : null}
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] p-5 sm:p-6 space-y-4 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm sm:text-base font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white flex items-center gap-2">
                <div className="relative w-4 h-4 shrink-0">
                  <Image
                    src="/utils/gamification/utils/xp.webp"
                    alt="XP"
                    fill
                    className="object-contain"
                  />
                </div>
                <span>Histórico de Pontos XP</span>
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Extrato das últimas atividades qualificadoras.
              </p>
            </div>
            <span className="text-[11px] font-bold text-zinc-400 whitespace-nowrap">
              {xpHistory.length} registros
            </span>
          </div>

          <div className="space-y-2.5 max-h-[380px] overflow-y-auto pr-1">
            {xpHistory.slice(0, 6).map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-3 rounded-sm border border-zinc-100 dark:border-zinc-800/80 bg-[#F1F1F1]/40 dark:bg-zinc-900/30 gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-7 h-7 rounded-sm bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center shrink-0 shadow-2xs">
                    {getCategoryIcon(activity.category)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-zinc-900 dark:text-white truncate">
                      {activity.title}
                    </p>
                    <p className="text-[10px] text-zinc-400">
                      {activity.date}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 text-right whitespace-nowrap">
                  {activity.xp > 0 ? (
                    <div className="inline-flex items-center gap-1 text-xs font-black text-zinc-900 dark:text-white">
                      <div className="relative w-3 h-3 shrink-0">
                        <Image
                          src="/utils/gamification/utils/xp.webp"
                          alt="XP"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span>+{activity.xp} XP</span>
                    </div>
                  ) : (
                    <span className="text-xs font-bold text-zinc-600 dark:text-zinc-300">
                      Recompensa
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  )
}
