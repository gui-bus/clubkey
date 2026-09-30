"use client"

import * as React from "react"

import { MOCK_ADMIN_USERS } from "@/src/data/mocks/adminUsers.data"
import type { AdminUser } from "@clubkey/types"

import { Container } from "@/src/components/common/container"

import { AdminHero } from "../common/adminHero"
import {
  type AdminUserSearchField,
  AdminUsersFilterBar,
} from "./adminUsersFilterBar"
import { AdminUsersStats } from "./adminUsersStats"
import { AdminUsersTable } from "./adminUsersTable"

function parseDateToTime(dateStr?: string): number | null {
  if (!dateStr) return null
  // Format: YYYY-MM-DD (from input type="date")
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    const [year, month, day] = dateStr.split("-").map(Number)
    return new Date(year, month - 1, day, 0, 0, 0, 0).getTime()
  }
  // Format: DD/MM/YYYY
  if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) {
    const [day, month, year] = dateStr.split("/").map(Number)
    return new Date(year, month - 1, day, 0, 0, 0, 0).getTime()
  }
  const d = new Date(dateStr)
  return isNaN(d.getTime()) ? null : d.getTime()
}

export function AdminUsersClient(): React.JSX.Element {
  const [users] = React.useState<AdminUser[]>(MOCK_ADMIN_USERS)
  const [searchQuery, setSearchQuery] = React.useState("")
  const [searchField, setSearchField] =
    React.useState<AdminUserSearchField>("ALL")
  const [statusFilter, setStatusFilter] = React.useState("ALL")
  const [levelFilter, setLevelFilter] = React.useState("ALL")
  const [createdFrom, setCreatedFrom] = React.useState("")
  const [createdTo, setCreatedTo] = React.useState("")
  const [birthDateFrom, setBirthDateFrom] = React.useState("")
  const [birthDateTo, setBirthDateTo] = React.useState("")

  // Filtered list
  const filteredUsers = React.useMemo(() => {
    return users.filter((u) => {
      const query = searchQuery.toLowerCase().trim()

      // Target field search match
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
          const numOnlyQuery = query.replace(/\D/g, "")
          const numOnlyDoc = u.documentNumber.replace(/\D/g, "")
          matchesSearch =
            (numOnlyQuery.length > 0 && numOnlyDoc.includes(numOnlyQuery)) ||
            u.documentNumber.toLowerCase().includes(query)
        } else if (searchField === "phone") {
          const numOnlyQuery = query.replace(/\D/g, "")
          const numOnlyPhone = (u.phone || "").replace(/\D/g, "")
          matchesSearch =
            (numOnlyQuery.length > 0 && numOnlyPhone.includes(numOnlyQuery)) ||
            (u.phone || "").toLowerCase().includes(query)
        } else if (searchField === "wallet") {
          matchesSearch = u.walletFireblocks.toLowerCase().includes(query)
        } else {
          // ALL fields
          const cleanQuery = query.replace(/[@#]/g, "")
          const cleanHandle = u.handle.replace(/[@#]/g, "").toLowerCase()
          const cleanIdTag = u.idTag.replace(/[@#]/g, "").toLowerCase()
          matchesSearch =
            u.name.toLowerCase().includes(query) ||
            u.email.toLowerCase().includes(query) ||
            cleanHandle.includes(cleanQuery) ||
            cleanIdTag.includes(cleanQuery) ||
            u.documentNumber.toLowerCase().includes(query) ||
            u.walletFireblocks.toLowerCase().includes(query) ||
            (u.phone || "").toLowerCase().includes(query)
        }
      }

      // Status match
      const matchesStatus =
        statusFilter === "ALL" || u.accountStatus === statusFilter

      // Level match
      const matchesLevel = levelFilter === "ALL" || u.level === levelFilter

      // Date Filters: Created At (de / até)
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

      // Date Filters: Birth Date (de / até)
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

  const handleResetFilters = () => {
    setSearchQuery("")
    setSearchField("ALL")
    setStatusFilter("ALL")
    setLevelFilter("ALL")
    setCreatedFrom("")
    setCreatedTo("")
    setBirthDateFrom("")
    setBirthDateTo("")
  }

  return (
    <div className="w-full flex flex-col">
      {/* Portal-Style Hero Section with Image, Gradient, Title & Filter Bar */}
      <AdminHero
        badge="Gestão de Membros • Base de Associados"
        title={
          <>
            Gestão de <span className="text-brand-primary">Usuários</span>
          </>
        }
        description="Pesquise, filtre e gerencie associados, permissões P2P, limites operacionais e status cadastrais."
        imageSrc="/utils/banners/pessoas.webp"
        imageAlt="Gestão de Usuários ClubKey"
      >
        <AdminUsersFilterBar
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          searchField={searchField}
          onSearchFieldChange={setSearchField}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          levelFilter={levelFilter}
          onLevelChange={setLevelFilter}
          createdFrom={createdFrom}
          onCreatedFromChange={setCreatedFrom}
          createdTo={createdTo}
          onCreatedToChange={setCreatedTo}
          birthDateFrom={birthDateFrom}
          onBirthDateFromChange={setBirthDateFrom}
          birthDateTo={birthDateTo}
          onBirthDateToChange={setBirthDateTo}
          onReset={handleResetFilters}
        />
      </AdminHero>

      {/* Main Content Area (Stats & Table) */}
      <Container className="space-y-6 -mt-3 sm:-mt-4">
        {/* Summary Metrics */}
        <AdminUsersStats users={users} />

        {/* Users Table */}
        <AdminUsersTable users={filteredUsers} />
      </Container>
    </div>
  )
}
