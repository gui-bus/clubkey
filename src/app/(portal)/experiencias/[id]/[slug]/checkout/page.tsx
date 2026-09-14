"use client"

import * as React from "react"
import Link from "next/link"
import { useParams, notFound } from "next/navigation"
import {
  CreditCard,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  MapPin,
  ArrowRight
} from "lucide-react"

import { EXPERIENCES, formatBRL, getExperienceSlug } from "@/src/data/portalData"
import { usePortalStore } from "@/src/store/usePortalStore"
import { BackButton } from "@/src/components/portal/BackButton"
import { Button } from "@/src/components/ui/button/button"
import { toast } from "@/src/components/ui/toast/toast"
import { Container } from "@/src/components/common/container"

export default function ExperienceCheckoutPage(): React.JSX.Element {
  const params = useParams()
  const idParam = Array.isArray(params?.id) ? params.id[0] : params?.id
  const expId = Number(idParam)
  const experience = EXPERIENCES.find((e) => e.id === expId)

  if (!experience) {
    notFound()
  }

  const expSlug = getExperienceSlug(experience)
  const { buyExperience, boughtExperiences } = usePortalStore()
  const isAlreadyBought = !!boughtExperiences[experience.id]

  const [isSuccess, setIsSuccess] = React.useState(isAlreadyBought)
  const [isProcessing, setIsProcessing] = React.useState(false)

  const feePct = 7
  const serviceFee = Math.round((experience.price * feePct) / 100)
  const totalAmount = experience.price + serviceFee

  const handlePayment = () => {
    setIsProcessing(true)
    setTimeout(() => {
      buyExperience(experience.id)
      setIsProcessing(false)
      setIsSuccess(true)
      toast.success("Pagamento aprovado com sucesso!", {
        description: `Vaga garantida para ${experience.title}.`,
      })
    }, 700)
  }

  if (isSuccess) {
    return (
      <Container className="pt-8 pb-16 max-w-2xl mx-auto py-12 text-center space-y-6">
        <div className="w-16 h-16 rounded-sm bg-brand-primary/10 text-brand-primary border border-brand-primary/30 flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-heading font-black tracking-tight uppercase text-zinc-900 dark:text-white">
            Vaga confirmada com sucesso!
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Você garantiu seu acesso para <span className="font-bold text-zinc-900 dark:text-white">{experience.title}</span>.
          </p>
        </div>

        <div className="p-6 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] text-left space-y-3 shadow-xs">
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-500">Valor pago</span>
            <span className="font-bold text-zinc-900 dark:text-white">
              {formatBRL(totalAmount)}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-500">Data</span>
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">
              {experience.date}
            </span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-zinc-500">Local</span>
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">
              {experience.place}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 pt-2">
          <Link
            href={`/experiencias/${experience.id}/${expSlug}`}
            className="px-6 py-3 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200 hover:border-brand-primary transition-colors shadow-xs"
          >
            Ver experiência
          </Link>
          <Link
            href="/experiencias"
            className="px-6 py-3 rounded-sm bg-brand-primary hover:bg-brand-primary/90 text-white text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-xs transition-colors"
          >
            <span>Explorar outras</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </Container>
    )
  }

  return (
    <Container className="pt-6 sm:pt-8 pb-16 space-y-8">
      <BackButton
        fallbackHref={`/experiencias/${experience.id}/${expSlug}`}
        label="Voltar para detalhes"
      />

      <div className="space-y-1">
        <span className="text-xs font-black uppercase tracking-widest text-brand-primary block">
          Finalização
        </span>
        <h1 className="text-3xl sm:text-4xl font-heading font-black tracking-tight uppercase text-zinc-900 dark:text-white">
          Revisar e pagar
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="space-y-2 pb-6 border-b border-zinc-100 dark:border-zinc-800">
              <h2 className="text-xl font-heading font-black tracking-tight uppercase text-zinc-900 dark:text-white">
                {experience.title}
              </h2>
              <div className="flex items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400 flex-wrap">
                <span className="flex items-center gap-1.5 font-medium">
                  <Calendar className="w-3.5 h-3.5 text-brand-primary" />
                  {experience.date}
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-brand-primary" />
                  {experience.place}
                </span>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                <span>Valor da experiência</span>
                <span className="font-semibold text-zinc-900 dark:text-white">
                  {formatBRL(experience.price)}
                </span>
              </div>
              <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                <span>Taxa de serviço ({feePct}%)</span>
                <span className="font-semibold text-zinc-900 dark:text-white">
                  {formatBRL(serviceFee)}
                </span>
              </div>
              <div className="flex justify-between items-baseline pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <span className="text-base font-bold uppercase tracking-wide text-zinc-900 dark:text-white">
                  Total
                </span>
                <span className="text-3xl font-heading font-black text-brand-primary">
                  {formatBRL(totalAmount)}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="sticky top-24 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="space-y-3">
            <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary block">
              Forma de pagamento
            </span>
            <div className="flex items-center justify-between p-4 rounded-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-7 rounded-sm bg-brand-primary text-white flex items-center justify-center">
                  <CreditCard className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-zinc-900 dark:text-white">
                  Cartão terminado em 4417
                </span>
              </div>
              <button
                type="button"
                className="text-xs font-bold uppercase tracking-wider text-brand-primary hover:underline cursor-pointer"
              >
                Trocar
              </button>
            </div>
          </div>

          <Button
            type="button"
            color="primary"
            radius="sm"
            isLoading={isProcessing}
            onClick={handlePayment}
            endContent={!isProcessing ? <ArrowRight className="w-4 h-4" /> : undefined}
            className="w-full h-12 text-xs font-black uppercase tracking-wider shadow-xs"
          >
            Pagar {formatBRL(totalAmount)}
          </Button>

          <p className="text-xs text-center text-zinc-400 flex items-center justify-center gap-1.5 leading-relaxed">
            <ShieldCheck className="w-4 h-4 text-brand-primary shrink-0" />
            Ambiente seguro para membros ClubKey.
          </p>
        </div>
      </div>
    </Container>
  )
}
