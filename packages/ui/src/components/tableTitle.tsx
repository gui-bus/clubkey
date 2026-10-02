import * as React from "react"

import { cn } from "../lib/utils"

export interface TableTitleProps extends Omit<
  React.HTMLAttributes<HTMLDivElement>,
  "title"
> {
  title: React.ReactNode
  description?: React.ReactNode
  badge?: React.ReactNode
  cta?: React.ReactNode
  children?: React.ReactNode
}

export function TableTitle({
  title,
  description,
  badge,
  cta,
  children,
  className,
  ...props
}: TableTitleProps): React.JSX.Element {
  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1",
        className
      )}
      {...props}
    >
      <div className="space-y-0.5 min-w-0">
        <div className="flex items-center gap-2">
          <h2 className="text-xs sm:text-sm font-black uppercase tracking-wider text-zinc-900 dark:text-white">
            {title}
          </h2>
          {badge}
        </div>
        {description && (
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
            {description}
          </p>
        )}
      </div>

      {(cta || children) && (
        <div className="w-full sm:w-auto flex items-center gap-2 shrink-0 [&>*]:w-full sm:[&>*]:w-auto">
          {cta}
          {children}
        </div>
      )}
    </div>
  )
}
