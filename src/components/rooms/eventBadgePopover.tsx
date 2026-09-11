"use client"

import * as React from "react"
import { Ticket } from "lucide-react"
import { type UpcomingEventInfo } from "@/src/data/mockRooms"

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
        onMouseEnter={() => setIsOpen(true)}
        className="inline-flex items-center gap-1.5 px-2.5 py-0.5 sm:py-1 rounded-sm border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-semibold hover:border-brand-primary hover:text-brand-primary transition-all shadow-2xs cursor-pointer"
        aria-label={`Ver eventos em ${badge}`}
      >
        <Ticket className="w-3.5 h-3.5 text-brand-primary" />
        <span>{badge}</span>
      </button>

      {isOpen && events && events.length > 0 && (
        <div
          onMouseLeave={() => setIsOpen(false)}
          className="absolute left-0 top-full mt-2 w-64 p-4 rounded-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-150"
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
