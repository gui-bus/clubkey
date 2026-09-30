"use client"

import * as React from "react"
import Image from "next/image"
import { Users, ShieldCheck, ArrowsLeftRight, Wallet } from "@phosphor-icons/react"
import { Card, CardBody } from "@clubkey/ui"
import type { AdminUser } from "@clubkey/types"

export interface AdminUsersStatsProps {
  users: AdminUser[]
}

export function AdminUsersStats({ users }: AdminUsersStatsProps): React.JSX.Element {
  const totalUsers = users.length
  const confirmedUsers = users.filter((u) => u.accountStatus === "CONFIRMADO").length
  const p2pActiveUsers = users.filter((u) => u.p2pStatus === "ON").length
  const totalRibTokens = users.reduce((acc, u) => acc + (u.balances?.total || 0), 0)

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
          <span>{totalRibTokens.toLocaleString("pt-BR", { minimumFractionDigits: 0, maximumFractionDigits: 2 })}</span>
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
          <Card
            key={stat.label}
            className="rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] shadow-2xs"
          >
            <CardBody className="p-4 flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  {stat.label}
                </p>
                <div className="text-xl font-black font-heading tracking-tight text-zinc-900 dark:text-white">
                  {stat.value}
                </div>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">
                  {stat.subtext}
                </p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-sm bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 shrink-0">
                <Icon size={20} weight="bold" />
              </div>
            </CardBody>
          </Card>
        )
      })}
    </div>
  )
}
