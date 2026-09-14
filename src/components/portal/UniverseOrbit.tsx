"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Users, Calendar, Compass, Gift, Building2, Globe } from "lucide-react"

import { MEMBERS, EVENTS, EXPERIENCES, BENEFITS, STAYS } from "@/src/data/portalData"
import { Badge } from "@/src/components/ui/badge/badge"

const ORBIT_NODES = [
  {
    href: "/pessoas",
    label: "Pessoas",
    count: MEMBERS.length,
    icon: Users,
    positionClass: "left-[4%] sm:left-[10%] lg:left-[15%] top-[12%] sm:top-[14%]"
  },
  {
    href: "/eventos",
    label: "Eventos",
    count: EVENTS.length,
    icon: Calendar,
    positionClass: "right-[4%] sm:right-[10%] lg:right-[15%] top-[12%] sm:top-[14%]"
  },
  {
    href: "/experiencias",
    label: "Experiências",
    count: EXPERIENCES.length,
    icon: Compass,
    positionClass: "right-[2%] sm:right-[8%] lg:right-[14%] bottom-[16%] sm:bottom-[18%]"
  },
  {
    href: "/beneficios",
    label: "Benefícios",
    count: BENEFITS.length,
    icon: Gift,
    positionClass: "left-1/2 -translate-x-1/2 bottom-[4%] sm:bottom-[6%]"
  },
  {
    href: "/hospedagens",
    label: "Hospedagens",
    count: STAYS.length,
    icon: Building2,
    positionClass: "left-[2%] sm:left-[8%] lg:left-[14%] bottom-[16%] sm:bottom-[18%]"
  }
]

export function UniverseOrbit(): React.JSX.Element {
  return (
    <div className="relative w-full rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] p-6 sm:p-8 lg:p-10 overflow-hidden shadow-xs">
      <div className="flex items-center justify-between mb-2">
        <div>
          <span className="text-[10px] font-black tracking-widest uppercase text-brand-primary block mb-1">
            Rede & Ecossistema
          </span>
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-zinc-900 dark:text-white font-heading">
            Explore seu universo ClubKey
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-black uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Rede Ativa
          </span>
        </div>
      </div>

      <div className="relative h-[380px] sm:h-[420px] w-full flex items-center justify-center">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 dark:opacity-25">
          <div className="w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] rounded-full border border-dashed border-zinc-400 dark:border-zinc-500" />
          <div className="absolute w-[320px] h-[320px] sm:w-[380px] sm:h-[380px] rounded-full border border-dashed border-zinc-400 dark:border-zinc-500" />
        </div>

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
          className="absolute w-[320px] h-[320px] sm:w-[380px] sm:h-[380px] rounded-full pointer-events-none"
        >
          <div className="w-3.5 h-3.5 rounded-full absolute -top-1.5 left-1/2 -ml-1.5 bg-brand-primary shadow-lg shadow-brand-primary/60 ring-2 ring-white/50" />
        </motion.div>

        <div className="relative z-10 w-24 h-24 sm:w-28 sm:h-28 rounded-sm bg-zinc-950 border border-brand-primary/40 text-white shadow-2xl flex flex-col items-center justify-center select-none">
          <Globe className="w-7 h-7 mb-1 text-brand-primary" />
          <span className="text-[11px] uppercase tracking-widest font-black text-white">
            ClubKey
          </span>
        </div>

        {ORBIT_NODES.map((node) => {
          const Icon = node.icon
          return (
            <Link
              key={node.href}
              href={node.href}
              className={`absolute z-20 flex items-center gap-2.5 px-4 py-2.5 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-[#141416]/95 backdrop-blur-md shadow-md hover:scale-105 hover:border-brand-primary transition-all cursor-pointer group ${node.positionClass}`}
            >
              <div className="w-7 h-7 rounded-sm bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0 group-hover:bg-brand-primary group-hover:text-white transition-colors">
                <Icon className="w-3.5 h-3.5" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white group-hover:text-brand-primary transition-colors whitespace-nowrap">
                  {node.label}
                </span>
                <Badge
                  size="sm"
                  color="primary"
                  variant="flat"
                  radius="sm"
                  className="font-black text-[10px] px-1.5 py-0.5"
                >
                  {node.count}
                </Badge>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
