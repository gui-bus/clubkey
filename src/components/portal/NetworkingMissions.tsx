"use client"

import * as React from "react"
import Image from "next/image"
import { CheckCircle, Clock, Handshake } from "@phosphor-icons/react"
import { MissionItem } from "@/src/data/portalData"
import { CtaButton } from "@/src/components/common/ctaButton"
import { cn } from "@/src/lib/utils"

interface NetworkingMissionsProps {
  missions: MissionItem[]
  activeConnectionsCount: number
  onClaim: (mission: MissionItem) => void
}

export function NetworkingMissions({
  missions,
  activeConnectionsCount,
  onClaim,
}: NetworkingMissionsProps): React.JSX.Element {
  return (
    <div className="relative w-full rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] p-6 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-zinc-100 dark:border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-sm bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white flex items-center justify-center shrink-0">
            <Handshake className="w-5 h-5 text-zinc-900 dark:text-white" weight="fill" />
          </div>
          <div>
            <span className="text-sm font-black uppercase tracking-wider text-zinc-900 dark:text-white block">
              Missões de Networking • KeyPass
            </span>
            <span className="text-xs text-zinc-900 dark:text-white font-medium">
              Conecte-se com membros da comunidade para desbloquear XP acelerada e Tokens RIB
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white text-[10px] font-black uppercase tracking-wider border border-zinc-200 dark:border-zinc-700">
            <span>Total ativo: {activeConnectionsCount} conexões</span>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {missions.map((mission) => {
          const currentProg = Math.min(mission.totalRequired, activeConnectionsCount)
          const isCompleted = currentProg >= mission.totalRequired
          const canClaim = isCompleted && !mission.isClaimed
          const progressPct = Math.min(
            100,
            Math.round((currentProg / mission.totalRequired) * 100)
          )

          return (
            <div
              key={mission.id}
              className={cn(
                "rounded-sm border p-5 flex flex-col justify-between transition-all bg-white dark:bg-[#141416] relative",
                canClaim
                  ? "border-brand-primary ring-2 ring-brand-primary/20"
                  : mission.isClaimed
                  ? "border-emerald-500/40 dark:border-emerald-500/30"
                  : "border-zinc-200 dark:border-zinc-800"
              )}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[9px] font-black uppercase tracking-widest text-zinc-900 dark:text-white block">
                      Meta {mission.totalRequired} Conexões
                    </span>
                    <h3 className="text-xs sm:text-sm font-heading font-black uppercase text-zinc-900 dark:text-white mt-0.5">
                      {mission.title}
                    </h3>
                  </div>

                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <span className="inline-flex items-center gap-1 text-zinc-900 dark:text-white text-[11px] font-normal uppercase whitespace-nowrap">
                      <div className="relative w-3.5 h-3.5 shrink-0">
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
                      <span className="inline-flex items-center gap-1 text-zinc-900 dark:text-white text-[11px] font-normal uppercase whitespace-nowrap">
                        <div className="relative w-3.5 h-3.5 shrink-0">
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

                <p className="text-xs text-zinc-900 dark:text-white font-normal leading-relaxed">
                  {mission.description}
                </p>
              </div>

              <div className="space-y-2 pt-3 mt-4 border-t border-zinc-100 dark:border-zinc-800">
                <div className="flex justify-between text-[11px] font-medium text-zinc-900 dark:text-white">
                  <span>
                    Progresso: {currentProg} / {mission.totalRequired}
                  </span>
                  <span>{progressPct}%</span>
                </div>

                <div className="w-full h-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-full overflow-hidden">
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

                <div className="pt-2">
                  {canClaim ? (
                    <CtaButton
                      type="button"
                      variant="primary"
                      size="xs"
                      isFullWidth
                      onClick={() => onClaim(mission)}
                      className="text-xs font-black shadow-none hover:shadow-none"
                    >
                      <div className="relative w-3.5 h-3.5 mr-1.5 shrink-0">
                        <Image
                          src="/utils/gamification/utils/xp.webp"
                          alt="XP"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span>Resgatar Recompensa</span>
                    </CtaButton>
                  ) : mission.isClaimed ? (
                    <div className="flex items-center justify-center gap-1.5 py-1 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 rounded-sm border border-emerald-500/20 whitespace-nowrap">
                      <CheckCircle className="w-3.5 h-3.5 shrink-0" weight="fill" />
                      <span>Recompensa Resgatada</span>
                    </div>
                  ) : (
                    <div className="inline-flex items-center justify-center gap-1.5 w-full py-1 text-xs font-medium text-zinc-900 dark:text-white whitespace-nowrap shrink-0">
                      <Clock className="w-3.5 h-3.5 shrink-0" />
                      <span>Faltam {Math.max(0, mission.totalRequired - currentProg)} conexões</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
