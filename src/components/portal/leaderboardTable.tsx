"use client"

import * as React from "react"

import Image from "next/image"
import Link from "next/link"

import {
  type LeaderboardMember,
  TIERS_CONFIG,
  getInitials,
  getMemberSlug,
} from "@/src/data/portalData"
import { CaretDown, CaretUp, Minus } from "@phosphor-icons/react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar/avatar"

import { DataTable, type TableColumn } from "@/src/components/common/dataTable"

import { formatNumber } from "@/src/lib/formatters"

export interface LeaderboardTableProps {
  leaderboard: LeaderboardMember[]
  timeframeLabel: string
  leaderboardTimeframe: "all_time" | "monthly" | "quarterly"
  currentUserXp: number
  currentUserRibTokens: number
  className?: string
}

export function LeaderboardTable({
  leaderboard,
  timeframeLabel,
  leaderboardTimeframe,
  currentUserXp,
  currentUserRibTokens,
  className,
}: LeaderboardTableProps): React.JSX.Element {
  const columns = React.useMemo<TableColumn<LeaderboardMember>[]>(() => {
    return [
      {
        key: "rank",
        header: "Posição",
        align: "center",
        headerClassName: "w-px whitespace-nowrap",
        className: "select-none w-px whitespace-nowrap",
        render: (member) => (
          <span className="text-2xl sm:text-3xl font-heading font-black text-zinc-900/[0.15] dark:text-white/[0.18] leading-none">
            {member.rank < 10 ? `0${member.rank}` : member.rank}
          </span>
        ),
      },
      {
        key: "member",
        header: "Membro",
        align: "left",
        headerClassName: "w-full",
        className: "w-full",
        render: (member) => {
          const isUser = !!member.isCurrentUser
          const fullName = `${member.firstName} ${member.lastName}`.trim()
          return (
            <Link
              href={
                isUser
                  ? "/perfil"
                  : `/conexoes/${member.id}/${getMemberSlug(member)}`
              }
              className="group/member flex items-center gap-3 w-fit max-w-full"
            >
              <Avatar
                size="sm"
                className="shrink-0 transition-transform group-hover/member:scale-105"
              >
                <AvatarImage src={member.avatar} alt={fullName} />
                <AvatarFallback className="font-bold text-[10px] bg-zinc-900 text-white">
                  {getInitials(member.firstName, member.lastName)}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-zinc-900 dark:text-white truncate group-hover/member:text-brand-primary group-hover/member:underline transition-colors">
                    {fullName}
                  </span>
                  {isUser && (
                    <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded-xs bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 whitespace-nowrap shrink-0">
                      Você
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate">
                  {member.role} • {member.company}
                </p>
              </div>
            </Link>
          )
        },
      },
      {
        key: "tier",
        header: "Tier Atual",
        align: "left",
        headerClassName: "w-px whitespace-nowrap",
        className: "whitespace-nowrap w-px",
        render: (member) => {
          const tier = TIERS_CONFIG[member.tierId]
          if (!tier) return null
          return (
            <div className="flex items-center gap-2">
              <div className="relative w-5 h-5 shrink-0">
                <Image
                  src={tier.image}
                  alt={tier.name}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-bold text-zinc-900 dark:text-white uppercase text-[11px]">
                {tier.name}
              </span>
            </div>
          )
        },
      },
      {
        key: "xp",
        header: `XP (${timeframeLabel})`,
        align: "left",
        headerClassName: "w-px whitespace-nowrap",
        className: "whitespace-nowrap w-px",
        render: (member) => {
          const isUser = !!member.isCurrentUser
          const currentDisplayXp =
            isUser && leaderboardTimeframe === "all_time"
              ? currentUserXp
              : member.xp

          return (
            <div className="flex items-center gap-1.5 font-bold text-xs text-zinc-900 dark:text-white tabular-nums whitespace-nowrap">
              <div className="relative w-3.5 h-3.5 shrink-0">
                <Image
                  src="/utils/gamification/utils/xp.webp"
                  alt="XP"
                  fill
                  className="object-contain"
                />
              </div>
              <span>{formatNumber(currentDisplayXp)} XP</span>
            </div>
          )
        },
      },
      {
        key: "ribTokens",
        header: "Tokens RIB",
        align: "left",
        headerClassName: "w-px whitespace-nowrap",
        className: "whitespace-nowrap w-px",
        render: (member) => {
          const isUser = !!member.isCurrentUser
          const currentDisplayRib =
            isUser && leaderboardTimeframe === "all_time"
              ? currentUserRibTokens
              : member.ribTokens

          return (
            <div className="flex items-center gap-1.5 font-bold text-xs text-zinc-900 dark:text-white tabular-nums whitespace-nowrap">
              <div className="relative w-3.5 h-3.5 shrink-0">
                <Image
                  src="/utils/gamification/utils/RIB.svg"
                  alt="RIB"
                  fill
                  className="object-contain"
                />
              </div>
              <span>{currentDisplayRib} RIB</span>
            </div>
          )
        },
      },
      {
        key: "change",
        header: "Evolução",
        align: "center",
        headerClassName: "w-px whitespace-nowrap",
        className: "whitespace-nowrap w-px",
        render: (member) => {
          if (member.change && member.change > 0) {
            return (
              <span className="inline-flex items-center gap-0.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                <CaretUp className="w-3.5 h-3.5" weight="bold" />
                <span>+{member.change}</span>
              </span>
            )
          }
          if (member.change && member.change < 0) {
            return (
              <span className="inline-flex items-center gap-0.5 text-[11px] font-bold text-red-500">
                <CaretDown className="w-3.5 h-3.5" weight="bold" />
                <span>{member.change}</span>
              </span>
            )
          }
          return (
            <span className="inline-flex items-center text-zinc-400">
              <Minus className="w-3.5 h-3.5" />
            </span>
          )
        },
      },
    ]
  }, [
    timeframeLabel,
    leaderboardTimeframe,
    currentUserXp,
    currentUserRibTokens,
  ])

  return (
    <DataTable
      columns={columns}
      data={leaderboard}
      keyExtractor={(item) => item.id}
      getRowClassName={(item) =>
        item.isCurrentUser
          ? "bg-zinc-100/70 dark:bg-zinc-800/60 font-bold"
          : "hover:bg-zinc-50/60 dark:hover:bg-zinc-800/30"
      }
      className={className}
    />
  )
}
