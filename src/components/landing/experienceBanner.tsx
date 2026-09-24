"use client"

import * as React from "react"

import { motion } from "framer-motion"

import { Container } from "@/src/components/common/container"
import { CtaButton } from "@/src/components/common/ctaButton"

import { brandConfig, isModuleEnabled } from "@/src/config/brand.config"

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
            <span className="w-2 h-2 rounded-full bg-brand-primary" />
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

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto">
            <CtaButton
              href={brandConfig.links.subscription}
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
            >
              Solicite agora
            </CtaButton>

            {isModuleEnabled("stays") && (
              <CtaButton
                href="/hospedagens"
                variant="dark-outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                <span>Explorar Acomodações (+4.500)</span>
              </CtaButton>
            )}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
