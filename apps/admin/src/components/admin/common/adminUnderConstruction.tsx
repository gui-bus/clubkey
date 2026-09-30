"use client"

import * as React from "react"
import { Hammer, type Icon as PhosphorIcon } from "@phosphor-icons/react"
import { cn } from "@clubkey/utils"

export interface AdminUnderConstructionProps {
  title: string
  description?: string
  badge?: string
  icon?: PhosphorIcon
  backgroundIcon?: PhosphorIcon
  className?: string
}

export function AdminUnderConstruction({
  title,
  description = "Esta seção está em fase de desenvolvimento e estará disponível em breve no painel administrativo.",
  badge = "Em Construção",
  icon: MainIcon = Hammer,
  backgroundIcon: BgIcon,
  className,
}: AdminUnderConstructionProps): React.JSX.Element {
  const WatermarkIcon = BgIcon || MainIcon

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-sm border-2 border-dashed border-zinc-200 dark:border-zinc-800 bg-white/60 dark:bg-[#141416]/60 p-12 text-center select-none min-h-[420px] flex flex-col items-center justify-center transition-all",
        className
      )}
    >
      {/* Decorative Large Background Watermark Icon */}
      {WatermarkIcon && (
        <WatermarkIcon
          className="absolute -right-16 -bottom-16 size-80 sm:size-96 md:size-[400px] text-zinc-900/[0.035] dark:text-zinc-100/[0.025] pointer-events-none rotate-12 select-none"
          weight="fill"
        />
      )}

      {/* Foreground Icon Badge */}
      <div className="relative z-10 size-14 rounded-full bg-zinc-100 dark:bg-zinc-800/90 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-300 mb-4 shadow-2xs">
        <MainIcon size={26} weight="duotone" />
      </div>

      {/* Status Badge */}
      <span className="relative z-10 inline-flex items-center text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 mb-2.5">
        {badge}
      </span>

      {/* Title & Description */}
      <h3 className="relative z-10 text-base font-bold uppercase tracking-wide text-zinc-900 dark:text-white font-heading">
        {title}
      </h3>
      <p className="relative z-10 text-xs text-zinc-500 dark:text-zinc-400 max-w-md mt-1.5 leading-relaxed font-normal">
        {description}
      </p>

      {/* Operational State Pill */}
      <div className="relative z-10 mt-6 inline-flex items-center gap-2 text-[11px] text-zinc-400 dark:text-zinc-500 px-3 py-1.5 rounded-xs bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/60 font-mono">
        <span className="size-1.5 rounded-full bg-amber-500 animate-pulse shrink-0" />
        <span>STATUS:</span>
        <strong className="text-zinc-700 dark:text-zinc-300 font-bold">FASE DE DESENVOLVIMENTO</strong>
      </div>
    </div>
  )
}
