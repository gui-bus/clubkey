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
import {
  CalendarCheck,
  MapPin,
  Plus,
  Ticket,
  Users,
} from "@phosphor-icons/react"

import { Container } from "@/src/components/common/container"

const mockEvents = [
  {
    id: "evt_1",
    title: "ClubKey Sunset Experience",
    location: "Cafe de La Musique, Trancoso",
    date: "15 de Outubro, 2026",
    attendees: "120/150",
    keyPassTier: "Gold & Black",
    status: "Confirmado",
  },
  {
    id: "evt_2",
    title: "Private Wine Tasting & Dinner",
    location: "Fasano Rooftop, São Paulo",
    date: "28 de Outubro, 2026",
    attendees: "45/50",
    keyPassTier: "Diamond Exclusive",
    status: "Vagas Quase Esgotadas",
  },
  {
    id: "evt_3",
    title: "KeyPass Summit: Future of Luxury",
    location: "Copacabana Palace, Rio de Janeiro",
    date: "12 de Novembro, 2026",
    attendees: "210/300",
    keyPassTier: "Todos os Membros",
    status: "Inscrições Abertas",
  },
]

export default function AdminEventsPage() {
  return (
    <Container className="space-y-6">
      
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Gestão de Eventos & KeyPass
          </h1>
          <p className="text-sm text-muted-foreground">
            Crie experiências exclusivas, gerencie lotes de ingressos e
            permissões de acesso por categoria.
          </p>
        </div>
        <Button color="primary" size="sm">
          <Plus size={16} className="mr-1.5" /> Criar Evento
        </Button>
      </div>

      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockEvents.map((evt) => (
          <Card key={evt.id} className="border-border bg-card">
            <CardHeader className="p-5 pb-3">
              <div className="flex items-center justify-between mb-2">
                <Badge color="primary" size="sm">
                  {evt.keyPassTier}
                </Badge>
                <Badge variant="bordered" size="sm">
                  {evt.status}
                </Badge>
              </div>
              <CardTitle className="text-base font-bold">{evt.title}</CardTitle>
              <CardDescription className="text-xs flex items-center gap-1 mt-1">
                <MapPin size={14} /> {evt.location}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-5 pt-0 space-y-4">
              <div className="rounded-md bg-muted/40 p-3 space-y-2 text-xs">
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <CalendarCheck size={14} /> Data do Evento
                  </span>
                  <span className="font-semibold text-foreground">
                    {evt.date}
                  </span>
                </div>
                <div className="flex items-center justify-between text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Users size={14} /> Ingressos / Vagas
                  </span>
                  <span className="font-semibold text-foreground">
                    {evt.attendees}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="bordered" size="sm" className="w-full text-xs">
                  Lista de Presença
                </Button>
                <Button color="primary" size="sm" className="w-full text-xs">
                  Editar Evento
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </Container>
  )
}
