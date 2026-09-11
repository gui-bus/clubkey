"use client"

import * as React from "react"
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"

import { PhoneInput } from "@/src/components/auth/phoneInput"
import { TermsCard } from "@/src/components/auth/termsCard"
import { Checkbox } from "@/src/components/ui/checkbox/checkbox"
import { CtaButton } from "@/src/components/common/ctaButton"
import { Input } from "@/src/components/ui/input/input"
import { PasswordInput } from "@/src/components/ui/passwordInput/passwordInput"
import { maskCpf, maskCnpj, maskDate } from "@/src/lib/masks"
import { type SignUpPjFormData, signUpPjSchema } from "@/src/schemas/auth.schema"

export interface SignUpPjFormProps {
  onSuccess: (email: string) => void
}

export function SignUpPjForm({ onSuccess }: SignUpPjFormProps): React.JSX.Element {
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
  } = useForm<SignUpPjFormData>({
    resolver: zodResolver(signUpPjSchema),
    mode: "onSubmit",
    defaultValues: {
      accountType: "pj",
      companyName: "",
      corporateEmail: "",
      responsibleName: "",
      cnpj: "",
      responsibleCpf: "",
      openingDate: "",
      phone: { dialCode: "55", number: "" },
      password: "",
      confirmPassword: "",
      hasReferral: false,
      referralCode: "",
      acceptedTerms: false,
    },
  })

  const hasReferral = watch("hasReferral")

  const onSubmit = (data: SignUpPjFormData) => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      toast.success("Conta empresarial criada com sucesso! Verifique seu e-mail corporativo.")
      onSuccess(data.corporateEmail)
    }, 800)
  }

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10 w-full">
      <div className="space-y-6 w-full">
        <div className="border-b border-zinc-200 dark:border-zinc-800 pb-3">
          <h2 className="text-base font-bold uppercase tracking-wider text-zinc-900 dark:text-white font-heading">
            Dados da Empresa & Responsável
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light mt-0.5">
            Preencha as informações corporativas e do representante legal
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Razão social
            </label>
            <Input
              placeholder="Razão social da empresa"
              variant={errors.companyName ? "error" : "default"}
              disabled={isLoading}
              {...register("companyName")}
            />
            {errors.companyName && (
              <span className="text-xs text-red-500">{errors.companyName.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              E-mail corporativo
            </label>
            <Input
              type="email"
              placeholder="contato@empresa.com"
              variant={errors.corporateEmail ? "error" : "default"}
              disabled={isLoading}
              {...register("corporateEmail")}
            />
            {errors.corporateEmail && (
              <span className="text-xs text-red-500">{errors.corporateEmail.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              CNPJ da empresa
            </label>
            <Controller
              name="cnpj"
              control={control}
              render={({ field }) => (
                <Input
                  value={field.value}
                  onChange={(e) => {
                    const formatted = maskCnpj(e.target.value)
                    field.onChange(formatted)
                    if (formatted.length === 18) {
                      trigger("cnpj")
                    } else if (errors.cnpj && formatted.length < 18) {
                      clearErrors("cnpj")
                    }
                  }}
                  onBlur={field.onBlur}
                  placeholder="00.000.000/0000-00"
                  variant={errors.cnpj ? "error" : "default"}
                  disabled={isLoading}
                />
              )}
            />
            {errors.cnpj && (
              <span className="text-xs text-red-500">{errors.cnpj.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Data de abertura
            </label>
            <Controller
              name="openingDate"
              control={control}
              render={({ field }) => (
                <Input
                  value={field.value}
                  onChange={(e) => field.onChange(maskDate(e.target.value))}
                  placeholder="DD/MM/AAAA"
                  variant={errors.openingDate ? "error" : "default"}
                  disabled={isLoading}
                />
              )}
            />
            {errors.openingDate && (
              <span className="text-xs text-red-500">{errors.openingDate.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Nome completo do responsável
            </label>
            <Input
              placeholder="Nome do responsável"
              variant={errors.responsibleName ? "error" : "default"}
              disabled={isLoading}
              {...register("responsibleName")}
            />
            {errors.responsibleName && (
              <span className="text-xs text-red-500">{errors.responsibleName.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              CPF do responsável
            </label>
            <Controller
              name="responsibleCpf"
              control={control}
              render={({ field }) => (
                <Input
                  value={field.value}
                  onChange={(e) => {
                    const formatted = maskCpf(e.target.value)
                    field.onChange(formatted)
                    if (formatted.length === 14) {
                      trigger("responsibleCpf")
                    } else if (errors.responsibleCpf && formatted.length < 14) {
                      clearErrors("responsibleCpf")
                    }
                  }}
                  onBlur={field.onBlur}
                  placeholder="000.000.000-00"
                  variant={errors.responsibleCpf ? "error" : "default"}
                  disabled={isLoading}
                />
              )}
            />
            {errors.responsibleCpf && (
              <span className="text-xs text-red-500">{errors.responsibleCpf.message}</span>
            )}
          </div>

          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Telefone corporativo
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
              id="pj-referral-check"
              checked={hasReferral}
              onCheckedChange={(checked) => setValue("hasReferral", checked === true, { shouldValidate: true })}
            />
            <label
              htmlFor="pj-referral-check"
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
        <CtaButton
          type="submit"
          disabled={isLoading}
          isFullWidth
          size="lg"
        >
          {isLoading ? "Criando conta..." : "Criar conta"}
        </CtaButton>

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
