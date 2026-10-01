"use client"

import * as React from "react"

import {
  MOCK_CLAIMS,
  MOCK_COVERAGES_AND_LIMITS,
  MOCK_POLICY_DOCUMENTS,
} from "@/src/data/mocks/sinistros.data"
import type { AdminClaim } from "@clubkey/types"
import { toast } from "@clubkey/ui"
import { parseAsString, useQueryState } from "nuqs"

import { Container } from "@/src/components/common/container"

import { AdminHero } from "../common/adminHero"
import { SinistrosCoveragesSection } from "./sinistrosCoveragesSection"
import { SinistrosDocumentsSection } from "./sinistrosDocumentsSection"
import { SinistrosFilterBar } from "./sinistrosFilterBar"
import { SinistrosStats } from "./sinistrosStats"
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
        <SinistrosStats claims={claims} />

        <div className="space-y-4">
          <SinistrosTable claims={filteredClaims} />
        </div>

        <SinistrosCoveragesSection coverages={MOCK_COVERAGES_AND_LIMITS} />

        <SinistrosDocumentsSection documents={MOCK_POLICY_DOCUMENTS} />
      </Container>
    </div>
  )
}
