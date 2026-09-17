"use client"

import * as React from "react"

import Link from "next/link"

import {
  type ForgotPasswordFormData,
  forgotPasswordSchema,
} from "@/src/schemas/auth.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeft, EnvelopeOpen } from "@phosphor-icons/react"
import { useForm } from "react-hook-form"

import { Input } from "@/src/components/ui/input/input"
import { toast } from "@/src/components/ui/toast/toast"

import { AuthSplitLayout } from "@/src/components/auth/authSplitLayout"
import { CtaButton } from "@/src/components/common/ctaButton"

export default function ForgotPasswordPage(): React.JSX.Element {
  const [isLoading, setIsLoading] = React.useState(false)
  const [isResending, setIsResending] = React.useState(false)
  const [isSubmitted, setIsSubmitted] = React.useState(false)
  const [submittedEmail, setSubmittedEmail] = React.useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onSubmit",
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = (data: ForgotPasswordFormData) => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setSubmittedEmail(data.email)
      setIsSubmitted(true)
      toast.success("Link de recuperação enviado!", {
        description: `Enviamos as instruções de recuperação para ${data.email}.`,
      })
    }, 600)
  }

  const handleResend = () => {
    setIsResending(true)
    setTimeout(() => {
      setIsResending(false)
      toast.success("Novo link enviado!", {
        description: `Reenviamos as instruções para ${submittedEmail}.`,
      })
    }, 600)
  }

  return (
    <AuthSplitLayout
      bannerImage="/utils/banners/img_02.png"
      bannerTitle={
        <>
          Recupere seu acesso{" "}
          <span className="text-brand-primary">e continue viajando</span>
        </>
      }
      bannerDescription="Vamos te ajudar a redefinir sua senha com total segurança para você voltar a planejar suas próximas experiências."
    >
      {isSubmitted ? (
        <div className="flex flex-col items-center text-center space-y-6 animate-in fade-in-0 duration-300">
          <div className="w-16 h-16 rounded-sm bg-brand-primary/10 flex items-center justify-center text-brand-primary shadow-xs">
            <EnvelopeOpen className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white font-heading tracking-tight uppercase">
              Verifique seu e-mail
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
              Enviamos as instruções e o link para redefinir sua senha para:
            </p>
          </div>

          <div className="w-full p-3.5 rounded-sm bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-xs sm:text-sm font-bold text-zinc-900 dark:text-white break-all">
            {submittedEmail}
          </div>

          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light">
            Não encontrou o e-mail? Verifique também sua caixa de spam ou lixo
            eletrônico.
          </p>

          <div className="flex flex-col gap-3 w-full pt-2">
            <CtaButton
              type="button"
              disabled={isResending}
              onClick={handleResend}
              isFullWidth
              size="lg"
            >
              {isResending ? "Reenviando..." : "Reenviar e-mail"}
            </CtaButton>

            <button
              type="button"
              onClick={() => setIsSubmitted(false)}
              className="w-full py-3 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
            >
              Informar outro e-mail
            </button>

            <div className="text-center mt-2">
              <Link
                href="/sign-in"
                className="inline-flex items-center gap-2 text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:text-brand-primary transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Voltar para o login</span>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <>
          <div className="mb-8 text-left">
            <h1 className="text-2xl sm:text-3xl xl:text-4xl font-black text-zinc-900 dark:text-white font-heading tracking-tight uppercase">
              Recuperar senha
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
              Informe o e-mail cadastrado na sua conta para receber as
              instruções de redefinição de senha.
            </p>
          </div>

          <form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-5"
          >
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="email"
                className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300"
              >
                E-mail
              </label>
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                variant={errors.email ? "error" : "default"}
                disabled={isLoading}
                autoComplete="email"
                autoFocus
                {...register("email")}
              />
              {errors.email && (
                <span className="text-xs text-red-500">
                  {errors.email.message}
                </span>
              )}
            </div>

            <CtaButton
              type="submit"
              disabled={isLoading}
              isFullWidth
              size="lg"
              className="mt-2"
            >
              {isLoading ? "Enviando..." : "Confirmar"}
            </CtaButton>

            <div className="text-center mt-2">
              <Link
                href="/sign-in"
                className="inline-flex items-center gap-2 text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:text-brand-primary transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Voltar para o login</span>
              </Link>
            </div>
          </form>
        </>
      )}
    </AuthSplitLayout>
  )
}
