"use client"

import * as React from "react"

import Image from "next/image"

import { motion } from "framer-motion"
import { CheckCircle2, Star } from "lucide-react"

const testimonials = [
  {
    name: "Rodrigo Mendonça",
    role: "Empresário • Membro desde 2025",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    destination: "Trancoso, BA",
    savings: "R$ 4.800 economizados",
    comment:
      "A economia na nossa viagem em família para Trancoso pagou a anuidade com folga logo na primeira reserva. O processo de reserva foi impecável e o atendimento de alto padrão.",
  },
  {
    name: "Carolina Vasconcellos",
    role: "Arquiteta • Membro VIP",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    destination: "Gramado, RS",
    savings: "R$ 3.200 economizados",
    comment:
      "A curadoria é realmente o ponto alto. As opções não são apenas mais baratas, são imóveis de extremo bom gosto e com uma experiência completa de hospitalidade.",
  },
  {
    name: "Marcelo Albuquerque",
    role: "Investidor • Membro VIP",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    rating: 5,
    destination: "Fernando de Noronha, PE",
    savings: "R$ 6.100 economizados",
    comment:
      "Tornar-se associado da Club Key foi a melhor decisão. Consegui tarifa de última hora em Noronha que era impossível em outros sites.",
  },
]

export function Testimonials(): React.JSX.Element {
  return (
    <section className="py-24 relative overflow-hidden bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-semibold mb-4"
          >
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            Experiências de Quem Já Viaja com a Key
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground"
          >
            Aprovado por quem exige o{" "}
            <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-yellow-500 bg-clip-text text-transparent">
              melhor padrão
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-base sm:text-lg text-muted-foreground"
          >
            Veja o que nossos associados dizem sobre a facilidade, curadoria e
            economia real em suas viagens.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item, idx) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              className="p-8 rounded-3xl bg-card border border-border/70 hover:border-amber-500/40 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-amber-500 text-amber-500 stroke-[1]"
                      />
                    ))}
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-xs">
                    {item.savings}
                  </span>
                </div>

                <p className="text-sm sm:text-base text-foreground/90 leading-relaxed italic mb-6">
                  &ldquo;{item.comment}&rdquo;
                </p>
              </div>

              <div className="pt-6 border-t border-border/50 flex items-center gap-3.5">
                <Image
                  src={item.avatar}
                  alt={item.name}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover border-2 border-amber-500/30"
                />
                <div>
                  <div className="text-sm font-bold text-foreground flex items-center gap-1.5">
                    {item.name}
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 fill-amber-500/20" />
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {item.role} •{" "}
                    <span className="text-amber-600 dark:text-amber-400 font-medium">
                      {item.destination}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
