"use client"

import * as React from "react"
import Link from "next/link"
import { AnimatePresence, motion } from "framer-motion"
import { ArrowSquareOut, NavigationArrow } from "@phosphor-icons/react"
import { CtaButton } from "@/src/components/common/ctaButton"

export interface RoomLocationCardProps {
  street?: string
  region?: string
  cityName: string
  stateName: string
  latitude: number
  longitude: number
  neighborhoodOverview?: string
}

export function RoomLocationCard({
  street,
  region,
  cityName,
  stateName,
  latitude,
  longitude,
  neighborhoodOverview,
}: RoomLocationCardProps): React.JSX.Element {
  const [directionsOpen, setDirectionsOpen] = React.useState(false)
  const directionsRef = React.useRef<HTMLDivElement>(null)

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
    <section className="py-8 border-b border-zinc-200 dark:border-zinc-800 space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-zinc-900 dark:text-white font-heading">
            Onde você estará
          </h2>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 mt-1">
            {street ? `${street}, ` : ""}
            {region || cityName}, {cityName} - {stateName}
          </p>
        </div>

        <div
          ref={directionsRef}
          className="relative shrink-0 self-start sm:self-auto"
        >
          <CtaButton
            variant="secondary"
            size="sm"
            onClick={() => setDirectionsOpen((prev) => !prev)}
            textClassName="gap-2"
          >
            <NavigationArrow className="w-3.5 h-3.5 shrink-0" weight="bold" />
            <span>Como chegar</span>
          </CtaButton>

          <AnimatePresence>
            {directionsOpen && (
              <motion.div
                initial={{ opacity: 0, y: -6, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.96 }}
                transition={{ duration: 0.18 }}
                className="absolute top-full right-0 mt-2 w-44 rounded-sm bg-white dark:bg-zinc-900 shadow-2xl border border-zinc-200 dark:border-zinc-800 p-1.5 flex flex-col gap-0.5 overflow-hidden z-30"
              >
                <Link
                  href={`https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setDirectionsOpen(false)}
                  className="flex items-center justify-between gap-2.5 px-3 py-2 rounded-sm text-xs font-semibold text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  <span>Google Maps</span>
                  <ArrowSquareOut className="w-3.5 h-3.5 text-zinc-400" />
                </Link>
                <Link
                  href={`https://waze.com/ul?ll=${latitude},${longitude}&navigate=yes`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setDirectionsOpen(false)}
                  className="flex items-center justify-between gap-2.5 px-3 py-2 rounded-sm text-xs font-semibold text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  <span>Waze</span>
                  <ArrowSquareOut className="w-3.5 h-3.5 text-zinc-400" />
                </Link>
                <Link
                  href={`https://maps.apple.com/?daddr=${latitude},${longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setDirectionsOpen(false)}
                  className="flex items-center justify-between gap-2.5 px-3 py-2 rounded-sm text-xs font-semibold text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
                >
                  <span>Apple Maps</span>
                  <ArrowSquareOut className="w-3.5 h-3.5 text-zinc-400" />
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="relative aspect-[16/9] w-full rounded-sm overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-xs">
        <iframe
          title="Localização da acomodação no Google Maps"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://maps.google.com/maps?q=${latitude},${longitude}&hl=pt-BR&z=15&output=embed`}
        />
      </div>

      {neighborhoodOverview && (
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed mt-2">
          {neighborhoodOverview}
        </p>
      )}
    </section>
  )
}
