"use client"

import * as React from "react"

import type { AdminClaim } from "@clubkey/types"
import { formatCurrency } from "@clubkey/utils"
import {
  CheckCircle,
  ClockCountdown,
  CurrencyDollar,
  WarningCircle,
} from "@phosphor-icons/react"

export interface SinistrosStatsProps {
  claims: AdminClaim[]
}

export function SinistrosStats({
  claims,
}: SinistrosStatsProps): React.JSX.Element {
  const totalClaims = claims.length
  const inAnalysisCount = claims.filter((c) => c.status === "EM_ANALISE" || c.status === "ABERTO").length
  const paidClaims = claims.filter((c) => c.status === "PAGO")
  const paidCount = paidClaims.length
  const totalIndemnified = paidClaims.reduce(
    (acc, curr) => acc + (curr.approvedAmount || curr.estimatedAmount || 0),
    0
  )

  const stats = [
    {
      title: "Total de Sinistros",
      value: String(totalClaims),
      helper: "Ocorrências registradas",
      icon: WarningCircle,
      trend: "Total acumulado",
      trendColor: "text-zinc-500",
    },
    {
      title: "Em Regulação / Abertos",
      value: String(inAnalysisCount),
      helper: "Necessitam de ação / laudo",
      icon: ClockCountdown,
      trend: "Fila operacional",
      trendColor: "text-amber-500",
    },
    {
      title: "Sinistros Indenizados",
      value: String(paidCount),
      helper: "Liquidados com sucesso",
      icon: CheckCircle,
      trend: "Reembolsados",
      trendColor: "text-emerald-500",
    },
    {
      title: "Total Pago em Indenizações",
      value: formatCurrency(totalIndemnified),
      helper: "Liquidação financeira",
      icon: CurrencyDollar,
      trend: "Proteção Key",
      trendColor: "text-emerald-500",
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 w-full">
      {stats.map((stat, idx) => {
        const Icon = stat.icon
        return (
          <div
            key={idx}
            className="p-5 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#141416] shadow-2xs flex flex-col justify-between"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400">
                {stat.title}
              </span>
              <div className="size-8 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-300 flex items-center justify-center shrink-0">
                <Icon size={18} weight="bold" />
              </div>
            </div>

            <div className="mt-4 space-y-1">
              <span className="text-2xl 2xl:text-3xl font-black font-heading tracking-tight text-zinc-900 dark:text-white block">
                {stat.value}
              </span>
              <div className="flex items-center justify-between text-[11px] pt-1 border-t border-zinc-100 dark:border-zinc-800/60">
                <span className="text-zinc-400 dark:text-zinc-500 font-medium truncate">
                  {stat.helper}
                </span>
                <span className={`font-bold shrink-0 ml-1 ${stat.trendColor}`}>
                  {stat.trend}
                </span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
