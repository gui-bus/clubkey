"use client"

import * as React from "react"

import Image from "next/image"
import Link from "next/link"

import {
  MOCK_LEADERBOARD,
  TIERS_CONFIG,
  getInitials,
  getMemberSlug,
} from "@/src/data/portalData"
import { usePortalStore } from "@/src/store/usePortalStore"
import { Crown, Trophy } from "@phosphor-icons/react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar/avatar"

import { Container } from "@/src/components/common/container"
import { GlassBadge } from "@/src/components/portal/GlassBadge"

import { cn } from "@/src/lib/utils"

export default function KeyPassRankingPage(): React.JSX.Element {
  const { xp, ribTokens } = usePortalStore()

  const patrono =
    MOCK_LEADERBOARD.find((m) => m.rank === 1) || MOCK_LEADERBOARD[0]

  return (
    <Container className="py-6 sm:py-8 space-y-4">
      {}
      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 sm:p-6 shadow-2xs relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6">
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 flex items-center justify-center">
              <Image
                src="/utils/gamification/tiers/06_patrono.webp"
                alt="Patrono do Clube"
                fill
                className="object-contain"
                priority
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <GlassBadge
                  size="sm"
                  icon={
                    <Crown
                      className="w-3.5 h-3.5 text-zinc-700 dark:text-zinc-300"
                      weight="bold"
                    />
                  }
                  className="bg-zinc-100/90 dark:bg-zinc-800/80 text-zinc-800 dark:text-zinc-200 border-zinc-200 dark:border-zinc-700 text-[10px] font-black tracking-wider shadow-2xs"
                >
                  Posição #1 Global
                </GlassBadge>
                <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400">
                  Patrono Oficial em Exercício
                </span>
              </div>

              <div>
                <Link
                  href={
                    patrono.isCurrentUser
                      ? "/perfil"
                      : `/conexoes/${patrono.id}/${getMemberSlug(patrono)}`
                  }
                  className="group/patrono inline-block"
                >
                  <h1 className="text-2xl sm:text-3xl font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white group-hover/patrono:text-brand-primary group-hover/patrono:underline transition-colors">
                    {patrono.name}
                  </h1>
                </Link>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-medium">
                  {patrono.role} na {patrono.company} • {patrono.city}
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-xl font-medium leading-relaxed mt-1">
                  Distinção máxima do ecossistema ClubKey com acesso permanente
                  a cotas VIP e bonificação trimestral de Tokens RIB.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full lg:w-auto shrink-0">
            {}
            <div className="relative overflow-hidden p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/40 space-y-1.5 min-w-[140px]">
              <div className="absolute -right-3 -bottom-3 pointer-events-none select-none opacity-[0.07] dark:opacity-[0.12]">
                <div className="relative w-16 h-16">
                  <Image
                    src="/utils/gamification/utils/xp.webp"
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block">
                XP do Líder
              </span>
              <div className="flex items-center gap-1.5">
                <div className="relative w-4 h-4 shrink-0">
                  <Image
                    src="/utils/gamification/utils/xp.webp"
                    alt="XP"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-2xl font-black font-heading tracking-tight text-zinc-900 dark:text-white">
                  {patrono.xp.toLocaleString("pt-BR")}
                </span>
              </div>
              <span className="text-[10px] text-zinc-500 font-medium block">
                Pontuação máxima
              </span>
            </div>

            {}
            <div className="relative overflow-hidden p-4 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/40 space-y-1.5 min-w-[140px]">
              <div className="absolute -right-3 -bottom-3 pointer-events-none select-none opacity-[0.07] dark:opacity-[0.12]">
                <div className="relative w-16 h-16">
                  <Image
                    src="/utils/gamification/utils/RIB.svg"
                    alt=""
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block">
                Tokens Acumulados
              </span>
              <div className="flex items-center gap-1.5">
                <div className="relative w-4 h-4 shrink-0">
                  <Image
                    src="/utils/gamification/utils/RIB.svg"
                    alt="RIB"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-2xl font-black font-heading tracking-tight text-zinc-900 dark:text-white">
                  {patrono.ribTokens}
                </span>
              </div>
              <span className="text-[10px] text-zinc-500 font-medium block">
                Saldo de tokens
              </span>
            </div>
          </div>
        </div>
      </div>

      {}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
        <div className="space-y-0.5 min-w-0">
          <div className="flex items-center gap-2">
            <Trophy
              className="w-4 h-4 text-zinc-900 dark:text-white shrink-0"
              weight="bold"
            />
            <h2 className="text-lg sm:text-xl font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white">
              Tabela de Classificação Geral
            </h2>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
            Ranking de membros atualizado em tempo real de acordo com as
            atividades qualificadoras.
          </p>
        </div>

        <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400 shrink-0 self-start sm:self-auto">
          {MOCK_LEADERBOARD.length} Membros Qualificados
        </span>
      </div>

      {}
      <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-2xs">
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
                  XP Total
                </th>
                <th className="py-3.5 px-4 text-left w-px whitespace-nowrap">
                  Tokens RIB
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/80">
              {MOCK_LEADERBOARD.map((member) => {
                const tier = TIERS_CONFIG[member.tierId]
                const isUser = !!member.isCurrentUser

                return (
                  <tr
                    key={member.id}
                    className={cn(
                      "transition-colors",
                      isUser
                        ? "bg-zinc-50 dark:bg-zinc-800/50 font-bold"
                        : "hover:bg-zinc-50/60 dark:hover:bg-zinc-800/30"
                    )}
                  >
                    {}
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
                              <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded-xs bg-zinc-900 dark:bg-white text-white dark:text-zinc-900">
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
                      <div className="flex items-center gap-1.5 font-normal text-xs text-zinc-700 dark:text-zinc-300 tabular-nums whitespace-nowrap">
                        <div className="relative w-3.5 h-3.5 shrink-0">
                          <Image
                            src="/utils/gamification/utils/xp.webp"
                            alt="XP"
                            fill
                            className="object-contain"
                          />
                        </div>
                        <span>
                          {isUser
                            ? xp.toLocaleString("pt-BR")
                            : member.xp.toLocaleString("pt-BR")}{" "}
                          XP
                        </span>
                      </div>
                    </td>

                    <td className="py-4 px-4 text-left whitespace-nowrap w-px">
                      <div className="flex items-center gap-1.5 font-normal text-xs text-zinc-700 dark:text-zinc-300 tabular-nums whitespace-nowrap">
                        <div className="relative w-3.5 h-3.5 shrink-0">
                          <Image
                            src="/utils/gamification/utils/RIB.svg"
                            alt="RIB"
                            fill
                            className="object-contain"
                          />
                        </div>
                        <span>{isUser ? ribTokens : member.ribTokens} RIB</span>
                      </div>
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
