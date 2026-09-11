"use client"

import * as React from "react"
import { Building2, User } from "lucide-react"

import { EmailVerification } from "@/src/components/auth/emailVerification"
import { SignUpPfForm } from "@/src/components/auth/signUpPfForm"
import { SignUpPjForm } from "@/src/components/auth/signUpPjForm"
import { Container } from "@/src/components/common/container"
import { FloatingCta } from "@/src/components/landing/FloatingCta"
import { Footer } from "@/src/components/landing/Footer"
import { Navbar } from "@/src/components/landing/Navbar"
import { TopBanner } from "@/src/components/landing/TopBanner"
import { brandConfig } from "@/src/config/brand.config"
import { cn } from "@/src/lib/utils/utils"

type AccountType = "pf" | "pj"

export default function SignUpPage(): React.JSX.Element {
  const [accountType, setAccountType] = React.useState<AccountType>("pf")
  const [isVerifyingEmail, setIsVerifyingEmail] = React.useState(false)
  const [registeredEmail, setRegisteredEmail] = React.useState("")

  const handleSuccess = (email: string) => {
    setRegisteredEmail(email)
    setIsVerifyingEmail(true)
  }

  return (
    <main className="w-full bg-[#F1F1F1] dark:bg-[#161616] text-[#111111] dark:text-white flex flex-col font-sans selection:bg-brand-primary/20 selection:text-brand-primary">
      <TopBanner />
      <Navbar isTransparent={false} />

      <section className="flex-1 w-full py-10 sm:py-16 md:py-20">
        <Container>
          <div className="w-full">
            {isVerifyingEmail ? (
              <div className="w-full py-6">
                <EmailVerification email={registeredEmail || "seu e-mail"} />
              </div>
            ) : (
              <div className="flex flex-col gap-8 w-full">
                <div className="text-center sm:text-left">
                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-zinc-900 dark:text-white font-heading tracking-tight uppercase">
                    Crie sua conta
                  </h1>
                  <p className="mt-2 text-sm sm:text-base text-zinc-600 dark:text-zinc-400 font-light leading-relaxed">
                    Cadastre-se na {brandConfig.name} para desbloquear benefícios exclusivos e tarifas de até 60% OFF.
                  </p>
                </div>

                <div className="flex flex-col gap-3 w-full">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                    Escolha o tipo de conta
                  </label>
                  <div className="grid grid-cols-2 gap-3 p-1.5 rounded-2xl bg-zinc-200/70 dark:bg-zinc-800/60 border border-zinc-300/80 dark:border-zinc-700 w-full">
                    <button
                      type="button"
                      onClick={() => setAccountType("pf")}
                      className={cn(
                        "py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer",
                        accountType === "pf"
                          ? "bg-white dark:bg-zinc-900 text-brand-primary shadow-sm"
                          : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                      )}
                    >
                      <User className="w-4 h-4" />
                      <span>Pessoa Física</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setAccountType("pj")}
                      className={cn(
                        "py-3 px-4 rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer",
                        accountType === "pj"
                          ? "bg-white dark:bg-zinc-900 text-brand-primary shadow-sm"
                          : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white"
                      )}
                    >
                      <Building2 className="w-4 h-4" />
                      <span>Pessoa Jurídica</span>
                    </button>
                  </div>
                </div>

                {accountType === "pf" ? (
                  <SignUpPfForm onSuccess={handleSuccess} />
                ) : (
                  <SignUpPjForm onSuccess={handleSuccess} />
                )}
              </div>
            )}
          </div>
        </Container>
      </section>

      <Footer />
      <FloatingCta />
    </main>
  )
}
