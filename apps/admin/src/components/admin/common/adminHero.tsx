"use client"

import * as React from "react"

import { cn } from "@clubkey/utils"

import { Container } from "@/src/components/common/container"

export interface AdminHeroProps {
  badge?: React.ReactNode
  title: React.ReactNode
  description: React.ReactNode
  imageSrc?: string
  imageAlt?: string
  imageClassName?: string
  className?: string
  children?: React.ReactNode
}

export function AdminHero({
  badge,
  title,
  description,
  className,
  children,
}: AdminHeroProps): React.JSX.Element {
  return (
    <section
      id="hero"
      className={cn(
        "relative z-30 w-full flex flex-col justify-center",
        className
      )}
    >
      <Container className="pt-6 sm:pt-8 pb-0 flex flex-col">
        <div className="flex flex-col w-full">
          {badge && (
            <div className="text-xs uppercase tracking-widest mb-2 text-zinc-500 dark:text-zinc-400 font-semibold">
              {badge}
            </div>
          )}

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-zinc-900 dark:text-white leading-[1.05] mb-2.5 font-heading">
            {title}
          </h1>

          <p
            className={cn(
              "text-sm sm:text-base md:text-lg text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed",
              children ? "mb-4 sm:mb-5" : "mb-0"
            )}
          >
            {description}
          </p>

          {children && <div className="w-full">{children}</div>}
        </div>
      </Container>
    </section>
  )
}
