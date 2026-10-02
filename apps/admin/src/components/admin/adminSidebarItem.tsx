"use client"

import Link from "next/link"

import { Badge, Tooltip, TooltipContent, TooltipTrigger } from "@clubkey/ui"
import { cn } from "@clubkey/utils"
import type { Icon as PhosphorIcon } from "@phosphor-icons/react"
import { AnimatePresence, motion } from "framer-motion"

export interface AdminSidebarItemProps {
  label: string
  href: string
  icon: PhosphorIcon
  isActive: boolean
  isCollapsed: boolean
  badge?: string
}

export function AdminSidebarItem({
  label,
  href,
  icon: Icon,
  isActive,
  isCollapsed,
  badge,
}: AdminSidebarItemProps) {
  const linkContent = (
    <Link
      href={href}
      className={cn(
        "group relative flex items-center rounded-sm transition-colors duration-150 cursor-pointer select-none",
        isCollapsed
          ? "h-10 w-10 justify-center mx-auto"
          : "h-10 w-full justify-between px-3 text-xs uppercase tracking-wider",
        isActive
          ? "text-zinc-900 dark:text-white bg-zinc-100 dark:bg-white/10 font-black shadow-xs"
          : "text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100/60 dark:hover:bg-white/5 font-semibold"
      )}
      aria-label={label}
    >
      <div
        className={cn(
          "flex items-center gap-2.5 min-w-0",
          isCollapsed && "justify-center"
        )}
      >
        <Icon
          size={isCollapsed ? 20 : 18}
          weight={isActive ? "fill" : "regular"}
          className={cn(
            "shrink-0 transition-colors duration-150",
            isActive
              ? "text-brand-primary"
              : "text-zinc-400 group-hover:text-zinc-700 dark:group-hover:text-zinc-200"
          )}
        />
        <AnimatePresence initial={false}>
          {!isCollapsed && (
            <motion.span
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -6 }}
              transition={{ duration: 0.15 }}
              className="truncate whitespace-nowrap"
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {!isCollapsed && (
        <div className="flex items-center gap-1.5 shrink-0">
          {badge && (
            <Badge
              color="primary"
              variant="flat"
              size="sm"
              radius="sm"
              className="font-black text-[10px] px-1.5 py-0 min-w-4 h-4 flex items-center justify-center leading-none"
            >
              {badge}
            </Badge>
          )}
          {isActive && (
            <motion.span
              layoutId="activeAdminNavIndicator"
              className="w-1.5 h-1.5 rounded-full bg-brand-primary shrink-0 shadow-xs"
              transition={{
                type: "spring",
                stiffness: 380,
                damping: 30,
              }}
            />
          )}
        </div>
      )}
    </Link>
  )

  if (isCollapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{linkContent}</TooltipTrigger>
        <TooltipContent
          side="right"
          sideOffset={10}
          color="primary"
          radius="sm"
          className="font-bold text-xs uppercase tracking-wider shadow-xl"
        >
          {label}
        </TooltipContent>
      </Tooltip>
    )
  }

  return linkContent
}
