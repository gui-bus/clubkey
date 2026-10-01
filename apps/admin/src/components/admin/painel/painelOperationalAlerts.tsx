"use client"

import * as React from "react"
import Link from "next/link"

import {
  ArrowRight,
  CreditCard,
  Receipt,
  ShieldCheck,
  Users,
  WarningCircle,
} from "@phosphor-icons/react"

import {
  MOCK_PAINEL_ALERTS,
  type PainelAlert,
} from "@/src/data/mocks/painel.data"

const ICON_MAP: Record<PainelAlert["iconName"], React.ComponentType<{ size?: number; weight?: "bold" | "duotone" | "fill" }>> = {
  ShieldCheck,
  CreditCard,
  Users,
  Receipt,
}

export function PainelOperationalAlerts(): React.JSX.Element {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="size-7 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 flex items-center justify-center shrink-0">
            <WarningCircle size={16} weight="bold" />
          </div>
          <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
            Atenção Operacional & Pendências
          </h3>
        </div>

        <span className="text-[11px] text-zinc-400 dark:text-zinc-500 font-medium">
          {MOCK_PAINEL_ALERTS.reduce((acc, curr) => acc + curr.count, 0)} itens pendentes
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {MOCK_PAINEL_ALERTS.map((alert) => {
          const IconComponent = ICON_MAP[alert.iconName] || WarningCircle
          return (
            <Link
              key={alert.id}
              href={alert.href}
              className="group relative rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#141416] p-4 flex flex-col justify-between gap-3.5 transition-all hover:border-zinc-300 dark:hover:border-zinc-700 hover:shadow-sm cursor-pointer select-none"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="size-8 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 flex items-center justify-center transition-colors group-hover:text-brand-primary">
                  <IconComponent size={16} weight="bold" />
                </div>

                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-black text-zinc-900 dark:text-white">
                    {alert.count}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
                    {alert.badgeText}
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <h4 className="text-xs font-bold text-zinc-900 dark:text-white group-hover:text-brand-primary transition-colors line-clamp-1">
                  {alert.title}
                </h4>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-normal leading-relaxed line-clamp-2">
                  {alert.description}
                </p>
              </div>

              <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/60 flex items-center justify-between text-[11px] font-semibold text-zinc-400 dark:text-zinc-500 group-hover:text-brand-primary transition-colors">
                <span>Ver detalhes</span>
                <ArrowRight size={13} weight="bold" className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
