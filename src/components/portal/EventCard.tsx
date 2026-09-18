"use client"

import * as React from "react"

import Image from "next/image"
import { useRouter } from "next/navigation"

import {
  EventItem,
  MEMBERS,
  getEventSlug,
  getInitials,
  getMemberSlug,
} from "@/src/data/portalData"
import { usePortalStore } from "@/src/store/usePortalStore"
import {
  ArrowUpRight,
  Check,
  Clock,
  MapPin,
  Plus,
  Users,
  X,
} from "@phosphor-icons/react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar/avatar"
import { AvatarGroup } from "@/src/components/ui/avatarGroup/avatarGroup"
import { toast } from "@/src/components/ui/toast/toast"

import { CtaButton } from "@/src/components/common/ctaButton"

import { useMounted } from "@/src/hooks/useMounted"

interface EventCardProps {
  event: EventItem
}

export function EventCard({ event }: EventCardProps): React.JSX.Element {
  const router = useRouter()
  const { confirmedEvents, toggleEventRSVP } = usePortalStore()
  const mounted = useMounted()

  const isConfirmed = mounted && !!confirmedEvents[event.id]
  const currentCount = event.initialConfirmed + (isConfirmed ? 1 : 0)
  const remainingSpots = Math.max(0, event.capacity - currentCount)

  const organizer =
    MEMBERS.find((m) => m.id === event.organizerId) || MEMBERS[0]

  const participantMembers = event.participants
    .map((id: number) => MEMBERS.find((m) => m.id === id))
    .filter((m): m is (typeof MEMBERS)[0] => Boolean(m))
    .slice(-3)

  const handleRSVP = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const next = toggleEventRSVP(event.id)
    if (next) {
      toast.success(`Presença confirmada: ${event.title}`, {
        description: "Adicionado aos seus eventos confirmados.",
      })
    } else {
      toast.info(`Presença cancelada: ${event.title}`)
    }
  }

  const handleCardClick = () => {
    router.push(`/eventos/${event.id}/${getEventSlug(event)}`)
  }

  return (
    <div
      onClick={handleCardClick}
      className="group/card relative block rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] overflow-hidden hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors duration-200 cursor-pointer"
    >
      <div className="flex flex-col md:flex-row items-stretch">
        <div className="relative w-full md:w-72 lg:w-80 h-52 md:h-auto min-h-[220px] shrink-0 overflow-hidden bg-zinc-950">
          {event.image ? (
            <>
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover opacity-80 group-hover/card:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-zinc-950" />
          )}

          {isConfirmed && (
            <div className="absolute top-3.5 left-3.5 z-10">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-sm bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest shadow-xs whitespace-nowrap">
                <Check className="w-3 h-3 shrink-0" />
                <span>Confirmado</span>
              </span>
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 z-10 flex items-center gap-2 px-3.5 py-2.5 bg-black/40 backdrop-blur-md border-t border-white/10">
            <span className="text-[11px] font-bold text-white uppercase tracking-wider">
              {event.weekday}, {event.day} de {event.month}
            </span>
            <span className="text-white/40">•</span>
            <span className="flex items-center gap-1 text-[11px] text-white/80">
              <Clock className="w-3 h-3 text-white/60 shrink-0" />
              {event.time}
            </span>
          </div>
        </div>

        <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between gap-5 min-w-0">
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
              {organizer.avatar ? (
                <div className="relative w-5 h-5 rounded-full overflow-hidden shrink-0 border border-zinc-200 dark:border-zinc-700">
                  <Image
                    src={organizer.avatar}
                    alt={`${organizer.firstName} ${organizer.lastName}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="w-5 h-5 rounded-full bg-zinc-800 text-white font-bold text-[8px] flex items-center justify-center shrink-0">
                  {getInitials(organizer.firstName, organizer.lastName)}
                </div>
              )}
              <span className="text-zinc-700 dark:text-zinc-300 font-semibold truncate">
                Host: {organizer.firstName} {organizer.lastName} (
                {organizer.company})
              </span>
            </div>

            <div className="space-y-1.5">
              <h3 className="text-lg sm:text-xl font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white group-hover/card:text-brand-primary transition-colors leading-snug">
                {event.title}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
                {event.desc}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-600 dark:text-zinc-300 pt-1">
              <div className="flex items-center gap-1.5 font-medium">
                <MapPin className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                <span className="truncate">{event.place}</span>
              </div>
              <span className="text-zinc-300 dark:text-zinc-700 hidden sm:inline">
                •
              </span>
              <div className="flex items-center gap-1.5 font-medium">
                <Users className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                <span>{remainingSpots} vagas restantes</span>
              </div>
              <span className="text-zinc-300 dark:text-zinc-700 hidden sm:inline">
                •
              </span>
              <div className="flex items-center gap-1.5 font-medium">
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

          <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <AvatarGroup
                showTooltip
                isPressable
                radius="full"
                size="sm"
                overlap="sm"
              >
                {participantMembers.map((member) => (
                  <Avatar
                    key={member.id}
                    title={`${member.firstName} ${member.lastName} • ${member.role} (${member.company})`}
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      router.push(
                        `/conexoes/${member.id}/${getMemberSlug(member)}`
                      )
                    }}
                    className="cursor-pointer"
                  >
                    {member.avatar && (
                      <AvatarImage
                        src={member.avatar}
                        alt={`${member.firstName} ${member.lastName}`}
                      />
                    )}
                    <AvatarFallback className="font-bold text-[9px] bg-zinc-800 text-white">
                      {getInitials(member.firstName, member.lastName)}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </AvatarGroup>

              <div className="min-w-0">
                <p className="text-xs font-bold text-zinc-900 dark:text-white leading-none">
                  {currentCount} membros confirmados
                </p>
                <p className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wider mt-1">
                  Capacidade: {event.capacity}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {isConfirmed ? (
                <CtaButton
                  type="button"
                  variant="secondary"
                  size="xs"
                  onClick={handleRSVP}
                  className="w-full sm:w-auto px-4 h-9 text-[11px] font-bold uppercase tracking-wider whitespace-nowrap shadow-none hover:shadow-none border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:border-rose-500/40 hover:bg-rose-500/10 hover:text-rose-600 dark:hover:text-rose-400 shrink-0"
                  sliderClassName="bg-rose-500/15"
                  textClassName="text-emerald-600 dark:text-emerald-400 group-hover:text-rose-600 dark:group-hover:text-rose-400 whitespace-nowrap"
                >
                  <span className="inline-flex items-center gap-1.5 group-hover:hidden whitespace-nowrap">
                    <Check className="w-3.5 h-3.5 shrink-0" />
                    <span>Presença confirmada</span>
                  </span>
                  <span className="hidden items-center gap-1.5 group-hover:inline-flex whitespace-nowrap">
                    <X className="w-3.5 h-3.5 shrink-0" />
                    <span>Cancelar presença</span>
                  </span>
                </CtaButton>
              ) : (
                <CtaButton
                  type="button"
                  variant="primary"
                  size="xs"
                  onClick={handleRSVP}
                  className="w-full sm:w-auto px-4 h-9 text-[11px] font-bold uppercase tracking-wider whitespace-nowrap shadow-none hover:shadow-none shrink-0"
                  textClassName="whitespace-nowrap"
                >
                  <Plus className="w-3.5 h-3.5 mr-1.5 shrink-0" />
                  <span>Confirmar presença</span>
                </CtaButton>
              )}

              <CtaButton
                href={`/eventos/${event.id}/${getEventSlug(event)}`}
                variant="secondary"
                size="xs"
                className="hidden sm:flex w-9 h-9 px-0 items-center justify-center shadow-none hover:shadow-none shrink-0"
              >
                <ArrowUpRight className="w-4 h-4" />
              </CtaButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
