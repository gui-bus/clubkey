"use client"

import * as React from "react"

import Image from "next/image"

import { motion } from "framer-motion"

import { Container } from "@/src/components/common/container"
import { CtaButton } from "@/src/components/common/ctaButton"

import { brandConfig } from "@/src/config/brand.config"

export function Hero(): React.JSX.Element {
  return (
    <section
      id="hero"
      className="relative z-30 w-full overflow-hidden bg-[#161616] text-white min-h-[680px] sm:min-h-[580px] md:min-h-[640px] flex flex-col justify-center [clip-path:polygon(0_0,100%_0,100%_100%,50%_calc(100%-3rem),0_100%)]"
    >
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
        <Image
          src="/utils/banners/img_01.png"
          alt={`${brandConfig.name} Background`}
          fill
          priority
          className="object-cover object-top"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-[#161616]/85 via-[#161616]/65 to-[#161616]/95 z-10" />
      </div>

      {brandConfig.id === "viverde" ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
          className="absolute right-0 bottom-0 sm:bottom-1 md:bottom-2 w-[clamp(240px,44vw,620px)] pointer-events-none select-none z-10 opacity-100 flex justify-end"
        >
          <Image
            src={
              brandConfig.assets.iconCream ||
              brandConfig.assets.iconWhite ||
              "/logos/viverde/icon_cream.svg"
            }
            alt=""
            width={620}
            height={210}
            className="w-full h-auto object-contain object-right"
            priority
          />
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          aria-hidden="true"
          className="absolute right-0 bottom-0 sm:bottom-1 md:bottom-2 w-[clamp(200px,36vw,500px)] pointer-events-none select-none z-10 opacity-60 flex justify-end"
        >
          <div className="w-full aspect-[758/389] relative flex items-center justify-center">
            <Image
              src={
                brandConfig.assets.iconWhite ||
                brandConfig.assets.iconDark ||
                "/logos/icon_white.svg"
              }
              alt=""
              width={389}
              height={758}
              className="w-auto h-full max-w-none object-contain rotate-90"
              priority
            />
          </div>
        </motion.div>
      )}

      <Container className="relative z-20 pt-36 pb-36 sm:pt-40 sm:pb-28 md:pt-44 md:pb-32 flex-1 flex items-center">
        <div className="flex items-center gap-6 sm:gap-8 lg:gap-12 max-w-5xl sm:ml-6 md:ml-12 lg:ml-20 xl:ml-28">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="relative hidden sm:flex shrink-0 w-20 md:w-24 lg:w-28 self-stretch items-center justify-center drop-shadow-2xl"
          >
            <div className="w-[280px] sm:w-[320px] md:w-[360px] lg:w-[390px] h-20 sm:h-24 md:h-28 lg:h-32 -rotate-90 shrink-0 relative">
              <Image
                src="/utils/icons/icon_key.webp"
                alt={`${brandConfig.name} VIP Key`}
                fill
                priority
                className="object-contain"
                sizes="(max-width: 768px) 96px, 120px"
              />
            </div>
          </motion.div>

          <div className="flex-1 flex flex-col items-start">
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
                variant="primary"
                size="lg"
                className="w-full sm:w-auto"
              >
                Solicite agora
              </CtaButton>

              <CtaButton
                href="/hospedagens"
                variant="dark-outline"
                size="lg"
                className="w-full sm:w-auto"
              >
                <span>Explorar Catálogo (+4.500)</span>
              </CtaButton>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  )
}
