import type {
  MemberStayReservation,
  MemberSubscription,
  StayItem,
} from "@/src/types"

export const STAYS: StayItem[] = [
  {
    id: 0,
    name: "Fazenda Boa Vista",
    city: "Porto Feliz, SP",
    origPrice: 2400,
    memberPrice: 1920,
    badge: "20% OFF DE MEMBRO",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 1,
    name: "Hotel Emiliano Jardins",
    city: "São Paulo, SP",
    origPrice: 3200,
    memberPrice: 2560,
    badge: "20% OFF DE MEMBRO",
    image:
      "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    name: "Pousada Casa Turquesa",
    city: "Paraty, RJ",
    origPrice: 1850,
    memberPrice: 1480,
    badge: "20% OFF DE MEMBRO",
    image:
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    name: "Uxua Casa Hotel & Spa",
    city: "Trancoso, BA",
    origPrice: 2900,
    memberPrice: 2320,
    badge: "20% OFF DE MEMBRO",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    name: "Botanique Hotel & Spa",
    city: "Camanducaia, MG",
    origPrice: 3600,
    memberPrice: 2880,
    badge: "20% OFF DE MEMBRO",
    image:
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 5,
    name: "Ponta dos Ganchos Exclusive Resort",
    city: "Gov. Celso Ramos, SC",
    origPrice: 4100,
    memberPrice: 3280,
    badge: "20% OFF DE MEMBRO",
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 6,
    name: "Palácio Tangará Oetker",
    city: "São Paulo, SP",
    origPrice: 2750,
    memberPrice: 2200,
    badge: "20% OFF DE MEMBRO",
    image:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&auto=format&fit=crop&q=80",
  },
  {
    id: 7,
    name: "Vila Naiá Eco Resort",
    city: "Corumbau, BA",
    origPrice: 3300,
    memberPrice: 2640,
    badge: "20% OFF DE MEMBRO",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
  },
]

export const DEFAULT_MEMBER_STAYS: MemberStayReservation[] = [
  {
    id: "res-01",
    stayId: 0,
    stayName: "Fazenda Boa Vista",
    location: "Porto Feliz, SP",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&auto=format&fit=crop&q=80",
    checkIn: "24 de Outubro, 2026",
    checkOut: "27 de Outubro, 2026",
    nights: 3,
    guests: 2,
    roomType: "Villa Master com Piscina Privativa",
    totalPrice: 5760,
    status: "confirmed",
    confirmationCode: "CK-BV-8821",
  },
  {
    id: "res-02",
    stayId: 3,
    stayName: "Uxua Casa Hotel & Spa",
    location: "Trancoso, BA",
    image:
      "https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&auto=format&fit=crop&q=80",
    checkIn: "18 de Novembro, 2026",
    checkOut: "22 de Novembro, 2026",
    nights: 4,
    guests: 2,
    roomType: "Casa da Praça (Suíte Presidencial)",
    totalPrice: 9280,
    status: "confirmed",
    confirmationCode: "CK-UX-4490",
  },
]

export const DEFAULT_MEMBER_SUBSCRIPTION: MemberSubscription = {
  planName: "ClubKey Founder Black",
  tierBadge: "Membro Fundador VIP",
  status: "active",
  renewalDate: "15 de Outubro de 2026",
  priceMonthly: 1200,
  priceAnnual: 12900,
  period: "annual",
  paymentMethod: {
    brand: "Mastercard Black",
    last4: "8842",
    expiry: "11/29",
  },
  invoices: [
    {
      id: "INV-2026-009",
      date: "15/10/2025",
      amount: 12900,
      status: "paid",
    },
    {
      id: "INV-2025-009",
      date: "15/10/2024",
      amount: 10800,
      status: "paid",
    },
  ],
  features: [
    "Acesso total a todos os encontros mensais e eventos fechados",
    "Tarifas com até 35% de desconto no catálogo de hospedagens parceiras",
    "Canal direto com concierge VIP 24/7 para reservas e experiências",
    "Diretório completo de membros com introduções e conexões bilaterais",
    "Prioridade máxima na lista de espera para viagens e regatas exclusivas",
    "Clube de benefícios e parcerias com hospitais, aviação executiva e gastronomia",
  ],
}
