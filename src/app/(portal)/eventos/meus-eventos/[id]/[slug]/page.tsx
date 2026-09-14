"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams, notFound } from "next/navigation"
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  CheckCircle2,
  Building,
  ArrowRight,
  QrCode,
  Share2,
  XCircle,
  Download
} from "lucide-react"

import { EVENTS, MEMBERS, getInitials, getMemberSlug, getEventSlug } from "@/src/data/portalData"
import { usePortalStore } from "@/src/store/usePortalStore"
import { BackButton } from "@/src/components/portal/BackButton"
import { Badge } from "@/src/components/ui/badge/badge"
import { Button } from "@/src/components/ui/button/button"
import { toast } from "@/src/components/ui/toast/toast"
import { Container } from "@/src/components/common/container"

export default function MeuEventoDetailPage(): React.JSX.Element {
  const params = useParams()
  const idParam = Array.isArray(params?.id) ? params.id[0] : params?.id
  const eventId = Number(idParam)
  const event = EVENTS.find((e) => e.id === eventId)

  if (!event) {
    notFound()
  }

  const eventSlug = getEventSlug(event)
  const { confirmedEvents, toggleEventRSVP, userProfile } = usePortalStore()
  const isConfirmed = !!confirmedEvents[event.id]

  const organizer = MEMBERS.find((m) => m.id === event.organizerId) || MEMBERS[0]
  const attendees = event.participants
    .map((id: number) => MEMBERS.find((m) => m.id === id))
    .filter((m): m is typeof MEMBERS[0] => Boolean(m))

  const handleCancelRSVP = () => {
    toggleEventRSVP(event.id)
    toast.info(`Presença cancelada em: ${event.title}`)
  }

  const handleDownloadTicket = () => {
    toast.success("Credencial VIP baixada!", {
      description: "Apresente o QR Code na recepção do encontro."
    })
  }

  return (
    <Container className="pt-6 sm:pt-8 pb-16 space-y-8">
      <BackButton
        fallbackHref="/eventos/meus-eventos"
        label="Voltar para Meus Eventos"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-8">
          <div className="rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] overflow-hidden shadow-xs">
            {event.image && (
              <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-zinc-900">
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 z-10 space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-wider bg-brand-primary text-white shadow-xs">
                      <Calendar className="w-3.5 h-3.5" />
                      {event.weekday}, {event.day} de {event.month} de 2026
                    </span>
                    <Badge color="success" variant="flat" size="sm" radius="sm" startContent={<CheckCircle2 className="w-3 h-3" />} className="font-bold uppercase tracking-wider">
                      Presença Garantida
                    </Badge>
                  </div>
                  <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white font-heading">
                    {event.title}
                  </h1>
                </div>
              </div>
            )}

            <div className="p-6 sm:p-8 space-y-6">
              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
                {event.desc}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-zinc-100 dark:border-zinc-800">
                <div className="p-4 rounded-sm bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-primary">
                    Local do Encontro
                  </span>
                  <p className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-brand-primary shrink-0" />
                    {event.place}
                  </p>
                </div>

                <div className="p-4 rounded-sm bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-primary">
                    Horário de Início
                  </span>
                  <p className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                    <Clock className="w-4 h-4 text-brand-primary shrink-0" />
                    {event.time}
                  </p>
                </div>

                <div className="p-4 rounded-sm bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-primary">
                    Anfitrião / Organizador
                  </span>
                  <p className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                    <Building className="w-4 h-4 text-brand-primary shrink-0" />
                    {organizer.name} ({organizer.company})
                  </p>
                </div>

                <div className="p-4 rounded-sm bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-primary">
                    Titular do Acesso
                  </span>
                  <p className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2 truncate">
                    <Users className="w-4 h-4 text-brand-primary shrink-0" />
                    {userProfile.name}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-primary block mb-0.5">
                  Conexões Confirmadas
                </span>
                <h2 className="text-xl font-bold uppercase tracking-tight text-zinc-900 dark:text-white font-heading">
                  Membros presentes ({attendees.length})
                </h2>
              </div>
              <Link
                href={`/eventos/${event.id}/${eventSlug}/quem-vai`}
                className="text-xs font-bold uppercase tracking-wider text-brand-primary hover:translate-x-0.5 transition-transform flex items-center gap-1"
              >
                <span>Ver lista completa com ofertas</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {attendees.map((attendee) => (
                <Link
                  key={attendee.id}
                  href={`/conexoes/${attendee.id}/${getMemberSlug(attendee)}`}
                  className="flex items-center gap-3.5 p-4 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] hover:border-brand-primary/60 dark:hover:border-brand-primary/60 transition-all shadow-xs"
                >
                  <div className="relative w-11 h-11 shrink-0 rounded-sm overflow-hidden bg-zinc-900 text-white flex items-center justify-center font-bold text-xs">
                    {attendee.avatar ? (
                      <Image
                        src={attendee.avatar}
                        alt={attendee.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      getInitials(attendee.name)
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold uppercase tracking-tight text-zinc-900 dark:text-white truncate">
                      {attendee.name}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                      {attendee.role} • {attendee.company}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="sticky top-24 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] p-6 sm:p-8 space-y-6 shadow-xs">
          <div className="text-center space-y-2 pb-4 border-b border-zinc-100 dark:border-zinc-800">
            <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary block">
              Credencial Digital
            </span>
            <div className="w-36 h-36 mx-auto rounded-sm border-2 border-dashed border-zinc-300 dark:border-zinc-700 flex flex-col items-center justify-center p-3 bg-zinc-50 dark:bg-zinc-900/80">
              <QrCode className="w-24 h-24 text-zinc-900 dark:text-white" />
              <span className="font-mono text-[9px] font-bold text-zinc-500 dark:text-zinc-400 mt-1">
                CK-EV-{event.id}88
              </span>
            </div>
            <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
              Apresente na entrada com seu documento com foto.
            </p>
          </div>

          <div className="space-y-3">
            <Button
              type="button"
              color="primary"
              variant="default"
              radius="sm"
              onClick={handleDownloadTicket}
              startContent={<Download className="w-4 h-4" />}
              className="w-full h-11 text-xs font-black uppercase tracking-wider"
            >
              Baixar Ingresso PDF
            </Button>

            <Link
              href={`/eventos/${event.id}/${eventSlug}/quem-vai`}
              className="w-full py-3 px-4 rounded-sm border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200 hover:border-brand-primary/60 transition-colors flex items-center justify-center gap-1.5"
            >
              <Users className="w-3.5 h-3.5 text-brand-primary" />
              <span>Ver quem vai estar lá</span>
            </Link>

            <button
              type="button"
              onClick={handleCancelRSVP}
              className="w-full text-center text-xs font-semibold text-zinc-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors py-1 cursor-pointer flex items-center justify-center gap-1"
            >
              <XCircle className="w-3.5 h-3.5" />
              <span>Cancelar minha presença</span>
            </button>
          </div>
        </div>
      </div>
    </Container>
  )
}
