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
        className="relative z-30 w-full bg-[#0D0D0D] text-white overflow-hidden"
      >
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
          <Image
            src="/utils/banners/img_02.png"
            alt="ClubKey Hub"
            fill
            priority
            className="object-cover object-top opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-zinc-50 dark:to-[#0D0D0D] z-10" />
        </div>

        <Container className="relative z-20 pt-28 pb-12 sm:pt-32 sm:pb-14 md:pt-36 md:pb-16 flex flex-col items-center text-center">
          <div className="max-w-3xl flex flex-col items-center text-center w-full">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-brand-primary/15 border border-brand-primary/30 text-brand-primary text-[10px] sm:text-xs font-black uppercase tracking-widest mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
              Painel do Membro • Acesso VIP
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[1.05] mb-3 font-heading drop-shadow-md">
              Bem-vindo, <span className="text-brand-primary">{userProfile.name}</span>
            </h1>
            <p className="text-sm sm:text-base md:text-lg text-zinc-300 font-light leading-relaxed drop-shadow-sm max-w-xl">
              {userProfile.role} na {userProfile.company} • Membro Oficial ClubKey
            </p>
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
