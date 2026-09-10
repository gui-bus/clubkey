"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Key,
  Sparkles,
  ShieldCheck,
  QrCode,
  Cpu,
  ArrowRight,
  Wifi,
  Layers,
  CheckCircle2,
} from "lucide-react"

import { Button } from "@/src/components/ui/button/button"

export function DigitalKeyCard(): React.JSX.Element {
  return (
    <section className="py-24 relative overflow-hidden bg-background">
      {/* Decorative ambient background */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: 3D Holographic VIP Key Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 flex justify-center"
          >
            <div className="relative group w-full max-w-md perspective-1000">
              {/* Glowing Aura under the card */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 rounded-[32px] blur-xl opacity-30 group-hover:opacity-70 transition duration-1000 group-hover:duration-200 animate-tilt" />

              {/* The Physical/Digital Card */}
              <div className="relative aspect-[1.586/1] rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-stone-900 via-stone-950 to-neutral-900 border border-amber-500/40 text-white shadow-2xl flex flex-col justify-between overflow-hidden">
                {/* Metallic holographic shimmer lines */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/20 via-transparent to-transparent pointer-events-none" />
                <div className="absolute -right-20 -bottom-20 w-60 h-60 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />

                {/* Card Top Row */}
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-2.5">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 to-yellow-400 flex items-center justify-center text-stone-950 shadow-md">
                      <Key className="w-5 h-5 stroke-[2.5]" />
                    </div>
                    <div>
                      <div className="text-lg font-black tracking-wider bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
                        ClubKey
                      </div>
                      <div className="text-[10px] tracking-widest text-stone-400 uppercase font-mono">
                        NFT ACCESS • VIP TIER
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-amber-400/80">
                    <Wifi className="w-5 h-5 rotate-90" />
                  </div>
                </div>

                {/* Card Center: EMV Chip & QR Code */}
                <div className="flex items-center justify-between my-auto relative z-10">
                  {/* EMV Chip Representation */}
                  <div className="w-12 h-9 rounded-lg bg-gradient-to-br from-amber-300 via-yellow-400 to-amber-600 border border-amber-200/50 flex flex-col justify-center px-1.5 shadow-inner">
                    <div className="h-0.5 bg-amber-800/40 rounded-full my-0.5" />
                    <div className="h-0.5 bg-amber-800/40 rounded-full my-0.5" />
                    <div className="h-0.5 bg-amber-800/40 rounded-full my-0.5" />
                  </div>

                  <div className="p-2 rounded-xl bg-white/10 backdrop-blur-md border border-white/20">
                    <QrCode className="w-9 h-9 text-amber-300" />
                  </div>
                </div>

                {/* Card Bottom Row: Member ID, Slogan & Ribus */}
                <div className="relative z-10 pt-2 border-t border-white/10 flex items-end justify-between">
                  <div>
                    <div className="text-[10px] text-stone-400 tracking-wider uppercase font-mono">
                      MEMBER PASSPORT
                    </div>
                    <div className="text-xs sm:text-sm font-mono tracking-widest text-amber-100 font-semibold">
                      CK-8942-VIP-2026
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-[11px] font-black tracking-widest text-amber-400 uppercase font-sans">
                      THINK UNLIMITED
                    </div>
                    <div className="text-[10px] text-stone-400 font-medium">
                      Private Club
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Narrative & Blockchain/Digital Pass Perks */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-6 space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-semibold">
              <Layers className="w-3.5 h-3.5" />
              NFT Access & Digital Passport
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-tight">
              NFT ACCESS Club Key <br />
              <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
                THINK UNLIMITED
              </span>
            </h2>

            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Mais do que uma assinatura de viagens: a Club Key é seu passaporte de acesso a um clube exclusivo de hospitalidade global com curadoria rigorosa.
            </p>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 mt-0.5">
                  <Key className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground">
                    Autenticação Digital Instantânea
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    Acesso direto à plataforma com sua chave digital, sem burocracias ou senhas complexas.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground">
                    Garantia & Propriedade do Benefício
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    Benefícios verificáveis e garantidos com tarifa preferencial de associado.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 mt-0.5">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-sm font-bold text-foreground">
                    Acesso a Lançamentos & Oportunidades
                  </div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    Prioridade no anúncio de novas propriedades, resorts parceiros e eventos fechados.
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <Link
                href="https://clubkey.io/subscription"
                target="_blank"
                rel="noreferrer"
              >
                <Button
                  size="lg"
                  radius="full"
                  className="bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-yellow-600 text-stone-950 font-bold shadow-lg shadow-amber-500/20 px-7 h-12"
                  endContent={<ArrowRight className="w-4 h-4 stroke-[2.5]" />}
                >
                  Adquirir Minha NFT Access
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
