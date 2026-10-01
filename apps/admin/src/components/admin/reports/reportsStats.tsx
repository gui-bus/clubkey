"use client"

import * as React from "react"

import {
  MOCK_ADMIN_USERS,
} from "@/src/data/mocks/adminUsers.data"
import {
  MOCK_PROPERTIES,
} from "@/src/data/mocks/properties.data"
import type { AdminReportItem, ReportExecutionLog } from "@clubkey/types"
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
  Buildings,
  CalendarCheck,
  CurrencyDollar,
  UsersThree,
} from "@phosphor-icons/react"

export interface ReportsStatsProps {
  reports?: AdminReportItem[]
  recentLogs?: ReportExecutionLog[]
}

export function ReportsStats({
  reports = [],
  recentLogs = [],
}: ReportsStatsProps): React.JSX.Element {
  const totalRevenue = MOCK_PROPERTIES.reduce(
    (acc, p) => acc + (p.revenueLastMonth || 0),
    0
  )
  const totalProperties = MOCK_PROPERTIES.length
  const avgOccupancy =
    totalProperties > 0
      ? Math.round(
          MOCK_PROPERTIES.reduce((acc, p) => acc + (p.occupancyRate || 0), 0) /
            totalProperties
        )
      : 0
  const totalUsers = MOCK_ADMIN_USERS.length
  const confirmedUsers = MOCK_ADMIN_USERS.filter(
    (u) => u.accountStatus === "CONFIRMADO"
  ).length
  const kycPct = Math.round((confirmedUsers / (totalUsers || 1)) * 100)

  const stats = [
    {
      label: "Faturamento Consolidado",
      value: formatCurrency(totalRevenue),
      subtext: `Receita bruta mensal • ${totalProperties} imóveis`,
      icon: CurrencyDollar,
    },
    {
      label: "Reservas & Estadias",
      value: "324 Reservas",
      subtext: `${avgOccupancy}% taxa média de ocupação`,
      icon: CalendarCheck,
    },
    {
      label: "Imóveis sob Gestão",
      value: `${totalProperties} Imóveis`,
      subtext: "12 workspaces ativos na rede",
      icon: Buildings,
    },
    {
      label: "Membros & Usuários",
      value: `${totalUsers} Usuários`,
      subtext: `${kycPct}% com documentação KYC aprovada`,
      icon: UsersThree,
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
