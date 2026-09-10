"use client"

import * as React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Check, ArrowRight, Sparkles } from "lucide-react"

interface PartnerLogo {
  name: string
  src: string
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
    width: 500,
    height: 90,
    className: "h-8 sm:h-9 w-auto",
  },
  {
    name: "Movida",
    src: "/utils/icons/partners/movida.svg",
    width: 500,
    height: 153,
    className: "h-7 sm:h-8 w-auto",
  },
  {
    name: "Sem Parar",
    src: "/utils/icons/partners/sem_parar.svg",
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
    title: "Diversos Segmentos",
    description:
      "Gastronomia, mobilidade urbana, moda, bem-estar, farmácias, educação e serviços essenciais reunidos em um único clube.",
  },
  {
    title: "+35.000 Marcas Parceiras",
    description:
      "As maiores redes do país e do mundo homologadas com vantagens reais e descontos diretos para associados ativos.",
  },
  {
    title: "Descontos em 150 Países",
    description:
      "Comodidades e benefícios internacionais que acompanham você pelo mundo com cobertura e tranquilidade garantidas.",
  },
  {
    title: "Economia Inteligente & Amplo Acesso",
    description:
      "Descontos contínuos no seu dia a dia que amortizam o valor da sua assinatura já nas primeiras utilizações.",
  },
]

export function PartnersMarquee(): React.JSX.Element {
  // Duplicating the list to provide seamless infinite looping
  const marqueePartners = [...partners, ...partners, ...partners, ...partners]

  return (
    <section
      id="parceiros"
      className="w-full py-16 md:py-24 bg-transparent text-zinc-900 dark:text-zinc-100 transition-colors overflow-hidden relative"
    >
      <div className="w-full px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="w-full relative"
        >
          {/* Small Top Tag */}
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#FF6847] fill-[#FF6847]" />
            <span className="text-xs font-black uppercase tracking-widest text-zinc-900 dark:text-zinc-200 font-heading">
              PARCERIAS & BENEFÍCIOS GLOBAIS
            </span>
          </div>

          {/* Main Headline */}
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-zinc-900 dark:text-white leading-[1.12] mb-5 font-heading">
            Grandes marcas,{" "}
            <span className="text-[#FF6847]">diversos descontos!</span>
          </h2>

          {/* Subtitle description */}
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-light leading-relaxed mb-10 max-w-4xl">
            A sua assinatura <strong className="font-semibold text-zinc-900 dark:text-white">Club Key</strong> expande seu poder de compra para muito além das hospedagens. Conectamos você às maiores marcas do país e do mundo para garantir economia real no seu cotidiano e em suas viagens.
          </p>

          {/* 4 Feature Checkpoints (Full width without cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-7 mb-10 w-full">
            {partnerHighlights.map((item, idx) => (
              <div key={idx} className="flex items-start gap-4">
                <div className="w-6 h-6 rounded-full bg-[#FF6847] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs shadow-[#FF6847]/25">
                  <Check className="w-3.5 h-3.5 stroke-[3.5]" />
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white mb-1">
                    {item.title}
                  </h4>
                  <p className="text-sm text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Pill CTA Button (Primary Orange) */}
          <div>
            <a
              href="https://clubkey.io/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#FF6847] hover:bg-[#E85535] text-white font-bold text-sm tracking-wide shadow-md hover:shadow-lg shadow-[#FF6847]/25 transition-all duration-200 cursor-pointer"
            >
              <span>Solicite agora</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Marquee Header / Ticker Label */}
      <div className="w-full px-6 md:px-12 mt-14 md:mt-18 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-2 w-2 rounded-full bg-[#FF6847] animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
            Marcas parceiras homologadas em destaque
          </span>
        </div>
      </div>

      {/* Infinite Logo Marquee (Full width, without cards, clean border tracks) */}
      <div className="relative w-full overflow-hidden py-6 border-y border-zinc-300/70 dark:border-zinc-800/80 bg-zinc-200/30 dark:bg-zinc-900/30">
        {/* Soft Edge Gradients */}
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
                <Image
                  src={partner.src}
                  alt={partner.name}
                  width={partner.width}
                  height={partner.height}
                  className={`object-contain transition-all duration-300 opacity-80 hover:opacity-100 ${
                    partner.invertInDark ? "dark:invert dark:brightness-125" : ""
                  } ${partner.className ?? "h-8 w-auto"}`}
                />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
