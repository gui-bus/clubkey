"use client"

import * as React from "react"

import { DEFAULT_USER, getFullName, getInitials } from "@/src/data/portalData"
import { usePortalStore } from "@/src/store/usePortalStore"

import { toast } from "@/src/components/ui/toast/toast"

import { Container } from "@/src/components/common/container"
import {
  ProfileAvatarDialog,
  ProfileBadgesSection,
  ProfileCoverDialog,
  type ProfileFormData,
  ProfileHeader,
  ProfileNetworkingSection,
  ProfilePersonalForm,
  ProfileSecuritySection,
  ProfileTwoFactorDialog,
} from "@/src/components/portal/profile"

import { useMounted } from "@/src/hooks/useMounted"

import { isModuleEnabled } from "@/src/config/brand.config"

export default function ProfilePage(): React.JSX.Element {
  const {
    userProfile,
    updateProfile,
    is2FAEnabled,
    enable2FA,
    disable2FA,
    badges,
  } = usePortalStore()

  const mounted = useMounted()
  const [isCoverModalOpen, setIsCoverModalOpen] = React.useState(false)
  const [isAvatarModalOpen, setIsAvatarModalOpen] = React.useState(false)
  const [is2FAModalOpen, setIs2FAModalOpen] = React.useState(false)
  const [pendingCover, setPendingCover] = React.useState(
    userProfile.coverImage || "/utils/banners/pessoas.webp"
  )

  const availableBadges = React.useMemo(() => {
    return badges.filter((b) => {
      if (b.category === "estadias" && !isModuleEnabled("stays")) return false
      if (b.category === "eventos" && !isModuleEnabled("events")) return false
      if (b.category === "experiencias" && !isModuleEnabled("experiences"))
        return false
      if (b.category === "networking" && !isModuleEnabled("networking"))
        return false
      return true
    })
  }, [badges])

  const formData: ProfileFormData = {
    nationality:
      userProfile?.nationality || DEFAULT_USER.nationality || "brasileiro",
    firstName: userProfile?.firstName || DEFAULT_USER.firstName || "",
    lastName: userProfile?.lastName || DEFAULT_USER.lastName || "",
    email: userProfile?.email || DEFAULT_USER.email || "",
    cpf: userProfile?.cpf || DEFAULT_USER.cpf || "",
    birthDate: userProfile?.birthDate || DEFAULT_USER.birthDate || "",
    phone: userProfile?.phone ||
      DEFAULT_USER.phone || { dialCode: "55", number: "" },
    companyName: userProfile?.companyName || DEFAULT_USER.companyName || "",
    cnpj: userProfile?.cnpj || DEFAULT_USER.cnpj || "",
    corporateEmail:
      userProfile?.corporateEmail || DEFAULT_USER.corporateEmail || "",
    openingDate: userProfile?.openingDate || DEFAULT_USER.openingDate || "",
    role: userProfile?.role || DEFAULT_USER.role || "",
    company: userProfile?.company || DEFAULT_USER.company || "",
    city: userProfile?.city || DEFAULT_USER.city || "",
    bio: userProfile?.bio || DEFAULT_USER.bio || "",
  }

  const handleSaveProfile = (data: ProfileFormData) => {
    updateProfile({
      nationality: data.nationality as "brasileiro" | "estrangeiro",
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      cpf: data.cpf,
      birthDate: data.birthDate,
      phone: data.phone,
      companyName: data.companyName,
      cnpj: data.cnpj,
      corporateEmail: data.corporateEmail,
      openingDate: data.openingDate,
      role: data.role,
      company: data.company,
      city: data.city,
      bio: data.bio,
    })
    toast.success("Perfil atualizado!", {
      description: "Suas informações foram salvas com sucesso.",
    })
  }

  const handleApplyCover = () => {
    updateProfile({ coverImage: pendingCover })
    setIsCoverModalOpen(false)
    toast.success("Capa do perfil atualizada!", {
      description: "A nova foto de capa foi salva com sucesso.",
    })
  }

  const handleSaveAvatar = (croppedAvatar: string) => {
    updateProfile({ avatar: croppedAvatar })
    toast.success("Foto de perfil atualizada!", {
      description: "Sua nova foto já está visível em todo o portal.",
    })
  }

  const handleDisable2FA = () => {
    disable2FA()
    toast.info("Autenticação 2FA desativada", {
      description:
        "Você pode reativá-la quando desejar para manter sua conta protegida.",
    })
  }

  const userFirstName = userProfile?.firstName || DEFAULT_USER.firstName
  const userLastName = userProfile?.lastName || DEFAULT_USER.lastName
  const userFullName =
    getFullName(userProfile) ||
    `${DEFAULT_USER.firstName} ${DEFAULT_USER.lastName}`
  const userInitials = getInitials(userFirstName, userLastName)
  const userRole = userProfile?.role || DEFAULT_USER.role
  const userCompany = userProfile?.company || DEFAULT_USER.company
  const userAvatar = userProfile?.avatar || DEFAULT_USER.avatar
  const userCoverImage = userProfile?.coverImage || DEFAULT_USER.coverImage

  return (
    <div className="w-full flex flex-col pb-20 space-y-10">
      <ProfileHeader
        name={userFullName}
        role={userRole}
        company={userCompany}
        avatar={userAvatar}
        coverImage={userCoverImage}
        mounted={mounted}
        onOpenCoverDialog={() => {
          setPendingCover(userCoverImage || "/utils/banners/pessoas.webp")
          setIsCoverModalOpen(true)
        }}
        onOpenAvatarDialog={() => setIsAvatarModalOpen(true)}
      />

      <Container className="space-y-12">
        <ProfilePersonalForm
          initialData={formData}
          onSave={handleSaveProfile}
        />

        {isModuleEnabled("networking") && (
          <ProfileNetworkingSection
            seeking={userProfile?.seeking || DEFAULT_USER.seeking || []}
            offering={userProfile?.offering || DEFAULT_USER.offering || []}
            onUpdateSeeking={(tags) => updateProfile({ seeking: tags })}
            onUpdateOffering={(tags) => updateProfile({ offering: tags })}
          />
        )}

        {isModuleEnabled("keypass") && (
          <ProfileBadgesSection badges={availableBadges} />
        )}

        <ProfileSecuritySection
          is2FAEnabled={is2FAEnabled}
          onOpen2FAModal={() => setIs2FAModalOpen(true)}
          onDisable2FA={handleDisable2FA}
        />
      </Container>

      <ProfileCoverDialog
        open={isCoverModalOpen}
        onOpenChange={setIsCoverModalOpen}
        pendingCover={pendingCover}
        onSelectCover={setPendingCover}
        onApplyCover={handleApplyCover}
        userAvatar={userAvatar}
        userName={userFullName}
        userRole={userRole}
        userCompany={userCompany}
        userInitials={userInitials}
      />

      <ProfileAvatarDialog
        open={isAvatarModalOpen}
        onOpenChange={setIsAvatarModalOpen}
        onSaveAvatar={handleSaveAvatar}
      />

      <ProfileTwoFactorDialog
        open={is2FAModalOpen}
        onOpenChange={setIs2FAModalOpen}
        onSuccess={enable2FA}
      />
    </div>
  )
}
