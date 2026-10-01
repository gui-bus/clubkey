"use client"

import * as React from "react"

import type { InsuranceInvoice } from "@clubkey/types"
import { TableStatusBadge } from "@clubkey/ui"
import { formatCurrency } from "@clubkey/utils"
import {
  ArrowsClockwise,
  CalendarBlank,
  CaretDown,
  CaretUp,
  CaretUpDown,
  CheckCircle,
  Clock,
  ClockCountdown,
  Receipt,
  XCircle,
} from "@phosphor-icons/react"

export interface ProtecaoKeyInvoicesTableProps {
  invoices: InsuranceInvoice[]
  sortBy?: string | null
  sortOrder?: "asc" | "desc" | null
  onSortChange?: (field: string) => void
}

export function ProtecaoKeyInvoicesTable({
  invoices,
  sortBy,
  sortOrder,
  onSortChange,
}: ProtecaoKeyInvoicesTableProps): React.JSX.Element {
  const getInvoiceStatusBadge = (status: InsuranceInvoice["status"]) => {
    switch (status) {
      case "PAGA":
        return (
          <TableStatusBadge
            variant="success"
            label="Paga"
            icon={<CheckCircle size={36} weight="fill" />}
          />
        )
      case "PENDENTE":
        return (
          <TableStatusBadge
            variant="warning"
            label="Pendente"
            icon={<Clock size={36} weight="fill" />}
          />
        )
      case "CANCELADA":
        return (
          <TableStatusBadge
            variant="danger"
            label="Cancelada"
            icon={<XCircle size={36} weight="fill" />}
          />
        )
      case "ATRASADA":
        return (
          <TableStatusBadge
            variant="danger"
            label="Atrasada"
            icon={<ClockCountdown size={36} weight="bold" />}
          />
        )
      case "EM_ANALISE":
        return (
          <TableStatusBadge
            variant="info"
            label="Em Análise"
            icon={<ArrowsClockwise size={36} weight="bold" />}
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
                onClick={() => onSortChange?.("id")}
                className="inline-flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer group/sort text-[10px] font-bold uppercase tracking-wider"
              >
                <span>Fatura & Grupo</span>
                {renderSortIndicator("id")}
              </button>
            </th>

            <th className="py-3.5 px-4 font-bold select-none text-right w-px whitespace-nowrap">
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => onSortChange?.("dueDate")}
                  className="inline-flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer group/sort text-[10px] font-bold uppercase tracking-wider"
                >
                  <span>Vencimento</span>
                  {renderSortIndicator("dueDate")}
                </button>
              </div>
            </th>

            <th className="py-3.5 px-4 font-bold select-none text-right w-px whitespace-nowrap">
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => onSortChange?.("amount")}
                  className="inline-flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer group/sort text-[10px] font-bold uppercase tracking-wider"
                >
                  <span>Valor</span>
                  {renderSortIndicator("amount")}
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
                  onClick={() => onSortChange?.("ageHoursText")}
                  className="inline-flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer group/sort text-[10px] font-bold uppercase tracking-wider"
                >
                  <span>Idade / SLA</span>
                  {renderSortIndicator("ageHoursText")}
                </button>
              </div>
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/80">
          {invoices.length === 0 ? (
            <tr>
              <td colSpan={5} className="py-12 text-center">
                <div className="flex flex-col items-center justify-center gap-2">
                  <Receipt size={32} className="text-zinc-300 dark:text-zinc-600" />
                  <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    Nenhuma fatura encontrada
                  </span>
                  <p className="text-[11px] text-zinc-400">
                    Tente ajustar os filtros de busca ou status da fatura.
                  </p>
                </div>
              </td>
            </tr>
          ) : (
            invoices.map((inv) => (
              <tr
                key={inv.id}
                className="hover:bg-zinc-50/80 dark:hover:bg-zinc-800/40 transition-colors"
              >
                <td className="py-3.5 px-4">
                  <div className="flex items-center gap-3.5">
                    
                    <div className="w-10 sm:w-12 text-center shrink-0">
                      <span className="text-2xl sm:text-3xl font-heading font-black text-zinc-900/[0.15] dark:text-white/[0.20] leading-none select-none">
                        {Number(inv.id) < 10 ? `0${inv.id}` : inv.id}
                      </span>
                    </div>

                    <div className="space-y-0.5 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white truncate">
                          Fatura #{inv.id}
                        </span>
                        <span className="text-xs text-zinc-400">•</span>
                        <span className="text-xs font-semibold text-zinc-600 dark:text-zinc-300 truncate">
                          {inv.groupName} (Grupo #{inv.groupId})
                        </span>
                      </div>
                      <div className="text-[11px] text-zinc-400">
                        Workspace: <span className="text-zinc-600 dark:text-zinc-300 font-semibold">{inv.workspaceName}</span>
                      </div>
                    </div>
                  </div>
                </td>

                <td className="py-3.5 px-4 text-right w-px whitespace-nowrap text-xs font-medium text-zinc-600 dark:text-zinc-300">
                  <div className="inline-flex items-center gap-1.5">
                    <CalendarBlank size={13} className="text-zinc-400" />
                    <span>{inv.dueDate}</span>
                  </div>
                </td>

                <td className="py-3.5 px-4 text-right w-px whitespace-nowrap">
                  <span className="text-xs sm:text-sm font-black text-zinc-900 dark:text-white font-mono">
                    {formatCurrency(inv.amount)}
                  </span>
                </td>

                <td className="py-3.5 px-4 text-right w-px whitespace-nowrap">
                  {getInvoiceStatusBadge(inv.status)}
                </td>

                <td className="py-3.5 px-4 text-right w-px whitespace-nowrap pr-4">
                  <span className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                    {inv.ageHoursText || "—"}
                  </span>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}
