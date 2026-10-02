"use client"

import * as React from "react"

import { MOCK_PROPERTIES } from "@/src/data/mocks/properties.data"
import type { AdminProperty } from "@clubkey/types"
import {
  type SelectOption,
  TableFilterBar,
  type TableFilterSection,
  type TableSearchFieldOption,
  type TableStatItem,
  TableStats,
  TableTitle,
} from "@clubkey/ui"
import { formatCurrency } from "@clubkey/utils"
import {
  Bed,
  Buildings,
  ChartPieSlice,
  CurrencyDollar,
  Globe,
  Hash,
  HouseLine,
  MagnifyingGlass,
  MapPin,
  ShieldCheck,
  SlidersHorizontal,
  Tag,
  User,
} from "@phosphor-icons/react"
import { parseAsString, parseAsStringLiteral, useQueryState } from "nuqs"

import { Container } from "@/src/components/common/container"

import { AdminHero } from "../common/adminHero"
import { PropertiesTable } from "./propertiesTable"

const SEARCH_FIELDS = ["ALL", "title", "code", "host", "city"] as const

type PropertySearchField = (typeof SEARCH_FIELDS)[number]

const SEARCH_FIELD_OPTIONS: TableSearchFieldOption[] = [
  {
    value: "ALL",
    label: "Todos os campos",
    short: "Geral",
    placeholder: "Buscar por nome, código (#AF03J), host ou cidade...",
    icon: MagnifyingGlass,
  },
  {
    value: "title",
    label: "Nome do Imóvel",
    short: "Imóvel",
    placeholder: "Digitar nome do imóvel...",
    icon: HouseLine,
  },
  {
    value: "code",
    label: "Código / Tag",
    short: "Código",
    placeholder: "Digitar código ou tag (ex: AF03J)...",
    icon: Hash,
  },
  {
    value: "host",
    label: "Host / Gestora",
    short: "Host",
    placeholder: "Digitar nome do anfitrião/host...",
    icon: User,
  },
  {
    value: "city",
    label: "Cidade / UF",
    short: "Local",
    placeholder: "Digitar cidade ou UF...",
    icon: MapPin,
  },
]

const ADMIN_STATUS_OPTIONS: SelectOption[] = [
  { value: "ALL", label: "Status Admin: Todos" },
  { value: "ATIVO", label: "Ativo" },
  { value: "INATIVO", label: "Inativo" },
]

const STAY_STATUS_OPTIONS: SelectOption[] = [
  { value: "ALL", label: "Status Stay: Todos" },
  { value: "DISPONIVEL", label: "Disponível para reserva" },
  { value: "OCULTO", label: "Oculto no Stay" },
  { value: "BLOQUEADO", label: "Bloqueado / Manutenção" },
]

const PLATFORM_OPTIONS: SelectOption[] = [
  { value: "ALL", label: "Plataforma: Todas" },
  { value: "ClubKey Stay", label: "ClubKey Stay" },
  { value: "Airbnb Sync", label: "Airbnb Sync" },
  { value: "Stays.net", label: "Stays.net" },
]

const WORKSPACE_OPTIONS: SelectOption[] = [
  { value: "ALL", label: "Workspace: Todos" },
  { value: "host-25", label: "Host Gestão Imobiliária (#25)" },
  { value: "host-24", label: "LikeHome Hospedagens (#24)" },
  { value: "host-33", label: "Prime Stay Brasil (#33)" },
  { value: "host-18", label: "Anfitriões do Brasil (#18)" },
  { value: "host-07", label: "Key Stay Corporate (#07)" },
]

const PROPERTY_TYPE_OPTIONS: SelectOption[] = [
  { value: "ALL", label: "Tipo: Todos" },
  { value: "APARTAMENTO", label: "Apartamento" },
  { value: "CASA", label: "Casa" },
  { value: "VILLA", label: "Villa Exclusiva" },
  { value: "CHALE", label: "Chalé" },
  { value: "STUDIO", label: "Studio" },
  { value: "PENTHOUSE", label: "Penthouse" },
]

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

  const sectionsConfig: TableFilterSection[] = React.useMemo(() => {
    const statusActive =
      adminStatusFilter !== "ALL" || stayStatusFilter !== "ALL"
    const statusLabel = statusActive
      ? [
          adminStatusFilter !== "ALL" &&
            (ADMIN_STATUS_OPTIONS.find(
              (o) => o.value === adminStatusFilter
            )?.label?.replace("Status Admin: ", "") ||
              adminStatusFilter),
          stayStatusFilter !== "ALL" &&
            (STAY_STATUS_OPTIONS.find(
              (o) => o.value === stayStatusFilter
            )?.label?.replace("Status Stay: ", "") ||
              stayStatusFilter),
        ]
          .filter(Boolean)
          .join(" • ")
      : "Admin & Stay"

    const originTypeActive =
      platformFilter !== "ALL" ||
      workspaceFilter !== "ALL" ||
      propertyTypeFilter !== "ALL"
    const originTypeLabel = originTypeActive
      ? [
          platformFilter !== "ALL" && platformFilter,
          workspaceFilter !== "ALL" &&
            (WORKSPACE_OPTIONS.find((o) => o.value === workspaceFilter)
              ?.label?.split(" (")[0]
              ?.replace("Workspace: ", "") ||
              workspaceFilter),
          propertyTypeFilter !== "ALL" &&
            (PROPERTY_TYPE_OPTIONS.find(
              (o) => o.value === propertyTypeFilter
            )?.label?.replace("Tipo: ", "") ||
              propertyTypeFilter),
        ]
          .filter(Boolean)
          .join(" • ")
      : "Canal & Workspace"

    return [
      {
        id: "status",
        label: "Status",
        icon: SlidersHorizontal,
        displayValue: statusLabel,
        fields: [
          {
            id: "adminStatus",
            type: "select",
            label: "Status Administrativo",
            value: adminStatusFilter,
            onChange: (v) => void setAdminStatusFilter(v === "ALL" ? null : v),
            options: ADMIN_STATUS_OPTIONS,
            chipLabel: "Admin",
            formatDisplayValue: (v) =>
              ADMIN_STATUS_OPTIONS.find((o) => o.value === v)?.label?.replace(
                "Status Admin: ",
                ""
              ) || v,
          },
          {
            id: "stayStatus",
            type: "select",
            label: "Disponibilidade Stay",
            value: stayStatusFilter,
            onChange: (v) => void setStayStatusFilter(v === "ALL" ? null : v),
            options: STAY_STATUS_OPTIONS,
            chipLabel: "Stay",
            formatDisplayValue: (v) =>
              STAY_STATUS_OPTIONS.find((o) => o.value === v)?.label?.replace(
                "Status Stay: ",
                ""
              ) || v,
          },
        ],
      },
      {
        id: "originType",
        label: "Origem & Tipo",
        icon: Buildings,
        displayValue: originTypeLabel,
        fields: [
          {
            id: "platform",
            type: "select",
            label: "Canal / Plataforma",
            value: platformFilter,
            onChange: (v) => void setPlatformFilter(v === "ALL" ? null : v),
            options: PLATFORM_OPTIONS,
            chipLabel: "Plataforma",
          },
          {
            id: "workspace",
            type: "select",
            label: "Workspace do Anfitrião",
            value: workspaceFilter,
            onChange: (v) => void setWorkspaceFilter(v === "ALL" ? null : v),
            options: WORKSPACE_OPTIONS,
            chipLabel: "Workspace",
            formatDisplayValue: (v) =>
              WORKSPACE_OPTIONS.find((o) => o.value === v)
                ?.label?.split(" (")[0]
                ?.replace("Workspace: ", "") || v,
          },
          {
            id: "type",
            type: "select",
            label: "Tipo de Propriedade",
            value: propertyTypeFilter,
            onChange: (v) => void setPropertyTypeFilter(v === "ALL" ? null : v),
            options: PROPERTY_TYPE_OPTIONS,
            chipLabel: "Tipo",
            formatDisplayValue: (v) =>
              PROPERTY_TYPE_OPTIONS.find((o) => o.value === v)?.label?.replace(
                "Tipo: ",
                ""
              ) || v,
          },
        ],
      },
    ]
  }, [
    adminStatusFilter,
    stayStatusFilter,
    platformFilter,
    workspaceFilter,
    propertyTypeFilter,
    setAdminStatusFilter,
    setStayStatusFilter,
    setPlatformFilter,
    setWorkspaceFilter,
    setPropertyTypeFilter,
  ])

  const handleResetFilters = () => {
    void setSearchQuery(null)
    void setSearchField(null)
    void setAdminStatusFilter(null)
    void setStayStatusFilter(null)
    void setPlatformFilter(null)
    void setWorkspaceFilter(null)
    void setPropertyTypeFilter(null)
  }

  return (
    <div className="w-full flex flex-col">
      <AdminHero
        badge="Gestão de Imóveis & Hospedagens"
        title="Catálogo de Imóveis"
        description="Pesquise, filtre e gerencie inventário, ocupação, faturamento mensal e integração com plataformas."
        imageSrc="/utils/banners/experiencias.webp"
        imageAlt="Catálogo de Imóveis ClubKey"
      >
        <TableFilterBar
          searchQuery={searchQuery}
          onSearchQueryChange={(v) => void setSearchQuery(v || null)}
          searchFields={SEARCH_FIELD_OPTIONS}
          selectedSearchField={searchField}
          onSearchFieldChange={(v) =>
            void setSearchField((v as PropertySearchField) || null)
          }
          sections={sectionsConfig}
          onReset={handleResetFilters}
          actionTitle="Pesquisar imóveis"
        />
      </AdminHero>

      <Container className="space-y-6 pt-6 pb-12">
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
