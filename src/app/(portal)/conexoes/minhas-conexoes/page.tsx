"use client"

import * as React from "react"

import Link from "next/link"

import { MEMBERS, Member, MissionItem } from "@/src/data/portalData"
import { usePortalStore } from "@/src/store/usePortalStore"
import {
  ArrowRight,
  MagnifyingGlass,
  UserPlus,
  Users,
} from "@phosphor-icons/react"

import { toast } from "@/src/components/ui/toast/toast"

import { Container } from "@/src/components/common/container"
import { CtaButton } from "@/src/components/common/ctaButton"
import { MemberCard } from "@/src/components/portal/MemberCard"
import { NetworkingMissions } from "@/src/components/portal/NetworkingMissions"
import { PortalHero } from "@/src/components/portal/PortalHero"
import { PortalHeroFilterBar } from "@/src/components/portal/PortalHeroFilterBar"

function MinhasConexoesContent(): React.JSX.Element {
  const {
    connectedMembers,
    receivedPendingInvites,
    missions,
    acceptInvite,
    declineInvite,
    cancelSentInvite,
    removeConnection,
    claimMission,
  } = usePortalStore()

  const [searchQuery, setSearchQuery] = React.useState("")
  const [activeFilter, setActiveFilter] = React.useState("todos")

  const activeConnectionsList = React.useMemo(() => {
    return MEMBERS.filter((m) => connectedMembers[m.id] === "connected")
  }, [connectedMembers])

  const receivedInvitesList = React.useMemo(() => {
    return MEMBERS.filter((m) => receivedPendingInvites.includes(m.id))
  }, [receivedPendingInvites])

  const sentInvitesList = React.useMemo(() => {
    return MEMBERS.filter((m) => connectedMembers[m.id] === "pending")
  }, [connectedMembers])

  const filterOptions = React.useMemo(
    () => [
      {
        value: "todos",
        label: "Todas as Conexões",
        count:
          activeConnectionsList.length +
          receivedInvitesList.length +
          sentInvitesList.length,
      },
      {
        value: "ativas",
        label: "Conexões Ativas",
        count: activeConnectionsList.length,
      },
      {
        value: "recebidos",
        label: "Convites Recebidos",
        count: receivedInvitesList.length,
      },
      {
        value: "enviados",
        label: "Convites Enviados",
        count: sentInvitesList.length,
      },
    ],
    [activeConnectionsList, receivedInvitesList, sentInvitesList]
  )

  const networkingMissions = React.useMemo(() => {
    return missions.filter(
      (m) =>
        m.category === "networking" ||
        m.id === "connections_5" ||
        m.id === "connections_10" ||
        m.id === "connections_20"
    )
  }, [missions])

  const filterByQuery = (list: Member[]) => {
    const q = searchQuery.trim().toLowerCase()
    if (!q) return list
    return list.filter((m) => {
      const fullText = [
        m.firstName,
        m.lastName,
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
  }

  const filteredReceived = React.useMemo(
    () => filterByQuery(receivedInvitesList),
    [receivedInvitesList, searchQuery]
  )
  const filteredActive = React.useMemo(
    () => filterByQuery(activeConnectionsList),
    [activeConnectionsList, searchQuery]
  )
  const filteredSent = React.useMemo(
    () => filterByQuery(sentInvitesList),
    [sentInvitesList, searchQuery]
  )

  const hasActiveFilters = activeFilter !== "todos" || Boolean(searchQuery)

  const handleClearFilters = () => {
    setSearchQuery("")
    setActiveFilter("todos")
  }

  const handleClaim = (mission: MissionItem) => {
    claimMission(mission.id)
    toast.success(`Conquista Resgatada: ${mission.title}`, {
      description: `Você recebeu +${mission.xpReward} XP${
        mission.tokensReward ? ` e +${mission.tokensReward} Tokens RIB` : ""
      }!`,
    })
  }

  const handleAccept = (member: Member) => {
    acceptInvite(member.id)
    toast.success(`Conexão aceita com ${member.firstName} ${member.lastName}!`, {
      description: "Você ganhou +50 XP e agora estão conectados diretamente.",
    })
  }

  const handleDecline = (member: Member) => {
    declineInvite(member.id)
    toast.info(`Convite de ${member.firstName} ${member.lastName} recusado.`)
  }

  const handleCancelSent = (member: Member) => {
    cancelSentInvite(member.id)
    toast.info(`Solicitação para ${member.firstName} ${member.lastName} cancelada.`)
  }

  const handleDisconnect = (member: Member) => {
    removeConnection(member.id)
    toast.info(`Conexão com ${member.firstName} ${member.lastName} desfeita.`)
  }

  return (
    <div className="w-full flex flex-col">
      <PortalHero
        badge="Minha Rede • Conexões & Convites"
        title={
          <>
            Minhas <span className="text-brand-primary">Conexões</span>
          </>
        }
        description="Gerencie suas conexões diretas, aprove convites recebidos com ganho de XP e atinja as metas de networking do KeyPass."
        imageSrc="/utils/banners/pessoas.webp"
        imageAlt="Minhas Conexões e Networking"
      >
        <PortalHeroFilterBar
          categoryLabel="Minha Rede"
          categoryIcon={Users}
          activeCategory={activeFilter}
          onCategoryChange={setActiveFilter}
          categories={filterOptions}
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          searchPlaceholder="Buscar conexões por nome, empresa, cargo ou cidade..."
        />
      </PortalHero>

      <Container className="relative z-10 flex-1 py-10 space-y-10 bg-[#F1F1F1] dark:bg-[#161616]">
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center justify-between gap-3 text-zinc-900 dark:text-white">
            <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-600 dark:text-zinc-300">
              <span className="font-semibold text-zinc-900 dark:text-white">
                Filtros aplicados:
              </span>
              {activeFilter !== "todos" && (
                <span className="px-2.5 py-1 rounded-sm bg-brand-primary/10 text-brand-primary font-bold flex items-center gap-1.5">
                  <Users className="w-3 h-3" />
                  <span>
                    {filterOptions.find((o) => o.value === activeFilter)?.label}
                  </span>
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

        <NetworkingMissions
          missions={networkingMissions}
          activeConnectionsCount={activeConnectionsList.length}
          onClaim={handleClaim}
        />

        {(activeFilter === "todos" || activeFilter === "recebidos") &&
          filteredReceived.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-widest text-zinc-900 dark:text-white">
                  {filteredReceived.length}{" "}
                  {filteredReceived.length === 1
                    ? "convite recebido"
                    : "convites recebidos"}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredReceived.map((member) => (
                  <MemberCard
                    key={member.id}
                    member={member}
                    onAccept={handleAccept}
                    onDecline={handleDecline}
                  />
                ))}
              </div>
            </section>
          )}

        {(activeFilter === "todos" || activeFilter === "ativas") && (
          <section className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <span className="text-xs font-black uppercase tracking-widest text-zinc-900 dark:text-white">
                {filteredActive.length}{" "}
                {filteredActive.length === 1
                  ? "conexão ativa"
                  : "conexões ativas"}
              </span>

              <Link
                href="/conexoes"
                className="text-xs font-bold uppercase tracking-wider text-brand-primary hover:underline flex items-center gap-1"
              >
                <span>Descobrir novas conexões</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {filteredActive.length === 0 ? (
              <div className="p-12 text-center rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] space-y-4">
                <div className="w-12 h-12 rounded-sm bg-brand-primary/10 text-brand-primary flex items-center justify-center mx-auto">
                  <Users className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-base font-bold uppercase tracking-tight text-zinc-900 dark:text-white">
                    {searchQuery
                      ? "Nenhuma conexão ativa encontrada"
                      : "Nenhuma conexão ativa ainda"}
                  </h3>
                  <p className="text-xs text-zinc-900 dark:text-white max-w-sm mx-auto leading-relaxed font-normal">
                    {searchQuery
                      ? "Tente buscar por outro termo para encontrar contatos na sua rede."
                      : "Descubra outros membros do clube e comece a expandir seu networking."}
                  </p>
                </div>
                <CtaButton
                  href="/conexoes"
                  variant="primary"
                  size="sm"
                  className="mt-2 text-xs"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  <span>Explorar Membros do Clube</span>
                </CtaButton>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredActive.map((member) => (
                  <MemberCard
                    key={member.id}
                    member={member}
                    onRemove={handleDisconnect}
                  />
                ))}
              </div>
            )}
          </section>
        )}

        {(activeFilter === "todos" || activeFilter === "enviados") &&
          filteredSent.length > 0 && (
            <section className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-widest text-zinc-900 dark:text-white">
                  {filteredSent.length}{" "}
                  {filteredSent.length === 1
                    ? "convite enviado pendente"
                    : "convites enviados pendentes"}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSent.map((member) => (
                  <MemberCard
                    key={member.id}
                    member={member}
                    onCancel={handleCancelSent}
                  />
                ))}
              </div>
            </section>
          )}
      </Container>
    </div>
  )
}

export default function MinhasConexoesPage(): React.JSX.Element {
  return (
    <React.Suspense fallback={<div className="w-full min-h-[50vh]" />}>
      <MinhasConexoesContent />
    </React.Suspense>
  )
}
