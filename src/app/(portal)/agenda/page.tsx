"use client"

import * as React from "react"
import { Calendar } from "lucide-react"

import { usePortalStore } from "@/src/store/usePortalStore"
import { EVENTS } from "@/src/data/portalData"
import { EventCard } from "@/src/components/portal/EventCard"

type AgendaFilter = "proximos" | "calendario" | "meus"

export default function AgendaPage(): React.JSX.Element {
  const [activeFilter, setActiveFilter] = React.useState<AgendaFilter>("proximos")
  const { confirmedEvents } = usePortalStore()

  const filteredEvents = React.useMemo(() => {
    if (activeFilter === "meus") {
      return EVENTS.filter((e) => !!confirmedEvents[e.id])
    }
    if (activeFilter === "calendario") {
      return [...EVENTS].sort((a, b) => Number(a.day) - Number(b.day))
    }
    return EVENTS
  }, [activeFilter, confirmedEvents])

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-primary block mb-1">
            Agenda do Clube
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-zinc-900 dark:text-white font-heading">
            Onde o clube se encontra
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 font-medium">
            Encontros mensais, jantares, visitas e rodas de conversa exclusivas
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-sm bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveFilter("proximos")}
            className={`px-3.5 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeFilter === "proximos"
                ? "bg-brand-primary text-white shadow-xs"
                : "text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white"
            }`}
          >
            Próximos
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("calendario")}
            className={`px-3.5 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeFilter === "calendario"
                ? "bg-brand-primary text-white shadow-xs"
                : "text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white"
            }`}
          >
            Calendário
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("meus")}
            className={`px-3.5 py-1.5 rounded-sm text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeFilter === "meus"
                ? "bg-brand-primary text-white shadow-xs"
                : "text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white"
            }`}
          >
            Meus eventos
          </button>
        </div>
      </div>

      {filteredEvents.length === 0 ? (
        <div className="p-12 text-center rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] space-y-3">
          <div className="w-12 h-12 rounded-sm bg-brand-primary/10 text-brand-primary flex items-center justify-center mx-auto">
            <Calendar className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold uppercase tracking-tight text-zinc-900 dark:text-white">
            Nenhum evento encontrado
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto">
            Você ainda não confirmou presença em nenhum encontro. Navegue pelos próximos encontros e garanta sua vaga.
          </p>
          <button
            type="button"
            onClick={() => setActiveFilter("proximos")}
            className="mt-2 px-5 py-2.5 rounded-sm bg-brand-primary hover:bg-brand-primary-hover text-white text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            Ver todos os encontros
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {filteredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      )}
    </div>
  )
}
