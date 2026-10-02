"use client"

import * as React from "react"

import {
  Button,
  Card,
  CtaButton,
  FormSectionTitle,
  TableStatusBadge,
} from "@clubkey/ui"
import {
  CheckCircle,
  Clock,
  DeviceMobile,
  ShieldCheck,
  ShieldSlash,
} from "@phosphor-icons/react"

export interface AdminProfileSecuritySectionProps {
  is2FAEnabled: boolean
  onOpen2FAModal: () => void
  onDisable2FA: () => void
}

export function AdminProfileSecuritySection({
  is2FAEnabled,
  onOpen2FAModal,
  onDisable2FA,
}: AdminProfileSecuritySectionProps): React.JSX.Element {
  return (
    <Card className="rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] p-6 sm:p-8 shadow-2xs overflow-visible space-y-6">
      <FormSectionTitle
        title={
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-brand-primary" weight="bold" />
            <span>Autenticação em Duas Etapas (2FA)</span>
          </div>
        }
        description="Aumente a segurança da sua conta com verificação por código TOTP (Google Authenticator, 1Password ou Authy)."
        badge={
          is2FAEnabled ? (
            <TableStatusBadge
              variant="success"
              size="auto"
              label="2FA Ativo"
              icon={<ShieldCheck size={28} weight="fill" />}
              className="h-7 px-2.5 text-[10px] rounded-sm uppercase tracking-wider"
            />
          ) : (
            <TableStatusBadge
              variant="danger"
              size="auto"
              label="2FA Inativo"
              icon={<ShieldSlash size={28} weight="fill" />}
              className="h-7 px-2.5 text-[10px] rounded-sm uppercase tracking-wider"
            />
          )
        }
        action={
          is2FAEnabled ? (
            <CtaButton
              type="button"
              variant="outline"
              size="sm"
              onClick={onDisable2FA}
              className="text-xs text-zinc-600 dark:text-zinc-300 hover:text-red-500"
            >
              <ShieldSlash className="w-3.5 h-3.5 mr-1.5 shrink-0" />
              <span>Desativar 2FA</span>
            </CtaButton>
          ) : (
            <Button
              color="primary"
              size="sm"
              onClick={onOpen2FAModal}
              className="text-xs font-black uppercase tracking-wider shadow-xs inline-flex items-center gap-1.5 whitespace-nowrap shrink-0"
            >
              <ShieldCheck className="w-4 h-4 shrink-0" weight="bold" />
              <span>Configurar 2FA</span>
            </Button>
          )
        }
      />

      <div className="p-4 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
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
                ? "Configurado com sucesso. Código solicitado em novos acessos ao painel administrativo."
                : "Recomendado: Google Authenticator, 1Password ou Authy."}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold text-zinc-600 dark:text-zinc-300">
            Status:
          </span>
          {is2FAEnabled ? (
            <TableStatusBadge
              variant="success"
              size="auto"
              label="Concluído"
              icon={<CheckCircle size={28} weight="fill" />}
              className="h-7 px-3 text-[11px] rounded-sm"
            />
          ) : (
            <TableStatusBadge
              variant="warning"
              size="auto"
              label="Pendente"
              icon={<Clock size={28} weight="bold" />}
              className="h-7 px-3 text-[11px] rounded-sm"
            />
          )}
        </div>
      </div>
    </Card>
  )
}
