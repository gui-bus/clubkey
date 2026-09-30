"use client"

import * as React from "react"

import { BENEFITS } from "@/src/data/portalData"
import {
  ArrowRight,
  Buildings,
  Gift,
  MagnifyingGlass,
} from "@phosphor-icons/react"

import { Badge } from "@/src/components/ui/badge/badge"
import { Button } from "@/src/components/ui/button/button"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/src/components/ui/pagination/pagination"

import { Container } from "@/src/components/common/container"
import { CtaButton } from "@/src/components/common/ctaButton"
import { BenefitCard } from "@/src/components/portal/benefitCard"
import { PortalHero } from "@/src/components/portal/portalHero"
import { PortalHeroFilterBar } from "@/src/components/portal/portalHeroFilterBar"

import { isModuleEnabled } from "@/src/config/brand.config"

const ITEMS_PER_PAGE = 6

const CATEGORIES = [
  "Todos",
  "Saúde",
  "Educação",
  "Viagem",
  "Gastronomia",
  "Mobilidade",
  "Serviços",
]

export default function BenefitsPage(): React.JSX.Element {
  const [activeCategory, setActiveCategory] = React.useState("Todos")
  const [searchQuery, setSearchQuery] = React.useState("")
  const [currentPage, setCurrentPage] = React.useState(1)

  const categoryOptions = React.useMemo(() => {
    return CATEGORIES.map((cat) => ({
      value: cat,
      label: cat,
      count:
        cat === "Todos"
          ? BENEFITS.length
          : BENEFITS.filter((b) => b.category === cat).length,
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
      const fullText = [b.partner, b.category, b.discount, b.desc]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
      return fullText.includes(q)
    })
  }, [activeCategory, searchQuery])

  const totalPages = Math.max(
    1,
    Math.ceil(filteredBenefits.length / ITEMS_PER_PAGE)
  )
  const paginatedBenefits = React.useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE
    return filteredBenefits.slice(start, start + ITEMS_PER_PAGE)
  }, [filteredBenefits, currentPage])

  const hasActiveFilters = activeCategory !== "Todos" || Boolean(searchQuery)

  const handleClearFilters = () => {
    setActiveCategory("Todos")
    setSearchQuery("")
    setCurrentPage(1)
  }

  return (
    <div className="w-full flex flex-col">
      <PortalHero
        badge="Parcerias Exclusivas • Rede de Vantagens"
        title={
          <>
            Vantagens de <span className="text-brand-primary">ser membro</span>
          </>
        }
        description="Condições e cortesias exclusivas com hospitais, faculdades de elite, aviação executiva e gastronomia premium."
        imageSrc="/utils/banners/beneficios.webp"
        imageAlt="Benefícios Exclusivos"
        imageClassName="object-bottom"
      >
        <PortalHeroFilterBar
          categoryLabel="Categoria"
          categoryIcon={Gift}
          activeCategory={activeCategory}
          onCategoryChange={(cat) => {
            setActiveCategory(cat)
            setCurrentPage(1)
          }}
          categories={categoryOptions}
          searchQuery={searchQuery}
          onSearchQueryChange={(q) => {
            setSearchQuery(q)
            setCurrentPage(1)
          }}
          searchPlaceholder="Buscar por parceiro, serviço, clínica ou palavra-chave..."
        />
      </PortalHero>

      <Container className="relative z-10 flex-1 py-10 space-y-8 bg-[#F1F1F1] dark:bg-[#161616]">
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
                  <MagnifyingGlass className="w-3 h-3" />
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

        {isModuleEnabled("stays") &&
          !searchQuery &&
          (activeCategory === "Todos" || activeCategory === "Viagem") && (
            <div className="relative rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] p-6 sm:p-8 overflow-hidden">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div className="space-y-2 flex-1">
                  <Badge
                    color="primary"
                    variant="flat"
                    size="sm"
                    radius="sm"
                    startContent={<Buildings className="w-3.5 h-3.5" />}
                    className="font-black uppercase tracking-wider"
                  >
                    Travel Club
                  </Badge>
                  <h2 className="text-2xl sm:text-3xl font-heading font-black tracking-tight uppercase text-zinc-900 dark:text-white">
                    Hospedagens com tarifa de membro
                  </h2>
                  <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-2xl">
                    Hotéis e pousadas selecionados no Brasil, com até 20% abaixo
                    da diária pública e cortesias de upgrade de categoria.
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
            {filteredBenefits.length === 1
              ? "benefício encontrado"
              : "benefícios exclusivos"}
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
              Não encontramos parceiros ou benefícios com os critérios
              digitados. Tente ajustar os termos ou a categoria.
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
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {paginatedBenefits.map((benefit) => (
                <BenefitCard key={benefit.id} benefit={benefit} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-zinc-200 dark:border-zinc-800">
                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                  Mostrando{" "}
                  <strong>{(currentPage - 1) * ITEMS_PER_PAGE + 1}</strong> a{" "}
                  <strong>
                    {Math.min(
                      currentPage * ITEMS_PER_PAGE,
                      filteredBenefits.length
                    )}
                  </strong>{" "}
                  de <strong>{filteredBenefits.length}</strong> benefícios
                </span>
                <Pagination
                  radius="sm"
                  color="primary"
                  className="w-auto justify-center sm:justify-end"
                >
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        label="Anterior"
                        onClick={() => {
                          setCurrentPage((p) => Math.max(1, p - 1))
                          window.scrollTo({ top: 380, behavior: "smooth" })
                        }}
                        disabled={currentPage === 1}
                      />
                    </PaginationItem>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <PaginationItem key={page}>
                          <PaginationLink
                            isActive={currentPage === page}
                            onClick={() => {
                              setCurrentPage(page)
                              window.scrollTo({ top: 380, behavior: "smooth" })
                            }}
                          >
                            {page}
                          </PaginationLink>
                        </PaginationItem>
                      )
                    )}
                    <PaginationItem>
                      <PaginationNext
                        label="Próxima"
                        onClick={() => {
                          setCurrentPage((p) => Math.min(totalPages, p + 1))
                          window.scrollTo({ top: 380, behavior: "smooth" })
                        }}
                        disabled={currentPage === totalPages}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        )}
      </Container>
    </div>
  )
}
