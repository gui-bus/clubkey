"use client"

import * as React from "react"
import Link from "next/link"
import { Ripple } from "../lib/ripple/ripple"
import { useRipples } from "../lib/ripple/useRipple"
import { cn } from "../lib/utils"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip/tooltip"

export type TableActionButtonVariant =
  | "default"
  | "danger"
  | "primary"
  | "success"

export type TableActionButtonSize = "xs" | "sm" | "md"

export interface TableActionButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  tooltip?: React.ReactNode
  tooltipColor?:
    | "default"
    | "primary"
    | "secondary"
    | "accent"
    | "success"
    | "warning"
    | "danger"
  tooltipRadius?:
    | "none"
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "full"
  variant?: TableActionButtonVariant
  size?: TableActionButtonSize
  href?: string
  target?: string
  rel?: string
  icon?: React.ReactNode
  side?: "top" | "bottom" | "left" | "right"
  sideOffset?: number
  sliderClassName?: string
  iconClassName?: string
  disableRipple?: boolean
}

const sizeClasses: Record<TableActionButtonSize, string> = {
  xs: "size-6 text-xs",
  sm: "size-7 text-sm",
  md: "size-8 text-base",
}

const variantClasses: Record<TableActionButtonVariant, string> = {
  default: "text-zinc-400 hover:text-zinc-900 dark:hover:text-white",
  danger: "text-zinc-400 hover:text-rose-600 dark:hover:text-rose-400",
  primary: "text-zinc-400 hover:text-brand-primary",
  success: "text-zinc-400 hover:text-emerald-600 dark:hover:text-emerald-400",
}

const defaultSliderClasses: Record<TableActionButtonVariant, string> = {
  default: "bg-zinc-100 dark:bg-zinc-800",
  danger: "bg-rose-50 dark:bg-rose-950/40",
  primary: "bg-brand-primary/10",
  success: "bg-emerald-50 dark:bg-emerald-950/40",
}

const defaultContentClasses: Record<TableActionButtonVariant, string> = {
  default:
    "text-zinc-400 group-hover/btn:text-zinc-900 dark:text-zinc-500 dark:group-hover/btn:text-white",
  danger:
    "text-zinc-400 group-hover/btn:text-rose-600 dark:text-zinc-500 dark:group-hover/btn:text-rose-400",
  primary:
    "text-zinc-400 group-hover/btn:text-brand-primary dark:text-zinc-500 dark:group-hover/btn:text-brand-primary",
  success:
    "text-zinc-400 group-hover/btn:text-emerald-600 dark:text-zinc-500 dark:group-hover/btn:text-emerald-400",
}

export const TableActionButton = React.forwardRef<
  HTMLButtonElement,
  TableActionButtonProps
>(
  (
    {
      tooltip,
      tooltipColor = "primary",
      tooltipRadius = "sm",
      title,
      variant = "default",
      size = "sm",
      href,
      target,
      rel,
      icon,
      children,
      className,
      sliderClassName,
      iconClassName,
      disableRipple = false,
      disabled,
      onClick,
      side = "top",
      sideOffset = 6,
      type = "button",
      ...props
    },
    ref
  ) => {
    const { ripples, addRipple, removeRipple } = useRipples()

    const handlePointerClick = (
      e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
    ) => {
      if (disabled) return

      if (!disableRipple) {
        const rect = e.currentTarget.getBoundingClientRect()
        const rippleSize = Math.max(rect.width, rect.height)
        addRipple(e.clientX - rect.left, e.clientY - rect.top, rippleSize)
      }

      onClick?.(e as React.MouseEvent<HTMLButtonElement>)
    }

    const tooltipText = tooltip || title

    const combinedClassName = cn(
      "group/btn relative inline-flex items-center justify-center overflow-hidden rounded-sm cursor-pointer select-none transition-all duration-300 ease-out active:scale-[0.95] will-change-transform shrink-0 disabled:opacity-40 disabled:pointer-events-none",
      sizeClasses[size],
      variantClasses[variant],
      className
    )

    const renderedSlider = (
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-0 w-full h-full translate-y-full group-hover/btn:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none rounded-sm",
          defaultSliderClasses[variant],
          sliderClassName
        )}
      />
    )

    const renderedContent = (
      <span
        className={cn(
          "relative z-10 inline-flex items-center justify-center transition-colors duration-300 pointer-events-none",
          defaultContentClasses[variant],
          iconClassName
        )}
      >
        {icon || children}
      </span>
    )

    const renderedRipples = ripples.map((r) => (
      <Ripple
        key={r.id}
        x={r.x}
        y={r.y}
        size={r.size}
        onComplete={() => removeRipple(r.id)}
      />
    ))

    const buttonElement = href ? (
      <Link
        href={href}
        target={target}
        rel={rel}
        className={combinedClassName}
        onClick={handlePointerClick}
      >
        {renderedSlider}
        {renderedContent}
        {renderedRipples}
      </Link>
    ) : (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        className={combinedClassName}
        onClick={handlePointerClick}
        {...props}
      >
        {renderedSlider}
        {renderedContent}
        {renderedRipples}
      </button>
    )

    if (!tooltipText) {
      return buttonElement
    }

    return (
      <TooltipProvider delayDuration={150}>
        <Tooltip>
          <TooltipTrigger asChild>{buttonElement}</TooltipTrigger>
          <TooltipContent
            side={side}
            sideOffset={sideOffset}
            color={tooltipColor}
            radius={tooltipRadius}
            size="sm"
            className="font-bold text-[10px] uppercase tracking-wider shadow-xl"
          >
            {tooltipText}
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )
  }
)

TableActionButton.displayName = "TableActionButton"
