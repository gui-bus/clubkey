"use client"

import * as React from "react"
import { cn } from "@/src/lib/utils"

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  isRequired?: boolean
}

export const Label = React.forwardRef<HTMLLabelElement, LabelProps>(
  ({ className, isRequired, children, ...props }, ref) => {
    return (
      <label
        ref={ref}
        className={cn(
          "text-sm font-medium leading-none text-zinc-900 dark:text-zinc-100 select-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 flex items-center gap-1",
          className
        )}
        {...props}
      >
        {children}
        {isRequired && (
          <span className="text-red-500 font-bold ml-0.5" aria-hidden="true">
            *
          </span>
        )}
      </label>
    )
  }
)

Label.displayName = "Label"
