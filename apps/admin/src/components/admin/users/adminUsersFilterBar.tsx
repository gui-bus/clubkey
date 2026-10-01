"use client"

import * as React from "react"

import {
  CtaButton,
  DatePicker,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  type SelectOption,
} from "@clubkey/ui"
import { cn } from "@clubkey/utils"
import {
  ArrowClockwise,
  CalendarBlank,
  CaretDown,
  Check,
  EnvelopeSimple,
  IdentificationCard,
  MagnifyingGlass,
  Phone,
  SlidersHorizontal,
  User,
  Wallet,
  X,
} from "@phosphor-icons/react"

export type AdminUserSearchField =
  "ALL" | "name" | "email" | "login" | "document" | "phone" | "wallet"

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
}

const SEARCH_FIELD_LABELS: Record<
  AdminUserSearchField,
  {
    label: string
    short: string
    placeholder: string
    icon: React.ComponentType<{
      size?: number
      className?: string
      weight?: "bold" | "fill" | "regular"
    }>
  }
> = {
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
}: AdminUsersFilterBarProps): React.JSX.Element {
  const [fieldOpenMobile, setFieldOpenMobile] = React.useState(false)
  const [fieldOpenDesktop, setFieldOpenDesktop] = React.useState(false)

  const [createdOpenMobile, setCreatedOpenMobile] = React.useState(false)
  const [createdOpenDesktop, setCreatedOpenDesktop] = React.useState(false)

  const [birthOpenMobile, setBirthOpenMobile] = React.useState(false)
  const [birthOpenDesktop, setBirthOpenDesktop] = React.useState(false)

  const [filtersOpenMobile, setFiltersOpenMobile] = React.useState(false)
  const [filtersOpenDesktop, setFiltersOpenDesktop] = React.useState(false)

  const currentFieldConfig =
    SEARCH_FIELD_LABELS[searchField] || SEARCH_FIELD_LABELS.ALL
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

  const renderFieldList = (closeFn: () => void) => (
    <div className="space-y-1">
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
              closeFn()
            }}
            className={cn(
              "w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer text-left",
              isSelected
                ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white font-bold"
                : "hover:bg-zinc-50 dark:hover:bg-zinc-800/60 text-zinc-700 dark:text-zinc-300"
            )}
          >
            <div className="flex items-center gap-2">
              <ItemIcon
                size={14}
                className={
                  isSelected ? "text-zinc-900 dark:text-white" : "text-zinc-400"
                }
              />
              <span>{item.label}</span>
            </div>
            {isSelected && (
              <Check
                size={13}
                weight="bold"
                className="text-zinc-900 dark:text-white"
              />
            )}
          </button>
        )
      })}
    </div>
  )

  const parseStringToDate = (val?: string): Date | undefined => {
    if (!val) return undefined
    if (/^\d{4}-\d{2}-\d{2}$/.test(val)) {
      const [y, m, d] = val.split("-").map(Number)
      return new Date(y, m - 1, d)
    }
    const timestamp = Date.parse(val)
    return isNaN(timestamp) ? undefined : new Date(timestamp)
  }

  const formatDateToString = (date?: Date): string => {
    if (!date) return ""
    const y = date.getFullYear()
    const m = String(date.getMonth() + 1).padStart(2, "0")
    const d = String(date.getDate()).padStart(2, "0")
    return `${y}-${m}-${d}`
  }

  const renderCreatedForm = () => (
    <div className="space-y-3 text-left">
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
            className="text-[11px] text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white font-bold hover:underline cursor-pointer"
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
          <DatePicker
            mode="single"
            locale="pt-BR"
            placeholder="Data inicial"
            value={parseStringToDate(createdFrom)}
            onChange={(d) => onCreatedFromChange(formatDateToString(d))}
            isClearable
            variant="flat"
            className="w-full max-w-full"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
            Criado em (até)
          </label>
          <DatePicker
            mode="single"
            locale="pt-BR"
            placeholder="Data final"
            value={parseStringToDate(createdTo)}
            onChange={(d) => onCreatedToChange(formatDateToString(d))}
            isClearable
            variant="flat"
            className="w-full max-w-full"
          />
        </div>
      </div>
    </div>
  )

  const renderBirthForm = () => (
    <div className="space-y-3 text-left">
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
            className="text-[11px] text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white font-bold hover:underline cursor-pointer"
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
          <DatePicker
            mode="single"
            locale="pt-BR"
            placeholder="Data inicial"
            value={parseStringToDate(birthDateFrom)}
            onChange={(d) => onBirthDateFromChange(formatDateToString(d))}
            isClearable
            variant="flat"
            className="w-full max-w-full"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
            Nascimento (até)
          </label>
          <DatePicker
            mode="single"
            locale="pt-BR"
            placeholder="Data final"
            value={parseStringToDate(birthDateTo)}
            onChange={(d) => onBirthDateToChange(formatDateToString(d))}
            isClearable
            variant="flat"
            className="w-full max-w-full"
          />
        </div>
      </div>
    </div>
  )

  const renderFiltersForm = () => (
    <div className="space-y-3 text-left">
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
            className="text-[11px] text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white font-bold hover:underline cursor-pointer"
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
  )

  return (
    <div className="space-y-3 w-full">
      
      <div className="relative z-30 w-full bg-white dark:bg-[#141416] rounded-2xl xl:rounded-full border border-zinc-200/80 dark:border-zinc-800 p-3 sm:p-3.5 xl:p-2">
        
        
        
        <div className="block xl:hidden space-y-2.5 text-left">
          
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
            
            <div className="sm:col-span-4">
              <Popover open={fieldOpenMobile} onOpenChange={setFieldOpenMobile}>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className="w-full flex items-center justify-between p-2.5 rounded-xl bg-zinc-100/90 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/80 hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors text-left cursor-pointer min-w-0"
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <div className="size-7 rounded-lg bg-zinc-200/60 dark:bg-zinc-700/60 text-zinc-700 dark:text-zinc-200 flex items-center justify-center shrink-0">
                        <FieldIcon size={16} weight="bold" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                          Campo de Busca
                        </span>
                        <span className="text-xs font-semibold text-zinc-900 dark:text-white truncate">
                          {currentFieldConfig.short}
                        </span>
                      </div>
                    </div>
                    <CaretDown
                      size={14}
                      className={cn(
                        "text-zinc-400 shrink-0 transition-transform duration-200 ml-1",
                        fieldOpenMobile && "rotate-180"
                      )}
                    />
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  align="start"
                  sideOffset={8}
                  collisionPadding={16}
                  showCloseButton={false}
                  className="w-64 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-[#141416]/95 backdrop-blur-xl shadow-2xl p-1.5 z-50"
                >
                  {renderFieldList(() => setFieldOpenMobile(false))}
                </PopoverContent>
              </Popover>
            </div>

            
            <div className="sm:col-span-8 flex items-center gap-2.5 p-2.5 rounded-xl bg-zinc-100/90 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/80">
              <div className="size-7 rounded-lg bg-zinc-200/60 dark:bg-zinc-700/60 text-zinc-600 dark:text-zinc-300 flex items-center justify-center shrink-0">
                <MagnifyingGlass size={16} weight="bold" />
              </div>
              <div className="flex-1 flex flex-col min-w-0">
                <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  Termo de Busca
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchQueryChange(e.target.value)}
                  placeholder={currentFieldConfig.placeholder}
                  className="w-full bg-transparent text-xs font-semibold text-zinc-900 dark:text-white placeholder:text-zinc-400 placeholder:font-normal focus:outline-none truncate"
                />
              </div>
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => onSearchQueryChange("")}
                  className="text-zinc-400 hover:text-zinc-700 dark:hover:text-white p-1 cursor-pointer shrink-0"
                  title="Limpar texto"
                >
                  <X size={14} weight="bold" />
                </button>
              )}
            </div>
          </div>

          
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            
            <div>
              <Popover
                open={createdOpenMobile}
                onOpenChange={setCreatedOpenMobile}
              >
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className="w-full flex items-center justify-between p-2.5 rounded-xl bg-zinc-100/90 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/80 hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors text-left cursor-pointer min-w-0"
                  >
                    <div className="flex items-center gap-2 truncate min-w-0">
                      <div className="size-7 rounded-lg bg-zinc-200/60 dark:bg-zinc-700/60 text-zinc-700 dark:text-zinc-200 flex items-center justify-center shrink-0">
                        <CalendarBlank size={16} weight="bold" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                          Criado em
                        </span>
                        <span className="text-xs font-semibold text-zinc-900 dark:text-white truncate">
                          {createdLabel}
                        </span>
                      </div>
                    </div>
                    <CaretDown
                      size={14}
                      className={cn(
                        "text-zinc-400 shrink-0 transition-transform duration-200 ml-1",
                        createdOpenMobile && "rotate-180"
                      )}
                    />
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  align="start"
                  sideOffset={8}
                  collisionPadding={16}
                  showCloseButton={false}
                  className="w-72 sm:w-80 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-[#141416]/95 backdrop-blur-xl shadow-2xl p-4 z-50"
                >
                  {renderCreatedForm()}
                </PopoverContent>
              </Popover>
            </div>

            
            <div>
              <Popover open={birthOpenMobile} onOpenChange={setBirthOpenMobile}>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className="w-full flex items-center justify-between p-2.5 rounded-xl bg-zinc-100/90 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/80 hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors text-left cursor-pointer min-w-0"
                  >
                    <div className="flex items-center gap-2 truncate min-w-0">
                      <div className="size-7 rounded-lg bg-zinc-200/60 dark:bg-zinc-700/60 text-zinc-700 dark:text-zinc-200 flex items-center justify-center shrink-0">
                        <CalendarBlank size={16} weight="bold" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                          Nascimento
                        </span>
                        <span className="text-xs font-semibold text-zinc-900 dark:text-white truncate">
                          {birthLabel}
                        </span>
                      </div>
                    </div>
                    <CaretDown
                      size={14}
                      className={cn(
                        "text-zinc-400 shrink-0 transition-transform duration-200 ml-1",
                        birthOpenMobile && "rotate-180"
                      )}
                    />
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  align="center"
                  sideOffset={8}
                  collisionPadding={16}
                  showCloseButton={false}
                  className="w-72 sm:w-80 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-[#141416]/95 backdrop-blur-xl shadow-2xl p-4 z-50"
                >
                  {renderBirthForm()}
                </PopoverContent>
              </Popover>
            </div>

            
            <div>
              <Popover
                open={filtersOpenMobile}
                onOpenChange={setFiltersOpenMobile}
              >
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className="w-full flex items-center justify-between p-2.5 rounded-xl bg-zinc-100/90 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/80 hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors text-left cursor-pointer min-w-0"
                  >
                    <div className="flex items-center gap-2 truncate min-w-0">
                      <div className="size-7 rounded-lg bg-zinc-200/60 dark:bg-zinc-700/60 text-zinc-700 dark:text-zinc-200 flex items-center justify-center shrink-0">
                        <SlidersHorizontal size={16} weight="bold" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                          Filtros
                        </span>
                        <span className="text-xs font-semibold text-zinc-900 dark:text-white truncate">
                          {statusFilter !== "ALL" || levelFilter !== "ALL"
                            ? [
                                statusFilter !== "ALL" && statusFilter,
                                levelFilter !== "ALL" && levelFilter,
                              ]
                                .filter(Boolean)
                                .join(" • ")
                            : "Status & Level"}
                        </span>
                      </div>
                    </div>
                    <CaretDown
                      size={14}
                      className={cn(
                        "text-zinc-400 shrink-0 transition-transform duration-200 ml-1",
                        filtersOpenMobile && "rotate-180"
                      )}
                    />
                  </button>
                </PopoverTrigger>
                <PopoverContent
                  align="end"
                  sideOffset={8}
                  collisionPadding={16}
                  showCloseButton={false}
                  className="w-72 sm:w-80 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-[#141416]/95 backdrop-blur-xl shadow-2xl p-4 z-50"
                >
                  {renderFiltersForm()}
                </PopoverContent>
              </Popover>
            </div>

            
            <div className="flex items-center">
              <CtaButton
                type="button"
                variant="primary"
                size="sm"
                isFullWidth
                className="h-full min-h-[46px] rounded-xl text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <MagnifyingGlass size={16} weight="bold" />
                <span>BUSCAR</span>
              </CtaButton>
            </div>
          </div>
        </div>

        
        
        
        <div className="hidden xl:flex items-center justify-between w-full gap-1.5 2xl:gap-2">
          
          <div className="shrink min-w-0">
            <Popover open={fieldOpenDesktop} onOpenChange={setFieldOpenDesktop}>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800/70 transition-colors text-left cursor-pointer min-w-0"
                >
                  <div className="size-8 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 flex items-center justify-center shrink-0">
                    <FieldIcon size={16} weight="bold" />
                  </div>
                  <div className="flex flex-col min-w-0 pr-1">
                    <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                      Campo
                    </span>
                    <span className="text-xs font-bold text-zinc-900 dark:text-white truncate max-w-[85px] 2xl:max-w-[110px]">
                      {currentFieldConfig.short}
                    </span>
                  </div>
                  <CaretDown
                    size={12}
                    className={cn(
                      "text-zinc-400 shrink-0 transition-transform duration-200",
                      fieldOpenDesktop && "rotate-180"
                    )}
                    weight="bold"
                  />
                </button>
              </PopoverTrigger>
              <PopoverContent
                align="start"
                sideOffset={8}
                collisionPadding={16}
                showCloseButton={false}
                className="w-64 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-[#141416]/95 backdrop-blur-xl shadow-2xl p-1.5 z-50"
              >
                {renderFieldList(() => setFieldOpenDesktop(false))}
              </PopoverContent>
            </Popover>
          </div>

          <div className="w-px h-7 bg-zinc-200 dark:bg-zinc-800 shrink-0" />

          
          <div className="flex-1 flex items-center gap-2 px-2.5 min-w-0">
            <div className="flex-1 flex flex-col min-w-0">
              <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                Termo de Busca
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchQueryChange(e.target.value)}
                placeholder={currentFieldConfig.placeholder}
                className="w-full bg-transparent text-xs 2xl:text-sm font-semibold text-zinc-900 dark:text-white placeholder:text-zinc-400 placeholder:font-normal focus:outline-none py-0.5 truncate"
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

          <div className="w-px h-7 bg-zinc-200 dark:bg-zinc-800 shrink-0" />

          
          <div className="shrink min-w-0">
            <Popover
              open={createdOpenDesktop}
              onOpenChange={setCreatedOpenDesktop}
            >
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800/70 transition-colors text-left cursor-pointer min-w-0"
                >
                  <div className="size-8 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 flex items-center justify-center shrink-0">
                    <CalendarBlank size={16} weight="bold" />
                  </div>
                  <div className="flex flex-col min-w-0 pr-1">
                    <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                      Criado em
                    </span>
                    <span className="text-xs font-bold text-zinc-900 dark:text-white truncate max-w-[95px] 2xl:max-w-[130px]">
                      {createdLabel}
                    </span>
                  </div>
                  <CaretDown
                    size={11}
                    className={cn(
                      "text-zinc-400 shrink-0 transition-transform duration-200",
                      createdOpenDesktop && "rotate-180"
                    )}
                    weight="bold"
                  />
                </button>
              </PopoverTrigger>
              <PopoverContent
                align="center"
                sideOffset={8}
                collisionPadding={16}
                showCloseButton={false}
                className="w-72 sm:w-80 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-[#141416]/95 backdrop-blur-xl shadow-2xl p-4 z-50"
              >
                {renderCreatedForm()}
              </PopoverContent>
            </Popover>
          </div>

          <div className="w-px h-7 bg-zinc-200 dark:bg-zinc-800 shrink-0" />

          
          <div className="shrink min-w-0">
            <Popover open={birthOpenDesktop} onOpenChange={setBirthOpenDesktop}>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800/70 transition-colors text-left cursor-pointer min-w-0"
                >
                  <div className="size-8 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 flex items-center justify-center shrink-0">
                    <CalendarBlank size={16} weight="bold" />
                  </div>
                  <div className="flex flex-col min-w-0 pr-1">
                    <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                      Nascimento
                    </span>
                    <span className="text-xs font-bold text-zinc-900 dark:text-white truncate max-w-[95px] 2xl:max-w-[130px]">
                      {birthLabel}
                    </span>
                  </div>
                  <CaretDown
                    size={11}
                    className={cn(
                      "text-zinc-400 shrink-0 transition-transform duration-200",
                      birthOpenDesktop && "rotate-180"
                    )}
                    weight="bold"
                  />
                </button>
              </PopoverTrigger>
              <PopoverContent
                align="center"
                sideOffset={8}
                collisionPadding={16}
                showCloseButton={false}
                className="w-72 sm:w-80 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-[#141416]/95 backdrop-blur-xl shadow-2xl p-4 z-50"
              >
                {renderBirthForm()}
              </PopoverContent>
            </Popover>
          </div>

          <div className="w-px h-7 bg-zinc-200 dark:bg-zinc-800 shrink-0" />

          
          <div className="shrink min-w-0">
            <Popover
              open={filtersOpenDesktop}
              onOpenChange={setFiltersOpenDesktop}
            >
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800/70 transition-colors text-left cursor-pointer min-w-0"
                >
                  <div className="size-8 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 flex items-center justify-center shrink-0">
                    <SlidersHorizontal size={16} weight="bold" />
                  </div>
                  <div className="flex flex-col min-w-0 pr-1">
                    <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                      Filtros
                    </span>
                    <span className="text-xs font-bold text-zinc-900 dark:text-white truncate max-w-[85px] 2xl:max-w-[120px]">
                      {statusFilter !== "ALL" || levelFilter !== "ALL"
                        ? [
                            statusFilter !== "ALL" && statusFilter,
                            levelFilter !== "ALL" && levelFilter,
                          ]
                            .filter(Boolean)
                            .join(" • ")
                        : "Status & Level"}
                    </span>
                  </div>
                  <CaretDown
                    size={11}
                    className={cn(
                      "text-zinc-400 shrink-0 transition-transform duration-200",
                      filtersOpenDesktop && "rotate-180"
                    )}
                    weight="bold"
                  />
                </button>
              </PopoverTrigger>
              <PopoverContent
                align="end"
                sideOffset={8}
                collisionPadding={16}
                showCloseButton={false}
                className="w-72 sm:w-80 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-[#141416]/95 backdrop-blur-xl shadow-2xl p-4 z-50"
              >
                {renderFiltersForm()}
              </PopoverContent>
            </Popover>
          </div>

          
          <button
            type="button"
            className="size-10 2xl:size-11 rounded-full bg-brand-primary hover:bg-brand-primary/90 text-white flex items-center justify-center shadow-md transition-all hover:scale-105 active:scale-95 shrink-0 ml-0.5 cursor-pointer"
            title="Pesquisar usuários"
          >
            <MagnifyingGlass size={18} weight="bold" />
          </button>
        </div>
      </div>

      
      {hasActiveFilters && (
        <div className="flex items-center justify-center gap-2 flex-wrap pt-2 text-center">
          
          {searchField !== "ALL" && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white dark:bg-[#141416] text-zinc-800 dark:text-zinc-200 border border-zinc-200/90 dark:border-zinc-800 shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Campo:
              </span>
              <span className="font-semibold text-zinc-900 dark:text-white">
                {currentFieldConfig.short}
              </span>
              <button
                type="button"
                onClick={() => onSearchFieldChange("ALL")}
                className="text-zinc-400 hover:text-zinc-700 dark:hover:text-white transition-colors ml-0.5 cursor-pointer flex items-center"
                title="Remover filtro"
              >
                <X size={12} weight="bold" />
              </button>
            </span>
          )}

          
          {(createdFrom || createdTo) && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white dark:bg-[#141416] text-zinc-800 dark:text-zinc-200 border border-zinc-200/90 dark:border-zinc-800 shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Criado:
              </span>
              <span className="font-semibold text-zinc-900 dark:text-white">
                {createdLabel}
              </span>
              <button
                type="button"
                onClick={() => {
                  onCreatedFromChange("")
                  onCreatedToChange("")
                }}
                className="text-zinc-400 hover:text-zinc-700 dark:hover:text-white transition-colors ml-0.5 cursor-pointer flex items-center"
                title="Remover filtro"
              >
                <X size={12} weight="bold" />
              </button>
            </span>
          )}

          {(birthDateFrom || birthDateTo) && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white dark:bg-[#141416] text-zinc-800 dark:text-zinc-200 border border-zinc-200/90 dark:border-zinc-800 shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Nascimento:
              </span>
              <span className="font-semibold text-zinc-900 dark:text-white">
                {birthLabel}
              </span>
              <button
                type="button"
                onClick={() => {
                  onBirthDateFromChange("")
                  onBirthDateToChange("")
                }}
                className="text-zinc-400 hover:text-zinc-700 dark:hover:text-white transition-colors ml-0.5 cursor-pointer flex items-center"
                title="Remover filtro"
              >
                <X size={12} weight="bold" />
              </button>
            </span>
          )}

          {statusFilter !== "ALL" && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white dark:bg-[#141416] text-zinc-800 dark:text-zinc-200 border border-zinc-200/90 dark:border-zinc-800 shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Status:
              </span>
              <span className="font-semibold text-zinc-900 dark:text-white">
                {statusFilter}
              </span>
              <button
                type="button"
                onClick={() => onStatusChange("ALL")}
                className="text-zinc-400 hover:text-zinc-700 dark:hover:text-white transition-colors ml-0.5 cursor-pointer flex items-center"
                title="Remover filtro"
              >
                <X size={12} weight="bold" />
              </button>
            </span>
          )}

          {levelFilter !== "ALL" && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white dark:bg-[#141416] text-zinc-800 dark:text-zinc-200 border border-zinc-200/90 dark:border-zinc-800 shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Level:
              </span>
              <span className="font-semibold text-zinc-900 dark:text-white">
                {levelFilter}
              </span>
              <button
                type="button"
                onClick={() => onLevelChange("ALL")}
                className="text-zinc-400 hover:text-zinc-700 dark:hover:text-white transition-colors ml-0.5 cursor-pointer flex items-center"
                title="Remover filtro"
              >
                <X size={12} weight="bold" />
              </button>
            </span>
          )}

          
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white dark:bg-[#141416] hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-200 border border-zinc-200/90 dark:border-zinc-800 shadow-sm transition-colors cursor-pointer"
          >
            <ArrowClockwise size={12} weight="bold" />
            <span>Limpar Tudo</span>
          </button>
        </div>
      )}
    </div>
  )
}
