"use client"

import * as React from "react"

import Image from "next/image"
import Link from "next/link"

import { ArrowUp, Mail, ShieldCheck } from "lucide-react"

export function Footer(): React.JSX.Element {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <footer className="bg-[#161616] text-zinc-400 pt-20 pb-12 border-t border-zinc-800 w-full relative overflow-hidden">
      <div className="w-full max-w-440 mx-auto px-6 md:px-12 relative z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-16 border-b border-zinc-800 gap-8">
          <div className="max-w-2xl">
            <div className="w-fit inline-flex items-center justify-center py-1 rounded-tr-full rounded-bl-full px-6 bg-[#FF6847] text-white text-[10px] font-bold uppercase tracking-wider mb-3">
              Membro ClubKey
            </div>
            <h3 className="text-2xl sm:text-4xl font-black uppercase text-white tracking-tight leading-tight">
              ATIVE SUA KEY HOJE E PAGUE MENOS PARA VIAJAR
            </h3>
            <p className="text-zinc-400 text-sm mt-2 font-light">
              Descontos reais de até 60% e benefícios exclusivos em mais de 150
              países.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="https://clubkey.io/subscription"
              target="_blank"
              rel="noreferrer"
              className="shrink-0 inline-flex items-center justify-center gap-3 px-9 py-4.5 rounded-none bg-[#FF6847] hover:bg-[#E85535] text-white font-black text-xs uppercase tracking-wider transition-colors duration-200 shadow-xl cursor-pointer"
            >
              <span>Quero ser associado</span>

              <Image
                src="/utils/gifs/arrow_right.gif"
                alt=""
                width={16}
                height={16}
                unoptimized
                className="w-4 h-4 invert brightness-0"
              />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-16">
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
                  href="#o-que-e"
                  className="hover:text-white transition-colors"
                >
                  O que é ClubKey
                </Link>
              </li>
              <li>
                <Link
                  href="#como-funciona"
                  className="hover:text-white transition-colors"
                >
                  Como Funciona
                </Link>
              </li>
              <li>
                <Link
                  href="#catalogo"
                  className="hover:text-white transition-colors"
                >
                  Catálogo Selecionado
                </Link>
              </li>
              <li>
                <Link
                  href="#beneficios"
                  className="hover:text-white transition-colors"
                >
                  Grandes Marcas & Benefícios
                </Link>
              </li>
              <li>
                <Link
                  href="#planos"
                  className="hover:text-white transition-colors"
                >
                  Planos de Membro
                </Link>
              </li>
              <li>
                <Link
                  href="#faq"
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
                  href="https://clubkey.io/rooms"
                  target="_blank"
                  rel="noreferrer"
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
              href="https://clubkey.io/rooms"
              target="_blank"
              rel="noreferrer"
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
      </div>
    </footer>
  )
}
