"use client"

import * as React from "react"
import Link from "next/link"
import { useParams, notFound } from "next/navigation"
import { MapPin, MagnifyingGlass, Users, Check, Calendar, ArrowRight } from "@phosphor-icons/react"

import { EVENTS, MEMBERS } from "@/src/data/portalData"
import { usePortalStore } from "@/src/store/usePortalStore"
import { BackButton } from "@/src/components/portal/BackButton"
import { PortalHeroFilterBar } from "@/src/components/portal/PortalHeroFilterBar"
import { MemberCard } from "@/src/components/portal/MemberCard"
import { Button } from "@/src/components/ui/button/button"
import { Container } from "@/src/components/common/container"

const ROLE_FILTERS = [
  { value: "todos", label: "Todos" },
  { value: "fundadores", label: "Fundadores" },
  { value: "c-level", label: "C-Level & Diretores" },
  { value: "investidores", label: "Investidores & Partners" },
]

export default function EventParticipantsPage(): React.JSX.Element {
  const params = useParams()
  const idParam = Array.isArray(params?.id) ? params.id[0] : params?.id
  const eventId = Number(idParam)
  const event = EVENTS.find((e) => e.id === eventId)

  if (!event) {
    notFound()
  }

  const { confirmedEvents } = usePortalStore()
  const isConfirmed = !!confirmedEvents[event.id]

  const [searchQuery, setSearchQuery] = React.useState("")
  const [activeRole, setActiveRole] = React.useState("todos")

  const attendees = React.useMemo(() => {
    return event.participants
      .map((id: number) => MEMBERS.find((m) => m.id === id))
      .filter((m): m is typeof MEMBERS[0] => Boolean(m))
  }, [event.participants])

  const roleOptions = React.useMemo(() => {
    return ROLE_FILTERS.map((r) => ({
      value: r.value,
      label: r.label,
      count:
        r.value === "todos"
          ? attendees.length
          : r.value === "fundadores"
            ? attendees.filter(
                (m) =>
                  m.role.toLowerCase().includes("founder") ||
                  m.role.toLowerCase().includes("fundador") ||
                  m.role.toLowerCase().includes("co-founder")
              ).length
            : r.value === "c-level"
              ? attendees.filter(
                  (m) =>
                    m.role.toLowerCase().includes("ceo") ||
                    m.role.toLowerCase().includes("cto") ||
                    m.role.toLowerCase().includes("cmo") ||
                    m.role.toLowerCase().includes("cfo") ||
                    m.role.toLowerCase().includes("vp") ||
                    m.role.toLowerCase().includes("diretor") ||
                    m.role.toLowerCase().includes("head")
                ).length
              : attendees.filter(
                  (m) =>
                    m.role.toLowerCase().includes("investidor") ||
                    m.role.toLowerCase().includes("partner") ||
                    m.role.toLowerCase().includes("managing") ||
                    m.role.toLowerCase().includes("venture") ||
                    m.offering.some(
                      (t) =>
                        t.toLowerCase().includes("investimento") ||
                        t.toLowerCase().includes("capital") ||
                        t.toLowerCase().includes("mentoria")
                    )
                ).length,
    }))
  }, [attendees])

  const filteredAttendees = React.useMemo(() => {
    let list = attendees

    if (activeRole === "fundadores") {
      list = list.filter(
        (m) =>
          m.role.toLowerCase().includes("founder") ||
          m.role.toLowerCase().includes("fundador") ||
          m.role.toLowerCase().includes("co-founder")
      )
    } else if (activeRole === "c-level") {
      list = list.filter(
        (m) =>
          m.role.toLowerCase().includes("ceo") ||
          m.role.toLowerCase().includes("cto") ||
          m.role.toLowerCase().includes("cmo") ||
          m.role.toLowerCase().includes("cfo") ||
          m.role.toLowerCase().includes("vp") ||
          m.role.toLowerCase().includes("diretor") ||
          m.role.toLowerCase().includes("head")
      )
    } else if (activeRole === "investidores") {
      list = list.filter(
        (m) =>
          m.role.toLowerCase().includes("investidor") ||
          m.role.toLowerCase().includes("partner") ||
          m.role.toLowerCase().includes("managing") ||
          m.role.toLowerCase().includes("venture") ||
          m.offering.some(
            (t) =>
              t.toLowerCase().includes("investimento") ||
              t.toLowerCase().includes("capital") ||
              t.toLowerCase().includes("mentoria")
          )
      )
    }

    const q = searchQuery.trim().toLowerCase()
    if (!q) return list

    return list.filter((m) => {
      const fullText = [
        m.name,
        m.role,
        m.company,
        m.city,
        ...m.seeking,
        ...m.offering,
      ]
        .join(" ")
        .toLowerCase()
      return fullText.includes(q)
    })
  }, [attendees, activeRole, searchQuery])

  const handleClearFilters = () => {
    setSearchQuery("")
    setActiveRole("todos")
  }

  const hasActiveFilters = activeRole !== "todos" || Boolean(searchQuery)

  return (
    <Container className="pt-6 sm:pt-8 pb-20 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <BackButton
          fallbackHref="/eventos"
          label="Voltar ao Evento"
        />

        <Link
          href={`/eventos/${event.id}/${event.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200 hover:border-brand-primary transition-colors self-start sm:self-auto"
        >
          <span>Ver Detalhes do Evento</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-black uppercase tracking-widest text-brand-primary">
            Relação de Confirmados
          </span>
          <span className="text-zinc-300 dark:text-zinc-700">•</span>
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            {event.category || "Exclusivo Membros"}
          </span>
          {isConfirmed && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-xs bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-[10px] font-black uppercase tracking-wider">
              <Check className="w-3 h-3" />
              Você está confirmado
            </span>
          )}
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-3xl sm:text-4xl font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white">
              Quem vai estar lá ({attendees.length})
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 flex flex-wrap items-center gap-2">
              <strong className="text-zinc-800 dark:text-zinc-200 font-semibold">{event.title}</strong>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-brand-primary" />
                {event.weekday}, {event.day} de {event.month}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-brand-primary" />
                {event.place}
              </span>
            </p>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-zinc-100 dark:bg-zinc-800/80 text-xs font-bold text-zinc-700 dark:text-zinc-300 shrink-0 self-start md:self-auto">
            <Users className="w-3.5 h-3.5 text-brand-primary" />
            <span>{attendees.length} de {event.capacity} vagas preenchidas</span>
          </div>
        </div>
      </div>

      <div className="w-full pt-2">
        <PortalHeroFilterBar
          className="max-w-none w-full shadow-none"
          categoryLabel="Segmento"
          categoryIcon={Users}
          activeCategory={activeRole}
          onCategoryChange={setActiveRole}
          categories={roleOptions}
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          searchPlaceholder="Buscar participantes por nome, empresa, cargo ou interesses..."
        />
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap items-center justify-between gap-3 text-zinc-900 dark:text-white">
          <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-600 dark:text-zinc-300">
            <span className="font-semibold text-zinc-900 dark:text-white">
              Filtros aplicados:
            </span>
            {activeRole !== "todos" && (
              <span className="px-2.5 py-1 rounded-sm bg-brand-primary/10 text-brand-primary font-bold flex items-center gap-1.5">
                <Users className="w-3 h-3" />
                <span>
                  {ROLE_FILTERS.find((r) => r.value === activeRole)?.label}
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
          {filteredAttendees.length}{" "}
          {filteredAttendees.length === 1 ? "participante confirmado" : "participantes confirmados"}
        </span>
      </div>

      {filteredAttendees.length === 0 ? (
        <div className="p-12 text-center rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] space-y-3">
          <div className="w-10 h-10 rounded-sm bg-zinc-100 dark:bg-zinc-800 text-zinc-400 flex items-center justify-center mx-auto">
            <Users className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold uppercase tracking-tight text-zinc-900 dark:text-white">
            Nenhum participante encontrado
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto">
            Não encontramos membros com os critérios selecionados. Tente ajustar a busca.
          </p>
          <Button
            type="button"
            color="primary"
            radius="sm"
            size="sm"
            onClick={handleClearFilters}
            className="mt-2 text-xs font-black uppercase tracking-wider"
          >
            Limpar busca
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredAttendees.map((member) => (
            <MemberCard
              key={member.id}
              member={member}
              isHost={member.id === event.organizerId}
            />
          ))}
        </div>
      )}
    </Container>
  )
}

