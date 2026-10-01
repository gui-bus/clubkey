"use client"

import * as React from "react"

import { ADMIN_EVENTS } from "@/src/data/mocks/events.data"
import type { AdminEvent, AdminEventStatus } from "@clubkey/types"
import {
  CtaButton,
  TableFilterBar,
  type TableFilterSection,
  type TableStatItem,
  TableStats,
  TableTitle,
} from "@clubkey/ui"
import {
  CalendarBlank,
  CalendarCheck,
  CheckCircle,
  Funnel,
  Lightning,
  Plus,
  Tag,
  Users,
} from "@phosphor-icons/react"
import { toast } from "sonner"

import { Container } from "@/src/components/common/container"

import { AdminHero } from "../common/adminHero"
import { EventsTable } from "./eventsTable"

const CATEGORY_OPTIONS = [
  { value: "ALL", label: "Todas as Categorias" },
  { value: "Networking", label: "Networking" },
  { value: "Investimentos", label: "Investimentos" },
  { value: "Governança", label: "Governança" },
  { value: "Agribusiness", label: "Agribusiness" },
  { value: "Gastronomia", label: "Gastronomia" },
  { value: "Internacional", label: "Internacional" },
  { value: "Summit", label: "Summit" },
]

const STATUS_OPTIONS = [
  { value: "ALL", label: "Todos os Status" },
  { value: "PUBLICADO", label: "Publicado" },
  { value: "CONFIRMADO", label: "Confirmado" },
  { value: "EM_BREVE", label: "Em Breve" },
  { value: "ESGOTADO", label: "Esgotado" },
  { value: "CONCLUIDO", label: "Concluído" },
  { value: "CANCELADO", label: "Cancelado" },
]

export function EventsClient(): React.JSX.Element {
  const [events, setEvents] = React.useState<AdminEvent[]>(ADMIN_EVENTS)
  const [searchQuery, setSearchQuery] = React.useState<string | null>(null)
  const [statusFilter, setStatusFilter] = React.useState<string | null>(null)
  const [categoryFilter, setCategoryFilter] = React.useState<string | null>(
    null
  )
  const [dateFrom, setDateFrom] = React.useState<string | null>(null)
  const [dateTo, setDateTo] = React.useState<string | null>(null)
  const [isRefreshing, setIsRefreshing] = React.useState(false)

  const filteredEvents = React.useMemo(() => {
    return events.filter((evt) => {
      if (searchQuery && searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim()
        const matchesTitle = evt.title.toLowerCase().includes(q)
        const matchesCode = evt.code.toLowerCase().includes(q)
        const matchesPlace = evt.place.toLowerCase().includes(q)
        const matchesCity = evt.city.toLowerCase().includes(q)
        const matchesHost = evt.host
          ? `${evt.host.firstName} ${evt.host.lastName}`
              .toLowerCase()
              .includes(q)
          : false

        if (
          !matchesTitle &&
          !matchesCode &&
          !matchesPlace &&
          !matchesCity &&
          !matchesHost
        ) {
          return false
        }
      }

      if (
        statusFilter &&
        statusFilter !== "ALL" &&
        evt.status !== statusFilter
      ) {
        return false
      }

      if (
        categoryFilter &&
        categoryFilter !== "ALL" &&
        evt.category !== categoryFilter
      ) {
        return false
      }

      if (dateFrom && evt.date && evt.date < dateFrom) {
        return false
      }

      if (dateTo && evt.date && evt.date > dateTo) {
        return false
      }

      return true
    })
  }, [events, searchQuery, statusFilter, categoryFilter, dateFrom, dateTo])

  const statsItems: TableStatItem[] = React.useMemo(() => {
    const totalEvents = events.length
    const totalConfirmed = events.reduce(
      (acc, curr) =>
        acc + (curr.participants?.length || curr.initialConfirmed || 0),
      0
    )
    const totalCapacity = events.reduce((acc, curr) => acc + curr.capacity, 0)
    const avgOccupancy =
      totalCapacity > 0 ? Math.round((totalConfirmed / totalCapacity) * 100) : 0
    const totalXp = events.reduce((acc, curr) => acc + (curr.xp || 0), 0)

    return [
      {
        label: "Total de Eventos",
        value: `${totalEvents} Eventos`,
        subtext: "Cadastrados na plataforma",
        icon: CalendarCheck,
      },
      {
        label: "Vagas Confirmadas",
        value: `${totalConfirmed} Membros`,
        subtext: "Inscrições ativas nos eventos",
        icon: Users,
      },
      {
        label: "Taxa de Ocupação Média",
        value: `${avgOccupancy}%`,
        subtext: "Média de vagas preenchidas",
        icon: CheckCircle,
      },
      {
        label: "Gamificação & Recompensas",
        value: `+${totalXp.toLocaleString("pt-BR")} XP`,
        subtext: "Pontos distribuídos aos membros",
        icon: Lightning,
      },
    ]
  }, [events])

  const sectionsConfig: TableFilterSection[] = React.useMemo(() => {
    const activeStatusLabel =
      STATUS_OPTIONS.find((s) => s.value === statusFilter)?.label ||
      "Todos os Status"
    const activeCategoryLabel =
      CATEGORY_OPTIONS.find((c) => c.value === categoryFilter)?.label ||
      "Todas as Categorias"

    let dateDisplay = "Todo o Período"
    if (dateFrom && dateTo) {
      dateDisplay = `${dateFrom} até ${dateTo}`
    } else if (dateFrom) {
      dateDisplay = `A partir de ${dateFrom}`
    } else if (dateTo) {
      dateDisplay = `Até ${dateTo}`
    }

    return [
      {
        id: "status",
        label: "Status",
        displayValue: activeStatusLabel,
        icon: Funnel,
        fields: [
          {
            type: "select",
            id: "status_select",
            label: "Status do Evento",
            value: statusFilter || "ALL",
            onChange: (v: string) =>
              void setStatusFilter(v === "ALL" ? null : v),
            options: STATUS_OPTIONS,
          },
        ],
      },
      {
        id: "category",
        label: "Categoria",
        displayValue: activeCategoryLabel,
        icon: Tag,
        fields: [
          {
            type: "select",
            id: "category_select",
            label: "Categoria do Evento",
            value: categoryFilter || "ALL",
            onChange: (v: string) =>
              void setCategoryFilter(v === "ALL" ? null : v),
            options: CATEGORY_OPTIONS,
          },
        ],
      },
      {
        id: "period",
        label: "Período",
        displayValue: dateDisplay,
        icon: CalendarBlank,
        fields: [
          {
            type: "date-range",
            id: "event_date_range",
            label: "Data do Evento",
            dateFrom: dateFrom || undefined,
            dateTo: dateTo || undefined,
            onDateFromChange: (d: string) => void setDateFrom(d || null),
            onDateToChange: (d: string) => void setDateTo(d || null),
            chipLabel: "Período",
          },
        ],
      },
    ]
  }, [statusFilter, categoryFilter, dateFrom, dateTo])

  const handleResetFilters = () => {
    void setSearchQuery(null)
    void setStatusFilter(null)
    void setCategoryFilter(null)
    void setDateFrom(null)
    void setDateTo(null)
  }

  const handleRefresh = () => {
    setIsRefreshing(true)
    setTimeout(() => {
      setIsRefreshing(false)
      toast.success("Catálogo de eventos atualizado", {
        description: "Status de inscrições e lotações sincronizados.",
      })
    }, 400)
  }

  const handleStatusChange = (id: number, newStatus: AdminEventStatus) => {
    setEvents((prev) =>
      prev.map((evt) => (evt.id === id ? { ...evt, status: newStatus } : evt))
    )
    toast.success(`Status do evento atualizado para ${newStatus}.`)
  }

  return (
    <div className="w-full flex flex-col">
      <AdminHero
        badge="PORTAL INTERNO • GESTÃO DE EVENTOS"
        title="Gestão de Eventos"
        description="Planeje, publique e controle a lotação de jantares, summits, mesas redondas e encontros exclusivos do clube."
      >
        <TableFilterBar
          searchQuery={searchQuery || undefined}
          onSearchQueryChange={(v) => void setSearchQuery(v || null)}
          searchLabel="Título / Local / Anfitrião"
          searchPlaceholder="Buscar por título, local, anfitrião ou código..."
          sections={sectionsConfig}
          onReset={handleResetFilters}
          onRefresh={handleRefresh}
          isRefreshing={isRefreshing}
          actionTitle="Atualizar eventos"
        />
      </AdminHero>

      <Container className="space-y-6 pt-6 pb-12">
        <TableStats items={statsItems} />

        <TableTitle
          title="Catálogo de Eventos"
          description="Consulte o inventário de eventos, status de confirmação, lotação de vagas e detalhes de realização."
          cta={
            <CtaButton
              href="/eventos/novo"
              variant="primary"
              size="sm"
              className="w-full sm:w-auto flex items-center justify-center gap-2 shadow-xs shrink-0 cursor-pointer"
            >
              <Plus size={15} weight="bold" />
              <span>Novo Evento</span>
            </CtaButton>
          }
        />

        <EventsTable
          events={filteredEvents}
          onResetFilters={handleResetFilters}
          onStatusChange={handleStatusChange}
        />
      </Container>
    </div>
  )
}
