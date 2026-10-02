"use client"

import * as React from "react"

import Image from "next/image"

import { ShieldCheck } from "@phosphor-icons/react"

import { FloatingCta } from "@/src/components/landing/floatingCta"
import { Header } from "@/src/components/landing/header"
import { TopBanner } from "@/src/components/landing/topBanner"

import { cn } from "@/src/lib/utils"

import { brandConfig } from "@/src/config/brand.config"

export interface AuthSplitStat {
  value: string
  label: string
}

export interface AuthSplitLayoutProps {
  children: React.ReactNode
  bannerImage?: string
  bannerAlt?: string
  bannerTitle?: React.ReactNode
  bannerDescription?: string
  stats?: AuthSplitStat[]
  securityBadge?: string
  formTitle?: string
  formSubtitle?: string
  className?: string
}

const defaultStats: AuthSplitStat[] = [
  { value: "+4.500", label: "Acomodações Premium" },
  { value: "Até 60%", label: "Tarifas Last Minute" },
]

export function AuthSplitLayout({
  children,
  bannerImage = "/utils/banners/img_01.png",
  bannerAlt = `${brandConfig.name} - Hospedagens Exclusivas`,
  bannerTitle = (
    <>
      Sua chave para{" "}
      <span className="text-brand-primary">experiências únicas</span>
    </>
  ),
  bannerDescription = "Acesse tarifas exclusivas de associado com até 60% OFF em mais de 4.500 vilas, resorts e hotéis boutique selecionados.",
  stats = defaultStats,
  securityBadge = "ACESSO SEGURO & CRIPTOGRAFADO",
  formTitle,
  formSubtitle,
  className,
}: AuthSplitLayoutProps): React.JSX.Element {
  return (
    <main className="flex-1 w-full bg-[#F1F1F1] dark:bg-[#161616] text-[#111111] dark:text-white flex flex-col font-sans selection:bg-brand-primary/20 selection:text-brand-primary">
      <TopBanner />
      <Header isTransparent={false} />

      <section className="flex-1 w-full flex items-stretch">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12">
          <div className="hidden lg:flex lg:col-span-6 xl:col-span-6 relative bg-[#161616] text-white flex-col justify-end p-12 xl:p-16 overflow-hidden">
            <Image
              src={bannerImage}
              alt={bannerAlt}
              fill
              priority
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-[#0c0c0c]/50 to-[#0c0c0c]/70 z-10" />

            <div className="relative z-20 space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl xl:text-5xl font-black font-heading uppercase tracking-tight text-white leading-[1.08]">
                  {bannerTitle}
                </h2>
                <p className="text-sm xl:text-base text-zinc-300 font-light leading-relaxed max-w-lg">
                  {bannerDescription}
                </p>
              </div>

              {stats && stats.length > 0 && (
                <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/15">
                  {stats.map((stat, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="text-2xl xl:text-3xl font-black font-heading text-white">
                        {stat.value}
                      </div>
                      <div className="text-xs text-zinc-400 font-medium uppercase tracking-wider">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {securityBadge && (
                <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-zinc-400">
                  <ShieldCheck className="w-4 h-4 text-brand-primary" />
                  <span>{securityBadge}</span>
                </div>
              )}
            </div>
          </div>

          <div className="col-span-1 lg:col-span-6 xl:col-span-6 bg-white dark:bg-zinc-900 flex items-center justify-center p-6 sm:p-12 md:p-16 lg:p-20 transition-colors">
            <div className={cn("w-full max-w-md mx-auto py-8", className)}>
              {(formTitle || formSubtitle) && (
                <div className="mb-8 text-left">
                  {formTitle && (
                    <h1 className="text-2xl sm:text-3xl xl:text-4xl font-black text-zinc-900 dark:text-white font-heading tracking-tight uppercase">
                      {formTitle}
                    </h1>
                  )}
                  {formSubtitle && (
                    <p className="mt-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
                      {formSubtitle}
                    </p>
                  )}
                </div>
              )}
              {children}
            </div>
          </div>
        </div>
      </section>

      <FloatingCta />
    </main>
  )
}
