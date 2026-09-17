"use client"

import * as React from "react"

import { EmailVerification } from "@/src/components/auth/emailVerification"
import { SignUpForm } from "@/src/components/auth/signUpForm"
import { Container } from "@/src/components/common/container"
import { FloatingCta } from "@/src/components/landing/FloatingCta"
import { Footer } from "@/src/components/landing/Footer"
import { Navbar } from "@/src/components/landing/Navbar"
import { TopBanner } from "@/src/components/landing/TopBanner"

import { brandConfig } from "@/src/config/brand.config"

export default function SignUpPage(): React.JSX.Element {
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
                    Cadastre-se na {brandConfig.name} para desbloquear
                    benefícios exclusivos e tarifas de até 60% OFF.
                  </p>
                </div>

                <SignUpForm onSuccess={handleSuccess} />
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
