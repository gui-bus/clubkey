"use client"

import * as React from "react"

import { notFound, useParams } from "next/navigation"

import { EVENTS, MEMBERS, getEventSlug } from "@/src/data/portalData"
import {
  ArrowRight,
  Calendar,
  MagnifyingGlass,
  MapPin,
  Users,
} from "@phosphor-icons/react"

import { Button } from "@/src/components/ui/button/button"

import { Container } from "@/src/components/common/container"
import { CtaButton } from "@/src/components/common/ctaButton"
import { BackButton } from "@/src/components/portal/backButton"
import { MemberCard } from "@/src/components/portal/memberCard"
import { PortalHeroFilterBar } from "@/src/components/portal/portalHeroFilterBar"

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

  const [searchQuery, setSearchQuery] = React.useState("")
  const [activeRole, setActiveRole] = React.useState("todos")

  const attendees = React.useMemo(() => {
    return event.participants
      .map((id: number) => MEMBERS.find((m) => m.id === id))
      .filter((m): m is (typeof MEMBERS)[0] => Boolean(m))
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
        m.firstName,
        m.lastName,
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
        <BackButton fallbackHref="/eventos" label="Voltar ao Evento" />

        <CtaButton
          href={`/eventos/${event.id}/${getEventSlug(event)}`}
          variant="outline"
          size="sm"
          className="h-9 px-3.5 text-xs shadow-none hover:shadow-none self-start sm:self-auto"
        >
          <span>Ver Detalhes do Evento</span>
          <ArrowRight className="w-3.5 h-3.5 ml-2 shrink-0" />
        </CtaButton>
      </div>

      <div className="space-y-1">
        <h1 className="text-3xl sm:text-4xl font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white">
          Quem vai estar lá ({attendees.length})
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 flex flex-wrap items-center gap-2">
          <strong className="text-zinc-800 dark:text-zinc-200 font-semibold">
            {event.title}
          </strong>
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
          <span>•</span>
          <span className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400">
            <Users className="w-3.5 h-3.5 text-brand-primary" />
            {attendees.length} participantes confirmados
          </span>
        </p>
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
          {filteredAttendees.length === 1
            ? "participante confirmado"
            : "participantes confirmados"}
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
            Não encontramos membros com os critérios selecionados. Tente ajustar
            a busca.
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
