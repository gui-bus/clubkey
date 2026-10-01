"use client"

import * as React from "react"

import {
  MOCK_CLAIMS,
  MOCK_CLAIM_STATUS_OPTIONS,
  MOCK_CLAIM_TYPE_OPTIONS,
  MOCK_COVERAGES_AND_LIMITS,
  MOCK_POLICY_DOCUMENTS,
} from "@/src/data/mocks/sinistros.data"
import type { AdminClaim } from "@clubkey/types"
import {
  TableFilterBar,
  type TableFilterSection,
  TableStats,
  type TableStatItem,
  toast,
} from "@clubkey/ui"
import { formatCurrency } from "@clubkey/utils"
import {
  ArrowClockwise,
  CalendarBlank,
  CheckCircle,
  ClockCountdown,
  CurrencyDollar,
  FileText,
  HouseLine,
  ShieldCheck,
  WarningCircle,
} from "@phosphor-icons/react"
import { parseAsString, useQueryState } from "nuqs"

import { Container } from "@/src/components/common/container"

import { AdminHero } from "../common/adminHero"
import { SinistrosCoveragesSection } from "./sinistrosCoveragesSection"
import { SinistrosDocumentsSection } from "./sinistrosDocumentsSection"
import { SinistrosTable } from "./sinistrosTable"

export function SinistrosClient(): React.JSX.Element {
  const [claims] = React.useState<AdminClaim[]>(MOCK_CLAIMS)

  const [searchQuery, setSearchQuery] = useQueryState(
    "q",
    parseAsString
      .withDefault("")
      .withOptions({ shallow: true, throttleMs: 250 })
  )
  const [statusFilter, setStatusFilter] = useQueryState(
    "status",
    parseAsString.withDefault("ALL").withOptions({ shallow: true })
  )
  const [typeFilter, setTypeFilter] = useQueryState(
    "tipo",
    parseAsString.withDefault("ALL").withOptions({ shallow: true })
  )
  const [dateFrom, setDateFrom] = useQueryState(
    "de",
    parseAsString.withDefault("").withOptions({ shallow: true })
  )
  const [dateTo, setDateTo] = useQueryState(
    "ate",
    parseAsString.withDefault("").withOptions({ shallow: true })
  )

  const filteredClaims = React.useMemo(() => {
    return claims.filter((claim) => {
      const q = searchQuery.toLowerCase().trim()
      if (q) {
        const matchesInsured = claim.insuredName.toLowerCase().includes(q)
        const matchesProperty = claim.propertyTitle.toLowerCase().includes(q)
        const matchesCode = claim.code.toLowerCase().includes(q)
        const matchesReservation = (claim.reservationCode || "").toLowerCase().includes(q)
        const matchesInternalCode = (claim.propertyInternalCode || "").toLowerCase().includes(q)

        if (
          !matchesInsured &&
          !matchesProperty &&
          !matchesCode &&
          !matchesReservation &&
          !matchesInternalCode
        ) {
          return false
        }
      }

      if (statusFilter !== "ALL" && claim.status !== statusFilter) {
        return false
      }

      if (typeFilter !== "ALL" && claim.type !== typeFilter) {
        return false
      }

      return true
    })
  }, [claims, searchQuery, statusFilter, typeFilter])

  const statsItems: TableStatItem[] = React.useMemo(() => {
    const totalClaims = claims.length
    const inAnalysisCount = claims.filter(
      (c) => c.status === "EM_ANALISE" || c.status === "ABERTO"
    ).length
    const paidClaims = claims.filter((c) => c.status === "PAGO")
    const paidCount = paidClaims.length
    const totalIndemnified = paidClaims.reduce(
      (acc, curr) => acc + (curr.approvedAmount || curr.estimatedAmount || 0),
      0
    )

    return [
      {
        label: "Total de Sinistros",
        value: `${totalClaims} ${totalClaims === 1 ? "Sinistro" : "Sinistros"}`,
        subtext: "Ocorrências patrimoniais registradas",
        icon: WarningCircle,
      },
      {
        label: "Em Regulação / Abertos",
        value: `${inAnalysisCount} ${inAnalysisCount === 1 ? "Ocorrência" : "Ocorrências"}`,
        subtext:
          inAnalysisCount > 0
            ? "Exigem análise pericial ou despacho"
            : "Sem ocorrências em aberto",
        icon: ClockCountdown,
      },
      {
        label: "Sinistros Indenizados",
        value: `${paidCount} ${paidCount === 1 ? "Liquidado" : "Liquidados"}`,
        subtext: "Indenizações pagas aos segurados",
        icon: CheckCircle,
      },
      {
        label: "Total Pago em Indenizações",
        value: formatCurrency(totalIndemnified),
        subtext: "Liquidação financeira da Proteção Key",
        icon: CurrencyDollar,
      },
    ]
  }, [claims])

  const sectionsConfig: TableFilterSection[] = React.useMemo(() => {
    const statusLabel =
      statusFilter !== "ALL"
        ? MOCK_CLAIM_STATUS_OPTIONS.find((o) => o.value === statusFilter)?.label || "Status"
        : "Todos os Status"

    const typeLabel =
      typeFilter !== "ALL"
        ? MOCK_CLAIM_TYPE_OPTIONS.find((o) => o.value === typeFilter)?.label || "Tipo"
        : "Todos os Tipos"

    const dateLabel =
      dateFrom || dateTo
        ? dateFrom && dateTo
          ? `${dateFrom} a ${dateTo}`
          : dateFrom
            ? `A partir de ${dateFrom}`
            : `Até ${dateTo}`
        : "Todo o Período"

    return [
      {
        id: "status",
        label: "Status",
        icon: ShieldCheck,
        displayValue: statusLabel,
        fields: [
          {
            id: "status",
            type: "select",
            label: "Status do Sinistro",
            value: statusFilter,
            onChange: (v) => void setStatusFilter(v === "ALL" ? null : v),
            options: MOCK_CLAIM_STATUS_OPTIONS,
            chipLabel: "Status",
          },
        ],
      },
      {
        id: "tipo",
        label: "Tipo",
        icon: FileText,
        displayValue: typeLabel,
        fields: [
          {
            id: "tipo",
            type: "select",
            label: "Tipo de Cobertura / Sinistro",
            value: typeFilter,
            onChange: (v) => void setTypeFilter(v === "ALL" ? null : v),
            options: MOCK_CLAIM_TYPE_OPTIONS,
            chipLabel: "Tipo",
          },
        ],
      },
      {
        id: "dates",
        label: "Ocorrência",
        icon: CalendarBlank,
        displayValue: dateLabel,
        fields: [
          {
            id: "dates",
            type: "date-range",
            label: "Data da Ocorrência",
            dateFrom: dateFrom || undefined,
            dateTo: dateTo || undefined,
            onDateFromChange: (d) => void setDateFrom(d || null),
            onDateToChange: (d) => void setDateTo(d || null),
            chipLabel: "Ocorrência",
          },
        ],
      },
    ]
  }, [statusFilter, typeFilter, dateFrom, dateTo, setStatusFilter, setTypeFilter, setDateFrom, setDateTo])

  const handleResetFilters = () => {
    void setSearchQuery(null)
    void setStatusFilter(null)
    void setTypeFilter(null)
    void setDateFrom(null)
    void setDateTo(null)
  }

  const handleRefresh = () => {
    toast.success("Sinistros atualizados", {
      description: "Registros e status de regulação sincronizados.",
    })
  }

  return (
    <div className="w-full flex flex-col">
      <AdminHero
        badge="PORTAL INTERNO • REGULAÇÃO AUDITADA"
        title="GESTÃO DE SINISTROS"
        description="Abertura, regulação pericial, anexos de laudos e liquidação financeira de ocorrências patrimoniais para imóveis cadastrados."
        imageSrc="/utils/banners/experiencias.webp"
        imageAlt="Gestão de Sinistros ClubKey"
      >
        <TableFilterBar
          searchQuery={searchQuery}
          onSearchQueryChange={(v) => void setSearchQuery(v || null)}
          searchLabel="Imóvel / Segurado / Código"
          searchPlaceholder="Buscar por imóvel, segurado, código ou reserva..."
          sections={sectionsConfig}
          onReset={handleResetFilters}
          onRefresh={handleRefresh}
          actionTitle="Atualizar sinistros"
        />
      </AdminHero>

      <Container className="space-y-6 pt-6 pb-12">
        <TableStats items={statsItems} />

        <SinistrosTable claims={filteredClaims} />

        <SinistrosCoveragesSection coverages={MOCK_COVERAGES_AND_LIMITS} />

        <SinistrosDocumentsSection documents={MOCK_POLICY_DOCUMENTS} />
      </Container>
    </div>
  )
}
