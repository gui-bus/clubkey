"use client"

import * as React from "react"

import { motion } from "framer-motion"

const marqueePhrases = [
  { prefix: "ATÉ 60% OFF REAL", suffix: "TARIFAS PREFERENCIAIS & LAST MINUTE" },
  { prefix: "+4.500 ACOMODAÇÕES", suffix: "VILAS, RESORTS & HOTÉIS BOUTIQUE" },
  { prefix: "35.000 MARCAS", suffix: "BENEFÍCIOS EM 150 PAÍSES" },
  { prefix: "CLUBE EXCLUSIVO", suffix: "CHAVE DIGITAL DE MEMBRO" },
  { prefix: "100% DIGITAL", suffix: "RESERVAS SEM TAXAS ABUSIVAS" },
]

export function HeroMarquee(): React.JSX.Element {
  const tickerList = [...marqueePhrases, ...marqueePhrases, ...marqueePhrases]

  return (
    <div className="relative z-20 w-full bg-zinc-100 dark:bg-[#161616] border-t border-b border-zinc-300 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 py-3.5 overflow-hidden transition-colors">
      <div className="flex items-center">
        <motion.div
          className="flex items-center gap-8 whitespace-nowrap shrink-0"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            ease: "linear",
            duration: 35,
          }}
        >
          {tickerList.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 shrink-0 select-none"
            >
              <span className="text-xs font-black uppercase tracking-wider text-zinc-900 dark:text-white">
                {item.prefix}
              </span>
              <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400 uppercase tracking-normal">
                — {item.suffix}
              </span>
              <span className="text-zinc-400 dark:text-zinc-700 ml-5 font-bold text-sm">
                /
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}
