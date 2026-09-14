"use client"

import * as React from "react"
import { redirect } from "next/navigation"

import { brandConfig } from "@/src/config/brand.config"
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

export default function Page(): React.JSX.Element {
  if (brandConfig.id !== "clubkey") {
    redirect("/hospedagens")
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
