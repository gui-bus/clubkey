"use client"

import * as React from "react"

import { cn } from "@/src/lib/utils"

export interface SectionHeaderProps {
  badge?: string
  tagline?: string
  icon?: React.ReactNode
  title: string
  description?: string
  actions?: React.ReactNode
  children?: React.ReactNode
  className?: string
  size?: "sm" | "md" | "lg"
}

export function SectionHeader({
  badge,
  tagline,
  icon,
  title,
  description,
  actions,
  children,
  className,
  size = "md",
}: SectionHeaderProps): React.JSX.Element {
  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1.5 min-w-0">
          {(badge || tagline || icon) && (
            <div className="flex flex-wrap items-center gap-2">
              {icon && (
                <div className="text-zinc-900 dark:text-white shrink-0">
                  {icon}
                </div>
              )}
              {badge && (
                <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-sm bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-700">
                  {badge}
                </span>
              )}
              {tagline && (
                <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                  {tagline}
                </span>
              )}
            </div>
          )}

          <div>
            <h1
              className={cn(
                "font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white",
                size === "lg"
                  ? "text-2xl sm:text-3xl"
                  : size === "sm"
                    ? "text-lg sm:text-xl"
                    : "text-xl sm:text-2xl"
              )}
            >
              {title}
            </h1>
            {description && (
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-2xl font-medium leading-relaxed mt-0.5">
                {description}
              </p>
            )}
          </div>
        </div>

        {actions && (
          <div className="flex flex-wrap items-center gap-2 self-start sm:self-auto shrink-0">
            {actions}
          </div>
        )}
      </div>

      {children}
    </div>
  )
}
