"use client"

import * as React from "react"
import Link from "next/link"
import { useParams, notFound } from "next/navigation"
import {
  MapPin,
  Check,
  UserPlus,
  MessageSquare,
  Compass,
  ExternalLink,
  Globe
} from "lucide-react"

import { MEMBERS, EVENTS, getInitials, getEventSlug } from "@/src/data/portalData"
import { usePortalStore } from "@/src/store/usePortalStore"
import { BackButton } from "@/src/components/portal/BackButton"
import { Avatar, AvatarImage, AvatarFallback } from "@/src/components/ui/avatar/avatar"
import { Badge } from "@/src/components/ui/badge/badge"
import { Button } from "@/src/components/ui/button/button"
import { toast } from "@/src/components/ui/toast/toast"
import { Container } from "@/src/components/common/container"

export default function MemberProfileDetailPage(): React.JSX.Element {
  const params = useParams()
  const idParam = Array.isArray(params?.id) ? params.id[0] : params?.id
  const memberId = Number(idParam)
  const member = MEMBERS.find((m) => m.id === memberId)

  if (!member) {
    notFound()
  }

  const { connectedMembers, toggleConnect } = usePortalStore()
  const isConnected = !!connectedMembers[member.id]

  const memberEvents = EVENTS.filter((e) =>
    e.participants.includes(member.id)
  )

  const firstName = member.name.split(" ")[0]
  const synergyReason = `O que ${firstName} oferece complementa o que você procura: ${member.offering[0]?.toLowerCase() || "novas parcerias"}. Vocês também compartilham interesses estratégicos nos encontros deste trimestre.`

  const handleConnectToggle = () => {
    toggleConnect(member.id)
    if (!isConnected) {
      toast.success(`Solicitação de conexão enviada para ${member.name}!`, {
        description: "Seu perfil com suas buscas e ofertas foi compartilhado.",
      })
    } else {
      toast.info(`Conexão com ${member.name} desfeita.`)
    }
  }

  const handleSendMessage = () => {
    toast.success(`Canal de mensagem direta aberto com ${firstName}!`, {
      description: "Nosso concierge conectará vocês via canal seguro do clube.",
    })
  }

  return (
    <Container className="pt-6 sm:pt-8 pb-16 space-y-6">
      <BackButton fallbackHref="/conexoes" label="Voltar para Conexões" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-8">
          <div className="rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <Avatar size="3xl" radius="sm" className="shrink-0 ring-2 ring-zinc-200 dark:ring-zinc-800 shadow-md">
                {(member.image || member.avatar) && (
                  <AvatarImage src={member.image || member.avatar} alt={member.name} />
                )}
                <AvatarFallback className="font-black text-2xl bg-zinc-900 text-white dark:bg-zinc-800">
                  {getInitials(member.name)}
                </AvatarFallback>
              </Avatar>

              <div className="space-y-1.5 min-w-0">
                <h1 className="text-2xl sm:text-3xl font-heading font-black tracking-tight uppercase text-zinc-900 dark:text-white">
                  {member.name}
                </h1>
                <p className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
                  {member.role} • {member.company}
                </p>
                <div className="flex items-center gap-3 text-xs text-zinc-400 pt-1 flex-wrap">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-brand-primary" />
                    {member.city}
                  </span>
                  <span>•</span>
                  {member.socials?.linkedin && (
                    <a
                      href={member.socials.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="text-zinc-600 dark:text-zinc-400 hover:text-brand-primary dark:hover:text-brand-primary flex items-center gap-1 font-medium transition-colors"
                    >
                      LinkedIn <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  {member.socials?.website && (
                    <a
                      href={member.socials.website}
                      target="_blank"
                      rel="noreferrer"
                      className="text-zinc-600 dark:text-zinc-400 hover:text-brand-primary dark:hover:text-brand-primary flex items-center gap-1 font-medium transition-colors"
                    >
                      <Globe className="w-3 h-3" /> Website
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <div className="p-4 rounded-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 space-y-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary block">
                  O que {firstName} oferece
                </span>
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

              <div className="p-4 rounded-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 space-y-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary block">
                  O que {firstName} procura
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {member.seeking.map((tag) => (
                    <Badge
                      key={tag}
                      color="default"
                      variant="flat"
                      size="sm"
                      radius="sm"
                      className="font-medium"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-5 rounded-sm bg-brand-primary/5 border border-brand-primary/20 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-brand-primary">
                <Compass className="w-4 h-4" />
                <span>Por que conectar com {firstName}</span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
                {synergyReason}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-heading font-black tracking-tight uppercase text-zinc-900 dark:text-white">
              Onde encontrar ({memberEvents.length} encontros confirmados)
            </h2>

            <div className="grid grid-cols-1 gap-3">
              {memberEvents.map((evt) => (
                <Link
                  key={evt.id}
                  href={`/eventos/${evt.id}/${getEventSlug(evt)}`}
                  className="group flex items-center justify-between p-4 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] hover:border-brand-primary/60 dark:hover:border-brand-primary/60 transition-colors shadow-2xs"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-sm bg-zinc-900 border border-zinc-800 flex flex-col items-center justify-center text-center shrink-0">
                      <span className="text-sm font-black text-brand-primary leading-none">
                        {evt.day}
                      </span>
                      <span className="text-[9px] font-semibold text-zinc-400 uppercase tracking-widest mt-0.5">
                        {evt.month}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-bold uppercase tracking-tight text-zinc-900 dark:text-white group-hover:text-brand-primary transition-colors">
                        {evt.title}
                      </p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        {evt.weekday}, {evt.time} • {evt.place}
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-bold uppercase tracking-wider text-brand-primary">
                    Ver encontro →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="sticky top-24 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] p-6 space-y-6 shadow-xs">
          <div className="space-y-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary block">
              Conexão Direta
            </span>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Ao conectar, {firstName} receberá seu perfil com suas tags de busca e oferta.
            </p>
          </div>

          <div className="space-y-2.5">
            <Button
              type="button"
              color={isConnected ? "success" : "primary"}
              variant={isConnected ? "flat" : "default"}
              radius="sm"
              onClick={handleConnectToggle}
              startContent={isConnected ? <Check className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
              className="w-full h-11 text-xs font-black uppercase tracking-wider"
            >
              {isConnected ? "Conexão solicitada" : "Solicitar conexão"}
            </Button>

            <Button
              type="button"
              color="default"
              variant="bordered"
              radius="sm"
              onClick={handleSendMessage}
              startContent={<MessageSquare className="w-4 h-4 text-brand-primary" />}
              className="w-full h-10 text-xs font-bold uppercase tracking-wider"
            >
              Enviar mensagem
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-100 dark:border-zinc-800 text-center">
            <div className="p-3 rounded-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800">
              <span className="text-xl font-heading font-black text-zinc-900 dark:text-white block">
                {memberEvents.length}
              </span>
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                Encontros
              </span>
            </div>

            <div className="p-3 rounded-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800">
              <span className="text-xl font-heading font-black text-brand-primary block">
                {member.since}
              </span>
              <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                Membro desde
              </span>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
