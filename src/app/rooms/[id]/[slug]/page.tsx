"use client"

import * as React from "react"

import Image from "next/image"
import Link from "next/link"
import { useParams } from "next/navigation"

import { getRoomDetail } from "@/src/data/mockRoomDetails"
import { AnimatePresence, motion } from "framer-motion"
import {
  ArrowUpDown,
  BadgePercent,
  BedDouble,
  Car,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Flame,
  Grid,
  Heart,
  Laptop,
  MapPin,
  Minus,
  Navigation,
  Plus,
  Share2,
  ShieldAlert,
  ShieldCheck,
  Shirt,
  Sparkles,
  Tv,
  Umbrella,
  Utensils,
  Waves,
  Wifi,
  Wind,
  X,
  Zap,
} from "lucide-react"

import { Toast, toast } from "@/src/components/ui/toast/toast"

import { Container } from "@/src/components/common/container"
import { FloatingCta } from "@/src/components/landing/FloatingCta"
import { Footer } from "@/src/components/landing/Footer"
import { Navbar } from "@/src/components/landing/Navbar"
import { TopBanner } from "@/src/components/landing/TopBanner"

import { cn } from "@/src/lib/utils/utils"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Waves,
  Wind,
  Wifi,
  Utensils,
  Flame,
  Car,
  Umbrella,
  ArrowUpDown,
  Shirt,
  Tv,
  Laptop,
  Zap,
  Sparkles,
  BedDouble,
  ShieldCheck,
}

export default function RoomDetailPage(): React.JSX.Element {
  const params = useParams()
  const id = (Array.isArray(params?.id) ? params.id[0] : params?.id) as string
  const slug = (
    Array.isArray(params?.slug) ? params.slug[0] : params?.slug
  ) as string

  const room = React.useMemo(() => getRoomDetail(id, slug), [id, slug])

  const [lightboxOpen, setLightboxOpen] = React.useState(false)
  const [activePhotoIndex, setActivePhotoIndex] = React.useState(0)
  const [isFav, setIsFav] = React.useState(false)
  const [heartPop, setHeartPop] = React.useState(false)
  const [copiedLink, setCopiedLink] = React.useState(false)
  const [activeCompetitorIndex, setActiveCompetitorIndex] = React.useState(0)
  const [directionsOpen, setDirectionsOpen] = React.useState(false)
  const directionsRef = React.useRef<HTMLDivElement>(null)

  const [guests, setGuests] = React.useState(2)
  const [nights, setNights] = React.useState(3)

  const allPhotos = React.useMemo(() => {
    const list: string[] = []
    if (room.main_img?.url) list.push(room.main_img.url)
    for (const m of room.images_meta || []) {
      if (m.url && !list.includes(m.url)) {
        list.push(m.url)
      }
    }
    return list
  }, [room])

  const basePriceNum = parseFloat(room.base_price) || 473
  const discountPriceNum = Math.round(
    room.price?.breakdown?.regular?.discountedPricePerNight
      ? parseFloat(room.price.breakdown.regular.discountedPricePerNight)
      : basePriceNum * 0.7
  )
  const airbnbPriceNum = Math.round(basePriceNum * 1.15)
  const bookingPriceNum = Math.round(basePriceNum * 1.08)
  const trivagoPriceNum = Math.round(basePriceNum * 1.12)
  const discountPercent = Math.round(
    ((basePriceNum - discountPriceNum) / basePriceNum) * 100
  )
  const savingsPerNight = airbnbPriceNum - discountPriceNum

  const subtotal = discountPriceNum * nights
  const cleaningFee = 180
  const processingFee = 5
  const total = subtotal + cleaningFee + processingFee

  const airbnbUrl = `https://www.airbnb.com.br/s/${encodeURIComponent(`${room.title} ${room.city.name}`)}/homes`
  const bookingUrl = `https://www.booking.com/searchresults.pt-br.html?ss=${encodeURIComponent(`${room.title} ${room.city.name}`)}`
  const trivagoUrl = `https://www.trivago.com.br/pt-BR/srl?search=${encodeURIComponent(`${room.title} ${room.city.name}`)}`

  const competitors = React.useMemo(
    () => [
      {
        name: "Airbnb",
        logo: "/utils/icons/sources/airbnb.svg",
        pricePerNight: airbnbPriceNum,
        total: airbnbPriceNum * nights + 220,
        logoClass: "h-5 w-auto",
        url: airbnbUrl,
      },
      {
        name: "Booking.com",
        logo: "/utils/icons/sources/booking.svg",
        pricePerNight: bookingPriceNum,
        total: bookingPriceNum * nights + 210,
        logoClass: "h-4.5 w-auto",
        url: bookingUrl,
      },
      {
        name: "Trivago",
        logo: "/utils/icons/sources/trivago.svg",
        pricePerNight: trivagoPriceNum,
        total: trivagoPriceNum * nights + 215,
        logoClass: "h-5 w-auto",
        url: trivagoUrl,
      },
    ],
    [
      airbnbPriceNum,
      bookingPriceNum,
      trivagoPriceNum,
      nights,
      airbnbUrl,
      bookingUrl,
      trivagoUrl,
    ]
  )

  React.useEffect(() => {
    const timer = setInterval(() => {
      setActiveCompetitorIndex((prev) => (prev + 1) % competitors.length)
    }, 3500)
    return () => clearInterval(timer)
  }, [competitors.length])

  const currentCompetitor = competitors[activeCompetitorIndex]
  const competitorSavings = Math.max(0, currentCompetitor.total - total)

  const openLightbox = (index: number) => {
    setActivePhotoIndex(index)
    setLightboxOpen(true)
  }

  const handleShare = async () => {
    const shareData = {
      title: room.title,
      text: `Confira ${room.title} na ClubKey com tarifas exclusivas e até ${discountPercent}% de desconto!`,
      url: typeof window !== "undefined" ? window.location.href : "",
    }

    if (
      typeof navigator !== "undefined" &&
      typeof navigator.share === "function"
    ) {
      try {
        await navigator.share(shareData)
        toast.success("Link compartilhado!", {
          description: "Obrigado por compartilhar esta acomodação.",
        })
        return
      } catch (err: unknown) {
        if (err instanceof Error && err.name === "AbortError") return
      }
    }

    if (typeof navigator !== "undefined" && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(window.location.href)
        setCopiedLink(true)
        setTimeout(() => setCopiedLink(false), 2500)
        toast.success("Link copiado para a área de transferência!", {
          description: "Envie para seus amigos e garanta o melhor desconto.",
        })
      } catch {
        toast.error("Não foi possível copiar o link.")
      }
    }
  }

  const handleToggleFav = () => {
    const nextFav = !isFav
    setIsFav(nextFav)
    setHeartPop(true)
    setTimeout(() => setHeartPop(false), 600)

    if (nextFav) {
      toast.success("Acomodação favoritada!", {
        description: `${room.title} foi adicionado à sua lista de desejos.`,
      })
    } else {
      toast.info("Removido dos favoritos", {
        description: "Acomodação removida da sua lista.",
      })
    }
  }

  React.useEffect(() => {
    if (!lightboxOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false)
      if (e.key === "ArrowLeft") {
        setActivePhotoIndex((prev) =>
          prev === 0 ? allPhotos.length - 1 : prev - 1
        )
      }
      if (e.key === "ArrowRight") {
        setActivePhotoIndex((prev) =>
          prev === allPhotos.length - 1 ? 0 : prev + 1
        )
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [lightboxOpen, allPhotos.length])

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        directionsRef.current &&
        !directionsRef.current.contains(e.target as Node)
      ) {
        setDirectionsOpen(false)
      }
    }
    if (directionsOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [directionsOpen])

  return (
    <main className="min-h-screen w-full bg-[#F1F1F1] dark:bg-[#161616] text-[#111111] dark:text-white flex flex-col font-sans selection:bg-[#FF6847]/20 selection:text-[#FF6847]">
      <TopBanner />
      <Navbar isTransparent={false} />

      <Container className="pt-6 pb-24">
        <div className="flex items-center justify-between gap-4 mb-4">
          <Link
            href="/rooms"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Voltar para acomodações</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-black/10 dark:border-white/10 bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/15 text-xs font-semibold text-zinc-800 dark:text-zinc-200 transition-all cursor-pointer backdrop-blur-md shadow-2xs active:scale-95 group"
            >
              <Share2 className="w-3.5 h-3.5 text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors" />
              <span>{copiedLink ? "Link copiado!" : "Compartilhar"}</span>
            </button>
            <button
              type="button"
              onClick={handleToggleFav}
              className="relative inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-black/10 dark:border-white/10 bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/15 text-xs font-semibold text-zinc-800 dark:text-zinc-200 transition-all cursor-pointer backdrop-blur-md shadow-2xs active:scale-95 group overflow-hidden"
            >
              <div className="relative flex items-center justify-center">
                <motion.div
                  animate={
                    heartPop
                      ? { scale: [1, 1.45, 0.85, 1.15, 1] }
                      : { scale: 1 }
                  }
                  transition={{ duration: 0.45 }}
                >
                  <Heart
                    className={cn(
                      "w-3.5 h-3.5 transition-all duration-300",
                      isFav
                        ? "fill-[#FF6847] text-[#FF6847] drop-shadow-[0_0_6px_rgba(255,104,71,0.5)]"
                        : "text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white"
                    )}
                  />
                </motion.div>
                <AnimatePresence>
                  {heartPop && isFav && (
                    <motion.span
                      initial={{ scale: 0, opacity: 1 }}
                      animate={{ scale: 2.2, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="absolute inset-0 rounded-full bg-[#FF6847]/40 pointer-events-none"
                    />
                  )}
                </AnimatePresence>
              </div>
              <span>{isFav ? "Salvo" : "Salvar"}</span>
            </button>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-bold text-[#FF6847] tracking-wider uppercase mb-1">
            <MapPin className="w-3.5 h-3.5" />
            <span>
              {room.city.keys_coverage_states.name} — {room.city.name}
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-zinc-900 dark:text-white font-heading tracking-tight leading-tight">
            {room.title}
          </h1>
          <p className="text-xs sm:text-sm font-medium text-zinc-600 dark:text-zinc-400 mt-1.5 flex items-center gap-2 flex-wrap">
            <span>{room.property_type}</span>
            <span>•</span>
            <span>{room.max_guest} hóspedes</span>
            <span>•</span>
            <span>
              {room.rooms} quartos ({room.rooms} suítes)
            </span>
            <span>•</span>
            <span>{room.beds} camas</span>
            <span>•</span>
            <span>{room.bathrooms} banheiros</span>
          </p>
        </div>

        <div className="2xl:hidden w-full mb-8 sm:mb-10 p-5 sm:p-6 lg:p-7 rounded-3xl bg-white dark:bg-[#161616] border border-zinc-200 dark:border-zinc-800 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-stretch">
            <div className="md:col-span-4 flex flex-col justify-between gap-4 md:border-r md:border-zinc-200 dark:md:border-zinc-800 md:pr-6">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 dark:text-zinc-500">
                  Comparação em outros provedores:
                </span>
                <div className="flex items-center justify-between text-xs">
                  <Link
                    href={airbnbUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Ver acomodação no Airbnb"
                    className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:scale-105 transition-all cursor-pointer group/src"
                  >
                    <Image
                      src="/utils/icons/sources/airbnb.svg"
                      alt="Airbnb"
                      width={48}
                      height={14}
                      className="h-3 w-auto object-contain opacity-90 group-hover/src:opacity-100"
                    />
                    <span className="font-semibold">R$ {airbnbPriceNum}</span>
                  </Link>
                  <Link
                    href={bookingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Ver acomodação no Booking.com"
                    className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:scale-105 transition-all cursor-pointer group/src"
                  >
                    <Image
                      src="/utils/icons/sources/booking.svg"
                      alt="Booking.com"
                      width={52}
                      height={12}
                      className="h-2.5 w-auto object-contain opacity-90 group-hover/src:opacity-100"
                    />
                    <span className="font-semibold">R$ {bookingPriceNum}</span>
                  </Link>
                  <Link
                    href={trivagoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Ver acomodação no Trivago"
                    className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:scale-105 transition-all cursor-pointer group/src"
                  >
                    <Image
                      src="/utils/icons/sources/trivago.svg"
                      alt="Trivago"
                      width={52}
                      height={14}
                      className="h-3 w-auto object-contain opacity-90 group-hover/src:opacity-100"
                    />
                    <span className="font-semibold">R$ {trivagoPriceNum}</span>
                  </Link>
                </div>
              </div>

              <div className="flex items-baseline justify-between">
                <div>
                  <div className="text-[10px] uppercase font-bold text-[#FF6847] tracking-wider mb-0.5">
                    Preço Exclusivo ClubKey
                  </div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl sm:text-3xl font-black text-[#FF6847]">
                      R$ {discountPriceNum}
                    </span>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                      / noite
                    </span>
                  </div>
                </div>

                <div className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 text-xs font-bold">
                  {discountPercent}% OFF
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-blue-50/80 dark:bg-blue-950/35 border border-blue-200/80 dark:border-blue-800/60 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCompetitorIndex}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.22 }}
                    className="flex flex-col gap-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <Link
                        href={currentCompetitor.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        title={`Ver acomodação no ${currentCompetitor.name}`}
                        className="hover:scale-105 transition-all cursor-pointer flex items-center"
                      >
                        <Image
                          src={currentCompetitor.logo}
                          alt={currentCompetitor.name}
                          width={85}
                          height={22}
                          className={cn(
                            "object-contain dark:brightness-110",
                            currentCompetitor.logoClass
                          )}
                        />
                      </Link>
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-zinc-900 dark:text-white">
                        <BadgePercent className="w-3.5 h-3.5 text-zinc-900 dark:text-white" />
                        <span>Menor preço garantido</span>
                      </span>
                    </div>

                    <p className="text-xs text-zinc-800 dark:text-zinc-200 leading-snug">
                      Você economiza{" "}
                      <strong className="text-xs sm:text-sm font-black text-zinc-900 dark:text-white">
                        R$ {competitorSavings}
                      </strong>{" "}
                      nesta reserva em comparação ao {currentCompetitor.name}!
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="md:col-span-4 flex flex-col justify-center gap-3 md:border-r md:border-zinc-200 dark:md:border-zinc-800 md:pr-6">
              <div className="flex flex-col border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden divide-y divide-zinc-200 dark:divide-zinc-800">
                <div className="grid grid-cols-2 p-3 bg-zinc-50/50 dark:bg-zinc-900/50">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-bold text-zinc-400">
                      Check-in
                    </span>
                    <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 mt-0.5">
                      Hoje
                    </span>
                  </div>
                  <div className="flex flex-col border-l border-zinc-200 dark:border-zinc-800 pl-3">
                    <span className="text-[10px] uppercase font-bold text-zinc-400">
                      Check-out ({nights} noites)
                    </span>
                    <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 mt-0.5">
                      Em {nights} dias
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-white dark:bg-zinc-900">
                  <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                    Número de diárias:
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      disabled={nights <= 1}
                      onClick={() => setNights((prev) => Math.max(1, prev - 1))}
                      className="w-7 h-7 rounded-full border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-30 cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-bold w-4 text-center">
                      {nights}
                    </span>
                    <button
                      type="button"
                      onClick={() => setNights((prev) => prev + 1)}
                      className="w-7 h-7 rounded-full border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-white dark:bg-zinc-900">
                  <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                    Hóspedes:
                  </span>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      disabled={guests <= 1}
                      onClick={() => setGuests((prev) => Math.max(1, prev - 1))}
                      className="w-7 h-7 rounded-full border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-30 cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-bold w-4 text-center">
                      {guests}
                    </span>
                    <button
                      type="button"
                      disabled={guests >= room.max_guest}
                      onClick={() =>
                        setGuests((prev) => Math.min(room.max_guest, prev + 1))
                      }
                      className="w-7 h-7 rounded-full border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-30 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="md:col-span-4 flex flex-col justify-between gap-3.5">
              <div className="flex flex-col gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                <div className="flex items-center justify-between">
                  <span>
                    R$ {discountPriceNum} x {nights} noites
                  </span>
                  <span className="font-semibold text-zinc-900 dark:text-white">
                    R$ {subtotal}
                  </span>
                </div>
                <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400">
                  <span>Desconto Exclusivo ClubKey</span>
                  <span className="font-bold">
                    -R$ {savingsPerNight * nights}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Taxa de limpeza & proc.</span>
                  <span className="font-semibold text-zinc-900 dark:text-white">
                    R$ {cleaningFee + 5}
                  </span>
                </div>

                <div className="pt-2.5 border-t border-zinc-200 dark:border-zinc-800 flex items-baseline justify-between text-sm font-bold text-zinc-900 dark:text-white">
                  <span>Total</span>
                  <span className="text-xl font-black text-[#FF6847]">
                    R$ {total}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() =>
                    alert(`Reserva simulada com sucesso para ${room.title}!`)
                  }
                  className="group relative w-full py-3.5 px-6 overflow-hidden rounded-sm bg-[#FF6847] text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md cursor-pointer transition-all duration-300 flex items-center justify-center"
                >
                  <span className="absolute inset-0 w-full h-full bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
                  <span className="relative z-10 inline-flex items-center justify-center gap-2 text-white group-hover:text-zinc-950 transition-colors duration-300">
                    <span>Reservar com ClubKey</span>
                    <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                  </span>
                </button>

                <div className="flex items-center justify-center gap-1 text-[11px] text-zinc-500 dark:text-zinc-400 text-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Garantia do menor preço ClubKey</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 2xl:grid-cols-12 gap-8 2xl:gap-12 items-start">
          <div className="2xl:col-span-8 flex flex-col gap-10">
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-md bg-zinc-200 dark:bg-zinc-800">
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 h-[300px] sm:h-[380px] md:h-[440px] lg:h-[480px]">
                <div
                  onClick={() => openLightbox(0)}
                  className="relative sm:col-span-3 h-full cursor-pointer group overflow-hidden"
                >
                  <Image
                    src={allPhotos[0] || room.main_img.url}
                    alt={`${room.title} - Foto principal`}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover group-hover:scale-102 transition-transform duration-500 ease-out"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                </div>

                <div className="hidden sm:grid sm:col-span-2 grid-rows-2 gap-2 h-full">
                  <div
                    onClick={() => openLightbox(1)}
                    className="relative h-full cursor-pointer group overflow-hidden"
                  >
                    <Image
                      src={allPhotos[1] || allPhotos[0]}
                      alt={`${room.title} - Foto 2`}
                      fill
                      sizes="25vw"
                      className="object-cover group-hover:scale-102 transition-transform duration-500 ease-out"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                  </div>

                  <div
                    onClick={() => openLightbox(2)}
                    className="relative h-full cursor-pointer group overflow-hidden"
                  >
                    <Image
                      src={allPhotos[2] || allPhotos[0]}
                      alt={`${room.title} - Foto 3`}
                      fill
                      sizes="25vw"
                      className="object-cover group-hover:scale-102 transition-transform duration-500 ease-out"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => openLightbox(0)}
                className="absolute bottom-4 right-4 z-20 px-3.5 py-2 rounded-xl bg-white/95 dark:bg-zinc-900/95 hover:bg-white dark:hover:bg-zinc-900 text-zinc-900 dark:text-white text-xs sm:text-sm font-bold shadow-lg flex items-center gap-2 border border-zinc-200/80 dark:border-zinc-700 backdrop-blur-xs transition-all hover:scale-103 cursor-pointer"
              >
                <Grid className="w-4 h-4" />
                <span>Ver todas as fotos ({allPhotos.length})</span>
              </button>
            </div>

            <div className="flex flex-col">
              <section className="pb-8 border-b border-zinc-200 dark:border-zinc-800 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-zinc-900 dark:text-white font-heading">
                Sobre a acomodação
              </h2>
              <div className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed space-y-4">
                {room.property_meta?._msdesc?.pt_BR ? (
                  room.property_meta._msdesc.pt_BR
                    .split("\n\n")
                    .map((paragraph, idx) => (
                      <p key={idx} className="leading-relaxed">
                        {paragraph}
                      </p>
                    ))
                ) : (
                  <p>
                    Acomodação premium selecionada com exclusividade pela
                    ClubKey.
                  </p>
                )}
              </div>
            </section>

            <section className="py-8 border-b border-zinc-200 dark:border-zinc-800 space-y-5">
              <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-zinc-900 dark:text-white font-heading">
                Comodidades
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8">
                {room.amenitiesList?.map((amenity) => {
                  const IconComp = iconMap[amenity.icon] || CheckCircle2
                  return (
                    <div key={amenity.id} className="flex items-center gap-3">
                      <IconComp className="w-4 h-4 text-zinc-700 dark:text-zinc-300 shrink-0" />
                      <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                        {amenity.name}
                      </span>
                    </div>
                  )
                })}
              </div>
            </section>

            <section className="py-8 border-b border-zinc-200 dark:border-zinc-800 space-y-5">
              <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-zinc-900 dark:text-white font-heading">
                O que você deve saber
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center gap-2 text-zinc-900 dark:text-white font-normal text-sm mb-2">
                    <Clock className="w-4 h-4 text-[#FF6847]" />
                    <span>Check-in e Check-out</span>
                  </div>
                  <ul className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 space-y-1.5">
                    <li>• Check-in: a partir das 16:00 (até 22:00)</li>
                    <li>• Check-out: até às 10:00</li>
                    <li>• Acesso simplificado e suporte ágil</li>
                  </ul>
                </div>

                <div>
                  <div className="flex items-center gap-2 text-zinc-900 dark:text-white font-normal text-sm mb-2">
                    <ShieldAlert className="w-4 h-4 text-[#FF6847]" />
                    <span>Regras da casa</span>
                  </div>
                  <ul className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 space-y-1.5">
                    <li>• Horário de silêncio: 22h às 9h</li>
                    <li>• Não é permitido fumar em áreas internas</li>
                    <li>• Festas e eventos não são permitidos</li>
                  </ul>
                </div>
              </div>
            </section>

            <section className="py-8 border-b border-zinc-200 dark:border-zinc-800 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-zinc-900 dark:text-white font-heading">
                    Onde você estará
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                    {room.property_meta?.address?.street
                      ? `${room.property_meta.address.street}, `
                      : ""}
                    {room.property_meta?.address?.region || room.city.name},{" "}
                    {room.city.name} - {room.city.keys_coverage_states.name}
                  </p>
                </div>

                <div
                  ref={directionsRef}
                  className="relative shrink-0 self-start sm:self-auto"
                >
                  <button
                    type="button"
                    onClick={() => setDirectionsOpen((prev) => !prev)}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-xs font-bold text-zinc-900 dark:text-white shadow-sm border border-zinc-200 dark:border-zinc-700 transition-all hover:scale-103 cursor-pointer"
                  >
                    <Navigation className="w-3.5 h-3.5 text-zinc-900 dark:text-white fill-none stroke-[2.2]" />
                    <span>Como chegar</span>
                  </button>

                  <AnimatePresence>
                    {directionsOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.96 }}
                        transition={{ duration: 0.18 }}
                        className="absolute top-full right-0 mt-2 w-44 rounded-2xl bg-white dark:bg-zinc-900 shadow-2xl border border-zinc-200 dark:border-zinc-800 p-1.5 flex flex-col gap-0.5 overflow-hidden z-30"
                      >
                        <Link
                          href={`https://www.google.com/maps/dir/?api=1&destination=${room.latitude},${room.longitude}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setDirectionsOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
                        >
                          <span>Google Maps</span>
                        </Link>
                        <Link
                          href={`https://waze.com/ul?ll=${room.latitude},${room.longitude}&navigate=yes`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setDirectionsOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
                        >
                          <span>Waze</span>
                        </Link>
                        <Link
                          href={`https://maps.apple.com/?daddr=${room.latitude},${room.longitude}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setDirectionsOpen(false)}
                          className="flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
                        >
                          <span>Apple Maps</span>
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="relative aspect-[16/9] w-full rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-xs">
                <iframe
                  title="Localização da acomodação no Google Maps"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src={`https://maps.google.com/maps?q=${room.latitude},${room.longitude}&hl=pt-BR&z=15&output=embed`}
                />
              </div>

              {room.property_meta?._msneighborhood_overview?.pt_BR && (
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mt-2">
                  {room.property_meta._msneighborhood_overview.pt_BR}
                </p>
              )}
            </section>

            <section className="py-8 border-b border-zinc-200 dark:border-zinc-800 space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-zinc-900 dark:text-white font-heading">
                Regras da acomodação
              </h2>
              <div className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed whitespace-pre-line">
                {room.property_meta?._mshouserules?.pt_BR ||
                  "Horário de silêncio respeitado pelo condomínio. Proibido fumar. Proibido animais sem aviso prévio."}
              </div>
            </section>
          </div>
        </div>

        <div className="hidden 2xl:block 2xl:col-span-4 2xl:sticky 2xl:top-6 self-start">
          <div className="p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#161616] border border-zinc-200 dark:border-zinc-800 shadow-xl flex flex-col gap-6">
            <div className="flex flex-col gap-2.5 pb-5 border-b border-zinc-100 dark:border-zinc-800">
              <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 dark:text-zinc-500">
                Comparação em outros provedores:
              </span>
              <div className="flex items-center justify-between text-xs">
                <Link
                  href={airbnbUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Ver acomodação no Airbnb"
                  className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:scale-105 transition-all cursor-pointer group/src"
                >
                  <Image
                    src="/utils/icons/sources/airbnb.svg"
                    alt="Airbnb"
                    width={48}
                    height={14}
                    className="h-3 w-auto object-contain opacity-90 group-hover/src:opacity-100"
                  />
                  <span className="font-semibold">R$ {airbnbPriceNum}</span>
                </Link>
                <Link
                  href={bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Ver acomodação no Booking.com"
                  className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:scale-105 transition-all cursor-pointer group/src"
                >
                  <Image
                    src="/utils/icons/sources/booking.svg"
                    alt="Booking.com"
                    width={52}
                    height={12}
                    className="h-2.5 w-auto object-contain opacity-90 group-hover/src:opacity-100"
                  />
                  <span className="font-semibold">R$ {bookingPriceNum}</span>
                </Link>
                <Link
                  href={trivagoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Ver acomodação no Trivago"
                  className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:scale-105 transition-all cursor-pointer group/src"
                >
                  <Image
                    src="/utils/icons/sources/trivago.svg"
                    alt="Trivago"
                    width={52}
                    height={14}
                    className="h-3 w-auto object-contain opacity-90 group-hover/src:opacity-100"
                  />
                  <span className="font-semibold">R$ {trivagoPriceNum}</span>
                </Link>
              </div>
            </div>

            <div className="flex items-baseline justify-between">
              <div>
                <div className="text-[10px] uppercase font-bold text-[#FF6847] tracking-wider mb-0.5">
                  Preço Exclusivo ClubKey
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl sm:text-3xl font-black text-[#FF6847]">
                    R$ {discountPriceNum}
                  </span>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                    / noite
                  </span>
                </div>
              </div>

              <div className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 text-xs font-bold">
                {discountPercent}% OFF
              </div>
            </div>

            <div className="flex flex-col border border-zinc-200 dark:border-zinc-800 rounded-2xl overflow-hidden divide-y divide-zinc-200 dark:divide-zinc-800">
              <div className="grid grid-cols-2 p-3 bg-zinc-50/50 dark:bg-zinc-900/50">
                <div className="flex flex-col">
                  <span className="text-[10px] uppercase font-bold text-zinc-400">
                    Check-in
                  </span>
                  <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 mt-0.5">
                    Hoje
                  </span>
                </div>
                <div className="flex flex-col border-l border-zinc-200 dark:border-zinc-800 pl-3">
                  <span className="text-[10px] uppercase font-bold text-zinc-400">
                    Check-out ({nights} noites)
                  </span>
                  <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 mt-0.5">
                    Em {nights} dias
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-white dark:bg-zinc-900">
                <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                  Número de diárias:
                </span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    disabled={nights <= 1}
                    onClick={() => setNights((prev) => Math.max(1, prev - 1))}
                    className="w-7 h-7 rounded-full border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-30 cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-bold w-4 text-center">
                    {nights}
                  </span>
                  <button
                    type="button"
                    onClick={() => setNights((prev) => prev + 1)}
                    className="w-7 h-7 rounded-full border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-white dark:bg-zinc-900">
                <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                  Hóspedes:
                </span>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    disabled={guests <= 1}
                    onClick={() => setGuests((prev) => Math.max(1, prev - 1))}
                    className="w-7 h-7 rounded-full border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-30 cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-bold w-4 text-center">
                    {guests}
                  </span>
                  <button
                    type="button"
                    disabled={guests >= room.max_guest}
                    onClick={() =>
                      setGuests((prev) => Math.min(room.max_guest, prev + 1))
                    }
                    className="w-7 h-7 rounded-full border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-30 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2.5 text-xs text-zinc-600 dark:text-zinc-400">
              <div className="flex items-center justify-between">
                <span>
                  R$ {discountPriceNum} x {nights} noites
                </span>
                <span className="font-semibold text-zinc-900 dark:text-white">
                  R$ {subtotal}
                </span>
              </div>
              <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400">
                <span>Desconto Exclusivo ClubKey</span>
                <span className="font-bold">
                  -R$ {savingsPerNight * nights}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Taxa de limpeza</span>
                <span className="font-semibold text-zinc-900 dark:text-white">
                  R$ {cleaningFee}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>Custo de Processamento</span>
                <span className="font-semibold text-zinc-900 dark:text-white">
                  R$ 5,00
                </span>
              </div>

              <div className="pt-3 border-t border-zinc-200 dark:border-zinc-800 flex items-baseline justify-between text-sm sm:text-base font-bold text-zinc-900 dark:text-white">
                <span>Total</span>
                <span className="text-xl font-black text-[#FF6847]">
                  R$ {total}
                </span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50/80 dark:bg-blue-950/35 border border-blue-200/80 dark:border-blue-800/60 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCompetitorIndex}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.22 }}
                  className="flex flex-col gap-2"
                >
                  <div className="flex items-center justify-between">
                    <Link
                      href={currentCompetitor.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`Ver acomodação no ${currentCompetitor.name}`}
                      className="hover:scale-105 transition-all cursor-pointer flex items-center"
                    >
                      <Image
                        src={currentCompetitor.logo}
                        alt={currentCompetitor.name}
                        width={90}
                        height={24}
                        className={cn(
                          "object-contain dark:brightness-110",
                          currentCompetitor.logoClass
                        )}
                      />
                    </Link>
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-zinc-900 dark:text-white">
                      <BadgePercent className="w-3.5 h-3.5 text-zinc-900 dark:text-white" />
                      <span>Menor preço garantido</span>
                    </span>
                  </div>

                  <p className="text-xs text-zinc-800 dark:text-zinc-200 leading-snug">
                    Você economiza{" "}
                    <strong className="text-sm font-black text-zinc-900 dark:text-white">
                      R$ {competitorSavings}
                    </strong>{" "}
                    nesta reserva em comparação ao {currentCompetitor.name}!
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              type="button"
              onClick={() =>
                alert(`Reserva simulada com sucesso para ${room.title}!`)
              }
              className="group relative w-full py-4 px-6 overflow-hidden rounded-sm bg-[#FF6847] text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-md cursor-pointer transition-all duration-300 flex items-center justify-center"
            >
              <span className="absolute inset-0 w-full h-full bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
              <span className="relative z-10 inline-flex items-center justify-center gap-2 text-white group-hover:text-zinc-950 transition-colors duration-300">
                <span>Reservar com ClubKey</span>
                <ChevronRight className="w-4 h-4 stroke-[2.5]" />
              </span>
            </button>

            <div className="flex flex-col items-center gap-2 text-center text-[11px] text-zinc-400">
              <span className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Garantia do menor preço ClubKey
              </span>
            </div>
          </div>
        </div>
      </div>
      </Container>

      <AnimatePresence>
        {lightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex flex-col justify-between p-4 sm:p-6 backdrop-blur-md select-none"
          >
            <div className="flex items-center justify-between text-white w-full max-w-6xl mx-auto pb-4">
              <span className="text-xs sm:text-sm font-semibold tracking-wide text-zinc-300">
                Foto {activePhotoIndex + 1} de {allPhotos.length}
              </span>
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Fechar galeria"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative flex-1 w-full max-w-5xl mx-auto flex items-center justify-center my-2">
              <button
                type="button"
                onClick={() =>
                  setActivePhotoIndex((prev) =>
                    prev === 0 ? allPhotos.length - 1 : prev - 1
                  )
                }
                className="absolute left-2 sm:left-4 z-20 w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center backdrop-blur-sm transition-all hover:scale-105 cursor-pointer"
                aria-label="Foto anterior"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <div className="relative w-full h-[65vh] sm:h-[75vh]">
                <Image
                  src={allPhotos[activePhotoIndex]}
                  alt={`${room.title} - Foto ${activePhotoIndex + 1}`}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  unoptimized
                />
              </div>

              <button
                type="button"
                onClick={() =>
                  setActivePhotoIndex((prev) =>
                    prev === allPhotos.length - 1 ? 0 : prev + 1
                  )
                }
                className="absolute right-2 sm:right-4 z-20 w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 text-white flex items-center justify-center backdrop-blur-sm transition-all hover:scale-105 cursor-pointer"
                aria-label="Próxima foto"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            <div className="w-full max-w-4xl mx-auto overflow-x-auto no-scrollbar pt-2 flex items-center justify-center gap-2">
              {allPhotos.map((photo, pIdx) => (
                <button
                  key={photo + pIdx}
                  type="button"
                  onClick={() => setActivePhotoIndex(pIdx)}
                  className={cn(
                    "relative w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-lg overflow-hidden border-2 transition-all cursor-pointer",
                    pIdx === activePhotoIndex
                      ? "border-[#FF6847] scale-105 shadow-md opacity-100"
                      : "border-transparent opacity-50 hover:opacity-80"
                  )}
                >
                  <Image
                    src={photo}
                    alt={`Miniatura ${pIdx + 1}`}
                    fill
                    sizes="64px"
                    className="object-cover"
                    unoptimized
                  />
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
      <FloatingCta />
      <Toast position="bottom-right" />
    </main>
  )
}
