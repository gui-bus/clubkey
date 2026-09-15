"use client"

import * as React from "react"
import { CalendarPlus } from "lucide-react"
import { toast } from "@/src/components/ui/toast/toast"
import { cn } from "@/src/lib/utils"

export interface AddToCalendarButtonProps {
  title: string
  description?: string
  location?: string
  startDate?: string
  endDate?: string
  label?: string
  className?: string
}

export function AddToCalendarButton({
  title,
  description = "",
  location = "",
  label = "Adicionar à Agenda",
  className,
}: AddToCalendarButtonProps): React.JSX.Element {
  const handleAddToCalendar = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
      title
    )}&details=${encodeURIComponent(description)}&location=${encodeURIComponent(
      location
    )}`

    if (typeof window !== "undefined") {
      window.open(calendarUrl, "_blank", "noopener,noreferrer")
      toast.success("Abrindo Google Agenda...")
    }
  }

  return (
    <button
      type="button"
      onClick={handleAddToCalendar}
      className={cn(
        "group relative inline-flex items-center justify-center gap-2 h-9 px-3.5 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700 hover:text-zinc-900 dark:hover:text-white text-xs font-bold uppercase tracking-wider select-none cursor-pointer transition-all duration-200 active:scale-[0.98] shadow-2xs hover:shadow-xs",
        className
      )}
      aria-label={label}
    >
      <CalendarPlus className="w-3.5 h-3.5 text-zinc-400 group-hover:text-brand-primary transition-colors duration-200 shrink-0" />
      <span>{label}</span>
    </button>
  )
}
