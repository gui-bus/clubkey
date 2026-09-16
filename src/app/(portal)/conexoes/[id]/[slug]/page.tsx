"use client"

import * as React from "react"

import Image from "next/image"
import Link from "next/link"
import { notFound, useParams } from "next/navigation"

import {
  EVENTS,
  MEMBERS,
  getInitials,
  getMemberSlug,
} from "@/src/data/portalData"
import { usePortalStore } from "@/src/store/usePortalStore"
import {
  ArrowRight,
  ArrowSquareOut,
  Check,
  Globe,
  Hourglass,
  MapPin,
  Medal,
  PaperPlaneRight,
  ShieldCheck,
  Target,
  UserPlus,
} from "@phosphor-icons/react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar/avatar"
import { Badge } from "@/src/components/ui/badge/badge"
import { Textarea } from "@/src/components/ui/textarea/textarea"
import { toast } from "@/src/components/ui/toast/toast"

import { Container } from "@/src/components/common/container"
import { CtaButton } from "@/src/components/common/ctaButton"
import { BackButton } from "@/src/components/portal/BackButton"
import { EventCard } from "@/src/components/portal/EventCard"
import { RelatedMembersCard } from "@/src/components/portal/RelatedMembersCard"
import { ShareButton } from "@/src/components/portal/ShareButton"

export default function MemberProfileDetailPage(): React.JSX.Element {
  const params = useParams()
  const idParam = Array.isArray(params?.id) ? params.id[0] : params?.id
  const memberId = Number(idParam)
  const member = MEMBERS.find((m) => m.id === memberId)

  if (!member) {
    notFound()
  }

  const {
    toggleConnect,
    getConnectionStatus,
    sendChatMessage,
    openChat,
  } = usePortalStore()
  const status = getConnectionStatus(member.id)
  const [messageText, setMessageText] = React.useState("")

  const memberEvents = EVENTS.filter((e) => e.participants.includes(member.id))

  const currentIndex = MEMBERS.findIndex((m) => m.id === member.id)
  const prevMember =
    currentIndex > 0 ? MEMBERS[currentIndex - 1] : MEMBERS[MEMBERS.length - 1]
  const nextMember =
    currentIndex < MEMBERS.length - 1 ? MEMBERS[currentIndex + 1] : MEMBERS[0]

  const firstName = member.name.split(" ")[0]

  const handleConnectToggle = () => {
    const prevStatus = status
    const nextStatus = toggleConnect(member.id)
    if (nextStatus === "pending") {
      toast.success(`Solicitação de conexão enviada para ${member.name}!`, {
        description: "Seu perfil com suas buscas e ofertas foi compartilhado.",
      })
    } else if (prevStatus === "pending") {
      toast.info(`Solicitação para ${member.name} cancelada.`)
    } else if (prevStatus === "connected") {
      toast.info(`Conexão com ${member.name} desfeita.`)
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
      <div className="relative w-full h-56 sm:h-72 md:h-80 bg-zinc-950 overflow-hidden">
        <Image
          src="/utils/banners/pessoas.webp"
          alt="Banner de perfil"
          fill
          priority
          className="object-cover object-center opacity-40 dark:opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />

        <Container className="relative z-10 h-full flex flex-col justify-between py-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <BackButton
                fallbackHref="/conexoes"
                label="Conexões"
                className="text-white hover:text-white/80"
              />
              <span className="text-white/60 hidden sm:inline">
                /
              </span>
              <span className="text-xs font-bold text-white truncate max-w-xs sm:max-w-md hidden sm:inline">
                {member.name}
              </span>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <ShareButton label="Compartilhar Perfil" />
            </div>
          </div>

          {(status === "connected" || status === "pending") && (
            <div className="flex items-center justify-end gap-3 self-end">
              {status === "connected" && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest shadow-md">
                  <Check className="w-3.5 h-3.5" />
                  <span>Conectado</span>
                </span>
              )}

              {status === "pending" && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm bg-sky-500 text-white text-[10px] font-black uppercase tracking-widest shadow-md">
                  <Hourglass className="w-3.5 h-3.5" />
                  <span>Solicitação Enviada</span>
                </span>
              )}
            </div>
          )}
        </Container>
      </div>

      <Container className="space-y-10">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-end gap-5 -mt-20 sm:-mt-24 relative z-20">
            <Avatar
              size="3xl"
              radius="full"
              className="w-28 h-28 sm:w-36 sm:h-36 ring-4 ring-[#F1F1F1] dark:ring-[#161616] shadow-xl shrink-0 border border-zinc-200 dark:border-zinc-700 bg-zinc-900"
            >
              {(member.image || member.avatar) && (
                <AvatarImage
                  src={member.image || member.avatar}
                  alt={member.name}
                  className="object-cover object-top"
                />
              )}
              <AvatarFallback className="font-black text-2xl bg-zinc-900 text-white dark:bg-zinc-800">
                {getInitials(member.name)}
              </AvatarFallback>
            </Avatar>

            <div className="min-w-0 pb-1">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white truncate">
                {member.name}
              </h1>
              <p className="text-sm sm:text-base font-semibold text-zinc-900 dark:text-white mt-0.5 truncate">
                {member.role} na {member.company}
              </p>
            </div>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-900 dark:text-white pt-1">
              <span className="flex items-center gap-1.5 font-semibold text-zinc-900 dark:text-white">
                <MapPin className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                {member.city}
              </span>
              <span className="text-zinc-300 dark:text-zinc-700 hidden sm:inline">
                •
              </span>
              <span className="font-medium text-zinc-900 dark:text-white">Membro desde {member.since || 2021}</span>
              {member.socials?.linkedin && (
                <>
                  <span className="text-zinc-300 dark:text-zinc-700 hidden sm:inline">
                    •
                  </span>
                  <a
                    href={member.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-zinc-900 dark:text-white hover:text-brand-primary dark:hover:text-brand-primary flex items-center gap-1 font-semibold transition-colors"
                  >
                    LinkedIn <ArrowSquareOut className="w-3 h-3" />
                  </a>
                </>
              )}
              {member.socials?.website && (
                <>
                  <span className="text-zinc-300 dark:text-zinc-700 hidden sm:inline">
                    •
                  </span>
                  <a
                    href={member.socials.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-zinc-900 dark:text-white hover:text-brand-primary dark:hover:text-brand-primary flex items-center gap-1 font-semibold transition-colors"
                  >
                    Website <Globe className="w-3 h-3" />
                  </a>
                </>
              )}
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
                {member.name} é {member.role.toLowerCase()} na {member.company},
                atuando em {member.city}. Faz parte do círculo restrito de
                membros com foco em geração de negócios, parcerias
                institucionais e expansão do ecossistema.
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
                    Membro ativo desde {member.since || 2021}
                  </p>
                </div>
              </div>
            </div>
          </section>

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
                  {firstName} ainda não possui encontros confirmados neste trimestre.
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
        </div>

        <div className="lg:sticky lg:top-24 space-y-6">
          <div className="rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] p-6 sm:p-8 space-y-6">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary block">
                Conexão Direta • Canal do Clube
              </span>
              <div className="flex items-baseline justify-between gap-2 pt-1">
                <span className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white font-heading leading-none">
                  {status === "connected"
                    ? "Conectado"
                    : status === "pending"
                      ? "Aguardando"
                      : "Disponível"}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
                  {member.since ? `Desde ${member.since}` : "Membro Ativo"}
                </span>
              </div>
              <p className="text-xs text-zinc-900 dark:text-white pt-1 leading-relaxed font-normal">
                Ao conectar, {firstName} receberá seu perfil com suas tags de
                busca e oferta para abertura de diálogo.
              </p>
            </div>

            <div className="space-y-3 pt-4 border-t border-zinc-100 dark:border-zinc-800">
              {status === "connected" ? (
                <CtaButton
                  type="button"
                  variant="secondary"
                  size="md"
                  isFullWidth
                  onClick={handleConnectToggle}
                  className="h-12 text-xs shadow-none hover:shadow-none border-emerald-500/30 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                  sliderClassName="bg-emerald-500/25"
                  textClassName="text-emerald-600 dark:text-emerald-400 group-hover:text-emerald-700 dark:group-hover:text-emerald-300 transition-colors"
                >
                  <Check className="w-4 h-4 mr-2 shrink-0" />
                  <span>Conectado • Desconectar</span>
                </CtaButton>
              ) : status === "pending" ? (
                <CtaButton
                  type="button"
                  variant="secondary"
                  size="md"
                  isFullWidth
                  onClick={handleConnectToggle}
                  className="h-12 text-xs shadow-none hover:shadow-none border-sky-500/30 bg-sky-500/15 text-sky-600 dark:text-sky-400"
                  sliderClassName="bg-sky-500/25"
                  textClassName="text-sky-600 dark:text-sky-400 group-hover:text-sky-700 dark:group-hover:text-sky-300 transition-colors"
                >
                  <Hourglass className="w-4 h-4 mr-2 shrink-0 text-sky-500" />
                  <span>Solicitação enviada • Cancelar</span>
                </CtaButton>
              ) : (
                <CtaButton
                  type="button"
                  variant="primary"
                  size="md"
                  isFullWidth
                  onClick={handleConnectToggle}
                  className="h-12 text-xs shadow-none hover:shadow-none"
                >
                  <UserPlus className="w-4 h-4 mr-2 shrink-0" />
                  <span>Solicitar conexão</span>
                </CtaButton>
              )}
            </div>

            <div className="space-y-2.5 pt-4 border-t border-zinc-100 dark:border-zinc-800">
              <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary block">
                Enviar Mensagem
              </span>
              <Textarea
                placeholder={`Escreva uma mensagem para ${firstName}...`}
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                size="sm"
                radius="sm"
                minRows={3}
                autoResize
              />
              <CtaButton
                type="button"
                variant="primary"
                size="sm"
                isFullWidth
                onClick={handleSendMessage}
                className="h-10 text-xs shadow-none hover:shadow-none"
              >
                <PaperPlaneRight className="w-3.5 h-3.5 mr-2 shrink-0" />
                Enviar mensagem
              </CtaButton>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-800 text-center">
              <div className="p-2 space-y-0.5">
                <span className="text-xl font-heading font-black text-zinc-900 dark:text-white block">
                  {memberEvents.length}
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-900 dark:text-white">
                  Eventos
                </span>
              </div>

              <div className="p-2 space-y-0.5">
                <span className="text-xl font-heading font-black text-brand-primary block">
                  {member.since || 2021}
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-900 dark:text-white">
                  Membro desde
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
