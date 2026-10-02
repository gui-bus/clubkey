"use client"

import * as React from "react"

import Link from "next/link"

import { useAdminStore } from "@/src/store/useAdminStore"
import { toast } from "@clubkey/ui"
import { CaretLeft } from "@phosphor-icons/react"

import {
  AdminProfileAvatarDialog,
  AdminProfileHeader,
  AdminProfilePersonalForm,
  AdminProfileSecuritySection,
  AdminProfileTwoFactorDialog,
} from "@/src/components/admin/profile"
import { Container } from "@/src/components/common/container"

export default function AdminProfilePage(): React.JSX.Element {
  const {
    adminUser,
    updateProfile,
    updateAvatar,
    enable2FA,
    disable2FA,
    syncFromStorage,
  } = useAdminStore()

  const [isAvatarModalOpen, setIsAvatarModalOpen] = React.useState(false)
  const [is2FAModalOpen, setIs2FAModalOpen] = React.useState(false)

  React.useEffect(() => {
    syncFromStorage()
  }, [syncFromStorage])

  const handleSaveProfile = (data: Parameters<typeof updateProfile>[0]) => {
    updateProfile(data)
    toast.success("Perfil atualizado!", {
      description: "Suas informações foram salvas com sucesso.",
    })
  }

  const handleSaveAvatar = (newAvatar: string) => {
    updateAvatar(newAvatar)
    toast.success("Foto de perfil atualizada!", {
      description: "Sua foto de perfil foi alterada com sucesso.",
    })
  }

  const handleDisable2FA = () => {
    disable2FA()
    toast.info("Autenticação 2FA desativada", {
      description:
        "Você pode reativá-la quando desejar para manter sua conta protegida.",
    })
  }

  return (
    <Container className="space-y-6 py-6 sm:py-8">
      {/* Admin Standard Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400 dark:text-zinc-500">
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-1 hover:text-zinc-900 dark:hover:text-white transition-colors"
        >
          <CaretLeft size={14} weight="bold" />
          <span>Painel</span>
        </Link>
        <span>/</span>
        <span className="text-zinc-800 dark:text-zinc-200 font-bold">
          Meu Perfil
        </span>
      </div>

      {/* Admin Profile Header (No cover, TableStatusBadges for role & 2FA) */}
      <AdminProfileHeader
        name={adminUser.name}
        role={adminUser.role}
        department={adminUser.department}
        email={adminUser.email}
        phone={adminUser.phone}
        cpf={adminUser.cpf}
        avatar={adminUser.avatar}
        is2FAEnabled={adminUser.is2FAEnabled}
        onOpenAvatarDialog={() => setIsAvatarModalOpen(true)}
      />

      {/* Personal Form & Security Settings */}
      <div className="space-y-6">
        <AdminProfilePersonalForm
          initialData={adminUser}
          onSave={handleSaveProfile}
        />

        <AdminProfileSecuritySection
          is2FAEnabled={adminUser.is2FAEnabled}
          onOpen2FAModal={() => setIs2FAModalOpen(true)}
          onDisable2FA={handleDisable2FA}
        />
      </div>

      {/* Modals & Dialogs */}
      <AdminProfileAvatarDialog
        open={isAvatarModalOpen}
        onOpenChange={setIsAvatarModalOpen}
        onSaveAvatar={handleSaveAvatar}
      />

      <AdminProfileTwoFactorDialog
        open={is2FAModalOpen}
        onOpenChange={setIs2FAModalOpen}
        onSuccess={enable2FA}
      />
    </Container>
  )
}
