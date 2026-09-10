"use client"

import * as React from "react"

import { CheckCircle2 } from "lucide-react"

interface BookingItem {
  id: string
  name: string
  location: string
  savings: string
  timeAgo: string
}

const liveBookings: BookingItem[] = [
  {
    id: "1",
    name: "Eduardo M.",
    location: "Vila Fasano, Trancoso BA",
    savings: "R$ 4.850 economizados",
    timeAgo: "há 4 min",
  },
  {
    id: "2",
    name: "Juliana F.",
    location: "Eco Resort, Fernando de Noronha",
    savings: "R$ 6.200 economizados",
    timeAgo: "há 18 min",
  },
  {
    id: "3",
    name: "Lucas & Marcela",
    location: "Chalé Suíço, Gramado RS",
    savings: "R$ 2.400 economizados",
    timeAgo: "há 32 min",
  },
  {
    id: "4",
    name: "Rodrigo A.",
    location: "Mansão Náutica, Angra dos Reis",
    savings: "R$ 7.900 economizados",
    timeAgo: "há 45 min",
  },
  {
    id: "5",
    name: "Fernanda C.",
    location: "Suítes Haussmann, Paris",
    savings: "R$ 5.100 economizados",
    timeAgo: "há 1h",
  },
]

export function LiveActivityTicker(): React.JSX.Element {
  return (
    <div className="w-full bg-[#EBEBEB] dark:bg-[#1A1A1D] border-b border-zinc-300 dark:border-zinc-800 py-3 overflow-hidden transition-colors">
      <div className="w-full max-w-440 mx-auto px-6 md:px-12 flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2 pr-4 shrink-0 border-r border-zinc-300 dark:border-zinc-800 text-xs font-bold uppercase tracking-wider text-[#FF6847]">
          <span className="w-2 h-2 rounded-full bg-[#FF6847] animate-ping" />
          <span>Atividade Recente:</span>
        </div>

        <div className="flex items-center gap-6 overflow-x-auto no-scrollbar whitespace-nowrap text-xs">
          {liveBookings.concat(liveBookings).map((booking, idx) => (
            <div
              key={`${booking.id}-${idx}`}
              className="inline-flex items-center gap-2 bg-white dark:bg-[#222226] border border-zinc-300 dark:border-zinc-700/60 px-3.5 py-1.5 rounded-none text-zinc-800 dark:text-zinc-300 shadow-xs"
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6847] shrink-0" />
              <span className="font-bold text-zinc-900 dark:text-white">
                {booking.name}
              </span>
              <span className="text-zinc-500">reservou em</span>
              <span className="font-medium text-zinc-800 dark:text-zinc-200">
                {booking.location}
              </span>
              <span className="px-2 py-0.5 bg-[#FF6847]/15 text-[#FF6847] font-extrabold text-[10px] uppercase tracking-wider">
                {booking.savings}
              </span>
              <span className="text-zinc-400 dark:text-zinc-500 text-[10px]">
                ({booking.timeAgo})
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
