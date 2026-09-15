"use client"

import * as React from "react"

import Image from "next/image"
import Link from "next/link"

import { formatBRL } from "@/src/data/portalData"
import { usePortalStore } from "@/src/store/usePortalStore"
import {
  Calendar,
  CheckCircle2,
  CreditCard,
  Download,
  FileText,
  Phone,
  Receipt,
  ShieldCheck,
} from "lucide-react"

import { Badge } from "@/src/components/ui/badge/badge"
import { Button } from "@/src/components/ui/button/button"
import { toast } from "@/src/components/ui/toast/toast"

import { Container } from "@/src/components/common/container"
import { BackButton } from "@/src/components/portal/BackButton"

export default function MinhaAssinaturaPage(): React.JSX.Element {
  const { memberSubscription, userProfile } = usePortalStore()

  const handleUpdatePayment = () => {
    toast.info("Alteração de método de pagamento", {
      description:
        "Nosso concierge enviará o link seguro para atualização do seu cartão.",
    })
  }

  const handleDownloadInvoice = (invoiceId: string) => {
    toast.success(`Fatura ${invoiceId} baixada!`, {
      description: "O comprovante fiscal em PDF foi gerado.",
    })
  }

  const handleContactConcierge = () => {
    toast.success("Concierge VIP acionado!", {
      description:
        "Em instantes você receberá um contato direto no WhatsApp sobre sua assinatura.",
    })
  }

  return (
    <div className="w-full flex flex-col">
      <section
        id="hero"
        className="relative z-30 w-full bg-[#0D0D0D] text-white min-h-[460px] md:min-h-[500px] flex flex-col justify-center"
      >
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
          <Image
            src="/utils/banners/img_02.png"
            alt="Minha Assinatura"
            fill
            priority
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-zinc-50 dark:from-[#161616]/85 dark:via-[#161616]/65 dark:to-[#0D0D0D] z-10" />
        </div>

        <Container className="relative z-20 pt-36 pb-14 md:pt-44 md:pb-16 flex flex-col justify-center items-center text-center">
          <div className="max-w-4xl flex flex-col items-center text-center w-full">
            <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-brand-primary block mb-3">
              Membro Titular • Gestão de Plano
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black uppercase tracking-tight text-white leading-[1.05] mb-4 font-heading drop-shadow-md">
              Minha <span className="text-brand-primary">Assinatura</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-zinc-200 font-light leading-relaxed drop-shadow-sm max-w-2xl">
              Gerencie os detalhes do seu plano, forma de pagamento cadastrada e
              histórico financeiro.
            </p>
          </div>
        </Container>
      </section>

      <Container className="relative z-10 flex-1 py-10 space-y-8 bg-[#F1F1F1] dark:bg-[#161616]">
        <BackButton fallbackHref="/perfil" label="Voltar para Meu Perfil" />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-8">
            <div className="rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] p-6 sm:p-8 space-y-6 shadow-xs">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-zinc-100 dark:border-zinc-800">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-2xl font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white">
                      {memberSubscription.planName}
                    </h2>
                    <Badge
                      color="success"
                      variant="flat"
                      size="sm"
                      radius="sm"
                      startContent={<CheckCircle2 className="w-3 h-3" />}
                      className="font-bold uppercase tracking-wider"
                    >
                      Assinatura Ativa
                    </Badge>
                  </div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Titular:{" "}
                    <strong className="text-zinc-900 dark:text-white">
                      {userProfile.name}
                    </strong>{" "}
                    • {userProfile.email}
                  </p>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-2xl font-heading font-black text-brand-primary block leading-none">
                    {formatBRL(memberSubscription.priceAnnual)}
                    <span className="text-xs font-semibold text-zinc-400">
                      /ano
                    </span>
                  </span>
                  <span className="text-[11px] text-zinc-400">
                    Equivalente a {formatBRL(memberSubscription.priceMonthly)}
                    /mês
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary block">
                    Próxima Renovação
                  </span>
                  <p className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-brand-primary shrink-0" />
                    {memberSubscription.renewalDate}
                  </p>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                    Renovação anual automática programada
                  </p>
                </div>

                <div className="p-4 rounded-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 space-y-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary block">
                    Método de Cobrança
                  </span>
                  <p className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-brand-primary shrink-0" />
                    {memberSubscription.paymentMethod.brand} ••••{" "}
                    {memberSubscription.paymentMethod.last4}
                  </p>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                    Expira em {memberSubscription.paymentMethod.expiry}
                  </p>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                <h3 className="text-sm font-heading font-black tracking-tight uppercase text-zinc-900 dark:text-white">
                  Benefícios e acessos inclusos no seu plano
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {memberSubscription.features.map((feature, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 text-xs text-zinc-700 dark:text-zinc-300"
                    >
                      <CheckCircle2 className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                      <span className="leading-snug">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] p-6 sm:p-8 space-y-5 shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-800">
                <div>
                  <h3 className="text-base font-heading font-black tracking-tight uppercase text-zinc-900 dark:text-white flex items-center gap-2">
                    <Receipt className="w-4 h-4 text-brand-primary" />
                    Histórico de Faturas & Recibos
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                    Comprovantes fiscais das suas anuidades e renovações
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {memberSubscription.invoices.map((inv) => (
                  <div
                    key={inv.id}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-sm border border-zinc-100 dark:border-zinc-800/80 bg-zinc-50/50 dark:bg-zinc-900/40 gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-sm bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0">
                        <FileText className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-tight text-zinc-900 dark:text-white">
                          Fatura Anuidade ({inv.id})
                        </p>
                        <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                          Data de pagamento: {inv.date}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                      <div className="text-left sm:text-right">
                        <span className="text-xs font-bold text-zinc-900 dark:text-white block">
                          {formatBRL(inv.amount)}
                        </span>
                        <Badge
                          color="success"
                          variant="flat"
                          size="sm"
                          radius="sm"
                          className="text-[9px] font-bold uppercase"
                        >
                          Pago
                        </Badge>
                      </div>

                      <Button
                        type="button"
                        size="sm"
                        radius="sm"
                        variant="bordered"
                        onClick={() => handleDownloadInvoice(inv.id)}
                        startContent={<Download className="w-3.5 h-3.5" />}
                        className="text-xs font-bold uppercase tracking-wider shrink-0"
                      >
                        PDF
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="sticky top-24 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] p-6 space-y-6 shadow-xs">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary block">
                Atendimento Exclusivo
              </span>
              <h3 className="text-base font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white">
                Suporte de Membership
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Precisa alterar titularidade, dados de faturamento corporativo
                ou solicitar nota fiscal especial? Fale com seu concierge
                dedicado.
              </p>
            </div>

            <div className="space-y-2.5">
              <Button
                type="button"
                color="primary"
                variant="default"
                radius="sm"
                onClick={handleContactConcierge}
                startContent={<Phone className="w-4 h-4" />}
                className="w-full h-11 text-xs font-black uppercase tracking-wider"
              >
                Falar com Concierge
              </Button>

              <Button
                type="button"
                color="default"
                variant="bordered"
                radius="sm"
                onClick={handleUpdatePayment}
                startContent={
                  <CreditCard className="w-4 h-4 text-brand-primary" />
                }
                className="w-full h-10 text-xs font-bold uppercase tracking-wider"
              >
                Alterar Cartão de Crédito
              </Button>
            </div>

            <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Garantia de Confidencialidade</span>
              </div>
              <p className="text-[11px] text-zinc-400 leading-relaxed">
                Todos os seus dados financeiros e cadastrais são criptografados
                sob padrões bancários de segurança.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}
