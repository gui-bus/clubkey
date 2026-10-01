"use client"

import * as React from "react"

import type { Administrator } from "@clubkey/types"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Select,
  type SelectOption,
  TableActionButton,
} from "@clubkey/ui"
import { cn } from "@clubkey/utils"
import {
  CaretDown,
  CaretUp,
  CaretUpDown,
  Check,
  EnvelopeSimple,
  ShieldSlash,
  X,
} from "@phosphor-icons/react"
import { parseAsInteger, parseAsString, parseAsStringLiteral, useQueryState } from "nuqs"

const PAGE_SIZE_OPTIONS: SelectOption[] = [
  { value: "10", label: "10" },
  { value: "20", label: "20" },
  { value: "30", label: "30" },
  { value: "40", label: "40" },
  { value: "50", label: "50" },
]

export interface AdministratorsTableProps {
  administrators: Administrator[]
  onDisable2FA: (admin: Administrator) => void
  onResendPassword: (admin: Administrator) => void
  className?: string
}

export function AdministratorsTable({
  administrators,
  onDisable2FA,
  onResendPassword,
  className,
}: AdministratorsTableProps): React.JSX.Element {
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

  const handleSort = (column: "name" | "2fa") => {
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

  const sortedAdmins = React.useMemo(() => {
    if (!sortBy) return administrators

    const effectiveOrder = sortOrder || "asc"

    return [...administrators].sort((a, b) => {
      let comparison = 0
      if (sortBy === "name") {
        comparison = a.name.localeCompare(b.name, "pt-BR", {
          sensitivity: "base",
        })
      } else if (sortBy === "2fa") {
        const aVal = a.twoFactorEnabled ? 1 : 0
        const bVal = b.twoFactorEnabled ? 1 : 0
        comparison = bVal - aVal
      }

      return effectiveOrder === "desc" ? -comparison : comparison
    })
  }, [administrators, sortBy, sortOrder])

  const totalPages = Math.max(
    1,
    Math.ceil(sortedAdmins.length / (pageSize || 10))
  )
  const safePage = Math.min(Math.max(1, currentPage || 1), totalPages)

  React.useEffect(() => {
    if (currentPage > totalPages && totalPages >= 1) {
      setCurrentPage(totalPages, { shallow: true, scroll: false })
    }
  }, [currentPage, totalPages, setCurrentPage])

  const paginatedAdmins = React.useMemo(() => {
    const start = (safePage - 1) * (pageSize || 10)
    return sortedAdmins.slice(start, start + (pageSize || 10))
  }, [sortedAdmins, safePage, pageSize])

  const getStatusBadge = (status: "ATIVO" | "INATIVO") => {
    if (status === "ATIVO") {
      return (
        <span className="inline-flex items-center gap-1.5 px-1.5 py-0.5 rounded-xs text-[10px] font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 whitespace-nowrap">
          <span className="size-1.5 rounded-full bg-emerald-500 shrink-0" />
          <span>Ativo</span>
        </span>
      )
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-1.5 py-0.5 rounded-xs text-[10px] font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 whitespace-nowrap">
        <span className="size-1.5 rounded-full bg-zinc-400 shrink-0" />
        <span>Inativo</span>
      </span>
    )
  }

  return (
    <div
      className={cn(
        "rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] overflow-hidden shadow-2xs",
        className
      )}
    >
      <div className="w-full overflow-x-auto overflow-y-hidden [scrollbar-width:thin] [scrollbar-color:theme(colors.zinc.300)_transparent] dark:[scrollbar-color:theme(colors.zinc.700)_transparent]">
        <table className="w-full min-w-[920px] text-left border-collapse text-xs">
          <thead>
            <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-800/40 text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider text-[10px]">
              <th className="py-3.5 px-4 font-bold select-none text-left min-w-[480px] whitespace-nowrap">
                <button
                  type="button"
                  onClick={() => handleSort("name")}
                  className="inline-flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer group/sort text-[10px] font-bold uppercase tracking-wider"
                  title="Ordenar por administrador"
                >
                  <span>Administrador</span>
                  <span className="flex items-center">
                    {sortBy === "name" ? (
                      sortOrder === "asc" ? (
                        <CaretUp
                          size={12}
                          weight="bold"
                          className="text-brand-primary"
                        />
                      ) : (
                        <CaretDown
                          size={12}
                          weight="bold"
                          className="text-brand-primary"
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
                    onClick={() => handleSort("2fa")}
                    className="inline-flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer group/sort text-[10px] font-bold uppercase tracking-wider"
                    title="Ordenar por status do 2FA"
                  >
                    <span>2FA</span>
                    <span className="flex items-center">
                      {sortBy === "2fa" ? (
                        sortOrder === "asc" ? (
                          <CaretUp
                            size={12}
                            weight="bold"
                            className="text-brand-primary"
                          />
                        ) : (
                          <CaretDown
                            size={12}
                            weight="bold"
                            className="text-brand-primary"
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
            {administrators.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  className="py-12 px-4 text-center text-zinc-500 dark:text-zinc-400 text-xs font-medium"
                >
                  Nenhum administrador encontrado com os filtros selecionados.
                </td>
              </tr>
            ) : (
              paginatedAdmins.map((admin) => (
                <tr
                  key={admin.id}
                  className="transition-colors hover:bg-zinc-50/60 dark:hover:bg-zinc-800/30 group/row select-none"
                >
                  <td className="py-4 px-4 align-middle text-left min-w-[480px] whitespace-nowrap">
                    <div className="flex items-center gap-3.5">
                      <Avatar className="size-[52px] shrink-0 ring-1 ring-zinc-200 dark:ring-zinc-800">
                        {admin.avatar && (
                          <AvatarImage src={admin.avatar} alt={admin.name} />
                        )}
                        <AvatarFallback
                          className={cn(
                            "font-bold text-sm text-white",
                            admin.avatarColor || "bg-zinc-900 dark:bg-zinc-800"
                          )}
                        >
                          {admin.initials}
                        </AvatarFallback>
                      </Avatar>

                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex items-center gap-1.5 whitespace-nowrap">
                          <span className="font-bold text-zinc-900 dark:text-white text-xs">
                            {admin.name}
                          </span>
                          <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 font-mono">
                            {admin.idTag}
                          </span>
                        </div>

                        <p className="text-[11px] text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
                          {admin.email}
                        </p>

                        <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 dark:text-zinc-500 font-medium whitespace-nowrap">
                          <span>
                            Nível de Acesso:{" "}
                            <strong className="text-zinc-700 dark:text-zinc-300 font-bold uppercase">
                              {admin.roleLabel || "SUPER ADMIN"}
                            </strong>
                          </span>
                          <span>•</span>
                          <span>
                            Criado em:{" "}
                            <strong className="text-zinc-700 dark:text-zinc-300 font-bold">
                              {admin.createdAt}
                            </strong>
                          </span>
                          <span>•</span>
                          <span>
                            Atualizado em:{" "}
                            <strong className="text-zinc-700 dark:text-zinc-300 font-bold">
                              {admin.updatedAt}
                            </strong>
                          </span>
                          <span>•</span>
                          <span>
                            Último login:{" "}
                            <strong className="text-zinc-700 dark:text-zinc-300 font-bold">
                              {admin.lastLogin}
                            </strong>
                          </span>
                          <span>•</span>
                          {getStatusBadge(admin.status)}
                        </div>
                      </div>
                    </div>
                  </td>

                  
                  <td className="py-4 px-4 align-middle text-right w-px whitespace-nowrap">
                    <div className="flex flex-col items-end gap-1 select-none">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                          2FA
                        </span>
                        {admin.twoFactorEnabled ? (
                          <Check
                            size={13}
                            weight="bold"
                            className="text-emerald-600 dark:text-emerald-400 shrink-0"
                          />
                        ) : (
                          <X
                            size={13}
                            weight="bold"
                            className="text-zinc-400 dark:text-zinc-500 shrink-0"
                          />
                        )}
                      </div>
                    </div>
                  </td>

                  
                  <td className="py-4 px-4 align-middle text-right w-px whitespace-nowrap pr-4">
                    <div className="flex items-center justify-end gap-1">
                      {admin.twoFactorEnabled && (
                        <TableActionButton
                          variant="danger"
                          onClick={(e) => {
                            e.stopPropagation()
                            onDisable2FA(admin)
                          }}
                          tooltip="Desativar 2FA"
                          icon={<ShieldSlash size={14} weight="bold" />}
                        />
                      )}

                      <TableActionButton
                        onClick={(e) => {
                          e.stopPropagation()
                          onResendPassword(admin)
                        }}
                        tooltip="Reenviar senha"
                        icon={<EnvelopeSimple size={14} weight="bold" />}
                      />
                    </div>
                  </td>
                </tr>
              ))
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
              {administrators.length === 0
                ? 0
                : (safePage - 1) * (pageSize || 10) + 1}
            </strong>{" "}
            -{" "}
            <strong className="text-zinc-900 dark:text-white font-bold">
              {Math.min(safePage * (pageSize || 10), administrators.length)}
            </strong>{" "}
            de{" "}
            <strong className="text-zinc-900 dark:text-white font-bold">
              {administrators.length}
            </strong>{" "}
            administradores
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

