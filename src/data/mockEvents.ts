export interface UpcomingEvent {
  id: string
  label: string
  shortLabel: string
  dateFrom: string
  dateTo: string
  daysUntil: number
  venue: string
}

export interface EventSectionData {
  id: string
  title: string
  cityDisplay: string
  stateUf: string
  primaryCityId: number
  eventBadge: string
  moreEventsCount?: number
  upcomingEvents: UpcomingEvent[]
}

export const eventSectionsData: EventSectionData[] = [
  {
    id: "event-sp",
    title: "SP - São Paulo",
    cityDisplay: "São Paulo (SP)",
    stateUf: "SP",
    primaryCityId: 163,
    eventBadge: "BGS +1",
    moreEventsCount: 1,
    upcomingEvents: [
      {
        id: "bgs-2026",
        label: "Brasil Game Show",
        shortLabel: "BGS",
        dateFrom: "8 de out.",
        dateTo: "12 de out.",
        daysUntil: 28,
        venue: "Expo Center Norte — São Paulo",
      },
      {
        id: "f1-gp-sao-paulo-2026",
        label: "GP de São Paulo — Fórmula 1",
        shortLabel: "F1 Interlagos",
        dateFrom: "8 de nov.",
        dateTo: "10 de nov.",
        daysUntil: 57,
        venue: "Autódromo José Carlos Pace (Interlagos) — São Paulo",
      },
    ],
  },
  {
    id: "event-rj",
    title: "RJ - Rio de Janeiro",
    cityDisplay: "Rio de Janeiro (RJ)",
    stateUf: "RJ",
    primaryCityId: 129,
    eventBadge: "Rock in Rio",
    upcomingEvents: [
      {
        id: "rock-in-rio-2026",
        label: "Rock in Rio",
        shortLabel: "Rock in Rio",
        dateFrom: "4 de set.",
        dateTo: "13 de set.",
        daysUntil: 0,
        venue: "Cidade do Rock / Parque Olímpico — Rio de Janeiro",
      },
    ],
  },
  {
    id: "event-sc-blumenau",
    title: "SC - Blumenau",
    cityDisplay: "Blumenau (SC)",
    stateUf: "SC",
    primaryCityId: 266,
    eventBadge: "Oktoberfest",
    upcomingEvents: [
      {
        id: "oktoberfest-blumenau-2026",
        label: "Oktoberfest Blumenau",
        shortLabel: "Oktoberfest",
        dateFrom: "7 de out.",
        dateTo: "25 de out.",
        daysUntil: 27,
        venue: "Parque Vila Germânica — Blumenau",
      },
    ],
  },
]
