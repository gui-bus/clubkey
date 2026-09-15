"use client"

import * as React from "react"
import Image from "next/image"
import { Building2, ArrowRight, Gift, Search } from "lucide-react"
import { BENEFITS } from "@/src/data/portalData"
import { BenefitCard } from "@/src/components/portal/BenefitCard"
import { PortalHeroFilterBar } from "@/src/components/portal/PortalHeroFilterBar"
import { Badge } from "@/src/components/ui/badge/badge"
import { Button } from "@/src/components/ui/button/button"
import { CtaButton } from "@/src/components/common/ctaButton"
import { Container } from "@/src/components/common/container"

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
  const [searchQuery, setSearchQuery] = React.useState("")

  const categoryOptions = React.useMemo(() => {
    return CATEGORIES.map((cat) => ({
      value: cat,
      label: cat,
      count:
        cat === "Todos"
          ? BENEFITS.length
          : BENEFITS.filter((b) => b.category === cat).length
    }))
  }, [])

  const filteredBenefits = React.useMemo(() => {
    let list = BENEFITS
    if (activeCategory !== "Todos") {
      list = list.filter((b) => b.category === activeCategory)
    }

    const q = searchQuery.trim().toLowerCase()
    if (!q) return list

    return list.filter((b) => {
      const fullText = [
        b.partner,
        b.category,
        b.discount,
        b.desc
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
      return fullText.includes(q)
    })
  }, [activeCategory, searchQuery])

  const hasActiveFilters = activeCategory !== "Todos" || Boolean(searchQuery)

  const handleClearFilters = () => {
    setActiveCategory("Todos")
    setSearchQuery("")
  }

  return (
    <div className="w-full flex flex-col">
      <section
        id="hero"
        className="relative z-30 w-full bg-[#0D0D0D] text-white min-h-[520px] md:min-h-[560px] flex flex-col justify-center"
      >
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
          <Image
            src="/utils/banners/beneficios.webp"
            alt="Benefícios Exclusivos"
            fill
            priority
            className="object-cover object-bottom"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-zinc-50 dark:from-[#161616]/85 dark:via-[#161616]/65 dark:to-[#0D0D0D] z-10" />
        </div>

        <Container className="relative z-20 pt-36 pb-16 md:pt-44 md:pb-20 flex flex-col justify-center items-center text-center">
          <div className="max-w-5xl flex flex-col items-center text-center w-full">
            <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-brand-primary block mb-3">
              Parcerias Exclusivas • Rede de Vantagens
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black uppercase tracking-tight text-white leading-[1.05] mb-4 font-heading drop-shadow-md">
              Vantagens de <span className="text-brand-primary">ser membro</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-zinc-200 font-light mb-8 leading-relaxed drop-shadow-sm max-w-2xl">
              Condições e cortesias exclusivas com hospitais, faculdades de elite, aviação executiva e gastronomia premium.
            </p>

            <PortalHeroFilterBar
              categoryLabel="Categoria"
              categoryIcon={Gift}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              categories={categoryOptions}
              searchQuery={searchQuery}
              onSearchQueryChange={setSearchQuery}
              searchPlaceholder="Buscar por parceiro, serviço, clínica ou palavra-chave..."
            />
          </div>
        </Container>
      </section>

      <Container className="relative z-10 flex-1 py-10 space-y-8">
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center justify-between gap-3 text-zinc-900 dark:text-white">
            <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-600 dark:text-zinc-300">
              <span className="font-semibold text-zinc-900 dark:text-white">
                Filtros aplicados:
              </span>
              {activeCategory !== "Todos" && (
                <span className="px-2.5 py-1 rounded-sm bg-brand-primary/10 text-brand-primary font-bold flex items-center gap-1.5">
                  <Gift className="w-3 h-3" />
                  <span>{activeCategory}</span>
                </span>
              )}
              {searchQuery && (
                <span className="px-2.5 py-1 rounded-sm bg-brand-primary/10 text-brand-primary font-bold flex items-center gap-1.5">
                  <Search className="w-3 h-3" />
                  <span>&ldquo;{searchQuery}&rdquo;</span>
                </span>
              )}
            </div>

            <button
              type="button"
              onClick={handleClearFilters}
              className="text-xs font-bold text-zinc-500 hover:text-brand-primary dark:hover:text-brand-primary transition-colors cursor-pointer"
            >
              Limpar todos os filtros
            </button>
          </div>
        )}

        {!searchQuery && (activeCategory === "Todos" || activeCategory === "Viagem") && (
          <div className="relative rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] p-6 sm:p-8 overflow-hidden">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2 flex-1">
                <Badge
                  color="primary"
                  variant="flat"
                  size="sm"
                  radius="sm"
                  startContent={<Building2 className="w-3.5 h-3.5" />}
                  className="font-black uppercase tracking-wider"
                >
                  Travel Club
                </Badge>
                <h2 className="text-2xl sm:text-3xl font-heading font-black tracking-tight uppercase text-zinc-900 dark:text-white">
                  Hospedagens com tarifa de membro
                </h2>
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-2xl">
                  Hotéis e pousadas selecionados no Brasil, com até 20% abaixo da diária pública e cortesias de upgrade de categoria.
                </p>
              </div>

              <CtaButton
                href="/hospedagens"
                variant="primary"
                size="md"
                className="shrink-0"
              >
                <span>Ver hospedagens</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </CtaButton>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <span className="text-xs font-black uppercase tracking-widest text-zinc-400">
            {filteredBenefits.length}{" "}
            {filteredBenefits.length === 1 ? "benefício encontrado" : "benefícios exclusivos"}
          </span>
        </div>

        {filteredBenefits.length === 0 ? (
          <div className="p-12 text-center rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] space-y-3">
            <div className="w-12 h-12 rounded-sm bg-brand-primary/10 text-brand-primary flex items-center justify-center mx-auto">
              <Gift className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold uppercase tracking-tight text-zinc-900 dark:text-white">
              Nenhum benefício encontrado
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto">
              Não encontramos parceiros ou benefícios com os critérios digitados. Tente ajustar os termos ou a categoria.
            </p>
            <Button
              type="button"
              color="primary"
              radius="sm"
              size="sm"
              onClick={handleClearFilters}
              className="mt-2 text-xs font-black uppercase tracking-wider"
            >
              Limpar filtros
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBenefits.map((benefit) => (
              <BenefitCard key={benefit.id} benefit={benefit} />
            ))}
          </div>
        )}
      </Container>
    </div>
  )
}
