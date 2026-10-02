"use client"

import * as React from "react"

import Image from "next/image"
import Link from "next/link"

import { Badge } from "@clubkey/ui"
import { cn } from "@clubkey/utils"

export interface AdminAuthSplitLayoutProps {
  children: React.ReactNode
  bannerImage?: string
  bannerAlt?: string
  badgeText?: string
  heroTitle?: React.ReactNode
  heroDescription?: string
  className?: string
}

export function AdminAuthSplitLayout({
  children,
  bannerImage = "/utils/banners/img_01.png",
  bannerAlt = "ClubKey Admin - Painel Administrativo",
  badgeText,
  heroTitle = "Painel administrativo",
  heroDescription = "Plataforma centralizada para gestão de membros, estadias exclusivas, ativos imobiliários, proteção de patrimônio e auditoria operacional.",
  className,
}: AdminAuthSplitLayoutProps): React.JSX.Element {
  return (
    <main className="min-h-screen w-full flex-1 flex flex-col bg-white dark:bg-[#141416] text-zinc-900 dark:text-zinc-100">
      {/* Full width & full height split grid constrained to max-w-440 */}
      <div className="w-full max-w-440 mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-screen flex-1">
        {/* Left Visual Hero Section */}
        <div className="hidden lg:flex lg:col-span-6 xl:col-span-7 relative bg-zinc-950 text-white flex-col justify-between p-12 xl:p-16 overflow-hidden">
          <Image
            src={bannerImage}
            alt={bannerAlt}
            fill
            priority
            className="object-cover object-center"
          />
          {/* Neutral dark photo overlay (no colored gradients) */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[0.5px] z-10" />

          {/* Top Brand Header */}
          <div className="relative z-20 flex items-center justify-between">
            <Link href="/" className="inline-block group focus:outline-none">
              <Image
                src="/logos/logo_white.svg"
                alt="ClubKey"
                width={260}
                height={76}
                priority
                className="h-14 sm:h-16 xl:h-20 w-auto object-contain transition-transform group-hover:scale-105"
              />
            </Link>

            {badgeText && (
              <Badge
                variant="flat"
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold uppercase tracking-wider text-[10px] px-3 py-1"
              >
                {badgeText}
              </Badge>
            )}
          </div>

          {/* Bottom Hero Content */}
          <div className="relative z-20 space-y-6 pt-12">
            <div className="space-y-3">
              <h1 className="text-3xl xl:text-5xl font-black font-heading uppercase tracking-tight text-white leading-[1.08]">
                {heroTitle}
              </h1>
              <p className="text-sm xl:text-base text-zinc-300 font-light leading-relaxed max-w-xl">
                {heroDescription}
              </p>
            </div>
          </div>
        </div>

        {/* Right Authentication Form Section */}
        <div className="col-span-1 lg:col-span-6 xl:col-span-5 flex flex-col justify-center items-center p-6 sm:p-10 md:p-14 xl:p-16 bg-white dark:bg-[#141416] transition-colors relative overflow-hidden">
          <div className={cn("w-full max-w-md mx-auto", className)}>
            {/* Mobile Brand Logo Header */}
            <div className="lg:hidden flex items-center justify-center mb-8 sm:mb-10">
              <Link href="/" className="inline-block focus:outline-none group">
                <Image
                  src="/logos/logo_black.svg"
                  alt="ClubKey"
                  width={220}
                  height={64}
                  priority
                  className="h-10 sm:h-12 w-auto object-contain dark:hidden group-hover:scale-105 transition-transform"
                />
                <Image
                  src="/logos/logo_white.svg"
                  alt="ClubKey"
                  width={220}
                  height={64}
                  priority
                  className="h-10 sm:h-12 w-auto object-contain hidden dark:block group-hover:scale-105 transition-transform"
                />
              </Link>
            </div>

            {children}
          </div>
        </div>
      </div>
    </main>
  )
}
