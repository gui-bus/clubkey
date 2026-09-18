"use client"

import * as React from "react"

import { FloppyDisk } from "@phosphor-icons/react"

import { Input } from "@/src/components/ui/input/input"

import {
  PhoneInput,
  type PhoneInputValue,
} from "@/src/components/auth/phoneInput"
import { CitySelect } from "@/src/components/common/citySelect"
import { CtaButton } from "@/src/components/common/ctaButton"

import { maskCnpj, maskCpf, maskDate } from "@/src/lib/masks"
import { cn } from "@/src/lib/utils"

export interface ProfileFormData {
  nationality: string
  firstName: string
  lastName: string
  email: string
  cpf: string
  birthDate: string
  phone: PhoneInputValue
  companyName: string
  cnpj: string
  corporateEmail: string
  openingDate: string
  role: string
  company: string
  city: string
  bio: string
}

export interface ProfilePersonalFormProps {
  initialData: ProfileFormData
  onSave: (data: ProfileFormData) => void
}

export function ProfilePersonalForm({
  initialData,
  onSave,
}: ProfilePersonalFormProps): React.JSX.Element {
  const [formData, setFormData] = React.useState<ProfileFormData>(initialData)

  React.useEffect(() => {
    setFormData(initialData)
  }, [initialData])

  const handleChange = (field: keyof ProfileFormData, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-10 w-full">
      <div className="space-y-6 w-full">
        <div className="border-b border-zinc-200 dark:border-zinc-800 pb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="text-base font-bold uppercase tracking-wider text-zinc-900 dark:text-white font-heading">
              Dados Pessoais
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light mt-0.5">
              Preencha suas informações de identificação
            </p>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Campos marcados com{" "}
            <span className="text-red-500 font-bold">*</span> são obrigatórios
          </p>
        </div>

        <div className="flex flex-col gap-1.5 w-full">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
            Nacionalidade <span className="text-red-500 font-bold">*</span>
          </label>
          <div className="grid grid-cols-2 gap-5">
            <button
              type="button"
              onClick={() => {
                handleChange("nationality", "brasileiro")
                handleChange("cpf", "")
              }}
              className={cn(
                "h-11 px-4 rounded-sm border text-xs font-bold uppercase tracking-wider transition-all cursor-pointer",
                formData.nationality === "brasileiro"
                  ? "border-brand-primary bg-brand-primary/10 text-brand-primary"
                  : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300"
              )}
            >
              Brasileiro
            </button>
            <button
              type="button"
              onClick={() => {
                handleChange("nationality", "estrangeiro")
                handleChange("cpf", "")
              }}
              className={cn(
                "h-11 px-4 rounded-sm border text-xs font-bold uppercase tracking-wider transition-all cursor-pointer",
                formData.nationality === "estrangeiro"
                  ? "border-brand-primary bg-brand-primary/10 text-brand-primary"
                  : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300"
              )}
            >
              Estrangeiro
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Primeiro Nome <span className="text-red-500 font-bold">*</span>
            </label>
            <Input
              value={formData.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
              placeholder="Ex: William"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Sobrenome <span className="text-red-500 font-bold">*</span>
            </label>
            <Input
              value={formData.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
              placeholder="Ex: Tabata"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              E-mail <span className="text-red-500 font-bold">*</span>
            </label>
            <Input
              type="email"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="seu@email.com"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              {formData.nationality === "brasileiro"
                ? "CPF"
                : "Documento de Identificação"}{" "}
              <span className="text-red-500 font-bold">*</span>
            </label>
            <Input
              value={formData.cpf}
              onChange={(e) => {
                const formatted =
                  formData.nationality === "brasileiro"
                    ? maskCpf(e.target.value)
                    : e.target.value
                handleChange("cpf", formatted)
              }}
              placeholder={
                formData.nationality === "brasileiro"
                  ? "000.000.000-00"
                  : "Número do documento"
              }
              required
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Data de nascimento{" "}
              <span className="text-red-500 font-bold">*</span>
            </label>
            <Input
              value={formData.birthDate}
              onChange={(e) =>
                handleChange("birthDate", maskDate(e.target.value))
              }
              placeholder="DD/MM/AAAA"
              required
            />
          </div>

          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Telefone celular <span className="text-red-500 font-bold">*</span>
            </label>
            <PhoneInput
              value={formData.phone}
              onChange={(val) => handleChange("phone", val)}
            />
          </div>
        </div>
      </div>

      {}
      <div className="space-y-6 w-full">
        <div className="border-b border-zinc-200 dark:border-zinc-800 pb-3">
          <h2 className="text-base font-bold uppercase tracking-wider text-zinc-900 dark:text-white font-heading">
            Dados da Empresa
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light mt-0.5">
            Preencha caso queira vincular sua empresa
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Razão social
            </label>
            <Input
              value={formData.companyName}
              onChange={(e) => handleChange("companyName", e.target.value)}
              placeholder="Razão social da empresa"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              CNPJ da empresa
            </label>
            <Input
              value={formData.cnpj}
              onChange={(e) => handleChange("cnpj", maskCnpj(e.target.value))}
              placeholder="00.000.000/0000-00"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              E-mail corporativo
            </label>
            <Input
              type="email"
              value={formData.corporateEmail}
              onChange={(e) => handleChange("corporateEmail", e.target.value)}
              placeholder="contato@empresa.com"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Data de abertura
            </label>
            <Input
              value={formData.openingDate}
              onChange={(e) =>
                handleChange("openingDate", maskDate(e.target.value))
              }
              placeholder="DD/MM/AAAA"
            />
          </div>
        </div>
      </div>

      {}
      <div className="space-y-6 w-full">
        <div className="border-b border-zinc-200 dark:border-zinc-800 pb-3">
          <h2 className="text-base font-bold uppercase tracking-wider text-zinc-900 dark:text-white font-heading">
            Atuação Profissional & Biografia
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light mt-0.5">
            Informações públicas exibidas no diretório de membros da comunidade
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Profissão / Cargo
            </label>
            <Input
              value={formData.role}
              onChange={(e) => handleChange("role", e.target.value)}
              placeholder="Ex: Sócio-diretor, Head de Produto..."
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Empresa onde atua
            </label>
            <Input
              value={formData.company}
              onChange={(e) => handleChange("company", e.target.value)}
              placeholder="Ex: Tabata Capital, Banco Livre, Google..."
            />
          </div>

          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Cidade / Base
            </label>
            {formData.nationality === "brasileiro" ? (
              <CitySelect
                value={formData.city}
                onChange={(val) => handleChange("city", val)}
                placeholder="Selecione o estado e busque a cidade..."
              />
            ) : (
              <Input
                value={formData.city}
                onChange={(e) => handleChange("city", e.target.value)}
                placeholder="Ex: Nova York, EUA / Londres, Reino Unido"
              />
            )}
          </div>

          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Minibiografia / Resumo de atuação
            </label>
            <textarea
              rows={3}
              value={formData.bio}
              onChange={(e) => handleChange("bio", e.target.value)}
              placeholder="Escreva um breve resumo da sua trajetória profissional..."
              className="w-full px-3.5 py-2.5 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-white outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all resize-none leading-relaxed"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2">
        <CtaButton
          type="submit"
          variant="primary"
          size="md"
          className="text-xs font-bold uppercase tracking-wider"
        >
          <FloppyDisk className="w-4 h-4 mr-2" />
          <span>Salvar alterações</span>
        </CtaButton>
      </div>
    </form>
  )
}
