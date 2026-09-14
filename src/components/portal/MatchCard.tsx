"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Users, ArrowRight } from "lucide-react"

import { Member, getInitials } from "@/src/data/portalData"

interface MatchCardProps {
  member: Member
  reason: string
}

export function MatchCard({ member, reason }: MatchCardProps): React.JSX.Element {
  return (
    <div className="relative w-full rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] p-6 sm:p-8 overflow-hidden shadow-sm">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
        <div className="space-y-4 flex-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-wider bg-brand-primary/10 text-brand-primary border border-brand-primary/20">
            <Users className="w-3.5 h-3.5" />
            <span>Recomendação de Conexão Estratégica</span>
          </div>

          <div className="flex items-center gap-5">
            <div className="relative w-16 h-16 sm:w-18 sm:h-18 shrink-0 rounded-sm overflow-hidden bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-white flex items-center justify-center font-bold text-xl">
              {member.avatar ? (
                <Image
                  src={member.avatar}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              ) : (
                getInitials(member.name)
              )}
            </div>
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
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-sm text-xs font-semibold bg-brand-primary/10 text-brand-primary border border-brand-primary/20"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-sm bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800">
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400 block mb-2">
                O que {member.name.split(" ")[0]} procura
              </span>
              <div className="flex flex-wrap gap-1.5">
                {member.seeking.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-sm text-xs font-semibold bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="shrink-0 w-full lg:w-auto flex flex-col items-center sm:items-stretch gap-3">
          <Link
            href={`/pessoas/${member.id}`}
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
