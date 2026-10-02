"use client"

import * as React from "react"

import Image from "next/image"

import { Check, Hourglass } from "@phosphor-icons/react"

import { Container } from "@/src/components/common/container"
import { BackButton } from "@/src/components/portal/backButton"
import { ShareButton } from "@/src/components/portal/shareButton"

interface MemberProfileHeroProps {
  fullName: string
  status: "connected" | "pending" | "none"
}

export function MemberProfileHero({
  fullName,
  status,
}: MemberProfileHeroProps): React.JSX.Element {
  return (
    <div className="relative w-full h-56 sm:h-72 md:h-80 bg-zinc-950 overflow-hidden">
      <Image
        src="/utils/banners/pessoas.webp"
        alt="Banner de perfil"
        fill
        priority
        className="object-cover object-center opacity-40 dark:opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />

      <Container className="relative z-10 h-full flex flex-col justify-between py-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <BackButton
              fallbackHref="/conexoes"
              label="Conexões"
              className="text-white hover:text-white/80"
            />
            <span className="text-white/60 hidden sm:inline">/</span>
            <span className="text-xs font-bold text-white truncate max-w-xs sm:max-w-md hidden sm:inline">
              {fullName}
            </span>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <ShareButton label="Compartilhar Perfil" />
          </div>
        </div>

        {(status === "connected" || status === "pending") && (
          <div className="flex items-center justify-end gap-3 self-end">
            {status === "connected" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest shadow-md">
                <Check className="w-3.5 h-3.5" />
                <span>Conectado</span>
              </span>
            )}

            {status === "pending" && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-sky-500 text-white text-[10px] font-black uppercase tracking-widest shadow-md">
                <Hourglass className="w-3.5 h-3.5" />
                <span>Solicitação Enviada</span>
              </span>
            )}
          </div>
        )}
      </Container>
    </div>
  )
}
