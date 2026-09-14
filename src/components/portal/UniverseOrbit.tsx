"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Users, Calendar, Compass, Gift, Building2, Globe } from "lucide-react"

import { MEMBERS, EVENTS, EXPERIENCES, BENEFITS, STAYS } from "@/src/data/portalData"

const ORBIT_NODES = [
  {
    href: "/pessoas",
    label: "Pessoas",
    count: MEMBERS.length,
    icon: Users,
    x: "-38%",
    y: "-26%"
  },
  {
    href: "/agenda",
    label: "Eventos",
    count: EVENTS.length,
    icon: Calendar,
    x: "38%",
    y: "-30%"
  },
  {
    href: "/experiencias",
    label: "Experiências",
    count: EXPERIENCES.length,
    icon: Compass,
    x: "42%",
    y: "22%"
  },
  {
    href: "/beneficios",
    label: "Benefícios",
    count: BENEFITS.length,
    icon: Gift,
    x: "0%",
    y: "40%"
  },
  {
    href: "/hospedagens",
    label: "Hospedagens",
    count: STAYS.length,
    icon: Building2,
    x: "-42%",
    y: "25%"
  }
]

export function UniverseOrbit(): React.JSX.Element {
  return (
    <div className="relative w-full rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] p-6 sm:p-8 lg:p-10 overflow-hidden shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-[10px] font-bold tracking-widest uppercase text-brand-primary block mb-1">
            Rede & Ecossistema
          </span>
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-zinc-900 dark:text-white">
            Explore seu universo ClubKey
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Rede Ativa
          </span>
        </div>
      </div>

      <div className="relative h-[340px] sm:h-[380px] w-full flex items-center justify-center">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 dark:opacity-20">
          <div className="w-[180px] h-[180px] rounded-full border border-dashed border-zinc-400 dark:border-zinc-600" />
          <div className="absolute w-[280px] h-[280px] rounded-full border border-dashed border-zinc-400 dark:border-zinc-600" />
        </div>

        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute w-[280px] h-[280px] rounded-full pointer-events-none"
        >
          <div className="w-3.5 h-3.5 rounded-full absolute -top-1.5 left-1/2 -ml-1.5 bg-brand-primary shadow-lg shadow-brand-primary/50" />
        </motion.div>

        <div className="relative z-10 w-24 h-24 rounded-sm bg-zinc-950 border border-brand-primary/40 text-white shadow-2xl flex flex-col items-center justify-center font-black text-xl tracking-wider select-none">
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
              style={{
                transform: `translate(${node.x}, ${node.y})`
              }}
              className="absolute z-20 flex items-center gap-2.5 px-4 py-2.5 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md shadow-sm hover:scale-105 hover:border-brand-primary/60 transition-all cursor-pointer group"
            >
              <div className="w-6 h-6 rounded-sm bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0 group-hover:bg-brand-primary group-hover:text-white transition-colors">
                <Icon className="w-3.5 h-3.5" />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white group-hover:text-brand-primary transition-colors">
                  {node.label}
                </span>
                <span className="text-[11px] font-black text-zinc-400 dark:text-zinc-500">
                  {node.count}
                </span>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
