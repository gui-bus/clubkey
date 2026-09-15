"use client"

import * as React from "react"

import Image from "next/image"
import Link from "next/link"

import { formatBRL, getStaySlug } from "@/src/data/portalData"
import { usePortalStore } from "@/src/store/usePortalStore"
import {
  ArrowRight,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  ShieldCheck,
  Ticket,
  Users,
  XCircle,
} from "lucide-react"

import { Badge } from "@/src/components/ui/badge/badge"
import { Button } from "@/src/components/ui/button/button"
import { toast } from "@/src/components/ui/toast/toast"

import { Container } from "@/src/components/common/container"

export default function MinhasHospedagensPage(): React.JSX.Element {
  const { memberStays, cancelStay, userProfile } = usePortalStore()
  const [selectedVoucher, setSelectedVoucher] = React.useState<string | null>(
    null
  )

  const activeReservationsCount = memberStays.length
  const totalNights = memberStays.reduce((acc, curr) => acc + curr.nights, 0)

  const handleCancel = (id: string, name: string) => {
    cancelStay(id)
    toast.info(`Reserva em ${name} cancelada.`, {
      description: "Nossa equipe de concierge foi notificada para o estorno.",
    })
  }

  const handleContactConcierge = (stayName: string) => {
    toast.success(`Concierge VIP acionado para ${stayName}!`, {
      description: "Em instantes você receberá um contato direto no WhatsApp.",
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
            src="/utils/banners/img_01.png"
            alt="Minhas Hospedagens"
            fill
            priority
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-zinc-50 dark:from-[#161616]/85 dark:via-[#161616]/65 dark:to-[#0D0D0D] z-10" />
        </div>

        <Container className="relative z-20 pt-36 pb-14 md:pt-44 md:pb-16 flex flex-col justify-center items-center text-center">
          <div className="max-w-4xl flex flex-col items-center text-center w-full">
            <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-brand-primary block mb-3">
              Minhas Reservas • Benefício de Membro
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black uppercase tracking-tight text-white leading-[1.05] mb-4 font-heading drop-shadow-md">
              Minhas <span className="text-brand-primary">Hospedagens</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-zinc-200 font-light leading-relaxed drop-shadow-sm max-w-2xl">
              Gerencie suas estadias confirmadas, vouchers de check-in e suporte
              exclusivo do concierge ClubKey.
            </p>
          </div>
        </Container>
      </section>

      <Container className="relative z-10 flex-1 py-10 space-y-8 bg-[#F1F1F1] dark:bg-[#161616]">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-sm bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl font-black text-zinc-900 dark:text-white font-heading block leading-none">
                {activeReservationsCount}
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Reservas ativas
              </span>
            </div>
          </div>

          <div className="p-5 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-sm bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl font-black text-zinc-900 dark:text-white font-heading block leading-none">
                {totalNights} noites
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Diárias programadas
              </span>
            </div>
          </div>

          <div className="p-5 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-sm bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl font-black text-zinc-900 dark:text-white font-heading block leading-none">
                Tarifa VIP
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Até 30% OFF aplicado
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-zinc-900 dark:text-white font-heading">
              Estadias Confirmadas
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Titular da reserva:{" "}
              <strong className="text-zinc-900 dark:text-white">
                {userProfile.name}
              </strong>
            </p>
          </div>

          <Link
            href="/hospedagens"
            className="text-xs font-bold uppercase tracking-wider text-brand-primary hover:underline flex items-center gap-1.5"
          >
            <span>Reservar nova estadia</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {memberStays.length === 0 ? (
          <div className="p-12 text-center rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] space-y-4">
            <div className="w-14 h-14 rounded-sm bg-brand-primary/10 text-brand-primary flex items-center justify-center mx-auto">
              <Building2 className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold uppercase tracking-tight text-zinc-900 dark:text-white font-heading">
                Nenhuma reserva ativa no momento
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-md mx-auto leading-relaxed">
                Você ainda não possui estadias agendadas. Explore nossa
                curadoria de hotéis boutique e resorts com tarifas exclusivas
                para associados.
              </p>
            </div>
            <Link
              href="/hospedagens"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-brand-primary text-white text-xs font-black uppercase tracking-wider transition-all hover:bg-brand-primary/90"
            >
              <span>Explorar catálogo de hospedagens</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {memberStays.map((stay) => (
              <div
                key={stay.id}
                className="rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] p-6 sm:p-7 shadow-xs flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between"
              >
                <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center w-full lg:w-auto">
                  <div className="relative w-full sm:w-44 h-36 shrink-0 rounded-sm overflow-hidden bg-zinc-900">
                    <Image
                      src={stay.image}
                      alt={stay.stayName}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2.5 left-2.5">
                      <Badge
                        color="success"
                        variant="flat"
                        size="sm"
                        radius="sm"
                        startContent={<CheckCircle2 className="w-3 h-3" />}
                        className="font-black text-[10px] uppercase tracking-wider backdrop-blur-md"
                      >
                        Confirmada
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2 min-w-0">
                    <div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary block">
                        Voucher: {stay.confirmationCode}
                      </span>
                      <h3 className="text-xl font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white truncate">
                        {stay.stayName}
                      </h3>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                        <span>{stay.location}</span>
                        <span>•</span>
                        <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                          {stay.roomType}
                        </span>
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-600 dark:text-zinc-300 pt-1">
                      <span className="flex items-center gap-1 font-semibold">
                        <Calendar className="w-3.5 h-3.5 text-brand-primary" />
                        {stay.checkIn} — {stay.checkOut}
                      </span>
                      <span className="text-zinc-300 dark:text-zinc-700">
                        •
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-brand-primary" />
                        {stay.nights} {stay.nights === 1 ? "noite" : "noites"}
                      </span>
                      <span className="text-zinc-300 dark:text-zinc-700">
                        •
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-brand-primary" />
                        {stay.guests} hóspedes
                      </span>
                    </div>

                    <div className="text-xs text-zinc-500 dark:text-zinc-400">
                      Total da estadia:{" "}
                      <strong className="text-sm font-heading font-black text-zinc-900 dark:text-white">
                        {formatBRL(stay.totalPrice)}
                      </strong>
                      <span className="text-[10px] text-emerald-500 font-bold ml-2">
                        (Benefício de Membro aplicado)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-2.5 w-full lg:w-auto shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-zinc-100 dark:border-zinc-800">
                  <Link
                    href={`/hospedagens/minhas-hospedagens/${stay.id}/${getStaySlug(stay)}`}
                    className="px-4 py-2 rounded-sm bg-brand-primary hover:bg-brand-primary/90 text-white text-xs font-black uppercase tracking-wider transition-all text-center flex items-center justify-center gap-1.5"
                  >
                    <span>Ver Voucher / Detalhes</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Button
                    type="button"
                    size="sm"
                    radius="sm"
                    color="default"
                    variant="bordered"
                    onClick={() => handleContactConcierge(stay.stayName)}
                    startContent={
                      <Phone className="w-3.5 h-3.5 text-brand-primary" />
                    }
                    className="text-xs font-bold uppercase tracking-wider"
                  >
                    Concierge WhatsApp
                  </Button>

                  <button
                    type="button"
                    onClick={() => handleCancel(stay.id, stay.stayName)}
                    className="text-[11px] font-semibold text-zinc-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors py-1 cursor-pointer flex items-center justify-center gap-1"
                  >
                    <XCircle className="w-3 h-3" />
                    <span>Cancelar reserva</span>
                  </button>
                </div>

                {selectedVoucher === stay.id && (
                  <div className="w-full lg:col-span-full pt-4 mt-2 border-t border-dashed border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/80 p-4 rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary">
                        Comprovante Oficial de Reserva
                      </span>
                      <p className="text-xs font-bold text-zinc-900 dark:text-white">
                        Apresente o código{" "}
                        <span className="font-mono text-brand-primary">
                          {stay.confirmationCode}
                        </span>{" "}
                        na recepção do hotel junto com seu documento oficial.
                      </p>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                        Check-in a partir das 15h00 • Check-out até às 12h00 •
                        Café da manhã cortesia de membro incluído.
                      </p>
                    </div>
                    <Badge
                      color="primary"
                      variant="flat"
                      size="lg"
                      radius="sm"
                      className="font-mono font-black text-sm tracking-widest uppercase"
                    >
                      {stay.confirmationCode}
                    </Badge>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  )
}
