"use client"

import * as React from "react"

import Image from "next/image"
import Link from "next/link"

import { usePortalStore } from "@/src/store/usePortalStore"
import { ArrowUp, InstagramLogo, WhatsappLogo } from "@phosphor-icons/react"

import { Container } from "@/src/components/common/container"

import { cn } from "@/src/lib/utils"

import { brandConfig } from "@/src/config/brand.config"

const publicNavLinks = [
  { href: "/#sobre", label: `Sobre a ${brandConfig.name}` },
  { href: "/#parceiros", label: "Parceiros" },
  { href: "/#experiencia", label: "Experiência" },
  { href: "/#como-funciona", label: "Como Funciona" },
  { href: "/hospedagens", label: "Hospedagens" },
  { href: "/#faq", label: "Perguntas Frequentes" },
] as const

const publicMemberLinks = [
  { href: brandConfig.links.login, label: "Já sou associado (Login)" },
  { href: brandConfig.links.subscription, label: "Quero ser associado" },
  { href: "/hospedagens", label: "Explorar Hospedagens" },
] as const

const portalNavLinks = [
  { href: "/", label: "Início" },
  { href: "/hospedagens", label: "Hospedagens" },
  { href: "/eventos", label: "Eventos" },
  { href: "/experiencias", label: "Experiências" },
  { href: "/beneficios", label: "Benefícios" },
  { href: "/conexoes", label: "Conexões" },
  { href: "/keypass", label: "KeyPass & Tiers" },
] as const

const portalMemberLinks = [
  { href: "/perfil", label: "Meu Perfil" },
  { href: "/perfil/minha-assinatura", label: "Minha Assinatura" },
  { href: "/hospedagens/minhas-hospedagens", label: "Minhas Hospedagens" },
  { href: "/eventos/meus-eventos", label: "Meus Eventos" },
  { href: "/conexoes/minhas-conexoes", label: "Minhas Conexões" },
  { href: "/keypass/missoes", label: "Missões KeyPass" },
  { href: "/keypass/ranking", label: "Ranking Geral" },
  { href: "/keypass/regras", label: "Tiers & Regulamento" },
] as const

const emptySubscribe = () => () => {}

export function Footer(): React.JSX.Element | null {
  const mounted = React.useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  )
  const isAuthenticated = usePortalStore((state) => state.isAuthenticated)
  const homeHref = "/"

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (!mounted) {
    return null
  }

  const activeNavLinks = isAuthenticated ? portalNavLinks : publicNavLinks

  const activeMemberLinks = isAuthenticated
    ? portalMemberLinks
    : publicMemberLinks

  return (
    <footer className="bg-[#161616] text-zinc-400 pt-16 sm:pt-20 pb-24 sm:pb-32 border-t border-zinc-800 w-full relative overflow-hidden mt-auto">
      {brandConfig.id === "viverde" ? (
        <div
          aria-hidden="true"
          className="absolute -right-16 sm:-right-24 md:-right-32 -bottom-16 sm:-bottom-24 md:-bottom-32 w-[clamp(500px,80vw,1250px)] pointer-events-none select-none z-0 opacity-[0.035] flex justify-end items-end"
        >
          <Image
            src={
              brandConfig.assets.iconWhite || "/logos/viverde/icon_white.svg"
            }
            alt=""
            width={1842}
            height={622}
            className="w-full h-auto object-contain object-right-bottom"
          />
        </div>
      ) : (
        <div
          aria-hidden="true"
          className="absolute -right-12 sm:-right-20 md:-right-28 -bottom-10 sm:-bottom-16 md:-bottom-20 w-[clamp(400px,60vw,850px)] pointer-events-none select-none z-0 opacity-[0.035] flex justify-end items-end"
        >
          <div className="w-full aspect-[758/389] relative flex items-center justify-center">
            <Image
              src={
                brandConfig.assets.iconWhite ||
                brandConfig.assets.iconDark ||
                "/logos/icon_white.svg"
              }
              alt=""
              width={389}
              height={758}
              className="w-auto h-full max-w-none object-contain rotate-90"
            />
          </div>
        </div>
      )}

      <Container className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16">
          <div className="lg:col-span-2 space-y-4">
            <Link
              href={homeHref}
              className="inline-flex items-center transition-opacity hover:opacity-90"
              aria-label={`${brandConfig.name} - Início`}
            >
              {brandConfig.assets.logoMain || brandConfig.assets.logoDark ? (
                <div
                  className={cn(
                    "relative w-auto flex items-center",
                    brandConfig.id === "viverde"
                      ? "h-11 sm:h-13 md:h-14"
                      : "h-9 sm:h-10"
                  )}
                >
                  <Image
                    src={
                      brandConfig.assets.logoDark || brandConfig.assets.logoMain
                    }
                    alt={brandConfig.name}
                    width={200}
                    height={48}
                    className={cn(
                      "w-auto object-contain object-left",
                      brandConfig.id === "viverde"
                        ? "h-11 sm:h-13 md:h-14 max-h-14"
                        : "h-8 sm:h-9 max-h-9"
                    )}
                  />
                </div>
              ) : (
                <span className="font-heading font-black text-2xl sm:text-3xl text-white tracking-wider uppercase">
                  {brandConfig.assets.logoText || brandConfig.name}
                </span>
              )}
            </Link>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-sm font-light">
              {isAuthenticated
                ? `Portal exclusivo para associados ${brandConfig.name}. Acesso privilegiado a tarifas com até 60% OFF em acomodações de alto padrão, eventos e experiências únicas.`
                : brandConfig.description}
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-brand-primary">
              {isAuthenticated ? "Explorar Portal" : "Navegação"}
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              {activeNavLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-brand-primary">
              {isAuthenticated ? "Área do Membro" : "Associados"}
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              {activeMemberLinks.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="hover:text-white transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-brand-primary">
              {isAuthenticated ? "Suporte & Contato" : "Contato"}
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              {brandConfig.links.whatsapp ? (
                <li className="flex items-center gap-2.5">
                  <WhatsappLogo className="w-4 h-4 text-brand-primary shrink-0" />
                  <Link
                    href={
                      brandConfig.links.whatsappUrl ||
                      `https://wa.me/${brandConfig.links.whatsapp.replace(/\D/g, "")}`
                    }
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    {brandConfig.links.whatsapp}
                  </Link>
                </li>
              ) : null}
              <li className="flex items-center gap-2.5">
                <InstagramLogo className="w-4 h-4 text-brand-primary shrink-0" />
                <Link
                  href={brandConfig.links.instagram}
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {brandConfig.links.instagramUser ||
                    brandConfig.links.instagram.replace(
                      "https://instagram.com/",
                      ""
                    )}
                </Link>
              </li>
              {isAuthenticated && (
                <li className="pt-1">
                  <Link
                    href="/keypass/regras"
                    className="text-[11px] text-zinc-400 hover:text-brand-primary transition-colors"
                  >
                    Dúvidas sobre Tiers e KeyPass? Ver Regulamento &rarr;
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            &copy; {new Date().getFullYear()} {brandConfig.name}. Todos os
            direitos reservados.
          </div>

          <div className="flex items-center gap-6">
            {isAuthenticated ? (
              <>
                <Link
                  href="/hospedagens"
                  className="hover:text-white transition-colors"
                >
                  Hospedagens
                </Link>
                <Link
                  href="/eventos"
                  className="hover:text-white transition-colors"
                >
                  Eventos
                </Link>
                <Link
                  href="/keypass"
                  className="hover:text-white transition-colors"
                >
                  KeyPass
                </Link>
                <Link
                  href="/perfil"
                  className="hover:text-white transition-colors"
                >
                  Perfil
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/hospedagens"
                  className="hover:text-white transition-colors"
                >
                  Hospedagens
                </Link>
                <Link
                  href={brandConfig.links.subscription}
                  className="hover:text-white transition-colors"
                >
                  Assinatura
                </Link>
              </>
            )}
            <button
              type="button"
              onClick={scrollToTop}
              className="w-10 h-10 rounded-full border border-white/20 text-white flex items-center justify-center hover:bg-white hover:text-black transition-all cursor-pointer group shrink-0 ml-4"
              aria-label="Voltar ao topo"
            >
              <ArrowUp className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </Container>
    </footer>
  )
}
