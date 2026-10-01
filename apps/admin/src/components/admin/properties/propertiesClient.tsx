"use client"

import * as React from "react"

import { MOCK_PROPERTIES } from "@/src/data/mocks/properties.data"
import type { AdminProperty } from "@clubkey/types"
import { TableStats, type TableStatItem, TableTitle } from "@clubkey/ui"
import { formatCurrency } from "@clubkey/utils"
import { Bed, Buildings, ChartPieSlice, CurrencyDollar } from "@phosphor-icons/react"
import { parseAsString, parseAsStringLiteral, useQueryState } from "nuqs"

import { Container } from "@/src/components/common/container"

import { AdminHero } from "../common/adminHero"
import {
  PropertiesFilterBar,
  type PropertySearchField,
} from "./propertiesFilterBar"
import { PropertiesTable } from "./propertiesTable"

const SEARCH_FIELDS = ["ALL", "title", "code", "host", "city"] as const

export function PropertiesClient(): React.JSX.Element {
  const [properties] = React.useState<AdminProperty[]>(MOCK_PROPERTIES)

  const [searchQuery, setSearchQuery] = useQueryState(
    "q",
    parseAsString
      .withDefault("")
      .withOptions({ shallow: true, throttleMs: 250 })
  )
  const [searchField, setSearchField] = useQueryState(
    "campo",
    parseAsStringLiteral(SEARCH_FIELDS)
      .withDefault("ALL")
      .withOptions({ shallow: true })
  )
  const [adminStatusFilter, setAdminStatusFilter] = useQueryState(
    "adminStatus",
    parseAsString.withDefault("ALL").withOptions({ shallow: true })
  )
  const [stayStatusFilter, setStayStatusFilter] = useQueryState(
    "stayStatus",
    parseAsString.withDefault("ALL").withOptions({ shallow: true })
  )
  const [platformFilter, setPlatformFilter] = useQueryState(
    "plataforma",
    parseAsString.withDefault("ALL").withOptions({ shallow: true })
  )
  const [workspaceFilter, setWorkspaceFilter] = useQueryState(
    "workspace",
    parseAsString.withDefault("ALL").withOptions({ shallow: true })
  )
  const [propertyTypeFilter, setPropertyTypeFilter] = useQueryState(
    "tipo",
    parseAsString.withDefault("ALL").withOptions({ shallow: true })
  )

  const filteredProperties = React.useMemo(() => {
    return properties.filter((prop) => {
      const query = searchQuery.toLowerCase().trim()

      let matchesSearch = true
      if (query) {
        if (searchField === "title") {
          matchesSearch = prop.title.toLowerCase().includes(query)
        } else if (searchField === "code") {
          matchesSearch =
            prop.internalCode.toLowerCase().includes(query) ||
            prop.codeTag.toLowerCase().includes(query)
        } else if (searchField === "host") {
          matchesSearch =
            prop.host.name.toLowerCase().includes(query) ||
            prop.host.idTag.toLowerCase().includes(query)
        } else if (searchField === "city") {
          matchesSearch =
            prop.city.toLowerCase().includes(query) ||
            prop.state.toLowerCase().includes(query)
        } else {
          matchesSearch =
            prop.title.toLowerCase().includes(query) ||
            prop.internalCode.toLowerCase().includes(query) ||
            prop.codeTag.toLowerCase().includes(query) ||
            prop.host.name.toLowerCase().includes(query) ||
            prop.city.toLowerCase().includes(query) ||
            prop.state.toLowerCase().includes(query)
        }
      }

      if (!matchesSearch) return false

      if (
        adminStatusFilter !== "ALL" &&
        prop.adminStatus !== adminStatusFilter
      ) {
        return false
      }

      if (stayStatusFilter !== "ALL" && prop.stayStatus !== stayStatusFilter) {
        return false
      }

      if (platformFilter !== "ALL" && prop.platform !== platformFilter) {
        return false
      }

      if (workspaceFilter !== "ALL" && prop.host.id !== workspaceFilter) {
        return false
      }

      if (
        propertyTypeFilter !== "ALL" &&
        prop.propertyType !== propertyTypeFilter
      ) {
        return false
      }

      return true
    })
  }, [
    properties,
    searchQuery,
    searchField,
    adminStatusFilter,
    stayStatusFilter,
    platformFilter,
    workspaceFilter,
    propertyTypeFilter,
  ])

  const handleResetFilters = () => {
    void setSearchQuery(null)
    void setSearchField("ALL")
    void setAdminStatusFilter("ALL")
    void setStayStatusFilter("ALL")
    void setPlatformFilter("ALL")
    void setWorkspaceFilter("ALL")
    void setPropertyTypeFilter("ALL")
  }

  const statsItems: TableStatItem[] = React.useMemo(() => {
    const totalProperties = properties.length
    const totalRevenue = properties.reduce(
      (acc, p) => acc + (p.revenueLastMonth || 0),
      0
    )
    const avgOccupancy =
      totalProperties > 0
        ? properties.reduce((acc, p) => acc + (p.occupancyRate || 0), 0) /
          totalProperties
        : 0
    const avgRevPar =
      totalProperties > 0
        ? properties.reduce((acc, p) => acc + (p.revPar || 0), 0) /
          totalProperties
        : 0

    const availableStay = properties.filter(
      (p) => p.stayStatus === "DISPONIVEL"
    ).length

    return [
      {
        label: "Total de Imóveis",
        value: totalProperties.toString(),
        subtext: `${availableStay} ativos para reserva no Stay`,
        icon: Buildings,
      },
      {
        label: "Receita (Últ. Mês)",
        value: formatCurrency(totalRevenue),
        subtext: "Fechado: Ago/26 por criação de reserva",
        icon: CurrencyDollar,
      },
      {
        label: "Ocupação Média",
        value: `${avgOccupancy.toFixed(1)}%`,
        subtext: "Média de ocupação da carteira",
        icon: ChartPieSlice,
      },
      {
        label: "RevPAR Médio",
        value: formatCurrency(Math.round(avgRevPar)),
        subtext: "Receita média por noite disponível",
        icon: Bed,
      },
    ]
  }, [properties])

  return (
    <div className="w-full flex flex-col">
      <AdminHero
        badge="Gestão de Imóveis & Hospedagens"
        title="Catálogo de Imóveis"
        description="Pesquise, filtre e gerencie inventário, ocupação, faturamento mensal e integração com plataformas."
        imageSrc="/utils/banners/experiencias.webp"
        imageAlt="Catálogo de Imóveis ClubKey"
      >
        <PropertiesFilterBar
          searchQuery={searchQuery}
          onSearchQueryChange={(v) => void setSearchQuery(v || null)}
          searchField={searchField}
          onSearchFieldChange={(v) =>
            void setSearchField(v === "ALL" ? null : v)
          }
          adminStatusFilter={adminStatusFilter}
          onAdminStatusChange={(v) =>
            void setAdminStatusFilter(v === "ALL" ? null : v)
          }
          stayStatusFilter={stayStatusFilter}
          onStayStatusChange={(v) =>
            void setStayStatusFilter(v === "ALL" ? null : v)
          }
          platformFilter={platformFilter}
          onPlatformChange={(v) =>
            void setPlatformFilter(v === "ALL" ? null : v)
          }
          workspaceFilter={workspaceFilter}
          onWorkspaceChange={(v) =>
            void setWorkspaceFilter(v === "ALL" ? null : v)
          }
          propertyTypeFilter={propertyTypeFilter}
          onPropertyTypeChange={(v) =>
            void setPropertyTypeFilter(v === "ALL" ? null : v)
          }
          onReset={handleResetFilters}
        />
      </AdminHero>

      <Container className="space-y-6 -mt-3 sm:-mt-8">
        <TableStats items={statsItems} />

        <TableTitle
          title="Lista de Imóveis"
          description="Consulte o inventário de imóveis, receita consolidada, noites ocupadas e status no Stay."
        />

        <PropertiesTable properties={filteredProperties} />
      </Container>
    </div>
  )
}
