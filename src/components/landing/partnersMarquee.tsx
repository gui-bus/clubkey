"use client"

import * as React from "react"

import Image from "next/image"

import { ArrowUpRight } from "@phosphor-icons/react"
import { motion } from "framer-motion"

import { Container } from "@/src/components/common/container"
import { CtaButton } from "@/src/components/common/ctaButton"

import { cn } from "@/src/lib/utils"

import { brandConfig } from "@/src/config/brand.config"

interface PartnerLogo {
  name: string
  src: string
  darkSrc?: string
  width: number
  height: number
  invertInDark?: boolean
  className?: string
}

const partners: PartnerLogo[] = [
  {
    name: "Nike",
    src: "/utils/icons/partners/nike.svg",
    width: 500,
    height: 261,
    invertInDark: true,
    className: "h-8 sm:h-9 w-auto",
  },
  {
    name: "Carrefour",
    src: "/utils/icons/partners/carrefour.svg",
    width: 500,
    height: 83,
    className: "h-7 sm:h-8 w-auto",
  },
  {
    name: "Drogaria São Paulo",
    src: "/utils/icons/partners/drogaria_sao_paulo.svg",
    darkSrc: "/utils/icons/partners/drogaria_sao_paulo_white_text.svg",
    width: 500,
    height: 90,
    className: "h-8 sm:h-9 w-auto",
  },
  {
    name: "Movida",
    src: "/utils/icons/partners/movida.svg",
    darkSrc: "/utils/icons/partners/movida_white_text.svg",
    width: 500,
    height: 153,
    className: "h-7 sm:h-8 w-auto",
  },
  {
    name: "Sem Parar",
    src: "/utils/icons/partners/sem_parar.svg",
    darkSrc: "/utils/icons/partners/sem_parar_white_text.svg",
    width: 500,
    height: 455,
    className: "h-9 sm:h-11 w-auto",
  },
  {
    name: "Wise Up",
    src: "/utils/icons/partners/wise_up.svg",
    width: 500,
    height: 95,
    invertInDark: true,
    className: "h-7 sm:h-8 w-auto",
  },
]

const partnerHighlights = [
  {
    number: "01",
    title: "Diversos Segmentos",
    description:
      "Gastronomia, mobilidade urbana, moda, bem-estar, farmácias, educação e serviços essenciais reunidos em um único clube.",
  },
  {
    number: "02",
    title: "+35.000 Marcas Parceiras",
    description:
      "As maiores redes do país e do mundo homologadas com vantagens reais e descontos diretos para associados ativos.",
  },
  {
    number: "03",
    title: "Descontos em 150 Países",
    description:
      "Comodidades e benefícios internacionais que acompanham você pelo mundo com cobertura e tranquilidade garantidas.",
  },
  {
    number: "04",
    title: "Economia Inteligente",
    description:
      "Descontos contínuos no seu dia a dia que amortizam o valor da sua assinatura já nas primeiras utilizações.",
  },
]

export function PartnersMarquee(): React.JSX.Element {
  const marqueePartners = [...partners, ...partners, ...partners, ...partners]

  return (
    <section
      id="parceiros"
      className="w-full pt-16 md:pt-24 bg-transparent text-zinc-900 dark:text-zinc-100 transition-colors overflow-hidden relative"
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="w-full"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
            <div className="lg:col-span-7 flex items-start gap-4 sm:gap-6">
              <div className="shrink-0 pt-2">
                <span className="text-zinc-400 dark:text-zinc-500 text-xs uppercase tracking-[0.25em] font-semibold [writing-mode:vertical-rl] rotate-180 select-none block font-heading">
                  Benefícios
                </span>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="w-2 h-2 rounded-full bg-brand-primary" />
                  <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-heading">
                    REDE DE BENEFÍCIOS GLOBAIS
                  </span>
                </div>
                <h2 className="font-heading text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-zinc-900 dark:text-white leading-[1.02]">
                  Grandes marcas,
                  <br />
                  diversos{" "}
                  <span className="text-brand-primary">descontos.</span>
                </h2>
              </div>
            </div>

            <div className="lg:col-span-5 lg:pt-3">
              <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-light">
                A sua assinatura{" "}
                <strong className="font-semibold text-zinc-900 dark:text-white">
                  {brandConfig.name}
                </strong>{" "}
                expande seu poder de compra para muito além das hospedagens.
                Conectamos você às maiores marcas do país e do mundo para
                garantir economia real no seu cotidiano e em suas viagens.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-4 w-full sm:w-auto">
                <CtaButton
                  href={brandConfig.links.subscription}
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  <span>Solicite agora</span>
                  <ArrowUpRight className="w-4 h-4" />
                </CtaButton>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 pt-16 mt-16 border-t border-zinc-200 dark:border-zinc-800 w-full">
            {partnerHighlights.map((pillar) => (
              <div key={pillar.number} className="relative pt-6">
                <span
                  aria-hidden="true"
                  className="font-heading font-black tabular-nums text-7xl sm:text-8xl lg:text-9xl text-zinc-900/[0.06] dark:text-white/[0.06] absolute -top-5 -left-1 select-none pointer-events-none leading-none tracking-tighter"
                >
                  {pillar.number}
                </span>
                <div className="relative z-10 space-y-2">
                  <h3 className="font-heading text-lg sm:text-xl font-bold text-zinc-900 dark:text-white leading-snug">
                    {pillar.title}
                  </h3>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </Container>

      <Container className="mt-16 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-brand-primary animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
            Marcas parceiras em destaque
          </span>
        </div>
      </Container>

      <div className="relative w-full overflow-hidden py-6">
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-36 md:w-48 z-20 pointer-events-none bg-gradient-to-r from-[#F1F1F1] dark:from-[#161616] to-transparent" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-36 md:w-48 z-20 pointer-events-none bg-gradient-to-l from-[#F1F1F1] dark:from-[#161616] to-transparent" />

        <div className="flex items-center">
          <motion.div
            className="flex items-center gap-12 sm:gap-16 md:gap-20 whitespace-nowrap shrink-0"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              repeat: Infinity,
              ease: "linear",
              duration: 25,
            }}
          >
            {marqueePartners.map((partner, index) => (
              <div
                key={`${partner.name}-${index}`}
                className="shrink-0 flex items-center justify-center transition-transform duration-300 hover:scale-110 select-none cursor-pointer"
              >
                {partner.darkSrc ? (
                  <>
                    <Image
                      src={partner.src}
                      alt={partner.name}
                      width={partner.width}
                      height={partner.height}
                      className={cn(
                        "object-contain transition-all duration-300 opacity-80 hover:opacity-100 dark:hidden",
                        partner.className ?? "h-8 w-auto"
                      )}
                    />
                    <Image
                      src={partner.darkSrc}
                      alt={partner.name}
                      width={partner.width}
                      height={partner.height}
                      className={cn(
                        "object-contain transition-all duration-300 opacity-80 hover:opacity-100 hidden dark:block",
                        partner.className ?? "h-8 w-auto"
                      )}
                    />
                  </>
                ) : (
                  <Image
                    src={partner.src}
                    alt={partner.name}
                    width={partner.width}
                    height={partner.height}
                    className={cn(
                      "object-contain transition-all duration-300 opacity-80 hover:opacity-100",
                      partner.invertInDark && "dark:invert dark:brightness-125",
                      partner.className ?? "h-8 w-auto"
                    )}
                  />
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
