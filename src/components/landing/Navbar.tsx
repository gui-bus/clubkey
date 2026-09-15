"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  Menu,
  User,
  ChevronDown,
  LogOut,
  Calendar,
  Gift,
  MapPin,
  CreditCard,
} from "lucide-react"

import { Container } from "@/src/components/common/container"
import { CtaButton } from "@/src/components/common/ctaButton"
import { ThemeToggle } from "@/src/components/common/themeToggle"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/src/components/ui/sheet/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/src/components/ui/dropdownMenu/dropdownMenu"
import { Avatar, AvatarImage, AvatarFallback } from "@/src/components/ui/avatar/avatar"
import { Badge } from "@/src/components/ui/badge/badge"
import { brandConfig } from "@/src/config/brand.config"
import { cn } from "@/src/lib/utils"
import { usePortalStore } from "@/src/store/usePortalStore"
import { getInitials } from "@/src/data/portalData"

const isClubKey = brandConfig.id === "clubkey"

const PUBLIC_NAV_LINKS = isClubKey
  ? [
      { name: `Sobre a ${brandConfig.name}`, href: "/#sobre-a-club-key" },
      { name: "Parceiros", href: "/#parceiros" },
      { name: "Experiência", href: "/#experiencia" },
      { name: "Como Funciona", href: "/#como-funciona" },
      { name: "Catálogo", href: "/hospedagens" },
      { name: "FAQ", href: "/#faq" },
    ]
  : []

const PORTAL_NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Eventos", href: "/eventos" },
  { name: "Experiências", href: "/experiencias" },
  { name: "Conexões", href: "/conexoes" },
  { name: "Benefícios", href: "/beneficios" },
  { name: "Catálogo", href: "/hospedagens" },
]

export function Navbar({
  isTransparent,
}: {
  isTransparent?: boolean
} = {}): React.JSX.Element {
  const pathname = usePathname()
  const router = useRouter()
  const {
    isAuthenticated,
    userProfile,
    logout,
    memberStays,
    confirmedEvents
  } = usePortalStore()
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [activeSection, setActiveSection] = React.useState<string>("")

  const staysCount = memberStays?.length ?? 2
  const eventsCount = Object.keys(confirmedEvents || {}).filter(
    (k) => !!confirmedEvents[Number(k)]
  ).length || 1

  const userInitials = getInitials(userProfile?.name || "")
  const homeHref = isClubKey ? "/" : "/hospedagens"
  const userEmail = userProfile?.email || "william@tabatacapital.com"

  const isDetailRoute = Boolean(
    ((pathname?.startsWith("/rooms/") && pathname !== "/rooms") ||
      (pathname?.startsWith("/hospedagens/") &&
        pathname !== "/hospedagens" &&
        pathname !== "/hospedagens/minhas-hospedagens") ||
      (pathname?.startsWith("/eventos/") &&
        pathname !== "/eventos" &&
        pathname !== "/eventos/meus-eventos") ||
      (pathname?.startsWith("/agenda/") && pathname !== "/agenda") ||
      (pathname?.startsWith("/experiencias/") && pathname !== "/experiencias") ||
      (pathname?.startsWith("/conexoes/") && pathname !== "/conexoes") ||
      (pathname?.startsWith("/pessoas/") && pathname !== "/pessoas"))
  )

  const isPortalRoute = Boolean(
    (pathname === "/" && isAuthenticated) ||
      pathname === "/eventos" ||
      pathname?.startsWith("/eventos/") ||
      pathname === "/agenda" ||
      pathname?.startsWith("/agenda/") ||
      pathname === "/experiencias" ||
      pathname?.startsWith("/experiencias/") ||
      pathname === "/conexoes" ||
      pathname?.startsWith("/conexoes/") ||
      pathname === "/pessoas" ||
      pathname?.startsWith("/pessoas/") ||
      pathname === "/beneficios" ||
      pathname === "/perfil" ||
      pathname?.startsWith("/perfil/") ||
      pathname?.startsWith("/hospedagens/minhas-hospedagens")
  )

  const isAuthRoute = Boolean(
    pathname === "/sign-in" ||
      pathname === "/sign-up" ||
      pathname === "/login" ||
      pathname === "/forgot-password" ||
      pathname === "/reset-password"
  )

  const transparent =
    isTransparent !== undefined
      ? isTransparent
      : !isAuthRoute && !isDetailRoute

  const isDarkBar = true

  const handleLogout = () => {
    logout()
    router.push("/sign-in")
  }

  React.useEffect(() => {
    if (!isClubKey || pathname !== "/") return

    const sectionIds = [
      "sobre-a-club-key",
      "parceiros",
      "experiencia",
      "como-funciona",
      "catalogo",
      "faq",
    ]

    let ticking = false

    const handleScrollSpy = () => {
      if (ticking) return
      ticking = true

      window.requestAnimationFrame(() => {
        const scrollPosition = window.scrollY + 250
        let currentId = ""

        for (let i = sectionIds.length - 1; i >= 0; i--) {
          const id = sectionIds[i]
          const el = document.getElementById(id)
          if (el) {
            const top = el.offsetTop
            if (scrollPosition >= top) {
              currentId = id
              break
            }
          }
        }

        if (window.scrollY < 150) {
          currentId = ""
        }

        if (currentId) {
          const hashVal = `#${currentId}`
          setActiveSection(hashVal)
          if (window.location.hash !== hashVal || window.location.search) {
            window.history.replaceState(
              null,
              "",
              window.location.pathname + hashVal
            )
          }
        } else {
          setActiveSection("")
          if (window.location.hash || window.location.search) {
            window.history.replaceState(null, "", window.location.pathname)
          }
        }

        ticking = false
      })
    }

    handleScrollSpy()
    window.addEventListener("scroll", handleScrollSpy, { passive: true })
    return () => window.removeEventListener("scroll", handleScrollSpy)
  }, [pathname])

  return (
    <div
      className={cn(
        "z-40 w-full transition-colors",
        transparent
          ? cn(
              "absolute top-0 left-0 right-0 bg-transparent max-w-440 mx-auto",
              isAuthenticated ? "pt-0" : "pt-20 sm:pt-14 md:pt-12"
            )
          : isDarkBar
          ? cn(
              "relative bg-[#0c0c0c] border-b border-white/10 max-w-440 mx-auto",
              isAuthenticated ? "pt-0" : "pt-20 sm:pt-14 md:pt-12"
            )
          : "sticky top-0 bg-white/95 dark:bg-[#141416]/95 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800/80 text-zinc-900 dark:text-white"
      )}
    >
      <header className="w-full bg-transparent py-3 sm:py-4">
        <Container className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
            <Link
              href={homeHref}
              className="flex items-center transition-opacity hover:opacity-90"
              aria-label={`${brandConfig.name} - Início`}
            >
              {brandConfig.assets.logoMain ? (
                <div className="relative h-9 sm:h-10 w-32 sm:w-36">
                  <Image
                    src="/logos/logo_black.svg"
                    alt={brandConfig.name}
                    fill
                    priority
                    className={cn(
                      "object-contain object-left",
                      isDarkBar ? "hidden" : "block dark:hidden"
                    )}
                  />
                  <Image
                    src="/logos/logo_white.svg"
                    alt={brandConfig.name}
                    fill
                    priority
                    className={cn(
                      "object-contain object-left",
                      isDarkBar ? "block" : "hidden dark:block"
                    )}
                  />
                </div>
              ) : (
                <span
                  className={cn(
                    "font-heading font-black text-xl sm:text-2xl tracking-wider uppercase",
                    isDarkBar
                      ? "text-white"
                      : "text-zinc-900 dark:text-white"
                  )}
                >
                  {brandConfig.assets.logoText || brandConfig.name}
                </span>
              )}
            </Link>
          </div>

          {!isAuthenticated ? (
            PUBLIC_NAV_LINKS.length > 0 && (
              <nav className="hidden xl:flex items-center gap-1">
                {PUBLIC_NAV_LINKS.map((link) => {
                  const linkHash = link.href.startsWith("/#")
                    ? link.href.replace("/", "")
                    : link.href
                  const isCatalogPath =
                    pathname === "/hospedagens" || pathname === "/rooms"
                  const isActive = isCatalogPath
                    ? link.href === "/hospedagens" || link.href === "/rooms"
                    : activeSection === linkHash || activeSection === link.href

                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={cn(
                        "relative px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors duration-200 group whitespace-nowrap",
                        isActive
                          ? "text-brand-primary font-extrabold"
                          : isDarkBar
                          ? "text-zinc-300 hover:text-white"
                          : "text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white"
                      )}
                    >
                      <span>{link.name}</span>
                      <span
                        className={cn(
                          "absolute bottom-0 left-3.5 right-3.5 h-0.5 transition-transform duration-300 origin-center bg-brand-primary",
                          isActive
                            ? "scale-x-100"
                            : "scale-x-0 group-hover:scale-x-100"
                        )}
                      />
                    </Link>
                  )
                })}
              </nav>
            )
          ) : (
            <nav className="hidden lg:flex items-center gap-1">
              {PORTAL_NAV_LINKS.map((item) => {
                const isCatalogPath =
                  item.href === "/hospedagens" &&
                  (pathname === "/hospedagens" || pathname === "/rooms")

                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : isCatalogPath ||
                      pathname === item.href ||
                      (item.href !== "/hospedagens" &&
                        pathname.startsWith(item.href))

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "relative px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors duration-200 group whitespace-nowrap",
                      isActive
                        ? "text-brand-primary font-black"
                        : isDarkBar
                        ? "text-zinc-300 hover:text-white"
                        : "text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white"
                    )}
                  >
                    <span>{item.name}</span>
                    <span
                      className={cn(
                        "absolute bottom-0 left-3.5 right-3.5 h-0.5 transition-transform duration-300 origin-center bg-brand-primary",
                        isActive
                          ? "scale-x-100"
                          : "scale-x-0 group-hover:scale-x-100"
                      )}
                    />
                  </Link>
                )
              })}
            </nav>
          )}

          <div className="flex items-center gap-4 sm:gap-5 flex-shrink-0">
            <ThemeToggle />

            {!isAuthenticated ? (
              <Link
                href={brandConfig.links.login}
                className={cn(
                  "items-center gap-1.5 text-xs font-bold uppercase tracking-wider transition-colors",
                  isDarkBar
                    ? "text-zinc-200 hover:text-brand-primary"
                    : "text-zinc-700 dark:text-zinc-200 hover:text-brand-primary",
                  PUBLIC_NAV_LINKS.length > 0
                    ? "hidden sm:inline-flex"
                    : "inline-flex"
                )}
              >
                <User className="w-3.5 h-3.5" />
                <span>Já sou associado</span>
              </Link>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    className="cursor-pointer outline-none select-none text-left flex items-center gap-2.5 transition-opacity hover:opacity-90 py-1 bg-transparent border-0"
                  >
                    <Avatar
                      size="sm"
                    >
                      {userProfile.avatar && (
                        <AvatarImage
                          src={userProfile.avatar}
                          alt={userProfile.name}
                        />
                      )}
                      <AvatarFallback className="font-bold text-[10px] bg-zinc-900 text-white dark:bg-zinc-800">
                        {userInitials}
                      </AvatarFallback>
                    </Avatar>

                    <div className="hidden sm:flex flex-col min-w-0 max-w-[140px] leading-tight">
                      <span
                        className={cn(
                          "text-xs font-semibold uppercase tracking-tight truncate",
                          isDarkBar
                            ? "text-white"
                            : "text-zinc-900 dark:text-white"
                        )}
                      >
                        {userProfile.name}
                      </span>
                      <span className="text-[10px] font-normal text-zinc-400 dark:text-zinc-400 truncate">
                        {userEmail}
                      </span>
                    </div>

                    <ChevronDown
                      className={cn(
                        "w-3 h-3 shrink-0 hidden sm:block",
                        isDarkBar ? "text-zinc-300" : "text-zinc-400"
                      )}
                    />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="end"
                  className="w-64 bg-white/95 dark:bg-[#141416]/95 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 p-2 rounded-sm shadow-2xl space-y-1"
                >
                  <div className="px-3 py-2.5 border-b border-zinc-100 dark:border-zinc-800/80 mb-1 flex items-center gap-3">
                    <Avatar size="sm">
                      {userProfile.avatar && (
                        <AvatarImage
                          src={userProfile.avatar}
                          alt={userProfile.name}
                        />
                      )}
                      <AvatarFallback className="font-bold text-[10px] bg-zinc-900 text-white dark:bg-zinc-800">
                        {userInitials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-bold text-zinc-900 dark:text-white truncate">
                        {userProfile.name}
                      </p>
                      <p className="text-[10px] text-zinc-500 dark:text-zinc-400 truncate">
                        {userEmail}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-0.5">
                    <DropdownMenuItem asChild>
                      <Link
                        href="/perfil"
                        className="flex items-center gap-2.5 px-3 py-2 rounded-sm text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 hover:text-brand-primary dark:hover:text-brand-primary cursor-pointer transition-colors"
                      >
                        <User className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Meu Perfil</span>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                      <Link
                        href="/hospedagens/minhas-hospedagens"
                        className="flex items-center justify-between px-3 py-2 rounded-sm text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 hover:text-brand-primary dark:hover:text-brand-primary cursor-pointer transition-colors group"
                      >
                        <div className="flex items-center gap-2.5">
                          <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                          <span>Minhas Hospedagens</span>
                        </div>
                        <Badge
                          color="primary"
                          variant="flat"
                          size="sm"
                          radius="sm"
                          className="font-black text-[10px] px-1.5 py-0 min-w-4 h-4 flex items-center justify-center leading-none"
                        >
                          {staysCount}
                        </Badge>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                      <Link
                        href="/eventos/meus-eventos"
                        className="flex items-center justify-between px-3 py-2 rounded-sm text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 hover:text-brand-primary dark:hover:text-brand-primary cursor-pointer transition-colors group"
                      >
                        <div className="flex items-center gap-2.5">
                          <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                          <span>Meus Eventos</span>
                        </div>
                        <Badge
                          color="primary"
                          variant="flat"
                          size="sm"
                          radius="sm"
                          className="font-black text-[10px] px-1.5 py-0 min-w-4 h-4 flex items-center justify-center leading-none"
                        >
                          {eventsCount}
                        </Badge>
                      </Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem asChild>
                      <Link
                        href="/perfil/minha-assinatura"
                        className="flex items-center gap-2.5 px-3 py-2 rounded-sm text-xs font-semibold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/80 hover:text-brand-primary dark:hover:text-brand-primary cursor-pointer transition-colors"
                      >
                        <CreditCard className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Minha Assinatura</span>
                      </Link>
                    </DropdownMenuItem>
                  </div>

                  <DropdownMenuSeparator className="my-1.5 bg-zinc-100 dark:bg-zinc-800" />

                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="flex items-center gap-2.5 px-3 py-2 rounded-sm text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 cursor-pointer transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5 text-rose-500" />
                    <span>Sair do Portal</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            <div className={isAuthenticated ? "flex lg:hidden" : "flex xl:hidden"}>
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <button
                    type="button"
                    className={cn(
                      "p-2 rounded-full transition-all cursor-pointer flex items-center justify-center",
                      isDarkBar
                        ? "bg-white/10 hover:bg-white/20 text-white"
                        : "bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white"
                    )}
                    aria-label="Abrir Menu"
                  >
                    <Menu className="w-5 h-5" />
                  </button>
                </SheetTrigger>

                <SheetContent
                  side="right"
                  backdrop="blur"
                  className="w-full max-w-xs sm:max-w-sm bg-white dark:bg-[#101012] backdrop-blur-2xl border-l border-zinc-200 dark:border-zinc-800 p-6 flex flex-col justify-between overflow-y-auto text-zinc-900 dark:text-white"
                >
                  <div>
                    <SheetHeader className="pb-6 border-b border-zinc-200 dark:border-zinc-800/80">
                      <SheetTitle className="text-left font-heading font-black text-xl uppercase tracking-wider">
                        {brandConfig.assets.logoMain ? (
                          <div className="relative h-8 w-28">
                            <Image
                              src="/logos/logo_black.svg"
                              alt={brandConfig.name}
                              fill
                              className="object-contain object-left block dark:hidden"
                            />
                            <Image
                              src="/logos/logo_white.svg"
                              alt={brandConfig.name}
                              fill
                              className="object-contain object-left hidden dark:block"
                            />
                          </div>
                        ) : (
                          <span className="text-zinc-900 dark:text-white">
                            {brandConfig.assets.logoText || brandConfig.name}
                          </span>
                        )}
                      </SheetTitle>
                    </SheetHeader>

                    {isAuthenticated && (
                      <div className="py-3 px-1 my-2 flex items-center gap-3 bg-transparent border-0">
                        <Avatar size="sm">
                          {userProfile.avatar && (
                            <AvatarImage
                              src={userProfile.avatar}
                              alt={userProfile.name}
                            />
                          )}
                          <AvatarFallback className="font-bold text-[10px] bg-zinc-900 text-white dark:bg-zinc-800">
                            {userInitials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col min-w-0">
                          <span className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-tight truncate">
                            {userProfile.name}
                          </span>
                          <span className="text-[10px] font-normal text-zinc-500 dark:text-zinc-400 truncate">
                            {userEmail}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="flex flex-col gap-1 pt-2">
                      {isAuthenticated ? (
                        <>
                          <div className="text-[10px] font-black uppercase tracking-widest text-brand-primary px-3 pt-2 pb-1">
                            Menu do Membro
                          </div>
                          {PORTAL_NAV_LINKS.map((link) => {
                            const isCatalogPath =
                              link.href === "/hospedagens" &&
                              (pathname === "/hospedagens" ||
                                pathname === "/rooms")

                            const isActive =
                              link.href === "/"
                                ? pathname === "/"
                                : isCatalogPath ||
                                  pathname === link.href ||
                                  (link.href !== "/hospedagens" &&
                                    pathname.startsWith(link.href))

                            return (
                              <Link
                                key={link.name}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={cn(
                                  "px-3.5 py-2.5 rounded-sm text-xs uppercase tracking-wider transition-all flex items-center justify-between group",
                                  isActive
                                    ? "text-zinc-900 dark:text-white bg-zinc-100 dark:bg-white/10 font-black shadow-xs"
                                    : "text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100/60 dark:hover:bg-white/5 font-semibold"
                                )}
                              >
                                <span>{link.name}</span>
                                {isActive && (
                                  <span className="w-1.5 h-1.5 rounded-full bg-brand-primary shrink-0 shadow-xs" />
                                )}
                              </Link>
                            )
                          })}
                        </>
                      ) : (
                        PUBLIC_NAV_LINKS.map((link) => {
                          const linkHash = link.href.startsWith("/#")
                            ? link.href.replace("/", "")
                            : link.href
                          const isCatalogPath =
                            pathname === "/hospedagens" ||
                            pathname === "/rooms"
                          const isActive = isCatalogPath
                            ? link.href === "/hospedagens" ||
                              link.href === "/rooms"
                            : activeSection === linkHash ||
                              activeSection === link.href

                          return (
                            <Link
                              key={link.name}
                              href={link.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className={cn(
                                "px-3.5 py-2.5 rounded-sm text-xs uppercase tracking-wider transition-all flex items-center justify-between group",
                                isActive
                                  ? "text-zinc-900 dark:text-white bg-zinc-100 dark:bg-white/10 font-black shadow-xs"
                                  : "text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-zinc-100/60 dark:hover:bg-white/5 font-semibold"
                              )}
                            >
                              <span>{link.name}</span>
                              {isActive && (
                                <span className="w-1.5 h-1.5 rounded-full bg-brand-primary shrink-0 shadow-xs" />
                              )}
                            </Link>
                          )
                        })
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2.5 pt-6 border-t border-zinc-200 dark:border-zinc-800/80">
                    {!isAuthenticated ? (
                      <>
                        <Link
                          href={brandConfig.links.login}
                          onClick={() => setMobileMenuOpen(false)}
                          className="flex items-center justify-center gap-2 w-full py-3 rounded-sm border border-zinc-300 dark:border-zinc-700/80 text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-white/5 transition-all"
                        >
                          <User className="w-3.5 h-3.5" />
                          <span>Já sou associado (Login)</span>
                        </Link>

                        <CtaButton
                          href={brandConfig.links.subscription}
                          onClick={() => setMobileMenuOpen(false)}
                          isFullWidth
                          size="md"
                        >
                          Quero ser associado
                        </CtaButton>
                      </>
                    ) : (
                      <>
                        <div className="grid grid-cols-2 gap-2 mb-1">
                          <Link
                            href="/hospedagens/minhas-hospedagens"
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center justify-between p-2 rounded-sm border border-zinc-200 dark:border-zinc-800 text-[11px] font-bold uppercase tracking-tight text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-white/5 transition-all"
                          >
                            <span className="flex items-center gap-1.5 truncate">
                              <MapPin className="w-3 h-3 text-brand-primary shrink-0" />
                              Hospedagens
                            </span>
                            <Badge color="primary" variant="flat" size="sm" radius="sm" className="text-[9px] px-1 h-3.5 leading-none">
                              {staysCount}
                            </Badge>
                          </Link>

                          <Link
                            href="/eventos/meus-eventos"
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center justify-between p-2 rounded-sm border border-zinc-200 dark:border-zinc-800 text-[11px] font-bold uppercase tracking-tight text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-white/5 transition-all"
                          >
                            <span className="flex items-center gap-1.5 truncate">
                              <Calendar className="w-3 h-3 text-brand-primary shrink-0" />
                              Eventos
                            </span>
                            <Badge color="primary" variant="flat" size="sm" radius="sm" className="text-[9px] px-1 h-3.5 leading-none">
                              {eventsCount}
                            </Badge>
                          </Link>
                        </div>

                        <div className="grid grid-cols-2 gap-2">
                          <Link
                            href="/perfil"
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center justify-center gap-1.5 w-full py-2 rounded-sm border border-zinc-200 dark:border-zinc-800 text-[11px] font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-white/5 transition-all"
                          >
                            <User className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
                            <span>Perfil</span>
                          </Link>

                          <Link
                            href="/perfil/minha-assinatura"
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center justify-center gap-1.5 w-full py-2 rounded-sm border border-zinc-200 dark:border-zinc-800 text-[11px] font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-white/5 transition-all"
                          >
                            <CreditCard className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
                            <span>Assinatura</span>
                          </Link>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            setMobileMenuOpen(false)
                            handleLogout()
                          }}
                          className="flex items-center justify-center gap-2 w-full py-2 rounded-sm bg-rose-500/10 border border-rose-500/20 text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 transition-all cursor-pointer"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Sair do Portal</span>
                        </button>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </Container>
      </header>
    </div>
  )
}
