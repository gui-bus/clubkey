"use client"

import * as React from "react"
import Image from "next/image"
import { ShoppingCart } from "lucide-react"

import { brandConfig } from "@/src/config/brand.config"

export type PaymentMethod = "credit_card" | "pix"

export interface SubscriptionCartCardProps {
  paymentMethod: PaymentMethod
}

export function SubscriptionCartCard({
  paymentMethod,
}: SubscriptionCartCardProps): React.JSX.Element {
  const isAnnual = paymentMethod === "pix"

  return (
    <aside className="w-full flex flex-col gap-6 sticky top-24">
      <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <ShoppingCart className="w-5 h-5 text-brand-primary" />
          <h2 className="text-base sm:text-lg font-black text-zinc-900 dark:text-white font-heading tracking-tight uppercase">
            Seu Carrinho
          </h2>
        </div>
        <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
          1 item
        </span>
      </div>

      <div className="flex gap-4 items-center pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div className="relative w-20 h-20 rounded-sm overflow-hidden border border-zinc-200 dark:border-zinc-800 shrink-0 bg-zinc-100 dark:bg-zinc-800">
          <Image
            src="/utils/subscription/product_card.webp"
            alt={`${brandConfig.name} Pass`}
            fill
            className="object-cover object-center"
            sizes="80px"
          />
        </div>

        <div className="flex flex-col gap-1 flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-heading font-black text-xs sm:text-sm text-zinc-900 dark:text-white uppercase leading-snug truncate">
              {brandConfig.name} Membership Pass
            </h3>
            <span className="text-xs font-bold text-zinc-900 dark:text-white shrink-0 font-heading">
              {isAnnual ? "R$ 214,92" : "R$ 19,90"}
            </span>
          </div>

          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-light">
            {isAnnual ? "Assinatura Anual (10% OFF)" : "Assinatura Mensal"}
          </p>

          <div className="flex items-center gap-2 pt-0.5">
            <span className="text-[10px] font-bold text-zinc-500 dark:text-zinc-400">
              Qtd: 1
            </span>
            {isAnnual && (
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
                • 10% de economia no plano anual
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-3 py-1">
        <span className="text-[11px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          Incluso no seu passe:
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-3">
          <div className="flex items-center gap-2.5">
            <Image
              src="/utils/icons/check.webp"
              alt="Check"
              width={22}
              height={22}
              className="shrink-0"
            />
            <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200">
              +4.500 acomodações
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <Image
              src="/utils/icons/check.webp"
              alt="Check"
              width={22}
              height={22}
              className="shrink-0"
            />
            <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200">
              Até 60% de desconto
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <Image
              src="/utils/icons/check.webp"
              alt="Check"
              width={22}
              height={22}
              className="shrink-0"
            />
            <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200">
              Tarifas Last Minute
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <Image
              src="/utils/icons/check.webp"
              alt="Check"
              width={22}
              height={22}
              className="shrink-0"
            />
            <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200">
              Concierge prioritário
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2.5 pt-4 border-t border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-400">
          <span>Subtotal</span>
          <span className="font-semibold text-zinc-900 dark:text-white">
            {isAnnual ? "R$ 238,80" : "R$ 19,90"}
          </span>
        </div>

        {isAnnual ? (
          <div className="flex items-center justify-between text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
            <span>Desconto no PIX (10% OFF)</span>
            <span>- R$ 23,88</span>
          </div>
        ) : (
          <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
            <span>Cobrança</span>
            <span>Mensal recorrente</span>
          </div>
        )}

        <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 flex items-baseline justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
              Total do pedido
            </span>
            <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-light">
              {isAnnual ? "Pagamento único à vista" : "Cobrança mensal no cartão"}
            </span>
          </div>
          <div className="text-right">
            <div className="text-2xl sm:text-3xl font-black font-heading text-brand-primary">
              {isAnnual ? "R$ 214,92" : "R$ 19,90"}
            </div>
            {isAnnual && (
              <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                Equivalente a R$ 17,91/mês
              </div>
            )}
          </div>
        </div>
      </div>
    </aside>
  )
}
