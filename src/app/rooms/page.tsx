"use client"

import * as React from "react"

import Image from "next/image"
import Link from "next/link"

import { destinationOptions } from "@/src/data/mockDestinations"
import {
  type RoomProperty,
  type RoomSection,
  type UpcomingEventInfo,
  catalogSections,
} from "@/src/data/mockRooms"
import { motion } from "framer-motion"
import {
  Bath,
  Bed,
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  DoorClosed,
  Flame,
  Heart,
  Lock,
  MapPin,
  Minus,
  Plus,
  Search,
  Ticket,
  Users,
  X,
} from "lucide-react"

import { Container } from "@/src/components/common/container"
import { CtaButton } from "@/src/components/common/ctaButton"
import { FloatingCta } from "@/src/components/landing/FloatingCta"
import { Footer } from "@/src/components/landing/Footer"
import { Navbar } from "@/src/components/landing/Navbar"
import { TopBanner } from "@/src/components/landing/TopBanner"

import { cn } from "@/src/lib/utils/utils"

const monthNames = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
]

const weekDayNames = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"]

function EventBadgePopover({
  badge,
  events,
}: {
  badge: string
  events?: UpcomingEventInfo[]
}): React.JSX.Element {
  const [isOpen, setIsOpen] = React.useState(false)
  const popoverRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        popoverRef.current &&
        !popoverRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false)
      }
    }
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isOpen])

  return (
    <div className="relative inline-block" ref={popoverRef}>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation()
          setIsOpen((prev) => !prev)
        }}
        onMouseEnter={() => setIsOpen(true)}
        className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:py-1 rounded-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-semibold hover:border-brand-primary hover:text-brand-primary transition-all shadow-2xs cursor-pointer"
        aria-label={`Ver eventos em ${badge}`}
      >
        <Ticket className="w-3.5 h-3.5 text-brand-primary" />
        <span>{badge}</span>
      </button>

      {isOpen && events && events.length > 0 && (
        <div
          onMouseLeave={() => setIsOpen(false)}
          className="absolute left-0 top-full mt-2 w-64 p-4 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150"
        >
          <div className="text-[10px] font-bold tracking-wider uppercase text-zinc-400 dark:text-zinc-500 mb-2.5">
            No horizonte
          </div>
          <div className="flex flex-col gap-3">
            {events.map((ev) => (
              <div key={ev.id} className="flex flex-col">
                <span className="text-sm font-bold text-zinc-900 dark:text-white leading-tight">
                  {ev.shortLabel || ev.label}
                </span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                  {ev.dateFrom} ·{" "}
                  {ev.daysUntil === 0
                    ? "Acontecendo agora!"
                    : `em ${ev.daysUntil} dias`}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

function RoomCard({
  room,
  isFav,
  onToggleFav,
  hasDragged,
}: {
  room: RoomProperty
  isFav: boolean
  onToggleFav: (id: string, e: React.MouseEvent) => void
  hasDragged?: boolean
}): React.JSX.Element {
  const [currentPhotoIndex, setCurrentPhotoIndex] = React.useState(0)

  const photos = React.useMemo(() => {
    const metaList = (room.images_meta || [])
      .map((m) => m.url)
      .filter((u) => u && u !== room.main_img?.url)
    const list = [room.main_img?.url, ...metaList].filter(Boolean) as string[]
    return list.slice(0, 4)
  }, [room])

  const basePrice = Math.round(parseFloat(room.base_price) || 400)
  const discountPrice = Math.round(
    room.base_price_with_discount || basePrice * 0.7
  )
  const discountPercent = Math.round(
    ((basePrice - discountPrice) / basePrice) * 100
  )

  const airbnbPrice = Math.round(basePrice * 1.15)
  const bookingPrice = Math.round(basePrice * 1.08)
  const trivagoPrice = Math.round(basePrice * 1.12)
  const savings = Math.max(
    airbnbPrice - discountPrice,
    basePrice - discountPrice
  )

  const isLastMinute = Boolean(room.lastminutetoday)

  const handleOpenSource = (
    e: React.MouseEvent,
    source: "airbnb" | "booking" | "trivago"
  ) => {
    e.preventDefault()
    e.stopPropagation()
    const query = `${room.title} ${room.city?.name || ""}`
    let url = ""
    if (source === "airbnb") {
      url = `https://www.airbnb.com.br/s/${encodeURIComponent(query)}/homes`
    } else if (source === "booking") {
      url = `https://www.booking.com/searchresults.pt-br.html?ss=${encodeURIComponent(query)}`
    } else if (source === "trivago") {
      url = `https://www.trivago.com.br/pt-BR/srl?search=${encodeURIComponent(query)}`
    }
    if (typeof window !== "undefined" && url) {
      window.open(url, "_blank", "noopener,noreferrer")
    }
  }

  const handlePrevPhoto = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentPhotoIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1))
  }

  const handleNextPhoto = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentPhotoIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1))
  }

  const handleDotClick = (index: number, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setCurrentPhotoIndex(index)
  }

  return (
    <Link
      href={`/rooms/${room.id}/${room.slug}`}
      onClick={(e) => {
        if (hasDragged) {
          e.preventDefault()
        }
      }}
      className="group flex flex-col w-[310px] sm:w-[350px] md:w-[380px] lg:w-[400px] shrink-0 snap-start select-none cursor-pointer"
    >
      <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-zinc-200 dark:bg-zinc-800 mb-3 shadow-xs group-hover:shadow-md transition-shadow">
        {photos.map((photoUrl, idx) => (
          <div
            key={photoUrl + idx}
            className={cn(
              "absolute inset-0 transition-opacity duration-300",
              idx === currentPhotoIndex
                ? "opacity-100 z-10"
                : "opacity-0 z-0 pointer-events-none"
            )}
          >
            <Image
              src={photoUrl}
              alt={`${room.title} - Foto ${idx + 1}`}
              fill
              sizes="(max-width: 640px) 310px, (max-width: 1024px) 380px, 400px"
              className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              unoptimized
            />
          </div>
        ))}

        {photos.length > 1 && (
          <button
            type="button"
            onClick={handlePrevPhoto}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/95 dark:bg-zinc-900/95 hover:bg-white dark:hover:bg-zinc-900 text-zinc-800 dark:text-white shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-105 cursor-pointer"
            aria-label="Foto anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}

        {photos.length > 1 && (
          <button
            type="button"
            onClick={handleNextPhoto}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white/95 dark:bg-zinc-900/95 hover:bg-white dark:hover:bg-zinc-900 text-zinc-800 dark:text-white shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-105 cursor-pointer"
            aria-label="Próxima foto"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        )}

        {photos.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
            {photos.map((_, dotIdx) => (
              <button
                key={dotIdx}
                type="button"
                onClick={(e) => handleDotClick(dotIdx, e)}
                className={cn(
                  "rounded-full transition-all duration-300 cursor-pointer",
                  dotIdx === currentPhotoIndex
                    ? "w-2 h-1.5 bg-white shadow-xs"
                    : "w-1.5 h-1.5 bg-white/60 hover:bg-white/90"
                )}
                aria-label={`Ir para foto ${dotIdx + 1}`}
              />
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={(e) => onToggleFav(room.id, e)}
          className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-black/30 hover:bg-black/50 flex items-center justify-center text-white transition-all cursor-pointer backdrop-blur-xs"
          aria-label="Favoritar acomodação"
        >
          <Heart
            className={cn(
              "w-4 h-4 transition-colors",
              isFav ? "fill-brand-primary text-brand-primary" : "text-white"
            )}
          />
        </button>

        {isLastMinute ? (
          <div className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded-full bg-brand-primary text-white text-[11px] font-bold tracking-wide shadow-md flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 fill-white text-white" />
            <span>60% OFF Last Minute</span>
          </div>
        ) : discountPercent > 0 ? (
          <div className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded-full bg-zinc-900/85 backdrop-blur-xs text-white text-[11px] font-extrabold tracking-wider shadow-xs">
            {discountPercent}% OFF
          </div>
        ) : null}
      </div>

      <div className="flex flex-col">
        <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1 truncate">
          {room.city.name}, {room.city.keys_coverage_states.name}
        </div>

        <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-brand-primary transition-colors line-clamp-1 leading-snug mb-2">
          {room.title}
        </h3>

        <div className="flex items-center gap-3.5 text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-3">
          <div
            className="flex items-center gap-1"
            title={`${room.rooms} Quartos`}
          >
            <DoorClosed className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" />
            <span>
              {room.rooms} {room.rooms === 1 ? "quarto" : "quartos"}
            </span>
          </div>
          <div
            className="flex items-center gap-1"
            title={`${room.max_guest} Hóspedes`}
          >
            <Users className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" />
            <span>{room.max_guest} hósp.</span>
          </div>
          <div className="flex items-center gap-1" title={`${room.beds} Camas`}>
            <Bed className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" />
            <span>{room.beds} camas</span>
          </div>
          <div
            className="flex items-center gap-1"
            title={`${room.bathrooms} Banheiros`}
          >
            <Bath className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500" />
            <span>{room.bathrooms} banh.</span>
          </div>
        </div>

        {}
        <div className="pt-2.5 border-t border-zinc-200/70 dark:border-zinc-800/70 flex flex-col gap-2">
          <div className="flex items-center gap-3.5 text-xs flex-wrap">
            <button
              type="button"
              onClick={(e) => handleOpenSource(e, "airbnb")}
              title="Ver acomodação no Airbnb"
              className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:scale-105 transition-all cursor-pointer group/source"
            >
              <Image
                src="/utils/icons/sources/airbnb.svg"
                alt="Airbnb"
                width={42}
                height={12}
                className="h-2.5 sm:h-3 w-auto object-contain opacity-90 group-hover/source:opacity-100"
              />
              <span className="text-[11px] font-semibold">
                R$ {airbnbPrice}
              </span>
            </button>
            <button
              type="button"
              onClick={(e) => handleOpenSource(e, "booking")}
              title="Ver acomodação no Booking.com"
              className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:scale-105 transition-all cursor-pointer group/source"
            >
              <Image
                src="/utils/icons/sources/booking.svg"
                alt="Booking.com"
                width={48}
                height={10}
                className="h-2 sm:h-2.5 w-auto object-contain opacity-90 group-hover/source:opacity-100"
              />
              <span className="text-[11px] font-semibold">
                R$ {bookingPrice}
              </span>
            </button>
            <button
              type="button"
              onClick={(e) => handleOpenSource(e, "trivago")}
              title="Ver acomodação no Trivago"
              className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:scale-105 transition-all cursor-pointer group/source"
            >
              <Image
                src="/utils/icons/sources/trivago.svg"
                alt="Trivago"
                width={48}
                height={12}
                className="h-2.5 sm:h-3 w-auto object-contain opacity-90 group-hover/source:opacity-100"
              />
              <span className="text-[11px] font-semibold">
                R$ {trivagoPrice}
              </span>
            </button>
          </div>

          <div className="flex items-baseline justify-between">
            <div className="flex items-baseline gap-1.5">
              <span className="text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
                A partir de
              </span>
              <span className="text-xl sm:text-2xl font-black text-brand-primary tracking-tight">
                R$ {discountPrice}
              </span>
              <span className="text-xs text-zinc-500 dark:text-zinc-400 font-normal">
                / noite
              </span>
            </div>

            <div className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400">
              Economize{" "}
              <span className="font-bold text-emerald-600 dark:text-emerald-400">
                R$ {savings}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

function SectionCarousel({
  section,
  favorites,
  onToggleFav,
}: {
  section: RoomSection
  favorites: Record<string, boolean>
  onToggleFav: (id: string, e: React.MouseEvent) => void
}): React.JSX.Element {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = React.useState(false)
  const [canScrollRight, setCanScrollRight] = React.useState(true)
  const [isDragging, setIsDragging] = React.useState(false)
  const [startX, setStartX] = React.useState(0)
  const [scrollLeftPos, setScrollLeftPos] = React.useState(0)
  const [hasDragged, setHasDragged] = React.useState(false)

  const checkScrollability = React.useCallback(() => {
    const el = containerRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 10)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 10)
  }, [])

  React.useEffect(() => {
    const el = containerRef.current
    if (!el) return
    checkScrollability()
    el.addEventListener("scroll", checkScrollability, { passive: true })
    window.addEventListener("resize", checkScrollability)
    return () => {
      el.removeEventListener("scroll", checkScrollability)
      window.removeEventListener("resize", checkScrollability)
    }
  }, [checkScrollability, section.rooms])

  const handleScroll = (direction: "left" | "right") => {
    const el = containerRef.current
    if (!el) return
    const scrollStep = Math.max(350, el.clientWidth * 0.75)
    el.scrollBy({
      left: direction === "left" ? -scrollStep : scrollStep,
      behavior: "smooth",
    })
  }

  const handleMouseDown = (e: React.MouseEvent) => {
    const el = containerRef.current
    if (!el) return
    setIsDragging(true)
    setHasDragged(false)
    setStartX(e.pageX - el.offsetLeft)
    setScrollLeftPos(el.scrollLeft)
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return
    const el = containerRef.current
    if (!el) return
    e.preventDefault()
    const x = e.pageX - el.offsetLeft
    const walk = (x - startX) * 1.3
    if (Math.abs(walk) > 4) {
      setHasDragged(true)
    }
    el.scrollLeft = scrollLeftPos - walk
  }

  const stopDragging = () => {
    setIsDragging(false)
  }

  return (
    <div className="w-full flex flex-col">
      <div className="flex items-center justify-between gap-4 mb-5">
        <div className="flex items-center gap-3 flex-wrap">
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-zinc-900 dark:text-white font-heading hover:text-brand-primary transition-colors cursor-pointer inline-flex items-center gap-1.5">
            <span>{section.title}</span>
            <ChevronRight className="w-4 h-4 text-zinc-400 dark:text-zinc-500 stroke-[2.5]" />
          </h2>

          {section.eventBadge && (
            <EventBadgePopover
              badge={section.eventBadge}
              events={section.upcomingEvents}
            />
          )}

          {section.subtitle && !section.eventBadge && (
            <span className="hidden md:inline text-xs text-zinc-500 dark:text-zinc-400 font-light">
              • {section.subtitle}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => handleScroll("left")}
            disabled={!canScrollLeft}
            className="w-8 h-8 rounded-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 disabled:opacity-25 disabled:cursor-not-allowed transition-all cursor-pointer active:scale-95"
            aria-label="Rolar para a esquerda"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => handleScroll("right")}
            disabled={!canScrollRight}
            className="w-8 h-8 rounded-full border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 disabled:opacity-25 disabled:cursor-not-allowed transition-all cursor-pointer active:scale-95"
            aria-label="Rolar para a direita"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={stopDragging}
        onMouseLeave={stopDragging}
        className={cn(
          "w-full flex gap-5 overflow-x-auto no-scrollbar scroll-smooth pb-4 pt-1 snap-x snap-mandatory select-none",
          isDragging ? "cursor-grabbing" : "cursor-grab"
        )}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {section.rooms.map((room) => (
          <RoomCard
            key={room.id}
            room={room}
            isFav={!!favorites[room.id]}
            onToggleFav={onToggleFav}
            hasDragged={hasDragged}
          />
        ))}
      </div>
    </div>
  )
}

export default function RoomsPage(): React.JSX.Element {
  const [searchDestination, setSearchDestination] = React.useState("")
  const [destinationQuery, setDestinationQuery] = React.useState("")
  const [destinationOpen, setDestinationOpen] = React.useState(false)

  const [calendarOpen, setCalendarOpen] = React.useState(false)
  const [checkInDate, setCheckInDate] = React.useState<Date | null>(null)
  const [checkOutDate, setCheckOutDate] = React.useState<Date | null>(null)
  const [currentMonth, setCurrentMonth] = React.useState<Date>(() => {
    const d = new Date()
    return new Date(d.getFullYear(), d.getMonth(), 1)
  })

  const [guestCount, setGuestCount] = React.useState<number>(1)
  const [favorites, setFavorites] = React.useState<Record<string, boolean>>({})

  const searchBarRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target as Node)
      ) {
        setDestinationOpen(false)
        setCalendarOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const today = React.useMemo(() => {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    return d
  }, [])

  const isPastDay = (d: Date) => d.getTime() < today.getTime()

  const isSameDay = (d1: Date | null, d2: Date | null) => {
    if (!d1 || !d2) return false
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    )
  }

  const isBetweenDays = (d: Date, start: Date | null, end: Date | null) => {
    if (!start || !end) return false
    const t = d.getTime()
    return t > start.getTime() && t < end.getTime()
  }

  const handleDateClick = (date: Date) => {
    if (isPastDay(date)) return

    if (!checkInDate || (checkInDate && checkOutDate)) {
      setCheckInDate(date)
      setCheckOutDate(null)
    } else if (checkInDate && !checkOutDate) {
      if (date.getTime() > checkInDate.getTime()) {
        setCheckOutDate(date)
      } else if (date.getTime() < checkInDate.getTime()) {
        setCheckInDate(date)
      } else {
        setCheckOutDate(null)
      }
    }
  }

  const handleSelectHoje = () => {
    const d1 = new Date(today)
    const d2 = new Date(today)
    d2.setDate(d2.getDate() + 1)
    setCheckInDate(d1)
    setCheckOutDate(d2)
  }

  const handleSelectAmanha = () => {
    const d1 = new Date(today)
    d1.setDate(d1.getDate() + 1)
    const d2 = new Date(today)
    d2.setDate(d2.getDate() + 2)
    setCheckInDate(d1)
    setCheckOutDate(d2)
  }

  const handleSelectDepois = () => {
    const d1 = new Date(today)
    d1.setDate(d1.getDate() + 2)
    const d2 = new Date(today)
    d2.setDate(d2.getDate() + 4)
    setCheckInDate(d1)
    setCheckOutDate(d2)
  }

  const filteredDestinations = React.useMemo(() => {
    if (!destinationQuery.trim()) return destinationOptions
    const q = destinationQuery.toLowerCase().trim()
    return destinationOptions.filter(
      (d) =>
        d.label.toLowerCase().includes(q) ||
        d.name.toLowerCase().includes(q) ||
        d.uf.toLowerCase().includes(q)
    )
  }, [destinationQuery])

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

  const renderMonth = (
    monthDate: Date,
    showPrevNav: boolean,
    showNextNav: boolean
  ) => {
    const year = monthDate.getFullYear()
    const month = monthDate.getMonth()
    const monthName = monthNames[month]
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    const days = []
    for (let i = 0; i < firstDay; i++) {
      days.push(null)
    }
    for (let d = 1; d <= daysInMonth; d++) {
      days.push(new Date(year, month, d))
    }

    const tomorrow = new Date(today.getTime() + 86400000)
    const dayAfter = new Date(today.getTime() + 86400000 * 2)

    return (
      <div className="flex-1 min-w-[260px]">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-bold text-zinc-900 dark:text-white capitalize">
            {monthName} {year}
          </h4>
          <div className="flex items-center gap-1">
            {showPrevNav && (
              <button
                type="button"
                onClick={() =>
                  setCurrentMonth(
                    (prev) =>
                      new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
                  )
                }
                className="p-1 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 transition-colors cursor-pointer"
                aria-label="Mês anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}
            {showNextNav && (
              <button
                type="button"
                onClick={() =>
                  setCurrentMonth(
                    (prev) =>
                      new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
                  )
                }
                className="p-1 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 transition-colors cursor-pointer"
                aria-label="Próximo mês"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {weekDayNames.map((w) => (
            <span
              key={w}
              className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase"
            >
              {w}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 text-center">
          {days.map((date, idx) => {
            if (!date) {
              return (
                <div key={`empty-${idx}`} className="w-8 h-8 sm:w-9 sm:h-9" />
              )
            }

            const isPast = isPastDay(date)
            const isCheckIn = isSameDay(date, checkInDate)
            const isCheckOut = isSameDay(date, checkOutDate)
            const inRange = isBetweenDays(date, checkInDate, checkOutDate)

            const isLastMinuteDay =
              isSameDay(date, today) ||
              isSameDay(date, tomorrow) ||
              isSameDay(date, dayAfter)

            if (isPast) {
              return (
                <div
                  key={date.toISOString()}
                  className="relative w-8 h-8 sm:w-9 sm:h-9 mx-auto flex items-center justify-center text-xs font-normal text-zinc-300 dark:text-zinc-600 bg-zinc-50/50 dark:bg-zinc-900/30 rounded-lg cursor-not-allowed select-none"
                >
                  <span>{date.getDate()}</span>
                  <Lock className="w-2 h-2 text-zinc-300 dark:text-zinc-600 absolute top-1 right-1" />
                </div>
              )
            }

            return (
              <button
                key={date.toISOString()}
                type="button"
                onClick={() => handleDateClick(date)}
                className={cn(
                  "relative w-8 h-8 sm:w-9 sm:h-9 mx-auto flex items-center justify-center text-xs font-medium rounded-full transition-colors cursor-pointer select-none",
                  isCheckIn || isCheckOut
                    ? "font-bold text-white bg-brand-primary shadow-xs"
                    : inRange
                      ? "font-semibold text-brand-primary bg-brand-primary/15 rounded-sm"
                      : "text-zinc-800 dark:text-zinc-200 hover:bg-brand-primary/10 hover:text-brand-primary"
                )}
              >
                <span>{date.getDate()}</span>
                {isLastMinuteDay && !isCheckIn && !isCheckOut && (
                  <Flame className="w-2.5 h-2.5 text-brand-primary fill-brand-primary absolute -top-0.5 -right-0.5" />
                )}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  const nextMonthDate = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    1
  )

  const hasActiveFilters =
    Boolean(searchDestination) ||
    guestCount > 1 ||
    Boolean(checkInDate) ||
    Boolean(checkOutDate)

  return (
    <main className="w-full bg-[#F1F1F1] dark:bg-[#161616] text-[#111111] dark:text-white flex flex-col font-sans selection:bg-brand-primary/20 selection:text-brand-primary">
      <TopBanner />
      <Navbar />

      <section
        id="hero"
        className="relative z-30 w-full bg-[#0D0D0D] text-white min-h-[560px] md:min-h-[620px] flex flex-col justify-center"
      >
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
          <Image
            src="/utils/banners/img_01.png"
            alt="ClubKey Background"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#161616]/85 via-[#161616]/65 to-[#161616]/95 z-10" />
        </div>

        <Container className="relative z-20 pt-36 pb-20 md:pt-44 md:pb-24 flex flex-col justify-center items-center text-center">
          <div className="max-w-6xl flex flex-col items-center text-center w-full">
            <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black uppercase tracking-tight text-white leading-[1.04] mb-4 font-heading drop-shadow-md">
              Viva momentos únicos em{" "}
              <span className="text-brand-primary">acomodações incríveis</span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-zinc-200 font-light mb-10 leading-relaxed drop-shadow-sm max-w-3xl">
              Com o benefício Club Key, viaje o ano todo pagando com até{" "}
              <strong className="font-bold text-white">60% OFF</strong> em
              reservas last minute.
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              ref={searchBarRef}
              className="relative z-40 w-full max-w-4xl bg-white dark:bg-[#1a1a1a] rounded-2xl sm:rounded-full shadow-2xl p-2 sm:p-2.5 flex flex-col sm:flex-row items-center justify-between gap-2 border border-zinc-200/80 dark:border-zinc-800"
            >
              <div className="relative flex-1 w-full">
                <button
                  type="button"
                  onClick={() => {
                    setDestinationOpen((prev) => !prev)
                    setCalendarOpen(false)
                  }}
                  className="w-full flex items-center justify-between gap-2.5 px-4 py-2.5 sm:py-2 rounded-xl sm:rounded-full hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors text-left cursor-pointer"
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <MapPin className="w-4 h-4 text-brand-primary shrink-0" />
                    <span className="text-xs sm:text-sm font-semibold text-zinc-800 dark:text-zinc-200 truncate">
                      {searchDestination || "Qual o seu destino?"}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-zinc-400 shrink-0 transition-transform ${
                      destinationOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {destinationOpen && (
                  <div className="absolute top-full left-0 mt-3 w-full sm:w-84 bg-white dark:bg-[#1e1e1e] rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 z-[100] overflow-hidden text-left animate-in fade-in zoom-in-95 duration-150">
                    <div className="p-3 border-b border-zinc-100 dark:border-zinc-800 flex items-center gap-2">
                      <Search className="w-4 h-4 text-zinc-400 shrink-0" />
                      <input
                        type="text"
                        placeholder="Buscar estado ou cidade..."
                        value={destinationQuery}
                        onChange={(e) => setDestinationQuery(e.target.value)}
                        autoFocus
                        className="w-full bg-transparent text-xs sm:text-sm font-medium focus:outline-none text-zinc-900 dark:text-white placeholder:text-zinc-400"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setSearchDestination("")
                        setDestinationOpen(false)
                      }}
                      className="w-full px-4 py-2.5 text-left text-xs font-semibold text-zinc-600 dark:text-zinc-300 bg-zinc-100/80 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
                    >
                      Limpar seleção
                    </button>

                    <div className="max-h-56 overflow-y-auto divide-y divide-zinc-50 dark:divide-zinc-800/50">
                      {filteredDestinations.map((dest) => (
                        <button
                          key={dest.id}
                          type="button"
                          onClick={() => {
                            setSearchDestination(dest.label)
                            setDestinationOpen(false)
                          }}
                          className="w-full px-4 py-2.5 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-xs sm:text-sm font-medium text-zinc-800 dark:text-zinc-200 cursor-pointer text-left"
                        >
                          <div className="flex items-center gap-2.5 truncate">
                            <MapPin className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                            <span className="truncate">{dest.label}</span>
                          </div>
                          <span className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wider font-semibold shrink-0 ml-2">
                            {dest.type === "state" ? "Estado" : "Cidade"}
                          </span>
                        </button>
                      ))}
                      {filteredDestinations.length === 0 && (
                        <div className="px-4 py-3 text-xs text-zinc-400 text-center">
                          Nenhum destino encontrado
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <button
                type="button"
                onClick={() => {
                  setCalendarOpen((prev) => !prev)
                  setDestinationOpen(false)
                }}
                className="flex-1 w-full sm:w-auto flex items-center gap-2.5 px-4 py-2.5 sm:py-2 rounded-xl sm:rounded-full hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors text-left cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-zinc-500 dark:text-zinc-400 shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-zinc-800 dark:text-zinc-200 whitespace-nowrap">
                  {checkInDate
                    ? checkInDate.toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "short",
                      })
                    : "Check-in"}
                </span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setCalendarOpen((prev) => !prev)
                  setDestinationOpen(false)
                }}
                className="flex-1 w-full sm:w-auto flex items-center gap-2.5 px-4 py-2.5 sm:py-2 rounded-xl sm:rounded-full hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors text-left cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-zinc-500 dark:text-zinc-400 shrink-0" />
                <span className="text-xs sm:text-sm font-semibold text-zinc-800 dark:text-zinc-200 whitespace-nowrap">
                  {checkOutDate
                    ? checkOutDate.toLocaleDateString("pt-BR", {
                        day: "2-digit",
                        month: "short",
                      })
                    : "Check-out"}
                </span>
              </button>

              <div className="flex items-center gap-2.5 px-3 py-1.5">
                <button
                  type="button"
                  onClick={() => setGuestCount((prev) => Math.max(1, prev - 1))}
                  disabled={guestCount <= 1}
                  className="w-8 h-8 rounded-full border border-zinc-300 dark:border-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-zinc-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  aria-label="Diminuir hóspedes"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-1.5 px-1">
                  <Users className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
                  <span className="text-sm font-bold text-zinc-900 dark:text-white min-w-[14px] text-center">
                    {guestCount}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setGuestCount((prev) => Math.min(10, prev + 1))
                  }
                  disabled={guestCount >= 10}
                  className="w-8 h-8 rounded-full border border-zinc-300 dark:border-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-zinc-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                  aria-label="Aumentar hóspedes"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  setDestinationOpen(false)
                  setCalendarOpen(false)
                }}
                className="w-11 h-11 rounded-full bg-brand-primary hover:bg-brand-primary-hover text-white flex items-center justify-center shadow-lg transition-all shrink-0 cursor-pointer"
                aria-label="Buscar acomodações"
              >
                <Search className="w-4 h-4 stroke-[2.5]" />
              </button>

              {calendarOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-full max-w-[95vw] md:max-w-4xl bg-white dark:bg-[#1a1a1a] rounded-2xl shadow-2xl border border-zinc-200 dark:border-zinc-800 z-[100] p-4 sm:p-6 text-left animate-in fade-in zoom-in-95 duration-150">
                  <div className="flex items-center justify-between pb-4 mb-4 border-b border-zinc-100 dark:border-zinc-800">
                    <span className="text-sm sm:text-base font-semibold text-zinc-800 dark:text-zinc-200">
                      Check-in / Check-out
                    </span>
                    <button
                      type="button"
                      onClick={() => setCalendarOpen(false)}
                      className="p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-800 dark:hover:text-white transition-colors cursor-pointer"
                      aria-label="Fechar calendário"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1 flex flex-col sm:flex-row gap-6">
                      {renderMonth(currentMonth, true, false)}
                      {renderMonth(nextMonthDate, false, true)}
                    </div>

                    <div className="w-full md:w-56 shrink-0 md:border-l border-zinc-200 dark:border-zinc-800 md:pl-5 flex flex-col justify-between pt-4 md:pt-0 border-t md:border-t-0 gap-4">
                      <div className="flex flex-col gap-2.5">
                        <div className="flex items-center gap-1.5 text-sm font-bold text-zinc-900 dark:text-white mb-1">
                          <Flame className="w-4 h-4 text-brand-primary fill-brand-primary" />
                          <span>Last Minute</span>
                        </div>
                        <button
                          type="button"
                          onClick={handleSelectHoje}
                          className="w-full py-2.5 px-3 border border-zinc-200 dark:border-zinc-700 rounded-sm text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:border-brand-primary hover:text-brand-primary flex items-center gap-2 transition-all cursor-pointer bg-white dark:bg-zinc-800/50 whitespace-nowrap select-none"
                        >
                          <Flame className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                          <span className="whitespace-nowrap">Hoje (60% OFF)</span>
                        </button>
                        <button
                          type="button"
                          onClick={handleSelectAmanha}
                          className="w-full py-2.5 px-3 border border-zinc-200 dark:border-zinc-700 rounded-sm text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:border-brand-primary hover:text-brand-primary flex items-center gap-2 transition-all cursor-pointer bg-white dark:bg-zinc-800/50 whitespace-nowrap select-none"
                        >
                          <Flame className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                          <span className="whitespace-nowrap">Amanhã (60% OFF)</span>
                        </button>
                        <button
                          type="button"
                          onClick={handleSelectDepois}
                          className="w-full py-2.5 px-3 border border-zinc-200 dark:border-zinc-700 rounded-sm text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:border-brand-primary hover:text-brand-primary flex items-center gap-2 transition-all cursor-pointer bg-white dark:bg-zinc-800/50 whitespace-nowrap select-none"
                        >
                          <Flame className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                          <span className="whitespace-nowrap">Depois (60% OFF)</span>
                        </button>
                      </div>

                      <div className="flex flex-col gap-2 pt-2">
                        <CtaButton
                          isFullWidth
                          size="sm"
                          onClick={() => setCalendarOpen(false)}
                          className="whitespace-nowrap"
                        >
                          Confirmar
                        </CtaButton>
                        <button
                          type="button"
                          onClick={() => {
                            setCheckInDate(null)
                            setCheckOutDate(null)
                          }}
                          className="w-full py-2.5 bg-white dark:bg-zinc-800 border border-brand-primary text-brand-primary hover:bg-brand-primary-light dark:hover:bg-zinc-700 rounded-sm text-xs sm:text-sm font-bold transition-colors cursor-pointer select-none"
                        >
                          Limpar Datas
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </Container>
      </section>

      <Container className="relative z-10 flex-1 py-10">
        <div className="w-full flex flex-col gap-12 sm:gap-16">
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-[#1a1a1a] px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 shadow-xs">
              <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-600 dark:text-zinc-300">
                <span className="font-semibold text-zinc-900 dark:text-white">
                  Filtros aplicados:
                </span>
                {searchDestination && (
                  <span className="px-2.5 py-1 rounded-full bg-brand-primary/10 text-brand-primary font-bold flex items-center gap-1.5">
                    <MapPin className="w-3 h-3" />
                    <span>{searchDestination}</span>
                  </span>
                )}
                {guestCount > 1 && (
                  <span className="px-2.5 py-1 rounded-full bg-brand-primary/10 text-brand-primary font-bold flex items-center gap-1.5">
                    <Users className="w-3 h-3" />
                    <span>{guestCount} hóspedes</span>
                  </span>
                )}
                {(checkInDate || checkOutDate) && (
                  <span className="px-2.5 py-1 rounded-full bg-brand-primary/10 text-brand-primary font-bold flex items-center gap-1.5">
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
                onClick={() => {
                  setSearchDestination("")
                  setGuestCount(1)
                  setCheckInDate(null)
                  setCheckOutDate(null)
                }}
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
            <div className="py-16 text-center flex flex-col items-center justify-center">
              <p className="text-lg font-bold text-zinc-700 dark:text-zinc-300 mb-2">
                Nenhuma acomodação encontrada para os filtros selecionados
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">
                Tente alterar o destino ou reduzir o número de hóspedes.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSearchDestination("")
                  setGuestCount(1)
                  setCheckInDate(null)
                  setCheckOutDate(null)
                }}
                className="px-4 py-2 bg-brand-primary hover:bg-brand-primary-hover text-white text-xs font-bold rounded-full transition-colors cursor-pointer"
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
