"use client"

import * as React from "react"
import { PortalHero } from "@/src/components/portal/PortalHero"
import { KeyPassNav } from "@/src/components/portal/KeyPassNav"

export default function KeyPassLayout({
  children,
}: {
  children: React.ReactNode
}): React.JSX.Element {
  return (
    <div className="w-full flex flex-col min-h-screen">
      <PortalHero
        badge="Passe de Temporada • Status, Privilégios & Recompensas"
        title={
          <>
            Níveis & <span className="text-brand-primary">Recompensas</span>
          </>
        }
        description="Evolua seu passe de associado, acumule pontos XP e desbloqueie tokens RIB e privilégios exclusivos no clube."
        imageSrc="/utils/banners/niveis.webp"
        imageAlt="KeyPass"
        imageClassName="object-center"
      />
      <KeyPassNav />
      <div className="flex-1 w-full bg-[#F1F1F1] dark:bg-[#161616]">
        {children}
      </div>
    </div>
  )
}
