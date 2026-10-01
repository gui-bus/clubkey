"use client"

import * as React from "react"

import Image from "next/image"

import type { AdminProperty, PropertyStayStatus } from "@clubkey/types"
import {
  CircularProgress,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Select,
  type SelectOption,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@clubkey/ui"
import { cn, formatCurrency } from "@clubkey/utils"
import {
  ArrowUpRight,
  CaretDown,
  CaretUp,
  CaretUpDown,
  CheckCircle,
  EyeSlash,
  FileText,
  Info,
  Prohibit,
} from "@phosphor-icons/react"
import {
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
  useQueryState,
} from "nuqs"

const PAGE_SIZE_OPTIONS: SelectOption[] = [
  { value: "10", label: "10" },
  { value: "20", label: "20" },
  { value: "30", label: "30" },
  { value: "40", label: "40" },
  { value: "50", label: "50" },
]

export type PropertySortColumn =
  | "title"
  | "host"
  | "revenue"
  | "occupiedNights"
  | "revPar"
  | "occupancyRate"
  | "stayStatus"

export interface PropertiesTableProps {
  properties: AdminProperty[]
  className?: string
}

export function PropertiesTable({
  properties,
  className,
}: PropertiesTableProps): React.JSX.Element {
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

  const handleSort = (column: PropertySortColumn) => {
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

  const sortedProperties = React.useMemo(() => {
    if (!sortBy) return properties

    const effectiveOrder = sortOrder || "asc"

    return [...properties].sort((a, b) => {
      let comparison = 0
      if (sortBy === "title") {
        comparison = a.title.localeCompare(b.title, "pt-BR", {
          sensitivity: "base",
        })
      } else if (sortBy === "host") {
        comparison = a.host.name.localeCompare(b.host.name, "pt-BR", {
          sensitivity: "base",
        })
      } else if (sortBy === "revenue") {
        comparison = (a.revenueLastMonth || 0) - (b.revenueLastMonth || 0)
      } else if (sortBy === "occupiedNights") {
        comparison = (a.occupiedNights || 0) - (b.occupiedNights || 0)
      } else if (sortBy === "revPar") {
        comparison = (a.revPar || 0) - (b.revPar || 0)
      } else if (sortBy === "occupancyRate") {
        comparison = (a.occupancyRate || 0) - (b.occupancyRate || 0)
      } else if (sortBy === "stayStatus") {
        comparison = a.stayStatus.localeCompare(b.stayStatus)
      }

      return effectiveOrder === "desc" ? -comparison : comparison
    })
  }, [properties, sortBy, sortOrder])

  const totalPages = Math.max(
    1,
    Math.ceil(sortedProperties.length / (pageSize || 10))
  )
  const safePage = Math.min(Math.max(1, currentPage || 1), totalPages)

  React.useEffect(() => {
    if (currentPage > totalPages && totalPages >= 1) {
      setCurrentPage(totalPages, { shallow: true, scroll: false })
    }
  }, [currentPage, totalPages, setCurrentPage])

  const paginatedProperties = React.useMemo(() => {
    const start = (safePage - 1) * (pageSize || 10)
    return sortedProperties.slice(start, start + (pageSize || 10))
  }, [sortedProperties, safePage, pageSize])

  const renderSortIndicator = (column: PropertySortColumn) => {
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

  const getStayStatusBadge = (status: PropertyStayStatus) => {
    switch (status) {
      case "DISPONIVEL":
        return (
          <div className="relative overflow-hidden w-full min-w-[175px] h-11 px-4 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 flex items-center justify-center text-xs font-bold tracking-wide select-none">
            <span className="truncate z-10 font-bold">
              Disponível para reserva
            </span>
            <CheckCircle
              size={56}
              weight="fill"
              className="absolute -right-3 -bottom-3 text-emerald-500/20 dark:text-emerald-400/20 pointer-events-none -rotate-12 select-none"
            />
          </div>
        )
      case "OCULTO":
        return (
          <div className="relative overflow-hidden w-full min-w-[175px] h-11 px-4 rounded-xl bg-amber-500/10 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400 flex items-center justify-center text-xs font-bold tracking-wide select-none">
            <span className="truncate z-10 font-bold">Oculto no Stay</span>
            <EyeSlash
              size={56}
              weight="fill"
              className="absolute -right-3 -bottom-3 text-amber-500/20 dark:text-amber-400/20 pointer-events-none -rotate-12 select-none"
            />
          </div>
        )
      case "BLOQUEADO":
        return (
          <div className="relative overflow-hidden w-full min-w-[175px] h-11 px-4 rounded-xl bg-rose-500/10 dark:bg-rose-500/15 text-rose-700 dark:text-rose-400 flex items-center justify-center text-xs font-bold tracking-wide select-none">
            <span className="truncate z-10 font-bold">
              Bloqueado / Manutenção
            </span>
            <Prohibit
              size={56}
              weight="bold"
              className="absolute -right-3 -bottom-3 text-rose-500/20 dark:text-rose-400/20 pointer-events-none -rotate-12 select-none"
            />
          </div>
        )
      default:
        return (
          <div className="relative overflow-hidden w-full min-w-[175px] h-11 px-4 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 flex items-center justify-center text-xs font-bold tracking-wide select-none">
            <span className="truncate z-10 font-bold">Rascunho</span>
            <FileText
              size={56}
              weight="bold"
              className="absolute -right-3 -bottom-3 text-zinc-500/20 dark:text-zinc-400/20 pointer-events-none -rotate-12 select-none"
            />
          </div>
        )
    }
  }

  return (
    <TooltipProvider delayDuration={200}>
      <div
        className={cn(
          "rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#141416] overflow-hidden shadow-2xs",
          className
        )}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1020px]">
            <thead>
              <tr className="border-b border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                <th className="py-3.5 px-4 font-bold select-none min-w-[320px]">
                  <button
                    type="button"
                    onClick={() => handleSort("title")}
                    className="inline-flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer group/sort text-[10px] font-bold uppercase tracking-wider"
                  >
                    <span>Imóvel</span>
                    {renderSortIndicator("title")}
                  </button>
                </th>

                <th className="py-3.5 px-4 font-bold select-none min-w-[180px]">
                  <button
                    type="button"
                    onClick={() => handleSort("host")}
                    className="inline-flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer group/sort text-[10px] font-bold uppercase tracking-wider"
                  >
                    <span>Host</span>
                    {renderSortIndicator("host")}
                  </button>
                </th>

                <th className="py-3.5 px-4 font-bold select-none text-right min-w-[170px]">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      type="button"
                      onClick={() => handleSort("revenue")}
                      className="inline-flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer group/sort text-[10px] font-bold uppercase tracking-wider"
                    >
                      <span>Receita (últ. mês)</span>
                      {renderSortIndicator("revenue")}
                    </button>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 cursor-help inline-flex items-center">
                          <Info size={13} weight="bold" />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        Receita bruta consolidada no último mês fechado.
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </th>

                <th className="py-3.5 px-4 font-bold select-none text-right min-w-[140px]">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      type="button"
                      onClick={() => handleSort("occupiedNights")}
                      className="inline-flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer group/sort text-[10px] font-bold uppercase tracking-wider"
                    >
                      <span>Noites ocupadas</span>
                      {renderSortIndicator("occupiedNights")}
                    </button>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 cursor-help inline-flex items-center">
                          <Info size={13} weight="bold" />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        Estadias no mês e noites disponíveis.
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </th>

                <th className="py-3.5 px-4 font-bold select-none text-right min-w-[130px]">
                  <div className="flex items-center justify-end gap-1">
                    <button
                      type="button"
                      onClick={() => handleSort("revPar")}
                      className="inline-flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer group/sort text-[10px] font-bold uppercase tracking-wider"
                    >
                      <span>Receita/noite disp.</span>
                      {renderSortIndicator("revPar")}
                    </button>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 cursor-help inline-flex items-center">
                          <Info size={13} weight="bold" />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        RevPAR (Receita total dividida pelas noites
                        disponíveis).
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </th>

                <th className="py-3.5 px-4 font-bold select-none text-center min-w-[120px]">
                  <div className="flex items-center justify-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleSort("occupancyRate")}
                      className="inline-flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer group/sort text-[10px] font-bold uppercase tracking-wider"
                    >
                      <span>Ocupação</span>
                      {renderSortIndicator("occupancyRate")}
                    </button>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 cursor-help inline-flex items-center">
                          <Info size={13} weight="bold" />
                        </span>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        Taxa percentual de ocupação no mês.
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </th>

                <th className="py-3.5 px-4 font-bold select-none text-center min-w-[190px]">
                  <button
                    type="button"
                    onClick={() => handleSort("stayStatus")}
                    className="inline-flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer group/sort text-[10px] font-bold uppercase tracking-wider"
                  >
                    <span>Status Stay</span>
                    {renderSortIndicator("stayStatus")}
                  </button>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/80 text-xs">
              {properties.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="py-12 px-4 text-center text-zinc-500 dark:text-zinc-400 font-medium"
                  >
                    Nenhum imóvel encontrado com os filtros selecionados.
                  </td>
                </tr>
              ) : (
                paginatedProperties.map((property) => {
                  return (
                    <tr
                      key={property.id}
                      className="hover:bg-zinc-50/70 dark:hover:bg-zinc-800/40 transition-colors group select-none"
                    >
                      <td className="py-3.5 px-4 align-middle text-left">
                        <div className="flex items-center gap-3.5 min-w-0">
                          <div className="relative size-12 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 shrink-0 border border-zinc-200/80 dark:border-zinc-700/80">
                            <Image
                              src={property.thumbnail}
                              alt={property.title}
                              fill
                              sizes="48px"
                              className="object-cover"
                            />
                          </div>

                          <div className="flex flex-col min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-bold text-zinc-900 dark:text-white truncate">
                                {property.internalCode}
                              </span>
                            </div>

                            <span className="text-xs text-zinc-600 dark:text-zinc-300 font-medium truncate mt-0.5">
                              {property.title}
                            </span>

                            <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 dark:text-zinc-500 mt-0.5 truncate">
                              <span className="font-bold text-zinc-900 dark:text-white uppercase">
                                {property.codeTag}
                              </span>
                              <span>•</span>
                              <span>
                                {property.city}, {property.state} •{" "}
                                {property.propertyTypeLabel}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 align-middle text-left">
                        <div className="flex flex-col min-w-0">
                          <span className="text-xs font-bold text-zinc-900 dark:text-white truncate">
                            {property.host.name}
                          </span>
                          <span className="text-[11px] text-zinc-400 dark:text-zinc-500 font-medium">
                            {property.host.idTag}
                          </span>
                          <button
                            type="button"
                            className="text-[11px] font-semibold text-orange-600 hover:text-orange-700 dark:text-orange-400 dark:hover:text-orange-300 inline-flex items-center gap-1 mt-0.5 cursor-pointer text-left w-fit"
                          >
                            <span>Ver workspace</span>
                            <ArrowUpRight size={11} weight="bold" />
                          </button>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 align-middle text-right">
                        <div className="flex flex-col items-end">
                          <span className="text-xs font-bold text-zinc-900 dark:text-white">
                            {formatCurrency(property.revenueLastMonth)}
                          </span>
                          <span className="text-[10px] text-zinc-400 dark:text-zinc-500 leading-tight mt-0.5">
                            Último mês fechado: {property.revenueMonthReference}
                          </span>
                          <span className="text-[9px] text-zinc-400/80 dark:text-zinc-500/80 leading-tight">
                            por criação da reserva
                          </span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 align-middle text-right">
                        <div className="flex flex-col items-end">
                          <span className="text-xs font-bold text-zinc-900 dark:text-white">
                            {property.occupiedNights}
                          </span>
                          <span className="text-[10px] text-zinc-400 dark:text-zinc-500 leading-tight mt-0.5">
                            Estadia no mês
                          </span>
                          <span className="text-[9px] text-zinc-400/80 dark:text-zinc-500/80 leading-tight">
                            Disponíveis: {property.availableNights}
                          </span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 align-middle text-right">
                        <span className="text-xs font-bold text-zinc-900 dark:text-white">
                          {formatCurrency(property.revPar)}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 align-middle text-center min-w-[100px]">
                        <div className="flex items-center justify-center">
                          <CircularProgress
                            value={property.occupancyRate}
                            size="sm"
                            showValueLabel
                            color={
                              property.occupancyRate >= 60
                                ? "success"
                                : property.occupancyRate >= 30
                                  ? "warning"
                                  : "danger"
                            }
                          />
                        </div>
                      </td>

                      <td className="py-3.5 px-4 align-middle">
                        {getStayStatusBadge(property.stayStatus)}
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
                {properties.length === 0
                  ? 0
                  : (safePage - 1) * (pageSize || 10) + 1}
              </strong>{" "}
              -{" "}
              <strong className="text-zinc-900 dark:text-white font-bold">
                {Math.min(safePage * (pageSize || 10), properties.length)}
              </strong>{" "}
              de{" "}
              <strong className="text-zinc-900 dark:text-white font-bold">
                {properties.length}
              </strong>{" "}
              imóveis
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
    </TooltipProvider>
  )
}
