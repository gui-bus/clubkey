"use client"

import * as React from "react"

import Image from "next/image"

import { Container } from "@/src/components/common/container"

import { cn } from "@/src/lib/utils"

export interface PortalHeroProps {
  badge?: string
  title: React.ReactNode
  description: React.ReactNode
  imageSrc: string
  imageAlt: string
  imageClassName?: string
className?: string
  children?: React.ReactNode
}

export function PortalHero({
  badge,
  title,
  description,
  imageSrc,
  imageAlt,
  imageClassName,
  className,
  children,
}: PortalHeroProps): React.JSX.Element {
  return (
    <section
      id="hero"
      className={cn(
        "relative z-30 w-full bg-[#0D0D0D] text-white min-h-[520px] md:min-h-[560px] flex flex-col justify-center",
        className
      )}
    >
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          className={cn("object-cover object-top", imageClassName)}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-[#F1F1F1] dark:from-[#161616]/85 dark:via-[#161616]/65 dark:to-[#161616] z-10" />
      </div>

      <Container className="relative z-20 pt-36 pb-16 md:pt-44 md:pb-20 flex flex-col justify-center items-center text-center">
        <div className="max-w-5xl flex flex-col items-center text-center w-full">
          {badge && (
            <span className="text-xs uppercase tracking-widest mb-3">
              {badge}
            </span>
          )}

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-white leading-[1.05] mb-4 font-heading drop-shadow-md">
            {title}
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-zinc-200 font-light mb-8 leading-relaxed drop-shadow-sm max-w-2xl">
            {description}
          </p>

          {children}
        </div>
      </Container>
    </section>
  )
}
