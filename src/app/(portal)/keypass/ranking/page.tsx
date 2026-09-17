"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import {
  CaretDown,
  CaretUp,
  Crown,
  Minus,
  Trophy,
} from "@phosphor-icons/react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar/avatar"
import { Container } from "@/src/components/common/container"
import { KeyPassStatCard } from "@/src/components/portal/KeyPassStatCard"
import { LeaderboardTargetCard } from "@/src/components/portal/LeaderboardTargetCard"
import {
  MOCK_LEADERBOARD,
  MOCK_MONTHLY_LEADERBOARD,
  MOCK_QUARTERLY_LEADERBOARD,
  TIERS_CONFIG,
  getInitials,
  getMemberSlug,
} from "@/src/data/portalData"
import { usePortalStore } from "@/src/store/usePortalStore"
import { cn } from "@/src/lib/utils"

export default function KeyPassRankingPage(): React.JSX.Element {
  const {
    xp,
    ribTokens,
    leaderboardTimeframe,
    setLeaderboardTimeframe,
  } = usePortalStore()

  const leaderboard = React.useMemo(() => {
    switch (leaderboardTimeframe) {
      case "monthly":
        return MOCK_MONTHLY_LEADERBOARD
      case "quarterly":
        return MOCK_QUARTERLY_LEADERBOARD
      default:
        return MOCK_LEADERBOARD
    }
  }, [leaderboardTimeframe])

  const leader = leaderboard[0] || MOCK_LEADERBOARD[0]
  const currentUserIndex = leaderboard.findIndex((m) => m.isCurrentUser)
  const currentUser =
    currentUserIndex >= 0 ? leaderboard[currentUserIndex] : leaderboard[7]
  const targetUser =
    currentUserIndex > 0 ? leaderboard[currentUserIndex - 1] : null

  const timeframeLabel =
    leaderboardTimeframe === "monthly"
      ? "Mês Atual (Outubro)"
      : leaderboardTimeframe === "quarterly"
        ? "Temporada Q4 (2026)"
        : "Geral (All-time)"

  return (
    <Container className="py-6 sm:py-8 space-y-6">
      {}
      <div className="rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 sm:p-6 shadow-2xs relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 flex items-center justify-center">
              <Image
                src={
                  TIERS_CONFIG[leader.tierId]?.image ||
                  "/utils/gamification/tiers/06_patrono.webp"
                }
                alt={leader.name}
                fill
                className="object-contain"
                priority
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xs bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-[10px] font-black uppercase tracking-wider whitespace-nowrap shrink-0">
                  <Crown
                    className="w-3.5 h-3.5 shrink-0"
                    weight="bold"
                  />
                  <span>Posição #1 ({timeframeLabel})</span>
                </span>
              </div>

              <div>
                <Link
                  href={
                    leader.isCurrentUser
                      ? "/perfil"
                      : `/conexoes/${leader.id}/${getMemberSlug(leader)}`
                  }
                  className="group/leader inline-block"
                >
                  <h1 className="text-2xl sm:text-3xl font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white group-hover/leader:text-brand-primary group-hover/leader:underline transition-colors">
                    {leader.name}
                  </h1>
                </Link>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-medium">
                  {leader.role} na {leader.company} • {leader.city}
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-xl font-medium leading-relaxed mt-1">
                  Distinção máxima de prestígio no ecossistema ClubKey com
                  acesso prioritário a cotas VIP e bonificação trimestral de
                  Tokens RIB.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full lg:w-auto shrink-0">
            <KeyPassStatCard
              label="XP do Líder"
              value={leader.xp.toLocaleString("pt-BR")}
              subtitle="Pontuação acumulada"
              iconSrc="/utils/gamification/utils/xp.webp"
              iconAlt="XP"
              watermarkSrc="/utils/gamification/utils/xp.webp"
              className="min-w-[140px]"
            />

            <KeyPassStatCard
              label="Tokens RIB"
              value={leader.ribTokens}
              subtitle="Saldo no período"
              iconSrc="/utils/gamification/utils/RIB.svg"
              iconAlt="RIB"
              watermarkSrc="/utils/gamification/utils/RIB.svg"
              className="min-w-[140px]"
            />
          </div>
        </div>
      </div>

      {}
      <LeaderboardTargetCard
        currentUser={currentUser}
        targetUser={targetUser}
        timeframeLabel={timeframeLabel}
      />

      {}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <Trophy
              className="w-4 h-4 text-brand-primary shrink-0"
              weight="bold"
            />
            <h2 className="text-lg sm:text-xl font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white">
              Tabela de Classificação
            </h2>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
            Ranking de membros atualizado em tempo real de acordo com as
            atividades qualificadoras.
          </p>
        </div>

        {}
        <div className="flex items-center gap-1.5 p-1 rounded-sm bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 self-start md:self-auto overflow-x-auto scrollbar-none">
          {(
            [
              { label: "Geral (All-time)", value: "all_time" },
              { label: "Mês Atual", value: "monthly" },
              { label: "Temporada Q4", value: "quarterly" },
            ] as const
          ).map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => setLeaderboardTimeframe(t.value)}
              className={cn(
                "px-3 py-1.5 rounded-xs text-xs font-bold transition-all cursor-pointer whitespace-nowrap",
                leaderboardTimeframe === t.value
                  ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-xs"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>


      {}
      <div className="rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-2xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-800/40 text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3.5 px-4 text-center w-px whitespace-nowrap">
                  Posição
                </th>
                <th className="py-3.5 px-4 w-full">Membro</th>
                <th className="py-3.5 px-4 text-left w-px whitespace-nowrap">
                  Tier Atual
                </th>
                <th className="py-3.5 px-4 text-left w-px whitespace-nowrap">
                  XP ({timeframeLabel})
                </th>
                <th className="py-3.5 px-4 text-left w-px whitespace-nowrap">
                  Tokens RIB
                </th>
                <th className="py-3.5 px-4 text-center w-px whitespace-nowrap">
                  Evolução
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/80">
              {leaderboard.map((member) => {
                const tier = TIERS_CONFIG[member.tierId]
                const isUser = !!member.isCurrentUser

                return (
                  <tr
                    key={member.id}
                    className={cn(
                      "transition-colors",
                      isUser
                        ? "bg-zinc-100/70 dark:bg-zinc-800/60 font-bold"
                        : "hover:bg-zinc-50/60 dark:hover:bg-zinc-800/30"
                    )}
                  >
                    <td className="py-4 px-4 text-center select-none w-px whitespace-nowrap">
                      <span className="text-2xl sm:text-3xl font-heading font-black text-zinc-900/[0.15] dark:text-white/[0.18] leading-none">
                        {member.rank < 10 ? `0${member.rank}` : member.rank}
                      </span>
                    </td>

                    <td className="py-4 px-4 w-full">
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
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback className="font-bold text-[10px] bg-zinc-900 text-white">
                            {getInitials(member.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-zinc-900 dark:text-white truncate group-hover/member:text-brand-primary group-hover/member:underline transition-colors">
                              {member.name}
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
                    </td>

                    <td className="py-4 px-4 text-left whitespace-nowrap w-px">
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
                    </td>

                    <td className="py-4 px-4 text-left whitespace-nowrap w-px">
                      <div className="flex items-center gap-1.5 font-bold text-xs text-zinc-900 dark:text-white tabular-nums whitespace-nowrap">
                        <div className="relative w-3.5 h-3.5 shrink-0">
                          <Image
                            src="/utils/gamification/utils/xp.webp"
                            alt="XP"
                            fill
                            className="object-contain"
                          />
                        </div>
                        <span>
                          {(isUser && leaderboardTimeframe === "all_time"
                            ? xp
                            : member.xp
                          ).toLocaleString("pt-BR")}{" "}
                          XP
                        </span>
                      </div>
                    </td>

                    <td className="py-4 px-4 text-left whitespace-nowrap w-px">
                      <div className="flex items-center gap-1.5 font-bold text-xs text-zinc-900 dark:text-white tabular-nums whitespace-nowrap">
                        <div className="relative w-3.5 h-3.5 shrink-0">
                          <Image
                            src="/utils/gamification/utils/RIB.svg"
                            alt="RIB"
                            fill
                            className="object-contain"
                          />
                        </div>
                        <span>
                          {isUser && leaderboardTimeframe === "all_time"
                            ? ribTokens
                            : member.ribTokens}{" "}
                          RIB
                        </span>
                      </div>
                    </td>

                    <td className="py-4 px-4 text-center whitespace-nowrap w-px">
                      {member.change && member.change > 0 ? (
                        <span className="inline-flex items-center gap-0.5 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                          <CaretUp className="w-3.5 h-3.5" weight="bold" />
                          <span>+{member.change}</span>
                        </span>
                      ) : member.change && member.change < 0 ? (
                        <span className="inline-flex items-center gap-0.5 text-[11px] font-bold text-red-500">
                          <CaretDown className="w-3.5 h-3.5" weight="bold" />
                          <span>{member.change}</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center text-zinc-400">
                          <Minus className="w-3.5 h-3.5" />
                        </span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </Container>
  )
}
