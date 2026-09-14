"use client"

import * as React from "react"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

import { BenefitItem, getInitials } from "@/src/data/portalData"

interface BenefitCardProps {
  benefit: BenefitItem
}

export function BenefitCard({ benefit }: BenefitCardProps): React.JSX.Element {
  return (
    <div className="group flex flex-col justify-between rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] overflow-hidden hover:border-brand-primary/60 dark:hover:border-brand-primary/60 transition-all hover:shadow-lg">
      <div>
        {benefit.image && (
          <div className="relative h-36 w-full overflow-hidden bg-zinc-900">
            <Image
              src={benefit.image}
              alt={benefit.partner}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute top-3 right-3 z-10">
              <span className="px-2.5 py-1 rounded-sm text-xs font-black uppercase tracking-wider bg-brand-primary text-white shadow-xs">
                {benefit.discount}
              </span>
            </div>
            <div className="absolute bottom-3 left-4 z-10">
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-300">
                {benefit.category}
              </span>
            </div>
          </div>
        )}

        <div className="p-5 space-y-2.5">
          <div className="flex items-center gap-3">
            {!benefit.image && (
              <div className="w-10 h-10 shrink-0 rounded-sm bg-brand-primary text-white flex items-center justify-center font-black text-xs">
                {getInitials(benefit.partner)}
              </div>
            )}
            <div>
              <h3 className="text-base font-bold uppercase tracking-tight text-zinc-900 dark:text-white group-hover:text-brand-primary transition-colors line-clamp-1">
                {benefit.partner}
              </h3>
              {!benefit.image && (
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                  {benefit.category}
                </span>
              )}
            </div>
          </div>

          <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-2">
            {benefit.desc}
          </p>
        </div>
      </div>

      <div className="px-5 py-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between bg-zinc-50/70 dark:bg-zinc-900/50">
        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
          Membro ClubKey
        </span>
        <button
          type="button"
          className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-brand-primary hover:translate-x-0.5 transition-transform cursor-pointer"
        >
          <span>Resgatar</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}
