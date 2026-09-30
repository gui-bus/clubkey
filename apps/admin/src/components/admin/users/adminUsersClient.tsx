"use client"

import * as React from "react"
import { UserPlus, DownloadSimple, ArrowClockwise, Sparkle } from "@phosphor-icons/react"
import { Button, toast } from "@clubkey/ui"
import type { AdminUser } from "@clubkey/types"
import { MOCK_ADMIN_USERS } from "@/src/data/mocks/adminUsers.data"
import { AdminUsersStats } from "./adminUsersStats"
import { AdminUsersFilterBar } from "./adminUsersFilterBar"
import { AdminUsersTable } from "./adminUsersTable"

export function AdminUsersClient(): React.JSX.Element {
  const [users] = React.useState<AdminUser[]>(MOCK_ADMIN_USERS)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [statusFilter, setStatusFilter] = React.useState("ALL")
  const [levelFilter, setLevelFilter] = React.useState("ALL")

  // Filtered list
  const filteredUsers = React.useMemo(() => {
    return users.filter((u) => {
      // Search match
      const query = searchQuery.toLowerCase().trim()
      const matchesSearch =
        !query ||
        u.name.toLowerCase().includes(query) ||
        u.email.toLowerCase().includes(query) ||
        u.handle.toLowerCase().includes(query) ||
        u.idTag.toLowerCase().includes(query) ||
        u.documentNumber.toLowerCase().includes(query) ||
        u.walletFireblocks.toLowerCase().includes(query)

      // Status match
      const matchesStatus =
        statusFilter === "ALL" || u.accountStatus === statusFilter

      // Level match
      const matchesLevel = levelFilter === "ALL" || u.level === levelFilter

      return matchesSearch && matchesStatus && matchesLevel
    })
  }, [users, searchQuery, statusFilter, levelFilter])

  const handleResetFilters = () => {
    setSearchQuery("")
    setStatusFilter("ALL")
    setLevelFilter("ALL")
  }

  const handleExport = () => {
    toast.success(`Exportando ${filteredUsers.length} usuários em formato CSV...`)
  }

  const handleRefresh = () => {
    toast.info("Dados de usuários sincronizados com o servidor.")
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black font-heading tracking-tight text-zinc-900 dark:text-white uppercase">
              Usuários
            </h1>
            <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-brand-primary/10 text-brand-primary border border-brand-primary/20">
              <Sparkle size={12} weight="fill" />
              Módulo Ativo
            </span>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium mt-1">
            Gestão executiva, controle de limites, wallets Fireblocks e permissões P2P de associados.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Button
            type="button"
            variant="bordered"
            size="sm"
            onClick={handleRefresh}
            className="flex items-center gap-1.5"
          >
            <ArrowClockwise size={15} />
            <span>Atualizar</span>
          </Button>

          <Button
            type="button"
            variant="bordered"
            size="sm"
            onClick={handleExport}
            className="flex items-center gap-1.5"
          >
            <DownloadSimple size={15} />
            <span>Exportar</span>
          </Button>
        </div>
      </div>

      {/* Summary Metrics */}
      <AdminUsersStats users={users} />

      {/* Filter and Search Bar */}
      <AdminUsersFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        levelFilter={levelFilter}
        onLevelChange={setLevelFilter}
        onReset={handleResetFilters}
        totalFiltered={filteredUsers.length}
        totalCount={users.length}
      />

      {/* Users Table */}
      <AdminUsersTable
        users={filteredUsers}
      />
    </div>
  )
}
