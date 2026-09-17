"use client"

import * as React from "react"

import Image from "next/image"
import Link from "next/link"

import {
  ExperienceItem,
  formatBRL,
  getExperienceSlug,
} from "@/src/data/portalData"
import { MapPin } from "@phosphor-icons/react"

import { cn } from "@/src/lib/utils"

export interface RelatedExperiencesCardProps {
  experience: ExperienceItem
  className?: string
}

export function RelatedExperiencesCard({
  experience,
  className,
}: RelatedExperiencesCardProps): React.JSX.Element {
  return (
    <Link
      href={`/experiencias/${experience.id}/${getExperienceSlug(experience)}`}
      className={cn(
        "group relative flex flex-col sm:flex-row items-stretch overflow-hidden rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] hover:border-zinc-300 dark:hover:border-zinc-700 transition-all duration-200 shadow-xs cursor-pointer",
        className
      )}
    >
      <div className="relative w-full sm:w-44 h-36 sm:h-auto shrink-0 bg-zinc-950 overflow-hidden">
        {experience.image && (
          <Image
            src={experience.image}
            alt={experience.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300 opacity-80"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent sm:hidden" />
      </div>

      <div className="p-5 flex flex-col justify-between flex-1 gap-3 min-w-0">
        <div>
          <div className="flex items-center justify-between gap-2 text-[11px] mb-1.5">
            <span className="text-sm sm:text-base font-black font-heading text-zinc-900 dark:text-white">
              {experience.price === 0
                ? "Gratuita"
                : formatBRL(experience.price)}
            </span>
            <span className="text-zinc-500 font-medium text-xs">
              {experience.date}
            </span>
          </div>
          <h3 className="text-sm sm:text-base font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white group-hover:text-brand-primary transition-colors line-clamp-2">
            {experience.title}
          </h3>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400 pt-2 border-t border-zinc-100 dark:border-zinc-800/60 truncate">
          <span className="flex items-center gap-1 truncate">
            <MapPin className="w-3.5 h-3.5 text-brand-primary shrink-0" />
            <span className="truncate">{experience.place}</span>
          </span>
          <span>•</span>
          <span className="shrink-0">{experience.sub}</span>
          <span>•</span>
          <div className="flex items-center gap-1.5 font-medium shrink-0">
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
        </div>
      </div>
    </Link>
  )
}

export const RelatedExperienceCard = RelatedExperiencesCard
