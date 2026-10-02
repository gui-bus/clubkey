"use client"

import * as React from "react"

import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"

import {
  DEFAULT_USER,
  TIERS_CONFIG,
  getFullName,
  getInitials,
} from "@/src/data/portalData"
import { usePortalStore } from "@/src/store/usePortalStore"
import {
  Calendar,
  CreditCard,
  List,
  MapPin,
  SignOut,
  User,
} from "@phosphor-icons/react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/src/components/ui/avatar/avatar"
import { Badge } from "@/src/components/ui/badge/badge"
import { ScrollArea } from "@/src/components/ui/scrollArea/scrollArea"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/src/components/ui/sheet/sheet"

import { Container } from "@/src/components/common/container"
import { CtaButton } from "@/src/components/common/ctaButton"
import { ThemeToggle } from "@/src/components/common/themeToggle"
import { NotificationsDropdown } from "@/src/components/portal/notificationsDropdown"
import { UserDropdownMenu } from "@/src/components/portal/userDropdownMenu"

import { cn } from "@/src/lib/utils"

import {
  type BrandModulesConfig,
  brandConfig,
  isModuleEnabled,
} from "@/src/config/brand.config"

interface NavLinkItem {
  name: string
  href: string
  module?: keyof BrandModulesConfig
}

const PUBLIC_NAV_LINKS: NavLinkItem[] = [
  { name: `Sobre a ${brandConfig.name}`, href: "/#sobre" },
  { name: "Parceiros", href: "/#parceiros" },
  { name: "Experiência", href: "/#experiencia", module: "experiences" },
  { name: "Como Funciona", href: "/#como-funciona" },
  { name: "Hospedagens", href: "/hospedagens", module: "stays" },
  { name: "FAQ", href: "/#faq" },
]

const PORTAL_NAV_LINKS: NavLinkItem[] = [
  { name: "Home", href: "/", module: "home" },
  { name: "Conexões", href: "/conexoes", module: "networking" },
  { name: "Hospedagens", href: "/hospedagens", module: "stays" },
  { name: "Eventos", href: "/eventos", module: "events" },
  { name: "Experiências", href: "/experiencias", module: "experiences" },
  { name: "Benefícios", href: "/beneficios", module: "benefits" },
]

const MOBILE_PORTAL_NAV_LINKS: NavLinkItem[] = [
  { name: "Home", href: "/", module: "home" },
  { name: "Conexões", href: "/conexoes", module: "networking" },
  { name: "Hospedagens", href: "/hospedagens", module: "stays" },
  { name: "Eventos", href: "/eventos", module: "events" },
  { name: "Experiências", href: "/experiencias", module: "experiences" },
  { name: "Benefícios", href: "/beneficios", module: "benefits" },
  { name: "KeyPass", href: "/keypass", module: "keypass" },
]

export interface HeaderProps {
  isTransparent?: boolean
}

export function Header({ isTransparent }: HeaderProps = {}): React.JSX.Element {
  const pathname = usePathname()
  const router = useRouter()
  const {
    isAuthenticated,
    userProfile,
    logout,
    memberStays,
    confirmedEvents,
    ribTokens,
    getUserTier,
  } = usePortalStore()
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [activeSection, setActiveSection] = React.useState<string>("")

  const staysCount = memberStays?.length ?? 2
  const eventsCount =
    Object.keys(confirmedEvents || {}).filter(
      (k) => !!confirmedEvents[Number(k)]
    ).length || 1

  const currentTier = getUserTier ? getUserTier() : TIERS_CONFIG.titular

  const userFirstName = userProfile?.firstName || DEFAULT_USER.firstName
  const userLastName = userProfile?.lastName || DEFAULT_USER.lastName
  const userFullName =
    getFullName(userProfile) ||
    `${DEFAULT_USER.firstName} ${DEFAULT_USER.lastName}`
  const userInitials = getInitials(userFirstName, userLastName)
  const homeHref = !isAuthenticated
    ? "/"
    : isModuleEnabled("home")
      ? "/"
      : isModuleEnabled("stays")
        ? "/hospedagens"
        : isModuleEnabled("events")
          ? "/eventos"
          : isModuleEnabled("experiences")
            ? "/experiencias"
            : isModuleEnabled("benefits")
              ? "/beneficios"
              : isModuleEnabled("networking")
                ? "/conexoes"
                : isModuleEnabled("keypass")
                  ? "/keypass"
                  : "/perfil"
  const userEmail = userProfile?.email || DEFAULT_USER.email
  const userAvatar = userProfile?.avatar || DEFAULT_USER.avatar

  const isHeroBannerRoute = Boolean(
    pathname === "/" ||
    pathname === "/assinatura" ||
    (pathname === "/hospedagens" && isModuleEnabled("stays")) ||
    (pathname === "/hospedagens/minhas-hospedagens" &&
      isModuleEnabled("stays")) ||
    (pathname === "/eventos" && isModuleEnabled("events")) ||
    (pathname === "/eventos/meus-eventos" && isModuleEnabled("events")) ||
    (pathname === "/experiencias" && isModuleEnabled("experiences")) ||
    (pathname === "/beneficios" && isModuleEnabled("benefits")) ||
    ((pathname === "/conexoes" || pathname === "/conexoes/minhas-conexoes") &&
      isModuleEnabled("networking")) ||
    (pathname?.startsWith("/keypass") && isModuleEnabled("keypass"))
  )

  const transparent =
    isTransparent !== undefined ? isTransparent : isHeroBannerRoute

  const isDarkBar = true

  const handleLogout = () => {
    logout()
    router.push("/entrar")
  }

  React.useEffect(() => {
    if (pathname !== "/") return

    const sectionIds = [
      "sobre",
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

  const filteredPublicNavLinks = PUBLIC_NAV_LINKS.filter(
    (link) => !link.module || isModuleEnabled(link.module)
  )
  const filteredPortalNavLinks = PORTAL_NAV_LINKS.filter(
    (link) => !link.module || isModuleEnabled(link.module)
  )
  const filteredMobilePortalNavLinks = MOBILE_PORTAL_NAV_LINKS.filter(
    (link) => !link.module || isModuleEnabled(link.module)
  )

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
                "relative bg-[#161616] border-b border-zinc-800 max-w-440 mx-auto",
                isAuthenticated ? "pt-0" : "pt-20 sm:pt-14 md:pt-12"
              )
            : "sticky top-0 bg-white/95 dark:bg-[#141416]/95 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800/80 text-zinc-900 dark:text-white"
      )}
    >
      <header className="w-full bg-transparent py-3 sm:py-4">
        <Container className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0">
            <Link
              href={homeHref}
              className="flex items-center transition-opacity hover:opacity-90 shrink-0"
              aria-label={`${brandConfig.name} - Início`}
            >
              {brandConfig.assets.logoMain ? (
                <div className="relative h-8 sm:h-9 w-auto flex items-center">
                  <Image
                    src={
                      brandConfig.assets.logoLight ||
                      brandConfig.assets.logoMain
                    }
                    alt={brandConfig.name}
                    width={200}
                    height={44}
                    priority
                    className={cn(
                      "h-7 sm:h-8 md:h-9 w-auto max-h-9 object-contain object-left",
                      isDarkBar ? "hidden" : "block dark:hidden"
                    )}
                  />
                  <Image
                    src={
                      brandConfig.assets.logoDark || brandConfig.assets.logoMain
                    }
                    alt={brandConfig.name}
                    width={200}
                    height={44}
                    priority
                    className={cn(
                      "h-7 sm:h-8 md:h-9 w-auto max-h-9 object-contain object-left",
                      isDarkBar ? "block" : "hidden dark:block"
                    )}
                  />
                </div>
              ) : (
                <span
                  className={cn(
                    "font-heading font-black text-xl sm:text-2xl tracking-wider uppercase",
                    isDarkBar ? "text-white" : "text-zinc-900 dark:text-white"
                  )}
                >
                  {brandConfig.assets.logoText || brandConfig.name}
                </span>
              )}
            </Link>

            {isAuthenticated && isModuleEnabled("keypass") && (
              <>
                <div
                  className={cn(
                    "h-4 sm:h-4.5 w-px shrink-0",
                    isDarkBar ? "bg-white/20" : "bg-zinc-300 dark:bg-zinc-700"
                  )}
                />

                <Link
                  href="/keypass"
                  className="flex items-center transition-opacity hover:opacity-90 shrink-0"
                  title="KeyPass"
                  aria-label="KeyPass"
                >
                  <div className="relative h-6 sm:h-7 w-auto flex items-center">
                    <Image
                      src="/logos/gamification/keypass_logo_black.svg"
                      alt="KeyPass"
                      width={100}
                      height={28}
                      priority
                      className={cn(
                        "h-5 sm:h-6 w-auto object-contain object-left",
                        isDarkBar ? "hidden" : "block dark:hidden"
                      )}
                    />
                    <Image
                      src="/logos/gamification/keypass_logo_white.svg"
                      alt="KeyPass"
                      width={100}
                      height={28}
                      priority
                      className={cn(
                        "h-5 sm:h-6 w-auto object-contain object-left",
                        isDarkBar ? "block" : "hidden dark:block"
                      )}
                    />
                  </div>
                </Link>
              </>
            )}
          </div>

          {!isAuthenticated ? (
            filteredPublicNavLinks.length > 0 && (
              <nav className="hidden 2xl:flex items-center gap-6 xl:gap-8">
                {filteredPublicNavLinks.map((link) => {
                  const linkHash = link.href.startsWith("/#")
                    ? link.href.replace("/", "")
                    : link.href
                  const isCatalogPath = pathname === "/hospedagens"
                  const isActive = isCatalogPath
                    ? link.href === "/hospedagens"
                    : activeSection === linkHash || activeSection === link.href

                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={cn(
                        "text-xs font-bold uppercase tracking-widest transition-all relative py-1.5",
                        isDarkBar
                          ? isActive
                            ? "text-brand-primary"
                            : "text-zinc-200 hover:text-white"
                          : isActive
                            ? "text-brand-primary"
                            : "text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white"
                      )}
                    >
                      {link.name}
                      {isActive && (
                        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary rounded-full" />
                      )}
                    </Link>
                  )
                })}
              </nav>
            )
          ) : (
            <nav className="hidden 2xl:flex items-center gap-6 xl:gap-8">
              {filteredPortalNavLinks.map((link) => {
                const isCatalogPath =
                  link.href === "/hospedagens" && pathname === "/hospedagens"

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
                    className={cn(
                      "text-xs font-bold uppercase tracking-widest transition-all relative py-1.5",
                      isDarkBar
                        ? isActive
                          ? "text-brand-primary"
                          : "text-zinc-200 hover:text-white"
                        : isActive
                          ? "text-brand-primary"
                          : "text-zinc-600 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white"
                    )}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary rounded-full" />
                    )}
                  </Link>
                )
              })}
            </nav>
          )}

          <div className="flex items-center gap-3 sm:gap-4">
            {isAuthenticated && isModuleEnabled("keypass") && (
              <Link
                href="/keypass"
                className={cn(
                  "hidden md:flex items-center gap-2 transition-colors group shrink-0 select-none py-1 px-1",
                  isDarkBar
                    ? "text-zinc-200 hover:text-white"
                    : "text-zinc-700 dark:text-zinc-300 hover:text-brand-primary dark:hover:text-white"
                )}
                title="Ver KeyPass & Recompensas"
              >
                <div className="relative w-6 h-6 shrink-0 transition-transform group-hover:scale-105">
                  <Image
                    src={currentTier.image}
                    alt={currentTier.name}
                    fill
                    className="object-contain"
                  />
                </div>

                <div
                  className={cn(
                    "h-3.5 w-px",
                    isDarkBar ? "bg-white/20" : "bg-zinc-300 dark:bg-zinc-700"
                  )}
                />

                <div className="flex items-center gap-1 shrink-0 whitespace-nowrap">
                  <div className="relative w-4 h-4 shrink-0">
                    <Image
                      src="/utils/gamification/utils/RIB.svg"
                      alt="RIB Token"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span
                    className={cn(
                      "text-xs font-black font-heading tracking-tight",
                      isDarkBar ? "text-white" : "text-zinc-900 dark:text-white"
                    )}
                  >
                    {ribTokens}
                  </span>
                </div>
              </Link>
            )}

            {isAuthenticated && isModuleEnabled("networking") && (
              <NotificationsDropdown isDarkBar={isDarkBar} />
            )}

            <ThemeToggle className="hidden sm:flex" />

            {!isAuthenticated ? (
              <Link
                href={brandConfig.links.login}
                className={cn(
                  "items-center gap-1.5 text-xs font-bold uppercase tracking-wider transition-colors",
                  isDarkBar
                    ? "text-zinc-200 hover:text-brand-primary"
                    : "text-zinc-700 dark:text-zinc-200 hover:text-brand-primary",
                  filteredPublicNavLinks.length > 0
                    ? "hidden sm:inline-flex"
                    : "inline-flex"
                )}
              >
                <User className="w-3.5 h-3.5" />
                <span>Já sou associado</span>
              </Link>
            ) : (
              <UserDropdownMenu isDarkBar={isDarkBar} />
            )}

            <div className="flex 2xl:hidden">
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
                    <List className="w-5 h-5" />
                  </button>
                </SheetTrigger>

                <SheetContent
                  side="right"
                  backdrop="blur"
                  className="w-full max-w-xs sm:max-w-sm bg-white dark:bg-[#101012] backdrop-blur-2xl border-l border-zinc-200 dark:border-zinc-800 p-0 flex flex-col h-full text-zinc-900 dark:text-white"
                >
                  <SheetHeader className="px-6 pt-6 pb-4 border-b border-zinc-200 dark:border-zinc-800/80 shrink-0">
                    <div className="flex items-center justify-between gap-4 pr-9">
                      <SheetTitle className="text-left font-heading font-black text-xl uppercase tracking-wider">
                        {brandConfig.assets.logoMain ? (
                          <div className="flex items-center gap-2.5">
                            <div className="relative h-7 w-auto flex items-center">
                              <Image
                                src={
                                  brandConfig.assets.logoLight ||
                                  brandConfig.assets.logoMain
                                }
                                alt={brandConfig.name}
                                width={140}
                                height={32}
                                className="h-6 sm:h-7 w-auto max-h-7 object-contain object-left block dark:hidden"
                              />
                              <Image
                                src={
                                  brandConfig.assets.logoDark ||
                                  brandConfig.assets.logoMain
                                }
                                alt={brandConfig.name}
                                width={140}
                                height={32}
                                className="h-6 sm:h-7 w-auto max-h-7 object-contain object-left hidden dark:block"
                              />
                            </div>
                            {isAuthenticated && isModuleEnabled("keypass") && (
                              <>
                                <div className="h-3.5 w-px bg-zinc-300 dark:bg-zinc-700 shrink-0" />
                                <div className="relative h-5 w-auto flex items-center shrink-0">
                                  <Image
                                    src="/logos/gamification/keypass_logo_black.svg"
                                    alt="KeyPass"
                                    width={80}
                                    height={24}
                                    className="h-4.5 sm:h-5 w-auto object-contain object-left block dark:hidden"
                                  />
                                  <Image
                                    src="/logos/gamification/keypass_logo_white.svg"
                                    alt="KeyPass"
                                    width={80}
                                    height={24}
                                    className="h-4.5 sm:h-5 w-auto object-contain object-left hidden dark:block"
                                  />
                                </div>
                              </>
                            )}
                          </div>
                        ) : (
                          <span className="text-zinc-900 dark:text-white">
                            {brandConfig.assets.logoText || brandConfig.name}
                          </span>
                        )}
                      </SheetTitle>

                      <ThemeToggle className="text-zinc-700 hover:text-zinc-950 dark:text-zinc-300 dark:hover:text-white" />
                    </div>
                  </SheetHeader>

                  <ScrollArea className="flex-1 h-full w-full">
                    <div className="flex flex-col justify-between min-h-full px-6 py-4 pr-3.5 space-y-6">
                      <div className="space-y-4">
                        {isAuthenticated && (
                          <div className="py-2.5 px-3 rounded-lg bg-zinc-100/70 dark:bg-zinc-800/40 border border-zinc-200/70 dark:border-zinc-800 flex items-center gap-3">
                            <Avatar size="sm">
                              {userAvatar && (
                                <AvatarImage
                                  src={userAvatar}
                                  alt={userFullName}
                                />
                              )}
                              <AvatarFallback className="font-bold text-[10px] bg-zinc-900 text-white dark:bg-zinc-800">
                                {userInitials}
                              </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col min-w-0">
                              <span className="text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-tight truncate">
                                {userFullName}
                              </span>
                              <span className="text-[10px] font-normal text-zinc-500 dark:text-zinc-400 truncate">
                                {userEmail}
                              </span>
                            </div>
                          </div>
                        )}

                        {isAuthenticated && isModuleEnabled("keypass") && (
                          <Link
                            href="/keypass"
                            onClick={() => setMobileMenuOpen(false)}
                            className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-zinc-50 dark:bg-zinc-900/50 hover:bg-zinc-100 dark:hover:bg-zinc-800/50 border border-zinc-200/60 dark:border-zinc-800 text-zinc-900 dark:text-white transition-colors select-none"
                          >
                            <div className="flex items-center gap-2">
                              <div className="relative w-5 h-5 shrink-0">
                                <Image
                                  src={currentTier.image}
                                  alt={currentTier.name}
                                  fill
                                  className="object-contain"
                                />
                              </div>
                              <span className="text-xs font-heading font-black uppercase text-zinc-900 dark:text-white">
                                {currentTier.name}
                              </span>
                            </div>

                            <div className="flex items-center gap-1 shrink-0">
                              <div className="relative w-4 h-4 shrink-0">
                                <Image
                                  src="/utils/gamification/utils/RIB.svg"
                                  alt="RIB Token"
                                  fill
                                  className="object-contain"
                                />
                              </div>
                              <span className="text-xs font-heading font-black tracking-tight text-zinc-900 dark:text-white">
                                {ribTokens} RIB
                              </span>
                            </div>
                          </Link>
                        )}

                        <div className="flex flex-col gap-1">
                          {isAuthenticated ? (
                            <>
                              <div className="text-[10px] font-black uppercase tracking-widest text-brand-primary px-3 pt-1 pb-1">
                                Menu do Membro
                              </div>
                              {filteredMobilePortalNavLinks.map((link) => {
                                const isCatalogPath =
                                  link.href === "/hospedagens" &&
                                  pathname === "/hospedagens"

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
                                      "px-3.5 py-2.5 rounded-lg text-xs uppercase tracking-wider transition-all flex items-center justify-between group",
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
                            filteredPublicNavLinks.map((link) => {
                              const linkHash = link.href.startsWith("/#")
                                ? link.href.replace("/", "")
                                : link.href
                              const isCatalogPath = pathname === "/hospedagens"
                              const isActive = isCatalogPath
                                ? link.href === "/hospedagens"
                                : activeSection === linkHash ||
                                  activeSection === link.href

                              return (
                                <Link
                                  key={link.name}
                                  href={link.href}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className={cn(
                                    "px-3.5 py-2.5 rounded-lg text-xs uppercase tracking-wider transition-all flex items-center justify-between group",
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

                      <div className="flex flex-col gap-2.5 pt-5 border-t border-zinc-200 dark:border-zinc-800/80">
                        {!isAuthenticated ? (
                          <>
                            <Link
                              href={brandConfig.links.login}
                              onClick={() => setMobileMenuOpen(false)}
                              className="flex items-center justify-center gap-2 w-full py-3 rounded-lg border border-zinc-300 dark:border-zinc-700/80 text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white hover:bg-zinc-100 dark:hover:bg-white/5 transition-all"
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
                            {(isModuleEnabled("stays") ||
                              isModuleEnabled("events")) && (
                              <div className="grid grid-cols-1 gap-2 mb-1">
                                {isModuleEnabled("stays") && (
                                  <Link
                                    href="/hospedagens/minhas-hospedagens"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex items-center justify-between p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-[11px] font-bold uppercase tracking-tight text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-white/5 transition-all"
                                  >
                                    <span className="flex items-center gap-1.5 truncate">
                                      <MapPin className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                                      Hospedagens
                                    </span>
                                    <Badge
                                      color="primary"
                                      variant="flat"
                                      size="sm"
                                      radius="sm"
                                      className="text-[9px] px-1.5 h-4 leading-none"
                                    >
                                      {staysCount}
                                    </Badge>
                                  </Link>
                                )}

                                {isModuleEnabled("events") && (
                                  <Link
                                    href="/eventos/meus-eventos"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="flex items-center justify-between p-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800 text-[11px] font-bold uppercase tracking-tight text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-white/5 transition-all"
                                  >
                                    <span className="flex items-center gap-1.5 truncate">
                                      <Calendar className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                                      Eventos
                                    </span>
                                    <Badge
                                      color="primary"
                                      variant="flat"
                                      size="sm"
                                      radius="sm"
                                      className="text-[9px] px-1.5 h-4 leading-none"
                                    >
                                      {eventsCount}
                                    </Badge>
                                  </Link>
                                )}
                              </div>
                            )}

                            <div className="grid grid-cols-2 gap-2">
                              <Link
                                href="/perfil"
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center justify-center gap-1.5 w-full py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-[11px] font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-white/5 transition-all"
                              >
                                <User className="w-3.5 h-3.5 text-zinc-500 dark:text-zinc-400" />
                                <span>Perfil</span>
                              </Link>

                              <Link
                                href="/perfil/minha-assinatura"
                                onClick={() => setMobileMenuOpen(false)}
                                className="flex items-center justify-center gap-1.5 w-full py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 text-[11px] font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-white/5 transition-all"
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
                              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-xs font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 hover:bg-rose-500/20 transition-all cursor-pointer"
                            >
                              <SignOut className="w-3.5 h-3.5" />
                              <span>Sair do Portal</span>
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                  </ScrollArea>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </Container>
      </header>
    </div>
  )
}

export const Navbar = Header
