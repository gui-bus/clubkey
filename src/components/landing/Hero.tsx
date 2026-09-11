"use client"

import * as React from "react"

import Image from "next/image"
import Link from "next/link"

import { motion } from "framer-motion"

import { Container } from "@/src/components/common/container"
import { CtaButton } from "@/src/components/common/ctaButton"
import { brandConfig } from "@/src/config/brand.config"

const marqueePhrases = [
  { prefix: "ATÉ 60% OFF REAL", suffix: "TARIFAS PREFERENCIAIS & LAST MINUTE" },
  { prefix: "+4.500 ACOMODAÇÕES", suffix: "VILAS, RESORTS & HOTÉIS BOUTIQUE" },
  { prefix: "35.000 MARCAS", suffix: "BENEFÍCIOS EM 150 PAÍSES" },
  { prefix: "CLUBE EXCLUSIVO", suffix: "CHAVE DIGITAL DE MEMBRO" },
  { prefix: "100% DIGITAL", suffix: "RESERVAS SEM TAXAS ABUSIVAS" },
]

export function Hero(): React.JSX.Element {
  const tickerList = [...marqueePhrases, ...marqueePhrases, ...marqueePhrases]

  return (
    <section
      id="hero"
      className="relative z-30 w-full overflow-hidden bg-[#0D0D0D] text-white min-h-[560px] md:min-h-[620px] flex flex-col justify-between"
    >
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <Image
          src="/utils/banners/img_01.png"
          alt="ClubKey Background"
          fill
          priority
          className="object-cover object-center"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-[#161616]/85 via-[#161616]/65 to-[#161616]/95 z-10" />
      </div>

      <Container className="relative z-20 pt-36 pb-14 md:pt-44 md:pb-16 flex-1 flex items-center">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative h-12 w-48 sm:h-14 sm:w-56 mb-6 drop-shadow-2xl hidden md:flex"
        >
          <Image
            src="/utils/icons/icon_key.webp"
            alt="ClubKey VIP"
            fill
            priority
            className="object-contain object-left rotate-270"
          />
        </motion.div>
        <div className="max-w-4xl flex flex-col items-start">
          <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black uppercase tracking-tight text-white leading-[1.04] mb-6 font-heading drop-shadow-md">
            Ative sua Key e pague menos para viajar
          </h1>

          <p className="text-lg sm:text-xl md:text-2xl text-zinc-200 font-light mb-8 leading-relaxed drop-shadow-sm">
            Tenha acesso a milhares de hospedagens e aproveite benefícios de
            membro direto na reserva.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto"
          >
            <CtaButton
              href={brandConfig.links.subscription}
              size="lg"
            >
              Solicite agora
            </CtaButton>

            <Link
              href="/rooms"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-sm bg-zinc-900/80 hover:bg-zinc-800 border border-white/20 text-white font-bold text-sm uppercase tracking-wider transition-all duration-200 shadow-xs cursor-pointer text-center backdrop-blur-xs"
            >
              <span>Explorar Catálogo (+4.500)</span>
            </Link>
          </motion.div>
        </div>
      </Container>

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
    </section>
  )
}
