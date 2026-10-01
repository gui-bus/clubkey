"use client"

import * as React from "react"

import {
  CtaButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  type SelectOption,
} from "@clubkey/ui"
import { cn } from "@clubkey/utils"
import {
  ArrowClockwise,
  Buildings,
  CaretDown,
  Check,
  Globe,
  Hash,
  HouseLine,
  MagnifyingGlass,
  MapPin,
  SlidersHorizontal,
  Tag,
  User,
  X,
} from "@phosphor-icons/react"

export type PropertySearchField = "ALL" | "title" | "code" | "host" | "city"

export interface PropertiesFilterBarProps {
  searchQuery: string
  onSearchQueryChange: (value: string) => void
  searchField: PropertySearchField
  onSearchFieldChange: (field: PropertySearchField) => void
  adminStatusFilter: string
  onAdminStatusChange: (value: string) => void
  stayStatusFilter: string
  onStayStatusChange: (value: string) => void
  platformFilter: string
  onPlatformChange: (value: string) => void
  workspaceFilter: string
  onWorkspaceChange: (value: string) => void
  propertyTypeFilter: string
  onPropertyTypeChange: (value: string) => void
  onReset: () => void
}

const SEARCH_FIELD_LABELS: Record<
  PropertySearchField,
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
    placeholder: "Buscar por nome, código (#AF03J), host ou cidade...",
    icon: MagnifyingGlass,
  },
  title: {
    label: "Nome do Imóvel",
    short: "Imóvel",
    placeholder: "Digitar nome do imóvel...",
    icon: HouseLine,
  },
  code: {
    label: "Código / Tag",
    short: "Código",
    placeholder: "Digitar código ou tag (ex: AF03J)...",
    icon: Hash,
  },
  host: {
    label: "Host / Gestora",
    short: "Host",
    placeholder: "Digitar nome do anfitrião/host...",
    icon: User,
  },
  city: {
    label: "Cidade / UF",
    short: "Local",
    placeholder: "Digitar cidade ou UF...",
    icon: MapPin,
  },
}

const ADMIN_STATUS_OPTIONS: SelectOption[] = [
  { value: "ALL", label: "Status Admin: Todos" },
  { value: "ATIVO", label: "Ativo" },
  { value: "INATIVO", label: "Inativo" },
]

const STAY_STATUS_OPTIONS: SelectOption[] = [
  { value: "ALL", label: "Status Stay: Todos" },
  { value: "DISPONIVEL", label: "Disponível para reserva" },
  { value: "OCULTO", label: "Oculto no Stay" },
  { value: "BLOQUEADO", label: "Bloqueado / Manutenção" },
]

const PLATFORM_OPTIONS: SelectOption[] = [
  { value: "ALL", label: "Plataforma: Toda a plataforma" },
  { value: "ClubKey Stay", label: "ClubKey Stay" },
  { value: "Airbnb Sync", label: "Airbnb Sync" },
  { value: "Stays.net", label: "Stays.net" },
]

const WORKSPACE_OPTIONS: SelectOption[] = [
  { value: "ALL", label: "Workspace: Todos" },
  { value: "host-25", label: "Host Gestão Imobiliária (#25)" },
  { value: "host-24", label: "LikeHome Hospedagens (#24)" },
  { value: "host-33", label: "Prime Stay Brasil (#33)" },
  { value: "host-18", label: "Anfitriões do Brasil (#18)" },
  { value: "host-07", label: "Key Stay Corporate (#07)" },
]

const PROPERTY_TYPE_OPTIONS: SelectOption[] = [
  { value: "ALL", label: "Tipo: Todos os tipos" },
  { value: "APARTAMENTO", label: "Apartamento" },
  { value: "CASA", label: "Casa" },
  { value: "VILLA", label: "Villa Exclusiva" },
  { value: "CHALE", label: "Chalé" },
  { value: "STUDIO", label: "Studio" },
  { value: "PENTHOUSE", label: "Penthouse" },
]

export function PropertiesFilterBar({
  searchQuery,
  onSearchQueryChange,
  searchField,
  onSearchFieldChange,
  adminStatusFilter,
  onAdminStatusChange,
  stayStatusFilter,
  onStayStatusChange,
  platformFilter,
  onPlatformChange,
  workspaceFilter,
  onWorkspaceChange,
  propertyTypeFilter,
  onPropertyTypeChange,
  onReset,
}: PropertiesFilterBarProps): React.JSX.Element {
  const [fieldOpenMobile, setFieldOpenMobile] = React.useState(false)
  const [fieldOpenDesktop, setFieldOpenDesktop] = React.useState(false)

  const [statusOpenMobile, setStatusOpenMobile] = React.useState(false)
  const [statusOpenDesktop, setStatusOpenDesktop] = React.useState(false)

  const [platformOpenMobile, setPlatformOpenMobile] = React.useState(false)
  const [platformOpenDesktop, setPlatformOpenDesktop] = React.useState(false)

  const [typeOpenMobile, setTypeOpenMobile] = React.useState(false)
  const [typeOpenDesktop, setTypeOpenDesktop] = React.useState(false)

  const currentFieldConfig =
    SEARCH_FIELD_LABELS[searchField] || SEARCH_FIELD_LABELS.ALL
  const FieldIcon = currentFieldConfig.icon

  const hasActiveFilters =
    Boolean(searchQuery) ||
    searchField !== "ALL" ||
    adminStatusFilter !== "ALL" ||
    stayStatusFilter !== "ALL" ||
    platformFilter !== "ALL" ||
    workspaceFilter !== "ALL" ||
    propertyTypeFilter !== "ALL"

  const statusLabel =
    adminStatusFilter !== "ALL" || stayStatusFilter !== "ALL"
      ? [
          adminStatusFilter !== "ALL" &&
            ADMIN_STATUS_OPTIONS.find(
              (o) => o.value === adminStatusFilter
            )?.label?.replace("Status Admin: ", ""),
          stayStatusFilter !== "ALL" &&
            STAY_STATUS_OPTIONS.find(
              (o) => o.value === stayStatusFilter
            )?.label?.replace("Status Stay: ", ""),
        ]
          .filter(Boolean)
          .join(" • ")
      : "Todos os Status"

  const platformLabel =
    platformFilter !== "ALL" || workspaceFilter !== "ALL"
      ? [
          platformFilter !== "ALL" && platformFilter,
          workspaceFilter !== "ALL" &&
            WORKSPACE_OPTIONS.find((o) => o.value === workspaceFilter)
              ?.label?.split(" (")[0]
              ?.replace("Workspace: ", ""),
        ]
          .filter(Boolean)
          .join(" • ")
      : "Todas as Origens"

  const typeLabel =
    propertyTypeFilter !== "ALL"
      ? PROPERTY_TYPE_OPTIONS.find(
          (o) => o.value === propertyTypeFilter
        )?.label?.replace("Tipo: ", "") || "Tipo"
      : "Todos os Tipos"

  const renderFieldList = (closeFn: () => void) => (
    <div className="space-y-1">
      <div className="px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-100 dark:border-zinc-800 mb-1">
        Pesquisar por
      </div>
      {(Object.keys(SEARCH_FIELD_LABELS) as PropertySearchField[]).map((f) => {
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
              "w-full flex items-center justify-between px-2.5 py-2 rounded-lg text-xs font-medium transition-colors text-left cursor-pointer",
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

  const renderStatusForm = () => (
    <div className="space-y-3.5">
      <div className="space-y-1">
        <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          Ativo no Admin
        </label>
        <Select
          options={ADMIN_STATUS_OPTIONS}
          value={adminStatusFilter}
          onValueChange={(val) => onAdminStatusChange(val as string)}
          size="sm"
        />
      </div>

      <div className="space-y-1">
        <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          Status no Stay
        </label>
        <Select
          options={STAY_STATUS_OPTIONS}
          value={stayStatusFilter}
          onValueChange={(val) => onStayStatusChange(val as string)}
          size="sm"
        />
      </div>
    </div>
  )

  const renderPlatformForm = () => (
    <div className="space-y-3.5">
      <div className="space-y-1">
        <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          Plataforma / Canal
        </label>
        <Select
          options={PLATFORM_OPTIONS}
          value={platformFilter}
          onValueChange={(val) => onPlatformChange(val as string)}
          size="sm"
        />
      </div>

      <div className="space-y-1">
        <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          Workspace / Host
        </label>
        <Select
          options={WORKSPACE_OPTIONS}
          value={workspaceFilter}
          onValueChange={(val) => onWorkspaceChange(val as string)}
          size="sm"
        />
      </div>
    </div>
  )

  const renderTypeForm = () => (
    <div className="space-y-3.5">
      <div className="space-y-1">
        <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          Categoria do Imóvel
        </label>
        <Select
          options={PROPERTY_TYPE_OPTIONS}
          value={propertyTypeFilter}
          onValueChange={(val) => onPropertyTypeChange(val as string)}
          size="sm"
        />
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
                open={statusOpenMobile}
                onOpenChange={setStatusOpenMobile}
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
                          Status
                        </span>
                        <span className="text-xs font-semibold text-zinc-900 dark:text-white truncate">
                          {statusLabel}
                        </span>
                      </div>
                    </div>
                    <CaretDown
                      size={14}
                      className={cn(
                        "text-zinc-400 shrink-0 transition-transform duration-200 ml-1",
                        statusOpenMobile && "rotate-180"
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
                  {renderStatusForm()}
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Popover
                open={platformOpenMobile}
                onOpenChange={setPlatformOpenMobile}
              >
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className="w-full flex items-center justify-between p-2.5 rounded-xl bg-zinc-100/90 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/80 hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors text-left cursor-pointer min-w-0"
                  >
                    <div className="flex items-center gap-2 truncate min-w-0">
                      <div className="size-7 rounded-lg bg-zinc-200/60 dark:bg-zinc-700/60 text-zinc-700 dark:text-zinc-200 flex items-center justify-center shrink-0">
                        <Globe size={16} weight="bold" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                          Origem
                        </span>
                        <span className="text-xs font-semibold text-zinc-900 dark:text-white truncate">
                          {platformLabel}
                        </span>
                      </div>
                    </div>
                    <CaretDown
                      size={14}
                      className={cn(
                        "text-zinc-400 shrink-0 transition-transform duration-200 ml-1",
                        platformOpenMobile && "rotate-180"
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
                  {renderPlatformForm()}
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Popover open={typeOpenMobile} onOpenChange={setTypeOpenMobile}>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className="w-full flex items-center justify-between p-2.5 rounded-xl bg-zinc-100/90 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/80 hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors text-left cursor-pointer min-w-0"
                  >
                    <div className="flex items-center gap-2 truncate min-w-0">
                      <div className="size-7 rounded-lg bg-zinc-200/60 dark:bg-zinc-700/60 text-zinc-700 dark:text-zinc-200 flex items-center justify-center shrink-0">
                        <Buildings size={16} weight="bold" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                          Tipo
                        </span>
                        <span className="text-xs font-semibold text-zinc-900 dark:text-white truncate">
                          {typeLabel}
                        </span>
                      </div>
                    </div>
                    <CaretDown
                      size={14}
                      className={cn(
                        "text-zinc-400 shrink-0 transition-transform duration-200 ml-1",
                        typeOpenMobile && "rotate-180"
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
                  {renderTypeForm()}
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
              open={statusOpenDesktop}
              onOpenChange={setStatusOpenDesktop}
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
                      Status
                    </span>
                    <span className="text-xs font-bold text-zinc-900 dark:text-white truncate max-w-[95px] 2xl:max-w-[130px]">
                      {statusLabel}
                    </span>
                  </div>
                  <CaretDown
                    size={11}
                    className={cn(
                      "text-zinc-400 shrink-0 transition-transform duration-200",
                      statusOpenDesktop && "rotate-180"
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
                {renderStatusForm()}
              </PopoverContent>
            </Popover>
          </div>

          <div className="w-px h-7 bg-zinc-200 dark:bg-zinc-800 shrink-0" />

          <div className="shrink min-w-0">
            <Popover
              open={platformOpenDesktop}
              onOpenChange={setPlatformOpenDesktop}
            >
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800/70 transition-colors text-left cursor-pointer min-w-0"
                >
                  <div className="size-8 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 flex items-center justify-center shrink-0">
                    <Globe size={16} weight="bold" />
                  </div>
                  <div className="flex flex-col min-w-0 pr-1">
                    <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                      Origem
                    </span>
                    <span className="text-xs font-bold text-zinc-900 dark:text-white truncate max-w-[95px] 2xl:max-w-[130px]">
                      {platformLabel}
                    </span>
                  </div>
                  <CaretDown
                    size={11}
                    className={cn(
                      "text-zinc-400 shrink-0 transition-transform duration-200",
                      platformOpenDesktop && "rotate-180"
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
                {renderPlatformForm()}
              </PopoverContent>
            </Popover>
          </div>

          <div className="w-px h-7 bg-zinc-200 dark:bg-zinc-800 shrink-0" />

          <div className="shrink min-w-0">
            <Popover open={typeOpenDesktop} onOpenChange={setTypeOpenDesktop}>
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800/70 transition-colors text-left cursor-pointer min-w-0"
                >
                  <div className="size-8 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 flex items-center justify-center shrink-0">
                    <Buildings size={16} weight="bold" />
                  </div>
                  <div className="flex flex-col min-w-0 pr-1">
                    <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                      Tipo
                    </span>
                    <span className="text-xs font-bold text-zinc-900 dark:text-white truncate max-w-[85px] 2xl:max-w-[120px]">
                      {typeLabel}
                    </span>
                  </div>
                  <CaretDown
                    size={11}
                    className={cn(
                      "text-zinc-400 shrink-0 transition-transform duration-200",
                      typeOpenDesktop && "rotate-180"
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
                {renderTypeForm()}
              </PopoverContent>
            </Popover>
          </div>

          <button
            type="button"
            className="size-10 2xl:size-11 rounded-full bg-brand-primary hover:bg-brand-primary/90 text-white flex items-center justify-center shadow-md transition-all hover:scale-105 active:scale-95 shrink-0 ml-0.5 cursor-pointer"
            title="Pesquisar imóveis"
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

          {searchQuery && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white dark:bg-[#141416] text-zinc-800 dark:text-zinc-200 border border-zinc-200/90 dark:border-zinc-800 shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Busca:
              </span>
              <span className="font-semibold text-zinc-900 dark:text-white">
                &ldquo;{searchQuery}&rdquo;
              </span>
              <button
                type="button"
                onClick={() => onSearchQueryChange("")}
                className="text-zinc-400 hover:text-zinc-700 dark:hover:text-white transition-colors ml-0.5 cursor-pointer flex items-center"
                title="Remover filtro"
              >
                <X size={12} weight="bold" />
              </button>
            </span>
          )}

          {adminStatusFilter !== "ALL" && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white dark:bg-[#141416] text-zinc-800 dark:text-zinc-200 border border-zinc-200/90 dark:border-zinc-800 shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Admin:
              </span>
              <span className="font-semibold text-zinc-900 dark:text-white">
                {ADMIN_STATUS_OPTIONS.find(
                  (o) => o.value === adminStatusFilter
                )?.label?.replace("Status Admin: ", "")}
              </span>
              <button
                type="button"
                onClick={() => onAdminStatusChange("ALL")}
                className="text-zinc-400 hover:text-zinc-700 dark:hover:text-white transition-colors ml-0.5 cursor-pointer flex items-center"
                title="Remover filtro"
              >
                <X size={12} weight="bold" />
              </button>
            </span>
          )}

          {stayStatusFilter !== "ALL" && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white dark:bg-[#141416] text-zinc-800 dark:text-zinc-200 border border-zinc-200/90 dark:border-zinc-800 shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Stay:
              </span>
              <span className="font-semibold text-zinc-900 dark:text-white">
                {STAY_STATUS_OPTIONS.find(
                  (o) => o.value === stayStatusFilter
                )?.label?.replace("Status Stay: ", "")}
              </span>
              <button
                type="button"
                onClick={() => onStayStatusChange("ALL")}
                className="text-zinc-400 hover:text-zinc-700 dark:hover:text-white transition-colors ml-0.5 cursor-pointer flex items-center"
                title="Remover filtro"
              >
                <X size={12} weight="bold" />
              </button>
            </span>
          )}

          {platformFilter !== "ALL" && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white dark:bg-[#141416] text-zinc-800 dark:text-zinc-200 border border-zinc-200/90 dark:border-zinc-800 shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Plataforma:
              </span>
              <span className="font-semibold text-zinc-900 dark:text-white">
                {platformFilter}
              </span>
              <button
                type="button"
                onClick={() => onPlatformChange("ALL")}
                className="text-zinc-400 hover:text-zinc-700 dark:hover:text-white transition-colors ml-0.5 cursor-pointer flex items-center"
                title="Remover filtro"
              >
                <X size={12} weight="bold" />
              </button>
            </span>
          )}

          {workspaceFilter !== "ALL" && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white dark:bg-[#141416] text-zinc-800 dark:text-zinc-200 border border-zinc-200/90 dark:border-zinc-800 shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Workspace:
              </span>
              <span className="font-semibold text-zinc-900 dark:text-white">
                {WORKSPACE_OPTIONS.find((o) => o.value === workspaceFilter)
                  ?.label?.split(" (")[0]
                  ?.replace("Workspace: ", "")}
              </span>
              <button
                type="button"
                onClick={() => onWorkspaceChange("ALL")}
                className="text-zinc-400 hover:text-zinc-700 dark:hover:text-white transition-colors ml-0.5 cursor-pointer flex items-center"
                title="Remover filtro"
              >
                <X size={12} weight="bold" />
              </button>
            </span>
          )}

          {propertyTypeFilter !== "ALL" && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white dark:bg-[#141416] text-zinc-800 dark:text-zinc-200 border border-zinc-200/90 dark:border-zinc-800 shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Tipo:
              </span>
              <span className="font-semibold text-zinc-900 dark:text-white">
                {PROPERTY_TYPE_OPTIONS.find(
                  (o) => o.value === propertyTypeFilter
                )?.label?.replace("Tipo: ", "")}
              </span>
              <button
                type="button"
                onClick={() => onPropertyTypeChange("ALL")}
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
