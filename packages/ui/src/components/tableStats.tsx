"use client"

import * as React from "react"

import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel/carousel"
import { cn } from "../lib/utils"

export interface TableStatItem {
  label: string
  value: React.ReactNode
  subtext: React.ReactNode
  icon: React.ComponentType<{
    size?: number
    className?: string
    weight?: "bold" | "fill" | "regular" | "duotone" | "light" | "thin"
  }>
}

export interface TableStatsProps {
  items: TableStatItem[]
  className?: string
}

export function TableStats({
  items = [],
  className,
}: TableStatsProps): React.JSX.Element {
  const renderCard = (stat: TableStatItem) => {
    const Icon = stat.icon
    return (
      <div className="relative overflow-hidden rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#141416] p-4.5 sm:p-5 flex flex-col justify-between gap-3 h-full shadow-2xs">
        <div className="absolute -right-5 -bottom-5 sm:-right-6 sm:-bottom-6 pointer-events-none select-none text-zinc-900/[0.04] dark:text-white/[0.04] -rotate-6">
          <Icon size={128} weight="bold" />
        </div>

        <div className="relative z-10 space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 truncate block">
            {stat.label}
          </span>
          <div className="text-2xl sm:text-[26px] font-black font-heading tracking-tight text-zinc-900 dark:text-white">
            {stat.value}
          </div>
        </div>

        <div className="relative z-10">
          <p className="text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 font-medium truncate">
            {stat.subtext}
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("w-full", className)}>
      <div className="block sm:hidden w-full">
        <Carousel autoplay autoplayDelay={4000} loop className="w-full">
          <CarouselContent className="-ml-3">
            {items.map((stat, idx) => (
              <CarouselItem key={idx} className="pl-3 basis-full">
                {renderCard(stat)}
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="flex items-center justify-between mt-3 px-1">
            <CarouselDots className="justify-start gap-1.5" />
            <div className="flex items-center gap-1.5">
              <CarouselPrevious className="size-7" />
              <CarouselNext className="size-7" />
            </div>
          </div>
        </Carousel>
      </div>

      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {items.map((stat, idx) => (
          <div key={idx}>{renderCard(stat)}</div>
        ))}
      </div>
    </div>
  )
}
