"use client"

import * as React from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"

import { usePortalStore } from "@/src/store/usePortalStore"
import { useForm } from "react-hook-form"

import { Input } from "@/src/components/ui/input/input"
import { PasswordInput } from "@/src/components/ui/passwordInput/passwordInput"
import { toast } from "@/src/components/ui/toast/toast"

import { AuthSplitLayout } from "@/src/components/auth/authSplitLayout"
import { CtaButton } from "@/src/components/common/ctaButton"

import { brandConfig } from "@/src/config/brand.config"

interface FormValues {
  email: string
  password: string
}

export default function SignInPage(): React.JSX.Element {
  const router = useRouter()
  const [isLoading, setIsLoading] = React.useState(false)
  const { login } = usePortalStore()

  const { register, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = (data: FormValues) => {
    setIsLoading(true)
    setTimeout(() => {
      login(data.email)
      setIsLoading(false)
      toast.success("Login realizado com sucesso! Bem-vindo ao portal.")
      router.push("/")
    }, 400)
  }

  return (
    <AuthSplitLayout
      formTitle="Acesse sua conta"
      formSubtitle={`Entre com suas credenciais para acessar o portal de membros da ${brandConfig.name}.`}
    >
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
            disabled={isLoading}
            autoComplete="email"
            {...register("email")}
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300"
            >
              Senha
            </label>
            <Link
              href="/forgot-password"
              className="text-xs text-brand-primary hover:text-brand-primary-hover font-semibold transition-colors outline-none"
            >
              Esqueci minha senha
            </Link>
          </div>
          <PasswordInput
            id="password"
            placeholder="Digite sua senha"
            showRequirements="never"
            showStrengthMeter={false}
            disabled={isLoading}
            autoComplete="current-password"
            {...register("password")}
          />
        </div>

        <CtaButton
          type="submit"
          disabled={isLoading}
          isFullWidth
          size="lg"
          className="mt-2"
        >
          {isLoading ? "Entrando no portal..." : "Entrar no Portal"}
        </CtaButton>

        <div className="text-center text-xs text-zinc-500 dark:text-zinc-400 mt-2">
          Ainda não tem conta?{" "}
          <Link
            href="/sign-up"
            className="text-brand-primary hover:text-brand-primary-hover font-bold transition-colors"
          >
            Cadastre-se
          </Link>
        </div>

        <div className="mt-6 pt-6 border-t border-zinc-100 dark:border-zinc-800 text-center text-xs text-zinc-400 dark:text-zinc-500 font-light leading-relaxed">
          Ao entrar você concorda com nossa{" "}
          <Link
            href="https://ribusdb.s3.amazonaws.com/politicas/privacidade-protecao-dados.pdf"
            target="_blank"
            rel="noreferrer"
            className="text-zinc-600 dark:text-zinc-300 underline hover:text-brand-primary transition-colors"
          >
            política de privacidade
          </Link>{" "}
          e{" "}
          <Link
            href="https://ribusdb.s3.amazonaws.com/politicas/termos-de-uso.pdf"
            target="_blank"
            rel="noreferrer"
            className="text-zinc-600 dark:text-zinc-300 underline hover:text-brand-primary transition-colors"
          >
            termos de uso
          </Link>
          .
        </div>
      </form>
    </AuthSplitLayout>
  )
}
