"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  CheckCircle,
  Clock,
  Handshake,
  Hourglass,
  MagnifyingGlass,
  MapPin,
  PaperPlaneTilt,
  UserCheck,
  UserMinus,
  UserPlus,
  Users,
} from "@phosphor-icons/react"
import { MEMBERS, Member, getInitials, getMemberSlug, MissionItem } from "@/src/data/portalData"
import { usePortalStore } from "@/src/store/usePortalStore"
import { Container } from "@/src/components/common/container"
import { CtaButton } from "@/src/components/common/ctaButton"
import { PortalHero } from "@/src/components/portal/PortalHero"
import { PortalHeroFilterBar } from "@/src/components/portal/PortalHeroFilterBar"
import { toast } from "@/src/components/ui/toast/toast"
import { cn } from "@/src/lib/utils"

export default function MinhasConexoesPage(): React.JSX.Element {
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

  const [activeTab, setActiveTab] = React.useState("ativas")
  const [searchQuery, setSearchQuery] = React.useState("")

  const activeConnectionsList = React.useMemo(() => {
    return MEMBERS.filter((m) => connectedMembers[m.id] === "connected")
  }, [connectedMembers])

  const receivedInvitesList = React.useMemo(() => {
    return MEMBERS.filter((m) => receivedPendingInvites.includes(m.id))
  }, [receivedPendingInvites])

  const sentInvitesList = React.useMemo(() => {
    return MEMBERS.filter((m) => connectedMembers[m.id] === "pending")
  }, [connectedMembers])

  const statusFilterOptions = React.useMemo(() => {
    return [
      {
        value: "ativas",
        label: "Conexões Ativas",
        count: activeConnectionsList.length,
      },
      {
        value: "recebidas",
        label: "Convites Recebidos",
        count: receivedInvitesList.length,
      },
      {
        value: "enviadas",
        label: "Convites Enviados",
        count: sentInvitesList.length,
      },
    ]
  }, [activeConnectionsList.length, receivedInvitesList.length, sentInvitesList.length])

  const networkingMissions = React.useMemo(() => {
    return missions.filter(
      (m) =>
        m.category === "networking" ||
        m.id === "connections_5" ||
        m.id === "connections_10" ||
        m.id === "connections_20"
    )
  }, [missions])

  const currentList = React.useMemo(() => {
    let list: Member[] = []
    if (activeTab === "ativas") list = activeConnectionsList
    if (activeTab === "recebidas") list = receivedInvitesList
    if (activeTab === "enviadas") list = sentInvitesList

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
  }, [activeTab, activeConnectionsList, receivedInvitesList, sentInvitesList, searchQuery])

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
    toast.success(`Conexão aceita com ${member.name}!`, {
      description: "Você ganhou +50 XP e agora estão conectados diretamente.",
    })
  }

  const handleDecline = (member: Member) => {
    declineInvite(member.id)
    toast.info(`Convite de ${member.name} recusado.`)
  }

  const handleCancelSent = (member: Member) => {
    cancelSentInvite(member.id)
    toast.info(`Solicitação para ${member.name} cancelada.`)
  }

  const handleDisconnect = (member: Member) => {
    removeConnection(member.id)
    toast.info(`Conexão com ${member.name} desfeita.`)
  }

  const hasActiveFilters = activeTab !== "ativas" || Boolean(searchQuery)

  const handleClearFilters = () => {
    setActiveTab("ativas")
    setSearchQuery("")
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
          categoryLabel="Status"
          categoryIcon={Users}
          activeCategory={activeTab}
          onCategoryChange={setActiveTab}
          categories={statusFilterOptions}
          searchQuery={searchQuery}
          onSearchQueryChange={setSearchQuery}
          searchPlaceholder="Buscar conexões por nome, empresa, cargo ou cidade..."
        />
      </PortalHero>

      <Container className="relative z-10 flex-1 py-10 space-y-8 bg-[#F1F1F1] dark:bg-[#161616]">
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center justify-between gap-3 text-zinc-900 dark:text-white">
            <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-600 dark:text-zinc-300">
              <span className="font-semibold text-zinc-900 dark:text-white">
                Filtros aplicados:
              </span>
              {activeTab !== "ativas" && (
                <span className="px-2.5 py-1 rounded-sm bg-brand-primary/10 text-brand-primary font-bold flex items-center gap-1.5">
                  <Users className="w-3 h-3" />
                  <span>
                    {statusFilterOptions.find((r) => r.value === activeTab)?.label}
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

        <div className="rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] p-5 sm:p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-zinc-100 dark:border-zinc-800/80 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-sm bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0">
                <Handshake className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white">
                  Missões de Networking • KeyPass
                </h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Conecte-se com membros da comunidade para desbloquear XP acelerada e Tokens RIB.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-zinc-600 dark:text-zinc-300">
                Total ativo: <strong>{activeConnectionsList.length} conexões</strong>
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {networkingMissions.map((mission) => {
              const currentProg = Math.min(mission.totalRequired, activeConnectionsList.length)
              const isCompleted = currentProg >= mission.totalRequired
              const canClaim = isCompleted && !mission.isClaimed
              const progressPct = Math.min(
                100,
                Math.round((currentProg / mission.totalRequired) * 100)
              )

              return (
                <div
                  key={mission.id}
                  className={cn(
                    "rounded-sm border p-4 flex flex-col justify-between transition-all bg-[#FBFBFB] dark:bg-zinc-900/60 relative",
                    canClaim
                      ? "border-brand-primary ring-2 ring-brand-primary/20 bg-brand-primary/5 dark:bg-brand-primary/10"
                      : mission.isClaimed
                      ? "border-emerald-500/40 dark:border-emerald-500/30"
                      : "border-zinc-200 dark:border-zinc-800"
                  )}
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[9px] font-black uppercase tracking-widest text-brand-primary block">
                          Meta {mission.totalRequired} Conexões
                        </span>
                        <h3 className="text-xs sm:text-sm font-heading font-black uppercase text-zinc-900 dark:text-white mt-0.5">
                          {mission.title}
                        </h3>
                      </div>

                      <div className="flex flex-col items-end gap-1 shrink-0">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-xs bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 text-[10px] font-black uppercase whitespace-nowrap">
                          <div className="relative w-3 h-3 shrink-0">
                            <Image
                              src="/utils/gamification/utils/xp.webp"
                              alt="XP"
                              fill
                              className="object-contain"
                            />
                          </div>
                          <span>+{mission.xpReward} XP</span>
                        </span>
                        {mission.tokensReward && mission.tokensReward > 0 ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-xs bg-zinc-200 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-300 dark:border-zinc-700 text-[10px] font-black uppercase whitespace-nowrap">
                            <div className="relative w-3 h-3 shrink-0">
                              <Image
                                src="/utils/gamification/utils/RIB.svg"
                                alt="RIB"
                                fill
                                className="object-contain"
                              />
                            </div>
                            <span>+{mission.tokensReward} RIB</span>
                          </span>
                        ) : null}
                      </div>
                    </div>

                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      {mission.description}
                    </p>
                  </div>

                  <div className="space-y-2 pt-3 mt-3 border-t border-zinc-200/60 dark:border-zinc-800">
                    <div className="flex justify-between text-[10px] font-bold text-zinc-500 dark:text-zinc-400">
                      <span>
                        Progresso: {currentProg} / {mission.totalRequired}
                      </span>
                      <span>{progressPct}%</span>
                    </div>

                    <div className="w-full h-1.5 bg-zinc-200 dark:bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all duration-500",
                          mission.isClaimed
                            ? "bg-emerald-500"
                            : "bg-brand-primary"
                        )}
                        style={{ width: `${progressPct}%` }}
                      />
                    </div>

                    <div className="pt-1">
                      {canClaim ? (
                        <CtaButton
                          type="button"
                          variant="primary"
                          size="xs"
                          isFullWidth
                          onClick={() => handleClaim(mission)}
                          className="text-xs font-black shadow-xs"
                        >
                          <div className="relative w-3.5 h-3.5 mr-1.5 shrink-0">
                            <Image
                              src="/utils/gamification/utils/xp.webp"
                              alt="XP"
                              fill
                              className="object-contain"
                            />
                          </div>
                          <span>Resgatar Recompensa</span>
                        </CtaButton>
                      ) : mission.isClaimed ? (
                        <div className="flex items-center justify-center gap-1.5 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/30 rounded-sm border border-emerald-200 dark:border-emerald-800/40 whitespace-nowrap">
                          <CheckCircle className="w-3.5 h-3.5 shrink-0" weight="fill" />
                          <span>Recompensa Resgatada</span>
                        </div>
                      ) : (
                        <div className="inline-flex items-center justify-center gap-1.5 w-full py-1 text-[11px] font-bold text-zinc-400 whitespace-nowrap shrink-0">
                          <Clock className="w-3.5 h-3.5 shrink-0" />
                          <span>Faltam {Math.max(0, mission.totalRequired - currentProg)} conexões</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <span className="text-xs font-black uppercase tracking-widest text-zinc-400">
              {currentList.length}{" "}
              {activeTab === "ativas"
                ? currentList.length === 1
                  ? "conexão ativa"
                  : "conexões ativas"
                : activeTab === "recebidas"
                ? currentList.length === 1
                  ? "convite recebido"
                  : "convites recebidos"
                : currentList.length === 1
                ? "convite enviado"
                : "convites enviados"}
            </span>

            <Link
              href="/conexoes"
              className="text-xs font-bold uppercase tracking-wider text-brand-primary hover:underline flex items-center gap-1"
            >
              <span>Explorar todos os membros</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {currentList.length === 0 ? (
            <div className="p-12 text-center rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] space-y-4">
              <div className="w-12 h-12 rounded-sm bg-brand-primary/10 text-brand-primary flex items-center justify-center mx-auto">
                {activeTab === "ativas" ? (
                  <Users className="w-6 h-6" />
                ) : activeTab === "recebidas" ? (
                  <UserPlus className="w-6 h-6" />
                ) : (
                  <PaperPlaneTilt className="w-6 h-6" />
                )}
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold uppercase tracking-tight text-zinc-900 dark:text-white">
                  {searchQuery
                    ? "Nenhum membro encontrado"
                    : activeTab === "ativas"
                    ? "Nenhuma conexão ativa ainda"
                    : activeTab === "recebidas"
                    ? "Nenhum convite pendente recebido"
                    : "Nenhum convite enviado pendente"}
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 max-w-sm mx-auto leading-relaxed">
                  {searchQuery
                    ? "Tente buscar por outros termos para encontrar o contato desejado."
                    : activeTab === "ativas"
                    ? "Explore os membros da comunidade e envie convites para iniciar novas parcerias e acumular XP."
                    : activeTab === "recebidas"
                    ? "Quando outros membros enviarem solicitações para você, elas aparecerão aqui para sua aprovação."
                    : "Você não possui solicitações de conexão aguardando confirmação no momento."}
                </p>
              </div>

              {searchQuery ? (
                <CtaButton
                  type="button"
                  variant="primary"
                  size="sm"
                  onClick={() => setSearchQuery("")}
                  className="mt-2 text-xs"
                >
                  Limpar busca
                </CtaButton>
              ) : (
                <CtaButton
                  href="/conexoes"
                  variant="primary"
                  size="sm"
                  className="mt-2 text-xs"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  <span>Explorar Membros do Clube</span>
                </CtaButton>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {currentList.map((member) => {
                return (
                  <div
                    key={member.id}
                    className="flex flex-col justify-between rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] p-4 space-y-4 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Link
                          href={`/conexoes/${member.id}/${getMemberSlug(member)}`}
                          className="relative w-14 h-14 rounded-sm bg-zinc-100 dark:bg-zinc-800 overflow-hidden shrink-0 group cursor-pointer"
                        >
                          {member.avatar ? (
                            <Image
                              src={member.avatar}
                              alt={member.name}
                              fill
                              sizes="56px"
                              className="object-cover group-hover:scale-105 transition-transform"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center font-black text-sm bg-zinc-900 text-white dark:bg-zinc-800">
                              {getInitials(member.name)}
                            </div>
                          )}
                        </Link>

                        <div className="flex-1 min-w-0">
                          <Link
                            href={`/conexoes/${member.id}/${getMemberSlug(member)}`}
                            className="block group cursor-pointer"
                          >
                            <h3 className="text-sm font-bold uppercase tracking-tight text-zinc-900 dark:text-white truncate group-hover:text-brand-primary transition-colors">
                              {member.name}
                            </h3>
                          </Link>
                          <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                            {member.role}
                          </p>
                          <p className="text-xs font-semibold text-zinc-700 dark:text-zinc-300 truncate">
                            {member.company}
                          </p>
                          <div className="flex items-center gap-1 text-[11px] text-zinc-400 mt-0.5">
                            <MapPin className="w-3 h-3 text-brand-primary shrink-0" />
                            <span className="truncate">{member.city}</span>
                          </div>
                        </div>
                      </div>

                      <div className="p-2.5 rounded-sm bg-[#F1F1F1] dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800/80 space-y-1.5">
                        <div>
                          <span className="text-[9px] font-black uppercase tracking-widest text-brand-primary block">
                            Oferece
                          </span>
                          <p className="text-[11px] font-medium text-zinc-800 dark:text-zinc-200 line-clamp-1 mt-0.5">
                            {member.offering.join(" • ")}
                          </p>
                        </div>
                        {member.seeking.length > 0 && (
                          <div className="pt-1 border-t border-zinc-200/60 dark:border-zinc-800">
                            <span className="text-[9px] font-black uppercase tracking-widest text-zinc-400 block">
                              Busca
                            </span>
                            <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-1 mt-0.5">
                              {member.seeking.join(" • ")}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center gap-2">
                      {activeTab === "ativas" && (
                        <>
                          <CtaButton
                            href={`/conexoes/${member.id}/${getMemberSlug(member)}`}
                            variant="secondary"
                            size="sm"
                            isFullWidth
                            className="text-xs"
                          >
                            <span>Ver Perfil</span>
                          </CtaButton>
                          <CtaButton
                            type="button"
                            variant="secondary"
                            size="sm"
                            onClick={() => handleDisconnect(member)}
                            className="text-xs px-3 text-zinc-400 hover:text-red-500"
                            title="Desfazer conexão"
                          >
                            <UserMinus className="w-4 h-4 text-zinc-400 hover:text-red-500" />
                          </CtaButton>
                        </>
                      )}

                      {activeTab === "recebidas" && (
                        <>
                          <CtaButton
                            type="button"
                            variant="primary"
                            size="sm"
                            isFullWidth
                            onClick={() => handleAccept(member)}
                            className="text-xs"
                          >
                            <div className="relative w-3.5 h-3.5 mr-1.5 shrink-0">
                              <Image
                                src="/utils/gamification/utils/xp.webp"
                                alt="XP"
                                fill
                                className="object-contain"
                              />
                            </div>
                            <span>Aceitar (+50 XP)</span>
                          </CtaButton>
                          <CtaButton
                            type="button"
                            variant="secondary"
                            size="sm"
                            onClick={() => handleDecline(member)}
                            className="text-xs text-zinc-500 hover:text-red-500"
                          >
                            <span>Recusar</span>
                          </CtaButton>
                        </>
                      )}

                      {activeTab === "enviadas" && (
                        <>
                          <div className="flex-1 flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                            <Hourglass className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                            <span className="truncate">Aguardando resposta</span>
                          </div>
                          <CtaButton
                            type="button"
                            variant="secondary"
                            size="sm"
                            onClick={() => handleCancelSent(member)}
                            className="text-xs text-zinc-500 hover:text-red-500"
                          >
                            <span>Cancelar</span>
                          </CtaButton>
                        </>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </Container>
    </div>
  )
}
