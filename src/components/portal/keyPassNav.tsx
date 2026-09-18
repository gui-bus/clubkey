"use client"

import * as React from "react"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { TIERS_CONFIG } from "@/src/data/portalData"
import { usePortalStore } from "@/src/store/usePortalStore"
import { BookOpen, ChartLineUp, Target, Trophy } from "@phosphor-icons/react"

import { Container } from "@/src/components/common/container"

import { cn } from "@/src/lib/utils"

const NAV_TABS = [
  {
    name: "Visão Geral",
    href: "/keypass",
    icon: ChartLineUp,
    exact: true,
  },
  {
    name: "Missões & Conquistas",
    href: "/keypass/missoes",
    icon: Target,
  },
  {
    name: "Ranking Geral",
    href: "/keypass/ranking",
    icon: Trophy,
  },
  {
    name: "Tiers & Regulamento",
    href: "/keypass/regras",
    icon: BookOpen,
  },
]

export function KeyPassNav(): React.JSX.Element {
  const pathname = usePathname()
  const { xp, ribTokens, getUserTier } = usePortalStore()
  const currentTier = getUserTier ? getUserTier() : TIERS_CONFIG.titular

  return (
    <div className="w-full bg-transparent border-b border-zinc-200 dark:border-zinc-800/80">
      <Container className="py-0">
        <div className="flex items-center justify-between gap-4">
          <nav className="flex items-center gap-1 sm:gap-2 overflow-x-auto scrollbar-none -mb-px">
            {NAV_TABS.map((tab) => {
              const Icon = tab.icon
              const isActive = tab.exact
                ? pathname === tab.href
                : pathname === tab.href || pathname?.startsWith(`${tab.href}/`)

              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  className={cn(
                    "flex items-center gap-2 px-3 sm:px-4 py-3.5 border-b-2 text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap group shrink-0 bg-transparent",
                    isActive
                      ? "border-brand-primary text-brand-primary font-black"
                      : "border-transparent text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:border-zinc-300 dark:hover:border-zinc-700"
                  )}
                >
                  <Icon
                    className={cn(
                      "w-4 h-4 transition-colors shrink-0",
                      isActive
                        ? "text-brand-primary"
                        : "text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-200"
                    )}
                    weight={isActive ? "fill" : "regular"}
                  />
                  <span>{tab.name}</span>
                </Link>
              )
            })}
          </nav>

          <div className="hidden md:flex items-center gap-3 shrink-0 py-2">
            <div className="flex items-center gap-2">
              <div className="relative w-5 h-5 shrink-0">
                <Image
                  src={currentTier.image}
                  alt={currentTier.name}
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xs font-black uppercase text-zinc-900 dark:text-white">
                {currentTier.name}
              </span>
              <div className="h-3.5 w-px bg-zinc-300 dark:bg-zinc-700" />
              <div className="flex items-center gap-1">
                <div className="relative w-3.5 h-3.5 shrink-0">
                  <Image
                    src="/utils/gamification/utils/xp.webp"
                    alt="XP"
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300">
                  {xp.toLocaleString("pt-BR")} XP
                </span>
              </div>
            </div>

            <div className="h-3.5 w-px bg-zinc-300 dark:bg-zinc-700" />

            <div className="flex items-center gap-1.5">
              <div className="relative w-4 h-4 shrink-0">
                <Image
                  src="/utils/gamification/utils/RIB.svg"
                  alt="Token RIB"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xs font-black text-zinc-900 dark:text-white">
                {ribTokens} RIB
              </span>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
