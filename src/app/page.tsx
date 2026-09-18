"use client"

import * as React from "react"

import { redirect } from "next/navigation"

import { usePortalStore } from "@/src/store/usePortalStore"

import { ExperienceBanner } from "@/src/components/landing/experienceBanner"
import { FaqSection } from "@/src/components/landing/faqSection"
import { FloatingCta } from "@/src/components/landing/floatingCta"
import { Hero } from "@/src/components/landing/hero"
import { HowItWorksCatalog } from "@/src/components/landing/howItWorksCatalog"
import { Navbar } from "@/src/components/landing/navbar"
import { PartnersMarquee } from "@/src/components/landing/partnersMarquee"
import { TopBanner } from "@/src/components/landing/topBanner"
import { WhatIsClubKey } from "@/src/components/landing/whatIsClubKey"
import { PortalHome } from "@/src/components/portal/portalHome"

import { brandConfig } from "@/src/config/brand.config"

export default function Page(): React.JSX.Element {
  const { isAuthenticated } = usePortalStore()

  if (brandConfig.id !== "clubkey") {
    redirect("/hospedagens")
  }

  if (isAuthenticated) {
    return (
      <div className="flex-1 w-full text-zinc-900 dark:text-white flex flex-col font-sans selection:bg-brand-primary/20 selection:text-brand-primary">
        <Navbar />
        <main className="flex-1 w-full flex flex-col">
          <PortalHome />
        </main>
      </div>
    )
  }

  return (
    <main className="flex-1 w-full bg-[#F1F1F1] dark:bg-[#161616] text-[#111111] dark:text-white flex flex-col font-sans selection:bg-brand-primary/20 selection:text-brand-primary">
      <TopBanner />
      <Navbar />
      <Hero />
      <WhatIsClubKey />
      <PartnersMarquee />
      <ExperienceBanner />
      <HowItWorksCatalog />
      <FaqSection />
      <FloatingCta />
    </main>
  )
}
