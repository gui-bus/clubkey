"use client"

import * as React from "react"

import Image from "next/image"
import Link from "next/link"

import { Menu, User, X } from "lucide-react"

import { ThemeToggle } from "@/src/components/common/themeToggle"

import { cn } from "@/src/lib/utils/utils"

const navLinks = [
  { name: "O que é", href: "#o-que-e" },
  { name: "Como Funciona", href: "#como-funciona" },
  { name: "Catálogo", href: "#catalogo" },
  { name: "Calculadora", href: "#calculadora" },
  { name: "Benefícios", href: "#beneficios" },
  { name: "Planos", href: "#planos" },
  { name: "FAQ", href: "#faq" },
]

export function Navbar(): React.JSX.Element {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [activeSection, setActiveSection] = React.useState<string>("")

  React.useEffect(() => {
    const sectionIds = [
      "o-que-e",
      "como-funciona",
      "catalogo",
      "calculadora",
      "beneficios",
      "planos",
      "faq",
    ]
    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + 200
      for (const id of sectionIds) {
        const el = document.getElementById(id)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(`#${id}`)
            return
          }
        }
      }
      if (window.scrollY < 200) {
        setActiveSection("")
      }
    }

    handleScrollSpy()
    window.addEventListener("scroll", handleScrollSpy, { passive: true })
    return () => window.removeEventListener("scroll", handleScrollSpy)
  }, [])

  return (
    <div className="absolute top-0 left-0 right-0 z-40 bg-transparent pt-20 sm:pt-14 md:pt-12">
      <header className="w-full bg-transparent border-b border-white/10 py-3 sm:py-5">
        <div className="w-full max-w-440 mx-auto px-6 md:px-12 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
            <Link
              href="#"
              className="flex items-center transition-opacity hover:opacity-90"
              aria-label="ClubKey - Início"
            >
              <div className="relative h-9 sm:h-10 w-32 sm:w-36">
                <Image
                  src="/logos/logo_white.svg"
                  alt="ClubKey"
                  fill
                  priority
                  className="object-contain object-left drop-shadow-xs"
                />
              </div>
            </Link>
          </div>

          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "relative px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors duration-200 group whitespace-nowrap",
                    isActive
                      ? "text-[#FF6847] font-extrabold"
                      : "text-zinc-300 hover:text-white"
                  )}
                >
                  <span>{link.name}</span>
                  <span
                    className={cn(
                      "absolute bottom-0 left-3.5 right-3.5 h-0.5 transition-transform duration-300 origin-center bg-[#FF6847]",
                      isActive
                        ? "scale-x-100"
                        : "scale-x-0 group-hover:scale-x-100"
                    )}
                  />
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-4 sm:gap-5 flex-shrink-0">
            <ThemeToggle />

            <a
              href="https://clubkey.io/login"
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-zinc-200 hover:text-[#FF6847] transition-colors"
            >
              <User className="w-3.5 h-3.5" />
              <span>Já sou associado</span>
            </a>

            <div className="flex xl:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-full transition-all cursor-pointer flex items-center justify-center bg-white/10 hover:bg-white/20 text-white"
                aria-label="Abrir Menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="w-full bg-[#161616]/95 backdrop-blur-md border-b border-zinc-800 p-6 xl:hidden shadow-2xl transition-all">
          <div className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 text-sm font-bold uppercase tracking-wider text-zinc-200 hover:text-[#FF6847] hover:bg-zinc-800/60 transition-colors"
              >
                {link.name}
              </Link>
            ))}

            <div className="h-px bg-zinc-800 my-2" />

            <div className="flex flex-col gap-3 pt-2">
              <a
                href="https://clubkey.io/login"
                target="_blank"
                rel="noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 border border-zinc-700 text-xs font-bold uppercase tracking-wider text-white hover:bg-zinc-800"
              >
                <User className="w-4 h-4" />
                <span>Já sou associado (Login)</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
