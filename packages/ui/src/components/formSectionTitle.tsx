import * as React from "react"
import { cn } from "../lib/utils"

export interface FormSectionTitleProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title: React.ReactNode
  description?: React.ReactNode
  badge?: React.ReactNode
  action?: React.ReactNode
  bordered?: boolean
}

export function FormSectionTitle({
  title,
  description,
  badge,
  action,
  bordered = true,
  className,
  ...props
}: FormSectionTitleProps): React.JSX.Element {
  return (
    <div
      className={cn(
        "flex flex-col sm:flex-row sm:items-center justify-between gap-2",
        bordered && "border-b border-zinc-100 dark:border-zinc-800 pb-3",
        className
      )}
      {...props}
    >
      <div className="space-y-0.5 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
            {title}
          </h3>
          {badge}
        </div>
        {description && (
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
            {description}
          </p>
        )}
      </div>

      {action && (
        <div className="flex items-center gap-2 shrink-0">
          {action}
        </div>
      )}
    </div>
  )
}
