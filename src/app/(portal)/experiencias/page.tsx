"use client"

import * as React from "react"
import Image from "next/image"
import { Compass, Search } from "lucide-react"

import { EXPERIENCES } from "@/src/data/portalData"
import { ExperienceCard } from "@/src/components/portal/ExperienceCard"
import { PortalHeroFilterBar } from "@/src/components/portal/PortalHeroFilterBar"
import { Button } from "@/src/components/ui/button/button"
import { Container } from "@/src/components/common/container"

const EXPERIENCE_TYPES = [
  { value: "todas", label: "Todas" },
  { value: "gratuitas", label: "Gratuitas" },
  { value: "pagas", label: "Pagas" },
]

export default function ExperiencesPage(): React.JSX.Element {
  const [activeFilter, setActiveFilter] = React.useState("todas")
  const [searchQuery, setSearchQuery] = React.useState("")

  const typeOptions = React.useMemo(() => {
    return EXPERIENCE_TYPES.map((t) => ({
      value: t.value,
      label: t.label,
      count:
        t.value === "todas"
          ? EXPERIENCES.length
          : t.value === "gratuitas"
            ? EXPERIENCES.filter((e) => e.price === 0).length
            : EXPERIENCES.filter((e) => e.price > 0).length,
    }))
  }, [])

  const filteredExperiences = React.useMemo(() => {
    let list = EXPERIENCES
    if (activeFilter === "gratuitas") {
      list = list.filter((e) => e.price === 0)
    } else if (activeFilter === "pagas") {
      list = list.filter((e) => e.price > 0)
    }

    const q = searchQuery.trim().toLowerCase()
    if (!q) return list

    return list.filter((e) => {
      const fullText = [
        e.title,
        e.sub,
        e.desc,
        e.place,
        e.date,
        ...e.includes,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
      return fullText.includes(q)
    })
  }, [activeFilter, searchQuery])

  const hasActiveFilters = activeFilter !== "todas" || Boolean(searchQuery)

  const handleClearFilters = () => {
    setActiveFilter("todas")
    setSearchQuery("")
  }

  return (
    <div className="w-full flex flex-col">
      <section
        id="hero"
        className="relative z-30 w-full bg-[#0D0D0D] text-white min-h-[520px] md:min-h-[560px] flex flex-col justify-center"
      >
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
          <Image
            src="/utils/banners/experiencias.webp"
            alt="Experiências Exclusivas"
            fill
            priority
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-zinc-50 dark:from-[#161616]/85 dark:via-[#161616]/65 dark:to-[#0D0D0D] z-10" />
        </div>

        <Container className="relative z-20 pt-36 pb-16 md:pt-44 md:pb-20 flex flex-col justify-center items-center text-center">
          <div className="max-w-5xl flex flex-col items-center text-center w-full">
            <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-brand-primary block mb-3">
              Curadoria Exclusiva • Vivências Únicas
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black uppercase tracking-tight text-white leading-[1.05] mb-4 font-heading drop-shadow-md">
              Experiências para <span className="text-brand-primary">membros</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-zinc-200 font-light mb-8 leading-relaxed drop-shadow-sm max-w-2xl">
              Momentos gastronômicos, esportivos, náuticos e culturais com acesso restrito e vagas limitadas.
            </p>

            <PortalHeroFilterBar
              categoryLabel="Modalidade"
              categoryIcon={Compass}
              activeCategory={activeFilter}
              onCategoryChange={setActiveFilter}
              categories={typeOptions}
              searchQuery={searchQuery}
              onSearchQueryChange={setSearchQuery}
              searchPlaceholder="Buscar experiências por título, tema, cidade ou atrações..."
            />
          </div>
        </Container>
      </section>

      <Container className="relative z-10 flex-1 py-10 space-y-8">
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center justify-between gap-3 text-zinc-900 dark:text-white">
            <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-600 dark:text-zinc-300">
              <span className="font-semibold text-zinc-900 dark:text-white">
                Filtros aplicados:
              </span>
              {activeFilter !== "todas" && (
                <span className="px-2.5 py-1 rounded-sm bg-brand-primary/10 text-brand-primary font-bold flex items-center gap-1.5">
                  <Compass className="w-3 h-3" />
                  <span>
                    {EXPERIENCE_TYPES.find((t) => t.value === activeFilter)?.label}
                  </span>
                </span>
              )}
              {searchQuery && (
                <span className="px-2.5 py-1 rounded-sm bg-brand-primary/10 text-brand-primary font-bold flex items-center gap-1.5">
                  <Search className="w-3 h-3" />
                  <span>&ldquo;{searchQuery}&rdquo;</span>
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={handleClearFilters}
              className="text-xs font-bold text-zinc-500 hover:text-brand-primary dark:hover:text-brand-primary transition-colors cursor-pointer"
            >
              Limpar todos os filtros
            </button>
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-xs font-black uppercase tracking-widest text-zinc-400">
            {filteredExperiences.length}{" "}
            {filteredExperiences.length === 1 ? "experiência encontrada" : "experiências disponíveis"}
          </span>
        </div>

        {filteredExperiences.length === 0 ? (
          <div className="p-12 text-center rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] space-y-3">
            <div className="w-12 h-12 rounded-sm bg-brand-primary/10 text-brand-primary flex items-center justify-center mx-auto">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold uppercase tracking-tight text-zinc-900 dark:text-white">
              Nenhuma experiência encontrada
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto">
              Não encontramos experiências com os termos buscados. Tente outros filtros ou termos.
            </p>
            <Button
              type="button"
              color="primary"
              radius="sm"
              size="sm"
              onClick={handleClearFilters}
              className="mt-2 text-xs font-black uppercase tracking-wider"
            >
              Limpar filtros
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExperiences.map((exp) => (
              <ExperienceCard key={exp.id} experience={exp} />
            ))}
          </div>
        )}
      </Container>
    </div>
  )
}
