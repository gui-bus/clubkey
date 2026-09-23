import type { ChatMessage } from "@/src/types"

import { brandConfig } from "@/src/config/brand.config"

export const DEFAULT_CHAT_MESSAGES: Record<number, ChatMessage[]> = {
  2: [
    {
      id: "msg-2-1",
      senderId: 2,
      text: `Olá William! Vi seu perfil aqui no ${brandConfig.name} e notei sua experiência com estruturação e venture capital. Achei excelente a tese da sua empresa!`,
      timestamp: "10:42",
      read: false,
    },
    {
      id: "msg-2-2",
      senderId: 2,
      text: "Você vai participar do próximo encontro em São Paulo? Se for, adoraria marcar um café para trocarmos sinergias sobre captação institucional.",
      timestamp: "10:44",
      read: false,
    },
  ],
  3: [
    {
      id: "msg-3-1",
      senderId: "user",
      text: "Olá Eduardo, prazer em conectar! Acompanho os investimentos da Horizon Capital no setor de logística.",
      timestamp: "Ontem, 16:20",
      read: true,
    },
    {
      id: "msg-3-2",
      senderId: 3,
      text: "Fala William! Tudo ótimo por aqui. Vamos marcar um almoço sim, estou avaliando duas rodadas no setor que podem fazer muito sentido para co-investimento.",
      timestamp: "Ontem, 16:35",
      read: true,
    },
  ],
}
