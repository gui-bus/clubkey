"use client"

import * as React from "react"
import Link from "next/link"
import { Users, ArrowRight } from "lucide-react"

import { Member, getInitials, getMemberSlug } from "@/src/data/portalData"
import { Avatar, AvatarImage, AvatarFallback } from "@/src/components/ui/avatar/avatar"
import { Badge } from "@/src/components/ui/badge/badge"

interface MatchCardProps {
  member: Member
  reason: string
}

export function MatchCard({ member, reason }: MatchCardProps): React.JSX.Element {
  return (
    <div className="relative w-full rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] p-6 sm:p-8 overflow-hidden shadow-sm">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
        <div className="space-y-4 flex-1">
          <Badge
            color="primary"
            variant="flat"
            size="md"
            radius="sm"
            startContent={<Users className="w-3.5 h-3.5" />}
            className="uppercase tracking-wider font-bold"
          >
            Recomendação de Conexão Estratégica
          </Badge>

          <div className="flex items-center gap-5">
            <Avatar size="2xl" radius="sm" className="shrink-0 ring-1 ring-zinc-200 dark:ring-zinc-800">
              {member.avatar && (
                <AvatarImage src={member.avatar} alt={member.name} />
              )}
              <AvatarFallback className="font-bold text-lg bg-zinc-900 text-white dark:bg-zinc-800">
                {getInitials(member.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-zinc-900 dark:text-white">
                {member.name}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-zinc-500 dark:text-zinc-400">
                {member.role} — {member.company} ({member.city})
              </p>
            </div>
          </div>

          <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
            {reason}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-sm bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800">
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-primary block mb-2">
                O que {member.name.split(" ")[0]} oferece
              </span>
              <div className="flex flex-wrap gap-1.5">
                {member.offering.map((tag) => (
                  <Badge
                    key={tag}
                    color="primary"
                    variant="flat"
                    size="sm"
                    radius="sm"
                    className="font-semibold"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-sm bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800">
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 block mb-2">
                O que {member.name.split(" ")[0]} procura
              </span>
              <div className="flex flex-wrap gap-1.5">
                {member.seeking.map((tag) => (
                  <Badge
                    key={tag}
                    color="default"
                    variant="flat"
                    size="sm"
                    radius="sm"
                    className="font-medium"
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="shrink-0 w-full lg:w-auto flex flex-col items-center sm:items-stretch gap-3">
          <Link
            href={`/conexoes/${member.id}/${getMemberSlug(member)}`}
            className="w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-sm bg-brand-primary hover:bg-brand-primary-hover text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
          >
            <span>Ver perfil completo</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  )
}
