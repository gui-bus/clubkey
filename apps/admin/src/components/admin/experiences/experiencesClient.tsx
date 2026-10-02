"use client"

import * as React from "react"

import { ADMIN_EXPERIENCES } from "@/src/data/mocks/experiences.data"
import type { AdminExperience, AdminExperienceStatus } from "@clubkey/types"
import {
  CtaButton,
  TableFilterBar,
  type TableFilterSection,
  type TableStatItem,
  TableStats,
  TableTitle,
} from "@clubkey/ui"
import { formatCurrency } from "@clubkey/utils"
import {
  CalendarBlank,
  Compass,
  CurrencyDollar,
  Funnel,
  Plus,
  Sparkle,
  Tag,
  Users,
} from "@phosphor-icons/react"
import { toast } from "sonner"

import { Container } from "@/src/components/common/container"

import { AdminHero } from "../common/adminHero"
import { ExperiencesTable } from "./experiencesTable"

const CATEGORY_OPTIONS = [
  { value: "ALL", label: "Todas as Categorias" },
  { value: "Gastronomia & Vinhos", label: "Gastronomia & Vinhos" },
  { value: "Aviação & Lifestyle", label: "Aviação & Lifestyle" },
  { value: "Náutica & Vela", label: "Náutica & Vela" },
  { value: "Esportes & Lifestyle", label: "Esportes & Lifestyle" },
  { value: "Gastronomia & Destilados", label: "Gastronomia & Destilados" },
  { value: "Ecoturismo & Aventura", label: "Ecoturismo & Aventura" },
  { value: "Arte & Cultura", label: "Arte & Cultura" },
  { value: "Alta Gastronomia", label: "Alta Gastronomia" },
]

const STATUS_OPTIONS = [
  { value: "ALL", label: "Todos os Status" },
  { value: "DISPONIVEL", label: "Disponível" },
  { value: "ULTIMAS_VAGAS", label: "Últimas Vagas" },
  { value: "ESGOTADO", label: "Esgotado" },
  { value: "CONCLUIDO", label: "Concluído" },
  { value: "CANCELADO", label: "Cancelado" },
]

export function ExperiencesClient(): React.JSX.Element {
  const [experiences, setExperiences] =
    React.useState<AdminExperience[]>(ADMIN_EXPERIENCES)
  const [searchQuery, setSearchQuery] = React.useState<string | null>(null)
  const [statusFilter, setStatusFilter] = React.useState<string | null>(null)
  const [categoryFilter, setCategoryFilter] = React.useState<string | null>(
    null
  )
  const [dateFrom, setDateFrom] = React.useState<string | null>(null)
  const [dateTo, setDateTo] = React.useState<string | null>(null)
  const [isRefreshing, setIsRefreshing] = React.useState(false)

  const filteredExperiences = React.useMemo(() => {
    return experiences.filter((exp) => {
      if (searchQuery && searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim()
        const matchesTitle = exp.title.toLowerCase().includes(q)
        const matchesCode = exp.code.toLowerCase().includes(q)
        const matchesPlace = exp.place.toLowerCase().includes(q)
        const matchesCity = exp.city.toLowerCase().includes(q)
        const matchesCategory = exp.category.toLowerCase().includes(q)

        if (
          !matchesTitle &&
          !matchesCode &&
          !matchesPlace &&
          !matchesCity &&
          !matchesCategory
        ) {
          return false
        }
      }

      if (
        statusFilter &&
        statusFilter !== "ALL" &&
        exp.status !== statusFilter
      ) {
        return false
      }

      if (
        categoryFilter &&
        categoryFilter !== "ALL" &&
        exp.category !== categoryFilter
      ) {
        return false
      }

      if (dateFrom && exp.date && exp.date < dateFrom) {
        return false
      }

      if (dateTo && exp.date && exp.date > dateTo) {
        return false
      }

      return true
    })
  }, [experiences, searchQuery, statusFilter, categoryFilter, dateFrom, dateTo])

  const statsItems: TableStatItem[] = React.useMemo(() => {
    const totalExp = experiences.length
    const totalConfirmed = experiences.reduce(
      (acc, curr) => acc + (curr.participants?.length || curr.confirmed || 0),
      0
    )
    const paidExperiences = experiences.filter((e) => e.price > 0)
    const avgTicket =
      paidExperiences.length > 0
        ? Math.round(
            paidExperiences.reduce((acc, curr) => acc + curr.price, 0) /
              paidExperiences.length
          )
        : 0

    const totalGmv = experiences.reduce(
      (acc, curr) =>
        acc + curr.price * (curr.participants?.length || curr.confirmed || 0),
      0
    )

    return [
      {
        label: "Total de Experiências",
        value: `${totalExp} Ativas`,
        subtext: "Curadoria exclusiva na plataforma",
        icon: Compass,
      },
      {
        label: "Vagas Preenchidas",
        value: `${totalConfirmed} Vagas`,
        subtext: "Membros inscritos nas experiências",
        icon: Users,
      },
      {
        label: "Ticket Médio",
        value: formatCurrency(avgTicket),
        subtext: "Valor médio por vaga comercializada",
        icon: CurrencyDollar,
      },
      {
        label: "Volume Transacionado (GMV)",
        value: formatCurrency(totalGmv),
        subtext: "Faturamento bruto gerado",
        icon: Sparkle,
      },
    ]
  }, [experiences])

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
            label: "Status da Experiência",
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
            label: "Categoria de Experiência",
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
            id: "exp_date_range",
            label: "Data da Experiência",
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
      toast.success("Experiências atualizadas", {
        description: "Catálogo de experiências e vagas sincronizado.",
      })
    }, 400)
  }

  const handleStatusChange = (id: number, newStatus: AdminExperienceStatus) => {
    setExperiences((prev) =>
      prev.map((exp) => (exp.id === id ? { ...exp, status: newStatus } : exp))
    )
    toast.success(`Status da experiência atualizado para ${newStatus}.`)
  }

  return (
    <div className="w-full flex flex-col">
      <AdminHero
        badge="PORTAL INTERNO • CURADORIA DE EXPERIÊNCIAS"
        title="Gestão de Experiências"
        description="Gerencie passeios privativos, degustações, regatas e experiências de lifestyle de alto padrão."
      >
        <TableFilterBar
          searchQuery={searchQuery || undefined}
          onSearchQueryChange={(v) => void setSearchQuery(v || null)}
          searchLabel="Título / Local / Categoria"
          searchPlaceholder="Buscar por experiência, local ou código..."
          sections={sectionsConfig}
          onReset={handleResetFilters}
          onRefresh={handleRefresh}
          isRefreshing={isRefreshing}
          actionTitle="Atualizar experiências"
        />
      </AdminHero>

      <Container className="space-y-6 pt-6 pb-12">
        <TableStats items={statsItems} />

        <TableTitle
          title="Catálogo de Experiências"
          description="Consulte o inventário de experiências exclusivas, valores por vaga e taxa de adesão dos membros."
          cta={
            <CtaButton
              href="/experiencias/novo"
              variant="primary"
              size="sm"
              className="w-full sm:w-auto flex items-center justify-center gap-2 shadow-xs shrink-0 cursor-pointer"
            >
              <Plus size={15} weight="bold" />
              <span>Nova Experiência</span>
            </CtaButton>
          }
        />

        <ExperiencesTable
          experiences={filteredExperiences}
          onResetFilters={handleResetFilters}
          onStatusChange={handleStatusChange}
        />
      </Container>
    </div>
  )
}
