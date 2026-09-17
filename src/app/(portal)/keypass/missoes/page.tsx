"use client"

import * as React from "react"
import Image from "next/image"
import {
  Check,
  Clock,
  Lightning,
  SealCheck,
  Sparkle,
  Trophy,
} from "@phosphor-icons/react"

import { parseAsStringLiteral, useQueryState } from "nuqs"

import { Badge } from "@/src/components/ui/badge/badge"
import { toast } from "@/src/components/ui/toast/toast"
import { Container } from "@/src/components/common/container"
import { CtaButton } from "@/src/components/common/ctaButton"
import { BadgeCard } from "@/src/components/portal/BadgeCard"
import { SectionHeader } from "@/src/components/portal/SectionHeader"
import { WeeklyDropCard } from "@/src/components/portal/WeeklyDropCard"
import { WEEKLY_DROPS_CYCLE_SECONDS, type MissionItem } from "@/src/data/portalData"
import { usePortalStore } from "@/src/store/usePortalStore"
import { cn } from "@/src/lib/utils"

const MAIN_TABS = ["drops", "carreira", "badges"] as const

const CATEGORIES: { label: string; value: string }[] = [
  { label: "Todas as Missões", value: "all" },
  { label: "Onboarding & Segurança", value: "onboarding" },
  { label: "Hospedagens", value: "estadias" },
  { label: "Eventos", value: "eventos" },
  { label: "Experiências", value: "experiencias" },
  { label: "Networking", value: "networking" },
  { label: "Ranking", value: "ranking" },
]

function useBannerCountdown(initialSeconds = WEEKLY_DROPS_CYCLE_SECONDS) {
  const [seconds, setSeconds] = React.useState(initialSeconds)

  React.useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60
  const pad = (n: number) => String(n).padStart(2, "0")

  return `${hours}h ${pad(minutes)}m ${pad(secs)}s`
}

export default function KeyPassMissionsPage(): React.JSX.Element {
  const {
    missions,
    claimMission,
    weeklyDrops,
    claimWeeklyDrop,
    badges,
  } = usePortalStore()

  const [activeMainTab, setActiveMainTab] = useQueryState(
    "tab",
    parseAsStringLiteral(MAIN_TABS).withDefault("drops")
  )
  const bannerCountdown = useBannerCountdown(WEEKLY_DROPS_CYCLE_SECONDS)
  const [selectedCategory, setSelectedCategory] = React.useState("all")

  const completedCount = missions.filter((m) => m.isCompleted).length
  const totalCount = missions.length
  const claimableMissionsCount = missions.filter(
    (m) => m.isCompleted && !m.isClaimed && m.currentProgress >= m.totalRequired
  ).length

  const activeDropsCount = weeklyDrops.filter((d) => !d.isClaimed).length
  const claimableDropsCount = weeklyDrops.filter(
    (d) => d.isCompleted && !d.isClaimed
  ).length

  const unlockedBadgesCount = badges.filter((b) => b.isUnlocked).length
  const totalBadgesCount = badges.length

  const filteredMissions = missions.filter((mission) => {
    if (selectedCategory === "all") return true
    return mission.category === selectedCategory
  })


  const handleClaimMission = (mission: MissionItem) => {
    if (
      !mission.isCompleted ||
      mission.isClaimed ||
      mission.currentProgress < mission.totalRequired
    ) {
      return
    }
    claimMission(mission.id)
    toast.success(`Missão Resgatada: ${mission.title}`, {
      description: `Você recebeu +${mission.xpReward} XP${
        mission.tokensReward ? ` e +${mission.tokensReward} Tokens RIB` : ""
      }!`,
    })
  }

  const handleClaimDrop = (dropId: string) => {
    const drop = weeklyDrops.find((d) => d.id === dropId)
    if (!drop || !drop.isCompleted || drop.isClaimed) return
    claimWeeklyDrop(dropId)
    toast.success(`Drop da Semana Resgatado: ${drop.title}!`, {
      description: `Recompensa de +${drop.xpReward} XP${
        drop.tokensReward ? ` e +${drop.tokensReward} Token RIB` : ""
      } creditada no seu saldo.`,
    })
  }

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "onboarding":
        return "Onboarding & Segurança"
      case "estadias":
        return "Hospedagens"
      case "eventos":
        return "Eventos"
      case "experiencias":
        return "Experiências"
      case "networking":
        return "Networking"
      case "ranking":
        return "Ranking"
      default:
        return category
    }
  }

  return (
    <Container className="py-6 sm:py-8 space-y-6">
      <SectionHeader
        badge="Passe Executivo • Gamificação"
        tagline="Missões & Conquistas"
        title="Central de Missões, Drops & Conquistas"
        description="Acelere sua evolução de tier através de desafios semanais por tempo limitado, marcos de carreira e colecione medalhas de prestígio."
        actions={
          <div className="flex flex-wrap items-center gap-2">
            {claimableDropsCount + claimableMissionsCount > 0 && (
              <div className="px-3 py-1.5 rounded-xs bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-2xs whitespace-nowrap shrink-0">
                <Sparkle className="w-3.5 h-3.5 text-brand-primary shrink-0" weight="fill" />
                <span>
                  {claimableDropsCount + claimableMissionsCount} Recompensa
                  {claimableDropsCount + claimableMissionsCount > 1 ? "s" : ""}{" "}
                  Disponíve
                  {claimableDropsCount + claimableMissionsCount > 1
                    ? "is"
                    : "l"}
                </span>
              </div>
            )}
          </div>
        }
      />

      {}
      <div className="flex items-center gap-2 p-1.5 rounded-sm bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 w-full sm:w-auto overflow-x-auto scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveMainTab("drops")}
          className={cn(
            "flex items-center gap-2 px-4 py-2.5 rounded-xs text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap shrink-0",
            activeMainTab === "drops"
              ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-xs"
              : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
          )}
        >
          <Lightning
            className={cn(
              "w-4 h-4 shrink-0",
              activeMainTab === "drops" ? "text-brand-primary" : "text-zinc-400"
            )}
            weight="fill"
          />
          <span>Desafios da Semana (Drops)</span>
          <Badge
            color="default"
            variant="flat"
            radius="sm"
            className="text-[10px] px-1.5 py-0 whitespace-nowrap shrink-0 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700"
          >
            {activeDropsCount} Ativos
          </Badge>
        </button>

        <button
          type="button"
          onClick={() => setActiveMainTab("carreira")}
          className={cn(
            "flex items-center gap-2 px-4 py-2.5 rounded-xs text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap shrink-0",
            activeMainTab === "carreira"
              ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-xs"
              : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
          )}
        >
          <Trophy
            className={cn(
              "w-4 h-4 shrink-0",
              activeMainTab === "carreira"
                ? "text-brand-primary"
                : "text-zinc-400"
            )}
            weight="bold"
          />
          <span>Missões de Carreira</span>
          <span className="text-[11px] font-mono text-zinc-400 whitespace-nowrap shrink-0">
            ({completedCount}/{totalCount})
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveMainTab("badges")}
          className={cn(
            "flex items-center gap-2 px-4 py-2.5 rounded-xs text-xs font-bold uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap shrink-0",
            activeMainTab === "badges"
              ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-xs"
              : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
          )}
        >
          <SealCheck
            className={cn(
              "w-4 h-4 shrink-0",
              activeMainTab === "badges"
                ? "text-brand-primary"
                : "text-zinc-400"
            )}
            weight="fill"
          />
          <span>Galeria de Conquistas (Badges)</span>
          <span className="text-[11px] font-mono text-zinc-400 whitespace-nowrap shrink-0">
            ({unlockedBadgesCount}/{totalBadgesCount})
          </span>
        </button>
      </div>

      {}
      {activeMainTab === "drops" && (
        <div className="space-y-6">
          <div className="p-4 sm:p-5 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-sm bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-900 dark:text-white shrink-0">
                <Clock className="w-5 h-5 text-brand-primary shrink-0" weight="bold" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white">
                  Drops Temporários da Temporada
                </p>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  Estes desafios renovam-se semanalmente. Conclua antes que o
                  cronômetro expire para garantir bônus de XP e Tokens RIB.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs font-bold text-zinc-600 dark:text-zinc-300 whitespace-nowrap">
                Próxima renovação em:
              </span>
              <span className="text-xs font-mono font-black text-zinc-900 dark:text-white bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1 rounded-xs border border-zinc-200 dark:border-zinc-700 whitespace-nowrap shrink-0 tabular-nums">
                {bannerCountdown}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {weeklyDrops.map((drop) => (
              <WeeklyDropCard
                key={drop.id}
                drop={drop}
                onClaim={handleClaimDrop}
              />
            ))}
          </div>
        </div>
      )}

      {}
      {activeMainTab === "carreira" && (
        <div className="space-y-6">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.value
              return (
                <CtaButton
                  key={cat.value}
                  size="xs"
                  variant={isSelected ? "primary" : "secondary"}
                  onClick={() => setSelectedCategory(cat.value)}
                  className="whitespace-nowrap shrink-0 text-xs"
                >
                  {cat.label}
                </CtaButton>
              )
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredMissions.map((mission) => {
              const progressPct = Math.min(
                100,
                Math.round(
                  (mission.currentProgress / mission.totalRequired) * 100
                )
              )
              const isFullyCompleted =
                mission.currentProgress >= mission.totalRequired &&
                mission.isCompleted
              const canClaim = isFullyCompleted && !mission.isClaimed

              return (
                <div
                  key={mission.id}
                  className={cn(
                    "rounded-sm border p-5 flex flex-col justify-between bg-white dark:bg-zinc-900 shadow-2xs space-y-4 transition-all relative overflow-hidden",
                    canClaim
                      ? "border-brand-primary/60 ring-2 ring-brand-primary/20"
                      : "border-zinc-200 dark:border-zinc-800"
                  )}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1 min-w-0">
                        <span className="text-[9px] font-black uppercase tracking-wider text-zinc-400 block">
                          {getCategoryLabel(mission.category)}
                        </span>
                        <h3 className="text-sm font-heading font-black uppercase text-zinc-900 dark:text-white tracking-tight truncate">
                          {mission.title}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 whitespace-nowrap">
                        <div className="flex items-center gap-1 text-xs text-zinc-700 dark:text-zinc-300 font-normal">
                          <div className="relative w-3.5 h-3.5 shrink-0">
                            <Image
                              src="/utils/gamification/utils/xp.webp"
                              alt="XP"
                              fill
                              className="object-contain"
                            />
                          </div>
                          <span>+{mission.xpReward} XP</span>
                        </div>
                        {mission.tokensReward && mission.tokensReward > 0 ? (
                          <span className="text-xs text-zinc-700 dark:text-zinc-300 font-normal">
                            +{mission.tokensReward} RIB
                          </span>
                        ) : null}
                      </div>
                    </div>

                    <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
                      {mission.description}
                    </p>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] font-medium text-zinc-500 dark:text-zinc-400">
                        <span>
                          Progresso: {mission.currentProgress} /{" "}
                          {mission.totalRequired}
                        </span>
                        <span>{progressPct}%</span>
                      </div>
                      <div className="w-full h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden border border-zinc-200/60 dark:border-zinc-700/60">
                        <div
                          className={cn(
                            "h-full rounded-full transition-all duration-500",
                            isFullyCompleted ||
                              mission.isClaimed ||
                              progressPct >= 100
                              ? "bg-emerald-500"
                              : canClaim
                                ? "bg-brand-primary"
                                : "bg-zinc-900 dark:bg-white"
                          )}
                          style={{ width: `${progressPct}%` }}
                        />
                      </div>
                    </div>

                    {canClaim ? (
                      <div>
                        <CtaButton
                          size="xs"
                          variant="primary"
                          isFullWidth
                          onClick={() => handleClaimMission(mission)}
                          className="text-xs font-bold uppercase tracking-wider py-2 whitespace-nowrap justify-center"
                        >
                          Resgatar +{mission.xpReward} XP
                        </CtaButton>
                      </div>
                    ) : mission.isClaimed ? (
                      <div className="flex items-center justify-center gap-1.5 py-1.5 text-xs font-bold text-zinc-700 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-800/60 rounded-xs border border-zinc-200 dark:border-zinc-700/60 whitespace-nowrap">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" weight="bold" />
                        <span>Missão Concluída</span>
                      </div>
                    ) : null}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {}
      {activeMainTab === "badges" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {badges.map((badge) => (
              <BadgeCard key={badge.id} badge={badge} />
            ))}
          </div>
        </div>
      )}
    </Container>
  )
}
