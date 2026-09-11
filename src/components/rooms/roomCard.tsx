"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import {
  Bath,
  Bed,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  DoorClosed,
  Flame,
  Users,
} from "lucide-react"

import { type RoomProperty } from "@/src/data/mockRooms"
import { cn } from "@/src/lib/utils"

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
    return list.slice(1, 11)
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

  const otaSources = React.useMemo(
    () => [
      {
        source: "airbnb" as const,
        name: "Airbnb",
        logo: "/utils/icons/sources/airbnb.svg",
        price: airbnbPrice,
        width: 42,
        height: 12,
        imgClass: "h-2.5 sm:h-3 w-auto object-contain opacity-90 group-hover/source:opacity-100",
      },
      {
        source: "booking" as const,
        name: "Booking.com",
        logo: "/utils/icons/sources/booking.svg",
        price: bookingPrice,
        width: 48,
        height: 10,
        imgClass: "h-2 sm:h-2.5 w-auto object-contain opacity-90 group-hover/source:opacity-100",
      },
      {
        source: "trivago" as const,
        name: "Trivago",
        logo: "/utils/icons/sources/trivago.svg",
        price: trivagoPrice,
        width: 48,
        height: 12,
        imgClass: "h-2.5 sm:h-3 w-auto object-contain opacity-90 group-hover/source:opacity-100",
      },
    ],
    [airbnbPrice, bookingPrice, trivagoPrice]
  )

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
      draggable={false}
      onDragStart={(e) => e.preventDefault()}
      onClick={(e) => {
        if (hasDragged) {
          e.preventDefault()
        }
      }}
      className="group flex flex-col w-[310px] sm:w-[350px] md:w-[380px] lg:w-[400px] shrink-0 snap-start select-none cursor-pointer bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-sm overflow-hidden transition-colors hover:border-zinc-300 dark:hover:border-zinc-700"
    >
      <div className="relative aspect-[16/10] sm:aspect-[4/3] w-full overflow-hidden bg-zinc-200 dark:bg-zinc-800 select-none">
        {photos.map((photoUrl, idx) => (
          <div
            key={photoUrl + idx}
            className={cn(
              "absolute inset-0 transition-opacity duration-300 select-none pointer-events-none",
              idx === currentPhotoIndex
                ? "opacity-100 z-10"
                : "opacity-0 z-0"
            )}
          >
            <Image
              src={photoUrl}
              alt={`${room.title} - Foto ${idx + 1}`}
              fill
              draggable={false}
              sizes="(max-width: 640px) 310px, (max-width: 1024px) 380px, 400px"
              className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out select-none pointer-events-none"
              unoptimized
            />
          </div>
        ))}

        {photos.length > 1 && (
          <button
            type="button"
            onClick={handlePrevPhoto}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-1 text-white hover:text-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110 cursor-pointer"
            aria-label="Foto anterior"
          >
            <ChevronLeft className="w-6 h-6 stroke-[2.5]" />
          </button>
        )}

        {photos.length > 1 && (
          <button
            type="button"
            onClick={handleNextPhoto}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-1 text-white hover:text-white/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110 cursor-pointer"
            aria-label="Próxima foto"
          >
            <ChevronRight className="w-6 h-6 stroke-[2.5]" />
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
                    ? "w-2 h-1.5 bg-white"
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
          className="absolute top-0 left-4 z-20 cursor-pointer group/save focus:outline-hidden"
          aria-label="Salvar acomodação"
        >
          <svg
            width="34"
            height="46"
            viewBox="0 0 34 46"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn(
              "transition-colors duration-200",
              isFav ? "fill-yellow-400" : "fill-black/45 hover:fill-black/65 backdrop-blur-xs"
            )}
          >
            <path d="M0 0 H34 V46 L17 35 L0 46 Z" />
          </svg>
          <Bookmark
            className={cn(
              "absolute top-2.5 left-1/2 -translate-x-1/2 w-4.5 h-4.5 transition-transform duration-200 pointer-events-none",
              isFav
                ? "fill-white text-white stroke-[2.2]"
                : "text-white stroke-[2.2] group-hover/save:scale-110"
            )}
          />
        </button>

        {isLastMinute && (
          <div className="absolute top-3 left-15 z-20 px-2.5 py-1 rounded-sm bg-brand-primary text-white text-[11px] font-bold tracking-wide flex items-center gap-1.5 h-8">
            <Flame className="w-3.5 h-3.5 fill-white text-white" />
            <span>Last Minute</span>
          </div>
        )}

        {discountPercent > 0 && (
          <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden pointer-events-none z-20">
            <div className="absolute -right-8 top-4 w-32 rotate-45 bg-emerald-500 text-white font-black text-xs py-1 text-center uppercase tracking-wider select-none">
              -{discountPercent}%
            </div>
          </div>
        )}
      </div>

      <div className="p-4 sm:p-5 flex flex-col gap-3.5 flex-1 justify-between bg-white dark:bg-zinc-900">
        <div className="flex flex-col gap-2">
          <div className="flex flex-col">
            <div className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider mb-1 truncate">
              {room.city.name}, {room.city.keys_coverage_states.name}
            </div>

            <h3 className="text-sm sm:text-base font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-brand-primary transition-colors line-clamp-1 leading-snug">
              {room.title}
            </h3>
          </div>

          <div className="flex items-center gap-3 text-xs font-semibold text-zinc-600 dark:text-zinc-400 pt-0.5 flex-wrap">
            <div
              className="flex items-center gap-1.5"
              title={`${room.rooms} Quartos`}
            >
              <DoorClosed className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500 shrink-0" />
              <span>{room.rooms}</span>
            </div>
            <span className="text-zinc-300 dark:text-zinc-700 select-none">•</span>
            <div
              className="flex items-center gap-1.5"
              title={`${room.max_guest} Hóspedes`}
            >
              <Users className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500 shrink-0" />
              <span>{room.max_guest}</span>
            </div>
            <span className="text-zinc-300 dark:text-zinc-700 select-none">•</span>
            <div
              className="flex items-center gap-1.5"
              title={`${room.beds} Camas`}
            >
              <Bed className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500 shrink-0" />
              <span>{room.beds}</span>
            </div>
            <span className="text-zinc-300 dark:text-zinc-700 select-none">•</span>
            <div
              className="flex items-center gap-1.5"
              title={`${room.bathrooms} Banheiros`}
            >
              <Bath className="w-3.5 h-3.5 text-zinc-400 dark:text-zinc-500 shrink-0" />
              <span>{room.bathrooms}</span>
            </div>
          </div>
        </div>

        <div className="h-px w-full bg-zinc-100 dark:bg-zinc-800" />

        <div className="flex flex-col gap-1.5">
          <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Outras plataformas
          </div>

          <div className="grid grid-cols-3 gap-2">
            {otaSources.map((ota) => (
              <button
                key={ota.source}
                type="button"
                onClick={(e) => handleOpenSource(e, ota.source)}
                title={`Ver acomodação no ${ota.name}`}
                className="flex flex-col items-center justify-center p-1 rounded-sm hover:opacity-80 transition-opacity cursor-pointer group/source text-center"
              >
                <Image
                  src={ota.logo}
                  alt={ota.name}
                  width={ota.width}
                  height={ota.height}
                  draggable={false}
                  className={cn(ota.imgClass, "select-none pointer-events-none")}
                />
                <span className="text-[11px] font-semibold text-zinc-500 dark:text-zinc-400 group-hover/source:text-zinc-900 dark:group-hover/source:text-white mt-1">
                  R$ {ota.price}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="h-px w-full bg-zinc-100 dark:bg-zinc-800" />

        <div className="flex items-end justify-between gap-3 pt-0.5">
          <div className="flex flex-col">
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-primary">
              Preço Exclusivo ClubKey
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-2xl sm:text-3xl font-black text-brand-primary font-heading tracking-tight leading-none">
                R$ {discountPrice}
              </span>
              <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                / noite
              </span>
            </div>
          </div>

          {savings > 0 && (
            <div className="flex flex-col items-end shrink-0">
              <span className="text-[10px] font-medium text-zinc-400 dark:text-zinc-500 mb-0.5">
                Economia de
              </span>
              <span className="px-2 py-0.5 rounded-sm bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/40 text-xs font-black tracking-tight">
                R$ {savings}
              </span>
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
