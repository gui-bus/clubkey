"use client"

import * as React from "react"
import { motion } from "framer-motion"
import {
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Flame,
  Lock,
  MapPin,
  Minus,
  Plus,
  Search,
  Users,
  X,
} from "lucide-react"

import { CtaButton } from "@/src/components/common/ctaButton"
import { destinationOptions } from "@/src/data/mockDestinations"
import { cn } from "@/src/lib/utils"

const monthNames = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
]

const weekDayNames = ["DOM", "SEG", "TER", "QUA", "QUI", "SEX", "SAB"]

export interface RoomsSearchFilterBarProps {
  searchDestination: string
  onSearchDestinationChange: (val: string) => void
  checkInDate: Date | null
  onCheckInDateChange: (val: Date | null) => void
  checkOutDate: Date | null
  onCheckOutDateChange: (val: Date | null) => void
  guestCount: number
  onGuestCountChange: (val: number | ((prev: number) => number)) => void
  onSearch?: () => void
}

export function RoomsSearchFilterBar({
  searchDestination,
  onSearchDestinationChange,
  checkInDate,
  onCheckInDateChange,
  checkOutDate,
  onCheckOutDateChange,
  guestCount,
  onGuestCountChange,
  onSearch,
}: RoomsSearchFilterBarProps): React.JSX.Element {
  const [destinationQuery, setDestinationQuery] = React.useState("")
  const [destinationOpen, setDestinationOpen] = React.useState(false)
  const [calendarOpen, setCalendarOpen] = React.useState(false)
  const [currentMonth, setCurrentMonth] = React.useState<Date>(() => {
    const d = new Date()
    return new Date(d.getFullYear(), d.getMonth(), 1)
  })

  const searchBarRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target as Node)
      ) {
        setDestinationOpen(false)
        setCalendarOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const today = React.useMemo(() => {
    const d = new Date()
    d.setHours(0, 0, 0, 0)
    return d
  }, [])

  const isPastDay = (d: Date) => d.getTime() < today.getTime()

  const isSameDay = (d1: Date | null, d2: Date | null) => {
    if (!d1 || !d2) return false
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    )
  }

  const isBetweenDays = (d: Date, start: Date | null, end: Date | null) => {
    if (!start || !end) return false
    const t = d.getTime()
    return t > start.getTime() && t < end.getTime()
  }

  const handleDateClick = (date: Date) => {
    if (isPastDay(date)) return

    if (!checkInDate || (checkInDate && checkOutDate)) {
      onCheckInDateChange(date)
      onCheckOutDateChange(null)
    } else if (checkInDate && !checkOutDate) {
      if (date.getTime() > checkInDate.getTime()) {
        onCheckOutDateChange(date)
      } else if (date.getTime() < checkInDate.getTime()) {
        onCheckInDateChange(date)
      } else {
        onCheckOutDateChange(null)
      }
    }
  }

  const handleSelectHoje = () => {
    const d1 = new Date(today)
    const d2 = new Date(today)
    d2.setDate(d2.getDate() + 1)
    onCheckInDateChange(d1)
    onCheckOutDateChange(d2)
  }

  const handleSelectAmanha = () => {
    const d1 = new Date(today)
    d1.setDate(d1.getDate() + 1)
    const d2 = new Date(today)
    d2.setDate(d2.getDate() + 2)
    onCheckInDateChange(d1)
    onCheckOutDateChange(d2)
  }

  const handleSelectDepois = () => {
    const d1 = new Date(today)
    d1.setDate(d1.getDate() + 2)
    const d2 = new Date(today)
    d2.setDate(d2.getDate() + 4)
    onCheckInDateChange(d1)
    onCheckOutDateChange(d2)
  }

  const filteredDestinations = React.useMemo(() => {
    if (!destinationQuery.trim()) return destinationOptions
    const q = destinationQuery.toLowerCase().trim()
    return destinationOptions.filter(
      (d) =>
        d.label.toLowerCase().includes(q) ||
        d.name.toLowerCase().includes(q) ||
        d.uf.toLowerCase().includes(q)
    )
  }, [destinationQuery])

  const renderMonth = (
    monthDate: Date,
    showPrevNav: boolean,
    showNextNav: boolean
  ) => {
    const year = monthDate.getFullYear()
    const month = monthDate.getMonth()
    const monthName = monthNames[month]
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    const days = []
    for (let i = 0; i < firstDay; i++) {
      days.push(null)
    }
    for (let d = 1; d <= daysInMonth; d++) {
      days.push(new Date(year, month, d))
    }

    const tomorrow = new Date(today.getTime() + 86400000)
    const dayAfter = new Date(today.getTime() + 86400000 * 2)

    return (
      <div className="flex-1 min-w-[260px]">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-bold text-zinc-900 dark:text-white capitalize">
            {monthName} {year}
          </h4>
          <div className="flex items-center gap-1">
            {showPrevNav && (
              <button
                type="button"
                onClick={() =>
                  setCurrentMonth(
                    (prev) =>
                      new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
                  )
                }
                className="p-1 rounded-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 transition-colors cursor-pointer"
                aria-label="Mês anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}
            {showNextNav && (
              <button
                type="button"
                onClick={() =>
                  setCurrentMonth(
                    (prev) =>
                      new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
                  )
                }
                className="p-1 rounded-sm hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-300 transition-colors cursor-pointer"
                aria-label="Próximo mês"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {weekDayNames.map((w) => (
            <span
              key={w}
              className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase"
            >
              {w}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 text-center">
          {days.map((date, idx) => {
            if (!date) {
              return (
                <div key={`empty-${idx}`} className="w-8 h-8 sm:w-9 sm:h-9" />
              )
            }

            const isPast = isPastDay(date)
            const isCheckIn = isSameDay(date, checkInDate)
            const isCheckOut = isSameDay(date, checkOutDate)
            const inRange = isBetweenDays(date, checkInDate, checkOutDate)

            const isLastMinuteDay =
              isSameDay(date, today) ||
              isSameDay(date, tomorrow) ||
              isSameDay(date, dayAfter)

            if (isPast) {
              return (
                <div
                  key={date.toISOString()}
                  className="relative w-8 h-8 sm:w-9 sm:h-9 mx-auto flex items-center justify-center text-xs font-normal text-zinc-300 dark:text-zinc-600 bg-zinc-50/50 dark:bg-zinc-900/30 rounded-sm cursor-not-allowed select-none"
                >
                  <span>{date.getDate()}</span>
                  <Lock className="w-2 h-2 text-zinc-300 dark:text-zinc-600 absolute top-1 right-1" />
                </div>
              )
            }

            return (
              <button
                key={date.toISOString()}
                type="button"
                onClick={() => handleDateClick(date)}
                className={cn(
                  "relative w-8 h-8 sm:w-9 sm:h-9 mx-auto flex items-center justify-center text-xs font-medium rounded-sm transition-colors cursor-pointer select-none",
                  isCheckIn || isCheckOut
                    ? "font-bold text-white bg-brand-primary shadow-xs"
                    : inRange
                      ? "font-semibold text-brand-primary bg-brand-primary/15 rounded-sm"
                      : "text-zinc-800 dark:text-zinc-200 hover:bg-brand-primary/10 hover:text-brand-primary"
                )}
              >
                <span>{date.getDate()}</span>
                {isLastMinuteDay && !isCheckIn && !isCheckOut && (
                  <Flame className="w-2.5 h-2.5 text-brand-primary fill-brand-primary absolute -top-0.5 -right-0.5" />
                )}
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  const nextMonthDate = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    1
  )

  const handleSearchClick = () => {
    setDestinationOpen(false)
    setCalendarOpen(false)
    if (onSearch) {
      onSearch()
    }
  }

  const destinationDropdownMarkup = destinationOpen && (
    <div className="absolute top-full left-0 right-0 sm:right-auto mt-2 w-full sm:w-84 bg-white dark:bg-zinc-900 rounded-sm shadow-2xl border border-zinc-200 dark:border-zinc-800 z-[100] overflow-hidden text-left animate-in fade-in zoom-in-95 duration-150">
      <div className="p-3 border-b border-zinc-100 dark:border-zinc-800 flex items-center gap-2">
        <Search className="w-4 h-4 text-zinc-400 shrink-0" />
        <input
          type="text"
          placeholder="Buscar estado ou cidade..."
          value={destinationQuery}
          onChange={(e) => setDestinationQuery(e.target.value)}
          autoFocus
          className="w-full bg-transparent text-xs sm:text-sm font-medium focus:outline-none text-zinc-900 dark:text-white placeholder:text-zinc-400"
        />
      </div>

      <button
        type="button"
        onClick={() => {
          onSearchDestinationChange("")
          setDestinationOpen(false)
        }}
        className="w-full px-4 py-2.5 text-left text-xs font-semibold text-zinc-600 dark:text-zinc-300 bg-zinc-100/80 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
      >
        Limpar seleção
      </button>

      <div className="max-h-56 overflow-y-auto divide-y divide-zinc-100 dark:divide-zinc-800">
        {filteredDestinations.map((dest) => (
          <button
            key={dest.id}
            type="button"
            onClick={() => {
              onSearchDestinationChange(dest.label)
              setDestinationOpen(false)
            }}
            className="w-full px-4 py-2.5 flex items-center justify-between hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors text-xs sm:text-sm font-medium text-zinc-800 dark:text-zinc-200 cursor-pointer text-left"
          >
            <div className="flex items-center gap-2.5 truncate">
              <MapPin className="w-3.5 h-3.5 text-brand-primary shrink-0" />
              <span className="truncate">{dest.label}</span>
            </div>
            <span className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-wider font-semibold shrink-0 ml-2">
              {dest.type === "state" ? "Estado" : "Cidade"}
            </span>
          </button>
        ))}
        {filteredDestinations.length === 0 && (
          <div className="px-4 py-3 text-xs text-zinc-400 text-center">
            Nenhum destino encontrado
          </div>
        )}
      </div>
    </div>
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      ref={searchBarRef}
      className="relative z-40 w-full max-w-4xl bg-white dark:bg-zinc-900 rounded-sm sm:rounded-full shadow-2xl p-3 sm:p-2 border border-zinc-200 dark:border-zinc-800"
    >
      <div className="w-full flex flex-col gap-2 sm:hidden">
        <div className="relative w-full">
          <button
            type="button"
            onClick={() => {
              setDestinationOpen((prev) => !prev)
              setCalendarOpen(false)
            }}
            className="w-full flex items-center justify-between gap-3 p-2.5 rounded-sm bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/80 hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors text-left cursor-pointer"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-sm bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0">
                <MapPin className="w-3.5 h-3.5" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                  Destino
                </span>
                <span className="text-xs font-semibold text-zinc-900 dark:text-white truncate">
                  {searchDestination || "Qual o seu destino?"}
                </span>
              </div>
            </div>
            <ChevronDown
              className={cn(
                "w-4 h-4 text-zinc-400 shrink-0 transition-transform duration-200",
                destinationOpen && "rotate-180"
              )}
            />
          </button>
          {destinationDropdownMarkup}
        </div>

        <div className="grid grid-cols-2 gap-2 w-full">
          <button
            type="button"
            onClick={() => {
              setCalendarOpen((prev) => !prev)
              setDestinationOpen(false)
            }}
            className="flex items-center gap-2.5 p-2.5 rounded-sm bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/80 hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors text-left cursor-pointer min-w-0"
          >
            <div className="w-7 h-7 rounded-sm bg-zinc-200/60 dark:bg-zinc-700/60 text-zinc-600 dark:text-zinc-300 flex items-center justify-center shrink-0">
              <Calendar className="w-3.5 h-3.5" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Check-in
              </span>
              <span className="text-xs font-semibold text-zinc-900 dark:text-white truncate">
                {checkInDate
                  ? checkInDate.toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "short",
                    })
                  : "Adicionar"}
              </span>
            </div>
          </button>

          <button
            type="button"
            onClick={() => {
              setCalendarOpen((prev) => !prev)
              setDestinationOpen(false)
            }}
            className="flex items-center gap-2.5 p-2.5 rounded-sm bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/80 hover:border-zinc-300 dark:hover:border-zinc-600 transition-colors text-left cursor-pointer min-w-0"
          >
            <div className="w-7 h-7 rounded-sm bg-zinc-200/60 dark:bg-zinc-700/60 text-zinc-600 dark:text-zinc-300 flex items-center justify-center shrink-0">
              <Calendar className="w-3.5 h-3.5" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Check-out
              </span>
              <span className="text-xs font-semibold text-zinc-900 dark:text-white truncate">
                {checkOutDate
                  ? checkOutDate.toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "short",
                    })
                  : "Adicionar"}
              </span>
            </div>
          </button>
        </div>

        <div className="w-full flex items-center justify-between p-2 px-3 rounded-sm bg-zinc-50 dark:bg-zinc-800/60 border border-zinc-200/80 dark:border-zinc-700/80">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-sm bg-zinc-200/60 dark:bg-zinc-700/60 text-zinc-600 dark:text-zinc-300 flex items-center justify-center shrink-0">
              <Users className="w-3.5 h-3.5" />
            </div>
            <div className="flex flex-col">
              <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Hóspedes
              </span>
              <span className="text-xs font-semibold text-zinc-900 dark:text-white">
                {guestCount} {guestCount === 1 ? "hóspede" : "hóspedes"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() =>
                onGuestCountChange((prev) => Math.max(1, prev - 1))
              }
              disabled={guestCount <= 1}
              className="w-7 h-7 rounded-sm border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-700 flex items-center justify-center text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
              aria-label="Diminuir hóspedes"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="text-xs font-bold text-zinc-900 dark:text-white w-4 text-center">
              {guestCount}
            </span>
            <button
              type="button"
              onClick={() =>
                onGuestCountChange((prev) => Math.min(10, prev + 1))
              }
              disabled={guestCount >= 10}
              className="w-7 h-7 rounded-sm border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-700 flex items-center justify-center text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
              aria-label="Aumentar hóspedes"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSearchClick}
          className="w-full h-10 rounded-sm bg-brand-primary hover:bg-brand-primary-hover text-white font-bold text-xs uppercase tracking-wide shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] mt-0.5"
          aria-label="Buscar acomodações"
        >
          <Search className="w-4 h-4 stroke-[2.5]" />
          <span>Buscar Acomodações</span>
        </button>
      </div>

      <div className="hidden sm:flex items-center justify-between w-full gap-2">
        <div className="relative flex-1">
          <button
            type="button"
            onClick={() => {
              setDestinationOpen((prev) => !prev)
              setCalendarOpen(false)
            }}
            className="w-full flex items-center justify-between gap-2.5 px-4 py-2 rounded-full hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors text-left cursor-pointer"
          >
            <div className="flex items-center gap-2.5 truncate">
              <MapPin className="w-4 h-4 text-brand-primary shrink-0" />
              <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 truncate">
                {searchDestination || "Qual o seu destino?"}
              </span>
            </div>
            <ChevronDown
              className={cn(
                "w-3.5 h-3.5 text-zinc-400 shrink-0 transition-transform",
                destinationOpen && "rotate-180"
              )}
            />
          </button>
          {destinationDropdownMarkup}
        </div>

        <div className="w-px h-7 bg-zinc-200 dark:bg-zinc-800 shrink-0" />

        <button
          type="button"
          onClick={() => {
            setCalendarOpen((prev) => !prev)
            setDestinationOpen(false)
          }}
          className="flex-1 flex items-center gap-2.5 px-4 py-2 rounded-full hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors text-left cursor-pointer"
        >
          <Calendar className="w-4 h-4 text-zinc-500 dark:text-zinc-400 shrink-0" />
          <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 whitespace-nowrap">
            {checkInDate
              ? checkInDate.toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "short",
                })
              : "Check-in"}
          </span>
        </button>

        <div className="w-px h-7 bg-zinc-200 dark:bg-zinc-800 shrink-0" />

        <button
          type="button"
          onClick={() => {
            setCalendarOpen((prev) => !prev)
            setDestinationOpen(false)
          }}
          className="flex-1 flex items-center gap-2.5 px-4 py-2 rounded-full hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors text-left cursor-pointer"
        >
          <Calendar className="w-4 h-4 text-zinc-500 dark:text-zinc-400 shrink-0" />
          <span className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 whitespace-nowrap">
            {checkOutDate
              ? checkOutDate.toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "short",
                })
              : "Check-out"}
          </span>
        </button>

        <div className="w-px h-7 bg-zinc-200 dark:bg-zinc-800 shrink-0" />

        <div className="flex items-center gap-2.5 px-3 py-1">
          <button
            type="button"
            onClick={() =>
              onGuestCountChange((prev) => Math.max(1, prev - 1))
            }
            disabled={guestCount <= 1}
            className="w-7 h-7 rounded-full border border-zinc-300 dark:border-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-zinc-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
            aria-label="Diminuir hóspedes"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>

          <div className="flex items-center gap-1.5 px-1">
            <Users className="w-4 h-4 text-zinc-700 dark:text-zinc-300" />
            <span className="text-sm font-bold text-zinc-900 dark:text-white min-w-[14px] text-center">
              {guestCount}
            </span>
          </div>

          <button
            type="button"
            onClick={() =>
              onGuestCountChange((prev) => Math.min(10, prev + 1))
            }
            disabled={guestCount >= 10}
            className="w-7 h-7 rounded-full border border-zinc-300 dark:border-zinc-700 flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-zinc-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
            aria-label="Aumentar hóspedes"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>

        <button
          type="button"
          onClick={handleSearchClick}
          className="w-11 h-11 rounded-full bg-brand-primary hover:bg-brand-primary-hover text-white flex items-center justify-center shadow-lg transition-all shrink-0 cursor-pointer"
          aria-label="Buscar acomodações"
        >
          <Search className="w-4 h-4 stroke-[2.5]" />
        </button>
      </div>

      {calendarOpen && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-full max-w-[calc(100vw-2rem)] sm:max-w-4xl bg-white dark:bg-zinc-900 rounded-sm shadow-2xl border border-zinc-200 dark:border-zinc-800 z-[100] p-4 sm:p-6 text-left animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-100 dark:border-zinc-800">
            <span className="text-sm sm:text-base font-semibold text-zinc-800 dark:text-zinc-200">
              Check-in / Check-out
            </span>
            <button
              type="button"
              onClick={() => setCalendarOpen(false)}
              className="p-1.5 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-800 dark:hover:text-white transition-colors cursor-pointer"
              aria-label="Fechar calendário"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <div className="block sm:hidden">
                {renderMonth(currentMonth, true, true)}
              </div>
              <div className="hidden sm:flex flex-row gap-6">
                {renderMonth(currentMonth, true, false)}
                {renderMonth(nextMonthDate, false, true)}
              </div>
            </div>

            <div className="w-full md:w-56 shrink-0 md:border-l border-zinc-200 dark:border-zinc-800 md:pl-5 flex flex-col justify-between pt-4 md:pt-0 border-t md:border-t-0 gap-4">
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-zinc-900 dark:text-white mb-1">
                  <Flame className="w-4 h-4 text-brand-primary fill-brand-primary" />
                  <span>Last Minute</span>
                </div>
                {[
                  { label: "Hoje (60% OFF)", action: handleSelectHoje },
                  { label: "Amanhã (60% OFF)", action: handleSelectAmanha },
                  { label: "Depois (60% OFF)", action: handleSelectDepois },
                ].map((opt) => (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={opt.action}
                    className="w-full py-2 px-3 border border-zinc-200 dark:border-zinc-700 rounded-sm text-xs font-semibold text-zinc-800 dark:text-zinc-200 hover:border-brand-primary hover:text-brand-primary flex items-center gap-2 transition-all cursor-pointer bg-white dark:bg-zinc-800/50 whitespace-nowrap select-none"
                  >
                    <Flame className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                    <span className="whitespace-nowrap">{opt.label}</span>
                  </button>
                ))}
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <CtaButton
                  isFullWidth
                  size="sm"
                  onClick={() => setCalendarOpen(false)}
                  className="whitespace-nowrap"
                >
                  Confirmar
                </CtaButton>
                <button
                  type="button"
                  onClick={() => {
                    onCheckInDateChange(null)
                    onCheckOutDateChange(null)
                  }}
                  className="w-full py-2 bg-white dark:bg-zinc-800 border border-brand-primary text-brand-primary hover:bg-brand-primary-light dark:hover:bg-zinc-700 rounded-sm text-xs sm:text-sm font-bold transition-colors cursor-pointer select-none"
                >
                  Limpar Datas
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  )
}
