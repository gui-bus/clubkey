"use client"

import * as React from "react"

import Image from "next/image"

import { DeviceMobile, ShieldCheck, ShieldSlash } from "@phosphor-icons/react"

import { Badge } from "@/src/components/ui/badge/badge"
import { Button } from "@/src/components/ui/button/button"

import { CtaButton } from "@/src/components/common/ctaButton"

import { isModuleEnabled } from "@/src/config/brand.config"

export interface ProfileSecuritySectionProps {
  is2FAEnabled: boolean
  onOpen2FAModal: () => void
  onDisable2FA: () => void
}

export function ProfileSecuritySection({
  is2FAEnabled,
  onOpen2FAModal,
  onDisable2FA,
}: ProfileSecuritySectionProps): React.JSX.Element {
  return (
    <div className="space-y-4 pt-6 border-t border-zinc-200 dark:border-zinc-800">
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
              ) : isModuleEnabled("keypass") ? (
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
              ) : (
                <span>Pendente</span>
              )}
            </Badge>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Aumente a segurança da sua conta com verificação por código TOTP
            (Google Authenticator ou 1Password).
          </p>
        </div>

        <div className="shrink-0">
          {is2FAEnabled ? (
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
              <ShieldCheck className="w-4 h-4 shrink-0" />
              {isModuleEnabled("keypass") && (
                <div className="relative w-3.5 h-3.5 shrink-0">
                  <Image
                    src="/utils/gamification/utils/xp.webp"
                    alt="XP"
                    fill
                    className="object-contain"
                  />
                </div>
              )}
              <span>
                {isModuleEnabled("keypass")
                  ? "Configurar 2FA (+250 XP)"
                  : "Configurar 2FA"}
              </span>
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
            {isModuleEnabled("keypass")
              ? "Requisito de Onboarding:"
              : "Status:"}
          </span>
          <Badge
            color={is2FAEnabled ? "success" : "default"}
            variant="flat"
            radius="sm"
            className="text-[10px] font-bold inline-flex items-center gap-1"
          >
            {is2FAEnabled ? (
              "Concluído"
            ) : isModuleEnabled("keypass") ? (
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
            ) : (
              <span>Pendente</span>
            )}
          </Badge>
        </div>
      </div>
    </div>
  )
}
