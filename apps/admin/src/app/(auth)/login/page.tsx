"use client"

import * as React from "react"
import { Suspense, useState } from "react"

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

import { ADMIN_AUTH_COOKIE } from "@/src/proxy"
import { CtaButton, Input, InputOtp, toast } from "@clubkey/ui"
import {
  ArrowLeft,
  ArrowRight,
  EnvelopeSimple,
  Key,
  Lock,
  ShieldCheck,
} from "@phosphor-icons/react"

import { AdminAuthSplitLayout } from "@/src/components/auth/adminAuthSplitLayout"

function AdminLoginForm(): React.JSX.Element {
  const router = useRouter()
  const searchParams = useSearchParams()
  const from = searchParams.get("from") || "/painel"

  const [step, setStep] = useState<"credentials" | "two_factor">("credentials")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [pin, setPin] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleCredentialsSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)

    if (!email.trim() || !email.includes("@")) {
      setErrorMessage(
        "Por favor, informe um endereço de e-mail corporativo válido."
      )
      return
    }

    if (!password.trim()) {
      setErrorMessage("Por favor, digite sua senha de acesso.")
      return
    }

    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      setStep("two_factor")
      toast.info("Autenticação em duas etapas", {
        description:
          "Digite o código de 6 dígitos do seu aplicativo autenticador.",
      })
    }, 350)
  }

  const handleFinalLogin = (completedPin?: string) => {
    const codeToVerify = completedPin || pin
    if (codeToVerify.length < 6) {
      setErrorMessage("O código deve conter exatamente 6 dígitos numéricos.")
      return
    }

    setErrorMessage(null)
    setIsLoading(true)

    setTimeout(() => {
      document.cookie = `${ADMIN_AUTH_COOKIE}=authenticated; path=/; max-age=86400; SameSite=Lax`

      try {
        const stored = localStorage.getItem("clubkey_admin_user")
        const parsed = stored ? JSON.parse(stored) : {}
        localStorage.setItem(
          "clubkey_admin_user",
          JSON.stringify({
            ...parsed,
            email: email.trim(),
            name: parsed.name || "William Tabata",
            role: parsed.role || "SUPER ADMIN",
          })
        )
      } catch {}

      toast.success("Autenticação autorizada!", {
        description: "Bem-vindo ao painel de governança ClubKey.",
      })

      setIsLoading(false)
      router.push(from)
      router.refresh()
    }, 400)
  }

  const handleTwoFactorSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleFinalLogin()
  }

  return (
    <AdminAuthSplitLayout
      bannerImage="/utils/banners/img_01.png"
      bannerAlt="ClubKey Admin - Painel Administrativo"
    >
      {step === "credentials" ? (
        <div className="space-y-6 animate-in fade-in-0 duration-200">
          <div className="space-y-2 text-left">
            <h1 className="text-2xl sm:text-3xl font-black font-heading tracking-tight uppercase text-zinc-900 dark:text-white">
              Entrar no Painel
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
              Entre com suas credenciais corporativas para gerenciar a
              plataforma ClubKey.
            </p>
          </div>

          <form onSubmit={handleCredentialsSubmit} className="space-y-5">
            {errorMessage && (
              <div className="rounded-lg border border-red-200 dark:border-red-900/50 bg-red-50/90 dark:bg-red-950/30 p-3.5 text-xs text-red-700 dark:text-red-300">
                {errorMessage}
              </div>
            )}

            <div className="space-y-1.5">
              <label
                htmlFor="admin-email"
                className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300"
              >
                E-mail Corporativo
              </label>
              <Input
                id="admin-email"
                type="email"
                placeholder="admin@clubkey.com.br"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isLoading}
                autoComplete="email"
                startIcon={
                  <EnvelopeSimple size={18} className="text-zinc-400" />
                }
                required
                autoFocus
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label
                  htmlFor="admin-password"
                  className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300"
                >
                  Senha de Acesso
                </label>
                <Link
                  href="/esqueci-minha-senha"
                  className="text-xs text-brand-primary hover:text-brand-primary-hover font-semibold transition-colors outline-none"
                >
                  Esqueci minha senha
                </Link>
              </div>
              <Input
                id="admin-password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isLoading}
                autoComplete="current-password"
                startIcon={<Lock size={18} className="text-zinc-400" />}
                required
              />
            </div>

            <CtaButton
              type="submit"
              variant="primary"
              disabled={isLoading}
              isFullWidth
              size="lg"
              className="mt-2"
            >
              {isLoading ? "Verificando credenciais..." : "Continuar"}
              {!isLoading && <ArrowRight size={16} />}
            </CtaButton>
          </form>
        </div>
      ) : (
        <div className="relative space-y-6 animate-in fade-in-0 duration-200">
          {/* Large Watermark Background Icon */}
          <div className="pointer-events-none absolute -top-16 -right-12 select-none text-brand-primary/[0.06] dark:text-brand-primary/[0.08] -rotate-12">
            <ShieldCheck size={320} weight="fill" />
          </div>

          <div className="relative z-10 space-y-1 text-left">
            <h1 className="text-2xl sm:text-3xl font-black font-heading tracking-tight uppercase text-zinc-900 dark:text-white">
              Autenticação em duas etapas
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
              Digite o código de 6 dígitos gerado pelo aplicativo autenticador
              configurado na sua conta.
            </p>
          </div>

          <form
            onSubmit={handleTwoFactorSubmit}
            className="relative z-10 space-y-6"
          >
            {errorMessage && (
              <div className="rounded-lg border border-red-200 dark:border-red-900/50 bg-red-50/90 dark:bg-red-950/30 p-3.5 text-xs text-red-700 dark:text-red-300">
                {errorMessage}
              </div>
            )}

            <div className="py-2 flex justify-center">
              <InputOtp
                value={pin}
                onChange={(val) => {
                  setPin(val)
                  if (errorMessage) setErrorMessage(null)
                }}
                length={6}
                disabled={isLoading}
                autoFocus
                onComplete={(code) => handleFinalLogin(code)}
              />
            </div>

            <div className="space-y-4">
              <CtaButton
                type="submit"
                variant="primary"
                disabled={pin.length < 6 || isLoading}
                isFullWidth
                size="lg"
              >
                {isLoading
                  ? "Validando autenticação..."
                  : "Confirmar e Acessar"}
                {!isLoading && <Key size={16} />}
              </CtaButton>

              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setStep("credentials")
                    setPin("")
                    setErrorMessage(null)
                  }}
                  className="inline-flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white font-semibold transition-colors cursor-pointer"
                >
                  <ArrowLeft size={14} />
                  <span>Voltar para o login</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </AdminAuthSplitLayout>
  )
}

export default function AdminLoginPage(): React.JSX.Element {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen w-full bg-white dark:bg-[#141416]" />
      }
    >
      <AdminLoginForm />
    </Suspense>
  )
}
