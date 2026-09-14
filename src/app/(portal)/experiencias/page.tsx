"use client"

import * as React from "react"

import { EXPERIENCES } from "@/src/data/portalData"
import { ExperienceCard } from "@/src/components/portal/ExperienceCard"

type ExpFilter = "todas" | "gratuitas" | "pagas"

export default function ExperiencesPage(): React.JSX.Element {
  const [activeFilter, setActiveFilter] = React.useState<ExpFilter>("todas")

  const filteredExperiences = React.useMemo(() => {
    if (activeFilter === "gratuitas") {
      return EXPERIENCES.filter((e) => e.price === 0)
    }
    if (activeFilter === "pagas") {
      return EXPERIENCES.filter((e) => e.price > 0)
    }
    return EXPERIENCES
  }, [activeFilter])

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-brand-primary block mb-1">
            Curadoria
          </span>
          <h1 className="text-3xl sm:text-4xl font-heading font-black tracking-tight uppercase text-zinc-900 dark:text-white">
            Experiências para membros
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Momentos gastronômicos, esportivos e culturais com acesso restrito
          </p>
        </div>

        <div className="flex items-center gap-1.5 p-1 rounded-sm bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActiveFilter("todas")}
            className={`px-3.5 py-1.5 rounded-sm text-xs transition-all cursor-pointer ${
              activeFilter === "todas"
                ? "bg-brand-primary text-white font-black uppercase tracking-wider shadow-xs"
                : "text-zinc-600 dark:text-zinc-400 font-bold hover:text-zinc-900 dark:hover:text-white"
            }`}
          >
            Todas
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("gratuitas")}
            className={`px-3.5 py-1.5 rounded-sm text-xs transition-all cursor-pointer ${
              activeFilter === "gratuitas"
                ? "bg-brand-primary text-white font-black uppercase tracking-wider shadow-xs"
                : "text-zinc-600 dark:text-zinc-400 font-bold hover:text-zinc-900 dark:hover:text-white"
            }`}
          >
            Gratuitas
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter("pagas")}
            className={`px-3.5 py-1.5 rounded-sm text-xs transition-all cursor-pointer ${
              activeFilter === "pagas"
                ? "bg-brand-primary text-white font-black uppercase tracking-wider shadow-xs"
                : "text-zinc-600 dark:text-zinc-400 font-bold hover:text-zinc-900 dark:hover:text-white"
            }`}
          >
            Pagas
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExperiences.map((exp) => (
          <ExperienceCard key={exp.id} experience={exp} />
        ))}
      </div>
    </div>
  )
}
