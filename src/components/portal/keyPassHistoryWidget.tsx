"use client"

import * as React from "react"

import Image from "next/image"

import { XpActivity } from "@/src/data/portalData"
import { usePortalStore } from "@/src/store/usePortalStore"
import {
  CalendarCheck,
  Gift,
  Medal,
  Receipt,
  ShieldCheck,
  Target,
  Trophy,
  Users,
} from "@phosphor-icons/react"

import { ScrollArea } from "@/src/components/ui/scrollArea/scrollArea"

import { cn } from "@/src/lib/utils"

interface KeyPassHistoryWidgetProps {
  className?: string
}

export function KeyPassHistoryWidget({
  className,
}: KeyPassHistoryWidgetProps): React.JSX.Element {
  const { xpHistory } = usePortalStore()

  const getCategoryIcon = (category: XpActivity["category"]) => {
    switch (category) {
      case "onboarding":
        return (
          <ShieldCheck className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
        )
      case "hospedagem":
        return <Medal className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
      case "evento":
        return (
          <CalendarCheck className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
        )
      case "experiencia":
        return <Gift className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
      case "conexao":
        return <Users className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
      case "missao":
        return <Target className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
      case "bonus":
        return <Trophy className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
      default:
        return <Receipt className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 dark:border-zinc-800 pb-3 shrink-0">
        <div className="space-y-0.5 min-w-0">
          <div className="flex items-center gap-2">
            <Receipt
              className="w-4 h-4 text-zinc-900 dark:text-white shrink-0"
              weight="bold"
            />
            <h3 className="text-base font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white truncate">
              Histórico de Pontos XP
            </h3>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Extrato das atividades qualificadoras registradas.
          </p>
        </div>

        <span className="text-[11px] font-bold text-zinc-400 shrink-0 self-start sm:self-auto">
          {xpHistory.length} registros
        </span>
      </div>

      {}
      <ScrollArea className="h-[365px] pr-2">
        {xpHistory.length === 0 ? (
          <div className="p-8 text-center text-zinc-500 text-xs">
            Nenhum registro no histórico.
          </div>
        ) : (
          <div className="space-y-2.5 pr-3">
            {xpHistory.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-3 rounded-lg border border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/30 gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-7 h-7 rounded-md bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center shrink-0 shadow-2xs">
                    {getCategoryIcon(activity.category)}
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-bold text-zinc-900 dark:text-white truncate">
                      {activity.title}
                    </p>
                    <p className="text-[10px] text-zinc-400">{activity.date}</p>
                  </div>
                </div>

                {}
                <div className="shrink-0 text-right whitespace-nowrap">
                  {activity.xp > 0 ? (
                    <div className="inline-flex items-center gap-1.5 text-xs text-zinc-700 dark:text-zinc-300 font-normal">
                      <div className="relative w-3.5 h-3.5 shrink-0">
                        <Image
                          src="/utils/gamification/utils/xp.webp"
                          alt="XP"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span>+{activity.xp.toLocaleString("pt-BR")} XP</span>
                    </div>
                  ) : (
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 font-normal">
                      Recompensa
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  )
}
