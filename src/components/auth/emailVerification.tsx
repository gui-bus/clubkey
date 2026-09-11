"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Mail } from "lucide-react"
import { toast } from "sonner"

import { InputOtp } from "@/src/components/ui/inputOtp/inputOtp"
import { cn } from "@/src/lib/utils/utils"

export interface EmailVerificationProps {
  email: string
  onSuccess?: () => void
  className?: string
}

export function EmailVerification({
  email,
  onSuccess,
  className,
}: EmailVerificationProps): React.JSX.Element {
  const router = useRouter()
  const [otp, setOtp] = React.useState("")
  const [isVerifying, setIsVerifying] = React.useState(false)
  const [resendCooldown, setResendCooldown] = React.useState(0)

  React.useEffect(() => {
    if (resendCooldown <= 0) return
    const timer = setInterval(() => {
      setResendCooldown((prev) => prev - 1)
    }, 1000)
    return () => clearInterval(timer)
  }, [resendCooldown])

  const handleVerify = () => {
    if (otp.length < 6) {
      toast.error("Por favor, digite os 6 dígitos do código.")
      return
    }

    setIsVerifying(true)
    setTimeout(() => {
      setIsVerifying(false)
      toast.success("E-mail verificado com sucesso!")
      if (onSuccess) {
        onSuccess()
      } else {
        router.push("/sign-in")
      }
    }, 800)
  }

  const handleResend = () => {
    if (resendCooldown > 0) return
    setResendCooldown(60)
    toast.success(`Novo código enviado para ${email}`)
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center text-center w-full py-2",
        className
      )}
    >
      <div className="w-20 h-20 rounded-full bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-6 shadow-inner">
        <Mail className="w-9 h-9 stroke-[2.2]" />
      </div>

      <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white font-heading tracking-tight mb-3">
        Verifique seu e-mail
      </h2>

      <p className="text-sm text-zinc-600 dark:text-zinc-400 font-light leading-relaxed mb-8">
        Enviamos um código de 6 dígitos para{" "}
        <strong className="font-bold text-brand-primary block sm:inline break-all">
          {email}
        </strong>
      </p>

      <div className="w-full mb-6">
        <InputOtp
          value={otp}
          onChange={setOtp}
          length={6}
          autoFocus
          onComplete={handleVerify}
        />
      </div>

      <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">
        Digite o código recebido no seu email
      </p>

      <div className="text-xs text-zinc-600 dark:text-zinc-400 mb-8">
        Não recebeu o código?{" "}
        {resendCooldown > 0 ? (
          <span className="text-zinc-400 font-medium">
            Reenviar em {resendCooldown}s
          </span>
        ) : (
          <button
            type="button"
            onClick={handleResend}
            className="text-brand-primary hover:text-brand-primary-hover font-bold transition-colors cursor-pointer outline-none"
          >
            Reenviar
          </button>
        )}
      </div>

      <button
        type="button"
        onClick={handleVerify}
        disabled={otp.length < 6 || isVerifying}
        className={cn(
          "w-full py-4 rounded-xl text-sm font-bold uppercase tracking-wider text-white transition-all shadow-md cursor-pointer outline-none",
          otp.length === 6 && !isVerifying
            ? "bg-brand-primary hover:bg-brand-primary-hover shadow-brand-primary/25 hover:shadow-lg hover:shadow-brand-primary/30"
            : "bg-brand-primary/50 opacity-60 cursor-not-allowed shadow-none"
        )}
      >
        {isVerifying ? "Verificando..." : "Verificar"}
      </button>
    </div>
  )
}
