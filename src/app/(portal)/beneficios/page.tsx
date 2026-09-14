"use client"

import * as React from "react"
import Link from "next/link"
import { Building2, ArrowRight } from "lucide-react"

import { BENEFITS } from "@/src/data/portalData"
import { BenefitCard } from "@/src/components/portal/BenefitCard"

const CATEGORIES = [
  "Todos",
  "Saúde",
  "Educação",
  "Viagem",
  "Gastronomia",
  "Mobilidade",
  "Serviços"
]

export default function BenefitsPage(): React.JSX.Element {
  const [activeCategory, setActiveCategory] = React.useState("Todos")

  const filteredBenefits = React.useMemo(() => {
    if (activeCategory === "Todos") return BENEFITS
    return BENEFITS.filter((b) => b.category === activeCategory)
  }, [activeCategory])

  return (
    <div className="space-y-8">
      <div>
        <span className="text-xs font-black uppercase tracking-widest text-brand-primary block mb-1">
          Parcerias Exclusivas
        </span>
        <h1 className="text-3xl sm:text-4xl font-heading font-black tracking-tight uppercase text-zinc-900 dark:text-white">
          Vantagens de ser membro
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Condições e cortesias exclusivas com hospitais, faculdades, aviação e gastronomia
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-sm text-xs transition-all cursor-pointer ${
              activeCategory === cat
                ? "bg-brand-primary text-white font-black uppercase tracking-wider shadow-xs"
                : "bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 font-bold hover:text-zinc-900 dark:hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="relative rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] p-6 sm:p-8 overflow-hidden shadow-xs">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 flex-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-sm text-xs font-black uppercase tracking-wider bg-zinc-100 dark:bg-zinc-900 text-brand-primary border border-zinc-200 dark:border-zinc-800">
              <Building2 className="w-3.5 h-3.5" />
              Travel Club
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-black tracking-tight uppercase text-zinc-900 dark:text-white">
              Hospedagens com tarifa de membro
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-2xl">
              Hotéis e pousadas selecionados no Brasil, com até 20% abaixo da diária pública e cortesias de upgrade de categoria.
            </p>
          </div>

          <Link
            href="/hospedagens"
            className="px-6 py-3.5 rounded-sm bg-brand-primary hover:bg-brand-primary/90 text-white text-xs font-black uppercase tracking-wider transition-colors shrink-0 flex items-center gap-2 shadow-xs"
          >
            <span>Ver hospedagens</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredBenefits.map((benefit) => (
          <BenefitCard key={benefit.id} benefit={benefit} />
        ))}
      </div>
    </div>
  )
}
