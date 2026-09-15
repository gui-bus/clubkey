"use client"

import * as React from "react"

import Link from "next/link"

import { EVENTS, MONTH_MAP, MONTH_OPTIONS } from "@/src/data/portalData"
import { usePortalStore } from "@/src/store/usePortalStore"
import { Calendar, MagnifyingGlass } from "@phosphor-icons/react"

import { Button } from "@/src/components/ui/button/button"

import { Container } from "@/src/components/common/container"
import { EventCard } from "@/src/components/portal/EventCard"
import { PortalHero } from "@/src/components/portal/PortalHero"
import { PortalHeroFilterBar } from "@/src/components/portal/PortalHeroFilterBar"

const MONTH_LABELS: Record<string, string> = {
  JAN: "Janeiro 2026",
  FEV: "Fevereiro 2026",
  MAR: "Março 2026",
  ABR: "Abril 2026",
  MAI: "Maio 2026",
  JUN: "Junho 2026",
  JUL: "Julho 2026",
  AGO: "Agosto 2026",
  SET: "Setembro 2026",
  OUT: "Outubro 2026",
  NOV: "Novembro 2026",
  DEZ: "Dezembro 2026",
}

export default function MeusEventosPage(): React.JSX.Element {
  const [activeMonth, setActiveMonth] = React.useState("todos")
  const [searchQuery, setSearchQuery] = React.useState("")
  const { confirmedEvents } = usePortalStore()

  const confirmedList = React.useMemo(() => {
    return EVENTS.filter((e) => !!confirmedEvents[e.id])
  }, [confirmedEvents])

  const monthFilterOptions = React.useMemo(() => {
    return MONTH_OPTIONS.map((v) => ({
      value: v.value,
      label: v.label,
      count:
        v.value === "todos"
          ? confirmedList.length
          : confirmedList.filter(
              (e) =>
                e.month?.toUpperCase() === v.value ||
                (MONTH_MAP[v.value] &&
                  e.month?.toLowerCase() === MONTH_MAP[v.value])
            ).length,
    }))
  }, [confirmedList])

  const filteredEvents = React.useMemo(() => {
    let list = confirmedList
    if (activeMonth !== "todos") {
      list = list.filter(
        (e) =>
          e.month?.toUpperCase() === activeMonth ||
          (MONTH_MAP[activeMonth] &&
            e.month?.toLowerCase() === MONTH_MAP[activeMonth])
      )
    }

    const q = searchQuery.trim().toLowerCase()
    if (!q) return list

    return list.filter((e) => {
      const fullText = [
        e.title,
        e.desc,
        e.place,
        e.weekday,
        e.month,
        e.host?.name,
        e.host?.role,
        e.category,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
      return fullText.includes(q)
    })
  }, [activeMonth, confirmedList, searchQuery])

  const groupedEventsByMonth = React.useMemo(() => {
    const groups: {
      monthKey: string
      monthLabel: string
      events: typeof EVENTS
    }[] = []

    for (const event of filteredEvents) {
      const key = event.month?.toUpperCase() || "OUTROS"
      let group = groups.find((g) => g.monthKey === key)
      if (!group) {
        group = {
          monthKey: key,
          monthLabel: MONTH_LABELS[key] || key,
          events: [],
        }
        groups.push(group)
      }
      group.events.push(event)
    }

    return groups
  }, [filteredEvents])

  const hasActiveFilters = activeMonth !== "todos" || Boolean(searchQuery)

  const handleClearFilters = () => {
    setActiveMonth("todos")
    setSearchQuery("")
  }

  return (
    <div className="w-full flex flex-col">
      <PortalHero
        badge="Minha Agenda • Presenças Confirmadas"
        title={
          <>
            Meus <span className="text-brand-primary">Eventos</span>
          </>
        }
        description="Encontros, almoços e painéis estratégicos com a sua participação garantida no clube."
        imageSrc="/utils/banners/agenda.webp"
        imageAlt="Meus Eventos do Clube"
      >
        <PortalHeroFilterBar
          categoryLabel="Mês"
          categoryIcon={Calendar}
          activeCategory={activeMonth}
          onCategoryChange={setActiveMonth}
          categories={monthFilterOptions}
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          searchPlaceholder="Buscar entre seus encontros confirmados..."
        />
      </PortalHero>

      <Container className="relative z-10 flex-1 py-10 space-y-8 bg-[#F1F1F1] dark:bg-[#161616]">
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center justify-between gap-3 text-zinc-900 dark:text-white">
            <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-600 dark:text-zinc-300">
              <span className="font-semibold text-zinc-900 dark:text-white">
                Filtros aplicados:
              </span>
              {activeMonth !== "todos" && (
                <span className="px-2.5 py-1 rounded-sm bg-brand-primary/10 text-brand-primary font-bold flex items-center gap-1.5">
                  <Calendar className="w-3 h-3" />
                  <span>
                    {
                      MONTH_OPTIONS.find((v) => v.value === activeMonth)
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
            {filteredEvents.length}{" "}
            {filteredEvents.length === 1
              ? "encontro confirmado"
              : "encontros confirmados"}
          </span>

          <Link
            href="/eventos"
            className="text-xs font-bold uppercase tracking-wider text-brand-primary hover:underline"
          >
            Explorar todos os eventos →
          </Link>
        </div>

        {filteredEvents.length === 0 ? (
          <div className="p-12 text-center rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] space-y-4">
            <div className="w-12 h-12 rounded-sm bg-brand-primary/10 text-brand-primary flex items-center justify-center mx-auto">
              <Calendar className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="text-base font-bold uppercase tracking-tight text-zinc-900 dark:text-white">
                {confirmedList.length === 0
                  ? "Você ainda não confirmou presença em nenhum evento"
                  : "Nenhum evento encontrado com os filtros aplicados"}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto leading-relaxed">
                {confirmedList.length === 0
                  ? "Explore a agenda de encontros e jantares de networking exclusivos para confirmar sua presença."
                  : "Tente ajustar o termo pesquisado ou limpe os filtros para ver sua agenda completa."}
              </p>
            </div>
            {confirmedList.length === 0 ? (
              <Button
                asChild
                color="primary"
                radius="sm"
                size="sm"
                className="mt-2 text-xs font-black uppercase tracking-wider"
              >
                <Link href="/eventos">Explorar agenda completa</Link>
              </Button>
            ) : (
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
            )}
          </div>
        ) : (
          <div className="space-y-10">
            {groupedEventsByMonth.map((group) => (
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
                    {group.events.length}{" "}
                    {group.events.length === 1 ? "encontro" : "encontros"}
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {group.events.map((event) => (
                    <EventCard key={event.id} event={event} />
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
