"use client"

import * as React from "react"

import Image from "next/image"
import Link from "next/link"

import {
  ExperienceItem,
  formatBRL,
  getExperienceSlug,
} from "@/src/data/portalData"
import { usePortalStore } from "@/src/store/usePortalStore"
import { ArrowRight, Check, Clock, Gift, MapPin } from "@phosphor-icons/react"

import { CtaButton } from "@/src/components/common/ctaButton"

import { isModuleEnabled } from "@/src/config/brand.config"

interface ExperienceCardProps {
  experience: ExperienceItem
}

export function ExperienceCard({
  experience,
}: ExperienceCardProps): React.JSX.Element {
  const { boughtExperiences } = usePortalStore()
  const isBought = !!boughtExperiences[experience.id]
  const isFree = experience.price === 0

  return (
    <Link
      href={`/experiencias/${experience.id}/${getExperienceSlug(experience)}`}
      className="group/card flex flex-col justify-between rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] overflow-hidden hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors duration-200 cursor-pointer"
    >
      <div>
        <div className="relative h-48 w-full overflow-hidden bg-zinc-900">
          {experience.image && (
            <Image
              src={experience.image}
              alt={experience.title}
              fill
              className="object-cover group-hover/card:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

          <div className="absolute top-3.5 left-3.5 z-10">
            {isBought ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-sm bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest shadow-xs whitespace-nowrap">
                <Check className="w-3 h-3 shrink-0" />
                <span>Garantido</span>
              </span>
            ) : isFree ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-sm bg-brand-primary text-white text-[10px] font-black uppercase tracking-widest shadow-xs whitespace-nowrap">
                <Gift className="w-3 h-3 shrink-0" />
                <span>Cortesia Membro</span>
              </span>
            ) : null}
          </div>

          <div className="absolute bottom-0 left-0 right-0 z-10 flex items-center gap-2 px-3.5 py-2.5 bg-black/40 backdrop-blur-md border-t border-white/10">
            <span className="text-[11px] font-bold text-white uppercase tracking-wider">
              {experience.weekday && experience.day && experience.month
                ? `${experience.weekday}, ${experience.day} de ${experience.month}`
                : experience.weekday || experience.date}
            </span>
            {experience.time && (
              <>
                <span className="text-white/40">•</span>
                <span className="flex items-center gap-1 text-[11px] text-white/80">
                  <Clock className="w-3 h-3 text-white/60 shrink-0" />
                  {experience.time}
                </span>
              </>
            )}
            {experience.sub && (
              <>
                <span className="text-white/40">•</span>
                <span className="text-[11px] font-bold uppercase tracking-wider text-white/80">
                  {experience.sub}
                </span>
              </>
            )}
          </div>
        </div>

        <div className="p-5 space-y-2">
          <h3 className="text-base font-bold uppercase tracking-tight text-zinc-900 dark:text-white group-hover/card:text-brand-primary transition-colors line-clamp-1">
            {experience.title}
          </h3>

          <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-zinc-500 dark:text-zinc-400">
            <div className="flex items-center gap-1.5 min-w-0 truncate">
              <MapPin className="w-3.5 h-3.5 text-brand-primary shrink-0" />
              <span className="truncate">{experience.place}</span>
            </div>
            {isModuleEnabled("keypass") && (
              <>
                <span className="text-zinc-300 dark:text-zinc-700 hidden sm:inline">
                  •
                </span>
                <div className="flex items-center gap-1.5 shrink-0">
                  <div className="relative w-3.5 h-3.5 shrink-0">
                    <Image
                      src="/utils/gamification/utils/xp.webp"
                      alt="XP"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span>+{experience.xp || 300} XP</span>
                </div>
              </>
            )}
          </div>

          <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 pt-1 leading-relaxed">
            {experience.desc}
          </p>
        </div>
      </div>

      <div className="px-5 py-3.5 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between gap-3 bg-[#F1F1F1]/70 dark:bg-zinc-900/50">
        <div>
          <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider block">
            {isFree ? "Condição" : "Investimento"}
          </span>
          <span className="text-sm font-black text-zinc-900 dark:text-white">
            {isFree ? "Gratuita para membros" : formatBRL(experience.price)}
          </span>
        </div>

        <CtaButton
          type="button"
          variant="primary"
          size="xs"
          className="px-4 h-9 text-[11px] font-bold uppercase tracking-wider whitespace-nowrap shadow-none hover:shadow-none shrink-0"
          textClassName="whitespace-nowrap"
        >
          <span>Ver detalhes</span>
          <ArrowRight className="w-3.5 h-3.5 ml-1.5 shrink-0" />
        </CtaButton>
      </div>
    </Link>
  )
}
