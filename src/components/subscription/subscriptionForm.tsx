"use client"

import * as React from "react"

import Link from "next/link"

import {
  type CreditCardPaymentFormData,
  creditCardPaymentSchema,
} from "@/src/schemas/subscription.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Check,
  Copy,
  CreditCard,
  Lock,
  QrCode,
  ShieldCheck,
  UserCheck,
} from "@phosphor-icons/react"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"

import { Input } from "@/src/components/ui/input/input"

import { CtaButton } from "@/src/components/common/ctaButton"

import {
  maskCardExpiry,
  maskCardNumber,
  maskCpf,
  maskCvv,
} from "@/src/lib/masks"
import { cn } from "@/src/lib/utils"

export type PaymentMethod = "credit_card" | "pix"

export interface SubscriptionUser {
  name: string
  email: string
  cpf?: string
}

export interface SubscriptionFormProps {
  user: SubscriptionUser | null
  onLogout?: () => void
  paymentMethod: PaymentMethod
  onPaymentMethodChange: (method: PaymentMethod) => void
  onSuccess: (paymentType: PaymentMethod, total: string) => void
}

export function SubscriptionForm({
  user,
  onLogout,
  paymentMethod,
  onPaymentMethodChange,
  onSuccess,
}: SubscriptionFormProps): React.JSX.Element {
  const [isLoading, setIsLoading] = React.useState(false)
  const [isPixGenerated, setIsPixGenerated] = React.useState(false)
  const [copiedPix, setCopiedPix] = React.useState(false)

  const cardForm = useForm<CreditCardPaymentFormData>({
    resolver: zodResolver(creditCardPaymentSchema),
    mode: "onSubmit",
    defaultValues: {
      cardNumber: "",
      holderName: user?.name || "",
      expirationDate: "",
      cvv: "",
      holderCpf: user?.cpf || "",
    },
  })

  React.useEffect(() => {
    if (user?.name && !cardForm.getValues("holderName")) {
      cardForm.setValue("holderName", user.name)
    }
    if (user?.cpf && !cardForm.getValues("holderCpf")) {
      cardForm.setValue("holderCpf", user.cpf)
    }
  }, [user, cardForm])

  const onCardSubmit = () => {
    if (!user) {
      toast.error("Você precisa estar conectado para concluir a assinatura.")
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      toast.success("Assinatura confirmada com sucesso! Bem-vindo ao clube.")
      onSuccess("credit_card", "R$ 19,90/mês")
    }, 1000)
  }

  const handleGeneratePix = () => {
    if (!user) {
      toast.error("Você precisa estar conectado para gerar o PIX.")
      return
    }

    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      setIsPixGenerated(true)
      toast.success("Código PIX gerado com sucesso!")
    }, 600)
  }

  const pixMockCode =
    "00020126580014br.gov.bcb.pix0136123e4567-e89b-12d3-a456-4266141740005204000053039865406214.925802BR5913CLUBKEY VIAGENS6009SAO PAULO62070503***6304E8A2"

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixMockCode)
    setCopiedPix(true)
    toast.success("Código PIX copiado para a área de transferência!")
    setTimeout(() => setCopiedPix(false), 3000)
  }

  const isFormLocked = !user

  return (
    <div className="w-full flex flex-col gap-6">
      {user && (
        <div className="flex items-center justify-between p-4 rounded-sm bg-emerald-500/10 border border-emerald-500/20 text-xs">
          <div className="flex items-center gap-2.5">
            <UserCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <div>
              <span className="font-bold text-zinc-900 dark:text-white">
                {user.name}
              </span>{" "}
              <span className="text-zinc-600 dark:text-zinc-400">
                ({user.email})
              </span>
            </div>
          </div>
          {onLogout && (
            <button
              type="button"
              onClick={onLogout}
              className="font-bold text-zinc-600 dark:text-zinc-400 hover:text-red-500 transition-colors uppercase tracking-wider text-[11px] cursor-pointer"
            >
              Trocar conta
            </button>
          )}
        </div>
      )}

      <div
        className={cn(
          "w-full relative flex flex-col gap-6 transition-all",
          isFormLocked &&
            "p-5 sm:p-7 rounded-sm border-2 border-dashed border-zinc-300 dark:border-zinc-700 overflow-hidden"
        )}
      >
        {isFormLocked && (
          <div className="absolute inset-0 z-20 flex items-center justify-center p-4 bg-transparent">
            <div className="w-full max-w-sm p-6 rounded-sm bg-[#F1F1F1] dark:bg-[#161616] border border-zinc-200 dark:border-zinc-800 shadow-2xl flex flex-col items-center text-center gap-4 animate-in fade-in-0 zoom-in-95 duration-200">
              <div className="w-12 h-12 rounded-sm bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center text-brand-primary">
                <Lock className="w-6 h-6" />
              </div>

              <div className="space-y-1.5">
                <h3 className="text-base font-black uppercase tracking-tight text-zinc-900 dark:text-white font-heading">
                  Faça login ou crie sua conta
                </h3>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
                  Você precisa estar conectado para vincular sua assinatura e
                  desbloquear tarifas exclusivas.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 w-full pt-1">
                <CtaButton
                  href="/sign-in"
                  size="sm"
                  isFullWidth
                  className="flex-1"
                >
                  Fazer Login
                </CtaButton>
                <CtaButton
                  href="/sign-up"
                  variant="secondary"
                  size="sm"
                  isFullWidth
                  className="flex-1"
                >
                  Criar Conta
                </CtaButton>
              </div>
            </div>
          </div>
        )}

        <div
          className={cn(
            "flex flex-col gap-6 transition-all duration-200",
            isFormLocked &&
              "opacity-50 filter blur-[2px] pointer-events-none select-none"
          )}
        >
          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
              Forma de Pagamento
            </label>
            <div className="grid grid-cols-2 gap-2 bg-zinc-100 dark:bg-zinc-800 p-1.5 rounded-sm border border-zinc-200 dark:border-zinc-700">
              <button
                type="button"
                disabled={isFormLocked}
                onClick={() => {
                  onPaymentMethodChange("credit_card")
                  setIsPixGenerated(false)
                }}
                className={cn(
                  "py-3 px-4 rounded-sm text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer",
                  paymentMethod === "credit_card"
                    ? "bg-white dark:bg-zinc-900 text-brand-primary shadow-xs border border-zinc-200 dark:border-zinc-700"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                )}
              >
                <CreditCard className="w-4 h-4 shrink-0" />
                <span>Cartão de Crédito</span>
              </button>

              <button
                type="button"
                disabled={isFormLocked}
                onClick={() => onPaymentMethodChange("pix")}
                className={cn(
                  "py-3 px-4 rounded-sm text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer relative",
                  paymentMethod === "pix"
                    ? "bg-white dark:bg-zinc-900 text-brand-primary shadow-xs border border-zinc-200 dark:border-zinc-700"
                    : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                )}
              >
                <QrCode className="w-4 h-4 shrink-0" />
                <span>PIX</span>
                <span className="px-1.5 py-0.5 rounded-sm bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[9px] font-bold">
                  10% OFF
                </span>
              </button>
            </div>
          </div>

          {paymentMethod === "credit_card" ? (
            <form
              noValidate
              onSubmit={cardForm.handleSubmit(onCardSubmit)}
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                  Número do cartão
                </label>
                <Controller
                  name="cardNumber"
                  control={cardForm.control}
                  render={({ field }) => (
                    <Input
                      value={field.value}
                      onChange={(e) =>
                        field.onChange(maskCardNumber(e.target.value))
                      }
                      onBlur={field.onBlur}
                      placeholder="0000 0000 0000 0000"
                      variant={
                        cardForm.formState.errors.cardNumber
                          ? "error"
                          : "default"
                      }
                      disabled={isLoading || isFormLocked}
                    />
                  )}
                />
                {cardForm.formState.errors.cardNumber && (
                  <span className="text-xs text-red-500">
                    {cardForm.formState.errors.cardNumber.message}
                  </span>
                )}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                  Nome impresso no cartão
                </label>
                <Input
                  placeholder="NOME COMPLETO"
                  className="uppercase"
                  variant={
                    cardForm.formState.errors.holderName ? "error" : "default"
                  }
                  disabled={isLoading || isFormLocked}
                  {...cardForm.register("holderName")}
                />
                {cardForm.formState.errors.holderName && (
                  <span className="text-xs text-red-500">
                    {cardForm.formState.errors.holderName.message}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                    Validade
                  </label>
                  <Controller
                    name="expirationDate"
                    control={cardForm.control}
                    render={({ field }) => (
                      <Input
                        value={field.value}
                        onChange={(e) =>
                          field.onChange(maskCardExpiry(e.target.value))
                        }
                        onBlur={field.onBlur}
                        placeholder="MM/AA"
                        variant={
                          cardForm.formState.errors.expirationDate
                            ? "error"
                            : "default"
                        }
                        disabled={isLoading || isFormLocked}
                      />
                    )}
                  />
                  {cardForm.formState.errors.expirationDate && (
                    <span className="text-xs text-red-500">
                      {cardForm.formState.errors.expirationDate.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                    CVV
                  </label>
                  <Controller
                    name="cvv"
                    control={cardForm.control}
                    render={({ field }) => (
                      <Input
                        value={field.value}
                        onChange={(e) =>
                          field.onChange(maskCvv(e.target.value))
                        }
                        onBlur={field.onBlur}
                        placeholder="123"
                        variant={
                          cardForm.formState.errors.cvv ? "error" : "default"
                        }
                        disabled={isLoading || isFormLocked}
                      />
                    )}
                  />
                  {cardForm.formState.errors.cvv && (
                    <span className="text-xs text-red-500">
                      {cardForm.formState.errors.cvv.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                  CPF do titular
                </label>
                <Controller
                  name="holderCpf"
                  control={cardForm.control}
                  render={({ field }) => (
                    <Input
                      value={field.value}
                      onChange={(e) => {
                        const masked = maskCpf(e.target.value)
                        field.onChange(masked)
                        if (masked.length === 14) {
                          cardForm.trigger("holderCpf")
                        } else if (
                          cardForm.formState.errors.holderCpf &&
                          masked.length < 14
                        ) {
                          cardForm.clearErrors("holderCpf")
                        }
                      }}
                      onBlur={field.onBlur}
                      placeholder="000.000.000-00"
                      variant={
                        cardForm.formState.errors.holderCpf
                          ? "error"
                          : "default"
                      }
                      disabled={isLoading || isFormLocked}
                    />
                  )}
                />
                {cardForm.formState.errors.holderCpf && (
                  <span className="text-xs text-red-500">
                    {cardForm.formState.errors.holderCpf.message}
                  </span>
                )}
              </div>

              <div className="pt-2">
                <CtaButton
                  type="submit"
                  disabled={isLoading || isFormLocked}
                  isFullWidth
                  size="lg"
                >
                  {isLoading
                    ? "Processando assinatura..."
                    : "Assinar plano mensal • R$ 19,90/mês"}
                </CtaButton>
              </div>
            </form>
          ) : (
            <div className="flex flex-col gap-5">
              <div className="p-4 rounded-sm bg-emerald-500/10 border border-emerald-500/20 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-xs">
                  <Check className="w-4 h-4 shrink-0" />
                  <span>Desconto de 10% Aplicado no Plano Anual</span>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-300 font-light leading-relaxed">
                  Pagando via PIX à vista, você garante 1 ano inteiro de acesso
                  à ClubKey por apenas{" "}
                  <strong className="font-bold text-zinc-900 dark:text-white">
                    R$ 214,92
                  </strong>{" "}
                  (economia real de R$ 23,88 sobre a mensalidade de 12 meses).
                </p>
              </div>

              {!isPixGenerated ? (
                <CtaButton
                  type="button"
                  disabled={isLoading || isFormLocked}
                  onClick={handleGeneratePix}
                  isFullWidth
                  size="lg"
                >
                  {isLoading
                    ? "Gerando código PIX..."
                    : "Gerar Código PIX • R$ 214,92"}
                </CtaButton>
              ) : (
                <div className="flex flex-col items-center gap-5 p-5 rounded-sm bg-[#F1F1F1] dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700">
                  <div className="text-center space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                      PIX Gerado com Sucesso
                    </span>
                    <h4 className="text-base font-black text-zinc-900 dark:text-white font-heading">
                      Pague R$ 214,92 para ativar
                    </h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 font-light">
                      Abra o aplicativo do seu banco e escaneie o código ou
                      copie a chave
                    </p>
                  </div>

                  <div className="p-3 bg-white rounded-sm border border-zinc-200 dark:border-zinc-700 shadow-xs">
                    <div className="w-44 h-44 flex items-center justify-center border-2 border-dashed border-zinc-300 rounded-sm">
                      <QrCode className="w-32 h-32 text-zinc-900" />
                    </div>
                  </div>

                  <div className="w-full flex flex-col gap-2">
                    <label className="text-[11px] font-bold uppercase tracking-wider text-zinc-600 dark:text-zinc-400 text-center">
                      Código Pix Copia e Cola
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        readOnly
                        value={pixMockCode}
                        className="flex-1 px-3 py-2.5 rounded-sm border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs text-zinc-700 dark:text-zinc-300 font-mono select-all truncate"
                      />
                      <button
                        type="button"
                        onClick={handleCopyPix}
                        className="px-4 py-2.5 rounded-sm bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shrink-0 transition-all cursor-pointer"
                      >
                        {copiedPix ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Copiado</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copiar</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="w-full pt-2">
                    <button
                      type="button"
                      onClick={() => onSuccess("pix", "R$ 214,92 à vista")}
                      className="w-full py-3.5 rounded-sm bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-md shadow-emerald-600/20 cursor-pointer"
                    >
                      Já realizei o pagamento via PIX
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="p-4 rounded-sm bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-brand-primary shrink-0 mt-0.5" />
            <p className="text-xs text-zinc-600 dark:text-zinc-300 font-light leading-relaxed">
              Pagamento seguro. Seus dados são criptografados e protegidos;
              usamos apenas o necessário para processar a assinatura.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
