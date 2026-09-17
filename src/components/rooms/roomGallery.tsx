"use client"

import * as React from "react"

import Image from "next/image"

import { CaretLeft, CaretRight, SquaresFour, X } from "@phosphor-icons/react"
import { AnimatePresence, motion } from "framer-motion"

import { CtaButton } from "@/src/components/common/ctaButton"

import { cn } from "@/src/lib/utils"

export interface RoomGalleryProps {
  title: string
  photos: string[]
}

export function RoomGallery({
  title,
  photos,
}: RoomGalleryProps): React.JSX.Element {
  const [lightboxOpen, setLightboxOpen] = React.useState(false)
  const [activePhotoIndex, setActivePhotoIndex] = React.useState(0)

  const openLightbox = (index: number) => {
    setActivePhotoIndex(index)
    setLightboxOpen(true)
  }

  React.useEffect(() => {
    if (!lightboxOpen) return
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightboxOpen(false)
      if (e.key === "ArrowLeft") {
        setActivePhotoIndex((prev) =>
          prev === 0 ? photos.length - 1 : prev - 1
        )
      }
      if (e.key === "ArrowRight") {
        setActivePhotoIndex((prev) =>
          prev === photos.length - 1 ? 0 : prev + 1
        )
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [lightboxOpen, photos.length])

  return (
    <>
      <div className="relative rounded-sm overflow-hidden shadow-md bg-zinc-200 dark:bg-zinc-800">
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 h-[300px] sm:h-[380px] md:h-[440px] lg:h-[480px]">
          <div
            onClick={() => openLightbox(0)}
            className="relative sm:col-span-3 h-full cursor-pointer group overflow-hidden"
          >
            <Image
              src={photos[0]}
              alt={`${title} - Foto principal`}
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
                src={photos[1] || photos[0]}
                alt={`${title} - Foto 2`}
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
                src={photos[2] || photos[0]}
                alt={`${title} - Foto 3`}
                fill
                sizes="25vw"
                className="object-cover group-hover:scale-102 transition-transform duration-500 ease-out"
                unoptimized
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
            </div>
          </div>
        </div>

        <CtaButton
          variant="secondary"
          size="sm"
          onClick={() => openLightbox(0)}
          className="absolute bottom-4 right-4 z-20 shadow-lg"
          textClassName="gap-2"
        >
          <SquaresFour className="w-4 h-4 shrink-0" weight="bold" />
          <span>Ver todas as fotos ({photos.length})</span>
        </CtaButton>
      </div>

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
                Foto {activePhotoIndex + 1} de {photos.length}
              </span>
              <button
                type="button"
                onClick={() => setLightboxOpen(false)}
                className="w-10 h-10 rounded-sm bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
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
                    prev === 0 ? photos.length - 1 : prev - 1
                  )
                }
                className="absolute left-2 sm:left-4 z-20 w-11 h-11 rounded-sm bg-white/15 hover:bg-white/30 text-white flex items-center justify-center backdrop-blur-sm transition-all hover:scale-105 cursor-pointer"
                aria-label="Foto anterior"
              >
                <CaretLeft className="w-6 h-6" />
              </button>

              <div className="relative w-full h-[65vh] sm:h-[75vh]">
                <Image
                  src={photos[activePhotoIndex]}
                  alt={`${title} - Foto ${activePhotoIndex + 1}`}
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
                    prev === photos.length - 1 ? 0 : prev + 1
                  )
                }
                className="absolute right-2 sm:right-4 z-20 w-11 h-11 rounded-sm bg-white/15 hover:bg-white/30 text-white flex items-center justify-center backdrop-blur-sm transition-all hover:scale-105 cursor-pointer"
                aria-label="Próxima foto"
              >
                <CaretRight className="w-6 h-6" />
              </button>
            </div>

            <div className="w-full max-w-4xl mx-auto overflow-x-auto no-scrollbar pt-2 flex items-center justify-center gap-2">
              {photos.map((photo, pIdx) => (
                <button
                  key={photo + pIdx}
                  type="button"
                  onClick={() => setActivePhotoIndex(pIdx)}
                  className={cn(
                    "relative w-14 h-14 sm:w-16 sm:h-16 shrink-0 rounded-sm overflow-hidden border-2 transition-all cursor-pointer",
                    pIdx === activePhotoIndex
                      ? "border-brand-primary scale-105 shadow-md opacity-100"
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
    </>
  )
}
