"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Calendar, ArrowRight, Clock, MapPin, Check } from "lucide-react"

import { usePortalStore } from "@/src/store/usePortalStore"
import { EVENTS, EXPERIENCES, MEMBERS, BENEFITS, getInitials, getEventSlug, getMemberSlug } from "@/src/data/portalData"
import { catalogSections } from "@/src/data/mockRooms"
import { RoomCard } from "@/src/components/rooms/roomCard"
import { ExperienceCard } from "@/src/components/portal/ExperienceCard"
import { MemberCard } from "@/src/components/portal/MemberCard"
import { BenefitCard } from "@/src/components/portal/BenefitCard"
import { AvatarGroup } from "@/src/components/ui/avatarGroup/avatarGroup"
import { Avatar, AvatarImage, AvatarFallback } from "@/src/components/ui/avatar/avatar"
import { Badge } from "@/src/components/ui/badge/badge"
import { Button } from "@/src/components/ui/button/button"
import { toast } from "@/src/components/ui/toast/toast"
import { Container } from "@/src/components/common/container"

export function PortalHome(): React.JSX.Element {
  const router = useRouter()
  const { userProfile, confirmedEvents, toggleEventRSVP } = usePortalStore()
  const [favorites, setFavorites] = React.useState<Record<string, boolean>>({})

  const nextEvent = EVENTS[0]
  const isNextEventConfirmed = !!confirmedEvents[nextEvent.id]
  const nextEventCount =
    nextEvent.initialConfirmed + (isNextEventConfirmed ? 1 : 0)

  const participantMembers = nextEvent.participants
    .map((id: number) => MEMBERS.find((m) => m.id === id))
    .filter((m): m is typeof MEMBERS[0] => Boolean(m))
    .slice(0, 5)

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

  const handleRSVP = () => {
    toggleEventRSVP(nextEvent.id)
    if (!isNextEventConfirmed) {
      toast.success(`Presença confirmada no encontro!`, {
        description: `Adicionado à sua agenda: ${nextEvent.title}`,
      })
    } else {
      toast.info(`Presença cancelada em: ${nextEvent.title}`)
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
        <div className="relative w-full rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] text-zinc-900 dark:text-white p-6 sm:p-8 lg:p-10 overflow-hidden shadow-xs">
          {nextEvent.image && (
            <div className="absolute inset-0 z-0">
              <Image
                src={nextEvent.image}
                alt={nextEvent.title}
                fill
                priority
                className="object-cover opacity-15 dark:opacity-25"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-white/95 dark:from-black/95 via-white/80 dark:via-black/80 to-white/90 dark:to-black/90" />
            </div>
          )}

          <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="space-y-4 flex-1">
              <Badge
                color="primary"
                variant="flat"
                size="sm"
                radius="sm"
                startContent={<Calendar className="w-3.5 h-3.5" />}
                className="uppercase tracking-wider font-bold"
              >
                Próximo encontro do clube
              </Badge>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-zinc-900 dark:text-white font-heading">
                {nextEvent.title}
              </h2>

              <div className="flex items-center gap-4 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 flex-wrap">
                <span className="flex items-center gap-1.5 font-semibold">
                  <Calendar className="w-4 h-4 text-brand-primary" />
                  {nextEvent.weekday}, {nextEvent.day} de {nextEvent.month} de 2026
                </span>
                <span className="text-zinc-400 dark:text-zinc-600">•</span>
                <span className="flex items-center gap-1.5 font-semibold">
                  <Clock className="w-4 h-4 text-brand-primary" />
                  {nextEvent.time}
                </span>
                <span className="text-zinc-400 dark:text-zinc-600">•</span>
                <span className="flex items-center gap-1.5 font-semibold">
                  <MapPin className="w-4 h-4 text-brand-primary" />
                  {nextEvent.place}
                </span>
              </div>

              <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed max-w-3xl">
                {nextEvent.desc}
              </p>
            </div>

            <div className="shrink-0 w-full lg:w-auto flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end justify-between gap-5 pt-4 lg:pt-0 border-t lg:border-t-0 border-zinc-200 dark:border-white/10">
              <div className="flex items-center gap-3">
                <AvatarGroup
                  showTooltip
                  isPressable
                  radius="full"
                  size="sm"
                  max={5}
                  overlap="sm"
                >
                  {participantMembers.map((m) => (
                    <Avatar
                      key={m?.id}
                      title={`${m?.name} • ${m?.role} (${m?.company})`}
                      onClick={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        if (m?.id !== undefined) {
                          router.push(`/conexoes/${m.id}/${getMemberSlug(m)}`)
                        }
                      }}
                      className="cursor-pointer"
                    >
                      {m?.avatar && (
                        <AvatarImage src={m.avatar} alt={m.name} />
                      )}
                      <AvatarFallback className="font-bold text-[9px] bg-zinc-800 text-white">
                        {getInitials(m?.name || "")}
                      </AvatarFallback>
                    </Avatar>
                  ))}
                </AvatarGroup>
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                  {nextEventCount} de {nextEvent.capacity} confirmados
                </span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Button
                  type="button"
                  color={isNextEventConfirmed ? "success" : "primary"}
                  variant={isNextEventConfirmed ? "flat" : "default"}
                  radius="sm"
                  onClick={handleRSVP}
                  startContent={isNextEventConfirmed ? <Check className="w-3.5 h-3.5" /> : undefined}
                  className="flex-1 sm:flex-none text-xs font-bold uppercase tracking-wider"
                >
                  {isNextEventConfirmed ? "Presença confirmada" : "Confirmar presença"}
                </Button>

                <Link
                  href={`/eventos/${nextEvent.id}/${getEventSlug(nextEvent)}`}
                  className="px-5 py-2.5 rounded-sm border border-zinc-300 dark:border-white/20 bg-zinc-100 dark:bg-white/10 hover:bg-zinc-200 dark:hover:bg-white/20 text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white transition-colors"
                >
                  Detalhes
                </Link>
              </div>
            </div>
          </div>
        </div>

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
