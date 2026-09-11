"use client"

import * as React from "react"

import { Container } from "@/src/components/common/container"
import { FloatingCta } from "@/src/components/landing/FloatingCta"
import { Footer } from "@/src/components/landing/Footer"
import { Navbar } from "@/src/components/landing/Navbar"
import { TopBanner } from "@/src/components/landing/TopBanner"
import { cn } from "@/src/lib/utils/utils"

export interface AuthLayoutProps {
  children: React.ReactNode
  title?: string
  subtitle?: string
  maxWidth?: "sm" | "md" | "lg" | "xl"
  className?: string
}

const maxWidthMap = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-2xl",
}

export function AuthLayout({
  children,
  title,
  subtitle,
  maxWidth = "md",
  className,
}: AuthLayoutProps): React.JSX.Element {
  return (
    <main className="w-full bg-[#F1F1F1] dark:bg-[#161616] text-[#111111] dark:text-white flex flex-col font-sans selection:bg-brand-primary/20 selection:text-brand-primary">
      <TopBanner />
      <Navbar isTransparent={false} />

      <div className="flex-1 w-full py-10 sm:py-16 md:py-20 flex items-center justify-center">
        <Container className="flex items-center justify-center">
          <div className={cn("w-full mx-auto", maxWidthMap[maxWidth], className)}>
            <div className="w-full bg-white dark:bg-zinc-900 border border-zinc-200/90 dark:border-zinc-800 rounded-3xl p-6 sm:p-10 shadow-xl shadow-zinc-950/5 dark:shadow-none transition-all">
              {title && (
                <div className="mb-8 text-center">
                  <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white font-heading tracking-tight uppercase">
                    {title}
                  </h1>
                  {subtitle && (
                    <p className="mt-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
                      {subtitle}
                    </p>
                  )}
                </div>
              )}
              {children}
            </div>
          </div>
        </Container>
      </div>

      <Footer />
      <FloatingCta />
    </main>
  )
}
