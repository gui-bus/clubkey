"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams, notFound } from "next/navigation"
import { Calendar, Clock, MapPin, Users, CheckCircle, Buildings, Phone, Ticket, ShieldCheck, Download, XCircle, Info } from "@phosphor-icons/react"

import { usePortalStore } from "@/src/store/usePortalStore"
import { formatBRL } from "@/src/data/portalData"
import { BackButton } from "@/src/components/portal/BackButton"
import { Container } from "@/src/components/common/container"
import { Badge } from "@/src/components/ui/badge/badge"
import { Button } from "@/src/components/ui/button/button"
import { toast } from "@/src/components/ui/toast/toast"

export default function MinhaHospedagemDetailPage(): React.JSX.Element {
  const params = useParams()
  const idParam = Array.isArray(params?.id) ? params.id[0] : params?.id
  const stayReservationId = String(idParam)
  const { memberStays, cancelStay, userProfile } = usePortalStore()

  const stay = memberStays.find((s) => s.id === stayReservationId)

  if (!stay) {
    notFound()
  }

  const handleDownloadVoucher = () => {
    toast.success("Voucher PDF baixado com sucesso!", {
      description: "Apresente o comprovante no momento do check-in."
    })
  }

  const handleContactConcierge = () => {
    toast.success(`Concierge acionado para ${stay.stayName}!`, {
      description: "Em instantes você receberá um contato direto no WhatsApp."
    })
  }

  const handleCancel = () => {
    cancelStay(stay.id)
    toast.info(`Reserva em ${stay.stayName} cancelada.`, {
      description: "Nossa equipe de concierge foi notificada para o estorno."
    })
  }

  return (
    <Container className="pt-6 sm:pt-8 pb-16 space-y-8">
      <BackButton
        fallbackHref="/hospedagens/minhas-hospedagens"
        label="Voltar para Minhas Hospedagens"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-8">
          <div className="rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] overflow-hidden shadow-xs">
            <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-zinc-900">
              <Image
                src={stay.image}
                alt={stay.stayName}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 z-10 space-y-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge
                    color="success"
                    variant="flat"
                    size="sm"
                    radius="sm"
                    startContent={<CheckCircle className="w-3 h-3" />}
                    className="font-bold uppercase tracking-wider backdrop-blur-md"
                  >
                    Reserva Confirmada
                  </Badge>
                  <Badge
                    color="primary"
                    variant="flat"
                    size="sm"
                    radius="sm"
                    className="font-bold uppercase tracking-wider"
                  >
                    Tarifa de Membro ClubKey
                  </Badge>
                </div>
                <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white font-heading">
                  {stay.stayName}
                </h1>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-sm bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-primary">
                    Localização
                  </span>
                  <p className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-brand-primary shrink-0" />
                    {stay.location}
                  </p>
                </div>

                <div className="p-4 rounded-sm bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-primary">
                    Acomodação
                  </span>
                  <p className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                    <Buildings className="w-4 h-4 text-brand-primary shrink-0" />
                    {stay.roomType}
                  </p>
                </div>

                <div className="p-4 rounded-sm bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-primary">
                    Check-in / Check-out
                  </span>
                  <p className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-brand-primary shrink-0" />
                    {stay.checkIn} — {stay.checkOut}
                  </p>
                </div>

                <div className="p-4 rounded-sm bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-primary">
                    Duração & Hóspedes
                  </span>
                  <p className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                    <Users className="w-4 h-4 text-brand-primary shrink-0" />
                    {stay.nights} noites • {stay.guests} hóspedes
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-sm bg-brand-primary/5 border border-brand-primary/20 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-brand-primary uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Benefícios VIP Inclusos nesta Estadia</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-700 dark:text-zinc-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-brand-primary" />
                    <span>Café da manhã à la carte cortesia</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-brand-primary" />
                    <span>Early check-in & late check-out prioritário</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-brand-primary" />
                    <span>Garrafa de espumante de boas-vindas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-brand-primary" />
                    <span>Upgrade de categoria sujeito a disponibilidade</span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
                <div className="flex items-center gap-2 font-bold text-zinc-900 dark:text-white">
                  <Info className="w-4 h-4 text-brand-primary" />
                  <span>Políticas de Hospedagem & Cancelamento</span>
                </div>
                <p className="leading-relaxed">
                  Cancelamento gratuito até 7 dias antes do check-in com reembolso integral. Para alterações de datas sem custo adicional, acione nosso concierge exclusivo.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="sticky top-24 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="text-center space-y-2 pb-5 border-b border-zinc-100 dark:border-zinc-800">
            <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary block">
              Código da Reserva
            </span>
            <span className="font-mono text-xl sm:text-2xl font-black text-zinc-900 dark:text-white block tracking-widest">
              {stay.confirmationCode}
            </span>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
              Titular: <strong className="text-zinc-900 dark:text-white">{userProfile.name}</strong>
            </p>
          </div>

          <div className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-400">
            <div className="flex justify-between items-center">
              <span>Valor total com desconto:</span>
              <span className="text-base font-heading font-black text-zinc-900 dark:text-white">
                {formatBRL(stay.totalPrice)}
              </span>
            </div>
            <div className="flex justify-between items-center text-emerald-500 font-semibold text-[11px]">
              <span>Status do pagamento:</span>
              <span>Confirmado ✓</span>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <Button
              type="button"
              color="primary"
              variant="default"
              radius="sm"
              onClick={handleDownloadVoucher}
              startContent={<Download className="w-4 h-4" />}
              className="w-full h-11 text-xs font-black uppercase tracking-wider"
            >
              Baixar Voucher PDF
            </Button>

            <Button
              type="button"
              color="default"
              variant="bordered"
              radius="sm"
              onClick={handleContactConcierge}
              startContent={<Phone className="w-4 h-4 text-brand-primary" />}
              className="w-full h-10 text-xs font-bold uppercase tracking-wider"
            >
              Concierge WhatsApp
            </Button>

            <button
              type="button"
              onClick={handleCancel}
              className="w-full text-center text-xs font-semibold text-zinc-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors py-1 cursor-pointer flex items-center justify-center gap-1"
            >
              <XCircle className="w-3.5 h-3.5" />
              <span>Solicitar cancelamento</span>
            </button>
          </div>
        </div>
      </div>
    </Container>
  )
}
