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
import { Progress } from "@/src/components/ui/progress/progress"
import { toast } from "@/src/components/ui/toast/toast"

import { Container } from "@/src/components/common/container"
import { CtaButton } from "@/src/components/common/ctaButton"
import { AddToCalendarButton } from "@/src/components/portal/AddToCalendarButton"
import { BackButton } from "@/src/components/portal/BackButton"
import { GlassBadge } from "@/src/components/portal/GlassBadge"
import { MemberCard } from "@/src/components/portal/MemberCard"
import { RelatedEventsCard } from "@/src/components/portal/RelatedEventsCard"
import { ShareButton } from "@/src/components/portal/ShareButton"

export function EventDetailClient({
  eventId: initialEventId,
}: {
  eventId?: number
}): React.JSX.Element {
  const params = useParams()
  const idParam = Array.isArray(params?.id) ? params.id[0] : params?.id
  const eventId = initialEventId ?? Number(idParam)
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
    <div className="w-full flex flex-col pb-20 space-y-10">
      <div className="relative w-full min-h-[380px] sm:min-h-[460px] lg:min-h-[500px] bg-zinc-950 overflow-hidden flex flex-col justify-between py-6 sm:py-8">
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

        <Container className="relative z-10 w-full h-full flex flex-col justify-between space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <BackButton
                fallbackHref="/eventos"
                label="Eventos"
                className="text-white hover:text-white/80"
              />
              <span className="text-white/60 hidden sm:inline">/</span>
              <span className="text-xs font-bold text-white truncate max-w-xs sm:max-w-md hidden sm:inline">
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

          <div className="flex items-center justify-between gap-3">
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

          <div className="max-w-4xl space-y-4">
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
              <span className="text-zinc-500 hidden sm:inline">•</span>
              <div className="inline-flex items-center gap-1.5 text-white/90 text-xs font-medium">
                <div className="relative w-3.5 h-3.5 shrink-0">
                  <Image
                    src="/utils/gamification/utils/xp.webp"
                    alt="XP"
                    fill
                    className="object-contain"
                  />
                </div>
                <span>+{event.xp || 200} XP</span>
              </div>
            </div>
          </div>
        </Container>
      </div>

      <Container className="space-y-12">
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-brand-primary shrink-0" />
                    <span className="text-xs font-black uppercase tracking-widest text-brand-primary">
                      Data & Dia
                    </span>
                  </div>
                  <div>
                    <p className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white">
                      {event.weekday}, {event.day} de {event.month}
                    </p>
                    <p className="text-xs text-zinc-900 dark:text-white font-medium mt-0.5">
                      Ano 2026 • Programação oficial
                    </p>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-brand-primary shrink-0" />
                    <span className="text-xs font-black uppercase tracking-widest text-brand-primary">
                      Horário de Início
                    </span>
                  </div>
                  <div>
                    <p className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white">
                      {event.time}
                    </p>
                    <p className="text-xs text-zinc-900 dark:text-white font-medium mt-0.5">
                      Chegada recomendada com 15 min de antecedência
                    </p>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-brand-primary shrink-0" />
                    <span className="text-xs font-black uppercase tracking-widest text-brand-primary">
                      Localização
                    </span>
                  </div>
                  <div>
                    <p className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white">
                      {event.place}
                    </p>
                    <p className="text-xs text-zinc-900 dark:text-white font-medium mt-0.5">
                      Serviço de valet & estacionamento no local
                    </p>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-brand-primary shrink-0" />
                    <span className="text-xs font-black uppercase tracking-widest text-brand-primary">
                      Dress Code & Formato
                    </span>
                  </div>
                  <div>
                    <p className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white">
                      {event.dressCode || "Smart Casual"}
                    </p>
                    <p className="text-xs text-zinc-900 dark:text-white font-medium mt-0.5">
                      {event.format || "Presencial VIP"}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-6 pt-8 border-t border-zinc-200 dark:border-zinc-800">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-brand-primary block mb-1">
                  Itens Inclusos
                </span>
                <h2 className="text-2xl font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white">
                  O que está incluso neste encontro
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                {inclusions.map((item, index) => (
                  <div key={index} className="flex items-center gap-3.5">
                    <div className="relative w-7 h-7 sm:w-8 sm:h-8 shrink-0">
                      <Image
                        src="/utils/icons/check.webp"
                        alt="Check"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="text-sm font-semibold text-zinc-900 dark:text-white">
                      {item}
                    </span>
                  </div>
                ))}
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
                  <span>Ver todos os participantes</span>
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

                <CtaButton
                  href={`/eventos/${event.id}/${eventSlug}/quem-vai`}
                  variant="secondary"
                  size="md"
                  isFullWidth
                  className="h-12 text-xs shadow-none hover:shadow-none"
                >
                  <Users className="w-3.5 h-3.5 text-brand-primary mr-2 shrink-0" />
                  <span>Ver todos os participantes ({attendees.length})</span>
                </CtaButton>
              </div>

              <div className="space-y-3 pt-5 border-t border-zinc-100 dark:border-zinc-800">
                <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary block">
                  Inclusões da Sessão
                </span>

                <ul className="space-y-3 text-xs text-zinc-900 dark:text-white">
                  {inclusions.map((item, index) => (
                    <li key={index} className="flex items-center gap-2.5">
                      <div className="relative w-5 h-5 sm:w-6 sm:h-6 shrink-0">
                        <Image
                          src="/utils/icons/check.webp"
                          alt="Check"
                          fill
                          className="object-contain"
                        />
                      </div>
                      <span className="font-medium text-zinc-900 dark:text-white">
                        {item}
                      </span>
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
            <RelatedEventsCard event={prevEvent} />
            <RelatedEventsCard event={nextEvent} />
          </div>
        </section>
      </Container>
    </div>
  )
}
