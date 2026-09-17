# Módulo: Eventos (`/eventos`)

Este módulo gerencia a grade de eventos presenciais, jantares executivos, keynotes, masterclasses e encontros de networking do ClubKey.

---

## 🗺️ Rotas do Módulo

1. **`/eventos`**: Catálogo de eventos com filtros por categoria (`"networking"`, `"keynote"`, `"exclusive"`, `"gastronomy"`), busca por palavra-chave e filtro de clube ativo.
2. **`/eventos/[id]/[slug]`**: Página de detalhes do evento (banner, horários, local, descrição completa, palestrantes/anfitriões, vagas restantes, recompensa em XP/RIB e botão de RSVP).
3. **`/eventos/[id]/[slug]/quem-vai`**: Lista de todos os membros confirmados no evento com links para seus perfis e botão de conexão rápida.
4. **`/eventos/meus-eventos`**: Lista de todos os eventos em que o associado confirmou presença ou participou no passado.
5. **`/eventos/meus-eventos/[id]/[slug]`**: Acesso rápido ao voucher/ingresso do associado para o evento.

---

## 🛠️ Regras de Negócio & Interações

- **RSVP (Confirmação de Presença)**:
  - Clicar em "Confirmar Presença" altera o status para confirmado, reserva uma vaga (`spotsLeft` diminui), concede XP e Tokens RIB imediatos como bônus.
  - Clicar novamente cancela o RSVP e libera a vaga.
- **Exclusividade por Tier**: Eventos marcados com `isExclusive = true` e `minTier` exigem que o usuário possua nível igual ou superior (ex: Chanceler, Embaixador ou Patrono) para se inscrever.
- **Exportação para Calendário**: Botão `AddToCalendarButton` gera links diretos para Google Calendar, Apple iCal e Outlook.
- **Compartilhamento**: Botão `ShareButton` copia o link limpo com slug amigável e dispara o Web Share API quando disponível.

---

## 📡 Endpoints de Backend Requeridos

1. `GET /api/v1/events`: Lista de eventos com filtros (`clubId`, `category`, `search`, `page`).
2. `GET /api/v1/events/:id`: Detalhes completos do evento.
3. `GET /api/v1/events/:id/attendees`: Lista de participantes inscritos.
4. `GET /api/v1/events/my-events`: Eventos confirmados do usuário logado.
5. `POST /api/v1/events/:id/rsvp`: Mutação de inscrição (adiciona ou remove a presença do associado).
