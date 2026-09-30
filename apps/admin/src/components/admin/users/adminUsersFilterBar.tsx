"use client"

import * as React from "react"
import { MagnifyingGlass, Funnel, ArrowClockwise } from "@phosphor-icons/react"
import { Input, Button, Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@clubkey/ui"
import type { AdminAccountStatus, AdminUserTier } from "@clubkey/types"

export interface AdminUsersFilterBarProps {
  searchQuery: string
  onSearchChange: (value: string) => void
  statusFilter: string
  onStatusChange: (value: string) => void
  levelFilter: string
  onLevelChange: (value: string) => void
  onReset: () => void
  totalFiltered: number
  totalCount: number
}

export function AdminUsersFilterBar({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  levelFilter,
  onLevelChange,
  onReset,
  totalFiltered,
  totalCount,
}: AdminUsersFilterBarProps): React.JSX.Element {
  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 bg-white dark:bg-[#141416] p-3 rounded-sm border border-zinc-200 dark:border-zinc-800 shadow-2xs">
      {/* Search Input */}
      <div className="relative flex-1 min-w-[240px]">
        <MagnifyingGlass
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Buscar por nome, e-mail, @handle, CPF/CNPJ ou wallet..."
          className="w-full h-9 pl-9 pr-3 text-xs bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/80 rounded-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:ring-1 focus:ring-brand-primary"
        />
      </div>

      {/* Filter Selects & Actions */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={(e) => onStatusChange(e.target.value)}
          className="h-9 px-3 text-xs bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/80 rounded-sm text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-brand-primary cursor-pointer"
        >
          <option value="ALL">Status: Todos</option>
          <option value="CONFIRMADO">Confirmado</option>
          <option value="PENDENTE">Pendente</option>
          <option value="EM_ANALISE">Em Análise</option>
          <option value="BLOQUEADO">Bloqueado</option>
        </select>

        {/* Level Filter */}
        <select
          value={levelFilter}
          onChange={(e) => onLevelChange(e.target.value)}
          className="h-9 px-3 text-xs bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-700/80 rounded-sm text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-1 focus:ring-brand-primary cursor-pointer"
        >
          <option value="ALL">Level: Todos</option>
          <option value="BRONZE">Bronze</option>
          <option value="PRATA">Prata</option>
          <option value="OURO">Ouro</option>
          <option value="BLACK">Black</option>
          <option value="DIAMANTE">Diamante</option>
          <option value="PATRONO">Patrono</option>
        </select>

        {/* Reset Button */}
        {(searchQuery || statusFilter !== "ALL" || levelFilter !== "ALL") && (
          <button
            type="button"
            onClick={onReset}
            className="flex items-center gap-1.5 h-9 px-3 rounded-sm border border-zinc-200 dark:border-zinc-700 text-xs font-semibold text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
          >
            <ArrowClockwise size={14} />
            <span>Limpar</span>
          </button>
        )}

        <div className="text-[11px] font-bold text-zinc-400 dark:text-zinc-500 pl-1 whitespace-nowrap">
          {totalFiltered} de {totalCount} usuários
        </div>
      </div>
    </div>
  )
}
