"use client"

import * as React from "react"

import {
  Button,
  CtaButton,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  InputOtp,
  toast,
} from "@clubkey/ui"
import { Copy, QrCode, ShieldCheck } from "@phosphor-icons/react"

export interface AdminProfileTwoFactorDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess: () => void
}

export function AdminProfileTwoFactorDialog({
  open,
  onOpenChange,
  onSuccess,
}: AdminProfileTwoFactorDialogProps): React.JSX.Element {
  const [otpCode, setOtpCode] = React.useState("")
  const [otpError, setOtpError] = React.useState(false)
  const [copiedKey, setCopiedKey] = React.useState(false)

  const secretKey = "CK99-ADM7-2FA9-X442"

  const handleCopyKey = () => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(secretKey)
      setCopiedKey(true)
      setTimeout(() => setCopiedKey(false), 2000)
      toast.success("Chave de configuração copiada!")
    }
  }

  const handleVerifyOtp = () => {
    if (otpCode.trim().length === 6) {
      onSuccess()
      onOpenChange(false)
      setOtpCode("")
      setOtpError(false)
      toast.success("Autenticação em duas etapas ativada com sucesso!", {
        description:
          "Seu acesso administrativo agora está protegido com verificação 2FA.",
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
              Segurança do Painel
            </span>
          </div>

          <DialogTitle className="text-xl font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-sm bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
              <ShieldCheck className="w-4 h-4" weight="bold" />
            </div>
            <span>Configurar Autenticação 2FA</span>
          </DialogTitle>
          <DialogDescription className="text-xs text-zinc-500 dark:text-zinc-400">
            Escaneie o código QR no Google Authenticator ou 1Password e confirme
            o código gerado.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-2">
          {/* Step 1: QR Code & Manual Secret */}
          <div className="flex flex-col items-center gap-4 p-5 rounded-xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 text-center">
            {/* Visual QR Code Container */}
            <div className="relative p-3.5 bg-white rounded-lg shadow-xs border border-zinc-200">
              <div className="w-40 h-40 flex items-center justify-center bg-zinc-950 rounded-sm text-white">
                <QrCode size={110} weight="thin" />
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
                Chave de Configuração Manual
              </p>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                Se preferir, digite a chave diretamente no aplicativo
                autenticador:
              </p>
            </div>

            <div className="flex items-center gap-2 w-full max-w-xs">
              <input
                type="text"
                readOnly
                value={secretKey}
                className="flex-1 px-3 py-2 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-xs font-mono font-bold text-center text-zinc-800 dark:text-zinc-200 outline-none select-all"
              />
              <Button
                type="button"
                variant="bordered"
                size="sm"
                onClick={handleCopyKey}
                className="shrink-0"
              >
                <Copy className="w-3.5 h-3.5 mr-1" />
                <span>{copiedKey ? "Copiado!" : "Copiar"}</span>
              </Button>
            </div>
          </div>

          {/* Step 2: Verification PIN */}
          <div className="space-y-3">
            <div className="space-y-0.5">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                Código de Verificação de 6 Dígitos
              </label>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                Digite o código exibido no seu aplicativo para validar a
                ativação
              </p>
            </div>

            <div className="flex justify-center py-2">
              <InputOtp
                value={otpCode}
                onChange={(val) => {
                  setOtpCode(val)
                  if (otpError) setOtpError(false)
                }}
                length={6}
                autoFocus
                onComplete={handleVerifyOtp}
              />
            </div>

            {otpError && (
              <p className="text-xs text-red-500 text-center font-medium">
                Por favor, insira todos os 6 dígitos para validar.
              </p>
            )}
          </div>
        </div>

        <DialogFooter className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex items-center justify-end gap-2">
          <DialogClose asChild>
            <Button variant="bordered" size="sm">
              Cancelar
            </Button>
          </DialogClose>
          <CtaButton
            type="button"
            variant="primary"
            size="sm"
            onClick={handleVerifyOtp}
            disabled={otpCode.length < 6}
          >
            <span>Ativar 2FA</span>
          </CtaButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
