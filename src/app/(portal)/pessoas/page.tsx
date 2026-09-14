"use client"

import * as React from "react"
import { Search, Users } from "lucide-react"

import { MEMBERS } from "@/src/data/portalData"
import { MemberCard } from "@/src/components/portal/MemberCard"
import { MatchCard } from "@/src/components/portal/MatchCard"

export default function PeoplePage(): React.JSX.Element {
  const [searchQuery, setSearchQuery] = React.useState("")

  const suggestedMatch = MEMBERS[10]
  const matchReason =
    "Renata lidera rodadas no ticket que você busca para as marcas do seu portfólio e já co-investiu com dois membros do clube."

  const filteredMembers = React.useMemo(() => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return MEMBERS

    return MEMBERS.filter((m) => {
      const fullText = [
        m.name,
        m.role,
        m.company,
        m.city,
        ...m.seeking,
        ...m.offering
      ]
        .join(" ")
        .toLowerCase()
      return fullText.includes(q)
    })
  }, [searchQuery])

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-brand-primary block mb-1">
            Rede de Membros
          </span>
          <h1 className="text-3xl sm:text-4xl font-heading font-black tracking-tight uppercase text-zinc-900 dark:text-white">
            Quem faz o clube
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
            Conecte-se com fundadores, executivos C-level e investidores ativos
          </p>
        </div>

        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Nome, empresa, cidade ou tag..."
            className="w-full pl-10 pr-4 py-2.5 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] text-xs text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all shadow-xs"
          />
        </div>
      </div>

      {!searchQuery && (
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
              Nenhum membro encontrado
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto">
              Não encontramos membros com o termo &quot;{searchQuery}&quot;. Tente buscar por outros nomes, empresas ou interesses.
            </p>
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="mt-2 px-4 py-2 rounded-sm bg-brand-primary hover:bg-brand-primary/90 text-white text-xs font-black uppercase tracking-wider transition-colors cursor-pointer"
            >
              Limpar busca
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredMembers.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
