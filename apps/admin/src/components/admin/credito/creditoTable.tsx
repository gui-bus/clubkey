"use client"

import * as React from "react"

import type { AdminCreditRequest, CreditRequestStatus } from "@clubkey/types"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
  Select,
  type SelectOption,
  TableActionButton,
  TableStatusBadge,
} from "@clubkey/ui"
import { cn, formatCurrency } from "@clubkey/utils"
import {
  ArrowSquareOut,
  CaretDown,
  CaretUp,
  CaretUpDown,
  Check,
  CheckCircle,
  ClockCountdown,
  CreditCard,
  MagnifyingGlass,
  Prohibit,
} from "@phosphor-icons/react"
import { parseAsInteger, parseAsString, parseAsStringLiteral, useQueryState } from "nuqs"

const PAGE_SIZE_OPTIONS: SelectOption[] = [
  { value: "10", label: "10" },
  { value: "20", label: "20" },
  { value: "30", label: "30" },
  { value: "50", label: "50" },
]

export interface CreditoTableProps {
  requests: AdminCreditRequest[]
  className?: string
  onResetFilters?: () => void
}

export function CreditoTable({
  requests,
  className,
  onResetFilters,
}: CreditoTableProps): React.JSX.Element {
  const [pageSize, setPageSize] = useQueryState(
    "pageSize",
    parseAsInteger.withDefault(10)
  )
  const [currentPage, setCurrentPage] = useQueryState(
    "page",
    parseAsInteger.withDefault(1)
  )
  const [sortBy, setSortBy] = useQueryState(
    "sort",
    parseAsString.withOptions({ shallow: true, scroll: false })
  )
  const [sortOrder, setSortOrder] = useQueryState(
    "order",
    parseAsStringLiteral(["asc", "desc"] as const).withOptions({
      shallow: true,
      scroll: false,
    })
  )

  const handleSort = (columnKey: string) => {
    if (sortBy === columnKey) {
      if (sortOrder === "asc") {
        void setSortOrder("desc")
      } else if (sortOrder === "desc") {
        void setSortBy(null)
        void setSortOrder(null)
      }
    } else {
      void setSortBy(columnKey)
      void setSortOrder("asc")
    }
  }

  const renderSortIndicator = (columnKey: string) => {
    if (sortBy !== columnKey) {
      return (
        <CaretUpDown
          size={12}
          className="text-zinc-400 opacity-40 group-hover/sort:opacity-100 transition-opacity"
        />
      )
    }
    if (sortOrder === "asc") {
      return <CaretUp size={12} className="text-zinc-900 dark:text-white" weight="bold" />
    }
    return <CaretDown size={12} className="text-zinc-900 dark:text-white" weight="bold" />
  }

  const sortedRequests = React.useMemo(() => {
    if (!sortBy || !sortOrder) return requests

    return [...requests].sort((a, b) => {
      let aVal: string | number = ""
      let bVal: string | number = ""

      switch (sortBy) {
        case "date":
          aVal = new Date(a.requestedAt).getTime()
          bVal = new Date(b.requestedAt).getTime()
          break
        case "applicant":
          aVal = a.applicantName.toLowerCase()
          bVal = b.applicantName.toLowerCase()
          break
        case "lineType":
          aVal = a.lineTypeLabel.toLowerCase()
          bVal = b.lineTypeLabel.toLowerCase()
          break
        case "amount":
          aVal = a.requestedAmount
          bVal = b.requestedAmount
          break
        case "status":
          aVal = a.status
          bVal = b.status
          break
        default:
          return 0
      }

      if (aVal < bVal) return sortOrder === "asc" ? -1 : 1
      if (aVal > bVal) return sortOrder === "asc" ? 1 : -1
      return 0
    })
  }, [requests, sortBy, sortOrder])

  const totalPages = Math.max(1, Math.ceil(sortedRequests.length / pageSize))
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages)

  const paginatedRequests = React.useMemo(() => {
    const start = (safeCurrentPage - 1) * pageSize
    return sortedRequests.slice(start, start + pageSize)
  }, [sortedRequests, safeCurrentPage, pageSize])

  const renderStatusBadge = (status: CreditRequestStatus) => {
    switch (status) {
      case "APROVADO":
      case "LIQUIDADO":
        return (
          <TableStatusBadge
            variant="success"
            label={status === "LIQUIDADO" ? "Liquidado" : "Aprovado"}
            icon={<CheckCircle size={36} weight="fill" />}
          />
        )
      case "EM_ANALISE":
        return (
          <TableStatusBadge
            variant="warning"
            label="Em Análise"
            icon={<ClockCountdown size={36} weight="bold" />}
          />
        )
      case "PENDENTE":
        return (
          <TableStatusBadge
            variant="neutral"
            label="Pendente"
            icon={<Check size={36} weight="bold" />}
          />
        )
      case "RECUSADO":
      case "CANCELADO":
        return (
          <TableStatusBadge
            variant="danger"
            label={status === "CANCELADO" ? "Cancelado" : "Recusado"}
            icon={<Prohibit size={36} weight="bold" />}
          />
        )
      default:
        return (
          <TableStatusBadge
            variant="neutral"
            label={status}
            icon={<Check size={36} weight="bold" />}
          />
        )
    }
  }

  if (requests.length === 0) {
    return (
      <div
        className={cn(
          "w-full rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] p-12 sm:p-16 flex flex-col items-center justify-center text-center space-y-3",
          className
        )}
      >
        <div className="size-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500 flex items-center justify-center shrink-0">
          <CreditCard size={24} weight="duotone" />
        </div>
        <div className="space-y-1 max-w-sm">
          <h4 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white">
            Nenhum pedido de crédito encontrado.
          </h4>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Não há solicitações ou operações de crédito registradas com os filtros selecionados no momento.
          </p>
        </div>
        {onResetFilters && (
          <button
            type="button"
            onClick={onResetFilters}
            className="text-xs font-semibold text-brand-primary hover:underline pt-2 cursor-pointer inline-flex items-center gap-1.5"
          >
            <MagnifyingGlass size={14} weight="bold" />
            <span>Limpar filtros de busca</span>
          </button>
        )}
      </div>
    )
  }

  return (
    <div className={cn("space-y-4 w-full", className)}>
      <div className="w-full rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#141416] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-zinc-200/80 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 bg-zinc-50/50 dark:bg-zinc-900/30">
                <th className="py-3.5 px-4 font-bold select-none text-left w-px whitespace-nowrap text-[10px] uppercase tracking-wider">
                  <button
                    type="button"
                    onClick={() => handleSort("date")}
                    className="inline-flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer group/sort text-[10px] font-bold uppercase tracking-wider"
                  >
                    <span>Data</span>
                    <span className="flex items-center">{renderSortIndicator("date")}</span>
                  </button>
                </th>

                <th className="py-3.5 px-4 font-bold select-none text-left min-w-[220px] text-[10px] uppercase tracking-wider">
                  <button
                    type="button"
                    onClick={() => handleSort("applicant")}
                    className="inline-flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer group/sort text-[10px] font-bold uppercase tracking-wider"
                  >
                    <span>Solicitante</span>
                    <span className="flex items-center">{renderSortIndicator("applicant")}</span>
                  </button>
                </th>

                <th className="py-3.5 px-4 font-bold select-none text-left min-w-[200px] text-[10px] uppercase tracking-wider">
                  Workspace / Imóvel
                </th>

                <th className="py-3.5 px-4 font-bold select-none text-left w-px whitespace-nowrap text-[10px] uppercase tracking-wider">
                  <button
                    type="button"
                    onClick={() => handleSort("lineType")}
                    className="inline-flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer group/sort text-[10px] font-bold uppercase tracking-wider"
                  >
                    <span>Linha de Crédito</span>
                    <span className="flex items-center">{renderSortIndicator("lineType")}</span>
                  </button>
                </th>

                <th className="py-3.5 px-4 font-bold select-none text-right w-px whitespace-nowrap text-[10px] uppercase tracking-wider">
                  <button
                    type="button"
                    onClick={() => handleSort("amount")}
                    className="inline-flex items-center justify-end gap-1.5 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer group/sort text-[10px] font-bold uppercase tracking-wider ml-auto"
                  >
                    <span>Valor Solicitado</span>
                    <span className="flex items-center">{renderSortIndicator("amount")}</span>
                  </button>
                </th>

                <th className="py-3.5 px-4 font-bold select-none text-center w-px whitespace-nowrap text-[10px] uppercase tracking-wider">
                  <button
                    type="button"
                    onClick={() => handleSort("status")}
                    className="inline-flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer group/sort text-[10px] font-bold uppercase tracking-wider"
                  >
                    <span>Status</span>
                    <span className="flex items-center">{renderSortIndicator("status")}</span>
                  </button>
                </th>

                <th className="py-3.5 px-4 font-bold select-none text-right w-px whitespace-nowrap pr-4">
                  <span className="sr-only">Ações</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/80">
              {paginatedRequests.map((req) => {
                return (
                  <tr
                    key={req.id}
                    className="transition-colors hover:bg-zinc-50/60 dark:hover:bg-zinc-800/30 group/row cursor-pointer select-none"
                  >
                    <td className="py-4 px-4 align-middle text-left w-px whitespace-nowrap">
                      <span className="font-bold text-zinc-900 dark:text-white text-xs">
                        {req.requestedAt}
                      </span>
                    </td>

                    <td className="py-4 px-4 align-middle text-left min-w-[220px]">
                      <div className="flex flex-col min-w-0">
                        <span className="font-bold text-zinc-900 dark:text-white text-xs truncate">
                          {req.applicantName}
                        </span>
                        <span className="text-[10px] text-zinc-400 dark:text-zinc-500 truncate mt-0.5">
                          {req.applicantEmail}
                        </span>
                      </div>
                    </td>

                    <td className="py-4 px-4 align-middle text-left min-w-[200px]">
                      <div className="flex flex-col min-w-0">
                        <span className="font-semibold text-zinc-800 dark:text-zinc-200 text-xs truncate">
                          {req.workspaceName || "Workspace Principal"}
                        </span>
                        {req.propertyTitle && (
                          <span className="text-[10px] text-zinc-400 dark:text-zinc-500 truncate mt-0.5">
                            {req.propertyTitle}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-4 px-4 align-middle text-left w-px whitespace-nowrap">
                      <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                        {req.lineTypeLabel}
                      </span>
                    </td>

                    <td className="py-4 px-4 align-middle text-right w-px whitespace-nowrap">
                      <span className="font-bold text-zinc-900 dark:text-white text-xs font-mono">
                        {formatCurrency(req.requestedAmount)}
                      </span>
                    </td>

                    <td className="py-4 px-4 align-middle text-center w-px whitespace-nowrap">
                      <div className="flex items-center justify-center">
                        {renderStatusBadge(req.status)}
                      </div>
                    </td>

                    <td className="py-4 px-4 align-middle text-right w-px whitespace-nowrap pr-4">
                      <TableActionButton
                        icon={<ArrowSquareOut size={16} weight="bold" />}
                        title="Ver Detalhes"
                        onClick={() => {}}
                      />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t border-zinc-200/80 dark:border-zinc-800 text-xs text-zinc-500 dark:text-zinc-400">
          <div className="flex items-center gap-2">
            <span>Itens por página:</span>
            <Select
              options={PAGE_SIZE_OPTIONS}
              value={String(pageSize)}
              onValueChange={(val) => {
                void setPageSize(Number(val))
                void setCurrentPage(1)
              }}
              size="sm"
              variant="flat"
              radius="lg"
              className="w-18 min-w-18 h-8"
            />
          </div>

          <div className="flex items-center gap-4">
            <span>
              Página {safeCurrentPage} de {totalPages} ({sortedRequests.length} itens)
            </span>

            <Pagination className="justify-end w-auto">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => void setCurrentPage(Math.max(1, safeCurrentPage - 1))}
                    aria-disabled={safeCurrentPage <= 1}
                    className={cn(
                      safeCurrentPage <= 1 && "pointer-events-none opacity-40"
                    )}
                  />
                </PaginationItem>

                <PaginationItem>
                  <PaginationNext
                    onClick={() => void setCurrentPage(Math.min(totalPages, safeCurrentPage + 1))}
                    aria-disabled={safeCurrentPage >= totalPages}
                    className={cn(
                      safeCurrentPage >= totalPages && "pointer-events-none opacity-40"
                    )}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </div>
  )
}
