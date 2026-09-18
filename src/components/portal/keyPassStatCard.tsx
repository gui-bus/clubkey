"use client"

import * as React from "react"

import Image from "next/image"

import { cn } from "@/src/lib/utils"

export interface KeyPassStatCardProps {
  label: string
  value: React.ReactNode
  subtitle?: string
  iconSrc?: string
  iconAlt?: string
  watermarkSrc?: string
  className?: string
}

export function KeyPassStatCard({
  label,
  value,
  subtitle,
  iconSrc,
  iconAlt = "",
  watermarkSrc,
  className,
}: KeyPassStatCardProps): React.JSX.Element {
  return (
    <div
      className={cn(
        "relative overflow-hidden p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/40 space-y-1.5 min-w-[130px]",
        className
      )}
    >
      {watermarkSrc && (
        <div className="absolute -right-3 -bottom-3 pointer-events-none select-none opacity-[0.07] dark:opacity-[0.12]">
          <div className="relative w-18 h-18 sm:w-20 sm:h-20">
            <Image src={watermarkSrc} alt="" fill className="object-contain" />
          </div>
        </div>
      )}

      <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block truncate">
        {label}
      </span>

      <div className="flex items-center gap-1.5">
        {iconSrc && (
          <div className="relative w-4 h-4 shrink-0">
            <Image
              src={iconSrc}
              alt={iconAlt}
              fill
              className="object-contain"
            />
          </div>
        )}
        <span className="text-2xl font-black font-heading tracking-tight text-zinc-900 dark:text-white">
          {value}
        </span>
      </div>

      {subtitle && (
        <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium block truncate">
          {subtitle}
        </span>
      )}
    </div>
  )
}
