"use client"

import { redirect } from "next/navigation"

import { usePortalStore } from "@/src/store/usePortalStore"

import { ExperienceBanner } from "@/src/components/landing/experienceBanner"
import { FaqSection } from "@/src/components/landing/faqSection"
import { FloatingCta } from "@/src/components/landing/floatingCta"
import { Header } from "@/src/components/landing/header"
import { Hero } from "@/src/components/landing/hero"
import { HeroMarquee } from "@/src/components/landing/heroMarquee"
import { HowItWorksCatalog } from "@/src/components/landing/howItWorksCatalog"
import { PartnersMarquee } from "@/src/components/landing/partnersMarquee"
import { TopBanner } from "@/src/components/landing/topBanner"
import { WhatIsBrand } from "@/src/components/landing/whatIsBrand"
import { PortalHome } from "@/src/components/portal/portalHome"

import { isModuleEnabled } from "@/src/config/brand.config"

export default function Page(): React.JSX.Element {
  const { isAuthenticated } = usePortalStore()

  if (isAuthenticated) {
    if (!isModuleEnabled("home")) {
      if (isModuleEnabled("stays")) redirect("/hospedagens")
      if (isModuleEnabled("events")) redirect("/eventos")
      if (isModuleEnabled("experiences")) redirect("/experiencias")
      if (isModuleEnabled("benefits")) redirect("/beneficios")
      if (isModuleEnabled("networking")) redirect("/conexoes")
      if (isModuleEnabled("keypass")) redirect("/keypass")
      redirect("/perfil")
    }
    return (
      <div className="flex-1 w-full text-zinc-900 dark:text-white flex flex-col font-sans selection:bg-brand-primary/20 selection:text-brand-primary">
        <Header />
        <main className="flex-1 w-full flex flex-col">
          <PortalHome />
        </main>
      </div>
    )
  }

  return (
    <main className="flex-1 w-full bg-[#F1F1F1] dark:bg-[#161616] text-[#111111] dark:text-white flex flex-col font-sans selection:bg-brand-primary/20 selection:text-brand-primary">
      <TopBanner />
      <Header />
      <Hero />
      <WhatIsBrand />
      <HeroMarquee />
      <PartnersMarquee />
      <ExperienceBanner />
      <HowItWorksCatalog />
      <FaqSection />
      <FloatingCta />
    </main>
  )
}
