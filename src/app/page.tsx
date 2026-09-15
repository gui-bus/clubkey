"use client"

import * as React from "react"
import { redirect } from "next/navigation"

import { brandConfig } from "@/src/config/brand.config"
import { usePortalStore } from "@/src/store/usePortalStore"
import { TopBanner } from "@/src/components/landing/TopBanner"
import { Navbar } from "@/src/components/landing/Navbar"
import { Hero } from "@/src/components/landing/Hero"
import { WhatIsClubKey } from "@/src/components/landing/WhatIsClubKey"
import { PartnersMarquee } from "@/src/components/landing/PartnersMarquee"
import { ExperienceBanner } from "@/src/components/landing/ExperienceBanner"
import { HowItWorksCatalog } from "@/src/components/landing/HowItWorksCatalog"
import { FaqSection } from "@/src/components/landing/FaqSection"
import { Footer } from "@/src/components/landing/Footer"
import { FloatingCta } from "@/src/components/landing/FloatingCta"
import { PortalHome } from "@/src/components/portal/PortalHome"

export default function Page(): React.JSX.Element {
  const { isAuthenticated } = usePortalStore()

  if (brandConfig.id !== "clubkey") {
    redirect("/hospedagens")
  }

  if (isAuthenticated) {
    return (
      <div className="min-h-screen w-full bg-zinc-50 dark:bg-[#0D0D0D] text-zinc-900 dark:text-white flex flex-col font-sans selection:bg-brand-primary/20 selection:text-brand-primary">
        <Navbar />
        <main className="flex-1 w-full flex flex-col">
          <PortalHome />
        </main>
      </div>
    )
  }

  return (
    <main className="w-full bg-[#F1F1F1] dark:bg-[#161616] text-[#111111] dark:text-white flex flex-col font-sans selection:bg-brand-primary/20 selection:text-brand-primary">
      <TopBanner />
      <Navbar />
      <Hero />
      <WhatIsClubKey />
      <PartnersMarquee />
      <ExperienceBanner />
      <HowItWorksCatalog />
      <FaqSection />
      <Footer />
      <FloatingCta />
    </main>
  )
}
