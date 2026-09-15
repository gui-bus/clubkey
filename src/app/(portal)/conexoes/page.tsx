"use client"

import * as React from "react"
import Image from "next/image"
import { Search, Users } from "lucide-react"

import { MEMBERS } from "@/src/data/portalData"
import { MemberCard } from "@/src/components/portal/MemberCard"
import { MatchCard } from "@/src/components/portal/MatchCard"
import { PortalHeroFilterBar } from "@/src/components/portal/PortalHeroFilterBar"
import { Button } from "@/src/components/ui/button/button"
import { Container } from "@/src/components/common/container"

const MEMBER_ROLES = [
  { value: "todos", label: "Todos" },
  { value: "fundadores", label: "Fundadores" },
  { value: "c-level", label: "C-Level & Diretores" },
  { value: "investidores", label: "Investidores & Partners" },
]

export default function ConexoesPage(): React.JSX.Element {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [activeTab, setActiveTab] = React.useState("todos")

  const suggestedMatch = MEMBERS[10]
  const matchReason =
    "Renata lidera rodadas no ticket que você busca para as marcas do seu portfólio e já co-investiu com dois membros do clube."

  const roleOptions = React.useMemo(() => {
    return MEMBER_ROLES.map((r) => ({
      value: r.value,
      label: r.label,
      count:
        r.value === "todos"
          ? MEMBERS.length
          : r.value === "fundadores"
            ? MEMBERS.filter(
                (m) =>
                  m.role.toLowerCase().includes("founder") ||
                  m.role.toLowerCase().includes("fundador") ||
                  m.role.toLowerCase().includes("co-founder")
              ).length
            : r.value === "c-level"
              ? MEMBERS.filter(
                  (m) =>
                    m.role.toLowerCase().includes("ceo") ||
                    m.role.toLowerCase().includes("cto") ||
                    m.role.toLowerCase().includes("cmo") ||
                    m.role.toLowerCase().includes("cfo") ||
                    m.role.toLowerCase().includes("vp") ||
                    m.role.toLowerCase().includes("diretor")
                ).length
              : MEMBERS.filter(
                  (m) =>
                    m.role.toLowerCase().includes("investidor") ||
                    m.role.toLowerCase().includes("partner") ||
                    m.role.toLowerCase().includes("managing") ||
                    m.role.toLowerCase().includes("venture") ||
                    m.offering.some(
                      (t) =>
                        t.toLowerCase().includes("investimento") ||
                        t.toLowerCase().includes("capital") ||
                        t.toLowerCase().includes("mentoria")
                    )
                ).length,
    }))
  }, [])

  const filteredMembers = React.useMemo(() => {
    let list = MEMBERS

    if (activeTab === "fundadores") {
      list = list.filter(
        (m) =>
          m.role.toLowerCase().includes("founder") ||
          m.role.toLowerCase().includes("fundador") ||
          m.role.toLowerCase().includes("co-founder")
      )
    } else if (activeTab === "c-level") {
      list = list.filter(
        (m) =>
          m.role.toLowerCase().includes("ceo") ||
          m.role.toLowerCase().includes("cto") ||
          m.role.toLowerCase().includes("cmo") ||
          m.role.toLowerCase().includes("cfo") ||
          m.role.toLowerCase().includes("vp") ||
          m.role.toLowerCase().includes("diretor")
      )
    } else if (activeTab === "investidores") {
      list = list.filter(
        (m) =>
          m.role.toLowerCase().includes("investidor") ||
          m.role.toLowerCase().includes("partner") ||
          m.role.toLowerCase().includes("managing") ||
          m.role.toLowerCase().includes("venture") ||
          m.offering.some(
            (t) =>
              t.toLowerCase().includes("investimento") ||
              t.toLowerCase().includes("capital") ||
              t.toLowerCase().includes("mentoria")
          )
      )
    }

    const q = searchQuery.trim().toLowerCase()
    if (!q) return list

    return list.filter((m) => {
      const fullText = [
        m.name,
        m.role,
        m.company,
        m.city,
        ...m.seeking,
        ...m.offering,
      ]
        .join(" ")
        .toLowerCase()
      return fullText.includes(q)
    })
  }, [searchQuery, activeTab])

  const hasActiveFilters = activeTab !== "todos" || Boolean(searchQuery)

  const handleClearFilters = () => {
    setSearchQuery("")
    setActiveTab("todos")
  }

  return (
    <div className="w-full flex flex-col">
      <section
        id="hero"
        className="relative z-30 w-full bg-[#0D0D0D] text-white min-h-[520px] md:min-h-[560px] flex flex-col justify-center"
      >
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none">
          <Image
            src="/utils/banners/pessoas.webp"
            alt="Conexões e Networking"
            fill
            priority
            className="object-cover object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-zinc-50  dark:from-[#161616]/85 dark:via-[#161616]/65 dark:to-[#0D0D0D] z-10" />
        </div>

        <Container className="relative z-20 pt-36 pb-16 md:pt-44 md:pb-20 flex flex-col justify-center items-center text-center">
          <div className="max-w-5xl flex flex-col items-center text-center w-full">
            <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-brand-primary block mb-3">
              Rede de Conexões • Ecossistema
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black uppercase tracking-tight text-white leading-[1.05] mb-4 font-heading drop-shadow-md">
              Suas <span className="text-brand-primary">Conexões</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-zinc-200 font-light mb-8 leading-relaxed drop-shadow-sm max-w-2xl">
              Conecte-se com fundadores, executivos C-Level e investidores ativos do ecossistema.
            </p>

            <PortalHeroFilterBar
              categoryLabel="Segmento"
              categoryIcon={Users}
              activeCategory={activeTab}
              onCategoryChange={setActiveTab}
              categories={roleOptions}
              searchQuery={searchQuery}
              onSearchQueryChange={setSearchQuery}
              searchPlaceholder="Buscar conexões por nome, empresa, cargo, cidade ou especialidade..."
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
              {activeTab !== "todos" && (
                <span className="px-2.5 py-1 rounded-sm bg-brand-primary/10 text-brand-primary font-bold flex items-center gap-1.5">
                  <Users className="w-3 h-3" />
                  <span>
                    {MEMBER_ROLES.find((r) => r.value === activeTab)?.label}
                  </span>
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

        {!searchQuery && activeTab === "todos" && (
          <MatchCard member={suggestedMatch} reason={matchReason} />
        )}

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-widest text-zinc-400">
              {filteredMembers.length}{" "}
              {filteredMembers.length === 1 ? "membro encontrado" : "membros na rede"}
            </span>
          </div>

          {filteredMembers.length === 0 ? (
            <div className="p-12 text-center rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] space-y-3">
              <div className="w-12 h-12 rounded-sm bg-zinc-100 dark:bg-zinc-800 text-zinc-400 flex items-center justify-center mx-auto">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold uppercase tracking-tight text-zinc-900 dark:text-white">
                Nenhuma conexão encontrada
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto">
                Não encontramos membros com os filtros selecionados. Tente buscar por outros termos ou categorias.
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
              {filteredMembers.map((member) => (
                <MemberCard key={member.id} member={member} />
              ))}
            </div>
          )}
        </div>
      </Container>
    </div>
  )
}
