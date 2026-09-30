"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import {
  Wallet,
  FloppyDiskBack,
  Copy,
  Check,
  ArrowSquareOut,
} from "@phosphor-icons/react"
import { Card, CtaButton, Input, Select, toast, type SelectOption } from "@clubkey/ui"
import { cn } from "@clubkey/utils"
import type { AdminUser, AdminAccountStatus, AdminUserLevel, FeatureStatus } from "@clubkey/types"

export interface AdminUserProfileTabProps {
  user: AdminUser
  onSaveUser: (updated: AdminUser) => void
}

const ACCOUNT_STATUS_OPTIONS: SelectOption[] = [
  { value: "CONFIRMADO", label: "Confirmado" },
  { value: "PENDENTE", label: "Pendente" },
  { value: "EM_ANALISE", label: "Em Análise" },
  { value: "BLOQUEADO", label: "Bloqueado" },
]

const LEVEL_OPTIONS: SelectOption[] = [
  { value: "BRONZE", label: "Bronze" },
  { value: "PRATA", label: "Prata" },
  { value: "OURO", label: "Ouro" },
  { value: "BLACK", label: "Black" },
  { value: "DIAMANTE", label: "Diamante" },
  { value: "PATRONO", label: "Patrono" },
]

const DOCUMENT_TYPE_OPTIONS: SelectOption[] = [
  { value: "CPF", label: "Pessoa Física (CPF)" },
  { value: "CNPJ", label: "Pessoa Jurídica (CNPJ)" },
]

export function AdminUserProfileTab({
  user,
  onSaveUser,
}: AdminUserProfileTabProps): React.JSX.Element {
  const router = useRouter()

  const [formData, setFormData] = React.useState({
    name: user.name,
    email: user.email,
    handle: user.handle,
    phone: user.phone || "",
    city: user.city || "",
    state: user.state || "",
    documentType: user.documentType || "CPF",
    documentNumber: user.documentNumber || "",
    taxa: user.taxa ?? 1,
    accountStatus: user.accountStatus || "CONFIRMADO",
    level: user.level || "BRONZE",
    p2pStatus: user.p2pStatus || "ON",
    saqueStatus: user.saqueStatus || "ON",
  })
  const [walletCopied, setWalletCopied] = React.useState(false)
  const [isSaving, setIsSaving] = React.useState(false)

  const handleCopyWallet = () => {
    if (user.walletFireblocks) {
      navigator.clipboard.writeText(user.walletFireblocks)
      setWalletCopied(true)
      toast.success("Endereço da carteira copiado!")
      setTimeout(() => setWalletCopied(false), 2000)
    }
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)

    setTimeout(() => {
      const updatedUser: AdminUser = {
        ...user,
        name: formData.name,
        email: formData.email,
        handle: formData.handle,
        phone: formData.phone,
        city: formData.city,
        state: formData.state,
        documentType: formData.documentType as "CPF" | "CNPJ",
        documentNumber: formData.documentNumber,
        taxa: Number(formData.taxa),
        accountStatus: formData.accountStatus as AdminAccountStatus,
        level: formData.level as AdminUserLevel,
        p2pStatus: formData.p2pStatus as FeatureStatus,
        saqueStatus: formData.saqueStatus as FeatureStatus,
      }

      onSaveUser(updatedUser)
      setIsSaving(false)
      toast.success(`Dados do perfil de ${updatedUser.name} atualizados com sucesso!`)
    }, 400)
  }

  const formatBalance = (val: number) => {
    return val.toLocaleString("pt-BR", {
      minimumFractionDigits: 7,
      maximumFractionDigits: 7,
    })
  }

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {/* Single Consolidated Settings Card */}
      <Card className="rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] p-6 shadow-2xs space-y-8 overflow-visible">
        {/* Section 1: Informações Pessoais & Cadastrais */}
        <div className="space-y-4">
          <div className="border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
              Informações Pessoais & Cadastrais
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Dados de identificação e contato cadastrados na plataforma.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                Nome Completo
              </label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                E-mail
              </label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
            </div>

            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                Identificador (Handle)
              </label>
              <Input
                value={formData.handle}
                onChange={(e) => setFormData({ ...formData, handle: e.target.value })}
                className="font-mono"
              />
            </div>

            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                Telefone
              </label>
              <Input
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="(00) 00000-0000"
              />
            </div>

            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                Tipo de Cadastro
              </label>
              <Select
                options={DOCUMENT_TYPE_OPTIONS}
                value={formData.documentType}
                onValueChange={(val) => setFormData({ ...formData, documentType: val as "CPF" | "CNPJ" })}
              />
            </div>

            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                Número do Documento ({formData.documentType})
              </label>
              <Input
                value={formData.documentNumber}
                onChange={(e) => setFormData({ ...formData, documentNumber: e.target.value })}
                className="font-mono"
              />
            </div>

            <div className="flex flex-col gap-1.5 sm:col-span-2 md:col-span-3">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                Cidade
              </label>
              <Input
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
            </div>

            <div className="flex flex-col gap-1.5 sm:col-span-2 md:col-span-1">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                Estado (UF)
              </label>
              <Input
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Section 2: Parâmetros de Conta & Taxas */}
        <div className="space-y-4 pt-2">
          <div className="border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
              Parâmetros de Conta & Taxas
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Configuração de permissões, nível do associado e taxas operacionais.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                Status da Conta
              </label>
              <Select
                options={ACCOUNT_STATUS_OPTIONS}
                value={formData.accountStatus}
                onValueChange={(val) => setFormData({ ...formData, accountStatus: val as AdminAccountStatus })}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                Level do Usuário
              </label>
              <Select
                options={LEVEL_OPTIONS}
                value={formData.level}
                onValueChange={(val) => setFormData({ ...formData, level: val as AdminUserLevel })}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                Taxa Operacional
              </label>
              <Input
                type="number"
                step="0.1"
                min="0"
                max="100"
                value={formData.taxa}
                onChange={(e) => setFormData({ ...formData, taxa: parseFloat(e.target.value) || 0 })}
              />
            </div>
          </div>

          {/* Toggles Permissões P2P e Saque */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div className="p-3.5 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-800/40 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                  Transferências P2P
                </span>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  Permite envio direto entre associados.
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    p2pStatus: formData.p2pStatus === "ON" ? "OFF" : "ON",
                  })
                }
                className={cn(
                  "px-3 py-1.5 text-xs font-bold rounded-xs border transition-colors cursor-pointer",
                  formData.p2pStatus === "ON"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-400 dark:border-emerald-800"
                    : "bg-zinc-100 text-zinc-600 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700"
                )}
              >
                {formData.p2pStatus === "ON" ? "Habilitado" : "Desabilitado"}
              </button>
            </div>

            <div className="p-3.5 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-zinc-50/70 dark:bg-zinc-800/40 flex items-center justify-between">
              <div>
                <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                  Operações de Saque
                </span>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  Autoriza liquidação e resgate de ativos.
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    saqueStatus: formData.saqueStatus === "ON" ? "OFF" : "ON",
                  })
                }
                className={cn(
                  "px-3 py-1.5 text-xs font-bold rounded-xs border transition-colors cursor-pointer",
                  formData.saqueStatus === "ON"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-400 dark:border-emerald-800"
                    : "bg-zinc-100 text-zinc-600 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:border-zinc-700"
                )}
              >
                {formData.saqueStatus === "ON" ? "Habilitado" : "Desabilitado"}
              </button>
            </div>
          </div>
        </div>

        {/* Section 3: Custódia & Carteira */}
        <div className="space-y-4 pt-2">
          <div className="border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
              Custódia & Carteira
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Endereço público da carteira e saldos vinculados à conta.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Wallet Info Box */}
            <div className="lg:col-span-3 p-3.5 bg-zinc-50/70 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 min-w-0">
                <Wallet size={16} className="text-zinc-400 shrink-0" />
                <div className="min-w-0">
                  <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400 block">
                    Endereço da Carteira
                  </span>
                  <span className="text-xs font-mono font-medium text-zinc-800 dark:text-zinc-200 truncate block">
                    {user.walletFireblocks || "Não vinculada"}
                  </span>
                </div>
              </div>

              {user.walletFireblocks && (
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handleCopyWallet}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white transition-colors cursor-pointer px-2.5 py-1 rounded-xs bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700"
                  >
                    {walletCopied ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
                    <span>{walletCopied ? "Copiado!" : "Copiar"}</span>
                  </button>
                  <a
                    href={`https://etherscan.io/address/${user.walletFireblocks}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white transition-colors px-2.5 py-1 rounded-xs bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700"
                  >
                    <ArrowSquareOut size={13} />
                    <span>Explorer</span>
                  </a>
                </div>
              )}
            </div>

            {/* 3 Balances in Grid */}
            <div className="p-3.5 bg-zinc-50/70 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 rounded-sm space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400">
                DISPONÍVEL
              </span>
              <div className="flex items-center gap-1.5 text-sm font-mono font-bold text-zinc-900 dark:text-white">
                <span>{formatBalance(user.balances?.available || 0)}</span>
                <div className="relative w-3.5 h-3.5 shrink-0 inline-block">
                  <Image
                    src="/utils/gamification/utils/RIB.svg"
                    alt="RIB"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            <div className="p-3.5 bg-zinc-50/70 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 rounded-sm space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400">
                BLOQUEADO
              </span>
              <div className="flex items-center gap-1.5 text-sm font-mono font-bold text-zinc-900 dark:text-white">
                <span>{formatBalance(user.balances?.blocked || 0)}</span>
                <div className="relative w-3.5 h-3.5 shrink-0 inline-block opacity-75">
                  <Image
                    src="/utils/gamification/utils/RIB.svg"
                    alt="RIB"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>

            <div className="p-3.5 bg-zinc-50/70 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 rounded-sm space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-zinc-400">
                TOTAL EM CUSTÓDIA
              </span>
              <div className="flex items-center gap-1.5 text-sm font-mono font-bold text-zinc-900 dark:text-white">
                <span>{formatBalance(user.balances?.total || 0)}</span>
                <div className="relative w-3.5 h-3.5 shrink-0 inline-block">
                  <Image
                    src="/utils/gamification/utils/RIB.svg"
                    alt="RIB"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Bottom Form Actions */}
      <div className="flex items-center justify-end gap-3 pt-2">
        <CtaButton
          type="button"
          variant="outline"
          size="sm"
          onClick={() => router.push("/usuarios")}
        >
          Cancelar
        </CtaButton>

        <CtaButton
          type="submit"
          variant="primary"
          size="sm"
          disabled={isSaving}
        >
          <FloppyDiskBack size={14} weight="bold" />
          <span>{isSaving ? "Salvando..." : "Salvar Alterações"}</span>
        </CtaButton>
      </div>
    </form>
  )
}
