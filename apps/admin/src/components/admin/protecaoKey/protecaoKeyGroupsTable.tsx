"use client"

import * as React from "react"

import type { InsuranceGroup } from "@clubkey/types"
import { TableStatusBadge } from "@clubkey/ui"
import { formatCurrency } from "@clubkey/utils"
import {
  CalendarBlank,
  CaretDown,
  CaretUp,
  CaretUpDown,
  CheckCircle,
  ClockCountdown,
  HouseLine,
  Receipt,
  ShieldCheck,
  ShieldWarning,
  XCircle,
} from "@phosphor-icons/react"

export interface ProtecaoKeyGroupsTableProps {
  groups: InsuranceGroup[]
  sortBy?: string | null
  sortOrder?: "asc" | "desc" | null
  onSortChange?: (field: string) => void
}

export function ProtecaoKeyGroupsTable({
  groups,
  sortBy,
  sortOrder,
  onSortChange,
}: ProtecaoKeyGroupsTableProps): React.JSX.Element {
  const getGroupStatusBadge = (status: InsuranceGroup["status"]) => {
    switch (status) {
      case "ATIVO":
        return (
          <TableStatusBadge
            variant="success"
            label="Ativo"
            icon={<CheckCircle size={36} weight="fill" />}
          />
        )
      case "CANCELADO":
        return (
          <TableStatusBadge
            variant="danger"
            label="Cancelado"
            icon={<XCircle size={36} weight="fill" />}
          />
        )
      case "SUSPENSO":
        return (
          <TableStatusBadge
            variant="warning"
            label="Suspenso"
            icon={<ShieldWarning size={36} weight="fill" />}
          />
        )
      case "EM_ATRASO":
        return (
          <TableStatusBadge
            variant="danger"
            label="Em Atraso"
            icon={<ClockCountdown size={36} weight="bold" />}
          />
        )
    }
  }

  const renderSortIndicator = (field: string) => {
    if (sortBy === field) {
      return sortOrder === "asc" ? (
        <CaretUp size={12} weight="bold" className="text-brand-primary" />
      ) : (
        <CaretDown size={12} weight="bold" className="text-brand-primary" />
      )
    }
    return (
      <CaretUpDown
        size={12}
        weight="bold"
        className="text-zinc-400 opacity-60 group-hover/sort:opacity-100 transition-opacity"
      />
    )
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse min-w-[860px]">
        <thead>
          <tr className="border-b border-zinc-100 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-900/40 text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            <th className="py-3.5 px-4 font-bold select-none">
              <button
                type="button"
                onClick={() => onSortChange?.("name")}
                className="inline-flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer group/sort text-[10px] font-bold uppercase tracking-wider"
              >
                <span>Grupo & Host</span>
                {renderSortIndicator("name")}
              </button>
            </th>

            <th className="py-3.5 px-4 font-bold select-none text-right w-px whitespace-nowrap">
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => onSortChange?.("propertiesCount")}
                  className="inline-flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer group/sort text-[10px] font-bold uppercase tracking-wider"
                >
                  <span>Imóveis</span>
                  {renderSortIndicator("propertiesCount")}
                </button>
              </div>
            </th>

            <th className="py-3.5 px-4 font-bold select-none text-right w-px whitespace-nowrap">
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => onSortChange?.("invoicesCount")}
                  className="inline-flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer group/sort text-[10px] font-bold uppercase tracking-wider"
                >
                  <span>Faturas</span>
                  {renderSortIndicator("invoicesCount")}
                </button>
              </div>
            </th>

            <th className="py-3.5 px-4 font-bold select-none text-right w-px whitespace-nowrap">
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => onSortChange?.("monthlyAmount")}
                  className="inline-flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer group/sort text-[10px] font-bold uppercase tracking-wider"
                >
                  <span>Mensalidade</span>
                  {renderSortIndicator("monthlyAmount")}
                </button>
              </div>
            </th>

            <th className="py-3.5 px-4 font-bold select-none text-right w-px whitespace-nowrap">
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => onSortChange?.("status")}
                  className="inline-flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer group/sort text-[10px] font-bold uppercase tracking-wider"
                >
                  <span>Status</span>
                  {renderSortIndicator("status")}
                </button>
              </div>
            </th>

            <th className="py-3.5 px-4 font-bold select-none text-right w-px whitespace-nowrap pr-4">
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => onSortChange?.("updatedAt")}
                  className="inline-flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer group/sort text-[10px] font-bold uppercase tracking-wider"
                >
                  <span>Atualizado</span>
                  {renderSortIndicator("updatedAt")}
                </button>
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/80">
          {groups.length === 0 ? (
            <tr>
              <td colSpan={6} className="py-12 text-center">
                <div className="flex flex-col items-center justify-center gap-2">
                  <ShieldCheck size={32} className="text-zinc-300 dark:text-zinc-600" />
                  <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    Nenhum grupo de seguro encontrado
                  </span>
                  <p className="text-[11px] text-zinc-400">
                    Ajuste os filtros de busca para visualizar os contratos.
                  </p>
                </div>
              </td>
            </tr>
          ) : (
            groups.map((group) => (
              <tr
                key={group.id}
                className="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40 transition-colors"
              >
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-3.5">
                    
                    <div className="w-10 sm:w-12 text-center shrink-0">
                      <span className="text-2xl sm:text-3xl font-heading font-black text-zinc-900/[0.15] dark:text-white/[0.20] leading-none select-none">
                        {Number(group.id) < 10 ? `0${group.id}` : group.id}
                      </span>
                    </div>

                    <div className="space-y-0.5 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white truncate">
                          {group.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-[11px] text-zinc-500 dark:text-zinc-400">
                        <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                          {group.workspaceName}
                        </span>
                        <span>•</span>
                        <span className="font-mono text-zinc-400">{group.hostId}</span>
                      </div>
                    </div>
                  </div>
                </td>

                <td className="py-3.5 px-4 text-right w-px whitespace-nowrap">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800/70 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    <HouseLine size={13} weight="bold" className="text-zinc-400" />
                    <span>{group.propertiesCount} {group.propertiesCount === 1 ? "imóvel" : "imóveis"}</span>
                  </span>
                </td>

                <td className="py-3.5 px-4 text-right w-px whitespace-nowrap">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800/70 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                    <Receipt size={13} weight="bold" className="text-zinc-400" />
                    <span>{group.invoicesCount} {group.invoicesCount === 1 ? "fatura" : "faturas"}</span>
                  </span>
                </td>

                <td className="py-3.5 px-4 text-right w-px whitespace-nowrap">
                  <span className="text-xs sm:text-sm font-black text-zinc-900 dark:text-white font-mono">
                    {formatCurrency(group.monthlyAmount)}
                  </span>
                  <span className="text-[10px] text-zinc-400 block font-medium">/mês</span>
                </td>

                <td className="py-3.5 px-4 text-right w-px whitespace-nowrap">
                  {getGroupStatusBadge(group.status)}
                </td>

                <td className="py-3.5 px-4 text-right w-px whitespace-nowrap pr-4 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                  <div className="flex items-center justify-end gap-1.5">
                    <CalendarBlank size={13} className="text-zinc-400" />
                    <span>{group.updatedAt}</span>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
