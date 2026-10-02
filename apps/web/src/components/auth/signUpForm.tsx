"use client"

import * as React from "react"

import Link from "next/link"

import { type SignUpFormData, signUpSchema } from "@/src/schemas/auth.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm, useWatch } from "react-hook-form"
import { toast } from "sonner"

import { Checkbox } from "@/src/components/ui/checkbox/checkbox"
import { Input } from "@/src/components/ui/input/input"
import { PasswordInput } from "@/src/components/ui/passwordInput/passwordInput"

import { PhoneInput } from "@/src/components/auth/phoneInput"
import { TermsCard } from "@/src/components/auth/termsCard"
import { CtaButton } from "@/src/components/common/ctaButton"

import { maskCnpj, maskCpf, maskDate } from "@/src/lib/masks"
import { cn } from "@/src/lib/utils"

export interface SignUpFormProps {
  onSuccess: (email: string) => void
}

export function SignUpForm({ onSuccess }: SignUpFormProps): React.JSX.Element {
  const [isLoading, setIsLoading] = React.useState(false)

  const {
    register,
    handleSubmit,
    control,
    setValue,
    clearErrors,
    trigger,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: "onSubmit",
    defaultValues: {
      nationality: "brasileiro",
      firstName: "",
      lastName: "",
      email: "",
      cpf: "",
      birthDate: "",
      phone: { dialCode: "55", number: "" },
      companyName: "",
      cnpj: "",
      corporateEmail: "",
      openingDate: "",
      password: "",
      confirmPassword: "",
      hasReferral: false,
      referralCode: "",
      acceptedTerms: false,
    },
  })

  const nationality = useWatch({ control, name: "nationality" })
  const hasReferral = useWatch({ control, name: "hasReferral" })

  const onSubmit = (data: SignUpFormData) => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      toast.success("Conta criada com sucesso! Verifique seu e-mail.")
      onSuccess(data.email)
    }, 800)
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-10 w-full"
    >
      <div className="space-y-6 w-full">
        <div className="border-b border-zinc-200 dark:border-zinc-800 pb-3 flex flex-col sm:flex-row sm:items-end justify-between gap-2">
          <div>
            <h2 className="text-base font-bold uppercase tracking-wider text-zinc-900 dark:text-white font-heading">
              Dados Pessoais
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light mt-0.5">
              Preencha suas informações de identificação
            </p>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Campos marcados com{" "}
            <span className="text-red-500 font-bold">*</span> são obrigatórios
          </p>
        </div>

        <div className="flex flex-col gap-1.5 w-full">
          <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
            Nacionalidade <span className="text-red-500 font-bold">*</span>
          </label>
          <div className="grid grid-cols-2 gap-5">
            <button
              type="button"
              onClick={() => {
                setValue("nationality", "brasileiro")
                setValue("cpf", "")
                clearErrors("cpf")
              }}
              className={cn(
                "h-11 px-4 rounded-sm border text-xs font-bold uppercase tracking-wider transition-all cursor-pointer",
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
                "h-11 px-4 rounded-sm border text-xs font-bold uppercase tracking-wider transition-all cursor-pointer",
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
              Primeiro Nome <span className="text-red-500 font-bold">*</span>
            </label>
            <Input
              placeholder="Ex: William"
              variant={errors.firstName ? "error" : "default"}
              disabled={isLoading}
              {...register("firstName")}
            />
            {errors.firstName && (
              <span className="text-xs text-red-500">
                {errors.firstName.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Sobrenome <span className="text-red-500 font-bold">*</span>
            </label>
            <Input
              placeholder="Ex: Tabata"
              variant={errors.lastName ? "error" : "default"}
              disabled={isLoading}
              {...register("lastName")}
            />
            {errors.lastName && (
              <span className="text-xs text-red-500">
                {errors.lastName.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              E-mail <span className="text-red-500 font-bold">*</span>
            </label>
            <Input
              type="email"
              placeholder="seu@email.com"
              variant={errors.email ? "error" : "default"}
              disabled={isLoading}
              {...register("email")}
            />
            {errors.email && (
              <span className="text-xs text-red-500">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              {nationality === "brasileiro"
                ? "CPF"
                : "Documento de Identificação"}{" "}
              <span className="text-red-500 font-bold">*</span>
            </label>
            <Controller
              name="cpf"
              control={control}
              render={({ field }) => (
                <Input
                  value={field.value}
                  onChange={(e) => {
                    const formatted =
                      nationality === "brasileiro"
                        ? maskCpf(e.target.value)
                        : e.target.value
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
                    nationality === "brasileiro"
                      ? "000.000.000-00"
                      : "Número do documento"
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
              Data de nascimento{" "}
              <span className="text-red-500 font-bold">*</span>
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
              <span className="text-xs text-red-500">
                {errors.birthDate.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1.5 md:col-span-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Telefone celular <span className="text-red-500 font-bold">*</span>
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
            Dados da Empresa
          </h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light mt-0.5">
            Preencha caso queira vincular sua empresa
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
              <span className="text-xs text-red-500">
                {errors.companyName.message}
              </span>
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
                  value={field.value || ""}
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
              <span className="text-xs text-red-500">
                {errors.cnpj.message}
              </span>
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
              <span className="text-xs text-red-500">
                {errors.corporateEmail.message}
              </span>
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
                  value={field.value || ""}
                  onChange={(e) => field.onChange(maskDate(e.target.value))}
                  placeholder="DD/MM/AAAA"
                  variant={errors.openingDate ? "error" : "default"}
                  disabled={isLoading}
                />
              )}
            />
            {errors.openingDate && (
              <span className="text-xs text-red-500">
                {errors.openingDate.message}
              </span>
            )}
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
              Senha <span className="text-red-500 font-bold">*</span>
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
              <span className="text-xs text-red-500">
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Confirmar senha <span className="text-red-500 font-bold">*</span>
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
              <span className="text-xs text-red-500">
                {errors.confirmPassword.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-2">
          <div className="flex items-center gap-2.5">
            <Checkbox
              id="referral-check"
              checked={hasReferral}
              onCheckedChange={(checked) =>
                setValue("hasReferral", checked === true, {
                  shouldValidate: true,
                })
              }
            />
            <label
              htmlFor="referral-check"
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
        <CtaButton type="submit" disabled={isLoading} isFullWidth size="lg">
          {isLoading ? "Criando conta..." : "Criar conta"}
        </CtaButton>

        <div className="text-center text-xs text-zinc-500 dark:text-zinc-400">
          Já possui uma conta?{" "}
          <Link
            href="/entrar"
            className="text-brand-primary hover:text-brand-primary-hover font-bold transition-colors"
          >
            Entrar
          </Link>
        </div>
      </div>
    </form>
  )
}
