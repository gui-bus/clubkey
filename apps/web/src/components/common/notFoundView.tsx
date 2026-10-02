"use client"

import * as React from "react"

import Link from "next/link"
import { useRouter } from "next/navigation"

import { usePortalStore } from "@/src/store/usePortalStore"
import {
  ArrowLeft,
  ArrowRight,
  BuildingApartment,
  Calendar,
  Compass,
  Gift,
  House,
  Key,
  User,
  Users,
} from "@phosphor-icons/react"

import { Container } from "@/src/components/common/container"
import { CtaButton } from "@/src/components/common/ctaButton"

import { useBrandModules } from "@/src/hooks/useBrandModules"

import { type SystemModule, brandConfig } from "@/src/config/brand.config"

interface AvailableModuleCard {
  title: string
  description: string
  href: string
  icon: React.ElementType
  module?: SystemModule
}

const AVAILABLE_MODULES: AvailableModuleCard[] = [
  {
    title: "Hospedagens",
    description: "Vilas e acomodações selecionadas com tarifas exclusivas.",
    href: "/hospedagens",
    icon: BuildingApartment,
    module: "stays",
  },
  {
    title: "Conexões",
    description: "Diretório de membros e rede de networking qualificada.",
    href: "/conexoes",
    icon: Users,
    module: "networking",
  },
  {
    title: "Eventos",
    description: "Jantares, encontros estratégicos e fóruns privados.",
    href: "/eventos",
    icon: Calendar,
    module: "events",
  },
  {
    title: "Experiências",
    description: "Vivências sob medida e lifestyle pelo mundo.",
    href: "/experiencias",
    icon: Compass,
    module: "experiences",
  },
  {
    title: "Benefícios",
    description: "Vantagens e condições exclusivas de parceiros do clube.",
    href: "/beneficios",
    icon: Gift,
    module: "benefits",
  },
  {
    title: "KeyPass",
    description: "Metas, missões, pontuação de XP e tiers de associado.",
    href: "/keypass",
    icon: Key,
    module: "keypass",
  },
  {
    title: "Meu Perfil",
    description: "Gerencie suas preferências, dados e segurança da conta.",
    href: "/perfil",
    icon: User,
  },
]

export function NotFoundView(): React.JSX.Element {
  const router = useRouter()
  const { isAuthenticated } = usePortalStore()
  const { isEnabled } = useBrandModules()

  const homeHref = !isAuthenticated
    ? "/"
    : isEnabled("home")
      ? "/"
      : isEnabled("stays")
        ? "/hospedagens"
        : isEnabled("events")
          ? "/eventos"
          : isEnabled("experiences")
            ? "/experiencias"
            : isEnabled("benefits")
              ? "/beneficios"
              : isEnabled("networking")
                ? "/conexoes"
                : isEnabled("keypass")
                  ? "/keypass"
                  : "/perfil"

  const activeModules = React.useMemo(() => {
    return AVAILABLE_MODULES.filter((m) => !m.module || isEnabled(m.module))
  }, [isEnabled])

  const handleGoBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back()
    } else {
      router.push(homeHref)
    }
  }

  return (
    <div className="relative w-full flex-1 flex flex-col items-center justify-center py-16 sm:py-24 px-4 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none z-0 flex items-center justify-center opacity-[0.035] dark:opacity-[0.045]"
      >
        <span className="text-[220px] sm:text-[320px] md:text-[420px] lg:text-[500px] font-heading font-black tracking-tighter text-zinc-900 dark:text-white leading-none">
          404
        </span>
      </div>

      <Container className="relative z-10 max-w-4xl flex flex-col items-center text-center space-y-12">
        <div className="flex flex-col items-center text-center space-y-5 max-w-2xl mx-auto">
          <div className="space-y-2.5">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white leading-[1.08]">
              Página não encontrada
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-zinc-600 dark:text-zinc-400 font-normal leading-relaxed max-w-lg mx-auto">
              O endereço que você tentou acessar não foi encontrado, mudou de
              lugar ou está indisponível no portal {brandConfig.name}.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2 w-full max-w-xl mx-auto">
            <CtaButton
              href={homeHref}
              variant="primary"
              size="md"
              className="w-full sm:w-auto px-8 whitespace-nowrap"
              textClassName="whitespace-nowrap flex items-center justify-center"
            >
              <House className="w-4 h-4 mr-2 shrink-0" />
              <span className="whitespace-nowrap">Voltar ao início</span>
            </CtaButton>

            <CtaButton
              type="button"
              variant="outline"
              size="md"
              onClick={handleGoBack}
              className="w-full sm:w-auto px-8 whitespace-nowrap"
              textClassName="whitespace-nowrap flex items-center justify-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2 shrink-0" />
              <span className="whitespace-nowrap">Página anterior</span>
            </CtaButton>
          </div>
        </div>
        {activeModules.length > 0 && (
          <div className="w-full pt-8 border-t border-zinc-200 dark:border-zinc-800 space-y-6 flex flex-col items-center">
            <div className="text-center space-y-1 max-w-md mx-auto">
              <span className="text-[10px] font-black uppercase tracking-widest text-brand-primary block">
                Navegação Rápida
              </span>
              <h2 className="text-base sm:text-lg font-heading font-black uppercase tracking-tight text-zinc-900 dark:text-white">
                Centrais do Clube
              </h2>
              <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                Acesse rapidamente as principais áreas do portal:
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5 w-full max-w-3xl mx-auto">
              {activeModules.map((item) => {
                const IconComponent = item.icon
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="group relative overflow-hidden p-4 rounded-sm bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-brand-primary/50 dark:hover:border-brand-primary/50 transition-all flex flex-col justify-between min-h-[110px] shadow-2xs text-left"
                  >
                    <div className="absolute -right-2 -bottom-2 pointer-events-none select-none transition-all duration-300 group-hover:scale-110 group-hover:-rotate-6">
                      <IconComponent className="w-16 h-16 text-zinc-900/[0.04] dark:text-white/[0.04] group-hover:text-brand-primary/[0.08] dark:group-hover:text-brand-primary/[0.08] transition-colors" />
                    </div>

                    <div className="relative z-10 space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-xs bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
                            <IconComponent className="w-4 h-4" />
                          </div>
                          <h3 className="text-xs sm:text-sm font-bold uppercase tracking-tight text-zinc-900 dark:text-white group-hover:text-brand-primary transition-colors">
                            {item.title}
                          </h3>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-brand-primary group-hover:translate-x-0.5 transition-transform shrink-0" />
                      </div>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-snug font-normal">
                        {item.description}
                      </p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </Container>
    </div>
  )
}
