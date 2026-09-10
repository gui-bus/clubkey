"use client"

import * as React from "react"

import Image from "next/image"
import Link from "next/link"

import { ArrowUp, Mail, ShieldCheck } from "lucide-react"

import { Container } from "@/src/components/common/container"

export function Footer(): React.JSX.Element {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="bg-[#161616] text-zinc-400 pt-16 pb-12 border-t border-zinc-800 w-full relative overflow-hidden">
      <Container className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16">
          <div className="lg:col-span-2 space-y-4">
            <div className="relative h-10 w-40">
              <Image
                src="/logos/logo_white.svg"
                alt="ClubKey"
                fill
                className="object-contain object-left"
              />
            </div>
            <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-sm font-light">
              O passaporte definitivo para um estilo de vida de liberdade,
              experiências autênticas e até 60% de economia em hospedagens de
              alto padrão selecionadas.
            </p>
            <div className="pt-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#FF6847]">
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
              <li>
                <Link
                  href="/#sobre-a-club-key"
                  className="hover:text-white transition-colors"
                >
                  Sobre a ClubKey
                </Link>
              </li>
              <li>
                <Link
                  href="/#parceiros"
                  className="hover:text-white transition-colors"
                >
                  Parceiros
                </Link>
              </li>
              <li>
                <Link
                  href="/#experiencia"
                  className="hover:text-white transition-colors"
                >
                  Experiência
                </Link>
              </li>
              <li>
                <Link
                  href="/#como-funciona"
                  className="hover:text-white transition-colors"
                >
                  Como Funciona
                </Link>
              </li>
              <li>
                <Link
                  href="/rooms"
                  className="hover:text-white transition-colors"
                >
                  Catálogo
                </Link>
              </li>
              <li>
                <Link
                  href="/#faq"
                  className="hover:text-white transition-colors"
                >
                  Perguntas Frequentes
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-white">
              Associados
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>
                <Link
                  href="https://clubkey.io/login"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Já sou associado (Login)
                </Link>
              </li>
              <li>
                <Link
                  href="https://clubkey.io/subscription"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Quero ser associado
                </Link>
              </li>
              <li>
                <Link
                  href="/rooms"
                  className="hover:text-white transition-colors"
                >
                  Explorar Hospedagens
                </Link>
              </li>
              <li>
                <Link
                  href="mailto:contato@clubkey.io"
                  className="hover:text-white transition-colors"
                >
                  Suporte & Concierge
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-xs font-mono font-bold uppercase tracking-widest text-white">
              Contato
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              <li>
                <Link
                  href="mailto:contato@clubkey.io"
                  className="hover:text-[#FF6847] transition-colors flex items-center gap-2"
                >
                  <Mail className="w-3.5 h-3.5 text-[#FF6847]" />
                  <span>contato@clubkey.io</span>
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
            &copy; {new Date().getFullYear()} ClubKey.io. Todos os direitos
            reservados.
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="/rooms"
              className="hover:text-white transition-colors"
            >
              Hospedagens
            </Link>
            <Link
              href="https://clubkey.io/subscription"
              target="_blank"
              rel="noreferrer"
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
              <ArrowUp className="w-3.5 h-3.5 text-[#FF6847]" />
            </button>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-zinc-900/60 select-none pointer-events-none text-center">
          <div className="text-3xl sm:text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-zinc-800/20 whitespace-nowrap">
            CLUBKEY
          </div>
        </div>
      </Container>
    </footer>
  )
}
