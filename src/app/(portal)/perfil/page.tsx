"use client"

import * as React from "react"
import {
  User,
  Building,
  MapPin,
  Briefcase,
  Plus,
  X,
  Check,
  Save
} from "lucide-react"

import { usePortalStore } from "@/src/store/usePortalStore"
import { getInitials } from "@/src/data/portalData"

export default function ProfilePage(): React.JSX.Element {
  const {
    userProfile,
    updateProfile,
    addSeekingTag,
    removeSeekingTag,
    addOfferingTag,
    removeOfferingTag,
    getActiveClub
  } = usePortalStore()

  const activeClub = getActiveClub()

  const [formData, setFormData] = React.useState({
    name: userProfile.name,
    role: userProfile.role,
    company: userProfile.company,
    city: userProfile.city,
    bio: userProfile.bio
  })

  React.useEffect(() => {
    setFormData({
      name: userProfile.name,
      role: userProfile.role,
      company: userProfile.company,
      city: userProfile.city,
      bio: userProfile.bio
    })
  }, [
    userProfile.name,
    userProfile.role,
    userProfile.company,
    userProfile.city,
    userProfile.bio
  ])

  const [newSeeking, setNewSeeking] = React.useState("")
  const [newOffering, setNewOffering] = React.useState("")
  const [savedSuccess, setSavedSuccess] = React.useState(false)

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    updateProfile(formData)
    setSavedSuccess(true)
    setTimeout(() => setSavedSuccess(false), 2500)
  }

  const handleAddSeeking = (e: React.FormEvent) => {
    e.preventDefault()
    if (newSeeking.trim()) {
      addSeekingTag(newSeeking)
      setNewSeeking("")
    }
  }

  const handleAddOffering = (e: React.FormEvent) => {
    e.preventDefault()
    if (newOffering.trim()) {
      addOfferingTag(newOffering)
      setNewOffering("")
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <span className="text-xs font-black uppercase tracking-widest text-brand-primary block mb-1">
          Configurações de Conta
        </span>
        <h1 className="text-3xl sm:text-4xl font-heading font-black tracking-tight uppercase text-zinc-900 dark:text-white">
          Meu perfil de membro
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Mantenha seus dados e interesses atualizados para receber recomendações de conexões assertivas
        </p>
      </div>

      <div className="rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] p-6 sm:p-8 space-y-8 shadow-xs">
        <div className="flex items-center gap-5 pb-6 border-b border-zinc-100 dark:border-zinc-800">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-sm bg-zinc-900 dark:bg-zinc-800 text-white flex items-center justify-center font-black text-xl ring-2 ring-zinc-200 dark:ring-zinc-700 shadow-sm">
            {getInitials(userProfile.name)}
          </div>
          <div>
            <h2 className="text-xl font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white">
              {userProfile.name}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
              {userProfile.role} • {userProfile.company}
            </p>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 mt-2 rounded-sm text-[11px] font-black uppercase tracking-wider bg-zinc-100 dark:bg-zinc-900 text-brand-primary border border-zinc-200 dark:border-zinc-800">
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: activeClub.accent }}
              />
              {activeClub.name}
            </span>
          </div>
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

            {savedSuccess && (
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <Check className="w-4 h-4" />
                Alterações salvas com sucesso!
              </span>
            )}
          </div>
        </form>

        <div className="space-y-6 pt-6 border-t border-zinc-100 dark:border-zinc-800">
          <div className="space-y-3">
            <div>
              <h3 className="text-sm font-heading font-black tracking-tight uppercase text-zinc-900 dark:text-white">
                O que estou procurando (Networking & Negócios)
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Outros membros saberão onde podem agregar valor ao conectar com você
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {userProfile.seeking.map((tag, index) => (
                <span
                  key={tag + index}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-semibold bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800"
                >
                  <span>{tag}</span>
                  <button
                    type="button"
                    onClick={() => removeSeekingTag(index)}
                    className="text-zinc-400 hover:text-brand-primary cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>

            <form onSubmit={handleAddSeeking} className="flex gap-2 max-w-md">
              <input
                type="text"
                value={newSeeking}
                onChange={(e) => setNewSeeking(e.target.value)}
                placeholder="Adicionar nova busca..."
                className="flex-1 px-3.5 py-2 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-semibold text-zinc-900 dark:text-white outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200 hover:border-brand-primary flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-brand-primary" />
                Adicionar
              </button>
            </form>
          </div>

          <div className="space-y-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
            <div>
              <h3 className="text-sm font-heading font-black tracking-tight uppercase text-zinc-900 dark:text-white">
                O que posso oferecer
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Seus pontos fortes, experiência, conexões e mentorias disponíveis
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {userProfile.offering.map((tag, index) => (
                <span
                  key={tag + index}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-semibold bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800"
                >
                  <span>{tag}</span>
                  <button
                    type="button"
                    onClick={() => removeOfferingTag(index)}
                    className="text-zinc-400 hover:text-brand-primary cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </span>
              ))}
            </div>

            <form onSubmit={handleAddOffering} className="flex gap-2 max-w-md">
              <input
                type="text"
                value={newOffering}
                onChange={(e) => setNewOffering(e.target.value)}
                placeholder="Adicionar nova oferta..."
                className="flex-1 px-3.5 py-2 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-semibold text-zinc-900 dark:text-white outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200 hover:border-brand-primary flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-brand-primary" />
                Adicionar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
