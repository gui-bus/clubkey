"use client"

import * as React from "react"
import { Lightning, ArrowRight, MapPin, Target, CheckCircle, Medal } from "@phosphor-icons/react"

import { Member, getInitials, getMemberSlug } from "@/src/data/portalData"
import { Avatar, AvatarImage, AvatarFallback } from "@/src/components/ui/avatar/avatar"
import { CtaButton } from "@/src/components/common/ctaButton"

interface MatchCardProps {
  member: Member
  reason: string
}

export function MatchCard({ member, reason }: MatchCardProps): React.JSX.Element {
  const firstName = member.name.split(" ")[0]
  const memberSlug = getMemberSlug(member)

  return (
    <div className="relative w-full rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] p-6 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-zinc-100 dark:border-zinc-800">
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-sm bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0">
            <Lightning className="w-3.5 h-3.5" />
          </div>
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-brand-primary block">
              Match Estratégico do Clube
            </span>
            <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">
              Conexão recomendada com base no seu perfil e interesses
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-wider border border-emerald-500/20">
            <CheckCircle className="w-3 h-3" />
            <span>98% Afinidade</span>
          </span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-start sm:items-center gap-4 min-w-0 flex-1">
          <Avatar
            size="2xl"
            radius="full"
            className="w-16 h-16 sm:w-20 sm:h-20 shrink-0 border border-zinc-200 dark:border-zinc-700 bg-zinc-900 ring-2 ring-zinc-100 dark:ring-zinc-800"
          >
            {(member.image || member.avatar) && (
              <AvatarImage
                src={member.image || member.avatar}
                alt={member.name}
                className="object-cover object-top"
              />
            )}
            <AvatarFallback className="font-black text-lg bg-zinc-900 text-white dark:bg-zinc-800">
              {getInitials(member.name)}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0 space-y-1">
            <h2 className="text-xl sm:text-2xl font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white truncate">
              {member.name}
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-zinc-600 dark:text-zinc-300 truncate">
              {member.role} • {member.company}
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400 pt-0.5">
              <span className="flex items-center gap-1 font-medium">
                <MapPin className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                {member.city}
              </span>
              <span className="text-zinc-300 dark:text-zinc-700 hidden sm:inline">•</span>
              <span>Membro desde {member.since || 2021}</span>
            </div>
          </div>
        </div>

        <div className="shrink-0 w-full lg:w-auto">
          <CtaButton
            href={`/conexoes/${member.id}/${memberSlug}`}
            variant="primary"
            size="md"
            className="w-full lg:w-auto px-7 h-12 text-xs shadow-none hover:shadow-none"
          >
            <span>Ver perfil completo</span>
            <ArrowRight className="w-4 h-4 ml-2 shrink-0" />
          </CtaButton>
        </div>
      </div>

      <div className="p-4 sm:p-5 rounded-sm bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 space-y-1.5">
        <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary block">
          Por que conectar com {firstName}:
        </span>
        <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
          {reason}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 sm:p-5 rounded-sm bg-zinc-50/50 dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800 space-y-2.5">
          <div className="flex items-center gap-2">
            <Medal className="w-3.5 h-3.5 text-brand-primary shrink-0" />
            <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary">
              O que {firstName} oferece
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {member.offering.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-xs bg-brand-primary/10 text-brand-primary text-xs font-bold uppercase tracking-wider border border-brand-primary/20"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="p-4 sm:p-5 rounded-sm bg-zinc-50/50 dark:bg-zinc-900/40 border border-zinc-200/80 dark:border-zinc-800 space-y-2.5">
          <div className="flex items-center gap-2">
            <Target className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
              O que {firstName} procura
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {member.seeking.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-semibold uppercase tracking-wider border border-zinc-200/80 dark:border-zinc-700/80"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
