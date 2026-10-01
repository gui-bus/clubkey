"use client"

import * as React from "react"

import {
  TableStatusBadge,
  type TableStatusBadgeVariant,
  TableTitle,
} from "@clubkey/ui"
import { formatCurrency } from "@clubkey/utils"
import {
  Check,
  CheckCircle,
  ClockCountdown,
  Prohibit,
  WarningCircle,
} from "@phosphor-icons/react"

import {
  MOCK_PAINEL_RECENT_ACTIVITIES,
  type PainelRecentActivity as ActivityType,
} from "@/src/data/mocks/painel.data"

export function PainelRecentActivity(): React.JSX.Element {
  const renderActivityStatusBadge = (activity: ActivityType) => {
    const { variant, label } = activity.statusBadge
    let icon = <CheckCircle size={36} weight="fill" />

    if (variant === "warning") {
      icon = <ClockCountdown size={36} weight="bold" />
    } else if (variant === "danger") {
      icon = <Prohibit size={36} weight="bold" />
    } else if (variant === "neutral") {
      icon = <Check size={36} weight="bold" />
    } else if (variant === "primary") {
      icon = <WarningCircle size={36} weight="bold" />
    }

    return (
      <TableStatusBadge
        variant={variant as TableStatusBadgeVariant}
        label={label}
        icon={icon}
      />
    )
  }

  return (
    <div className="space-y-3 w-full">
      <TableTitle
        title="Atividades & Operações Recentes"
        description="Fluxo em tempo real de transações, reservas, sinistros e cadastros na plataforma."
      />

      <div className="w-full rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#141416] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-zinc-200/80 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 bg-zinc-50/50 dark:bg-zinc-900/30">
                <th className="py-3.5 px-4 font-bold select-none text-left w-px whitespace-nowrap text-[10px] uppercase tracking-wider">
                  Horário
                </th>
                <th className="py-3.5 px-4 font-bold select-none text-left min-w-[300px] text-[10px] uppercase tracking-wider">
                  Operação / Evento
                </th>
                <th className="py-3.5 px-4 font-bold select-none text-left w-px whitespace-nowrap text-[10px] uppercase tracking-wider">
                  Usuário / Origem
                </th>
                <th className="py-3.5 px-4 font-bold select-none text-right w-px whitespace-nowrap text-[10px] uppercase tracking-wider">
                  Valor
                </th>
                <th className="py-3.5 px-4 font-bold select-none text-center w-px whitespace-nowrap text-[10px] uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/80">
              {MOCK_PAINEL_RECENT_ACTIVITIES.map((act) => (
                <tr
                  key={act.id}
                  className="transition-colors hover:bg-zinc-50/60 dark:hover:bg-zinc-800/30 group/row select-none"
                >
                  <td className="py-4 px-4 align-middle text-left w-px whitespace-nowrap">
                    <span className="font-bold text-zinc-900 dark:text-white text-xs">
                      {act.timeAgo}
                    </span>
                  </td>

                  <td className="py-4 px-4 align-middle text-left min-w-[300px]">
                    <div className="flex flex-col min-w-0">
                      <span className="font-bold text-zinc-900 dark:text-white text-xs truncate">
                        {act.title}
                      </span>
                      <span className="text-[11px] text-zinc-400 dark:text-zinc-500 truncate mt-0.5">
                        {act.description}
                      </span>
                    </div>
                  </td>

                  <td className="py-4 px-4 align-middle text-left w-px whitespace-nowrap">
                    <div className="flex items-center gap-2.5">
                      <div className="size-7 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 font-bold text-[10px] flex items-center justify-center shrink-0 border border-zinc-200/60 dark:border-zinc-700/60">
                        {act.user.initials}
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-semibold text-zinc-900 dark:text-white text-xs truncate">
                          {act.user.name}
                        </span>
                        {act.user.role && (
                          <span className="text-[10px] text-zinc-400 dark:text-zinc-500 truncate">
                            {act.user.role}
                          </span>
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-4 align-middle text-right w-px whitespace-nowrap">
                    {act.amount !== undefined ? (
                      <span className="font-bold text-zinc-900 dark:text-white text-xs font-mono">
                        {formatCurrency(act.amount)}
                      </span>
                    ) : (
                      <span className="text-zinc-400 text-xs font-mono">—</span>
                    )}
                  </td>

                  <td className="py-4 px-4 align-middle text-center w-px whitespace-nowrap">
                    <div className="flex items-center justify-center">
                      {renderActivityStatusBadge(act)}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
