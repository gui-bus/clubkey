"use client"

import * as React from "react"

import type { AdminProperty } from "@clubkey/types"
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@clubkey/ui"
import { formatCurrency } from "@clubkey/utils"
import {
  Bed,
  Buildings,
  ChartPieSlice,
  CurrencyDollar,
  EyeSlash,
  HouseLine,
} from "@phosphor-icons/react"

export interface PropertiesStatsProps {
  properties: AdminProperty[]
}

export function PropertiesStats({
  properties,
}: PropertiesStatsProps): React.JSX.Element {
  const totalProperties = properties.length
  const totalRevenue = properties.reduce(
    (acc, p) => acc + (p.revenueLastMonth || 0),
    0
  )
  const avgOccupancy =
    totalProperties > 0
      ? properties.reduce((acc, p) => acc + (p.occupancyRate || 0), 0) /
        totalProperties
      : 0
  const avgRevPar =
    totalProperties > 0
      ? properties.reduce((acc, p) => acc + (p.revPar || 0), 0) /
        totalProperties
      : 0

  const availableStay = properties.filter(
    (p) => p.stayStatus === "DISPONIVEL"
  ).length
  const hiddenStay = properties.filter((p) => p.stayStatus === "OCULTO").length

  const stats = [
    {
      label: "Total de Imóveis",
      value: totalProperties.toString(),
      subtext: `${availableStay} ativos para reserva no Stay`,
      icon: Buildings,
    },
    {
      label: "Receita (Últ. Mês)",
      value: formatCurrency(totalRevenue),
      subtext: "Fechado: Ago/26 por criação de reserva",
      icon: CurrencyDollar,
    },
    {
      label: "Ocupação Média",
      value: `${avgOccupancy.toFixed(1)}%`,
      subtext: `Média de ocupação da carteira`,
      icon: ChartPieSlice,
    },
    {
      label: "RevPAR Médio",
      value: formatCurrency(Math.round(avgRevPar)),
      subtext: "Receita média por noite disponível",
      icon: Bed,
    },
  ]

  const renderCard = (stat: (typeof stats)[0]) => {
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
    <div className="w-full">
      <div className="block sm:hidden w-full">
        <Carousel autoplay autoplayDelay={4000} loop className="w-full">
          <CarouselContent className="-ml-3">
            {stats.map((stat) => (
              <CarouselItem key={stat.label} className="pl-3 basis-full">
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
        {stats.map((stat) => (
          <div key={stat.label}>{renderCard(stat)}</div>
        ))}
      </div>
    </div>
  )
}
