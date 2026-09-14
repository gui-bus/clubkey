"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Clock, Check, Users } from "lucide-react"

import { EventItem, MEMBERS, getInitials } from "@/src/data/portalData"
import { usePortalStore } from "@/src/store/usePortalStore"

interface EventCardProps {
  event: EventItem
}

export function EventCard({ event }: EventCardProps): React.JSX.Element {
  const { confirmedEvents, toggleEventRSVP } = usePortalStore()
  const isConfirmed = !!confirmedEvents[event.id]
  const currentCount = event.initialConfirmed + (isConfirmed ? 1 : 0)

  const participantMembers = event.participants
    .map((id: number) => MEMBERS.find((m) => m.id === id))
    .filter((m): m is typeof MEMBERS[0] => Boolean(m))
    .slice(0, 4)

  const handleRSVP = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleEventRSVP(event.id)
  }

  return (
    <Link
      href={`/agenda/${event.id}`}
      className="group block p-5 md:p-6 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] hover:border-brand-primary/60 dark:hover:border-brand-primary/60 transition-all hover:shadow-lg cursor-pointer"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div className="flex items-start gap-4">
          <div className="relative w-16 h-16 sm:w-20 sm:h-20 shrink-0 rounded-sm overflow-hidden bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex flex-col items-center justify-center text-center">
            {event.image ? (
              <>
                <Image
                  src={event.image}
                  alt={event.title}
                  fill
                  className="object-cover opacity-30 group-hover:scale-110 transition-transform duration-500"
                />
                <div className="relative z-10 flex flex-col items-center">
                  <span className="text-xl sm:text-2xl font-black text-white leading-none font-heading">
                    {event.day}
                  </span>
                  <span className="text-[10px] font-black text-brand-primary uppercase tracking-widest mt-1">
                    {event.month}
                  </span>
                </div>
              </>
            ) : (
              <>
                <span className="text-xl font-bold text-zinc-900 dark:text-white leading-none">
                  {event.day}
                </span>
                <span className="text-[10px] font-semibold text-brand-primary uppercase tracking-widest mt-1">
                  {event.month}
                </span>
              </>
            )}
          </div>

          <div className="space-y-1.5 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base sm:text-lg font-bold uppercase tracking-tight text-zinc-900 dark:text-white group-hover:text-brand-primary transition-colors line-clamp-1">
                {event.title}
              </h3>
              {isConfirmed && (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-sm text-[10px] font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                  <Check className="w-3 h-3" />
                  Confirmado
                </span>
              )}
            </div>

            <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-1">
              {event.desc}
            </p>

            <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400 flex-wrap pt-0.5">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-brand-primary" />
                {event.weekday}, {event.time}
              </span>
              <span className="text-zinc-300 dark:text-zinc-700">•</span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-brand-primary" />
                {event.place}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between lg:justify-end gap-5 pt-3 lg:pt-0 border-t lg:border-t-0 border-zinc-100 dark:border-zinc-800/80 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="flex -space-x-2">
              {participantMembers.map((member) => (
                <div
                  key={member?.id}
                  className="relative w-7 h-7 rounded-sm overflow-hidden bg-zinc-800 text-white flex items-center justify-center text-[10px] font-bold ring-1 ring-white dark:ring-zinc-900"
                  title={member?.name}
                >
                  {member?.avatar ? (
                    <Image
                      src={member.avatar}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    getInitials(member?.name || "")
                  )}
                </div>
              ))}
            </div>
            <span className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              {currentCount}/{event.capacity}
            </span>
          </div>

          <button
            type="button"
            onClick={handleRSVP}
            className={`px-4 py-2 rounded-sm text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-xs ${
              isConfirmed
                ? "bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                : "bg-brand-primary text-white hover:bg-brand-primary-hover"
            }`}
          >
            {isConfirmed ? "Presença ✓" : "Confirmar"}
          </button>
        </div>
      </div>
    </Link>
  )
}
