"use client"

import * as React from "react"

import Image from "next/image"

import { TIERS_LIST } from "@/src/data/portalData"
import {
  ArrowsClockwise,
  ClockCounterClockwise,
  Crown,
  Info,
  ShieldCheck,
  Trophy,
} from "@phosphor-icons/react"

import { Container } from "@/src/components/common/container"

import { cn } from "@/src/lib/utils"

export default function KeyPassRulesPage(): React.JSX.Element {
  return (
    <Container className="py-6 sm:py-8 space-y-4">
      {}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-4">
          <div className="space-y-0.5 min-w-0">
            <div className="flex items-center gap-2">
              <Trophy
                className="w-4 h-4 text-zinc-900 dark:text-white shrink-0"
                weight="bold"
              />
              <h2 className="text-lg sm:text-xl font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white">
                Guia Completo dos 6 Tiers
              </h2>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-medium">
              Progressão institucional com benefícios cumulativos a cada tier
              alcançado.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {TIERS_LIST.map((tier, index) => (
            <div
              key={tier.id}
              className={cn(
                "rounded-xl border p-5 flex flex-col justify-between bg-white dark:bg-zinc-900 shadow-2xs space-y-4 relative overflow-hidden",
                tier.isSpecialPinnacle
                  ? "border-brand-primary/60 ring-1 ring-brand-primary/20"
                  : "border-zinc-200 dark:border-zinc-800"
              )}
            >
              {}
              <span className="absolute -bottom-2 -right-1 text-6xl font-heading font-black text-zinc-900/[0.04] dark:text-white/[0.04] pointer-events-none select-none leading-none z-0">
                0{index + 1}
              </span>

              <div className="space-y-3 relative z-10">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-sm bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-700 block w-fit">
                      Tier 0{tier.order} de 06
                    </span>
                    <h3 className="text-base font-heading font-black uppercase text-zinc-900 dark:text-white">
                      {tier.name}
                    </h3>
                    <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                      {tier.subtitle}
                    </p>
                  </div>

                  <div className="relative w-12 h-12 sm:w-14 sm:h-14 shrink-0 flex items-center justify-center">
                    <Image
                      src={tier.image}
                      alt={tier.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-zinc-50/60 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 text-xs font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-1.5">
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

                <p className="text-xs text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                  {tier.description}
                </p>

                <div className="space-y-1.5 pt-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block">
                    Benefícios e Vantagens:
                  </span>
                  <ul className="space-y-2 text-xs text-zinc-700 dark:text-zinc-300 font-medium">
                    {tier.perks.map((perk, idx) => (
                      <li key={idx} className="flex items-start gap-2.5">
                        <div className="relative w-5 h-5 sm:w-5.5 sm:h-5.5 shrink-0 mt-0.5">
                          <Image
                            src="/utils/icons/check.webp"
                            alt=""
                            fill
                            className="object-contain"
                          />
                        </div>
                        <span className="leading-snug pt-0.5">{perk}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="relative z-10 pt-3 border-t border-zinc-100 dark:border-zinc-800">
                {tier.isProtectedBase ? (
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-700 dark:text-zinc-300 uppercase tracking-wider">
                    <ShieldCheck
                      className="w-3.5 h-3.5 text-zinc-700 dark:text-zinc-300 shrink-0"
                      weight="fill"
                    />
                    <span>Base Segura Protegida • Sem Rebaixamento</span>
                  </div>
                ) : tier.isSpecialPinnacle ? (
                  <div className="flex items-center gap-1.5 text-[10px] font-bold text-brand-primary uppercase tracking-wider">
                    <Crown
                      className="w-3.5 h-3.5 text-brand-primary shrink-0"
                      weight="fill"
                    />
                    <span>Patrono Único • Atualizado em Tempo Real</span>
                  </div>
                ) : (
                  <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-wider block">
                    Janela de Retenção de 180 Dias
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <ClockCounterClockwise
            className="w-4 h-4 text-zinc-900 dark:text-white"
            weight="bold"
          />
          <h2 className="text-lg sm:text-xl font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white">
            Regra de Retenção de 6 Meses & Rebaixamento
          </h2>
        </div>

        <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 sm:p-6 space-y-4 shadow-2xs">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {}
            <div className="relative overflow-hidden p-5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30">
              {}
              <div className="absolute -bottom-4 -right-4 pointer-events-none select-none opacity-[0.06] dark:opacity-[0.1]">
                <ShieldCheck
                  className="w-28 h-28 text-zinc-900 dark:text-white"
                  weight="fill"
                />
              </div>

              <div className="relative z-10 space-y-2">
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                    1. Base Protegida (Membro & Associado)
                  </h3>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">
                    Patamares seguros e incondicionais
                  </p>
                </div>

                <p className="text-xs text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                  Os tiers{" "}
                  <strong className="text-zinc-900 dark:text-white font-bold">
                    Membro
                  </strong>{" "}
                  e{" "}
                  <strong className="text-zinc-900 dark:text-white font-bold">
                    Associado
                  </strong>{" "}
                  são 100% seguros e vitais: não há rebaixamento nem risco de
                  perda de status. Você nunca cai destes tiers, garantindo
                  acesso perpétuo às vantagens da plataforma.
                </p>
              </div>
            </div>

            {}
            <div className="relative overflow-hidden p-5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30">
              {}
              <div className="absolute -bottom-4 -right-4 pointer-events-none select-none opacity-[0.06] dark:opacity-[0.1]">
                <ClockCounterClockwise
                  className="w-28 h-28 text-zinc-900 dark:text-white"
                  weight="bold"
                />
              </div>

              <div className="relative z-10 space-y-2">
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                    2. Ciclo de Atividade (Titular+)
                  </h3>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">
                    Manutenção de tiers superiores
                  </p>
                </div>

                <p className="text-xs text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                  A partir do tier{" "}
                  <strong className="text-zinc-900 dark:text-white font-bold">
                    Titular (2.000 XP)
                  </strong>
                  , é necessário realizar ao menos 1 atividade qualificadora a
                  cada 180 dias para conservar os privilégios máximos e tarifas
                  de seu patamar.
                </p>
              </div>
            </div>

            {}
            <div className="relative overflow-hidden p-5 rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-800/30">
              {}
              <div className="absolute -bottom-4 -right-4 pointer-events-none select-none opacity-[0.06] dark:opacity-[0.1]">
                <ArrowsClockwise
                  className="w-28 h-28 text-zinc-900 dark:text-white"
                  weight="bold"
                />
              </div>

              <div className="relative z-10 space-y-2">
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-white">
                    3. Descongelamento Imediato
                  </h3>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400 font-medium">
                    Restauração com apenas 1 ação
                  </p>
                </div>

                <p className="text-xs text-zinc-600 dark:text-zinc-400 font-medium leading-relaxed">
                  Em caso de inatividade de 6 meses, o tier fica pausado
                  temporariamente como Associado. Basta realizar qualquer ação
                  (reserva, evento, experiência ou conexão) para restaurar
                  instantaneamente o seu tier pleno.
                </p>
              </div>
            </div>
          </div>

          {}
          <div className="p-3.5 rounded-lg bg-zinc-50/70 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 flex items-center gap-3">
            <Info
              className="w-4 h-4 text-zinc-700 dark:text-zinc-300 shrink-0"
              weight="bold"
            />
            <p className="text-xs font-medium text-zinc-700 dark:text-zinc-300 leading-relaxed">
              <strong className="text-zinc-900 dark:text-white font-bold">
                Seu XP acumulado e Tokens RIB nunca expiram:
              </strong>{" "}
              O histórico de pontos e tokens permanece integralmente preservado
              durante períodos de pausa, garantindo total segurança do seu
              patrimônio de benefícios.
            </p>
          </div>
        </div>
      </div>
    </Container>
  )
}
