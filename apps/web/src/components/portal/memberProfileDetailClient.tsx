"use client"

import * as React from "react"

import Link from "next/link"
import { notFound, useParams } from "next/navigation"

import {
  type BadgeDefinition,
  EVENTS,
  MEMBERS,
  TIERS_CONFIG,
} from "@/src/data/portalData"
import { usePortalStore } from "@/src/store/usePortalStore"
import {
  ArrowRight,
  MapPin,
  Medal,
  ShieldCheck,
  Target,
} from "@phosphor-icons/react"

import { Badge } from "@/src/components/ui/badge/badge"
import { toast } from "@/src/components/ui/toast/toast"

import { Container } from "@/src/components/common/container"
import { EventCard } from "@/src/components/portal/eventCard"
import {
  MemberProfileBadges,
  MemberProfileBio,
  MemberProfileHero,
  MemberProfileSidebar,
} from "@/src/components/portal/memberProfile"
import { RelatedMembersCard } from "@/src/components/portal/relatedMembersCard"

import { isModuleEnabled } from "@/src/config/brand.config"

export function MemberProfileDetailClient({
  memberId: initialMemberId,
}: {
  memberId?: number
}): React.JSX.Element {
  const params = useParams()
  const idParam = Array.isArray(params?.id) ? params.id[0] : params?.id
  const memberId = initialMemberId ?? Number(idParam)
  const member = MEMBERS.find((m) => m.id === memberId)

  if (!member) {
    notFound()
  }

  const { toggleConnect, getConnectionStatus, sendChatMessage, openChat } =
    usePortalStore()
  const status = getConnectionStatus(member.id)
  const [messageText, setMessageText] = React.useState("")

  const memberEvents = EVENTS.filter((e) => e.participants.includes(member.id))

  const currentIndex = MEMBERS.findIndex((m) => m.id === member.id)
  const prevMember =
    currentIndex > 0 ? MEMBERS[currentIndex - 1] : MEMBERS[MEMBERS.length - 1]
  const nextMember =
    currentIndex < MEMBERS.length - 1 ? MEMBERS[currentIndex + 1] : MEMBERS[0]

  const fullName = `${member.firstName} ${member.lastName}`.trim()
  const firstName = member.firstName
  const [selectedBadge, setSelectedBadge] =
    React.useState<BadgeDefinition | null>(null)

  const memberTier = member.tierId ? TIERS_CONFIG[member.tierId] : null

  const handleConnectToggle = () => {
    const prevStatus = status
    const nextStatus = toggleConnect(member.id)
    if (nextStatus === "pending") {
      toast.success(`Solicitação de conexão enviada para ${fullName}!`, {
        description: "Seu perfil com suas buscas e ofertas foi compartilhado.",
      })
    } else if (prevStatus === "pending") {
      toast.info(`Solicitação para ${fullName} cancelada.`)
    } else if (prevStatus === "connected") {
      toast.info(`Conexão com ${fullName} desfeita.`)
    }
  }

  const handleSendMessage = () => {
    if (!messageText.trim()) {
      openChat(member.id)
      return
    }
    sendChatMessage(member.id, messageText)
    setMessageText("")
    toast.success(`Mensagem enviada para ${firstName}!`, {
      description: "A conversa foi aberta no chat direto do clube.",
    })
  }

  return (
    <div className="w-full flex flex-col pb-20 space-y-10">
      <MemberProfileHero fullName={fullName} status={status} />

      <Container className="space-y-10">
        <MemberProfileBio member={member} memberTier={memberTier} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
          <div className="lg:col-span-2 space-y-12">
            <section className="space-y-4">
              <div className="space-y-3">
                <span className="text-xs font-black uppercase tracking-widest text-brand-primary block">
                  Visão Geral
                </span>
                <p className="text-lg sm:text-xl font-light text-zinc-800 dark:text-zinc-200 leading-relaxed">
                  {member.firstName} {member.lastName} é{" "}
                  {member.role.toLowerCase()} na {member.company}, atuando em{" "}
                  {member.city}. Faz parte do círculo restrito de membros com
                  foco em geração de negócios, parcerias institucionais e
                  expansão do ecossistema.
                </p>
              </div>
            </section>

            <section className="space-y-6 pt-8 border-t border-zinc-200 dark:border-zinc-800">
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-brand-primary block mb-1">
                  Sinergias & Interesses
                </span>
                <h2 className="text-2xl font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white">
                  Informações de Conexão
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Medal className="w-4 h-4 text-brand-primary shrink-0" />
                    <span className="text-xs font-black uppercase tracking-widest text-brand-primary">
                      O que {firstName} Oferece
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {member.offering.map((tag) => (
                      <Badge
                        key={tag}
                        variant="flat"
                        color="default"
                        size="sm"
                        radius="xs"
                        className="font-medium text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200/80 dark:border-zinc-700/80 shadow-none"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-brand-primary shrink-0" />
                    <span className="text-xs font-black uppercase tracking-widest text-brand-primary">
                      O que {firstName} Procura
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {member.seeking.map((tag) => (
                      <Badge
                        key={tag}
                        variant="flat"
                        color="default"
                        size="sm"
                        radius="xs"
                        className="font-medium text-xs bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 border border-zinc-200/80 dark:border-zinc-700/80 shadow-none"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-brand-primary shrink-0" />
                    <span className="text-xs font-black uppercase tracking-widest text-brand-primary">
                      Base & Região
                    </span>
                  </div>
                  <div>
                    <p className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white">
                      {member.city}
                    </p>
                    <p className="text-xs text-zinc-900 dark:text-white font-medium mt-0.5">
                      Disponível para encontros e reuniões presenciais
                    </p>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-brand-primary shrink-0" />
                    <span className="text-xs font-black uppercase tracking-widest text-brand-primary">
                      Status & Validação
                    </span>
                  </div>
                  <div>
                    <p className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white">
                      Membro Verificado
                    </p>
                    <p className="text-xs text-zinc-900 dark:text-white font-medium mt-0.5">
                      Membro ativo desde {member.memberSince || 2021}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {isModuleEnabled("events") && (
              <section className="space-y-6 pt-8 border-t border-zinc-200 dark:border-zinc-800">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-xs font-black uppercase tracking-widest text-brand-primary block mb-1">
                      Agenda de Encontros
                    </span>
                    <h2 className="text-2xl font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white">
                      Onde Encontrar ({memberEvents.length})
                    </h2>
                  </div>

                  <Link
                    href="/eventos"
                    className="text-xs font-bold uppercase tracking-wider text-brand-primary hover:underline flex items-center gap-1.5 self-start sm:self-auto"
                  >
                    <span>Ver todos os eventos</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                {memberEvents.length === 0 ? (
                  <div className="p-8 text-center rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416]">
                    <p className="text-xs text-zinc-900 dark:text-white font-medium">
                      {firstName} ainda não possui encontros confirmados neste
                      trimestre.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-6">
                    {memberEvents.map((evt) => (
                      <EventCard key={evt.id} event={evt} />
                    ))}
                  </div>
                )}
              </section>
            )}

            {isModuleEnabled("keypass") && (
              <MemberProfileBadges
                member={member}
                selectedBadge={selectedBadge}
                onSelectBadge={setSelectedBadge}
              />
            )}
          </div>

          <MemberProfileSidebar
            member={member}
            status={status}
            memberEventsCount={memberEvents.length}
            messageText={messageText}
            onMessageTextChange={setMessageText}
            onConnectToggle={handleConnectToggle}
            onSendMessage={handleSendMessage}
          />
        </div>

        <section className="pt-12 border-t border-zinc-200 dark:border-zinc-800 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-brand-primary block mb-1">
                Explorar Mais
              </span>
              <h2 className="text-2xl font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white">
                Outros Membros da Rede
              </h2>
            </div>
            <Link
              href="/conexoes"
              className="text-xs font-bold uppercase tracking-wider text-brand-primary hover:underline flex items-center gap-1.5"
            >
              <span>Ver todas as conexões</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <RelatedMembersCard member={prevMember} />
            <RelatedMembersCard member={nextMember} />
          </div>
        </section>
      </Container>
    </div>
  )
}
