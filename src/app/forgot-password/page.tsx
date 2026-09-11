"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, MailCheck, ShieldCheck } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { FloatingCta } from "@/src/components/landing/FloatingCta"
import { Footer } from "@/src/components/landing/Footer"
import { Navbar } from "@/src/components/landing/Navbar"
import { TopBanner } from "@/src/components/landing/TopBanner"
import { Input } from "@/src/components/ui/input/input"
import { toast } from "@/src/components/ui/toast/toast"
import { brandConfig } from "@/src/config/brand.config"
import {
  type ForgotPasswordFormData,
  forgotPasswordSchema,
} from "@/src/schemas/auth.schema"

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
    mode: "onTouched",
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
    <main className="w-full bg-[#F1F1F1] dark:bg-[#161616] text-[#111111] dark:text-white flex flex-col font-sans selection:bg-brand-primary/20 selection:text-brand-primary">
      <TopBanner />
      <Navbar isTransparent={false} />

      <section className="flex-1 w-full flex items-stretch">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12">
          <div className="hidden lg:flex lg:col-span-6 xl:col-span-6 relative bg-[#0D0D0D] text-white flex-col justify-end p-12 xl:p-16 overflow-hidden">
            <Image
              src="/utils/banners/img_02.png"
              alt={`${brandConfig.name} - Recuperação de Conta`}
              fill
              priority
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-[#0c0c0c]/50 to-[#0c0c0c]/70 z-10" />

            <div className="relative z-20 space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl xl:text-5xl font-black font-heading uppercase tracking-tight text-white leading-[1.08]">
                  Recupere seu acesso <span className="text-brand-primary">e continue viajando</span>
                </h2>
                <p className="text-sm xl:text-base text-zinc-300 font-light leading-relaxed max-w-lg">
                  Vamos te ajudar a redefinir sua senha com total segurança para você voltar a planejar suas próximas experiências.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/15">
                <div className="space-y-1">
                  <div className="text-2xl xl:text-3xl font-black font-heading text-white">+4.500</div>
                  <div className="text-xs text-zinc-400 font-medium uppercase tracking-wider">Acomodações Premium</div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl xl:text-3xl font-black font-heading text-white">Até 60%</div>
                  <div className="text-xs text-zinc-400 font-medium uppercase tracking-wider">Tarifas Last Minute</div>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-zinc-400">
                <ShieldCheck className="w-4 h-4 text-brand-primary" />
                <span>ACESSO SEGURO & CRIPTOGRAFADO</span>
              </div>
            </div>
          </div>

          <div className="col-span-1 lg:col-span-6 xl:col-span-6 bg-white dark:bg-zinc-900 flex items-center justify-center p-6 sm:p-12 md:p-16 lg:p-20 transition-colors">
            <div className="w-full max-w-md mx-auto py-8">
              {isSubmitted ? (
                <div className="flex flex-col items-center text-center space-y-6 animate-in fade-in-0 duration-300">
                  <div className="w-16 h-16 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary shadow-xs">
                    <MailCheck className="w-8 h-8" />
                  </div>

                  <div className="space-y-2">
                    <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white font-heading tracking-tight uppercase">
                      Verifique seu e-mail
                    </h1>
                    <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
                      Enviamos as instruções e o link para redefinir sua senha para:
                    </p>
                  </div>

                  <div className="w-full p-3.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 text-xs sm:text-sm font-bold text-zinc-900 dark:text-white break-all">
                    {submittedEmail}
                  </div>

                  <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light">
                    Não encontrou o e-mail? Verifique também sua caixa de spam ou lixo eletrônico.
                  </p>

                  <div className="flex flex-col gap-3 w-full pt-2">
                    <button
                      type="button"
                      disabled={isResending}
                      onClick={handleResend}
                      className="w-full py-4 rounded-xl bg-brand-primary hover:bg-brand-primary-hover text-white text-sm font-bold uppercase tracking-wider transition-all shadow-md shadow-brand-primary/25 cursor-pointer outline-none disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isResending ? "Reenviando..." : "Reenviar e-mail"}
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsSubmitted(false)}
                      className="w-full py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
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
                      Informe o e-mail cadastrado na sua conta para receber as instruções de redefinição de senha.
                    </p>
                  </div>

                  <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
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
                        <span className="text-xs text-red-500">{errors.email.message}</span>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full mt-2 py-4 rounded-xl bg-brand-primary hover:bg-brand-primary-hover text-white text-sm font-bold uppercase tracking-wider transition-all shadow-md shadow-brand-primary/25 cursor-pointer outline-none disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isLoading ? "Enviando..." : "Confirmar"}
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
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingCta />
    </main>
  )
}
