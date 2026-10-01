"use client"

import * as React from "react"

import Image from "next/image"
import Link from "next/link"

import type { AdminAccountStatus, AdminUser } from "@clubkey/types"
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
import { cn, getAdminUserSlug } from "@clubkey/utils"
import {
  CaretDown,
  CaretRight,
  CaretUp,
  CaretUpDown,
  Check,
  PencilSimple,
  X,
} from "@phosphor-icons/react"
import {
  parseAsInteger,
  parseAsString,
  parseAsStringLiteral,
  useQueryState,
} from "nuqs"

import { AdminUserWalletCard } from "./adminUserWalletCard"

const PAGE_SIZE_OPTIONS: SelectOption[] = [
  { value: "10", label: "10" },
  { value: "20", label: "20" },
  { value: "30", label: "30" },
  { value: "40", label: "40" },
  { value: "50", label: "50" },
]

export interface AdminUsersTableProps {
  users: AdminUser[]
  onEditUser?: (user: AdminUser) => void
  className?: string
}

export function AdminUsersTable({
  users,
  onEditUser,
  className,
}: AdminUsersTableProps): React.JSX.Element {
  const [expandedSlug, setExpandedSlug] = useQueryState(
    "expanded",
    parseAsString
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

  const handleSort = (column: "name" | "permissions" | "balance") => {
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

  const sortedUsers = React.useMemo(() => {
    if (!sortBy) return users

    const effectiveOrder = sortOrder || "asc"

    return [...users].sort((a, b) => {
      let comparison = 0
      if (sortBy === "name") {
        comparison = a.name.localeCompare(b.name, "pt-BR", {
          sensitivity: "base",
        })
      } else if (sortBy === "permissions") {
        const aScore =
          (a.p2pStatus === "ON" ? 1 : 0) + (a.saqueStatus === "ON" ? 1 : 0)
        const bScore =
          (b.p2pStatus === "ON" ? 1 : 0) + (b.saqueStatus === "ON" ? 1 : 0)
        comparison = bScore - aScore
      } else if (sortBy === "balance") {
        const aTotal = a.balances?.total || 0
        const bTotal = b.balances?.total || 0
        comparison = aTotal - bTotal
      }

      return effectiveOrder === "desc" ? -comparison : comparison
    })
  }, [users, sortBy, sortOrder])

  const totalPages = Math.max(
    1,
    Math.ceil(sortedUsers.length / (pageSize || 10))
  )
  const safePage = Math.min(Math.max(1, currentPage || 1), totalPages)

  React.useEffect(() => {
    if (currentPage > totalPages && totalPages >= 1) {
      setCurrentPage(totalPages, { shallow: true, scroll: false })
    }
  }, [currentPage, totalPages, setCurrentPage])

  const paginatedUsers = React.useMemo(() => {
    const start = (safePage - 1) * (pageSize || 10)
    return sortedUsers.slice(start, start + (pageSize || 10))
  }, [sortedUsers, safePage, pageSize])

  const toggleExpand = (user: AdminUser) => {
    const userSlug = getAdminUserSlug(user.handle, user.name)
    const isCurrentlyExpanded =
      expandedSlug === userSlug ||
      expandedSlug === user.id ||
      expandedSlug === user.handle.replace(/^@/, "")

    if (isCurrentlyExpanded) {
      setExpandedSlug(null, { shallow: true, scroll: false })
    } else {
      setExpandedSlug(userSlug, { shallow: true, scroll: false })
    }
  }

  const getStatusBadge = (status: AdminAccountStatus) => {
    switch (status) {
      case "CONFIRMADO":
        return (
          <span className="inline-flex items-center gap-1.5 px-1.5 py-0.5 rounded-xs text-[10px] font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 whitespace-nowrap">
            <span className="size-1.5 rounded-full bg-emerald-500 shrink-0" />
            <span>Confirmado</span>
          </span>
        )
      case "PENDENTE":
        return (
          <span className="inline-flex items-center gap-1.5 px-1.5 py-0.5 rounded-xs text-[10px] font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 whitespace-nowrap">
            <span className="size-1.5 rounded-full bg-zinc-400 shrink-0" />
            <span>Pendente</span>
          </span>
        )
      case "EM_ANALISE":
        return (
          <span className="inline-flex items-center gap-1.5 px-1.5 py-0.5 rounded-xs text-[10px] font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 whitespace-nowrap">
            <span className="size-1.5 rounded-full bg-amber-500 shrink-0" />
            <span>Em análise</span>
          </span>
        )
      case "BLOQUEADO":
        return (
          <span className="inline-flex items-center gap-1.5 px-1.5 py-0.5 rounded-xs text-[10px] font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 whitespace-nowrap">
            <span className="size-1.5 rounded-full bg-rose-500 shrink-0" />
            <span>Bloqueado</span>
          </span>
        )
      default:
        return null
    }
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
                  title="Ordenar por usuário"
                >
                  <span>Usuário</span>
                  <span className="flex items-center">
                    {sortBy === "name" ? (
                      sortOrder === "asc" || !sortOrder ? (
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
                    onClick={() => handleSort("permissions")}
                    className="inline-flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer group/sort text-[10px] font-bold uppercase tracking-wider"
                    title="Ordenar por permissões"
                  >
                    <span>Permissões</span>
                    <span className="flex items-center">
                      {sortBy === "permissions" ? (
                        sortOrder === "asc" || !sortOrder ? (
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

              <th className="py-3.5 px-4 font-bold select-none text-right w-px whitespace-nowrap">
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleSort("balance")}
                    className="inline-flex items-center gap-1.5 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer group/sort text-[10px] font-bold uppercase tracking-wider"
                    title="Ordenar por saldo total"
                  >
                    <span>Saldo Total</span>
                    <span className="flex items-center">
                      {sortBy === "balance" ? (
                        sortOrder === "asc" || !sortOrder ? (
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
            {users.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="py-12 px-4 text-center text-zinc-500 dark:text-zinc-400 text-xs font-medium"
                >
                  Nenhum usuário encontrado com os filtros selecionados.
                </td>
              </tr>
            ) : (
              paginatedUsers.map((user) => {
                const userSlug = getAdminUserSlug(user.handle, user.name)
                const isExpanded =
                  expandedSlug === userSlug ||
                  expandedSlug === user.id ||
                  expandedSlug === user.handle.replace(/^@/, "")

                return (
                  <React.Fragment key={user.id}>
                    
                    <tr
                      onClick={() => toggleExpand(user)}
                      className={cn(
                        "transition-colors cursor-pointer group select-none",
                        isExpanded
                          ? "bg-zinc-50/80 dark:bg-zinc-800/50"
                          : "hover:bg-zinc-50/60 dark:hover:bg-zinc-800/30"
                      )}
                    >
                      
                      <td className="py-4 px-4 align-middle text-left min-w-[480px] whitespace-nowrap">
                        <div className="flex items-center gap-3.5">
                          
                          <Avatar className="size-[52px] shrink-0 ring-1 ring-zinc-200 dark:ring-zinc-800">
                            {user.avatar && (
                              <AvatarImage src={user.avatar} alt={user.name} />
                            )}
                            <AvatarFallback className="font-bold text-sm bg-zinc-900 text-white dark:bg-zinc-800 dark:text-zinc-100">
                              {user.initials}
                            </AvatarFallback>
                          </Avatar>

                          
                          <div className="min-w-0 flex-1 space-y-1">
                            <div className="flex items-center gap-1.5 whitespace-nowrap">
                              <span className="font-bold text-zinc-900 dark:text-white text-xs">
                                {user.name}
                              </span>
                              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 font-mono">
                                {user.idTag}
                              </span>
                            </div>

                            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
                              {user.email}
                            </p>

                            <div className="flex items-center gap-1.5 text-[10px] text-zinc-400 dark:text-zinc-500 font-medium whitespace-nowrap">
                              <span className="font-mono text-zinc-600 dark:text-zinc-400 font-semibold">
                                {user.handle}
                              </span>
                              <span>•</span>
                              <span>
                                Taxa:{" "}
                                <strong className="text-zinc-700 dark:text-zinc-300 font-bold">
                                  {user.taxa}
                                </strong>
                              </span>
                              <span>•</span>
                              <span>
                                Criado em:{" "}
                                <strong className="text-zinc-700 dark:text-zinc-300 font-bold">
                                  {user.createdAt}
                                </strong>
                              </span>
                              <span>•</span>
                              <span>
                                Tipo:{" "}
                                <strong className="text-zinc-700 dark:text-zinc-300 font-bold">
                                  {user.documentType}
                                </strong>
                              </span>
                              <span>•</span>
                              <span>
                                Level:{" "}
                                <strong className="text-zinc-700 dark:text-zinc-300 font-bold uppercase">
                                  {user.level}
                                </strong>
                              </span>
                              <span>•</span>
                              {getStatusBadge(user.accountStatus)}
                            </div>
                          </div>
                        </div>
                      </td>

                      
                      <td className="py-4 px-4 align-middle text-right w-px whitespace-nowrap">
                        <div className="flex flex-col items-end gap-1 select-none">
                          
                          <div className="flex items-center gap-1.5">
                            <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                              P2P
                            </span>
                            {user.p2pStatus === "ON" ? (
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

                          
                          <div className="flex items-center gap-1.5">
                            <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                              Saque
                            </span>
                            {user.saqueStatus === "ON" ? (
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

                      
                      <td className="py-4 px-4 align-middle text-right w-px whitespace-nowrap">
                        <div className="space-y-0.5 text-right">
                          <div className="flex items-center justify-end gap-1.5 font-mono font-bold text-xs text-zinc-900 dark:text-white">
                            <span>
                              {(user.balances?.total || 0).toLocaleString(
                                "pt-BR",
                                {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                }
                              )}
                            </span>
                            <div className="relative w-3.5 h-3.5 shrink-0 inline-block">
                              <Image
                                src="/utils/gamification/utils/RIB.svg"
                                alt="RIB"
                                fill
                                className="object-contain"
                              />
                            </div>
                          </div>
                          <div className="flex items-center justify-end gap-1 text-[10px] text-zinc-400 dark:text-zinc-500 font-mono">
                            <span>
                              Disp:{" "}
                              {(user.balances?.available || 0).toLocaleString(
                                "pt-BR",
                                { minimumFractionDigits: 0 }
                              )}
                            </span>
                            <div className="relative w-2.5 h-2.5 shrink-0 inline-block opacity-75">
                              <Image
                                src="/utils/gamification/utils/RIB.svg"
                                alt="RIB"
                                fill
                                className="object-contain"
                              />
                            </div>
                          </div>
                        </div>
                      </td>

                      
                      <td className="py-4 px-4 align-middle text-right w-px whitespace-nowrap pr-4">
                        <div className="flex items-center justify-end gap-1">
                          <TableActionButton
                            href={`/usuarios/${userSlug}/detalhes/perfil`}
                            onClick={(e) => {
                              e.stopPropagation()
                              onEditUser?.(user)
                            }}
                            tooltip="Editar usuário"
                            icon={<PencilSimple size={14} weight="bold" />}
                          />

                          <TableActionButton
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleExpand(user)
                            }}
                            tooltip={isExpanded ? "Recolher" : "Expandir"}
                            icon={
                              isExpanded ? (
                                <CaretDown
                                  size={14}
                                  weight="bold"
                                  className="text-zinc-900 dark:text-white"
                                />
                              ) : (
                                <CaretRight size={14} weight="bold" />
                              )
                            }
                          />
                        </div>
                      </td>
                    </tr>

                    
                    {isExpanded && (
                      <tr className="bg-zinc-50/40 dark:bg-zinc-900/40">
                        <td colSpan={4} className="p-0">
                          <AdminUserWalletCard user={user} />
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
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
              {users.length === 0 ? 0 : (safePage - 1) * (pageSize || 10) + 1}
            </strong>{" "}
            -{" "}
            <strong className="text-zinc-900 dark:text-white font-bold">
              {Math.min(safePage * (pageSize || 10), users.length)}
            </strong>{" "}
            de{" "}
            <strong className="text-zinc-900 dark:text-white font-bold">
              {users.length}
            </strong>{" "}
            usuários
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
