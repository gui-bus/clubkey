"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

import { EventBadgePopover } from "@/src/components/rooms/eventBadgePopover"
import { RoomCard } from "@/src/components/rooms/roomCard"
import { type RoomSection } from "@/src/data/mockRooms"
import { cn } from "@/src/lib/utils"

export interface SectionCarouselProps {
  section: RoomSection
  favorites: Record<string, boolean>
  onToggleFav: (id: string, e: React.MouseEvent) => void
}

export function SectionCarousel({
  section,
  favorites,
  onToggleFav,
}: SectionCarouselProps): React.JSX.Element {
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
            className="w-8 h-8 rounded-sm border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 disabled:opacity-25 disabled:cursor-not-allowed transition-all cursor-pointer active:scale-95"
            aria-label="Rolar para a esquerda"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={() => handleScroll("right")}
            disabled={!canScrollRight}
            className="w-8 h-8 rounded-sm border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-700 disabled:opacity-25 disabled:cursor-not-allowed transition-all cursor-pointer active:scale-95"
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
