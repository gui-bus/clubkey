"use client"

import * as React from "react"

import { EXPERIENCES, MONTH_LABELS, MONTH_ORDER } from "@/src/data/portalData"
import { Compass, MagnifyingGlass } from "@phosphor-icons/react"

import { Button } from "@/src/components/ui/button/button"

import { Container } from "@/src/components/common/container"
import { ExperienceCard } from "@/src/components/portal/ExperienceCard"
import { PortalHero } from "@/src/components/portal/PortalHero"
import { PortalHeroFilterBar } from "@/src/components/portal/PortalHeroFilterBar"

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
      const fullText = [e.title, e.sub, e.desc, e.place, e.date, ...e.includes]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
      return fullText.includes(q)
    })
  }, [activeFilter, searchQuery])

  const groupedExperiencesByMonth = React.useMemo(() => {
    const groups: {
      monthKey: string
      monthLabel: string
      experiences: typeof EXPERIENCES
    }[] = []

    for (const exp of filteredExperiences) {
      const parts = exp.date.trim().split(" ")
      const monthToken = parts.length > 1 ? parts[1].toUpperCase() : "OUTROS"
      const monthLabel =
        MONTH_LABELS[monthToken] ||
        (exp.date.toLowerCase().includes("agendamento")
          ? "Experiências sob agendamento"
          : exp.date)

      let group = groups.find((g) => g.monthKey === monthToken)
      if (!group) {
        group = {
          monthKey: monthToken,
          monthLabel,
          experiences: [],
        }
        groups.push(group)
      }
      group.experiences.push(exp)
    }

    return groups.sort((a, b) => {
      const indexA = MONTH_ORDER.indexOf(a.monthKey)
      const indexB = MONTH_ORDER.indexOf(b.monthKey)
      const sortA = indexA === -1 ? 999 : indexA
      const sortB = indexB === -1 ? 999 : indexB
      return sortA - sortB
    })
  }, [filteredExperiences])

  const hasActiveFilters = activeFilter !== "todas" || Boolean(searchQuery)

  const handleClearFilters = () => {
    setActiveFilter("todas")
    setSearchQuery("")
  }

  return (
    <div className="w-full flex flex-col">
      <PortalHero
        badge="Curadoria Exclusiva • Vivências Únicas"
        title={
          <>
            Experiências para{" "}
            <span className="text-brand-primary">membros</span>
          </>
        }
        description="Momentos gastronômicos, esportivos, náuticos e culturais com acesso restrito e vagas limitadas."
        imageSrc="/utils/banners/experiencias.webp"
        imageAlt="Experiências Exclusivas"
      >
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
      </PortalHero>

      <Container className="relative z-10 flex-1 py-10 space-y-8 bg-[#F1F1F1] dark:bg-[#161616]">
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
                    {
                      EXPERIENCE_TYPES.find((t) => t.value === activeFilter)
                        ?.label
                    }
                  </span>
                </span>
              )}
              {searchQuery && (
                <span className="px-2.5 py-1 rounded-sm bg-brand-primary/10 text-brand-primary font-bold flex items-center gap-1.5">
                  <MagnifyingGlass className="w-3 h-3" />
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
            {filteredExperiences.length === 1
              ? "experiência encontrada"
              : "experiências disponíveis"}
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
              Não encontramos experiências com os termos buscados. Tente outros
              filtros ou termos.
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
          <div className="space-y-10">
            {groupedExperiencesByMonth.map((group) => (
              <div key={group.monthKey} className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-brand-primary shadow-xs" />
                    <h2 className="text-base sm:text-lg font-heading font-black tracking-tight uppercase text-zinc-900 dark:text-white">
                      {group.monthLabel}
                    </h2>
                  </div>
                  <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
                  <span className="text-[11px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                    {group.experiences.length}{" "}
                    {group.experiences.length === 1
                      ? "experiência"
                      : "experiências"}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {group.experiences.map((exp) => (
                    <ExperienceCard key={exp.id} experience={exp} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  )
}
