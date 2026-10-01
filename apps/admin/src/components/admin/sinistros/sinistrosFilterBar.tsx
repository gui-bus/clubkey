"use client"

import * as React from "react"

import {
  DatePicker,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@clubkey/ui"
import { cn } from "@clubkey/utils"
import {
  ArrowClockwise,
  CalendarBlank,
  CaretDown,
  Check,
  HouseLine,
  ShieldCheck,
  Tag,
  X,
} from "@phosphor-icons/react"

import {
  MOCK_CLAIM_STATUS_OPTIONS,
  MOCK_CLAIM_TYPE_OPTIONS,
} from "@/src/data/mocks/sinistros.data"

export interface SinistrosFilterBarProps {
  searchQuery: string
  onSearchQueryChange: (q: string) => void
  status: string
  onStatusChange: (status: string) => void
  claimType: string
  onClaimTypeChange: (type: string) => void
  dateFrom?: string
  onDateFromChange: (d: string) => void
  dateTo?: string
  onDateToChange: (d: string) => void
  onReset: () => void
  onRefresh?: () => void
}

function parseStringToDate(str?: string): Date | undefined {
  if (!str) return undefined
  if (/^\d{4}-\d{2}-\d{2}$/.test(str)) {
    const [year, month, day] = str.split("-").map(Number)
    return new Date(year, month - 1, day)
  }
  return undefined
}

function formatDateToString(d?: Date): string {
  if (!d) return ""
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

export function SinistrosFilterBar({
  searchQuery,
  onSearchQueryChange,
  status,
  onStatusChange,
  claimType,
  onClaimTypeChange,
  dateFrom,
  onDateFromChange,
  dateTo,
  onDateToChange,
  onReset,
  onRefresh,
}: SinistrosFilterBarProps): React.JSX.Element {
  const [statusOpenDesktop, setStatusOpenDesktop] = React.useState(false)
  const [typeOpenDesktop, setTypeOpenDesktop] = React.useState(false)
  const [datesOpenDesktop, setDatesOpenDesktop] = React.useState(false)

  const [statusOpenMobile, setStatusOpenMobile] = React.useState(false)
  const [typeOpenMobile, setTypeOpenMobile] = React.useState(false)
  const [datesOpenMobile, setDatesOpenMobile] = React.useState(false)

  const hasActiveFilters =
    Boolean(searchQuery) ||
    status !== "ALL" ||
    claimType !== "ALL" ||
    Boolean(dateFrom) ||
    Boolean(dateTo)

  const formatDisplayDate = (d?: string) => {
    if (!d) return ""
    if (/^\d{4}-\d{2}-\d{2}$/.test(d)) {
      const [year, month, day] = d.split("-")
      return `${day}/${month}/${year.slice(2)}`
    }
    return d
  }

  const dateLabel =
    dateFrom || dateTo
      ? `${formatDisplayDate(dateFrom) || "Início"} a ${formatDisplayDate(dateTo) || "Hoje"}`
      : "Qualquer data"

  const statusLabel =
    status !== "ALL"
      ? MOCK_CLAIM_STATUS_OPTIONS.find((o) => o.value === status)?.label || status
      : "Status do Sinistro"

  const typeLabel =
    claimType !== "ALL"
      ? MOCK_CLAIM_TYPE_OPTIONS.find((o) => o.value === claimType)?.label || claimType
      : "Tipo de Sinistro"

  const renderStatusList = (closeFn: () => void) => (
    <div className="space-y-1">
      <div className="px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-100 dark:border-zinc-800 mb-1">
        Status do Sinistro
      </div>
      {MOCK_CLAIM_STATUS_OPTIONS.map((opt) => {
        const isSelected = status === opt.value
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => {
              onStatusChange(opt.value)
              closeFn()
            }}
            className={cn(
              "w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer text-left",
              isSelected
                ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold"
                : "hover:bg-zinc-50 dark:hover:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300"
            )}
          >
            <span>{opt.label}</span>
            {isSelected && (
              <Check size={13} weight="bold" className="text-zinc-900 dark:text-white" />
            )}
          </button>
        )
      })}
    </div>
  )

  const renderTypeList = (closeFn: () => void) => (
    <div className="space-y-1">
      <div className="px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-100 dark:border-zinc-800 mb-1">
        Tipo de Sinistro
      </div>
      {MOCK_CLAIM_TYPE_OPTIONS.map((opt) => {
        const isSelected = claimType === opt.value
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => {
              onClaimTypeChange(opt.value)
              closeFn()
            }}
            className={cn(
              "w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer text-left",
              isSelected
                ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold"
                : "hover:bg-zinc-50 dark:hover:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300"
            )}
          >
            <span>{opt.label}</span>
            {isSelected && (
              <Check size={13} weight="bold" className="text-zinc-900 dark:text-white" />
            )}
          </button>
        )
      })}
    </div>
  )

  const renderDatesForm = () => (
    <div className="space-y-3 text-left">
      <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-2">
        <span className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
          Data do Ocorrido
        </span>
        {(dateFrom || dateTo) && (
          <button
            type="button"
            onClick={() => {
              onDateFromChange("")
              onDateToChange("")
            }}
            className="text-[11px] text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white font-bold hover:underline cursor-pointer"
          >
            Limpar
          </button>
        )}
      </div>

      <div className="space-y-2.5">
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
            A partir de
          </label>
          <DatePicker
            mode="single"
            locale="pt-BR"
            placeholder="Data inicial"
            value={parseStringToDate(dateFrom)}
            onChange={(d) => onDateFromChange(formatDateToString(d))}
            isClearable
            variant="flat"
            className="w-full max-w-full"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
            Até
          </label>
          <DatePicker
            mode="single"
            locale="pt-BR"
            placeholder="Data final"
            value={parseStringToDate(dateTo)}
            onChange={(d) => onDateToChange(formatDateToString(d))}
            isClearable
            variant="flat"
            className="w-full max-w-full"
          />
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-3 w-full">
      <div className="relative z-30 w-full bg-white dark:bg-[#141416] rounded-2xl xl:rounded-full border border-zinc-200/80 dark:border-zinc-800 p-3 sm:p-3.5 xl:p-2 shadow-2xs">
        
        <div className="block xl:hidden space-y-2.5 text-left">
          <div className="flex items-center gap-2 p-2 rounded-xl bg-zinc-100/90 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/80">
            <div className="size-7 rounded-lg bg-zinc-200/60 dark:bg-zinc-700/60 text-zinc-600 dark:text-zinc-300 flex items-center justify-center shrink-0">
              <HouseLine size={16} weight="bold" />
            </div>
            <div className="flex-1 flex flex-col min-w-0">
              <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Imóvel / Segurado
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchQueryChange(e.target.value)}
                placeholder="Buscar por imóvel, segurado, código..."
                className="w-full bg-transparent text-xs font-semibold text-zinc-900 dark:text-white placeholder:text-zinc-400 placeholder:font-normal focus:outline-none truncate"
              />
            </div>
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchQueryChange("")}
                className="text-zinc-400 hover:text-zinc-700 dark:hover:text-white p-1 cursor-pointer shrink-0"
              >
                <X size={14} weight="bold" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div>
              <Popover open={statusOpenMobile} onOpenChange={setStatusOpenMobile}>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className="w-full flex items-center justify-between p-2.5 rounded-xl bg-zinc-100/90 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/80 text-left cursor-pointer min-w-0"
                  >
                    <div className="flex flex-col min-w-0">
                      <span className="text-[9px] font-bold uppercase text-zinc-400">Status</span>
                      <span className="text-xs font-semibold text-zinc-900 dark:text-white truncate">
                        {statusLabel}
                      </span>
                    </div>
                    <CaretDown size={14} className="text-zinc-400 shrink-0 ml-1" />
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  align="start"
                  className="w-64 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] p-1.5 z-50 shadow-2xl"
                >
                  {renderStatusList(() => setStatusOpenMobile(false))}
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Popover open={typeOpenMobile} onOpenChange={setTypeOpenMobile}>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className="w-full flex items-center justify-between p-2.5 rounded-xl bg-zinc-100/90 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/80 text-left cursor-pointer min-w-0"
                  >
                    <div className="flex flex-col min-w-0">
                      <span className="text-[9px] font-bold uppercase text-zinc-400">Tipo</span>
                      <span className="text-xs font-semibold text-zinc-900 dark:text-white truncate">
                        {typeLabel}
                      </span>
                    </div>
                    <CaretDown size={14} className="text-zinc-400 shrink-0 ml-1" />
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  align="start"
                  className="w-64 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] p-1.5 z-50 shadow-2xl"
                >
                  {renderTypeList(() => setTypeOpenMobile(false))}
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Popover open={datesOpenMobile} onOpenChange={setDatesOpenMobile}>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className="w-full flex items-center justify-between p-2.5 rounded-xl bg-zinc-100/90 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/80 text-left cursor-pointer min-w-0"
                  >
                    <div className="flex flex-col min-w-0">
                      <span className="text-[9px] font-bold uppercase text-zinc-400">Data</span>
                      <span className="text-xs font-semibold text-zinc-900 dark:text-white truncate">
                        {dateLabel}
                      </span>
                    </div>
                    <CaretDown size={14} className="text-zinc-400 shrink-0 ml-1" />
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  align="end"
                  className="w-72 sm:w-80 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] p-4 z-50 shadow-2xl"
                >
                  {renderDatesForm()}
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

        
        <div className="hidden xl:flex items-center justify-between w-full gap-1.5 2xl:gap-2">
          
          <div className="shrink min-w-0">
            <Popover open={statusOpenDesktop} onOpenChange={setStatusOpenDesktop}>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800/70 transition-colors text-left cursor-pointer min-w-0"
                >
                  <div className="size-8 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 flex items-center justify-center shrink-0">
                    <ShieldCheck size={16} weight="bold" />
                  </div>
                  <div className="flex flex-col min-w-0 pr-1">
                    <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                      Status
                    </span>
                    <span className="text-xs font-bold text-zinc-900 dark:text-white truncate max-w-[110px] 2xl:max-w-[140px]">
                      {statusLabel}
                    </span>
                  </div>
                  <CaretDown
                    size={12}
                    className={cn(
                      "text-zinc-400 shrink-0 transition-transform duration-200",
                      statusOpenDesktop && "rotate-180"
                    )}
                    weight="bold"
                  />
                </button>
              </PopoverTrigger>
              <PopoverContent
                align="start"
                sideOffset={8}
                className="w-64 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-[#141416]/95 backdrop-blur-xl shadow-2xl p-1.5 z-50"
              >
                {renderStatusList(() => setStatusOpenDesktop(false))}
              </PopoverContent>
            </Popover>
          </div>

          <div className="w-px h-7 bg-zinc-200 dark:bg-zinc-800 shrink-0" />

          
          <div className="shrink min-w-0">
            <Popover open={typeOpenDesktop} onOpenChange={setTypeOpenDesktop}>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800/70 transition-colors text-left cursor-pointer min-w-0"
                >
                  <div className="size-8 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 flex items-center justify-center shrink-0">
                    <Tag size={16} weight="bold" />
                  </div>
                  <div className="flex flex-col min-w-0 pr-1">
                    <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                      Tipo
                    </span>
                    <span className="text-xs font-bold text-zinc-900 dark:text-white truncate max-w-[110px] 2xl:max-w-[140px]">
                      {typeLabel}
                    </span>
                  </div>
                  <CaretDown
                    size={12}
                    className={cn(
                      "text-zinc-400 shrink-0 transition-transform duration-200",
                      typeOpenDesktop && "rotate-180"
                    )}
                    weight="bold"
                  />
                </button>
              </PopoverTrigger>
              <PopoverContent
                align="start"
                sideOffset={8}
                className="w-64 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-[#141416]/95 backdrop-blur-xl shadow-2xl p-1.5 z-50"
              >
                {renderTypeList(() => setTypeOpenDesktop(false))}
              </PopoverContent>
            </Popover>
          </div>

          <div className="w-px h-7 bg-zinc-200 dark:bg-zinc-800 shrink-0" />

          
          <div className="shrink min-w-0">
            <Popover open={datesOpenDesktop} onOpenChange={setDatesOpenDesktop}>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800/70 transition-colors text-left cursor-pointer min-w-0"
                >
                  <div className="size-8 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 flex items-center justify-center shrink-0">
                    <CalendarBlank size={16} weight="bold" />
                  </div>
                  <div className="flex flex-col min-w-0 pr-1">
                    <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                      Ocorrência
                    </span>
                    <span className="text-xs font-bold text-zinc-900 dark:text-white truncate max-w-[120px] 2xl:max-w-[150px]">
                      {dateLabel}
                    </span>
                  </div>
                  <CaretDown
                    size={12}
                    className={cn(
                      "text-zinc-400 shrink-0 transition-transform duration-200",
                      datesOpenDesktop && "rotate-180"
                    )}
                    weight="bold"
                  />
                </button>
              </PopoverTrigger>
              <PopoverContent
                align="center"
                sideOffset={8}
                className="w-72 sm:w-80 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-[#141416]/95 backdrop-blur-xl shadow-2xl p-4 z-50"
              >
                {renderDatesForm()}
              </PopoverContent>
            </Popover>
          </div>

          <div className="w-px h-7 bg-zinc-200 dark:bg-zinc-800 shrink-0" />

          
          <div className="flex-1 flex items-center gap-2 px-2.5 min-w-0">
            <div className="flex-1 flex flex-col min-w-0">
              <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                Imóvel / Segurado / Código
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchQueryChange(e.target.value)}
                placeholder="Buscar por imóvel, segurado, código ou reserva..."
                className="w-full bg-transparent border-none outline-none text-xs 2xl:text-sm font-semibold text-zinc-900 dark:text-white placeholder:text-zinc-400 placeholder:font-normal focus:outline-none py-0.5 truncate"
              />
            </div>
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchQueryChange("")}
                className="size-6 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-700 dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
                title="Limpar busca"
              >
                <X size={13} weight="bold" />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={onRefresh}
            className="size-10 2xl:size-11 rounded-full bg-brand-primary hover:bg-brand-primary/90 text-white flex items-center justify-center shadow-md transition-all hover:scale-105 active:scale-95 shrink-0 ml-0.5 cursor-pointer"
            title="Atualizar sinistros"
          >
            <ArrowClockwise size={18} weight="bold" />
          </button>
        </div>
      </div>

      
      {hasActiveFilters && (
        <div className="flex items-center justify-center gap-2 flex-wrap pt-2 text-center">
          {searchQuery && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white dark:bg-[#141416] text-zinc-800 dark:text-zinc-200 border border-zinc-200/90 dark:border-zinc-800 shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Busca:
              </span>
              <span className="font-semibold text-zinc-900 dark:text-white">&ldquo;{searchQuery}&rdquo;</span>
              <button
                type="button"
                onClick={() => onSearchQueryChange("")}
                className="text-zinc-400 hover:text-zinc-700 dark:hover:text-white transition-colors ml-0.5 cursor-pointer flex items-center"
              >
                <X size={12} weight="bold" />
              </button>
            </span>
          )}

          {status !== "ALL" && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white dark:bg-[#141416] text-zinc-800 dark:text-zinc-200 border border-zinc-200/90 dark:border-zinc-800 shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Status:
              </span>
              <span className="font-semibold text-zinc-900 dark:text-white">{statusLabel}</span>
              <button
                type="button"
                onClick={() => onStatusChange("ALL")}
                className="text-zinc-400 hover:text-zinc-700 dark:hover:text-white transition-colors ml-0.5 cursor-pointer flex items-center"
              >
                <X size={12} weight="bold" />
              </button>
            </span>
          )}

          {claimType !== "ALL" && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white dark:bg-[#141416] text-zinc-800 dark:text-zinc-200 border border-zinc-200/90 dark:border-zinc-800 shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Tipo:
              </span>
              <span className="font-semibold text-zinc-900 dark:text-white">{typeLabel}</span>
              <button
                type="button"
                onClick={() => onClaimTypeChange("ALL")}
                className="text-zinc-400 hover:text-zinc-700 dark:hover:text-white transition-colors ml-0.5 cursor-pointer flex items-center"
              >
                <X size={12} weight="bold" />
              </button>
            </span>
          )}

          {(dateFrom || dateTo) && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white dark:bg-[#141416] text-zinc-800 dark:text-zinc-200 border border-zinc-200/90 dark:border-zinc-800 shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Ocorrência:
              </span>
              <span className="font-semibold text-zinc-900 dark:text-white">{dateLabel}</span>
              <button
                type="button"
                onClick={() => {
                  onDateFromChange("")
                  onDateToChange("")
                }}
                className="text-zinc-400 hover:text-zinc-700 dark:hover:text-white transition-colors ml-0.5 cursor-pointer flex items-center"
              >
                <X size={12} weight="bold" />
              </button>
            </span>
          )}

          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white dark:bg-[#141416] hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-200 border border-zinc-200/90 dark:border-zinc-800 shadow-sm transition-colors cursor-pointer"
          >
            <ArrowClockwise size={12} weight="bold" />
            <span>Limpar Tudo</span>
          </button>
        </div>
      )}
    </div>
  )
}
