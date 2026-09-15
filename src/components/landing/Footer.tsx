"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowUp, Mail, ShieldCheck } from "lucide-react"

import { Container } from "@/src/components/common/container"
import { brandConfig } from "@/src/config/brand.config"
import { usePortalStore } from "@/src/store/usePortalStore"

const clubKeyNavLinks = [
  { href: "/#sobre-a-club-key", label: `Sobre a ${brandConfig.name}` },
  { href: "/#parceiros", label: "Parceiros" },
  { href: "/#experiencia", label: "Experiência" },
  { href: "/#como-funciona", label: "Como Funciona" },
  { href: "/hospedagens", label: "Catálogo" },
  { href: "/#faq", label: "Perguntas Frequentes" },
] as const

const genericNavLinks = [
  { href: "/hospedagens", label: "Hospedagens" },
  { href: brandConfig.links.subscription, label: "Assinatura" },
  { href: brandConfig.links.login, label: "Área do Membro" },
] as const

const memberLinks = [
  { href: brandConfig.links.login, label: "Já sou associado (Login)" },
  { href: brandConfig.links.subscription, label: "Quero ser associado" },
  { href: "/hospedagens", label: "Explorar Hospedagens" },
  { href: `mailto:${brandConfig.links.contactEmail}`, label: "Suporte & Concierge" },
] as const

export function Footer(): React.JSX.Element | null {
  const [mounted, setMounted] = React.useState(false)
  const isAuthenticated = usePortalStore((state) => state.isAuthenticated)
  const isClubKey = brandConfig.id === "clubkey"
  const homeHref = isClubKey ? "/" : "/hospedagens"
  const activeNavLinks = isClubKey ? clubKeyNavLinks : genericNavLinks

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (!mounted || isAuthenticated) {
    return null
  }

  return (
    <footer className="bg-[#161616] text-zinc-400 pt-16 pb-12 border-t border-zinc-800 w-full relative overflow-hidden">
      <Container className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16">
          <div className="lg:col-span-2 space-y-4">
            <Link
              href={homeHref}
              className="inline-block transition-opacity hover:opacity-90"
              aria-label={`${brandConfig.name} - Início`}
            >
              {brandConfig.assets.logoMain ? (
                <div className="relative h-10 w-40">
                  <Image
                    src={brandConfig.assets.logoMain}
                    alt={brandConfig.name}
                    fill
                    className="object-contain object-left"
                  />
                </div>
              ) : (
                <span className="font-heading font-black text-2xl sm:text-3xl text-white tracking-wider uppercase">
                  {brandConfig.assets.logoText || brandConfig.name}
                </span>
              )}
            </Link>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-sm font-light">
              {brandConfig.description}
            </p>
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-brand-primary">
                <ShieldCheck className="w-4 h-4" />
                <span>CLUBE PRIVADO DE HOSPITALIDADE</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-white">
              Navegação
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
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-white">
              Associados
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              {memberLinks.map((item) => (
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
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-white">
              Contato
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>
                <Link
                  href={`mailto:${brandConfig.links.contactEmail}`}
                  className="hover:text-brand-primary transition-colors flex items-center gap-2"
                >
                  <Mail className="w-3.5 h-3.5 text-brand-primary" />
                  <span>{brandConfig.links.contactEmail}</span>
                </Link>
              </li>
              <li className="pt-2">
                <span className="text-zinc-500 text-[11px] leading-relaxed block font-light">
                  Atendimento de concierge de segunda a sexta, das 9h às 18h.
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div>
            &copy; {new Date().getFullYear()} {brandConfig.name}. Todos os direitos
            reservados.
          </div>

          <div className="flex items-center gap-6">
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
            <button
              type="button"
              onClick={scrollToTop}
              className="hover:text-white transition-colors inline-flex items-center gap-1 text-xs cursor-pointer ml-4"
            >
              <span>Voltar ao topo</span>
              <ArrowUp className="w-3.5 h-3.5 text-brand-primary" />
            </button>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-zinc-900/60 select-none pointer-events-none text-center">
          <div className="text-3xl sm:text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-zinc-800/20 whitespace-nowrap">
            {brandConfig.assets.logoText || brandConfig.name}
          </div>
        </div>
      </Container>
    </footer>
  )
}
