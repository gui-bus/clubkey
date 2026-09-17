"use client"

import * as React from "react"

import Image from "next/image"
import Link from "next/link"

import {
  MemberStayReservation,
  formatBRL,
  getStaySlug,
} from "@/src/data/portalData"
import {
  ArrowRight,
  Bed,
  Buildings,
  Calendar,
  Check,
  Clock,
  Copy,
  ForkKnife,
  MapPin,
  Ticket,
  Users,
  XCircle,
} from "@phosphor-icons/react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/src/components/ui/alertDialog/alertDialog"
import { toast } from "@/src/components/ui/toast/toast"

import { CtaButton } from "@/src/components/common/ctaButton"
import { GlassBadge } from "@/src/components/portal/GlassBadge"

import { cn } from "@/src/lib/utils"

export interface ReservationCardProps {
  stay: MemberStayReservation
  onCancel?: (id: string, name: string) => void
  className?: string
}

export function ReservationCard({
  stay,
  onCancel,
  className,
}: ReservationCardProps): React.JSX.Element {
  const [copied, setCopied] = React.useState(false)

  const handleCopyVoucher = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    navigator.clipboard.writeText(stay.confirmationCode)
    setCopied(true)
    toast.success("Código copiado!", {
      description: `Código do voucher ${stay.confirmationCode} copiado para a área de transferência.`,
    })
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div
      className={cn(
        "group/card relative rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] overflow-hidden hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors duration-200 shadow-xs",
        className
      )}
    >
      <Buildings className="absolute -right-6 -bottom-6 w-44 h-44 text-zinc-900/[0.03] dark:text-white/[0.03] pointer-events-none select-none transition-transform duration-500 group-hover/card:scale-110" />

      <div className="flex flex-col md:flex-row items-stretch">
        <div className="relative w-full md:w-80 lg:w-96 h-56 md:h-auto min-h-[240px] shrink-0 overflow-hidden bg-zinc-950">
          <Image
            src={stay.image}
            alt={stay.stayName}
            fill
            className="object-cover opacity-90 group-hover/card:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />

          <div className="absolute top-3.5 left-3.5 z-10">
            <GlassBadge
              icon={<Check className="w-3 h-3 text-emerald-400 stroke-[2.5]" />}
            >
              Confirmada
            </GlassBadge>
          </div>

          <div className="absolute bottom-3.5 left-3.5 right-3.5 z-10">
            <div className="flex items-center gap-3 p-2.5 sm:p-3 rounded-sm bg-black/60 backdrop-blur-md border border-white/15 text-white">
              <div className="flex flex-col items-center justify-center min-w-11 px-2.5 py-1 rounded-sm bg-brand-primary text-white text-center shrink-0">
                <span className="text-lg font-black font-heading leading-none text-white">
                  {stay.nights}
                </span>
                <span className="text-[9px] font-black uppercase tracking-wider leading-none mt-0.5 text-white">
                  {stay.nights === 1 ? "noite" : "noites"}
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-white uppercase tracking-wider truncate">
                  Check-in: {stay.checkIn.split(",")[0]}
                </p>
                <p className="text-[11px] text-zinc-300 flex items-center gap-1 mt-0.5 truncate">
                  <Calendar className="w-3 h-3 text-brand-primary shrink-0" />
                  <span>
                    {stay.checkIn} — {stay.checkOut}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between gap-5 min-w-0 relative z-10">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <button
                type="button"
                onClick={handleCopyVoucher}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-brand-primary/10 text-brand-primary hover:bg-brand-primary/15 transition-colors text-[11px] font-mono font-bold uppercase tracking-wider cursor-pointer"
                title="Clique para copiar o código"
              >
                <Ticket className="w-3.5 h-3.5 shrink-0" />
                <span>VOUCHER {stay.confirmationCode}</span>
                <Copy className="w-3 h-3 opacity-60 ml-0.5" />
              </button>

              <div className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
                <MapPin className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                <span>{stay.location}</span>
              </div>
            </div>

            <div className="space-y-1">
              <Link
                href={`/hospedagens/minhas-hospedagens/${stay.id}/${getStaySlug(stay)}`}
                className="block"
              >
                <h3 className="text-xl sm:text-2xl font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white group-hover/card:text-brand-primary transition-colors leading-snug">
                  {stay.stayName}
                </h3>
              </Link>
              <p className="text-xs sm:text-sm font-medium text-zinc-600 dark:text-zinc-300 flex items-center gap-1.5">
                <Bed className="w-4 h-4 text-brand-primary shrink-0" />
                <span>{stay.roomType}</span>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-[#F1F1F1] dark:bg-zinc-800/80 text-[11px] font-medium text-zinc-700 dark:text-zinc-300">
                <Users className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                <span>{stay.guests} hóspedes</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-[#F1F1F1] dark:bg-zinc-800/80 text-[11px] font-medium text-zinc-700 dark:text-zinc-300">
                <Clock className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                <span>Check-in 15h00 • Out 12h00</span>
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm bg-brand-primary/5 border border-brand-primary/15 text-[11px] font-semibold text-brand-primary">
                <ForkKnife className="w-3.5 h-3.5 shrink-0" />
                <span>Café da manhã incluso</span>
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-0.5">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-zinc-400 dark:text-zinc-500 block">
                Valor Total da Reserva
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-xl sm:text-2xl font-heading font-black text-zinc-900 dark:text-white">
                  {formatBRL(stay.totalPrice)}
                </span>
                <span className="text-[10px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-sm">
                  Benefício Aplicado
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {onCancel && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <button
                      type="button"
                      className="text-xs font-semibold text-zinc-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors cursor-pointer flex items-center justify-center gap-1.5 py-2 px-2.5 rounded-sm hover:bg-rose-500/5"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Cancelar</span>
                    </button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Cancelar reserva em {stay.stayName}?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Tem certeza que deseja solicitar o cancelamento desta
                        reserva ({stay.roomType} • {stay.checkIn})? Nossa equipe
                        de atendimento será notificada para o processo de
                        estorno.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Manter reserva</AlertDialogCancel>
                      <AlertDialogAction
                        color="danger"
                        onClick={() => onCancel(stay.id, stay.stayName)}
                      >
                        Confirmar cancelamento
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}

              <CtaButton
                href={`/hospedagens/minhas-hospedagens/${stay.id}/${getStaySlug(stay)}`}
                variant="primary"
                size="xs"
                className="w-full sm:w-auto px-4 h-9 text-[11px] font-bold uppercase tracking-wider whitespace-nowrap shadow-none hover:shadow-none shrink-0"
                textClassName="whitespace-nowrap"
              >
                <ArrowRight className="w-3.5 h-3.5 mr-1.5 shrink-0" />
                <span>Acessar voucher</span>
              </CtaButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
