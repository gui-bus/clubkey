"use client"

import * as React from "react"

import { MOCK_ADMINISTRATORS } from "@/src/data/mocks/administrators.data"
import type { Administrator } from "@clubkey/types"
import { CtaButton, TableTitle, toast } from "@clubkey/ui"
import { UserPlus } from "@phosphor-icons/react"
import { parseAsString, parseAsStringLiteral, useQueryState } from "nuqs"

import { Container } from "@/src/components/common/container"

import { AdminHero } from "../common/adminHero"
import {
  type AdministratorSearchField,
  AdministratorsFilterBar,
} from "./administratorsFilterBar"
import { AdministratorsStats } from "./administratorsStats"
import { AdministratorsTable } from "./administratorsTable"

const SEARCH_FIELDS = ["ALL", "name", "email", "idTag"] as const

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
        matches2FA = admin.twoFactorEnabled === true
      } else if (twoFactorFilter === "DISABLED") {
        matches2FA = admin.twoFactorEnabled === false
      }

      let matchesCreatedDate = true
      const adminCreatedTime = parseDateToTime(admin.createdAt)
      if (adminCreatedTime !== null) {
        if (createdFrom) {
          const fromTime = parseDateToTime(createdFrom)
          if (fromTime !== null && adminCreatedTime < fromTime) {
            matchesCreatedDate = false
          }
        }
        if (createdTo) {
          const toTime = parseDateToTime(createdTo)
          if (toTime !== null && adminCreatedTime > toTime + 86400000 - 1) {
            matchesCreatedDate = false
          }
        }
      }

      let matchesUpdatedDate = true
      const adminUpdatedTime = parseDateToTime(admin.updatedAt)
      if (adminUpdatedTime !== null) {
        if (updatedFrom) {
          const fromTime = parseDateToTime(updatedFrom)
          if (fromTime !== null && adminUpdatedTime < fromTime) {
            matchesUpdatedDate = false
          }
        }
        if (updatedTo) {
          const toTime = parseDateToTime(updatedTo)
          if (toTime !== null && adminUpdatedTime > toTime + 86400000 - 1) {
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

  const handleResetFilters = () => {
    void setSearchQuery(null)
    void setSearchField("ALL")
    void setStatusFilter("ALL")
    void setTwoFactorFilter("ALL")
    void setCreatedFrom(null)
    void setCreatedTo(null)
    void setUpdatedFrom(null)
    void setUpdatedTo(null)
  }

  const handleDisable2FA = (admin: Administrator) => {
    setAdministrators((prev) =>
      prev.map((item) =>
        item.id === admin.id ? { ...item, twoFactorEnabled: false } : item
      )
    )
    toast.success("2FA Desativado", {
      description: `A autenticação em 2 etapas foi desativada para ${admin.name}.`,
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
        <AdministratorsFilterBar
          searchQuery={searchQuery}
          onSearchQueryChange={(v) => void setSearchQuery(v || null)}
          searchField={searchField}
          onSearchFieldChange={(v) =>
            void setSearchField(v === "ALL" ? null : v)
          }
          statusFilter={statusFilter}
          onStatusChange={(v) => void setStatusFilter(v === "ALL" ? null : v)}
          twoFactorFilter={twoFactorFilter}
          onTwoFactorChange={(v) =>
            void setTwoFactorFilter(v === "ALL" ? null : v)
          }
          createdFrom={createdFrom}
          onCreatedFromChange={(v) => void setCreatedFrom(v || null)}
          createdTo={createdTo}
          onCreatedToChange={(v) => void setCreatedTo(v || null)}
          updatedFrom={updatedFrom}
          onUpdatedFromChange={(v) => void setUpdatedFrom(v || null)}
          updatedTo={updatedTo}
          onUpdatedToChange={(v) => void setUpdatedTo(v || null)}
          onReset={handleResetFilters}
        />
      </AdminHero>

      <Container className="space-y-6 -mt-3 sm:-mt-8">
        <AdministratorsStats administrators={administrators} />

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
