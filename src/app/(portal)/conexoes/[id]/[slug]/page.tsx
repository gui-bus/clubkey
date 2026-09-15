"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { useParams, notFound } from "next/navigation"
import {
  MapPin,
  Check,
  Hourglass,
  UserPlus,
  Send,
  ExternalLink,
  Globe,
  ArrowRight,
  Award,
  Target,
  ShieldCheck
} from "lucide-react"

import { MEMBERS, EVENTS, getInitials, getMemberSlug, getEventSlug } from "@/src/data/portalData"
import { usePortalStore } from "@/src/store/usePortalStore"
import { BackButton } from "@/src/components/portal/BackButton"
import { ShareButton } from "@/src/components/portal/ShareButton"
import { Avatar, AvatarImage, AvatarFallback } from "@/src/components/ui/avatar/avatar"
import { Badge } from "@/src/components/ui/badge/badge"
import { Button } from "@/src/components/ui/button/button"
import { Textarea } from "@/src/components/ui/textarea/textarea"
import { toast } from "@/src/components/ui/toast/toast"
import { Container } from "@/src/components/common/container"
import { CtaButton } from "@/src/components/common/ctaButton"

export default function MemberProfileDetailPage(): React.JSX.Element {
  const params = useParams()
  const idParam = Array.isArray(params?.id) ? params.id[0] : params?.id
  const memberId = Number(idParam)
  const member = MEMBERS.find((m) => m.id === memberId)

  if (!member) {
    notFound()
  }

  const { toggleConnect, getConnectionStatus } = usePortalStore()
  const status = getConnectionStatus(member.id)
  const [messageText, setMessageText] = React.useState("")

  const memberEvents = EVENTS.filter((e) =>
    e.participants.includes(member.id)
  )

  const currentIndex = MEMBERS.findIndex((m) => m.id === member.id)
  const prevMember = currentIndex > 0 ? MEMBERS[currentIndex - 1] : MEMBERS[MEMBERS.length - 1]
  const nextMember = currentIndex < MEMBERS.length - 1 ? MEMBERS[currentIndex + 1] : MEMBERS[0]

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
      toast.info("Por favor, digite uma mensagem antes de enviar.")
      return
    }
    toast.success(`Mensagem enviada para ${firstName}!`, {
      description: "Nosso canal direto conectará vocês com segurança.",
    })
    setMessageText("")
  }

  return (
    <Container className="pt-6 sm:pt-8 pb-20 space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <BackButton fallbackHref="/conexoes" label="Conexões" />
          <span className="text-zinc-300 dark:text-zinc-700 hidden sm:inline">/</span>
          <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400 truncate max-w-xs sm:max-w-md hidden sm:inline">
            {member.name}
          </span>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <ShareButton label="Compartilhar Perfil" />
        </div>
      </div>

      <div className="relative rounded-sm overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] shadow-xs">
        <div className="relative w-full h-44 sm:h-56 md:h-64 bg-zinc-950 overflow-hidden">
          <Image
            src="/utils/banners/pessoas.webp"
            alt="Banner de perfil"
            fill
            priority
            className="object-cover object-center opacity-40 dark:opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/20" />

          {(status === "connected" || status === "pending") && (
            <div className="absolute top-4 right-4 flex items-center justify-end gap-3 z-10">
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
        </div>

        <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-0">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 -mt-14 sm:-mt-16 relative z-10 mb-5">
            <Avatar
              size="3xl"
              radius="full"
              className="w-28 h-28 sm:w-32 sm:h-32 ring-4 ring-white dark:ring-[#141416] shadow-lg shrink-0 border border-zinc-200 dark:border-zinc-700 bg-zinc-900"
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

            <div className="flex items-center gap-2 self-start sm:self-auto">
              <span className="inline-flex items-center px-2.5 py-1 rounded-xs bg-brand-primary/10 text-brand-primary text-xs font-bold uppercase tracking-wider">
                {member.role} • {member.company}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white">
                {member.name}
              </h1>
              <p className="text-sm sm:text-base font-medium text-zinc-600 dark:text-zinc-300 mt-0.5">
                {member.role} na {member.company}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400 pt-1">
              <span className="flex items-center gap-1.5 font-medium text-zinc-700 dark:text-zinc-300">
                <MapPin className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                {member.city}
              </span>
              <span className="text-zinc-300 dark:text-zinc-700 hidden sm:inline">•</span>
              <span>
                Membro desde {member.since || 2021}
              </span>
              {member.socials?.linkedin && (
                <>
                  <span className="text-zinc-300 dark:text-zinc-700 hidden sm:inline">•</span>
                  <a
                    href={member.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="text-zinc-600 dark:text-zinc-400 hover:text-brand-primary dark:hover:text-brand-primary flex items-center gap-1 font-medium transition-colors"
                  >
                    LinkedIn <ExternalLink className="w-3 h-3" />
                  </a>
                </>
              )}
              {member.socials?.website && (
                <>
                  <span className="text-zinc-300 dark:text-zinc-700 hidden sm:inline">•</span>
                  <a
                    href={member.socials.website}
                    target="_blank"
                    rel="noreferrer"
                    className="text-zinc-600 dark:text-zinc-400 hover:text-brand-primary dark:hover:text-brand-primary flex items-center gap-1 font-medium transition-colors"
                  >
                    Website <Globe className="w-3 h-3" />
                  </a>
                </>
              )}
            </div>
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
                {member.name} é {member.role.toLowerCase()} na {member.company}, atuando em {member.city}. Faz parte do círculo restrito de membros com foco em geração de negócios, parcerias institucionais e expansão do ecossistema.
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

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 sm:p-5 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] space-y-2 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-sm bg-brand-primary/10 flex items-center justify-center shrink-0">
                    <Award className="w-4 h-4 text-brand-primary" />
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-widest text-zinc-400">
                    O que {firstName} Oferece
                  </span>
                </div>
                <div className="pt-1 flex flex-wrap gap-1.5">
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

              <div className="p-4 sm:p-5 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] space-y-2 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-sm bg-brand-primary/10 flex items-center justify-center shrink-0">
                    <Target className="w-4 h-4 text-brand-primary" />
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-widest text-zinc-400">
                    O que {firstName} Procura
                  </span>
                </div>
                <div className="pt-1 flex flex-wrap gap-1.5">
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

              <div className="p-4 sm:p-5 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] space-y-2 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-sm bg-brand-primary/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-brand-primary" />
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-widest text-zinc-400">
                    Base & Região
                  </span>
                </div>
                <div className="pt-1">
                  <p className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white">
                    {member.city}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                    Disponível para encontros e reuniões presenciais
                  </p>
                </div>
              </div>

              <div className="p-4 sm:p-5 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] space-y-2 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-sm bg-brand-primary/10 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4 text-brand-primary" />
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-widest text-zinc-400">
                    Status & Validação
                  </span>
                </div>
                <div className="pt-1">
                  <p className="text-sm sm:text-base font-bold text-zinc-900 dark:text-white">
                    Membro Verificado
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
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
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {firstName} ainda não possui encontros confirmados neste trimestre.
                </p>
              </div>
            ) : (
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

                    <span className="text-xs font-bold uppercase tracking-wider text-brand-primary flex items-center gap-1">
                      <span>Ver encontro</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </Link>
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
                  {status === "connected" ? "Conectado" : status === "pending" ? "Aguardando" : "Disponível"}
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  {member.since ? `Desde ${member.since}` : "Membro Ativo"}
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 pt-1 leading-relaxed">
                Ao conectar, {firstName} receberá seu perfil com suas tags de busca e oferta para abertura de diálogo.
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
                  className="h-12 text-xs shadow-none hover:shadow-none border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
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
                <Send className="w-3.5 h-3.5 mr-2 shrink-0" />
                Enviar mensagem
              </CtaButton>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-800 text-center">
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
                  {member.since || 2021}
                </span>
                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
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
          <Link
            href={`/conexoes/${prevMember.id}/${getMemberSlug(prevMember)}`}
            className="group relative flex flex-col sm:flex-row items-stretch overflow-hidden rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] hover:border-brand-primary transition-all duration-200 shadow-xs"
          >
            <div className="relative w-full sm:w-44 h-36 sm:h-auto shrink-0 bg-zinc-950 overflow-hidden">
              {(prevMember.image || prevMember.avatar) && (
                <Image
                  src={prevMember.image || prevMember.avatar || ""}
                  alt={prevMember.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300 opacity-80 object-top"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent sm:hidden" />
            </div>

            <div className="p-5 flex flex-col justify-between flex-1 gap-3 min-w-0">
              <div>
                <div className="flex items-center justify-between gap-2 text-[11px] font-bold text-zinc-400 mb-1.5">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-xs bg-zinc-100 dark:bg-zinc-800 text-[10px] font-black uppercase tracking-wider text-zinc-600 dark:text-zinc-300">
                    Membro Desde {prevMember.since || 2021}
                  </span>
                  <span className="text-zinc-500 font-medium">
                    {prevMember.city}
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white group-hover:text-brand-primary transition-colors line-clamp-1">
                  {prevMember.name}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
                  {prevMember.role} • {prevMember.company}
                </p>
              </div>

              <div className="flex items-center gap-3 text-xs text-brand-primary font-bold uppercase tracking-wider pt-2 border-t border-zinc-100 dark:border-zinc-800/60">
                <span>Ver perfil do membro →</span>
              </div>
            </div>
          </Link>

          <Link
            href={`/conexoes/${nextMember.id}/${getMemberSlug(nextMember)}`}
            className="group relative flex flex-col sm:flex-row items-stretch overflow-hidden rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] hover:border-brand-primary transition-all duration-200 shadow-xs"
          >
            <div className="relative w-full sm:w-44 h-36 sm:h-auto shrink-0 bg-zinc-950 overflow-hidden">
              {(nextMember.image || nextMember.avatar) && (
                <Image
                  src={nextMember.image || nextMember.avatar || ""}
                  alt={nextMember.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300 opacity-80 object-top"
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent sm:hidden" />
            </div>

            <div className="p-5 flex flex-col justify-between flex-1 gap-3 min-w-0">
              <div>
                <div className="flex items-center justify-between gap-2 text-[11px] font-bold text-zinc-400 mb-1.5">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-xs bg-zinc-100 dark:bg-zinc-800 text-[10px] font-black uppercase tracking-wider text-zinc-600 dark:text-zinc-300">
                    Membro Desde {nextMember.since || 2021}
                  </span>
                  <span className="text-zinc-500 font-medium">
                    {nextMember.city}
                  </span>
                </div>
                <h3 className="text-sm sm:text-base font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white group-hover:text-brand-primary transition-colors line-clamp-1">
                  {nextMember.name}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate mt-0.5">
                  {nextMember.role} • {nextMember.company}
                </p>
              </div>

              <div className="flex items-center gap-3 text-xs text-brand-primary font-bold uppercase tracking-wider pt-2 border-t border-zinc-100 dark:border-zinc-800/60">
                <span>Ver perfil do membro →</span>
              </div>
            </div>
          </Link>
        </div>
      </section>
    </Container>
  )
}
