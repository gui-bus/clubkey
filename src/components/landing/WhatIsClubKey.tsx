"use client"

import * as React from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Check, ArrowRight, Key, Sparkles } from "lucide-react"

export function WhatIsClubKey(): React.JSX.Element {
  return (
    <section
      id="o-que-e"
      className="w-full py-16 md:py-24 bg-transparent text-zinc-900 dark:text-zinc-100 transition-colors overflow-hidden relative flex flex-col items-center justify-center"
    >
      <div className="w-full max-w-6xl mx-auto px-6 md:px-12 flex flex-col items-center justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center justify-center w-full">
          {/* Left Column: Overlapping Tilted Cards & Circular Badge */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 relative flex items-center justify-center"
          >
            <div className="relative w-full max-w-[460px] sm:max-w-[490px] h-[460px] sm:h-[520px] md:h-[550px]">
              {/* Back Card (Static Tilt Left, Center-Out Shimmer on Hover) */}
              <div className="group absolute top-2 left-2 sm:top-4 sm:left-4 w-[64%] h-[78%] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl -rotate-6 bg-zinc-200 dark:bg-zinc-800">
                <Image
                  src="/utils/banners/img_02.png"
                  alt="Hospedagens e resorts exclusivos da Club Key"
                  fill
                  sizes="(max-width: 768px) 60vw, 320px"
                  className="object-cover"
                  priority
                />

                {/* Shimmer effect starting from center and expanding to left and right */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {/* Left-moving shimmer beam from center */}
                  <div className="absolute inset-y-0 right-1/2 w-[120%] bg-gradient-to-l from-white/45 via-white/15 to-transparent -skew-x-12 translate-x-full group-hover:-translate-x-full transition-transform duration-1000 ease-out" />
                  {/* Right-moving shimmer beam from center */}
                  <div className="absolute inset-y-0 left-1/2 w-[120%] bg-gradient-to-r from-white/45 via-white/15 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                </div>
              </div>

              {/* Front Card (Static Tilt Right, Thick Border, Center-Out Shimmer on Hover) */}
              <div className="group absolute bottom-2 right-2 sm:bottom-4 sm:right-4 w-[66%] h-[82%] rounded-2xl sm:rounded-3xl overflow-hidden border-[6px] sm:border-[8px] border-white dark:border-zinc-800 shadow-2xl rotate-3 bg-zinc-200 dark:bg-zinc-800 z-10">
                <Image
                  src="/utils/banners/img_03.png"
                  alt="Experiência de hospitalidade premium Club Key"
                  fill
                  sizes="(max-width: 768px) 65vw, 350px"
                  className="object-cover"
                  priority
                />

                {/* Shimmer effect starting from center and expanding to left and right */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {/* Left-moving shimmer beam from center */}
                  <div className="absolute inset-y-0 right-1/2 w-[120%] bg-gradient-to-l from-white/45 via-white/15 to-transparent -skew-x-12 translate-x-full group-hover:-translate-x-full transition-transform duration-1000 ease-out" />
                  {/* Right-moving shimmer beam from center */}
                  <div className="absolute inset-y-0 left-1/2 w-[120%] bg-gradient-to-r from-white/45 via-white/15 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />
                </div>
              </div>

              {/* Circular Rotating Stamp Badge in 100% Portuguese */}
              <div className="absolute -bottom-3 -left-3 sm:-bottom-5 sm:-left-5 z-20 w-28 h-28 sm:w-34 sm:h-34 md:w-36 md:h-36 rounded-full bg-[#FF6847] text-white flex items-center justify-center shadow-2xl shadow-[#FF6847]/30 select-none">
                {/* Rotating curved Portuguese text around perimeter */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
                  className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none"
                >
                  <svg viewBox="0 0 120 120" className="w-full h-full p-2">
                    <path
                      id="circlePath"
                      d="M 60, 60 m -42, 0 a 42,42 0 1,1 84,0 a 42,42 0 1,1 -84,0"
                      fill="none"
                    />
                    <text className="text-[9.5px] font-black uppercase tracking-[2.4px] fill-white">
                      <textPath href="#circlePath" startOffset="0%">
                        ★ CLUBE EXCLUSIVO ★ ASSOCIE-SE AGORA
                      </textPath>
                    </text>
                  </svg>
                </motion.div>

                {/* Inner center circle with Key icon */}
                <div className="relative z-10 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-zinc-950 text-[#FF6847] flex items-center justify-center shadow-md">
                  <Key className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.3]" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Text, Feature Checkpoints & Pill Button */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-6 flex flex-col justify-center items-start text-left"
          >
            {/* Small Top Tag */}
            <div className="inline-flex items-center gap-2 mb-4">
              <Sparkles className="w-3.5 h-3.5 text-[#FF6847] fill-[#FF6847]" />
              <span className="text-xs font-black uppercase tracking-widest text-zinc-900 dark:text-zinc-200 font-heading">
                SOBRE A CLUB KEY
              </span>
            </div>

            {/* Main Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-white leading-[1.12] mb-5 font-heading">
              Viva a excelência em hospitalidade com a Club Key
            </h2>

            {/* Subtitle description */}
            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-light leading-relaxed mb-8">
              A <strong className="font-semibold text-zinc-900 dark:text-white">Club Key</strong> é o passaporte definitivo para quem busca hospedagens extraordinárias com tarifas preferenciais, reservas flexíveis e descontos reais de até <strong className="font-bold text-[#FF6847]">60%</strong>. Desfrute de experiências pensadas para associados que valorizam privacidade, sofisticação e conforto.
            </p>

            {/* Feature Checkpoint 1 */}
            <div className="flex items-start gap-4 mb-6">
              <div className="w-6 h-6 rounded-full bg-[#FF6847] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs shadow-[#FF6847]/25">
                <Check className="w-3.5 h-3.5 stroke-[3.5]" />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white mb-1">
                  Nossas Hospedagens de Alto Padrão
                </h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
                  Portfólio selecionado com mais de 4.500 vilas, resorts premiados e hotéis boutique nos destinos mais cobiçados do mundo.
                </p>
              </div>
            </div>

            {/* Feature Checkpoint 2 */}
            <div className="flex items-start gap-4 mb-8">
              <div className="w-6 h-6 rounded-full bg-[#FF6847] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs shadow-[#FF6847]/25">
                <Check className="w-3.5 h-3.5 stroke-[3.5]" />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white mb-1">
                  Uma Comunidade Exclusiva de Membros
                </h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
                  Vantagens ativas em mais de 35.000 marcas parceiras em 150 países, suporte concierge dedicado e ausência de tarifas abusivas.
                </p>
              </div>
            </div>

            {/* Pill CTA Button (Primary Orange) */}
            <div>
              <a
                href="https://clubkey.io/subscription"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#FF6847] hover:bg-[#E85535] text-white font-bold text-sm tracking-wide shadow-md hover:shadow-lg shadow-[#FF6847]/25 transition-all duration-200 cursor-pointer"
              >
                <span>Conheça a Club Key</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
