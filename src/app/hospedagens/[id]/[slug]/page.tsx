"use client"

import * as React from "react"

import Link from "next/link"
import { useParams } from "next/navigation"

import { getRoomDetail } from "@/src/data/mockRoomDetails"
import {
  Bookmark,
  CaretLeft,
  Clock,
  MapPin,
  ShieldWarning,
} from "@phosphor-icons/react"
import { AnimatePresence, motion } from "framer-motion"

import { toast } from "@/src/components/ui/toast/toast"

import { Container } from "@/src/components/common/container"
import { FloatingCta } from "@/src/components/landing/FloatingCta"
import { Navbar } from "@/src/components/landing/Navbar"
import { TopBanner } from "@/src/components/landing/TopBanner"
import { ShareButton } from "@/src/components/portal/ShareButton"
import { RoomAmenities } from "@/src/components/rooms/roomAmenities"
import { RoomBookingCard } from "@/src/components/rooms/roomBookingCard"
import { RoomGallery } from "@/src/components/rooms/roomGallery"
import { RoomLocationCard } from "@/src/components/rooms/roomLocationCard"

import { cn } from "@/src/lib/utils"

export default function HospedagemDetailPage(): React.JSX.Element {
  const params = useParams()
  const id = (Array.isArray(params?.id) ? params.id[0] : params?.id) as string
  const slug = (
    Array.isArray(params?.slug) ? params.slug[0] : params?.slug
  ) as string

  const room = React.useMemo(() => getRoomDetail(id, slug), [id, slug])

  const [isFav, setIsFav] = React.useState(false)
  const [bookmarkPop, setBookmarkPop] = React.useState(false)

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

  const airbnbUrl = `https://www.airbnb.com.br/s/${encodeURIComponent(`${room.title} ${room.city.name}`)}/homes`
  const bookingUrl = `https://www.booking.com/searchresults.pt-br.html?ss=${encodeURIComponent(`${room.title} ${room.city.name}`)}`
  const trivagoUrl = `https://www.trivago.com.br/pt-BR/srl?search=${encodeURIComponent(`${room.title} ${room.city.name}`)}`

  const handleToggleFav = () => {
    const nextFav = !isFav
    setIsFav(nextFav)
    setBookmarkPop(true)
    setTimeout(() => setBookmarkPop(false), 600)

    if (nextFav) {
      toast.success("Acomodação salva!", {
        description: `${room.title} foi adicionada à sua lista de salvos.`,
      })
    } else {
      toast.info("Removido dos salvos", {
        description: "Acomodação removida da sua lista.",
      })
    }
  }

  const handleBook = () => {
    toast.success("Reserva simulada com sucesso!", {
      description: `Sua solicitação de reserva para ${room.title} foi enviada para processamento.`,
    })
  }

  return (
    <main className="flex-1 w-full bg-[#F1F1F1] dark:bg-[#161616] text-[#111111] dark:text-white flex flex-col font-sans selection:bg-brand-primary/20 selection:text-brand-primary">
      <TopBanner />
      <Navbar isTransparent={false} />

      <Container className="pt-6 pb-24">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4">
          <Link
            href="/hospedagens"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
          >
            <CaretLeft className="w-4 h-4" />
            <span>Voltar para acomodações</span>
          </Link>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <ShareButton className="flex-1 sm:flex-initial" />
            <button
              type="button"
              onClick={handleToggleFav}
              className="relative inline-flex flex-1 sm:flex-initial items-center justify-center gap-1.5 h-9 px-3.5 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] hover:border-zinc-300 dark:hover:border-zinc-700 text-xs font-semibold text-zinc-800 dark:text-zinc-200 transition-all cursor-pointer shadow-2xs hover:shadow-xs active:scale-95 group overflow-hidden"
            >
              <div className="relative flex items-center justify-center">
                <motion.div
                  animate={
                    bookmarkPop
                      ? { scale: [1, 1.45, 0.85, 1.15, 1] }
                      : { scale: 1 }
                  }
                  transition={{ duration: 0.45 }}
                >
                  <Bookmark
                    className={cn(
                      "w-3.5 h-3.5 transition-all duration-300 stroke-[2.2]",
                      isFav
                        ? "fill-brand-primary text-brand-primary drop-shadow-[0_0_6px_var(--brand-primary-glow)]"
                        : "text-zinc-600 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white"
                    )}
                  />
                </motion.div>
                <AnimatePresence>
                  {bookmarkPop && isFav && (
                    <motion.span
                      initial={{ scale: 0, opacity: 1 }}
                      animate={{ scale: 2.2, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="absolute inset-0 rounded-full bg-brand-primary/40 pointer-events-none"
                    />
                  )}
                </AnimatePresence>
              </div>
              <span>{isFav ? "Salvo" : "Salvar"}</span>
            </button>
          </div>
        </div>

        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-bold text-brand-primary tracking-wider uppercase mb-1">
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

        <div className="2xl:hidden mb-8 sm:mb-10">
          <RoomBookingCard
            variant="horizontal"
            roomTitle={room.title}
            maxGuests={room.max_guest}
            basePrice={basePriceNum}
            discountPrice={discountPriceNum}
            discountPercent={discountPercent}
            airbnbPrice={airbnbPriceNum}
            bookingPrice={bookingPriceNum}
            trivagoPrice={trivagoPriceNum}
            airbnbUrl={airbnbUrl}
            bookingUrl={bookingUrl}
            trivagoUrl={trivagoUrl}
            nights={nights}
            onNightsChange={setNights}
            guests={guests}
            onGuestsChange={setGuests}
            onBook={handleBook}
          />
        </div>

        <div className="grid grid-cols-1 2xl:grid-cols-12 gap-8 2xl:gap-12 items-start">
          <div className="2xl:col-span-8 flex flex-col gap-10">
            <RoomGallery title={room.title} photos={allPhotos} />

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

              <RoomAmenities amenities={room.amenitiesList} />

              <section className="py-8 border-b border-zinc-200 dark:border-zinc-800 space-y-5">
                <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-zinc-900 dark:text-white font-heading">
                  O que você deve saber
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div>
                    <div className="flex items-center gap-2 text-zinc-900 dark:text-white font-normal text-sm mb-2">
                      <Clock className="w-4 h-4 text-brand-primary" />
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
                      <ShieldWarning className="w-4 h-4 text-brand-primary" />
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

              <RoomLocationCard
                street={room.property_meta?.address?.street}
                region={room.property_meta?.address?.region}
                cityName={room.city.name}
                stateName={room.city.keys_coverage_states.name}
                latitude={Number(room.latitude) || 0}
                longitude={Number(room.longitude) || 0}
                neighborhoodOverview={
                  room.property_meta?._msneighborhood_overview?.pt_BR
                }
              />

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
            <RoomBookingCard
              roomTitle={room.title}
              maxGuests={room.max_guest}
              basePrice={basePriceNum}
              discountPrice={discountPriceNum}
              discountPercent={discountPercent}
              airbnbPrice={airbnbPriceNum}
              bookingPrice={bookingPriceNum}
              trivagoPrice={trivagoPriceNum}
              airbnbUrl={airbnbUrl}
              bookingUrl={bookingUrl}
              trivagoUrl={trivagoUrl}
              nights={nights}
              onNightsChange={setNights}
              guests={guests}
              onGuestsChange={setGuests}
              onBook={handleBook}
            />
          </div>
        </div>
      </Container>

      <FloatingCta />
    </main>
  )
}
