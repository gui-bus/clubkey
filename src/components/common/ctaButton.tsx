import * as React from "react"

import Link from "next/link"

import { Ripple } from "@/src/lib/ripple/ripple"
import { useRipples } from "@/src/lib/ripple/useRipple"
import { cn } from "@/src/lib/utils"

export type CtaButtonSize = "xs" | "sm" | "md" | "lg"
export type CtaButtonVariant = "primary" | "secondary"

export interface CtaButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string
  target?: string
  rel?: string
  size?: CtaButtonSize
  variant?: CtaButtonVariant
  disableRipple?: boolean
  isFullWidth?: boolean
  children?: React.ReactNode
  className?: string
  sliderClassName?: string
  textClassName?: string
}

const sizeClasses: Record<CtaButtonSize, string> = {
  xs: "px-4 py-1.5 text-xs font-bold uppercase tracking-wider",
  sm: "px-4 py-2 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-bold uppercase tracking-wider",
  md: "px-6 py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider",
  lg: "px-8 py-4 text-sm font-bold uppercase tracking-wider",
}

const variantClasses: Record<CtaButtonVariant, string> = {
  primary: "bg-brand-primary text-white border-0 shadow-md hover:shadow-lg",
  secondary:
    "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs",
}

const defaultSliderClasses: Record<CtaButtonVariant, string> = {
  primary: "bg-brand-primary-dark",
  secondary: "bg-zinc-100 dark:bg-zinc-800",
}

const defaultTextClasses: Record<CtaButtonVariant, string> = {
  primary: "text-white",
  secondary: "text-zinc-900 dark:text-zinc-100",
}

export const CtaButton = React.forwardRef<
  HTMLButtonElement | HTMLAnchorElement,
  CtaButtonProps
>(
  (
    {
      href,
      target,
      rel,
      size = "md",
      variant = "primary",
      disableRipple = false,
      isFullWidth = false,
      children,
      className,
      sliderClassName,
      textClassName,
      type = "button",
      disabled,
      onClick,
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

    const combinedClasses = cn(
      "group relative inline-flex items-center justify-center overflow-hidden rounded-sm cursor-pointer select-none transition-all duration-300 ease-out active:scale-[0.98] will-change-transform",
      sizeClasses[size],
      variantClasses[variant],
      isFullWidth && "w-full",
      disabled &&
        "opacity-50 cursor-not-allowed pointer-events-none active:scale-100",
      className
    )

    const renderedSlider = (
      <span
        className={cn(
          "absolute inset-0 w-full h-full translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-none",
          defaultSliderClasses[variant],
          sliderClassName
        )}
      />
    )

    const renderedText = (
      <span
        className={cn(
          "relative z-10 inline-flex items-center justify-center transition-colors duration-300 pointer-events-none",
          defaultTextClasses[variant],
          textClassName
        )}
      >
        {children}
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

    if (href) {
      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          target={target}
          rel={rel}
          onClick={handlePointerClick}
          className={combinedClasses}
          {...(props as unknown as Omit<
            React.ComponentPropsWithoutRef<typeof Link>,
            "href"
          >)}
        >
          {renderedSlider}
          {renderedText}
          {renderedRipples}
        </Link>
      )
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        disabled={disabled}
        onClick={handlePointerClick}
        className={combinedClasses}
        {...props}
      >
        {renderedSlider}
        {renderedText}
        {renderedRipples}
      </button>
    )
  }
)

CtaButton.displayName = "CtaButton"
