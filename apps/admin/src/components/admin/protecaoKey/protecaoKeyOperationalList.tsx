"use client"

import * as React from "react"

import type { InsuranceGroup, InsuranceInvoice } from "@clubkey/types"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Select,
  type SelectOption,
  TableTitle,
} from "@clubkey/ui"
import { cn } from "@clubkey/utils"
import { Receipt, ShieldCheck } from "@phosphor-icons/react"
import {
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
  useQueryState,
} from "nuqs"

import { ProtecaoKeyGroupsTable } from "./protecaoKeyGroupsTable"
import { ProtecaoKeyInvoicesTable } from "./protecaoKeyInvoicesTable"

export type OperationalTab = "grupos" | "faturas"

export interface ProtecaoKeyOperationalListProps {
  groups: InsuranceGroup[]
  invoices: InsuranceInvoice[]
}

const PAGE_SIZE_OPTIONS: SelectOption[] = [
  { value: "10", label: "10" },
  { value: "20", label: "20" },
  { value: "30", label: "30" },
  { value: "50", label: "50" },
]

export function ProtecaoKeyOperationalList({
  groups,
  invoices,
}: ProtecaoKeyOperationalListProps): React.JSX.Element {
  const [activeTab, setActiveTab] = useQueryState(
    "view",
    parseAsStringLiteral(["grupos", "faturas"] as const)
      .withDefault("grupos")
      .withOptions({ shallow: true })
  )

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

  const handleSortChange = (field: string) => {
    if (sortBy === field) {
      if (sortOrder === "asc") {
        void setSortOrder("desc")
      } else {
        void setSortBy(null)
        void setSortOrder(null)
      }
    } else {
      void setSortBy(field)
      void setSortOrder("asc")
    }
  }

  const sortedGroups = React.useMemo(() => {
    if (!sortBy) return groups
    return [...groups].sort((a, b) => {
      let aVal = (a as unknown as Record<string, unknown>)[sortBy]
      let bVal = (b as unknown as Record<string, unknown>)[sortBy]
      if (typeof aVal === "string") aVal = aVal.toLowerCase()
      if (typeof bVal === "string") bVal = bVal.toLowerCase()
      if (aVal === bVal) return 0
      if (aVal === undefined || aVal === null) return 1
      if (bVal === undefined || bVal === null) return -1
      const res = aVal > bVal ? 1 : -1
      return sortOrder === "desc" ? -res : res
    })
  }, [groups, sortBy, sortOrder])

  const sortedInvoices = React.useMemo(() => {
    if (!sortBy) return invoices
    return [...invoices].sort((a, b) => {
      let aVal = (a as unknown as Record<string, unknown>)[sortBy]
      let bVal = (b as unknown as Record<string, unknown>)[sortBy]
      if (typeof aVal === "string") aVal = aVal.toLowerCase()
      if (typeof bVal === "string") bVal = bVal.toLowerCase()
      if (aVal === bVal) return 0
      if (aVal === undefined || aVal === null) return 1
      if (bVal === undefined || bVal === null) return -1
      const res = aVal > bVal ? 1 : -1
      return sortOrder === "desc" ? -res : res
    })
  }, [invoices, sortBy, sortOrder])

  const currentList = activeTab === "grupos" ? sortedGroups : sortedInvoices
  const totalItems = currentList.length
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize))
  const safePage = Math.min(Math.max(1, currentPage), totalPages)

  const paginatedGroups = React.useMemo(() => {
    const start = (safePage - 1) * pageSize
    return sortedGroups.slice(start, start + pageSize)
  }, [sortedGroups, safePage, pageSize])

  const paginatedInvoices = React.useMemo(() => {
    const start = (safePage - 1) * pageSize
    return sortedInvoices.slice(start, start + pageSize)
  }, [sortedInvoices, safePage, pageSize])

  const handleTabSwitch = (tab: "grupos" | "faturas") => {
    void setActiveTab(tab)
    void setCurrentPage(1)
    void setSortBy(null)
    void setSortOrder(null)
  }

  return (
    <section className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <TableTitle
          title="Lista Operacional"
          description="Contratos de grupos de proteção e faturas emitidas para hosts."
        />

        <div className="flex items-center p-1 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200/80 dark:border-zinc-700/60 shrink-0">
          <button
            type="button"
            onClick={() => handleTabSwitch("grupos")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer select-none",
              activeTab === "grupos"
                ? "bg-white dark:bg-[#141416] text-zinc-900 dark:text-white shadow-xs"
                : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            )}
          >
            <ShieldCheck size={14} weight="bold" />
            <span>Grupos ({groups.length})</span>
          </button>
          <button
            type="button"
            onClick={() => handleTabSwitch("faturas")}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer select-none",
              activeTab === "faturas"
                ? "bg-white dark:bg-[#141416] text-zinc-900 dark:text-white shadow-xs"
                : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            )}
          >
            <Receipt size={14} weight="bold" />
            <span>Faturas ({invoices.length})</span>
          </button>
        </div>
      </div>

      
      <div className="w-full rounded-2xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#141416] overflow-hidden shadow-2xs">
        {activeTab === "grupos" ? (
          <ProtecaoKeyGroupsTable
            groups={paginatedGroups}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSortChange={handleSortChange}
          />
        ) : (
          <ProtecaoKeyInvoicesTable
            invoices={paginatedInvoices}
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSortChange={handleSortChange}
          />
        )}

        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 border-t border-zinc-200/80 dark:border-zinc-800 text-xs text-zinc-500 dark:text-zinc-400 select-none">
          <div className="flex items-center gap-3">
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
                    void setPageSize(Number(val))
                    void setCurrentPage(1)
                  }}
                />
              </div>
            </div>
            <span>•</span>
            <span>
              Mostrando{" "}
              <strong className="text-zinc-900 dark:text-white font-bold">
                {totalItems === 0 ? 0 : (safePage - 1) * pageSize + 1}
              </strong>{" "}
              -{" "}
              <strong className="text-zinc-900 dark:text-white font-bold">
                {Math.min(safePage * pageSize, totalItems)}
              </strong>{" "}
              de{" "}
              <strong className="text-zinc-900 dark:text-white font-bold">
                {totalItems}
              </strong>{" "}
              {activeTab === "grupos" ? "grupos" : "faturas"}
            </span>
          </div>

          <Pagination
            radius="sm"
            color="primary"
            className="w-auto justify-end mx-0"
          >
            <PaginationContent className="gap-1">
              <PaginationItem>
                <PaginationPrevious
                  label="Anterior"
                  onClick={() => void setCurrentPage(Math.max(1, safePage - 1))}
                  disabled={safePage <= 1}
                  className="cursor-pointer"
                />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      isActive={safePage === page}
                      onClick={() => void setCurrentPage(page)}
                      className="cursor-pointer"
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
                    void setCurrentPage(Math.min(totalPages, safePage + 1))
                  }
                  disabled={safePage >= totalPages}
                  className="cursor-pointer"
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </section>
  )
}
