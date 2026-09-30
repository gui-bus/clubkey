"use client"

import { useState } from "react"

import { useRouter } from "next/navigation"

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Input,
  Label,
  PasswordInput,
} from "@clubkey/ui"
import {
  ArrowRight,
  EnvelopeSimple,
  Lock,
  ShieldCheck,
} from "@phosphor-icons/react"

export default function AdminLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      router.push("/dashboard")
    }, 600)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-4">
      <Card className="w-full max-w-md border-border bg-card shadow-lg">
        <CardHeader className="text-center pb-2">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md">
            <ShieldCheck size={28} weight="fill" />
          </div>
          <CardTitle className="text-xl font-bold tracking-tight">
            ClubKey Backoffice
          </CardTitle>
          <CardDescription className="text-xs">
            Acesso restrito para administradores e gestores da plataforma.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4 pt-4">
            <div className="space-y-1.5">
              <Label htmlFor="admin-email">E-mail Administrativo</Label>
              <Input
                id="admin-email"
                type="email"
                placeholder="admin@clubkey.com.br"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="admin-password">Senha de Acesso</Label>
                <a
                  href="#"
                  className="text-[11px] text-primary hover:underline"
                >
                  Esqueceu a senha?
                </a>
              </div>
              <PasswordInput
                id="admin-password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-3 pt-2">
            <Button
              type="submit"
              color="primary"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? "Autenticando..." : "Entrar no Painel"}
              {!isLoading && <ArrowRight size={16} className="ml-1.5" />}
            </Button>
            <p className="text-center text-[11px] text-muted-foreground">
              Acessos monitorados e auditados pelo sistema de segurança.
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}
