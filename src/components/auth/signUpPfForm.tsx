"use client"

import * as React from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"

import { PhoneInput } from "@/src/components/auth/phoneInput"
import { TermsCard } from "@/src/components/auth/termsCard"
import { Checkbox } from "@/src/components/ui/checkbox/checkbox"
import { Input } from "@/src/components/ui/input/input"
import { PasswordInput } from "@/src/components/ui/passwordInput/passwordInput"
import { cn } from "@/src/lib/utils/utils"
import { type SignUpPfFormData, signUpPfSchema } from "@/src/schemas/auth.schema"

export interface SignUpPfFormProps {
  onSuccess: (email: string) => void
}

export function SignUpPfForm({ onSuccess }: SignUpPfFormProps): React.JSX.Element {
  const [isLoading, setIsLoading] = React.useState(false)

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    clearErrors,
    trigger,
    formState: { errors },
  } = useForm<SignUpPfFormData>({
    resolver: zodResolver(signUpPfSchema),
    mode: "onTouched",
    defaultValues: {
      accountType: "pf",
      nationality: "brasileiro",
      fullName: "",
      email: "",
      cpf: "",
      birthDate: "",
      phone: { dialCode: "55", number: "" },
      password: "",
      confirmPassword: "",
      hasReferral: false,
      referralCode: "",
      acceptedTerms: false,
    },
  })

  const nationality = watch("nationality")
  const hasReferral = watch("hasReferral")

  const maskCpf = (val: string) => {
    const raw = val.replace(/\D/g, "").slice(0, 11)
    if (raw.length <= 3) return raw
    if (raw.length <= 6) return `${raw.slice(0, 3)}.${raw.slice(3)}`
    if (raw.length <= 9) return `${raw.slice(0, 3)}.${raw.slice(3, 6)}.${raw.slice(6)}`
    return `${raw.slice(0, 3)}.${raw.slice(3, 6)}.${raw.slice(6, 9)}-${raw.slice(9)}`
  }

  const maskDate = (val: string) => {
    const raw = val.replace(/\D/g, "").slice(0, 8)
    if (raw.length <= 2) return raw
    if (raw.length <= 4) return `${raw.slice(0, 2)}/${raw.slice(2)}`
    return `${raw.slice(0, 2)}/${raw.slice(2, 4)}/${raw.slice(4)}`
  }

  const onSubmit = (data: SignUpPfFormData) => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      toast.success("Conta criada com sucesso! Verifique seu e-mail.")
      onSuccess(data.email)
    }, 800)
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10 w-full">
      <div className="space-y-6 w-full">
        <div className="border-b border-zinc-200 dark:border-zinc-800 pb-3">
          <h2 className="text-base font-bold uppercase tracking-wider text-zinc-900 dark:text-white font-heading">
            Dados Pessoais
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light mt-0.5">
            Preencha suas informações de identificação
          </p>
        </div>

        <div className="flex flex-col gap-1.5 w-full">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
            Nacionalidade
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                setValue("nationality", "brasileiro")
                setValue("cpf", "")
                clearErrors("cpf")
              }}
              className={cn(
                "h-11 px-4 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all cursor-pointer",
                nationality === "brasileiro"
                  ? "border-brand-primary bg-brand-primary/10 text-brand-primary"
                  : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300"
              )}
            >
              Brasileiro
            </button>
            <button
              type="button"
              onClick={() => {
                setValue("nationality", "estrangeiro")
                setValue("cpf", "")
                clearErrors("cpf")
              }}
              className={cn(
                "h-11 px-4 rounded-xl border text-xs font-bold uppercase tracking-wider transition-all cursor-pointer",
                nationality === "estrangeiro"
                  ? "border-brand-primary bg-brand-primary/10 text-brand-primary"
                  : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300"
              )}
            >
              Estrangeiro
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Nome completo
            </label>
            <Input
              placeholder="Nome completo"
              variant={errors.fullName ? "error" : "default"}
              disabled={isLoading}
              {...register("fullName")}
            />
            {errors.fullName && (
              <span className="text-xs text-red-500">{errors.fullName.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              E-mail
            </label>
            <Input
              type="email"
              placeholder="seu@email.com"
              variant={errors.email ? "error" : "default"}
              disabled={isLoading}
              {...register("email")}
            />
            {errors.email && (
              <span className="text-xs text-red-500">{errors.email.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              {nationality === "brasileiro" ? "CPF" : "Documento de Identificação"}
            </label>
            <Controller
              name="cpf"
              control={control}
              render={({ field }) => (
                <Input
                  value={field.value}
                  onChange={(e) => {
                    const formatted =
                      nationality === "brasileiro" ? maskCpf(e.target.value) : e.target.value
                    field.onChange(formatted)
                    if (nationality === "brasileiro") {
                      if (formatted.length === 14) {
                        trigger("cpf")
                      } else if (errors.cpf && formatted.length < 14) {
                        clearErrors("cpf")
                      }
                    } else {
                      if (errors.cpf && formatted.trim().length >= 4) {
                        clearErrors("cpf")
                      }
                    }
                  }}
                  onBlur={field.onBlur}
                  placeholder={
                    nationality === "brasileiro" ? "000.000.000-00" : "Número do documento"
                  }
                  variant={errors.cpf ? "error" : "default"}
                  disabled={isLoading}
                />
              )}
            />
            {errors.cpf && (
              <span className="text-xs text-red-500">{errors.cpf.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Data de nascimento
            </label>
            <Controller
              name="birthDate"
              control={control}
              render={({ field }) => (
                <Input
                  value={field.value}
                  onChange={(e) => field.onChange(maskDate(e.target.value))}
                  placeholder="DD/MM/AAAA"
                  variant={errors.birthDate ? "error" : "default"}
                  disabled={isLoading}
                />
              )}
            />
            {errors.birthDate && (
              <span className="text-xs text-red-500">{errors.birthDate.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Telefone celular
            </label>
            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <PhoneInput
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.phone?.number?.message}
                  disabled={isLoading}
                />
              )}
            />
          </div>
        </div>
      </div>

      <div className="space-y-6 w-full">
        <div className="border-b border-zinc-200 dark:border-zinc-800 pb-3">
          <h2 className="text-base font-bold uppercase tracking-wider text-zinc-900 dark:text-white font-heading">
            Segurança & Indicação
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light mt-0.5">
            Defina suas credenciais de login e informe se recebeu indicação
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Senha
            </label>
            <PasswordInput
              placeholder="Digite sua senha"
              variant={errors.password ? "error" : "default"}
              minLength={8}
              requireUppercase
              requireLowercase
              requireNumber
              requireSymbol
              showRequirements="on-focus"
              showStrengthMeter
              disabled={isLoading}
              {...register("password")}
            />
            {errors.password && (
              <span className="text-xs text-red-500">{errors.password.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Confirmar senha
            </label>
            <PasswordInput
              placeholder="Confirme sua senha"
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
        </div>

        <div className="flex flex-col gap-3 pt-2">
          <div className="flex items-center gap-2.5">
            <Checkbox
              id="pf-referral-check"
              checked={hasReferral}
              onCheckedChange={(checked) => setValue("hasReferral", checked, { shouldValidate: true })}
            />
            <label
              htmlFor="pf-referral-check"
              className="text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200 cursor-pointer select-none"
            >
              Possuo uma indicação
            </label>
          </div>

          {hasReferral && (
            <div className="pt-2 animate-in fade-in-0 duration-200 w-full">
              <Input
                type="email"
                placeholder="E-mail de quem indicou"
                variant={errors.referralCode ? "error" : "default"}
                disabled={isLoading}
                {...register("referralCode")}
              />
              {errors.referralCode && (
                <span className="text-xs text-red-500 mt-1 block">
                  {errors.referralCode.message}
                </span>
              )}
            </div>
          )}
        </div>
      </div>

      <Controller
        name="acceptedTerms"
        control={control}
        render={({ field }) => (
          <TermsCard
            checked={field.value}
            onCheckedChange={field.onChange}
            error={errors.acceptedTerms?.message}
          />
        )}
      />

      <div className="flex flex-col items-center gap-4 pt-2 w-full">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 rounded-xl bg-brand-primary hover:bg-brand-primary-hover text-white text-sm font-bold uppercase tracking-wider transition-all shadow-md shadow-brand-primary/25 cursor-pointer outline-none disabled:opacity-60 disabled:cursor-not-allowed text-center"
        >
          {isLoading ? "Criando conta..." : "Criar conta"}
        </button>

        <div className="text-center text-xs text-zinc-500 dark:text-zinc-400">
          Já possui uma conta?{" "}
          <Link
            href="/sign-in"
            className="text-brand-primary hover:text-brand-primary-hover font-bold transition-colors"
          >
            Entrar
          </Link>
        </div>
      </div>
    </form>
  )
}
