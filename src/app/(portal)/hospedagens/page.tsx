"use client"

import * as React from "react"
import { Search, Calendar, Users } from "lucide-react"

import { STAYS } from "@/src/data/portalData"
import { StayCard } from "@/src/components/portal/StayCard"
import { BackButton } from "@/src/components/portal/BackButton"

export default function StaysPage(): React.JSX.Element {
  const [destQuery, setDestQuery] = React.useState("")

  const filteredStays = React.useMemo(() => {
    const q = destQuery.trim().toLowerCase()
    if (!q) return STAYS
    return STAYS.filter(
      (s) =>
        s.name.toLowerCase().includes(q) || s.city.toLowerCase().includes(q)
    )
  }, [destQuery])

  return (
    <div className="space-y-8">
      <BackButton fallbackHref="/beneficios" label="Voltar para benefícios" />

      <div>
        <span className="text-xs font-black uppercase tracking-widest text-brand-primary block mb-1">
          Travel Club
        </span>
        <h1 className="text-3xl sm:text-4xl font-heading font-black tracking-tight uppercase text-zinc-900 dark:text-white">
          Hospedagens com tarifas de membro
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Descontos de até 20% e benefícios exclusivos nos melhores refúgios e hotéis do país
        </p>
      </div>

      <div className="rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] p-4 shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-center">
          <div className="p-3 rounded-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800">
            <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary block mb-1">
              Destino
            </span>
            <div className="flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <input
                type="text"
                value={destQuery}
                onChange={(e) => setDestQuery(e.target.value)}
                placeholder="Cidade ou hotel..."
                className="w-full bg-transparent text-xs font-semibold text-zinc-900 dark:text-white placeholder:text-zinc-400 outline-none"
              />
            </div>
          </div>

          <div className="p-3 rounded-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800">
            <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary block mb-1">
              Check-in
            </span>
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-900 dark:text-white">
              <Calendar className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <span>18 de Outubro</span>
            </div>
          </div>

          <div className="p-3 rounded-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800">
            <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary block mb-1">
              Check-out
            </span>
            <div className="flex items-center gap-2 text-xs font-semibold text-zinc-900 dark:text-white">
              <Calendar className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
              <span>21 de Outubro</span>
            </div>
          </div>

          <div className="p-3 rounded-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary block mb-1">
                Hóspedes
              </span>
              <div className="flex items-center gap-2 text-xs font-semibold text-zinc-900 dark:text-white">
                <Users className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                <span>2 adultos</span>
              </div>
            </div>

            <button
              type="button"
              className="px-5 py-2.5 rounded-sm bg-brand-primary hover:bg-brand-primary/90 text-white text-xs font-black uppercase tracking-wider transition-colors cursor-pointer"
            >
              Buscar
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {filteredStays.map((stay) => (
          <StayCard key={stay.id} stay={stay} />
        ))}
      </div>
    </div>
  )
}
