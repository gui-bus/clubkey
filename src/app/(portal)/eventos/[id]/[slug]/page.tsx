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
  Check,
  X,
  Building,
  ArrowRight
} from "lucide-react"

import { EVENTS, MEMBERS, getInitials, getMemberSlug, getEventSlug } from "@/src/data/portalData"
import { usePortalStore } from "@/src/store/usePortalStore"
import { BackButton } from "@/src/components/portal/BackButton"
import { Progress } from "@/src/components/ui/progress/progress"
import { toast } from "@/src/components/ui/toast/toast"
import { Container } from "@/src/components/common/container"

export default function EventDetailPage(): React.JSX.Element {
  const params = useParams()
  const idParam = Array.isArray(params?.id) ? params.id[0] : params?.id
  const eventId = Number(idParam)
  const event = EVENTS.find((e) => e.id === eventId)

  if (!event) {
    notFound()
  }

  const eventSlug = getEventSlug(event)
  const { confirmedEvents, toggleEventRSVP } = usePortalStore()
  const isConfirmed = !!confirmedEvents[event.id]
  const currentCount = event.initialConfirmed + (isConfirmed ? 1 : 0)
  const fillPercentage = Math.min(
    100,
    Math.round((currentCount / event.capacity) * 100)
  )

  const organizer = MEMBERS.find((m) => m.id === event.organizerId) || MEMBERS[0]

  const attendees = event.participants
    .map((id: number) => MEMBERS.find((m) => m.id === id))
    .filter((m): m is typeof MEMBERS[0] => Boolean(m))

  const handleToggleRSVP = () => {
    const next = toggleEventRSVP(event.id)
    if (next) {
      toast.success("Presença confirmada!", {
        description: `Você confirmou sua presença em ${event.title}.`
      })
    } else {
      toast.info("Presença cancelada", {
        description: `Sua presença em ${event.title} foi cancelada.`
      })
    }
  }

  return (
    <Container className="pt-6 sm:pt-8 pb-16 space-y-8">
      <BackButton fallbackHref="/eventos" label="Voltar para eventos" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-8">
          <div className="rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] overflow-hidden shadow-sm">
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
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-wider bg-brand-primary text-white shadow-xs">
                    <Calendar className="w-3.5 h-3.5" />
                    {event.weekday}, {event.day} de {event.month} de 2026
                  </span>
                  <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white font-heading">
                    {event.title}
                  </h1>
                </div>
              </div>
            )}

            <div className="p-6 sm:p-8 space-y-6">
              {!event.image && (
                <>
                  <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-brand-primary/10 text-brand-primary font-bold uppercase tracking-wider">
                      <Calendar className="w-3.5 h-3.5" />
                      {event.weekday}, {event.day} de {event.month} de 2026
                    </span>
                  </div>
                  <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-zinc-900 dark:text-white font-heading">
                    {event.title}
                  </h1>
                </>
              )}

              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
                {event.desc}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-zinc-100 dark:border-zinc-800">
                <div className="p-4 rounded-sm bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-primary">
                    Localização
                  </span>
                  <p className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-brand-primary shrink-0" />
                    {event.place}
                  </p>
                </div>

                <div className="p-4 rounded-sm bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-primary">
                    Horário
                  </span>
                  <p className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                    <Clock className="w-4 h-4 text-brand-primary shrink-0" />
                    {event.time}
                  </p>
                </div>

                <div className="p-4 rounded-sm bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-primary">
                    Organizador
                  </span>
                  <p className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                    <Building className="w-4 h-4 text-brand-primary shrink-0" />
                    {organizer.name} ({organizer.company})
                  </p>
                </div>

                <div className="p-4 rounded-sm bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-primary">
                    Vagas disponíveis
                  </span>
                  <p className="text-sm font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                    <Users className="w-4 h-4 text-brand-primary shrink-0" />
                    {event.capacity - currentCount} restantes
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-brand-primary block mb-0.5">
                  Presenças
                </span>
                <h2 className="text-xl font-bold uppercase tracking-tight text-zinc-900 dark:text-white font-heading">
                  Quem já confirmou ({attendees.length})
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
                  key={attendee?.id}
                  href={`/conexoes/${attendee?.id}/${getMemberSlug(attendee)}`}
                  className="flex items-center gap-3.5 p-4 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] hover:border-brand-primary/60 dark:hover:border-brand-primary/60 transition-all shadow-xs"
                >
                  <div className="relative w-11 h-11 shrink-0 rounded-sm overflow-hidden bg-zinc-900 text-white flex items-center justify-center font-bold text-xs">
                    {attendee?.avatar ? (
                      <Image
                        src={attendee.avatar}
                        alt={attendee.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      getInitials(attendee?.name || "")
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-bold uppercase tracking-tight text-zinc-900 dark:text-white truncate">
                      {attendee?.name}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                      {attendee?.role} • {attendee?.company}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="sticky top-24 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] p-6 sm:p-8 space-y-6 shadow-xs">
          <div>
            <div className="flex items-baseline justify-between gap-2">
              <span className="text-4xl font-black text-zinc-900 dark:text-white font-heading">
                {currentCount}
              </span>
              <span className="text-sm font-bold uppercase tracking-wider text-zinc-400">
                / {event.capacity} confirmados
              </span>
            </div>

            <div className="mt-3">
              <Progress
                value={fillPercentage}
                color="primary"
                size="sm"
              />
            </div>
          </div>

          <div className="space-y-3">
            <button
              type="button"
              onClick={handleToggleRSVP}
              className={`group/rsvp w-full py-3.5 px-4 rounded-sm text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-xs cursor-pointer flex items-center justify-center gap-2 select-none active:scale-[0.98] ${
                isConfirmed
                  ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:border-rose-500/30 hover:bg-rose-500/10 hover:text-rose-600 dark:hover:text-rose-400"
                  : "bg-brand-primary hover:bg-brand-primary-hover text-white"
              }`}
            >
              {isConfirmed ? (
                <>
                  <span className="inline-flex items-center gap-2 group-hover/rsvp:hidden">
                    <Check className="w-4 h-4" />
                    <span>Presença confirmada</span>
                  </span>
                  <span className="hidden items-center gap-2 group-hover/rsvp:inline-flex">
                    <X className="w-4 h-4" />
                    <span>Cancelar presença</span>
                  </span>
                </>
              ) : (
                "Confirmar minha presença"
              )}
            </button>

            <Link
              href={`/eventos/${event.id}/${eventSlug}/quem-vai`}
              className="w-full py-3 px-4 rounded-sm border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200 hover:border-brand-primary/60 transition-colors flex items-center justify-center"
            >
              Ver quem vai
            </Link>
          </div>

          <div className="pt-6 border-t border-zinc-100 dark:border-zinc-800 space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-primary block">
              Organizado por
            </span>
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-sm overflow-hidden bg-zinc-900 text-white flex items-center justify-center font-bold text-xs shrink-0">
                {organizer.avatar ? (
                  <Image
                    src={organizer.avatar}
                    alt={organizer.name}
                    fill
                    className="object-cover"
                  />
                ) : (
                  getInitials(organizer.name)
                )}
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-tight text-zinc-900 dark:text-white">
                  {organizer.name}
                </p>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  {organizer.role} • {organizer.company}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
