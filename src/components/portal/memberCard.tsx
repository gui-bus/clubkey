"use client"

import * as React from "react"

import Image from "next/image"
import Link from "next/link"

import { Member, getInitials, getMemberSlug } from "@/src/data/portalData"
import { usePortalStore } from "@/src/store/usePortalStore"
import {
  ArrowRight,
  Check,
  Hourglass,
  MapPin,
  UserMinus,
  UserPlus,
  X,
} from "@phosphor-icons/react"

import { toast } from "@/src/components/ui/toast/toast"

import { CtaButton } from "@/src/components/common/ctaButton"

import { cn } from "@/src/lib/utils"

import { useMounted } from "@/src/hooks/useMounted"

import { isModuleEnabled } from "@/src/config/brand.config"

interface MemberCardProps {
  member: Member
  isHost?: boolean
  className?: string
  onRemove?: (member: Member) => void
  onAccept?: (member: Member) => void
  onDecline?: (member: Member) => void
  onCancel?: (member: Member) => void
}

export function MemberCard({
  member,
  isHost,
  className,
  onRemove,
  onAccept,
  onDecline,
  onCancel,
}: MemberCardProps): React.JSX.Element {
  const { toggleConnect, getConnectionStatus } = usePortalStore()
  const mounted = useMounted()

  const status = mounted ? getConnectionStatus(member.id) : "none"

  const handleConnect = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault()
    e.stopPropagation()
    if (status !== "none") return
    toggleConnect(member.id)
    toast.success(
      `Solicitação enviada para ${member.firstName} ${member.lastName}!`,
      {
        description: "Você poderá trocar mensagens antes do encontro.",
      }
    )
  }

  const handleRemove = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault()
    e.stopPropagation()
    if (onRemove) {
      onRemove(member)
    }
  }

  const handleCancel = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    e.preventDefault()
    e.stopPropagation()
    if (onCancel) {
      onCancel(member)
    }
  }

  const fullName = `${member.firstName} ${member.lastName}`.trim()

  const isNetworking = isModuleEnabled("networking")

  const innerContent = (
    <>
      <div className="relative w-28 sm:w-32 md:w-36 shrink-0 bg-zinc-100 dark:bg-zinc-900 overflow-hidden">
        {member.avatar ? (
          <Image
            src={member.avatar}
            alt={fullName}
            fill
            sizes="(max-width: 640px) 112px, 144px"
            className={cn(
              "object-cover transition-transform duration-500",
              isNetworking && "group-hover/card:scale-105"
            )}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center font-black text-xl bg-zinc-900 text-white dark:bg-zinc-800">
            {getInitials(member.firstName, member.lastName)}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover/card:opacity-40 transition-opacity" />

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
          <div className="min-w-0">
            <h3
              className={cn(
                "text-xs sm:text-sm font-bold uppercase tracking-tight text-zinc-900 dark:text-white truncate transition-colors",
                isNetworking && "group-hover/card:text-brand-primary"
              )}
            >
              {fullName}
            </h3>
            <p className="text-[11px] truncate">
              <span className="font-medium text-zinc-900 dark:text-zinc-100">
                {member.role}
              </span>
              <span className="mx-1.5 text-zinc-400 dark:text-zinc-500">•</span>
              <span className="font-bold text-zinc-900 dark:text-white">
                {member.company}
              </span>
            </p>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] font-medium text-zinc-800 dark:text-zinc-200">
            <MapPin className="w-3 h-3 text-brand-primary shrink-0" />
            <span className="truncate">{member.city}</span>
          </div>

          <div className="space-y-2 pt-1 border-t border-zinc-100 dark:border-zinc-800/80">
            <div className="space-y-0.5">
              <span className="text-[9px] font-black uppercase tracking-widest text-zinc-900 dark:text-white block">
                Oferece
              </span>
              <p className="text-[11px] font-normal text-zinc-800 dark:text-zinc-200 line-clamp-1">
                {member.offering.join(" • ")}
              </p>
            </div>

            {member.seeking.length > 0 && (
              <div className="space-y-0.5">
                <span className="text-[9px] font-black uppercase tracking-widest text-zinc-900 dark:text-white block">
                  Busca
                </span>
                <p className="text-[11px] font-normal text-zinc-800 dark:text-zinc-200 line-clamp-1">
                  {member.seeking.join(" • ")}
                </p>
              </div>
            )}
          </div>
        </div>

        {isNetworking && (
          <div className="pt-1 flex items-center gap-2">
            {onAccept && onDecline ? (
              <div className="flex items-center gap-2 w-full">
                <CtaButton
                  type="button"
                  variant="primary"
                  size="xs"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    onAccept(member)
                  }}
                  className="flex-1 h-8 text-[11px] font-bold shadow-none hover:shadow-none"
                >
                  <Check className="w-3.5 h-3.5 mr-1" />
                  <span>
                    {isModuleEnabled("keypass")
                      ? "Aceitar (+50 XP)"
                      : "Aceitar"}
                  </span>
                </CtaButton>
                <CtaButton
                  type="button"
                  variant="dark-outline"
                  size="xs"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    onDecline(member)
                  }}
                  className="h-8 px-2.5 text-[11px] font-medium shadow-none hover:shadow-none text-zinc-900 dark:text-white"
                  title="Recusar convite"
                >
                  <X className="w-3.5 h-3.5" />
                </CtaButton>
              </div>
            ) : (
              <>
                <CtaButton
                  type="button"
                  variant="outline"
                  size="xs"
                  className="flex-1 h-8 text-[11px] font-bold uppercase tracking-wider shadow-none hover:shadow-none"
                  textClassName="flex items-center justify-between w-full"
                >
                  <span>Ver perfil</span>
                  <ArrowRight className="w-3.5 h-3.5 shrink-0" />
                </CtaButton>

                {onCancel ? (
                  <CtaButton
                    type="button"
                    variant="dark-outline"
                    size="xs"
                    onClick={handleCancel}
                    className="w-8 h-8 px-0 rounded-sm shrink-0 z-10 shadow-none hover:shadow-none flex items-center justify-center border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white"
                    sliderClassName="bg-red-500/15"
                    textClassName="text-zinc-900 dark:text-white group-hover:text-red-500 transition-colors"
                    title="Cancelar convite"
                  >
                    <X className="w-3.5 h-3.5" />
                  </CtaButton>
                ) : onRemove ? (
                  <CtaButton
                    type="button"
                    variant="dark-outline"
                    size="xs"
                    onClick={handleRemove}
                    className="w-8 h-8 px-0 rounded-sm shrink-0 z-10 shadow-none hover:shadow-none flex items-center justify-center border border-zinc-200 dark:border-zinc-700 text-zinc-900 dark:text-white"
                    sliderClassName="bg-red-500/15"
                    textClassName="text-zinc-900 dark:text-white group-hover:text-red-500 transition-colors"
                    title="Desfazer conexão"
                  >
                    <UserMinus className="w-3.5 h-3.5" />
                  </CtaButton>
                ) : (
                  <CtaButton
                    type="button"
                    variant={
                      status === "connected"
                        ? "dark-outline"
                        : status === "pending"
                          ? "dark-outline"
                          : "primary"
                    }
                    size="xs"
                    onClick={handleConnect}
                    disabled={status !== "none"}
                    className={cn(
                      "w-8 h-8 px-0 rounded-sm shrink-0 z-10 shadow-none hover:shadow-none flex items-center justify-center border",
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
                      <Check className="w-3.5 h-3.5" />
                    ) : status === "pending" ? (
                      <Hourglass className="w-3.5 h-3.5" />
                    ) : (
                      <UserPlus className="w-3.5 h-3.5" />
                    )}
                  </CtaButton>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </>
  )

  if (isNetworking) {
    return (
      <Link
        href={`/conexoes/${member.id}/${getMemberSlug(member)}`}
        className={cn(
          "group/card flex flex-row rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors duration-200 overflow-hidden cursor-pointer",
          className
        )}
      >
        {innerContent}
      </Link>
    )
  }

  return (
    <div
      className={cn(
        "group/card flex flex-row rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] transition-colors duration-200 overflow-hidden",
        className
      )}
    >
      {innerContent}
    </div>
  )
}
