"use client"

import Link from "next/link"

import { Tooltip, TooltipContent, TooltipTrigger } from "@clubkey/ui"
import { cn } from "@clubkey/utils"
import type { Icon as PhosphorIcon } from "@phosphor-icons/react"

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
        "group relative flex items-center rounded-lg text-sm font-medium transition-all duration-200",
        isCollapsed
          ? "h-11 w-11 justify-center mx-auto"
          : "h-10 w-full justify-between px-3.5",
        isActive
          ? "bg-primary text-primary-foreground shadow-xs"
          : "text-muted-foreground hover:bg-accent hover:text-foreground"
      )}
      aria-label={label}
    >
      <div
        className={cn(
          "flex items-center gap-3",
          isCollapsed && "justify-center"
        )}
      >
        <Icon
          size={isCollapsed ? 20 : 18}
          weight={isActive ? "fill" : "regular"}
          className={cn(
            "shrink-0 transition-transform duration-200",
            !isActive && "group-hover:scale-110"
          )}
        />
        {!isCollapsed && <span className="truncate">{label}</span>}
      </div>

      {!isCollapsed && badge && (
        <span
          className={cn(
            "rounded-full px-2 py-0.5 text-[10px] font-semibold transition-colors",
            isActive
              ? "bg-primary-foreground/20 text-primary-foreground"
              : "bg-muted text-muted-foreground"
          )}
        >
          {badge}
        </span>
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
          className="font-medium text-xs shadow-md"
        >
          {label}
        </TooltipContent>
      </Tooltip>
    )
  }

  return linkContent
}
