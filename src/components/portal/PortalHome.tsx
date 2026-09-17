"use client"

import * as React from "react"

import Image from "next/image"
import Link from "next/link"

import { EVENTS, getInitials } from "@/src/data/portalData"
import { usePortalStore } from "@/src/store/usePortalStore"
import {
  ArrowRight,
  BuildingApartment,
  Buildings,
  Calendar,
  Compass,
  Gift,
  ShieldCheck,
  Users,
} from "@phosphor-icons/react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar/avatar"
import { Button } from "@/src/components/ui/button/button"

import { Container } from "@/src/components/common/container"
import { EventCard } from "@/src/components/portal/EventCard"
import { GlassBadge } from "@/src/components/portal/GlassBadge"

export function PortalHome(): React.JSX.Element {
  const {
    userProfile,
    memberSubscription,
    confirmedEvents,
    memberStays,
    connectedMembers,
  } = usePortalStore()

  const confirmedEventsList = React.useMemo(() => {
    return EVENTS.filter((e) => !!confirmedEvents[e.id])
  }, [confirmedEvents])

  const nextEvent = confirmedEventsList[0] || null
  const nextStay = memberStays[0] || null

  const connectedCount = React.useMemo(() => {
    return Object.values(connectedMembers).filter((s) => s === "connected")
      .length
  }, [connectedMembers])

  const pendingCount = React.useMemo(() => {
    return Object.values(connectedMembers).filter((s) => s === "pending").length
  }, [connectedMembers])

  return (
    <div className="w-full flex flex-col pb-16">
      <section
        id="cockpit-hero"
        className="relative z-30 w-full text-white overflow-hidden"
      >
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
          <Image
            src="/utils/banners/img_02.png"
            alt="ClubKey Hub Background"
            fill
            priority
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-[#F1F1F1] dark:from-[#161616]/85 dark:via-[#161616]/65 dark:to-[#161616] z-10" />
        </div>

        <Container className="relative z-20 pt-28 pb-12 sm:pt-32 sm:pb-14 flex flex-col gap-8">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className="relative shrink-0">
              <Avatar size="2xl" className="w-16 h-16 sm:w-20 sm:h-20">
                <AvatarImage src={userProfile.avatar} alt={`${userProfile.firstName} ${userProfile.lastName}`} />
                <AvatarFallback className="bg-zinc-800 text-white font-bold text-lg">
                  {getInitials(userProfile.firstName, userProfile.lastName)}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center mb-1">
                <GlassBadge size="sm">
                  {memberSubscription.tierBadge || "Membro VIP"}
                </GlassBadge>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-white font-heading">
                Bem-vindo(a), {userProfile.firstName}
              </h1>
              <p className="text-xs sm:text-sm text-zinc-300">
                {userProfile.role} na {userProfile.company} • {userProfile.city}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 pt-2">
            <Link
              href="/eventos/meus-eventos"
              className="group relative overflow-hidden p-4 rounded-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-brand-primary/50 dark:hover:border-brand-primary/50 transition-all shadow-xs flex flex-col justify-between min-h-[115px]"
            >
              <div className="absolute -right-2 -bottom-2 pointer-events-none select-none transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6">
                <Calendar className="w-20 h-20 text-zinc-900/[0.05] dark:text-white/[0.05] group-hover:text-brand-primary/[0.1] dark:group-hover:text-brand-primary/[0.1] transition-colors" />
              </div>

              <div className="mb-3 relative z-10">
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                  Próximo Evento
                </span>
              </div>
              <div className="relative z-10">
                <p className="text-sm font-bold text-zinc-900 dark:text-white line-clamp-1 group-hover:text-brand-primary transition-colors">
                  {nextEvent
                    ? `${nextEvent.day} ${nextEvent.month} • ${nextEvent.title}`
                    : "Nenhum confirmado"}
                </p>
                <span className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 block">
                  {confirmedEventsList.length} evento(s) na agenda
                </span>
              </div>
            </Link>

            <Link
              href="/hospedagens/minhas-hospedagens"
              className="group relative overflow-hidden p-4 rounded-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-brand-primary/50 dark:hover:border-brand-primary/50 transition-all shadow-xs flex flex-col justify-between min-h-[115px]"
            >
              <div className="absolute -right-2 -bottom-2 pointer-events-none select-none transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6">
                <Buildings className="w-20 h-20 text-zinc-900/[0.05] dark:text-white/[0.05] group-hover:text-brand-primary/[0.1] dark:group-hover:text-brand-primary/[0.1] transition-colors" />
              </div>

              <div className="mb-3 relative z-10">
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                  Hospedagem Ativa
                </span>
              </div>
              <div className="relative z-10">
                <p className="text-sm font-bold text-zinc-900 dark:text-white line-clamp-1 group-hover:text-brand-primary transition-colors">
                  {nextStay ? `${nextStay.stayName}` : "Nenhuma reserva ativa"}
                </p>
                <span className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 block">
                  {nextStay
                    ? `${nextStay.checkIn.split(",")[0]}`
                    : "Reservar com tarifa VIP"}
                </span>
              </div>
            </Link>

            <Link
              href="/conexoes"
              className="group relative overflow-hidden p-4 rounded-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-brand-primary/50 dark:hover:border-brand-primary/50 transition-all shadow-xs flex flex-col justify-between min-h-[115px]"
            >
              <div className="absolute -right-2 -bottom-2 pointer-events-none select-none transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6">
                <Users className="w-20 h-20 text-zinc-900/[0.05] dark:text-white/[0.05] group-hover:text-brand-primary/[0.1] dark:group-hover:text-brand-primary/[0.1] transition-colors" />
              </div>

              <div className="mb-3 relative z-10">
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                  Rede do Clube
                </span>
              </div>
              <div className="relative z-10">
                <p className="text-sm font-bold text-zinc-900 dark:text-white line-clamp-1 group-hover:text-brand-primary transition-colors">
                  {connectedCount} conexões ativas
                </p>
                <span className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-0.5 block">
                  {pendingCount > 0
                    ? `${pendingCount} pedido(s) pendente(s)`
                    : "Diretório de 16 membros"}
                </span>
              </div>
            </Link>

            <Link
              href="/perfil/minha-assinatura"
              className="group relative overflow-hidden p-4 rounded-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-brand-primary/50 dark:hover:border-brand-primary/50 transition-all shadow-xs flex flex-col justify-between min-h-[115px]"
            >
              <div className="absolute -right-2 -bottom-2 pointer-events-none select-none transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6">
                <ShieldCheck className="w-20 h-20 text-zinc-900/[0.05] dark:text-white/[0.05] group-hover:text-brand-primary/[0.1] dark:group-hover:text-brand-primary/[0.1] transition-colors" />
              </div>

              <div className="mb-3 relative z-10">
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                  Assinatura & Acesso
                </span>
              </div>
              <div className="relative z-10">
                <p className="text-sm font-bold text-zinc-900 dark:text-white line-clamp-1 group-hover:text-brand-primary transition-colors">
                  {memberSubscription.planName}
                </p>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Status Ativo
                </span>
              </div>
            </Link>
          </div>
        </Container>
      </section>

      <Container className="relative z-10 pt-10 space-y-12 bg-[#F1F1F1] dark:bg-[#161616]">
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-primary block mb-0.5">
                Navegação Rápida
              </span>
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-zinc-900 dark:text-white font-heading">
                Centrais do Associado
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
            <Link
              href="/hospedagens"
              className="group relative overflow-hidden p-4 rounded-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-brand-primary/50 dark:hover:border-brand-primary/50 hover:shadow-md transition-all flex flex-col justify-between min-h-[125px]"
            >
              <div className="absolute -right-2 -bottom-2 pointer-events-none select-none transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6">
                <BuildingApartment className="w-20 h-20 text-zinc-900/[0.05] dark:text-white/[0.05] group-hover:text-brand-primary/[0.1] dark:group-hover:text-brand-primary/[0.1] transition-colors" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center justify-between gap-1.5 mb-1.5">
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-white group-hover:text-brand-primary transition-colors">
                    Hospedagens
                  </h3>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-brand-primary group-hover:translate-x-0.5 transition-all" />
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-snug">
                  Vilas e boutique hotels com tarifas exclusivas de membro.
                </p>
              </div>
            </Link>

            <Link
              href="/eventos"
              className="group relative overflow-hidden p-4 rounded-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-brand-primary/50 dark:hover:border-brand-primary/50 hover:shadow-md transition-all flex flex-col justify-between min-h-[125px]"
            >
              <div className="absolute -right-2 -bottom-2 pointer-events-none select-none transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6">
                <Calendar className="w-20 h-20 text-zinc-900/[0.05] dark:text-white/[0.05] group-hover:text-brand-primary/[0.1] dark:group-hover:text-brand-primary/[0.1] transition-colors" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center justify-between gap-1.5 mb-1.5">
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-white group-hover:text-brand-primary transition-colors">
                    Eventos
                  </h3>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-brand-primary group-hover:translate-x-0.5 transition-all" />
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-snug">
                  Jantares, painéis estratégicos e reuniões privadas.
                </p>
              </div>
            </Link>

            <Link
              href="/experiencias"
              className="group relative overflow-hidden p-4 rounded-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-brand-primary/50 dark:hover:border-brand-primary/50 hover:shadow-md transition-all flex flex-col justify-between min-h-[125px]"
            >
              <div className="absolute -right-2 -bottom-2 pointer-events-none select-none transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6">
                <Compass className="w-20 h-20 text-zinc-900/[0.05] dark:text-white/[0.05] group-hover:text-brand-primary/[0.1] dark:group-hover:text-brand-primary/[0.1] transition-colors" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center justify-between gap-1.5 mb-1.5">
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-white group-hover:text-brand-primary transition-colors">
                    Experiências
                  </h3>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-brand-primary group-hover:translate-x-0.5 transition-all" />
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-snug">
                  Viagens sob medida, regatas e vivências exclusivas.
                </p>
              </div>
            </Link>

            <Link
              href="/beneficios"
              className="group relative overflow-hidden p-4 rounded-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-brand-primary/50 dark:hover:border-brand-primary/50 hover:shadow-md transition-all flex flex-col justify-between min-h-[125px]"
            >
              <div className="absolute -right-2 -bottom-2 pointer-events-none select-none transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6">
                <Gift className="w-20 h-20 text-zinc-900/[0.05] dark:text-white/[0.05] group-hover:text-brand-primary/[0.1] dark:group-hover:text-brand-primary/[0.1] transition-colors" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center justify-between gap-1.5 mb-1.5">
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-white group-hover:text-brand-primary transition-colors">
                    Benefícios
                  </h3>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-brand-primary group-hover:translate-x-0.5 transition-all" />
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-snug">
                  Parcerias em aviação, gastronomia, saúde e negócios.
                </p>
              </div>
            </Link>

            <Link
              href="/conexoes"
              className="group relative overflow-hidden p-4 rounded-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-brand-primary/50 dark:hover:border-brand-primary/50 hover:shadow-md transition-all flex flex-col justify-between min-h-[125px]"
            >
              <div className="absolute -right-2 -bottom-2 pointer-events-none select-none transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6">
                <Users className="w-20 h-20 text-zinc-900/[0.05] dark:text-white/[0.05] group-hover:text-brand-primary/[0.1] dark:group-hover:text-brand-primary/[0.1] transition-colors" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center justify-between gap-1.5 mb-1.5">
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-white group-hover:text-brand-primary transition-colors">
                    Conexões
                  </h3>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-brand-primary group-hover:translate-x-0.5 transition-all" />
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-snug">
                  Diretório qualificado de membros do Clube.
                </p>
              </div>
            </Link>
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-primary block mb-0.5">
                Seus Compromissos
              </span>
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-zinc-900 dark:text-white font-heading">
                Próximo Encontro Confirmado
              </h2>
            </div>

            {confirmedEventsList.length > 0 && (
              <Link
                href="/eventos/meus-eventos"
                className="text-xs font-bold text-brand-primary hover:underline flex items-center gap-1"
              >
                <span>Ver todos na agenda ({confirmedEventsList.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>

          {nextEvent ? (
            <div className="w-full">
              <EventCard event={nextEvent} />
            </div>
          ) : (
            <div className="p-8 rounded-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-center flex flex-col items-center">
              <Calendar className="w-8 h-8 text-zinc-400 mb-2" />
              <p className="text-sm font-bold text-zinc-900 dark:text-white mb-1">
                Você ainda não confirmou presença nos próximos eventos
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4 max-w-sm">
                Confira o calendário completo de jantares, talks e fóruns do
                clube e garanta seu lugar.
              </p>
              <Link href="/eventos">
                <Button
                  color="primary"
                  size="sm"
                  className="text-xs font-bold uppercase tracking-wider"
                >
                  Explorar Eventos
                </Button>
              </Link>
            </div>
          )}

          {confirmedEventsList.length > 1 && (
            <div className="pt-1 flex items-center justify-between text-xs text-zinc-600 dark:text-zinc-400">
              <span>
                Você tem mais <strong>{confirmedEventsList.length - 1}</strong>{" "}
                encontro(s) confirmado(s) na sua agenda.
              </span>
              <Link
                href="/eventos/meus-eventos"
                className="text-brand-primary font-bold hover:underline flex items-center gap-1"
              >
                <span>Ver todos os meus eventos</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          )}
        </section>
      </Container>
    </div>
  )
}
