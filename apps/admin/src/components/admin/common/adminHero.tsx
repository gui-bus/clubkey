"use client"

import * as React from "react"

import Image from "next/image"

import { cn } from "@clubkey/utils"

import { Container } from "@/src/components/common/container"

export interface AdminHeroProps {
  badge?: React.ReactNode
  title: React.ReactNode
  description: React.ReactNode
  imageSrc: string
  imageAlt: string
  imageClassName?: string
  className?: string
  children?: React.ReactNode
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
}: AdminHeroProps): React.JSX.Element {
  return (
    <section
      id="hero"
      className={cn(
        "relative z-30 w-full bg-[#121214] text-white flex flex-col justify-center",
        className
      )}
    >
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          priority
          className={cn("object-cover object-center", imageClassName)}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/50 to-[#F4F4F5] dark:from-[#121214]/90 dark:via-[#121214]/70 dark:to-[#121214] z-10" />

        <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#F4F4F5] dark:from-[#121214] via-[#F4F4F5]/85 dark:via-[#121214]/85 to-transparent z-10" />
      </div>

      <Container className="relative z-20 pt-7 pb-2 sm:pt-9 sm:pb-3 flex flex-col">
        <div className="flex flex-col w-full text-white">
          {badge && (
            <span className="text-xs uppercase tracking-widest mb-2 text-white/80 font-semibold drop-shadow-sm">
              {badge}
            </span>
          )}

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[1.05] mb-2.5 font-heading drop-shadow-md">
            {title}
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-white/90 font-light mb-5 leading-relaxed drop-shadow-sm">
            {description}
          </p>

          <div className="w-full flex justify-center">{children}</div>
        </div>
      </Container>
    </section>
  )
}
