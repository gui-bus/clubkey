"use client"

import * as React from "react"

import Image from "next/image"
import { notFound, useParams } from "next/navigation"

import {
  EXPERIENCES,
  formatBRL,
  getExperienceSlug,
} from "@/src/data/portalData"
import { usePortalStore } from "@/src/store/usePortalStore"
import {
  ArrowRight,
  Calendar,
  Check,
  CheckCircle,
  Clock,
  Copy,
  CreditCard,
  Key,
  QrCode,
  ShieldCheck,
  ShoppingCart,
} from "@phosphor-icons/react"

import { Checkbox } from "@/src/components/ui/checkbox/checkbox"
import { Input } from "@/src/components/ui/input/input"
import { Select } from "@/src/components/ui/select/select"
import { toast } from "@/src/components/ui/toast/toast"

import { Container } from "@/src/components/common/container"
import { CtaButton } from "@/src/components/common/ctaButton"
import { BackButton } from "@/src/components/portal/backButton"

import {
  maskCardExpiry,
  maskCardNumber,
  maskCpf,
  maskCvv,
} from "@/src/lib/masks"
import { cn } from "@/src/lib/utils"

export type PaymentMethod = "credit_card" | "pix"

export default function ExperienceCheckoutPage(): React.JSX.Element {
  const params = useParams()
  const idParam = Array.isArray(params?.id) ? params.id[0] : params?.id
  const expId = Number(idParam)
  const experience = EXPERIENCES.find((e) => e.id === expId)

  if (!experience) {
    notFound()
  }

  const expSlug = getExperienceSlug(experience)
  const { buyExperience, boughtExperiences, userProfile } = usePortalStore()
  const isAlreadyBought = !!boughtExperiences[experience.id]

  const [isSuccess, setIsSuccess] = React.useState(isAlreadyBought)
  const [isProcessing, setIsProcessing] = React.useState(false)
  const [paymentMethod, setPaymentMethod] =
    React.useState<PaymentMethod>("credit_card")
  const [copiedPix, setCopiedPix] = React.useState(false)
  const [agreeTerms, setAgreeTerms] = React.useState(true)

  const [cardNumber, setCardNumber] = React.useState("")
  const [holderName, setHolderName] = React.useState(
    `${userProfile.firstName} ${userProfile.lastName}`.trim()
  )
  const [expirationDate, setExpirationDate] = React.useState("")
  const [cvv, setCvv] = React.useState("")
  const [holderCpf, setHolderCpf] = React.useState("123.456.789-00")
  const [installments, setInstallments] = React.useState("1")

  const isPix = paymentMethod === "pix"
  const discountRate = 0.05
  const discountAmount = isPix ? Math.round(experience.price * discountRate) : 0
  const totalAmount = experience.price - discountAmount

  const installmentOptions = [
    { value: "1", label: `1x de ${formatBRL(totalAmount)} (à vista)` },
    {
      value: "2",
      label: `2x de ${formatBRL(Math.round(totalAmount / 2))} sem juros`,
    },
    {
      value: "3",
      label: `3x de ${formatBRL(Math.round(totalAmount / 3))} sem juros`,
    },
  ]

  const pixMockCode =
    "00020126580014br.gov.bcb.pix0136123e4567-e89b-12d3-a456-4266141740005204000053039865406214.925802BR5913CLUBKEY EXPERIENCIAS6009SAO PAULO62070503***6304E8A2"

  const handleCopyPix = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(pixMockCode)
      setCopiedPix(true)
      toast.success("Código PIX copiado para a área de transferência!")
      setTimeout(() => setCopiedPix(false), 3000)
    }
  }

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault()

    if (!agreeTerms) {
      toast.info(
        "Por favor, concorde com os termos de cancelamento para prosseguir."
      )
      return
    }

    if (paymentMethod === "credit_card") {
      if (!cardNumber || !holderName || !expirationDate || !cvv) {
        toast.info("Por favor, preencha todos os dados do cartão de crédito.")
        return
      }
    }

    setIsProcessing(true)
    setTimeout(() => {
      buyExperience(experience.id)
      setIsProcessing(false)
      setIsSuccess(true)
      toast.success("Pagamento aprovado com sucesso!", {
        description: `Vaga garantida para ${experience.title}.`,
      })
      if (typeof window !== "undefined") {
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
    }, 800)
  }

  if (isSuccess) {
    return (
      <Container className="pt-8 pb-20 max-w-2xl mx-auto py-12 text-center space-y-6">
        <div className="w-16 h-16 rounded-sm bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-brand-primary/10 text-brand-primary text-xs font-bold uppercase tracking-wider">
            <Key className="w-3.5 h-3.5" />
            <span>Vaga Confirmada • Acesso VIP</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-heading font-black tracking-tight uppercase text-zinc-900 dark:text-white">
            Parabéns, {userProfile.firstName}!
          </h1>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-md mx-auto">
            Sua vaga exclusiva para{" "}
            <span className="font-bold text-zinc-900 dark:text-white">
              {experience.title}
            </span>{" "}
            foi confirmada com sucesso.
          </p>
        </div>

        <div className="p-6 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] text-left space-y-3.5 shadow-xs">
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="text-zinc-500">Membro titular</span>
            <span className="font-bold text-zinc-900 dark:text-white">
              {userProfile.firstName} {userProfile.lastName}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="text-zinc-500">Data da experiência</span>
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">
              {experience.date}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="text-zinc-500">Local de encontro</span>
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">
              {experience.place}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs sm:text-sm">
            <span className="text-zinc-500">Forma de pagamento</span>
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">
              {paymentMethod === "pix"
                ? "PIX (com 5% OFF)"
                : "Cartão de Crédito"}
            </span>
          </div>
          <div className="flex items-center justify-between text-xs sm:text-sm pt-2 border-t border-zinc-100 dark:border-zinc-800">
            <span className="font-bold text-zinc-900 dark:text-white uppercase tracking-wider text-xs">
              Valor total pago
            </span>
            <span className="font-black text-brand-primary text-base font-heading">
              {formatBRL(totalAmount)}
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <CtaButton
            href={`/experiencias/${experience.id}/${expSlug}`}
            variant="secondary"
            size="sm"
            className="w-full sm:w-auto px-6 h-11 text-xs shadow-none hover:shadow-none"
          >
            Ver detalhes da experiência
          </CtaButton>
          <CtaButton
            href="/experiencias"
            variant="primary"
            size="sm"
            className="w-full sm:w-auto px-6 h-11 text-xs shadow-none hover:shadow-none"
          >
            <span>Explorar outras</span>
            <ArrowRight className="w-3.5 h-3.5 ml-2" />
          </CtaButton>
        </div>
      </Container>
    )
  }

  return (
    <Container className="pt-6 sm:pt-8 pb-20 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <BackButton
            fallbackHref={`/experiencias/${experience.id}/${expSlug}`}
            label="Voltar para detalhes"
          />
          <span className="text-zinc-300 dark:text-zinc-700 hidden sm:inline">
            /
          </span>
          <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400 truncate max-w-xs sm:max-w-md hidden sm:inline">
            Checkout de Reserva
          </span>
        </div>
      </div>

      <div className="space-y-1">
        <span className="text-xs font-black uppercase tracking-widest text-brand-primary block">
          Finalização do Pedido • Acesso VIP
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black tracking-tight uppercase text-zinc-900 dark:text-white">
          Revisar e Pagar
        </h1>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-2xl leading-relaxed">
          Garanta sua vaga exclusiva com curadoria de alto padrão, concierge
          dedicado e confirmação instantânea.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start w-full">
        <div className="lg:col-span-7 flex flex-col gap-6 w-full">
          <div className="rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] p-6 sm:p-7 space-y-6 shadow-xs">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                Forma de Pagamento
              </label>
              <div className="grid grid-cols-2 gap-2 bg-zinc-100 dark:bg-zinc-900 p-1.5 rounded-sm border border-zinc-200 dark:border-zinc-800">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("credit_card")}
                  className={cn(
                    "py-3 px-4 rounded-sm text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer",
                    paymentMethod === "credit_card"
                      ? "bg-white dark:bg-[#141416] text-brand-primary shadow-xs border border-zinc-200 dark:border-zinc-700"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                  )}
                >
                  <CreditCard className="w-4 h-4 shrink-0" />
                  <span>Cartão de Crédito</span>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("pix")}
                  className={cn(
                    "py-3 px-4 rounded-sm text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer relative",
                    paymentMethod === "pix"
                      ? "bg-white dark:bg-[#141416] text-brand-primary shadow-xs border border-zinc-200 dark:border-zinc-700"
                      : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                  )}
                >
                  <QrCode className="w-4 h-4 shrink-0" />
                  <span>PIX</span>
                  <span className="px-1.5 py-0.5 rounded-sm bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 text-[9px] font-black">
                    5% OFF
                  </span>
                </button>
              </div>
            </div>

            {paymentMethod === "credit_card" ? (
              <form onSubmit={handlePayment} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                    Número do Cartão
                  </label>
                  <Input
                    placeholder="0000 0000 0000 0000"
                    value={cardNumber}
                    onChange={(e) =>
                      setCardNumber(maskCardNumber(e.target.value))
                    }
                    startIcon={<CreditCard className="w-4 h-4" />}
                    disabled={isProcessing}
                    className="h-11"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                    Nome Impresso no Cartão
                  </label>
                  <Input
                    placeholder="NOME COMPLETO"
                    value={holderName}
                    onChange={(e) =>
                      setHolderName(e.target.value.toUpperCase())
                    }
                    className="h-11 uppercase"
                    disabled={isProcessing}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3.5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                      Validade
                    </label>
                    <Input
                      placeholder="MM/AA"
                      value={expirationDate}
                      onChange={(e) =>
                        setExpirationDate(maskCardExpiry(e.target.value))
                      }
                      disabled={isProcessing}
                      className="h-11"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                      CVV
                    </label>
                    <Input
                      placeholder="123"
                      value={cvv}
                      onChange={(e) => setCvv(maskCvv(e.target.value))}
                      disabled={isProcessing}
                      className="h-11"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                    CPF do Titular
                  </label>
                  <Input
                    placeholder="000.000.000-00"
                    value={holderCpf}
                    onChange={(e) => setHolderCpf(maskCpf(e.target.value))}
                    disabled={isProcessing}
                    className="h-11"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                    Parcelamento
                  </label>
                  <Select
                    value={installments}
                    onValueChange={setInstallments}
                    options={installmentOptions}
                    disabled={isProcessing}
                    size="md"
                    radius="sm"
                    className="h-11 rounded-sm border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white text-xs font-medium"
                  />
                </div>

                <div className="pt-2">
                  <div className="flex items-start gap-2.5">
                    <Checkbox
                      id="terms-check"
                      color="primary"
                      radius="sm"
                      checked={agreeTerms}
                      onCheckedChange={(checked) => setAgreeTerms(!!checked)}
                      className="mt-0.5"
                    />
                    <label
                      htmlFor="terms-check"
                      className="text-xs text-zinc-600 dark:text-zinc-400 cursor-pointer select-none leading-relaxed"
                    >
                      Declaro que li e concordo com os termos de cancelamento em
                      até 48h e as diretrizes do clube.
                    </label>
                  </div>
                </div>

                <div className="pt-3">
                  <CtaButton
                    type="submit"
                    variant="primary"
                    size="lg"
                    isFullWidth
                    disabled={isProcessing}
                    className="h-12 text-xs shadow-none hover:shadow-none"
                  >
                    <span>
                      {isProcessing
                        ? "Processando pagamento..."
                        : `Pagar ${formatBRL(totalAmount)}`}
                    </span>
                    {!isProcessing && <ArrowRight className="w-4 h-4 ml-2" />}
                  </CtaButton>
                </div>
              </form>
            ) : (
              <div className="space-y-5">
                <div className="p-5 rounded-sm bg-[#F1F1F1] dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-4 text-center">
                  <div className="w-12 h-12 rounded-sm bg-brand-primary/10 text-brand-primary flex items-center justify-center mx-auto">
                    <QrCode className="w-6 h-6" />
                  </div>

                  <div className="space-y-1">
                    <span className="text-sm font-bold uppercase tracking-tight text-zinc-900 dark:text-white block">
                      Pague via PIX com 5% de desconto
                    </span>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto">
                      Copie o código abaixo e utilize o aplicativo do seu banco
                      para efetuar o pagamento.
                    </p>
                  </div>

                  <div className="p-3 rounded-sm bg-white dark:bg-[#141416] border border-zinc-200 dark:border-zinc-800 text-left font-mono text-[11px] text-zinc-600 dark:text-zinc-300 break-all select-all">
                    {pixMockCode}
                  </div>

                  <CtaButton
                    type="button"
                    variant="secondary"
                    size="sm"
                    isFullWidth
                    onClick={handleCopyPix}
                    className="h-10 text-xs shadow-none hover:shadow-none"
                  >
                    {copiedPix ? (
                      <>
                        <Check className="w-3.5 h-3.5 mr-2 text-emerald-500" />
                        <span>Código Copiado!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 mr-2" />
                        <span>Copiar Código PIX</span>
                      </>
                    )}
                  </CtaButton>
                </div>

                <div className="pt-1">
                  <div className="flex items-start gap-2.5">
                    <Checkbox
                      id="terms-check-pix"
                      color="primary"
                      radius="sm"
                      checked={agreeTerms}
                      onCheckedChange={(checked) => setAgreeTerms(!!checked)}
                      className="mt-0.5"
                    />
                    <label
                      htmlFor="terms-check-pix"
                      className="text-xs text-zinc-600 dark:text-zinc-400 cursor-pointer select-none leading-relaxed"
                    >
                      Declaro que li e concordo com os termos de cancelamento em
                      até 48h e as diretrizes do clube.
                    </label>
                  </div>
                </div>

                <CtaButton
                  type="button"
                  variant="primary"
                  size="lg"
                  isFullWidth
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="h-12 text-xs shadow-none hover:shadow-none"
                >
                  <span>
                    {isProcessing
                      ? "Confirmando transação..."
                      : `Confirmar Pagamento de ${formatBRL(totalAmount)}`}
                  </span>
                  {!isProcessing && <ArrowRight className="w-4 h-4 ml-2" />}
                </CtaButton>
              </div>
            )}

            <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 text-xs text-zinc-500 dark:text-zinc-400 space-y-2">
              <p className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-primary shrink-0" />
                <span>
                  Ambiente seguro com criptografia de ponta a ponta para
                  membros.
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-zinc-400 shrink-0" />
                <span>
                  Cancelamento gratuito e estorno integral até 48h antes da
                  data.
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 w-full lg:sticky lg:top-24">
          <aside className="w-full flex flex-col gap-6 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] p-6 sm:p-7 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-4 h-4 text-brand-primary" />
                <h2 className="text-sm sm:text-base font-black text-zinc-900 dark:text-white font-heading tracking-tight uppercase">
                  Seu Carrinho
                </h2>
              </div>
              <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                1 experiência
              </span>
            </div>

            <div className="flex gap-4 items-start pb-4 border-b border-zinc-200 dark:border-zinc-800">
              <div className="relative w-20 h-20 rounded-sm overflow-hidden border border-zinc-200 dark:border-zinc-800 shrink-0 bg-zinc-950">
                {experience.image && (
                  <Image
                    src={experience.image}
                    alt={experience.title}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                )}
              </div>

              <div className="flex flex-col gap-1 flex-1 min-w-0">
                <h3 className="font-heading font-black text-xs sm:text-sm text-zinc-900 dark:text-white uppercase leading-snug line-clamp-2">
                  {experience.title}
                </h3>

                <p className="text-[11px] text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3 text-brand-primary shrink-0" />
                  <span>
                    {experience.date} • {experience.place}
                  </span>
                </p>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                    Qtd: 1 vaga VIP
                  </span>
                  <span className="text-xs font-bold text-zinc-900 dark:text-white font-heading">
                    {formatBRL(experience.price)}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2.5">
              <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary block">
                Incluso nesta experiência:
              </span>
              <ul className="space-y-2 text-xs text-zinc-600 dark:text-zinc-300">
                {experience.includes.slice(0, 4).map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-brand-primary shrink-0 mt-0.5" />
                    <span className="line-clamp-1">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-2 pt-4 border-t border-zinc-200 dark:border-zinc-800">
              <div className="flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-400">
                <span>Valor da experiência</span>
                <span className="font-semibold text-zinc-900 dark:text-white">
                  {formatBRL(experience.price)}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-400">
                <span>Taxa de curadoria & concierge</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                  Isenta (Membro)
                </span>
              </div>

              {isPix && (
                <div className="flex items-center justify-between text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                  <span>Desconto no PIX (5% OFF)</span>
                  <span>- {formatBRL(discountAmount)}</span>
                </div>
              )}

              <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 flex items-baseline justify-between">
                <div className="flex flex-col">
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                    Total do pedido
                  </span>
                  <span className="text-[10px] text-zinc-500 dark:text-zinc-400">
                    {isPix
                      ? "Pagamento à vista com PIX"
                      : "Pagamento no cartão"}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-2xl sm:text-3xl font-black font-heading text-brand-primary leading-none">
                    {formatBRL(totalAmount)}
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </Container>
  )
}
