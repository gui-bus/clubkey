"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"

import { getInitials } from "@/src/data/portalData"
import { usePortalStore } from "@/src/store/usePortalStore"
import { cn } from "@/src/lib/utils"
import {
  ArrowRight,
  Briefcase,
  Building,
  Check,
  CheckCircle,
  Copy,
  CreditCard,
  DeviceMobile,
  FloppyDisk,
  Image as ImageIcon,
  Key,
  LockKey,
  MapPin,
  PencilSimple,
  QrCode,
  ShieldCheck,
  ShieldSlash,
  User,
} from "@phosphor-icons/react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar/avatar"
import { Badge } from "@/src/components/ui/badge/badge"
import { Button } from "@/src/components/ui/button/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog/dialog"
import { FileUpload } from "@/src/components/ui/fileUpload/fileUpload"
import { InputOtp } from "@/src/components/ui/inputOtp/inputOtp"
import { TagInput } from "@/src/components/ui/tagInput/tagInput"
import { toast } from "@/src/components/ui/toast/toast"
import { Container } from "@/src/components/common/container"
import { CtaButton } from "@/src/components/common/ctaButton"

const PRESET_COVERS = [
  { label: "Membros & Networking", src: "/utils/banners/pessoas.webp" },
  { label: "Agenda & Eventos", src: "/utils/banners/agenda.webp" },
  { label: "Benefícios Exclusivos", src: "/utils/banners/beneficios.webp" },
  { label: "Experiências & Lifestyle", src: "/utils/banners/experiencias.webp" },
]

export default function ProfilePage(): React.JSX.Element {
  const {
    userProfile,
    updateProfile,
    is2FAEnabled,
    enable2FA,
    disable2FA,
    getUserTier,
  } = usePortalStore()
  const currentTier = getUserTier()

  const [mounted, setMounted] = React.useState(false)
  const [isModalOpen, setIsModalOpen] = React.useState(false)
  const [is2FAModalOpen, setIs2FAModalOpen] = React.useState(false)
  const [otpCode, setOtpCode] = React.useState("")
  const [otpError, setOtpError] = React.useState(false)
  const [copiedKey, setCopiedKey] = React.useState(false)
  const [pendingCover, setPendingCover] = React.useState(
    userProfile.coverImage || "/utils/banners/pessoas.webp"
  )

  const [formData, setFormData] = React.useState({
    name: userProfile.name,
    role: userProfile.role,
    company: userProfile.company,
    city: userProfile.city,
    bio: userProfile.bio,
  })

  React.useEffect(() => {
    setMounted(true)
    if (userProfile.coverImage) {
      setPendingCover(userProfile.coverImage)
    }
    setFormData({
      name: userProfile.name,
      role: userProfile.role,
      company: userProfile.company,
      city: userProfile.city,
      bio: userProfile.bio,
    })
  }, [userProfile])

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    updateProfile(formData)
    toast.success("Perfil atualizado!", {
      description: "Suas informações de membro foram salvas com sucesso.",
    })
  }

  const handleApplyCover = () => {
    updateProfile({ coverImage: pendingCover })
    setIsModalOpen(false)
    toast.success("Capa do perfil atualizada!", {
      description: "A nova foto de capa foi salva com sucesso.",
    })
  }

  const handleCopyKey = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText("CK99-PROT-7741-X992")
      setCopiedKey(true)
      setTimeout(() => setCopiedKey(false), 2000)
      toast.success("Chave copiada para a área de transferência!")
    }
  }

  const handleVerifyOtp = () => {
    if (otpCode.trim().length === 6) {
      enable2FA()
      setIs2FAModalOpen(false)
      setOtpCode("")
      setOtpError(false)
      toast.success("Autenticação 2FA ativada com sucesso!", {
        description: "Sua conta agora está protegida e você ganhou +250 XP!",
      })
    } else {
      setOtpError(true)
      toast.error("Código incompleto", {
        description:
          "Digite o código de 6 dígitos gerado pelo seu aplicativo autenticador.",
      })
    }
  }

  const handleDisable2FA = () => {
    disable2FA()
    toast.info("Autenticação 2FA desativada", {
      description:
        "Você pode reativá-la quando desejar para manter sua conta protegida.",
    })
  }

  const handleCoverFilesSelected = (files: File[]) => {
    if (files.length > 0) {
      const file = files[0]
      const reader = new FileReader()
      reader.onload = (event) => {
        if (typeof event.target?.result === "string") {
          setPendingCover(event.target.result)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="w-full flex flex-col">
      <Container className="py-8 sm:py-10 space-y-8">
        <div className="relative rounded-sm overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] shadow-xs">
          <div className="relative w-full h-44 sm:h-56 md:h-64 bg-zinc-950 overflow-hidden">
            {mounted ? (
              <Image
                src={userProfile.coverImage || "/utils/banners/pessoas.webp"}
                alt="Capa do perfil"
                fill
                priority
                className="object-cover object-center opacity-40 dark:opacity-30 transition-opacity duration-300"
              />
            ) : (
              <div className="w-full h-full bg-zinc-950" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />

            <div className="absolute top-4 right-4 z-10">
              <CtaButton
                type="button"
                variant="secondary"
                size="xs"
                onClick={() => {
                  setPendingCover(
                    userProfile.coverImage || "/utils/banners/pessoas.webp"
                  )
                  setIsModalOpen(true)
                }}
                className="bg-black/60 hover:bg-black/80 text-white backdrop-blur-md border border-white/20 text-xs font-bold uppercase tracking-wider shadow-md"
                textClassName="text-white"
                sliderClassName="bg-white/20"
                aria-label="Editar capa do perfil"
              >
                <PencilSimple className="w-3.5 h-3.5 mr-1.5 text-white" />
                <span>Editar Capa</span>
              </CtaButton>
            </div>
          </div>

          <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-0">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 -mt-14 sm:-mt-16 relative z-10 mb-5">
              <Avatar
                size="3xl"
                radius="full"
                className="w-28 h-28 sm:w-32 sm:h-32 ring-4 ring-white dark:ring-[#141416] shadow-lg shrink-0 border border-zinc-200 dark:border-zinc-700 bg-zinc-900"
              >
                {mounted && userProfile.avatar ? (
                  <AvatarImage
                    src={userProfile.avatar}
                    alt={userProfile.name}
                    className="object-cover object-top"
                  />
                ) : null}
                <AvatarFallback className="font-black text-2xl bg-zinc-900 text-white dark:bg-zinc-800">
                  {getInitials(userProfile.name)}
                </AvatarFallback>
              </Avatar>

              <div className="flex items-center gap-2 self-start sm:self-auto">
                <CtaButton
                  href="/perfil/minha-assinatura"
                  variant="secondary"
                  size="sm"
                  className="text-xs"
                >
                  <CreditCard className="w-4 h-4 mr-2 text-brand-primary" />
                  <span>Gerenciar Assinatura</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-2" />
                </CtaButton>
              </div>
            </div>

            <div className="space-y-3 pb-6 border-b border-zinc-100 dark:border-zinc-800">
              <div>
                <h2 className="text-xl sm:text-2xl font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white">
                  {userProfile.name}
                </h2>
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                  {userProfile.role} • {userProfile.company}
                </p>
              </div>
            </div>

          <form onSubmit={handleSave} className="space-y-6 pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-brand-primary" />
                  Nome completo
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-semibold text-zinc-900 dark:text-white outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 text-brand-primary" />
                  Profissão / Cargo
                </label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => handleChange("role", e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-semibold text-zinc-900 dark:text-white outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                  <Building className="w-3.5 h-3.5 text-brand-primary" />
                  Empresa
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => handleChange("company", e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-semibold text-zinc-900 dark:text-white outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                  required
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-brand-primary" />
                  Cidade / Base
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-semibold text-zinc-900 dark:text-white outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                Minibiografia / Resumo de atuação
              </label>
              <textarea
                rows={3}
                value={formData.bio}
                onChange={(e) => handleChange("bio", e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-white outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all resize-none leading-relaxed"
              />
            </div>

            <div className="flex items-center gap-3 pt-2">
              <CtaButton
                type="submit"
                variant="primary"
                size="sm"
                className="text-xs"
              >
                <FloppyDisk className="w-4 h-4 mr-2" />
                <span>Salvar alterações</span>
              </CtaButton>
            </div>
          </form>

          <div className="space-y-6 pt-8 mt-8 border-t border-zinc-100 dark:border-zinc-800">
            <div className="space-y-3">
              <div>
                <h3 className="text-sm font-heading font-black tracking-tight uppercase text-zinc-900 dark:text-white">
                  O que estou procurando (Networking & Negócios)
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Outros membros saberão onde podem agregar valor ao conectar
                  com você
                </p>
              </div>

              <TagInput
                value={userProfile.seeking}
                onChange={(tags) => updateProfile({ seeking: tags })}
                tagColor="default"
                tagVariant="flat"
                radius="sm"
                placeholder="Digite uma busca e pressione Enter..."
              />
            </div>

            <div className="space-y-3 pt-6 border-t border-zinc-100 dark:border-zinc-800">
              <div>
                <h3 className="text-sm font-heading font-black tracking-tight uppercase text-zinc-900 dark:text-white">
                  O que posso oferecer
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Seus pontos fortes, experiência, conexões e mentorias
                  disponíveis
                </p>
              </div>

              <TagInput
                value={userProfile.offering}
                onChange={(tags) => updateProfile({ offering: tags })}
                tagColor="default"
                tagVariant="flat"
                radius="sm"
                placeholder="Digite uma oferta e pressione Enter..."
              />
            </div>

            <div className="space-y-4 pt-6 border-t border-zinc-100 dark:border-zinc-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-sm font-heading font-black tracking-tight uppercase text-zinc-900 dark:text-white flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-brand-primary" />
                      <span>Autenticação em Duas Etapas (2FA)</span>
                    </h3>
                    <Badge
                      color={is2FAEnabled ? "success" : "warning"}
                      variant="flat"
                      radius="sm"
                      className="text-[10px] font-bold inline-flex items-center gap-1"
                    >
                      {is2FAEnabled ? (
                        "Ativo & Protegido"
                      ) : (
                        <>
                          <div className="relative w-3 h-3 shrink-0">
                            <Image
                              src="/utils/gamification/utils/xp.webp"
                              alt="XP"
                              fill
                              className="object-contain"
                            />
                          </div>
                          <span>Pendente (+250 XP)</span>
                        </>
                      )}
                    </Badge>
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Aumente a segurança da sua conta com verificação por código TOTP (Google Authenticator ou 1Password).
                  </p>
                </div>

                <div className="shrink-0">
                  {is2FAEnabled ? (
                    <CtaButton
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={handleDisable2FA}
                      className="text-xs text-zinc-600 dark:text-zinc-300 hover:text-red-500"
                    >
                      <ShieldSlash className="w-3.5 h-3.5 mr-1.5 shrink-0" />
                      <span>Desativar 2FA</span>
                    </CtaButton>
                  ) : (
                    <Button
                      color="primary"
                      size="sm"
                      onClick={() => {
                        setOtpCode("")
                        setOtpError(false)
                        setIs2FAModalOpen(true)
                      }}
                      className="text-xs font-black uppercase tracking-wider shadow-xs inline-flex items-center gap-1.5 whitespace-nowrap shrink-0"
                    >
                      <ShieldCheck className="w-4 h-4 shrink-0" />
                      <div className="relative w-3.5 h-3.5 shrink-0">
                        <Image
                          src="/utils/gamification/utils/xp.webp"
                          alt="XP"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span>Configurar 2FA (+250 XP)</span>
                    </Button>
                  )}
                </div>
              </div>

              <div className="p-4 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-[#F1F1F1]/50 dark:bg-zinc-900/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-sm bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-brand-primary shrink-0 shadow-2xs">
                    <DeviceMobile className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-900 dark:text-white">
                      Aplicativo Autenticador (TOTP)
                    </p>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      {is2FAEnabled
                        ? "Configurado com sucesso. Código solicitado em novas sessões."
                        : "Recomendado: Google Authenticator, Authy ou 1Password."}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-zinc-600 dark:text-zinc-300">
                    Requisito de Onboarding:
                  </span>
                  <Badge
                    color={is2FAEnabled ? "success" : "default"}
                    variant="flat"
                    radius="sm"
                    className="text-[10px] font-bold inline-flex items-center gap-1"
                  >
                    {is2FAEnabled ? (
                      "Concluído"
                    ) : (
                      <>
                        <div className="relative w-3 h-3 shrink-0">
                          <Image
                            src="/utils/gamification/utils/xp.webp"
                            alt="XP"
                            fill
                            className="object-contain"
                          />
                        </div>
                        <span>Faltam 250 XP</span>
                      </>
                    )}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </Container>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent size="lg" className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-xs bg-brand-primary/10 text-brand-primary text-[10px] font-bold uppercase tracking-wider">
                Personalização do Perfil
              </span>
            </div>
            <DialogTitle className="text-xl font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-sm bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
                <ImageIcon className="w-4 h-4" />
              </div>
              <span>Alterar Capa do Perfil</span>
            </DialogTitle>
            <DialogDescription className="text-xs text-zinc-500 dark:text-zinc-400">
              Faça o upload de uma imagem personalizada ou escolha um dos temas oficiais do clube.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-2">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                  Upload de Imagem Personalizada
                </label>
                <span className="text-[11px] text-zinc-400">
                  Recomendado: 1920x600 px (até 25MB)
                </span>
              </div>
              <FileUpload
                accept="image/*"
                maxSizeMB={25}
                showPreviews
                simulateProgress
                label="Enviar foto de capa"
                description="Arraste e solte uma imagem aqui ou clique para selecionar (JPG, PNG ou WebP até 25MB)"
                onFilesSelected={handleCoverFilesSelected}
              />
            </div>

            <div className="space-y-2.5">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                Ou escolha uma capa oficial do clube
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {PRESET_COVERS.map((preset) => {
                  const isSelected = pendingCover === preset.src
                  return (
                    <button
                      key={preset.src}
                      type="button"
                      onClick={() => setPendingCover(preset.src)}
                      className={cn(
                        "relative group rounded-sm overflow-hidden border text-left transition-all cursor-pointer",
                        isSelected
                          ? "border-brand-primary ring-2 ring-brand-primary/40 shadow-xs"
                          : "border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
                      )}
                    >
                      <div className="relative h-20 w-full bg-zinc-950 overflow-hidden">
                        <Image
                          src={preset.src}
                          alt={preset.label}
                          fill
                          className={cn(
                            "object-cover transition-transform duration-300 group-hover:scale-105",
                            isSelected ? "opacity-80" : "opacity-55 group-hover:opacity-75"
                          )}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        {isSelected && (
                          <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-brand-primary text-white flex items-center justify-center shadow-md">
                            <Check className="w-3 h-3 text-white" weight="bold" />
                          </div>
                        )}
                      </div>
                      <div className="p-2 bg-white dark:bg-zinc-900 border-t border-zinc-100 dark:border-zinc-800">
                        <p className="text-[11px] font-bold text-zinc-800 dark:text-zinc-200 truncate">
                          {preset.label}
                        </p>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                Pré-visualização da Capa
              </label>
              <div className="relative w-full h-32 sm:h-36 rounded-sm overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-950 shadow-inner">
                {pendingCover ? (
                  <Image
                    src={pendingCover}
                    alt="Pré-visualização da capa"
                    fill
                    className="object-cover object-center opacity-70"
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
                <div className="absolute bottom-3.5 left-4 flex items-center gap-3 z-10">
                  <div className="w-12 h-12 rounded-full border-2 border-white dark:border-zinc-700 overflow-hidden bg-zinc-900 relative shadow-md">
                    <Avatar size="md" radius="full" className="w-full h-full">
                      {userProfile.avatar && (
                        <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
                      )}
                      <AvatarFallback className="text-xs font-bold bg-zinc-900 text-white">
                        {getInitials(userProfile.name)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-bold text-white leading-tight">
                      {userProfile.name}
                    </p>
                    <p className="text-[10px] text-zinc-300">
                      {userProfile.role} • {userProfile.company}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="pt-3 border-t border-zinc-100 dark:border-zinc-800">
            <DialogClose asChild>
              <Button variant="flat" size="sm" className="font-bold text-xs uppercase tracking-wider">
                Cancelar
              </Button>
            </DialogClose>
            <Button
              color="primary"
              size="sm"
              onClick={handleApplyCover}
              className="font-bold text-xs uppercase tracking-wider"
            >
              Salvar Capa
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={is2FAModalOpen} onOpenChange={setIs2FAModalOpen}>
        <DialogContent size="md" className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-2 mb-0.5">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-xs bg-brand-primary/10 text-brand-primary text-[10px] font-bold uppercase tracking-wider">
                Segurança da Conta
              </span>
              <Badge
                color="success"
                variant="flat"
                radius="sm"
                className="text-[10px] font-bold inline-flex items-center gap-1"
              >
                <div className="relative w-3 h-3 shrink-0">
                  <Image
                    src="/utils/gamification/utils/xp.webp"
                    alt="XP"
                    fill
                    className="object-contain"
                  />
                </div>
                <span>+250 XP</span>
              </Badge>
            </div>
            <DialogTitle className="text-xl font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-sm bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span>Ativar Autenticação 2FA</span>
            </DialogTitle>
            <DialogDescription className="text-xs text-zinc-500 dark:text-zinc-400">
              Escaneie o código QR com o seu aplicativo autenticador ou insira a chave manualmente para ativar.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-2">
            <div className="flex flex-col items-center justify-center p-5 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-center space-y-3">
              <div className="p-3 bg-white rounded-sm border border-zinc-200 dark:border-zinc-700 shadow-xs">
                <div className="w-36 h-36 relative flex items-center justify-center bg-zinc-950 text-white rounded-xs">
                  <QrCode className="w-28 h-28 text-white" />
                </div>
              </div>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400 max-w-xs">
                Abra o Google Authenticator ou seu app de preferência e aponte a câmera para a imagem acima.
              </p>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 flex items-center justify-between">
                <span>Chave de configuração manual</span>
                <button
                  type="button"
                  onClick={handleCopyKey}
                  className="text-brand-primary hover:underline inline-flex items-center gap-1 text-[11px] font-bold cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>{copiedKey ? "Copiado!" : "Copiar Chave"}</span>
                </button>
              </label>
              <div className="p-2.5 rounded-sm bg-[#F1F1F1] dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 font-mono text-xs text-zinc-800 dark:text-zinc-200 text-center font-bold tracking-widest select-all">
                CK99-PROT-7741-X992
              </div>
            </div>

            <div className="space-y-2 text-center">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300 block">
                Digite o código de 6 dígitos
              </label>
              <div className="flex justify-center py-1">
                <InputOtp
                  value={otpCode}
                  onChange={(val) => {
                    setOtpCode(val)
                    if (otpError) setOtpError(false)
                  }}
                  length={6}
                  autoFocus
                />
              </div>
              {otpError && (
                <p className="text-xs font-medium text-red-500">
                  Código incompleto ou inválido. Digite os 6 números.
                </p>
              )}
            </div>
          </div>

          <DialogFooter className="pt-3 border-t border-zinc-100 dark:border-zinc-800">
            <DialogClose asChild>
              <Button variant="flat" size="sm" className="font-bold text-xs uppercase tracking-wider">
                Cancelar
              </Button>
            </DialogClose>
            <Button
              color="primary"
              size="sm"
              onClick={handleVerifyOtp}
              className="font-bold text-xs uppercase tracking-wider inline-flex items-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <div className="relative w-3.5 h-3.5 shrink-0">
                <Image
                  src="/utils/gamification/utils/xp.webp"
                  alt="XP"
                  fill
                  className="object-contain"
                />
              </div>
              <span>Confirmar & Ativar (+250 XP)</span>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

