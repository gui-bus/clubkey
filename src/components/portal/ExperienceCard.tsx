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
import { Calendar, Check, Gift, MapPin } from "@phosphor-icons/react"

import { GlassBadge } from "@/src/components/portal/GlassBadge"

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
      className="group flex flex-col justify-between rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] overflow-hidden hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors duration-200 cursor-pointer"
    >
      <div>
        <div className="relative h-48 w-full overflow-hidden bg-zinc-900">
          {experience.image && (
            <Image
              src={experience.image}
              alt={experience.title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

          <div className="absolute top-3.5 left-3.5 right-3.5 z-10 flex items-center justify-between gap-2">
            <GlassBadge icon={<Calendar className="w-3 h-3 text-white" />}>
              {experience.date}
            </GlassBadge>

            {isBought ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-sm bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest shadow-xs">
                <Check className="w-3 h-3" />
                <span>Garantido</span>
              </span>
            ) : isFree ? (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-sm bg-brand-primary text-white text-[10px] font-black uppercase tracking-widest shadow-xs">
                <Gift className="w-3 h-3" />
                <span>Cortesia Membro</span>
              </span>
            ) : null}
          </div>

          <div className="absolute bottom-3.5 left-3.5 z-10">
            <GlassBadge>{experience.sub}</GlassBadge>
          </div>
        </div>

        <div className="p-5 space-y-2">
          <h3 className="text-base font-bold uppercase tracking-tight text-zinc-900 dark:text-white group-hover:text-brand-primary transition-colors line-clamp-1">
            {experience.title}
          </h3>

          <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5 line-clamp-1">
            <MapPin className="w-3.5 h-3.5 text-brand-primary shrink-0" />
            {experience.place}
          </p>

          <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 pt-1 leading-relaxed">
            {experience.desc}
          </p>
        </div>
      </div>

      <div className="px-5 py-3.5 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between bg-[#F1F1F1]/70 dark:bg-zinc-900/50">
        <div>
          <span className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider block">
            {isFree ? "Condição" : "Investimento"}
          </span>
          <span className="text-sm font-black text-zinc-900 dark:text-white">
            {isFree ? "Gratuita para membros" : formatBRL(experience.price)}
          </span>
        </div>

        <span className="text-xs font-bold uppercase tracking-wider text-brand-primary group-hover:translate-x-0.5 transition-transform">
          Ver detalhes →
        </span>
      </div>
    </Link>
  )
}
