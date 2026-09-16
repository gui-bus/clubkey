"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import {
  ArrowRight,
  CalendarCheck,
  CheckCircle,
  ClockCounterClockwise,
  Crown,
  Gift,
  Info,
  Medal,
  ShieldCheck,
  ShieldWarning,
  Trophy,
  Users,
} from "@phosphor-icons/react"
import { Container } from "@/src/components/common/container"
import { Badge } from "@/src/components/ui/badge/badge"
import { TIERS_LIST } from "@/src/data/portalData"
import { cn } from "@/src/lib/utils"

const XP_ACTIONS_TABLE = [
  {
    action: "Completar Perfil Profissional",
    xp: "+250 XP",
    category: "Onboarding",
    desc: "Preencher nome, profissão, empresa, cidade, bio, tags de busca e oferta e foto de capa.",
    icon: ShieldCheck,
  },
  {
    action: "Ativar Autenticação de 2 Fatores (2FA)",
    xp: "+250 XP",
    category: "Segurança",
    desc: "Configurar verificação em duas etapas via aplicativo autenticador (TOTP) no perfil.",
    icon: ShieldCheck,
  },
  {
    action: "Reserva de Hospedagem Exclusiva",
    xp: "+300 XP",
    category: "Estadias",
    desc: "Confirmar reserva em qualquer propriedade do catálogo de hospedagens parceiras.",
    icon: Medal,
  },
  {
    action: "Confirmação de Presença em Evento",
    xp: "+200 XP",
    category: "Eventos",
    desc: "Confirmar RSVP em encontros mensais, jantares fechados ou summits institucionais.",
    icon: CalendarCheck,
  },
  {
    action: "Garantir Vaga em Experiência",
    xp: "+250 XP",
    category: "Experiências",
    desc: "Adquirir ou garantir participação em experiências curadas de lifestyle e networking.",
    icon: Gift,
  },
  {
    action: "Conexão Bilateral com Membro",
    xp: "+50 XP",
    category: "Networking",
    desc: "Estabelecer introdução e conexão direta aceita com outro associado da comunidade.",
    icon: Users,
  },
  {
    action: "Evolução de Nível no KeyPass",
    xp: "+2 Tokens RIB",
    category: "Recompensa",
    desc: "Recompensa fixa em tokens RIB creditada na sua carteira ao subir para cada novo nível.",
    icon: Trophy,
  },
]

export default function KeyPassRulesPage(): React.JSX.Element {
  return (
    <Container className="py-8 sm:py-10 space-y-10">
      <div className="space-y-2">
        <Badge
          color="primary"
          variant="flat"
          radius="sm"
          className="font-bold text-[11px]"
        >
          Regulamento Oficial
        </Badge>
        <h2 className="text-2xl sm:text-3xl font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white">
          Níveis, Pontuação & <span className="text-brand-primary">Regras do KeyPass</span>
        </h2>
        <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-2xl">
          Entenda como funciona o sistema de pontuação contínua, os benefícios de cada nível e as regras de retenção e proteção de status.
        </p>
      </div>

      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-brand-primary" />
          <h3 className="text-lg sm:text-xl font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white">
            Guia Completo dos 6 Níveis
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TIERS_LIST.map((tier) => (
            <div
              key={tier.id}
              className={cn(
                "rounded-sm border p-6 flex flex-col justify-between bg-white dark:bg-[#141416] shadow-xs relative overflow-hidden",
                tier.isSpecialPinnacle
                  ? "border-brand-primary/60 ring-1 ring-brand-primary/20"
                  : "border-zinc-200 dark:border-zinc-800"
              )}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <Badge
                      color={tier.badgeColor}
                      variant="flat"
                      radius="sm"
                      className="text-[9px] font-black uppercase tracking-wider"
                    >
                      Nível {tier.order}
                    </Badge>
                    <h4 className="text-lg font-heading font-black uppercase text-zinc-900 dark:text-white">
                      {tier.name}
                    </h4>
                    <p className="text-xs font-semibold text-zinc-400">
                      {tier.subtitle}
                    </p>
                  </div>

                  <div className="relative w-14 h-14 shrink-0">
                    <Image
                      src={tier.image}
                      alt={tier.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                <div className="p-2.5 rounded-sm bg-[#F1F1F1] dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5">
                  <div className="relative w-3.5 h-3.5 shrink-0">
                    <Image
                      src="/utils/gamification/utils/xp.webp"
                      alt="XP"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span>
                    {tier.minXp === 0
                      ? "Faixa de Entrada: 0 - 499 XP"
                      : tier.maxXp
                      ? `Requisito: ${tier.minXp.toLocaleString("pt-BR")} a ${tier.maxXp.toLocaleString("pt-BR")} XP`
                      : tier.isSpecialPinnacle
                      ? "Exclusivo: #1 do Ranking Global de XP"
                      : "Requisito: 10.000+ XP Acumulados"}
                  </span>
                </div>

                <p className="text-xs text-zinc-600 dark:text-zinc-300 leading-relaxed">
                  {tier.description}
                </p>

                <div className="space-y-2 pt-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">
                    Benefícios e Vantagens:
                  </span>
                  <ul className="space-y-1.5 text-xs text-zinc-600 dark:text-zinc-300">
                    {tier.perks.map((perk, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" weight="fill" />
                        <span>{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {tier.isProtectedBase && (
                <div className="mt-4 pt-3 border-t border-zinc-200 dark:border-zinc-800 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" weight="fill" />
                  <span className="text-[10px] font-bold text-zinc-600 dark:text-zinc-300 uppercase tracking-wider">
                    Base Segura Protegida • Rebaixamento Impossível
                  </span>
                </div>
              )}

              {tier.isSpecialPinnacle && (
                <div className="mt-4 pt-3 border-t border-zinc-200 dark:border-zinc-800 flex items-center gap-1.5">
                  <Crown className="w-3.5 h-3.5 text-brand-primary shrink-0" weight="fill" />
                  <span className="text-[10px] font-bold text-brand-primary uppercase tracking-wider">
                    Patrono Único • Atualizado em Tempo Real
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="relative w-5 h-5 shrink-0">
            <Image
              src="/utils/gamification/utils/xp.webp"
              alt="XP"
              fill
              className="object-contain"
            />
          </div>
          <h3 className="text-lg sm:text-xl font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white">
            Tabela de Pontuação de Ações
          </h3>
        </div>

        <div className="rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-[#F1F1F1]/60 dark:bg-zinc-900/60 text-zinc-500 dark:text-zinc-400 font-bold uppercase tracking-wider text-[10px]">
                  <th className="py-3.5 px-4">Ação / Atividade</th>
                  <th className="py-3.5 px-4">Categoria</th>
                  <th className="py-3.5 px-4">Como Realizar</th>
                  <th className="py-3.5 px-4 text-right">Recompensa</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800/80">
                {XP_ACTIONS_TABLE.map((row, idx) => {
                  const Icon = row.icon
                  const isXp = row.xp.includes("XP")

                  return (
                    <tr key={idx} className="hover:bg-zinc-50 dark:hover:bg-zinc-900/40 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-sm bg-[#F1F1F1] dark:bg-zinc-800 flex items-center justify-center text-brand-primary shrink-0">
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="font-bold text-zinc-900 dark:text-white">
                            {row.action}
                          </span>
                        </div>
                      </td>

                      <td className="py-4 px-4">
                        <Badge
                          color="default"
                          variant="flat"
                          radius="sm"
                          className="text-[9px] font-black uppercase"
                        >
                          {row.category}
                        </Badge>
                      </td>

                      <td className="py-4 px-4 text-zinc-500 dark:text-zinc-400 text-xs max-w-xs">
                        {row.desc}
                      </td>

                      <td className="py-4 px-4 text-right">
                        <div className="inline-flex items-center justify-end gap-1 font-black font-heading text-sm text-zinc-900 dark:text-white whitespace-nowrap">
                          <div className="relative w-3.5 h-3.5 shrink-0">
                            <Image
                              src={isXp ? "/utils/gamification/utils/xp.webp" : "/utils/gamification/utils/RIB.svg"}
                              alt={isXp ? "XP" : "RIB"}
                              fill
                              className="object-contain"
                            />
                          </div>
                          <span>{row.xp}</span>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="rounded-sm border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#141416] p-6 sm:p-8 space-y-6 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-sm bg-brand-primary/10 text-brand-primary flex items-center justify-center shrink-0">
            <ClockCounterClockwise className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white">
              Regra de Retenção de 6 Meses & Rebaixamento
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Critérios de manutenção de status e atividade mínima na plataforma.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-zinc-600 dark:text-zinc-300">
          <div className="p-4 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-[#F1F1F1]/50 dark:bg-zinc-900/40 space-y-2">
            <div className="flex items-center gap-2 font-black uppercase text-zinc-900 dark:text-white text-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>1. Base Protegida (Associado)</span>
            </div>
            <p className="leading-relaxed">
              Ao completar seu perfil e ativar o 2FA, você atinge o Nível <strong>Associado (500 XP)</strong>. Este é o patamar mínimo incondicional: nenhum associado que tenha completado o cadastro será rebaixado abaixo deste nível, garantindo acesso perpétuo às tarifas básicas de membro.
            </p>
          </div>

          <div className="p-4 rounded-sm border border-zinc-200 dark:border-zinc-800 bg-[#F1F1F1]/50 dark:bg-zinc-900/40 space-y-2">
            <div className="flex items-center gap-2 font-black uppercase text-zinc-900 dark:text-white text-xs">
              <ShieldWarning className="w-4 h-4 text-amber-500" />
              <span>2. Janela de 6 Meses (Titular em diante)</span>
            </div>
            <p className="leading-relaxed">
              A partir do Nível <strong>Titular (2.000 XP)</strong>, o associado precisa realizar ao menos 1 atividade qualificadora a cada 180 dias. Se houver inatividade total por 6 meses consecutivos, o status entra em estado <em>Congelado</em> e o membro opera temporariamente como Associado.
            </p>
          </div>
        </div>

        <div className="p-4 rounded-sm bg-brand-primary/5 border border-brand-primary/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Info className="w-5 h-5 text-brand-primary shrink-0" />
            <p className="text-xs font-semibold text-zinc-800 dark:text-zinc-200">
              <strong>Como descongelar?</strong> Basta realizar qualquer ação na plataforma (reservar hospedagem, confirmar presença em evento, garantir experiência ou conectar-se com um novo membro) para restaurar instantaneamente o seu nível pleno.
            </p>
          </div>

          <Link
            href="/hospedagens"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-sm bg-brand-primary hover:bg-brand-primary/90 text-white text-xs font-black uppercase tracking-wider shrink-0 transition-all shadow-2xs whitespace-nowrap"
          >
            <span>Explorar Plataforma</span>
            <ArrowRight className="w-3.5 h-3.5 shrink-0" />
          </Link>
        </div>
      </div>
    </Container>
  )
}
