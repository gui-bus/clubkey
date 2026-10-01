"use client"

import * as React from "react"

import { useRouter } from "next/navigation"

import type { AdminClaim, ClaimStatus } from "@clubkey/types"
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
} from "@clubkey/ui"
import { cn } from "@clubkey/utils"
import {
  ArrowSquareOut,
  CaretDown,
  CaretUp,
  CaretUpDown,
  CheckCircle,
  ClockCountdown,
  WarningCircle,
  XCircle,
} from "@phosphor-icons/react"
import { parseAsInteger, parseAsString, parseAsStringLiteral, useQueryState } from "nuqs"

const PAGE_SIZE_OPTIONS: SelectOption[] = [
  { value: "10", label: "10" },
  { value: "20", label: "20" },
  { value: "30", label: "30" },
  { value: "40", label: "40" },
  { value: "50", label: "50" },
]

export interface SinistrosTableProps {
  claims: AdminClaim[]
  className?: string
}

export function SinistrosTable({
  claims,
  className,
}: SinistrosTableProps): React.JSX.Element {
  const router = useRouter()

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

  const handleSort = (column: "date" | "type" | "insured" | "location" | "status") => {
    if (sortBy === column) {
      if (sortOrder === "asc" || !sortOrder) {
        void setSortOrder("desc")
      } else {
        void setSortBy(null)
        void setSortOrder(null)
      }
    } else {
      void setSortBy(column)
      void setSortOrder("asc")
    }
  }

  const sortedClaims = React.useMemo(() => {
    if (!sortBy) return claims

    const effectiveOrder = sortOrder || "asc"

    return [...claims].sort((a, b) => {
      let comparison = 0
      if (sortBy === "date") {
        comparison = a.occurredDate.localeCompare(b.occurredDate)
      } else if (sortBy === "type") {
        comparison = a.typeLabel.localeCompare(b.typeLabel, "pt-BR", {
          sensitivity: "base",
        })
      } else if (sortBy === "insured") {
        comparison = a.insuredName.localeCompare(b.insuredName, "pt-BR", {
          sensitivity: "base",
        })
      } else if (sortBy === "location") {
        comparison = a.propertyTitle.localeCompare(b.propertyTitle, "pt-BR", {
          sensitivity: "base",
        })
      } else if (sortBy === "status") {
        comparison = a.status.localeCompare(b.status)
      }

      return effectiveOrder === "desc" ? -comparison : comparison
    })
  }, [claims, sortBy, sortOrder])

  const totalPages = Math.max(
    1,
    Math.ceil(sortedClaims.length / (pageSize || 10))
  )
  const safePage = Math.min(Math.max(1, currentPage || 1), totalPages)

  React.useEffect(() => {
    if (currentPage > totalPages && totalPages >= 1) {
      setCurrentPage(totalPages, { shallow: true, scroll: false })
    }
  }, [currentPage, totalPages, setCurrentPage])

  const paginatedClaims = React.useMemo(() => {
    const start = (safePage - 1) * (pageSize || 10)
    return sortedClaims.slice(start, start + (pageSize || 10))
  }, [sortedClaims, safePage, pageSize])

  const getClaimStatusBadge = (status: ClaimStatus) => {
    switch (status) {
      case "ABERTO":
        return (
          <TableStatusBadge
            variant="warning"
            label="Aberto"
            icon={<WarningCircle size={36} weight="fill" />}
          />
        )
      case "EM_ANALISE":
        return (
          <TableStatusBadge
            variant="info"
            label="Em Análise"
            icon={<ClockCountdown size={36} weight="bold" />}
          />
        )
      case "PAGO":
        return (
          <TableStatusBadge
            variant="success"
            label="Pago"
            icon={<CheckCircle size={36} weight="fill" />}
          />
        )
      case "RECUSADO":
        return (
          <TableStatusBadge
            variant="danger"
            label="Recusado"
            icon={<XCircle size={36} weight="fill" />}
          />
        )
      default:
        return null
    }
  }

  const renderSortIndicator = (
    column: "date" | "type" | "insured" | "location" | "status"
  ) => {
    if (sortBy === column) {
      return sortOrder === "asc" || !sortOrder ? (
        <CaretUp size={12} weight="bold" className="text-orange-500" />
      ) : (
        <CaretDown size={12} weight="bold" className="text-orange-500" />
      )
    }
    return (
      <CaretUpDown
        size={12}
        weight="bold"
        className="text-zinc-400 group-hover/sort:text-zinc-700 dark:group-hover/sort:text-zinc-300 transition-colors opacity-60"
      />
    )
  }

  return (
    <div
      className={cn(
        "rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#141416] overflow-hidden shadow-2xs",
        className
      )}
    >
      <div className="w-full overflow-x-auto overflow-y-hidden [scrollbar-width:thin] [scrollbar-color:theme(colors.zinc.300)_transparent] dark:[scrollbar-color:theme(colors.zinc.700)_transparent]">
        <table className="w-full min-w-[980px] text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-800/40 text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider text-[10px]">
              <th className="py-3.5 px-4 font-bold select-none text-left w-px whitespace-nowrap">
                #
              </th>

              <th className="py-3.5 px-4 font-bold select-none text-left w-px whitespace-nowrap">
                <button
                  type="button"
                  onClick={() => handleSort("date")}
                  className="inline-flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer group/sort text-[10px] font-bold uppercase tracking-wider"
                  title="Ordenar por data"
                >
                  <span>Data</span>
                  <span className="flex items-center">{renderSortIndicator("date")}</span>
                </button>
              </th>

              <th className="py-3.5 px-4 font-bold select-none text-left min-w-[150px] whitespace-nowrap">
                <button
                  type="button"
                  onClick={() => handleSort("type")}
                  className="inline-flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer group/sort text-[10px] font-bold uppercase tracking-wider"
                  title="Ordenar por tipo"
                >
                  <span>Tipo</span>
                  <span className="flex items-center">{renderSortIndicator("type")}</span>
                </button>
              </th>

              <th className="py-3.5 px-4 font-bold select-none text-left min-w-[240px] whitespace-nowrap">
                <button
                  type="button"
                  onClick={() => handleSort("insured")}
                  className="inline-flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer group/sort text-[10px] font-bold uppercase tracking-wider"
                  title="Ordenar por segurado"
                >
                  <span>Segurado</span>
                  <span className="flex items-center">{renderSortIndicator("insured")}</span>
                </button>
              </th>

              <th className="py-3.5 px-4 font-bold select-none text-left min-w-[300px]">
                <button
                  type="button"
                  onClick={() => handleSort("location")}
                  className="inline-flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer group/sort text-[10px] font-bold uppercase tracking-wider"
                  title="Ordenar por local"
                >
                  <span>Local / Imóvel</span>
                  <span className="flex items-center">{renderSortIndicator("location")}</span>
                </button>
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
                    <span className="flex items-center">{renderSortIndicator("status")}</span>
                  </button>
                </div>
              </th>

              <th className="py-3.5 px-4 font-bold select-none text-right w-px whitespace-nowrap pr-4">
                <span className="sr-only">Ações</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/80">
            {claims.length === 0 ? (
              <tr>
                <td
                  colSpan={7}
                  className="py-12 px-4 text-center text-zinc-500 dark:text-zinc-400 text-xs font-medium"
                >
                  Nenhum sinistro encontrado com os filtros selecionados.
                </td>
              </tr>
            ) : (
              paginatedClaims.map((claim, index) => {
                const globalIndex = (safePage - 1) * (pageSize || 10) + index + 1
                const formattedNumber =
                  globalIndex < 10 ? `0${globalIndex}` : String(globalIndex)

                return (
                  <tr
                    key={claim.id}
                    onClick={() => router.push(`/sinistros/${claim.slug}/detalhes`)}
                    className="transition-colors hover:bg-zinc-50/60 dark:hover:bg-zinc-800/30 group/row cursor-pointer select-none"
                  >
                    <td className="py-4 px-4 align-middle text-left w-px whitespace-nowrap">
                      <span className="text-2xl sm:text-3xl font-heading font-black text-zinc-900/[0.15] dark:text-white/[0.20] leading-none select-none">
                        {formattedNumber}
                      </span>
                    </td>

                    <td className="py-4 px-4 align-middle text-left w-px whitespace-nowrap">
                      <div className="flex flex-col">
                        <span className="font-bold text-zinc-900 dark:text-white text-xs">
                          {claim.occurredDate}
                        </span>
                        <span className="text-[10px] font-mono text-zinc-400 dark:text-zinc-500 font-semibold">
                          {claim.code}
                        </span>
                      </div>
                    </td>

                    <td className="py-4 px-4 align-middle text-left min-w-[150px] whitespace-nowrap">
                      <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
                        {claim.typeLabel}
                      </span>
                    </td>

                    <td className="py-4 px-4 align-middle text-left min-w-[240px] whitespace-nowrap">
                      <div className="flex flex-col min-w-0">
                        <span className="font-bold text-zinc-900 dark:text-white text-xs truncate">
                          {claim.insuredName}
                        </span>
                        {claim.insuredDocument && (
                          <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-mono font-medium truncate">
                            {claim.insuredDocument}
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="py-4 px-4 align-middle text-left min-w-[300px]">
                      <div className="flex flex-col min-w-0">
                        <span className="font-bold text-zinc-900 dark:text-white text-xs line-clamp-1">
                          {claim.propertyTitle}
                        </span>
                        <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 dark:text-zinc-500 font-medium truncate mt-0.5">
                          <span>{claim.propertyLocation}</span>
                          {claim.reservationCode && (
                            <>
                              <span>•</span>
                              <span>Reserva: <strong className="text-zinc-600 dark:text-zinc-300 font-mono">{claim.reservationCode}</strong></span>
                            </>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4 align-middle text-center w-px whitespace-nowrap">
                      <div className="flex items-center justify-center">
                        {getClaimStatusBadge(claim.status)}
                      </div>
                    </td>

                    <td className="py-4 px-4 align-middle text-right w-px whitespace-nowrap pr-4">
                      <div className="flex items-center justify-end gap-1">
                        <TableActionButton
                          href={`/sinistros/${claim.slug}/detalhes`}
                          onClick={(e) => {
                            e.stopPropagation()
                          }}
                          tooltip="Ver detalhes do sinistro"
                          icon={<ArrowSquareOut size={15} weight="bold" />}
                        />
                      </div>
                    </td>
                  </tr>
                )
              })
            )}
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
                value={String(pageSize || 10)}
                onValueChange={(val) => {
                  const newSize = Number(val)
                  setPageSize(newSize, { shallow: true, scroll: false })
                  setCurrentPage(1, { shallow: true, scroll: false })
                }}
              />
            </div>
          </div>
          <span>•</span>
          <span>
            Mostrando{" "}
            <strong className="text-zinc-900 dark:text-white font-bold">
              {claims.length === 0
                ? 0
                : (safePage - 1) * (pageSize || 10) + 1}
            </strong>{" "}
            -{" "}
            <strong className="text-zinc-900 dark:text-white font-bold">
              {Math.min(safePage * (pageSize || 10), claims.length)}
            </strong>{" "}
            de{" "}
            <strong className="text-zinc-900 dark:text-white font-bold">
              {claims.length}
            </strong>{" "}
            sinistros
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
                  onClick={() =>
                    setCurrentPage(Math.max(1, safePage - 1), {
                      shallow: true,
                      scroll: false,
                    })
                  }
                  disabled={safePage <= 1}
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      isActive={safePage === page}
                      onClick={() =>
                        setCurrentPage(page, { shallow: true, scroll: false })
                      }
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
                    setCurrentPage(Math.min(totalPages, safePage + 1), {
                      shallow: true,
                      scroll: false,
                    })
                  }
                  disabled={safePage >= totalPages}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  )
}
