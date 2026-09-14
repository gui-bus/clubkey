"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Calendar,
  CheckCircle2,
  Clock,
  MapPin,
  Users,
  ArrowRight,
  Share2,
  X,
  Ticket
} from "lucide-react"

import { usePortalStore } from "@/src/store/usePortalStore"
import { EVENTS, MEMBERS, getInitials, getEventSlug, getMemberSlug } from "@/src/data/portalData"
import { Container } from "@/src/components/common/container"
import { Badge } from "@/src/components/ui/badge/badge"
import { Button } from "@/src/components/ui/button/button"
import { AvatarGroup } from "@/src/components/ui/avatarGroup/avatarGroup"
import { Avatar, AvatarFallback, AvatarImage } from "@/src/components/ui/avatar/avatar"
import { toast } from "@/src/components/ui/toast/toast"

export default function MeusEventosPage(): React.JSX.Element {
  const router = useRouter()
  const { confirmedEvents, toggleEventRSVP, userProfile } = usePortalStore()

  const myEvents = React.useMemo(() => {
    return EVENTS.filter((e) => !!confirmedEvents[e.id])
  }, [confirmedEvents])

  const handleCancelRSVP = (eventId: number, title: string) => {
    toggleEventRSVP(eventId)
    toast.info(`Presença cancelada em: ${title}`)
  }

  return (
    <div className="w-full flex flex-col">
      <section
        id="hero"
        className="relative z-30 w-full bg-[#0D0D0D] text-white min-h-[460px] md:min-h-[500px] flex flex-col justify-center"
      >
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
          <Image
            src="/utils/banners/agenda.webp"
            alt="Meus Eventos"
            fill
            priority
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-zinc-50 dark:from-[#161616]/85 dark:via-[#161616]/65 dark:to-[#0D0D0D] z-10" />
        </div>

        <Container className="relative z-20 pt-36 pb-14 md:pt-44 md:pb-16 flex flex-col justify-center items-center text-center">
          <div className="max-w-4xl flex flex-col items-center text-center w-full">
            <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-brand-primary block mb-3">
              Minha Agenda • Presenças Confirmadas
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black uppercase tracking-tight text-white leading-[1.05] mb-4 font-heading drop-shadow-md">
              Meus <span className="text-brand-primary">Eventos</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-zinc-200 font-light leading-relaxed drop-shadow-sm max-w-2xl">
              Encontros, almoços e painéis estratégicos com a sua participação garantida no clube.
            </p>
          </div>
        </Container>
      </section>

      <Container className="relative z-10 flex-1 py-10 space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-sm bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl font-black text-zinc-900 dark:text-white font-heading block leading-none">
                {myEvents.length}
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                {myEvents.length === 1 ? "Evento confirmado" : "Eventos confirmados"}
              </span>
            </div>
          </div>

          <div className="p-5 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-sm bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl font-black text-zinc-900 dark:text-white font-heading block leading-none">
                Vagas Garantidas
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Acesso prioritário VIP
              </span>
            </div>
          </div>

          <div className="p-5 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-sm bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <span className="text-2xl font-black text-zinc-900 dark:text-white font-heading block leading-none">
                {userProfile.name.split(" ")[0]}
              </span>
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                Membro ativo
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div>
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-zinc-900 dark:text-white font-heading">
              Encontros na sua agenda
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              Apenas os eventos em que você confirmou presença
            </p>
          </div>

          <Link
            href="/eventos"
            className="text-xs font-bold uppercase tracking-wider text-brand-primary hover:underline flex items-center gap-1.5"
          >
            <span>Ver todos os eventos do clube</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {myEvents.length === 0 ? (
          <div className="p-12 text-center rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] space-y-4">
            <div className="w-14 h-14 rounded-sm bg-brand-primary/10 text-brand-primary flex items-center justify-center mx-auto">
              <Calendar className="w-7 h-7" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold uppercase tracking-tight text-zinc-900 dark:text-white font-heading">
                Você ainda não confirmou presença em nenhum evento
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-md mx-auto leading-relaxed">
                Explore o calendário de eventos e encontros exclusivos do clube para conectar-se com outros membros.
              </p>
            </div>
            <Link
              href="/eventos"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-sm bg-brand-primary text-white text-xs font-black uppercase tracking-wider transition-all hover:bg-brand-primary/90"
            >
              <span>Explorar calendário de eventos</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {myEvents.map((event) => {
              const participantMembers = event.participants
                .map((id: number) => MEMBERS.find((m) => m.id === id))
                .filter((m): m is typeof MEMBERS[0] => Boolean(m))
                .slice(0, 5)

              return (
                <div
                  key={event.id}
                  className="rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] p-6 sm:p-7 shadow-xs flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between"
                >
                  <div className="flex flex-col sm:flex-row gap-5 items-start sm:items-center w-full lg:w-auto">
                    <div className="relative w-full sm:w-36 h-32 shrink-0 rounded-sm overflow-hidden bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex flex-col items-center justify-center text-center">
                      {event.image ? (
                        <>
                          <Image
                            src={event.image}
                            alt={event.title}
                            fill
                            className="object-cover opacity-35"
                          />
                          <div className="relative z-10 flex flex-col items-center">
                            <span className="text-3xl font-black text-white leading-none font-heading">
                              {event.day}
                            </span>
                            <span className="text-xs font-black text-brand-primary uppercase tracking-widest mt-1">
                              {event.month}
                            </span>
                          </div>
                        </>
                      ) : (
                        <>
                          <span className="text-3xl font-black text-zinc-900 dark:text-white leading-none font-heading">
                            {event.day}
                          </span>
                          <span className="text-xs font-black text-brand-primary uppercase tracking-widest mt-1">
                            {event.month}
                          </span>
                        </>
                      )}
                    </div>

                    <div className="space-y-2 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge
                          color="success"
                          variant="flat"
                          size="sm"
                          radius="sm"
                          startContent={<CheckCircle2 className="w-3 h-3" />}
                          className="font-black text-[10px] uppercase tracking-wider"
                        >
                          Presença Confirmada
                        </Badge>
                      </div>

                      <h3 className="text-xl font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white">
                        {event.title}
                      </h3>

                      <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 max-w-2xl">
                        {event.desc}
                      </p>

                      <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-600 dark:text-zinc-300 pt-1">
                        <span className="flex items-center gap-1 font-semibold">
                          <Clock className="w-3.5 h-3.5 text-brand-primary" />
                          {event.weekday}, {event.time}
                        </span>
                        <span className="text-zinc-300 dark:text-zinc-700">•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-brand-primary" />
                          {event.place}
                        </span>
                      </div>

                      <div className="flex items-center gap-2 pt-2">
                        <AvatarGroup
                          showTooltip
                          isPressable
                          radius="full"
                          size="sm"
                          max={5}
                          overlap="sm"
                        >
                          {participantMembers.map((member) => (
                            <Avatar
                              key={member.id}
                              title={`${member.name} • ${member.role} (${member.company})`}
                              onClick={(e) => {
                                e.preventDefault()
                                e.stopPropagation()
                                router.push(`/conexoes/${member.id}/${getMemberSlug(member)}`)
                              }}
                              className="cursor-pointer"
                            >
                              {member.avatar && (
                                <AvatarImage src={member.avatar} alt={member.name} />
                              )}
                              <AvatarFallback className="font-bold text-[9px] bg-zinc-800 text-white">
                                {getInitials(member.name)}
                              </AvatarFallback>
                            </Avatar>
                          ))}
                        </AvatarGroup>
                        <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                          {event.initialConfirmed + 1} membros confirmados
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-2.5 w-full lg:w-auto shrink-0 pt-4 lg:pt-0 border-t lg:border-t-0 border-zinc-100 dark:border-zinc-800">
                    <Link
                      href={`/eventos/meus-eventos/${event.id}/${getEventSlug(event)}`}
                      className="px-4 py-2 rounded-sm bg-brand-primary hover:bg-brand-primary/90 text-white text-xs font-black uppercase tracking-wider transition-all text-center flex items-center justify-center gap-1.5"
                    >
                      <span>Meu Ingresso / Detalhes</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <Link
                      href={`/eventos/${event.id}/${getEventSlug(event)}/quem-vai`}
                      className="px-4 py-2 rounded-sm border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-900 text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200 hover:border-brand-primary/60 transition-colors text-center flex items-center justify-center gap-1.5"
                    >
                      <Users className="w-3.5 h-3.5 text-brand-primary" />
                      <span>Quem vai</span>
                    </Link>

                    <button
                      type="button"
                      onClick={() => handleCancelRSVP(event.id, event.title)}
                      className="text-[11px] font-semibold text-zinc-400 hover:text-rose-500 dark:hover:text-rose-400 transition-colors py-1 cursor-pointer flex items-center justify-center gap-1"
                    >
                      <X className="w-3 h-3" />
                      <span>Cancelar presença</span>
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </Container>
    </div>
  )
}
