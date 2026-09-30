"use client"

import * as React from "react"

import Image from "next/image"

import type { AdminUser } from "@clubkey/types"
import {
  ArrowsLeftRight,
  ShieldCheck,
  Users,
  Wallet,
} from "@phosphor-icons/react"

export interface AdminUsersStatsProps {
  users: AdminUser[]
}

export function AdminUsersStats({
  users,
}: AdminUsersStatsProps): React.JSX.Element {
  const totalUsers = users.length
  const confirmedUsers = users.filter(
    (u) => u.accountStatus === "CONFIRMADO"
  ).length
  const p2pActiveUsers = users.filter((u) => u.p2pStatus === "ON").length
  const totalRibTokens = users.reduce(
    (acc, u) => acc + (u.balances?.total || 0),
    0
  )

  const stats = [
    {
      label: "Total de Usuários",
      value: totalUsers.toString(),
      subtext: "Cadastrados no sistema",
      icon: Users,
    },
    {
      label: "Usuários Confirmados",
      value: `${confirmedUsers} (${Math.round((confirmedUsers / (totalUsers || 1)) * 100)}%)`,
      subtext: "Documentação aprovada",
      icon: ShieldCheck,
    },
    {
      label: "P2P Habilitado",
      value: `${p2pActiveUsers} ativos`,
      subtext: "Transferências ativas",
      icon: ArrowsLeftRight,
    },
    {
      label: "Tokens em Custódia",
      value: (
        <div className="flex items-center gap-1.5">
          <span>
            {totalRibTokens.toLocaleString("pt-BR", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 2,
            })}
          </span>
          <div className="relative w-4 h-4 shrink-0 inline-block">
            <Image
              src="/utils/gamification/utils/RIB.svg"
              alt="RIB"
              fill
              className="object-contain"
            />
          </div>
        </div>
      ),
      subtext: "Total Fireblocks wallets",
      icon: Wallet,
    },
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <div
            key={stat.label}
            className="relative overflow-hidden rounded-xl border border-zinc-200/80 dark:border-zinc-800 bg-white dark:bg-[#141416] p-4.5 sm:p-5 flex flex-col justify-between gap-3"
          >
            {/* Background Watermark Icon (Enlarged) */}
            <div className="absolute -right-5 -bottom-5 sm:-right-6 sm:-bottom-6 pointer-events-none select-none text-zinc-900/[0.04] dark:text-white/[0.04] -rotate-6">
              <Icon size={128} weight="bold" />
            </div>

            {/* Foreground Content */}
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
      })}
    </div>
  )
}
