"use client"

import * as React from "react"

import { type VariantProps, cva } from "class-variance-authority"

import { cn } from "@/src/lib/utils"

const inputVariants = cva(
  "flex w-full rounded-lg border bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/20 focus-visible:border-brand-primary disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "h-9 px-3 text-xs",
        md: "h-11 px-3.5 text-sm",
        lg: "h-13 px-4 text-base",
      },
      variant: {
        default: "border-zinc-200 dark:border-zinc-800",
        error:
          "border-red-500 focus-visible:ring-red-500/20 focus-visible:border-red-500",
      },
    },
    defaultVariants: {
      size: "md",
      variant: "default",
    },
  }
)

export interface InputProps
  extends
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "size">,
    VariantProps<typeof inputVariants> {
  startIcon?: React.ReactNode
  endIcon?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, size, variant, startIcon, endIcon, ...props }, ref) => {
    if (startIcon || endIcon) {
      return (
        <div className="relative flex items-center w-full">
          {startIcon && (
            <div className="absolute left-3.5 flex items-center justify-center text-zinc-400 pointer-events-none">
              {startIcon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              inputVariants({ size, variant }),
              startIcon && "pl-10",
              endIcon && "pr-10",
              className
            )}
            ref={ref}
            {...props}
          />
          {endIcon && (
            <div className="absolute right-3.5 flex items-center justify-center text-zinc-400">
              {endIcon}
            </div>
          )}
        </div>
      )
    }

    return (
      <input
        type={type}
        className={cn(inputVariants({ size, variant }), className)}
        ref={ref}
        {...props}
      />
    )
  }
)

Input.displayName = "Input"

export { Input, inputVariants }
