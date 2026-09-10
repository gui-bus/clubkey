"use client"

import * as React from "react"

import { AnimatePresence, motion } from "framer-motion"
import { ArrowRight, Minus, Plus } from "lucide-react"

const faqList = [
  {
    question: "O que é a Club Key?",
    answer:
      "A Club Key é um benefício para associados da ClubKey, com acesso a hospedagens selecionadas com condições especiais e até 60% off nas reservas last minute.",
  },
  {
    question: "Como eu utilizo minha Club Key para viajar?",
    answer:
      "É bem simples. Você acessa nossa collection, seleciona a acomodação que você deseja, com desconto de até 60% na modalidade de reserva last minute, paga o valor com desconto e sua reserva é confirmada na hora.",
  },
  {
    question: "A Club Key tem validade?",
    answer: "Sim, enquanto você for associado da Club Key.",
  },
  {
    question: "Quem é a Clubkey?",
    answer:
      "A Clubkey é a plataforma de tecnologia por onde você faz sua reserva para as acomodações do catálogo Club Key.",
  },
  {
    question: "Como funciona após a reserva?",
    answer:
      "Após a confirmação, você recebe os detalhes da acomodação e contato do anfitrião. Tudo feito com acompanhamento digital e suporte profissional.",
  },
]

export function FaqSection(): React.JSX.Element {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0)

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  return (
    <section
      id="faq"
      className="w-full py-20 md:py-28 bg-transparent text-zinc-900 dark:text-zinc-100 transition-colors overflow-hidden"
    >
      <div className="w-full px-6 md:px-12">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-20 w-full">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7 }}
            className="w-full lg:w-5/12 flex flex-col items-start text-left lg:sticky lg:top-32"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#FF6847]" />
              <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-heading">
                PERGUNTAS FREQUENTES
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight text-zinc-900 dark:text-white leading-[1.08] mb-6 font-heading">
              Dúvidas frequentes
            </h2>

            <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-light leading-relaxed mb-8">
              Encontre respostas claras e diretas sobre o funcionamento da Club
              Key, reservas de hospedagem e benefícios exclusivos.
            </p>

            <div>
              <a
                href="https://clubkey.io/subscription"
                target="_blank"
                rel="noreferrer"
                className="group relative inline-flex items-center justify-center px-8 py-4 overflow-hidden rounded-none bg-[#FF6847] text-white font-bold text-sm uppercase tracking-wider shadow-md cursor-pointer transition-all duration-300"
              >
                <span className="absolute inset-0 w-full h-full bg-white -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out" />
                <span className="relative z-10 inline-flex items-center text-white group-hover:text-zinc-950 transition-colors duration-300">
                  Solicite sua Key agora
                </span>
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="w-full lg:w-7/12 flex flex-col"
          >
            <div className="border-t border-zinc-300/80 dark:border-zinc-800">
              {faqList.map((item, index) => {
                const isOpen = openIndex === index

                return (
                  <div
                    key={index}
                    className="border-b border-zinc-300/80 dark:border-zinc-800 transition-colors"
                  >
                    <button
                      type="button"
                      onClick={() => toggleFaq(index)}
                      className="w-full py-6 sm:py-7 flex items-center justify-between text-left gap-6 group cursor-pointer focus:outline-none"
                      aria-expanded={isOpen}
                    >
                      <span className="text-lg sm:text-xl font-bold text-zinc-900 dark:text-white group-hover:text-[#FF6847] transition-colors leading-snug font-heading">
                        {item.question}
                      </span>

                      <div
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 transition-all duration-200 ${
                          isOpen
                            ? "bg-[#FF6847] text-white"
                            : "bg-zinc-200/80 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 group-hover:bg-[#FF6847]/10 group-hover:text-[#FF6847]"
                        }`}
                      >
                        {isOpen ? (
                          <Minus className="w-4 h-4 stroke-[2.5]" />
                        ) : (
                          <Plus className="w-4 h-4 stroke-[2.5]" />
                        )}
                      </div>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="content"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <p className="pb-7 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
                            {item.answer}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
