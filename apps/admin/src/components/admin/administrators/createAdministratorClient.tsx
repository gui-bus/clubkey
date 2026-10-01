"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"

import type { AdministratorRole } from "@clubkey/types"
import {
  Card,
  CtaButton,
  FormSectionTitle,
  Input,
  PasswordInput,
  toast,
} from "@clubkey/ui"
import { cn } from "@clubkey/utils"
import {
  ArrowsClockwise,
  CaretLeft,
  Check,
  Copy,
  UserPlus,
} from "@phosphor-icons/react"

import { Container } from "@/src/components/common/container"

interface RoleConfig {
  value: AdministratorRole
  label: string
  description: string
  badge: string
  permissions: string[]
}

const ROLES: RoleConfig[] = [
  {
    value: "SUPER_ADMIN",
    label: "Super Admin",
    description: "Acesso irrestrito a todas as configurações, relatórios, gestão financeira e gerenciamento de outros administradores.",
    badge: "Acesso Total",
    permissions: [
      "Gestão de Administradores e Permissões",
      "Configurações Globais do Sistema",
      "Operações, Sinistros e Crédito",
      "Relatórios e Métricas Financeiras",
    ],
  },
  {
    value: "ADMIN",
    label: "Administrador",
    description: "Gestão completa de usuários, operações de sinistros, créditos, imóveis e relatórios operacionais.",
    badge: "Operacional",
    permissions: [
      "Gestão de Usuários e Contas",
      "Aprovação de Sinistros e Créditos",
      "Visualização de Relatórios",
      "Suporte e Atendimento",
    ],
  },
  {
    value: "SUPPORT",
    label: "Suporte & Atendimento",
    description: "Acesso focado em atendimento a membros, consulta de usuários e resolução de chamados operacionais.",
    badge: "Atendimento",
    permissions: [
      "Consulta e Edição Básica de Usuários",
      "Abertura e Acompanhamento de Sinistros",
      "Histórico de Transações",
    ],
  },
  {
    value: "FINANCIAL",
    label: "Financeiro",
    description: "Controle de saldos, extratos, aprovação de saques, conciliação e relatórios de fluxo de caixa.",
    badge: "Financeiro",
    permissions: [
      "Gestão de Saldos e Transações RIB",
      "Aprovação e Bloqueio de Saques",
      "Relatórios Contábeis e Financeiros",
    ],
  },
]

function generateSecurePassword(length = 14): string {
  const upper = "ABCDEFGHJKLMNPQRSTUVWXYZ"
  const lower = "abcdefghijkmnopqrstuvwxyz"
  const numbers = "23456789"
  const symbols = "!@#$%&*"
  const all = upper + lower + numbers + symbols

  let pass = ""
  pass += upper[Math.floor(Math.random() * upper.length)]
  pass += lower[Math.floor(Math.random() * lower.length)]
  pass += numbers[Math.floor(Math.random() * numbers.length)]
  pass += symbols[Math.floor(Math.random() * symbols.length)]

  for (let i = pass.length; i < length; i++) {
    pass += all[Math.floor(Math.random() * all.length)]
  }

  return pass
    .split("")
    .sort(() => 0.5 - Math.random())
    .join("")
}

export function CreateAdministratorClient(): React.JSX.Element {
  const router = useRouter()

  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [temporaryPassword, setTemporaryPassword] = React.useState("")
  const [role, setRole] = React.useState<AdministratorRole>("SUPER_ADMIN")

  const [errors, setErrors] = React.useState<{
    name?: string
    email?: string
    temporaryPassword?: string
  }>({})
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [hasCopiedPassword, setHasCopiedPassword] = React.useState(false)

  const handleGeneratePassword = () => {
    const generated = generateSecurePassword(14)
    setTemporaryPassword(generated)
    setErrors((prev) => ({ ...prev, temporaryPassword: undefined }))
    toast.info("Senha Gerada", {
      description: "Uma senha temporária segura foi criada automaticamente.",
    })
  }

  const handleCopyPassword = () => {
    if (!temporaryPassword) return
    void navigator.clipboard.writeText(temporaryPassword)
    setHasCopiedPassword(true)
    toast.success("Copiado!", {
      description: "Senha temporária copiada para a área de transferência.",
    })
    setTimeout(() => setHasCopiedPassword(false), 2500)
  }

  const validate = (): boolean => {
    const newErrors: typeof errors = {}

    if (!name.trim()) {
      newErrors.name = "O nome completo é obrigatório."
    } else if (name.trim().split(" ").length < 2) {
      newErrors.name = "Informe o nome e sobrenome do administrador."
    }

    if (!email.trim()) {
      newErrors.email = "O e-mail institucional é obrigatório."
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = "Informe um endereço de e-mail válido."
    }

    if (!temporaryPassword) {
      newErrors.temporaryPassword = "A senha temporária é obrigatória."
    } else if (temporaryPassword.length < 8) {
      newErrors.temporaryPassword = "A senha deve ter no mínimo 8 caracteres."
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validate()) {
      toast.error("Preencha todos os campos obrigatórios", {
        description: "Revise os dados informados no formulário antes de prosseguir.",
      })
      return
    }

    setIsSubmitting(true)

    await new Promise((resolve) => setTimeout(resolve, 800))

    toast.success("Administrador Criado com Sucesso!", {
      description: `A conta para ${name} (${email}) foi configurada com acesso de ${
        ROLES.find((r) => r.value === role)?.label || role
      }.`,
    })

    router.push("/administradores")
  }

  const currentRoleConfig = ROLES.find((r) => r.value === role) || ROLES[0]

  return (
    <Container className="space-y-6">
      <div className="flex items-center gap-2 text-xs font-semibold text-zinc-400 dark:text-zinc-500">
        <Link
          href="/administradores"
          className="inline-flex items-center gap-1 hover:text-zinc-900 dark:hover:text-white transition-colors"
        >
          <CaretLeft size={14} weight="bold" />
          <span>Administradores</span>
        </Link>
        <span>/</span>
        <span className="text-zinc-800 dark:text-zinc-200 font-bold">
          Novo Administrador
        </span>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-xl sm:text-2xl font-black uppercase tracking-wider text-zinc-900 dark:text-white">
            Novo Administrador
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
            Cadastre um novo administrador com credenciais de acesso e nível de permissão.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] p-6 sm:p-8 shadow-2xs overflow-visible">
          <div className="space-y-10">
            <div className="space-y-5">
              <FormSectionTitle
                title="Informações Pessoais & Cadastrais"
                description="Dados de identificação e canal de comunicação oficial do administrador."
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                    Nome Completo <span className="text-rose-500">*</span>
                  </label>
                  <Input
                    type="text"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value)
                      if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }))
                    }}
                    placeholder="Ex: Carlos Eduardo de Souza"
                    variant={errors.name ? "error" : "default"}
                    required
                  />
                  {errors.name && (
                    <p className="text-[11px] font-semibold text-rose-500">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                    E-mail Institucional <span className="text-rose-500">*</span>
                  </label>
                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value)
                      if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }))
                    }}
                    placeholder="Ex: carlos.souza@clubkey.com.br"
                    variant={errors.email ? "error" : "default"}
                    required
                  />
                  {errors.email && (
                    <p className="text-[11px] font-semibold text-rose-500">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <FormSectionTitle
                title="Credenciais de Acesso & Segurança"
                description="Defina a senha temporária de acesso para o primeiro login da conta."
              />

              <div className="space-y-4">
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                      Senha Temporária <span className="text-rose-500">*</span>
                    </label>
                    <div className="flex items-center gap-2">
                      {temporaryPassword && (
                        <button
                          type="button"
                          onClick={handleCopyPassword}
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
                        >
                          {hasCopiedPassword ? (
                            <>
                              <Check size={13} weight="bold" className="text-emerald-500" />
                              <span className="text-emerald-600 dark:text-emerald-400">Copiada</span>
                            </>
                          ) : (
                            <>
                              <Copy size={13} weight="bold" />
                              <span>Copiar</span>
                            </>
                          )}
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={handleGeneratePassword}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-primary hover:text-brand-primary/80 transition-colors cursor-pointer"
                      >
                        <ArrowsClockwise size={13} weight="bold" />
                        <span>Gerar Senha Automática</span>
                      </button>
                    </div>
                  </div>

                  <PasswordInput
                    value={temporaryPassword}
                    onChange={(e) => {
                      setTemporaryPassword(e.target.value)
                      if (errors.temporaryPassword) {
                        setErrors((prev) => ({ ...prev, temporaryPassword: undefined }))
                      }
                    }}
                    placeholder="Digitar ou gerar senha temporária..."
                    showStrengthMeter
                    showRequirements="on-focus"
                    variant={errors.temporaryPassword ? "error" : "default"}
                  />
                  {errors.temporaryPassword && (
                    <p className="text-[11px] font-semibold text-rose-500">
                      {errors.temporaryPassword}
                    </p>
                  )}
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">
                    O administrador deverá alterar esta senha obrigatoriamente após realizar o primeiro login.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <FormSectionTitle
                title="Nível de Acesso & Permissões"
                description="Selecione o perfil de autorização correspondente às responsabilidades do cargo."
              />

              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {ROLES.map((r) => {
                    const isSelected = role === r.value

                    return (
                      <button
                        key={r.value}
                        type="button"
                        onClick={() => setRole(r.value)}
                        className={cn(
                          "flex flex-col text-left p-4 rounded-sm border transition-all cursor-pointer relative select-none",
                          isSelected
                            ? "bg-zinc-100/90 dark:bg-zinc-800/80 border-brand-primary ring-1 ring-brand-primary shadow-xs"
                            : "bg-zinc-50/70 dark:bg-zinc-800/30 border-zinc-200/80 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700"
                        )}
                      >
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span
                            className={cn(
                              "text-xs font-black uppercase tracking-wider truncate",
                              isSelected
                                ? "text-brand-primary"
                                : "text-zinc-900 dark:text-white"
                            )}
                          >
                            {r.label}
                          </span>
                          <div
                            className={cn(
                              "size-5 rounded-full flex items-center justify-center shrink-0 transition-colors",
                              isSelected
                                ? "bg-brand-primary text-white"
                                : "border border-zinc-300 dark:border-zinc-700"
                            )}
                          >
                            {isSelected && <Check size={12} weight="bold" />}
                          </div>
                        </div>

                        <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium line-clamp-2 leading-relaxed">
                          {r.description}
                        </p>
                      </button>
                    )
                  })}
                </div>

                <div className="space-y-2.5 pt-1">
                  <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400 dark:text-zinc-500 block">
                    Permissões inclusas para {currentRoleConfig.label}:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {currentRoleConfig.permissions.map((p) => (
                      <div key={p} className="flex items-center gap-2 text-xs text-zinc-700 dark:text-zinc-300 font-medium">
                        <Check size={14} weight="bold" className="text-emerald-500 shrink-0" />
                        <span>{p}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <div className="flex items-center justify-end gap-3 pt-2">
          <CtaButton
            type="button"
            variant="outline"
            size="sm"
            onClick={() => router.push("/administradores")}
          >
            Cancelar
          </CtaButton>

          <CtaButton
            type="submit"
            variant="primary"
            size="sm"
            disabled={isSubmitting}
          >
            <UserPlus size={14} weight="bold" />
            <span>{isSubmitting ? "Cadastrando..." : "Cadastrar Administrador"}</span>
          </CtaButton>
        </div>
      </form>
    </Container>
  )
}
