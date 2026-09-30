"use client"

import * as React from "react"

import Image from "next/image"

import { Copy, QrCode, ShieldCheck } from "@phosphor-icons/react"

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
import { InputOtp } from "@/src/components/ui/inputOtp/inputOtp"
import { toast } from "@/src/components/ui/toast/toast"

import { isModuleEnabled } from "@/src/config/brand.config"

export interface ProfileTwoFactorDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

export function ProfileTwoFactorDialog({
  open,
  onOpenChange,
  onSuccess,
}: ProfileTwoFactorDialogProps): React.JSX.Element {
  const [otpCode, setOtpCode] = React.useState("")
  const [otpError, setOtpError] = React.useState(false)
  const [copiedKey, setCopiedKey] = React.useState(false)

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
      onSuccess()
      onOpenChange(false)
      setOtpCode("")
      setOtpError(false)
      toast.success("Autenticação 2FA ativada com sucesso!", {
        description: isModuleEnabled("keypass")
          ? "Sua conta agora está protegida e você ganhou +250 XP!"
          : "Sua conta agora está protegida com autenticação em duas etapas.",
      })
    } else {
      setOtpError(true)
      toast.error("Código incompleto", {
        description:
          "Digite o código de 6 dígitos gerado pelo seu aplicativo autenticador.",
      })
    }
  }

  const handleClose = (nextOpen: boolean) => {
    if (!nextOpen) {
      setOtpCode("")
      setOtpError(false)
    }
    onOpenChange(nextOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent size="md" className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-0.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-xs bg-brand-primary/10 text-brand-primary text-[10px] font-bold uppercase tracking-wider">
              Segurança da Conta
            </span>
            {isModuleEnabled("keypass") && (
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
            )}
          </div>
          <DialogTitle className="text-xl font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-sm bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span>Ativar Autenticação 2FA</span>
          </DialogTitle>
          <DialogDescription className="text-xs text-zinc-500 dark:text-zinc-400">
            Escaneie o código QR com o seu aplicativo autenticador ou insira a
            chave manualmente para ativar.
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
              Abra o Google Authenticator ou seu app de preferência e aponte a
              câmera para a imagem acima.
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
            <Button
              variant="flat"
              size="sm"
              className="font-bold text-xs uppercase tracking-wider"
            >
              Cancelar
            </Button>
          </DialogClose>
          <Button
            color="primary"
            size="sm"
            onClick={handleVerifyOtp}
            className="font-bold text-xs uppercase tracking-wider inline-flex items-center gap-1.5 whitespace-nowrap shrink-0"
          >
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
                ? "Confirmar & Ativar (+250 XP)"
                : "Confirmar & Ativar"}
            </span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
