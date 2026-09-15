"use client"

import * as React from "react"

import Image from "next/image"
import Link from "next/link"

import {
  CaretRight,
  Minus,
  Percent,
  Plus,
  ShieldCheck,
} from "@phosphor-icons/react"
import { AnimatePresence, motion } from "framer-motion"

import { CtaButton } from "@/src/components/common/ctaButton"

import { cn } from "@/src/lib/utils"

export interface RoomBookingCardProps {
  roomTitle: string
  maxGuests: number
  basePrice: number
  discountPrice: number
  discountPercent: number
  airbnbPrice: number
  bookingPrice: number
  trivagoPrice: number
  airbnbUrl: string
  bookingUrl: string
  trivagoUrl: string
  nights: number
  onNightsChange: (val: number | ((prev: number) => number)) => void
  guests: number
  onGuestsChange: (val: number | ((prev: number) => number)) => void
  onBook: () => void
  variant?: "card" | "horizontal"
  className?: string
}

export function RoomBookingCard({
  roomTitle,
  maxGuests,
  discountPrice,
  discountPercent,
  airbnbPrice,
  bookingPrice,
  trivagoPrice,
  airbnbUrl,
  bookingUrl,
  trivagoUrl,
  nights,
  onNightsChange,
  guests,
  onGuestsChange,
  onBook,
  variant = "card",
  className,
}: RoomBookingCardProps): React.JSX.Element {
  const [activeCompetitorIndex, setActiveCompetitorIndex] = React.useState(0)

  const competitors = React.useMemo(
    () => [
      {
        name: "Airbnb",
        logo: "/utils/icons/sources/airbnb.svg",
        pricePerNight: airbnbPrice,
        total: airbnbPrice * nights + 220,
        logoClass: "h-3 w-auto",
        width: 48,
        height: 14,
        url: airbnbUrl,
      },
      {
        name: "Booking.com",
        logo: "/utils/icons/sources/booking.svg",
        pricePerNight: bookingPrice,
        total: bookingPrice * nights + 210,
        logoClass: "h-2.5 w-auto",
        width: 52,
        height: 12,
        url: bookingUrl,
      },
      {
        name: "Trivago",
        logo: "/utils/icons/sources/trivago.svg",
        pricePerNight: trivagoPrice,
        total: trivagoPrice * nights + 215,
        logoClass: "h-3 w-auto",
        width: 52,
        height: 14,
        url: trivagoUrl,
      },
    ],
    [
      airbnbPrice,
      bookingPrice,
      trivagoPrice,
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

  const subtotal = discountPrice * nights
  const cleaningFee = 180
  const processingFee = 5
  const total = subtotal + cleaningFee + processingFee
  const savingsPerNight = airbnbPrice - discountPrice

  const currentCompetitor = competitors[activeCompetitorIndex]
  const competitorSavings = Math.max(0, currentCompetitor.total - total)

  if (variant === "horizontal") {
    return (
      <div
        className={cn(
          "w-full p-5 sm:p-6 lg:p-7 rounded-sm bg-white dark:bg-[#161616] border border-zinc-200 dark:border-zinc-800 shadow-xl",
          className
        )}
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          <div className="md:col-span-4 flex flex-col justify-between gap-4 md:border-r md:border-zinc-200 dark:md:border-zinc-800 md:pr-6">
            <div className="flex flex-col gap-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 dark:text-zinc-500">
                Comparação em outros provedores:
              </span>
              <div className="flex items-center justify-between text-xs">
                {competitors.map((comp) => (
                  <Link
                    key={comp.name}
                    href={comp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`Ver acomodação no ${comp.name}`}
                    className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:scale-105 transition-all cursor-pointer group/src"
                  >
                    <Image
                      src={comp.logo}
                      alt={comp.name}
                      width={comp.width}
                      height={comp.height}
                      className={cn(
                        comp.logoClass,
                        "object-contain opacity-90 group-hover/src:opacity-100"
                      )}
                    />
                    <span className="font-semibold">
                      R$ {comp.pricePerNight}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex items-baseline justify-between">
              <div>
                <div className="text-[10px] uppercase font-bold text-brand-primary tracking-wider mb-0.5">
                  Preço Exclusivo ClubKey
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl sm:text-3xl font-black text-brand-primary">
                    R$ {discountPrice}
                  </span>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
                    / noite
                  </span>
                </div>
              </div>

              <div className="px-3 py-1 rounded-sm bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 text-xs font-bold">
                {discountPercent}% OFF
              </div>
            </div>

            <div className="p-3.5 rounded-sm bg-blue-50/80 dark:bg-blue-950/35 border border-blue-200/80 dark:border-blue-800/60 overflow-hidden">
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
                      <Percent className="w-3.5 h-3.5 text-zinc-900 dark:text-white" />
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
            <div className="flex flex-col border border-zinc-200 dark:border-zinc-800 rounded-sm overflow-hidden divide-y divide-zinc-200 dark:divide-zinc-800">
              <div className="grid grid-cols-2 p-3 bg-[#F1F1F1]/50 dark:bg-zinc-900/50">
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
                    onClick={() =>
                      onNightsChange((prev) => Math.max(1, prev - 1))
                    }
                    className="w-7 h-7 rounded-sm border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-30 cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-bold w-4 text-center">
                    {nights}
                  </span>
                  <button
                    type="button"
                    onClick={() => onNightsChange((prev) => prev + 1)}
                    className="w-7 h-7 rounded-sm border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
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
                    onClick={() =>
                      onGuestsChange((prev) => Math.max(1, prev - 1))
                    }
                    className="w-7 h-7 rounded-sm border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-30 cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-xs font-bold w-4 text-center">
                    {guests}
                  </span>
                  <button
                    type="button"
                    disabled={guests >= maxGuests}
                    onClick={() =>
                      onGuestsChange((prev) => Math.min(maxGuests, prev + 1))
                    }
                    className="w-7 h-7 rounded-sm border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-30 cursor-pointer"
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
                  R$ {discountPrice} x {nights} noites
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
                  R$ {cleaningFee + processingFee}
                </span>
              </div>

              <div className="pt-2.5 border-t border-zinc-200 dark:border-zinc-800 flex items-baseline justify-between text-sm font-bold text-zinc-900 dark:text-white">
                <span>Total</span>
                <span className="text-xl font-black text-brand-primary">
                  R$ {total}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <CtaButton
                isFullWidth
                size="md"
                onClick={onBook}
                textClassName="gap-2"
              >
                <span>Reservar com ClubKey</span>
                <CaretRight className="w-4 h-4 stroke-[2.5]" />
              </CtaButton>

              <div className="flex items-center justify-center gap-1 text-[11px] text-zinc-500 dark:text-zinc-400 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Garantia do menor preço ClubKey</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "p-6 sm:p-7 rounded-sm bg-white dark:bg-[#161616] border border-zinc-200 dark:border-zinc-800 shadow-xl flex flex-col gap-6",
        className
      )}
    >
      <div className="flex flex-col gap-2.5 pb-5 border-b border-zinc-100 dark:border-zinc-800">
        <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 dark:text-zinc-500">
          Comparação em outros provedores:
        </span>
        <div className="flex items-center justify-between text-xs">
          {competitors.map((comp) => (
            <Link
              key={comp.name}
              href={comp.url}
              target="_blank"
              rel="noopener noreferrer"
              title={`Ver acomodação no ${comp.name}`}
              className="flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:scale-105 transition-all cursor-pointer group/src"
            >
              <Image
                src={comp.logo}
                alt={comp.name}
                width={comp.width}
                height={comp.height}
                className={cn(
                  comp.logoClass,
                  "object-contain opacity-90 group-hover/src:opacity-100"
                )}
              />
              <span className="font-semibold">R$ {comp.pricePerNight}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-baseline justify-between">
        <div>
          <div className="text-[10px] uppercase font-bold text-brand-primary tracking-wider mb-0.5">
            Preço Exclusivo ClubKey
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-2xl sm:text-3xl font-black text-brand-primary">
              R$ {discountPrice}
            </span>
            <span className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
              / noite
            </span>
          </div>
        </div>

        <div className="px-3 py-1 rounded-sm bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 text-xs font-bold">
          {discountPercent}% OFF
        </div>
      </div>

      <div className="flex flex-col border border-zinc-200 dark:border-zinc-800 rounded-sm overflow-hidden divide-y divide-zinc-200 dark:divide-zinc-800">
        <div className="grid grid-cols-2 p-3 bg-[#F1F1F1]/50 dark:bg-zinc-900/50">
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
              onClick={() => onNightsChange((prev) => Math.max(1, prev - 1))}
              className="w-7 h-7 rounded-sm border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-30 cursor-pointer"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs font-bold w-4 text-center">{nights}</span>
            <button
              type="button"
              onClick={() => onNightsChange((prev) => prev + 1)}
              className="w-7 h-7 rounded-sm border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
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
              onClick={() => onGuestsChange((prev) => Math.max(1, prev - 1))}
              className="w-7 h-7 rounded-sm border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-30 cursor-pointer"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs font-bold w-4 text-center">{guests}</span>
            <button
              type="button"
              disabled={guests >= maxGuests}
              onClick={() =>
                onGuestsChange((prev) => Math.min(maxGuests, prev + 1))
              }
              className="w-7 h-7 rounded-sm border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 disabled:opacity-30 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2.5 text-xs text-zinc-600 dark:text-zinc-400">
        <div className="flex items-center justify-between">
          <span>
            R$ {discountPrice} x {nights} noites
          </span>
          <span className="font-semibold text-zinc-900 dark:text-white">
            R$ {subtotal}
          </span>
        </div>
        <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400">
          <span>Desconto Exclusivo ClubKey</span>
          <span className="font-bold">-R$ {savingsPerNight * nights}</span>
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
          <span className="text-xl font-black text-brand-primary">
            R$ {total}
          </span>
        </div>
      </div>

      <div className="p-4 rounded-sm bg-blue-50/80 dark:bg-blue-950/35 border border-blue-200/80 dark:border-blue-800/60 overflow-hidden">
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
                <Percent className="w-3.5 h-3.5 text-zinc-900 dark:text-white" />
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

      <CtaButton isFullWidth size="lg" onClick={onBook} textClassName="gap-2">
        <span>Reservar com ClubKey</span>
        <CaretRight className="w-4 h-4 stroke-[2.5]" />
      </CtaButton>

      <div className="flex flex-col items-center gap-2 text-center text-[11px] text-zinc-400">
        <span className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          Garantia do menor preço ClubKey
        </span>
      </div>
    </div>
  )
}
