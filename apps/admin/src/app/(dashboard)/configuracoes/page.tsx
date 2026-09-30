"use client"

import { useState } from "react"

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Switch,
} from "@clubkey/ui"
import {
  FloppyDisk,
  GearSix,
  Palette,
  ShieldCheck,
  Sliders,
} from "@phosphor-icons/react"

export default function AdminSettingsPage() {
  const [modules, setModules] = useState({
    stays: true,
    events: true,
    experiences: true,
    benefits: true,
    gamification: true,
    networking: true,
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Configurações da Plataforma
          </h1>
          <p className="text-sm text-muted-foreground">
            Gerencie módulos ativos, parâmetros do White Label e políticas de
            segurança.
          </p>
        </div>
        <Button color="primary" size="sm">
          <FloppyDisk size={16} className="mr-1.5" /> Salvar Alterações
        </Button>
      </div>

      {/* Modules Configuration */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card className="border-border bg-card">
          <CardHeader className="p-6">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <Sliders size={18} className="text-primary" /> Módulos do Sistema
              (Feature Flags)
            </CardTitle>
            <CardDescription className="text-xs">
              Ative ou desative módulos inteiros para o portal do cliente.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 pt-0 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold">
                  Hospedagens (Stays)
                </span>
                <p className="text-[11px] text-muted-foreground">
                  Reservas de villas e quartos
                </p>
              </div>
              <Switch
                checked={modules.stays}
                onCheckedChange={(c) => setModules({ ...modules, stays: c })}
              />
            </div>

            <div className="flex items-center justify-between border-t border-border pt-3">
              <div>
                <span className="text-xs font-semibold">Eventos & KeyPass</span>
                <p className="text-[11px] text-muted-foreground">
                  Ingressos e festas exclusivas
                </p>
              </div>
              <Switch
                checked={modules.events}
                onCheckedChange={(c) => setModules({ ...modules, events: c })}
              />
            </div>

            <div className="flex items-center justify-between border-t border-border pt-3">
              <div>
                <span className="text-xs font-semibold">
                  Benefícios & Parcerias
                </span>
                <p className="text-[11px] text-muted-foreground">
                  Clube de vantagens e descontos
                </p>
              </div>
              <Switch
                checked={modules.benefits}
                onCheckedChange={(c) => setModules({ ...modules, benefits: c })}
              />
            </div>

            <div className="flex items-center justify-between border-t border-border pt-3">
              <div>
                <span className="text-xs font-semibold">
                  Gamificação (KeyPass Points)
                </span>
                <p className="text-[11px] text-muted-foreground">
                  Missões, ranking e níveis de membros
                </p>
              </div>
              <Switch
                checked={modules.gamification}
                onCheckedChange={(c) =>
                  setModules({ ...modules, gamification: c })
                }
              />
            </div>
          </CardContent>
        </Card>

        {/* Security & Access */}
        <Card className="border-border bg-card">
          <CardHeader className="p-6">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <ShieldCheck size={18} className="text-primary" /> Segurança &
              Autenticação
            </CardTitle>
            <CardDescription className="text-xs">
              Políticas de aprovação de novos cadastros e autenticação de dois
              fatores.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 pt-0 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold">
                  Aprovação Manual de Membros
                </span>
                <p className="text-[11px] text-muted-foreground">
                  Novos cadastros requerem validação da diretoria
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between border-t border-border pt-3">
              <div>
                <span className="text-xs font-semibold">
                  Exigir 2FA para Administradores
                </span>
                <p className="text-[11px] text-muted-foreground">
                  Autenticação em duas etapas via App ou SMS
                </p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between border-t border-border pt-3">
              <div>
                <span className="text-xs font-semibold">
                  Logs de Auditoria de Acesso
                </span>
                <p className="text-[11px] text-muted-foreground">
                  Registrar todas as ações sensíveis no painel
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
