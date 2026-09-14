"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  MapPin,
  Clock,
  Check,
  X,
  Plus,
  Users,
  ArrowUpRight,
  ShieldCheck
} from "lucide-react"

import { EventItem, MEMBERS, getInitials, getEventSlug, getMemberSlug } from "@/src/data/portalData"
import { usePortalStore } from "@/src/store/usePortalStore"
import { AvatarGroup } from "@/src/components/ui/avatarGroup/avatarGroup"
import { Avatar, AvatarImage, AvatarFallback } from "@/src/components/ui/avatar/avatar"
import { toast } from "@/src/components/ui/toast/toast"
import { cn } from "@/src/lib/utils"

interface EventCardProps {
  event: EventItem
}

export function EventCard({ event }: EventCardProps): React.JSX.Element {
  const router = useRouter()
  const { confirmedEvents, toggleEventRSVP } = usePortalStore()
  const isConfirmed = !!confirmedEvents[event.id]
  const currentCount = event.initialConfirmed + (isConfirmed ? 1 : 0)
  const remainingSpots = Math.max(0, event.capacity - currentCount)

  const organizer = MEMBERS.find((m) => m.id === event.organizerId) || MEMBERS[0]

  const participantMembers = event.participants
    .map((id: number) => MEMBERS.find((m) => m.id === id))
    .filter((m): m is typeof MEMBERS[0] => Boolean(m))
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

  return (
    <Link
      href={`/eventos/${event.id}/${getEventSlug(event)}`}
      className="group relative block rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] overflow-hidden cursor-pointer"
    >
      <div className="flex flex-col md:flex-row items-stretch">
        <div className="relative w-full md:w-72 lg:w-80 h-52 md:h-auto min-h-[220px] shrink-0 overflow-hidden bg-zinc-950">
          {event.image ? (
            <>
              <Image
                src={event.image}
                alt={event.title}
                fill
                className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />
            </>
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-zinc-950" />
          )}

          <div className="absolute top-3.5 left-3.5 right-3.5 z-10 flex items-center justify-between gap-2">
            <span className="inline-flex items-center px-2.5 py-1 rounded-sm bg-white/10 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest text-white shadow-xs">
              {event.category || "Exclusivo"}
            </span>

            {isConfirmed && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-sm bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest shadow-xs">
                <Check className="w-3 h-3" />
                <span>Confirmado</span>
              </span>
            )}
          </div>

          <div className="absolute bottom-3.5 left-3.5 right-3.5 z-10">
            <div className="flex items-center gap-3 p-2.5 sm:p-3 rounded-sm bg-white/10 backdrop-blur-md shadow-xs">
              <div className="flex flex-col items-center justify-center min-w-11 px-2 py-1 rounded-sm bg-brand-primary text-white text-center shrink-0">
                <span className="text-xl font-black font-heading leading-none text-white">
                  {event.day}
                </span>
                <span className="text-[9px] font-black uppercase tracking-wider leading-none mt-0.5 text-white">
                  {event.month}
                </span>
              </div>

              <div className="min-w-0">
                <p className="text-xs font-bold text-white uppercase tracking-wider truncate">
                  {event.weekday}
                </p>
                <p className="text-[11px] text-white/90 flex items-center gap-1 mt-0.5">
                  <Clock className="w-3 h-3 text-brand-primary shrink-0" />
                  <span>{event.time}</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1 p-5 sm:p-6 flex flex-col justify-between gap-5 min-w-0">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                {organizer.avatar ? (
                  <div className="relative w-5 h-5 rounded-full overflow-hidden shrink-0 border border-zinc-200 dark:border-zinc-700">
                    <Image
                      src={organizer.avatar}
                      alt={organizer.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full bg-zinc-800 text-white font-bold text-[8px] flex items-center justify-center shrink-0">
                    {getInitials(organizer.name)}
                  </div>
                )}
                <span className="text-zinc-700 dark:text-zinc-300 font-semibold truncate">
                  Host: {organizer.name} ({organizer.company})
                </span>
              </div>

              <span className="text-[11px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-primary" />
                Acesso Membros
              </span>
            </div>

            <div className="space-y-1.5">
              <h3 className="text-lg sm:text-xl font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white group-hover:text-brand-primary transition-colors leading-snug">
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
              <span className="text-zinc-300 dark:text-zinc-700 hidden sm:inline">•</span>
              <div className="flex items-center gap-1.5 font-medium">
                <Users className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                <span>{remainingSpots} vagas restantes</span>
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
              <button
                type="button"
                onClick={handleRSVP}
                className={cn(
                  "group/rsvp relative inline-flex items-center justify-center gap-1.5 w-full sm:w-36 h-9 px-4 rounded-sm text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer select-none active:scale-[0.98]",
                  isConfirmed
                    ? "border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:border-rose-500/30 hover:bg-rose-500/10 hover:text-rose-600 dark:hover:text-rose-400"
                    : "bg-brand-primary text-white hover:bg-brand-primary/90 shadow-xs"
                )}
              >
                {isConfirmed ? (
                  <>
                    <span className="inline-flex items-center gap-1.5 group-hover/rsvp:hidden">
                      <Check className="w-3.5 h-3.5" />
                      <span>Confirmado</span>
                    </span>
                    <span className="hidden items-center gap-1.5 group-hover/rsvp:inline-flex">
                      <X className="w-3.5 h-3.5" />
                      <span>Desmarcar</span>
                    </span>
                  </>
                ) : (
                  <span className="inline-flex items-center gap-1">
                    <Plus className="w-3.5 h-3.5" />
                    <span>Confirmar</span>
                  </span>
                )}
              </button>

              <div className="hidden sm:flex items-center justify-center w-9 h-9 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-zinc-500 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

