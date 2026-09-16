"use client"

import * as React from "react"
import Image from "next/image"
import {
  Crown,
} from "@phosphor-icons/react"
import { Container } from "@/src/components/common/container"
import { Badge } from "@/src/components/ui/badge/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/src/components/ui/avatar/avatar"
import { usePortalStore } from "@/src/store/usePortalStore"
import {
  MOCK_LEADERBOARD,
  TIERS_CONFIG,
  getInitials,
} from "@/src/data/portalData"
import { cn } from "@/src/lib/utils"

const CLUBS_FILTER = [
  { id: "all", name: "Todos os Clubes" },
  { id: "alpha", name: "Clube Alpha" },
  { id: "founders", name: "Founders Circle" },
  { id: "inv", name: "Clube Investidores" },
]

export default function KeyPassRankingPage(): React.JSX.Element {
  const { xp, ribTokens } = usePortalStore()
  const [selectedClub, setSelectedClub] = React.useState("all")

  const patrono = MOCK_LEADERBOARD.find((m) => m.rank === 1) || MOCK_LEADERBOARD[0]

  const filteredMembers = MOCK_LEADERBOARD.filter((member) => {
    if (selectedClub === "all") return true
    return member.clubId === selectedClub
  })

  return (
    <Container className="py-8 sm:py-10 space-y-8">
      <div className="rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] p-6 sm:p-8 shadow-xs relative overflow-hidden">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 sm:gap-6">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 p-2 rounded-sm bg-[#F1F1F1] dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xs flex items-center justify-center">
              <Image
                src="/utils/gamification/tiers/06_patrono.webp"
                alt="Patrono do Clube"
                fill
                className="object-contain p-2"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <Badge
                  color="primary"
                  variant="flat"
                  radius="sm"
                  className="font-black text-[11px] uppercase tracking-wider inline-flex items-center gap-1.5 shrink-0 whitespace-nowrap"
                >
                  <Crown className="w-3.5 h-3.5 text-brand-primary shrink-0" weight="fill" />
                  <span>Posição #1 Global</span>
                </Badge>
                <span className="text-xs font-bold text-zinc-600 dark:text-zinc-400">
                  Patrono Oficial em Exercício
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white">
                {patrono.name}
              </h2>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                {patrono.role} na {patrono.company} • {patrono.clubName}
              </p>
              <p className="text-xs text-zinc-600 dark:text-zinc-300 max-w-xl pt-1">
                Distinção máxima do ecossistema ClubKey com acesso permanente a cotas VIP e cota trimestral de Tokens RIB bônus.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="p-4 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-[#F1F1F1] dark:bg-zinc-900 text-center flex-1 sm:w-40">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-0.5">
                XP do Líder
              </span>
              <div className="flex items-center justify-center gap-1.5">
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
            </div>

            <div className="p-4 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-[#F1F1F1] dark:bg-zinc-900 text-center flex-1 sm:w-40">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-0.5">
                Tokens Acumulados
              </span>
              <div className="flex items-center justify-center gap-1.5">
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
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg sm:text-xl font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white">
            Tabela de Classificação Geral
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Ranking de associados atualizado em tempo real de acordo com as atividades qualificadoras.
          </p>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {CLUBS_FILTER.map((c) => {
            const isSelected = selectedClub === c.id
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setSelectedClub(c.id)}
                className={cn(
                  "px-3 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer",
                  isSelected
                    ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 shadow-xs"
                    : "bg-white dark:bg-[#141416] border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                )}
              >
                {c.name}
              </button>
            )
          })}
        </div>
      </div>

      <div className="rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-[#F1F1F1]/60 dark:bg-zinc-900/60 text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3.5 px-4 text-center w-16">Posição</th>
                <th className="py-3.5 px-4">Associado</th>
                <th className="py-3.5 px-4">Clube</th>
                <th className="py-3.5 px-4">Nível Atual</th>
                <th className="py-3.5 px-4 text-right">XP Total</th>
                <th className="py-3.5 px-4 text-right">Tokens RIB</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/80">
              {filteredMembers.map((member) => {
                const tier = TIERS_CONFIG[member.tierId]
                const isUser = !!member.isCurrentUser

                return (
                  <tr
                    key={member.id}
                    className={cn(
                      "transition-colors",
                      isUser
                        ? "bg-brand-primary/5 dark:bg-brand-primary/10 font-bold"
                        : "hover:bg-zinc-50 dark:hover:bg-zinc-900/40"
                    )}
                  >
                    <td className="py-4 px-4 text-center">
                      {member.rank === 1 ? (
                        <div className="w-7 h-7 mx-auto rounded-full bg-brand-primary/10 text-brand-primary border border-brand-primary/30 flex items-center justify-center font-black">
                          <Crown className="w-4 h-4" weight="fill" />
                        </div>
                      ) : member.rank === 2 ? (
                        <div className="w-7 h-7 mx-auto rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center font-black">
                          #2
                        </div>
                      ) : member.rank === 3 ? (
                        <div className="w-7 h-7 mx-auto rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center font-black">
                          #3
                        </div>
                      ) : (
                        <span className="font-bold text-zinc-400">
                          #{member.rank}
                        </span>
                      )}
                    </td>

                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <Avatar size="sm" className="shrink-0">
                          <AvatarImage src={member.avatar} alt={member.name} />
                          <AvatarFallback className="font-bold text-[10px] bg-zinc-900 text-white">
                            {getInitials(member.name)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-zinc-900 dark:text-white truncate">
                              {member.name}
                            </span>
                            {isUser && (
                              <Badge
                                color="primary"
                                variant="flat"
                                radius="sm"
                                className="text-[9px] font-black uppercase px-1.5 py-0 h-4"
                              >
                                Você
                              </Badge>
                            )}
                          </div>
                          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate">
                            {member.role} • {member.company}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-4">
                      <span className="font-semibold text-zinc-700 dark:text-zinc-300 text-xs">
                        {member.clubName}
                      </span>
                    </td>

                    <td className="py-4 px-4">
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

                    <td className="py-4 px-4 text-right">
                      <div className="inline-flex items-center justify-end gap-1 font-black font-heading text-sm text-zinc-900 dark:text-white whitespace-nowrap">
                        <div className="relative w-3.5 h-3.5 shrink-0">
                          <Image
                            src="/utils/gamification/utils/xp.webp"
                            alt="XP"
                            fill
                            className="object-contain"
                          />
                        </div>
                        <span>
                          {isUser ? xp.toLocaleString("pt-BR") : member.xp.toLocaleString("pt-BR")} XP
                        </span>
                      </div>
                    </td>

                    <td className="py-4 px-4 text-right">
                      <div className="inline-flex items-center justify-end gap-1 font-black text-zinc-900 dark:text-white whitespace-nowrap">
                        <div className="relative w-3.5 h-3.5 shrink-0">
                          <Image
                            src="/utils/gamification/utils/RIB.svg"
                            alt="RIB"
                            fill
                            className="object-contain"
                          />
                        </div>
                        <span>{isUser ? ribTokens : member.ribTokens}</span>
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
