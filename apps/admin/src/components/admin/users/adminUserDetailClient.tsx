"use client"

import * as React from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"

import { MOCK_ADMIN_USERS } from "@/src/data/mocks/adminUsers.data"
import type { AdminUser } from "@clubkey/types"
import { Card, CardBody, CtaButton } from "@clubkey/ui"
import { getAdminUserSlug } from "@clubkey/utils"
import { CaretLeft, User } from "@phosphor-icons/react"

import { AdminUnderConstruction } from "@/src/components/admin/common/adminUnderConstruction"
import { Container } from "@/src/components/common/container"

import {
  type AdminUserDetailTabId,
  AdminUserDetailTabsNav,
  USER_DETAIL_TABS,
} from "./details/adminUserDetailTabsNav"
import { AdminUserHeroBanner } from "./details/adminUserHeroBanner"
import { AdminUserProfileTab } from "./details/adminUserProfileTab"

export interface AdminUserDetailClientProps {
  slug: string
  activeTab?: string
}

export function AdminUserDetailClient({
  slug,
  activeTab = "perfil",
}: AdminUserDetailClientProps): React.JSX.Element {
  const router = useRouter()

  const validTabIds = React.useMemo(
    () => USER_DETAIL_TABS.map((t) => t.id as string),
    []
  )
  const currentTab: AdminUserDetailTabId = validTabIds.includes(activeTab)
    ? (activeTab as AdminUserDetailTabId)
    : "perfil"

  const initialUser = React.useMemo(() => {
    return (
      MOCK_ADMIN_USERS.find((u) => {
        const userSlug = getAdminUserSlug(u.handle, u.name)
        return (
          userSlug.toLowerCase() === slug.toLowerCase() ||
          u.id === slug ||
          u.handle.replace(/^@/, "").toLowerCase() === slug.toLowerCase()
        )
      }) || null
    )
  }, [slug])

  const [user, setUser] = React.useState<AdminUser | null>(initialUser)

  if (!user) {
    return (
      <Container className="space-y-6 py-6 sm:py-8">
        <div className="flex items-center gap-2">
          <Link
            href="/usuarios"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            <CaretLeft size={16} weight="bold" />
            <span>Voltar para Usuários</span>
          </Link>
        </div>

        <Card className="p-12 text-center border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] rounded-sm shadow-2xs">
          <CardBody className="space-y-4 max-w-md mx-auto">
            <div className="size-12 mx-auto rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400">
              <User size={24} weight="bold" />
            </div>
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
                Usuário não encontrado
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                O identificador ou slug{" "}
                <code className="font-mono font-bold bg-zinc-100 dark:bg-zinc-800 px-1.5 py-0.5 rounded-xs">
                  {slug}
                </code>{" "}
                não corresponde a nenhum usuário cadastrado no sistema.
              </p>
            </div>
            <CtaButton
              type="button"
              variant="outline"
              size="sm"
              onClick={() => router.push("/usuarios")}
              className="mt-2"
            >
              Retornar à Listagem
            </CtaButton>
          </CardBody>
        </Card>
      </Container>
    )
  }

  const currentTabConfig = USER_DETAIL_TABS.find((t) => t.id === currentTab)

  return (
    <Container className="space-y-6 py-6 sm:py-8">
      
      <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400 dark:text-zinc-500">
        <Link
          href="/usuarios"
          className="inline-flex items-center gap-1 hover:text-zinc-900 dark:hover:text-white transition-colors"
        >
          <CaretLeft size={14} weight="bold" />
          <span>Usuários</span>
        </Link>
        <span>/</span>
        <span className="text-zinc-800 dark:text-zinc-200 font-bold">
          {user.name}
        </span>
        <span>/</span>
        <span className="text-zinc-500 capitalize">
          {currentTabConfig?.label || currentTab}
        </span>
      </div>

      
      <AdminUserHeroBanner user={user} />

      
      <AdminUserDetailTabsNav slug={slug} activeTab={currentTab} />

      
      {currentTab === "perfil" ? (
        <AdminUserProfileTab user={user} onSaveUser={setUser} />
      ) : (
        <AdminUnderConstruction
          title={`Módulo de ${currentTabConfig?.label || currentTab}`}
          description={currentTabConfig?.description}
          icon={currentTabConfig?.icon}
          backgroundIcon={currentTabConfig?.icon}
        />
      )}
    </Container>
  )
}
