"use client"

import * as React from "react"

import Image from "next/image"
import { useQueryState, parseAsInteger } from "nuqs"

import { BenefitItem, getInitials } from "@/src/data/portalData"
import {
  ArrowRight,
  Check,
  Copy,
  Gift,
  ShieldCheck,
} from "@phosphor-icons/react"

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/src/components/ui/dialog/dialog"
import { toast } from "@/src/components/ui/toast/toast"

import { CtaButton } from "@/src/components/common/ctaButton"
import { DiscountRibbon } from "@/src/components/common/discountRibbon"

interface BenefitCardProps {
  benefit: BenefitItem
}

export function BenefitCard({ benefit }: BenefitCardProps): React.JSX.Element {
  const [activeBenefitId, setActiveBenefitId] = useQueryState(
    "beneficio",
    parseAsInteger.withOptions({ shallow: true })
  )
  const [copied, setCopied] = React.useState(false)

  const isOpen = activeBenefitId === benefit.id

  const promoCode = `KEY-${benefit.partner
    .replace(/[^a-zA-Z0-9]/g, "")
    .toUpperCase()
    .slice(0, 6)}-2026`

  const handleCopyCode = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(promoCode)
      setCopied(true)
      toast.success(`Código ${promoCode} copiado com sucesso!`)
      setTimeout(() => setCopied(false), 2500)
    }
  }

  return (
    <>
      <div
        onClick={() => setActiveBenefitId(benefit.id)}
        className="group/card flex flex-col justify-between rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] overflow-hidden hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors duration-200 cursor-pointer"
      >
        <div>
          <div className="relative h-44 w-full overflow-hidden bg-zinc-950">
            {benefit.image ? (
              <Image
                src={benefit.image}
                alt={benefit.partner}
                fill
                className="object-cover group-hover/card:scale-105 transition-transform duration-500 opacity-90"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-zinc-950 flex items-center justify-center font-heading font-black text-3xl text-zinc-700">
                {getInitials(benefit.partner)}
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

            <DiscountRibbon>{benefit.discount}</DiscountRibbon>
          </div>

          <div className="p-5 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-brand-primary block">
              {benefit.category}
            </span>

            <h3 className="text-base font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white group-hover/card:text-brand-primary transition-colors line-clamp-1">
              {benefit.partner}
            </h3>

            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-2">
              {benefit.desc}
            </p>
          </div>
        </div>

        <div className="px-5 py-3.5 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between gap-3 bg-[#F1F1F1]/50 dark:bg-zinc-900/30">
          <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-brand-primary shrink-0" />
            <span>Membro VIP</span>
          </span>

          <CtaButton
            type="button"
            variant="primary"
            size="xs"
            onClick={(e) => {
              e.stopPropagation()
              setActiveBenefitId(benefit.id)
            }}
            className="px-4 h-9 text-[11px] font-bold uppercase tracking-wider whitespace-nowrap shadow-none hover:shadow-none shrink-0"
            textClassName="whitespace-nowrap"
          >
            <span>Resgatar</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1.5 shrink-0" />
          </CtaButton>
        </div>
      </div>

      <Dialog
        open={isOpen}
        onOpenChange={(open) => {
          if (!open) {
            setActiveBenefitId(null)
          }
        }}
      >
        <DialogContent
          size="md"
          className="p-0 overflow-hidden bg-white dark:bg-[#141416] border-0 shadow-2xl rounded-sm"
        >
          <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-zinc-950">
            {benefit.image && (
              <Image
                src={benefit.image}
                alt={benefit.partner}
                fill
                className="object-cover opacity-80"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

            <DiscountRibbon>{benefit.discount}</DiscountRibbon>

            <div className="absolute bottom-4 left-4 right-4 z-10">
              <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary block mb-0.5">
                {benefit.category}
              </span>
              <DialogTitle className="text-2xl font-heading font-black uppercase tracking-tight text-white">
                {benefit.partner}
              </DialogTitle>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="space-y-1.5">
              <span className="text-xs font-black uppercase tracking-widest text-zinc-900 dark:text-white block">
                Sobre a parceria
              </span>
              <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-normal">
                {benefit.desc}
              </p>
            </div>

            <div className="p-4 rounded-sm bg-[#F1F1F1] dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary">
                  Código de Desconto VIP
                </span>
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">
                  Uso Exclusivo
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex-1 px-3.5 py-2.5 rounded-sm bg-white dark:bg-[#141416] border border-zinc-200 dark:border-zinc-800 font-mono text-xs font-bold text-zinc-900 dark:text-white select-all truncate">
                  {promoCode}
                </div>

                <CtaButton
                  type="button"
                  variant={copied ? "secondary" : "primary"}
                  size="sm"
                  onClick={handleCopyCode}
                  className="h-10 text-xs shadow-none hover:shadow-none shrink-0"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 mr-1.5 text-emerald-500 shrink-0" />
                      <span>Copiado!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 mr-1.5 shrink-0" />
                      <span>Copiar</span>
                    </>
                  )}
                </CtaButton>
              </div>
            </div>

            <div className="space-y-2.5 pt-2 border-t border-zinc-100 dark:border-zinc-800 text-xs text-zinc-500 dark:text-zinc-400">
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                <span>
                  Apresente seu código ou sua Key digital de membro no momento
                  do atendimento.
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Gift className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                <span>
                  Condição válida por tempo indeterminado enquanto sua anuidade
                  estiver ativa.
                </span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
