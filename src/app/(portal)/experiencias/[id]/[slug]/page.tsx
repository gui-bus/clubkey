"use client"

import * as React from "react"

import Image from "next/image"
import Link from "next/link"
import { notFound, useParams } from "next/navigation"

import {
  EXPERIENCES,
  MEMBERS,
  formatBRL,
  getExperienceSlug,
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
  Gift,
  MapPin,
  Plus,
  ShieldCheck,
  Users,
} from "@phosphor-icons/react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar/avatar"
import { Button } from "@/src/components/ui/button/button"
import { toast } from "@/src/components/ui/toast/toast"

import { Container } from "@/src/components/common/container"
import { CtaButton } from "@/src/components/common/ctaButton"
import { AddToCalendarButton } from "@/src/components/portal/AddToCalendarButton"
import { BackButton } from "@/src/components/portal/BackButton"
import { GlassBadge } from "@/src/components/portal/GlassBadge"
import { MemberCard } from "@/src/components/portal/MemberCard"
import { ShareButton } from "@/src/components/portal/ShareButton"

export default function ExperienceDetailPage(): React.JSX.Element {
  const params = useParams()
  const idParam = Array.isArray(params?.id) ? params.id[0] : params?.id
  const expId = Number(idParam)
  const experience = EXPERIENCES.find((e) => e.id === expId)

  if (!experience) {
    notFound()
  }

  const expSlug = getExperienceSlug(experience)
  const { boughtExperiences, buyExperience } = usePortalStore()
  const isBought = !!boughtExperiences[experience.id]
  const isFree = experience.price === 0

  const attendees = experience.participants
    .map((id: number) => MEMBERS.find((m) => m.id === id))
    .filter((m): m is (typeof MEMBERS)[0] => Boolean(m))

  const currentIndex = EXPERIENCES.findIndex((e) => e.id === experience.id)
  const prevExp =
    currentIndex > 0
      ? EXPERIENCES[currentIndex - 1]
      : EXPERIENCES[EXPERIENCES.length - 1]
  const nextExp =
    currentIndex < EXPERIENCES.length - 1
      ? EXPERIENCES[currentIndex + 1]
      : EXPERIENCES[0]

  const handleFreeParticipation = () => {
    buyExperience(experience.id)
    toast.success("Vaga gratuita garantida com sucesso!", {
      description: `Sua presença em "${experience.title}" foi confirmada.`,
    })
  }

  return (
    <Container className="pt-6 sm:pt-8 pb-20 space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <BackButton fallbackHref="/experiencias" label="Experiências" />
          <span className="text-zinc-300 dark:text-zinc-700 hidden sm:inline">
            /
          </span>
          <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400 truncate max-w-xs sm:max-w-md hidden sm:inline">
            {experience.title}
          </span>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <ShareButton />
          <AddToCalendarButton
            title={experience.title}
            description={experience.desc}
            location={experience.place}
          />
        </div>
      </div>

      <div className="relative rounded-sm overflow-hidden bg-zinc-950 border border-zinc-200 dark:border-zinc-800 shadow-lg min-h-[380px] sm:min-h-[460px] lg:min-h-[500px] flex flex-col justify-between p-6 sm:p-10">
        {experience.image && (
          <div className="absolute inset-0 z-0">
            <Image
              src={experience.image}
              alt={experience.title}
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
            {isFree ? "Cortesia Membro" : "Experiência Exclusiva"}
          </GlassBadge>

          {isBought && (
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-sm bg-emerald-500 text-white text-[11px] font-black uppercase tracking-widest shadow-md">
              <Check className="w-3.5 h-3.5" />
              <span>Vaga Garantida</span>
            </span>
          )}
        </div>

        <div className="relative z-10 max-w-4xl space-y-4 pt-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-brand-primary/90 text-white text-xs font-black uppercase tracking-widest">
            <Calendar className="w-3.5 h-3.5" />
            <span>{experience.date}</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-black uppercase tracking-tight text-white leading-[1.05] drop-shadow-md">
            {experience.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-zinc-300 pt-1">
            <span className="flex items-center gap-1.5 font-medium text-white">
              <MapPin className="w-4 h-4 text-brand-primary shrink-0" />
              {experience.place}
            </span>
            <span className="text-zinc-500 hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5 font-medium text-zinc-300">
              <Users className="w-4 h-4 text-brand-primary shrink-0" />
              {experience.sub}
            </span>
            <span className="text-zinc-500 hidden sm:inline">•</span>
            <span className="font-semibold text-white">
              {isFree ? "Gratuita para membros" : formatBRL(experience.price)}
            </span>
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
                {experience.desc}
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
                    Data & Período
                  </span>
                </div>
                <div className="pt-1">
                  <p className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white">
                    {experience.date}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                    Programação oficial exclusiva do clube
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
                    {experience.place}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                    Acesso reservado e suporte do concierge
                  </p>
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] space-y-2 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-sm bg-brand-primary/10 flex items-center justify-center shrink-0">
                    <Users className="w-4 h-4 text-brand-primary" />
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-widest text-zinc-400">
                    Capacidade & Formato
                  </span>
                </div>
                <div className="pt-1">
                  <p className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white">
                    {experience.sub}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                    Vagas limitadas para garantir exclusividade
                  </p>
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] space-y-2 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-sm bg-brand-primary/10 flex items-center justify-center shrink-0">
                    {isFree ? (
                      <Gift className="w-4 h-4 text-brand-primary" />
                    ) : (
                      <ShieldCheck className="w-4 h-4 text-brand-primary" />
                    )}
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-widest text-zinc-400">
                    Condição de Membro
                  </span>
                </div>
                <div className="pt-1">
                  <p className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white">
                    {isFree
                      ? "Gratuita (Cortesia)"
                      : formatBRL(experience.price)}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                    Curadoria e garantia oficial ClubKey
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
                O que está incluso nesta experiência
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {experience.includes.map((item, index) => (
                <div
                  key={index}
                  className="p-4 sm:p-5 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] flex items-start gap-3 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
                >
                  <CheckCircle className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                  <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="space-y-6 pt-8 border-t border-zinc-200 dark:border-zinc-800">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-brand-primary block mb-1">
                  Rede & Membros
                </span>
                <h2 className="text-2xl font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white">
                  Quem vai estar lá ({attendees.length})
                </h2>
              </div>

              <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                {experience.sub}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {attendees.slice(0, 6).map((attendee) => (
                <MemberCard key={attendee.id} member={attendee} />
              ))}
            </div>
          </section>
        </div>

        <div className="lg:sticky lg:top-24 space-y-6">
          <div className="rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] p-6 sm:p-8 space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary block">
                {isFree
                  ? "Condição de Membro"
                  : "Investimento por Participante"}
              </span>
              <div className="flex items-baseline justify-between gap-2 pt-1">
                <span className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white font-heading leading-none">
                  {isFree ? "Gratuita" : formatBRL(experience.price)}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  {isFree ? "Cortesia" : "/ pessoa"}
                </span>
              </div>

              <p className="text-xs text-zinc-500 dark:text-zinc-400 pt-1 leading-relaxed">
                {isFree
                  ? "Vaga cortesia concedida pelo plano do clube. Confirme para reservar."
                  : "Experiência exclusiva com curadoria, transporte e atendimento premium."}
              </p>
            </div>

            <div className="p-4 rounded-sm bg-[#F1F1F1] dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 space-y-2 text-xs">
              <div className="flex justify-between text-zinc-500 dark:text-zinc-400">
                <span>Capacidade total</span>
                <span className="font-bold text-zinc-900 dark:text-white">
                  {experience.sub}
                </span>
              </div>
              <div className="flex justify-between text-zinc-500 dark:text-zinc-400">
                <span>Participantes confirmados</span>
                <span className="font-bold text-zinc-900 dark:text-white">
                  {attendees.length + (isBought ? 1 : 0)} membros
                </span>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
              {isBought ? (
                <CtaButton
                  type="button"
                  variant="secondary"
                  size="md"
                  isFullWidth
                  className="h-12 text-xs shadow-none hover:shadow-none border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 cursor-default"
                  disableRipple
                >
                  <Check className="w-4 h-4 mr-2" />
                  <span>Vaga garantida</span>
                </CtaButton>
              ) : isFree ? (
                <CtaButton
                  type="button"
                  variant="primary"
                  size="md"
                  isFullWidth
                  onClick={handleFreeParticipation}
                  className="h-12 text-xs shadow-none hover:shadow-none"
                >
                  <Plus className="w-4 h-4 mr-2 shrink-0" />
                  <span>Garantir minha vaga gratuita</span>
                </CtaButton>
              ) : (
                <CtaButton
                  href={`/experiencias/${experience.id}/${expSlug}/checkout`}
                  variant="primary"
                  size="md"
                  isFullWidth
                  className="h-12 text-xs shadow-none hover:shadow-none"
                >
                  <span>Reservar vaga</span>
                  <ArrowRight className="w-4 h-4 ml-2 shrink-0" />
                </CtaButton>
              )}
            </div>

            <div className="space-y-2.5 pt-5 border-t border-zinc-100 dark:border-zinc-800 text-xs text-zinc-600 dark:text-zinc-300">
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-brand-primary shrink-0 mt-0.5" />
                <span>Cobrança segura processada pelo clube</span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                <span>Cancelamento gratuito até 48h antes da data</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Concierge e suporte dedicado durante a experiência</span>
              </div>
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
              Outras Experiências Exclusivas
            </h2>
          </div>
          <Link
            href="/experiencias"
            className="text-xs font-bold uppercase tracking-wider text-brand-primary hover:underline flex items-center gap-1.5"
          >
            <span>Ver todas as experiências</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href={`/experiencias/${prevExp.id}/${getExperienceSlug(prevExp)}`}
            className="group relative flex flex-col sm:flex-row items-stretch overflow-hidden rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] hover:border-brand-primary transition-all duration-200 shadow-xs"
          >
            <div className="relative w-full sm:w-44 h-36 sm:h-auto shrink-0 bg-zinc-950 overflow-hidden">
              {prevExp.image && (
                <Image
                  src={prevExp.image}
                  alt={prevExp.title}
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
                    {prevExp.price === 0
                      ? "Gratuita"
                      : formatBRL(prevExp.price)}
                  </span>
                  <span className="text-zinc-500 font-medium">
                    {prevExp.date}
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white group-hover:text-brand-primary transition-colors line-clamp-2">
                  {prevExp.title}
                </h3>
              </div>

              <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400 pt-2 border-t border-zinc-100 dark:border-zinc-800/60 truncate">
                <span className="flex items-center gap-1 truncate">
                  <MapPin className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                  <span className="truncate">{prevExp.place}</span>
                </span>
                <span>•</span>
                <span className="shrink-0">{prevExp.sub}</span>
              </div>
            </div>
          </Link>

          <Link
            href={`/experiencias/${nextExp.id}/${getExperienceSlug(nextExp)}`}
            className="group relative flex flex-col sm:flex-row items-stretch overflow-hidden rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] hover:border-brand-primary transition-all duration-200 shadow-xs"
          >
            <div className="relative w-full sm:w-44 h-36 sm:h-auto shrink-0 bg-zinc-950 overflow-hidden">
              {nextExp.image && (
                <Image
                  src={nextExp.image}
                  alt={nextExp.title}
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
                    {nextExp.price === 0
                      ? "Gratuita"
                      : formatBRL(nextExp.price)}
                  </span>
                  <span className="text-zinc-500 font-medium">
                    {nextExp.date}
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white group-hover:text-brand-primary transition-colors line-clamp-2">
                  {nextExp.title}
                </h3>
              </div>

              <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400 pt-2 border-t border-zinc-100 dark:border-zinc-800/60 truncate">
                <span className="flex items-center gap-1 truncate">
                  <MapPin className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                  <span className="truncate">{nextExp.place}</span>
                </span>
                <span>•</span>
                <span className="shrink-0">{nextExp.sub}</span>
              </div>
            </div>
          </Link>
        </div>
      </section>
    </Container>
  )
}
