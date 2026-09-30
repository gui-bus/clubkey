"use client"

import * as React from "react"

import { useRouter } from "next/navigation"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@clubkey/ui"
import { cn } from "@clubkey/utils"
import { CaretDown, SignOut } from "@phosphor-icons/react"
import { AnimatePresence, motion } from "framer-motion"

export interface AdminUserDropdownProps {
  isCollapsed: boolean
  className?: string
}

export function AdminUserDropdown({
  isCollapsed,
  className,
}: AdminUserDropdownProps): React.JSX.Element {
  const router = useRouter()
  const [dropdownOpen, setDropdownOpen] = React.useState(false)

  const adminName = "William Tabata"
  const adminRole = "SUPER ADMIN"
  const adminInitials = "WT"
  const adminAvatar =
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&auto=format&fit=crop&q=80"

  const handleLogout = () => {
    router.push("/login")
  }

  const triggerButton = (
    <button
      id="admin-profile-dropdown-trigger"
      type="button"
      suppressHydrationWarning
      className={cn(
        "cursor-pointer outline-none select-none text-left flex items-center transition-all duration-200 border-0 bg-transparent",
        isCollapsed
          ? "h-10 w-10 justify-center mx-auto rounded-sm"
          : "w-full justify-between gap-2 px-1.5 py-1 rounded-sm",
        className
      )}
      aria-label="Menu do Administrador"
    >
      <div className="flex items-center gap-2 min-w-0">
        <Avatar
          size="sm"
          className="shrink-0 ring-1 ring-zinc-300 dark:ring-zinc-700/80"
        >
          {adminAvatar && <AvatarImage src={adminAvatar} alt={adminName} />}
          <AvatarFallback className="font-bold text-[10px] bg-zinc-900 text-white dark:bg-zinc-800 dark:text-zinc-100">
            {adminInitials}
          </AvatarFallback>
        </Avatar>

        <AnimatePresence initial={false}>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -6 }}
              transition={{ duration: 0.15 }}
              className="flex flex-col min-w-0 max-w-[120px] leading-tight overflow-hidden"
            >
              <span className="text-xs font-semibold uppercase tracking-tight truncate text-zinc-900 dark:text-white">
                {adminName}
              </span>
              <span className="text-[10px] font-normal text-zinc-400 dark:text-zinc-400 uppercase tracking-wider truncate">
                {adminRole}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence initial={false}>
        {!isCollapsed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.15 }}
            className="shrink-0 ml-auto"
          >
            <CaretDown className="w-3 h-3 text-zinc-400" />
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  )

  return (
    <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <DropdownMenuTrigger asChild>{triggerButton}</DropdownMenuTrigger>

      <DropdownMenuContent
        side={isCollapsed ? "right" : "top"}
        align={isCollapsed ? "end" : "start"}
        sideOffset={isCollapsed ? 12 : 8}
        className="w-60 bg-white/95 dark:bg-[#141416]/95 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 p-2 rounded-sm shadow-2xl space-y-1 z-50"
      >
        {/* User Info Header with Role */}
        <div className="px-3 py-2 flex items-center gap-3">
          <Avatar
            size="sm"
            className="shrink-0 ring-1 ring-zinc-300 dark:ring-zinc-700/80"
          >
            {adminAvatar && <AvatarImage src={adminAvatar} alt={adminName} />}
            <AvatarFallback className="font-bold text-[10px] bg-zinc-900 text-white dark:bg-zinc-800 dark:text-zinc-100">
              {adminInitials}
            </AvatarFallback>
          </Avatar>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-zinc-900 dark:text-white truncate">
              {adminName}
            </p>
            <p className="text-[10px] text-zinc-500 dark:text-zinc-400 uppercase tracking-wider truncate">
              {adminRole}
            </p>
          </div>
        </div>

        <DropdownMenuSeparator className="mx-0 my-1 h-0 bg-transparent border-t border-zinc-200 dark:border-zinc-800" />

        {/* Logout Option matching portal style */}
        <DropdownMenuItem
          onClick={handleLogout}
          className="flex items-center gap-2.5 px-3 py-2 rounded-sm text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 cursor-pointer transition-colors"
        >
          <SignOut className="w-3.5 h-3.5 text-rose-500" />
          <span>Sair do Painel</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
