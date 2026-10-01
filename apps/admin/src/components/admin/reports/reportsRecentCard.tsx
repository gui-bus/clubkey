"use client"

import * as React from "react"

import type { ReportExecutionLog } from "@clubkey/types"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Select,
  type SelectOption,
  TableActionButton,
  TableStatusBadge,
  TableTitle,
} from "@clubkey/ui"
import { cn } from "@clubkey/utils"
import {
  ArrowsClockwise,
  CaretDown,
  CaretUp,
  CaretUpDown,
  CheckCircle,
  DownloadSimple,
  XCircle,
} from "@phosphor-icons/react"

const PAGE_SIZE_OPTIONS: SelectOption[] = [
  { value: "5", label: "5" },
  { value: "10", label: "10" },
  { value: "20", label: "20" },
  { value: "50", label: "50" },
]

export interface ReportsRecentCardProps {
  logs: ReportExecutionLog[]
  onDownload: (log: ReportExecutionLog) => void
  className?: string
}

function formatLongDateWithTimePortuguese(dateStr: string): string {
  try {
    const parts = dateStr.trim().split(" ")
    const datePart = parts[0]
    const timePart = parts[1] || ""

    const [year, month, day] = datePart.split("-").map(Number)
    if (!year || !month || !day) return dateStr

    const date = new Date(year, month - 1, day)
    const weekday = new Intl.DateTimeFormat("pt-BR", { weekday: "long" }).format(date)
    const monthName = new Intl.DateTimeFormat("pt-BR", { month: "long" }).format(date)

    const capitalizedWeekday = weekday.charAt(0).toUpperCase() + weekday.slice(1)
    const capitalizedMonth = monthName.charAt(0).toUpperCase() + monthName.slice(1)
    const paddedDay = String(day).padStart(2, "0")

    const dateFormatted = `${capitalizedWeekday}, ${paddedDay} de ${capitalizedMonth} de ${year}`

    if (timePart) {
      return `${dateFormatted} às ${timePart}`
    }

    return dateFormatted
  } catch {
    return dateStr
  }
}

export function ReportsRecentCard({
  logs,
  onDownload,
  className,
}: ReportsRecentCardProps): React.JSX.Element {
  const [pageSize, setPageSize] = React.useState(10)
  const [currentPage, setCurrentPage] = React.useState(1)
  const [sortBy, setSortBy] = React.useState<"reportTitle" | "generatedAt" | "status" | null>(null)
  const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("asc")

  const handleSort = (column: "reportTitle" | "generatedAt" | "status") => {
    if (sortBy === column) {
      if (sortOrder === "asc") {
        setSortOrder("desc")
      } else {
        setSortBy(null)
        setSortOrder("asc")
      }
    } else {
      setSortBy(column)
      setSortOrder("asc")
    }
  }

  const sortedLogs = React.useMemo(() => {
    if (!sortBy) return logs

    return [...logs].sort((a, b) => {
      let comparison = 0
      if (sortBy === "reportTitle") {
        comparison = a.reportTitle.localeCompare(b.reportTitle, "pt-BR", {
          sensitivity: "base",
        })
      } else if (sortBy === "generatedAt") {
        comparison = a.generatedAt.localeCompare(b.generatedAt)
      } else if (sortBy === "status") {
        comparison = a.status.localeCompare(b.status)
      }

      return sortOrder === "desc" ? -comparison : comparison
    })
  }, [logs, sortBy, sortOrder])

  const totalPages = Math.max(1, Math.ceil(sortedLogs.length / (pageSize || 10)))
  const safePage = Math.min(Math.max(1, currentPage || 1), totalPages)

  React.useEffect(() => {
    if (currentPage > totalPages && totalPages >= 1) {
      setCurrentPage(totalPages)
    }
  }, [currentPage, totalPages])

  const paginatedLogs = React.useMemo(() => {
    const start = (safePage - 1) * pageSize
    return sortedLogs.slice(start, start + pageSize)
  }, [sortedLogs, safePage, pageSize])

  const getExecutionStatusBadge = (status: ReportExecutionLog["status"]) => {
    switch (status) {
      case "COMPLETED":
        return (
          <TableStatusBadge
            variant="success"
            label="Concluído"
            icon={<CheckCircle size={36} weight="fill" />}
          />
        )
      case "PROCESSING":
        return (
          <TableStatusBadge
            variant="info"
            label="Processando"
            icon={<ArrowsClockwise size={36} weight="bold" />}
          />
        )
      case "FAILED":
        return (
          <TableStatusBadge
            variant="danger"
            label="Falhou"
            icon={<XCircle size={36} weight="fill" />}
          />
        )
      default:
        return null
    }
  }

  if (logs.length === 0) return <></>

  return (
    <section className={cn("space-y-4", className)}>
      <TableTitle
        title="Histórico de Exportações Recentes"
        description="Planilhas consolidadas geradas na sessão e prontas para download."
      />

      <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#141416] overflow-hidden shadow-2xs">
        <div className="w-full overflow-x-auto overflow-y-hidden [scrollbar-width:thin] [scrollbar-color:theme(colors.zinc.300)_transparent] dark:[scrollbar-color:theme(colors.zinc.700)_transparent]">
          <table className="w-full min-w-[680px] text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-800/40 text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3.5 px-4 font-bold select-none text-left min-w-[260px] whitespace-nowrap">
                  <button
                    type="button"
                    onClick={() => handleSort("reportTitle")}
                    className="inline-flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer group/sort text-[10px] font-bold uppercase tracking-wider"
                    title="Ordenar por relatório"
                  >
                    <span>Relatório</span>
                    <span className="flex items-center">
                      {sortBy === "reportTitle" ? (
                        sortOrder === "asc" ? (
                          <CaretUp
                            size={12}
                            weight="bold"
                            className="text-orange-500"
                          />
                        ) : (
                          <CaretDown
                            size={12}
                            weight="bold"
                            className="text-orange-500"
                          />
                        )
                      ) : (
                        <CaretUpDown
                          size={12}
                          weight="bold"
                          className="text-zinc-400 group-hover/sort:text-zinc-700 dark:group-hover/sort:text-zinc-300 transition-colors opacity-60"
                        />
                      )}
                    </span>
                  </button>
                </th>

                <th className="py-3.5 px-4 font-bold select-none text-right w-px whitespace-nowrap">
                  <div className="flex justify-end">
                    <button
                      type="button"
                      onClick={() => handleSort("generatedAt")}
                      className="inline-flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer group/sort text-[10px] font-bold uppercase tracking-wider"
                      title="Ordenar por data e horário"
                    >
                      <span>Data e Horário</span>
                      <span className="flex items-center">
                        {sortBy === "generatedAt" ? (
                          sortOrder === "asc" ? (
                            <CaretUp
                              size={12}
                              weight="bold"
                              className="text-orange-500"
                            />
                          ) : (
                            <CaretDown
                              size={12}
                              weight="bold"
                              className="text-orange-500"
                            />
                          )
                        ) : (
                          <CaretUpDown
                            size={12}
                            weight="bold"
                            className="text-zinc-400 group-hover/sort:text-zinc-700 dark:group-hover/sort:text-zinc-300 transition-colors opacity-60"
                          />
                        )}
                      </span>
                    </button>
                  </div>
                </th>

                <th className="py-3.5 px-4 font-bold select-none text-center w-px whitespace-nowrap">
                  <div className="flex justify-center">
                    <button
                      type="button"
                      onClick={() => handleSort("status")}
                      className="inline-flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer group/sort text-[10px] font-bold uppercase tracking-wider"
                      title="Ordenar por status"
                    >
                      <span>Status</span>
                      <span className="flex items-center">
                        {sortBy === "status" ? (
                          sortOrder === "asc" ? (
                            <CaretUp
                              size={12}
                              weight="bold"
                              className="text-orange-500"
                            />
                          ) : (
                            <CaretDown
                              size={12}
                              weight="bold"
                              className="text-orange-500"
                            />
                          )
                        ) : (
                          <CaretUpDown
                            size={12}
                            weight="bold"
                            className="text-zinc-400 group-hover/sort:text-zinc-700 dark:group-hover/sort:text-zinc-300 transition-colors opacity-60"
                          />
                        )}
                      </span>
                    </button>
                  </div>
                </th>

                <th className="py-3.5 px-4 font-bold select-none text-right w-px whitespace-nowrap pr-4">
                  <span className="sr-only">Ações</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/80">
              {paginatedLogs.map((log) => (
                <tr
                  key={log.id}
                  className="transition-colors hover:bg-zinc-50/60 dark:hover:bg-zinc-800/30 group/row select-none"
                >
                  <td className="py-3.5 px-4 align-middle text-left min-w-[260px] whitespace-nowrap">
                    <span className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white truncate block">
                      {log.reportTitle}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 align-middle text-right w-px whitespace-nowrap">
                    <span className="text-xs text-zinc-700 dark:text-zinc-300 font-medium whitespace-nowrap">
                      {formatLongDateWithTimePortuguese(log.generatedAt)}
                    </span>
                  </td>

                  <td className="py-3.5 px-4 align-middle text-center w-px whitespace-nowrap">
                    <div className="flex items-center justify-center">
                      {getExecutionStatusBadge(log.status)}
                    </div>
                  </td>

                  <td className="py-3.5 px-4 align-middle text-right w-px whitespace-nowrap pr-4">
                    <div className="flex justify-end">
                      <TableActionButton
                        onClick={() => onDownload(log)}
                        tooltip="Baixar relatório"
                        icon={<DownloadSimple size={15} weight="bold" />}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/40 dark:bg-zinc-900/30">
          <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400 flex-wrap">
            <div className="flex items-center gap-2">
              <span className="font-medium">Resultados por página:</span>
              <div className="w-[72px]">
                <Select
                  placement="top"
                  size="sm"
                  radius="sm"
                  variant="default"
                  options={PAGE_SIZE_OPTIONS}
                  value={String(pageSize)}
                  onValueChange={(val) => {
                    setPageSize(Number(val))
                    setCurrentPage(1)
                  }}
                />
              </div>
            </div>
            <span>•</span>
            <span>
              Mostrando{" "}
              <strong className="text-zinc-900 dark:text-white font-bold">
                {sortedLogs.length === 0 ? 0 : (safePage - 1) * pageSize + 1}
              </strong>{" "}
              -{" "}
              <strong className="text-zinc-900 dark:text-white font-bold">
                {Math.min(safePage * pageSize, sortedLogs.length)}
              </strong>{" "}
              de{" "}
              <strong className="text-zinc-900 dark:text-white font-bold">
                {sortedLogs.length}
              </strong>{" "}
              relatórios
            </span>
          </div>

          {totalPages > 1 && (
            <Pagination
              radius="sm"
              color="primary"
              className="w-auto justify-end"
            >
              <PaginationContent className="gap-1">
                <PaginationItem>
                  <PaginationPrevious
                    label="Anterior"
                    onClick={() => setCurrentPage(Math.max(1, safePage - 1))}
                    disabled={safePage <= 1}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        isActive={safePage === page}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}
                <PaginationItem>
                  <PaginationNext
                    label="Próxima"
                    onClick={() =>
                      setCurrentPage(Math.min(totalPages, safePage + 1))
                    }
                    disabled={safePage >= totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>
    </section>
  )
}
