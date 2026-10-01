"use client"

import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@clubkey/ui"
import { Buildings, Gift, Plus, Tag } from "@phosphor-icons/react"

import { Container } from "@/src/components/common/container"

const mockBenefits = [
  {
    id: "ben_1",
    partner: "Fasano Gastronomia",
    title: "15% OFF em jantares selecionados + Welcome Drink",
    category: "Gastronomia",
    status: "Ativo",
    redemptions: 340,
  },
  {
    id: "ben_2",
    partner: "Emirates Airlines",
    title: "Upgrade gratuito de cabine em voos internacionais",
    category: "Viagens & Aviação",
    status: "Ativo",
    redemptions: 89,
  },
  {
    id: "ben_3",
    partner: "Porsche Cup Experience",
    title: "Passe VIP para os boxes e track day exclusivo",
    category: "Lifestyle & Automobilismo",
    status: "Ativo",
    redemptions: 42,
  },
]

export default function AdminBenefitsPage() {
  return (
    <Container className="space-y-6">
      
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Benefícios & Parcerias
          </h1>
          <p className="text-sm text-muted-foreground">
            Gerencie marcas parceiras, cupons de desconto, parcerias de luxo e
            resgates dos membros.
          </p>
        </div>
        <Button color="primary" size="sm">
          <Plus size={16} className="mr-1.5" /> Novo Benefício
        </Button>
      </div>

      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockBenefits.map((ben) => (
          <Card key={ben.id} className="border-border bg-card">
            <CardHeader className="p-5 pb-3">
              <div className="flex items-center justify-between mb-2">
                <Badge variant="bordered" size="sm">
                  {ben.category}
                </Badge>
                <Badge variant="default" size="sm">
                  {ben.status}
                </Badge>
              </div>
              <div className="text-xs font-semibold text-primary flex items-center gap-1">
                <Buildings size={14} /> {ben.partner}
              </div>
              <CardTitle className="text-base font-bold mt-1">
                {ben.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-5 pt-0 space-y-4">
              <div className="flex items-center justify-between rounded-md bg-muted/40 p-3 text-xs">
                <span className="text-muted-foreground">Total de Resgates</span>
                <span className="font-bold text-foreground">
                  {ben.redemptions}
                </span>
              </div>
              <Button variant="bordered" size="sm" className="w-full text-xs">
                Editar Benefício
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </Container>
  )
}
