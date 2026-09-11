"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { Check } from "lucide-react"

import { Container } from "@/src/components/common/container"
import { CtaButton } from "@/src/components/common/ctaButton"

const steps = [
  {
    number: "01",
    title: "Ative sua Club Key",
    description:
      "Ativação 100% digital, ágil e exclusiva para associados da Club Key.",
  },
  {
    number: "02",
    title: "Acesse o Catálogo Club Key",
    description:
      "Descubra hospedagens com curadoria rigorosa nos destinos mais celebrados do mundo.",
  },
  {
    number: "03",
    title: "Reserve com até 60% OFF",
    description:
      "Descontos last minute reais, comparados diretamente com as principais plataformas do mercado.",
  },
]

const catalogFeatures = [
  "Curadoria rigorosa de qualidade avaliando privacidade, conforto e localização.",
  "Tarifas preferenciais e descontos last minute de até 60% sem taxas ocultas.",
  "Benefícios reais de membro com flexibilidade e suporte dedicado.",
] as const

export function HowItWorksCatalog(): React.JSX.Element {
  return (
    <section
      id="como-funciona"
      className="w-full py-20 md:py-28 bg-transparent text-zinc-900 dark:text-zinc-100 transition-colors overflow-hidden"
    >
      <Container>
        <div className="mb-20 md:mb-28">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6 }}
            className="mb-14 md:mb-16"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-brand-primary" />
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-heading">
                PASSO A PASSO
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-zinc-900 dark:text-white leading-[1.08] font-heading">
              Como funciona?
            </h2>

            <p className="mt-4 text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
              Três passos simples para desbloquear tarifas de membro e
              economizar nas suas próximas hospedagens.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14 pt-8 border-t border-zinc-300/80 dark:border-zinc-800 w-full">
            {steps.map((item, idx) => (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="flex flex-col items-start"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl sm:text-3xl font-black text-brand-primary font-heading tracking-tight">
                    {item.number}
                  </span>
                  <span className="w-8 h-px bg-zinc-300 dark:bg-zinc-700" />
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white mb-3 font-heading leading-snug">
                  {item.title}
                </h3>

                <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="w-full border-t border-zinc-300/80 dark:border-zinc-800 my-16 md:my-24" />

        <motion.div
          id="catalogo"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start w-full"
        >
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-brand-primary" />
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-heading">
                NOSSO CATÁLOGO SELECIONADO
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-zinc-900 dark:text-white leading-[1.08] mb-6 font-heading">
              Hospede-se em imóveis de alto padrão selecionados com a curadoria
              de especialistas e até 60% off
            </h2>

            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-light leading-relaxed mb-8">
              Seleção curada com vantagens exclusivas para associados. Nossos
              curadores selecionam acomodações com experiência e de alto padrão,
              para que você tenha experiências incríveis e com economia real.
            </p>

            <div>
              <CtaButton
                href="/rooms"
                size="lg"
              >
                Explorar catálogo
              </CtaButton>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-start pt-2 lg:pt-8">
            <div className="mb-8">
              <span className="text-6xl sm:text-7xl lg:text-8xl font-black tracking-tight text-zinc-900 dark:text-white font-heading block leading-none mb-3">
                +4.500
              </span>
              <span className="text-base sm:text-lg font-bold text-zinc-800 dark:text-zinc-200 block">
                Acomodações selecionadas no mundo todo
              </span>
            </div>

            <div className="flex flex-col gap-4">
              {catalogFeatures.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3.5">
                  <div className="w-6 h-6 rounded-full bg-brand-primary text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs shadow-brand-primary/25">
                    <Check className="w-3.5 h-3.5 stroke-[3.5]" />
                  </div>
                  <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
                    {feature}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </Container>
    </section>
  )
}
