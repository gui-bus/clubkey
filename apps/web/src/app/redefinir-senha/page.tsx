"use client"

import * as React from "react"

import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"

import {
  type ResetPasswordFormData,
  resetPasswordSchema,
} from "@/src/schemas/auth.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeft } from "@phosphor-icons/react"
import { useForm } from "react-hook-form"

import { PasswordInput } from "@/src/components/ui/passwordInput/passwordInput"
import { toast } from "@/src/components/ui/toast/toast"

import { AuthSplitLayout } from "@/src/components/auth/authSplitLayout"
import { CtaButton } from "@/src/components/common/ctaButton"

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
    mode: "onSubmit",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      toast.success(
        "Senha redefinida com sucesso! Faça login com sua nova senha."
      )
      router.push("/entrar")
    }, 700)
  }

  return (
    <AuthSplitLayout
      bannerImage="/utils/banners/img_02.png"
      bannerTitle={
        <>
          Crie sua nova senha{" "}
          <span className="text-brand-primary">com segurança</span>
        </>
      }
      bannerDescription="Defina suas novas credenciais de acesso para continuar aproveitando os benefícios exclusivos da sua assinatura."
      formTitle="Criar nova senha"
      formSubtitle={
        email
          ? `Defina uma nova senha para a conta ${email}.`
          : "Defina sua nova senha para acessar sua conta."
      }
    >
      <form
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-5"
      >
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
            <span className="text-xs text-red-500">
              {errors.password.message}
            </span>
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
            <span className="text-xs text-red-500">
              {errors.confirmPassword.message}
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
          {isLoading ? "Salvando..." : "Redefinir senha"}
        </CtaButton>

        <div className="text-center mt-2">
          <Link
            href="/entrar"
            className="inline-flex items-center gap-2 text-xs font-bold text-zinc-600 dark:text-zinc-400 hover:text-brand-primary transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar para o login</span>
          </Link>
        </div>
      </form>
    </AuthSplitLayout>
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
