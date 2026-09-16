"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Member, getInitials, getMemberSlug } from "@/src/data/portalData"
import { ArrowRight, MapPin } from "@phosphor-icons/react"
import { cn } from "@/src/lib/utils"

export interface RelatedMembersCardProps {
  member: Member
  className?: string
}

export function RelatedMembersCard({
  member,
  className,
}: RelatedMembersCardProps): React.JSX.Element {
  return (
    <Link
      href={`/conexoes/${member.id}/${getMemberSlug(member)}`}
      className={cn(
        "group relative flex flex-col sm:flex-row items-stretch overflow-hidden rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-200 shadow-xs cursor-pointer",
        className
      )}
    >
      <div className="relative w-full sm:w-44 h-36 sm:h-auto shrink-0 bg-zinc-950 overflow-hidden">
        {member.image || member.avatar ? (
          <Image
            src={member.image || member.avatar || ""}
            alt={member.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300 opacity-80 object-top"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center font-black text-2xl bg-zinc-900 text-white dark:bg-zinc-800">
            {getInitials(member.name)}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent sm:hidden" />
      </div>

      <div className="p-5 flex flex-col justify-between flex-1 gap-3 min-w-0">
        <div className="space-y-1">
          <div className="flex items-center justify-between gap-2 text-[11px] font-bold text-zinc-900 dark:text-white mb-1.5">
            <span className="inline-flex items-center px-2 py-0.5 rounded-xs bg-zinc-100 dark:bg-zinc-800 text-[10px] font-black uppercase tracking-wider text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700">
              Membro Desde {member.since || 2021}
            </span>
            <span className="text-zinc-900 dark:text-white font-medium flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-brand-primary shrink-0" />
              {member.city}
            </span>
          </div>
          <h3 className="text-sm sm:text-base font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white group-hover:text-brand-primary transition-colors line-clamp-1">
            {member.name}
          </h3>
          <p className="text-xs text-zinc-900 dark:text-white truncate">
            {member.role} • {member.company}
          </p>
        </div>

        <div className="flex items-center justify-between gap-3 text-xs text-brand-primary font-bold uppercase tracking-wider pt-2 border-t border-zinc-100 dark:border-zinc-800/60">
          <span>Ver perfil do membro</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </Link>
  )
}

export const RelatedMemberCard = RelatedMembersCard
