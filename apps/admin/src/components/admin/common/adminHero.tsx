"use client"

import * as React from "react"
import Image from "next/image"
import { cn } from "@clubkey/utils"

export interface AdminHeroProps {
  badge?: React.ReactNode
  title: React.ReactNode
  description: React.ReactNode
  imageSrc: string
  imageAlt: string
  imageClassName?: string
  className?: string
  children?: React.ReactNode
  actions?: React.ReactNode
}

export function AdminHero({
  badge,
  title,
  description,
  imageSrc,
  imageAlt,
  imageClassName,
  className,
  children,
  actions,
}: AdminHeroProps): React.JSX.Element {
  return (
    <section
      id="admin-hero"
      className={cn(
        "relative z-20 w-full bg-[#161616] text-white min-h-[440px] md:min-h-[480px] flex flex-col justify-center overflow-hidden",
        "-mt-4 sm:-mt-6 lg:-mt-8 -mx-4 sm:-mx-6 lg:-mx-8 mb-8",
        className
      )}
    >
      {/* Background Image & Portal-Style Gradient Overlays */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          className={cn("object-cover object-center", imageClassName)}
        />
        {/* Multilayer gradient for optimal readability & smooth blend with dashboard background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/55 to-background dark:from-[#141416]/90 dark:via-[#141416]/70 dark:to-background z-10" />
      </div>

      {/* Top Actions Bar (if any) */}
      {actions && (
        <div className="relative z-20 w-full px-6 sm:px-10 lg:px-12 pt-6 sm:pt-8 flex items-center justify-end">
          {actions}
        </div>
      )}

      {/* Centered Hero Content */}
      <div className="relative z-20 px-4 sm:px-8 lg:px-12 py-12 sm:py-16 md:py-20 flex flex-col justify-center items-center text-center w-full">
        <div className="max-w-5xl flex flex-col items-center text-center w-full">
          {badge && (
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/15 text-white text-xs font-semibold uppercase tracking-widest mb-4 shadow-sm">
              {badge}
            </div>
          )}

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[1.05] mb-4 font-heading drop-shadow-md">
            {title}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-zinc-200 font-light mb-8 leading-relaxed drop-shadow-sm max-w-2xl">
            {description}
          </p>

          {/* Children Slot (e.g. Pill Filter & Search Bar) */}
          <div className="w-full">{children}</div>
        </div>
      </div>
    </section>
  )
}
