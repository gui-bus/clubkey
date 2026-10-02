"use client"

import * as React from "react"

import type { AdminUserProfile } from "@/src/store/useAdminStore"
import { Card, CtaButton, FormSectionTitle, Input } from "@clubkey/ui"
import { maskCpf, maskDate, maskPhone } from "@clubkey/utils"
import { FloppyDisk } from "@phosphor-icons/react"

export interface AdminProfilePersonalFormProps {
  initialData: AdminUserProfile
  onSave: (data: Partial<AdminUserProfile>) => void
}

export function AdminProfilePersonalForm({
  initialData,
  onSave,
}: AdminProfilePersonalFormProps): React.JSX.Element {
  const [formData, setFormData] = React.useState<AdminUserProfile>(initialData)
  const [isSaving, setIsSaving] = React.useState(false)

  React.useEffect(() => {
    setFormData(initialData)
  }, [initialData])

  const handleChange = <K extends keyof AdminUserProfile>(
    field: K,
    value: AdminUserProfile[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    setTimeout(() => {
      onSave({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        cpf: formData.cpf,
        birthDate: formData.birthDate,
        bio: formData.bio,
      })
      setIsSaving(false)
    }, 300)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full">
      <Card className="rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] p-6 sm:p-8 shadow-2xs overflow-visible">
        <div className="space-y-8">
          {/* Section: Informações Pessoais & Cadastrais */}
          <div className="space-y-5">
            <FormSectionTitle
              title="Informações Pessoais & Cadastrais"
              description="Dados de identificação e contato cadastrados na plataforma."
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                  Nome <span className="text-rose-500 font-bold">*</span>
                </label>
                <Input
                  value={formData.firstName}
                  onChange={(e) => handleChange("firstName", e.target.value)}
                  placeholder="Nome"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                  Sobrenome <span className="text-rose-500 font-bold">*</span>
                </label>
                <Input
                  value={formData.lastName}
                  onChange={(e) => handleChange("lastName", e.target.value)}
                  placeholder="Sobrenome"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                  E-mail Corporativo{" "}
                  <span className="text-rose-500 font-bold">*</span>
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="admin@clubkey.com.br"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                  Telefone / WhatsApp{" "}
                  <span className="text-rose-500 font-bold">*</span>
                </label>
                <Input
                  value={formData.phone}
                  onChange={(e) =>
                    handleChange("phone", maskPhone(e.target.value))
                  }
                  placeholder="(11) 98765-4321"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                  CPF <span className="text-rose-500 font-bold">*</span>
                </label>
                <Input
                  value={formData.cpf}
                  onChange={(e) => handleChange("cpf", maskCpf(e.target.value))}
                  placeholder="000.000.000-00"
                  className="font-mono"
                  required
                />
              </div>

              <div className="flex flex-col gap-1.5 sm:col-span-2">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                  Data de Nascimento
                </label>
                <Input
                  value={formData.birthDate}
                  onChange={(e) =>
                    handleChange("birthDate", maskDate(e.target.value))
                  }
                  placeholder="DD/MM/AAAA"
                />
              </div>

              <div className="flex flex-col gap-1.5 sm:col-span-2 md:col-span-4">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                  Biografia / Resumo Institucional
                </label>
                <textarea
                  value={formData.bio}
                  onChange={(e) => handleChange("bio", e.target.value)}
                  rows={3}
                  className="w-full p-3.5 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/20 transition-all resize-none"
                  placeholder="Descreva brevemente suas atribuições institucionais..."
                />
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end pt-3 border-t border-zinc-100 dark:border-zinc-800">
            <CtaButton
              type="submit"
              variant="primary"
              size="md"
              disabled={isSaving}
              className="min-w-[180px]"
            >
              <FloppyDisk size={18} weight="bold" />
              <span>{isSaving ? "Salvando..." : "Salvar Alterações"}</span>
            </CtaButton>
          </div>
        </div>
      </Card>
    </form>
  )
}
