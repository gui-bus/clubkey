import * as React from "react"

import Link from "next/link"

import { cn } from "@/src/lib/utils/utils"

export type CtaButtonSize = "xs" | "sm" | "md" | "lg"

export interface CtaButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string
  target?: string
  rel?: string
  size?: CtaButtonSize
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
      isFullWidth = false,
      children,
      className,
      sliderClassName,
      textClassName,
      type = "button",
      ...props
    },
    ref
  ) => {
    const combinedClasses = cn(
      "group relative inline-flex items-center justify-center overflow-hidden rounded-sm bg-brand-primary text-white shadow-md cursor-pointer transition-all duration-300 select-none",
      sizeClasses[size],
      isFullWidth && "w-full",
      className
    )

    if (href) {
      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          target={target}
          rel={rel}
          className={combinedClasses}
          {...(props as unknown as Omit<
            React.ComponentPropsWithoutRef<typeof Link>,
            "href"
          >)}
        >
          <span
            className={cn(
              "absolute inset-0 w-full h-full bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out",
              sliderClassName
            )}
          />
          <span
            className={cn(
              "relative z-10 inline-flex items-center justify-center text-white group-hover:text-zinc-950 transition-colors duration-300",
              textClassName
            )}
          >
            {children}
          </span>
        </Link>
      )
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type={type}
        className={combinedClasses}
        {...props}
      >
        <span
          className={cn(
            "absolute inset-0 w-full h-full bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out",
            sliderClassName
          )}
        />
        <span
          className={cn(
            "relative z-10 inline-flex items-center justify-center text-white group-hover:text-zinc-950 transition-colors duration-300",
            textClassName
          )}
        >
          {children}
        </span>
      </button>
    )
  }
)

CtaButton.displayName = "CtaButton"
