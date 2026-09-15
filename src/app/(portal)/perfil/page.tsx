"use client"

import * as React from "react"

import Image from "next/image"
import Link from "next/link"

import { getInitials } from "@/src/data/portalData"
import { usePortalStore } from "@/src/store/usePortalStore"
import {
  ArrowRight,
  Briefcase,
  Building,
  CreditCard,
  MapPin,
  Save,
  User,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar/avatar"
import { Badge } from "@/src/components/ui/badge/badge"
import { TagInput } from "@/src/components/ui/tagInput/tagInput"
import { toast } from "@/src/components/ui/toast/toast"

import { Container } from "@/src/components/common/container"

export default function ProfilePage(): React.JSX.Element {
  const { userProfile, updateProfile, getActiveClub } = usePortalStore()

  const activeClub = getActiveClub()

  const [formData, setFormData] = React.useState({
    name: userProfile.name,
    role: userProfile.role,
    company: userProfile.company,
    city: userProfile.city,
    bio: userProfile.bio,
  })

  React.useEffect(() => {
    setFormData({
      name: userProfile.name,
      role: userProfile.role,
      company: userProfile.company,
      city: userProfile.city,
      bio: userProfile.bio,
    })
  }, [
    userProfile.name,
    userProfile.role,
    userProfile.company,
    userProfile.city,
    userProfile.bio,
  ])

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

  return (
    <div className="w-full flex flex-col">
      <section
        id="hero"
        className="relative z-30 w-full bg-[#0D0D0D] text-white min-h-[440px] md:min-h-[480px] flex flex-col justify-center"
      >
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
          <Image
            src="/utils/banners/img_03.png"
            alt="Perfil do Membro"
            fill
            priority
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-zinc-50 dark:from-[#161616]/85 dark:via-[#161616]/65 dark:to-[#0D0D0D] z-10" />
        </div>

        <Container className="relative z-20 pt-36 pb-14 md:pt-44 md:pb-16 flex flex-col justify-center items-center text-center">
          <div className="max-w-4xl flex flex-col items-center text-center w-full">
            <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-brand-primary block mb-3">
              Configurações de Conta
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black uppercase tracking-tight text-white leading-[1.05] mb-4 font-heading drop-shadow-md">
              Meu perfil de{" "}
              <span className="text-brand-primary">associado</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-zinc-200 font-light leading-relaxed drop-shadow-sm max-w-2xl">
              Mantenha suas informações e interesses atualizados para
              recomendações de conexões assertivas.
            </p>
          </div>
        </Container>
      </section>

      <Container className="relative z-10 flex-1 py-10 space-y-8 bg-[#F1F1F1] dark:bg-[#161616]">
        <div className="rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] p-6 sm:p-8 space-y-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-zinc-100 dark:border-zinc-800">
            <div className="flex items-center gap-5">
              <Avatar
                size="2xl"
                radius="sm"
                className="ring-2 ring-zinc-200 dark:ring-zinc-700 shadow-sm"
              >
                <AvatarImage src={userProfile.avatar} alt={userProfile.name} />
                <AvatarFallback className="font-black text-xl bg-zinc-900 text-white">
                  {getInitials(userProfile.name)}
                </AvatarFallback>
              </Avatar>

              <div>
                <h2 className="text-xl font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white">
                  {userProfile.name}
                </h2>
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                  {userProfile.role} • {userProfile.company}
                </p>
                <div className="mt-2">
                  <Badge
                    color="primary"
                    variant="flat"
                    radius="sm"
                    className="font-bold text-[11px] gap-1.5"
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: activeClub.accent }}
                    />
                    {activeClub.name}
                  </Badge>
                </div>
              </div>
            </div>

            <Link
              href="/perfil/minha-assinatura"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 hover:border-brand-primary/60 text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200 transition-colors shadow-2xs"
            >
              <CreditCard className="w-4 h-4 text-brand-primary" />
              <span>Gerenciar Assinatura</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <form onSubmit={handleSave} className="space-y-6">
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
              <button
                type="submit"
                className="px-6 py-3 rounded-sm bg-brand-primary hover:bg-brand-primary/90 text-white text-xs font-black uppercase tracking-wider transition-all shadow-xs flex items-center gap-2 cursor-pointer"
              >
                <Save className="w-4 h-4" />
                <span>Salvar alterações</span>
              </button>
            </div>
          </form>

          <div className="space-y-6 pt-6 border-t border-zinc-100 dark:border-zinc-800">
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
                tagColor="primary"
                tagVariant="flat"
                radius="sm"
                placeholder="Digite uma busca e pressione Enter..."
              />
            </div>

            <div className="space-y-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
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
                tagColor="primary"
                tagVariant="flat"
                radius="sm"
                placeholder="Digite uma oferta e pressione Enter..."
              />
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
