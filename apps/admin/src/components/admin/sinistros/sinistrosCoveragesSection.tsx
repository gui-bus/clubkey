"use client"

import * as React from "react"

import type { CoverageLimit } from "@clubkey/types"
import { TableTitle } from "@clubkey/ui"
import { formatCurrency } from "@clubkey/utils"
import {
  Car,
  CloudLightning,
  Flame,
  Lightning,
  ShieldCheck,
  Wind,
} from "@phosphor-icons/react"

export interface SinistrosCoveragesSectionProps {
  coverages: CoverageLimit[]
}

const ICON_MAP: Record<string, React.ElementType> = {
  Flame,
  Shield: ShieldCheck,
  Lightning,
  Wind,
  CloudLightning,
  Car,
}

export function SinistrosCoveragesSection({
  coverages,
}: SinistrosCoveragesSectionProps): React.JSX.Element {
  return (
    <section className="space-y-4">
      <TableTitle
        title="Coberturas e Limites da Apólice"
        description="Limites contratuais máximos indenizáveis e percentuais de ressarcimento por evento."
      />

      <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#141416] overflow-hidden shadow-2xs">
        <div className="w-full overflow-x-auto overflow-y-hidden [scrollbar-width:thin] [scrollbar-color:theme(colors.zinc.300)_transparent] dark:[scrollbar-color:theme(colors.zinc.700)_transparent]">
          <table className="w-full min-w-[620px] text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-800/40 text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3.5 px-5 font-bold select-none text-left">
                  Cobertura
                </th>
                <th className="py-3.5 px-5 font-bold select-none text-right w-px whitespace-nowrap">
                  Limite Máximo
                </th>
                <th className="py-3.5 px-5 font-bold select-none text-center w-px whitespace-nowrap">
                  Indenização
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/80">
              {coverages.map((cov) => {
                const Icon = ICON_MAP[cov.iconName] || ShieldCheck

                return (
                  <tr
                    key={cov.id}
                    className="transition-colors hover:bg-zinc-50/60 dark:hover:bg-zinc-800/30 select-none"
                  >
                    <td className="py-3.5 px-5 align-middle text-left">
                      <div className="flex items-center gap-3">
                        <div className="size-8 rounded-xl bg-orange-500/10 dark:bg-orange-500/15 text-orange-600 dark:text-orange-400 flex items-center justify-center shrink-0">
                          <Icon size={16} weight="bold" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-zinc-900 dark:text-white text-xs">
                            {cov.title}
                          </span>
                          {cov.description && (
                            <span className="text-[11px] text-zinc-400 dark:text-zinc-500 line-clamp-1">
                              {cov.description}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="py-3.5 px-5 align-middle text-right w-px whitespace-nowrap">
                      <span className="font-mono font-bold text-zinc-900 dark:text-white text-xs">
                        {formatCurrency(cov.maxLimit)}
                      </span>
                    </td>

                    <td className="py-3.5 px-5 align-middle text-center w-px whitespace-nowrap">
                      <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 dark:border-emerald-500/30 min-w-[55px]">
                        {cov.compensationPercentage}%
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
