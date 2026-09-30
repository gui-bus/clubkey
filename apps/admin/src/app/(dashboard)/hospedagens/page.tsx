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
import { formatCurrency } from "@clubkey/utils"
import { Bed, CurrencyDollar, MapPin, Plus, Star } from "@phosphor-icons/react"

const mockProperties = [
  {
    id: "prop_1",
    title: "Villa Santorini Boutique",
    location: "Trancoso, Bahia",
    type: "Villa Exclusiva",
    pricePerNight: 2800,
    rating: 4.9,
    status: "Disponível",
    suites: 4,
  },
  {
    id: "prop_2",
    title: "Chalé Suíço Montanha",
    location: "Campos do Jordão, SP",
    type: "Chalé de Luxo",
    pricePerNight: 1650,
    rating: 4.8,
    status: "Disponível",
    suites: 3,
  },
  {
    id: "prop_3",
    title: "Penthouse Beira-Mar",
    location: "Florianópolis, SC",
    type: "Penthouse",
    pricePerNight: 3200,
    rating: 5.0,
    status: "Manutenção",
    suites: 5,
  },
]

export default function AdminStaysPage() {
  return (
    <div className="space-y-6">
      
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Gestão de Hospedagens
          </h1>
          <p className="text-sm text-muted-foreground">
            Controle de propriedades parceiras, quartos, valores por diária e
            inventário.
          </p>
        </div>
        <Button color="primary" size="sm">
          <Plus size={16} className="mr-1.5" /> Nova Propriedade
        </Button>
      </div>

      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {mockProperties.map((prop) => (
          <Card key={prop.id} className="border-border bg-card overflow-hidden">
            <div className="h-40 bg-muted/60 relative flex items-center justify-center text-muted-foreground">
              <Bed size={36} />
              <div className="absolute top-3 right-3">
                <Badge
                  color={prop.status === "Disponível" ? "default" : "warning"}
                  size="sm"
                >
                  {prop.status}
                </Badge>
              </div>
            </div>
            <CardContent className="p-5">
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-1">
                <span>{prop.type}</span>
                <span className="flex items-center gap-1 font-semibold text-foreground">
                  <Star size={14} weight="fill" className="text-amber-400" />{" "}
                  {prop.rating}
                </span>
              </div>
              <h3 className="font-bold text-base text-foreground">
                {prop.title}
              </h3>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <MapPin size={14} /> {prop.location}
              </p>

              <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-semibold text-muted-foreground">
                    Diária
                  </span>
                  <div className="font-bold text-sm text-foreground">
                    {formatCurrency(prop.pricePerNight)}
                  </div>
                </div>
                <Button variant="bordered" size="sm" className="text-xs">
                  Editar Detalhes
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
