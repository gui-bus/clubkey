"use client"

import * as React from "react"
import {
  ArrowUpDown,
  BedDouble,
  Car,
  CheckCircle2,
  Flame,
  Laptop,
  ShieldCheck,
  Shirt,
  Tv,
  Umbrella,
  Utensils,
  Waves,
  Wifi,
  Wind,
  Zap,
} from "lucide-react"

export interface AmenityItem {
  id: string
  name: string
  icon: string
}

export interface RoomAmenitiesProps {
  amenities?: AmenityItem[]
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Waves,
  Wind,
  Wifi,
  Utensils,
  Flame,
  Car,
  Umbrella,
  ArrowUpDown,
  Shirt,
  Tv,
  Laptop,
  Zap,
  BedDouble,
  ShieldCheck,
}

export function RoomAmenities({ amenities = [] }: RoomAmenitiesProps): React.JSX.Element {
  return (
    <section className="py-8 border-b border-zinc-200 dark:border-zinc-800 space-y-5">
      <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight text-zinc-900 dark:text-white font-heading">
        Comodidades
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-8">
        {amenities.map((amenity) => {
          const IconComp = iconMap[amenity.icon] || CheckCircle2
          return (
            <div key={amenity.id} className="flex items-center gap-3">
              <IconComp className="w-4 h-4 text-zinc-700 dark:text-zinc-300 shrink-0" />
              <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                {amenity.name}
              </span>
            </div>
          )
        })}
      </div>
    </section>
  )
}
