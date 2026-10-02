"use client"

import * as React from "react"
import { useState } from "react"

import Link from "next/link"

import { Badge, CtaButton, Input, toast } from "@clubkey/ui"
import { ArrowLeft, EnvelopeOpen, EnvelopeSimple } from "@phosphor-icons/react"

import { AdminAuthSplitLayout } from "@/src/components/auth/adminAuthSplitLayout"

export default function AdminForgotPasswordPage(): React.JSX.Element {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submittedEmail, setSubmittedEmail] = useState("")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)

    if (!email.trim() || !email.includes("@")) {
      setErrorMessage("Por favor, informe um e-mail corporativo válido.")
      return
    }

    setIsLoading(true)

    setTimeout(() => {
      setIsLoading(false)
      setSubmittedEmail(email.trim())
      setIsSubmitted(true)
      toast.success("Link de recuperação enviado!", {
        description: `Enviamos as instruções de redefinição para ${email.trim()}.`,
      })
    }, 450)
  }

  const handleResend = () => {
    setIsResending(true)

    setTimeout(() => {
      setIsResending(false)
      toast.success("Novo link enviado!", {
        description: `Reenviamos as instruções para ${submittedEmail}.`,
      })
    }, 450)
  }

  return (
    <AdminAuthSplitLayout
      bannerImage="/utils/banners/img_02.png"
      bannerAlt="ClubKey Admin - Recuperação de Senha"
    >
      {isSubmitted ? (
        <div className="flex flex-col items-center text-center space-y-6 animate-in fade-in-0 duration-300">
          <div className="w-16 h-16 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary shadow-xs">
            <EnvelopeOpen className="w-8 h-8" weight="bold" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-center gap-2">
              <Badge
                variant="flat"
                color="primary"
                size="sm"
                className="font-bold tracking-wider uppercase text-[10px]"
              >
                E-mail Enviado
              </Badge>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white font-heading tracking-tight uppercase">
              Verifique seu e-mail
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-light leading-relaxed max-w-sm">
              Enviamos as instruções e o link seguro para redefinir sua senha
              corporativa para:
            </p>
          </div>

          <div className="w-full p-3.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/80 text-xs sm:text-sm font-bold text-zinc-900 dark:text-white break-all">
            {submittedEmail}
          </div>

          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light max-w-xs">
            Não encontrou a mensagem? Verifique também sua caixa de spam ou lixo
            eletrônico corporativo.
          </p>

          <div className="flex flex-col gap-3 w-full pt-2">
            <CtaButton
              type="button"
              disabled={isResending}
              onClick={handleResend}
              isFullWidth
              size="lg"
            >
              {isResending ? "Reenviando instruções..." : "Reenviar e-mail"}
            </CtaButton>

            <button
              type="button"
              onClick={() => {
                setIsSubmitted(false)
                setEmail("")
              }}
              className="w-full py-3 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
            >
              Informar outro e-mail
            </button>

            <div className="text-center mt-2">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:text-brand-primary transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Voltar para o login</span>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6 animate-in fade-in-0 duration-200">
          <div className="space-y-2 text-left">
            <div className="flex items-center gap-2">
              <Badge
                variant="flat"
                color="primary"
                size="sm"
                className="font-bold tracking-wider uppercase text-[10px]"
              >
                Redefinição Segura
              </Badge>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white font-heading tracking-tight uppercase">
              Recuperar Senha
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
              Informe o e-mail corporativo cadastrado para receber as instruções
              e chave de redefinição de acesso.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {errorMessage && (
              <div className="rounded-lg border border-red-200 dark:border-red-900/50 bg-red-50/90 dark:bg-red-950/30 p-3.5 text-xs text-red-700 dark:text-red-300">
                {errorMessage}
              </div>
            )}

            <div className="space-y-1.5">
              <label
                htmlFor="forgot-email"
                className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300"
              >
                E-mail Corporativo
              </label>
              <Input
                id="forgot-email"
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

            <CtaButton
              type="submit"
              variant="primary"
              disabled={isLoading}
              isFullWidth
              size="lg"
              className="mt-2"
            >
              {isLoading
                ? "Enviando instruções..."
                : "Enviar Link de Recuperação"}
            </CtaButton>

            <div className="text-center pt-2">
              <Link
                href="/login"
                className="inline-flex items-center gap-2 text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:text-brand-primary transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Voltar para o login</span>
              </Link>
            </div>
          </form>
        </div>
      )}
    </AdminAuthSplitLayout>
  )
}
