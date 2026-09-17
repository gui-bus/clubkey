"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRight, Crosshair, Trophy } from "@phosphor-icons/react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar/avatar"
import { CtaButton } from "@/src/components/common/ctaButton"
import {
  type LeaderboardMember,
  getInitials,
  getMemberSlug,
} from "@/src/data/portalData"
import { cn } from "@/src/lib/utils"

export interface LeaderboardTargetCardProps {
  currentUser: LeaderboardMember
  targetUser: LeaderboardMember | null
  timeframeLabel?: string
  className?: string
}

export function LeaderboardTargetCard({
  currentUser,
  targetUser,
  timeframeLabel = "Geral",
  className,
}: LeaderboardTargetCardProps): React.JSX.Element {
  if (!targetUser) {

    return (
      <div
        className={cn(
          "p-5 sm:p-6 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4",
          className
        )}
      >
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-sm bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 flex items-center justify-center shrink-0">
            <Trophy className="w-5 h-5 text-brand-primary shrink-0" weight="bold" />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 whitespace-nowrap">
                Liderança da Temporada ({timeframeLabel})
              </span>
            </div>
            <h3 className="text-base font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white">
              Você é o Líder #1 do Ranking!
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Continue participando dos eventos e estadias para defender sua posição no topo.
            </p>
          </div>
        </div>

        <CtaButton
          href="/keypass/missoes"
          variant="secondary"
          size="sm"
          className="text-xs font-bold whitespace-nowrap shrink-0"
        >
          <span>Ver Missões Ativas</span>
          <ArrowRight className="w-3.5 h-3.5 ml-1.5 shrink-0" />
        </CtaButton>
      </div>
    )
  }

  const xpDifference = Math.max(0, targetUser.xp - currentUser.xp)

  return (
    <div
      className={cn(
        "p-5 sm:p-6 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-2xs relative overflow-hidden",
        className
      )}
    >
      {}
      <Crosshair
        className="absolute -right-6 -bottom-8 w-40 h-40 text-zinc-100 dark:text-zinc-800 pointer-events-none select-none"
        weight="thin"
        aria-hidden
      />

      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 relative z-10">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 px-2 py-0.5 rounded-xs whitespace-nowrap shrink-0">
              <Crosshair className="w-3 h-3 text-brand-primary shrink-0" weight="bold" />
              <span>Próximo Alvo no Ranking</span>
            </span>
            <span className="text-xs text-zinc-400 dark:text-zinc-500 font-medium whitespace-nowrap">
              • {timeframeLabel}
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white">
            Faltam apenas{" "}
            <span className="text-brand-primary font-black">
              {xpDifference.toLocaleString("pt-BR")} XP
            </span>{" "}
            para alcançar a #{targetUser.rank} posição
          </h3>

          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-normal">
            Você está na{" "}
            <strong className="font-bold text-zinc-900 dark:text-white whitespace-nowrap">
              #{currentUser.rank} posição ({currentUser.xp.toLocaleString("pt-BR")} XP)
            </strong>
            . Ultrapasse{" "}
            <Link
              href={`/conexoes/${targetUser.id}/${getMemberSlug(targetUser)}`}
              className="font-bold text-zinc-900 dark:text-white hover:text-brand-primary underline whitespace-nowrap"
            >
              {targetUser.name}
            </Link>{" "}
            completando missões ou reservando novas experiências.
          </p>
        </div>

        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end pt-2 sm:pt-0 border-t sm:border-t-0 border-zinc-100 dark:border-zinc-800 shrink-0">
          {}
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-3xl font-heading font-black text-zinc-900/[0.12] dark:text-white/[0.12] leading-none tabular-nums select-none shrink-0">
              {targetUser.rank < 10 ? `0${targetUser.rank}` : targetUser.rank}
            </span>
            <Avatar size="sm" radius="full" className="w-9 h-9 shrink-0">
              <AvatarImage src={targetUser.avatar} alt={targetUser.name} />
              <AvatarFallback className="text-xs font-bold bg-zinc-900 text-white">
                {getInitials(targetUser.name)}
              </AvatarFallback>
            </Avatar>
            <div className="text-left min-w-0">
              <p className="text-xs font-bold text-zinc-900 dark:text-white truncate max-w-[120px]">
                {targetUser.name}
              </p>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400 tabular-nums whitespace-nowrap">
                {targetUser.xp.toLocaleString("pt-BR")} XP
              </p>
            </div>
          </div>

          <CtaButton
            href="/keypass/missoes"
            variant="primary"
            size="sm"
            className="text-xs font-bold whitespace-nowrap shrink-0"
          >
            <span>Ganhar XP</span>
          </CtaButton>
        </div>
      </div>
    </div>
  )
}
