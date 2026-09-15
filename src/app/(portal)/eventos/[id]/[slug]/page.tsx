"use client"

import * as React from "react"

import Image from "next/image"
import Link from "next/link"
import { notFound, useParams } from "next/navigation"

import {
  EVENTS,
  MEMBERS,
  getEventSlug,
  getInitials,
  getMemberSlug,
} from "@/src/data/portalData"
import { usePortalStore } from "@/src/store/usePortalStore"
import {
  ArrowRight,
  Calendar,
  Check,
  CheckCircle,
  Clock,
  MapPin,
  Plus,
  ShieldCheck,
  Users,
  X,
} from "@phosphor-icons/react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar/avatar"
import { Button } from "@/src/components/ui/button/button"
import { Progress } from "@/src/components/ui/progress/progress"
import { toast } from "@/src/components/ui/toast/toast"

import { Container } from "@/src/components/common/container"
import { CtaButton } from "@/src/components/common/ctaButton"
import { AddToCalendarButton } from "@/src/components/portal/AddToCalendarButton"
import { BackButton } from "@/src/components/portal/BackButton"
import { GlassBadge } from "@/src/components/portal/GlassBadge"
import { MemberCard } from "@/src/components/portal/MemberCard"
import { ShareButton } from "@/src/components/portal/ShareButton"

import { cn } from "@/src/lib/utils"

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
  const remainingSpots = Math.max(0, event.capacity - currentCount)
  const fillPercentage = Math.min(
    100,
    Math.round((currentCount / event.capacity) * 100)
  )

  const organizer =
    MEMBERS.find((m) => m.id === event.organizerId) || MEMBERS[0]

  const attendees = event.participants
    .map((id: number) => MEMBERS.find((m) => m.id === id))
    .filter((m): m is (typeof MEMBERS)[0] => Boolean(m))

  const currentIndex = EVENTS.findIndex((e) => e.id === event.id)
  const prevEvent =
    currentIndex > 0 ? EVENTS[currentIndex - 1] : EVENTS[EVENTS.length - 1]
  const nextEvent =
    currentIndex < EVENTS.length - 1 ? EVENTS[currentIndex + 1] : EVENTS[0]

  const handleToggleRSVP = () => {
    const next = toggleEventRSVP(event.id)
    if (next) {
      toast.success(`Presença confirmada: ${event.title}`, {
        description: "Adicionado à sua agenda de eventos confirmados.",
      })
    } else {
      toast.info(`Presença cancelada: ${event.title}`)
    }
  }

  const highlights = event.highlights || [
    {
      title: "Mesa Redonda Sem Palco",
      desc: "Diálogo aberto e sem apresentações formais, onde cada membro compartilha um desafio estratégico real do trimestre.",
    },
    {
      title: "Regra Chatham House",
      desc: "Segurança e sigilo absoluto para debater números, transações e planos de expansão com franqueza.",
    },
    {
      title: "Harmonização Gastronômica",
      desc: "Jantar autoral em múltiplos tempos harmonizado com carta de vinhos curada exclusivamente para membros.",
    },
    {
      title: "Deal Flow & Mapeamento",
      desc: "Síntese executiva das oportunidades e sinergias identificadas distribuída aos participantes pós-encontro.",
    },
  ]

  const inclusions = event.inclusions || [
    "Acesso exclusivo ao salão privativo reservado",
    "Gastronomia autoral & carta de vinhos harmonizada",
    "Síntese executiva de conexões pós-evento",
    "Apoio e suporte dedicado do concierge ClubKey",
  ]

  return (
    <Container className="pt-6 sm:pt-8 pb-20 space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <BackButton fallbackHref="/eventos" label="Eventos" />
          <span className="text-zinc-300 dark:text-zinc-700 hidden sm:inline">
            /
          </span>
          <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400 truncate max-w-xs sm:max-w-md hidden sm:inline">
            {event.title}
          </span>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <ShareButton />
          <AddToCalendarButton
            title={event.title}
            description={event.desc}
            location={event.place}
          />
        </div>
      </div>

      <div className="relative rounded-sm overflow-hidden bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-lg min-h-[380px] sm:min-h-[460px] lg:min-h-[500px] flex flex-col justify-between p-6 sm:p-10">
        {event.image && (
          <div className="absolute inset-0 z-0">
            <Image
              src={event.image}
              alt={event.title}
              fill
              priority
              className="object-cover opacity-60 dark:opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30" />
            <div className="absolute inset-0 bg-radial from-transparent via-black/40 to-black/80" />
          </div>
        )}

        <div className="relative z-10 flex items-center justify-between gap-3">
          <GlassBadge size="md">
            {event.category || "Exclusivo Membros"}
          </GlassBadge>

          {isConfirmed && (
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm bg-emerald-500 text-white text-[11px] font-black uppercase tracking-widest shadow-md">
              <Check className="w-3.5 h-3.5" />
              <span>Presença Confirmada</span>
            </span>
          )}
        </div>

        <div className="relative z-10 max-w-4xl space-y-4 pt-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-brand-primary/90 text-white text-xs font-black uppercase tracking-widest">
            <Calendar className="w-3.5 h-3.5" />
            <span>
              {event.weekday}, {event.day} de {event.month} • {event.time}
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-black uppercase tracking-tight text-white leading-[1.05] drop-shadow-md">
            {event.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-zinc-300 pt-1">
            <span className="flex items-center gap-1.5 font-medium text-white">
              <MapPin className="w-4 h-4 text-brand-primary shrink-0" />
              {event.place}
            </span>
            <span className="text-zinc-500 hidden sm:inline">•</span>
            <Link
              href={`/conexoes/${organizer.id}/${getMemberSlug(organizer)}`}
              className="group/host inline-flex items-center gap-2 text-zinc-300 hover:text-white transition-colors"
            >
              <span className="text-zinc-400 font-medium">Host:</span>
              <Avatar
                size="xs"
                radius="full"
                className="border border-white/20 group-hover/host:border-brand-primary transition-colors cursor-pointer"
              >
                {organizer.avatar && (
                  <AvatarImage src={organizer.avatar} alt={organizer.name} />
                )}
                <AvatarFallback className="font-bold text-[9px] bg-zinc-800 text-white">
                  {getInitials(organizer.name)}
                </AvatarFallback>
              </Avatar>
              <span className="font-semibold text-white group-hover/host:text-brand-primary group-hover/host:underline transition-colors">
                {organizer.name}
              </span>
              <span className="text-zinc-400 text-xs">
                ({organizer.company})
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        <div className="lg:col-span-2 space-y-12">
          <section className="space-y-4">
            <div className="space-y-3">
              <span className="text-xs font-black uppercase tracking-widest text-brand-primary block">
                Visão Geral
              </span>
              <p className="text-lg sm:text-xl font-light text-zinc-800 dark:text-zinc-200 leading-relaxed">
                {event.desc}
              </p>
            </div>
          </section>

          <section className="space-y-6 pt-8 border-t border-zinc-200 dark:border-zinc-800">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-brand-primary block mb-1">
                Logística & Especificações
              </span>
              <h2 className="text-2xl font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white">
                Informações Práticas
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 sm:p-5 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] space-y-2 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-sm bg-brand-primary/10 flex items-center justify-center shrink-0">
                    <Calendar className="w-4 h-4 text-brand-primary" />
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-widest text-zinc-400">
                    Data & Dia
                  </span>
                </div>
                <div className="pt-1">
                  <p className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white">
                    {event.weekday}, {event.day} de {event.month}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                    Ano 2026 • Programação oficial
                  </p>
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] space-y-2 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-sm bg-brand-primary/10 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-brand-primary" />
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-widest text-zinc-400">
                    Horário de Início
                  </span>
                </div>
                <div className="pt-1">
                  <p className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white">
                    {event.time}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                    Chegada recomendada com 15 min de antecedência
                  </p>
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] space-y-2 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-sm bg-brand-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-brand-primary" />
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-widest text-zinc-400">
                    Localização
                  </span>
                </div>
                <div className="pt-1">
                  <p className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white truncate">
                    {event.place}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                    Serviço de valet & estacionamento no local
                  </p>
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] space-y-2 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-sm bg-brand-primary/10 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4 text-brand-primary" />
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-widest text-zinc-400">
                    Dress Code & Formato
                  </span>
                </div>
                <div className="pt-1">
                  <p className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white">
                    {event.dressCode || "Smart Casual"}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                    {event.format || "Presencial VIP"}
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-6 pt-8 border-t border-zinc-200 dark:border-zinc-800">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-brand-primary block mb-1">
                O que esperar
              </span>
              <h2 className="text-2xl font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white">
                Destaques & Dinâmica do Encontro
              </h2>
            </div>

            <div className="divide-y divide-zinc-200 dark:divide-zinc-800">
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className="py-5 first:pt-0 last:pb-0 flex items-start gap-5 sm:gap-8 group"
                >
                  <span className="text-2xl sm:text-3xl font-black font-heading text-brand-primary/40 group-hover:text-brand-primary transition-colors shrink-0 select-none">
                    0{index + 1}
                  </span>

                  <div className="space-y-1.5 min-w-0">
                    <h3 className="text-base font-bold uppercase tracking-tight text-zinc-900 dark:text-white">
                      {item.title}
                    </h3>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-6 pt-8 border-t border-zinc-200 dark:border-zinc-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-brand-primary block mb-1">
                  Rede & Afinidades
                </span>
                <h2 className="text-2xl font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white">
                  Quem vai estar lá ({attendees.length})
                </h2>
              </div>

              <Link
                href={`/eventos/${event.id}/${eventSlug}/quem-vai`}
                className="text-xs font-bold uppercase tracking-wider text-brand-primary hover:underline flex items-center gap-1.5 self-start sm:self-auto"
              >
                <span>Ver lista completa com ofertas</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {attendees.slice(0, 6).map((attendee) => (
                <MemberCard
                  key={attendee.id}
                  member={attendee}
                  isHost={attendee.id === event.organizerId}
                />
              ))}
            </div>
          </section>
        </div>

        <div className="lg:sticky lg:top-24 space-y-6">
          <div className="rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] p-6 sm:p-8 space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary block">
                Acesso de Membro • Reserva VIP
              </span>
              <div className="flex items-baseline justify-between gap-2 pt-1">
                <span className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white font-heading leading-none">
                  {currentCount}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  / {event.capacity} confirmados
                </span>
              </div>

              <div className="pt-2">
                <Progress value={fillPercentage} color="primary" size="sm" />
              </div>

              <div className="flex items-center justify-between text-[11px] text-zinc-500 dark:text-zinc-400 pt-1">
                <span>{fillPercentage}% preenchido</span>
                <span className="font-bold text-zinc-800 dark:text-zinc-200">
                  {remainingSpots}{" "}
                  {remainingSpots === 1 ? "vaga restante" : "vagas restantes"}
                </span>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
              {isConfirmed ? (
                <CtaButton
                  type="button"
                  variant="secondary"
                  size="md"
                  isFullWidth
                  onClick={handleToggleRSVP}
                  className="h-12 text-xs shadow-none hover:shadow-none border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:border-rose-500/40 hover:bg-rose-500/10 hover:text-rose-600 dark:hover:text-rose-400"
                  sliderClassName="bg-rose-500/15"
                  textClassName="text-emerald-600 dark:text-emerald-400 group-hover:text-rose-600 dark:group-hover:text-rose-400"
                >
                  <span className="inline-flex items-center gap-2 group-hover:hidden">
                    <Check className="w-4 h-4" />
                    <span>Presença confirmada</span>
                  </span>
                  <span className="hidden items-center gap-2 group-hover:inline-flex">
                    <X className="w-4 h-4" />
                    <span>Cancelar presença</span>
                  </span>
                </CtaButton>
              ) : (
                <CtaButton
                  type="button"
                  variant="primary"
                  size="md"
                  isFullWidth
                  onClick={handleToggleRSVP}
                  className="h-12 text-xs shadow-none hover:shadow-none"
                >
                  <Plus className="w-4 h-4 mr-2 shrink-0" />
                  <span>Confirmar presença</span>
                </CtaButton>
              )}

              <Link
                href={`/eventos/${event.id}/${eventSlug}/quem-vai`}
                className="w-full h-11 px-4 rounded-sm border border-zinc-200 dark:border-zinc-700 bg-[#F1F1F1] dark:bg-zinc-900 text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200 hover:border-brand-primary transition-colors flex items-center justify-center gap-2"
              >
                <Users className="w-3.5 h-3.5 text-brand-primary" />
                <span>Ver participantes ({attendees.length})</span>
              </Link>
            </div>

            <div className="space-y-3 pt-5 border-t border-zinc-100 dark:border-zinc-800">
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 block">
                Inclusões da Sessão
              </span>

              <ul className="space-y-2.5 text-xs text-zinc-600 dark:text-zinc-300">
                {inclusions.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      <section className="pt-12 border-t border-zinc-200 dark:border-zinc-800 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-brand-primary block mb-1">
              Explorar Mais
            </span>
            <h2 className="text-2xl font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white">
              Outros Encontros & Eventos
            </h2>
          </div>
          <Link
            href="/eventos"
            className="text-xs font-bold uppercase tracking-wider text-brand-primary hover:underline flex items-center gap-1.5"
          >
            <span>Ver agenda completa</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href={`/eventos/${prevEvent.id}/${getEventSlug(prevEvent)}`}
            className="group relative flex flex-col sm:flex-row items-stretch overflow-hidden rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] hover:border-brand-primary transition-all duration-200 shadow-xs"
          >
            <div className="relative w-full sm:w-44 h-36 sm:h-auto shrink-0 bg-zinc-950 overflow-hidden">
              {prevEvent.image && (
                <Image
                  src={prevEvent.image}
                  alt={prevEvent.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300 opacity-80"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent sm:hidden" />
            </div>

            <div className="p-5 flex flex-col justify-between flex-1 gap-3 min-w-0">
              <div>
                <div className="flex items-center justify-between gap-2 text-[11px] font-bold text-zinc-400 mb-1.5">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-xs bg-zinc-100 dark:bg-zinc-800 text-[10px] font-black uppercase tracking-wider text-zinc-600 dark:text-zinc-300">
                    {prevEvent.category || "Exclusivo"}
                  </span>
                  <span className="text-zinc-500 font-medium">
                    {prevEvent.weekday}, {prevEvent.day} {prevEvent.month}
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white group-hover:text-brand-primary transition-colors line-clamp-2">
                  {prevEvent.title}
                </h3>
              </div>

              <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400 pt-2 border-t border-zinc-100 dark:border-zinc-800/60 truncate">
                <span className="flex items-center gap-1 truncate">
                  <MapPin className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                  <span className="truncate">{prevEvent.place}</span>
                </span>
                <span>•</span>
                <span className="shrink-0">{prevEvent.time}</span>
              </div>
            </div>
          </Link>

          <Link
            href={`/eventos/${nextEvent.id}/${getEventSlug(nextEvent)}`}
            className="group relative flex flex-col sm:flex-row items-stretch overflow-hidden rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] hover:border-brand-primary transition-all duration-200 shadow-xs"
          >
            <div className="relative w-full sm:w-44 h-36 sm:h-auto shrink-0 bg-zinc-950 overflow-hidden">
              {nextEvent.image && (
                <Image
                  src={nextEvent.image}
                  alt={nextEvent.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300 opacity-80"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent sm:hidden" />
            </div>

            <div className="p-5 flex flex-col justify-between flex-1 gap-3 min-w-0">
              <div>
                <div className="flex items-center justify-between gap-2 text-[11px] font-bold text-zinc-400 mb-1.5">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-xs bg-zinc-100 dark:bg-zinc-800 text-[10px] font-black uppercase tracking-wider text-zinc-600 dark:text-zinc-300">
                    {nextEvent.category || "Exclusivo"}
                  </span>
                  <span className="text-zinc-500 font-medium">
                    {nextEvent.weekday}, {nextEvent.day} {nextEvent.month}
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white group-hover:text-brand-primary transition-colors line-clamp-2">
                  {nextEvent.title}
                </h3>
              </div>

              <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400 pt-2 border-t border-zinc-100 dark:border-zinc-800/60 truncate">
                <span className="flex items-center gap-1 truncate">
                  <MapPin className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                  <span className="truncate">{nextEvent.place}</span>
                </span>
                <span>•</span>
                <span className="shrink-0">{nextEvent.time}</span>
              </div>
            </div>
          </Link>
        </div>
      </section>
    </Container>
  )
}
