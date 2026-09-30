"use client"

import * as React from "react"

import { MagnifyingGlass, X } from "@phosphor-icons/react"

import { CtaButton } from "@/src/components/common/ctaButton"

import { cn } from "@/src/lib/utils"

export interface PortalSearchBarProps {
  value: string
  onChange: (val: string) => void
  placeholder: string
  onClear?: () => void
  onSubmit?: () => void
  className?: string
}

export function PortalSearchBar({
  value,
  onChange,
  placeholder,
  onClear,
  onSubmit,
  className,
}: PortalSearchBarProps): React.JSX.Element {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (onSubmit) onSubmit()
  }

  const handleClear = () => {
    onChange("")
    if (onClear) onClear()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "relative z-20 w-full max-w-4xl mx-auto bg-white dark:bg-zinc-900 rounded-full shadow-xl p-1.5 sm:p-2 border border-zinc-200 dark:border-zinc-800 flex items-center gap-2 sm:gap-3 transition-all",
        className
      )}
    >
      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0 ml-1">
        <MagnifyingGlass className="w-4 h-4 stroke-[2.5]" />
      </div>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="flex-1 bg-transparent text-xs sm:text-sm font-medium text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none px-2 py-1.5"
      />

      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-400 hover:text-zinc-600 dark:hover:text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
          aria-label="Limpar busca"
        >
          <X className="w-4 h-4" />
        </button>
      )}

      <CtaButton
        type="submit"
        variant="primary"
        size="sm"
        className="rounded-full h-8 sm:h-10 px-4 sm:px-6 text-xs font-heading font-black uppercase tracking-wider shrink-0"
      >
        <MagnifyingGlass className="w-3.5 h-3.5 stroke-[2.5] hidden sm:inline-block mr-1.5" />
        <span>Buscar</span>
      </CtaButton>
    </form>
  )
}
