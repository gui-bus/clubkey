"use client"

import * as React from "react"

import Image from "next/image"
import Link from "next/link"

import { MissionItem } from "@/src/data/portalData"
import { usePortalStore } from "@/src/store/usePortalStore"
import { ArrowRight, CheckCircle, Target } from "@phosphor-icons/react"

import { toast } from "@/src/components/ui/toast/toast"

import { CtaButton } from "@/src/components/common/ctaButton"

import { cn } from "@/src/lib/utils"

interface KeyPassMissionsWidgetProps {
  className?: string
}

export function KeyPassMissionsWidget({
  className,
}: KeyPassMissionsWidgetProps): React.JSX.Element {
  const { missions, claimMission } = usePortalStore()

  const displayMissions = React.useMemo(() => {
    const claimable = missions.filter(
      (m) =>
        m.isCompleted && !m.isClaimed && m.currentProgress >= m.totalRequired
    )
    const pending = missions.filter(
      (m) =>
        !m.isClaimed && (!m.isCompleted || m.currentProgress < m.totalRequired)
    )
    return [...claimable, ...pending].slice(0, 3)
  }, [missions])

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
        return "Onboarding"
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
    <div
      className={cn(
        "rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 sm:p-6 shadow-2xs space-y-4",
        className
      )}
    >
      {}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-3">
        <div className="space-y-0.5 min-w-0">
          <div className="flex items-center gap-2">
            <Target
              className="w-4 h-4 text-zinc-900 dark:text-white shrink-0"
              weight="bold"
            />
            <h3 className="text-base font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white truncate">
              Metas & Missões em Destaque
            </h3>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Ações prioritárias para elevar seu status de associado.
          </p>
        </div>

        <Link
          href="/keypass/missoes"
          className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white hover:text-brand-primary dark:hover:text-brand-primary inline-flex items-center gap-1 shrink-0 whitespace-nowrap self-start sm:self-auto group"
        >
          <span>Ver todas ({missions.length})</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
        </Link>
      </div>

      {}
      <div className="space-y-2.5">
        {displayMissions.length === 0 ? (
          <div className="p-8 text-center rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/40 space-y-1.5">
            <CheckCircle className="w-6 h-6 text-zinc-400 mx-auto" />
            <p className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
              Nenhuma missão pendente no momento
            </p>
          </div>
        ) : (
          displayMissions.map((mission) => {
            const progressPct = Math.min(
              100,
              Math.round(
                (mission.currentProgress / mission.totalRequired) * 100
              )
            )
            const isFullyCompleted =
              mission.currentProgress >= mission.totalRequired &&
              mission.isCompleted
            const isReadyToClaim = isFullyCompleted && !mission.isClaimed

            return (
              <div
                key={mission.id}
                className="p-3.5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 space-y-2.5"
              >
                {}
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-0.5 min-w-0">
                    <span className="text-[9px] font-black uppercase tracking-wider text-zinc-400 block">
                      {getCategoryLabel(mission.category)}
                    </span>
                    <h4 className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-tight truncate">
                      {mission.title}
                    </h4>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">
                      {mission.description}
                    </p>
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

                {}
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] text-zinc-500 font-medium">
                    <span>
                      Progresso: {mission.currentProgress} /{" "}
                      {mission.totalRequired}
                    </span>
                    <span>{progressPct}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden border border-zinc-200/60 dark:border-zinc-700/60">
                    <div
                      className="h-full rounded-full bg-zinc-900 dark:bg-white transition-all duration-300"
                      style={{ width: `${progressPct}%` }}
                    />
                  </div>
                </div>

                {}
                {isReadyToClaim && (
                  <div className="flex justify-end pt-0.5">
                    <CtaButton
                      size="xs"
                      variant="primary"
                      onClick={() => handleClaim(mission)}
                      className="text-[11px] font-bold uppercase tracking-wider py-1.5"
                    >
                      Resgatar +{mission.xpReward} XP
                    </CtaButton>
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
