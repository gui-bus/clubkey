"use client"

import * as React from "react"
import Image from "next/image"
import { MapPin, Tag, BedDouble } from "lucide-react"

import { StayItem, formatBRL } from "@/src/data/portalData"

interface StayCardProps {
  stay: StayItem
}

export function StayCard({ stay }: StayCardProps): React.JSX.Element {
  return (
    <div className="group flex flex-col justify-between rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] overflow-hidden hover:border-brand-primary/60 dark:hover:border-brand-primary/60 transition-all hover:shadow-lg">
      <div>
        <div className="relative h-48 w-full overflow-hidden bg-zinc-900">
          {stay.image && (
            <Image
              src={stay.image}
              alt={stay.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

          <div className="absolute top-4 left-4 z-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-wider bg-brand-primary text-white shadow-xs">
              <Tag className="w-3.5 h-3.5" />
              {stay.badge}
            </span>
          </div>

          <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center gap-2 text-white">
            <BedDouble className="w-4 h-4 text-brand-primary" />
            <span className="text-[11px] font-bold uppercase tracking-widest text-zinc-300">
              Travel Club Exclusivo
            </span>
          </div>
        </div>

        <div className="p-5 space-y-2">
          <h3 className="text-base font-bold uppercase tracking-tight text-zinc-900 dark:text-white group-hover:text-brand-primary transition-colors line-clamp-1">
            {stay.name}
          </h3>

          <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-brand-primary shrink-0" />
            {stay.city}
          </p>

          <p className="text-xs text-zinc-500 dark:text-zinc-400 pt-1 leading-relaxed line-clamp-2">
            Tarifa exclusiva negociada para membros do clube com upgrade e cancelamento flexível.
          </p>
        </div>
      </div>

      <div className="px-5 py-3.5 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between bg-zinc-50/70 dark:bg-zinc-900/50">
        <div>
          <span className="text-xs text-zinc-400 line-through block font-medium">
            {formatBRL(stay.origPrice)}/noite
          </span>
          <span className="text-base font-black text-zinc-900 dark:text-white">
            {formatBRL(stay.memberPrice)}
            <span className="text-[11px] font-normal text-zinc-500 dark:text-zinc-400">
              /noite
            </span>
          </span>
        </div>

        <button
          type="button"
          className="px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-wider bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-brand-primary dark:hover:bg-brand-primary dark:hover:text-white transition-colors cursor-pointer shadow-xs"
        >
          Consultar
        </button>
      </div>
    </div>
  )
}
