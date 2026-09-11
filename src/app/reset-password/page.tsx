"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { ArrowLeft, ShieldCheck } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { FloatingCta } from "@/src/components/landing/FloatingCta"
import { Footer } from "@/src/components/landing/Footer"
import { Navbar } from "@/src/components/landing/Navbar"
import { TopBanner } from "@/src/components/landing/TopBanner"
import { PasswordInput } from "@/src/components/ui/passwordInput/passwordInput"
import { toast } from "@/src/components/ui/toast/toast"
import { brandConfig } from "@/src/config/brand.config"
import {
  type ResetPasswordFormData,
  resetPasswordSchema,
} from "@/src/schemas/auth.schema"

function ResetPasswordForm(): React.JSX.Element {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || ""
  const [isLoading, setIsLoading] = React.useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onTouched",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      toast.success("Senha redefinida com sucesso! Faça login com sua nova senha.")
      router.push("/sign-in")
    }, 700)
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
              alt={`${brandConfig.name} - Redefinição de Senha`}
              fill
              priority
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-[#0c0c0c]/50 to-[#0c0c0c]/70 z-10" />

            <div className="relative z-20 space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl xl:text-5xl font-black font-heading uppercase tracking-tight text-white leading-[1.08]">
                  Crie sua nova senha <span className="text-brand-primary">com segurança</span>
                </h2>
                <p className="text-sm xl:text-base text-zinc-300 font-light leading-relaxed max-w-lg">
                  Defina suas novas credenciais de acesso para continuar aproveitando os benefícios exclusivos da sua assinatura.
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
              <div className="mb-8 text-left">
                <h1 className="text-2xl sm:text-3xl xl:text-4xl font-black text-zinc-900 dark:text-white font-heading tracking-tight uppercase">
                  Criar nova senha
                </h1>
                <p className="mt-2 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 font-light leading-relaxed">
                  {email
                    ? `Defina uma nova senha para a conta ${email}.`
                    : "Defina sua nova senha para acessar sua conta."}
                </p>
              </div>

              <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="new-password"
                    className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300"
                  >
                    Nova senha
                  </label>
                  <PasswordInput
                    id="new-password"
                    placeholder="Digite sua nova senha"
                    variant={errors.password ? "error" : "default"}
                    minLength={8}
                    requireUppercase
                    requireLowercase
                    requireNumber
                    requireSymbol
                    showRequirements="on-focus"
                    showStrengthMeter
                    disabled={isLoading}
                    autoFocus
                    {...register("password")}
                  />
                  {errors.password && (
                    <span className="text-xs text-red-500">{errors.password.message}</span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="confirm-new-password"
                    className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300"
                  >
                    Confirmar nova senha
                  </label>
                  <PasswordInput
                    id="confirm-new-password"
                    placeholder="Confirme sua nova senha"
                    variant={errors.confirmPassword ? "error" : "default"}
                    showRequirements="never"
                    showStrengthMeter={false}
                    disabled={isLoading}
                    {...register("confirmPassword")}
                  />
                  {errors.confirmPassword && (
                    <span className="text-xs text-red-500">{errors.confirmPassword.message}</span>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-2 py-4 rounded-xl bg-brand-primary hover:bg-brand-primary-hover text-white text-sm font-bold uppercase tracking-wider transition-all shadow-md shadow-brand-primary/25 cursor-pointer outline-none disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Salvando..." : "Redefinir senha"}
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
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <FloatingCta />
    </main>
  )
}

export default function ResetPasswordPage(): React.JSX.Element {
  return (
    <React.Suspense
      fallback={
        <div className="min-h-96 flex items-center justify-center bg-[#F1F1F1] dark:bg-[#161616]">
          <div className="w-8 h-8 rounded-full border-2 border-brand-primary border-t-transparent animate-spin" />
        </div>
      }
    >
      <ResetPasswordForm />
    </React.Suspense>
  )
}
