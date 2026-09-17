"use client"

import * as React from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"

import { getInitials } from "@/src/data/portalData"
import { usePortalStore } from "@/src/store/usePortalStore"
import {
  Calendar,
  CaretDown,
  CreditCard,
  MapPin,
  SignOut,
  Trophy,
  User,
} from "@phosphor-icons/react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar/avatar"
import { Badge } from "@/src/components/ui/badge/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/src/components/ui/dropdownMenu/dropdownMenu"

import { cn } from "@/src/lib/utils"

export interface UserDropdownMenuProps {
  isDarkBar?: boolean
  className?: string
}

export function UserDropdownMenu({
  isDarkBar = true,
  className,
}: UserDropdownMenuProps): React.JSX.Element | null {
  const router = useRouter()
  const { isAuthenticated, userProfile, logout, memberStays, confirmedEvents } =
    usePortalStore()

  if (!isAuthenticated || !userProfile) {
    return null
  }

  const staysCount = memberStays?.length ?? 2
  const eventsCount =
    Object.keys(confirmedEvents || {}).filter(
      (k) => !!confirmedEvents[Number(k)]
    ).length || 1

  const userInitials = getInitials(userProfile.name || "")
  const userEmail = userProfile.email || "william@tabatacapital.com"

  const handleLogout = () => {
    logout()
    router.push("/sign-in")
  }

  return (
    <div className={cn("flex items-center", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            id="navbar-profile-dropdown-trigger"
            type="button"
            suppressHydrationWarning
            className="cursor-pointer outline-none select-none text-left flex items-center gap-2.5 transition-opacity hover:opacity-90 py-1 bg-transparent border-0"
          >
            <Avatar size="sm">
              {userProfile.avatar && (
                <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
              )}
              <AvatarFallback className="font-bold text-[10px] bg-zinc-900 text-white dark:bg-zinc-800">
                {userInitials}
              </AvatarFallback>
            </Avatar>

            <div className="hidden sm:flex flex-col min-w-0 max-w-[140px] leading-tight">
              <span
                className={cn(
                  "text-xs font-semibold uppercase tracking-tight truncate",
                  isDarkBar ? "text-white" : "text-zinc-900 dark:text-white"
                )}
              >
                {userProfile.name}
              </span>
              <span className="text-[10px] font-normal text-zinc-400 dark:text-zinc-400 truncate">
                {userEmail}
              </span>
            </div>

            <CaretDown
              className={cn(
                "w-3 h-3 shrink-0 hidden sm:block",
                isDarkBar ? "text-zinc-300" : "text-zinc-400"
              )}
            />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-64 bg-white/95 dark:bg-[#141416]/95 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 p-2 rounded-sm shadow-2xl space-y-1"
        >
          <div className="px-3 py-2.5 border-b border-zinc-100 dark:border-zinc-800/80 mb-1 flex items-center gap-3">
            <Avatar size="sm">
              {userProfile.avatar && (
                <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
              )}
              <AvatarFallback className="font-bold text-[10px] bg-zinc-900 text-white dark:bg-zinc-800">
                {userInitials}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-zinc-900 dark:text-white truncate">
                {userProfile.name}
              </p>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400 truncate">
                {userEmail}
              </p>
            </div>
          </div>

          <div className="space-y-0.5">
            <DropdownMenuItem asChild>
              <Link
                href="/perfil"
                className="flex items-center gap-2.5 px-3 py-2 rounded-sm text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 hover:text-brand-primary dark:hover:text-brand-primary cursor-pointer transition-colors"
              >
                <User className="w-3.5 h-3.5 text-zinc-400" />
                <span>Meu Perfil</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link
                href="/keypass"
                className="flex items-center gap-2.5 px-3 py-2 rounded-sm text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 hover:text-brand-primary dark:hover:text-brand-primary cursor-pointer transition-colors"
              >
                <Trophy className="w-3.5 h-3.5 text-zinc-400" />
                <span>KeyPass</span>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link
                href="/hospedagens/minhas-hospedagens"
                className="flex items-center justify-between px-3 py-2 rounded-sm text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 hover:text-brand-primary dark:hover:text-brand-primary cursor-pointer transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Minhas Hospedagens</span>
                </div>
                <Badge
                  color="primary"
                  variant="flat"
                  size="sm"
                  radius="sm"
                  className="font-black text-[10px] px-1.5 py-0 min-w-4 h-4 flex items-center justify-center leading-none"
                >
                  {staysCount}
                </Badge>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link
                href="/eventos/meus-eventos"
                className="flex items-center justify-between px-3 py-2 rounded-sm text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 hover:text-brand-primary dark:hover:text-brand-primary cursor-pointer transition-colors group"
              >
                <div className="flex items-center gap-2.5">
                  <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                  <span>Meus Eventos</span>
                </div>
                <Badge
                  color="primary"
                  variant="flat"
                  size="sm"
                  radius="sm"
                  className="font-black text-[10px] px-1.5 py-0 min-w-4 h-4 flex items-center justify-center leading-none"
                >
                  {eventsCount}
                </Badge>
              </Link>
            </DropdownMenuItem>

            <DropdownMenuItem asChild>
              <Link
                href="/perfil/minha-assinatura"
                className="flex items-center gap-2.5 px-3 py-2 rounded-sm text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 hover:text-brand-primary dark:hover:text-brand-primary cursor-pointer transition-colors"
              >
                <CreditCard className="w-3.5 h-3.5 text-zinc-400" />
                <span>Minha Assinatura</span>
              </Link>
            </DropdownMenuItem>
          </div>

          <DropdownMenuSeparator className="my-1.5 bg-zinc-100 dark:bg-zinc-800" />

          <DropdownMenuItem
            onClick={handleLogout}
            className="flex items-center gap-2.5 px-3 py-2 rounded-sm text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 cursor-pointer transition-colors"
          >
            <SignOut className="w-3.5 h-3.5 text-rose-500" />
            <span>Sair do Portal</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
