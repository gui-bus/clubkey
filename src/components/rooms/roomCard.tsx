"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Bath,
  Bed,
  ChevronLeft,
  ChevronRight,
  DoorClosed,
  Flame,
  Heart,
  Users,
} from "lucide-react"

import { type RoomProperty } from "@/src/data/mockRooms"
import { cn } from "@/src/lib/utils/utils"

export interface RoomCardProps {
  room: RoomProperty
  isFav: boolean
  onToggleFav: (id: string, e: React.MouseEvent) => void
  hasDragged?: boolean
}

export function RoomCard({
  room,
  isFav,
  onToggleFav,
  hasDragged,
}: RoomCardProps): React.JSX.Element {
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
      <div className="relative aspect-[4/3] w-full rounded-sm overflow-hidden bg-zinc-200 dark:bg-zinc-800 mb-3 shadow-xs group-hover:shadow-md transition-shadow">
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
            className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-sm bg-white/95 dark:bg-zinc-900/95 hover:bg-white dark:hover:bg-zinc-900 text-zinc-800 dark:text-white shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-105 cursor-pointer"
            aria-label="Foto anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}

        {photos.length > 1 && (
          <button
            type="button"
            onClick={handleNextPhoto}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-sm bg-white/95 dark:bg-zinc-900/95 hover:bg-white dark:hover:bg-zinc-900 text-zinc-800 dark:text-white shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-105 cursor-pointer"
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
                  "rounded-sm transition-all duration-300 cursor-pointer",
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
          className="absolute top-3 right-3 z-20 w-8 h-8 rounded-sm bg-black/30 hover:bg-black/50 flex items-center justify-center text-white transition-all cursor-pointer backdrop-blur-xs"
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
          <div className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded-sm bg-brand-primary text-white text-[11px] font-bold tracking-wide shadow-md flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 fill-white text-white" />
            <span>60% OFF Last Minute</span>
          </div>
        ) : discountPercent > 0 ? (
          <div className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded-sm bg-zinc-900/85 backdrop-blur-xs text-white text-[11px] font-extrabold tracking-wider shadow-xs">
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
