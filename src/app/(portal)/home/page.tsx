"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, ArrowRight, Users, Check, Clock, MapPin } from "lucide-react"

import { usePortalStore } from "@/src/store/usePortalStore"
import { EVENTS, EXPERIENCES, MEMBERS, BENEFITS, getInitials } from "@/src/data/portalData"
import { UniverseOrbit } from "@/src/components/portal/UniverseOrbit"
import { ExperienceCard } from "@/src/components/portal/ExperienceCard"
import { MemberCard } from "@/src/components/portal/MemberCard"
import { BenefitCard } from "@/src/components/portal/BenefitCard"

export default function HomePage(): React.JSX.Element {
  const { userProfile, confirmedEvents, toggleEventRSVP } = usePortalStore()

  const nextEvent = EVENTS[0]
  const isNextEventConfirmed = !!confirmedEvents[nextEvent.id]
  const nextEventCount =
    nextEvent.initialConfirmed + (isNextEventConfirmed ? 1 : 0)

  const participantMembers = nextEvent.participants
    .map((id: number) => MEMBERS.find((m) => m.id === id))
    .filter((m): m is typeof MEMBERS[0] => Boolean(m))
    .slice(0, 5)

  const featuredExperiences = EXPERIENCES.slice(0, 3)
  const featuredMembers = MEMBERS.slice(0, 3)
  const featuredBenefits = BENEFITS.slice(0, 3)

  return (
    <div className="w-full space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-primary block mb-1">
            Painel do Membro
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-zinc-900 dark:text-white font-heading">
            Olá, {userProfile.name}
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1 font-medium">
            {userProfile.role} na {userProfile.company} • Acesso VIP ClubKey
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/agenda"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200 hover:border-brand-primary/60 transition-colors shadow-xs"
          >
            <Calendar className="w-4 h-4 text-brand-primary" />
            <span>Calendário</span>
          </Link>
          <Link
            href="/pessoas"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-sm bg-brand-primary hover:bg-brand-primary-hover text-white text-xs font-bold uppercase tracking-wider transition-colors shadow-xs"
          >
            <Users className="w-4 h-4" />
            <span>Membros</span>
          </Link>
        </div>
      </div>

      <div className="relative w-full rounded-sm border border-zinc-200 dark:border-zinc-800 bg-zinc-950 text-white p-6 sm:p-8 lg:p-10 overflow-hidden shadow-md">
        {nextEvent.image && (
          <div className="absolute inset-0 z-0">
            <Image
              src={nextEvent.image}
              alt={nextEvent.title}
              fill
              priority
              className="object-cover opacity-25"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/90" />
          </div>
        )}

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="space-y-4 flex-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm text-xs font-bold uppercase tracking-wider bg-brand-primary/20 text-brand-primary border border-brand-primary/30">
              <Calendar className="w-3.5 h-3.5" />
              <span>Próximo encontro do clube</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-white font-heading">
              {nextEvent.title}
            </h2>

            <div className="flex items-center gap-4 text-xs sm:text-sm text-zinc-300 flex-wrap">
              <span className="flex items-center gap-1.5 font-semibold">
                <Calendar className="w-4 h-4 text-brand-primary" />
                {nextEvent.weekday}, {nextEvent.day} de {nextEvent.month} de 2026
              </span>
              <span className="text-zinc-600">•</span>
              <span className="flex items-center gap-1.5 font-semibold">
                <Clock className="w-4 h-4 text-brand-primary" />
                {nextEvent.time}
              </span>
              <span className="text-zinc-600">•</span>
              <span className="flex items-center gap-1.5 font-semibold">
                <MapPin className="w-4 h-4 text-brand-primary" />
                {nextEvent.place}
              </span>
            </div>

            <p className="text-sm text-zinc-300 leading-relaxed max-w-3xl">
              {nextEvent.desc}
            </p>
          </div>

          <div className="shrink-0 w-full lg:w-auto flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-5 pt-4 lg:pt-0 border-t lg:border-t-0 border-white/10">
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                {participantMembers.map((m) => (
                  <div
                    key={m?.id}
                    className="relative w-8 h-8 rounded-sm overflow-hidden bg-zinc-800 text-white flex items-center justify-center text-xs font-bold ring-1 ring-white/20"
                    title={m?.name}
                  >
                    {m?.avatar ? (
                      <Image
                        src={m.avatar}
                        alt={m?.name || ""}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      getInitials(m?.name || "")
                    )}
                  </div>
                ))}
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                {nextEventCount} de {nextEvent.capacity} confirmados
              </span>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => toggleEventRSVP(nextEvent.id)}
                className={`flex-1 sm:flex-none px-6 py-3 rounded-sm text-xs font-bold uppercase tracking-wider transition-all shadow-xs cursor-pointer ${
                  isNextEventConfirmed
                    ? "bg-emerald-500 text-white shadow-xs"
                    : "bg-brand-primary hover:bg-brand-primary-hover text-white"
                }`}
              >
                {isNextEventConfirmed ? (
                  <span className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5" />
                    Presença confirmada
                  </span>
                ) : (
                  "Confirmar presença"
                )}
              </button>

              <Link
                href={`/agenda/${nextEvent.id}`}
                className="px-5 py-3 rounded-sm border border-white/20 bg-white/10 hover:bg-white/20 text-xs font-bold uppercase tracking-wider text-white transition-colors"
              >
                Detalhes
              </Link>
            </div>
          </div>
        </div>
      </div>

      <UniverseOrbit />

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-primary block mb-0.5">
              Curadoria
            </span>
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-zinc-900 dark:text-white font-heading">
              Experiências em destaque
            </h2>
          </div>
          <Link
            href="/experiencias"
            className="text-xs font-bold uppercase tracking-wider text-brand-primary hover:translate-x-0.5 transition-transform flex items-center gap-1"
          >
            <span>Ver todas</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredExperiences.map((exp) => (
            <ExperienceCard key={exp.id} experience={exp} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-primary block mb-0.5">
              Networking
            </span>
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-zinc-900 dark:text-white font-heading">
              Pessoas para conhecer
            </h2>
          </div>
          <Link
            href="/pessoas"
            className="text-xs font-bold uppercase tracking-wider text-brand-primary hover:translate-x-0.5 transition-transform flex items-center gap-1"
          >
            <span>Ver diretório</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredMembers.map((member) => (
            <MemberCard key={member.id} member={member} />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand-primary block mb-0.5">
              Vantagens
            </span>
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-zinc-900 dark:text-white font-heading">
              Benefícios e parcerias
            </h2>
          </div>
          <Link
            href="/beneficios"
            className="text-xs font-bold uppercase tracking-wider text-brand-primary hover:translate-x-0.5 transition-transform flex items-center gap-1"
          >
            <span>Ver todos</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredBenefits.map((benefit) => (
            <BenefitCard key={benefit.id} benefit={benefit} />
          ))}
        </div>
      </section>
    </div>
  )
}
