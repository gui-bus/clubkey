"use client"

import * as React from "react"

import Image from "next/image"
import Link from "next/link"

import { motion } from "framer-motion"
import { ArrowRight, Calculator, ShieldCheck, Sparkles } from "lucide-react"

import { Button } from "@/src/components/ui/button/button"

import { cn } from "@/src/lib/utils/utils"

interface DestinationOption {
  id: string
  name: string
  state: string
  regularDaily: number
  clubKeyDaily: number
  image: string
}

const destinations: DestinationOption[] = [
  {
    id: "trancoso",
    name: "Trancoso",
    state: "Bahia",
    regularDaily: 2200,
    clubKeyDaily: 980,
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "noronha",
    name: "Fernando de Noronha",
    state: "Pernambuco",
    regularDaily: 3800,
    clubKeyDaily: 1590,
    image:
      "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "gramado",
    name: "Gramado",
    state: "Rio Grande do Sul",
    regularDaily: 1650,
    clubKeyDaily: 720,
    image:
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "angra",
    name: "Angra dos Reis",
    state: "Rio de Janeiro",
    regularDaily: 5200,
    clubKeyDaily: 2190,
    image:
      "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "paris",
    name: "Paris",
    state: "França",
    regularDaily: 4200,
    clubKeyDaily: 1790,
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=500&q=80",
  },
]

const nightOptions = [3, 5, 7, 10]

export function SavingsSimulator(): React.JSX.Element {
  const [selectedDest, setSelectedDest] = React.useState<DestinationOption>(
    destinations[0]
  )
  const [nights, setNights] = React.useState<number>(5)

  const regularTotal = selectedDest.regularDaily * nights
  const clubKeyTotal = selectedDest.clubKeyDaily * nights
  const totalSavings = regularTotal - clubKeyTotal
  const discountPercentage = Math.round((totalSavings / regularTotal) * 100)

  return (
    <section
      id="simulador"
      className="py-24 relative overflow-hidden bg-muted/20"
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
            <Calculator className="w-3.5 h-3.5" />
            Simulador Interativo de Economia
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground"
          >
            Calcule quanto você economiza com a{" "}
            <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
              Club Key
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-base sm:text-lg text-muted-foreground"
          >
            Compare o valor cobrado em plataformas públicas tradicionais contra
            o valor com desconto exclusivo de membro.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-card border border-border/80 shadow-xl flex flex-col justify-between"
          >
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                  1. Escolha o Destino
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {destinations.map((dest) => (
                    <button
                      key={dest.id}
                      type="button"
                      onClick={() => setSelectedDest(dest)}
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-2xl border text-left transition-all cursor-pointer",
                        selectedDest.id === dest.id
                          ? "bg-amber-500/10 border-amber-500 text-foreground ring-1 ring-amber-500/50"
                          : "bg-muted/40 border-border/60 hover:bg-muted text-muted-foreground hover:text-foreground"
                      )}
                    >
                      <Image
                        src={dest.image}
                        alt={dest.name}
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-xl object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-foreground truncate">
                          {dest.name}
                        </div>
                        <div className="text-[11px] text-muted-foreground truncate">
                          {dest.state}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground mb-3">
                  2. Quantidade de Noites
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {nightOptions.map((n) => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setNights(n)}
                      className={cn(
                        "py-3 rounded-xl border text-xs sm:text-sm font-bold transition-all cursor-pointer",
                        nights === n
                          ? "bg-amber-600 text-stone-950 border-amber-500 shadow-md shadow-amber-500/20"
                          : "bg-muted/40 border-border/60 text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      {n} Noites
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-border/40 mt-6 text-xs text-muted-foreground flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>
                Simulação baseada em tarifas médias de alta temporada
                pesquisadas em 2026.
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-card via-card to-amber-500/10 border border-amber-500/30 shadow-2xl flex flex-col justify-between relative overflow-hidden"
          >
            <div className="flex items-center justify-between mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                Resultado Comparativo
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 font-extrabold text-xs">
                Economia de {discountPercentage}%
              </span>
            </div>

            <div className="space-y-4 my-auto">
              <div className="p-4 rounded-2xl bg-background/80 border border-border/60 flex items-center justify-between">
                <div>
                  <div className="text-xs text-muted-foreground">
                    Plataformas Convencionais (OTAs):
                  </div>
                  <div className="text-sm font-medium text-foreground/80">
                    {nights} noites @ R${" "}
                    {selectedDest.regularDaily.toLocaleString("pt-BR")}/noite
                  </div>
                </div>
                <div className="text-lg font-bold text-muted-foreground line-through">
                  R$ {regularTotal.toLocaleString("pt-BR")}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/40 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    Com sua Club Key VIP:
                  </div>
                  <div className="text-sm font-medium text-foreground">
                    {nights} noites @ R${" "}
                    {selectedDest.clubKeyDaily.toLocaleString("pt-BR")}/noite
                  </div>
                </div>
                <div className="text-2xl font-black text-foreground">
                  R$ {clubKeyTotal.toLocaleString("pt-BR")}
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/40 text-center">
                <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  Dinheiro que fica no seu bolso:
                </div>
                <div className="text-3xl sm:text-4xl font-black text-emerald-600 dark:text-emerald-400 my-1">
                  R$ {totalSavings.toLocaleString("pt-BR")} OFF
                </div>
                <p className="text-xs text-muted-foreground">
                  Sua associação se paga integralmente logo na 1ª viagem!
                </p>
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-border/40">
              <Link
                href="https://clubkey.io/subscription"
                target="_blank"
                rel="noreferrer"
                className="w-full"
              >
                <Button
                  size="xl"
                  radius="full"
                  className="w-full bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-yellow-600 text-stone-950 font-bold shadow-xl shadow-amber-500/20 h-13"
                  endContent={<ArrowRight className="w-4 h-4 stroke-[2.5]" />}
                >
                  Garantir Esta Economia • Ativar Minha Key
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
