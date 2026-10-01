"use client"

import * as React from "react"

import { MOCK_ADMINISTRATORS } from "@/src/data/mocks/administrators.data"
import type { Administrator } from "@clubkey/types"
import {
  CtaButton,
  type SelectOption,
  TableFilterBar,
  type TableFilterSection,
  type TableSearchFieldOption,
  type TableStatItem,
  TableStats,
  TableTitle,
  toast,
} from "@clubkey/ui"
import {
  ArrowsClockwise,
  CalendarBlank,
  EnvelopeSimple,
  IdentificationCard,
  LockKey,
  MagnifyingGlass,
  ShieldCheck,
  SlidersHorizontal,
  User,
  UserCheck,
  UserGear,
  UserPlus,
} from "@phosphor-icons/react"
import { parseAsString, parseAsStringLiteral, useQueryState } from "nuqs"

import { Container } from "@/src/components/common/container"

import { AdminHero } from "../common/adminHero"
import { AdministratorsTable } from "./administratorsTable"

const SEARCH_FIELDS = ["ALL", "name", "email", "idTag"] as const

type AdministratorSearchField = (typeof SEARCH_FIELDS)[number]

const SEARCH_FIELD_OPTIONS: TableSearchFieldOption[] = [
  {
    value: "ALL",
    label: "Todos os campos",
    short: "Geral",
    placeholder: "Buscar por nome, e-mail ou #ID...",
    icon: MagnifyingGlass,
  },
  {
    value: "name",
    label: "Nome Completo",
    short: "Nome",
    placeholder: "Digitar nome do administrador...",
    icon: User,
  },
  {
    value: "email",
    label: "E-mail",
    short: "E-mail",
    placeholder: "Digitar e-mail corporativo...",
    icon: EnvelopeSimple,
  },
  {
    value: "idTag",
    label: "Identificador (#ID)",
    short: "#ID",
    placeholder: "Digitar ID (ex: #ADM01)...",
    icon: IdentificationCard,
  },
]

const STATUS_FILTER_OPTIONS: SelectOption[] = [
  { value: "ALL", label: "Status: Todos" },
  { value: "ATIVO", label: "Ativo" },
  { value: "INATIVO", label: "Inativo" },
]

const TWO_FACTOR_FILTER_OPTIONS: SelectOption[] = [
  { value: "ALL", label: "2FA: Todos" },
  { value: "ENABLED", label: "Habilitado" },
  { value: "DISABLED", label: "Desabilitado" },
]

function parseDateToTime(dateStr?: string): number | null {
  if (!dateStr) return null

  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    const [year, month, day] = dateStr.split("-").map(Number)
    return new Date(year, month - 1, day, 0, 0, 0, 0).getTime()
  }

  if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) {
    const [day, month, year] = dateStr.split("/").map(Number)
    return new Date(year, month - 1, day, 0, 0, 0, 0).getTime()
  }
  const d = new Date(dateStr)
  return isNaN(d.getTime()) ? null : d.getTime()
}

export function AdministratorsClient(): React.JSX.Element {
  const [administrators, setAdministrators] =
    React.useState<Administrator[]>(MOCK_ADMINISTRATORS)

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
  const [statusFilter, setStatusFilter] = useQueryState(
    "status",
    parseAsString.withDefault("ALL").withOptions({ shallow: true })
  )
  const [twoFactorFilter, setTwoFactorFilter] = useQueryState(
    "2fa",
    parseAsString.withDefault("ALL").withOptions({ shallow: true })
  )
  const [createdFrom, setCreatedFrom] = useQueryState(
    "criadoDe",
    parseAsString.withDefault("").withOptions({ shallow: true })
  )
  const [createdTo, setCreatedTo] = useQueryState(
    "criadoAte",
    parseAsString.withDefault("").withOptions({ shallow: true })
  )
  const [updatedFrom, setUpdatedFrom] = useQueryState(
    "atualizadoDe",
    parseAsString.withDefault("").withOptions({ shallow: true })
  )
  const [updatedTo, setUpdatedTo] = useQueryState(
    "atualizadoAte",
    parseAsString.withDefault("").withOptions({ shallow: true })
  )

  const filteredAdministrators = React.useMemo(() => {
    return administrators.filter((admin) => {
      const query = searchQuery.toLowerCase().trim()

      let matchesSearch = true
      if (query) {
        if (searchField === "name") {
          matchesSearch = admin.name.toLowerCase().includes(query)
        } else if (searchField === "email") {
          matchesSearch = admin.email.toLowerCase().includes(query)
        } else if (searchField === "idTag") {
          const cleanQuery = query.replace(/[@#]/g, "")
          const cleanIdTag = admin.idTag.replace(/[@#]/g, "").toLowerCase()
          matchesSearch =
            cleanIdTag.includes(cleanQuery) ||
            admin.id.toLowerCase().includes(cleanQuery)
        } else {
          const cleanQuery = query.replace(/[@#]/g, "")
          const cleanIdTag = admin.idTag.replace(/[@#]/g, "").toLowerCase()
          matchesSearch =
            admin.name.toLowerCase().includes(query) ||
            admin.email.toLowerCase().includes(query) ||
            cleanIdTag.includes(cleanQuery) ||
            admin.id.toLowerCase().includes(cleanQuery)
        }
      }

      const matchesStatus =
        statusFilter === "ALL" || admin.status === statusFilter

      let matches2FA = true
      if (twoFactorFilter === "ENABLED") {
        matches2FA = admin.twoFactorEnabled
      } else if (twoFactorFilter === "DISABLED") {
        matches2FA = !admin.twoFactorEnabled
      }

      let matchesCreatedDate = true
      const createdTime = parseDateToTime(admin.createdAt)
      if (createdTime !== null) {
        if (createdFrom) {
          const fromTime = parseDateToTime(createdFrom)
          if (fromTime !== null && createdTime < fromTime) {
            matchesCreatedDate = false
          }
        }
        if (createdTo) {
          const toTime = parseDateToTime(createdTo)
          if (toTime !== null && createdTime > toTime + 86400000 - 1) {
            matchesCreatedDate = false
          }
        }
      }

      let matchesUpdatedDate = true
      const updatedTime = parseDateToTime(admin.updatedAt)
      if (updatedTime !== null) {
        if (updatedFrom) {
          const fromTime = parseDateToTime(updatedFrom)
          if (fromTime !== null && updatedTime < fromTime) {
            matchesUpdatedDate = false
          }
        }
        if (updatedTo) {
          const toTime = parseDateToTime(updatedTo)
          if (toTime !== null && updatedTime > toTime + 86400000 - 1) {
            matchesUpdatedDate = false
          }
        }
      }

      return (
        matchesSearch &&
        matchesStatus &&
        matches2FA &&
        matchesCreatedDate &&
        matchesUpdatedDate
      )
    })
  }, [
    administrators,
    searchQuery,
    searchField,
    statusFilter,
    twoFactorFilter,
    createdFrom,
    createdTo,
    updatedFrom,
    updatedTo,
  ])

  const statsItems: TableStatItem[] = React.useMemo(() => {
    const totalAdmins = administrators.length
    const activeAdmins = administrators.filter(
      (a) => a.status === "ATIVO"
    ).length
    const twoFactorAdmins = administrators.filter(
      (a) => a.twoFactorEnabled
    ).length
    const superAdmins = administrators.filter(
      (a) => a.role === "SUPER_ADMIN"
    ).length

    return [
      {
        label: "Total de Administradores",
        value: totalAdmins.toString(),
        subtext: "Contas com acesso ao painel",
        icon: UserGear,
      },
      {
        label: "Administradores Ativos",
        value: `${activeAdmins} (${Math.round((activeAdmins / (totalAdmins || 1)) * 100)}%)`,
        subtext: "Acessos operacionais liberados",
        icon: ShieldCheck,
      },
      {
        label: "2FA Habilitado",
        value: `${twoFactorAdmins} (${Math.round((twoFactorAdmins / (totalAdmins || 1)) * 100)}%)`,
        subtext: "Autenticação em 2 etapas",
        icon: LockKey,
      },
      {
        label: "Super Admins",
        value: `${superAdmins} contas`,
        subtext: "Acesso irrestrito de gestão",
        icon: UserCheck,
      },
    ]
  }, [administrators])

  const sectionsConfig: TableFilterSection[] = React.useMemo(() => {
    const datesActive = createdFrom || createdTo || updatedFrom || updatedTo
    const datesLabel = datesActive
      ? [
          createdFrom || createdTo ? "Criado" : "",
          updatedFrom || updatedTo ? "Atualizado" : "",
        ]
          .filter(Boolean)
          .join(" • ")
      : "Criado & Atual."

    const filtersActive = statusFilter !== "ALL" || twoFactorFilter !== "ALL"
    const filtersLabel = filtersActive
      ? [
          statusFilter !== "ALL" && statusFilter,
          twoFactorFilter !== "ALL" &&
            (twoFactorFilter === "ENABLED" ? "2FA Ativo" : "2FA Inativo"),
        ]
          .filter(Boolean)
          .join(" • ")
      : "Status & 2FA"

    return [
      {
        id: "dates",
        label: "Datas",
        icon: CalendarBlank,
        displayValue: datesLabel,
        fields: [
          {
            id: "created",
            type: "date-range",
            label: "Data de Criação",
            dateFrom: createdFrom || undefined,
            dateTo: createdTo || undefined,
            onDateFromChange: (d) => void setCreatedFrom(d || null),
            onDateToChange: (d) => void setCreatedTo(d || null),
            chipLabel: "Criado",
          },
          {
            id: "updated",
            type: "date-range",
            label: "Última Atualização",
            dateFrom: updatedFrom || undefined,
            dateTo: updatedTo || undefined,
            onDateFromChange: (d) => void setUpdatedFrom(d || null),
            onDateToChange: (d) => void setUpdatedTo(d || null),
            chipLabel: "Atualizado",
          },
        ],
      },
      {
        id: "filters",
        label: "Filtros",
        icon: SlidersHorizontal,
        displayValue: filtersLabel,
        fields: [
          {
            id: "status",
            type: "select",
            label: "Status da Conta",
            value: statusFilter,
            onChange: (v) => void setStatusFilter(v === "ALL" ? null : v),
            options: STATUS_FILTER_OPTIONS,
            chipLabel: "Status",
          },
          {
            id: "2fa",
            type: "select",
            label: "Autenticação 2FA",
            value: twoFactorFilter,
            onChange: (v) => void setTwoFactorFilter(v === "ALL" ? null : v),
            options: TWO_FACTOR_FILTER_OPTIONS,
            chipLabel: "2FA",
            formatDisplayValue: (v) => (v === "ENABLED" ? "Ativo" : "Inativo"),
          },
        ],
      },
    ]
  }, [
    statusFilter,
    twoFactorFilter,
    createdFrom,
    createdTo,
    updatedFrom,
    updatedTo,
    setStatusFilter,
    setTwoFactorFilter,
    setCreatedFrom,
    setCreatedTo,
    setUpdatedFrom,
    setUpdatedTo,
  ])

  const handleResetFilters = () => {
    void setSearchQuery(null)
    void setSearchField(null)
    void setStatusFilter(null)
    void setTwoFactorFilter(null)
    void setCreatedFrom(null)
    void setCreatedTo(null)
    void setUpdatedFrom(null)
    void setUpdatedTo(null)
  }

  const handleDisable2FA = (admin: Administrator) => {
    setAdministrators((prev) =>
      prev.map((a) =>
        a.id === admin.id ? { ...a, twoFactorEnabled: false } : a
      )
    )
    toast.success("2FA Desativado", {
      description: `Autenticação em duas etapas desativada para ${admin.name}.`,
    })
  }

  const handleResendPassword = (admin: Administrator) => {
    toast.success("E-mail Enviado", {
      description: `Link de redefinição de senha enviado para ${admin.email}.`,
    })
  }

  return (
    <div className="w-full flex flex-col">
      <AdminHero
        badge="Segurança & Governança • Controle de Acesso"
        title="Gestão de Administradores"
        description="Pesquise, filtre e gerencie contas administrativas, autenticação em duas etapas (2FA) e credenciais de acesso."
        imageSrc="/utils/banners/niveis.webp"
        imageAlt="Gestão de Administradores ClubKey"
      >
        <TableFilterBar
          searchQuery={searchQuery}
          onSearchQueryChange={(v) => void setSearchQuery(v || null)}
          searchFields={SEARCH_FIELD_OPTIONS}
          selectedSearchField={searchField}
          onSearchFieldChange={(v) =>
            void setSearchField((v as AdministratorSearchField) || null)
          }
          sections={sectionsConfig}
          onReset={handleResetFilters}
          actionTitle="Pesquisar administradores"
        />
      </AdminHero>

      <Container className="space-y-6 pt-6 pb-12">
        <TableStats items={statsItems} />

        <TableTitle
          title="Lista de Administradores"
          description="Gerencie os níveis de acesso e credenciais de segurança dos administradores cadastrados."
          cta={
            <CtaButton
              href="/administradores/novo"
              variant="primary"
              size="sm"
              className="w-full sm:w-auto flex items-center justify-center gap-2 shadow-xs shrink-0 cursor-pointer"
            >
              <UserPlus size={15} weight="bold" />
              <span>Novo Administrador</span>
            </CtaButton>
          }
        />

        <AdministratorsTable
          administrators={filteredAdministrators}
          onDisable2FA={handleDisable2FA}
          onResendPassword={handleResendPassword}
        />
      </Container>
    </div>
  )
}
