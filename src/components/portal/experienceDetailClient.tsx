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

import { toast } from "@/src/components/ui/toast/toast"

import { Container } from "@/src/components/common/container"
import { CtaButton } from "@/src/components/common/ctaButton"
import { AddToCalendarButton } from "@/src/components/portal/addToCalendarButton"
import { BackButton } from "@/src/components/portal/backButton"
import { GlassBadge } from "@/src/components/portal/glassBadge"
import { MemberCard } from "@/src/components/portal/memberCard"
import { RelatedExperiencesCard } from "@/src/components/portal/relatedExperiencesCard"
import { ShareButton } from "@/src/components/portal/shareButton"

import { brandConfig } from "@/src/config/brand.config"

export function ExperienceDetailClient({
  expId: initialExpId,
}: {
  expId?: number
}): React.JSX.Element {
  const params = useParams()
  const idParam = Array.isArray(params?.id) ? params.id[0] : params?.id
  const expId = initialExpId ?? Number(idParam)
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
    <div className="w-full flex flex-col pb-20 space-y-10">
      <div className="relative w-full min-h-[380px] sm:min-h-[460px] lg:min-h-[500px] bg-zinc-950 overflow-hidden flex flex-col justify-between py-6 sm:py-8">
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

        <Container className="relative z-10 w-full h-full flex flex-col justify-between space-y-10">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <BackButton
                fallbackHref="/experiencias"
                label="Experiências"
                className="text-white hover:text-white/80"
              />
              <span className="text-white/60 hidden sm:inline">/</span>
              <span className="text-xs font-bold text-white truncate max-w-xs sm:max-w-md hidden sm:inline">
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

          <div className="flex items-center justify-between gap-3">
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

          <div className="max-w-4xl space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-brand-primary/90 text-white text-xs font-black uppercase tracking-widest">
              <Calendar className="w-3.5 h-3.5" />
              <span>
                {experience.weekday && experience.day && experience.month
                  ? `${experience.weekday}, ${experience.day} de ${experience.month}${experience.time ? ` • ${experience.time}` : ""}`
                  : experience.date}
              </span>
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
                <span>+{experience.xp || 300} XP</span>
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-brand-primary shrink-0" />
                    <span className="text-xs font-black uppercase tracking-widest text-brand-primary">
                      Data & Período
                    </span>
                  </div>
                  <div>
                    <p className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white">
                      {experience.date}
                    </p>
                    <p className="text-xs text-zinc-900 dark:text-white font-medium mt-0.5">
                      Programação oficial exclusiva do clube
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
                    <p className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white truncate">
                      {experience.place}
                    </p>
                    <p className="text-xs text-zinc-900 dark:text-white font-medium mt-0.5">
                      Acesso reservado e suporte dedicado
                    </p>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-brand-primary shrink-0" />
                    <span className="text-xs font-black uppercase tracking-widest text-brand-primary">
                      Capacidade & Formato
                    </span>
                  </div>
                  <div>
                    <p className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white">
                      {experience.sub}
                    </p>
                    <p className="text-xs text-zinc-900 dark:text-white font-medium mt-0.5">
                      Vagas limitadas para garantir exclusividade
                    </p>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    {isFree ? (
                      <Gift className="w-4 h-4 text-brand-primary shrink-0" />
                    ) : (
                      <ShieldCheck className="w-4 h-4 text-brand-primary shrink-0" />
                    )}
                    <span className="text-xs font-black uppercase tracking-widest text-brand-primary">
                      Condição de Membro
                    </span>
                  </div>
                  <div>
                    <p className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white">
                      {isFree
                        ? "Gratuita (Cortesia)"
                        : formatBRL(experience.price)}
                    </p>
                    <p className="text-xs text-zinc-900 dark:text-white font-medium mt-0.5">
                      Curadoria e garantia oficial {brandConfig.name}
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

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
                {experience.includes.map((item, index) => (
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
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="text-xs font-black uppercase tracking-widest text-brand-primary block mb-1">
                    Rede & Membros
                  </span>
                  <h2 className="text-2xl font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white">
                    Quem vai estar lá ({attendees.length})
                  </h2>
                </div>

                <Link
                  href={`/experiencias/${experience.id}/${expSlug}/quem-vai`}
                  className="text-xs font-bold uppercase tracking-wider text-brand-primary hover:underline flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <span>Ver todos os participantes</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
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

              <div className="space-y-2 text-xs pt-1">
                <div className="flex justify-between text-zinc-700 dark:text-zinc-300">
                  <span>Capacidade total</span>
                  <span className="font-bold text-zinc-900 dark:text-white">
                    {experience.sub}
                  </span>
                </div>
                <div className="flex justify-between text-zinc-700 dark:text-zinc-300">
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
                    variant="dark-outline"
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
                    href={`/experiencias/${experience.id}/${expSlug}/reserva`}
                    variant="primary"
                    size="md"
                    isFullWidth
                    className="h-12 text-xs shadow-none hover:shadow-none"
                  >
                    <span>Reservar vaga</span>
                    <ArrowRight className="w-4 h-4 ml-2 shrink-0" />
                  </CtaButton>
                )}

                <CtaButton
                  href={`/experiencias/${experience.id}/${expSlug}/quem-vai`}
                  variant="outline"
                  size="md"
                  isFullWidth
                  className="h-12 text-xs shadow-none hover:shadow-none"
                >
                  <Users className="w-3.5 h-3.5 text-brand-primary mr-2 shrink-0" />
                  <span>Ver todos os participantes ({attendees.length})</span>
                </CtaButton>
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
                  <span>
                    Atendimento e suporte dedicado durante a experiência
                  </span>
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
            <RelatedExperiencesCard experience={prevExp} />
            <RelatedExperiencesCard experience={nextExp} />
          </div>
        </section>
      </Container>
    </div>
  )
}
