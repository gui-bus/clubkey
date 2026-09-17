"use client"

import * as React from "react"

import Image from "next/image"

import { MissionItem } from "@/src/data/portalData"
import { usePortalStore } from "@/src/store/usePortalStore"
import { Check, CheckCircle, Trophy } from "@phosphor-icons/react"

import { toast } from "@/src/components/ui/toast/toast"

import { Container } from "@/src/components/common/container"
import { CtaButton } from "@/src/components/common/ctaButton"
import { SectionHeader } from "@/src/components/portal/SectionHeader"

import { cn } from "@/src/lib/utils"

const CATEGORIES: { label: string; value: string }[] = [
  { label: "Todas as Missões", value: "all" },
  { label: "Onboarding & Segurança", value: "onboarding" },
  { label: "Hospedagens", value: "estadias" },
  { label: "Eventos", value: "eventos" },
  { label: "Experiências", value: "experiencias" },
  { label: "Networking", value: "networking" },
  { label: "Ranking", value: "ranking" },
]

export default function KeyPassMissionsPage(): React.JSX.Element {
  const { missions, claimMission } = usePortalStore()
  const [selectedCategory, setSelectedCategory] = React.useState("all")

  const completedCount = missions.filter((m) => m.isCompleted).length
  const totalCount = missions.length
  const claimableCount = missions.filter(
    (m) => m.isCompleted && !m.isClaimed && m.currentProgress >= m.totalRequired
  ).length

  const filteredMissions = missions.filter((mission) => {
    if (selectedCategory === "all") return true
    return mission.category === selectedCategory
  })

  const handleClaim = (mission: MissionItem) => {
    if (
      !mission.isCompleted ||
      mission.isClaimed ||
      mission.currentProgress < mission.totalRequired
    ) {
      return
    }
    claimMission(mission.id)
    toast.success(`Conquista Resgatada: ${mission.title}`, {
      description: `Você recebeu +${mission.xpReward} XP${
        mission.tokensReward ? ` e +${mission.tokensReward} Tokens RIB` : ""
      }!`,
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
    <Container className="py-6 sm:py-8 space-y-4">
      {}
      <SectionHeader
        badge="Passe Executivo"
        tagline="Missões & Conquistas"
        title="Missões & Conquistas de Membro"
        description="Complete objetivos estratégicos na plataforma para acelerar sua evolução de tier e resgatar Tokens RIB."
        actions={
          <div className="flex items-center gap-2">
            <div className="px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-800/40 text-xs font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
              <CheckCircle
                className="w-3.5 h-3.5 text-zinc-700 dark:text-zinc-300"
                weight="fill"
              />
              <span>
                {completedCount} de {totalCount} Concluídas
              </span>
            </div>

            {claimableCount > 0 && (
              <div className="px-3 py-1.5 rounded-lg bg-brand-primary text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-2xs">
                <Trophy className="w-3.5 h-3.5" weight="bold" />
                <span>{claimableCount} para Resgatar</span>
              </div>
            )}
          </div>
        }
      />

      {}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.value
          return (
            <CtaButton
              key={cat.value}
              size="xs"
              variant={isSelected ? "primary" : "secondary"}
              onClick={() => setSelectedCategory(cat.value)}
              className="whitespace-nowrap shrink-0"
            >
              {cat.label}
            </CtaButton>
          )
        })}
      </div>

      {}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredMissions.map((mission) => {
          const progressPct = Math.min(
            100,
            Math.round((mission.currentProgress / mission.totalRequired) * 100)
          )
          const isFullyCompleted =
            mission.currentProgress >= mission.totalRequired &&
            mission.isCompleted
          const canClaim = isFullyCompleted && !mission.isClaimed

          return (
            <div
              key={mission.id}
              className={cn(
                "rounded-xl border p-5 flex flex-col justify-between bg-white dark:bg-zinc-900 shadow-2xs space-y-4 transition-all relative overflow-hidden",
                canClaim
                  ? "border-brand-primary/60 ring-1 ring-brand-primary/20"
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

                  {}
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
                {}
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

                {}
                {canClaim ? (
                  <div>
                    <CtaButton
                      size="xs"
                      variant="primary"
                      isFullWidth
                      onClick={() => handleClaim(mission)}
                      className="text-xs font-bold uppercase tracking-wider py-2"
                    >
                      Resgatar +{mission.xpReward} XP
                    </CtaButton>
                  </div>
                ) : mission.isClaimed ? (
                  <div className="flex items-center justify-center gap-1.5 py-1.5 text-xs font-bold text-zinc-700 dark:text-zinc-300 bg-zinc-50 dark:bg-zinc-800/60 rounded-lg border border-zinc-200 dark:border-zinc-700/60 whitespace-nowrap">
                    <Check className="w-3.5 h-3.5" weight="bold" />
                    <span>Conquista Concluída</span>
                  </div>
                ) : null}
              </div>
            </div>
          )
        })}
      </div>
    </Container>
  )
}
