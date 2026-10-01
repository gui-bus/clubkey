"use client"

import * as React from "react"
import Image from "next/image"
import {
  ArrowsLeftRight,
  ArrowUpRight,
  CalendarBlank,
  CheckCircle,
  Clock,
  Copy,
  Check,
  Crown,
  EnvelopeSimple,
  IdentificationCard,
  MapPin,
  Tag,
  Phone,
  Prohibit,
  ShieldCheck,
  Sparkle,
  Wallet,
} from "@phosphor-icons/react"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  toast,
} from "@clubkey/ui"
import { cn } from "@clubkey/utils"
import type { AdminUser, AdminUserLevel, AdminAccountStatus } from "@clubkey/types"

export interface AdminUserHeroBannerProps {
  user: AdminUser
}

const LEVEL_CONFIG: Record<
  AdminUserLevel,
  { label: string; bg: string; text: string; icon: React.ComponentType<{ size?: number; className?: string; weight?: "bold" | "fill" | "regular" }> }
> = {
  PATRONO: {
    label: "Patrono",
    bg: "bg-amber-500/15 dark:bg-amber-500/20",
    text: "text-amber-600 dark:text-amber-400",
    icon: Crown,
  },
  DIAMANTE: {
    label: "Diamante",
    bg: "bg-cyan-500/15 dark:bg-cyan-500/20",
    text: "text-cyan-600 dark:text-cyan-400",
    icon: Sparkle,
  },
  BLACK: {
    label: "Black",
    bg: "bg-zinc-200 dark:bg-zinc-800",
    text: "text-zinc-800 dark:text-zinc-200",
    icon: ShieldCheck,
  },
  OURO: {
    label: "Ouro",
    bg: "bg-yellow-500/15 dark:bg-yellow-500/20",
    text: "text-yellow-600 dark:text-yellow-400",
    icon: Crown,
  },
  PRATA: {
    label: "Prata",
    bg: "bg-slate-400/15 dark:bg-slate-400/20",
    text: "text-slate-600 dark:text-slate-300",
    icon: ShieldCheck,
  },
  BRONZE: {
    label: "Bronze",
    bg: "bg-orange-500/15 dark:bg-orange-500/20",
    text: "text-orange-600 dark:text-orange-400",
    icon: ShieldCheck,
  },
}

const STATUS_CONFIG: Record<
  AdminAccountStatus,
  { label: string; dot: string; pill: string; icon: React.ComponentType<{ size?: number; className?: string; weight?: "bold" | "fill" | "regular" }> }
> = {
  CONFIRMADO: {
    label: "Confirmado",
    dot: "bg-emerald-500",
    pill: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400",
    icon: CheckCircle,
  },
  EM_ANALISE: {
    label: "Em Análise",
    dot: "bg-amber-500",
    pill: "bg-amber-500/15 text-amber-700 dark:text-amber-400",
    icon: Clock,
  },
  BLOQUEADO: {
    label: "Bloqueado",
    dot: "bg-rose-500",
    pill: "bg-rose-500/15 text-rose-700 dark:text-rose-400",
    icon: Prohibit,
  },
  PENDENTE: {
    label: "Pendente",
    dot: "bg-zinc-400",
    pill: "bg-zinc-500/15 text-zinc-700 dark:text-zinc-400",
    icon: Clock,
  },
}

export function AdminUserHeroBanner({ user }: AdminUserHeroBannerProps): React.JSX.Element {
  const [copiedWallet, setCopiedWallet] = React.useState(false)

  const levelStyle = LEVEL_CONFIG[user.level] || LEVEL_CONFIG.BRONZE
  const LevelIcon = levelStyle.icon
  const statusStyle = STATUS_CONFIG[user.accountStatus] || STATUS_CONFIG.CONFIRMADO
  const StatusIcon = statusStyle.icon

  const handleCopyWallet = () => {
    if (!user.walletFireblocks) return
    navigator.clipboard.writeText(user.walletFireblocks)
    setCopiedWallet(true)
    toast.success("Endereço da carteira copiado!")
    setTimeout(() => setCopiedWallet(false), 2000)
  }

  return (
    <div className="w-full py-1">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        
        <div className="flex flex-col sm:flex-row sm:items-start gap-5 sm:gap-6 min-w-0 flex-1">
          
          <div className="relative shrink-0">
            <Avatar className="size-24 sm:size-28 md:size-32 shrink-0 rounded-full bg-zinc-900 dark:bg-zinc-800 shadow-sm overflow-hidden">
              {user.avatar ? (
                <AvatarImage
                  src={user.avatar}
                  alt={user.name}
                  className="object-cover object-top"
                />
              ) : null}
              <AvatarFallback className="font-black text-3xl sm:text-4xl md:text-5xl bg-zinc-900 text-white dark:bg-zinc-800 dark:text-zinc-100">
                {user.initials}
              </AvatarFallback>
            </Avatar>
            <span
              className={cn(
                "absolute bottom-1 right-1 size-4 sm:size-5 rounded-full ring-2 ring-white dark:ring-[#141416] shadow-xs",
                statusStyle.dot
              )}
              title={statusStyle.label}
            />
          </div>

          
          <div className="space-y-3 min-w-0 flex-1 pt-1">
            
            <div className="space-y-2">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className="text-2xl sm:text-3xl font-black font-heading tracking-tight text-zinc-900 dark:text-white uppercase">
                  {user.name}
                </h2>
                <span className="font-mono text-xs font-bold text-zinc-600 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-xs">
                  {user.idTag}
                </span>
                <span className="font-mono text-xs font-semibold text-zinc-500 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded-xs">
                  {user.handle}
                </span>
              </div>

              
              <div className="flex items-center gap-2 flex-wrap">
                
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-xs text-xs font-black uppercase tracking-wider",
                    levelStyle.bg,
                    levelStyle.text
                  )}
                >
                  <LevelIcon size={13} weight="bold" />
                  <span>{levelStyle.label}</span>
                </span>

                
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-xs text-xs font-bold uppercase tracking-wider",
                    statusStyle.pill
                  )}
                >
                  <StatusIcon size={13} weight="bold" />
                  <span>{statusStyle.label}</span>
                </span>

                
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-xs text-xs font-mono font-semibold",
                    user.p2pStatus === "ON"
                      ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
                      : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500"
                  )}
                  title={`P2P: ${user.p2pStatus}`}
                >
                  <ArrowsLeftRight size={13} weight="bold" />
                  <span>P2P</span>
                  {user.p2pStatus === "ON" ? (
                    <Check size={11} weight="bold" className="text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <Prohibit size={11} weight="bold" />
                  )}
                </span>

                
                <span
                  className={cn(
                    "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-xs text-xs font-mono font-semibold",
                    user.saqueStatus === "ON"
                      ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
                      : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-500"
                  )}
                  title={`Saque: ${user.saqueStatus}`}
                >
                  <ArrowUpRight size={13} weight="bold" />
                  <span>Saque</span>
                  {user.saqueStatus === "ON" ? (
                    <Check size={11} weight="bold" className="text-emerald-600 dark:text-emerald-400" />
                  ) : (
                    <Prohibit size={11} weight="bold" />
                  )}
                </span>
              </div>
            </div>

            
            <div className="flex items-center gap-y-1.5 gap-x-4 text-xs text-zinc-600 dark:text-zinc-400 font-medium flex-wrap">
              
              <div className="inline-flex items-center gap-1.5">
                <EnvelopeSimple size={14} className="text-zinc-400 shrink-0" weight="bold" />
                <span className="text-zinc-800 dark:text-zinc-200">{user.email}</span>
              </div>

              
              <div className="inline-flex items-center gap-1.5">
                <IdentificationCard size={14} className="text-zinc-400 shrink-0" weight="bold" />
                <span>
                  {user.documentType}: <strong className="font-mono text-zinc-900 dark:text-zinc-100 font-bold">{user.documentNumber}</strong>
                </span>
              </div>

              
              {user.phone && (
                <div className="inline-flex items-center gap-1.5">
                  <Phone size={14} className="text-zinc-400 shrink-0" weight="bold" />
                  <span className="font-mono text-zinc-800 dark:text-zinc-200">{user.phone}</span>
                </div>
              )}

              
              {(user.city || user.state) && (
                <div className="inline-flex items-center gap-1.5">
                  <MapPin size={14} className="text-zinc-400 shrink-0" weight="bold" />
                  <span>{[user.city, user.state].filter(Boolean).join(", ")}</span>
                </div>
              )}

              
              <div className="inline-flex items-center gap-1.5">
                <Tag size={14} className="text-zinc-400 shrink-0" weight="bold" />
                <span>
                  Taxa: <strong className="text-zinc-900 dark:text-zinc-100 font-bold">{user.taxa}</strong>
                </span>
              </div>

              
              <div className="inline-flex items-center gap-1.5">
                <CalendarBlank size={14} className="text-zinc-400 shrink-0" weight="bold" />
                <span>
                  Cadastro: <strong className="text-zinc-900 dark:text-zinc-100 font-bold">{user.createdAt}</strong>
                </span>
              </div>
            </div>

            
            {user.walletFireblocks && (
              <div className="flex items-center gap-2 pt-0.5">
                <div className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-500 dark:text-zinc-400">
                  <Wallet size={13} className="text-zinc-400 shrink-0" weight="bold" />
                  <span className="text-zinc-400 dark:text-zinc-500">Carteira:</span>
                  <span className="text-zinc-700 dark:text-zinc-300 font-medium truncate max-w-[240px] sm:max-w-xs md:max-w-md">
                    {user.walletFireblocks}
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyWallet}
                    className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer p-0.5"
                    title="Copiar carteira"
                  >
                    {copiedWallet ? (
                      <Check size={12} className="text-emerald-500" weight="bold" />
                    ) : (
                      <Copy size={12} weight="bold" />
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        
        <div className="shrink-0 w-full lg:w-auto self-start lg:self-center">
          <div className="space-y-1.5 text-left lg:text-right">
            <div className="flex items-center lg:justify-end gap-1.5 text-zinc-400 dark:text-zinc-500 text-[10px] font-bold uppercase tracking-wider">
              <Wallet size={13} weight="bold" className="text-brand-primary" />
              <span>Saldo em Custódia</span>
            </div>

            <div className="flex items-center lg:justify-end gap-1.5">
              <span className="font-mono font-black text-2xl sm:text-3xl text-zinc-900 dark:text-white tracking-tight">
                {(user.balances?.total || 0).toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
              <div className="relative w-5 h-5 shrink-0 inline-block">
                <Image
                  src="/utils/gamification/utils/RIB.svg"
                  alt="RIB"
                  fill
                  className="object-contain"
                />
              </div>
            </div>

            
            <div className="flex items-center lg:justify-end gap-2 text-xs font-mono">
              <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                <span className="text-zinc-400 dark:text-zinc-500 text-[11px]">Disp:</span>
                <span>{(user.balances?.available || 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
              </div>
              <span className="text-zinc-300 dark:text-zinc-700">•</span>
              <div className="flex items-center gap-1 text-rose-600 dark:text-rose-400">
                <span className="text-zinc-400 dark:text-zinc-500 text-[11px]">Bloq:</span>
                <span>{(user.balances?.blocked || 0).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
