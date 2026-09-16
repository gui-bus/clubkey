"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  CheckCircle,
  Clock,
} from "@phosphor-icons/react"
import { Container } from "@/src/components/common/container"
import { Badge } from "@/src/components/ui/badge/badge"
import { Button } from "@/src/components/ui/button/button"
import { usePortalStore } from "@/src/store/usePortalStore"
import { MissionItem } from "@/src/data/portalData"
import { toast } from "@/src/components/ui/toast/toast"
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
    (m) => m.isCompleted && !m.isClaimed
  ).length

  const filteredMissions = missions.filter((mission) => {
    if (selectedCategory === "all") return true
    return mission.category === selectedCategory
  })

  const handleClaim = (mission: MissionItem) => {
    claimMission(mission.id)
    toast.success(`Conquista Resgatada: ${mission.title}`, {
      description: `Você recebeu +${mission.xpReward} XP${
        mission.tokensReward ? ` e +${mission.tokensReward} Tokens RIB` : ""
      }!`,
    })
  }

  return (
    <Container className="py-8 sm:py-10 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white">
            Missões & Conquistas de Associado
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Complete objetivos chave na plataforma para acumular pontuação acelerada e receber tokens RIB.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <div className="px-3.5 py-2 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] text-xs font-bold text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-500" weight="fill" />
            <span>
              {completedCount} de {totalCount} Concluídas
            </span>
          </div>

          {claimableCount > 0 && (
            <Badge
              color="primary"
              variant="flat"
              radius="sm"
              className="font-bold text-xs px-2.5 py-1"
            >
              {claimableCount} para Resgatar
            </Badge>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.value
          return (
            <button
              key={cat.value}
              type="button"
              onClick={() => setSelectedCategory(cat.value)}
              className={cn(
                "px-3.5 py-2 rounded-sm text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer",
                isSelected
                  ? "bg-brand-primary text-white shadow-xs"
                  : "bg-white dark:bg-[#141416] border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              )}
            >
              {cat.label}
            </button>
          )
        })}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredMissions.map((mission) => {
          const progressPct = Math.min(
            100,
            Math.round((mission.currentProgress / mission.totalRequired) * 100)
          )
          const canClaim = mission.isCompleted && !mission.isClaimed

          return (
            <div
              key={mission.id}
              className={cn(
                "rounded-sm border p-5 flex flex-col justify-between transition-all bg-white dark:bg-[#141416] shadow-xs relative overflow-hidden",
                canClaim
                  ? "border-brand-primary ring-2 ring-brand-primary/30"
                  : mission.isClaimed
                  ? "border-emerald-500/40 dark:border-emerald-500/30"
                  : "border-zinc-200 dark:border-zinc-800"
              )}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <Badge
                      color="default"
                      variant="flat"
                      radius="sm"
                      className="text-[9px] font-black uppercase tracking-wider"
                    >
                      {mission.category}
                    </Badge>
                    <h3 className="text-sm font-heading font-black uppercase text-zinc-900 dark:text-white">
                      {mission.title}
                    </h3>
                  </div>

                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-xs bg-[#F1F1F1] dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 text-[10px] font-black uppercase whitespace-nowrap">
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
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-xs bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-700 text-[10px] font-black uppercase whitespace-nowrap">
                        <div className="relative w-3 h-3 shrink-0">
                          <Image
                            src="/utils/gamification/utils/RIB.svg"
                            alt="RIB"
                            fill
                            className="object-contain"
                          />
                        </div>
                        <span>+{mission.tokensReward} RIB</span>
                      </span>
                    ) : null}
                  </div>
                </div>

                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                  {mission.description}
                </p>
              </div>

              <div className="space-y-3 pt-4 mt-4 border-t border-zinc-100 dark:border-zinc-800/80">
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-bold text-zinc-500 dark:text-zinc-400">
                    <span>
                      Progresso: {mission.currentProgress} / {mission.totalRequired}
                    </span>
                    <span>{progressPct}%</span>
                  </div>
                  <div className="w-full h-2 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className={cn(
                        "h-full rounded-full transition-all duration-500",
                        mission.isClaimed
                          ? "bg-emerald-500"
                          : "bg-brand-primary"
                      )}
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                </div>

                <div className="pt-1">
                  {canClaim ? (
                    <Button
                      color="primary"
                      size="sm"
                      onClick={() => handleClaim(mission)}
                      className="w-full text-xs font-black uppercase tracking-wider shadow-xs inline-flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0"
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
                  ) : mission.isClaimed ? (
                    <div className="flex items-center justify-center gap-1.5 py-1.5 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 rounded-sm border border-emerald-200 dark:border-emerald-800/40 whitespace-nowrap">
                      <CheckCircle className="w-4 h-4 shrink-0" weight="fill" />
                      <span>Conquista Concluída</span>
                    </div>
                  ) : mission.actionUrl ? (
                    <Link
                      href={mission.actionUrl}
                      className="inline-flex items-center justify-center gap-1.5 w-full py-2 rounded-sm border border-zinc-200 dark:border-zinc-800 text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200 hover:border-brand-primary hover:text-brand-primary transition-colors whitespace-nowrap shrink-0"
                    >
                      <span>{mission.actionLabel || "Realizar Ação"}</span>
                      <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                    </Link>
                  ) : (
                    <div className="inline-flex items-center justify-center gap-1.5 w-full py-1.5 text-xs font-bold text-zinc-400 whitespace-nowrap shrink-0">
                      <Clock className="w-3.5 h-3.5 shrink-0" />
                      <span>Em andamento</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </Container>
  )
}
