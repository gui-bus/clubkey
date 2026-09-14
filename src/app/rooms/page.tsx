"use client"

import * as React from "react"
import Image from "next/image"
import { Calendar, MapPin, Users } from "lucide-react"

import { RoomsSearchFilterBar } from "@/src/components/rooms/roomsSearchFilterBar"
import { SectionCarousel } from "@/src/components/rooms/sectionCarousel"
import { Container } from "@/src/components/common/container"
import { FloatingCta } from "@/src/components/landing/FloatingCta"
import { Footer } from "@/src/components/landing/Footer"
import { Navbar } from "@/src/components/landing/Navbar"
import { TopBanner } from "@/src/components/landing/TopBanner"
import { destinationOptions } from "@/src/data/mockDestinations"
import { catalogSections } from "@/src/data/mockRooms"
import { toast } from "@/src/components/ui/toast/toast"

export default function RoomsPage(): React.JSX.Element {
  const [searchDestination, setSearchDestination] = React.useState("")
  const [checkInDate, setCheckInDate] = React.useState<Date | null>(null)
  const [checkOutDate, setCheckOutDate] = React.useState<Date | null>(null)
  const [guestCount, setGuestCount] = React.useState<number>(1)
  const [favorites, setFavorites] = React.useState<Record<string, boolean>>({})

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const willBeFav = !favorites[id]

    let roomTitle = "Acomodação"
    for (const s of catalogSections) {
      const found = s.rooms.find((r) => r.id === id)
      if (found) {
        roomTitle = found.title
        break
      }
    }

    if (willBeFav) {
      toast.success("Acomodação salva!", {
        description: `${roomTitle} foi adicionada aos seus salvos.`,
      })
    } else {
      toast.info("Acomodação removida", {
        description: `${roomTitle} foi removida dos seus salvos.`,
      })
    }

    setFavorites((prev) => ({ ...prev, [id]: willBeFav }))
  }

  const filteredSections = React.useMemo(() => {
    const sections = catalogSections
    const destLower = searchDestination.toLowerCase().trim()
    const guestsNum = guestCount

    if (!destLower && guestsNum <= 1) {
      return sections
    }

    const matchedOption = destinationOptions.find(
      (opt) =>
        opt.label.toLowerCase() === destLower ||
        opt.name.toLowerCase() === destLower
    )

    return sections
      .map((section) => {
        const filteredRooms = section.rooms.filter((room) => {
          let matchesDest = true
          if (destLower) {
            if (matchedOption) {
              if (matchedOption.type === "state") {
                matchesDest =
                  room.city.keys_coverage_states.name
                    .toLowerCase()
                    .includes(matchedOption.name.toLowerCase()) ||
                  room.city.keys_coverage_states.name.toLowerCase() ===
                    matchedOption.name.toLowerCase() ||
                  room.city.name
                    .toLowerCase()
                    .includes(matchedOption.name.toLowerCase())
              } else {
                matchesDest =
                  room.city.name
                    .toLowerCase()
                    .includes(matchedOption.name.toLowerCase()) ||
                  matchedOption.name
                    .toLowerCase()
                    .includes(room.city.name.toLowerCase())
              }
            } else {
              const searchTokens = destLower
                .replace(/[()]/g, "")
                .split(/[\s,-]+/)
                .filter(Boolean)
              matchesDest = searchTokens.every(
                (token) =>
                  room.city.name.toLowerCase().includes(token) ||
                  room.city.keys_coverage_states.name
                    .toLowerCase()
                    .includes(token) ||
                  room.title.toLowerCase().includes(token) ||
                  room.slug.toLowerCase().includes(token)
              )
            }
          }

          const matchesGuests = room.max_guest >= guestsNum
          return matchesDest && matchesGuests
        })

        return { ...section, rooms: filteredRooms }
      })
      .filter((section) => section.rooms.length > 0)
  }, [searchDestination, guestCount])

  const hasActiveFilters =
    Boolean(searchDestination) ||
    guestCount > 1 ||
    Boolean(checkInDate) ||
    Boolean(checkOutDate)

  const handleClearFilters = () => {
    setSearchDestination("")
    setGuestCount(1)
    setCheckInDate(null)
    setCheckOutDate(null)
  }

  return (
    <main className="w-full bg-zinc-50 dark:bg-[#0D0D0D] text-zinc-900 dark:text-white flex flex-col font-sans selection:bg-brand-primary/20 selection:text-brand-primary min-h-screen">
      <TopBanner />
      <Navbar />

      <section
        id="hero"
        className="relative z-30 w-full bg-[#0D0D0D] text-white min-h-[520px] md:min-h-[580px] flex flex-col justify-center"
      >
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
          <Image
            src="/utils/banners/img_01.png"
            alt="ClubKey Hospedagens"
            fill
            priority
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-zinc-50 dark:from-[#161616]/85 dark:via-[#161616]/65 dark:to-[#0D0D0D] z-10" />
        </div>

        <Container className="relative z-20 pt-36 pb-16 md:pt-44 md:pb-20 flex flex-col justify-center items-center text-center">
          <div className="max-w-5xl flex flex-col items-center text-center w-full">
            <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-brand-primary block mb-3">
              Catálogo de Hospedagens • Travel Club
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black uppercase tracking-tight text-white leading-[1.05] mb-4 font-heading drop-shadow-md">
              Viva momentos únicos em <span className="text-brand-primary">acomodações incríveis</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-zinc-200 font-light mb-8 leading-relaxed drop-shadow-sm max-w-2xl">
              Com o benefício Club Key, viaje o ano todo pagando tarifas exclusivas de membro e até{" "}
              <strong className="font-bold text-white">60% OFF</strong> em reservas last minute.
            </p>

            <RoomsSearchFilterBar
              searchDestination={searchDestination}
              onSearchDestinationChange={setSearchDestination}
              checkInDate={checkInDate}
              onCheckInDateChange={setCheckInDate}
              checkOutDate={checkOutDate}
              onCheckOutDateChange={setCheckOutDate}
              guestCount={guestCount}
              onGuestCountChange={setGuestCount}
            />
          </div>
        </Container>
      </section>

      <Container className="relative z-10 flex-1 py-10 space-y-12">
        <div className="w-full flex flex-col gap-12 sm:gap-16">
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-[#141416] px-4 py-3 rounded-sm border border-zinc-200 dark:border-zinc-800 shadow-sm text-zinc-900 dark:text-white">
              <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-600 dark:text-zinc-300">
                <span className="font-semibold text-zinc-900 dark:text-white">
                  Filtros aplicados:
                </span>
                {searchDestination && (
                  <span className="px-2.5 py-1 rounded-sm bg-brand-primary/10 text-brand-primary font-bold flex items-center gap-1.5">
                    <MapPin className="w-3 h-3" />
                    <span>{searchDestination}</span>
                  </span>
                )}
                {guestCount > 1 && (
                  <span className="px-2.5 py-1 rounded-sm bg-brand-primary/10 text-brand-primary font-bold flex items-center gap-1.5">
                    <Users className="w-3 h-3" />
                    <span>{guestCount} hóspedes</span>
                  </span>
                )}
                {(checkInDate || checkOutDate) && (
                  <span className="px-2.5 py-1 rounded-sm bg-brand-primary/10 text-brand-primary font-bold flex items-center gap-1.5">
                    <Calendar className="w-3 h-3" />
                    <span>
                      {checkInDate?.toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "short",
                      })}
                      {checkOutDate &&
                        ` — ${checkOutDate.toLocaleDateString("pt-BR", {
                          day: "2-digit",
                          month: "short",
                        })}`}
                    </span>
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={handleClearFilters}
                className="text-xs font-bold text-brand-primary hover:underline cursor-pointer"
              >
                Limpar filtros
              </button>
            </div>
          )}

          {(() => {
            const firstEventIndex = filteredSections.findIndex((s) => s.isEvent)
            return filteredSections.map((section, index) => (
              <React.Fragment key={section.id}>
                {section.isEvent && index === firstEventIndex && (
                  <div className="-mb-4 sm:-mb-6">
                    <h2 className="text-2xl sm:text-3xl font-black text-zinc-900 dark:text-white font-heading tracking-tight">
                      Eventos
                    </h2>
                  </div>
                )}
                <SectionCarousel
                  section={section}
                  favorites={favorites}
                  onToggleFav={toggleFavorite}
                />
              </React.Fragment>
            ))
          })()}

          {filteredSections.length === 0 && (
            <div className="py-16 text-center flex flex-col items-center justify-center p-12 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416]">
              <p className="text-lg font-bold text-zinc-900 dark:text-white mb-2 font-heading uppercase tracking-tight">
                Nenhuma acomodação encontrada
              </p>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mb-6 max-w-md leading-relaxed">
                Não encontramos hospedagens para os filtros selecionados. Tente alterar o destino ou reduzir o número de hóspedes.
              </p>
              <button
                type="button"
                onClick={handleClearFilters}
                className="px-5 py-2.5 bg-brand-primary hover:bg-brand-primary-hover text-white text-xs font-bold uppercase tracking-wider rounded-sm transition-colors cursor-pointer shadow-sm"
              >
                Ver todas as acomodações
              </button>
            </div>
          )}
        </div>
      </Container>

      <Footer />
      <FloatingCta />
    </main>
  )
}
