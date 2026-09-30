"use client"

import * as React from "react"
import {
  MagnifyingGlass,
  ArrowClockwise,
  CalendarBlank,
  X,
  CaretDown,
  Check,
  Funnel,
  IdentificationCard,
  EnvelopeSimple,
  User,
  Wallet,
  Phone,
  SlidersHorizontal,
} from "@phosphor-icons/react"
import { CtaButton, Input, Select, type SelectOption } from "@clubkey/ui"
import { cn } from "@clubkey/utils"

export type AdminUserSearchField =
  | "ALL"
  | "name"
  | "email"
  | "login"
  | "document"
  | "phone"
  | "wallet"

export interface AdminUsersFilterBarProps {
  searchQuery: string
  onSearchQueryChange: (value: string) => void
  searchField: AdminUserSearchField
  onSearchFieldChange: (field: AdminUserSearchField) => void
  statusFilter: string
  onStatusChange: (value: string) => void
  levelFilter: string
  onLevelChange: (value: string) => void
  createdFrom: string
  onCreatedFromChange: (val: string) => void
  createdTo: string
  onCreatedToChange: (val: string) => void
  birthDateFrom: string
  onBirthDateFromChange: (val: string) => void
  birthDateTo: string
  onBirthDateToChange: (val: string) => void
  onReset: () => void
  totalFiltered: number
  totalCount: number
}

const SEARCH_FIELD_LABELS: Record<AdminUserSearchField, { label: string; short: string; placeholder: string; icon: React.ComponentType<{ size?: number; className?: string; weight?: "bold" | "fill" | "regular" }> }> = {
  ALL: {
    label: "Todos os campos",
    short: "Geral",
    placeholder: "Buscar por nome, e-mail, login, CPF/CNPJ ou 0x...",
    icon: MagnifyingGlass,
  },
  name: {
    label: "Nome Completo",
    short: "Nome",
    placeholder: "Digitar nome do associado...",
    icon: User,
  },
  email: {
    label: "E-mail",
    short: "E-mail",
    placeholder: "Digitar e-mail cadastrado...",
    icon: EnvelopeSimple,
  },
  login: {
    label: "Login (@handle / #ID)",
    short: "Login",
    placeholder: "Digitar login ou ID (ex: RCT77599 ou #77599)...",
    icon: IdentificationCard,
  },
  document: {
    label: "Documento (CPF/CNPJ)",
    short: "Documento",
    placeholder: "Digitar número do CPF ou CNPJ...",
    icon: IdentificationCard,
  },
  phone: {
    label: "Telefone",
    short: "Telefone",
    placeholder: "Digitar número de telefone...",
    icon: Phone,
  },
  wallet: {
    label: "Endereço 0x (Carteira)",
    short: "Endereço 0x",
    placeholder: "Digitar endereço 0x ou hash Fireblocks...",
    icon: Wallet,
  },
}

const STATUS_FILTER_OPTIONS: SelectOption[] = [
  { value: "ALL", label: "Status: Todos" },
  { value: "CONFIRMADO", label: "Confirmado" },
  { value: "PENDENTE", label: "Pendente" },
  { value: "EM_ANALISE", label: "Em Análise" },
  { value: "BLOQUEADO", label: "Bloqueado" },
]

const LEVEL_FILTER_OPTIONS: SelectOption[] = [
  { value: "ALL", label: "Level: Todos" },
  { value: "BRONZE", label: "Bronze" },
  { value: "PRATA", label: "Prata" },
  { value: "OURO", label: "Ouro" },
  { value: "BLACK", label: "Black" },
  { value: "DIAMANTE", label: "Diamante" },
  { value: "PATRONO", label: "Patrono" },
]

export function AdminUsersFilterBar({
  searchQuery,
  onSearchQueryChange,
  searchField,
  onSearchFieldChange,
  statusFilter,
  onStatusChange,
  levelFilter,
  onLevelChange,
  createdFrom,
  onCreatedFromChange,
  createdTo,
  onCreatedToChange,
  birthDateFrom,
  onBirthDateFromChange,
  birthDateTo,
  onBirthDateToChange,
  onReset,
  totalFiltered,
  totalCount,
}: AdminUsersFilterBarProps): React.JSX.Element {
  const [fieldDropdownOpen, setFieldDropdownOpen] = React.useState(false)
  const [createdPopoverOpen, setCreatedPopoverOpen] = React.useState(false)
  const [birthPopoverOpen, setBirthPopoverOpen] = React.useState(false)
  const [moreFiltersOpen, setMoreFiltersOpen] = React.useState(false)

  const barRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (barRef.current && !barRef.current.contains(event.target as Node)) {
        setFieldDropdownOpen(false)
        setCreatedPopoverOpen(false)
        setBirthPopoverOpen(false)
        setMoreFiltersOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const currentFieldConfig = SEARCH_FIELD_LABELS[searchField] || SEARCH_FIELD_LABELS.ALL
  const FieldIcon = currentFieldConfig.icon

  const hasActiveFilters =
    Boolean(searchQuery) ||
    searchField !== "ALL" ||
    statusFilter !== "ALL" ||
    levelFilter !== "ALL" ||
    Boolean(createdFrom) ||
    Boolean(createdTo) ||
    Boolean(birthDateFrom) ||
    Boolean(birthDateTo)

  const formatDisplayDate = (d?: string) => {
    if (!d) return ""
    if (/^\d{4}-\d{2}-\d{2}$/.test(d)) {
      const [year, month, day] = d.split("-")
      return `${day}/${month}/${year.slice(2)}`
    }
    return d
  }

  const createdLabel =
    createdFrom || createdTo
      ? `${formatDisplayDate(createdFrom) || "Início"} a ${formatDisplayDate(createdTo) || "Hoje"}`
      : "Qualquer data"

  const birthLabel =
    birthDateFrom || birthDateTo
      ? `${formatDisplayDate(birthDateFrom) || "Início"} a ${formatDisplayDate(birthDateTo) || "Hoje"}`
      : "Qualquer data"

  return (
    <div ref={barRef} className="space-y-3 w-full">
      {/* Pill Search Filter Bar (ClubKey / Portal Style) */}
      <div className="relative z-30 w-full bg-white dark:bg-[#141416] rounded-full shadow-xl border border-zinc-200 dark:border-zinc-800 p-1.5 sm:p-2 transition-all">
        <div className="flex items-center justify-between w-full gap-1 sm:gap-2">
          {/* Segment 1: Search Field Target Dropdown */}
          <div className="relative shrink-0">
            <button
              type="button"
              onClick={() => {
                setFieldDropdownOpen((prev) => !prev)
                setCreatedPopoverOpen(false)
                setBirthPopoverOpen(false)
                setMoreFiltersOpen(false)
              }}
              className="flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800/70 transition-colors text-left cursor-pointer"
            >
              <div className="size-7 sm:size-8 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0">
                <FieldIcon size={15} weight="bold" />
              </div>
              <div className="flex flex-col min-w-0 pr-1 hidden sm:flex">
                <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                  Campo
                </span>
                <span className="text-xs font-bold text-zinc-900 dark:text-white truncate max-w-[110px]">
                  {currentFieldConfig.short}
                </span>
              </div>
              <CaretDown
                size={12}
                className={cn(
                  "text-zinc-400 transition-transform duration-200",
                  fieldDropdownOpen && "rotate-180"
                )}
                weight="bold"
              />
            </button>

            {/* Field Dropdown Popover */}
            {fieldDropdownOpen && (
              <div className="absolute left-0 top-full mt-2 w-64 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-[#141416]/95 backdrop-blur-xl shadow-2xl p-1.5 z-50 animate-in fade-in-0 zoom-in-95">
                <div className="px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-100 dark:border-zinc-800 mb-1">
                  Pesquisar por
                </div>
                {(Object.keys(SEARCH_FIELD_LABELS) as AdminUserSearchField[]).map((f) => {
                  const item = SEARCH_FIELD_LABELS[f]
                  const ItemIcon = item.icon
                  const isSelected = searchField === f

                  return (
                    <button
                      key={f}
                      type="button"
                      onClick={() => {
                        onSearchFieldChange(f)
                        setFieldDropdownOpen(false)
                      }}
                      className={cn(
                        "w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer text-left",
                        isSelected
                          ? "bg-zinc-100 dark:bg-zinc-800 text-brand-primary font-bold"
                          : "hover:bg-zinc-50 dark:hover:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <ItemIcon size={14} className={isSelected ? "text-brand-primary" : "text-zinc-400"} />
                        <span>{item.label}</span>
                      </div>
                      {isSelected && <Check size={13} weight="bold" className="text-brand-primary" />}
                    </button>
                  )
                })}
              </div>
            )}
          </div>

          <div className="w-px h-7 bg-zinc-200 dark:border-zinc-800 shrink-0" />

          {/* Segment 2: Text Search Input */}
          <div className="flex-1 flex items-center gap-2 px-2 sm:px-3 min-w-[160px]">
            <div className="flex-1 flex flex-col min-w-0">
              <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 hidden sm:block">
                Termo de Busca
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchQueryChange(e.target.value)}
                placeholder={currentFieldConfig.placeholder}
                className="w-full bg-transparent text-xs sm:text-sm font-semibold text-zinc-900 dark:text-white placeholder:text-zinc-400 placeholder:font-normal focus:outline-none py-0.5"
              />
            </div>
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchQueryChange("")}
                className="size-6 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-700 dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
                title="Limpar texto"
              >
                <X size={13} weight="bold" />
              </button>
            )}
          </div>

          <div className="w-px h-7 bg-zinc-200 dark:bg-zinc-800 shrink-0 hidden md:block" />

          {/* Segment 3: Criado em (De / Até) */}
          <div className="relative shrink-0 hidden md:block">
            <button
              type="button"
              onClick={() => {
                setCreatedPopoverOpen((prev) => !prev)
                setFieldDropdownOpen(false)
                setBirthPopoverOpen(false)
                setMoreFiltersOpen(false)
              }}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800/70 transition-colors text-left cursor-pointer",
                (createdFrom || createdTo) && "bg-brand-primary/5 text-brand-primary"
              )}
            >
              <CalendarBlank size={15} className="text-zinc-400 shrink-0" weight="bold" />
              <div className="flex flex-col min-w-0 pr-1">
                <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                  Criado em
                </span>
                <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 truncate max-w-[130px]">
                  {createdLabel}
                </span>
              </div>
              <CaretDown
                size={11}
                className={cn(
                  "text-zinc-400 transition-transform duration-200",
                  createdPopoverOpen && "rotate-180"
                )}
                weight="bold"
              />
            </button>

            {/* Criado em Popover */}
            {createdPopoverOpen && (
              <div className="absolute right-0 top-full mt-2 w-72 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-[#141416]/95 backdrop-blur-xl shadow-2xl p-4 z-50 animate-in fade-in-0 zoom-in-95 space-y-3">
                <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                    Data de Criação
                  </span>
                  {(createdFrom || createdTo) && (
                    <button
                      type="button"
                      onClick={() => {
                        onCreatedFromChange("")
                        onCreatedToChange("")
                      }}
                      className="text-[11px] text-brand-primary font-bold hover:underline cursor-pointer"
                    >
                      Limpar
                    </button>
                  )}
                </div>

                <div className="space-y-2.5">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                      Criado em (de)
                    </label>
                    <Input
                      type="date"
                      value={createdFrom}
                      onChange={(e) => onCreatedFromChange(e.target.value)}
                      size="sm"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                      Criado em (até)
                    </label>
                    <Input
                      type="date"
                      value={createdTo}
                      onChange={(e) => onCreatedToChange(e.target.value)}
                      size="sm"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="w-px h-7 bg-zinc-200 dark:bg-zinc-800 shrink-0 hidden lg:block" />

          {/* Segment 4: Nascimento (De / Até) */}
          <div className="relative shrink-0 hidden lg:block">
            <button
              type="button"
              onClick={() => {
                setBirthPopoverOpen((prev) => !prev)
                setFieldDropdownOpen(false)
                setCreatedPopoverOpen(false)
                setMoreFiltersOpen(false)
              }}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800/70 transition-colors text-left cursor-pointer",
                (birthDateFrom || birthDateTo) && "bg-brand-primary/5 text-brand-primary"
              )}
            >
              <CalendarBlank size={15} className="text-zinc-400 shrink-0" weight="bold" />
              <div className="flex flex-col min-w-0 pr-1">
                <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                  Nascimento
                </span>
                <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 truncate max-w-[130px]">
                  {birthLabel}
                </span>
              </div>
              <CaretDown
                size={11}
                className={cn(
                  "text-zinc-400 transition-transform duration-200",
                  birthPopoverOpen && "rotate-180"
                )}
                weight="bold"
              />
            </button>

            {/* Nascimento Popover */}
            {birthPopoverOpen && (
              <div className="absolute right-0 top-full mt-2 w-72 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-[#141416]/95 backdrop-blur-xl shadow-2xl p-4 z-50 animate-in fade-in-0 zoom-in-95 space-y-3">
                <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                    Data de Nascimento
                  </span>
                  {(birthDateFrom || birthDateTo) && (
                    <button
                      type="button"
                      onClick={() => {
                        onBirthDateFromChange("")
                        onBirthDateToChange("")
                      }}
                      className="text-[11px] text-brand-primary font-bold hover:underline cursor-pointer"
                    >
                      Limpar
                    </button>
                  )}
                </div>

                <div className="space-y-2.5">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                      Nascimento (de)
                    </label>
                    <Input
                      type="date"
                      value={birthDateFrom}
                      onChange={(e) => onBirthDateFromChange(e.target.value)}
                      size="sm"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                      Nascimento (até)
                    </label>
                    <Input
                      type="date"
                      value={birthDateTo}
                      onChange={(e) => onBirthDateToChange(e.target.value)}
                      size="sm"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="w-px h-7 bg-zinc-200 dark:bg-zinc-800 shrink-0 hidden xl:block" />

          {/* Segment 5: Status & Level Filter Popover Trigger */}
          <div className="relative shrink-0 hidden xl:block">
            <button
              type="button"
              onClick={() => {
                setMoreFiltersOpen((prev) => !prev)
                setFieldDropdownOpen(false)
                setCreatedPopoverOpen(false)
                setBirthPopoverOpen(false)
              }}
              className={cn(
                "flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800/70 transition-colors text-left cursor-pointer",
                (statusFilter !== "ALL" || levelFilter !== "ALL") && "bg-brand-primary/10 text-brand-primary"
              )}
            >
              <SlidersHorizontal size={15} className="text-zinc-400 shrink-0" weight="bold" />
              <div className="flex flex-col min-w-0 pr-1">
                <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                  Filtros
                </span>
                <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 truncate max-w-[120px]">
                  {statusFilter !== "ALL" || levelFilter !== "ALL"
                    ? [statusFilter !== "ALL" && statusFilter, levelFilter !== "ALL" && levelFilter].filter(Boolean).join(" • ")
                    : "Status & Level"}
                </span>
              </div>
              <CaretDown
                size={11}
                className={cn(
                  "text-zinc-400 transition-transform duration-200",
                  moreFiltersOpen && "rotate-180"
                )}
                weight="bold"
              />
            </button>

            {/* Status & Level Popover */}
            {moreFiltersOpen && (
              <div className="absolute right-0 top-full mt-2 w-72 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-[#141416]/95 backdrop-blur-xl shadow-2xl p-4 z-50 animate-in fade-in-0 zoom-in-95 space-y-3">
                <div className="flex items-center justify-between border-b border-zinc-100 dark:border-zinc-800 pb-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                    Status & Nível
                  </span>
                  {(statusFilter !== "ALL" || levelFilter !== "ALL") && (
                    <button
                      type="button"
                      onClick={() => {
                        onStatusChange("ALL")
                        onLevelChange("ALL")
                      }}
                      className="text-[11px] text-brand-primary font-bold hover:underline cursor-pointer"
                    >
                      Restaurar
                    </button>
                  )}
                </div>

                <div className="space-y-3">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                      Status da Conta
                    </label>
                    <Select
                      options={STATUS_FILTER_OPTIONS}
                      value={statusFilter}
                      onValueChange={onStatusChange}
                      size="sm"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                      Level do Usuário
                    </label>
                    <Select
                      options={LEVEL_FILTER_OPTIONS}
                      value={levelFilter}
                      onValueChange={onLevelChange}
                      size="sm"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Circular Search Action Button */}
          <button
            type="button"
            className="size-10 sm:size-11 rounded-full bg-brand-primary hover:bg-brand-primary/90 text-white flex items-center justify-center shadow-md transition-all hover:scale-105 active:scale-95 shrink-0 ml-1 cursor-pointer"
            title="Pesquisar usuários"
          >
            <MagnifyingGlass size={18} weight="bold" />
          </button>
        </div>
      </div>

      {/* Mobile Date & Status Quick Buttons Row (only on smaller screens) */}
      <div className="flex xl:hidden items-center gap-2 flex-wrap">
        {/* Status Dropdown */}
        <div className="w-36">
          <Select
            options={STATUS_FILTER_OPTIONS}
            value={statusFilter}
            onValueChange={onStatusChange}
            size="sm"
          />
        </div>

        {/* Level Dropdown */}
        <div className="w-36">
          <Select
            options={LEVEL_FILTER_OPTIONS}
            value={levelFilter}
            onValueChange={onLevelChange}
            size="sm"
          />
        </div>

        {/* Date Filters Popover Button for Mobile */}
        <div className="relative md:hidden">
          <button
            type="button"
            onClick={() => setCreatedPopoverOpen((p) => !p)}
            className="h-9 px-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-semibold text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5 cursor-pointer"
          >
            <CalendarBlank size={14} className="text-brand-primary" />
            <span>Datas</span>
          </button>
        </div>
      </div>

      {/* Active Filter Chips & Counter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
        <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
          <Funnel size={14} className="text-brand-primary shrink-0" weight="bold" />
          <span>
            Exibindo <strong className="text-zinc-900 dark:text-white font-bold">{totalFiltered}</strong> de{" "}
            <strong className="text-zinc-900 dark:text-white font-bold">{totalCount}</strong> associados
          </span>
        </div>

        {hasActiveFilters && (
          <div className="flex items-center gap-2 flex-wrap">
            {/* Active Chip: Target Field */}
            {searchField !== "ALL" && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                <span>Campo: {currentFieldConfig.short}</span>
                <button
                  type="button"
                  onClick={() => onSearchFieldChange("ALL")}
                  className="hover:text-red-500 transition-colors"
                >
                  <X size={10} weight="bold" />
                </button>
              </span>
            )}

            {/* Active Chip: Dates */}
            {(createdFrom || createdTo) && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-brand-primary/10 text-brand-primary border border-brand-primary/20">
                <span>Criado: {createdLabel}</span>
                <button
                  type="button"
                  onClick={() => {
                    onCreatedFromChange("")
                    onCreatedToChange("")
                  }}
                  className="hover:text-red-500 transition-colors"
                >
                  <X size={10} weight="bold" />
                </button>
              </span>
            )}

            {(birthDateFrom || birthDateTo) && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-brand-primary/10 text-brand-primary border border-brand-primary/20">
                <span>Nascimento: {birthLabel}</span>
                <button
                  type="button"
                  onClick={() => {
                    onBirthDateFromChange("")
                    onBirthDateToChange("")
                  }}
                  className="hover:text-red-500 transition-colors"
                >
                  <X size={10} weight="bold" />
                </button>
              </span>
            )}

            {statusFilter !== "ALL" && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                <span>Status: {statusFilter}</span>
                <button
                  type="button"
                  onClick={() => onStatusChange("ALL")}
                  className="hover:text-red-500 transition-colors"
                >
                  <X size={10} weight="bold" />
                </button>
              </span>
            )}

            {levelFilter !== "ALL" && (
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700">
                <span>Level: {levelFilter}</span>
                <button
                  type="button"
                  onClick={() => onLevelChange("ALL")}
                  className="hover:text-red-500 transition-colors"
                >
                  <X size={10} weight="bold" />
                </button>
              </span>
            )}

            {/* Clear All Button */}
            <CtaButton
              type="button"
              variant="outline"
              size="xs"
              onClick={onReset}
              className="text-xs ml-1"
            >
              <ArrowClockwise size={12} weight="bold" />
              <span>Limpar Tudo</span>
            </CtaButton>
          </div>
        )}
      </div>
    </div>
  )
}
