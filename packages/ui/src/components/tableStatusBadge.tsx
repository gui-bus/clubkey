"use client"

import * as React from "react"

import { cn } from "../lib/utils"

export type TableStatusBadgeVariant =
  | "success"
  | "warning"
  | "danger"
  | "orange"
  | "info"
  | "neutral"
  | "primary"

export type TableStatusBadgeSize = "sm" | "md" | "lg" | "auto"

export interface TableStatusBadgeProps
  extends React.HTMLAttributes<HTMLDivElement> {
  variant?: TableStatusBadgeVariant
  size?: TableStatusBadgeSize
  label?: React.ReactNode
  icon?: React.ReactNode
}

const variantStyles: Record<TableStatusBadgeVariant, string> = {
  success:
    "bg-emerald-500/10 dark:bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 [&_.watermark-icon]:text-emerald-500/20 dark:[&_.watermark-icon]:text-emerald-400/20",
  warning:
    "bg-amber-500/10 dark:bg-amber-500/15 text-amber-700 dark:text-amber-400 [&_.watermark-icon]:text-amber-500/20 dark:[&_.watermark-icon]:text-amber-400/20",
  danger:
    "bg-rose-500/10 dark:bg-rose-500/15 text-rose-700 dark:text-rose-400 [&_.watermark-icon]:text-rose-500/20 dark:[&_.watermark-icon]:text-rose-400/20",
  orange:
    "bg-orange-500/10 dark:bg-orange-500/15 text-orange-700 dark:text-orange-400 [&_.watermark-icon]:text-orange-500/20 dark:[&_.watermark-icon]:text-orange-400/20",
  info:
    "bg-sky-500/10 dark:bg-sky-500/15 text-sky-700 dark:text-sky-400 [&_.watermark-icon]:text-sky-500/20 dark:[&_.watermark-icon]:text-sky-400/20",
  neutral:
    "bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 [&_.watermark-icon]:text-zinc-500/20 dark:[&_.watermark-icon]:text-zinc-400/20",
  primary:
    "bg-brand-primary/10 dark:bg-brand-primary/15 text-brand-primary [&_.watermark-icon]:text-brand-primary/20",
}

const sizeStyles: Record<TableStatusBadgeSize, string> = {
  sm: "w-[110px] h-8 px-2 text-[11px] rounded-lg",
  md: "w-[140px] h-9 px-3 text-xs rounded-xl",
  lg: "w-[165px] h-10 px-3.5 text-xs rounded-xl",
  auto: "w-auto min-w-[100px] h-8 px-3 text-[11px] rounded-lg",
}

export function TableStatusBadge({
  variant = "neutral",
  size = "sm",
  label,
  icon,
  children,
  className,
  ...props
}: TableStatusBadgeProps): React.JSX.Element {
  const content = label || children

  return (
    <div
      className={cn(
        "relative overflow-hidden flex items-center justify-center font-bold tracking-wide select-none",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      <span className="truncate z-10 font-bold">{content}</span>

      {icon && (
        <div className="watermark-icon absolute -right-2 -bottom-2 pointer-events-none -rotate-12 select-none flex items-center justify-center">
          {icon}
        </div>
      )}
    </div>
  )
}
