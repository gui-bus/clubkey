"use client"

import * as React from "react"

import { Member, getInitials, getMemberSlug } from "@/src/data/portalData"
import { usePortalStore } from "@/src/store/usePortalStore"
import {
  ArrowRight,
  Check,
  CheckCircle,
  Hourglass,
  Lightning,
  MapPin,
  Medal,
  Target,
  UserPlus,
} from "@phosphor-icons/react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar/avatar"
import { toast } from "@/src/components/ui/toast/toast"

import { CtaButton } from "@/src/components/common/ctaButton"

import { cn } from "@/src/lib/utils"

import { useMounted } from "@/src/hooks/useMounted"

interface MatchCardProps {
  member: Member
  reason: string
}

export function MatchCard({
  member,
  reason,
}: MatchCardProps): React.JSX.Element {
  const { toggleConnect, getConnectionStatus } = usePortalStore()
  const mounted = useMounted()

  const status = mounted ? getConnectionStatus(member.id) : "none"
  const fullName = `${member.firstName} ${member.lastName}`.trim()
  const memberSlug = getMemberSlug(member)

  const handleConnect = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault()
    e.stopPropagation()
    if (status !== "none") return
    toggleConnect(member.id)
    toast.success(`Solicitação enviada para ${fullName}!`, {
      description: "Você poderá trocar mensagens antes do encontro.",
    })
  }

  return (
    <div className="relative w-full rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] p-6 sm:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-zinc-100 dark:border-zinc-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-sm bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white flex items-center justify-center shrink-0">
            <Lightning
              className="w-5 h-5 text-zinc-900 dark:text-white"
              weight="fill"
            />
          </div>
          <div>
            <span className="text-sm font-black uppercase tracking-wider text-zinc-900 dark:text-white block">
              Match Estratégico do Clube
            </span>
            <span className="text-xs text-zinc-900 dark:text-white font-medium">
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
                alt={fullName}
                className="object-cover object-top"
              />
            )}
            <AvatarFallback className="font-black text-lg bg-zinc-900 text-white dark:bg-zinc-800">
              {getInitials(member.firstName, member.lastName)}
            </AvatarFallback>
          </Avatar>

          <div className="min-w-0 space-y-1">
            <h2 className="text-xl sm:text-2xl font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white truncate">
              {fullName}
            </h2>
            <p className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-white truncate">
              {member.role} • {member.company}
            </p>
            <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-900 dark:text-white pt-0.5">
              <span className="flex items-center gap-1 font-semibold text-zinc-900 dark:text-white">
                <MapPin className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                {member.city}
              </span>
              <span className="text-zinc-300 dark:text-zinc-700 hidden sm:inline">
                •
              </span>
              <span className="font-medium text-zinc-900 dark:text-white">
                Membro desde {member.memberSince || 2021}
              </span>
            </div>
          </div>
        </div>

        <div className="shrink-0 w-full lg:w-auto flex items-center gap-2">
          <CtaButton
            href={`/conexoes/${member.id}/${memberSlug}`}
            variant="secondary"
            size="md"
            className="flex-1 lg:flex-none px-6 h-11 text-xs shadow-none hover:shadow-none"
          >
            <span>Ver perfil completo</span>
            <ArrowRight className="w-4 h-4 ml-2 shrink-0" />
          </CtaButton>

          <CtaButton
            type="button"
            variant={
              status === "connected"
                ? "secondary"
                : status === "pending"
                  ? "secondary"
                  : "primary"
            }
            size="md"
            onClick={handleConnect}
            disabled={status !== "none"}
            className={cn(
              "w-11 h-11 px-0 rounded-sm shrink-0 z-10 shadow-none hover:shadow-none flex items-center justify-center border",
              status === "connected" &&
                "bg-emerald-500/15 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 opacity-100 cursor-default",
              status === "pending" &&
                "bg-sky-500/15 border-sky-500/30 text-sky-600 dark:text-sky-400 opacity-100 cursor-default",
              status === "none" && "border-transparent"
            )}
            sliderClassName={
              status === "connected"
                ? "bg-emerald-500/20"
                : status === "pending"
                  ? "bg-sky-500/20"
                  : undefined
            }
            textClassName={cn(
              status === "connected" &&
                "text-emerald-600 dark:text-emerald-400",
              status === "pending" && "text-sky-600 dark:text-sky-400",
              status === "none" && "text-white"
            )}
            title={
              status === "connected"
                ? "Conectado"
                : status === "pending"
                  ? "Aguardando resposta"
                  : "Conectar"
            }
          >
            {status === "connected" ? (
              <Check className="w-4 h-4" />
            ) : status === "pending" ? (
              <Hourglass className="w-4 h-4" />
            ) : (
              <UserPlus className="w-4 h-4" />
            )}
          </CtaButton>
        </div>
      </div>

      <div className="space-y-1.5 pt-2 border-t border-zinc-100 dark:border-zinc-800">
        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-900 dark:text-white block">
          Por que conectar com {member.firstName}:
        </span>
        <p className="text-xs sm:text-sm text-zinc-900 dark:text-white leading-relaxed font-normal">
          {reason}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 border-t border-zinc-100 dark:border-zinc-800">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Medal className="w-3.5 h-3.5 text-zinc-900 dark:text-white shrink-0" />
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-900 dark:text-white">
              O que {member.firstName} oferece
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {member.offering.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white text-xs font-semibold uppercase tracking-wider border border-zinc-200 dark:border-zinc-700"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Target className="w-3.5 h-3.5 text-zinc-900 dark:text-white shrink-0" />
            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-900 dark:text-white">
              O que {member.firstName} procura
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {member.seeking.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white text-xs font-semibold uppercase tracking-wider border border-zinc-200 dark:border-zinc-700"
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
