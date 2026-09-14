"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
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

import { MEMBERS, EVENTS, getInitials } from "@/src/data/portalData"
import { usePortalStore } from "@/src/store/usePortalStore"
import { BackButton } from "@/src/components/portal/BackButton"

export default function MemberProfilePage(): React.JSX.Element {
  const params = useParams()
  const memberId = Number(params?.id)
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

  return (
    <div className="space-y-6">
      <BackButton fallbackHref="/pessoas" label="Voltar para pessoas" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        <div className="lg:col-span-2 space-y-8">
          <div className="rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              {member.image ? (
                <div className="relative w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-sm overflow-hidden bg-zinc-900 ring-2 ring-zinc-200 dark:ring-zinc-800 shadow-md">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    priority
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
              ) : (
                <div className="w-20 h-20 sm:w-24 sm:h-24 shrink-0 rounded-sm bg-zinc-900 dark:bg-zinc-800 text-white flex items-center justify-center font-black text-2xl ring-2 ring-zinc-200 dark:ring-zinc-700 shadow-md">
                  {getInitials(member.name)}
                </div>
              )}

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
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-sm text-xs font-semibold bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-sm bg-zinc-50 dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 space-y-2">
                <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary block">
                  O que {firstName} procura
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {member.seeking.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-sm text-xs font-semibold bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700"
                    >
                      {tag}
                    </span>
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
                  href={`/agenda/${evt.id}`}
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
            <button
              type="button"
              onClick={() => toggleConnect(member.id)}
              className={`w-full py-3.5 px-4 rounded-sm text-xs font-black uppercase tracking-wider transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2 ${
                isConnected
                  ? "bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 hover:bg-emerald-100"
                  : "bg-brand-primary hover:bg-brand-primary/90 text-white"
              }`}
            >
              {isConnected ? (
                <>
                  <Check className="w-4 h-4" />
                  Conexão solicitada
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  Solicitar conexão
                </>
              )}
            </button>

            <button
              type="button"
              className="w-full py-3 px-4 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900 text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200 hover:border-brand-primary transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4 text-brand-primary" />
              Enviar mensagem
            </button>
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
    </div>
  )
}
