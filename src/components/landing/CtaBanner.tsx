"use client"

import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Key, Sparkles, ArrowRight, ShieldCheck, CheckCircle2 } from "lucide-react"

import { Button } from "@/src/components/ui/button/button"

export function CtaBanner(): React.JSX.Element {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl p-8 sm:p-14 md:p-16 bg-gradient-to-br from-stone-900 via-stone-950 to-neutral-950 border border-amber-500/40 text-white shadow-2xl overflow-hidden text-center"
        >
          {/* Ambient Glows */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Content */}
          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5" />
              Sua Próxima Viagem Começa Aqui
            </div>

            <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight">
              Pronto para viajar com o padrão{" "}
              <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
                ClubKey?
              </span>
            </h2>

            <p className="text-stone-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Ative sua Key hoje mesmo, desbloqueie até <strong className="text-white font-bold">60% de desconto</strong> em milhares de hotéis e resorts de alto padrão e aproveite benefícios em 150 países.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="https://clubkey.io/subscription"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto"
              >
                <Button
                  size="xl"
                  radius="full"
                  className="w-full sm:w-auto bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 hover:from-amber-600 hover:to-yellow-500 text-stone-950 font-black shadow-xl shadow-amber-500/30 px-9 h-14 text-base"
                  startContent={<Key className="w-5 h-5 stroke-[2.5] text-stone-950" />}
                  endContent={<ArrowRight className="w-4 h-4 stroke-[2.5]" />}
                >
                  Solicite sua Club Key Agora
                </Button>
              </Link>

              <Link
                href="https://clubkey.io/rooms"
                target="_blank"
                rel="noreferrer"
                className="w-full sm:w-auto"
              >
                <Button
                  size="xl"
                  variant="bordered"
                  radius="full"
                  className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 font-bold px-8 h-14 text-base"
                >
                  Explorar Acomodações
                </Button>
              </Link>
            </div>

            <div className="pt-6 flex flex-wrap items-center justify-center gap-6 text-xs text-stone-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                Ativação 100% digital
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                Garantia de menor tarifa
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                Clube Privado de Viagens
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
