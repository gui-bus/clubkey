"use client"

import * as React from "react"

import Link from "next/link"

import { motion } from "framer-motion"

import { Container } from "@/src/components/common/container"

export function ExperienceBanner(): React.JSX.Element {
  return (
    <section
      id="experiencia"
      className="relative w-full min-h-[540px] md:min-h-[640px] flex items-center bg-fixed bg-center bg-cover overflow-hidden"
      style={{ backgroundImage: "url('/utils/banners/img_04.png')" }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/35 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/60 pointer-events-none" />

      <Container className="relative z-10 py-20 flex flex-col items-start justify-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl text-white"
        >
          <div className="flex items-center gap-2 mb-5">
            <span className="w-2 h-2 rounded-full bg-[#FF6847]" />
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-300 font-heading">
              ASSOCIE-SE HOJE
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white leading-[1.08] mb-6 font-heading drop-shadow-md">
            Viva uma experiência incomparável em cada viagem
          </h2>

          <p className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed mb-8 max-w-2xl">
            Acomodações de padrão internacional, tarifas preferenciais sem taxas
            ocultas e vantagens exclusivas em milhares de destinos no mundo
            todo.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="https://clubkey.io/subscription"
              target="_blank"
              rel="noreferrer"
              className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden rounded-sm bg-[#FF6847] text-white font-bold text-sm uppercase tracking-wider shadow-md cursor-pointer transition-all duration-300"
            >
              <span className="absolute inset-0 w-full h-full bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
              <span className="relative z-10 inline-flex items-center text-white group-hover:text-zinc-950 transition-colors duration-300">
                Solicite agora
              </span>
            </Link>

            <Link
              href="/rooms"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-sm bg-zinc-900/80 hover:bg-zinc-800 border border-white/20 text-white font-bold text-sm uppercase tracking-wider transition-all duration-200 shadow-xs cursor-pointer text-center backdrop-blur-xs"
            >
              <span>Explorar Acomodações (+4.500)</span>
            </Link>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
