"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { MapPin, UserPlus, Check, Hourglass, ArrowRight } from "@phosphor-icons/react"

import { Member, getInitials, getMemberSlug } from "@/src/data/portalData"
import { usePortalStore } from "@/src/store/usePortalStore"
import { toast } from "@/src/components/ui/toast/toast"
import { cn } from "@/src/lib/utils"

interface MemberCardProps {
  member: Member
  isHost?: boolean
  className?: string
}

export function MemberCard({ member, isHost, className }: MemberCardProps): React.JSX.Element {
  const { toggleConnect, getConnectionStatus } = usePortalStore()
  const status = getConnectionStatus(member.id)

  const handleConnect = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const prevStatus = status
    const nextStatus = toggleConnect(member.id)
    if (nextStatus === "pending") {
      toast.success(`Solicitação enviada para ${member.name}!`, {
        description: "Você poderá trocar mensagens antes do encontro."
      })
    } else if (prevStatus === "pending") {
      toast.info(`Solicitação para ${member.name} cancelada.`)
    } else if (prevStatus === "connected") {
      toast.info(`Conexão com ${member.name} desfeita.`)
    }
  }

  return (
    <Link
      href={`/conexoes/${member.id}/${getMemberSlug(member)}`}
      className={cn(
        "group flex flex-row rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors duration-200 overflow-hidden cursor-pointer",
        className
      )}
    >
      <div className="relative w-28 sm:w-32 md:w-36 shrink-0 bg-zinc-100 dark:bg-zinc-900 overflow-hidden">
        {member.avatar ? (
          <Image
            src={member.avatar}
            alt={member.name}
            fill
            sizes="(max-width: 640px) 112px, 144px"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center font-black text-xl bg-zinc-900 text-white dark:bg-zinc-800">
            {getInitials(member.name)}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {isHost && (
          <div className="absolute top-2 left-2 z-10">
            <span className="px-1.5 py-0.5 rounded-xs bg-brand-primary text-white text-[9px] font-black uppercase tracking-wider shadow-xs">
              Host
            </span>
          </div>
        )}
      </div>

      <div className="flex-1 p-3.5 sm:p-4 flex flex-col justify-between min-w-0 space-y-3">
        <div className="space-y-2.5">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <h3 className="text-xs sm:text-sm font-bold uppercase tracking-tight text-zinc-900 dark:text-white truncate group-hover:text-brand-primary transition-colors">
                {member.name}
              </h3>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 truncate">
                {member.role}
              </p>
              <p className="text-[11px] font-semibold text-zinc-700 dark:text-zinc-300 truncate">
                {member.company}
              </p>
            </div>

            <button
              type="button"
              onClick={handleConnect}
              className={cn(
                "p-1.5 rounded-sm transition-all cursor-pointer shrink-0 z-10",
                status === "connected" &&
                  "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25",
                status === "pending" &&
                  "bg-sky-500/15 text-sky-600 dark:text-sky-400 border border-sky-500/30 hover:bg-sky-500/25",
                status === "none" &&
                  "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-brand-primary hover:text-white dark:hover:bg-brand-primary"
              )}
              title={
                status === "connected"
                  ? "Conectado (clique para desfazer)"
                  : status === "pending"
                    ? "Aguardando resposta (clique para cancelar)"
                    : "Conectar"
              }
            >
              {status === "connected" ? (
                <Check className="w-3.5 h-3.5" />
              ) : status === "pending" ? (
                <Hourglass className="w-3.5 h-3.5" />
              ) : (
                <UserPlus className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-zinc-400">
            <MapPin className="w-3 h-3 text-brand-primary shrink-0" />
            <span className="truncate">{member.city}</span>
          </div>

          <div className="p-2 sm:p-2.5 rounded-sm bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800/80 space-y-1.5">
            <div>
              <span className="text-[9px] font-black uppercase tracking-widest text-brand-primary block">
                Oferece
              </span>
              <p className="text-[11px] font-medium text-zinc-800 dark:text-zinc-200 line-clamp-1 mt-0.5">
                {member.offering.join(" • ")}
              </p>
            </div>

            {member.seeking.length > 0 && (
              <div className="pt-1 border-t border-zinc-200/60 dark:border-zinc-800">
                <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 block">
                  Busca
                </span>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-1 mt-0.5">
                  {member.seeking.join(" • ")}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800/70">
          <div className="text-[11px] font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 group-hover:text-brand-primary flex items-center justify-between transition-colors">
            <span>Ver perfil</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  )
}
