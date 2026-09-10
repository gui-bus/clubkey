"use client"

import * as React from "react"

import Link from "next/link"

import { motion } from "framer-motion"
import {
  ArrowRight,
  Car,
  Globe2,
  Plane,
  ShieldCheck,
  ShoppingBag,
  Ticket,
  Utensils,
} from "lucide-react"

import { Button } from "@/src/components/ui/button/button"

const segments = [
  {
    icon: Utensils,
    title: "Gastronomia & Vinhos",
    description:
      "Descontos especiais em restaurantes premiados, bistrôs e cartas de vinhos exclusivas.",
    perk: "Até 30% OFF",
  },
  {
    icon: Car,
    title: "Locação de Veículos",
    description:
      "Tarifas corporativas com as principais locadoras do Brasil e do mundo (Movida, Localiza, Hertz, Avis).",
    perk: "Até 40% OFF",
  },
  {
    icon: Plane,
    title: "Salas VIP & Experiências",
    description:
      "Acesso a lounges em aeroportos internacionais e experiências personalizadas de viagem.",
    perk: "Acesso VIP",
  },
  {
    icon: ShoppingBag,
    title: "Moda, Beleza & Lifestyle",
    description:
      "Parcerias com marcas premium de varejo, tecnologia e artigos de viagem.",
    perk: "Cashback & Descontos",
  },
  {
    icon: Ticket,
    title: "Entretenimento & Lazer",
    description:
      "Ingressos para parques temáticos, shows, espetáculos e passeios náuticos.",
    perk: "Tarifas Membro",
  },
  {
    icon: ShieldCheck,
    title: "Seguro & Assistência Global",
    description:
      "Condições diferenciadas para seguros de viagem e assistência médica internacional.",
    perk: "Proteção Total",
  },
]

const brandNames = [
  "Localiza",
  "Movida",
  "Hertz",
  "Avis",
  "Hilton",
  "Marriott",
  "Fasano",
  "Sheraton",
  "Accor",
  "Emirates Lounge",
  "Mastercard Black",
  "Visa Infinite",
  "Apple",
  "Samsonite",
  "Nespresso",
]

export function GlobalBrands(): React.JSX.Element {
  return (
    <section
      id="beneficios"
      className="py-24 relative overflow-hidden bg-card/60"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-semibold mb-4"
          >
            <Globe2 className="w-3.5 h-3.5" />
            Ecossistema Global de Vantagens
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground uppercase"
          >
            Grandes Marcas,{" "}
            <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
              Diversos Descontos!
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-base sm:text-lg text-muted-foreground"
          >
            Sua Club Key não se limita a hotéis: ela abre portas para mais de
            35.000 marcas parceiras em mais de 150 países ao redor do mundo.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-14 overflow-hidden py-4 border-y border-border/50 bg-background/50 rounded-2xl backdrop-blur-sm"
        >
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 px-4 text-muted-foreground font-semibold text-sm sm:text-base">
            {brandNames.map((name) => (
              <span
                key={name}
                className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors tracking-tight"
              >
                {name}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {segments.map((seg, idx) => (
            <motion.div
              key={seg.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="p-6 rounded-3xl bg-background border border-border/70 hover:border-amber-500/40 hover:shadow-xl hover:shadow-amber-500/5 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 group-hover:scale-110 transition-transform">
                    <seg.icon className="w-6 h-6 stroke-[2]" />
                  </div>
                  <span className="px-2.5 py-1 text-xs font-bold rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    {seg.perk}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  {seg.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {seg.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-14 p-8 rounded-3xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-xl font-bold text-foreground">
              Economia inteligente e amplo acesso em um só passe
            </h4>
            <p className="text-sm text-muted-foreground">
              Garanta benefícios que se pagam já na primeira viagem ou compra
              parceira.
            </p>
          </div>

          <Link
            href="https://clubkey.io/subscription"
            target="_blank"
            rel="noreferrer"
            className="shrink-0"
          >
            <Button
              size="lg"
              radius="full"
              className="bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-yellow-600 text-stone-950 font-bold shadow-lg shadow-amber-500/20 px-7 h-12"
              endContent={<ArrowRight className="w-4 h-4 stroke-[2.5]" />}
            >
              Solicite Agora
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
