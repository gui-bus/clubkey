"use client"

import * as React from "react"

import Image from "next/image"

import { MOCK_ADMIN_USERS } from "@/src/data/mocks/adminUsers.data"
import type { AdminUser } from "@clubkey/types"
import {
  type SelectOption,
  TableFilterBar,
  type TableFilterSection,
  type TableSearchFieldOption,
  type TableStatItem,
  TableStats,
  TableTitle,
} from "@clubkey/ui"
import {
  ArrowsLeftRight,
  Cake,
  CalendarBlank,
  Crown,
  EnvelopeSimple,
  IdentificationCard,
  MagnifyingGlass,
  Phone,
  ShieldCheck,
  SlidersHorizontal,
  User,
  Users,
  Wallet,
} from "@phosphor-icons/react"
import { parseAsString, parseAsStringLiteral, useQueryState } from "nuqs"

import { Container } from "@/src/components/common/container"

import { AdminHero } from "../common/adminHero"
import { AdminUsersTable } from "./adminUsersTable"

const SEARCH_FIELDS = [
  "ALL",
  "name",
  "email",
  "login",
  "document",
  "phone",
  "wallet",
] as const

type AdminUserSearchField = (typeof SEARCH_FIELDS)[number]

const SEARCH_FIELD_OPTIONS: TableSearchFieldOption[] = [
  {
    value: "ALL",
    label: "Todos os campos",
    short: "Geral",
    placeholder: "Buscar por nome, e-mail, login, CPF/CNPJ ou 0x...",
    icon: MagnifyingGlass,
  },
  {
    value: "name",
    label: "Nome Completo",
    short: "Nome",
    placeholder: "Digitar nome do associado...",
    icon: User,
  },
  {
    value: "email",
    label: "E-mail",
    short: "E-mail",
    placeholder: "Digitar e-mail cadastrado...",
    icon: EnvelopeSimple,
  },
  {
    value: "login",
    label: "Login (@handle / #ID)",
    short: "Login",
    placeholder: "Digitar login ou ID (ex: RCT77599 ou #77599)...",
    icon: IdentificationCard,
  },
  {
    value: "document",
    label: "Documento (CPF/CNPJ)",
    short: "Documento",
    placeholder: "Digitar número do CPF ou CNPJ...",
    icon: IdentificationCard,
  },
  {
    value: "phone",
    label: "Telefone",
    short: "Telefone",
    placeholder: "Digitar número de telefone...",
    icon: Phone,
  },
  {
    value: "wallet",
    label: "Endereço 0x (Carteira)",
    short: "Endereço 0x",
    placeholder: "Digitar endereço 0x ou hash Fireblocks...",
    icon: Wallet,
  },
]

const STATUS_FILTER_OPTIONS: SelectOption[] = [
  { value: "ALL", label: "Status: Todos" },
  { value: "CONFIRMADO", label: "Confirmado" },
  { value: "PENDENTE", label: "Pendente" },
  { value: "EM_ANALISE", label: "Em Análise" },
  { value: "BLOQUEADO", label: "Bloqueado" },
]

const LEVEL_FILTER_OPTIONS: SelectOption[] = [
  { value: "ALL", label: "Level: Todos" },
  { value: "BRONZE", label: "Bronze" },
  { value: "PRATA", label: "Prata" },
  { value: "OURO", label: "Ouro" },
  { value: "BLACK", label: "Black" },
  { value: "DIAMANTE", label: "Diamante" },
  { value: "PATRONO", label: "Patrono" },
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

export function AdminUsersClient(): React.JSX.Element {
  const [users] = React.useState<AdminUser[]>(MOCK_ADMIN_USERS)

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
  const [levelFilter, setLevelFilter] = useQueryState(
    "nivel",
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
  const [birthDateFrom, setBirthDateFrom] = useQueryState(
    "nascDe",
    parseAsString.withDefault("").withOptions({ shallow: true })
  )
  const [birthDateTo, setBirthDateTo] = useQueryState(
    "nascAte",
    parseAsString.withDefault("").withOptions({ shallow: true })
  )

  const filteredUsers = React.useMemo(() => {
    return users.filter((u) => {
      const query = searchQuery.toLowerCase().trim()

      let matchesSearch = true
      if (query) {
        if (searchField === "name") {
          matchesSearch = u.name.toLowerCase().includes(query)
        } else if (searchField === "email") {
          matchesSearch = u.email.toLowerCase().includes(query)
        } else if (searchField === "login") {
          const cleanQuery = query.replace(/[@#]/g, "")
          const cleanHandle = u.handle.replace(/[@#]/g, "").toLowerCase()
          const cleanIdTag = u.idTag.replace(/[@#]/g, "").toLowerCase()
          matchesSearch =
            cleanHandle.includes(cleanQuery) ||
            cleanIdTag.includes(cleanQuery) ||
            u.id.toLowerCase().includes(cleanQuery)
        } else if (searchField === "document") {
          const cleanDocQuery = query.replace(/\D/g, "")
          const cleanUserDoc = (u.documentNumber || "").replace(/\D/g, "")
          matchesSearch =
            (u.documentNumber || "").toLowerCase().includes(query) ||
            (cleanDocQuery.length > 0 && cleanUserDoc.includes(cleanDocQuery))
        } else if (searchField === "phone") {
          const cleanPhoneQuery = query.replace(/\D/g, "")
          const cleanUserPhone = (u.phone || "").replace(/\D/g, "")
          matchesSearch =
            (u.phone || "").toLowerCase().includes(query) ||
            (cleanPhoneQuery.length > 0 &&
              cleanUserPhone.includes(cleanPhoneQuery))
        } else if (searchField === "wallet") {
          matchesSearch = (u.walletFireblocks || "")
            .toLowerCase()
            .includes(query)
        } else {
          const cleanQuery = query.replace(/[@#]/g, "")
          const cleanDocQuery = query.replace(/\D/g, "")
          const cleanUserDoc = (u.documentNumber || "").replace(/\D/g, "")
          const cleanPhoneQuery = query.replace(/\D/g, "")
          const cleanUserPhone = (u.phone || "").replace(/\D/g, "")

          const matchesName = u.name.toLowerCase().includes(query)
          const matchesEmail = u.email.toLowerCase().includes(query)
          const matchesHandle = u.handle
            .replace(/[@#]/g, "")
            .toLowerCase()
            .includes(cleanQuery)
          const matchesIdTag = u.idTag
            .replace(/[@#]/g, "")
            .toLowerCase()
            .includes(cleanQuery)
          const matchesId = u.id.toLowerCase().includes(cleanQuery)
          const matchesDoc =
            (u.documentNumber || "").toLowerCase().includes(query) ||
            (cleanDocQuery.length > 0 && cleanUserDoc.includes(cleanDocQuery))
          const matchesPhone =
            (u.phone || "").toLowerCase().includes(query) ||
            (cleanPhoneQuery.length > 0 &&
              cleanUserPhone.includes(cleanPhoneQuery))
          const matchesWallet = (u.walletFireblocks || "")
            .toLowerCase()
            .includes(query)

          matchesSearch =
            matchesName ||
            matchesEmail ||
            matchesHandle ||
            matchesIdTag ||
            matchesId ||
            matchesDoc ||
            matchesPhone ||
            matchesWallet
        }
      }

      const matchesStatus =
        statusFilter === "ALL" || u.accountStatus === statusFilter

      const matchesLevel = levelFilter === "ALL" || u.level === levelFilter

      let matchesCreatedDate = true
      const userCreatedTime = parseDateToTime(u.createdAt)
      if (userCreatedTime !== null) {
        if (createdFrom) {
          const fromTime = parseDateToTime(createdFrom)
          if (fromTime !== null && userCreatedTime < fromTime) {
            matchesCreatedDate = false
          }
        }
        if (createdTo) {
          const toTime = parseDateToTime(createdTo)
          if (toTime !== null && userCreatedTime > toTime + 86400000 - 1) {
            matchesCreatedDate = false
          }
        }
      }

      let matchesBirthDate = true
      const userBirthTime = parseDateToTime(u.birthDate)
      if (birthDateFrom || birthDateTo) {
        if (userBirthTime === null) {
          matchesBirthDate = false
        } else {
          if (birthDateFrom) {
            const fromTime = parseDateToTime(birthDateFrom)
            if (fromTime !== null && userBirthTime < fromTime) {
              matchesBirthDate = false
            }
          }
          if (birthDateTo) {
            const toTime = parseDateToTime(birthDateTo)
            if (toTime !== null && userBirthTime > toTime + 86400000 - 1) {
              matchesBirthDate = false
            }
          }
        }
      }

      return (
        matchesSearch &&
        matchesStatus &&
        matchesLevel &&
        matchesCreatedDate &&
        matchesBirthDate
      )
    })
  }, [
    users,
    searchQuery,
    searchField,
    statusFilter,
    levelFilter,
    createdFrom,
    createdTo,
    birthDateFrom,
    birthDateTo,
  ])

  const statsItems: TableStatItem[] = React.useMemo(() => {
    const totalUsers = users.length
    const confirmedUsers = users.filter(
      (u) => u.accountStatus === "CONFIRMADO"
    ).length
    const p2pActiveUsers = users.filter((u) => u.p2pStatus === "ON").length
    const totalRibTokens = users.reduce(
      (acc, u) => acc + (u.balances?.total || 0),
      0
    )

    return [
      {
        label: "Total de Usuários",
        value: totalUsers.toString(),
        subtext: "Cadastrados no sistema",
        icon: Users,
      },
      {
        label: "Usuários Confirmados",
        value: `${confirmedUsers} (${Math.round((confirmedUsers / (totalUsers || 1)) * 100)}%)`,
        subtext: "Documentação aprovada",
        icon: ShieldCheck,
      },
      {
        label: "P2P Habilitado",
        value: `${p2pActiveUsers} ativos`,
        subtext: "Transferências ativas",
        icon: ArrowsLeftRight,
      },
      {
        label: "Tokens em Custódia",
        value: (
          <div className="flex items-center gap-1.5">
            <span>
              {totalRibTokens.toLocaleString("pt-BR", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              })}
            </span>
            <div className="relative w-4 h-4 shrink-0 inline-block">
              <Image
                src="/utils/gamification/utils/RIB.svg"
                alt="RIB"
                fill
                className="object-contain"
              />
            </div>
          </div>
        ),
        subtext: "Total Fireblocks wallets",
        icon: Wallet,
      },
    ]
  }, [users])

  const sectionsConfig: TableFilterSection[] = React.useMemo(() => {
    const datesActive = createdFrom || createdTo || birthDateFrom || birthDateTo
    const datesLabel = datesActive
      ? [
          createdFrom || createdTo ? "Criado" : "",
          birthDateFrom || birthDateTo ? "Nascimento" : "",
        ]
          .filter(Boolean)
          .join(" • ")
      : "Criado & Nasc."

    const filtersActive = statusFilter !== "ALL" || levelFilter !== "ALL"
    const filtersLabel = filtersActive
      ? [
          statusFilter !== "ALL" && statusFilter,
          levelFilter !== "ALL" && levelFilter,
        ]
          .filter(Boolean)
          .join(" • ")
      : "Status & Level"

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
            label: "Data de Cadastro",
            dateFrom: createdFrom || undefined,
            dateTo: createdTo || undefined,
            onDateFromChange: (d) => void setCreatedFrom(d || null),
            onDateToChange: (d) => void setCreatedTo(d || null),
            chipLabel: "Criado",
          },
          {
            id: "birthDate",
            type: "date-range",
            label: "Data de Nascimento",
            dateFrom: birthDateFrom || undefined,
            dateTo: birthDateTo || undefined,
            onDateFromChange: (d) => void setBirthDateFrom(d || null),
            onDateToChange: (d) => void setBirthDateTo(d || null),
            chipLabel: "Nascimento",
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
            id: "level",
            type: "select",
            label: "Nível de Acesso",
            value: levelFilter,
            onChange: (v) => void setLevelFilter(v === "ALL" ? null : v),
            options: LEVEL_FILTER_OPTIONS,
            chipLabel: "Level",
          },
        ],
      },
    ]
  }, [
    createdFrom,
    createdTo,
    birthDateFrom,
    birthDateTo,
    statusFilter,
    levelFilter,
    setCreatedFrom,
    setCreatedTo,
    setBirthDateFrom,
    setBirthDateTo,
    setStatusFilter,
    setLevelFilter,
  ])

  const handleResetFilters = () => {
    void setSearchQuery(null)
    void setSearchField(null)
    void setStatusFilter(null)
    void setLevelFilter(null)
    void setCreatedFrom(null)
    void setCreatedTo(null)
    void setBirthDateFrom(null)
    void setBirthDateTo(null)
  }

  return (
    <div className="w-full flex flex-col">
      <AdminHero
        badge="Gestão de Membros • Base de Associados"
        title="Gestão de Usuários"
        description="Pesquise, filtre e gerencie associados, permissões P2P, limites operacionais e status cadastrais."
        imageSrc="/utils/banners/pessoas.webp"
        imageAlt="Gestão de Usuários ClubKey"
      >
        <TableFilterBar
          searchQuery={searchQuery}
          onSearchQueryChange={(v) => void setSearchQuery(v || null)}
          searchFields={SEARCH_FIELD_OPTIONS}
          selectedSearchField={searchField}
          onSearchFieldChange={(v) =>
            void setSearchField((v as AdminUserSearchField) || null)
          }
          sections={sectionsConfig}
          onReset={handleResetFilters}
          actionTitle="Pesquisar usuários"
        />
      </AdminHero>

      <Container className="space-y-6 pt-6 pb-12">
        <TableStats items={statsItems} />

        <TableTitle
          title="Lista de Usuários"
          description="Consulte e gerencie os associados cadastrados, saldos em RIB, níveis e permissões operacionais."
        />

        <AdminUsersTable users={filteredUsers} />
      </Container>
    </div>
  )
}
