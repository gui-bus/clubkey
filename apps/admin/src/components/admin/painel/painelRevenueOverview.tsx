"use client"

import * as React from "react"

import { formatCurrency } from "@clubkey/utils"
import {
  ArrowUpRight,
  Bed,
  CurrencyDollar,
  TrendUp,
} from "@phosphor-icons/react"

import { MOCK_PAINEL_REVENUE_CHART } from "@/src/data/mocks/painel.data"

export function PainelRevenueOverview(): React.JSX.Element {
  const maxRevenue = Math.max(...MOCK_PAINEL_REVENUE_CHART.map((item) => item.revenue))

  return (
    <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#141416] p-5 sm:p-6 space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-zinc-100 dark:border-zinc-800/80 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="size-7 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 flex items-center justify-center shrink-0">
              <CurrencyDollar size={16} weight="bold" />
            </div>
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
              Desempenho de Receita & Reservas
            </h3>
          </div>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">
            Volume bruto faturado (GMV) e reservas de hospedagem nos últimos 6 meses.
          </p>
        </div>

        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-semibold">
          <TrendUp size={13} weight="bold" className="text-emerald-600 dark:text-emerald-400" />
          <span>+17.2% vs semestre anterior</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="p-3.5 rounded-xl bg-zinc-50/70 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-800/60">
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Faturamento (Outubro)
          </span>
          <div className="text-base sm:text-lg font-black text-zinc-900 dark:text-white mt-1">
            {formatCurrency(340000)}
          </div>
          <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium flex items-center gap-1 mt-0.5">
            <ArrowUpRight size={12} weight="bold" className="text-brand-primary" />
            Projeção em alta
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-zinc-50/70 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-800/60">
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Ticket Médio / Noite
          </span>
          <div className="text-base sm:text-lg font-black text-zinc-900 dark:text-white mt-1">
            {formatCurrency(1223)}
          </div>
          <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium mt-0.5 block">
            Hospedagens Stay
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-zinc-50/70 dark:bg-zinc-900/40 border border-zinc-100 dark:border-zinc-800/60">
          <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Taxa de Ocupação Média
          </span>
          <div className="text-base sm:text-lg font-black text-zinc-900 dark:text-white mt-1">
            82.4%
          </div>
          <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium flex items-center gap-1 mt-0.5">
            <Bed size={12} weight="bold" />
            1.232 noites no período
          </span>
        </div>
      </div>

      <div className="space-y-2 pt-2">
        <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          <span>Comparativo Mensal (Maio - Outubro)</span>
          <span>Volume em R$</span>
        </div>

        <div className="grid grid-cols-6 gap-2 sm:gap-3 items-end h-36 pt-2 pb-1">
          {MOCK_PAINEL_REVENUE_CHART.map((item) => {
            const heightPercent = Math.round((item.revenue / maxRevenue) * 100)
            return (
              <div key={item.month} className="flex flex-col items-center h-full justify-end group gap-1.5">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold text-zinc-900 dark:text-white whitespace-nowrap bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded shadow-xs">
                  {formatCurrency(item.revenue)}
                </div>

                <div className="w-full bg-zinc-100 dark:bg-zinc-800/50 rounded-xl overflow-hidden flex flex-col justify-end h-24 relative">
                  <div
                    style={{ height: `${heightPercent}%` }}
                    className={`w-full rounded-xl transition-all duration-300 ${
                      item.projected
                        ? "bg-brand-primary"
                        : "bg-zinc-300 dark:bg-zinc-700 group-hover:bg-zinc-400 dark:group-hover:bg-zinc-600"
                    }`}
                  />
                </div>

                <div className="flex flex-col items-center">
                  <span className={`text-xs font-bold ${item.projected ? "text-brand-primary" : "text-zinc-600 dark:text-zinc-400"}`}>
                    {item.month}
                  </span>
                  <span className="text-[9px] text-zinc-400 dark:text-zinc-500 font-mono">
                    {item.reservations} res.
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
