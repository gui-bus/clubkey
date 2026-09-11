"use client"

import * as React from "react"
import Link from "next/link"
import { CheckCircle2, Home, KeyRound } from "lucide-react"

import { Container } from "@/src/components/common/container"
import { CtaButton } from "@/src/components/common/ctaButton"
import { FloatingCta } from "@/src/components/landing/FloatingCta"
import { Footer } from "@/src/components/landing/Footer"
import { Navbar } from "@/src/components/landing/Navbar"
import { TopBanner } from "@/src/components/landing/TopBanner"
import {
  type PaymentMethod,
  type SubscriptionUser,
  SubscriptionForm,
} from "@/src/components/subscription/subscriptionForm"
import { SubscriptionCartCard } from "@/src/components/subscription/subscriptionCartCard"
import { brandConfig } from "@/src/config/brand.config"

export default function SubscriptionPage(): React.JSX.Element {
  const [user, setUser] = React.useState<SubscriptionUser | null>(null)
  const [paymentMethod, setPaymentMethod] =
    React.useState<PaymentMethod>("credit_card")
  const [isSuccess, setIsSuccess] = React.useState(false)
  const [successDetails, setSuccessDetails] = React.useState<{
    paymentType: PaymentMethod
    total: string
  }>({
    paymentType: "credit_card",
    total: "R$ 19,90/mês",
  })

  const handleLogout = () => {
    setUser(null)
  }

  const handlePaymentSuccess = (paymentType: PaymentMethod, total: string) => {
    setSuccessDetails({ paymentType, total })
    setIsSuccess(true)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <main className="w-full bg-[#F1F1F1] dark:bg-[#161616] text-[#111111] dark:text-white flex flex-col font-sans selection:bg-brand-primary/20 selection:text-brand-primary">
      <TopBanner />
      <Navbar isTransparent={false} />

      <section className="flex-1 w-full py-10 sm:py-16 md:py-20">
        <Container>
          {isSuccess ? (
            <div className="max-w-xl mx-auto bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-sm p-6 sm:p-10 text-center flex flex-col items-center gap-6 shadow-sm animate-in fade-in-0 duration-300">
              <div className="w-16 h-16 rounded-sm bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-2">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-brand-primary/10 text-brand-primary text-xs font-bold uppercase tracking-wider">
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>Assinatura Ativada</span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white font-heading uppercase tracking-tight">
                  Parabéns, {user?.name || "Membro"}!
                </h1>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
                  Sua Key de membro {brandConfig.name} está ativa. Você já tem acesso imediato a todas as tarifas com até 60% de desconto.
                </p>
              </div>

              <div className="w-full p-4 rounded-sm bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200 dark:border-zinc-800 flex flex-col gap-2.5 text-left text-xs">
                <div className="flex justify-between items-center text-zinc-600 dark:text-zinc-400">
                  <span>Plano escolhido:</span>
                  <span className="font-bold text-zinc-900 dark:text-white">
                    {successDetails.paymentType === "pix"
                      ? "Anual (PIX - 10% OFF)"
                      : "Mensal (Cartão de Crédito)"}
                  </span>
                </div>
                <div className="flex justify-between items-center text-zinc-600 dark:text-zinc-400">
                  <span>Valor:</span>
                  <span className="font-bold text-brand-primary font-heading text-sm">
                    {successDetails.total}
                  </span>
                </div>
                <div className="flex justify-between items-center text-zinc-600 dark:text-zinc-400">
                  <span>E-mail cadastrado:</span>
                  <span className="font-medium text-zinc-900 dark:text-white">
                    {user?.email}
                  </span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full pt-2">
                <CtaButton
                  href="/rooms"
                  className="flex-1 py-3.5"
                >
                  <KeyRound className="w-4 h-4 mr-2" />
                  <span>Explorar Hospedagens</span>
                </CtaButton>

                <Link
                  href="/"
                  className="py-3.5 px-6 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                >
                  <Home className="w-4 h-4" />
                  <span>Início</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex flex-col gap-8 w-full">
              <div className="text-left">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-primary">
                  Associação {brandConfig.name}
                </span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-zinc-900 dark:text-white font-heading tracking-tight uppercase mt-1">
                  Seja um associado
                </h1>
                <p className="mt-2 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 font-light leading-relaxed max-w-2xl">
                  Garanta acesso imediato a descontos exclusivos de até 60% em mais de 4.500 hotéis e acomodações premium.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start w-full">
                <div className="lg:col-span-7 xl:col-span-7 flex flex-col gap-6 w-full lg:pr-10 lg:border-r lg:border-zinc-200 dark:lg:border-zinc-800">
                  <SubscriptionForm
                    user={user}
                    onLogout={handleLogout}
                    paymentMethod={paymentMethod}
                    onPaymentMethodChange={setPaymentMethod}
                    onSuccess={handlePaymentSuccess}
                  />
                </div>

                <div className="lg:col-span-5 xl:col-span-5 w-full">
                  <SubscriptionCartCard paymentMethod={paymentMethod} />
                </div>
              </div>
            </div>
          )}
        </Container>
      </section>

      <Footer />
      <FloatingCta />
    </main>
  )
}
