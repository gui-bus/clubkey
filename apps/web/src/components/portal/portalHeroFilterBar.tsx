"use client"

import * as React from "react"

import { CaretDown, type Icon, MagnifyingGlass, X } from "@phosphor-icons/react"

import { CtaButton } from "@/src/components/common/ctaButton"

import { cn } from "@/src/lib/utils"

export interface FilterOption {
  value: string
  label: string
  count?: number
}

export interface PortalHeroFilterBarProps {
  categoryLabel?: string
  categoryIcon?: Icon
  activeCategory: string
  onCategoryChange: (value: string) => void
  categories: FilterOption[]
  searchQuery: string
  onSearchQueryChange: (val: string) => void
  searchPlaceholder: string
  onSearch?: () => void
  className?: string
}

export function PortalHeroFilterBar({
  categoryLabel = "Categoria",
  categoryIcon: CategoryIcon,
  activeCategory,
  onCategoryChange,
  categories,
  searchQuery,
  onSearchQueryChange,
  searchPlaceholder,
  onSearch,
  className,
}: PortalHeroFilterBarProps): React.JSX.Element {
  const [dropdownOpen, setDropdownOpen] = React.useState(false)
  const barRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (barRef.current && !barRef.current.contains(event.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const selectedCategoryLabel =
    categories.find((c) => c.value === activeCategory)?.label || "Todos"

  const handleSearchSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    setDropdownOpen(false)
    if (onSearch) onSearch()
  }

  return (
    <div
      ref={barRef}
      className={cn(
        "relative z-40 w-full max-w-4xl mx-auto bg-white dark:bg-zinc-900 rounded-sm sm:rounded-full shadow-2xl p-2.5 sm:p-2 border border-zinc-200 dark:border-zinc-800 text-left",
        className
      )}
    >
      <div className="w-full flex flex-col gap-2 sm:hidden">
        <div className="relative w-full">
          <button
            type="button"
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="w-full flex items-center justify-between gap-3 p-2.5 rounded-sm bg-[#F1F1F1] dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/80 hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors text-left cursor-pointer"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-sm bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0">
                {CategoryIcon ? (
                  <CategoryIcon className="w-3.5 h-3.5" />
                ) : (
                  <MagnifyingGlass className="w-3.5 h-3.5" />
                )}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  {categoryLabel}
                </span>
                <span className="text-xs font-semibold text-zinc-900 dark:text-white truncate">
                  {selectedCategoryLabel}
                </span>
              </div>
            </div>
            <CaretDown
              className={cn(
                "w-4 h-4 text-zinc-400 shrink-0 transition-transform duration-200",
                dropdownOpen && "rotate-180"
              )}
            />
          </button>

          {dropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-zinc-900 rounded-sm shadow-2xl border border-zinc-200 dark:border-zinc-800 z-[100] overflow-hidden">
              <div className="max-h-60 overflow-y-auto divide-y divide-zinc-100 dark:divide-zinc-800">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => {
                      onCategoryChange(cat.value)
                      setDropdownOpen(false)
                    }}
                    className={cn(
                      "w-full px-4 py-2.5 flex items-center justify-between hover:bg-[#F1F1F1] dark:hover:bg-zinc-800 transition-colors text-xs font-medium cursor-pointer text-left",
                      activeCategory === cat.value
                        ? "text-brand-primary font-bold bg-brand-primary/5"
                        : "text-zinc-800 dark:text-zinc-200"
                    )}
                  >
                    <span>{cat.label}</span>
                    {typeof cat.count === "number" && (
                      <span className="text-[10px] text-zinc-400 dark:text-zinc-500">
                        {cat.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="relative w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
            placeholder={searchPlaceholder}
            className="w-full pl-3.5 pr-9 py-2.5 rounded-sm bg-[#F1F1F1] dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/80 text-xs text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-brand-primary"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchQueryChange("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <CtaButton
          type="button"
          onClick={() => handleSearchSubmit()}
          variant="primary"
          size="sm"
          isFullWidth
          className="h-10 rounded-sm text-xs font-bold uppercase tracking-wide"
        >
          <MagnifyingGlass className="w-4 h-4 stroke-[2.5] mr-1.5 shrink-0" />
          <span>Buscar</span>
        </CtaButton>
      </div>

      <div className="hidden sm:flex items-center justify-between w-full gap-2">
        <div className="relative shrink-0 min-w-[200px] max-w-[240px]">
          <button
            type="button"
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="w-full flex items-center justify-between gap-2.5 px-4 py-2 rounded-full hover:bg-[#F1F1F1] dark:hover:bg-zinc-800/50 transition-colors text-left cursor-pointer"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              {CategoryIcon ? (
                <CategoryIcon className="w-4 h-4 text-brand-primary shrink-0" />
              ) : (
                <MagnifyingGlass className="w-4 h-4 text-brand-primary shrink-0" />
              )}
              <div className="flex flex-col min-w-0">
                <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  {categoryLabel}
                </span>
                <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 truncate">
                  {selectedCategoryLabel}
                </span>
              </div>
            </div>
            <CaretDown
              className={cn(
                "w-3.5 h-3.5 text-zinc-400 shrink-0 transition-transform",
                dropdownOpen && "rotate-180"
              )}
            />
          </button>

          {dropdownOpen && (
            <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-zinc-900 rounded-sm shadow-2xl border border-zinc-200 dark:border-zinc-800 z-[100] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
              <div className="max-h-64 overflow-y-auto divide-y divide-zinc-100 dark:divide-zinc-800">
                {categories.map((cat) => (
                  <button
                    key={cat.value}
                    type="button"
                    onClick={() => {
                      onCategoryChange(cat.value)
                      setDropdownOpen(false)
                    }}
                    className={cn(
                      "w-full px-4 py-2.5 flex items-center justify-between hover:bg-[#F1F1F1] dark:hover:bg-zinc-800 transition-colors text-xs font-medium cursor-pointer text-left",
                      activeCategory === cat.value
                        ? "text-brand-primary font-bold bg-brand-primary/5"
                        : "text-zinc-800 dark:text-zinc-200"
                    )}
                  >
                    <span>{cat.label}</span>
                    {typeof cat.count === "number" && (
                      <span className="text-[10px] text-zinc-400 dark:text-zinc-500 font-semibold">
                        {cat.count}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="w-px h-7 bg-zinc-200 dark:bg-zinc-800 shrink-0" />

        <div className="flex-1 flex items-center gap-2 px-3 py-1">
          <MagnifyingGlass className="w-4 h-4 text-zinc-400 shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSearchSubmit()
            }}
            placeholder={searchPlaceholder}
            className="w-full bg-transparent text-xs sm:text-sm font-medium text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none py-1"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchQueryChange("")}
              className="p-1 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-600 dark:hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <CtaButton
          type="button"
          onClick={() => handleSearchSubmit()}
          variant="primary"
          size="sm"
          className="w-11 h-11 px-0 rounded-full flex items-center justify-center shrink-0"
          aria-label="Buscar"
        >
          <MagnifyingGlass className="w-4 h-4 stroke-[2.5]" />
        </CtaButton>
      </div>
    </div>
  )
}
