"use client"

import * as React from "react"

import {
  MOCK_CLAIMS,
  MOCK_COVERAGES_AND_LIMITS,
  MOCK_POLICY_DOCUMENTS,
} from "@/src/data/mocks/sinistros.data"
import type { AdminClaim } from "@clubkey/types"
import { TableStats, type TableStatItem, toast } from "@clubkey/ui"
import { formatCurrency } from "@clubkey/utils"
import {
  CheckCircle,
  ClockCountdown,
  CurrencyDollar,
  WarningCircle,
} from "@phosphor-icons/react"
import { parseAsString, useQueryState } from "nuqs"

import { Container } from "@/src/components/common/container"

import { AdminHero } from "../common/adminHero"
import { SinistrosCoveragesSection } from "./sinistrosCoveragesSection"
import { SinistrosDocumentsSection } from "./sinistrosDocumentsSection"
import { SinistrosFilterBar } from "./sinistrosFilterBar"
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

  const handleResetFilters = () => {
    void setSearchQuery(null)
    void setStatusFilter("ALL")
    void setTypeFilter("ALL")
    void setDateFrom(null)
    void setDateTo(null)
  }

  const handleRefresh = () => {
    toast.success("Sinistros atualizados", {
      description: "Registros e status de regulação sincronizados.",
    })
  }

  return (
    <div className="w-full flex flex-col pb-12">
      <AdminHero
        badge="PORTAL INTERNO • REGULAÇÃO AUDITADA"
        title="GESTÃO DE SINISTROS"
        description="Abertura, regulação pericial, anexos de laudos e liquidação financeira de ocorrências patrimoniais para imóveis cadastrados."
        imageSrc="/utils/banners/experiencias.webp"
        imageAlt="Gestão de Sinistros ClubKey"
      >
        <SinistrosFilterBar
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          status={statusFilter}
          onStatusChange={setStatusFilter}
          claimType={typeFilter}
          onClaimTypeChange={setTypeFilter}
          dateFrom={dateFrom}
          onDateFromChange={setDateFrom}
          dateTo={dateTo}
          onDateToChange={setDateTo}
          onReset={handleResetFilters}
          onRefresh={handleRefresh}
        />
      </AdminHero>

      <Container className="space-y-8 -mt-3 sm:-mt-8">
        <TableStats items={statsItems} />

        <div className="space-y-4">
          <SinistrosTable claims={filteredClaims} />
        </div>

        <SinistrosCoveragesSection coverages={MOCK_COVERAGES_AND_LIMITS} />

        <SinistrosDocumentsSection documents={MOCK_POLICY_DOCUMENTS} />
      </Container>
    </div>
  )
}
