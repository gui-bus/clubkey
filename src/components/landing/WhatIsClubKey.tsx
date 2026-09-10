"use client"

import * as React from "react"

import Image from "next/image"
import Link from "next/link"

import { motion } from "framer-motion"
import { Key } from "lucide-react"

export function WhatIsClubKey(): React.JSX.Element {
  return (
    <section
      id="sobre-a-club-key"
      className="w-full py-16 md:py-24 bg-transparent text-zinc-900 dark:text-zinc-100 transition-colors overflow-hidden relative"
    >
      <span id="o-que-e" className="sr-only" />
      <div className="w-full px-6 md:px-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20 w-full">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7 }}
            className="w-full lg:w-1/2 relative flex items-center justify-center"
          >
            <div className="relative w-full max-w-[520px] sm:max-w-[580px] h-[500px] sm:h-[560px] md:h-[620px]">
              <div className="group absolute top-3 left-3 sm:top-5 sm:left-5 w-[65%] h-[80%] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl -rotate-6 bg-zinc-200 dark:bg-zinc-800">
                <Image
                  src="/utils/banners/img_02.png"
                  alt="Hospedagens e resorts exclusivos da Club Key"
                  fill
                  sizes="(max-width: 768px) 65vw, 420px"
                  className="object-cover"
                  priority
                />
              </div>

              <div className="group absolute bottom-3 right-3 sm:bottom-5 sm:right-5 w-[67%] h-[84%] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl rotate-3 bg-zinc-200 dark:bg-zinc-800 z-10">
                <Image
                  src="/utils/banners/img_03.png"
                  alt="Experiência de hospitalidade premium Club Key"
                  fill
                  sizes="(max-width: 768px) 70vw, 440px"
                  className="object-cover"
                  priority
                />
              </div>

              <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 z-20 w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full bg-[#FF6847] text-white flex items-center justify-center shadow-2xl shadow-[#FF6847]/30 select-none">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    repeat: Infinity,
                    duration: 18,
                    ease: "linear",
                  }}
                  className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none"
                >
                  <svg viewBox="0 0 120 120" className="w-full h-full p-2">
                    <path
                      id="circlePath"
                      d="M 60, 60 m -44, 0 a 44,44 0 1,1 88,0 a 44,44 0 1,1 -88,0"
                      fill="none"
                    />
                    <text className="text-[7.5px] sm:text-[8px] font-black uppercase fill-white">
                      <textPath
                        href="#circlePath"
                        startOffset="0%"
                        textLength="276"
                        lengthAdjust="spacing"
                      >
                         CLUBE EXCLUSIVO ★ ASSOCIE-SE AGORA ★
                      </textPath>
                    </text>
                  </svg>
                </motion.div>

                <div className="relative z-10 w-13 h-13 sm:w-20 sm:h-20 rounded-full bg-white dark:bg-zinc-950 text-[#FF6847] flex items-center justify-center shadow-md">
                  <Key className="w-6 h-6 sm:w-7 sm:h-7 stroke-[2.3]" />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="w-full lg:w-2/3 flex flex-col justify-center items-start text-left"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#FF6847]" />
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-heading">
                SOBRE A CLUB KEY
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-zinc-900 dark:text-white leading-[1.08] mb-6 font-heading uppercase">
              Viva a excelência em hospitalidade com a Club Key
            </h2>

            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-light leading-relaxed mb-8">
              A{" "}
              <strong className="font-semibold text-zinc-900 dark:text-white">
                Club Key
              </strong>{" "}
              é o passaporte definitivo para quem busca hospedagens
              extraordinárias com tarifas preferenciais, reservas flexíveis e
              descontos reais de até 60%. Desfrute de experiências pensadas para
              associados que valorizam privacidade, sofisticação e conforto.
            </p>

            <div className="flex items-start gap-4 mb-6">
              <div className="relative w-16 h-16 shrink-0 mt-0.5 select-none pointer-events-none">
                <Image
                  src="/utils/icons/check.webp"
                  alt="Check"
                  width={50}
                  height={50}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white mb-1">
                  Nossas Hospedagens de Alto Padrão
                </h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
                  Portfólio selecionado com mais de 4.500 vilas, resorts
                  premiados e hotéis boutique nos destinos mais cobiçados do
                  mundo.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 mb-8">
              <div className="relative w-16 h-16 shrink-0 mt-0.5 select-none pointer-events-none">
                <Image
                  src="/utils/icons/check.webp"
                  alt="Check"
                  width={50}
                  height={50}
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-white mb-1">
                  Uma Comunidade Exclusiva de Membros
                </h4>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
                  Vantagens ativas em mais de 35.000 marcas parceiras em 150
                  países, suporte concierge dedicado e ausência de tarifas
                  abusivas.
                </p>
              </div>
            </div>

            <div>
              <Link
                href="https://clubkey.io/subscription"
                target="_blank"
                rel="noreferrer"
                className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden rounded-none bg-[#FF6847] text-white font-bold text-sm uppercase tracking-wider shadow-md cursor-pointer transition-all duration-300"
              >
                <span className="absolute inset-0 w-full h-full bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
                <span className="relative z-10 inline-flex items-center text-white group-hover:text-zinc-950 transition-colors duration-300">
                  Conheça a Club Key
                </span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
