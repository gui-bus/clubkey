"use client"

import * as React from "react"
import Link from "next/link"
import { useParams, notFound } from "next/navigation"
import { Building, MapPin, CheckCircle2 } from "lucide-react"

import { EVENTS, MEMBERS, getInitials } from "@/src/data/portalData"
import { BackButton } from "@/src/components/portal/BackButton"
import { Avatar, AvatarImage, AvatarFallback } from "@/src/components/ui/avatar/avatar"
import { Badge } from "@/src/components/ui/badge/badge"
import { Container } from "@/src/components/common/container"

export default function EventParticipantsPage(): React.JSX.Element {
  const params = useParams()
  const eventId = Number(params?.id)
  const event = EVENTS.find((e) => e.id === eventId)

  if (!event) {
    notFound()
  }

  const attendees = event.participants
    .map((id: number) => MEMBERS.find((m) => m.id === id))
    .filter((m): m is typeof MEMBERS[0] => Boolean(m))

  return (
    <Container className="pt-28 md:pt-36 pb-12 space-y-8">
      <BackButton
        fallbackHref={`/eventos/${event.id}`}
        label={`Voltar para ${event.title}`}
      />

      <div>
        <span className="text-xs font-black uppercase tracking-widest text-brand-primary block mb-1">
          {event.title} • {event.weekday}, {event.day} de {event.month}
        </span>
        <h1 className="text-3xl sm:text-4xl font-heading font-black tracking-tight uppercase text-zinc-900 dark:text-white">
          Quem vai estar lá
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Confira os membros confirmados e descubra afinidades antes do encontro
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {attendees.map((member) => {
          if (!member) return null
          return (
            <Link
              key={member.id}
              href={`/pessoas/${member.id}`}
              className="group p-6 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] hover:border-brand-primary/60 dark:hover:border-brand-primary/60 transition-all shadow-xs hover:shadow-md space-y-4"
            >
              <div className="flex items-start gap-4">
                <Avatar size="xl" radius="sm" className="shrink-0 ring-1 ring-zinc-200 dark:ring-zinc-800">
                  {(member.image || member.avatar) && (
                    <AvatarImage src={member.image || member.avatar} alt={member.name} />
                  )}
                  <AvatarFallback className="font-black text-sm bg-zinc-900 text-white dark:bg-zinc-800">
                    {getInitials(member.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-bold uppercase tracking-tight text-zinc-900 dark:text-white group-hover:text-brand-primary transition-colors truncate">
                    {member.name}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                    {member.role}
                  </p>
                  <div className="flex items-center gap-2 text-xs text-zinc-400 mt-1">
                    <span className="flex items-center gap-1 truncate">
                      <Building className="w-3 h-3 text-brand-primary shrink-0" />
                      {member.company}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1 shrink-0">
                      <MapPin className="w-3 h-3 text-brand-primary shrink-0" />
                      {member.city}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-1.5 text-xs font-bold text-zinc-800 dark:text-zinc-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-brand-primary" />
                  <span>Oferece no encontro:</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {member.offering.map((tag) => (
                    <Badge
                      key={tag}
                      color="primary"
                      variant="flat"
                      size="sm"
                      radius="sm"
                      className="font-semibold"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </Container>
  )
}
