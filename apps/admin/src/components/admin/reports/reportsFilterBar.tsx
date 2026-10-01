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
  Database,
  FileText,
  MagnifyingGlass,
  Tag,
  X,
} from "@phosphor-icons/react"

export type ReportSearchField = "ALL" | "title" | "tag" | "source"

export interface ReportsFilterBarProps {
  searchQuery: string
  onSearchQueryChange: (value: string) => void
  searchField: ReportSearchField
  onSearchFieldChange: (field: ReportSearchField) => void
  categoryFilter: string
  onCategoryChange: (value: string) => void
  blockFilter: string
  onBlockChange: (value: string) => void
  onReset: () => void
}

const SEARCH_FIELD_LABELS: Record<
  ReportSearchField,
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
    placeholder: "Buscar por título, módulo, tag ou fonte...",
    icon: MagnifyingGlass,
  },
  title: {
    label: "Título do Relatório",
    short: "Título",
    placeholder: "Digitar título do relatório...",
    icon: FileText,
  },
  tag: {
    label: "Módulo / Tag",
    short: "Módulo",
    placeholder: "Digitar tag (ex: Auditoria, Tokens, Keys)...",
    icon: Tag,
  },
  source: {
    label: "Fonte de Dados",
    short: "Fonte",
    placeholder: "Digitar fonte de dados...",
    icon: Database,
  },
}

const CATEGORY_FILTER_OPTIONS: SelectOption[] = [
  { value: "ALL", label: "Todas as categorias" },
  { value: "OPERACIONAIS", label: "Relatórios Operacionais" },
  { value: "FISCAL_DECRIPTO", label: "Fiscal / DeCripto" },
]

const BLOCK_FILTER_OPTIONS: SelectOption[] = [
  { value: "ALL", label: "Todos os blocos" },
  { value: "PLATAFORMA", label: "Bloco A — Plataforma" },
  { value: "WORKSPACE", label: "Bloco B — Workspaces" },
  { value: "FISCAL", label: "Módulo Fiscal" },
]

export function ReportsFilterBar({
  searchQuery,
  onSearchQueryChange,
  searchField,
  onSearchFieldChange,
  categoryFilter,
  onCategoryChange,
  blockFilter,
  onBlockChange,
  onReset,
}: ReportsFilterBarProps): React.JSX.Element {
  const [fieldOpenMobile, setFieldOpenMobile] = React.useState(false)
  const [fieldOpenDesktop, setFieldOpenDesktop] = React.useState(false)

  const [categoryOpenMobile, setCategoryOpenMobile] = React.useState(false)
  const [categoryOpenDesktop, setCategoryOpenDesktop] = React.useState(false)

  const [blockOpenMobile, setBlockOpenMobile] = React.useState(false)
  const [blockOpenDesktop, setBlockOpenDesktop] = React.useState(false)

  const currentFieldConfig =
    SEARCH_FIELD_LABELS[searchField] || SEARCH_FIELD_LABELS.ALL
  const FieldIcon = currentFieldConfig.icon

  const hasActiveFilters =
    Boolean(searchQuery) ||
    searchField !== "ALL" ||
    categoryFilter !== "ALL" ||
    blockFilter !== "ALL"

  const categoryLabel =
    categoryFilter !== "ALL"
      ? CATEGORY_FILTER_OPTIONS.find((o) => o.value === categoryFilter)?.label || "Categoria"
      : "Todas as Categorias"

  const blockLabel =
    blockFilter !== "ALL"
      ? BLOCK_FILTER_OPTIONS.find((o) => o.value === blockFilter)?.label || "Bloco"
      : "Todos os Blocos"

  const renderFieldList = (closeFn: () => void) => (
    <div className="space-y-1">
      <div className="px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400 border-b border-zinc-100 dark:border-zinc-800 mb-1">
        Pesquisar por
      </div>
      {(Object.keys(SEARCH_FIELD_LABELS) as ReportSearchField[]).map((f) => {
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
            {isSelected && <Check size={14} className="text-brand-primary" />}
          </button>
        )
      })}
    </div>
  )

  const renderCategoryForm = () => (
    <div className="space-y-3.5">
      <div className="space-y-1">
        <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          Categoria do Relatório
        </label>
        <Select
          options={CATEGORY_FILTER_OPTIONS}
          value={categoryFilter}
          onValueChange={(val) => onCategoryChange(val as string)}
          size="sm"
        />
      </div>
    </div>
  )

  const renderBlockForm = () => (
    <div className="space-y-3.5">
      <div className="space-y-1">
        <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
          Escopo / Bloco
        </label>
        <Select
          options={BLOCK_FILTER_OPTIONS}
          value={blockFilter}
          onValueChange={(val) => onBlockChange(val as string)}
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

            <div className="sm:col-span-8">
              <div className="flex items-center gap-2 p-2 rounded-xl bg-zinc-100/90 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/80 focus-within:border-zinc-400 dark:focus-within:border-zinc-500 transition-colors">
                <div className="flex-1 flex flex-col min-w-0 px-1">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                    Termo de Busca
                  </span>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => onSearchQueryChange(e.target.value)}
                    placeholder={currentFieldConfig.placeholder}
                    className="w-full bg-transparent border-none outline-none text-xs font-medium text-zinc-900 dark:text-white placeholder:text-zinc-400 placeholder:text-xs"
                  />
                </div>
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => onSearchQueryChange("")}
                    className="text-zinc-400 hover:text-zinc-700 dark:hover:text-white p-1 cursor-pointer"
                    title="Limpar busca"
                  >
                    <X size={14} weight="bold" />
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div>
              <Popover
                open={categoryOpenMobile}
                onOpenChange={setCategoryOpenMobile}
              >
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className="w-full flex items-center justify-between p-2.5 rounded-xl bg-zinc-100/90 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/80 hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors text-left cursor-pointer min-w-0"
                  >
                    <div className="flex items-center gap-2 truncate min-w-0">
                      <div className="size-7 rounded-lg bg-zinc-200/60 dark:bg-zinc-700/60 text-zinc-700 dark:text-zinc-200 flex items-center justify-center shrink-0">
                        <FileText size={16} weight="bold" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                          Categoria
                        </span>
                        <span className="text-xs font-semibold text-zinc-900 dark:text-white truncate">
                          {categoryLabel}
                        </span>
                      </div>
                    </div>
                    <CaretDown
                      size={14}
                      className={cn(
                        "text-zinc-400 shrink-0 transition-transform duration-200 ml-1",
                        categoryOpenMobile && "rotate-180"
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
                  {renderCategoryForm()}
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <Popover
                open={blockOpenMobile}
                onOpenChange={setBlockOpenMobile}
              >
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
                          Bloco
                        </span>
                        <span className="text-xs font-semibold text-zinc-900 dark:text-white truncate">
                          {blockLabel}
                        </span>
                      </div>
                    </div>
                    <CaretDown
                      size={14}
                      className={cn(
                        "text-zinc-400 shrink-0 transition-transform duration-200 ml-1",
                        blockOpenMobile && "rotate-180"
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
                  {renderBlockForm()}
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
                className="w-full bg-transparent border-none outline-none text-xs sm:text-sm font-semibold text-zinc-900 dark:text-white placeholder:text-zinc-400 placeholder:font-normal placeholder:text-xs"
              />
            </div>
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchQueryChange("")}
                className="text-zinc-400 hover:text-zinc-700 dark:hover:text-white p-1 cursor-pointer"
                title="Limpar busca"
              >
                <X size={14} weight="bold" />
              </button>
            )}
          </div>

          <div className="w-px h-7 bg-zinc-200 dark:bg-zinc-800 shrink-0" />

          <div className="shrink min-w-0">
            <Popover
              open={categoryOpenDesktop}
              onOpenChange={setCategoryOpenDesktop}
            >
              <PopoverTrigger asChild>
                <button
                  type="button"
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800/70 transition-colors text-left cursor-pointer min-w-0"
                >
                  <div className="size-8 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 flex items-center justify-center shrink-0">
                    <FileText size={16} weight="bold" />
                  </div>
                  <div className="flex flex-col min-w-0 pr-1">
                    <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
                      Categoria
                    </span>
                    <span className="text-xs font-bold text-zinc-900 dark:text-white truncate max-w-[100px] 2xl:max-w-[130px]">
                      {categoryLabel}
                    </span>
                  </div>
                  <CaretDown
                    size={12}
                    className={cn(
                      "text-zinc-400 shrink-0 transition-transform duration-200",
                      categoryOpenDesktop && "rotate-180"
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
                {renderCategoryForm()}
              </PopoverContent>
            </Popover>
          </div>

          <div className="w-px h-7 bg-zinc-200 dark:bg-zinc-800 shrink-0" />

          <div className="shrink min-w-0">
            <Popover
              open={blockOpenDesktop}
              onOpenChange={setBlockOpenDesktop}
            >
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
                      Bloco
                    </span>
                    <span className="text-xs font-bold text-zinc-900 dark:text-white truncate max-w-[100px] 2xl:max-w-[130px]">
                      {blockLabel}
                    </span>
                  </div>
                  <CaretDown
                    size={12}
                    className={cn(
                      "text-zinc-400 shrink-0 transition-transform duration-200",
                      blockOpenDesktop && "rotate-180"
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
                {renderBlockForm()}
              </PopoverContent>
            </Popover>
          </div>

          <button
            type="button"
            className="size-10 2xl:size-11 rounded-full bg-brand-primary hover:bg-brand-primary/90 text-white flex items-center justify-center shadow-md transition-all hover:scale-105 active:scale-95 shrink-0 ml-0.5 cursor-pointer"
            title="Pesquisar relatórios"
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

          {categoryFilter !== "ALL" && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white dark:bg-[#141416] text-zinc-800 dark:text-zinc-200 border border-zinc-200/90 dark:border-zinc-800 shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Categoria:
              </span>
              <span className="font-semibold text-zinc-900 dark:text-white">
                {categoryFilter === "OPERACIONAIS" ? "Operacionais" : "Fiscal / DeCripto"}
              </span>
              <button
                type="button"
                onClick={() => onCategoryChange("ALL")}
                className="text-zinc-400 hover:text-zinc-700 dark:hover:text-white transition-colors ml-0.5 cursor-pointer flex items-center"
                title="Remover filtro"
              >
                <X size={12} weight="bold" />
              </button>
            </span>
          )}

          {blockFilter !== "ALL" && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white dark:bg-[#141416] text-zinc-800 dark:text-zinc-200 border border-zinc-200/90 dark:border-zinc-800 shadow-sm">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Bloco:
              </span>
              <span className="font-semibold text-zinc-900 dark:text-white">
                {blockFilter === "PLATAFORMA"
                  ? "Bloco A (Plataforma)"
                  : blockFilter === "WORKSPACE"
                    ? "Bloco B (Workspaces)"
                    : "Fiscal"}
              </span>
              <button
                type="button"
                onClick={() => onBlockChange("ALL")}
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
