"use client"

import * as React from "react"

import Image from "next/image"
import { useRouter } from "next/navigation"

import type { AdminEvent, AdminEventStatus } from "@clubkey/types"
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
import { cn, formatCurrency } from "@clubkey/utils"
import {
  ArrowSquareOut,
  CalendarBlank,
  CaretDown,
  CaretUp,
  CaretUpDown,
  Check,
  CheckCircle,
  ClockCountdown,
  Lightning,
  MapPin,
  Prohibit,
  Sparkle,
  Ticket,
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

export interface EventsTableProps {
  events: AdminEvent[]
  className?: string
  onResetFilters?: () => void
  onStatusChange?: (id: number, newStatus: AdminEventStatus) => void
}

export function EventsTable({
  events,
  className,
  onResetFilters,
  onStatusChange: _onStatusChange,
}: EventsTableProps): React.JSX.Element {
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

  const handleSort = (
    column:
      | "code"
      | "title"
      | "date"
      | "place"
      | "category"
      | "occupancy"
      | "price"
      | "status"
  ) => {
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

  const sortedEvents = React.useMemo(() => {
    if (!sortBy) return events

    const effectiveOrder = sortOrder || "asc"

    return [...events].sort((a, b) => {
      let comparison = 0
      if (sortBy === "code") {
        comparison = a.code.localeCompare(b.code)
      } else if (sortBy === "title") {
        comparison = a.title.localeCompare(b.title, "pt-BR", {
          sensitivity: "base",
        })
      } else if (sortBy === "date") {
        comparison = (a.date || "").localeCompare(b.date || "")
      } else if (sortBy === "place") {
        comparison = a.city.localeCompare(b.city, "pt-BR", {
          sensitivity: "base",
        })
      } else if (sortBy === "category") {
        comparison = a.category.localeCompare(b.category, "pt-BR", {
          sensitivity: "base",
        })
      } else if (sortBy === "occupancy") {
        const aCount = a.participants?.length || a.initialConfirmed || 0
        const bCount = b.participants?.length || b.initialConfirmed || 0
        comparison = aCount - bCount
      } else if (sortBy === "price") {
        comparison = a.price - b.price
      } else if (sortBy === "status") {
        comparison = a.status.localeCompare(b.status)
      }

      return effectiveOrder === "asc" ? comparison : -comparison
    })
  }, [events, sortBy, sortOrder])

  const totalPages = Math.ceil(sortedEvents.length / pageSize) || 1
  const safeCurrentPage = Math.min(Math.max(1, currentPage), totalPages)

  const paginatedEvents = React.useMemo(() => {
    const startIndex = (safeCurrentPage - 1) * pageSize
    return sortedEvents.slice(startIndex, startIndex + pageSize)
  }, [sortedEvents, safeCurrentPage, pageSize])

  const renderSortIndicator = (
    column:
      | "code"
      | "title"
      | "date"
      | "place"
      | "category"
      | "occupancy"
      | "price"
      | "status"
  ) => {
    if (sortBy === column) {
      return sortOrder === "asc" || !sortOrder ? (
        <CaretUp size={12} weight="bold" className="text-brand-primary" />
      ) : (
        <CaretDown size={12} weight="bold" className="text-brand-primary" />
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

  const renderStatusBadge = (status: AdminEventStatus) => {
    switch (status) {
      case "PUBLICADO":
        return (
          <TableStatusBadge
            variant="info"
            label="Publicado"
            icon={<ClockCountdown size={36} weight="bold" />}
          />
        )
      case "CONFIRMADO":
        return (
          <TableStatusBadge
            variant="success"
            label="Confirmado"
            icon={<CheckCircle size={36} weight="fill" />}
          />
        )
      case "EM_BREVE":
        return (
          <TableStatusBadge
            variant="warning"
            label="Em Breve"
            icon={<Sparkle size={36} weight="fill" />}
          />
        )
      case "ESGOTADO":
        return (
          <TableStatusBadge
            variant="danger"
            label="Esgotado"
            icon={<Prohibit size={36} weight="fill" />}
          />
        )
      case "CONCLUIDO":
        return (
          <TableStatusBadge
            variant="neutral"
            label="Concluído"
            icon={<Check size={36} weight="bold" />}
          />
        )
      case "CANCELADO":
        return (
          <TableStatusBadge
            variant="danger"
            label="Cancelado"
            icon={<Prohibit size={36} weight="fill" />}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className={cn("w-full space-y-4", className)}>
      <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#141416] overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="border-b border-zinc-200/80 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30 text-[10px] uppercase font-bold tracking-wider text-zinc-400 dark:text-zinc-500">
                <th
                  onClick={() => handleSort("title")}
                  className="py-3 px-4 text-left cursor-pointer group/sort select-none min-w-[280px]"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Evento & Anfitrião</span>
                    {renderSortIndicator("title")}
                  </div>
                </th>

                <th
                  onClick={() => handleSort("date")}
                  className="py-3 px-4 text-left cursor-pointer group/sort select-none w-px whitespace-nowrap"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Data & Horário</span>
                    {renderSortIndicator("date")}
                  </div>
                </th>

                <th
                  onClick={() => handleSort("place")}
                  className="py-3 px-4 text-left cursor-pointer group/sort select-none w-px whitespace-nowrap"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Local / Cidade</span>
                    {renderSortIndicator("place")}
                  </div>
                </th>

                <th
                  onClick={() => handleSort("category")}
                  className="py-3 px-4 text-left cursor-pointer group/sort select-none w-px whitespace-nowrap"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Categoria</span>
                    {renderSortIndicator("category")}
                  </div>
                </th>

                <th
                  onClick={() => handleSort("occupancy")}
                  className="py-3 px-4 text-left cursor-pointer group/sort select-none w-px whitespace-nowrap"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Ocupação</span>
                    {renderSortIndicator("occupancy")}
                  </div>
                </th>

                <th
                  onClick={() => handleSort("price")}
                  className="py-3 px-4 text-right cursor-pointer group/sort select-none w-px whitespace-nowrap"
                >
                  <div className="flex items-center justify-end gap-1.5">
                    <span>Valor / XP</span>
                    {renderSortIndicator("price")}
                  </div>
                </th>

                <th
                  onClick={() => handleSort("status")}
                  className="py-3 px-4 text-center cursor-pointer group/sort select-none w-px whitespace-nowrap"
                >
                  <div className="flex items-center justify-center gap-1.5">
                    <span>Status</span>
                    {renderSortIndicator("status")}
                  </div>
                </th>

                <th className="py-3 px-4 text-right w-px whitespace-nowrap pr-4">
                  <span>Ações</span>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/60">
              {paginatedEvents.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 px-4 text-center">
                    <div className="flex flex-col items-center justify-center gap-2 max-w-sm mx-auto">
                      <div className="size-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400">
                        <CalendarBlank size={20} weight="bold" />
                      </div>
                      <p className="font-bold text-zinc-900 dark:text-white text-xs">
                        Nenhum evento encontrado
                      </p>
                      <p className="text-[11px] text-zinc-400 dark:text-zinc-500">
                        Não há eventos que correspondam aos filtros de busca
                        aplicados.
                      </p>
                      {onResetFilters && (
                        <button
                          type="button"
                          onClick={onResetFilters}
                          className="mt-1 text-xs font-semibold text-brand-primary hover:underline cursor-pointer"
                        >
                          Limpar filtros de busca
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedEvents.map((evt) => {
                  const confirmedCount =
                    evt.participants?.length || evt.initialConfirmed || 0
                  const occupancyPct = Math.min(
                    100,
                    Math.round((confirmedCount / (evt.capacity || 1)) * 100)
                  )

                  return (
                    <tr
                      key={evt.id}
                      onClick={() =>
                        router.push(`/eventos/${evt.slug || evt.id}/detalhes`)
                      }
                      className="group/row hover:bg-zinc-50/70 dark:hover:bg-zinc-800/30 transition-colors cursor-pointer"
                    >
                      <td className="py-4 px-4 align-middle text-left min-w-[280px]">
                        <div className="flex items-center gap-3">
                          <div className="relative size-12 rounded-xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 shrink-0 border border-zinc-200/60 dark:border-zinc-700/60">
                            {evt.image ? (
                              <Image
                                src={evt.image}
                                alt={evt.title}
                                fill
                                className="object-cover"
                                sizes="48px"
                              />
                            ) : (
                              <div className="size-full flex items-center justify-center text-zinc-400">
                                <Ticket size={20} weight="bold" />
                              </div>
                            )}
                          </div>

                          <div className="flex flex-col min-w-0">
                            <span className="font-bold text-zinc-900 dark:text-white text-xs truncate">
                              {evt.title}
                            </span>
                            <span className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate flex items-center gap-1">
                              <span className="font-mono font-bold text-zinc-600 dark:text-zinc-300">
                                {evt.code}
                              </span>
                              <span>•</span>
                              <span>
                                {evt.host
                                  ? `${evt.host.firstName} ${evt.host.lastName}`
                                  : "Curadoria ClubKey"}{" "}
                                • {evt.tierRequired || "Todos os Membros"}
                              </span>
                            </span>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4 align-middle text-left w-px whitespace-nowrap">
                        <div className="flex flex-col">
                          <span className="font-bold text-zinc-900 dark:text-white text-xs">
                            {evt.day} {evt.month} • {evt.weekday}
                          </span>
                          <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">
                            {evt.time}
                          </span>
                        </div>
                      </td>

                      <td className="py-4 px-4 align-middle text-left w-px whitespace-nowrap">
                        <div className="flex items-center gap-1.5 text-xs text-zinc-700 dark:text-zinc-300">
                          <MapPin
                            size={13}
                            weight="bold"
                            className="text-zinc-400 shrink-0"
                          />
                          <span className="truncate max-w-[160px]">
                            {evt.city || evt.place}
                          </span>
                        </div>
                      </td>

                      <td className="py-4 px-4 align-middle text-left w-px whitespace-nowrap">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-[11px] font-medium text-zinc-700 dark:text-zinc-300">
                          {evt.category || "Geral"}
                        </span>
                      </td>

                      <td className="py-4 px-4 align-middle text-left w-px whitespace-nowrap">
                        <div className="flex flex-col gap-1 w-24">
                          <div className="flex items-center justify-between text-[11px] font-semibold text-zinc-700 dark:text-zinc-300">
                            <span>
                              {confirmedCount}/{evt.capacity}
                            </span>
                            <span className="text-[10px] text-zinc-400">
                              {occupancyPct}%
                            </span>
                          </div>
                          <div className="w-full h-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 overflow-hidden">
                            <div
                              className="h-full rounded-full bg-brand-primary transition-all duration-300"
                              style={{ width: `${occupancyPct}%` }}
                            />
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-4 align-middle text-right w-px whitespace-nowrap">
                        <div className="flex flex-col items-end">
                          <span className="font-bold text-zinc-900 dark:text-white text-xs">
                            {evt.price > 0
                              ? formatCurrency(evt.price)
                              : "Incluso / VIP"}
                          </span>
                          {evt.xp ? (
                            <span className="text-[10px] font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-0.5">
                              <Lightning size={11} weight="fill" />+{evt.xp} XP
                            </span>
                          ) : null}
                        </div>
                      </td>

                      <td className="py-4 px-4 align-middle text-center w-px whitespace-nowrap">
                        <div className="flex items-center justify-center">
                          {renderStatusBadge(evt.status)}
                        </div>
                      </td>

                      <td className="py-4 px-4 align-middle text-right w-px whitespace-nowrap pr-4">
                        <div className="flex items-center justify-end gap-1">
                          <TableActionButton
                            href={`/eventos/${evt.slug || evt.id}/detalhes`}
                            onClick={(e) => {
                              e.stopPropagation()
                            }}
                            tooltip="Ver detalhes do evento"
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
                    void setPageSize(newSize, { shallow: true, scroll: false })
                    void setCurrentPage(1, { shallow: true, scroll: false })
                  }}
                />
              </div>
            </div>
            <span>•</span>
            <span>
              Mostrando{" "}
              <strong className="text-zinc-900 dark:text-white font-bold">
                {sortedEvents.length === 0
                  ? 0
                  : (safeCurrentPage - 1) * (pageSize || 10) + 1}
              </strong>{" "}
              -{" "}
              <strong className="text-zinc-900 dark:text-white font-bold">
                {Math.min(
                  safeCurrentPage * (pageSize || 10),
                  sortedEvents.length
                )}
              </strong>{" "}
              de{" "}
              <strong className="text-zinc-900 dark:text-white font-bold">
                {sortedEvents.length}
              </strong>{" "}
              eventos
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
                      void setCurrentPage(Math.max(1, safeCurrentPage - 1), {
                        shallow: true,
                        scroll: false,
                      })
                    }
                    disabled={safeCurrentPage <= 1}
                  />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <PaginationItem key={page}>
                      <PaginationLink
                        isActive={safeCurrentPage === page}
                        onClick={() =>
                          void setCurrentPage(page, {
                            shallow: true,
                            scroll: false,
                          })
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
                      void setCurrentPage(
                        Math.min(totalPages, safeCurrentPage + 1),
                        {
                          shallow: true,
                          scroll: false,
                        }
                      )
                    }
                    disabled={safeCurrentPage >= totalPages}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>
    </div>
  )
}
