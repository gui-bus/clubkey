import * as React from "react"

import { cn } from "@/src/lib/utils"

export interface GlassBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode
  icon?: React.ReactNode
  size?: "sm" | "md"
  className?: string
}

export function GlassBadge({
  children,
  icon,
  size = "sm",
  className,
  ...props
}: GlassBadgeProps): React.JSX.Element {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-sm bg-white/10 backdrop-blur-md text-white font-bold uppercase tracking-widest border border-white/15 select-none transition-colors",
        size === "sm" && "px-2.5 py-1 text-[10px]",
        size === "md" && "px-3.5 py-1.5 text-[11px] font-black",
        className
      )}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children && <span>{children}</span>}
    </span>
  )
}
