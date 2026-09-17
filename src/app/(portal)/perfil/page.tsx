"use client"

import * as React from "react"

import { Container } from "@/src/components/common/container"
import { toast } from "@/src/components/ui/toast/toast"
import { getInitials } from "@/src/data/portalData"
import { useMounted } from "@/src/hooks/useMounted"
import { usePortalStore } from "@/src/store/usePortalStore"

import {
  ProfileAvatarDialog,
  ProfileBadgesSection,
  ProfileCoverDialog,
  ProfileHeader,
  ProfileNetworkingSection,
  ProfilePersonalForm,
  type ProfileFormData,
  ProfileSecuritySection,
  ProfileTwoFactorDialog,
} from "@/src/components/portal/profile"

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

  const formData: ProfileFormData = {
    nationality: userProfile.nationality || "brasileiro",
    firstName: userProfile.firstName || "",
    lastName: userProfile.lastName || "",
    email: userProfile.email || "",
    cpf: userProfile.cpf || "",
    birthDate: userProfile.birthDate || "",
    phone: userProfile.phone || { dialCode: "55", number: "" },
    companyName: userProfile.companyName || "",
    cnpj: userProfile.cnpj || "",
    corporateEmail: userProfile.corporateEmail || "",
    openingDate: userProfile.openingDate || "",
    role: userProfile.role || "",
    company: userProfile.company || "",
    city: userProfile.city || "",
    bio: userProfile.bio || "",
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

  const userFullName = `${userProfile.firstName} ${userProfile.lastName}`.trim()

  return (
    <div className="w-full flex flex-col pb-20 space-y-10">
      <ProfileHeader
        name={userFullName}
        role={userProfile.role}
        company={userProfile.company}
        avatar={userProfile.avatar}
        coverImage={userProfile.coverImage}
        mounted={mounted}
        onOpenCoverDialog={() => {
          setPendingCover(
            userProfile.coverImage || "/utils/banners/pessoas.webp"
          )
          setIsCoverModalOpen(true)
        }}
        onOpenAvatarDialog={() => setIsAvatarModalOpen(true)}
      />

      <Container className="space-y-12">
        <ProfilePersonalForm
          initialData={formData}
          onSave={handleSaveProfile}
        />

        <ProfileNetworkingSection
          seeking={userProfile.seeking || []}
          offering={userProfile.offering || []}
          onUpdateSeeking={(tags) => updateProfile({ seeking: tags })}
          onUpdateOffering={(tags) => updateProfile({ offering: tags })}
        />

        <ProfileBadgesSection badges={badges} />

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
        userAvatar={userProfile.avatar}
        userName={userFullName}
        userRole={userProfile.role}
        userCompany={userProfile.company}
        userInitials={getInitials(userProfile.firstName, userProfile.lastName)}
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
