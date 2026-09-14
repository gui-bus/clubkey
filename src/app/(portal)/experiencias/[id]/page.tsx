"use client"

import * as React from "react"
import Link from "next/link"
import { useParams, notFound } from "next/navigation"
import {
  MapPin,
  Check,
  ShieldCheck,
  Clock,
  CheckCircle2,
  Gift
} from "lucide-react"

import { EXPERIENCES, MEMBERS, formatBRL, getInitials } from "@/src/data/portalData"
import { usePortalStore } from "@/src/store/usePortalStore"
import { BackButton } from "@/src/components/portal/BackButton"
import { Avatar, AvatarImage, AvatarFallback } from "@/src/components/ui/avatar/avatar"
import { Badge } from "@/src/components/ui/badge/badge"
import { Button } from "@/src/components/ui/button/button"
import { toast } from "@/src/components/ui/toast/toast"
import Image from "next/image"
import { Container } from "@/src/components/common/container"

export default function ExperienceDetailPage(): React.JSX.Element {
  const params = useParams()
  const expId = Number(params?.id)
  const experience = EXPERIENCES.find((e) => e.id === expId)

  if (!experience) {
    notFound()
  }

  const { boughtExperiences, buyExperience } = usePortalStore()
  const isBought = !!boughtExperiences[experience.id]
  const isFree = experience.price === 0

  const attendees = experience.participants
    .map((id: number) => MEMBERS.find((m) => m.id === id))
    .filter((m): m is typeof MEMBERS[0] => Boolean(m))

  const handleFreeParticipation = () => {
    buyExperience(experience.id)
    toast.success("Vaga gratuita garantida com sucesso!", {
      description: `Sua presença em "${experience.title}" foi confirmada.`,
    })
  }

  return (
    <Container className="pt-28 md:pt-36 pb-12 space-y-8">
      <BackButton
        fallbackHref="/experiencias"
        label="Voltar para experiências"
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-8">
          <div className="rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] overflow-hidden shadow-xs">
            {experience.image && (
              <div className="relative h-64 sm:h-80 w-full overflow-hidden bg-zinc-900">
                <Image
                  src={experience.image}
                  alt={experience.title}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141416] via-black/40 to-transparent" />
                <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
                  <Badge
                    color="primary"
                    variant="default"
                    radius="sm"
                    className="font-black uppercase tracking-wider shadow-xs"
                  >
                    {experience.date}
                  </Badge>
                  <Badge
                    color="default"
                    variant="flat"
                    radius="sm"
                    className="bg-black/70 backdrop-blur-md text-white border-white/10 font-black uppercase tracking-wider"
                  >
                    {experience.place}
                  </Badge>
                </div>
              </div>
            )}

            <div className="p-6 sm:p-8 space-y-6">
              <h1 className="text-2xl sm:text-4xl font-heading font-black tracking-tight uppercase text-zinc-900 dark:text-white">
                {experience.title}
              </h1>

              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
                {experience.desc}
              </p>

              <div className="space-y-4 pt-6 border-t border-zinc-100 dark:border-zinc-800">
                <h3 className="text-sm font-black uppercase tracking-wider text-zinc-900 dark:text-white flex items-center gap-2">
                  <Gift className="w-4 h-4 text-brand-primary" />
                  O que está incluso
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {experience.includes.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 p-3.5 rounded-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 text-xs font-semibold text-zinc-800 dark:text-zinc-200"
                    >
                      <CheckCircle2 className="w-4 h-4 text-brand-primary shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-xl font-heading font-black tracking-tight uppercase text-zinc-900 dark:text-white">
              Quem vai ({attendees.length})
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {attendees.map((attendee) => (
                <Link
                  key={attendee?.id}
                  href={`/pessoas/${attendee?.id}`}
                  className="group flex items-center gap-3.5 p-4 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] hover:border-brand-primary/60 dark:hover:border-brand-primary/60 transition-all shadow-2xs hover:shadow-xs"
                >
                  <Avatar size="lg" radius="sm" className="shrink-0 ring-1 ring-zinc-200 dark:ring-zinc-800">
                    {(attendee?.image || attendee?.avatar) && (
                      <AvatarImage src={attendee.image || attendee.avatar} alt={attendee.name} />
                    )}
                    <AvatarFallback className="font-black text-xs bg-zinc-900 text-white dark:bg-zinc-800">
                      {getInitials(attendee?.name || "")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="text-sm font-bold uppercase tracking-tight text-zinc-900 dark:text-white group-hover:text-brand-primary transition-colors truncate">
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
            <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary block mb-1">
              {isFree ? "Condição de membro" : "Investimento por pessoa"}
            </span>
            <div className="text-3xl sm:text-4xl font-heading font-black tracking-tight text-zinc-900 dark:text-white">
              {isFree ? "Gratuita" : formatBRL(experience.price)}
            </div>
          </div>

          <div className="p-4 rounded-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 space-y-2 text-xs">
            <div className="flex justify-between text-zinc-500 dark:text-zinc-400">
              <span>Capacidade</span>
              <span className="font-bold text-zinc-900 dark:text-white">
                {experience.sub}
              </span>
            </div>
            <div className="flex justify-between text-zinc-500 dark:text-zinc-400">
              <span>Confirmados</span>
              <span className="font-bold text-zinc-900 dark:text-white">
                {attendees.length + (isBought ? 1 : 0)} pessoas
              </span>
            </div>
          </div>

          {isBought ? (
            <div className="p-4 rounded-sm bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-700 flex items-center justify-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-300">
              <Check className="w-4 h-4" />
              <span>Participação garantida</span>
            </div>
          ) : isFree ? (
            <Button
              type="button"
              color="primary"
              radius="sm"
              onClick={handleFreeParticipation}
              className="w-full h-12 text-xs font-black uppercase tracking-wider"
            >
              Garantir minha vaga gratuita
            </Button>
          ) : (
            <Link
              href={`/experiencias/${experience.id}/checkout`}
              className="w-full h-12 rounded-sm bg-brand-primary hover:bg-brand-primary/90 text-white text-xs font-black uppercase tracking-wider transition-all shadow-xs flex items-center justify-center"
            >
              Comprar vaga
            </Link>
          )}

          <div className="space-y-2 text-[11px] text-zinc-400 leading-relaxed pt-2">
            <p className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0 text-brand-primary" />
              Cobrança processada em nome do clube.
            </p>
            <p className="flex items-center gap-2">
              <Clock className="w-4 h-4 shrink-0 text-zinc-400" />
              Cancelamento gratuito até 48h antes do evento.
            </p>
          </div>
        </div>
      </div>
    </Container>
  )
}
