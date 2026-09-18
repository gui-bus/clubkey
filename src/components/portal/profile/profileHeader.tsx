"use client"

import * as React from "react"

import Image from "next/image"

import { getInitials } from "@/src/data/portalData"
import { ArrowRight, CreditCard, PencilSimple } from "@phosphor-icons/react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar/avatar"

import { Container } from "@/src/components/common/container"
import { CtaButton } from "@/src/components/common/ctaButton"

export interface ProfileHeaderProps {
  name: string
  role?: string
  company?: string
  avatar?: string
  coverImage?: string
  mounted?: boolean
  onOpenCoverDialog: () => void
  onOpenAvatarDialog: () => void
}

export function ProfileHeader({
  name,
  role,
  company,
  avatar,
  coverImage,
  mounted = true,
  onOpenCoverDialog,
  onOpenAvatarDialog,
}: ProfileHeaderProps): React.JSX.Element {
  return (
    <>
      <div className="relative w-full h-56 sm:h-72 md:h-80 bg-zinc-950 overflow-hidden">
        {mounted ? (
          <Image
            src={coverImage || "/utils/banners/pessoas.webp"}
            alt="Capa do perfil"
            fill
            priority
            className="object-cover object-center opacity-40 dark:opacity-30 transition-opacity duration-300"
          />
        ) : (
          <div className="w-full h-full bg-zinc-950" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />

        <Container className="relative z-10 h-full flex flex-col justify-between py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-xs font-black uppercase tracking-widest text-brand-primary">
                Meu Perfil
              </span>
              <span className="text-white/60 hidden sm:inline">/</span>
              <span className="text-xs font-bold text-white truncate max-w-xs sm:max-w-md hidden sm:inline">
                {name}
              </span>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <CtaButton
                type="button"
                variant="secondary"
                size="xs"
                onClick={onOpenCoverDialog}
                className="bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-wider shadow-md"
                textClassName="text-white"
                sliderClassName="bg-white/20"
                aria-label="Editar capa do perfil"
              >
                <PencilSimple className="w-3.5 h-3.5 mr-1.5 text-white" />
                <span>Editar Capa</span>
              </CtaButton>
            </div>
          </div>
        </Container>
      </div>

      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 -mt-20 sm:-mt-24 relative z-20">
          <div className="flex flex-col sm:flex-row sm:items-end gap-5">
            <div className="relative group/avatar inline-block shrink-0">
              <Avatar
                size="3xl"
                radius="full"
                className="w-28 h-28 sm:w-36 sm:h-36 ring-4 ring-[#F1F1F1] dark:ring-[#161616] shadow-xl shrink-0 border border-zinc-200 dark:border-zinc-700 bg-zinc-900 overflow-hidden cursor-pointer"
              >
                {mounted && avatar ? (
                  <AvatarImage
                    src={avatar}
                    alt={name}
                    className="object-cover object-top"
                  />
                ) : null}
                <AvatarFallback className="font-black text-2xl bg-zinc-900 text-white dark:bg-zinc-800">
                  {getInitials(name)}
                </AvatarFallback>
              </Avatar>

              <button
                type="button"
                onClick={onOpenAvatarDialog}
                className="absolute inset-0 rounded-full bg-black/60 backdrop-blur-xs opacity-0 group-hover/avatar:opacity-100 transition-all duration-200 flex flex-col items-center justify-center gap-1 text-white cursor-pointer z-10"
                aria-label="Alterar foto de perfil"
              >
                <PencilSimple className="w-5 h-5 text-white animate-fade-in" />
                <span className="text-[10px] font-bold uppercase tracking-wider text-white drop-shadow-sm">
                  Alterar
                </span>
              </button>
            </div>

            <div className="min-w-0 pb-1">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white truncate">
                {name}
              </h1>
              <p className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-white mt-0.5 truncate">
                {role} {company ? `na ${company}` : ""}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <CtaButton
              href="/perfil/minha-assinatura"
              variant="secondary"
              size="sm"
              className="text-xs"
            >
              <CreditCard className="w-4 h-4 mr-2 text-brand-primary" />
              <span>Gerenciar Assinatura</span>
              <ArrowRight className="w-3.5 h-3.5 ml-2" />
            </CtaButton>
          </div>
        </div>
      </Container>
    </>
  )
}
