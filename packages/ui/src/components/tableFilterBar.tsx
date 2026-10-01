"use client"

import * as React from "react"

import { CtaButton } from "./ctaButton"
import { DatePicker } from "./ui/datePicker/datePicker"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover/popover"
import { Select } from "./ui/select/select"
import { cn } from "../lib/utils"
import {
  ArrowClockwise,
  CaretDown,
  Check,
  MagnifyingGlass,
  X,
} from "@phosphor-icons/react"

export interface TableSearchFieldOption {
  value: string
  label: string
  short: string
  placeholder: string
  icon: React.ComponentType<{
    size?: number
    className?: string
    weight?: "bold" | "fill" | "regular"
  }>
}

export interface TableFilterSelectField {
  type: "select"
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  options: { value: string; label: string }[]
  defaultValue?: string
  chipLabel?: string
  formatDisplayValue?: (value: string) => string
}

export interface TableFilterDateField {
  type: "date-range"
  id: string
  label: string
  dateFrom?: string | Date
  dateTo?: string | Date
  onDateFromChange: (val: string) => void
  onDateToChange: (val: string) => void
  fromLabel?: string
  toLabel?: string
  chipLabel?: string
}

export type TableFilterFormField = TableFilterSelectField | TableFilterDateField

export interface TableFilterSection {
  id: string
  label: string
  icon: React.ComponentType<{
    size?: number
    className?: string
    weight?: "bold" | "fill" | "regular"
  }>
  displayValue: string
  fields: TableFilterFormField[]
  align?: "start" | "center" | "end"
}

export interface TableFilterBarProps {
  searchQuery?: string
  onSearchQueryChange?: (query: string) => void
  searchLabel?: string
  searchPlaceholder?: string
  searchFields?: TableSearchFieldOption[]
  selectedSearchField?: string
  onSearchFieldChange?: (field: string) => void
  sections?: TableFilterSection[]
  onReset?: () => void
  onAction?: () => void
  onRefresh?: () => void
  isRefreshing?: boolean
  actionIcon?: React.ComponentType<{
    size?: number
    className?: string
    weight?: "bold" | "fill" | "regular"
  }>
  actionTitle?: string
  actionLabel?: string
  className?: string
}

function parseStringToDate(str?: string | Date): Date | undefined {
  if (!str) return undefined
  if (str instanceof Date) return str
  if (typeof str === "string" && /^\d{4}-\d{2}-\d{2}/.test(str)) {
    const [year, month, day] = str.split("T")[0].split("-").map(Number)
    return new Date(year, month - 1, day)
  }
  return undefined
}

function formatDateToString(d?: Date): string {
  if (!d) return ""
  const year = d.getFullYear()
  const month = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

function formatDisplayDate(d?: string | Date): string {
  if (!d) return ""
  if (d instanceof Date) {
    return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${String(d.getFullYear()).slice(2)}`
  }
  if (typeof d === "string" && /^\d{4}-\d{2}-\d{2}/.test(d)) {
    const [year, month, day] = d.split("T")[0].split("-")
    return `${day}/${month}/${year.slice(2)}`
  }
  return String(d)
}

export function TableFilterBar({
  searchQuery = "",
  onSearchQueryChange,
  searchLabel = "Termo de Busca",
  searchPlaceholder,
  searchFields,
  selectedSearchField = "ALL",
  onSearchFieldChange,
  sections = [],
  onReset,
  onAction,
  onRefresh,
  isRefreshing = false,
  actionIcon,
  actionTitle = "Pesquisar",
  actionLabel = "BUSCAR",
  className,
}: TableFilterBarProps): React.JSX.Element {
  const [searchFieldOpenDesktop, setSearchFieldOpenDesktop] = React.useState(false)
  const [searchFieldOpenMobile, setSearchFieldOpenMobile] = React.useState(false)
  const [openSectionsDesktop, setOpenSectionsDesktop] = React.useState<Record<string, boolean>>({})
  const [openSectionsMobile, setOpenSectionsMobile] = React.useState<Record<string, boolean>>({})

  const currentFieldConfig = React.useMemo(() => {
    if (!searchFields || searchFields.length === 0) return null
    return (
      searchFields.find((f) => f.value === selectedSearchField) ||
      searchFields[0]
    )
  }, [searchFields, selectedSearchField])

  const effectiveSearchPlaceholder =
    currentFieldConfig?.placeholder || searchPlaceholder || "Buscar..."

  const effectiveSearchLabel =
    currentFieldConfig?.short || searchLabel

  const ActionIcon = actionIcon || (onRefresh ? ArrowClockwise : MagnifyingGlass)

  const activeChips = React.useMemo(() => {
    const chips: {
      id: string
      label: string
      value: string
      onRemove: () => void
    }[] = []

    if (searchFields && selectedSearchField !== "ALL" && currentFieldConfig) {
      chips.push({
        id: "searchField",
        label: "Campo",
        value: currentFieldConfig.short || currentFieldConfig.label,
        onRemove: () => onSearchFieldChange?.("ALL"),
      })
    }

    if (searchQuery.trim().length > 0) {
      chips.push({
        id: "searchQuery",
        label: "Busca",
        value: `“${searchQuery}”`,
        onRemove: () => onSearchQueryChange?.(""),
      })
    }

    for (const section of sections) {
      for (const field of section.fields) {
        if (field.type === "select") {
          const defaultVal = field.defaultValue || "ALL"
          if (field.value !== defaultVal) {
            const opt = field.options.find((o) => o.value === field.value)
            const displayVal = field.formatDisplayValue
              ? field.formatDisplayValue(field.value)
              : opt?.label?.replace(/^Status (Admin|Stay): /, "") || field.value
            chips.push({
              id: field.id,
              label: field.chipLabel || field.label,
              value: displayVal,
              onRemove: () => field.onChange(defaultVal),
            })
          }
        } else if (field.type === "date-range") {
          if (field.dateFrom || field.dateTo) {
            const from = formatDisplayDate(field.dateFrom)
            const to = formatDisplayDate(field.dateTo)
            const dateText =
              from && to ? `${from} a ${to}` : from ? `A partir de ${from}` : `Até ${to}`
            chips.push({
              id: field.id,
              label: field.chipLabel || field.label,
              value: dateText,
              onRemove: () => {
                field.onDateFromChange("")
                field.onDateToChange("")
              },
            })
          }
        }
      }
    }

    return chips
  }, [
    searchFields,
    selectedSearchField,
    currentFieldConfig,
    searchQuery,
    sections,
    onSearchFieldChange,
    onSearchQueryChange,
  ])

  const hasActiveFilters = activeChips.length > 0

  const toggleSectionDesktop = (id: string, open: boolean) => {
    setOpenSectionsDesktop((prev) => ({ ...prev, [id]: open }))
  }

  const toggleSectionMobile = (id: string, open: boolean) => {
    setOpenSectionsMobile((prev) => ({ ...prev, [id]: open }))
  }

  const renderSearchFieldList = (closeFn: () => void) => (
    <div className="space-y-1">
      <div className="px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-100 dark:border-zinc-800 mb-1">
        Pesquisar por
      </div>
      {searchFields?.map((item) => {
        const ItemIcon = item.icon
        const isSelected = selectedSearchField === item.value

        return (
          <button
            key={item.value}
            type="button"
            onClick={() => {
              onSearchFieldChange?.(item.value)
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
            {isSelected && <Check size={14} className="text-brand-primary" />}
          </button>
        )
      })}
    </div>
  )

  const renderSectionForm = (section: TableFilterSection) => (
    <div className="space-y-3.5">
      {section.fields.map((field) => {
        if (field.type === "select") {
          return (
            <div key={field.id} className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                {field.label}
              </label>
              <Select
                options={field.options}
                value={field.value}
                onValueChange={(val) => field.onChange(val as string)}
                size="sm"
              />
            </div>
          )
        }

        if (field.type === "date-range") {
          return (
            <div key={field.id} className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                {field.label}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <span className="text-[9px] text-zinc-400 font-medium">
                    {field.fromLabel || "De"}
                  </span>
                  <DatePicker
                    value={parseStringToDate(field.dateFrom)}
                    onChange={(d: Date | undefined) =>
                      field.onDateFromChange(formatDateToString(d))
                    }
                    placeholder="Início"
                    className="w-full text-xs"
                  />
                </div>
                <div className="space-y-1">
                  <span className="text-[9px] text-zinc-400 font-medium">
                    {field.toLabel || "Até"}
                  </span>
                  <DatePicker
                    value={parseStringToDate(field.dateTo)}
                    onChange={(d: Date | undefined) =>
                      field.onDateToChange(formatDateToString(d))
                    }
                    placeholder="Fim"
                    className="w-full text-xs"
                  />
                </div>
              </div>
              {(field.dateFrom || field.dateTo) && (
                <button
                  type="button"
                  onClick={() => {
                    field.onDateFromChange("")
                    field.onDateToChange("")
                  }}
                  className="text-[10px] text-rose-500 hover:text-rose-600 dark:text-rose-400 font-semibold cursor-pointer underline pt-0.5"
                >
                  Limpar período
                </button>
              )}
            </div>
          )
        }

        return null
      })}
    </div>
  )

  const handleActionClick = () => {
    if (onRefresh) {
      onRefresh()
    } else if (onAction) {
      onAction()
    }
  }

  return (
    <div className={cn("space-y-3 w-full", className)}>
      <div className="relative z-30 w-full bg-white dark:bg-[#141416] rounded-2xl xl:rounded-full border border-zinc-200/80 dark:border-zinc-800 p-3 sm:p-3.5 xl:p-2">
        <div className="block xl:hidden space-y-2.5 text-left">
          {searchFields && searchFields.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
              <div className="sm:col-span-4">
                <Popover
                  open={searchFieldOpenMobile}
                  onOpenChange={setSearchFieldOpenMobile}
                >
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      className="w-full flex items-center justify-between p-2.5 rounded-xl bg-zinc-100/90 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/80 hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors text-left cursor-pointer min-w-0"
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <div className="size-7 rounded-lg bg-zinc-200/60 dark:bg-zinc-700/60 text-zinc-700 dark:text-zinc-200 flex items-center justify-center shrink-0">
                          {currentFieldConfig?.icon ? (
                            <currentFieldConfig.icon size={16} weight="bold" />
                          ) : (
                            <MagnifyingGlass size={16} weight="bold" />
                          )}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                            Campo de Busca
                          </span>
                          <span className="text-xs font-semibold text-zinc-900 dark:text-white truncate">
                            {currentFieldConfig?.short}
                          </span>
                        </div>
                      </div>
                      <CaretDown
                        size={14}
                        className={cn(
                          "text-zinc-400 shrink-0 transition-transform duration-200 ml-1",
                          searchFieldOpenMobile && "rotate-180"
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
                    {renderSearchFieldList(() => setSearchFieldOpenMobile(false))}
                  </PopoverContent>
                </Popover>
              </div>

              <div className="sm:col-span-8">
                <div className="flex items-center gap-2 p-2 rounded-xl bg-zinc-100/90 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/80 focus-within:border-zinc-400 dark:focus-within:border-zinc-500 transition-colors">
                  <div className="flex-1 flex flex-col min-w-0 px-1">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                      {effectiveSearchLabel}
                    </span>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => onSearchQueryChange?.(e.target.value)}
                      placeholder={effectiveSearchPlaceholder}
                      className="w-full bg-transparent border-none outline-none text-xs font-medium text-zinc-900 dark:text-white placeholder:text-zinc-400 placeholder:text-xs"
                    />
                  </div>
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => onSearchQueryChange?.("")}
                      className="text-zinc-400 hover:text-zinc-700 dark:hover:text-white p-1 cursor-pointer"
                      title="Limpar busca"
                    >
                      <X size={14} weight="bold" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ) : null}

          {sections.length > 0 ? (
            <div
              className={cn(
                "grid gap-2",
                sections.length === 1
                  ? "grid-cols-1 sm:grid-cols-2"
                  : sections.length === 2
                    ? "grid-cols-1 sm:grid-cols-3"
                    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
              )}
            >
              {sections.map((section) => {
                const Icon = section.icon
                const isOpen = Boolean(openSectionsMobile[section.id])

                return (
                  <div key={section.id}>
                    <Popover
                      open={isOpen}
                      onOpenChange={(op) => toggleSectionMobile(section.id, op)}
                    >
                      <PopoverTrigger asChild>
                        <button
                          type="button"
                          className="w-full flex items-center justify-between p-2.5 rounded-xl bg-zinc-100/90 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/80 hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors text-left cursor-pointer min-w-0"
                        >
                          <div className="flex items-center gap-2 truncate min-w-0">
                            <div className="size-7 rounded-lg bg-zinc-200/60 dark:bg-zinc-700/60 text-zinc-700 dark:text-zinc-200 flex items-center justify-center shrink-0">
                              <Icon size={16} weight="bold" />
                            </div>
                            <div className="flex flex-col min-w-0">
                              <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                                {section.label}
                              </span>
                              <span className="text-xs font-semibold text-zinc-900 dark:text-white truncate">
                                {section.displayValue}
                              </span>
                            </div>
                          </div>
                          <CaretDown
                            size={14}
                            className={cn(
                              "text-zinc-400 shrink-0 transition-transform duration-200 ml-1",
                              isOpen && "rotate-180"
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
                        {renderSectionForm(section)}
                      </PopoverContent>
                    </Popover>
                  </div>
                )
              })}

              {!searchFields && (
                <div className="col-span-full sm:col-span-1">
                  <div className="flex items-center gap-2 p-2 rounded-xl bg-zinc-100/90 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/80 focus-within:border-zinc-400 dark:focus-within:border-zinc-500 transition-colors">
                    <div className="flex-1 flex flex-col min-w-0 px-1">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                        {effectiveSearchLabel}
                      </span>
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => onSearchQueryChange?.(e.target.value)}
                        placeholder={effectiveSearchPlaceholder}
                        className="w-full bg-transparent border-none outline-none text-xs font-medium text-zinc-900 dark:text-white placeholder:text-zinc-400 placeholder:text-xs"
                      />
                    </div>
                    {searchQuery && (
                      <button
                        type="button"
                        onClick={() => onSearchQueryChange?.("")}
                        className="text-zinc-400 hover:text-zinc-700 dark:hover:text-white p-1 cursor-pointer"
                        title="Limpar busca"
                      >
                        <X size={14} weight="bold" />
                      </button>
                    )}
                  </div>
                </div>
              )}

              <div className="flex items-center">
                <CtaButton
                  type="button"
                  variant="primary"
                  size="sm"
                  isFullWidth
                  onClick={handleActionClick}
                  className="h-full min-h-[46px] rounded-xl text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-2 shadow-md cursor-pointer"
                >
                  <ActionIcon
                    size={16}
                    weight="bold"
                    className={cn(isRefreshing && "animate-spin")}
                  />
                  <span>{actionLabel}</span>
                </CtaButton>
              </div>
            </div>
          ) : (
            <div className="flex items-center">
              <CtaButton
                type="button"
                variant="primary"
                size="sm"
                isFullWidth
                onClick={handleActionClick}
                className="h-full min-h-[46px] rounded-xl text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <ActionIcon
                  size={16}
                  weight="bold"
                  className={cn(isRefreshing && "animate-spin")}
                />
                <span>{actionLabel}</span>
              </CtaButton>
            </div>
          )}
        </div>

        <div className="hidden xl:flex items-center justify-between w-full gap-1.5 2xl:gap-2">
          {sections.map((section) => {
            const Icon = section.icon
            const isOpen = Boolean(openSectionsDesktop[section.id])

            return (
              <React.Fragment key={section.id}>
                <div className="shrink min-w-0">
                  <Popover
                    open={isOpen}
                    onOpenChange={(op) => toggleSectionDesktop(section.id, op)}
                  >
                    <PopoverTrigger asChild>
                      <button
                        type="button"
                        className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800/70 transition-colors text-left cursor-pointer min-w-0"
                      >
                        <div className="size-8 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 flex items-center justify-center shrink-0">
                          <Icon size={16} weight="bold" />
                        </div>
                        <div className="flex flex-col min-w-0 pr-1">
                          <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                            {section.label}
                          </span>
                          <span className="text-xs font-bold text-zinc-900 dark:text-white truncate max-w-[95px] 2xl:max-w-[130px]">
                            {section.displayValue}
                          </span>
                        </div>
                        <CaretDown
                          size={12}
                          className={cn(
                            "text-zinc-400 shrink-0 transition-transform duration-200",
                            isOpen && "rotate-180"
                          )}
                          weight="bold"
                        />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent
                      align={section.align || "center"}
                      sideOffset={8}
                      collisionPadding={16}
                      showCloseButton={false}
                      className="w-72 sm:w-80 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-[#141416]/95 backdrop-blur-xl shadow-2xl p-4 z-50"
                    >
                      {renderSectionForm(section)}
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="w-px h-7 bg-zinc-200 dark:bg-zinc-800 shrink-0" />
              </React.Fragment>
            )
          })}

          {searchFields && searchFields.length > 0 && (
            <>
              <div className="shrink min-w-0">
                <Popover
                  open={searchFieldOpenDesktop}
                  onOpenChange={setSearchFieldOpenDesktop}
                >
                  <PopoverTrigger asChild>
                    <button
                      type="button"
                      className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800/70 transition-colors text-left cursor-pointer min-w-0"
                    >
                      <div className="size-8 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 flex items-center justify-center shrink-0">
                        {currentFieldConfig?.icon ? (
                          <currentFieldConfig.icon size={16} weight="bold" />
                        ) : (
                          <MagnifyingGlass size={16} weight="bold" />
                        )}
                      </div>
                      <div className="flex flex-col min-w-0 pr-1">
                        <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                          Campo
                        </span>
                        <span className="text-xs font-bold text-zinc-900 dark:text-white truncate max-w-[85px] 2xl:max-w-[110px]">
                          {currentFieldConfig?.short}
                        </span>
                      </div>
                      <CaretDown
                        size={12}
                        className={cn(
                          "text-zinc-400 shrink-0 transition-transform duration-200",
                          searchFieldOpenDesktop && "rotate-180"
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
                    {renderSearchFieldList(() => setSearchFieldOpenDesktop(false))}
                  </PopoverContent>
                </Popover>
              </div>

              <div className="w-px h-7 bg-zinc-200 dark:bg-zinc-800 shrink-0" />
            </>
          )}

          <div className="flex-1 flex items-center gap-2 px-2.5 min-w-0">
            <div className="flex-1 flex flex-col min-w-0">
              <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                {effectiveSearchLabel}
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchQueryChange?.(e.target.value)}
                placeholder={effectiveSearchPlaceholder}
                className="w-full bg-transparent border-none outline-none text-xs sm:text-sm font-semibold text-zinc-900 dark:text-white placeholder:text-zinc-400 placeholder:font-normal placeholder:text-xs truncate"
              />
            </div>
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchQueryChange?.("")}
                className="text-zinc-400 hover:text-zinc-700 dark:hover:text-white p-1 cursor-pointer"
                title="Limpar busca"
              >
                <X size={14} weight="bold" />
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={handleActionClick}
            className="size-10 2xl:size-11 rounded-full bg-brand-primary hover:bg-brand-primary/90 text-white flex items-center justify-center shadow-md transition-all hover:scale-105 active:scale-95 shrink-0 ml-0.5 cursor-pointer"
            title={actionTitle}
          >
            <ActionIcon
              size={18}
              weight="bold"
              className={cn(isRefreshing && "animate-spin")}
            />
          </button>
        </div>
      </div>

      {hasActiveFilters && (
        <div className="flex items-center justify-center gap-2 flex-wrap pt-2 text-center">
          {activeChips.map((chip) => (
            <span
              key={chip.id}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white dark:bg-[#141416] text-zinc-800 dark:text-zinc-200 border border-zinc-200/90 dark:border-zinc-800 shadow-sm"
            >
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                {chip.label}:
              </span>
              <span className="font-semibold text-zinc-900 dark:text-white">
                {chip.value}
              </span>
              <button
                type="button"
                onClick={chip.onRemove}
                className="text-zinc-400 hover:text-zinc-700 dark:hover:text-white transition-colors ml-0.5 cursor-pointer flex items-center"
                title="Remover filtro"
              >
                <X size={12} weight="bold" />
              </button>
            </span>
          ))}

          {onReset && (
            <button
              type="button"
              onClick={onReset}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white dark:bg-[#141416] hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-200 border border-zinc-200/90 dark:border-zinc-800 shadow-sm transition-colors cursor-pointer"
            >
              <ArrowClockwise size={12} weight="bold" />
              <span>Limpar Tudo</span>
            </button>
          )}
        </div>
      )}
    </div>
  )
}
