"use client"

import * as React from "react"

import { AnimatePresence, motion } from "framer-motion"

import { Container } from "@/src/components/common/container"

interface FaqItem {
  id: string
  category: string
  question: string
  answer: string
  highlight: string
}

const faqList: FaqItem[] = [
  {
    id: "01",
    category: "BENEFÍCIOS & ACESSO",
    question: "O que é a Club Key?",
    answer:
      "A Club Key é um benefício para associados da ClubKey, com acesso a hospedagens selecionadas com condições especiais e até 60% off nas reservas last minute.",
    highlight: "Tarifas preferenciais e até 60% off nas reservas last minute.",
  },
  {
    id: "02",
    category: "COMO RESERVAR",
    question: "Como eu utilizo minha Club Key para viajar?",
    answer:
      "É bem simples. Você acessa nossa collection, seleciona a acomodação que você deseja, com desconto de até 60% na modalidade de reserva last minute, paga o valor com desconto e sua reserva é confirmada na hora.",
    highlight: "Confirmação instantânea diretamente na plataforma.",
  },
  {
    id: "03",
    category: "VIGÊNCIA DO ACESSO",
    question: "A Club Key tem validade?",
    answer: "Sim, enquanto você for associado da Club Key.",
    highlight: "Acesso ininterrupto garantido durante toda a associação.",
  },
  {
    id: "04",
    category: "SOBRE A PLATAFORMA",
    question: "Quem é a Clubkey?",
    answer:
      "A Clubkey é a plataforma de tecnologia por onde você faz sua reserva para as acomodações do catálogo Club Key.",
    highlight: "Tecnologia própria desenvolvida para simplificar sua viagem.",
  },
  {
    id: "05",
    category: "EXPERIÊNCIA PÓS-RESERVA",
    question: "Como funciona após a reserva?",
    answer:
      "Após a confirmação, você recebe os detalhes da acomodação e contato do anfitrião. Tudo feito com acompanhamento digital e suporte profissional.",
    highlight: "Acompanhamento digital completo e suporte profissional.",
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
      <Container>
        <div className="w-full border-t border-b border-zinc-300 dark:border-zinc-800 py-3.5 flex flex-wrap items-center justify-between gap-4 text-xs font-mono uppercase tracking-widest text-zinc-500 dark:text-zinc-400 mb-12 sm:mb-16">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-primary" />
            <span>FAQ • CENTRAL DE ESCLARECIMENTOS</span>
          </div>
          <div className="hidden md:block">
            TRANSPARÊNCIA TOTAL • RESERVAS ATÉ 60% OFF
          </div>
          <div className="font-bold text-zinc-900 dark:text-white">
            05 QUESTÕES ESSENCIAIS
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14 sm:mb-18">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 font-heading mb-3 block">
              DÚVIDAS FREQUENTES
            </span>
            <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-zinc-900 dark:text-white leading-[1.05] font-heading">
              TUDO O QUE VOCÊ PRECISA SABER SOBRE A CLUBKEY
            </h2>
          </div>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 font-light max-w-md leading-relaxed">
            Respostas diretas sobre o funcionamento do clube, catálogo
            exclusivo, confirmação imediata e acompanhamento de ponta a ponta.
          </p>
        </div>

        <div className="w-full border-t border-zinc-300 dark:border-zinc-800">
          {faqList.map((item, index) => {
            const isOpen = openIndex === index

            return (
              <div
                key={item.id}
                className={`w-full border-b border-zinc-300 dark:border-zinc-800 transition-colors duration-200 ${
                  isOpen
                    ? "bg-zinc-200/40 dark:bg-zinc-900/40"
                    : "hover:bg-zinc-200/20 dark:hover:bg-zinc-900/20"
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full py-7 sm:py-9 px-2 sm:px-4 flex flex-col md:flex-row md:items-center justify-between gap-6 text-left group cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start sm:items-center gap-4 sm:gap-6 lg:gap-8 flex-1">
                    <span className="font-mono text-sm sm:text-base font-bold text-zinc-400 dark:text-zinc-500 tracking-wider shrink-0 pt-0.5 sm:pt-0 w-8 sm:w-10">
                      /{item.id}
                    </span>
                    <span className="hidden sm:inline-flex items-center justify-center w-48 lg:w-52 py-1 px-2 text-[10px] font-mono uppercase tracking-wider border border-zinc-300 dark:border-zinc-800 text-zinc-500 dark:text-zinc-400 shrink-0 text-center">
                      {item.category}
                    </span>
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-tight text-zinc-900 dark:text-white group-hover:text-brand-primary transition-colors leading-snug font-heading flex-1">
                      {item.question}
                    </h3>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 pl-8 sm:pl-0">
                    <span className="sm:hidden text-[10px] font-mono uppercase tracking-wider text-zinc-400">
                      {item.category}
                    </span>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono uppercase tracking-widest hidden sm:inline text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                        {isOpen ? "FECHAR" : "EXPANDIR"}
                      </span>
                      <div
                        className={`w-9 h-9 border flex items-center justify-center transition-all duration-300 ${
                          isOpen
                            ? "border-brand-primary bg-brand-primary text-white rotate-45"
                            : "border-zinc-300 dark:border-zinc-700 bg-transparent text-zinc-700 dark:text-zinc-300 group-hover:border-zinc-900 dark:group-hover:border-white"
                        }`}
                      >
                        <span className="text-base font-mono leading-none select-none">
                          +
                        </span>
                      </div>
                    </div>
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-2 sm:px-4 pb-9 sm:pb-12 pt-2">
                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 lg:gap-8">
                          <div className="hidden sm:block sm:w-10 shrink-0" />
                          <div className="hidden sm:block w-48 lg:w-52 shrink-0" />
                          <div className="flex-1 pl-4 sm:pl-6 border-l-2 border-brand-primary flex flex-col lg:flex-row lg:items-start justify-between gap-6 lg:gap-12">
                            <div className="max-w-3xl">
                              <p className="text-base sm:text-xl md:text-2xl font-light text-zinc-700 dark:text-zinc-200 leading-relaxed">
                                {item.answer}
                              </p>
                            </div>
                            <div className="lg:max-w-xs shrink-0 bg-white/60 dark:bg-zinc-950/60 p-4 border border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-500 dark:text-zinc-400">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-brand-primary block mb-1">
                                [ DESTAQUE ]
                              </span>
                              {item.highlight}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
