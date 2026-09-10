"use client"

import * as React from "react"

import { TopBanner } from "@/src/components/landing/TopBanner"
import { Navbar } from "@/src/components/landing/Navbar"
import { Hero } from "@/src/components/landing/Hero"
import { WhatIsClubKey } from "@/src/components/landing/WhatIsClubKey"
import { PartnersMarquee } from "@/src/components/landing/PartnersMarquee"
import { Footer } from "@/src/components/landing/Footer"

export default function Page(): React.JSX.Element {
  return (
    <main className="w-full bg-[#F1F1F1] dark:bg-[#161616] text-[#111111] dark:text-white flex flex-col font-sans selection:bg-[#FF6847]/20 selection:text-[#FF6847]">
      <TopBanner />
      <Navbar />
      <Hero />
      <WhatIsClubKey />
      <PartnersMarquee />
      <Footer />
    </main>
  )
}
