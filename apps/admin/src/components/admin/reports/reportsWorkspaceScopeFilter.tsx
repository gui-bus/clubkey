"use client"

import * as React from "react"

import {
  DatePicker,
  Select,
  type SelectOption,
} from "@clubkey/ui"
import {
  ArrowClockwise,
  Buildings,
  CalendarBlank,
  CheckCircle,
  Funnel,
  HouseLine,
} from "@phosphor-icons/react"

import {
  MOCK_REPORT_PROPERTIES,
  MOCK_REPORT_WORKSPACES,
} from "@/src/data/mocks/reports.data"

const STATUS_SCOPE_OPTIONS: SelectOption[] = [
  { value: "ALL", label: "Todos os status (Sinistros / Crédito)" },
  { value: "PENDING", label: "PENDING - Em análise" },
  { value: "APPROVED", label: "APPROVED - Aprovado" },
  { value: "SETTLED", label: "SETTLED - Liquidado" },
  { value: "REJECTED", label: "REJECTED - Recusado" },
]

const RESERVATION_TYPE_OPTIONS: SelectOption[] = [
  { value: "ALL", label: "Todos os tipos de reserva" },
  { value: "BOOKED", label: "Booked (Confirmada / Ativa)" },
  { value: "COMPLETED", label: "Completed (Estadia Finalizada)" },
  { value: "CANCELLED", label: "Cancelled (Cancelada)" },
]

export interface ReportsWorkspaceScopeFilterProps {
  workspace: string
  onWorkspaceChange: (ws: string) => void
  property: string
  onPropertyChange: (prop: string) => void
  dateFrom?: Date
  onDateFromChange: (d?: Date) => void
  dateTo?: Date
  onDateToChange: (d?: Date) => void
  status: string
  onStatusChange: (status: string) => void
  reservationType: string
  onReservationTypeChange: (type: string) => void
  onResetScope: () => void
}

export function ReportsWorkspaceScopeFilter({
  workspace,
  onWorkspaceChange,
  property,
  onPropertyChange,
  dateFrom,
  onDateFromChange,
  dateTo,
  onDateToChange,
  status,
  onStatusChange,
  reservationType,
  onReservationTypeChange,
  onResetScope,
}: ReportsWorkspaceScopeFilterProps): React.JSX.Element {
  const hasActiveScope =
    workspace !== "ALL" ||
    property !== "ALL" ||
    Boolean(dateFrom) ||
    Boolean(dateTo) ||
    status !== "ALL" ||
    reservationType !== "ALL"

  return (
    <div className="w-full rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#141416] p-4.5 sm:p-6 space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-zinc-100 dark:border-zinc-800 pb-3">
        <div className="flex items-center gap-2">
          <div className="size-8 rounded-lg bg-orange-500/10 text-brand-primary flex items-center justify-center shrink-0">
            <Funnel size={16} weight="bold" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
              Parâmetros & Escopo do Workspace
            </h4>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">
              Filtros opcionais que serão aplicados aos relatórios do Bloco B abaixo.
            </p>
          </div>
        </div>

        {hasActiveScope && (
          <button
            type="button"
            onClick={onResetScope}
            className="text-xs font-bold text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
          >
            <ArrowClockwise size={12} weight="bold" />
            <span>Restaurar Parâmetros</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 flex items-center gap-1.5">
            <Buildings size={12} weight="bold" />
            <span>Workspace (Opcional)</span>
          </label>
          <Select
            options={MOCK_REPORT_WORKSPACES}
            value={workspace}
            onValueChange={onWorkspaceChange}
            variant="flat"
            radius="xl"
            className="h-10 min-h-10 text-xs sm:text-sm font-medium"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 flex items-center gap-1.5">
            <HouseLine size={12} weight="bold" />
            <span>Imóvel (Opcional)</span>
          </label>
          <Select
            options={MOCK_REPORT_PROPERTIES}
            value={property}
            onValueChange={onPropertyChange}
            variant="flat"
            radius="xl"
            className="h-10 min-h-10 text-xs sm:text-sm font-medium"
          />
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 flex items-center gap-1.5">
            <CalendarBlank size={12} weight="bold" />
            <span>Período Início & Fim</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            <DatePicker
              mode="single"
              locale="pt-BR"
              placeholder="Data início"
              value={dateFrom}
              onChange={onDateFromChange}
              isClearable
              variant="flat"
              className="w-full"
            />
            <DatePicker
              mode="single"
              locale="pt-BR"
              placeholder="Data fim"
              value={dateTo}
              onChange={onDateToChange}
              isClearable
              variant="flat"
              align="end"
              className="w-full"
            />
          </div>
        </div>

        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 flex items-center gap-1.5">
            <CheckCircle size={12} weight="bold" />
            <span>Status (Sinistros / Crédito)</span>
          </label>
          <Select
            options={STATUS_SCOPE_OPTIONS}
            value={status}
            onValueChange={onStatusChange}
            variant="flat"
            radius="xl"
            className="h-10 min-h-10 text-xs sm:text-sm font-medium"
          />
        </div>

        <div className="space-y-1 sm:col-span-2 lg:col-span-2">
          <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 flex items-center gap-1.5">
            <CalendarBlank size={12} weight="bold" />
            <span>Tipo de Reserva</span>
          </label>
          <Select
            options={RESERVATION_TYPE_OPTIONS}
            value={reservationType}
            onValueChange={onReservationTypeChange}
            variant="flat"
            radius="xl"
            className="h-10 min-h-10 text-xs sm:text-sm font-medium"
          />
        </div>
      </div>
    </div>
  )
}
