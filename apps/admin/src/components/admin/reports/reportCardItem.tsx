"use client"

import * as React from "react"

import type { AdminReportItem } from "@clubkey/types"
import {
  Checkbox,
  CtaButton,
  DatePicker,
} from "@clubkey/ui"
import { cn } from "@clubkey/utils"
import {
  ArrowsClockwise,
  Bank,
  Briefcase,
  Buildings,
  CalendarBlank,
  CalendarCheck,
  CaretDown,
  ChartLineUp,
  Check,
  Coins,
  CreditCard,
  CurrencyCircleDollar,
  Database,
  FileText,
  FileXls,
  HouseLine,
  Key,
  Receipt,
  ShieldWarning,
  SlidersHorizontal,
  Spinner,
  UsersThree,
} from "@phosphor-icons/react"

const ICON_MAP: Record<string, React.ElementType> = {
  Buildings,
  Key,
  CalendarCheck,
  Coins,
  UsersThree,
  ArrowsClockwise,
  ChartLineUp,
  CreditCard,
  Briefcase,
  HouseLine,
  ShieldWarning,
  CurrencyCircleDollar,
  FileText,
  Bank,
  Receipt,
}

export interface ReportCardItemProps {
  report: AdminReportItem
  onGenerate: (
    report: AdminReportItem,
    options?: {
      dateFrom?: string
      dateTo?: string
      selectedColumns?: string[]
    }
  ) => Promise<void> | void
  selectedWorkspace?: string
  selectedProperty?: string
}

export function ReportCardItem({
  report,
  onGenerate,
  selectedWorkspace = "ALL",
  selectedProperty = "ALL",
}: ReportCardItemProps): React.JSX.Element {
  const [isGenerating, setIsGenerating] = React.useState(false)
  const [isCompleted, setIsCompleted] = React.useState(false)
  const [isAdvancedOpen, setIsAdvancedOpen] = React.useState(false)

  const [dateFrom, setDateFrom] = React.useState<Date | undefined>(undefined)
  const [dateTo, setDateTo] = React.useState<Date | undefined>(undefined)
  const [isFromPickerOpen, setIsFromPickerOpen] = React.useState(false)
  const [isToPickerOpen, setIsToPickerOpen] = React.useState(false)

  const isAnyPickerOpen = isFromPickerOpen || isToPickerOpen

  const [selectedColumns, setSelectedColumns] = React.useState<string[]>(
    report.columns?.filter((c) => c.defaultSelected).map((c) => c.id) || []
  )

  const IconComponent = ICON_MAP[report.iconName] || FileText

  const handleSelectAllColumns = () => {
    if (report.columns) {
      setSelectedColumns(report.columns.map((c) => c.id))
    }
  }

  const handleClearColumns = () => {
    setSelectedColumns([])
  }

  const handleToggleColumn = (id: string) => {
    setSelectedColumns((prev) =>
      prev.includes(id) ? prev.filter((col) => col !== id) : [...prev, id]
    )
  }

  const handleGenerateClick = async () => {
    setIsGenerating(true)
    setIsCompleted(false)
    try {
      await onGenerate(report, {
        dateFrom: dateFrom ? dateFrom.toISOString().split("T")[0] : undefined,
        dateTo: dateTo ? dateTo.toISOString().split("T")[0] : undefined,
        selectedColumns: report.supportsColumns ? selectedColumns : undefined,
      })
      setIsCompleted(true)
      setTimeout(() => setIsCompleted(false), 3000)
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div
      className={cn(
        "relative rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#141416] p-5 sm:p-6 flex flex-col justify-between gap-5 transition-all duration-300 ease-in-out",
        isAnyPickerOpen ? "z-50" : "focus-within:z-30 hover:z-20"
      )}
    >
      
      <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none select-none">
        <div className="absolute -right-8 -bottom-8 text-zinc-900/[0.04] dark:text-white/[0.04] -rotate-12">
          <IconComponent size={260} weight="bold" />
        </div>
      </div>

      
      <div className="relative z-20 space-y-4">
        
        <div className="space-y-1.5">
          <h3
            className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white leading-snug tracking-tight line-clamp-1"
            title={report.title}
          >
            {report.title}
          </h3>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-normal leading-relaxed h-[3.75rem] sm:h-[4.25rem] line-clamp-3 overflow-hidden">
            {report.description}
          </p>
        </div>

        
        {report.source && (
          <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 dark:text-zinc-500 font-medium">
            <Database size={13} className="shrink-0 text-zinc-400" />
            <span className="font-bold uppercase tracking-wider text-zinc-400">
              Fonte:
            </span>
            <span className="text-zinc-600 dark:text-zinc-300 font-semibold truncate">
              {report.source}
            </span>
          </div>
        )}

        
        <div className="space-y-2">
          <div className="flex items-center gap-1.5">
            <CalendarBlank size={13} weight="bold" className="text-zinc-400" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Período do Relatório
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <DatePicker
              mode="single"
              locale="pt-BR"
              placeholder="Data inicial (De)"
              value={dateFrom}
              onChange={setDateFrom}
              onOpenChange={setIsFromPickerOpen}
              isClearable
              variant="flat"
              className="w-full"
            />
            <DatePicker
              mode="single"
              locale="pt-BR"
              placeholder="Data final (Até)"
              value={dateTo}
              onChange={setDateTo}
              onOpenChange={setIsToPickerOpen}
              isClearable
              variant="flat"
              align="end"
              className="w-full"
            />
          </div>

          <p className="text-[10px] text-zinc-400 dark:text-zinc-500 font-medium italic">
            Sem datas selecionadas = exportação de todo o histórico disponível.
          </p>
        </div>

        
        <div>
          <button
            type="button"
            onClick={() => setIsAdvancedOpen((prev) => !prev)}
            className="h-10 w-full flex items-center justify-between px-3 py-2 rounded-xl bg-zinc-100 hover:bg-zinc-200/70 dark:bg-zinc-800/60 dark:hover:bg-zinc-800 text-xs font-semibold text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer select-none"
          >
            <div className="flex items-center gap-2">
              <SlidersHorizontal
                size={14}
                weight="bold"
                className="text-brand-primary shrink-0"
              />
              <span>Filtros avançados</span>
            </div>
            <CaretDown
              size={14}
              weight="bold"
              className={cn(
                "text-zinc-400 transition-transform duration-300 ease-in-out",
                isAdvancedOpen && "rotate-180"
              )}
            />
          </button>

          <div
            className={cn(
              "grid transition-[grid-template-rows,opacity] duration-300 ease-in-out",
              isAdvancedOpen
                ? "grid-rows-[1fr] opacity-100 mt-2.5"
                : "grid-rows-[0fr] opacity-0 mt-0 pointer-events-none"
            )}
          >
            <div className="overflow-hidden space-y-2.5">
              {report.supportsColumns && report.columns ? (
                <div className="space-y-2.5 p-3 rounded-xl bg-transparent border border-zinc-200/80 dark:border-zinc-800">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                      Colunas
                    </span>
                    <div className="flex items-center gap-2 text-[11px]">
                      <button
                        type="button"
                        onClick={handleSelectAllColumns}
                        className="font-bold text-brand-primary hover:underline cursor-pointer"
                      >
                        Selecionar todas
                      </button>
                      <span className="text-zinc-300 dark:text-zinc-700">•</span>
                      <button
                        type="button"
                        onClick={handleClearColumns}
                        className="font-medium text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
                      >
                        Limpar
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 p-2 rounded-lg bg-transparent border border-zinc-200/60 dark:border-zinc-800 max-h-36 overflow-y-auto">
                    {report.columns.map((col) => {
                      const isChecked = selectedColumns.includes(col.id)
                      return (
                        <label
                          key={col.id}
                          className="flex items-center gap-2 text-xs font-medium text-zinc-700 dark:text-zinc-300 cursor-pointer select-none hover:text-zinc-900 dark:hover:text-white"
                        >
                          <Checkbox
                            checked={isChecked}
                            onCheckedChange={() => handleToggleColumn(col.id)}
                          />
                          <span className="truncate">{col.label}</span>
                        </label>
                      )
                    })}
                  </div>
                </div>
              ) : (
                <div className="relative overflow-hidden rounded-xl border-2 border-dashed border-zinc-200 dark:border-zinc-800 bg-transparent p-4 text-center select-none flex flex-col items-center justify-center min-h-[95px]">
                  <SlidersHorizontal
                    className="absolute -right-3 -bottom-3 size-20 text-zinc-900/[0.04] dark:text-white/[0.04] pointer-events-none rotate-12 select-none"
                    weight="bold"
                  />
                  <span className="relative z-10 text-xs font-bold text-zinc-700 dark:text-zinc-300">
                    Filtros avançados serão exibidos aqui
                  </span>
                  <p className="relative z-10 text-[10px] text-zinc-400 dark:text-zinc-500 mt-0.5">
                    Parâmetros adicionais e agrupamentos específicos deste relatório.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        </div>

      
      <div className="relative z-10 pt-1">
        <CtaButton
          type="button"
          variant="primary"
          size="md"
          isFullWidth
          onClick={handleGenerateClick}
          disabled={isGenerating}
          className="rounded-xl flex items-center justify-center gap-2 text-xs uppercase font-bold tracking-wider cursor-pointer transition-all hover:brightness-105 active:scale-[0.99]"
        >
          {isGenerating ? (
            <>
              <Spinner className="size-4 animate-spin text-white" />
              <span>GERANDO RELATÓRIO...</span>
            </>
          ) : isCompleted ? (
            <>
              <Check size={16} weight="bold" />
              <span>DOWNLOAD CONCLUÍDO!</span>
            </>
          ) : (
            <>
              <FileXls size={16} weight="bold" />
              <span>GERAR RELATÓRIO</span>
            </>
          )}
        </CtaButton>
      </div>
    </div>
  )
}
