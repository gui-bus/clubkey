"use client"

import * as React from "react"
import { CalendarPlus } from "@phosphor-icons/react"
import { toast } from "@/src/components/ui/toast/toast"
import { cn } from "@/src/lib/utils"
import { CtaButton, CtaButtonSize } from "@/src/components/common/ctaButton"

export interface AddToCalendarButtonProps {
  title: string
  description?: string
  location?: string
  startDate?: string
  endDate?: string
  label?: string
  className?: string
  size?: CtaButtonSize
}

export function AddToCalendarButton({
  title,
  description = "",
  location = "",
  label = "Adicionar à Agenda",
  className,
  size = "sm",
}: AddToCalendarButtonProps): React.JSX.Element {
  const handleAddToCalendar = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
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
    <CtaButton
      type="button"
      variant="secondary"
      size={size}
      onClick={handleAddToCalendar}
      className={cn(
        "h-9 px-3.5 text-xs shadow-none hover:shadow-none font-bold uppercase tracking-wider",
        className
      )}
      aria-label={label}
    >
      <CalendarPlus className="w-3.5 h-3.5 text-zinc-400 group-hover:text-brand-primary transition-colors duration-200 shrink-0 mr-2" />
      <span>{label}</span>
    </CtaButton>
  )
}
