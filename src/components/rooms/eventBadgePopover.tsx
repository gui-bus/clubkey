"use client"

import * as React from "react"
import { Calendar, CaretDown, MapPin, Ticket } from "@phosphor-icons/react"
import { type UpcomingEventInfo } from "@/src/data/mockRooms"
import { cn } from "@/src/lib/utils"

export interface EventBadgePopoverProps {
  badge: string
  events?: UpcomingEventInfo[]
}

export function EventBadgePopover({
  badge,
  events,
}: EventBadgePopoverProps): React.JSX.Element {
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
        className={cn(
          "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-xs font-semibold transition-colors cursor-pointer select-none border",
          isOpen
            ? "bg-zinc-200 dark:bg-zinc-700 border-zinc-300 dark:border-zinc-600 text-zinc-900 dark:text-white"
            : "bg-zinc-100 hover:bg-zinc-200/70 dark:bg-zinc-800 dark:hover:bg-zinc-700 border-zinc-200/80 dark:border-zinc-700/80 text-zinc-700 dark:text-zinc-300"
        )}
        aria-label={`Ver eventos em ${badge}`}
      >
        <Ticket className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
        <span>{badge}</span>
        <CaretDown
          className={cn(
            "w-3 h-3 text-zinc-400 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {isOpen && events && events.length > 0 && (
        <div className="absolute left-0 top-full mt-2.5 w-[330px] sm:w-[360px] p-4 rounded-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl z-50 animate-in fade-in zoom-in-95 duration-150 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold tracking-wider uppercase text-brand-primary">
                Grandes Eventos
              </span>
              <h4 className="text-sm font-bold text-zinc-900 dark:text-white leading-tight">
                Eventos Confirmados na Região
              </h4>
            </div>
            <span className="px-2 py-0.5 rounded-sm bg-zinc-100 dark:bg-zinc-800 text-[11px] font-semibold text-zinc-600 dark:text-zinc-400">
              {events.length} {events.length === 1 ? "evento" : "eventos"}
            </span>
          </div>

          <div className="h-px bg-zinc-100 dark:bg-zinc-800" />

          <div className="flex flex-col gap-2.5 max-h-[300px] overflow-y-auto no-scrollbar">
            {events.map((ev) => (
              <div
                key={ev.id}
                className="flex items-start gap-3 p-2.5 rounded-sm bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-100 dark:border-zinc-800/70"
              >
                <div className="w-8 h-8 rounded-sm bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0 mt-0.5">
                  <Ticket className="w-4 h-4" />
                </div>

                <div className="flex flex-col min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <span className="text-xs font-bold text-zinc-900 dark:text-zinc-100 leading-snug">
                      {ev.label || ev.shortLabel}
                    </span>
                    {ev.daysUntil === 0 ? (
                      <span className="px-1.5 py-0.5 rounded-sm bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold shrink-0">
                        Hoje
                      </span>
                    ) : (
                      <span className="px-1.5 py-0.5 rounded-sm bg-zinc-200/70 dark:bg-zinc-700/70 text-zinc-700 dark:text-zinc-300 text-[10px] font-bold shrink-0">
                        em {ev.daysUntil}d
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 text-[11px] font-medium text-zinc-500 dark:text-zinc-400 mt-1">
                    <Calendar className="w-3 h-3 text-zinc-400 shrink-0" />
                    <span>
                      {ev.dateFrom}
                      {ev.dateTo && ` a ${ev.dateTo}`}
                    </span>
                  </div>

                  {ev.venue && (
                    <div className="flex items-center gap-1.5 text-[11px] text-zinc-400 dark:text-zinc-500 mt-0.5 truncate">
                      <MapPin className="w-3 h-3 text-zinc-400 shrink-0" />
                      <span className="truncate">{ev.venue}</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-[11px]">
            <span className="text-zinc-400 dark:text-zinc-500">
              Alta demanda prevista
            </span>
            <span className="font-bold text-brand-primary">
              Reserve com até 60% OFF
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
