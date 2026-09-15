"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { usePortalStore } from "@/src/store/usePortalStore"
import { EXPERIENCES, MEMBERS, BENEFITS } from "@/src/data/portalData"
import { catalogSections } from "@/src/data/mockRooms"
import { RoomCard } from "@/src/components/rooms/roomCard"
import { ExperienceCard } from "@/src/components/portal/ExperienceCard"
import { MemberCard } from "@/src/components/portal/MemberCard"
import { BenefitCard } from "@/src/components/portal/BenefitCard"
import { toast } from "@/src/components/ui/toast/toast"
import { Container } from "@/src/components/common/container"

export function PortalHome(): React.JSX.Element {
  const { userProfile } = usePortalStore()
  const [favorites, setFavorites] = React.useState<Record<string, boolean>>({})

  const featuredRooms = React.useMemo(() => {
    return (catalogSections[0]?.rooms || []).slice(0, 3)
  }, [])

  const featuredExperiences = EXPERIENCES.slice(0, 3)
  const featuredMembers = MEMBERS.slice(0, 3)
  const featuredBenefits = BENEFITS.slice(0, 3)

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const willBeFav = !favorites[id]
    setFavorites((prev) => ({ ...prev, [id]: willBeFav }))
    if (willBeFav) {
      toast.success("Hospedagem salva nos favoritos!")
    } else {
      toast.info("Hospedagem removida dos favoritos.")
    }
  }

  return (
    <div className="w-full flex flex-col">
      <section
        id="hero"
        className="relative z-30 w-full bg-[#0D0D0D] border-b border-zinc-200 dark:border-zinc-800 text-white overflow-hidden"
      >
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
          <Image
            src="/utils/banners/img_02.png"
            alt="ClubKey Hub"
            fill
            priority
            className="object-cover object-center opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/85 to-black/95" />
        </div>

        <Container className="relative z-20 pt-28 pb-8 sm:pt-32 sm:pb-10 md:pt-36 md:pb-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-brand-primary/15 border border-brand-primary/30 text-brand-primary text-[10px] font-bold uppercase tracking-widest">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                  Membro VIP • ClubKey Privé
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-black uppercase tracking-tight text-white font-heading">
                Bem-vindo, <span className="text-brand-primary">{userProfile.name}</span>
              </h1>
              <p className="text-xs sm:text-sm text-zinc-400 font-normal">
                {userProfile.role} na {userProfile.company} • Acesso exclusivo a hospedagens, eventos, networking e benefícios do clube.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0 flex-wrap sm:flex-nowrap">
              <div className="flex items-center gap-3 px-4 py-3 rounded-sm border border-zinc-800 bg-white/5 backdrop-blur-sm text-left">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">
                    Status da Conta
                  </span>
                  <span className="text-xs font-black uppercase text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Assinatura Ativa
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 px-4 py-3 rounded-sm border border-zinc-800 bg-white/5 backdrop-blur-sm text-left">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">
                    Concierge VIP
                  </span>
                  <span className="text-xs font-bold text-zinc-200">
                    Disponível 24/7
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Container className="relative z-10 flex-1 py-10 space-y-14">
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-primary block mb-0.5">
                Tarifa de Membro
              </span>
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-zinc-900 dark:text-white font-heading">
                Hospedagens em destaque
              </h2>
            </div>
            <Link
              href="/hospedagens"
              className="text-xs font-bold uppercase tracking-wider text-brand-primary hover:translate-x-0.5 transition-transform flex items-center gap-1"
            >
              <span>Ver todas</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredRooms.map((room) => (
              <RoomCard
                key={room.id}
                room={room}
                isFav={!!favorites[room.id]}
                onToggleFav={toggleFavorite}
                className="w-full shrink"
              />
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-primary block mb-0.5">
                Curadoria
              </span>
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-zinc-900 dark:text-white font-heading">
                Experiências exclusivas
              </h2>
            </div>
            <Link
              href="/experiencias"
              className="text-xs font-bold uppercase tracking-wider text-brand-primary hover:translate-x-0.5 transition-transform flex items-center gap-1"
            >
              <span>Ver todas</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredExperiences.map((exp) => (
              <ExperienceCard key={exp.id} experience={exp} />
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-primary block mb-0.5">
                Networking
              </span>
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-zinc-900 dark:text-white font-heading">
                Conexões recomendadas
              </h2>
            </div>
            <Link
              href="/conexoes"
              className="text-xs font-bold uppercase tracking-wider text-brand-primary hover:translate-x-0.5 transition-transform flex items-center gap-1"
            >
              <span>Ver todas</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredMembers.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest text-brand-primary block mb-0.5">
                Vantagens
              </span>
              <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-zinc-900 dark:text-white font-heading">
                Benefícios e parcerias
              </h2>
            </div>
            <Link
              href="/beneficios"
              className="text-xs font-bold uppercase tracking-wider text-brand-primary hover:translate-x-0.5 transition-transform flex items-center gap-1"
            >
              <span>Ver todos</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredBenefits.map((benefit) => (
              <BenefitCard key={benefit.id} benefit={benefit} />
            ))}
          </div>
        </section>
      </Container>
    </div>
  )
}
